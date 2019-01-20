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
            _this.m_roleid = 0;
            _this.m_itemlist = new Array();
            _this.m_svr_tm = 0;
            _this.m_svr_clitm = 0;
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
            this.register_event(game_event.EVENT_NET_CONNECTED, this.on_net_connected);
            this.register_event(game_event.EVENT_NET_CLOSED, this.on_net_closed);
            this.register_event(game_event.EVENT_NET_ERROR, this.on_net_error);
            this.register_event(game_event.EVENT_TEST, this.on_testfunc);
            this.register_event(game_event.EVENT_TEST1, this.on_testfunc1);
            this.register_event(game_event.EVENT_TEST2, this.on_testfunc2);
            this.register_event(game_event.EVENT_TEST3, this.on_testfunc3);
            timer.timer_ins().add_timer(1000, this, this.on_1s_tick);
            game.get_module(module_enum.MODULE_PLAYER).start();
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINUI, true);
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINTOPUI, true);
            net.net_ins().connect("123.207.239.21", 11009);
            //this.m_render.setmapbk("map/city/2001/2001.jpg");
            this.m_render.setmapscrollbkview(Laya.stage.designWidth, Laya.stage.designHeight);
            this.m_render.addmapscrollbk("map/scrollmap/1001.png", 1136, 640);
            this.m_render.addmapscrollbk("map/scrollmap/1001.png", 1136, 640);
            this.m_render.addmapscrollbk("map/scrollmap/1001.png", 1136, 640);
            this.m_render.setmapscrollbkpos(0, 200);
            this.m_render.setmapscrollbkspd(200);
            var dx = 100;
            var dy = 600;
            var uid = this.m_render.addunit("role1", 2, dx, dy);
            var ra = this.m_render.getunit(uid);
            ra.change_dir(6);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
            uid = this.m_render.addunit("enemy1", 3, dx + 100, dy);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
            uid = this.m_render.addunit("enemy2", 4, dx + 200, dy);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
            uid = this.m_render.addunit("enemy3", 5, dx + 300, dy);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
            uid = this.m_render.addunit("enemy4", 6, dx + 400, dy);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
            uid = this.m_render.addunit("enemy5", 7, dx + 500, dy);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
            uid = this.m_render.addunit("enemy6", 8, dx + 600, dy);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(1 /* ACTION_RUN */);
            ra.set_dx(-15);
            ra.set_dy(-60);
        };
        game_main.prototype.on_click_sp = function (e) {
            core.game_tiplog("onClick sp ", e.stageX, e.stageY);
        };
        game_main.prototype.on_net_error = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_errlog("on_net_error");
        };
        game_main.prototype.on_net_closed = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_errlog("on_net_closed");
        };
        game_main.prototype.on_net_connected = function (ud) {
            if (ud === void 0) { ud = null; }
            core.net_tiplog("on_net_connected");
            var ld = {};
            ld["clientver"] = { "major": 0, "minor": 0, "patch": 0 };
            ld["scriptver"] = { "major": 0, "minor": 0, "patch": 0 };
            ld["productver"] = { "major": 0, "minor": 0, "patch": 0 };
            ld["account"] = "mytesta";
            ld["pwd"] = "112233";
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
            console.log("on_testfunc2 move item", ud);
            if (this.m_itemlist.length > 1) {
                var item = this.m_itemlist[1];
                var dstpos = 2;
                net.net_ins().send(protocol_def.C2S_ITEM_MOVE, { "id": item['id'], "dstpos": dstpos });
            }
        };
        game_main.prototype.on_testfunc3 = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_testfunc3 buyitem", ud);
            this.m_render.setmapbk("map/city/2002/2002.jpg");
            //net.net_ins().send(protocol_def.C2S_ITEM_BUY,{"id":1001});
        };
        game_main.prototype.on_testfunc1 = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_testfunc1 refresh", ud);
            this.m_render.setmapbk("map/city/2001/2001.jpg");
            //net.net_ins().send(protocol_def.C2S_ROLE_INFO,{});
            //net.net_ins().send(protocol_def.C2S_ITEM_GETLIST,{});
        };
        game_main.prototype.on_testfunc = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("haha,i get event from main_ui");
            console.log("on_testfunc useitem", ud);
            //net.net_ins().send(protocol_def.C2S_CHAT_GM,{"msg":"addgold 10000"});
            if (this.m_itemlist.length > 0) {
                var item = this.m_itemlist[0];
                net.net_ins().send(protocol_def.C2S_ITEM_USE, { "id": item['id'], "amount": 1 });
            }
        };
        game_main.prototype.on_roleid = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_roleinfo ", ud);
            var roleid = ud["roles"][0]["rid"];
            console.log("request select ", roleid);
            net.net_ins().send(protocol_def.C2S_LOGIN_SELECTROLE, { "rid": roleid });
            this.m_roleid = roleid;
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