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
    var card_main = /** @class */ (function (_super) {
        __extends(card_main, _super);
        function card_main() {
            var _this = _super.call(this) || this;
            _this.m_pdata_ins = null;
            _this.m_gamemain_ins = null;
            _this.m_turn_start = false;
            _this.m_game_start = false;
            return _this;
        }
        card_main.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_event(game_event.EVENT_TIMER_TICK_1S, this.on_1s_tick);
            this.m_pdata_ins = data.get_data(data_enum.DATA_CARD);
            this.m_gamemain_ins = game.get_module(module_enum.MODULE_MAIN);
            this.register_net_event(protocol_def.S2C_CARDS_ARR, this.on_cards_arr);
            this.register_net_event(protocol_def.S2C_CARDS_START, this.on_cards_start);
            this.register_net_event(protocol_def.S2C_CARDS_END, this.on_cards_end);
            this.register_net_event(protocol_def.S2C_CARDS_HANDS, this.on_cards_hands);
            this.register_net_event(protocol_def.S2C_CARDS_PLAYERINFO, this.on_cards_pinfo);
            this.register_net_event(protocol_def.S2C_CARDS_ATK, this.on_cards_atk);
            this.register_net_event(protocol_def.S2C_CARDS_DEL, this.on_cards_del);
            this.register_net_event(protocol_def.S2C_CARDS_OPEN, this.on_cards_open);
            this.register_net_event(protocol_def.S2C_CARDS_CHANGED, this.on_cards_changed);
            this.register_net_event(protocol_def.S2C_CARDS_TURNSTART, this.on_cards_turnstart);
            this.register_net_event(protocol_def.S2C_CARDS_TURNEND, this.on_cards_turnend);
            this.register_net_event(protocol_def.S2C_CARDS_ENTERDLV, this.on_cards_enterdlv);
            this.register_net_event(protocol_def.S2C_CARDS_DELHAND, this.on_cards_delhand);
            this.register_event(game_event.EVENT_CARD_REQ_START, this.on_req_start);
        };
        card_main.prototype.on_cards_enterdlv = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_enterdlv ", ud);
            var lv = ud["lv"];
            this.m_pdata_ins.m_dlv = lv;
            this.m_pdata_ins.reset_map();
            this.m_pdata_ins.clear_cards();
            this.fire_event(game_event.EVENT_CARD_UPDATEDLV);
        };
        card_main.prototype.on_cards_delhand = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_delhand ", ud);
            var id = ud["id"];
            this.m_pdata_ins.del_hands(id);
            this.fire_event(game_event.EVENT_CARD_UPDATEHANDS);
        };
        card_main.prototype.on_cards_changed = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_changed ", ud);
            var id = ud["id"];
            var shape = ud["shape"];
            var atk = ud["atk"];
            var hp = ud["hp"];
            var duration = ud["duration"];
            this.m_pdata_ins.update_cardsorhands(id, shape, atk, hp, duration);
            this.fire_event(game_event.EVENT_CARD_CARDCHANGED, id);
        };
        card_main.prototype.on_cards_turnstart = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_turnstart ", ud);
            this.m_turn_start = true;
        };
        card_main.prototype.on_cards_turnend = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_turnend ", ud);
            this.m_turn_start = false;
        };
        card_main.prototype.on_cards_atk = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_atk ", ud);
            var srcid = ud["srcid"];
            var dstid = ud["dstid"];
            var value = ud["value"];
            this.fire_event(game_event.EVENT_CARD_ATTACK, [srcid, dstid, value]);
        };
        card_main.prototype.on_cards_del = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_del ", ud);
            var id = ud["id"];
            this.m_pdata_ins.del_cards(id);
            this.fire_event(game_event.EVENT_CARD_DELCARD, id);
        };
        card_main.prototype.on_cards_open = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_open ", ud);
            var id = ud["id"];
            var shape = ud["shape"];
            this.m_pdata_ins.open_card(id, shape);
            this.fire_event(game_event.EVENT_CARD_OPENCARD, id);
        };
        card_main.prototype.on_cards_hands = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_hands ", ud);
            var idlist = ud["idlist"];
            var shapelist = ud["shapelist"];
            var hplist = ud["hplist"];
            var atklist = ud["atklist"];
            var durationlist = ud["durationlist"];
            this.m_pdata_ins.clear_hands();
            for (var i = 0; i < idlist.length; ++i) {
                this.m_pdata_ins.add_hands(idlist[i], shapelist[i], atklist[i], hplist[i], durationlist[i]);
            }
            this.fire_event(game_event.EVENT_CARD_UPDATEHANDS);
        };
        card_main.prototype.on_cards_pinfo = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_pinfo ", ud);
            var hp = ud["hp"];
            var stamina = ud["stamina"];
            var armor = ud["armor"];
            var atk = ud["atk"];
            var exp = ud["exp"];
            var dlv = ud["dlv"];
            var clv = ud["clv"];
            var hpmax = ud["hpmax"];
            var staminamax = ud["staminamax"];
            this.m_pdata_ins.m_hp = hp;
            this.m_pdata_ins.m_stamina = stamina;
            this.m_pdata_ins.m_armor = armor;
            this.m_pdata_ins.m_atk = atk;
            this.m_pdata_ins.m_exp = exp;
            this.m_pdata_ins.m_dlv = dlv;
            this.m_pdata_ins.m_clv = clv;
            this.m_pdata_ins.m_hpmax = hpmax;
            this.m_pdata_ins.m_staminamax = staminamax;
            this.fire_event(game_event.EVENT_CARD_PLAYERINFO);
        };
        card_main.prototype.on_cards_start = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_start ", ud);
            this.m_game_start = true;
            utils.widget_ins().show_widget(widget_enum.WIDGET_CARDUI, true);
        };
        card_main.prototype.on_cards_end = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_end ", ud);
            //todo
            this.m_game_start = false;
            this.fire_event(game_event.EVENT_CARD_END);
        };
        card_main.prototype.on_cards_arr = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_arr ", ud);
            var idlist = ud["idlist"];
            var shapelist = ud["shapelist"];
            var hplist = ud["hplist"];
            var atklist = ud["atklist"];
            var durationlist = ud["durationlist"];
            this.m_pdata_ins.update_cards(idlist, shapelist, atklist, hplist, durationlist);
            this.fire_event(game_event.EVENT_CARD_UPDATECARDS);
        };
        card_main.prototype.on_req_start = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.m_game_start) {
                return;
            }
            this.req_start();
        };
        //
        card_main.prototype.req_start = function () {
            net.net_ins().send(protocol_def.C2S_CARDS_START, {});
        };
        card_main.prototype.req_quit = function () {
            if (!this.m_game_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_QUIT, {});
        };
        card_main.prototype.req_del_card = function (id) {
            if (!this.m_game_start) {
                return;
            }
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_DEL, { "id": id });
        };
        card_main.prototype.req_click_card = function (id) {
            if (!this.m_game_start) {
                return;
            }
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_CLICK, { "id": id });
        };
        card_main.prototype.req_flip_card = function (id) {
            if (!this.m_game_start) {
                return;
            }
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_FLIP, { "id": id });
        };
        card_main.prototype.req_use_card = function (srcid, dstid) {
            if (!this.m_game_start) {
                return;
            }
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_USE, { "srcid": srcid, "dstid": dstid });
        };
        //
        card_main.prototype.on_1s_tick = function (ud) {
            if (ud === void 0) { ud = null; }
        };
        card_main.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return card_main;
    }(utils.game_module));
    game.card_main = card_main;
})(game || (game = {}));
//# sourceMappingURL=card_main.js.map
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
    var chat_msg = /** @class */ (function (_super) {
        __extends(chat_msg, _super);
        function chat_msg() {
            var _this = _super.call(this) || this;
            _this.m_btn_y = 800;
            return _this;
        }
        chat_msg.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_net_event(protocol_def.S2C_CHAT, this.on_net_chat);
            this.register_net_event(protocol_def.S2C_CHAT_SYSTEM, this.on_sys_msg);
            this.register_event(game_event.EVENT_CHATWND_SIZE, this.on_chatwnd_size);
            this.register_event(game_event.EVENT_CHATWND_SYSMSG, this.on_sys_msg);
            this.register_event(game_event.EVENT_CHAT_HYPERLINK, this.onPlayerInfo);
            utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_BOX, true);
        };
        chat_msg.prototype.on_chatwnd_size = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_btn_y = ud;
        };
        chat_msg.prototype.on_net_chat = function (user_data) {
            var ch = user_data["ch"];
            var svrid = user_data['srvid'];
            var pid = user_data["pid"];
            var shape = user_data["shape"];
            var vip = user_data["vip"];
            var name = user_data["name"];
            var msg = user_data["msg"];
            this.chat(ch, pid, shape, vip, name, msg, svrid);
        };
        chat_msg.prototype.chat = function (ch, pid, shape, vip, name, msg, svrid) {
            var c_data = data.get_data(data_enum.DATA_CHAT);
            c_data.set_chat_msg(ch, pid, shape, vip, name, msg, svrid);
            this.fire_event(game_event.EVENT_CHAT, c_data.get_new_chat());
        };
        chat_msg.prototype.on_sys_msg = function (user_data) {
            var ch = user_data['ch'];
            var msg = user_data['msg'];
            this.chat(ch, 0, 0, 0, "", msg, 0);
        };
        chat_msg.prototype.send_msg = function (content, channel) {
            if (channel === void 0) { channel = base.CHANNEL_WORLD; }
            net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": content });
        };
        chat_msg.prototype.onPlayerInfo = function (ud) {
            if (ud === void 0) { ud = null; }
            if (ud != null) {
                if (ud["hyperlink_type"] == base.HYPERLINK_TYPE.TYPE_OPEN_PLAYER_INFO) {
                    var pid = ud["u1"];
                    var pdata = utils.data_ins().get_data(data_enum.DATA_PLAYER);
                    if (pdata.m_pid == pid) {
                        utils.widget_ins().show_widget(widget_enum.WIDGET_MAINPLAYER_INFO, true);
                    }
                    else {
                        net.net_ins().send(protocol_def.C2S_ROLE_INFO, { "id": pid });
                    }
                }
            }
        };
        chat_msg.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_msg;
    }(utils.game_module));
    game.chat_msg = chat_msg;
})(game || (game = {}));
//# sourceMappingURL=chat_msg.js.map
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
    var combatloadingmgr = /** @class */ (function (_super) {
        __extends(combatloadingmgr, _super);
        function combatloadingmgr() {
            var _this = _super.call(this) || this;
            _this.m_assets = null;
            _this.m_caller = null;
            _this.m_min_time = 1000;
            _this.m_start_time = 0;
            _this.m_cur_progress = 0;
            _this.m_start_loading = false;
            _this.m_alreadyloaded = false;
            _this.m_alreadyload_recorder = new Object();
            _this.m_delay = 0; //1000
            return _this;
        }
        combatloadingmgr.prototype.start = function () {
            _super.prototype.start.call(this);
            core.combat_tiplog('combatloadingmgr start');
            timer.timer_ins().add_timer(50, this, this.on_time_func);
        };
        combatloadingmgr.prototype.on_time_func = function () {
            if (this.m_start_loading) {
                var cur_time = helper.get_cur_milltime();
                if (this.m_alreadyloaded) {
                    if (cur_time >= (this.m_start_time + this.m_min_time)) {
                        this.notify_end();
                        return;
                    }
                }
                this.m_cur_progress += 0.05;
                if (this.m_cur_progress > 1.0) {
                    this.m_cur_progress = 1.0;
                }
                this.fire_event_next_frame(game_event.EVENT_COMBATLOADINGUI_PROGRESS, this.m_cur_progress);
            }
        };
        combatloadingmgr.prototype.add_loadedres = function (path) {
            this.m_alreadyload_recorder[path] = true;
        };
        combatloadingmgr.prototype.clear_loadedres_recorder = function () {
            this.m_alreadyload_recorder = new Object();
        };
        combatloadingmgr.prototype.start_load = function (assets, caller) {
            if (this.m_caller != null) {
                return;
            }
            if (assets.length <= 0) {
                this.notify_end();
                return;
            }
            var need_load = new Array();
            for (var _i = 0, assets_1 = assets; _i < assets_1.length; _i++) {
                var i = assets_1[_i];
                if (this.m_alreadyload_recorder.hasOwnProperty(i["url"]) == false) {
                    this.m_alreadyload_recorder[i["url"]] = true;
                    need_load.push(i);
                    core.combat_tiplog("assets ", i["type"], i["url"]);
                }
            }
            if (need_load.length <= 0) {
                this.notify_end();
                return;
            }
            this.m_caller = caller;
            this.m_assets = need_load;
            core.combat_tiplog("combat loading 加载开始 ", this.m_assets, this.m_assets.length, this.m_caller, this.m_assets.toString());
            this.m_start_time = helper.get_cur_milltime();
            this.m_cur_progress = 0;
            this.m_start_loading = true;
            this.m_alreadyloaded = false;
            core.myload(this.m_assets, laya.utils.Handler.create(this, this.on_load), laya.utils.Handler.create(this, this.on_progress, null, false));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
            utils.widget_ins().show_widget(widget_enum.WIDGET_COMBATLOADING_UI, true);
            //this.fire_event_next_frame(game_event.EVENT_NEWBEES_SHOW,false);
        };
        combatloadingmgr.prototype.is_loading = function () {
            return this.m_caller != null;
        };
        combatloadingmgr.prototype.end_load = function () {
            utils.widget_ins().show_widget(widget_enum.WIDGET_COMBATLOADING_UI, false);
            this.m_start_loading = false;
            this.m_alreadyloaded = false;
            this.m_caller = null;
        };
        combatloadingmgr.prototype.on_progress = function (v) {
            core.combat_tiplog("combatloading 加载进度 ", v, this.m_assets);
            if (v <= this.m_cur_progress) {
                return;
            }
            this.m_cur_progress = v;
            if (this.m_cur_progress > 1.0) {
                this.m_cur_progress = 1.0;
            }
            this.fire_event_next_frame(game_event.EVENT_COMBATLOADINGUI_PROGRESS, this.m_cur_progress);
        };
        combatloadingmgr.prototype.on_load = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.combat_tiplog("combatloading 加载完成 ", this.m_assets);
            var cur_time = helper.get_cur_milltime();
            if (cur_time < (this.m_start_time + this.m_min_time)) {
                this.m_alreadyloaded = true;
                return;
            }
            this.notify_end();
        };
        combatloadingmgr.prototype.notify_end = function () {
            this.fire_event(game_event.EVENT_COMBATLOADINGMGR_COMPLETE, this.m_caller);
            this.m_start_loading = false;
            this.m_alreadyloaded = false;
            this.m_caller = null;
            //this.fire_event_next_frame(game_event.EVENT_NEWBEES_SHOW,true);
        };
        combatloadingmgr.prototype.onError = function (err) {
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.combat_tiplog("combatloading 加载失败 ", err, this.m_assets);
            this.fire_event(game_event.EVENT_COMBATLOADINGMGR_ERROR, this.m_caller);
            //this.m_caller = null;
        };
        combatloadingmgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combatloadingmgr;
    }(utils.game_module));
    game.combatloadingmgr = combatloadingmgr;
    //
    var combatloadingmgrV2 = /** @class */ (function (_super) {
        __extends(combatloadingmgrV2, _super);
        function combatloadingmgrV2() {
            var _this = _super.call(this) || this;
            _this.m_assets = null;
            _this.m_min_time = 500;
            _this.m_start_time = 0;
            _this.m_start_loading = false;
            return _this;
        }
        combatloadingmgrV2.prototype.start = function () {
            _super.prototype.start.call(this);
            core.combat_tiplog('combatloadingmgrV2 start');
            timer.timer_ins().add_timer(50, this, this.on_time_func);
        };
        combatloadingmgrV2.prototype.on_time_func = function () {
            if (this.m_start_loading) {
                var cur_time = helper.get_cur_milltime();
                if (cur_time >= (this.m_start_time + this.m_min_time)) {
                    this.notify_end();
                    return;
                }
            }
        };
        combatloadingmgrV2.prototype.start_load = function (assets) {
            if (assets.length <= 0) {
                return;
            }
            this.m_assets = assets;
            core.combat_tiplog("combatloadingmgrV2 加载开始 ", this.m_assets, this.m_assets.length, this.m_assets.toString());
            this.m_start_time = helper.get_cur_milltime();
            this.m_start_loading = true;
            Laya.loader.load(this.m_assets, laya.utils.Handler.create(this, this.on_load), null, null, 0);
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        };
        combatloadingmgrV2.prototype.is_loading = function () {
            return this.m_start_loading;
        };
        combatloadingmgrV2.prototype.end_load = function () {
            this.m_start_loading = false;
        };
        combatloadingmgrV2.prototype.on_load = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.combat_tiplog("combatloadingmgrV2 加载完成 ", this.m_assets);
            this.notify_end();
        };
        combatloadingmgrV2.prototype.notify_end = function () {
            if (this.m_start_loading) {
                this.fire_event_next_frame(game_event.EVENT_COMBATLOADINGMGRV2_COMPLETE);
            }
            this.m_start_loading = false;
        };
        combatloadingmgrV2.prototype.onError = function (err) {
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.combat_tiplog("combatloadingmgrV2 加载失败 ", err, this.m_assets);
        };
        combatloadingmgrV2.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combatloadingmgrV2;
    }(utils.game_module));
    game.combatloadingmgrV2 = combatloadingmgrV2;
})(game || (game = {}));
//# sourceMappingURL=combatloading.js.map
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
                    if (desc.length > 0) {
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 1 /* ACTION_RUN */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 0 /* ACTION_STAND */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 3 /* ACTION_ATTACK */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 4 /* ACTION_ATTACKED */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 7 /* ACTION_SKILL */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 5 /* ACTION_DEAD */));
                    }
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
                    if (desc.length > 0) {
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 1 /* ACTION_RUN */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 0 /* ACTION_STAND */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 3 /* ACTION_ATTACK */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 4 /* ACTION_ATTACKED */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 7 /* ACTION_SKILL */));
                        assets = assets.concat(helper.get_avatar_res(desc, shape, 5 /* ACTION_DEAD */));
                    }
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
// Author: bingoo
// Date: 2018/08/23
// Desc: 战斗界面module
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
    var combat_ui_mgr = /** @class */ (function (_super) {
        __extends(combat_ui_mgr, _super);
        function combat_ui_mgr() {
            var _this = _super.call(this) || this;
            _this.b_in_war = false;
            _this.war_type = 0;
            _this.war_subType = 0;
            _this.war_id = 0;
            _this.war_round_max = 0;
            _this.war_skip_roundNum = 0; //当前可以跳过战斗的回合数，暂未启用
            _this.round_detail_war_subType_arr = new Array(); // 需要显示回合描述的战斗子类型
            _this.skip_war_subType_arr = new Array(); // 需要显示回合数的战斗子类型
            _this.b_skip_show = false;
            _this.b_RoundDetail_show = false;
            _this.b_hpPgBar_show = false;
            return _this;
        }
        combat_ui_mgr.prototype.start = function () {
            _super.prototype.start.call(this);
            this.init_cfg();
            this.register_event(game_event.EVENT_ENTERCOMBAT, this.on_enter_combat);
            this.register_event(game_event.EVENT_COMBATPLAYING, this.on_combat_playing);
            this.register_event(game_event.EVENT_OUTCOMBAT, this.on_out_combat);
            this.register_net_event(protocol_def.S2C_QMBOSS_FIGHT_DAMAGE, this.on_netcmd_commobn_boss_hp);
        };
        combat_ui_mgr.prototype.init_cfg = function () {
            var keyStr_arr;
            this.skip_war_subType_arr = [];
            keyStr_arr = Object.keys(config.Combat_skip_cfg.get_cfg_object());
            for (var _i = 0, keyStr_arr_1 = keyStr_arr; _i < keyStr_arr_1.length; _i++) {
                var str = keyStr_arr_1[_i];
                this.skip_war_subType_arr.push(parseInt(str));
            }
            keyStr_arr = Object.keys(config.Cli_round_detail_cfg.get_cfg_object());
            this.round_detail_war_subType_arr = [];
            for (var _a = 0, keyStr_arr_2 = keyStr_arr; _a < keyStr_arr_2.length; _a++) {
                var str = keyStr_arr_2[_a];
                this.round_detail_war_subType_arr.push(parseInt(str));
            }
        };
        combat_ui_mgr.prototype.on_enter_combat = function (ud) {
            if (ud === void 0) { ud = null; }
        };
        combat_ui_mgr.prototype.on_combat_playing = function (ud) {
            if (ud === void 0) { ud = null; }
            this.b_in_war = true;
            this.war_type = ud[0];
            this.war_subType = ud[1];
            this.war_id = ud[2];
            this.war_round_max = ud[3];
            this.war_skip_roundNum = ud[4];
            if (this.war_type != game.WARTYPE_GUAJI) {
                this._show_combat_round(true);
                if (this.skip_war_subType_arr.indexOf(this.war_subType) >= 0) {
                    this._show_skip(true);
                }
                if (this.round_detail_war_subType_arr.indexOf(this.war_subType) >= 0) {
                    this._show_combat_detail(true);
                }
                if (this.war_type == game.WARTYPE_NORMAL || this.war_type == game.WARTYPE_BOSS) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_BOSS_GODX, true, { "war_subType": this.war_subType });
                }
            }
        };
        combat_ui_mgr.prototype.on_out_combat = function (ud) {
            if (ud === void 0) { ud = null; }
            this.b_in_war = false;
            this.war_type = ud[0];
            this.war_subType = ud[1];
            this.war_id = ud[2];
            if (this.war_type != game.WARTYPE_GUAJI) {
                this._show_combat_round(false);
                if (this.b_skip_show) {
                    this._show_skip(false);
                }
                if (this.b_RoundDetail_show) {
                    this._show_combat_detail(false);
                }
                if (this.b_hpPgBar_show) {
                    this._show_boss_HpPgBar(false);
                }
            }
        };
        combat_ui_mgr.prototype.get_cur_war_info = function () {
            return [this.war_type, this.war_subType, this.war_id, this.war_round_max];
        };
        // 设置回合界面
        combat_ui_mgr.prototype._show_combat_round = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUND) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUND, true);
                }
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUND) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUND, false);
                }
            }
        };
        // 设置回合描述
        combat_ui_mgr.prototype._show_combat_detail = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUNDDETAIL) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUNDDETAIL, true);
                }
                this.b_RoundDetail_show = true;
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUNDDETAIL) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUNDDETAIL, false);
                }
                this.b_RoundDetail_show = false;
            }
        };
        // 设置跳过按钮
        combat_ui_mgr.prototype._show_skip = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_SKIP) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_SKIP, true);
                }
                this.b_skip_show = true;
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_SKIP) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_SKIP, false);
                }
                this.b_skip_show = false;
            }
        };
        combat_ui_mgr.prototype.on_netcmd_commobn_boss_hp = function (ud) {
            if (ud === void 0) { ud = null; }
            var war_id = ud["warid"];
            var my_rank = ud["myrank"];
            var my_dmg = ud["mystartdmg"];
            var start_hp = ud["starthp"];
            var total_hp = ud["hpmax"];
            var info_arr = ud["damagelist"];
            var rank_arr = new Array();
            for (var _i = 0, info_arr_1 = info_arr; _i < info_arr_1.length; _i++) {
                var info = info_arr_1[_i];
                rank_arr.push([info["id"], info["name"], info["damage"]]);
            }
            var data_ins = { "myrank": my_rank, "my_dmg": my_dmg, "start_hp": start_hp, "total_hp": total_hp, "rank_arr": rank_arr };
            helper.set_transfer_data("common_boss_hp_data", data_ins);
            this._show_boss_HpPgBar(true);
        };
        // 显示boss血量
        combat_ui_mgr.prototype._show_boss_HpPgBar = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_BOSS_HP) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_BOSS_HP, true);
                    this.b_hpPgBar_show = true;
                }
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_BOSS_HP) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_BOSS_HP, false);
                    this.b_hpPgBar_show = false;
                }
            }
        };
        combat_ui_mgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_ui_mgr;
    }(utils.game_module));
    game.combat_ui_mgr = combat_ui_mgr;
})(game || (game = {}));
//# sourceMappingURL=combat_ui_mgr.js.map
var game_event;
(function (game_event) {
    game_event.EVENT_TEST = "test";
    game_event.EVENT_TEST1 = "test1";
    game_event.EVENT_TEST2 = "test2";
    game_event.EVENT_TEST3 = "test3";
    game_event.EVENT_TIMER_TICK_1S = "timer_tick_1s";
    game_event.EVENT_PLAYERDATA_UPDATED = "playerdata_updated";
    game_event.EVENT_SCENE_CLICK = "game_click";
    game_event.EVENT_SCENE_STOP = "scene_stop";
    game_event.EVENT_PLAYER_ENTER = "player_enterscene";
    game_event.EVENT_PLAYER_OUT = "player_outscene";
    game_event.EVENT_MAINPLAYER_MOVE = "mainplayer_move";
    game_event.EVENT_ENTERSCENE = "mainplayer_enterscene";
    game_event.EVENT_CLICK_PLAYER = "scene_click_player";
    game_event.EVENT_UI_MAINTOPUPDATE = "ui_maintop_update";
    game_event.EVENT_UI_MAINUPDATE = "ui_main_update";
    game_event.EVENT_MSGBOX_CHOOSED = "msgbox_choosed";
    game_event.EVENT_CARD_UPDATEHANDS = "card_updatehands";
    game_event.EVENT_CARD_UPDATECARDS = "card_updatecards";
    game_event.EVENT_CARD_REQ_START = "card_req_start";
    game_event.EVENT_CARD_UPDATEDLV = "card_updatedlv";
    game_event.EVENT_CARD_CARDCHANGED = "card_cardchanged";
    game_event.EVENT_CARD_ATTACK = "card_attack";
    game_event.EVENT_CARD_DELCARD = "card_delcard";
    game_event.EVENT_CARD_OPENCARD = "card_open";
    game_event.EVENT_CARD_PLAYERINFO = "card_playerinfo";
    game_event.EVENT_CARD_END = "card_end";
    // chat
    game_event.EVENT_CHAT = "chat";
    game_event.EVENT_CHAT_HYPERLINK = "chat_hyperlink"; // 超链接点击，userdata：{"text":data_arr[0], "hyperlink_type":data_arr[1], "u2":data_arr[2], "u3":data_arr[3], "u4":data_arr[4]}
    game_event.EVENT_CHATWND_SIZE = "chatwnd_size";
    game_event.EVENT_CHATWND_SYSMSG = "chatwnd_sysmsg";
    // export const EVENT_CHAT_VISIBLE: string = "chat_visible";
    // chat end
    game_event.EVENT_CHANGE_INPUT_LIMIT = "cancel_input_limit";
    game_event.EVENT_SELECT_EMOTION = "select_emotion";
    game_event.EVENT_SELECT_EMOTION_FCHAT = "select_emotion_fchat";
    game_event.EVENT_KEYBOARD_SHOW = "keyboard_show";
    //键盘消失
    game_event.EVENT_KEYBOARD_HIDDEN = "keyboard_hidden";
    game_event.EVENT_KEYBOARD_HEIGHT_CHANGE = "keyboard_height_change";
    game_event.EVENT_CHAT_INPUT_MSG = "chat_input_msg";
    game_event.EVENT_CHAT_INPUT_SEND = "chat_input_send";
    game_event.EVENT_CHAT_CLEAR = "chat_clear";
    game_event.EVENT_SOUND_OPEN = "sound_open";
    game_event.EVENT_SOUND_CLOSE = "sound_close";
    game_event.EVENT_BUTTON_CLICK = "button_click";
    game_event.EVENT_TAB_SHOW = "tab_show";
    game_event.EVENT_GAMELOADINGUI_PROGRESS = "gameloadingui_progress";
    //combat
    game_event.EVENT_ENTERCOMBAT = "enter_combat";
    game_event.EVENT_OUTCOMBAT = "out_combat";
    game_event.EVENT_COMBATPLAYING = "combatplaying";
    game_event.EVENT_COMBATLOADINGUI_PROGRESS = "combatloadingui_progress";
    game_event.EVENT_COMBATPLAYERATTACK = "combat_playerattack";
    game_event.EVENT_COMBATPLAYERHPCHANGED = "combat_playerhpchanged";
    game_event.EVENT_COMBAT_DEFEAT = "combat_defeat";
    game_event.EVENT_COMBAT_SERIAL = "combat_serial";
    game_event.EVENT_COMBAT_NORMAL = "combat_normal";
    game_event.EVENT_COMBAT_QUICK = "combat_quick";
    game_event.EVENT_COMBAT_SPDCHANGED = "combat_spdchanged";
    game_event.EVENT_COMBATTURNSCHANGE = "combat_turnchanged";
    game_event.EVENT_COMBATLOADINGMGR_COMPLETE = "combatloadingmgr_complete";
    game_event.EVENT_COMBATLOADINGMGRV2_COMPLETE = "combatloadingmgrv2_complete";
    game_event.EVENT_COMBATLOADINGMGR_ERROR = "combatloadingmgr_error";
    game_event.EVENT_COMBATGO2NEXT = "combatgo2next";
    game_event.EVENT_LOADINGUI_PROGRESS = "loadingui_progress";
    game_event.EVENT_LOADINGMGR_ERROR = "loadingmgr_error";
    game_event.EVENT_LOADINGMGR_COMPLETE = "loadingmgr_complete";
})(game_event || (game_event = {}));
//# sourceMappingURL=game_event_def.js.map
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
    var game_main = /** @class */ (function (_super) {
        __extends(game_main, _super);
        function game_main() {
            var _this = _super.call(this) || this;
            _this.m_ui_sp = null;
            _this.m_render_sp = null;
            _this.m_render = null;
            _this.m_combat_render = null;
            _this.m_b_combat = false;
            _this.m_b_combatplaying = false;
            _this.m_combat_spd = 1.0;
            _this.m_b_net_inited = false;
            _this.m_b_gamestart = false;
            _this.m_curtime = 0;
            _this.m_itemlist = new Array();
            _this.m_svr_tm = 0;
            _this.m_svr_clitm = 0;
            _this.m_b_req_guestaccount = false;
            _this.m_b_logining = false;
            _this.m_b_RC_sp = true;
            frametask.add_task(_this, _this.update30, 1);
            frametask.add_task(_this, _this.update20, 2);
            frametask.add_task(_this, _this.update10, 6);
            frametask.add_task(_this, _this.update1, 60);
            return _this;
        }
        game_main.prototype.on_1s_tick = function () {
            this.fire_event_next_frame(game_event.EVENT_TIMER_TICK_1S);
        };
        game_main.prototype.start = function () {
            _super.prototype.start.call(this);
            core.game_tiplog('game_main start');
            this.m_ui_sp = new laya.display.Sprite();
            this.m_render_sp = new laya.display.Sprite();
            this.m_combat_sp = new laya.display.Sprite();
            utils.widget_ins().set_root(this.m_ui_sp);
            this.m_combat_render = new combat.combatimpl(this.m_combat_sp);
            this.m_combat_render.set_skill_config(config.Skillperform.get_Skillperform);
            this.m_combat_render.set_skillperform_config(config.Skillperformconfig.get_Skillperformconfig);
            this.m_render = new core.renderagent();
            this.m_render.set_walk_spd(200);
            this.m_render.set_avatar_config(config.Avatarinfo.get_Avatarinfo);
            this.m_render.set_map_config(config.Mapinfo.get_Mapinfo);
            this.m_render.set_ani_config(config.Aniinfo.get_Aniinfo);
            this.m_render.set_eff_config(config.Effectinfo.get_Effectinfo);
            this.m_render.initstage(this.m_render_sp);
            this.m_render.m_render.setworldwh(2560, 2560);
            this.m_render.setviewport(Laya.stage.designWidth, Laya.stage.designHeight);
            this.m_combat_render.m_scene.set_viewport(Laya.stage.designWidth, Laya.stage.designHeight);
            this.m_render.setcamerapos(0, 0);
            this.m_render_sp.width = 2560;
            this.m_render_sp.height = 2560;
            this.m_render_sp.on(Laya.Event.CLICK, this, this.on_click_sp);
            this.register_net_event(protocol_def.S2C_NOTIFY_MESSAGE, this.on_svr_messagebox);
            this.register_net_event(protocol_def.S2C_WEBSOCKET_HELLO, this.on_svr_notify);
            this.register_net_event(protocol_def.S2C_LOGIN, this.on_login_err);
            this.register_net_event(protocol_def.S2C_LOGIN_OK, this.on_login_ok);
            this.register_net_event(protocol_def.S2C_LOGIN_RELOGIN, this.on_relogin);
            this.register_net_event(protocol_def.S2C_NOTIFY_FLOAT, this.on_notifyfloat);
            this.register_net_event(protocol_def.S2C_LOGIN_SELECTROLE, this.on_selectrole);
            this.register_net_event(protocol_def.S2C_LOGIN_ROLEINFO, this.on_roleid);
            this.register_net_event(protocol_def.S2C_ITEM_LIST, this.on_get_itemlist);
            this.register_net_event(protocol_def.S2C_ASYNTIME, this.on_sync_svrtime);
            this.register_net_event(protocol_def.S2C_ACCOUNT_GUEST, this.on_account_guest);
            this.register_event(game_event.EVENT_NET_CONNECTED, this.on_net_connected);
            this.register_event(game_event.EVENT_NET_CLOSED, this.on_net_closed);
            this.register_event(game_event.EVENT_NET_ERROR, this.on_net_error);
            this.register_event(game_event.EVENT_TEST, this.on_testfunc);
            this.register_event(game_event.EVENT_TEST1, this.on_testfunc1);
            this.register_event(game_event.EVENT_TEST2, this.on_testfunc2);
            this.register_event(game_event.EVENT_TEST3, this.on_testfunc3);
            timer.timer_ins().add_timer(1000, this, this.on_1s_tick);
            game.get_module(module_enum.MODULE_SOUND).start();
            game.get_module(module_enum.MODULE_PLAYER).start();
            game.get_module(module_enum.MODULE_CARD).start();
            game.get_module(module_enum.MODULE_SCENE).start();
            game.get_module(module_enum.MODULE_CHAT_MSG).start();
            var combat_ins = game.get_module(module_enum.MODULE_COMBAT);
            combat_ins.start();
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINUI, true);
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINTOPUI, true);
            this.register_event(game_event.EVENT_ENTERCOMBAT, this.on_entercombat);
            this.register_event(game_event.EVENT_COMBATPLAYING, this.on_combatplaying);
            this.register_event(game_event.EVENT_OUTCOMBAT, this.on_outcombat);
            this.register_event(game_event.EVENT_COMBAT_NORMAL, this.on_combat_normal);
            this.register_event(game_event.EVENT_COMBAT_QUICK, this.on_combat_quick);
            this.register_event(game_event.EVENT_COMBAT_SPDCHANGED, this.on_combatspd_changed);
            var loading_ins = game.get_module(module_enum.MODULE_LOADING);
            loading_ins.start();
            var combatloading_ins = game.get_module(module_enum.MODULE_COMBATLOADING);
            combatloading_ins.start();
            game.get_module(module_enum.MODULE_COMBATLOADINGV2).start();
            net.net_ins().connect("129.204.91.54", 11009);
            this.on_outcombat();
        };
        game_main.prototype.get_render = function () {
            return this.m_render;
        };
        game_main.prototype.get_combat_render = function () {
            return this.m_combat_render;
        };
        game_main.prototype.on_combat_normal = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_combat_spd = 1.0;
        };
        game_main.prototype.on_combat_quick = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_combat_spd = 1.5;
        };
        game_main.prototype.on_combatspd_changed = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.m_combat_spd > 1.0) {
                this.m_combat_spd = 1.0;
            }
            else {
                this.m_combat_spd = 2.0;
            }
        };
        game_main.prototype.on_entercombat = function (user_data) {
            if (user_data === void 0) { user_data = null; }
            this.m_b_combat = true;
            var soundins = game.get_module(module_enum.MODULE_SOUND);
            soundins.enter_boss();
        };
        game_main.prototype.on_combatplaying = function (user_data) {
            if (user_data === void 0) { user_data = null; }
            if (this.m_b_RC_sp == true) {
                this.m_render_sp.removeSelf();
                this.m_combat_sp.removeSelf();
                // this.m_ui_sp.removeSelf();
                Laya.stage.addChild(this.m_combat_sp);
                Laya.stage.addChild(this.m_ui_sp);
            }
            this.m_b_combatplaying = true;
        };
        game_main.prototype.on_outcombat = function (user_data) {
            if (user_data === void 0) { user_data = null; }
            if (this.m_b_RC_sp == true) {
                this.m_render_sp.removeSelf();
                this.m_combat_sp.removeSelf();
                // this.m_ui_sp.removeSelf();
                Laya.stage.addChild(this.m_render_sp);
                Laya.stage.addChild(this.m_ui_sp);
            }
            var soundins = game.get_module(module_enum.MODULE_SOUND);
            soundins.enter_scene();
            this.m_b_combat = false;
            this.m_b_combatplaying = false;
        };
        game_main.prototype.on_tab_show = function (ud) {
            if (ud === void 0) { ud = null; }
            var flag = ud["flag"];
            if (flag == true) {
                this._remove_RC_sp();
            }
            else {
                this._add_RC_sp();
            }
        };
        game_main.prototype._add_RC_sp = function () {
            if (this.m_b_RC_sp == false) {
                this.m_combat_sp.removeSelf();
                this.m_render_sp.removeSelf();
                if (this.m_b_combatplaying == true) {
                    Laya.stage.addChild(this.m_combat_sp);
                }
                else {
                    Laya.stage.addChild(this.m_render_sp);
                }
                Laya.stage.addChild(this.m_ui_sp);
                this.m_b_RC_sp = true;
            }
        };
        game_main.prototype._remove_RC_sp = function () {
            if (this.m_b_RC_sp == true) {
                this.m_combat_sp.removeSelf();
                this.m_render_sp.removeSelf();
                this.m_b_RC_sp = false;
            }
        };
        game_main.prototype.on_click_sp = function (e) {
            core.game_tiplog("onClick sp ", e.stageX, e.stageY);
            //
            this.fire_event_next_frame(game_event.EVENT_SCENE_CLICK, [e.stageX, e.stageY]);
            //
        };
        game_main.prototype.on_net_error = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_errlog("on_net_error");
            this.m_b_logining = false;
            this.m_b_req_guestaccount = false;
            helper.show_msgbox("net error");
        };
        game_main.prototype.on_net_closed = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_errlog("on_net_closed");
            this.m_b_logining = false;
            this.m_b_req_guestaccount = false;
            helper.show_msgbox("net closed");
        };
        game_main.prototype.on_net_connected = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_tiplog("on_net_connected");
            var account = helper.get_local("my_demo_account");
            var pwd = helper.get_local("my_demo_pwd");
            if (account == null || account.length <= 0) {
                this.req_guest_account();
            }
            else {
                this.req_login(account, pwd);
            }
        };
        game_main.prototype.req_guest_account = function () {
            if (this.m_b_req_guestaccount) {
                return;
            }
            this.m_b_req_guestaccount = true;
            net.net_ins().send(protocol_def.C2S_ACCOUNT_GUEST, {});
        };
        game_main.prototype.on_account_guest = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_account_guest ", ud, this.m_b_req_guestaccount);
            this.m_b_req_guestaccount = false;
            var account = ud["account"];
            var pwd = ud["pwd"];
            helper.set_local("my_demo_account", account);
            helper.set_local("my_demo_pwd", pwd);
            this.req_login(account, pwd);
        };
        game_main.prototype.req_login = function (account, pwd) {
            core.net_tiplog("req_login ", account, pwd, this.m_b_logining);
            if (this.m_b_logining) {
                return;
            }
            this.m_b_logining = true;
            var ld = {};
            ld["clientver"] = { "major": 0, "minor": 0, "patch": 0 };
            ld["scriptver"] = { "major": 0, "minor": 0, "patch": 0 };
            ld["productver"] = { "major": 0, "minor": 0, "patch": 0 };
            ld["account"] = account;
            ld["pwd"] = pwd;
            ld["platform"] = 0;
            ld["client_type"] = 0;
            ld["device"] = "";
            ld["ret_session"] = 0;
            ld["token"] = "";
            ld["hwinfo"] = "";
            ld["idfa"] = "";
            net.net_ins().send(protocol_def.C2S_LOGIN, ld);
        };
        game_main.prototype.on_notifyfloat = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_notifyfloat ", ud);
        };
        game_main.prototype.on_relogin = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_relogin ", ud);
        };
        game_main.prototype.on_login_ok = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_login_ok ", ud);
            this.m_b_logining = false;
        };
        game_main.prototype.req_svr_tm = function () {
            console.log("req_svr_tm ");
            var curtm = laya.utils.Browser.now() / 1000;
            net.net_ins().send(protocol_def.C2S_LOGIN_ASYN_TIME, { "time": curtm, "sign": "" });
        };
        game_main.prototype.get_svr_tm = function () {
            if (this.m_svr_clitm == 0) {
                return 0;
            }
            var curclitm = laya.utils.Browser.now() / 1000;
            var delta = curclitm - this.m_svr_clitm;
            return this.m_svr_tm + delta;
        };
        game_main.prototype.on_sync_svrtime = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_sync_svrtime ", ud);
            var clitm = ud["time"];
            var svrtm = ud["srvtime"];
            this.m_svr_tm = svrtm;
            this.m_svr_clitm = clitm;
            console.log("on_sync_svrtime cur svrtm ", clitm, this.m_svr_tm);
        };
        game_main.prototype.on_testfunc2 = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_testfunc2", ud);
        };
        game_main.prototype.on_testfunc3 = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_testfunc3 buyitem", ud);
        };
        game_main.prototype.on_testfunc1 = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_testfunc1 refresh", ud);
        };
        game_main.prototype.on_testfunc = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_testfunc");
        };
        game_main.prototype.on_roleid = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_roleinfo ", ud);
            var roleid = ud["roles"][0]["rid"];
            var shape = ud["roles"][0]["shape"];
            var name = ud["roles"][0]["name"];
            var mp = data.get_data(data_enum.DATA_PLAYER);
            mp.m_pid = roleid;
            mp.m_name = name;
            mp.m_shape = shape;
            console.log("request select ", roleid);
            net.net_ins().send(protocol_def.C2S_LOGIN_SELECTROLE, { "rid": roleid });
        };
        game_main.prototype.on_get_itemlist = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_get_itemlist ", ud);
            var items = ud['items'];
            this.m_itemlist = new Array();
            var idx = 0;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var i = items_1[_i];
                var id = i['id'];
                var shape = i['sid'];
                var pos = i['pos'];
                var used = i['key'];
                console.log("item:", idx, id, shape, pos, used);
                idx += 1;
                this.m_itemlist.push(i);
            }
        };
        game_main.prototype.on_selectrole = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_selectrole ", ud);
            net.net_ins().send(protocol_def.C2S_ROLE_INFO, {});
            net.net_ins().send(protocol_def.C2S_ITEM_GETLIST, {});
            this.req_svr_tm();
        };
        game_main.prototype.on_login_err = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_login_err ", ud);
            this.m_b_logining = false;
        };
        game_main.prototype.on_svr_notify = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_svr_notify ", ud);
        };
        game_main.prototype.on_svr_messagebox = function (ud) {
            if (ud === void 0) { ud = null; }
        };
        game_main.prototype.update30 = function () {
            //update here
            if (this.m_curtime == 0) {
                this.m_curtime = laya.utils.Browser.now();
            }
            else {
                var nowtime = laya.utils.Browser.now();
                var delta = nowtime - this.m_curtime;
                this.m_curtime = nowtime;
                if (this.m_b_combatplaying) {
                    this.m_combat_render.update(delta * this.m_combat_spd);
                }
                else {
                    this.m_render.update(delta);
                }
            }
            timer.timer_ins().update(laya.utils.Browser.now());
        };
        game_main.prototype.update20 = function () {
        };
        game_main.prototype.update10 = function () {
            utils.event_ins().dispatch_all_delay_event();
            net.net_ins().update();
        };
        game_main.prototype.update1 = function () {
            utils.widget_ins().check_release();
            if (this.m_render != null && !this.m_b_combatplaying) {
                this.m_render.check_release();
            }
        };
        game_main.prototype.update = function (d) {
            //
            var nowtime = laya.utils.Browser.now();
            //render here
            if (this.m_b_combatplaying) {
                this.m_combat_render.render();
            }
            else {
                this.m_render.render();
            }
            var nowtimeafterrender = laya.utils.Browser.now();
            var tm_total = 17;
            frametask.run(tm_total - nowtimeafterrender + nowtime);
        };
        game_main.prototype.dispose = function () {
            if (this.m_render != null) {
                this.m_render.dispose();
                this.m_render = null;
            }
            if (this.m_combat_render != null) {
                this.m_combat_render.dispose();
                this.m_combat_render = null;
            }
            this.m_ui_sp.removeSelf();
            this.m_render_sp.removeSelf();
            this.m_combat_sp.removeSelf();
            this.m_combat_sp = null;
            this.m_ui_sp = null;
            this.m_render_sp = null;
            _super.prototype.dispose.call(this);
        };
        return game_main;
    }(utils.game_module));
    game.game_main = game_main;
})(game || (game = {}));
//# sourceMappingURL=game_main.js.map
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
    var loadingmgr = /** @class */ (function (_super) {
        __extends(loadingmgr, _super);
        function loadingmgr() {
            var _this = _super.call(this) || this;
            _this.m_assets = null;
            _this.m_caller = null;
            _this.m_min_time = 3000;
            _this.m_start_time = 0;
            _this.m_cur_progress = 0;
            _this.m_temp_show = false;
            _this.m_b_loginsucceed = false;
            return _this;
        }
        loadingmgr.prototype.start = function () {
            _super.prototype.start.call(this);
            core.game_tiplog('loadingmgr start');
            timer.timer_ins().add_timer(50, this, this.on_time_func);
        };
        loadingmgr.prototype.login_succeed = function (flag) {
            this.m_b_loginsucceed = flag;
        };
        loadingmgr.prototype.on_time_func = function () {
            if (this.m_temp_show) {
                var cur_time = helper.get_cur_milltime();
                if (cur_time >= (this.m_start_time + this.m_min_time)) {
                    this.notify_end();
                    this.m_temp_show = false;
                }
                else {
                    this.m_cur_progress += (1.0 - this.m_cur_progress) * (this.m_start_time + this.m_min_time - cur_time) / this.m_min_time;
                    if (this.m_cur_progress > 1.0) {
                        this.m_cur_progress = 1.0;
                    }
                    if (!this.m_b_loginsucceed) {
                        this.fire_event_next_frame(game_event.EVENT_LOADINGUI_PROGRESS, this.m_cur_progress);
                    }
                    else {
                        this.fire_event_next_frame(game_event.EVENT_GAMELOADINGUI_PROGRESS, this.m_cur_progress);
                    }
                }
            }
        };
        loadingmgr.prototype.start_load = function (assets, caller, state) {
            if (state === void 0) { state = 0; }
            if (this.m_caller != null) {
                return;
            }
            this.m_caller = caller;
            this.m_assets = assets;
            if (!this.m_b_loginsucceed) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_LOADING_UI, true);
            }
            else {
                utils.widget_ins().show_widget(widget_enum.WIDGET_GAMELOADING, true);
            }
            core.myload(assets, laya.utils.Handler.create(this, this.on_load), laya.utils.Handler.create(this, this.on_progress, null, false));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
            core.res_warnlog("loading 加载开始 ", this.m_assets, this.m_caller);
            this.m_start_time = helper.get_cur_milltime();
            this.m_cur_progress = 0;
            this.m_temp_show = false;
        };
        loadingmgr.prototype.is_loading = function () {
            return this.m_caller != null;
        };
        loadingmgr.prototype.end_load = function () {
            utils.widget_ins().show_widget(widget_enum.WIDGET_LOADING_UI, false);
            utils.widget_ins().show_widget(widget_enum.WIDGET_GAMELOADING, false);
            this.m_caller = null;
            this.m_temp_show = false;
        };
        loadingmgr.prototype.on_progress = function (v) {
            core.game_tiplog("loading 加载进度 ", v, this.m_assets);
            this.m_cur_progress = v;
            if (this.m_cur_progress > 1.0) {
                this.m_cur_progress = 1.0;
            }
            if (!this.m_b_loginsucceed) {
                this.fire_event_next_frame(game_event.EVENT_LOADINGUI_PROGRESS, this.m_cur_progress);
            }
            else {
                this.fire_event_next_frame(game_event.EVENT_GAMELOADINGUI_PROGRESS, this.m_cur_progress);
            }
        };
        loadingmgr.prototype.on_load = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.res_warnlog("loading 加载完成 ", this.m_assets);
            var cur_time = helper.get_cur_milltime();
            if (cur_time < (this.m_start_time + this.m_min_time)) {
                this.m_temp_show = true;
                return;
            }
            this.notify_end();
        };
        loadingmgr.prototype.notify_end = function () {
            this.fire_event(game_event.EVENT_LOADINGMGR_COMPLETE, this.m_caller);
            this.m_caller = null;
        };
        loadingmgr.prototype.onError = function (err) {
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.game_tiplog("loading 加载失败 ", err, this.m_assets);
            this.fire_event(game_event.EVENT_LOADINGMGR_ERROR, this.m_caller);
            this.m_caller = null;
        };
        loadingmgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return loadingmgr;
    }(utils.game_module));
    game.loadingmgr = loadingmgr;
})(game || (game = {}));
//# sourceMappingURL=loading.js.map
var game;
(function (game) {
    function init_game_module() {
        utils.module_ins().register_module(module_enum.MODULE_MAIN, game.game_main);
        utils.module_ins().register_module(module_enum.MODULE_PLAYER, game.player_main);
        utils.module_ins().register_module(module_enum.MODULE_CARD, game.card_main);
        utils.module_ins().register_module(module_enum.MODULE_TIPS, game.tips_mgr);
        utils.module_ins().register_module(module_enum.MODULE_SYS_MSG, game.sys_msg);
        utils.module_ins().register_module(module_enum.MODULE_SCENE, game.scene);
        utils.module_ins().register_module(module_enum.MODULE_CHAT_MSG, game.chat_msg);
        utils.module_ins().register_module(module_enum.MODULE_SOUND, game.soundmgr);
        utils.module_ins().register_module(module_enum.MODULE_COMBATLOADING, game.combatloadingmgr);
        utils.module_ins().register_module(module_enum.MODULE_COMBATPLAYER, game.combatplayer);
        utils.module_ins().register_module(module_enum.MODULE_COMBATLOADINGV2, game.combatloadingmgrV2);
        utils.module_ins().register_module(module_enum.MODULE_COMBAT, game.combatmgr);
        utils.module_ins().register_module(module_enum.MODULE_COMBATUI, game.combat_ui_mgr);
        utils.module_ins().register_module(module_enum.MODULE_LOADING, game.loadingmgr);
    }
    game.init_game_module = init_game_module;
    function get_module(module_name) {
        return utils.module_ins().get_module(module_name);
    }
    game.get_module = get_module;
})(game || (game = {}));
//# sourceMappingURL=module_def.js.map
var module_enum;
(function (module_enum) {
    module_enum.MODULE_MAIN = "game_main";
    module_enum.MODULE_PLAYER = "player_main";
    module_enum.MODULE_CARD = "card_main";
    module_enum.MODULE_TIPS = "tips_main";
    module_enum.MODULE_SYS_MSG = "sys_msgbox";
    module_enum.MODULE_SCENE = "scene";
    module_enum.MODULE_CHAT_MSG = "chat_msg";
    module_enum.MODULE_SOUND = "sound";
    module_enum.MODULE_COMBATLOADING = "combatloading";
    module_enum.MODULE_COMBATLOADINGV2 = "combatloadingv2";
    module_enum.MODULE_COMBAT = "combat";
    module_enum.MODULE_COMBATPLAYER = "combatplayer";
    module_enum.MODULE_COMBATUI = "combatUI";
    module_enum.MODULE_LOADING = "loading";
})(module_enum || (module_enum = {}));
//# sourceMappingURL=module_enum.js.map
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
    var player_main = /** @class */ (function (_super) {
        __extends(player_main, _super);
        function player_main() {
            var _this = _super.call(this) || this;
            _this.m_pdata_ins = null;
            _this.m_gamemain_ins = null;
            return _this;
        }
        player_main.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_event(game_event.EVENT_TIMER_TICK_1S, this.on_1s_tick);
            this.register_net_event(protocol_def.S2C_ROLE_INFO, this.on_get_roleinfo);
            this.m_pdata_ins = data.get_data(data_enum.DATA_PLAYER);
            this.m_gamemain_ins = game.get_module(module_enum.MODULE_MAIN);
        };
        player_main.prototype.on_1s_tick = function (ud) {
            if (ud === void 0) { ud = null; }
            var curtm = this.m_gamemain_ins.get_svr_tm();
            if (curtm == 0) {
                return;
            }
            var gold = this.m_pdata_ins.m_gold;
            var goldspd = this.m_pdata_ins.m_goldspd;
            var exp = this.m_pdata_ins.m_exp;
            var expspd = this.m_pdata_ins.m_expspd;
            var stamina = this.m_pdata_ins.m_stamina;
            var lasttm = this.m_pdata_ins.m_last_time;
            gold = gold + (goldspd * (curtm - lasttm));
            exp = exp + (expspd * (curtm - lasttm));
            this.fire_event_next_frame(game_event.EVENT_UI_MAINTOPUPDATE, [gold, stamina]);
            this.fire_event_next_frame(game_event.EVENT_UI_MAINUPDATE, [exp, this.m_pdata_ins.m_expmax]);
        };
        player_main.prototype.on_get_roleinfo = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_get_roleinfo ", ud);
            var lv = ud['lv'];
            var shape = ud['shape'];
            var exp = ud['exp'];
            var gold = ud['gold'];
            var expspd = ud['expspd'];
            var goldspd = ud['goldspd'];
            var stamina = ud['stamina'];
            var tm = ud['tm'];
            console.log("info:", lv, shape, exp, gold, expspd, goldspd, stamina, tm);
            var pdata = this.m_pdata_ins;
            pdata.m_lv = lv;
            pdata.m_shape = shape;
            pdata.m_exp = exp;
            pdata.m_gold = gold;
            pdata.m_expspd = expspd;
            pdata.m_goldspd = goldspd;
            pdata.m_stamina = stamina;
            pdata.m_last_time = tm;
            var exp_obj = config.Player_exp.get_Player_exp(pdata.m_lv);
            ;
            if (exp_obj != null) {
                var expmax = exp_obj['exp'];
                pdata.m_expmax = expmax;
            }
            this.fire_event_next_frame(game_event.EVENT_UI_MAINTOPUPDATE);
        };
        player_main.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return player_main;
    }(utils.game_module));
    game.player_main = player_main;
})(game || (game = {}));
//# sourceMappingURL=player_main.js.map
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
    var scene = /** @class */ (function (_super) {
        __extends(scene, _super);
        function scene() {
            var _this = _super.call(this) || this;
            _this.m_role_obj = null;
            _this.m_b_start_run = false;
            _this.m_b_run_start_x = -1;
            _this.m_b_run_start_y = -1;
            return _this;
        }
        scene.prototype.start = function () {
            _super.prototype.start.call(this);
            core.game_tiplog('scene start');
            //this.m_render.setmapbk("1002.jpg");
            //this.m_render.m_render.setworldwh(9600,5504);
            //this.m_render.addani(1001,100,100,false);
            //this.m_render.addani(1001,150,100,true);
            //this.m_render.addani(1001,this.m_render.m_render.getworldw()/2,this.m_render.m_render.getworldh()/2,false);
            //
            this.register_net_event(protocol_def.S2C_HERO_GOTO, this.on_main_force_goto);
            this.register_net_event(protocol_def.S2C_HERO_ENTERSCENE, this.on_main_enterscene);
            this.register_net_event(protocol_def.S2C_MAP_TRACK, this.on_net_rolemove);
            this.register_net_event(protocol_def.S2C_MAP_DEL, this.on_net_scenedel);
            this.register_net_event(protocol_def.S2C_MAP_ADDPLAYER, this.on_net_addplayer);
            this.register_net_event(protocol_def.S2C_MAP_REGIONCHANGE, this.on_regionchanged);
            this.register_event(game_event.EVENT_SCENE_CLICK, this.on_scene_click);
            this.register_event(game_event.EVENT_SCENE_STOP, this.on_scene_stop);
            var game_ins = game.get_module(module_enum.MODULE_MAIN);
            this.m_render = game_ins.get_render();
            this.register_event(game_event.EVENT_TIMER_TICK_1S, this.on_check_mainplayer_pos);
        };
        scene.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        scene.prototype._get_mainrole_id = function () {
            var mp = data.get_data(data_enum.DATA_PLAYER);
            return mp.m_scene_roleid;
        };
        scene.prototype.is_mainplayer = function (pid) {
            var mp = data.get_data(data_enum.DATA_PLAYER);
            return pid == mp.m_pid;
        };
        scene.prototype.on_role_enter = function (id, name, shape, lv, cls, x, y, desc) {
            core.game_tiplog("scene on_role_enter ", id, name, shape, lv, cls, x, y);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(id);
            var role_id = 0;
            if (sroledata != null) {
                core.game_tiplog("error! already have this role ", id);
                role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delrole(id);
            }
            scenedata.addrole(id, shape, name, lv, cls, x, y, desc);
            sroledata = scenedata.getrole(id);
            var sx = x * this.m_render.getmap_gridw();
            var sy = y * this.m_render.getmap_gridh();
            if (shape == 0) {
                shape = 102;
            }
            role_id = this.m_render.addunit(name, shape, sx, sy);
            sroledata.set_role_id(role_id);
            sroledata.m_desc = desc;
            var ra = this.m_render.getunit(role_id);
            if (ra != null) {
                ra.change_action(0 /* ACTION_STAND */);
                ra.change_weapon(10001);
                ra.change_ride(20001, 30001);
                ra.set_ride_h(30);
                ra.change_wing(40001);
            }
            this.fire_event_next_frame(game_event.EVENT_PLAYER_ENTER);
        };
        scene.prototype.on_role_out = function (id) {
            core.game_tiplog("scene on_role_out ", id);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(id);
            if (sroledata != null) {
                var role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delrole(id);
                this.fire_event_next_frame(game_event.EVENT_PLAYER_OUT);
                return;
            }
            sroledata = scenedata.getnpc(id);
            if (sroledata != null) {
                var role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delnpc(id);
                return;
            }
        };
        scene.prototype.on_role_move = function (id, x, y) {
            core.game_tiplog("scene on_role_move ", id, x, y);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(id);
            if (sroledata == null) {
                sroledata = scenedata.getnpc(id);
                if (sroledata == null) {
                    core.game_tiplog("scene have not this role ", id, x, y);
                    return;
                }
            }
            sroledata.set_pos(x, y);
            var role_id = sroledata.m_role_id;
            var pt = this.m_render.unit_walk2(role_id, x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh());
            var mavatar = this.m_render.getunit(role_id);
            if (pt == null && mavatar != null) {
                if (this.m_render.is_scene_block(mavatar.x, mavatar.y)) {
                    pt = this.m_render.unit_walk2(role_id, x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh(), true);
                }
            }
        };
        scene.prototype.on_enter_scene = function (ssid, resid, x, y) {
            core.game_tiplog("scene on_enter_scene ", ssid, resid, x, y);
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
            var mavatar = this.m_render.getunit(this._get_mainrole_id());
            if (mavatar != null) {
                this.m_render.unit_stop(this._get_mainrole_id());
            }
            this.m_render.clear();
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            scenedata.clearallrole();
            scenedata.clearallnpc();
            scenedata.clear_all_cli_npc();
            var mp = data.get_data(data_enum.DATA_PLAYER);
            mp.m_sid = ssid;
            mp.m_sresid = resid;
            mp.x = x;
            mp.y = y;
            scenedata.addrole(mp.m_pid, mp.m_shape, mp.m_name, mp.m_lv, mp.m_class, mp.x, mp.y, mp.m_desc);
            //sid = 1700;
            this.m_render.entermap(resid, false);
            this.m_render.setmapbk("map/city/" + resid.toString() + "/" + resid.toString() + ".jpg");
            var sx = x * this.m_render.getmap_gridw();
            var sy = y * this.m_render.getmap_gridh();
            core.game_tiplog("enter scene create main player ", mp.m_name, mp.m_shape, sx, sy, x, y);
            var m_role_id = this.m_render.addunit(mp.m_name, mp.m_shape, sx, sy);
            scenedata.setroleid(mp.m_pid, m_role_id);
            mp.m_scene_roleid = m_role_id;
            /*
            let chase_id:number = this.m_render.addunit("",50001,0,0);
            this.m_render.set_follow_id(chase_id,this.m_role_id);
            let chase_role:core.renderavatar = this.m_render.getunit(chase_id);
            chase_role.set_dxy(0,-100);
            chase_role.show_shadow(false);
            chase_role = this.m_render.getunit(this.m_role_id);
            chase_role.change_weapon(10001);
            chase_role.change_ride(20001,30001);
            chase_role.set_ride_h(30);
            chase_role.change_wing(40001);
            */
            //this.m_render.addani(1001,150,100,true);
            //this.m_render.addani(1001,this.m_render.m_render.getworldw()/2,this.m_render.m_render.getworldh()/2,false);
            //
            var unit = this.m_render.getunit(this._get_mainrole_id());
            if (unit != null) {
                unit.change_action(0 /* ACTION_STAND */);
                unit.change_weapon(10001);
                unit.change_ride(20001, 30001);
                unit.set_ride_h(30);
                unit.change_wing(40001);
                this.m_render.cameralookat(unit);
                this.m_role_obj = unit;
            }
            this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE, [x, y]);
            this.fire_event_next_frame(game_event.EVENT_ENTERSCENE, { "scene_id": ssid });
        };
        scene.prototype.req_unit_move = function (uid, sx, sy) {
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(uid);
            if (sroledata != null) {
                uid = sroledata.m_role_id;
            }
            else {
                return;
            }
            var wpos = new Laya.Point();
            wpos.x = sx * this.m_render.getmap_gridw();
            wpos.y = sy * this.m_render.getmap_gridh();
            var ret = this.m_render.unit_walk2(uid, wpos.x, wpos.y);
            var mavatar = this.m_render.getunit(uid);
            if (ret == null && mavatar != null) {
                if (this.m_render.is_scene_block(mavatar.x, mavatar.y)) {
                    ret = this.m_render.unit_walk2(uid, wpos.x, wpos.y, true);
                }
            }
            return ret;
        };
        scene.prototype.req_main_move = function (sx, sy) {
            var wpos = new Laya.Point();
            wpos.x = sx * this.m_render.getmap_gridw();
            wpos.y = sy * this.m_render.getmap_gridh();
            this.m_render.addeff(1003, wpos.x, wpos.y, true, true);
            var mp = data.get_data(data_enum.DATA_PLAYER);
            var ret = this.req_unit_move(mp.m_pid, sx, sy);
            if (ret != null) {
                var mx = ret.x;
                var my = ret.y;
                mx = Math.floor(mx / this.m_render.getmap_gridw());
                my = Math.floor(my / this.m_render.getmap_gridh());
                //net.net_ins().send(protocol_def.c2s_move,{'x':mx,'y':my});
                this.m_b_start_run = true;
                var mavatar = this.m_render.getunit(this._get_mainrole_id());
                var cx = mavatar.x;
                var cy = mavatar.y;
                cx = Math.floor(cx / this.m_render.getmap_gridw());
                cy = Math.floor(cy / this.m_render.getmap_gridh());
                if (this.m_b_run_start_x == -1) {
                    this.m_b_run_start_x = cx;
                    this.m_b_run_start_y = cy;
                }
                mp.x = mx;
                mp.y = my;
                //this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE,[mx,my]);
            }
        };
        scene.prototype.wpos2spos = function (x, y) {
            var wpos = new laya.maths.Point(x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh());
            var spos = this.m_render.worldpos2stagepos(wpos);
            spos.x = spos.x * 1.0;
            spos.y = spos.y * 1.0;
            return spos;
        };
        scene.prototype.on_click_sp = function (sx, sy) {
            if (this._get_mainrole_id() == 0) {
                return;
            }
            //
            //
            var src_x = sx;
            var src_y = sy;
            //
            var spos = new laya.maths.Point(sx, sy);
            var wpos = this.m_render.stagepos2worldpos(spos);
            var click_id = this.m_render.check_point(wpos.x, wpos.y);
            if (click_id != 0) {
                var scenedata = data.get_data(data_enum.DATA_SCENE);
                for (var _i = 0, _a = scenedata.m_npc_mgr.m_role_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.m_role_id == click_id) {
                        net.net_ins().send(protocol_def.C2S_NPC_LOOK, { 'id': i.m_pid });
                        return;
                    }
                }
                for (var _b = 0, _c = scenedata.m_role_mgr.m_role_list; _b < _c.length; _b++) {
                    var i = _c[_b];
                    if (i.m_role_id == click_id && !this.is_mainplayer(i.m_pid)) {
                        this.fire_event_next_frame(game_event.EVENT_CLICK_PLAYER, { "pid": i.m_pid });
                        return;
                    }
                }
            }
            this.req_main_move(wpos.x / this.m_render.getmap_gridw(), wpos.y / this.m_render.getmap_gridh());
        };
        scene.prototype._get_move_dir = function (pt) {
            if (pt.x == 0 && pt.y == 0) {
                alert("get_move_dir error!!");
                return 0;
            }
            if (pt.x == 0 && pt.y > 0) {
                return 0;
            }
            if (pt.x == 0 && pt.y < 0) {
                return 4;
            }
            if (pt.x > 0 && pt.y == 0) {
                return 6;
            }
            if (pt.x < 0 && pt.y == 0) {
                return 2;
            }
            if (pt.x > 0 && pt.y > 0) {
                return 7;
            }
            if (pt.x > 0 && pt.y < 0) {
                return 5;
            }
            if (pt.x < 0 && pt.y > 0) {
                return 1;
            }
            if (pt.x < 0 && pt.y < 0) {
                return 3;
            }
            alert("get_move_dir error end!!");
            return 0;
        };
        scene.prototype.send_move_step = function (sx, sy, step_list) {
            var C2S_MOVE_STEP = 0x140;
            var C2S_MOVE_STEP_SUB = 0x0;
            var STEP_MAX = 16;
            var sendbuff = new Laya.Byte();
            sendbuff.endian = Laya.Byte.BIG_ENDIAN;
            while (step_list.length > 0) {
                sendbuff.clear();
                //sendbuff.writeUint8(C2S_MOVE_STEP_SUB);
                sendbuff.writeUint16(sx);
                sendbuff.writeUint16(sy);
                var step_count = step_list.length;
                if (step_count > STEP_MAX) {
                    step_count = STEP_MAX;
                }
                sendbuff.writeUint8(step_count);
                var idx = 0;
                var tmp = "" + sx.toString() + " " + sy.toString();
                var step_obj = new Array();
                var start_x = sx;
                var start_y = sy;
                while (idx < step_count) {
                    var pt = step_list.shift();
                    var dir = this._get_move_dir(pt) + 1;
                    sendbuff.writeUint8(dir);
                    sx = sx + pt.x;
                    sy = sy + pt.y;
                    idx += 1;
                    tmp += " " + pt.x.toString() + " " + pt.y.toString() + " " + dir.toString();
                    step_obj.push(dir);
                }
                core.game_tiplog("s2c movestep ", tmp);
                net.net_ins().send_raw_buff(C2S_MOVE_STEP, sendbuff);
                //net.net_ins().send(protocol_def.C2S_MAP_MOVE,{'x':start_x,'y':start_y,'step':step_obj});
            }
        };
        scene.prototype.on_check_mainplayer_pos = function (ud) {
            if (ud === void 0) { ud = null; }
            //
            if (this.m_role_obj != null) {
                var x = this.m_role_obj.x;
                var y = this.m_role_obj.y;
                var ret = this.m_render.is_scene_mask(x, y);
                if (ret) {
                    this.m_role_obj.alpha = 0.5;
                }
                else {
                    this.m_role_obj.alpha = 1.0;
                }
            }
            //
            if (this.m_b_start_run) {
                core.game_tiplog("on_check_mainplayer_pos start");
                var mavatar = this.m_render.getunit(this._get_mainrole_id());
                var cx = mavatar.x;
                var cy = mavatar.y;
                cx = Math.floor(cx / this.m_render.getmap_gridw());
                cy = Math.floor(cy / this.m_render.getmap_gridh());
                core.game_tiplog("on_check_mainplayer_pos ", this.m_b_run_start_x, this.m_b_run_start_y, cx, cy);
                if (cx == this.m_b_run_start_x && cy == this.m_b_run_start_y) {
                    if (this.m_render.is_unit_walk(this._get_mainrole_id()) == false) {
                        this.m_b_start_run = false;
                    }
                    this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE, [cx, cy]);
                    core.game_tiplog("on_check_mainplayer_pos end1");
                    return;
                }
                else {
                    var dx = cx - this.m_b_run_start_x;
                    var dy = cy - this.m_b_run_start_y;
                    if (dx != 0) {
                        dx = dx / Math.abs(dx);
                    }
                    if (dy != 0) {
                        dy = dy / Math.abs(dy);
                    }
                    var step_list = new Array();
                    var stepx = this.m_b_run_start_x;
                    var stepy = this.m_b_run_start_y;
                    while (stepx != cx || stepy != cy) {
                        step_list.push(new laya.maths.Point(dx, dy));
                        stepx = stepx + dx;
                        stepy = stepy + dy;
                        if (stepx == cx) {
                            dx = 0;
                        }
                        if (stepy == cy) {
                            dy = 0;
                        }
                    }
                    this.send_move_step(this.m_b_run_start_x, this.m_b_run_start_y, step_list);
                    this.m_b_run_start_x = cx;
                    this.m_b_run_start_y = cy;
                    this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE, [cx, cy]);
                }
                core.game_tiplog("on_check_mainplayer_pos end2");
            }
        };
        scene.prototype.on_scene_stop = function (ud) {
            if (ud === void 0) { ud = null; }
            //this.on_check_mainplayer_pos();
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
        };
        scene.prototype.on_main_force_goto = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
            var x = ud['x'];
            var y = ud['y'];
            core.game_errlog("on_main_force_goto ", x, y);
            var mavatar = this.m_render.getunit(this._get_mainrole_id());
            if (mavatar != null) {
                this.m_render.unit_stop(this._get_mainrole_id());
                mavatar.set_pos(x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh());
            }
        };
        scene.prototype.on_main_enterscene = function (ud) {
            if (ud === void 0) { ud = null; }
            var rid = ud['id'];
            var sid = ud['scid'];
            var ssid = ud['scsid'];
            var resid = ud['resid'];
            var scname = ud['scname'];
            var x = ud['x'];
            var y = ud['y'];
            core.game_tiplog("on_main_enterscene ", ud, x, y);
            //resid = 1001;
            this.on_enter_scene(ssid, resid, x, y);
        };
        scene.prototype.on_net_addplayer = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_net_addplayer ", ud);
            var id = ud["id"];
            var name = ud["name"];
            var shape = ud["shape"];
            var cls = 1; //ud["class"];
            var lv = 1; //ud["lv"];
            var x = ud["x"];
            var y = ud["y"];
            var desc = ud["desc"];
            // 服务器去掉了这两个字段
            // let title:number = ud["title"];
            // let touxian:number = ud["touxian"];
            this.on_role_enter(id, name, shape, lv, cls, x, y, desc);
        };
        scene.prototype.on_regionchanged = function (ud) {
            core.game_tiplog("on_regionchanged ", ud);
            var left = ud['x'];
            var top = ud['y'];
            var right = ud['rw'];
            var bottom = ud['rh'];
            core.game_tiplog("on_regionchanged ", left, top, right, bottom);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            for (var _i = 0, _a = scenedata.m_role_mgr.m_role_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (this.is_mainplayer(i.m_pid)) {
                    continue;
                }
                //自己不删除
                //need code 如果将来场景里有组队，则要加入下面处理
                //如果在组队中，并且只是队员，而不是队长，暂时跳过不处理
                //如果在组队中，并且是队长，则连整个队伍一起删除
                //end need code
                if (i.x < left || i.x > right || i.y < top || i.y > bottom) {
                    this.on_role_out(i.m_pid);
                }
            }
        };
        scene.prototype.on_net_scenedel = function (ud) {
            core.game_tiplog("on_net_scenedel ", ud);
            var id = ud["id"];
            this.on_role_out(id);
        };
        scene.prototype.on_net_rolemove = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_net_rolemove ", ud);
            var id = ud["id"];
            var x = ud["x"];
            var y = ud["y"];
            var dx = ud["dx"];
            var dy = ud["dy"];
            core.game_tiplog("on_net_rolemove data ", id, x, y, dx, dy);
            this.on_role_move(id, dx, dy);
        };
        scene.prototype.on_scene_click = function (user_data) {
            if (user_data === void 0) { user_data = null; }
            core.game_tiplog("scene ins on_game_click ", user_data);
            this.on_click_sp(user_data[0], user_data[1]);
        };
        return scene;
    }(utils.game_module));
    game.scene = scene;
})(game || (game = {}));
//# sourceMappingURL=scene.js.map
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
    var soundmgr = /** @class */ (function (_super) {
        __extends(soundmgr, _super);
        function soundmgr() {
            var _this = _super.call(this) || this;
            _this.m_state = -1;
            _this.m_b_stop = false;
            _this.m_sound_savekey = "xiaomi_game_sound";
            _this.m_cur_musicurl = "";
            _this.m_cur_soundurl = "";
            _this.b_stop_music = false;
            return _this;
        }
        soundmgr.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_event(game_event.EVENT_SOUND_OPEN, this.on_sound_open);
            this.register_event(game_event.EVENT_SOUND_CLOSE, this.on_sound_close);
            this.register_event(game_event.EVENT_BUTTON_CLICK, this.on_button_click);
            var open_str = helper.get_local(this.m_sound_savekey);
            if (open_str == null || open_str.length <= 0) {
                this.m_b_stop = false;
            }
            else {
                var flag = parseInt(open_str);
                if (flag == 0) {
                    this.m_b_stop = true;
                }
                else {
                    this.m_b_stop = false;
                }
            }
            Laya.SoundManager.autoReleaseSound = false;
        };
        soundmgr.prototype._stopmusic = function () {
            if (this.m_cur_musicurl.length > 0) {
                Laya.SoundManager.stopMusic();
                if (this.b_stop_music == true) {
                    Laya.SoundManager.destroySound(this.m_cur_musicurl);
                }
                this.m_cur_musicurl = "";
            }
        };
        soundmgr.prototype._stopsound = function () {
            if (this.m_cur_soundurl.length > 0) {
                Laya.SoundManager.stopSound(this.m_cur_soundurl);
                if (this.b_stop_music == true) {
                    Laya.SoundManager.destroySound(this.m_cur_soundurl);
                }
                this.m_cur_soundurl = "";
            }
        };
        soundmgr.prototype.on_sound_close = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_stop = true;
            helper.set_local(this.m_sound_savekey, "0");
            Laya.SoundManager.stopAll();
            this._stopmusic();
            this._stopsound();
        };
        soundmgr.prototype.is_open = function () {
            return this.m_b_stop;
        };
        soundmgr.prototype.on_sound_open = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_stop = false;
            helper.set_local(this.m_sound_savekey, "1");
            if (this.m_state == 1) {
                this.m_state = -1;
                //this.enter_game();
            }
            else if (this.m_state == 2) {
                this.m_state = -1;
                this.enter_scene();
            }
            else if (this.m_state == 3) {
                this.m_state = -1;
                this.enter_boss();
            }
        };
        soundmgr.prototype.on_button_click = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.m_b_stop == true) {
                return;
            }
            this.m_cur_soundurl = "sound/mousedown_btn.wav";
            Laya.SoundManager.playSound(this.m_cur_soundurl);
        };
        soundmgr.prototype.enter_game = function () {
            if (this.m_state == 1) {
                return;
            }
            this.m_state = 1;
            if (this.m_b_stop) {
                return;
            }
            this._stopmusic();
            this.m_cur_musicurl = "sound/login.mp3";
            Laya.SoundManager.playMusic(this.m_cur_musicurl);
        };
        soundmgr.prototype.enter_scene = function () {
            if (this.m_state == 2) {
                return;
            }
            this.m_state = 2;
            if (this.m_b_stop) {
                return;
            }
            this._stopmusic();
            this.m_cur_musicurl = "sound/normal.mp3";
            Laya.SoundManager.playMusic(this.m_cur_musicurl);
        };
        soundmgr.prototype.enter_boss = function () {
            if (this.m_state == 3) {
                return;
            }
            this.m_state = 3;
            if (this.m_b_stop) {
                return;
            }
            this._stopmusic();
            this.m_cur_musicurl = "sound/boss.mp3";
            Laya.SoundManager.playMusic(this.m_cur_musicurl);
        };
        soundmgr.prototype.play_sound = function (url) {
            if (this.m_b_stop) {
                return;
            }
            this._stopsound();
            this.m_cur_soundurl = url;
            Laya.SoundManager.playSound(this.m_cur_soundurl);
        };
        soundmgr.prototype.stop_sound = function (url) {
            Laya.SoundManager.stopSound(url);
            if (this.b_stop_music == true) {
                Laya.SoundManager.destroySound(url);
            }
            if (this.m_cur_soundurl == url) {
                this.m_cur_soundurl = "";
            }
        };
        soundmgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return soundmgr;
    }(utils.game_module));
    game.soundmgr = soundmgr;
})(game || (game = {}));
//# sourceMappingURL=soundmgr.js.map
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
    var sys_msg = /** @class */ (function (_super) {
        __extends(sys_msg, _super);
        function sys_msg() {
            return _super.call(this) || this;
        }
        sys_msg.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_net_event(protocol_def.S2C_CLIENT_COMMAND, this.on_netcmd_client_cmd);
        };
        sys_msg.prototype.show_msgbox = function (p_content) {
            var mb_data = data.get_data(data_enum.DATA_MSGBOX);
            mb_data.set_msgbox_data(1, p_content, null, null, "");
            if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_MSGBOX) == false) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_MSGBOX, true);
            }
        };
        // 提示弹窗
        sys_msg.prototype.show_msg_box = function (p_caller, p_content, p_user_data, NoTips_keys) {
            if (p_user_data === void 0) { p_user_data = null; }
            if (NoTips_keys === void 0) { NoTips_keys = ""; }
            var mb_data = data.get_data(data_enum.DATA_MSGBOX);
            mb_data.set_msgbox_data(2, p_content, p_caller, p_user_data, NoTips_keys);
            var NT_flag = mb_data.get_NoTips_flag(NoTips_keys);
            if (NT_flag == true) {
                this.fire_choosed(p_caller, true, p_user_data);
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_MSGBOX) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_MSGBOX, true);
                }
            }
        };
        sys_msg.prototype.fire_choosed = function (p_caller, b_choosed, p_user_data) {
            if (p_user_data === void 0) { p_user_data = null; }
            this.fire_event_next_frame(game_event.EVENT_MSGBOX_CHOOSED, [p_caller, b_choosed, p_user_data]);
        };
        // 服务器执行客户端指令
        sys_msg.prototype.on_netcmd_client_cmd = function (ud) {
            if (ud === void 0) { ud = null; }
            var cmd = ud["msg"];
            var data_arr = cmd.split(" ");
            helper.do_test(data_arr);
        };
        sys_msg.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return sys_msg;
    }(utils.game_module));
    game.sys_msg = sys_msg;
})(game || (game = {}));
//# sourceMappingURL=sys_msg.js.map
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
    var Tips = /** @class */ (function (_super) {
        __extends(Tips, _super);
        function Tips() {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.b_icon = false;
            _this.s_w = 0;
            _this.bk = new Laya.Image();
            _this.bk.height = 90;
            _this.bk.skin = "bigpic/tipsbk.png";
            _this.bk.sizeGrid = "0,220,0,220";
            _this.addChild(_this.bk);
            // this.icon = new Laya.Image();
            // this.icon.x = 170;
            // this.icon.y = 7;
            // this.icon.width = 134;
            // this.icon.height = 134;
            // this.icon.scaleX = 0.4;
            // this.icon.scaleY = 0.4;
            // this.addChild(this.icon);
            _this.msg = new Laya.HTMLDivElement();
            _this.msg.x = 170;
            _this.msg.y = 19;
            _this.msg.style.font = "42px h5font";
            _this.msg.style.color = "#ffffff";
            _this.msg.style.width = 1100;
            _this.addChild(_this.msg);
            _this.cacheAs = "bitmap";
            return _this;
        }
        Tips.prototype.set_msg = function (t_node) {
            try {
                this.msg.innerHTML = t_node.msg;
            }
            catch (error) {
                this.msg.innerHTML = "";
                core.game_errlog("ScreenTips XML Error:", t_node.type, t_node.msg, t_node.item_shape, t_node.icon);
            }
            if (t_node.type == 0 || t_node.type == 1) {
                this.b_icon = false;
                var d_v = this.msg.contextWidth - 300;
                if (d_v < 0) {
                    this.s_w = 640; // msg最小宽度300 + 两边内容与bk差值170*2
                    this.msg.x = 170 - d_v / 2;
                }
                else {
                    this.s_w = 640 + d_v;
                    this.msg.x = 170;
                }
            }
            // else if (t_node.type == 1) {
            //     let show_icon: number = t_node.icon;
            //     if (base.COIN_ARR.indexOf(t_node.icon) >= 0) {
            //         show_icon = base.COIN_MAP[t_node.icon];
            //     }
            //     // icon_mgr.fastset_item_icon(show_icon, this.icon, true);
            //     this.b_icon = true;
            //     // let d_v = this.msg.contextWidth - 220;  //300-80
            //     let d_v = this.msg.contextWidth - 300;
            //     if (d_v < 0) {
            //         this.s_w = 680;
            //         // this.msg.x = 270 - d_v / 2;  //190+80
            //         this.msg.x = 170 - d_v / 2;
            //     }
            //     else {
            //         this.s_w = 680 + d_v;
            //         // this.msg.x = 270;
            //         this.msg.x = 170;
            //     }
            // }
            this.bk.width = this.s_w;
        };
        Tips.prototype.show = function (flag) {
            this.visible = flag;
        };
        Tips.prototype.reset = function () {
            this.visible = false;
            this.count = 0;
            this.s_w = 0;
            if (this.b_icon == true) {
                // icon_mgr.fastdel_icon(this.icon);
                this.b_icon = false;
            }
        };
        return Tips;
    }(Laya.Sprite));
    game.Tips = Tips;
    var tips_mgr = /** @class */ (function (_super) {
        __extends(tips_mgr, _super);
        function tips_mgr() {
            var _this = _super.call(this) || this;
            _this.pool_arr = new Array();
            return _this;
        }
        tips_mgr.prototype.start = function () {
            _super.prototype.start.call(this);
        };
        tips_mgr.prototype._create_tips_ins = function () {
            var tips_ins = new Tips();
            this.pool_arr.push(tips_ins);
        };
        tips_mgr.prototype.get_tips_ins = function () {
            if (this.pool_arr.length == 0) {
                this._create_tips_ins();
            }
            return this.pool_arr.pop();
        };
        tips_mgr.prototype.revert_tips_ins = function (ins) {
            this.pool_arr.push(ins);
        };
        tips_mgr.prototype.revert_tips_ins_arr = function (ins_arr) {
            this.pool_arr = this.pool_arr.concat(ins_arr);
        };
        tips_mgr.prototype.show_tips = function (ud) {
            if (ud === void 0) { ud = null; }
            // let t_type = ud["t_type"];
            var text = ud["text"];
            if (text != null) {
                var t_data = data.get_data(data_enum.DATA_TIPS);
                t_data.add_tips_node(0, text);
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_TIPS) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_TIPS, true);
                }
            }
        };
        tips_mgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return tips_mgr;
    }(utils.game_module));
    game.tips_mgr = tips_mgr;
})(game || (game = {}));
//# sourceMappingURL=tips_mgr.js.map