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
    var rendercamera = /** @class */ (function (_super) {
        __extends(rendercamera, _super);
        function rendercamera() {
            var _this = _super.call(this) || this;
            _this.m_tween = null;
            _this.m_dst = new laya.maths.Point();
            _this.m_viewport = new laya.maths.Rectangle();
            return _this;
        }
        rendercamera.prototype.dispose = function () {
        };
        rendercamera.prototype.update = function (delta) {
        };
        rendercamera.prototype.project = function (context) {
            //core.core_tiplog("renderview project ",this.x,this.y,cx,cy,context.m_camera.width,context.m_camera.height);
            this.m_viewport.setTo(this.x - (this.width >> 1), this.y - (this.height >> 1), this.width, this.height);
        };
        rendercamera.prototype.is_project = function (rt) {
            return this.m_viewport.intersects(rt);
        };
        rendercamera.prototype.set_pos = function (dx, dy, force) {
            if (force === void 0) { force = true; }
            if (this.m_dst.x == dx && this.m_dst.y == dy) {
                return;
            }
            this.m_dst.setTo(dx, dy);
            if (this.m_tween != null) {
                laya.utils.Tween.clear(this.m_tween);
                this.m_tween = null;
            }
            if (force) {
                this.setTo(dx, dy, this.width, this.height);
            }
            else {
                laya.utils.Tween.to(this, { x: dx, y: dy }, 500, Laya.Ease.cubicOut, null, 0, true, true);
            }
        };
        return rendercamera;
    }(laya.maths.Rectangle));
    core.rendercamera = rendercamera;
})(core || (core = {}));
//# sourceMappingURL=rendercamera.js.map