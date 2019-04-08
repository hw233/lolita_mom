var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var combat;
(function (combat) {
    var warrior = /** @class */ (function () {
        function warrior() {
            this.id = 0;
            this.roleid = 0;
            this.pos = 0;
            this.shape = 0;
            this.group = 0;
            this.cls = 0;
            this.lv = 0;
            this.scale = 1.0;
            this.name = "undefine";
            this.b_dead = false;
            this.desc = null;
            this.m_desc = new Array(); //skin,weapon,wing,fairy,aurn,title,ride,rideback,rideh
            for (var i = 0; i < 10; ++i) {
                this.m_desc.push(0);
            }
        }
        warrior.prototype.clone_data = function (d) {
            d.id = this.id;
            d.roleid = this.roleid;
            d.pos = this.pos;
            d.shape = this.shape;
            d.group = this.group;
            d.cls = this.cls;
            d.lv = this.lv;
            d.scale = this.scale;
            d.name = this.name;
            d.b_dead = this.b_dead;
            if (this.desc != null) {
                d.desc = new Laya.Byte();
                this.desc.pos = 0;
                while (this.desc.bytesAvailable > 0) {
                    d.desc.writeByte(this.desc.getByte());
                }
            }
            if (this.m_desc.length > 0) {
                for (var i = 0; i < this.m_desc.length; ++i) {
                    d.m_desc.push(this.m_desc[i]);
                }
            }
        };
        return warrior;
    }());
    combat.warrior = warrior;
    var warrior_hp = /** @class */ (function () {
        function warrior_hp() {
            this.id = 0;
            this.hp = 0;
            this.hpmax = 0;
            this.mp = 0;
            this.mpmax = 0;
        }
        return warrior_hp;
    }());
    combat.warrior_hp = warrior_hp;
    var atk_status = /** @class */ (function () {
        function atk_status() {
            this.damagetype = 0;
            this.b_crack = false;
            this.b_dead = false;
            this.b_vanish = false;
            this.b_fly = false;
            this.b_revive = false;
            this.b_defend = false;
            this.b_dodge = false;
        }
        return atk_status;
    }());
    combat.atk_status = atk_status;
    var buff_status = /** @class */ (function () {
        function buff_status() {
            this.datas = new Array();
        }
        return buff_status;
    }());
    combat.buff_status = buff_status;
    var skillatk = /** @class */ (function () {
        function skillatk() {
            this.self_group = 0;
            this.dst_list = new Array();
            this.atkstatus_list = new Array();
            this.addbuff_list = new Array();
            this.subbuff_list = new Array();
            this.m_config_id = 1;
        }
        return skillatk;
    }());
    combat.skillatk = skillatk;
    var combat_turn = /** @class */ (function () {
        function combat_turn(num) {
            this.m_num = 0;
            this.m_action_list = new Array();
            this.m_action_idx = 0;
            this.m_add_list = new Array();
            this.m_sethp_list = new Array();
            this.m_num = num;
        }
        combat_turn.prototype.is_end = function () {
            return this.m_action_idx >= this.m_action_list.length;
        };
        combat_turn.prototype.do = function () {
            if (this.is_end() == false) {
                this.m_action_list[this.m_action_idx].do();
                this.m_action_idx += 1;
            }
        };
        combat_turn.prototype.dispose = function () {
        };
        return combat_turn;
    }());
    combat.combat_turn = combat_turn;
    var combatimpl = /** @class */ (function (_super) {
        __extends(combatimpl, _super);
        function combatimpl(sp) {
            var _this = _super.call(this) || this;
            _this.m_scene = null;
            _this.m_turn_list = new Array();
            _this.m_turn_idx = 0;
            _this.m_cur_turn = null;
            _this.m_player = new combat.combat_player();
            _this.m_b_end = true;
            _this.m_skillperform_config = null;
            _this.m_skill_config = null;
            _this.m_skill_configmap = new Object;
            _this.m_skillperform_cache = new Object;
            _this.m_scene = new combat.combatscene(_this, sp);
            return _this;
        }
        combatimpl.prototype.set_tm = function (tp, tm) {
            switch (tp) {
                case 0:
                    combat.combat_action.ATTACKED_TM = tm;
                    break;
                case 1:
                    combat.combat_action.DEAD_ATTACKED_TM = tm;
                    break;
                case 2:
                    combat.combat_action.DEAD_TM = tm;
                    break;
                case 3:
                    combat.combat_action.FLY_ATTACKED_TM = tm;
                    break;
                case 4:
                    combat.combat_action.FLY_TM = tm;
                    break;
                case 5:
                    combat.combat_action.DODGE_TM = tm;
                    break;
                case 6:
                    combat.combat_action.DEFEND_TM = tm;
                    break;
                case 7:
                    combat.combat_action.REVIVE_TM = tm;
                    break;
                default:
                    break;
            }
        };
        combatimpl.prototype.get_skillperformcryout = function (skillid) {
            var skillconfig = this.m_skillperform_config(skillid);
            if (skillconfig == null || skillconfig == undefined) {
                return "未知技能" + skillid.toString();
            }
            return skillconfig.cryout;
        };
        combatimpl.prototype.parse_skillcfg_by_s = function (id, s) {
            var ret = new Object();
            ret["id"] = id;
            ret["data"] = [];
            var l = s.split("\r\n");
            for (var _i = 0, l_1 = l; _i < l_1.length; _i++) {
                var i = l_1[_i];
                var p = i.split(",");
                if (p.length > 1) {
                    var tm = parseInt(p[0]);
                    var action = p[1];
                    var o = new Object();
                    o["tm"] = tm;
                    o["action"] = action;
                    var p_idx = 1;
                    for (var j = 2; j < p.length; ++j) {
                        var param = p[j];
                        o["param" + p_idx.toString()] = param;
                        p_idx += 1;
                    }
                    ret["data"].push(o);
                }
            }
            return ret;
        };
        combatimpl.prototype.set_skillperformcfg_cache = function (id, cfg) {
            this.m_skillperform_cache[id] = cfg;
        };
        combatimpl.prototype.get_skillperformcfg_cache_frompack = function (id) {
            if (this.m_skillperform_cache[id] != undefined) {
                return this.m_skillperform_cache[id];
            }
            var file_name = "/" + id.toString() + ".txt";
            var n = core.filepack_ins().get_file_len("skillperform", file_name);
            if (n > 0) {
                var fb = core.filepack_ins().get_file("skillperform", file_name);
                var s = fb.getUTFBytes(n);
                var s_o = this.parse_skillcfg_by_s(id, s);
                this.set_skillperformcfg_cache(id, s_o);
            }
            return this.m_skillperform_cache[id];
        };
        combatimpl.prototype.get_skillperformcfg = function (id) {
            var ret = this.get_skillperformcfg_cache_frompack(id);
            if (ret == null || ret == undefined) {
                ret = this.m_skill_config(id);
            }
            if (ret == null) {
                ret = this.m_skill_config(1);
            }
            return ret;
        };
        combatimpl.prototype.get_skillperformconfig = function (skillid, skilllv, config_id) {
            var skillconfigkey = skillid * 10000 + skilllv * 10 + config_id;
            if (this.m_skill_configmap[skillconfigkey] == undefined) {
                var skillconfig = this.m_skillperform_config(skillid);
                if (skillconfig == null || skillconfig == undefined) {
                    core.combat_errlog("get skillperform config error! ", skillid, skilllv);
                    return null;
                }
                var cfg = null;
                for (var _i = 0, _a = skillconfig.data; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.skilllv == skilllv) {
                        cfg = i;
                        break;
                    }
                }
                if (cfg == null) {
                    cfg = skillconfig.data[0];
                }
                //
                if (config_id == 1) {
                    if (cfg['config1'] != undefined) {
                        this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config1']);
                    }
                    else {
                        if (cfg['config2'] != undefined) {
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config2']);
                        }
                        else {
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(1);
                        }
                    }
                }
                else {
                    if (cfg['config2'] != undefined) {
                        this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config2']);
                    }
                    else {
                        if (cfg['config1'] != undefined) {
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config1']);
                        }
                        else {
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(1);
                        }
                    }
                }
                //
            }
            return this.m_skill_configmap[skillconfigkey];
        };
        combatimpl.prototype.set_skill_config = function (cfg) {
            this.m_skill_config = cfg;
        };
        combatimpl.prototype.set_skillperform_config = function (cfg) {
            this.m_skillperform_config = cfg;
        };
        combatimpl.prototype.addplayernode = function (node) {
            this.m_player.addnode(node);
        };
        combatimpl.prototype.clearplayernode = function () {
            for (var _i = 0, _a = this.m_player.m_arr; _i < _a.length; _i++) {
                var i = _a[_i];
                this._del_player_ins(i);
            }
            this.m_player.clear();
        };
        combatimpl.prototype.startplayernode = function () {
            this.m_player.start();
        };
        combatimpl.prototype.isplayerend = function () {
            return this.m_player.is_end();
        };
        combatimpl.prototype.isturnend = function () {
            if (this.m_turn_idx < this.m_turn_list.length) {
                return false;
            }
            return true;
        };
        combatimpl.prototype._get_turn_ins = function (num) {
            return new combat_turn(num);
        };
        combatimpl.prototype._del_turn_ins = function (ins) {
        };
        combatimpl.prototype._get_action_ins = function (type, data) {
            return new combat.combat_action(type, data, this);
        };
        combatimpl.prototype._del_action_ins = function (ins) {
        };
        combatimpl.prototype._get_player_ins = function (tm, event, user_data) {
            return new combat.combat_playernode(tm, event, user_data, this);
        };
        combatimpl.prototype._del_player_ins = function (ins) {
        };
        combatimpl.prototype.get_warrior_ins = function () {
            return new warrior();
        };
        combatimpl.prototype.del_warrior_ins = function (warrior_ins) {
        };
        combatimpl.prototype.get_skillatk_ins = function () {
            return new skillatk();
        };
        combatimpl.prototype.del_skillatk_ins = function (skillatk_ins) {
        };
        combatimpl.prototype.get_atkstatus_ins = function () {
            return new atk_status();
        };
        combatimpl.prototype.del_atkstatus_ins = function (ins) {
        };
        combatimpl.prototype.get_buffstatus_ins = function () {
            return new buff_status();
        };
        combatimpl.prototype.del_buffstatus_ins = function (ins) {
        };
        combatimpl.prototype.get_warriorhp_ins = function () {
            return new warrior_hp();
        };
        combatimpl.prototype.del_warriorhp_ins = function (ins) {
        };
        combatimpl.prototype.start = function (hc, w, h, x, y, scene_id, scene_res) {
            if (hc === void 0) { hc = null; }
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (scene_id === void 0) { scene_id = 0; }
            if (scene_res === void 0) { scene_res = null; }
            core.combat_errlog("combat start");
            for (var _i = 0, _a = this.m_turn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                for (var _b = 0, _c = i.m_action_list; _b < _c.length; _b++) {
                    var j = _c[_b];
                    this._del_action_ins(j);
                }
                this._del_turn_ins(i);
            }
            this.m_turn_list = new Array();
            this.m_turn_idx = 0;
            this.m_cur_turn = null;
            this.m_b_end = false;
            this.m_scene.start();
            var newturn = this._get_turn_ins(-1);
            newturn.m_action_list.push(this._get_action_ins(combat.ACTION_ENTER, [hc, w, h, x, y, scene_id, scene_res]));
            this.m_turn_list.push(newturn);
        };
        combatimpl.prototype.end = function () {
            //todo
            core.combat_errlog("combat end");
            this.m_b_end = true;
            for (var _i = 0, _a = this.m_turn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                for (var _b = 0, _c = i.m_action_list; _b < _c.length; _b++) {
                    var j = _c[_b];
                    this._del_action_ins(j);
                }
                this._del_turn_ins(i);
            }
            this.m_turn_list = new Array();
            this.m_turn_idx = 0;
            this.m_cur_turn = null;
            this.m_scene.clear();
            this.m_player.clear();
        };
        combatimpl.prototype.combatend = function () {
            var newturn = this._get_turn_ins(-1);
            newturn.m_action_list.push(this._get_action_ins(combat.ACTION_END, null));
            this.m_turn_list.push(newturn);
        };
        combatimpl.prototype.addwarrior = function (data) {
            if (this.m_cur_turn.m_num == 0) {
                this.m_cur_turn.m_add_list.push(data);
            }
            else {
                this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_ADDWARRIOR, data));
            }
        };
        combatimpl.prototype.change_lineup = function (res, dx, dy) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_CHANGELINEUP, [res, dx, dy]));
        };
        combatimpl.prototype.changeweapon = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 1, aid]));
        };
        combatimpl.prototype.changewing = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 2, aid]));
        };
        combatimpl.prototype.changeride = function (wid, aid, abid, ride_h) {
            if (ride_h === void 0) { ride_h = 30; }
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 3, [aid, abid, ride_h]]));
        };
        combatimpl.prototype.changehair = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 4, aid]));
        };
        combatimpl.prototype.changeshape = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 0, aid]));
        };
        combatimpl.prototype.changeaurn = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 5, aid]));
        };
        combatimpl.prototype.changetitle = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 6, aid]));
        };
        combatimpl.prototype.changefairy = function (wid, aid) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETWARRIORADORN, [wid, 7, aid]));
        };
        combatimpl.prototype.attack = function (data) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SKILL, data));
        };
        combatimpl.prototype.send_event = function (event, user_data) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_CUSTOMEVENT, [event, user_data]));
        };
        combatimpl.prototype.delwarrior = function (id) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_DELWARRIOR, id));
        };
        combatimpl.prototype.addbuff = function (data) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_ADDBUFF, data));
        };
        combatimpl.prototype.delbuff = function (data) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_DELBUFF, data));
        };
        combatimpl.prototype.buffcd = function (data) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_BUFFCD, data));
        };
        combatimpl.prototype.buffautocd = function () {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_BUFFAUTOCD, null));
        };
        combatimpl.prototype.propchange = function (data) {
            this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_PROPCHANGE, data));
        };
        combatimpl.prototype.set_warrior_hp = function (data) {
            if (this.m_cur_turn.m_num == 0) {
                this.m_cur_turn.m_sethp_list.push(data);
            }
            else {
                this.m_cur_turn.m_action_list.push(this._get_action_ins(combat.ACTION_SETHP, data));
            }
        };
        combatimpl.prototype.turnstart = function (count) {
            if (this.m_cur_turn != null) {
                if (this.m_cur_turn.m_sethp_list.length > 0) {
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(combat.ACTION_INITWARRIORHPS, this.m_cur_turn.m_sethp_list.concat([])));
                }
                if (this.m_cur_turn.m_add_list.length > 0) {
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(combat.ACTION_INITWARRIORS, this.m_cur_turn.m_add_list.concat([])));
                }
                this.m_turn_list.push(this.m_cur_turn);
            }
            this.m_cur_turn = this._get_turn_ins(count);
        };
        combatimpl.prototype.turnend = function () {
            if (this.m_cur_turn != null) {
                if (this.m_cur_turn.m_sethp_list.length > 0) {
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(combat.ACTION_INITWARRIORHPS, this.m_cur_turn.m_sethp_list.concat([])));
                }
                if (this.m_cur_turn.m_add_list.length > 0) {
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(combat.ACTION_INITWARRIORS, this.m_cur_turn.m_add_list.concat([])));
                }
                this.m_turn_list.push(this.m_cur_turn);
            }
            this.m_cur_turn = null;
        };
        combatimpl.prototype.update = function (delta) {
            if (this.m_b_end) {
                return;
            }
            if (this.m_player.is_end()) {
                if (this.m_turn_idx < this.m_turn_list.length) {
                    var turn = this.m_turn_list[this.m_turn_idx];
                    if (turn.is_end()) {
                        this.m_turn_idx += 1;
                    }
                    else {
                        turn.do();
                    }
                }
            }
            this.dispatch_all_delay_event();
            this.m_scene.update(delta);
            this.m_player.update(delta);
        };
        combatimpl.prototype.render = function () {
            this.m_scene.render();
        };
        combatimpl.prototype.dispose = function () {
            if (this.m_scene != null) {
                this.m_scene.dispose();
                this.m_scene = null;
            }
            _super.prototype.dispose.call(this);
        };
        return combatimpl;
    }(utils.game_event_dispatcher));
    combat.combatimpl = combatimpl;
})(combat || (combat = {}));
//# sourceMappingURL=combat.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var combat;
(function (combat) {
    var combat_warrior_action = /** @class */ (function () {
        function combat_warrior_action() {
            this.m_id = 0;
            this.m_warrior = null;
            this.m_is_end = true;
            this.m_start_tm = 0;
        }
        combat_warrior_action.prototype.re_init = function () {
            this.m_id = 0;
            this.m_warrior = null;
            this.m_is_end = true;
            this.m_start_tm = 0;
        };
        combat_warrior_action.prototype.start = function (tm) {
            this.m_start_tm = tm;
        };
        combat_warrior_action.prototype.update = function (delta) {
        };
        combat_warrior_action.prototype.is_end = function () {
            return this.m_is_end;
        };
        combat_warrior_action.prototype.clear = function () {
        };
        combat_warrior_action.prototype.dispose = function () {
            this.m_warrior = null;
        };
        return combat_warrior_action;
    }());
    combat.combat_warrior_action = combat_warrior_action;
    var dead_action = /** @class */ (function (_super) {
        __extends(dead_action, _super);
        function dead_action() {
            var _this = _super.call(this) || this;
            _this.m_b_open = true;
            _this.m_fade_max = 6;
            _this.m_fade_tm = 200;
            _this.m_cur_fadeidx = 0;
            _this.m_cur_tm = 0;
            _this.m_fadeout = true;
            return _this;
        }
        dead_action.prototype.start = function (tm) {
            this.m_start_tm = tm;
            if (this.m_b_open) {
                this.m_is_end = false;
                this.m_fadeout = true;
                this.m_cur_fadeidx = 0;
                this.m_cur_tm = this.m_start_tm;
                this.m_warrior.change_action(0 /* ACTION_STAND */);
                return;
            }
            this.m_warrior.change_action(5 /* ACTION_DEAD */, false);
            this.m_is_end = true;
        };
        dead_action.prototype.update = function (delta) {
            if (this.m_is_end) {
                return;
            }
            this.m_cur_tm += delta;
            if (this.m_cur_tm > (this.m_start_tm + this.m_fade_tm)) {
                this.m_cur_fadeidx += 1;
                if (this.m_cur_fadeidx >= this.m_fade_max) {
                    this.m_is_end = true;
                    this.m_warrior.alpha = 1;
                    return;
                }
                this.m_start_tm = this.m_cur_tm;
                this.m_fadeout = !this.m_fadeout;
            }
            var rate = 1;
            rate = (this.m_cur_tm - this.m_start_tm) / this.m_fade_tm;
            if (rate > 1) {
                rate = 1;
            }
            if (rate < 0) {
                rate = 0;
            }
            if (this.m_fadeout) {
                rate = 1 - rate;
            }
            this.m_warrior.alpha = rate;
        };
        dead_action.prototype.is_end = function () {
            return this.m_is_end;
        };
        dead_action.prototype.dispose = function () {
            if (this.m_warrior != null) {
                this.m_warrior.alpha = 1;
                this.m_warrior = null;
            }
            utils.recover("dead_action", this);
        };
        return dead_action;
    }(combat_warrior_action));
    combat.dead_action = dead_action;
    var fly_action = /** @class */ (function (_super) {
        __extends(fly_action, _super);
        function fly_action() {
            var _this = _super.call(this) || this;
            _this.m_start_pt = new Laya.Point();
            _this.m_from_pt = new Laya.Point();
            _this.m_lt_pt = new Laya.Point();
            _this.m_rb_pt = new Laya.Point();
            _this.m_collision_max = 2;
            _this.m_collision_num = 0;
            _this.m_a = 0;
            _this.m_b = 0;
            _this.m_cur_tm = 0;
            _this.m_cur_rtm = 0;
            _this.m_start_rtm = 0;
            _this.m_rspeed = 360 * 5; //angle per sec
            _this.m_speed = 360 * 5;
            _this.m_bsign = 1.0;
            return _this;
        }
        fly_action.prototype.start = function (tm) {
            if (this.m_start_pt.x == this.m_from_pt.x) {
                this.m_is_end = true;
                return;
            }
            if (this.m_start_pt.y == this.m_from_pt.y) {
                this.m_is_end = true;
                return;
            }
            this.m_start_tm = tm;
            this.m_cur_rtm = this.m_start_tm;
            this.m_start_rtm = this.m_start_tm;
            this.m_collision_num = this.m_collision_max;
            this.m_warrior.change_action(0 /* ACTION_STAND */);
            this.m_cur_tm = this.m_start_tm;
            this.m_warrior.rotation = 0;
            this.m_is_end = false;
            this._cal_param();
        };
        fly_action.prototype._cal_param = function () {
            this.m_a = utils.genafrom2point(this.m_from_pt.x, this.m_from_pt.y, this.m_start_pt.x, this.m_start_pt.y);
            this.m_b = utils.genbfrom2point(this.m_from_pt.x, this.m_from_pt.y, this.m_a);
            //y = a*x + b;
            //x = (y - b)/a;
            //only use x to calculate,so,if start x equal dst x,it will be in trouble;
            this.m_bsign = (this.m_start_pt.x - this.m_from_pt.x) / Math.abs(this.m_start_pt.x - this.m_from_pt.x);
        };
        fly_action.prototype._rotate = function (delta) {
            this.m_cur_rtm += delta;
            var a = (this.m_cur_rtm - this.m_start_rtm) * this.m_rspeed / 1000;
            a = a % 360;
            this.m_warrior.rotation = a;
        };
        fly_action.prototype._is_out = function (x, y) {
            if (x < this.m_lt_pt.x || x > this.m_rb_pt.x) {
                return true;
            }
            if (y < this.m_lt_pt.y || y > this.m_rb_pt.y) {
                return true;
            }
            return false;
        };
        fly_action.prototype._collision = function () {
            var ty = 0;
            if (this.m_bsign < 0) //right 2 left
             {
                ty = this.m_a * this.m_lt_pt.x + this.m_b;
            }
            else { //left 2 right
                ty = this.m_a * this.m_rb_pt.x + this.m_b;
            }
            if (ty == this.m_lt_pt.y || ty == this.m_rb_pt.y) {
                this.m_collision_num = -1;
                return;
            }
            //y = a*x + b;
            //x = (y - b)/a;
            if (ty < this.m_lt_pt.y) //top
             {
                this.m_start_pt.x = (this.m_lt_pt.y - this.m_b) / this.m_a;
                this.m_start_pt.y = this.m_lt_pt.y;
                var temp = (this.m_from_pt.y - this.m_lt_pt.y) * 2;
                this.m_from_pt.y -= temp;
            }
            else if (ty > this.m_rb_pt.y) //bottom
             {
                this.m_start_pt.x = (this.m_rb_pt.y - this.m_b) / this.m_a;
                this.m_start_pt.y = this.m_rb_pt.y;
                var temp = (this.m_rb_pt.y - this.m_from_pt.y) * 2;
                this.m_from_pt.y += temp;
            }
            else {
                if (this.m_bsign < 0) //right 2 left ,left
                 {
                    this.m_start_pt.x = this.m_lt_pt.x;
                    this.m_start_pt.y = this.m_a * this.m_start_pt.x + this.m_b;
                    var temp = (this.m_from_pt.x - this.m_lt_pt.x) * 2;
                    this.m_from_pt.x -= temp;
                }
                else //left 2 right,right
                 {
                    this.m_start_pt.x = this.m_rb_pt.x;
                    this.m_start_pt.y = this.m_a * this.m_start_pt.x + this.m_b;
                    var temp = (this.m_rb_pt.x - this.m_from_pt.x) * 2;
                    this.m_from_pt.x += temp;
                }
            }
            this._cal_param();
        };
        fly_action.prototype.update = function (delta) {
            if (this.m_is_end) {
                return;
            }
            this._rotate(delta);
            this.m_cur_tm += delta;
            var dx = this.m_speed * (this.m_cur_tm - this.m_start_tm) / 1000;
            var cur_x = this.m_start_pt.x + dx * this.m_bsign;
            var cur_y = this.m_a * cur_x + this.m_b;
            if (this._is_out(cur_x, cur_y)) {
                this.m_collision_num -= 1;
                if (this.m_collision_num < 0) {
                    this.m_is_end = true;
                    return;
                }
                this._collision();
                if (this.m_collision_num < 0) {
                    this.m_is_end = true;
                    return;
                }
                this.m_start_tm = this.m_cur_tm;
            }
            this.m_warrior.set_pos(cur_x, cur_y);
        };
        fly_action.prototype.is_end = function () {
            return this.m_is_end;
        };
        fly_action.prototype.dispose = function () {
            if (this.m_warrior != null) {
                this.m_warrior.alpha = 0;
                this.m_warrior = null;
            }
            utils.recover("fly_action", this);
        };
        return fly_action;
    }(combat_warrior_action));
    combat.fly_action = fly_action;
    var combatscene = /** @class */ (function (_super) {
        __extends(combatscene, _super);
        function combatscene(mgr, sp) {
            var _this = _super.call(this) || this;
            _this.m_combat_mgr = null;
            _this.m_render = null;
            _this.m_pos_map = new Object();
            _this.m_warrior_map = new Object();
            _this.m_mw = 2560;
            _this.m_mh = 2560;
            _this.m_map = "1704.jpg";
            _this.m_camera_x = 0;
            _this.m_camera_y = 0;
            _this.m_pos_centerx = 0;
            _this.m_pos_centerdx = 0; //40;
            _this.m_pos_centerdy = 0; //-60;
            _this.m_pos_centery = 0;
            _this.m_view_w = 0;
            _this.m_view_h = 0;
            _this.m_pos_dx = 92;
            _this.m_pos_dy = 52;
            _this.m_pos_c2dx = _this.m_pos_dx * 3; //0+this.m_pos_dx;
            _this.m_pos_c2dy = _this.m_pos_dy * 2; //120+this.m_pos_dy;
            _this.m_numpic_list = new Array();
            _this.m_tempnumpic_list = new Array();
            _this.m_cryout_list = new Array();
            _this.m_tempcryout_list = new Array();
            _this.m_waction_list = new Array();
            _this.m_bk_htmlcanvas = null;
            _this.m_bk_htmltexture = null;
            _this.m_bk_sp = null;
            _this.m_lineupsp = null;
            _this.m_combat_mgr = mgr;
            _this._init_event();
            _this.m_render = new core.renderagent();
            _this.m_render.initstage(sp);
            _this.m_render.m_render.setworldwh(_this.m_mw, _this.m_mh);
            _this.m_view_w = 720;
            _this.m_view_h = 1280;
            _this.m_render.setviewport(_this.m_view_w, _this.m_view_h);
            sp.width = _this.m_mw;
            sp.height = _this.m_mh;
            //
            _this.m_render.setcamerapos(_this.m_camera_x, _this.m_camera_y);
            //
            //this.m_render.setmapbk("1002.jpg");
            _this._init_pos_map();
            sp.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        combatscene.prototype._init_pos_map = function () {
            var dx = this.m_pos_dx;
            var dy = this.m_pos_dy;
            var cx = this.m_pos_centerx;
            var cy = this.m_pos_centery;
            this.m_pos_map[1] = [cx + this.m_pos_c2dx, cy + this.m_pos_c2dy, 3];
            this.m_pos_map[2] = [this.m_pos_map[1][0] - this.m_pos_dx, this.m_pos_map[1][1] + this.m_pos_dy, 3];
            this.m_pos_map[3] = [this.m_pos_map[1][0] + this.m_pos_dx, this.m_pos_map[1][1] - this.m_pos_dy, 3];
            this.m_pos_map[4] = [this.m_pos_map[2][0] - this.m_pos_dx, this.m_pos_map[2][1] + this.m_pos_dy, 3];
            this.m_pos_map[5] = [this.m_pos_map[3][0] + this.m_pos_dx, this.m_pos_map[3][1] - this.m_pos_dy, 3];
            for (var i = 6; i < 11; ++i) {
                var tx = this.m_pos_map[i - 5][0] - dx;
                var ty = this.m_pos_map[i - 5][1] - dy;
                this.m_pos_map[i] = [tx, ty, 3];
            }
            var ddx = this.m_pos_c2dx * 2;
            var ddy = this.m_pos_c2dy * 2;
            for (var i = 21; i < 26; ++i) {
                var tx = this.m_pos_map[i - 15][0] - ddx;
                var ty = this.m_pos_map[i - 15][1] - ddy;
                this.m_pos_map[i] = [tx, ty, 7];
            }
            for (var i = 26; i < 31; ++i) {
                var tx = this.m_pos_map[i - 5][0] + dx;
                var ty = this.m_pos_map[i - 5][1] + dy;
                this.m_pos_map[i] = [tx, ty, 7];
            }
            this.m_pos_map[11] = [100, 100, 3];
            this.m_pos_map[12] = [100, 100, 3];
            this.m_pos_map[31] = [100, 100, 7];
            this.m_pos_map[32] = [100, 100, 7];
        };
        combatscene.prototype.get_pos = function (id) {
            var x = this.m_pos_map[id][0];
            var y = this.m_pos_map[id][1];
            //x = this.m_camera_x - (this.m_view_w>>1) + x;
            //y = this.m_camera_y - (this.m_view_h>>1) + y;
            var ret = new laya.maths.Point(x, y);
            return ret;
        };
        combatscene.prototype.get_dir = function (id) {
            return this.m_pos_map[id][2];
        };
        combatscene.prototype.get_warrior = function (id) {
            if (this.m_warrior_map[id] == undefined) {
                return null;
            }
            return this.m_warrior_map[id];
        };
        combatscene.prototype.get_warrior_avatar = function (id) {
            var wobj = this.get_warrior(id);
            if (wobj == null) {
                return null;
            }
            return this.m_render.getunit(wobj.roleid);
        };
        combatscene.prototype.get_warrior_avatarid = function (id) {
            var wobj = this.get_warrior(id);
            if (wobj == null) {
                return 0;
            }
            return wobj.roleid;
        };
        combatscene.prototype.onClick = function (e) {
            //
            var sx = e.stageX;
            var sy = e.stageY;
            sx = 0.5 * sx;
            sy = 0.5 * sy;
            //
            var spos = new laya.maths.Point(sx, sy);
            var wpos = this.m_render.stagepos2worldpos(spos);
            core.combat_tiplog("combatscene onClick ", e.stageX, e.stageY, wpos.x, wpos.y);
            //this.m_render.setcamerapos(wpos.x,wpos.y);
            //let obj:warrior = this.get_warrior(12);
            //let ra:core.renderavatar = this.m_render.getunit(obj.roleid);
            //ra.set_pos(wpos.x,wpos.y);
            //ra.set_name('w1_'+wpos.x+'_'+wpos.y);
        };
        combatscene.prototype._init_event = function () {
            this.register_event(combat.COMBATSCENE_ENTER, this.on_enter);
            this.register_event(combat.COMBATSCENE_CHANGELINEUP, this.on_change_lineup);
            this.register_event(combat.COMBATSCENE_QUIT, this.on_quit);
            this.register_event(combat.COMBATSCENE_POPNUMBER, this.on_popnumber);
            this.register_event(combat.COMBATSCENE_CRYOUT, this.on_cryout);
            this.register_event(combat.COMBATSCENE_ADDWARRIOR, this.on_addwarrior);
            this.register_event(combat.COMBATSCENE_ADDCLONEWARRIOR, this.on_addclonewarrior);
            this.register_event(combat.COMBATSCENE_INITWARRIOR, this.on_initwarrior);
            this.register_event(combat.COMBATSCENE_SETADORN, this.on_setadorn);
            this.register_event(combat.COMBATSCENE_DELWARRIOR, this.on_delwarrior);
            this.register_event(combat.COMBATSCENE_DELNINJA, this.on_delninja);
            this.register_event(combat.COMBATSCENE_ADDBUFF, this.on_addbuff);
            this.register_event(combat.COMBATSCENE_DELBUFF, this.on_delbuff);
            this.register_event(combat.COMBATSCENE_BUFFCD, this.on_buffcd);
            this.register_event(combat.COMBATSCENE_BUFFAUTOCD, this.on_buffautocd);
            this.register_event(combat.COMBATSCENE_WARRIORACTION, this.on_warrioraction);
            this.register_event(combat.COMBATSCENE_WARRIORDEAD, this.on_warriordead);
            this.register_event(combat.COMBATSCENE_WARRIORDEADVANISH, this.on_warriordeadvanish);
            this.register_event(combat.COMBATSCENE_WARRIORFLY, this.on_warriorfly);
            this.register_event(combat.COMBATSCENE_WARRIORREVIVE, this.on_warriorrevive);
            this.register_event(combat.COMBATSCENE_WARRIORDEFEND, this.on_warriordefend);
            this.register_event(combat.COMBATSCENE_WARRIORDODGE, this.on_warriordodge);
            this.register_event(combat.COMBATSCENE_WARRIORATTACKED, this.on_warriorattacked);
            this.register_event(combat.COMBATSCENE_WARRIORBACKMOVE, this.on_warriorbackmove);
            this.register_event(combat.COMBATSCENE_WARRIORSETPOS, this.on_warriorsetpos);
            this.register_event(combat.COMBATSCENE_WARRIORMOVE, this.on_warriormove);
            this.register_event(combat.COMBATSCENE_WARRIORMOVEBACK, this.on_warriormoveback);
            this.register_event(combat.COMBATSCENE_WARRIORMOVE2WARRIOR, this.on_warriormove2warrior);
            this.register_event(combat.COMBATSCENE_EFFECT, this.on_effect);
            this.register_event(combat.COMBATSCENE_EFFECT_SCREENPOS, this.on_effect_screenpos);
            this.register_event(combat.COMBATSCENE_EFFECT2W, this.on_effect2w);
            this.register_event(combat.COMBATSCENE_ACTIONBEGIN, this.on_actionbegin);
            this.register_event(combat.COMBATSCENE_ACTIONEND, this.on_actionend);
            this.register_event(combat.COMBATSCENE_WARRIORDIR, this.on_warriordir);
            this.register_event(combat.COMBATSCENE_WARRIORDIR2W, this.on_warriordir2w);
            this.register_event(combat.COMBATSCENE_WARRIORREADY, this.on_warriorready);
            this.register_event(combat.COMBATSCENE_SETHP, this.on_sethp);
            this.register_event(combat.COMBATSCENE_BLACKSCENE, this.on_blackscene);
            this.register_event(combat.COMBATSCENE_CUSTOMEVENT, this.on_customevent);
        };
        combatscene.prototype.on_actionend = function (user_data) {
        };
        combatscene.prototype.on_actionbegin = function (user_data) {
        };
        combatscene.prototype.clearallwarrior = function () {
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_waction_list.length = 0;
            for (var i in this.m_warrior_map) {
                if (this.m_warrior_map.hasOwnProperty(i)) {
                    var wdata = this.m_warrior_map[i];
                    if (wdata != null) {
                        var wrolea = this.m_render.getunit(wdata.roleid);
                        if (wrolea != null) {
                            laya.utils.Tween.clearAll(wrolea);
                        }
                        this.m_render.delunit(wdata.roleid);
                    }
                }
            }
            this.m_warrior_map = new Object();
        };
        combatscene.prototype.init_bk_htmlcanvas = function (hc, w, h) {
            this.clear_bk_htmlcanvas();
            if (hc == null) {
                return;
            }
            this.m_bk_htmlcanvas = hc;
            this.m_bk_htmltexture = new Laya.Texture(this.m_bk_htmlcanvas);
            this.m_bk_sp = new Laya.Sprite();
            this.m_bk_sp.graphics.fillTexture(this.m_bk_htmltexture, 0, 0, w, h, "no-repeat");
        };
        combatscene.prototype.clear_bk_htmlcanvas = function () {
            if (this.m_bk_sp != null) {
                this.m_bk_sp.graphics.clear();
                this.m_bk_sp.destroy(true);
                this.m_bk_sp = null;
            }
            if (this.m_bk_htmlcanvas != null) {
                this.m_bk_htmlcanvas.clear();
                this.m_bk_htmlcanvas.releaseResource(true);
                this.m_bk_htmlcanvas.destroy();
                this.m_bk_htmltexture.destroy(true);
                this.m_bk_htmlcanvas = null;
                this.m_bk_htmltexture = null;
            }
        };
        combatscene.prototype.on_change_lineup = function (user_data) {
            this.clear_lineupsp();
            var path = user_data[0];
            var dx = user_data[1];
            var dy = user_data[2];
            core.combat_tiplog('combatscene on_change_lineup ', path, dx, dy);
            var ret = utils.getitembycls("combat_lineup", combat.combat_lineup);
            ret.re_init();
            ret.set_respath(path, dx, dy);
            ret.m_obj_id = this.m_render.addsprite(ret, this.m_pos_centerx, this.m_pos_centery, false);
            this.m_lineupsp = ret;
        };
        combatscene.prototype.clear_lineupsp = function () {
            if (this.m_lineupsp != null) {
                this.m_render.delsprite(this.m_lineupsp.m_obj_id);
                this.m_lineupsp.dispose();
                this.m_lineupsp = null;
            }
        };
        combatscene.prototype.set_viewport = function (w, h) {
            this.m_view_w = w;
            this.m_view_h = h;
            this.m_render.setviewport(w, h);
        };
        combatscene.prototype.on_enter = function (user_data) {
            //this.m_render.setmapbk(this.m_map);
            var hc = user_data[0];
            var w = user_data[1];
            var h = user_data[2];
            var x = user_data[3];
            var y = user_data[4];
            var sid = user_data[5];
            var s_res = user_data[6];
            this.m_render.clearmapbksp();
            this.m_camera_x = (this.m_mw >> 1);
            this.m_camera_y = (this.m_mh >> 1);
            this.m_pos_centerx = this.m_camera_x + this.m_pos_centerdx;
            this.m_pos_centery = this.m_camera_y + this.m_pos_centerdy;
            if (hc != null) {
                this.init_bk_htmlcanvas(hc, w, h);
                this.m_render.setmapbksp(this.m_bk_sp);
                this.m_bk_sp.x = this.m_camera_x - x;
                this.m_bk_sp.y = this.m_camera_y - y;
            }
            else {
                if (sid == 0) {
                    this.m_render.setmapbk(this.m_map);
                }
                else {
                    var b_slot = s_res == null;
                    this.m_render.entermap(sid, b_slot);
                    if (!b_slot) {
                        this.m_render.setmapbk(s_res);
                    }
                    this.m_camera_x = x;
                    this.m_camera_y = y;
                    this.m_pos_centerx = this.m_camera_x + this.m_pos_centerdx;
                    this.m_pos_centery = this.m_camera_y + this.m_pos_centerdy;
                }
            }
            this._init_pos_map();
            core.combat_tiplog("combatscene on_enter setcamerapos ", this.m_mw >> 1, this.m_mh >> 1);
            this.m_render.setcamerapos(this.m_camera_x, this.m_camera_y);
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_waction_list.length = 0;
            this.m_render.show_map_mask(true, 0.5);
            //this.m_render.set_map_filter([
            //    new Laya.ColorFilter([0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0]),
            //]);
        };
        combatscene.prototype.on_quit = function (user_data) {
        };
        combatscene.prototype.on_setadorn = function (user_data) {
            var wid = user_data[0];
            var pos = user_data[1];
            var aid = user_data[2];
            if (this.get_warrior(wid) != null) {
                var wavatar = this.get_warrior_avatar(wid);
                if (wavatar != null) {
                    switch (pos) {
                        case 0:
                            wavatar.change_shape(aid);
                            break;
                        case 1:
                            wavatar.change_weapon(aid);
                            break;
                        case 2:
                            wavatar.change_wing(aid);
                            break;
                        case 3:
                            wavatar.change_ride(aid[0], aid[1]);
                            if (aid[0] != 0) {
                                wavatar.set_ride_h(30);
                                if (aid.length > 2) {
                                    wavatar.set_ride_h(aid[2]);
                                }
                            }
                            else {
                                wavatar.set_ride_h(30);
                            }
                            break;
                        case 4:
                            wavatar.change_hair(aid);
                            break;
                        case 5:
                            wavatar.change_aura(aid);
                            break;
                        case 6:
                            wavatar.change_title(aid);
                            break;
                        case 7:
                            var fid = aid;
                            this.m_render.clear_all_follow(wid);
                            if (fid != 0) {
                                var pid = this.get_warrior_avatarid(wid);
                                var chase_id = this.m_render.addunit("", fid, 0, 0);
                                this.m_render.set_follow_id(chase_id, pid);
                                var chase_role = this.m_render.getunit(chase_id);
                                chase_role.set_dxy(0, -100);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        combatscene.prototype.get_posid_bywid = function (wid) {
            var wdata = this.get_warrior(wid);
            if (wdata != null) {
                return wdata.pos;
            }
            return wid;
        };
        combatscene.prototype.on_initwarrior = function (user_data) {
            var arr = user_data;
            core.combat_tiplog('combatscene initwarrior ', arr);
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var i = arr_1[_i];
                this.on_addwarrior(i);
            }
        };
        combatscene.prototype.on_addclonewarrior = function (user_data) {
            core.combat_tiplog('combatscene on_addclonewarrior ', user_data);
            var src = user_data["src"];
            var dst = user_data["dst"];
            var x = user_data["x"];
            var y = user_data["y"];
            var dir = user_data["dir"];
            if (this.get_warrior(src) == null) {
                core.combat_errlog("on_addclonewarrior have not this warrior ", src, dst);
                return;
            }
            if (this.get_warrior(dst) != null) {
                this.on_delwarrior(dst);
            }
            var wdata = this.get_warrior(src);
            var new_data = new combat.warrior();
            wdata.clone_data(new_data);
            new_data.id = dst;
            new_data.roleid = this._add_warrior_ins(new_data, x, y);
            this.m_warrior_map[new_data.id] = new_data;
            //
            var wrolea = this.m_render.getunit(new_data.roleid);
            wrolea.change_action(2 /* ACTION_READY */);
            wrolea.change_dir(dir);
            //
        };
        combatscene.prototype._add_warrior_ins = function (wdata, x, y) {
            core.combat_tiplog('combatscene _add_warrior_ins ', wdata.id, x, y);
            var wrolea = null;
            wdata.roleid = this.m_render.addunit(wdata.name, wdata.shape, x, y);
            wrolea = this.m_render.getunit(wdata.roleid);
            wrolea.set_scale(wdata.scale, wdata.scale);
            var v = wdata.m_desc[0];
            if (v != 0) {
                wrolea.change_shape(v);
            }
            v = wdata.m_desc[1];
            if (v != 0) {
                wrolea.change_weapon(v);
            }
            v = wdata.m_desc[2];
            if (v != 0) {
                wrolea.change_wing(v);
            }
            v = wdata.m_desc[3]; //fairy
            if (v != 0) {
                var chase_id = this.m_render.addunit("", v, 0, 0);
                this.m_render.set_follow_id(chase_id, wdata.roleid);
                var chase_role = this.m_render.getunit(chase_id);
                chase_role.set_dxy(0, -100);
            }
            v = wdata.m_desc[4]; //aura
            if (v != 0) {
                wrolea.change_aura(v);
            }
            v = wdata.m_desc[5]; //title
            if (v != 0) {
                wrolea.change_title(v);
            }
            v = wdata.m_desc[6]; //ride
            if (v != 0) {
                var vb = wdata.m_desc[7];
                var rh = wdata.m_desc[8];
                if (rh == 0) {
                    rh = 30;
                }
                wrolea.change_ride(v, vb);
                wrolea.set_ride_h(rh);
            }
            else {
                wrolea.set_ride_h(30);
            }
            return wdata.roleid;
        };
        combatscene.prototype.on_addwarrior = function (user_data) {
            var wdata = user_data;
            var wrolea = null;
            if (this.get_warrior(wdata.id) != null) {
                wrolea = this.m_render.getunit(this.get_warrior(wdata.id).roleid);
                if (wrolea != null) {
                    laya.utils.Tween.clearAll(wrolea);
                }
                this.m_render.delunit(this.get_warrior(wdata.id).roleid);
            }
            var pos = this.get_pos(wdata.pos);
            var dir = this.get_dir(wdata.pos);
            //
            core.combat_tiplog('combatscene addwarrior ', wdata.id, pos.x, pos.y, dir);
            wdata.roleid = this._add_warrior_ins(wdata, pos.x, pos.y);
            //
            this.m_warrior_map[wdata.id] = wdata;
            if (wdata.b_dead) {
                this.on_warriordead({ "src": wdata.id });
            }
            else {
                this.on_warriorready({ "src": wdata.id });
            }
            //let ra:core.renderavatar = this.m_render.getunit(wdata.roleid);
        };
        combatscene.prototype.on_delninja = function (user_data) {
            var id = user_data;
            core.combat_tiplog('combatscene on_delninja ', id);
            for (var _i = 0, _a = Object.keys(this.m_warrior_map); _i < _a.length; _i++) {
                var k = _a[_i];
                if (this.m_warrior_map.hasOwnProperty(k)) {
                    var tid = parseInt(k);
                    if (tid >= id) {
                        this.on_delwarrior(tid);
                    }
                }
            }
        };
        combatscene.prototype.on_delwarrior = function (user_data) {
            var id = user_data;
            core.combat_tiplog('combatscene on_delwarrior ', id);
            this._del_waction_obj(id);
            if (this.get_warrior(id) != null) {
                var wrolea = this.m_render.getunit(this.get_warrior(id).roleid);
                if (wrolea != null) {
                    laya.utils.Tween.clearAll(wrolea);
                }
                this.m_render.delunit(this.get_warrior(id).roleid);
                this.m_warrior_map[id] = null;
            }
        };
        combatscene.prototype._add_waction_obj = function (obj) {
            this._del_waction_obj(obj.m_id);
            this.m_waction_list.push(obj);
            return true;
        };
        combatscene.prototype._del_waction_obj = function (id) {
            var idx = 0;
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == id) {
                    i.dispose();
                    this.m_waction_list.splice(idx, 1);
                    return;
                }
                idx += 1;
            }
        };
        combatscene.prototype.on_warrioraction = function (user_data) {
            var src = user_data["src"];
            var actionid = user_data["actionid"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            this.m_render.unit_stop(wavatar.m_obj_id);
            wavatar.change_action(actionid, false, 0);
        };
        combatscene.prototype.on_addbuff = function (user_data) {
            //todo
            var src = user_data["src"];
            var id = user_data["buffid"];
            var shape = user_data["shape"];
            var buffeffid = user_data["buffeffid"];
            var cd = user_data["cd"];
            var overlap = user_data["overlay"];
            var datas = user_data["datas"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar != null) {
                var buffui = wavatar.get_buffui();
                var effid = 0;
                if (buffui.getbuff(id) == null) {
                    effid = wavatar.add_buffeff(buffeffid);
                }
                else {
                    effid = buffui.getbuff(id).m_effid;
                }
                buffui.addbuff(id, shape, cd, overlap, datas, effid);
            }
        };
        combatscene.prototype.on_delbuff = function (user_data) {
            //todo
            var src = user_data["src"];
            var id = user_data["buffid"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar != null) {
                var buffui = wavatar.get_buffui();
                var b = buffui.getbuff(id);
                if (b != null) {
                    wavatar.del_buffeff(b.m_effid);
                    buffui.delbuff(id);
                }
            }
        };
        combatscene.prototype.on_buffcd = function (user_data) {
            //todo
            var src = user_data["src"];
            var id = user_data["buffid"];
            var cd = user_data["cd"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar != null) {
                var buffui = wavatar.get_buffui();
                var buffins = buffui.getbuff(id);
                if (buffins != null) {
                    buffins.set_cd(cd);
                }
            }
        };
        combatscene.prototype.on_buffautocd = function (user_data) {
            //todo
            for (var i in this.m_warrior_map) {
                if (this.m_warrior_map.hasOwnProperty(i)) {
                    var wdata = this.m_warrior_map[i];
                    if (wdata != null) {
                        var wavatar = this.m_render.getunit(wdata.roleid);
                        if (wavatar != null) {
                            var buffui = wavatar.get_buffui();
                            buffui.buffautocd();
                        }
                    }
                }
            }
        };
        combatscene.prototype.on_cryout = function (user_data) {
            var src = user_data["src"];
            var v = user_data["content"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            var cn = this._get_combatcryout(v);
            cn.start();
            var x = wavatar.x;
            var y = wavatar.y;
            cn.m_obj_id = this.m_render.addsprite(cn, x, y);
            this.m_cryout_list.push(cn);
        };
        combatscene.prototype.clearallcryout = function () {
            for (var _i = 0, _a = this.m_cryout_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render.delsprite(i.m_obj_id);
            }
            this.m_cryout_list.length = 0;
        };
        combatscene.prototype.on_popnumber = function (user_data) {
            //todo
            var src = user_data["src"];
            var tp = user_data["type"];
            var v = user_data["damage"];
            var b_crack = user_data["crack"];
            if (b_crack) {
                tp = combat.DAMAGETYPE_CRACK;
            }
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            var cn;
            if (tp == combat.DAMAGETYPE_CRACK) {
                cn = this._get_combatcrack(v, tp);
            }
            else {
                cn = this._get_combatnum(v, tp);
            }
            cn.start();
            var x = wavatar.x;
            var y = wavatar.y;
            cn.m_obj_id = this.m_render.addsprite(cn, x, y);
            this.m_numpic_list.push(cn);
        };
        combatscene.prototype.on_warriorfly = function (user_data) {
            //todo
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorfly error!have not this role ", src);
                return;
            }
            var fly_a = utils.getitembycls("fly_action", fly_action);
            fly_a.re_init();
            fly_a.m_id = src;
            fly_a.m_warrior = wavatar;
            var gap = 0;
            fly_a.m_lt_pt.x = this.m_camera_x - this.m_view_w / 2 - gap;
            fly_a.m_lt_pt.y = this.m_camera_y - this.m_view_h / 2 - gap;
            fly_a.m_rb_pt.x = this.m_camera_x + this.m_view_w / 2 + gap;
            fly_a.m_rb_pt.y = this.m_camera_y + this.m_view_h / 2 + gap;
            fly_a.m_start_pt.x = wavatar.x;
            fly_a.m_start_pt.y = wavatar.y;
            if (this.is_downteam(this.get_posid_bywid(src))) {
                fly_a.m_from_pt.x = wavatar.x - this.m_pos_dx;
                fly_a.m_from_pt.y = wavatar.y - this.m_pos_dy;
            }
            else {
                fly_a.m_from_pt.x = wavatar.x + this.m_pos_dx;
                fly_a.m_from_pt.y = wavatar.y + this.m_pos_dy;
            }
            fly_a.start(utils.get_render_milltm());
            this._add_waction_obj(fly_a);
            //this.m_waction_list.push(fly_a);
        };
        combatscene.prototype.on_warriordeadvanish = function (user_data) {
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            wobj.b_dead = true;
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriordeadvanish error!have not this guy!", src);
                return;
            }
            var d_a = utils.getitembycls("dead_action", dead_action);
            d_a.re_init();
            d_a.m_id = src;
            d_a.m_warrior = wavatar;
            d_a.start(utils.get_render_milltm());
            this._add_waction_obj(d_a);
        };
        combatscene.prototype.on_warriordead = function (user_data) {
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            wobj.b_dead = true;
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriordead error!have not this guy!", src);
                return;
            }
            wavatar.change_action(5 /* ACTION_DEAD */, false);
            //let d_a:dead_action = utils.getitembycls("dead_action",dead_action);
            //d_a.re_init();
            //d_a.m_id = src;
            //d_a.m_warrior = wavatar;
            //d_a.start(utils.get_render_milltm());
            //this._add_waction_obj(d_a);
        };
        combatscene.prototype.on_warriorrevive = function (user_data) {
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            wobj.b_dead = true;
            this.on_warriorready({ "src": src });
        };
        combatscene.prototype.on_warriordodge = function (user_data) {
            var src = user_data["src"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            var x = wavatar.x;
            var y = wavatar.y;
            if (this.is_downteam(this.get_posid_bywid(src))) {
                x += this.m_pos_dx;
                y += this.m_pos_dy;
            }
            else {
                x -= this.m_pos_dx;
                y -= this.m_pos_dy;
            }
            laya.utils.Tween.to(wavatar, { set_x: x, set_y: y }, 500, laya.utils.Ease.strongOut);
            var cn = this._get_combatnum(0, combat.DAMAGETYPE_DODGE);
            cn.start();
            var x1 = wavatar.x - (cn.m_w >> 1);
            var y1 = wavatar.y - 100;
            cn.m_obj_id = this.m_render.addsprite(cn, x1, y1);
            this.m_numpic_list.push(cn);
        };
        combatscene.prototype.clearallnumpic = function () {
            for (var _i = 0, _a = this.m_numpic_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render.delsprite(i.m_obj_id);
            }
            this.m_numpic_list.length = 0;
        };
        combatscene.prototype.on_warriorsetpos = function (user_data) {
            var src = user_data["src"];
            var x = user_data["x"];
            var y = user_data["y"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorsetpos error!have not this guy!", src);
                return;
            }
            wavatar.set_pos(x, y);
        };
        combatscene.prototype.on_warriorbackmove = function (user_data) {
            var src = user_data["src"];
            var dst = user_data["dst"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorbackmove error!have not this guy!", src);
                return;
            }
            var x = wavatar.x;
            var y = wavatar.y;
            if (this.is_downteam(this.get_posid_bywid(src))) {
                x += this.m_pos_dx * dst;
                y += this.m_pos_dy * dst;
            }
            else {
                x -= this.m_pos_dx * dst;
                y -= this.m_pos_dy * dst;
            }
            laya.utils.Tween.to(wavatar, { set_x: x, set_y: y }, 500, laya.utils.Ease.elasticOut);
        };
        combatscene.prototype.on_warriorattacked = function (user_data) {
            var src = user_data["src"];
            var stopf = user_data["stopf"];
            var bcycle = true;
            if (stopf != undefined && stopf != null) {
                bcycle = false;
            }
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorattacked error!have not this guy!", src);
                return;
            }
            wavatar.change_action(4 /* ACTION_ATTACKED */, bcycle, stopf);
        };
        combatscene.prototype.on_warriordefend = function (user_data) {
            var src = user_data["src"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            wavatar.change_action(6 /* ACTION_DEFEND */);
        };
        combatscene.prototype.on_warriorready = function (user_data) {
            var src = user_data["src"];
            core.combat_tiplog("combatscene warrior ready ", src);
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            laya.utils.Tween.clearAll(wavatar);
            wavatar.change_action(2 /* ACTION_READY */);
            var pos = this.get_pos(this.get_posid_bywid(src));
            var dir = this.get_dir(this.get_posid_bywid(src));
            wavatar.change_dir(dir);
            wavatar.set_pos(pos.x, pos.y);
        };
        combatscene.prototype.on_sethp = function (user_data) {
            var hpins = user_data;
            core.combat_tiplog("combatscene on_sethp ", hpins.id, hpins.hp, hpins.hpmax);
            var wavatar = this.get_warrior_avatar(hpins.id);
            if (wavatar == null) {
                return;
            }
            wavatar.set_hp(hpins.hp, hpins.hpmax);
        };
        combatscene.prototype.on_warriormove = function (user_data) {
            var src = user_data["src"];
            var x = user_data["x"];
            var y = user_data["y"];
            this.m_render.unit_walk2(this.get_warrior_avatarid(src), x, y, true, true);
            var fdir = -1;
            if (user_data["forcedir"] != null) {
                fdir = user_data["forcedir"];
                var p = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if (p != null) {
                    p.m_force_dir = fdir;
                }
            }
        };
        combatscene.prototype.on_warriormoveback = function (user_data) {
            var src = user_data["src"];
            var pos = this.get_pos(this.get_posid_bywid(src));
            this.m_render.unit_walk2(this.get_warrior_avatarid(src), pos.x, pos.y, true, true);
            var fdir = -1;
            if (user_data["forcedir"] != null) {
                fdir = user_data["forcedir"];
                var p = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if (p != null) {
                    p.m_force_dir = fdir;
                }
            }
        };
        combatscene.prototype.on_warriormove2warrior = function (user_data) {
            var src = user_data["src"];
            var dst = user_data["dst"];
            var pos = this.get_pos(this.get_posid_bywid(dst));
            if (this.is_downteam(this.get_posid_bywid(src))) {
                pos.x += this.m_pos_dx;
                pos.y += this.m_pos_dy;
            }
            else {
                pos.x -= this.m_pos_dx;
                pos.y -= this.m_pos_dy;
            }
            this.m_render.unit_walk2(this.get_warrior_avatarid(src), pos.x, pos.y, true, true);
            var fdir = -1;
            if (user_data["forcedir"] != null) {
                fdir = user_data["forcedir"];
                var p = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if (p != null) {
                    p.m_force_dir = fdir;
                }
            }
        };
        combatscene.prototype.on_warriordir2w = function (user_data) {
            var src = user_data["src"];
            var dst = user_data["dst"];
            var srcavatar = this.m_render.getunit(this.get_warrior_avatarid(src));
            var dstavatar = this.m_render.getunit(this.get_warrior_avatarid(dst));
            if (srcavatar == null || dstavatar == null) {
                return;
            }
            var dir = utils.gendir(dstavatar.x - srcavatar.x, dstavatar.y - srcavatar.y);
            srcavatar.change_dir(dir);
        };
        combatscene.prototype.on_warriordir = function (user_data) {
            var src = user_data["src"];
            var dir = user_data["dir"];
            var wavatar = this.m_render.getunit(this.get_warrior_avatarid(src));
            if (wavatar == null) {
                return;
            }
            wavatar.change_dir(dir);
        };
        combatscene.prototype.on_effect_screenpos = function (user_data) {
            var effectid = user_data["effectid"];
            var x = user_data["x"];
            var y = user_data["y"];
            var pos = this.m_render.stagepos2worldpos(new Laya.Point(x, y));
            this.m_render.addeff(effectid, pos.x, pos.y, false, true);
        };
        combatscene.prototype.on_effect = function (user_data) {
            var effectid = user_data["effectid"];
            var x = user_data["x"];
            var y = user_data["y"];
            this.m_render.addeff(effectid, x, y, false, true);
        };
        combatscene.prototype.on_effect2w = function (user_data) {
            var effectid = user_data["effectid"];
            var srcid = user_data["src"];
            var wavatar = this.get_warrior_avatar(srcid);
            if (wavatar == null) {
                return;
            }
            var x = wavatar.x;
            var y = wavatar.y;
            this.m_render.addeff(effectid, x, y, false, true);
        };
        combatscene.prototype.on_customevent = function (user_data) {
            core.combat_tiplog("combatscene customevent ", user_data);
            utils.event_ins().fire_event_next_frame(user_data[0], user_data[1]);
        };
        combatscene.prototype.on_blackscene = function (user_data) {
            var tm = user_data["tm"];
            this.m_render.blackscene(tm);
        };
        combatscene.prototype.is_downteambywid = function (wid, self_group) {
            var pos = wid;
            if (self_group != 0) {
                if (pos <= 12) {
                    pos += 20;
                }
                else {
                    pos -= 20;
                }
            }
            return this.is_downteam(pos);
        };
        combatscene.prototype.is_downteam = function (id) {
            if (id <= 12) {
                return true;
            }
            return false;
        };
        combatscene.prototype.mgr = function () {
            return this.m_combat_mgr;
        };
        combatscene.prototype.register_event = function (event, func) {
            this.mgr().register_event(event, this);
            this.register_event_func(event, func);
        };
        combatscene.prototype.unregister_event = function (event) {
            this.mgr().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        combatscene.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            this.mgr().fire_event(event, user_data);
        };
        combatscene.prototype.unregister_allevent = function () {
            this.mgr().unregister_allevent(this);
            this.unregister_all_event_func();
        };
        combatscene.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            this.mgr().fire_event_next_frame(event, user_data);
        };
        combatscene.prototype.start = function () {
        };
        combatscene.prototype._get_combatnum = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            var ret = utils.getitembycls("combat_number", combat.combat_number);
            ret.re_init(v, tp, content);
            return ret;
        };
        combatscene.prototype._get_combatcrack = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            var ret = utils.getitembycls("combat_crack", combat.combat_crack);
            ret.re_init(v, tp, content);
            return ret;
        };
        combatscene.prototype._get_combatcryout = function (content) {
            if (content === void 0) { content = ""; }
            var ret = utils.getitembycls("combat_cryout", combat.combat_cryout);
            ret.re_init(content);
            return ret;
        };
        combatscene.prototype.clear = function () {
            this.clear_bk_htmlcanvas();
            this.clearallwarrior();
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_waction_list.length = 0;
            this.clear_lineupsp();
            this.clearallnumpic();
            this.clearallcryout();
            this.m_render.clearmapbksp();
            this.m_render.clear();
        };
        combatscene.prototype.update = function (delta) {
            this.m_tempnumpic_list.length = 0;
            for (var _i = 0, _a = this.m_numpic_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.is_end()) {
                    i.dispose();
                    this.m_render.delsprite(i.m_obj_id);
                }
                else {
                    i.tick(delta);
                    this.m_tempnumpic_list.push(i);
                }
            }
            var temp = this.m_numpic_list;
            this.m_numpic_list = this.m_tempnumpic_list;
            this.m_tempnumpic_list = temp;
            //
            this.m_tempcryout_list.length = 0;
            for (var _b = 0, _c = this.m_cryout_list; _b < _c.length; _b++) {
                var i = _c[_b];
                if (i.is_end()) {
                    i.dispose();
                    this.m_render.delsprite(i.m_obj_id);
                }
                else {
                    i.tick(delta);
                    this.m_tempcryout_list.push(i);
                }
            }
            var temp1 = this.m_cryout_list;
            this.m_cryout_list = this.m_tempcryout_list;
            this.m_tempcryout_list = temp1;
            //
            for (var i = this.m_waction_list.length - 1; i >= 0; --i) {
                var wa = this.m_waction_list[i];
                wa.update(delta);
                if (wa.is_end()) {
                    wa.dispose();
                    this.m_waction_list.splice(i, 1);
                }
            }
            this.m_render.update(delta);
        };
        combatscene.prototype.render = function () {
            this.m_render.render();
        };
        combatscene.prototype.dispose = function () {
            this.clear();
            if (this.m_render != null) {
                this.m_render.dispose();
                this.m_render = null;
            }
            this.m_combat_mgr = null;
            _super.prototype.dispose.call(this);
            this.unregister_allevent();
        };
        return combatscene;
    }(utils.game_event_receiver));
    combat.combatscene = combatscene;
})(combat || (combat = {}));
//# sourceMappingURL=combatscene.js.map
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
            var srcud = { "src": src, "x": -1000, "y": -1000 };
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
var combat;
(function (combat) {
    combat.COMBATSCENE_ENTER = "combatscene_enter";
    combat.COMBATSCENE_CHANGELINEUP = "combatscene_changelineup";
    combat.COMBATSCENE_QUIT = "combatscene_quit";
    combat.COMBATSCENE_POPNUMBER = "combatscene_popnumber";
    combat.COMBATSCENE_ADDWARRIOR = "combatscene_addwarrior";
    combat.COMBATSCENE_ADDCLONEWARRIOR = "combatscene_addclonewarrior";
    combat.COMBATSCENE_INITWARRIOR = "combatscene_initwarrior";
    combat.COMBATSCENE_SETADORN = "combatscene_setadorn";
    combat.COMBATSCENE_DELWARRIOR = "combatscene_delwarrior";
    combat.COMBATSCENE_DELNINJA = "combatscene_delninja";
    combat.COMBATSCENE_ADDBUFF = "combatscene_addbuff";
    combat.COMBATSCENE_DELBUFF = "combatscene_delbuff";
    combat.COMBATSCENE_BUFFCD = "combatscene_buffcd";
    combat.COMBATSCENE_BUFFAUTOCD = "combatscene_buffautocd";
    combat.COMBATSCENE_WARRIORACTION = "combatscene_warrioraction";
    combat.COMBATSCENE_WARRIORDEAD = "combatscene_warriordead";
    combat.COMBATSCENE_WARRIORDEADVANISH = "combatscene_warriordeadvanish";
    combat.COMBATSCENE_WARRIORFLY = "combatscene_warriorfly";
    combat.COMBATSCENE_WARRIORREVIVE = "combatscene_warriorrevive";
    combat.COMBATSCENE_WARRIORDODGE = "combatscene_warriordodge";
    combat.COMBATSCENE_WARRIORDEFEND = "combatscene_warriordefend";
    combat.COMBATSCENE_WARRIORATTACKED = "combatscene_warriorattacked";
    combat.COMBATSCENE_WARRIORBACKMOVE = "combatscene_warriorbackmove";
    combat.COMBATSCENE_WARRIORMOVE = "combatscene_warriormove";
    combat.COMBATSCENE_WARRIORSETPOS = "combatscene_warriorsetpos";
    combat.COMBATSCENE_WARRIORMOVEBACK = "combatscene_warriormoveback";
    combat.COMBATSCENE_WARRIORMOVE2WARRIOR = "combatscene_warriormove2warrior";
    combat.COMBATSCENE_WARRIORDIR = "combatscene_warriordir";
    combat.COMBATSCENE_WARRIORDIR2W = "combatscene_warriordir2w";
    combat.COMBATSCENE_EFFECT = "combatscene_effect";
    combat.COMBATSCENE_EFFECT_SCREENPOS = "combatscene_effect_screenpos";
    combat.COMBATSCENE_EFFECT2W = "combatscene_effect2w";
    combat.COMBATSCENE_WARRIORREADY = "combatscene_warriorready";
    combat.COMBATSCENE_ACTIONBEGIN = "combatscene_actionbegin";
    combat.COMBATSCENE_ACTIONEND = "combatscene_actionend";
    combat.COMBATSCENE_EMPTY = "combatscene_empty";
    combat.COMBATSCENE_SETHP = "combatscene_sethp";
    combat.COMBATSCENE_CRYOUT = "combatscene_cryout";
    combat.COMBATSCENE_BLACKSCENE = "combatscene_blackscene";
    combat.COMBATSCENE_CUSTOMEVENT = "combatscene_customevent";
    combat.ACTION_INVALID = 0;
    combat.ACTION_ADDWARRIOR = 1;
    combat.ACTION_DELWARRIOR = 2;
    combat.ACTION_SKILL = 3;
    combat.ACTION_ADDBUFF = 4;
    combat.ACTION_DELBUFF = 5;
    combat.ACTION_BUFFCD = 6;
    combat.ACTION_BUFFAUTOCD = 7;
    combat.ACTION_PROPCHANGE = 8;
    combat.ACTION_END = 9;
    combat.ACTION_ENTER = 10;
    combat.ACTION_SETHP = 11;
    combat.ACTION_SETWARRIORADORN = 12;
    combat.ACTION_CUSTOMEVENT = 13;
    combat.ACTION_INITWARRIORS = 14;
    combat.ACTION_INITWARRIORHPS = 15;
    combat.ACTION_CHANGELINEUP = 16;
    combat.DAMAGETYPE_HP_SUB = 0;
    combat.DAMAGETYPE_HP_ADD = 1;
    combat.DAMAGETYPE_CRACK = 6;
    combat.DAMAGETYPE_DODGE = 2;
    combat.DAMAGETYPE_SHAKE = 3;
    combat.DAMAGETYPE_COUNTERATK = 4;
    combat.DAMAGETYPE_CRYOUT = 5;
})(combat || (combat = {}));
//# sourceMappingURL=combat_enum.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var combat;
(function (combat) {
    var combat_number_sp = /** @class */ (function (_super) {
        __extends(combat_number_sp, _super);
        function combat_number_sp() {
            var _this = _super.call(this) || this;
            _this.m_value = 0;
            _this.m_root = "combat_num/";
            _this.m_prex = "damage_";
            _this.m_w = 0;
            _this.m_h = 0;
            _this.m_type = combat.DAMAGETYPE_HP_SUB;
            _this.m_text = null;
            return _this;
        }
        combat_number_sp.prototype.re_init = function (tp) {
            this.m_type = tp;
            if (this.m_type == combat.DAMAGETYPE_HP_ADD) {
                this.m_prex = "heal_";
            }
            else if (this.m_type == combat.DAMAGETYPE_CRACK) {
                //this.m_prex = "gearscore_";
                this.m_prex = "countdown_";
            }
            else {
                this.m_prex = "damage_";
            }
        };
        combat_number_sp.prototype.set_content = function (c) {
            this.release_pic();
            if (this.m_text == null) {
                this.m_text = new Laya.Label();
                this.m_text.color = "#0000ff";
                this.m_text.stroke = 1;
                this.m_text.strokeColor = "#ffffff";
                this.m_text.fontSize = 32;
                this.m_text.bold = true;
                this.m_text.align = "center";
                this.m_text.size(120, 40);
                this.addChild(this.m_text);
            }
            this.m_text.text = c;
            this.init_wh();
        };
        combat_number_sp.prototype.set_value = function (v) {
            this.m_value = v;
            this.release_pic();
            if (this.m_type == combat.DAMAGETYPE_DODGE) {
                if (this.m_value == 0) {
                    this.loadImage(this.m_root + "damage_shan.png");
                }
                else {
                    this.loadImage(this.m_root + "damage_bi.png");
                }
            }
            else if (this.m_type == combat.DAMAGETYPE_SHAKE) {
                if (this.m_text == null) {
                    this.m_text = new Laya.Label();
                    this.m_text.color = "#0000ff";
                    this.m_text.stroke = 1;
                    this.m_text.strokeColor = "#ffffff";
                    this.m_text.fontSize = 32;
                    this.m_text.bold = true;
                    this.m_text.align = "center";
                    this.m_text.size(120, 40);
                    this.addChild(this.m_text);
                }
                this.m_text.text = "反震";
            }
            else if (this.m_type == combat.DAMAGETYPE_COUNTERATK) {
                if (this.m_text == null) {
                    this.m_text = new Laya.Label();
                    this.m_text.color = "#0000ff";
                    this.m_text.stroke = 1;
                    this.m_text.strokeColor = "#ffffff";
                    this.m_text.fontSize = 32;
                    this.m_text.bold = true;
                    this.m_text.align = "center";
                    this.m_text.size(120, 40);
                    this.addChild(this.m_text);
                }
                this.m_text.text = "反击";
            }
            else {
                this.loadImage(this.m_root + this.m_prex + v.toString() + ".png");
            }
            this.init_wh();
        };
        combat_number_sp.prototype._init_cryout_wh = function () {
            this.m_w = 120;
            this.m_h = 40;
        };
        combat_number_sp.prototype._init_counteratk_wh = function () {
            this.m_w = 120;
            this.m_h = 40;
        };
        combat_number_sp.prototype._init_shake_wh = function () {
            this.m_w = 120;
            this.m_h = 40;
        };
        combat_number_sp.prototype._init_dodge_wh = function () {
            this.m_w = 32;
            this.m_h = 32;
        };
        combat_number_sp.prototype._init_sub_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 1:
                    this.m_w = 22;
                    this.m_h = 33;
                    break;
                case 2:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 3:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 4:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 5:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 6:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 7:
                    this.m_w = 34;
                    this.m_h = 36;
                    break;
                case 8:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 9:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                default:
                    break;
            }
        };
        combat_number_sp.prototype.init_add_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 1:
                    this.m_w = 18;
                    this.m_h = 31;
                    break;
                case 2:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 3:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 4:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 5:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 6:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 7:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 8:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 9:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                default:
                    break;
            }
        };
        combat_number_sp.prototype._init_countdown_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 1:
                    this.m_w = 32;
                    this.m_h = 47;
                    break;
                case 2:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 3:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 4:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 5:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                case 6:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 7:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                case 8:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 9:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                default:
                    break;
            }
            this.m_w -= 2;
        };
        combat_number_sp.prototype._init_crack_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 1:
                    this.m_w = 20;
                    this.m_h = 30;
                    break;
                case 2:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 3:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 4:
                    this.m_w = 30;
                    this.m_h = 30;
                    break;
                case 5:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 6:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 7:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 8:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 9:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                default:
                    break;
            }
        };
        combat_number_sp.prototype.init_wh = function () {
            if (this.m_type == combat.DAMAGETYPE_HP_ADD) {
                this.init_add_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_HP_SUB) {
                this._init_sub_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_DODGE) {
                this._init_dodge_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_SHAKE) {
                this._init_shake_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_CRYOUT) {
                this._init_cryout_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_COUNTERATK) {
                this._init_counteratk_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_CRACK) {
                this._init_countdown_wh();
                //this._init_crack_wh();
            }
        };
        combat_number_sp.prototype.release_pic = function () {
            this.removeChildren();
            if (this.m_text != null) {
                this.m_text = null;
            }
            this.graphics.clear();
        };
        combat_number_sp.prototype.dispose = function () {
            this.release_pic();
        };
        return combat_number_sp;
    }(laya.display.Sprite));
    combat.combat_number_sp = combat_number_sp;
    var combat_number = /** @class */ (function (_super) {
        __extends(combat_number, _super);
        function combat_number() {
            var _this = _super.call(this) || this;
            _this.m_value = 0;
            _this.m_type = 0;
            _this.m_life = 0;
            _this.m_obj_id = 0;
            _this.m_text = "";
            _this.m_sp_list = new Array();
            return _this;
        }
        combat_number.prototype.re_init = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            this.m_value = v;
            this.m_type = tp;
            this.m_sp_list.length = 0;
            this.m_text = content;
        };
        combat_number.prototype.release_allsp = function () {
            this.removeChildren();
            for (var _i = 0, _a = this.m_sp_list; _i < _a.length; _i++) {
                var i = _a[_i];
                laya.utils.Tween.clearAll(i);
                this._del_sp(i);
            }
            this.m_sp_list = new Array();
        };
        combat_number.prototype._get_sp = function (tp) {
            var ret = utils.getitembycls("combat_number_sp", combat_number_sp);
            ret.re_init(tp);
            return ret;
        };
        combat_number.prototype._del_sp = function (ins) {
            ins.dispose();
            utils.recover("combat_number_sp", ins);
        };
        combat_number.prototype.start = function () {
            this.release_allsp();
            var dx = 0;
            var idx = 0;
            var totalw = 0;
            var totalh = 200;
            if (this.m_type == combat.DAMAGETYPE_DODGE) {
                var shan = this._get_sp(this.m_type);
                shan.set_value(0);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 150;
                this.addChild(shan);
                laya.utils.Tween.to(shan, { y: 50 }, 300, laya.utils.Ease.elasticOut, null, 0);
                var bi = this._get_sp(this.m_type);
                bi.set_value(1);
                this.m_sp_list.push(bi);
                bi.x = shan.m_w;
                bi.y = 150;
                this.addChild(bi);
                laya.utils.Tween.to(bi, { y: 50 }, 300, laya.utils.Ease.elasticOut, null, 0);
                this.m_w = shan.m_w + bi.m_w;
                this.m_h = totalh;
                this.m_life = 500;
            }
            else if (this.m_type == combat.DAMAGETYPE_SHAKE || this.m_type == combat.DAMAGETYPE_COUNTERATK) {
                var shan = this._get_sp(this.m_type);
                shan.set_value(0);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 0;
                this.addChild(shan);
                laya.utils.Tween.from(shan, { y: -160 }, 300, laya.utils.Ease.elasticOut, null, 0);
                this.m_w = shan.m_w;
                this.m_h = totalh;
                this.m_life = 500;
            }
            else if (this.m_type == combat.DAMAGETYPE_CRYOUT) {
                var shan = this._get_sp(this.m_type);
                //shan.set_value(0);
                shan.set_content(this.m_text);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 0;
                this.addChild(shan);
                laya.utils.Tween.to(shan, { y: -50 }, 500, laya.utils.Ease.elasticOut, null, 0);
                this.m_w = shan.m_w;
                this.m_h = totalh;
                this.m_life = 700;
            }
            else {
                var v_str = this.m_value.toString();
                var duration = 300;
                var delta = 50;
                for (var _i = 0, v_str_1 = v_str; _i < v_str_1.length; _i++) {
                    var i = v_str_1[_i];
                    var snum = this._get_sp(this.m_type);
                    snum.set_value(parseInt(i));
                    this.m_sp_list.push(snum);
                    snum.x = dx;
                    snum.y = 0;
                    this.addChild(snum);
                    laya.utils.Tween.from(snum, { y: -50 }, duration, laya.utils.Ease.elasticOut, null, idx * delta);
                    idx += 1;
                    dx += snum.m_w;
                }
                this.m_life = (idx - 1) * delta + duration;
                totalw = dx;
                this.m_w = totalw;
                this.m_h = totalh;
            }
            this.y = -100;
            this.x = 0 - this.m_w / 2;
        };
        combat_number.prototype.tick = function (delta) {
            this.m_life -= delta;
        };
        combat_number.prototype.is_end = function () {
            return this.m_life <= 0;
        };
        combat_number.prototype.dispose = function () {
            this.release_allsp();
            utils.recover("combat_number", this);
        };
        combat_number.prototype.selfremove = function () {
        };
        return combat_number;
    }(core.renderspcontent));
    combat.combat_number = combat_number;
    //
    var combat_cryout = /** @class */ (function (_super) {
        __extends(combat_cryout, _super);
        function combat_cryout() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_life = 0;
            _this.m_obj_id = 0;
            _this.m_text = null;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_graphic = new laya.display.Animation();
            _this.m_text = new Laya.Label();
            _this.m_text.color = "#ffffff";
            _this.m_text.stroke = 1;
            _this.m_text.strokeColor = "#1794f9";
            _this.m_text.fontSize = 24;
            _this.m_text.align = "center";
            _this.m_text.font = "h5font";
            _this.m_text.x = -40;
            _this.m_text.y = -10;
            _this.m_text.size(120, 40);
            _this.addChild(_this.m_graphic);
            _this.addChild(_this.m_text);
            return _this;
        }
        combat_cryout.prototype.re_init = function (content) {
            if (content === void 0) { content = ""; }
            this.m_text.text = content;
            this.m_graphic.visible = false;
            this.m_text.visible = false;
        };
        combat_cryout.prototype.start = function () {
            this.m_text.visible = true;
            this.m_graphic.visible = true;
            this.m_graphic.loadAnimation("game_ani/combat/cryout.ani");
            this.m_graphic.stop();
            this.m_graphic.play(0, false, "ani1");
            this.m_graphic.gotoAndStop(0);
            this.m_life = 1500;
            this.y = -150;
            this.x = -20;
            this.m_framecount = 5;
            this.m_framespeed = 10;
            this.m_framecurrenttm = 0;
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
        };
        combat_cryout.prototype.tick = function (delta) {
            this.m_life -= delta;
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_framecurrenttm >= this.m_frametotalmillsec) {
                this.m_framecurrent = this.m_framecount - 1;
            }
            this.m_graphic.gotoAndStop(this.m_framecurrent);
        };
        combat_cryout.prototype.is_end = function () {
            return this.m_life <= 0;
        };
        combat_cryout.prototype.dispose = function () {
            utils.recover("combat_cryout", this);
        };
        combat_cryout.prototype.selfremove = function () {
        };
        return combat_cryout;
    }(core.renderspcontent));
    combat.combat_cryout = combat_cryout;
    //
    var combat_crack = /** @class */ (function (_super) {
        __extends(combat_crack, _super);
        function combat_crack() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_graphic = new laya.display.Animation();
            _this.addChild(_this.m_graphic);
            return _this;
        }
        combat_crack.prototype.re_init = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            _super.prototype.re_init.call(this, v, tp, content);
            this.m_graphic.visible = false;
            this.m_graphic.scale(2.0, 2.0);
        };
        combat_crack.prototype.start = function () {
            this.release_allsp();
            this.addChild(this.m_graphic);
            var v_str = this.m_value.toString();
            var dx = 0;
            var idx = 0;
            var totalh = 200;
            var totalw = 0;
            for (var _i = 0, v_str_2 = v_str; _i < v_str_2.length; _i++) {
                var i = v_str_2[_i];
                var snum = this._get_sp(this.m_type);
                snum.set_value(parseInt(i));
                this.m_sp_list.push(snum);
                snum.x = dx;
                snum.y = 0;
                this.addChild(snum);
                idx += 1;
                dx += snum.m_w;
                totalw += snum.m_w;
            }
            //
            this.m_graphic.visible = true;
            this.m_graphic.loadAnimation("game_ani/combat/crack.ani");
            this.m_graphic.stop();
            this.m_graphic.play(0, false, "ani1");
            this.m_graphic.gotoAndStop(0);
            this.m_framecount = 11;
            this.m_framespeed = 20;
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            //
            this.m_life = 800;
            this.m_w = totalw;
            this.m_h = totalh;
            this.y = -100;
            this.x = 0 - this.m_w / 2;
            this.m_graphic.x = this.m_w / 2;
            this.m_graphic.y = 20;
            this.m_framecurrenttm = 0;
        };
        combat_crack.prototype.tick = function (delta) {
            this.m_life -= delta;
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_framecurrenttm >= this.m_frametotalmillsec) {
                this.m_framecurrent = this.m_framecount - 1;
                this.m_graphic.visible = false;
                return;
            }
            this.m_graphic.gotoAndStop(this.m_framecurrent);
        };
        combat_crack.prototype.is_end = function () {
            return this.m_life <= 0;
        };
        combat_crack.prototype.dispose = function () {
            this.release_allsp();
            utils.recover("combat_crack", this);
        };
        combat_crack.prototype.selfremove = function () {
        };
        return combat_crack;
    }(combat_number));
    combat.combat_crack = combat_crack;
    var combat_lineup = /** @class */ (function (_super) {
        __extends(combat_lineup, _super);
        function combat_lineup() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_obj_id = 0;
            _this.m_graphic = new Laya.Sprite();
            _this.addChild(_this.m_graphic);
            return _this;
        }
        combat_lineup.prototype.re_init = function () {
            this.m_obj_id = 0;
            this.m_graphic.x = 0;
            this.m_graphic.y = 0;
            this.m_graphic.graphics.clear();
        };
        combat_lineup.prototype.set_respath = function (path, x, y) {
            this.m_graphic.graphics.loadImage(path);
            this.m_graphic.x = x;
            this.m_graphic.y = y;
        };
        combat_lineup.prototype.dispose = function () {
            utils.recover("combat_lineup", this);
        };
        combat_lineup.prototype.selfremove = function () {
        };
        return combat_lineup;
    }(core.renderspcontent));
    combat.combat_lineup = combat_lineup;
})(combat || (combat = {}));
//# sourceMappingURL=combat_number.js.map
var combat;
(function (combat) {
    function player_sort(a, b) {
        return a.m_sortnum - b.m_sortnum; //a - b small 2 big;b - a big 2 small
    }
    var combat_playernode = /** @class */ (function () {
        function combat_playernode(tm, event, user_data, mgr) {
            this.m_tm = 0;
            this.m_idx = 0;
            this.m_sortnum = 0;
            this.m_event = "";
            this.m_ud = null;
            this.m_tm = tm;
            this.m_event = event;
            this.m_ud = user_data;
            this.m_mgr = mgr;
        }
        combat_playernode.prototype.set_idx = function (idx) {
            this.m_idx = idx;
            this.m_sortnum = this.m_tm + this.m_idx * 1.0 / 100.0;
        };
        combat_playernode.prototype.do = function (tm) {
            if (tm < this.m_tm) {
                return false;
            }
            this.m_mgr.fire_event(this.m_event, this.m_ud);
            return true;
        };
        return combat_playernode;
    }());
    combat.combat_playernode = combat_playernode;
    var combat_player = /** @class */ (function () {
        function combat_player() {
            this.m_arr = new Array();
            this.m_b_end = false;
            this.m_cur_tm = 0;
            this.m_cur_idx = 0;
            this.m_max_idx = 0;
        }
        combat_player.prototype.addnode = function (node) {
            node.set_idx(this.m_arr.length);
            this.m_arr.push(node);
        };
        combat_player.prototype.start = function () {
            this.m_arr.sort(player_sort);
            this.m_cur_tm = 0;
            this.m_cur_idx = 0;
            this.m_max_idx = this.m_arr.length;
            this.m_b_end = false;
        };
        combat_player.prototype.clear = function () {
            this.m_arr = new Array();
            this.m_b_end = true;
        };
        combat_player.prototype.is_end = function () {
            return this.m_b_end;
        };
        combat_player.prototype.update = function (delta) {
            if (this.is_end()) {
                return;
            }
            this.m_cur_tm = this.m_cur_tm + delta;
            for (var i = this.m_cur_idx; i < this.m_max_idx; ++i) {
                var node = this.m_arr[i];
                if (node.do(this.m_cur_tm) == false) {
                    this.m_cur_idx = i;
                    return;
                }
            }
            this.m_b_end = true;
        };
        return combat_player;
    }());
    combat.combat_player = combat_player;
})(combat || (combat = {}));
//# sourceMappingURL=combat_player.js.map