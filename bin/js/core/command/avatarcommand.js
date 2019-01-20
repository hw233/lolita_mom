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
    var avatarcommand = /** @class */ (function (_super) {
        __extends(avatarcommand, _super);
        function avatarcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        avatarcommand.prototype.update_z = function () {
            this.m_screen_z = -400000000 + this.m_obj.y; //;
        };
        avatarcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        avatarcommand.prototype.render = function (context) {
            context.m_view.m_unitView.addChild(this.m_obj);
        };
        avatarcommand.prototype.is_contain = function (x, y) {
            return this.m_obj.is_contain(x, y);
        };
        return avatarcommand;
    }(core.rendercommand));
    core.avatarcommand = avatarcommand;
    var avatarcommand_new = /** @class */ (function (_super) {
        __extends(avatarcommand_new, _super);
        function avatarcommand_new(obj) {
            if (obj === void 0) { obj = null; }
            var _this = _super.call(this, obj) || this;
            _this.m_a = obj;
            return _this;
        }
        avatarcommand_new.prototype.re_init = function (obj) {
            _super.prototype.re_init.call(this, obj);
            this.m_a = obj;
        };
        avatarcommand_new.prototype.update_z = function () {
            this.m_screen_z = -400000000 + this.m_obj.y; //;
        };
        avatarcommand_new.prototype.dispose = function () {
            this.m_obj = null;
        };
        avatarcommand_new.prototype.render = function (context) {
            context.m_view.m_unitView.addChild(this.m_obj);
            if (this.m_obj.alpha > 0) {
                var x = this.m_obj.x + this.m_a.m_dx;
                var y = this.m_obj.y + this.m_a.m_dy;
                //this.m_a.m_sp_back.x = x;
                //this.m_a.m_sp_back.y = y;
                if (this.m_a.m_aura_adorn != null) {
                    this.m_a.m_aura_adorn.draw2sp(context.m_view.m_unitground_View, x, y, false);
                }
                //context.m_view.m_unitground_View.addChild(this.m_a.m_sp_back);
                if (this.m_a.m_title_adorn != null) {
                    this.m_a.m_title_adorn.draw2sp(context.m_view.m_unitfront_View, x, y);
                }
                if (this.m_a.m_shadow_sp != null) {
                    context.m_view.m_unitshadow_View.graphics.drawTexture(this.m_a.m_shadow_sp, x - 50, y - 35);
                }
                if (this.m_a.m_name.length > 0) {
                    context.m_view.m_unitname_View.graphics.fillBorderText(this.m_a.m_name, x + this.m_a.m_name_dx, y + 25 + this.m_a.m_name_dy, "22px h5font", "#65ff65", "#19591c", 2, "center");
                }
            }
        };
        avatarcommand_new.prototype.is_contain = function (x, y) {
            if (this.m_obj == null) {
                return false;
            }
            return this.m_obj.is_contain(x, y);
        };
        return avatarcommand_new;
    }(core.rendercommand));
    core.avatarcommand_new = avatarcommand_new;
})(core || (core = {}));
//# sourceMappingURL=avatarcommand.js.map