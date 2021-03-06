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
    var effcommand = /** @class */ (function (_super) {
        __extends(effcommand, _super);
        function effcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        effcommand.prototype.update_z = function () {
            if (this.m_obj.m_data == true) {
                this.m_screen_z = -500000000 + this.m_obj.y; //;
            }
            else {
                this.m_screen_z = -100000000 + this.m_obj.y;
            }
        };
        effcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        effcommand.prototype.render = function (context) {
            if (this.m_obj.m_data == true) {
                //core.core_tiplog("anicommand render true");
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
            else {
                //core.core_tiplog("anicommand render false");
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
        };
        return effcommand;
    }(core.rendercommand));
    core.effcommand = effcommand;
})(core || (core = {}));
//# sourceMappingURL=effcommand.js.map