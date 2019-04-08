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