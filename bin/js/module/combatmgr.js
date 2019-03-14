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
    //status1
    game.War_AttackedBehave_Normal = 0;
    game.War_AttackedBehave_Hit = 1;
    game.War_AttackedBehave_Defence = 2;
    game.War_AttackedBehave_Dodge = 3;
    game.War_AttackedBehave_BLOOD = 4;
    //status2
    game.War_AttackType_Crack = 1;
    //status3
    game.War_AttackedResult_Normal = 0;
    game.War_AttackedResult_Dead = 1;
    game.War_AttackedResult_FlyAway = 2;
    // 服务器主类型和子类型不存在关联关系，可以视为类型1和类型2。
    // 战斗主类型定义
    game.WARTYPE_NORMAL = 0; //普通
    game.WARTYPE_GUAJI = 1; //挂机
    game.WARTYPE_BOSS = 2; //多人BOSS
    // export let WARTYPE_STORY:number          = 3;  //剧情
    // export let WARTYPE_TASK:number			= 4;  //任务
    // export let WARTYPE_ENDLESS:number		= 9;  //服务器未定义
    game.WARTYPE_GAME = 10; //PVP,活动
    game.WARTYPE_PK = 11; //PVP,PK
    game.WARTYPE_CATCHSUMMON = 0xffffffff;
    // 战斗子类型定义
    game.WARSUBTYPE_NONE = 0;
    game.WARSUBTYPE_GANGPK = 1; //帮战
    game.WARSUBTYPE_SVRPK = 2; //竞技场
    game.WARSUBTYPE_MIBAO = 3; //上古秘宝
    game.WARSUBTYPE_TIANTING = 4; //天庭降妖
    game.WARSUBTYPE_DAYAN = 5; //大雁神塔
    game.WARSUBTYPE_BEST = 6; //天下第一
    game.WARSUBTYPE_COMMONBOSS = 7; //全民boss
    game.WARSUBTYPE_ESCORT_PLUNDER = 9; //每日押镖-劫镖
    game.WARSUBTYPE_ESCORT_REVENGE = 10; //每日押镖-复仇
    game.WARSUBTYPE_FENGYAO = 11; //封妖
    game.WARSUBTYPE_SCENEPASS = 12; //主线关卡
    game.WARSUBTYPE_MATERIALFB = 13; //材料副本
    game.WARSUBTYPE_PERSONALBOSS = 14; //个人BOSS
    game.WARSUBTYPE_PDYW = 15; //平定妖王
    game.WARSUBTYPE_WB_ROLE = 16; //野外BOSS,挑战玩家
    game.WARSUBTYPE_WB_BOSS = 17; //野外BOSS,挑战BOSS
    game.WARSUBTYPE_GANG_BOSS = 18; //帮派BOSS
    game.WARSUBTYPE_GANG_FUBNE = 19; //帮派副本
    game.WARSUBTYPE_TEAMFB = 20; //组队副本(跨服抓鬼)
    game.WARSUBTYPE_SCENEPASS_HELP = 21; //主线关卡协助
    game.WARSUBTYPE_WULINHEAD = 22; //武林盟主
    game.WARSUBTYPE_FUMO = 24; //伏魔之路
    game.WAR_PLAYTYPE_CANJUMP = 0;
    game.WAR_PLAYTYPE_CANNOTJUMP = 1;
    var COMBAT_STATE;
    (function (COMBAT_STATE) {
        COMBAT_STATE[COMBAT_STATE["STATE_IDLE"] = 0] = "STATE_IDLE";
        COMBAT_STATE[COMBAT_STATE["STATE_RECVPROTOCOL"] = 1] = "STATE_RECVPROTOCOL";
        COMBAT_STATE[COMBAT_STATE["STATE_LOADING"] = 2] = "STATE_LOADING";
        COMBAT_STATE[COMBAT_STATE["STATE_PLAYING"] = 3] = "STATE_PLAYING";
    })(COMBAT_STATE || (COMBAT_STATE = {}));
    var combatmgr = /** @class */ (function (_super) {
        __extends(combatmgr, _super);
        function combatmgr() {
            var _this = _super.call(this) || this;
            _this.m_combat = null;
            _this.m_num_path = "res/atlas/combat_num.atlas";
            _this.m_cmd_arr = new Array();
            _this.m_b_in_war = false;
            _this.m_b_warstart_cmd = true;
            _this.m_b_excluded = false; //排它性，是否不能被后面的战斗强制结束
            _this.m_savecmd_list = new Array();
            _this.m_time_id = 0;
            _this.m_b_preend = false;
            _this.m_wartype = 0;
            _this.m_warsubtype = 0;
            _this.m_state = COMBAT_STATE.STATE_IDLE; //0 recv protocol;1 download res 2 playing
            _this.m_combatplayer = null;
            _this.m_combatloading = null;
            _this.m_combatloadingv2 = null;
            _this.m_load_assets = new Array();
            _this.m_combat_id = 0;
            _this.m_max_bout = 0;
            _this.m_can_skip = 0;
            //public m_skip_resload:number = 0xffffffff;
            _this.m_skip_resload = 0;
            return _this;
        }
        combatmgr.prototype.start = function () {
            _super.prototype.start.call(this);
            core.combat_tiplog('combatmgr start');
            var game_ins = game.get_module(module_enum.MODULE_MAIN);
            this.m_combat = game_ins.get_combat_render();
            this.m_combat.m_scene.m_render.set_avatar_config(config.Avatarinfo.create_Avatarinfo);
            this.m_combat.m_scene.m_render.set_map_config(config.Mapinfo.create_Mapinfo);
            this.m_combat.m_scene.m_render.set_ani_config(config.Aniinfo.create_Aniinfo);
            this.m_combat.m_scene.m_render.set_eff_config(config.Effectinfo.create_Effectinfo);
            this.register_event(game_event.EVENT_TESTCOMBATPROTO, this._on_test_combat_protocol);
            //this.register_event(game_event.EVENT_TESTCOMBATPROTO,this._on_test_combatpos_protocol);
            this.register_event(game_event.EVENT_COMBATLOADINGMGR_COMPLETE, this.on_load_complete);
            this.register_event(game_event.EVENT_COMBATLOADINGMGRV2_COMPLETE, this.on_load_completev2);
            this.register_event(game_event.EVENT_COMBATLOADINGMGR_ERROR, this.on_load_err);
            this.register_event(game_event.EVENT_COMBATGO2NEXT, this._on_go2next);
            this.register_net_event(protocol_def.S2C_WAR_START, this.on_war_start);
            this.register_net_event(protocol_def.S2C_WAR_END, this.on_war_end);
            this.register_net_event(protocol_def.S2C_WAR_PREEND, this.on_war_preend);
            this.register_net_event(protocol_def.S2C_WAR_NEXT, this.on_war_turnstart);
            this.register_net_event(protocol_def.S2C_WAR_TURN, this.on_war_turnend);
            this.register_net_event(protocol_def.S2C_WAR_ADD, this.on_war_add);
            this.register_net_event(protocol_def.S2C_WAR_LEAVE, this.on_war_del);
            this.register_net_event(protocol_def.S2C_WAR_STATUS, this.on_war_status);
            this.register_net_event(protocol_def.S2C_WAR_ATTACK_NORMAL, this.on_war_attack);
            this.register_net_event(protocol_def.S2C_WAR_ATTACK_END, this.on_war_attackend);
            this.register_net_event(protocol_def.S2C_WAR_PERFORM, this.on_war_skill);
            this.register_net_event(protocol_def.S2C_WAR_PERFORM_END, this.on_war_skillend);
            this.register_net_event(protocol_def.S2C_WAR_PARTNER_ATTACK, this.on_war_partneratk);
            this.register_net_event(protocol_def.S2C_WAR_BACKATTACK, this.on_war_backatk);
            this.register_net_event(protocol_def.S2C_WAR_BACKATTACK_END, this.on_war_backatkend);
            this.register_net_event(protocol_def.S2C_WAR_SHAKE, this.on_war_shake);
            this.register_net_event(protocol_def.S2C_WAR_PROTECT, this.on_war_protect);
            this.register_net_event(protocol_def.S2C_WAR_ATTACK_STATUS, this.on_war_atkstatus);
            this.register_net_event(protocol_def.S2C_WAR_BUFF_ADD, this.on_war_buff);
            this.register_net_event(protocol_def.S2C_WAR_BUFF_DEL, this.on_war_buffdel);
            this.register_net_event(protocol_def.S2C_WAR_DEFEAT, this.on_war_defeat);
            this.register_net_event(protocol_def.S2C_WAR_SERIAL, this.on_war_serial);
            this.m_time_id = timer.timer_ins().add_timer(1000, this, this.on_wait_warend);
            this.m_combatplayer = game.get_module(module_enum.MODULE_COMBATPLAYER);
            this.m_combatplayer.start();
            this.m_combatloading = game.get_module(module_enum.MODULE_COMBATLOADING);
            this.m_combatloadingv2 = game.get_module(module_enum.MODULE_COMBATLOADINGV2);
        };
        combatmgr.prototype.push_cmd = function (cmd, ud) {
            this.m_cmd_arr.push({ 'cmd': cmd, 'ud': ud });
        };
        combatmgr.prototype.on_wait_warend = function () {
            if (this.m_state == COMBAT_STATE.STATE_PLAYING) {
                if (this.m_combatplayer != null) {
                    if (this.m_combatplayer.is_turnend() && this.m_combatplayer.is_playerend() && this.m_combatplayer.get_preend_cmd()) {
                        this.force_end();
                        this.do_nextwar_cmd();
                    }
                }
            }
        };
        combatmgr.prototype.force_end = function () {
            this.m_cmd_arr.length = 0;
            this.m_combatplayer.force_end();
            this.m_combatloading.end_load();
            this.m_combatloadingv2.end_load();
            this.m_b_in_war = false;
            net.net_ins().send(protocol_def.C2S_WAR_PLAYEND, { "id": this.m_combat_id });
            this.fire_event(game_event.EVENT_OUTCOMBAT, [this.m_wartype, this.m_warsubtype, this.m_combat_id]);
            this.m_wartype = 0;
            this.m_warsubtype = 0;
            this.m_state = COMBAT_STATE.STATE_IDLE;
        };
        combatmgr.prototype.end_war = function (all_clear) {
            if (all_clear === void 0) { all_clear = false; }
            this.force_end();
            if (all_clear) {
                this.clear_cachewar_cmd();
            }
            else {
                this.do_nextwar_cmd();
            }
        };
        combatmgr.prototype._on_go2next = function (ud) {
            if (ud === void 0) { ud = null; }
            this.go2next();
        };
        combatmgr.prototype.go2next = function () {
            if (this.m_state == COMBAT_STATE.STATE_PLAYING) {
                if (this.m_combatplayer != null) {
                    this.force_end();
                    this.do_nextwar_cmd();
                }
            }
        };
        combatmgr.prototype.in_combat = function () {
            return this.m_b_in_war;
        };
        combatmgr.prototype.is_guaji_combat = function () {
            return this.m_b_in_war && (this.m_wartype == game.WARTYPE_GUAJI || this.m_warsubtype == game.WARSUBTYPE_SCENEPASS);
        };
        combatmgr.prototype.is_not_guaji_combat = function () {
            return this.m_b_in_war && (this.m_wartype != game.WARTYPE_GUAJI && this.m_warsubtype != game.WARSUBTYPE_SCENEPASS);
        };
        combatmgr.prototype.get_combat_res = function () {
            var assets = [];
            assets.push({ url: "res/atlas/ani_res/cryout.atlas", type: Laya.Loader.ATLAS });
            assets.push({ url: "game_ani/combat/cryout.ani", type: Laya.Loader.JSON });
            assets.push({ url: "res/atlas/ani_res/crack.atlas", type: Laya.Loader.ATLAS });
            assets.push({ url: "game_ani/combat/crack.ani", type: Laya.Loader.JSON });
            assets.push({ url: "res/atlas/combat_num.atlas", type: Laya.Loader.ATLAS });
            return assets;
        };
        combatmgr.prototype.get_effect_res = function (eid) {
            var assets = [];
            var eff_cfg = config.Effectinfo.get_Effectinfo(eid);
            if (eff_cfg != null) {
                assets.push({ url: eff_cfg["res"], type: Laya.Loader.ATLAS });
                assets.push({ url: eff_cfg["path"], type: Laya.Loader.JSON });
            }
            return assets;
        };
        combatmgr.prototype.get_skilleffect_res = function (pid) {
            var assets = [];
            var skill_perform_cfg = config.Skillperform.get_Skillperform(pid);
            if (skill_perform_cfg != null) {
                for (var _i = 0, _a = skill_perform_cfg["data"]; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i["action"] == "effect") {
                        var effid = parseInt(i["param1"]);
                        var eff_path = this.get_effect_res(effid);
                        if (eff_path.length > 0) {
                            assets = assets.concat(eff_path);
                        }
                    }
                }
            }
            return assets;
        };
        combatmgr.prototype.get_skill_res = function (skillid, skilllv) {
            var assets = [];
            var skill_cfg = config.Skillperformconfig.get_Skillperformconfig(skillid);
            if (skill_cfg != null) {
                for (var _i = 0, _a = skill_cfg["data"]; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i["skilllv"] == skilllv) {
                        var cid1 = i["config1"];
                        var cid2 = i["config2"];
                        assets = assets.concat(this.get_skilleffect_res(cid1));
                        assets = assets.concat(this.get_skilleffect_res(cid2));
                    }
                }
            }
            return assets;
        };
        combatmgr.prototype.get_cmd_res = function () {
            var assets = [];
            for (var _i = 0, _a = this.m_cmd_arr; _i < _a.length; _i++) {
                var i = _a[_i];
                var cmd = i['cmd'];
                var ud = i['ud'];
                if (cmd == protocol_def.S2C_WAR_ADD) {
                    var shape = ud['shape'];
                    var desc = ud['desc'];
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 1 /* ACTION_RUN */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 0 /* ACTION_STAND */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 3 /* ACTION_ATTACK */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 4 /* ACTION_ATTACKED */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 7 /* ACTION_SKILL */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 5 /* ACTION_DEAD */));
                }
                else if (cmd == protocol_def.S2C_WAR_PERFORM) {
                    var skillid = ud['skillid'];
                    var skilllv = ud['lv'];
                    assets = assets.concat(this.get_skill_res(skillid, skilllv));
                }
                else if (cmd == protocol_def.S2C_WAR_BACKATTACK) {
                    var skillid = ud['skillid'];
                    var skilllv = ud['lv'];
                    assets = assets.concat(this.get_skill_res(skillid, skilllv));
                }
            }
            return assets;
        };
        combatmgr.prototype.start_load_res = function () {
            this.m_state = COMBAT_STATE.STATE_LOADING;
            var assets = this.get_combat_res();
            assets = assets.concat(this.get_cmd_res());
            core.combat_tiplog("start_load_res ", assets);
            if (assets.length <= 0) {
                this.start_playing();
                this.fire_event(game_event.EVENT_COMBATPLAYING, [this.m_wartype, this.m_warsubtype, this.m_combat_id, this.m_max_bout, this.m_can_skip]);
                return;
            }
            //this.m_combatloading.start_load(assets,this);
            this.m_combatloadingv2.start_load(assets);
            //this.m_load_assets.length = 0;
            //this.m_load_assets.concat(assets);
            //
        };
        combatmgr.prototype.on_load_completev2 = function (ud) {
            if (ud === void 0) { ud = null; }
            core.combat_tiplog("on_load_complete ");
            this.m_combatloadingv2.end_load();
            //
            var assets = [];
            for (var _i = 0, _a = this.m_cmd_arr; _i < _a.length; _i++) {
                var i = _a[_i];
                var cmd = i['cmd'];
                var ud_1 = i['ud'];
                if (cmd == protocol_def.S2C_WAR_ADD) {
                    var shape = ud_1['shape'];
                    var desc = ud_1['desc'];
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 1 /* ACTION_RUN */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 0 /* ACTION_STAND */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 3 /* ACTION_ATTACK */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 4 /* ACTION_ATTACKED */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 7 /* ACTION_SKILL */));
                    assets = assets.concat(helper.get_avatar_res(desc, shape, 5 /* ACTION_DEAD */));
                }
                else if (cmd == protocol_def.S2C_WAR_PERFORM) {
                    var skillid = ud_1['skillid'];
                    var skilllv = ud_1['lv'];
                    assets = assets.concat(this.get_skill_res(skillid, skilllv));
                }
                else if (cmd == protocol_def.S2C_WAR_BACKATTACK) {
                    var skillid = ud_1['skillid'];
                    var skilllv = ud_1['lv'];
                    assets = assets.concat(this.get_skill_res(skillid, skilllv));
                }
            }
            for (var _b = 0, assets_1 = assets; _b < assets_1.length; _b++) {
                var i = assets_1[_b];
                this.m_combat.m_scene.m_render.preload_matres(i.url);
            }
            //
            this.start_playing();
            this.fire_event(game_event.EVENT_COMBATPLAYING, [this.m_wartype, this.m_warsubtype, this.m_combat_id, this.m_max_bout, this.m_can_skip]);
        };
        combatmgr.prototype.on_load_complete = function (ud) {
            if (ud === void 0) { ud = null; }
            core.combat_tiplog("on_load_complete ");
            this.m_combatloading.end_load();
            this.start_playing();
            this.fire_event(game_event.EVENT_COMBATPLAYING, [this.m_wartype, this.m_warsubtype, this.m_combat_id, this.m_max_bout, this.m_can_skip]);
        };
        combatmgr.prototype.on_load_err = function (ud) {
            if (ud === void 0) { ud = null; }
            core.combat_errlog("on_load_err ", this.m_load_assets);
            //this.m_combatloading.end_load();
            //this.start_playing();
        };
        combatmgr.prototype.start_playing = function () {
            core.combat_tiplog("start_playing");
            this.m_state = COMBAT_STATE.STATE_PLAYING;
            for (var _i = 0, _a = this.m_cmd_arr; _i < _a.length; _i++) {
                var i = _a[_i];
                var cmd = i['cmd'];
                var ud = i['ud'];
                this.run_cmd(cmd, ud);
            }
            this.m_cmd_arr.length = 0;
        };
        combatmgr.prototype.run_cmd = function (cmd, ud) {
            core.combat_tiplog("run_cmd ", cmd, ud);
            switch (cmd) {
                case protocol_def.S2C_WAR_START:
                    this.m_combatplayer.on_war_start(ud);
                    break;
                case protocol_def.S2C_WAR_END:
                    this.m_combatplayer.on_war_end(ud);
                    break;
                case protocol_def.S2C_WAR_PREEND:
                    this.m_combatplayer.on_war_preend(ud);
                    break;
                case protocol_def.S2C_WAR_NEXT:
                    this.m_combatplayer.on_war_turnstart(ud);
                    break;
                case protocol_def.S2C_WAR_TURN:
                    this.m_combatplayer.on_war_turnend(ud);
                    break;
                case protocol_def.S2C_WAR_ADD:
                    this.m_combatplayer.on_war_add(ud);
                    break;
                case protocol_def.S2C_WAR_LEAVE:
                    this.m_combatplayer.on_war_del(ud);
                    break;
                case protocol_def.S2C_WAR_STATUS:
                    this.m_combatplayer.on_war_status(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_NORMAL:
                    this.m_combatplayer.on_war_attack(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_END:
                    this.m_combatplayer.on_war_attackend(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM:
                    this.m_combatplayer.on_war_skill(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM_END:
                    this.m_combatplayer.on_war_skillend(ud);
                    break;
                //
                case protocol_def.S2C_WAR_PARTNER_ATTACK:
                    this.m_combatplayer.on_war_partneratk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK:
                    this.m_combatplayer.on_war_backatk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK_END:
                    this.m_combatplayer.on_war_backatkend(ud);
                    break;
                case protocol_def.S2C_WAR_SHAKE:
                    this.m_combatplayer.on_war_shake(ud);
                    break;
                case protocol_def.S2C_WAR_PROTECT:
                    this.m_combatplayer.on_war_protect(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_STATUS:
                    this.m_combatplayer.on_war_atkstatus(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_ADD:
                    this.m_combatplayer.on_war_buff(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_DEL:
                    this.m_combatplayer.on_war_buffdel(ud);
                    break;
                default:
                    core.combat_errlog("run_cmd error cmd! ", cmd, ud);
                    break;
            }
        };
        combatmgr.prototype.is_saving_cmd = function () {
            var ret = this.m_b_in_war && this.m_b_excluded && !this.m_b_warstart_cmd;
            return ret;
        };
        combatmgr.prototype.save_war_cmd = function (cmd, ud) {
            core.combat_tiplog("save_war_cmd ", cmd, ud, this.m_savecmd_list.length);
            this.m_savecmd_list[this.m_savecmd_list.length - 1].push({ 'cmd': cmd, 'ud': ud });
        };
        combatmgr.prototype.do_nextwar_cmd = function () {
            core.combat_tiplog("do_nextwar_cmd ");
            while (this.m_savecmd_list.length > 0) {
                var arr = this.m_savecmd_list.shift();
                if (arr.length > 1) {
                    var first_cmd = arr[0];
                    if (first_cmd['cmd'] == protocol_def.S2C_WAR_START) {
                        var ud = first_cmd['ud'];
                        if ((ud['playmode'] == null || ud['playmode'] == game.WAR_PLAYTYPE_CANJUMP) && (this.m_savecmd_list.length > 0)) {
                            //do nothing,go to next one;
                        }
                        else {
                            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                                var i = arr_1[_i];
                                this.pop_war_cmd(i['cmd'], i['ud']);
                            }
                            return;
                        }
                    }
                }
                //
            }
        };
        combatmgr.prototype.clear_cachewar_cmd = function () {
            core.combat_tiplog("clear_cachewar_cmd ");
            this.m_savecmd_list = new Array();
        };
        combatmgr.prototype.pop_war_cmd = function (cmd, ud) {
            core.combat_tiplog("pop_war_cmd ", cmd, ud);
            switch (cmd) {
                case protocol_def.S2C_WAR_START:
                    this.on_war_start(ud);
                    break;
                case protocol_def.S2C_WAR_END:
                    this.on_war_end(ud);
                    break;
                case protocol_def.S2C_WAR_PREEND:
                    this.on_war_preend(ud);
                    break;
                case protocol_def.S2C_WAR_NEXT:
                    this.on_war_turnstart(ud);
                    break;
                case protocol_def.S2C_WAR_TURN:
                    this.on_war_turnend(ud);
                    break;
                case protocol_def.S2C_WAR_ADD:
                    this.on_war_add(ud);
                    break;
                case protocol_def.S2C_WAR_LEAVE:
                    this.on_war_del(ud);
                    break;
                case protocol_def.S2C_WAR_STATUS:
                    this.on_war_status(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_NORMAL:
                    this.on_war_attack(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_END:
                    this.on_war_attackend(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM:
                    this.on_war_skill(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM_END:
                    this.on_war_skillend(ud);
                    break;
                //
                case protocol_def.S2C_WAR_PARTNER_ATTACK:
                    this.on_war_partneratk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK:
                    this.on_war_backatk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK_END:
                    this.on_war_backatkend(ud);
                    break;
                case protocol_def.S2C_WAR_SHAKE:
                    this.on_war_shake(ud);
                    break;
                case protocol_def.S2C_WAR_PROTECT:
                    this.on_war_protect(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_STATUS:
                    this.on_war_atkstatus(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_ADD:
                    this.on_war_buff(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_DEL:
                    this.on_war_buffdel(ud);
                    break;
                default:
                    core.combat_errlog("run_cmd error cmd! ", cmd, ud);
                    break;
            }
        };
        combatmgr.prototype.is_skip_preloadres = function () {
            return this.m_skip_resload > 0;
        };
        combatmgr.prototype.skip_preloadres = function () {
            this.m_skip_resload -= 1;
        };
        combatmgr.prototype.on_war_start = function (ud) {
            core.combat_tiplog("on_war_start ", ud);
            if (this.m_b_in_war) {
                if (this.m_b_excluded) {
                    this.m_savecmd_list.push(new Array());
                    this.save_war_cmd(protocol_def.S2C_WAR_START, ud);
                    return;
                }
                this.force_end();
            }
            this.m_b_warstart_cmd = true;
            this.m_b_preend = false;
            var wartype = ud['type'];
            var warsubtype = ud['subtype'];
            if (ud["id"] != null) {
                this.m_combat_id = ud["id"];
            }
            else {
                this.m_combat_id = 0;
            }
            if (ud["skip"] != null) {
                this.m_can_skip = ud["skip"];
            }
            else {
                this.m_can_skip = 0;
            }
            if (ud['playmode'] != null && ud['playmode'] == game.WAR_PLAYTYPE_CANNOTJUMP) {
                this.m_b_excluded = true;
            }
            else {
                this.m_b_excluded = false;
            }
            var max_bout = 999;
            if (ud['maxbout'] != null) {
                max_bout = ud['maxbout'];
            }
            this.m_max_bout = max_bout;
            this.m_wartype = wartype;
            this.m_warsubtype = warsubtype;
            this.m_b_in_war = true;
            this.fire_event(game_event.EVENT_ENTERCOMBAT, [this.m_wartype, this.m_warsubtype, this.m_combat_id, this.m_max_bout, this.m_can_skip]);
            this.m_state = COMBAT_STATE.STATE_RECVPROTOCOL;
            this.m_cmd_arr.length = 0;
            this.push_cmd(protocol_def.S2C_WAR_START, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
                this.fire_event(game_event.EVENT_COMBATPLAYING, [this.m_wartype, this.m_warsubtype, this.m_combat_id, this.m_max_bout, this.m_can_skip]);
            }
        };
        combatmgr.prototype.on_war_end = function (ud) {
            core.combat_tiplog("on_war_end ", ud['force']);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_END, ud);
                return;
            }
            this.m_b_warstart_cmd = false;
            if (ud["force"] == 1) {
                this.force_end();
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_END, ud);
            if (this.is_skip_preloadres()) {
                this.skip_preloadres();
                this.start_playing();
            }
            else {
                this.start_load_res();
            }
        };
        combatmgr.prototype.on_war_preend = function (ud) {
            core.combat_tiplog("on_war_preend ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_PREEND, ud);
                return;
            }
            this.m_b_preend = true;
            this.push_cmd(protocol_def.S2C_WAR_PREEND, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_turnstart = function (ud) {
            core.combat_tiplog("on_war_turnstart ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_NEXT, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_NEXT, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_turnend = function (ud) {
            core.combat_tiplog("on_war_turnend ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_TURN, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_TURN, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_add = function (ud) {
            core.combat_tiplog("on_war_add ", ud, ud['warid'], ud['shape'], ud['name'], this.m_wartype);
            if (ud["zoomlvl"] == 1) {
                ud['scale'] = 1.5;
            }
            else {
                ud['scale'] = 1.0;
            }
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_ADD, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ADD, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_del = function (ud) {
            core.combat_tiplog("on_war_del ", ud, this.m_b_preend, ud['warid']);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_LEAVE, ud);
                return;
            }
            if (this.m_b_preend) {
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_LEAVE, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_status = function (ud) {
            core.combat_tiplog("on_war_status ", ud, ud['warid'], ud['hprate']);
            //todo
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_STATUS, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_STATUS, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_attack = function (ud) {
            core.combat_tiplog("on_war_attackstart ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_ATTACK_NORMAL, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_NORMAL, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_attackend = function (ud) {
            core.combat_tiplog("on_war_attackend ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_ATTACK_END, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_END, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_skill = function (ud) {
            core.combat_tiplog("on_war_skillstart ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_PERFORM, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PERFORM, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_skillend = function (ud) {
            core.combat_tiplog("on_war_skillend ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_PERFORM_END, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PERFORM_END, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_partneratk = function (ud) {
            core.combat_tiplog("on_war_partneratk ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_PARTNER_ATTACK, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PARTNER_ATTACK, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_backatk = function (ud) {
            core.combat_tiplog("on_war_backatk ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_BACKATTACK, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BACKATTACK, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_backatkend = function (ud) {
            core.combat_tiplog("on_war_backatkend ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_BACKATTACK_END, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BACKATTACK_END, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_shake = function (ud) {
            core.combat_tiplog("on_war_shake ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_SHAKE, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_SHAKE, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_protect = function (ud) {
            core.combat_tiplog("on_war_protect ", ud);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_PROTECT, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PROTECT, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_atkstatus = function (ud) {
            core.combat_tiplog("on_war_atkstatus ", ud, ud['target'], ud['status'], ud['value']);
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_ATTACK_STATUS, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_STATUS, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_buffdel = function (ud) {
            core.combat_tiplog("on_war_buffdel ", ud);
            var cfg = config.Buffinfo.get_Buffinfo(ud['bid']);
            if (cfg == null) {
                return;
            }
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_BUFF_DEL, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BUFF_DEL, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_buff = function (ud) {
            core.combat_tiplog("on_war_buff ", ud);
            var cfg = config.Buffinfo.get_Buffinfo(ud['bid']);
            if (cfg == null) {
                return;
            }
            if (this.is_saving_cmd()) {
                this.save_war_cmd(protocol_def.S2C_WAR_BUFF_ADD, ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BUFF_ADD, ud);
            if (this.is_skip_preloadres()) {
                this.start_playing();
            }
        };
        combatmgr.prototype.on_war_defeat = function (ud) {
            var wai_id = ud["idx"];
            this.fire_event_next_frame(game_event.EVENT_COMBAT_DEFEAT, { "war_id": wai_id });
        };
        combatmgr.prototype.on_war_serial = function (ud) {
            this.fire_event_next_frame(game_event.EVENT_COMBAT_SERIAL, { "war_id": this.m_combat_id });
        };
        combatmgr.prototype.on_load_succeed = function () {
            Laya.loader.off(Laya.Event.ERROR, this, this.on_load_error);
        };
        combatmgr.prototype.on_load_error = function (err) {
        };
        combatmgr.prototype._on_test_combat_protocol = function (ud) {
            //this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_START),{"type":0});
            var eud = ud;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_START), { "type": 0, "subtype": 0, "lineup": 0, "playmode": 1 });
            var bout = 0;
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT), ud);
            ud = {};
            ud['warid'] = 1;
            ud['type'] = 0;
            ud['status'] = 0; //dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_1";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            ud = {};
            ud['warid'] = 21;
            ud['type'] = 0;
            ud['status'] = 0; //dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_21";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            ud = {};
            ud['warid'] = 22;
            ud['type'] = 0;
            ud['status'] = 0; //dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_22";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            ud = {};
            ud['warid'] = 23;
            ud['type'] = 0;
            ud['status'] = 0; //dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_23";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 1000;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            ud['warid'] = 21;
            ud['hprate'] = 1000;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            ud['warid'] = 22;
            ud['hprate'] = 1000;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN), ud);
            //////
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT), ud);
            //attack start
            ud = {};
            ud['att'] = 1;
            ud['skillid'] = 2;
            ud['lv'] = 1;
            ud['lsvic'] = new Array();
            ud['lsvic'].push(21);
            ud['lsvic'].push(22);
            ud['round'] = 1;
            //
            if (eud != null) {
                ud['skillid'] = eud;
            }
            //
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PERFORM), ud);
            ud = {};
            ud['warid'] = 23;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_LEAVE), ud);
            ud = {};
            ud['warid'] = 23;
            ud['type'] = 0;
            ud['status'] = 0; //dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_23_2";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            for (var i = 2; i < 11; ++i) {
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0; //dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;
                ud['desc'] = helper.init_empty_desc();
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_" + i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            }
            for (var i = 24; i < 31; ++i) {
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0; //dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;
                ud['desc'] = helper.init_empty_desc();
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_" + i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            }
            //
            //
            ud = {};
            ud['target'] = 21;
            ud['status'] = 0x21;
            ud['value'] = 12345;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['target'] = 22;
            ud['status'] = 0x20;
            ud['value'] = 23456;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['warid'] = 22;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PERFORM_END), ud);
            //attack end
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN), ud);
            //////
            var testf = true;
            if (testf) {
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PREEND), {});
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_END), { "force": 0 });
                return;
            }
            ud = {};
            ud['bout'] = 2;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT), ud);
            //attack start
            ud = {};
            ud['att'] = 1;
            ud['vic'] = 21;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_NORMAL), ud);
            ud = {};
            ud['warid'] = 21;
            ud['bid'] = 1001;
            ud['overlay'] = 1;
            ud['bout'] = 3;
            ud['datas'] = [0, 0, 0];
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_ADD), ud);
            //
            ud = {};
            ud['att'] = 21;
            ud['skillid'] = 10001;
            ud['lv'] = 1;
            ud['round'] = 1;
            ud['lsvic'] = [1];
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BACKATTACK), ud);
            ud = {};
            ud['target'] = 1;
            ud['status'] = 0;
            ud['value'] = 77777;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BACKATTACK_END), ud);
            //
            ud = {};
            ud['target'] = 21;
            ud['status'] = 0x1;
            ud['value'] = 123456789;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['warid'] = 21;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            ud['warid'] = 1;
            ud['bid'] = 1002;
            ud['overlay'] = 1;
            ud['bout'] = 3;
            ud['datas'] = [0, 0, 0];
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_ADD), ud);
            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_END), ud);
            //attack end
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN), ud);
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT), ud);
            //attack start
            ud = {};
            ud['att'] = 21;
            ud['vic'] = 1;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_NORMAL), ud);
            ud = {};
            ud['target'] = 1;
            ud['status'] = 3;
            ud['value'] = 987654321;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['warid'] = 21;
            ud['bid'] = 1001;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_DEL), ud);
            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            ud['att'] = 1;
            ud['vic'] = 21;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_SHAKE), ud);
            ud = {};
            ud['target'] = 21;
            ud['status'] = 0;
            ud['value'] = 500;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['warid'] = 21;
            ud['hprate'] = 500;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_END), ud);
            ud = {};
            ud['att'] = 22;
            ud['vic'] = 1;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_NORMAL), ud);
            ud = {};
            ud['target'] = 1;
            ud['status'] = 0;
            ud['value'] = 666666;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS), ud);
            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 200;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS), ud);
            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_END), ud);
            //attack end
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN), ud);
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PREEND), {});
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_END), { "force": 0 });
        };
        //
        combatmgr.prototype._on_test_combatpos_protocol = function (ud) {
            var eud = ud;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_START), { "type": 0, "subtype": 0, "lineup": 0, "playmode": 1 });
            var bout = 0;
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT), ud);
            for (var i = 1; i < 11; ++i) {
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0; //dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;
                ud['desc'] = helper.init_empty_desc();
                helper.set_ride_fdesc(ud['desc'], 1);
                helper.set_weapon_fdesc(ud['desc'], 1);
                helper.set_wing_fdesc(ud['desc'], 1);
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_" + i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            }
            for (var i = 21; i < 31; ++i) {
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0; //dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;
                ud['desc'] = helper.init_empty_desc();
                helper.set_ride_fdesc(ud['desc'], 1);
                helper.set_weapon_fdesc(ud['desc'], 1);
                helper.set_wing_fdesc(ud['desc'], 1);
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_" + i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD), ud);
            }
            //
            ud = {};
            ud['warid'] = 1;
            ud['bid'] = 101; //102
            ud['overlay'] = 1;
            ud['bout'] = 99;
            var arr = new Array();
            arr.push(1);
            ud['datas'] = arr;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_ADD), ud);
            //
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN), ud);
            //////
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT), ud);
            //////
            //this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PREEND),{});
            //this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_END),{"force":0});
        };
        //
        combatmgr.prototype.dispose = function () {
            this.m_combat = null;
            this.m_combatloading = null;
            this.m_combatloadingv2 = null;
            this.m_combatplayer = null;
            _super.prototype.dispose.call(this);
        };
        return combatmgr;
    }(utils.game_module));
    game.combatmgr = combatmgr;
})(game || (game = {}));
//# sourceMappingURL=combatmgr.js.map