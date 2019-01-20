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
    var renderobject = /** @class */ (function (_super) {
        __extends(renderobject, _super);
        function renderobject() {
            var _this = _super.call(this) || this;
            _this.m_box = new laya.maths.Rectangle();
            _this.m_rc = null;
            _this.set_id();
            return _this;
        }
        renderobject.prototype.set_id = function () {
            this.m_obj_id = this.get_obj_id();
        };
        renderobject.prototype.set_pos = function (x, y) {
            this.x = x;
            this.y = y;
            this.m_box.setTo(this.x - this.m_box.width / 2, this.y - this.m_box.height / 2, this.m_box.width, this.m_box.height);
            this.m_rc.update_z();
        };
        Object.defineProperty(renderobject.prototype, "set_x", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
                this.m_box.setTo(this.x - this.m_box.width / 2, this.y - this.m_box.height / 2, this.m_box.width, this.m_box.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(renderobject.prototype, "set_y", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
                this.m_box.setTo(this.x - this.m_box.width / 2, this.y - this.m_box.height / 2, this.m_box.width, this.m_box.height);
                this.m_rc.update_z();
            },
            enumerable: true,
            configurable: true
        });
        renderobject.prototype.set_scale = function (sx, sy) {
        };
        renderobject.prototype.get_obj_id = function () {
            return renderobject.S_RO_IDMAX++;
        };
        renderobject.prototype.dispose = function () {
            this.removeSelf();
        };
        renderobject.prototype.update = function (delta) {
        };
        renderobject.prototype.is_contain = function (x, y) {
            return this.m_box.contains(x, y);
        };
        renderobject.prototype.project = function (context) {
            if (context.m_camera.is_project(this.m_box)) {
                context.m_render.addrc(this.m_rc);
                return true;
            }
            ;
            return false;
        };
        renderobject.S_RO_IDMAX = 1;
        return renderobject;
    }(laya.display.Sprite));
    core.renderobject = renderobject;
})(core || (core = {}));
//# sourceMappingURL=renderobject.js.map