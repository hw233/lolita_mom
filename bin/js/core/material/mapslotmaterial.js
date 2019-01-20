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
    var mapslotmaterial = /** @class */ (function (_super) {
        __extends(mapslotmaterial, _super);
        function mapslotmaterial() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_tex = null;
            _this.m_res_path = null;
            _this.m_map_id = 0;
            _this.m_grid_w = 0;
            _this.m_grid_h = 0;
            _this.m_graphic = new laya.display.Sprite();
            return _this;
        }
        mapslotmaterial.prototype.init = function () {
            this.m_tex = null;
        };
        mapslotmaterial.prototype.clear = function () {
            this.m_graphic.graphics.clear();
            this.m_tex = null;
        };
        mapslotmaterial.prototype.dispose = function () {
            this.m_tex = null;
            this.m_graphic.graphics.clear();
            this.m_graphic = null;
        };
        mapslotmaterial.prototype.update = function (delta) {
        };
        return mapslotmaterial;
    }(core.material));
    core.mapslotmaterial = mapslotmaterial;
})(core || (core = {}));
//# sourceMappingURL=mapslotmaterial.js.map