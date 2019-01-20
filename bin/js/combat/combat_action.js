var combat;
(function (combat) {
    var combat_action = /** @class */ (function () {
        function combat_action(tp, data, mgr) {
            this.m_type = 0;
            this.m_mgr = null;
            this.m_type = tp;
            this.m_data = data;
            this.m_mgr = mgr;
        }
        combat_action.prototype.do = function () {
            this.m_mgr.clearplayernode();
            switch (this.m_type) {
                case combat.ACTION_ADDWARRIOR:
                    this.do_addwarrior();
                    break;
                case combat.ACTION_INITWARRIORS:
                    this.do_initwarrior();
                    break;
                case combat.ACTION_INITWARRIORHPS:
                    this.do_initwarriorhps();
                    break;
                case combat.ACTION_SETWARRIORADORN:
                    this.do_setadorn();
                    break;
                case combat.ACTION_CUSTOMEVENT:
                    this.do_customevent();
                    break;
                case combat.ACTION_ENTER:
                    this.do_enter();
                    break;
                case combat.ACTION_CHANGELINEUP:
                    this.do_changelineup();
                    break;
                case combat.ACTION_SKILL:
                    this.do_skill();
                    break;
                case combat.ACTION_DELWARRIOR:
                    this.do_delwarrior();
                    break;
                case combat.ACTION_SETHP:
                    this.do_sethp();
                    break;
                case combat.ACTION_ADDBUFF:
                    this.do_addbuff();
                    break;
                case combat.ACTION_DELBUFF:
                    this.do_delbuff();
                    break;
                case combat.ACTION_BUFFCD:
                    this.do_buffcd();
                    break;
                case combat.ACTION_BUFFAUTOCD:
                    this.do_buffautocd();
                    break;
                case combat.ACTION_PROPCHANGE:
                    this.do_propchange();
                    break;
                default:
                    break;
            }
            this.m_mgr.startplayernode();
        };
        combat_action.prototype._get_skill_unitid = function (param) {
            if (param == "dst") {
                return this.m_data.dst_list[0];
            }
            return this.m_data.id;
        };
        combat_action.prototype._pop_skill_dst = function () {
            this.m_data.dst_list.pop();
        };
        combat_action.prototype._parse_skill_move = function (tm, data, self_group) {
            var src_id = this._get_skill_unitid(data['param1']);
            var dst_id = this._get_skill_unitid(data['param2']);
            var fdir = -1;
            if (data['param3'] != null) {
                fdir = parseInt(data['param3']);
            }
            else {
                if (this._is_downteam(src_id, self_group)) {
                    fdir = 3;
                }
                else {
                    fdir = 7;
                }
            }
            var ud = { "src": src_id, "dst": dst_id, "forcedir": fdir };
            this._add_node(tm, combat.COMBATSCENE_WARRIORMOVE2WARRIOR, ud);
        };
        combat_action.prototype._parse_skill_move2 = function (tm, data, self_group) {
            var src_id = this._get_skill_unitid(data['param1']);
            var x = parseInt(data["param2"]);
            var y = parseInt(data["param3"]);
            var fdir = -1;
            if (data['param4'] != null) {
                fdir = parseInt(data['param4']);
            }
            else {
                if (this._is_downteam(src_id, self_group)) {
                    fdir = 3;
                }
                else {
                    fdir = 7;
                }
            }
            var ud = { "src": src_id, "x": x, "y": y, "forcedir": fdir };
            this._add_node(tm, combat.COMBATSCENE_WARRIORMOVE, ud);
        };
        combat_action.prototype._is_downteam = function (id, self_group) {
            return this.m_mgr.m_scene.is_downteambywid(id, self_group);
        };
        combat_action.prototype._parse_skill_blacks = function (tm, data) {
            var tmlen = parseInt(data["param1"]);
            var ud = { "tm": tmlen };
            this._add_node(tm, combat.COMBATSCENE_BLACKSCENE, ud);
        };
        combat_action.prototype._parse_skill_dir = function (tm, data, self_group) {
            var src_id = this._get_skill_unitid(data['param1']);
            var dst_id = 0;
            var param = data['param2'];
            if (param == 'self') {
                if (this._is_downteam(src_id, self_group)) {
                    var ud = { "src": src_id, "dir": 7 };
                    this._add_node(tm, combat.COMBATSCENE_WARRIORDIR, ud);
                }
                else {
                    var ud = { "src": src_id, "dir": 3 };
                    this._add_node(tm, combat.COMBATSCENE_WARRIORDIR, ud);
                }
            }
            else if (param == 'enemy') {
                if (this._is_downteam(src_id, self_group)) {
                    var ud = { "src": src_id, "dir": 3 };
                    this._add_node(tm, combat.COMBATSCENE_WARRIORDIR, ud);
                }
                else {
                    var ud = { "src": src_id, "dir": 7 };
                    this._add_node(tm, combat.COMBATSCENE_WARRIORDIR, ud);
                }
            }
            else if (param == 'dst') {
                dst_id = this.m_data.dst_list[0];
                var ud = { "src": src_id, "dst": dst_id };
                this._add_node(tm, combat.COMBATSCENE_WARRIORDIR2W, ud);
            }
            else if (param == 'src') {
                dst_id = this.m_data.id;
                var ud = { "src": src_id, "dst": dst_id };
                this._add_node(tm, combat.COMBATSCENE_WARRIORDIR2W, ud);
            }
        };
        combat_action.prototype._parse_skill_act = function (tm, data) {
            var src_id = this._get_skill_unitid(data['param1']);
            var actionid = parseInt(data['param2']);
            var ud = { "src": src_id, "actionid": actionid };
            this._add_node(tm, combat.COMBATSCENE_WARRIORACTION, ud);
        };
        combat_action.prototype._get_skill_atkstatus = function (data, id) {
            for (var _i = 0, _a = data.atkstatus_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.id == id) {
                    return i;
                }
            }
            return null;
        };
        combat_action.prototype._parse_ninjaatk = function (tm, data, self_group) {
            var src = this.m_data.id;
            var dir = 3;
            var dx = 0;
            var dy = 0;
            if (this._is_downteam(src, self_group)) {
                dir = 3;
                dx = this.m_mgr.m_scene.m_pos_dx;
                dy = this.m_mgr.m_scene.m_pos_dy;
            }
            else {
                dir = 7;
                dx = -this.m_mgr.m_scene.m_pos_dx;
                dy = -this.m_mgr.m_scene.m_pos_dy;
            }
            var src_pt = this.m_mgr.m_scene.get_pos(src);
            var srcud = { "src": src, "x": 0, "y": 0 };
            this._add_node(tm, combat.COMBATSCENE_WARRIORSETPOS, srcud);
            for (var _i = 0, _a = this.m_data.dst_list; _i < _a.length; _i++) {
                var i = _a[_i];
                var atk_id = i;
                var clone_id = 10000 + i;
                var x = 0;
                var y = 0;
                var dst_pos = this.m_mgr.m_scene.get_pos(atk_id);
                //
                x = dst_pos.x + 3 * dx;
                y = dst_pos.y + 3 * dy;
                x = src_pt.x;
                y = src_pt.y;
                //
                var ud = { "src": src, "dst": clone_id, "x": x, "y": y, "dir": dir };
                this._add_node(tm, combat.COMBATSCENE_ADDCLONEWARRIOR, ud);
                var mx = 0;
                var my = 0;
                mx = dst_pos.x + dx;
                my = dst_pos.y + dy;
                var mud = { "src": clone_id, "x": mx, "y": my, "forcedir": dir };
                this._add_node(tm + 10, combat.COMBATSCENE_WARRIORMOVE, mud);
                var dud = { "src": clone_id, "dir": dir };
                this._add_node(tm + 310, combat.COMBATSCENE_WARRIORDIR, dud);
                var aud = { "src": clone_id, "actionid": 3 /* ACTION_ATTACK */ };
                this._add_node(tm + 400, combat.COMBATSCENE_WARRIORACTION, aud);
            }
        };
        combat_action.prototype._parse_clearninja = function (tm, data) {
            var src = this.m_data.id;
            var mud = { "src": src };
            this._add_node(tm, combat.COMBATSCENE_WARRIORREADY, mud);
            this._add_node(tm, combat.COMBATSCENE_DELNINJA, 10000);
        };
        combat_action.prototype._parse_skill_attacked = function (tm, data) {
            var dst_list = new Array();
            if (data['param1'] == 'dst') {
                dst_list.push(this.m_data.dst_list[0]);
            }
            else {
                for (var _i = 0, _a = this.m_data.dst_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    dst_list.push(i);
                }
            }
            var skillatkdata = this.m_data;
            for (var _b = 0, dst_list_1 = dst_list; _b < dst_list_1.length; _b++) {
                var i = dst_list_1[_b];
                var atkstatus = this._get_skill_atkstatus(skillatkdata, i);
                if (atkstatus == null) {
                    continue;
                }
                this._gen_propchange(i, tm, atkstatus);
            }
            for (var _c = 0, _d = skillatkdata.subbuff_list; _c < _d.length; _c++) {
                var i = _d[_c];
                var buffobj = i;
                var ud = { "src": buffobj.id, "buffid": buffobj.buffid, "shape": buffobj.buffshape };
                this._add_node(tm, combat.COMBATSCENE_DELBUFF, ud);
            }
            for (var _e = 0, _f = skillatkdata.addbuff_list; _e < _f.length; _e++) {
                var i = _f[_e];
                var buffobj = i;
                var ud = { "src": buffobj.id, "buffid": buffobj.buffid, "shape": buffobj.buffshape, "cd": buffobj.cd, "overlay": buffobj.overlay, "datas": buffobj.datas, "buffeffid": buffobj.buffeffid };
                this._add_node(tm, combat.COMBATSCENE_ADDBUFF, ud);
            }
        };
        combat_action.prototype._parse_skill_effect = function (tm, data, self_group) {
            var effectid = parseInt(data['param1']);
            var pos = data['param2'];
            var x = 0;
            var y = 0;
            if (pos == 'src') {
                var src_id = this.m_data.id;
                var ud = { "src": src_id, "effectid": effectid };
                this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
            }
            else if (pos == 'dst') {
                var src_id = this.m_data.dst_list[0];
                var ud = { "src": src_id, "effectid": effectid };
                this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
            }
            else if (pos == 'all') {
                for (var _i = 0, _a = this.m_data.dst_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    var ud = { "src": i, "effectid": effectid };
                    this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
                }
            }
            else if (pos == 'center') {
                var src_pos = this.m_mgr.m_scene.get_pos(1);
                var dst_pos = this.m_mgr.m_scene.get_pos(21);
                var ud = { "x": src_pos.x + (dst_pos.x - src_pos.x) / 2, "y": src_pos.y + (dst_pos.y - src_pos.y) / 2, "effectid": effectid };
                this._add_node(tm, combat.COMBATSCENE_EFFECT, ud);
            }
            else if (pos == 'self') {
                if (this._is_downteam(this.m_data.id, self_group)) {
                    var src_pos = this.m_mgr.m_scene.get_pos(1);
                    var ud = { "x": src_pos.x, "y": src_pos.y, "effectid": effectid };
                    this._add_node(tm, combat.COMBATSCENE_EFFECT, ud);
                }
                else {
                    var src_pos = this.m_mgr.m_scene.get_pos(21);
                    var ud = { "x": src_pos.x, "y": src_pos.y, "effectid": effectid };
                    this._add_node(tm, combat.COMBATSCENE_EFFECT, ud);
                }
            }
            else if (pos == 'enemy') {
                if (this._is_downteam(this.m_data.id, self_group)) {
                    var src_pos = this.m_mgr.m_scene.get_pos(21);
                    var ud = { "x": src_pos.x, "y": src_pos.y, "effectid": effectid };
                    this._add_node(tm, combat.COMBATSCENE_EFFECT, ud);
                }
                else {
                    var src_pos = this.m_mgr.m_scene.get_pos(1);
                    var ud = { "x": src_pos.x, "y": src_pos.y, "effectid": effectid };
                    this._add_node(tm, combat.COMBATSCENE_EFFECT, ud);
                }
            }
            else {
                x = parseInt(data["param2"]);
                y = parseInt(data["param3"]);
                var ud = { "x": x, "y": y, "effectid": effectid };
                this._add_node(tm, combat.COMBATSCENE_EFFECT_SCREENPOS, ud);
            }
        };
        combat_action.prototype._parse_skill_moveback = function (tm, data, self_group) {
            var src_id = this._get_skill_unitid(data['param1']);
            var fdir = -1;
            if (this._is_downteam(src_id, self_group)) {
                fdir = 3;
            }
            else {
                fdir = 7;
            }
            var ud = { "src": src_id, "forcedir": fdir };
            this._add_node(tm, combat.COMBATSCENE_WARRIORMOVEBACK, ud);
            var dud = { "src": src_id, "dir": fdir };
            this._add_node(tm + 100, combat.COMBATSCENE_WARRIORDIR, dud);
        };
        combat_action.prototype._add_node = function (tm, node_type, user_data) {
            var node = this.m_mgr._get_player_ins(tm, node_type, user_data);
            this.m_mgr.addplayernode(node);
        };
        combat_action.prototype._parse_skill_end = function (tm, data) {
            this._add_node(tm, combat.COMBATSCENE_EMPTY, this.m_data);
        };
        combat_action.prototype._parse_skill_action = function (tm, action, data, self_group) {
            switch (action) {
                case "move":
                    this._parse_skill_move(tm, data, self_group);
                    break;
                case "ninjaatk":
                    this._parse_ninjaatk(tm, data, self_group);
                    break;
                case "clearninja":
                    this._parse_clearninja(tm, data);
                    break;
                case "move2":
                    this._parse_skill_move2(tm, data, self_group);
                    break;
                case "dir":
                    this._parse_skill_dir(tm, data, self_group);
                    break;
                case "action":
                    this._parse_skill_act(tm, data);
                    break;
                case "attacked":
                    this._parse_skill_attacked(tm, data);
                    break;
                case "effect":
                    this._parse_skill_effect(tm, data, self_group);
                    break;
                case "black":
                    this._parse_skill_blacks(tm, data);
                    break;
                case "moveback":
                    this._parse_skill_moveback(tm, data, self_group);
                    break;
                case "nextdst":
                    this._pop_skill_dst();
                    break;
                case "end":
                    this._parse_skill_end(tm, data);
                    break;
                default:
                    break;
            }
        };
        combat_action.prototype._gen_propchange = function (i, tm, atkstatus) {
            if (atkstatus.b_dodge == false) {
                var ud = { "src": i, "type": atkstatus.damagetype, "damage": atkstatus.damage, "crack": atkstatus.b_crack };
                this._add_node(tm, combat.COMBATSCENE_POPNUMBER, ud);
                if (atkstatus.b_dead || atkstatus.b_fly) {
                    var hpins = new combat.warrior_hp();
                    hpins.hp = 0;
                    hpins.hpmax = 1000;
                    hpins.id = i;
                    this._add_node(tm, combat.COMBATSCENE_SETHP, hpins);
                }
            }
            if (atkstatus.b_dead) {
                var ud = { "src": i, "stopf": 1 };
                this._add_node(tm, combat.COMBATSCENE_WARRIORATTACKED, ud);
                ud = { "src": i, "dst": 1 };
                this._add_node(tm, combat.COMBATSCENE_WARRIORBACKMOVE, ud);
                ud["effectid"] = 106;
                this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
                if (atkstatus.b_vanish) {
                    this._add_node(tm + combat_action.DEAD_ATTACKED_TM, combat.COMBATSCENE_WARRIORDEADVANISH, ud);
                }
                else {
                    this._add_node(tm + combat_action.DEAD_ATTACKED_TM, combat.COMBATSCENE_WARRIORDEAD, ud);
                }
                this._add_node(tm + combat_action.DEAD_TM, combat.COMBATSCENE_EMPTY, null);
            }
            else if (atkstatus.b_fly) {
                var ud = null;
                ud = { "src": i, "dst": 1 };
                this._add_node(tm, combat.COMBATSCENE_WARRIORBACKMOVE, ud);
                ud = { "src": i, "stopf": 1 };
                this._add_node(tm, combat.COMBATSCENE_WARRIORATTACKED, ud);
                ud["effectid"] = 106;
                this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
                this._add_node(tm + combat_action.FLY_ATTACKED_TM, combat.COMBATSCENE_WARRIORFLY, ud);
                this._add_node(tm + combat_action.FLY_TM, combat.COMBATSCENE_EMPTY, null);
            }
            else if (atkstatus.b_dodge) {
                var ud = { "src": i };
                this._add_node(tm, combat.COMBATSCENE_WARRIORDODGE, ud);
                this._add_node(tm + combat_action.DODGE_TM, combat.COMBATSCENE_WARRIORREADY, ud);
            }
            else if (atkstatus.b_defend) {
                var ud = { "src": i, "stopf": 0 };
                this._add_node(tm, combat.COMBATSCENE_WARRIORDEFEND, ud);
                ud["effectid"] = 102;
                this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
                ud = { "src": i, "dst": 1 };
                this._add_node(tm, combat.COMBATSCENE_WARRIORBACKMOVE, ud);
                this._add_node(tm + combat_action.DEFEND_TM, combat.COMBATSCENE_WARRIORREADY, ud);
            }
            else if (atkstatus.b_revive) {
                var ud = { "src": i };
                this._add_node(tm, combat.COMBATSCENE_WARRIORREVIVE, ud);
                this._add_node(tm + combat_action.REVIVE_TM, combat.COMBATSCENE_EMPTY, null);
            }
            else {
                if (atkstatus.damagetype != combat.DAMAGETYPE_HP_ADD) {
                    var ud = { "src": i, "stopf": 1 };
                    this._add_node(tm, combat.COMBATSCENE_WARRIORATTACKED, ud);
                    ud["effectid"] = 101;
                    this._add_node(tm, combat.COMBATSCENE_EFFECT2W, ud);
                    this._add_node(tm + combat_action.ATTACKED_TM, combat.COMBATSCENE_WARRIORREADY, ud);
                }
            }
        };
        combat_action.prototype.do_propchange = function () {
            var atkstatus = this.m_data;
            this._gen_propchange(atkstatus.id, 0, atkstatus);
        };
        combat_action.prototype.do_skill = function () {
            var skilldata = this.m_data;
            var delta = 200;
            if (skilldata.m_type == 2) {
                var ud = { "src": skilldata.id, "content": "反震" };
                this._add_node(0, combat.COMBATSCENE_CRYOUT, ud);
            }
            else if (skilldata.m_type == 3) {
                var ud = { "src": skilldata.id, "content": "反击" };
                this._add_node(0, combat.COMBATSCENE_CRYOUT, ud);
            }
            else if (skilldata.m_type == 0) {
                var ud = { "src": skilldata.id, "content": "普通攻击" };
                //this._add_node(0,COMBATSCENE_CRYOUT,ud);
                delta = 0;
            }
            else if (skilldata.m_type == 1) {
                var cstring = this.m_mgr.get_skillperformcryout(skilldata.skillid);
                if (cstring == null || cstring == undefined || cstring.length <= 0) {
                    delta = 0;
                }
                else {
                    var ud = { "src": skilldata.id, "content": cstring };
                    this._add_node(0, combat.COMBATSCENE_CRYOUT, ud);
                }
            }
            else {
                delta = 0;
            }
            var skillcfgobj = this.m_mgr.get_skillperformconfig(skilldata.skillid, skilldata.skilllv, skilldata.m_config_id);
            if (skillcfgobj == null) {
                skillcfgobj = this.m_mgr.get_skillperformconfig(10001, 1, skilldata.m_config_id);
            }
            var skillcfg = skillcfgobj['data'];
            core.combat_errlog("combat_action do_skill ", skilldata.skillid, skilldata.skilllv, skillcfg);
            for (var _i = 0, skillcfg_1 = skillcfg; _i < skillcfg_1.length; _i++) {
                var i = skillcfg_1[_i];
                core.combat_errlog('do_skill ', i);
                var tm = i.tm;
                var action = i.action;
                this._parse_skill_action(tm + delta, action, i, skilldata.self_group);
            }
        };
        combat_action.prototype.do_enter = function () {
            this._add_node(0, combat.COMBATSCENE_ENTER, this.m_data);
        };
        combat_action.prototype.do_changelineup = function () {
            this._add_node(0, combat.COMBATSCENE_CHANGELINEUP, this.m_data);
        };
        combat_action.prototype.do_customevent = function () {
            this._add_node(0, combat.COMBATSCENE_CUSTOMEVENT, this.m_data);
        };
        combat_action.prototype.do_addwarrior = function () {
            this._add_node(0, combat.COMBATSCENE_ADDWARRIOR, this.m_data);
        };
        combat_action.prototype.do_initwarrior = function () {
            this._add_node(0, combat.COMBATSCENE_INITWARRIOR, this.m_data);
        };
        combat_action.prototype.do_setadorn = function () {
            this._add_node(0, combat.COMBATSCENE_SETADORN, this.m_data);
        };
        combat_action.prototype.do_delwarrior = function () {
            this._add_node(0, combat.COMBATSCENE_DELWARRIOR, this.m_data);
        };
        combat_action.prototype.do_sethp = function () {
            this._add_node(0, combat.COMBATSCENE_SETHP, this.m_data);
        };
        combat_action.prototype.do_initwarriorhps = function () {
            for (var _i = 0, _a = this.m_data; _i < _a.length; _i++) {
                var i = _a[_i];
                this._add_node(0, combat.COMBATSCENE_SETHP, i);
            }
        };
        combat_action.prototype.do_addbuff = function () {
            var buffobj = this.m_data;
            var ud = { "src": buffobj.id, "buffid": buffobj.buffid, "shape": buffobj.buffshape, "cd": buffobj.cd, "overlay": buffobj.overlay, "datas": buffobj.datas, "buffeffid": buffobj.buffeffid };
            this._add_node(0, combat.COMBATSCENE_ADDBUFF, ud);
        };
        combat_action.prototype.do_delbuff = function () {
            var buffobj = this.m_data;
            var ud = { "src": buffobj.id, "buffid": buffobj.buffid, "shape": buffobj.buffshape };
            this._add_node(0, combat.COMBATSCENE_DELBUFF, ud);
        };
        combat_action.prototype.do_buffcd = function () {
            var buffobj = this.m_data;
            var ud = { "src": buffobj.id, "buffid": buffobj.buffid, "cd": buffobj.cd };
            this._add_node(0, combat.COMBATSCENE_BUFFCD, ud);
        };
        combat_action.prototype.do_buffautocd = function () {
            var buffobj = this.m_data;
            this._add_node(0, combat.COMBATSCENE_BUFFAUTOCD, null);
        };
        combat_action.ATTACKED_TM = 450;
        combat_action.DEAD_ATTACKED_TM = 500;
        combat_action.DEAD_TM = 400;
        combat_action.FLY_ATTACKED_TM = 500;
        combat_action.FLY_TM = 400;
        combat_action.DODGE_TM = 300;
        combat_action.DEFEND_TM = 200;
        combat_action.REVIVE_TM = 400;
        return combat_action;
    }());
    combat.combat_action = combat_action;
})(combat || (combat = {}));
//# sourceMappingURL=combat_action.js.map