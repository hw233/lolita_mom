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
var core;
(function (core) {
    var renderview = /** @class */ (function (_super) {
        __extends(renderview, _super);
        function renderview() {
            var _this = _super.call(this) || this;
            _this.m_mapView = new laya.display.Sprite();
            _this.addChild(_this.m_mapView);
            _this.m_map_mask = new Laya.Sprite();
            _this.m_map_mask.graphics.drawRect(0, 0, 3000, 3000, "#000000");
            _this.m_map_mask.alpha = 0.3;
            //this.addChild(this.m_map_mask);
            _this.m_screeneffect_view = new Laya.Sprite();
            _this.addChild(_this.m_screeneffect_view);
            _this.m_ani_underunit_View = new laya.display.Sprite();
            _this.addChild(_this.m_ani_underunit_View);
            _this.m_unitshadow_View = new Laya.Sprite();
            _this.addChild(_this.m_unitshadow_View);
            _this.m_unitname_View = new Laya.Sprite();
            _this.addChild(_this.m_unitname_View);
            _this.m_unitground_View = new Laya.Sprite();
            _this.addChild(_this.m_unitground_View);
            _this.m_unitView = new laya.display.Sprite();
            _this.addChild(_this.m_unitView);
            _this.m_unitfront_View = new Laya.Sprite();
            _this.addChild(_this.m_unitfront_View);
            _this.m_ani_uponunit_view = new laya.display.Sprite();
            _this.addChild(_this.m_ani_uponunit_view);
            return _this;
        }
        renderview.prototype.renderbefore = function () {
            this.m_mapView.graphics.clear();
            this.m_mapView.removeChildren();
            this.m_ani_underunit_View.graphics.clear();
            this.m_ani_underunit_View.removeChildren();
            this.m_unitshadow_View.removeChildren();
            this.m_unitshadow_View.graphics.clear();
            this.m_unitname_View.removeChildren();
            this.m_unitname_View.graphics.clear();
            this.m_unitground_View.graphics.clear();
            this.m_unitground_View.removeChildren();
            this.m_unitView.graphics.clear();
            this.m_unitView.removeChildren();
            this.m_unitfront_View.graphics.clear();
            this.m_unitfront_View.removeChildren();
            this.m_ani_uponunit_view.graphics.clear();
            this.m_ani_uponunit_view.removeChildren();
        };
        renderview.prototype.blackscreen = function (tm) {
            if (this.m_screeneffect_view != null) {
                Laya.Tween.clearAll(this.m_screeneffect_view);
                this.m_screeneffect_view.graphics.clear();
                this.m_screeneffect_view.graphics.drawRect(-500, -500, 3000, 3000, '#000000');
                this.m_screeneffect_view.alpha = 0;
                Laya.Tween.to(this.m_screeneffect_view, { alpha: 1 }, tm, Laya.Ease.linearIn, Laya.Handler.create(this, this.blackreset, [1000]));
            }
        };
        renderview.prototype.blackreset = function (tm) {
            if (this.m_screeneffect_view != null) {
                Laya.Tween.clearAll(this.m_screeneffect_view);
                Laya.Tween.to(this.m_screeneffect_view, { alpha: 0 }, tm, Laya.Ease.linearIn, Laya.Handler.create(this, this.resetscreenview));
            }
        };
        renderview.prototype.resetscreenview = function () {
            if (this.m_screeneffect_view != null) {
                Laya.Tween.clearAll(this.m_screeneffect_view);
                this.m_screeneffect_view.graphics.clear();
            }
        };
        renderview.prototype.renderafter = function () {
        };
        renderview.prototype.update = function (delta) {
        };
        renderview.prototype.show_map_mask = function (flag, alpha) {
            if (alpha === void 0) { alpha = 0.3; }
            this.m_map_mask.alpha = alpha;
            if (flag) {
                this.addChildAt(this.m_map_mask, 1);
            }
            else {
                this.removeChild(this.m_map_mask);
            }
        };
        renderview.prototype.project = function (context) {
            var cx = context.m_camera.x;
            var cy = context.m_camera.y;
            this.x = (context.m_camera.width >> 1) - cx;
            this.y = (context.m_camera.height >> 1) - cy;
            this.m_map_mask.x = context.m_camera.x - (context.m_camera.width >> 1);
            this.m_map_mask.y = context.m_camera.y - (context.m_camera.height >> 1);
            //this.x = -cx;
            //this.y = -cy;
            //core.core_tiplog("renderview project ",this.x,this.y,cx,cy,context.m_camera.width,context.m_camera.height);
        };
        renderview.prototype.get_mapviewport_canvas = function (context, w, h) {
            return this.m_mapView.drawToCanvas(w, h, 0, 0);
        };
        renderview.prototype.dispose = function () {
            this.removeChildren();
            this.m_screeneffect_view = null;
            this.m_map_mask = null;
            this.m_mapView = null;
            this.m_unitshadow_View = null;
            this.m_unitname_View = null;
            this.m_unitground_View = null;
            this.m_unitView = null;
            this.m_unitfront_View = null;
            this.m_ani_underunit_View = null;
            this.m_ani_uponunit_view = null;
        };
        return renderview;
    }(laya.display.Sprite));
    core.renderview = renderview;
})(core || (core = {}));
//# sourceMappingURL=renderview.js.map