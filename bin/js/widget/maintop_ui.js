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
            fontmgr.set_ui_font(this.m_ui);
        };
        maintop_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_UI_MAINTOPUPDATE, this.on_update_data);
                this.register_event(game_event.EVENT_MAINPLAYER_MOVE, this.on_mainplayer_move);
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        maintop_ui.prototype.on_mainplayer_move = function (ud) {
            if (ud === void 0) { ud = null; }
            var x = ud[0];
            var y = ud[1];
            var mp = data.get_data(data_enum.DATA_PLAYER);
            this.UIins.name_label.text = mp.m_name + " (" + x.toString() + "," + y.toString() + ")";
        };
        maintop_ui.prototype.on_update_data = function (ud) {
            if (ud === void 0) { ud = null; }
            var mp = data.get_data(data_enum.DATA_PLAYER);
            var gold = mp.m_gold;
            var stamnia = mp.m_stamina;
            this.UIins.num_gold.text = gold.toString();
            this.UIins.num_slv.text = stamnia.toString();
            this.UIins.level_label.text = mp.m_lv.toString();
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