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
    var spritecommand = /** @class */ (function (_super) {
        __extends(spritecommand, _super);
        function spritecommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        spritecommand.prototype.update_z = function () {
            this.m_screen_z = -100000000 + this.m_obj.y;
        };
        spritecommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        spritecommand.prototype.render = function (context) {
            var obj = this.m_obj;
            if (obj.m_b_upon_unit) {
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
            else {
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
        };
        return spritecommand;
    }(core.rendercommand));
    core.spritecommand = spritecommand;
})(core || (core = {}));
//# sourceMappingURL=spritecommand.js.map