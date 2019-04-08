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