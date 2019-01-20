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
    var rendersprite = /** @class */ (function (_super) {
        __extends(rendersprite, _super);
        function rendersprite() {
            var _this = _super.call(this) || this;
            _this.m_sprite = null;
            _this.m_b_upon_unit = true;
            return _this;
        }
        rendersprite.prototype.re_init = function (sp, x, y, b_upon) {
            if (b_upon === void 0) { b_upon = true; }
            this.set_id();
            this.m_b_upon_unit = b_upon;
            this.m_sprite = sp;
            this.removeChildren();
            if (this.m_sprite != null) {
                this.addChild(this.m_sprite);
            }
            this.m_rc = utils.getitembycls("spritecommand", core.spritecommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_box.setTo(this.x - sp.m_w / 2, this.y - sp.m_h / 2, sp.m_w, sp.m_h);
        };
        rendersprite.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            return ret;
        };
        rendersprite.prototype.update = function (delta) {
            if (this.m_sprite != null) {
                this.m_sprite.update(delta);
            }
        };
        //从parent里把自己移除?
        rendersprite.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_sprite != null) {
                this.m_sprite.selfremove();
                //utils.recover("renderspcontent",this.m_sprite);
            }
            this.m_sprite = null;
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("spritecommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendersprite;
    }(core.renderobject));
    core.rendersprite = rendersprite;
})(core || (core = {}));
//# sourceMappingURL=rendersprite.js.map