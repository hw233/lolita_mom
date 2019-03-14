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
var widget;
(function (widget) {
    var loading_ui = /** @class */ (function (_super) {
        __extends(loading_ui, _super);
        function loading_ui() {
            var _this = _super.call(this, "res/atlas/loading.atlas", ui.game.loadingUI) || this;
            _this.m_bk_rect = new Laya.Sprite();
            _this.append_extrares("bigpic/LOGO.png", Laya.Loader.IMAGE);
            _this.append_extrares("bigpic/barBK.png", Laya.Loader.IMAGE);
            // this.append_extrares("bigpic/进度条底板$bar.png",Laya.Loader.IMAGE);
            _this.m_layer = utils.WIDGET_LAYER.TOPMOST;
            _this.m_bk_rect.graphics.drawRect(0, 0, 2000, 3000, '#000000');
            return _this;
            //this.m_bk_rect.alpha = 0.5;
        }
        loading_ui.prototype.on_init = function () {
            fontmgr.set_ui_style(this.m_ui, fontmgr.FONTSTYLE_ENUM.FONT_PINK);
            var uiins = this.m_ui;
            var width = helper.get_design_w();
            var height = helper.get_design_h();
            var ratio = width / height;
            var scaleX = width / uiins.width;
            var scaleY = height / uiins.height;
            var scale = scaleX > scaleY ? scaleX : scaleY;
            uiins.m_bk.scale(scale, scale);
            uiins.width = width;
            uiins.height = height;
            fontmgr.set_lable(uiins.m_info, fontmgr.FONTSTYLE_ENUM.FONT_PINK);
        };
        loading_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                this.register_event(game_event.EVENT_LOADINGUI_PROGRESS, this.on_progress_event);
                this.set_progress(0);
                this.m_ui.addChildAt(this.m_bk_rect, 0);
                this.m_ui.hitArea = new Laya.Rectangle(-100, -100, 2000, 3000);
            }
            else {
                this.unregister_allevent();
            }
        };
        loading_ui.prototype.set_progress = function (v) {
            //core.game_tiplog("loading_ui set_progress ",v);
            var ui_ins = this.m_ui;
            var m_progress = ui_ins.m_progress1;
            var m_progresslight = ui_ins.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width - 70) * m_progress.value + 30;
        };
        loading_ui.prototype.on_progress_event = function (ud) {
            if (ud === void 0) { ud = null; }
            this.set_progress(ud);
        };
        loading_ui.prototype.on_dispose = function () {
        };
        loading_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return loading_ui;
    }(utils.game_widget));
    widget.loading_ui = loading_ui;
})(widget || (widget = {}));
//# sourceMappingURL=loading_ui.js.map