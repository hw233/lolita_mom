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