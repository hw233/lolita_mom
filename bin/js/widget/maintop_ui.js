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
    var maintop_ui = /** @class */ (function (_super) {
        __extends(maintop_ui, _super);
        function maintop_ui() {
            var _this = _super.call(this, "res/atlas/mainui.atlas", ui.game.main_topui_newUI) || this;
            _this.UIins = null;
            _this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("res/atlas/ui/new.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.NORMAL;
            return _this;
        }
        maintop_ui.prototype.on_init = function () {
        };
        maintop_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_UI_MAINTOPUPDATE, this.on_update_data);
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        maintop_ui.prototype.on_update_data = function (ud) {
            if (ud === void 0) { ud = null; }
            var gold = ud[0];
            var stamnia = ud[1];
            this.UIins.num_gold.text = gold.toString();
            this.UIins.num_slv.text = stamnia.toString();
        };
        maintop_ui.prototype.on_dispose = function () {
        };
        maintop_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return maintop_ui;
    }(utils.game_widget));
    widget.maintop_ui = maintop_ui;
})(widget || (widget = {}));
//# sourceMappingURL=maintop_ui.js.map