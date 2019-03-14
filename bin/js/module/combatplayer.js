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
var game;
(function (game) {
    var combatplayer = /** @class */ (function (_super) {
        __extends(combatplayer, _super);
        function combatplayer() {
            var _this = _super.call(this) || this;
            _this.m_combat = null;
            _this.m_cmd_arr = new Array();
            _this.m_b_pushcmd = false;
            _this.m_self_group = 0;
            _this.m_b_preend = false;
            _this.m_b_turnstart = false;
            _this.m_turnnum = 0;
            _this.m_wartype = 0;
            _this.m_warsubtype = 0;
            return _this;
        }
        combatplayer.prototype.start = function () {
            _super.prototype.start.call(this);
            core.combat_tiplog('combatplayer start');
            var game_ins = game.get_module(module_enum.MODULE_MAIN);
            this.m_combat = game_ins.get_combat_render();
        };
        combatplayer.prototype.push_cmd = function (cmd, ud) {
            this.m_cmd_arr.push({ 'cmd': cmd, 'ud': ud });
        };
        combatplayer.prototype.is_guaji_combat = function () {
            return this.m_wartype == game.WARTYPE_GUAJI;
        };
        combatplayer.prototype.is_boss_combat = function () {
            return this.m_wartype == game.WARTYPE_BOSS;
        };
        combatplayer.prototype.is_summon_caching = function () {
            return this.m_wartype == game.WARTYPE_CATCHSUMMON;
        };
        combatplayer.prototype.is_playerend = function () {
            return this.m_combat.isplayerend();
        };
        combatplayer.prototype.is_turnend = function () {
            return this.m_combat.isturnend();
        };
        combatplayer.prototype.get_preend_cmd = function () {
            return this.m_b_preend;
        };
        combatplayer.prototype.force_end = function () {
            this.m_cmd_arr.length = 0;
            this.m_combat.end();
        };
        //
        combatplayer.prototype.on_war_start = function (ud) {
            core.combat_tiplog("combatplayer on_war_start ", ud);
            this.m_b_preend = false;
            var wartype = ud['type'];
            var warsubtype = ud['subtype'];
            this.m_wartype = wartype;
            this.m_warsubtype = warsubtype;
            if (this.is_guaji_combat() == false && this.is_summon_caching() == false) {
                var soundins = game.get_module(module_enum.MODULE_SOUND);
                soundins.enter_boss();
            }
            this.m_self_group = ud['lineup'];
            var gm = game.get_module(module_enum.MODULE_MAIN);
            var cw = 2560;
            var ch = 2560;
            var hc = null;
            if (!Laya.Render.isConchApp) {
                //hc = gm.get_render().get_map_canvas(cw,ch,0,0);
            }
            var mp = utils.data_ins().get_data(data_enum.DATA_PLAYER);
            var res_id = mp.get_scene_res_id();
            this.m_combat.start(hc, cw, ch, gm.get_render().get_camera_x(), gm.get_render().get_camera_y(), res_id, "map/city/" + res_id.toString() + "/" + res_id.toString() + ".jpg");
            this.m_b_turnstart = true;
            this.m_turnnum = 0;
            this.m_combat.turnstart(this.m_turnnum);
            this.m_combat.change_lineup("avatar/lineup.png", -330, -210);
        };
        combatplayer.prototype.on_war_end = function (ud) {
            core.combat_tiplog("combatplayer on_war_end ", ud['force']);
            if (this.m_b_pushcmd) {
                this.do_cmd();
            }
            if (this.m_b_turnstart) {
                this.m_b_turnstart = false;
                this.m_combat.turnend();
            }
        };
        combatplayer.prototype.on_war_preend = function (ud) {
            core.combat_tiplog("combatplayer on_war_preend ", ud);
            this.m_b_preend = true;
        };
        combatplayer.prototype.on_war_turnstart = function (ud) {
            core.combat_tiplog("combatplayer on_war_turnstart ", ud);
            if (this.m_b_turnstart) {
                this.m_combat.turnend();
            }
            this.m_b_turnstart = true;
            this.m_turnnum = ud['bout'];
            this.m_combat.turnstart(this.m_turnnum);
            this.m_combat.buffautocd();
            this.m_combat.send_event(game_event.EVENT_COMBATTURNSCHANGE, ud['bout']);
        };
        combatplayer.prototype.on_war_turnend = function (ud) {
            core.combat_tiplog("combatplayer on_war_turnend ", ud);
            this.m_b_pushcmd = false;
            this.m_b_turnstart = false;
            this.do_cmd();
            this.m_combat.turnend();
            //todo handle buff cd
        };
        combatplayer.prototype.gen_pos = function (pos, group) {
            if (group == 0) {
                return pos;
            }
            if (pos <= 12) {
                pos += 20;
            }
            else {
                pos -= 20;
            }
            return pos;
        };
        combatplayer.prototype.on_war_add = function (ud) {
            core.combat_tiplog("combatplayer on_war_add ", ud, ud['warid'], ud['shape'], ud['name']);
            //todo
            //this.m_combat.addwarrior()
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_ADD, ud);
                return;
            }
            if (this.m_b_turnstart == false) {
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            var wdata = this.m_combat.get_warrior_ins();
            wdata.id = ud['warid'];
            wdata.pos = this.gen_pos(ud['warid'], this.m_self_group);
            var type = ud['type'];
            var status = ud['status']; //dead or normal
            var owner = ud['owner'];
            wdata.shape = ud['shape'];
            var desc = ud['desc'];
            var lv = ud['grade'];
            var cls = ud['classes'];
            var name = ud['name'];
            var zoomlvl = ud['zoomlvl'];
            wdata.scale = ud['scale'];
            wdata.name = name;
            wdata.lv = lv;
            wdata.cls = cls;
            wdata.b_dead = (status & 0x8) != 0;
            //
            if (desc != null && desc.length) {
                //
                desc.pos = 0;
                var skin = desc.getUint8();
                if (skin != 0) {
                    if (config.Skininfo.get_Skininfo(skin) != null) {
                        skin = config.Skininfo.get_Skininfo(skin).aid;
                        skin = helper._get_post_value_by_shape(wdata.shape, skin);
                        wdata.m_desc[0] = skin;
                        //this.m_combat.changeshape(wdata.id,skin);
                    }
                }
                desc.pos = 2;
                var weapon = desc.getUint8();
                if (weapon != 0) {
                    if (config.Weaponinfo.get_Weaponinfo(weapon) != null) {
                        weapon = config.Weaponinfo.get_Weaponinfo(weapon).aid;
                        wdata.m_desc[1] = weapon;
                        //this.m_combat.changeweapon(wdata.id,weapon);
                    }
                }
                desc.pos = 4;
                var ride = desc.getUint8();
                var ride_back = 0;
                if (ride != 0) {
                    if (config.Rideinfo.get_Rideinfo(ride) != null) {
                        ride_back = config.Rideinfo.get_Rideinfo(ride).baid;
                        ride = config.Rideinfo.get_Rideinfo(ride).faid;
                        //
                        wdata.m_desc[6] = ride;
                        wdata.m_desc[7] = ride_back;
                        wdata.m_desc[8] = 30;
                        //this.m_combat.changeride(wdata.id,ride,ride_back);
                    }
                }
                desc.pos = 6;
                var wing = desc.getUint8();
                if (wing != 0) {
                    if (config.Winginfo.get_Winginfo(wing) != null) {
                        wing = config.Winginfo.get_Winginfo(wing).aid;
                        wdata.m_desc[2] = wing;
                        //this.m_combat.changewing(wdata.id,wing);
                    }
                }
                desc.pos = 8;
                var fairy = desc.getUint8();
                if (fairy != 0) {
                    if (config.Fairyinfo.get_Fairyinfo(fairy) != null) {
                        fairy = config.Fairyinfo.get_Fairyinfo(fairy).aid;
                        wdata.m_desc[3] = fairy;
                        //this.m_combat.changefairy(wdata.id,fairy);
                    }
                }
                desc.pos = 10;
                var aura = desc.getUint8();
                if (aura != 0) {
                    if (config.Auraresinfo.get_Auraresinfo(aura) != null) {
                        aura = config.Auraresinfo.get_Auraresinfo(aura).aid;
                        wdata.m_desc[4] = aura;
                        //this.m_combat.changeaurn(wdata.id,aura);
                    }
                }
                desc.pos = 11;
                var title = desc.getUint8();
                if (title != 0) {
                    if (config.Titleresinfo.get_Titleresinfo(title) != null) {
                        title = config.Titleresinfo.get_Titleresinfo(title).aid;
                        wdata.m_desc[5] = title;
                        //this.m_combat.changetitle(wdata.id,title);
                    }
                }
                //
            }
            this.m_combat.addwarrior(wdata);
            //
        };
        combatplayer.prototype.on_war_del = function (ud) {
            core.combat_tiplog("combatplayer on_war_del ", ud, this.m_b_preend, ud['warid']);
            if (this.m_b_preend) {
                return;
            }
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_LEAVE, ud);
                return;
            }
            if (this.m_b_turnstart == false) {
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            this.m_combat.delwarrior(ud['warid']);
        };
        combatplayer.prototype.on_war_status = function (ud) {
            core.combat_tiplog("combatplayer on_war_status ", ud, ud['warid'], ud['hprate']);
            //todo
            this.m_combat.send_event(game_event.EVENT_COMBATPLAYERHPCHANGED, ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_STATUS, ud);
                return;
            }
            if (this.m_b_turnstart == false) {
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            var wdata = this.m_combat.get_warriorhp_ins();
            wdata.id = ud['warid'];
            wdata.hp = ud['hprate'];
            wdata.hpmax = 1000;
            this.m_combat.set_warrior_hp(wdata);
        };
        combatplayer.prototype.on_war_attack = function (ud) {
            core.combat_tiplog("combatplayer on_war_attackstart ", ud);
            if (this.m_b_pushcmd) {
                this.do_cmd();
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_NORMAL, ud);
            this.m_b_pushcmd = true;
        };
        combatplayer.prototype.on_war_attackend = function (ud) {
            core.combat_tiplog("combatplayer on_war_attackend ", ud);
            this.m_b_pushcmd = false;
            this.do_cmd();
        };
        combatplayer.prototype.on_war_skill = function (ud) {
            core.combat_tiplog("combatplayer on_war_skillstart ", ud);
            if (this.m_b_pushcmd) {
                this.do_cmd();
            }
            this.push_cmd(protocol_def.S2C_WAR_PERFORM, ud);
            this.m_b_pushcmd = true;
        };
        combatplayer.prototype.on_war_skillend = function (ud) {
            core.combat_tiplog("combatplayer on_war_skillend ", ud);
            this.m_b_pushcmd = false;
            this.do_cmd();
        };
        combatplayer.prototype.on_war_partneratk = function (ud) {
            core.combat_tiplog("combatplayer on_war_partneratk ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_PARTNER_ATTACK, ud);
                return;
            }
            //todo
        };
        combatplayer.prototype.on_war_backatk = function (ud) {
            core.combat_tiplog("combatplayer on_war_backatk ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_BACKATTACK, ud);
                return;
            }
            //todo
        };
        combatplayer.prototype.on_war_backatkend = function (ud) {
            core.combat_tiplog("combatplayer on_war_backatkend ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_BACKATTACK_END, ud);
            }
            //todo
        };
        combatplayer.prototype.on_war_shake = function (ud) {
            core.combat_tiplog("combatplayer on_war_shake ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_SHAKE, ud);
                return;
            }
        };
        combatplayer.prototype.on_war_protect = function (ud) {
            core.combat_tiplog("combatplayer on_war_protect ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_PROTECT, ud);
                return;
            }
        };
        combatplayer.prototype._gen_war_atkstatus = function (ud) {
            var id = ud['target'];
            var status = ud['status'];
            var value = ud['value'];
            //status1
            //War_AttackedBehave_Normal = 0;
            //War_AttackedBehave_Hit = 1;
            //War_AttackedBehave_Defence = 2;
            //War_AttackedBehave_Dodge = 3;
            //War_AttackedBehave_BLOOD = 4;
            //status2
            //War_AttackType_Crack = 1;
            //status3
            //War_AttackedResult_Normal = 0;
            //War_AttackedResult_Dead = 1;
            //War_AttackedResult_FlyAway = 2;
            var status1 = status & 0x3; //
            var status2 = status & 0x4;
            status2 = status2 >> 2; //bcrack
            var status4 = status & 0x8;
            status4 = status4 >> 3;
            var status3 = status & 0xF0;
            status3 = status3 >> 4;
            var sdata = this.m_combat.get_atkstatus_ins();
            sdata.id = id;
            sdata.damage = value;
            if (value >= 0) {
                sdata.damagetype = combat.DAMAGETYPE_HP_SUB;
            }
            else {
                sdata.damagetype = combat.DAMAGETYPE_HP_ADD;
                sdata.damage = -value;
            }
            // sdata.damagetype = combat.DAMAGETYPE_HP_SUB;
            // if(status3 == War_AttackedResult_Normal)
            // {
            //     //sdata.damagetype = combat.DAMAGETYPE_HP_ADD;
            // }
            if (status2 == game.War_AttackType_Crack) {
                sdata.b_crack = true;
            }
            if (status3 == game.War_AttackedResult_FlyAway) {
                sdata.b_fly = true;
            }
            else if (status3 == game.War_AttackedResult_Dead) {
                sdata.b_dead = true;
            }
            if (status1 == game.War_AttackedBehave_Dodge) {
                sdata.b_dodge = true;
            }
            else if (status1 == game.War_AttackedBehave_Defence) {
                sdata.b_defend = true;
            }
            return sdata;
        };
        combatplayer.prototype.on_war_atkstatus = function (ud) {
            core.combat_tiplog("combatplayer on_war_atkstatus ", ud, ud['target'], ud['status'], ud['value']);
            var sdata = this._gen_war_atkstatus(ud);
            this.m_combat.send_event(game_event.EVENT_COMBATPLAYERATTACK, sdata);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_ATTACK_STATUS, ud);
                return;
            }
            if (this.m_b_turnstart == false) {
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            this.m_combat.propchange(sdata);
        };
        combatplayer.prototype._gen_delbuff_ins = function (ud) {
            var id = ud['warid'];
            var buffid = ud['bid'];
            var bdata = this.m_combat.get_buffstatus_ins();
            bdata.id = id;
            bdata.buffid = buffid;
            return bdata;
        };
        combatplayer.prototype.on_war_buffdel = function (ud) {
            core.combat_tiplog("combatplayer on_war_buffdel ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_BUFF_DEL, ud);
                return;
            }
            if (this.m_b_turnstart == false) {
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            var bdata = this._gen_delbuff_ins(ud);
            this.m_combat.delbuff(bdata);
        };
        combatplayer.prototype._gen_addbuff_ins = function (ud) {
            var id = ud['warid'];
            var buffid = ud['bid'];
            var shape = 0;
            var buffeffid = 0;
            var cfg = config.Buffinfo.get_Buffinfo(buffid);
            if (cfg != null) {
                shape = cfg["icon"];
                buffeffid = cfg["aid"];
            }
            var overlay = ud['overlay'];
            var bout = ud['bout'];
            var blist = ud['datas'];
            var blen = blist.length; //0 means del
            var bdata = this.m_combat.get_buffstatus_ins();
            bdata.id = id;
            bdata.buffid = buffid;
            bdata.cd = bout;
            bdata.overlay = overlay;
            bdata.buffshape = shape;
            bdata.buffeffid = buffeffid;
            for (var _i = 0, blist_1 = blist; _i < blist_1.length; _i++) {
                var i = blist_1[_i];
                var value = i;
                bdata.datas.push(value);
            }
            return bdata;
        };
        combatplayer.prototype.on_war_buff = function (ud) {
            core.combat_tiplog("combatplayer on_war_buff ", ud);
            if (this.m_b_pushcmd) {
                this.push_cmd(protocol_def.S2C_WAR_BUFF_ADD, ud);
                return;
            }
            if (this.m_b_turnstart == false) {
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            //todo
            var bdata = this._gen_addbuff_ins(ud);
            this.m_combat.addbuff(bdata);
        };
        combatplayer.prototype._handle_last_cmd = function (cmd_arr) {
            var left_cmd_arr = new Array();
            for (var j = 0; j < cmd_arr.length; ++j) {
                var i = cmd_arr[j];
                if (i['cmd'] == protocol_def.S2C_WAR_ATTACK_STATUS) {
                    var sub_ud = i['ud'];
                    var sdata = this._gen_war_atkstatus(sub_ud);
                    this.m_combat.propchange(sdata);
                }
                else if (i['cmd'] == protocol_def.S2C_WAR_STATUS) {
                    var w_hp = this.m_combat.get_warriorhp_ins();
                    w_hp.id = i['ud']['warid'];
                    w_hp.hp = i['ud']['hprate'];
                    w_hp.hpmax = 1000;
                    this.m_combat.set_warrior_hp(w_hp);
                }
                else if (i['cmd'] == protocol_def.S2C_WAR_BUFF_ADD) {
                    var bdata = this._gen_addbuff_ins(i['ud']);
                    this.m_combat.addbuff(bdata);
                }
                else if (i['cmd'] == protocol_def.S2C_WAR_BUFF_DEL) {
                    var bdata = this._gen_delbuff_ins(i['ud']);
                    this.m_combat.delbuff(bdata);
                }
                else if (i['cmd'] == protocol_def.S2C_WAR_ADD) {
                    this.on_war_add(i['ud']);
                }
                else if (i['cmd'] == protocol_def.S2C_WAR_LEAVE) {
                    this.on_war_del(i['ud']);
                }
                else {
                    left_cmd_arr.push(i);
                }
            }
            return left_cmd_arr;
        };
        combatplayer.prototype._do_skill_cmd = function (skill_cmd, cmd_arr) {
            var skillatkobj = this.m_combat.get_skillatk_ins();
            var cmd = skill_cmd['cmd'];
            var ud = skill_cmd['ud'];
            skillatkobj.m_type = 0;
            skillatkobj.self_group = this.m_self_group;
            if (cmd == protocol_def.S2C_WAR_ATTACK_NORMAL) {
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = 1;
                skillatkobj.skilllv = 1;
                skillatkobj.dst_list.push(ud['vic']);
                skillatkobj.m_type = 0;
            }
            else if (cmd == protocol_def.S2C_WAR_PERFORM) {
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = ud['skillid'];
                skillatkobj.skilllv = ud['lv'];
                var round = ud['round'];
                var dstlist = ud['lsvic'];
                for (var _i = 0, dstlist_1 = dstlist; _i < dstlist_1.length; _i++) {
                    var i = dstlist_1[_i];
                    skillatkobj.dst_list.push(i);
                }
                if (this.gen_pos(skillatkobj.id, this.m_self_group) <= 12) {
                    skillatkobj.m_config_id = 1;
                }
                else {
                    skillatkobj.m_config_id = 2;
                }
                skillatkobj.m_type = 1;
            }
            else if (cmd == protocol_def.S2C_WAR_SHAKE) {
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = 2;
                skillatkobj.skilllv = 1;
                skillatkobj.dst_list.push(ud['vic']);
                skillatkobj.m_type = 2;
            }
            else if (cmd == protocol_def.S2C_WAR_BACKATTACK) {
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = ud['skillid'];
                skillatkobj.skilllv = ud['lv'];
                var round = ud['round'];
                var dstlist = ud['lsvic'];
                for (var _a = 0, dstlist_2 = dstlist; _a < dstlist_2.length; _a++) {
                    var i = dstlist_2[_a];
                    skillatkobj.dst_list.push(i);
                }
                skillatkobj.m_type = 3;
            }
            else {
                core.combat_errlog("do_cmd errortype ", cmd);
            }
            if (skillatkobj.skillid == 0) {
                skillatkobj.skillid = 2;
            }
            if (skillatkobj.skilllv == 0) {
                skillatkobj.skilllv = 1;
            }
            for (var _b = 0, _c = skillatkobj.dst_list; _b < _c.length; _b++) {
                var i = _c[_b];
                var b_find = true;
                for (var j = 0; j < cmd_arr.length && b_find; ++j) {
                    if (cmd_arr[j]['cmd'] == protocol_def.S2C_WAR_ATTACK_STATUS) {
                        var sub_ud = cmd_arr[j]['ud'];
                        if (sub_ud['target'] == i) {
                            //popnumber
                            var sdata = this._gen_war_atkstatus(sub_ud);
                            skillatkobj.atkstatus_list.push(sdata);
                            b_find = false;
                            cmd_arr.splice(j, 1);
                        }
                    }
                }
            }
            this.m_combat.attack(skillatkobj);
            //hp
            for (var _d = 0, _e = skillatkobj.dst_list; _d < _e.length; _d++) {
                var i = _e[_d];
                var b_find = true;
                for (var j = cmd_arr.length - 1; j >= 0; --j) {
                    var sub_cmd = cmd_arr[j]['cmd'];
                    var sub_ud = cmd_arr[j]['ud'];
                    if (sub_cmd == protocol_def.S2C_WAR_STATUS) {
                        if (sub_ud['warid'] == i) {
                            var w_hp = this.m_combat.get_warriorhp_ins();
                            w_hp.id = sub_ud['warid'];
                            w_hp.hp = sub_ud['hprate'];
                            w_hp.hpmax = 1000;
                            this.m_combat.set_warrior_hp(w_hp);
                            cmd_arr.splice(j, 1);
                        }
                    }
                    else if (sub_cmd == protocol_def.S2C_WAR_BUFF_ADD) {
                        if (sub_ud['warid'] == i) {
                            var bdata = this._gen_addbuff_ins(sub_ud);
                            this.m_combat.addbuff(bdata);
                        }
                    }
                    else if (sub_cmd == protocol_def.S2C_WAR_BUFF_DEL) {
                        if (sub_ud['warid'] == i) {
                            var bdata = this._gen_delbuff_ins(sub_ud);
                            this.m_combat.delbuff(bdata);
                        }
                    }
                }
            }
            return cmd_arr;
        };
        combatplayer.prototype.do_cmd = function () {
            core.combat_tiplog("combatplayer do_cmd ", this.m_cmd_arr.length);
            if (this.m_cmd_arr.length <= 0) {
                return;
            }
            var cur_cmd;
            var cur_skill_cmd = this.m_cmd_arr.shift();
            //
            var shake_list = new Array();
            for (var i = this.m_cmd_arr.length - 1; i >= 0; --i) {
                cur_cmd = this.m_cmd_arr[i];
                if (cur_cmd['cmd'] == protocol_def.S2C_WAR_SHAKE) {
                    shake_list.push(cur_cmd);
                    this.m_cmd_arr.splice(i, 1);
                }
            }
            var counteratklist = new Array();
            var b_push = false;
            var cur_list = null;
            for (var i = this.m_cmd_arr.length - 1; i >= 0; --i) {
                cur_cmd = this.m_cmd_arr[i];
                if (cur_cmd['cmd'] == protocol_def.S2C_WAR_BACKATTACK_END) {
                    b_push = true;
                    if (cur_list != null) {
                        core.combat_errlog("counteratk error!multi backattackend");
                    }
                    else {
                        cur_list = new Array();
                    }
                    this.m_cmd_arr.splice(i, 1);
                }
                else if (cur_cmd['cmd'] == protocol_def.S2C_WAR_BACKATTACK) {
                    b_push = false;
                    if (cur_list == null) {
                        core.combat_errlog("counteratk error!have not backattackend,only start");
                        cur_list = new Array();
                    }
                    cur_list.push(cur_cmd);
                    cur_list.reverse();
                    counteratklist.push(cur_list);
                    this.m_cmd_arr.splice(i, 1);
                    cur_list = null;
                }
                else {
                    if (b_push) {
                        cur_list.push(cur_cmd);
                        this.m_cmd_arr.splice(i, 1);
                    }
                }
            }
            if (cur_list != null) {
                core.combat_errlog("counteratk error!have not backattackstart,only end");
                cur_list.reverse();
                for (var _i = 0, cur_list_1 = cur_list; _i < cur_list_1.length; _i++) {
                    var i = cur_list_1[_i];
                    this.m_cmd_arr.push(i);
                }
                cur_list = null;
            }
            counteratklist.reverse();
            //
            this.m_cmd_arr = this._do_skill_cmd(cur_skill_cmd, this.m_cmd_arr);
            //shake
            for (var _a = 0, shake_list_1 = shake_list; _a < shake_list_1.length; _a++) {
                var i = shake_list_1[_a];
                this.m_cmd_arr = this._do_skill_cmd(i, this.m_cmd_arr);
            }
            shake_list = null;
            //counterattack
            for (var _b = 0, counteratklist_1 = counteratklist; _b < counteratklist_1.length; _b++) {
                var i = counteratklist_1[_b];
                cur_cmd = i.shift();
                var last_cmd_arr = this._do_skill_cmd(cur_cmd, i);
                if (last_cmd_arr.length > 0) {
                    last_cmd_arr = this._handle_last_cmd(last_cmd_arr);
                    if (last_cmd_arr.length > 0) {
                        core.combat_errlog("counteratk error! still has cmd left ", last_cmd_arr.length);
                    }
                }
            }
            this.m_cmd_arr = this._handle_last_cmd(this.m_cmd_arr);
            if (this.m_cmd_arr.length > 0) {
                core.combat_errlog("skillatk error! still has cmd left ", this.m_cmd_arr.length);
            }
            this.m_b_pushcmd = false;
            this.m_cmd_arr.length = 0;
        };
        //
        combatplayer.prototype.dispose = function () {
            this.m_combat = null;
            _super.prototype.dispose.call(this);
        };
        return combatplayer;
    }(utils.game_module));
    game.combatplayer = combatplayer;
})(game || (game = {}));
//# sourceMappingURL=combatplayer.js.map