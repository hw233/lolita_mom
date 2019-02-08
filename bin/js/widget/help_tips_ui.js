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
    var help_tips_ui = /** @class */ (function (_super) {
        __extends(help_tips_ui, _super);
        function help_tips_ui() {
            var _this = _super.call(this, "res/atlas/ui/other.atlas", ui.game.help_tipsUI) || this;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.TIPS;
            return _this;
        }
        help_tips_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
        };
        help_tips_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.UIins.btn_close.on(Laya.Event.CLICK, this, this.on_close);
                this.UIins.btn_close.on(Laya.Event.MOUSE_OUT, this, this.on_mouseout);
            }
            else {
                this.UIins.btn_close.off(Laya.Event.MOUSE_OUT, this, this.on_mouseout);
                this.UIins.btn_close.off(Laya.Event.CLICK, this, this.on_close);
                this.UIins.lab_text.text = "";
                this.UIins = null;
            }
        };
        help_tips_ui.prototype.on_show_ud = function (flag, ud) {
            if (ud === void 0) { ud = null; }
            if (flag) {
                this.UIins.lab_text.text = ud[0];
                var b_center = ud[3];
                if (b_center) {
                    var w = this.UIins.img_bk.width;
                    var h = this.UIins.img_bk.height;
                    var sw = Laya.stage.width;
                    var sh = Laya.stage.height;
                    var x = (sw - w) / 2;
                    var y = (sh - h) / 2;
                    this.move_bk(x, y);
                }
                else {
                    this.move_bk(ud[1], ud[2]);
                }
            }
        };
        help_tips_ui.prototype.move_bk = function (x, y) {
            this.UIins.x = x;
            this.UIins.y = y;
            //this.UIins.img_bk.x = x;
            //this.UIins.img_bk.y = y;
            //this.UIins.btn_close.x = x;
            //this.UIins.btn_close.y = y;
            //this.UIins.lab_text.x = this.UIins.img_bk.x+66;
            //this.UIins.lab_text.y = +this.UIins.img_bk.y+66;
        };
        help_tips_ui.prototype.on_mouseout = function (ud) {
            if (ud === void 0) { ud = null; }
            this.show(false);
        };
        help_tips_ui.prototype.on_close = function () {
            this.show(false);
        };
        help_tips_ui.prototype.on_dispose = function () {
        };
        help_tips_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return help_tips_ui;
    }(utils.game_widget));
    widget.help_tips_ui = help_tips_ui;
})(widget || (widget = {}));
//# sourceMappingURL=help_tips_ui.js.map