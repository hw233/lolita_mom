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
    var mapbkmaterial = /** @class */ (function (_super) {
        __extends(mapbkmaterial, _super);
        function mapbkmaterial() {
            var _this = _super.call(this) || this;
            _this.m_graphic = new laya.display.Sprite();
            return _this;
        }
        mapbkmaterial.prototype.re_init = function (respath) {
            this.m_mat_res = respath;
        };
        mapbkmaterial.prototype.load_res = function () {
            this.m_graphic.graphics.clear();
            this.m_graphic.loadImage(this.m_mat_res);
        };
        mapbkmaterial.prototype.clear = function () {
            this.m_graphic.graphics.clear();
        };
        mapbkmaterial.prototype.dispose = function () {
            this.m_graphic.graphics.clear();
            this.m_graphic = null;
        };
        mapbkmaterial.prototype.update = function (delta) {
        };
        return mapbkmaterial;
    }(core.material));
    core.mapbkmaterial = mapbkmaterial;
})(core || (core = {}));
//# sourceMappingURL=mapbkmaterial.js.map