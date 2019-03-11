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
            _this.m_curtime = 0;
            _this.m_itemlist = new Array();
            _this.m_svr_tm = 0;
            _this.m_svr_clitm = 0;
            _this.m_b_req_guestaccount = false;
            _this.m_b_logining = false;
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
            utils.widget_ins().set_root(this.m_ui_sp);
            Laya.stage.addChild(this.m_render_sp);
            Laya.stage.addChild(this.m_ui_sp);
            this.m_render = new core.renderagent();
            this.m_render.set_walk_spd(200);
            this.m_render.set_avatar_config(config.Avatarinfo.get_Avatarinfo);
            this.m_render.set_map_config(config.Mapinfo.get_Mapinfo);
            this.m_render.set_ani_config(config.Aniinfo.get_Aniinfo);
            this.m_render.set_eff_config(config.Effectinfo.get_Effectinfo);
            this.m_render.initstage(this.m_render_sp);
            this.m_render.m_render.setworldwh(2560, 2560);
            this.m_render.setviewport(Laya.stage.designWidth, Laya.stage.designHeight);
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
            game.get_module(module_enum.MODULE_PLAYER).start();
            game.get_module(module_enum.MODULE_CARD).start();
            game.get_module(module_enum.MODULE_SCENE).start();
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINUI, true);
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINTOPUI, true);
            net.net_ins().connect("129.204.91.54", 11009);
            //this.m_render.entermap(1003,false);
            //this.m_render.setmapbk("map/city/1003/1003.jpg");
            //let chase_id:number = this.m_render.addunit("role",102,254,516);
            //let chase_role:core.renderavatar = this.m_render.getunit(chase_id);
            //chase_role.change_weapon(10001);
            //chase_role.change_ride(20001,30001);
            //chase_role.set_ride_h(30);
            //chase_role.change_wing(40001);
            //this.m_render.cameralookat(chase_role);
            //this.m_role_id = chase_id;
            //this.m_role_obj = chase_role;
        };
        game_main.prototype.get_render = function () {
            return this.m_render;
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
        };
        game_main.prototype.on_net_closed = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_errlog("on_net_closed");
            this.m_b_logining = false;
            this.m_b_req_guestaccount = false;
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
                if (this.m_render != null) {
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
            if (this.m_render != null) {
                this.m_render.check_release();
            }
        };
        game_main.prototype.update = function (d) {
            //
            var nowtime = laya.utils.Browser.now();
            //render here
            if (this.m_render != null) {
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
            this.m_ui_sp.removeSelf();
            this.m_render_sp.removeSelf();
            this.m_ui_sp = null;
            this.m_render_sp = null;
            _super.prototype.dispose.call(this);
        };
        return game_main;
    }(utils.game_module));
    game.game_main = game_main;
})(game || (game = {}));
//# sourceMappingURL=game_main.js.map
var game;
(function (game) {
    function init_game_module() {
        utils.module_ins().register_module(module_enum.MODULE_MAIN, game.game_main);
        utils.module_ins().register_module(module_enum.MODULE_PLAYER, game.player_main);
        utils.module_ins().register_module(module_enum.MODULE_CARD, game.card_main);
        utils.module_ins().register_module(module_enum.MODULE_TIPS, game.tips_mgr);
        utils.module_ins().register_module(module_enum.MODULE_SYS_MSG, game.sys_msg);
        utils.module_ins().register_module(module_enum.MODULE_SCENE, game.scene);
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
            this.fire_event_next_frame(game_event.EVENT_PLAYERDATA_UPDATED);
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