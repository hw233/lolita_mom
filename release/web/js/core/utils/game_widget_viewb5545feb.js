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
var utils;
(function (utils) {
    var game_widget_view = /** @class */ (function (_super) {
        __extends(game_widget_view, _super);
        function game_widget_view() {
            var _this = _super.call(this) || this;
            _this.m_view_scene = new laya.display.Sprite();
            _this.m_view_bk = new laya.display.Sprite();
            _this.m_view_bottom = new laya.display.Sprite();
            _this.m_view_normal = new laya.display.Sprite();
            _this.m_view_tips = new laya.display.Sprite();
            _this.m_view_popup = new laya.display.Sprite();
            _this.m_view_top = new laya.display.Sprite();
            _this.m_view_topmost = new laya.display.Sprite();
            _this.addChild(_this.m_view_scene);
            _this.addChild(_this.m_view_bk);
            _this.addChild(_this.m_view_bottom);
            _this.addChild(_this.m_view_normal);
            _this.addChild(_this.m_view_popup);
            _this.addChild(_this.m_view_tips);
            _this.addChild(_this.m_view_top);
            _this.addChild(_this.m_view_topmost);
            return _this;
        }
        game_widget_view.prototype.get_view = function (layer) {
            var ret = null;
            switch (layer) {
                case utils.WIDGET_LAYER.SCENE:
                    ret = this.m_view_scene;
                    break;
                case utils.WIDGET_LAYER.BACKGROUND:
                    ret = this.m_view_bk;
                    break;
                case utils.WIDGET_LAYER.BOTTOM:
                    ret = this.m_view_bottom;
                    break;
                case utils.WIDGET_LAYER.NORMAL:
                    ret = this.m_view_normal;
                    break;
                case utils.WIDGET_LAYER.TIPS:
                    ret = this.m_view_tips;
                    break;
                case utils.WIDGET_LAYER.POPUP:
                    ret = this.m_view_popup;
                    break;
                case utils.WIDGET_LAYER.TOP:
                    ret = this.m_view_top;
                    break;
                case utils.WIDGET_LAYER.TOPMOST:
                    ret = this.m_view_topmost;
                    break;
                default:
                    ret = this.m_view_normal;
                    break;
            }
            return ret;
        };
        game_widget_view.prototype.dispose = function () {
            this.removeChildren();
            this.m_view_scene.removeChildren();
            this.m_view_bk.removeChildren();
            this.m_view_bottom.removeChildren();
            this.m_view_normal.removeChildren();
            this.m_view_top.removeChildren();
            this.m_view_scene = null;
            this.m_view_bk = null;
            this.m_view_bottom = null;
            this.m_view_normal = null;
            this.m_view_popup = null;
            this.m_view_tips = null;
            this.m_view_top = null;
            this.m_view_topmost = null;
        };
        return game_widget_view;
    }(laya.display.Sprite));
    utils.game_widget_view = game_widget_view;
})(utils || (utils = {}));
//# sourceMappingURL=game_widget_view.js.map