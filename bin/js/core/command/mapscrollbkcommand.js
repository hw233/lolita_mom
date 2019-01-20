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
    var mapscrollbkcommand = /** @class */ (function (_super) {
        __extends(mapscrollbkcommand, _super);
        function mapscrollbkcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapscrollbkcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000 + 1; //must be the bottom;
        };
        mapscrollbkcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapscrollbkcommand.prototype.render = function (context) {
            var view = context.m_view.m_mapView;
            view.addChild(this.m_obj);
        };
        return mapscrollbkcommand;
    }(core.rendercommand));
    core.mapscrollbkcommand = mapscrollbkcommand;
})(core || (core = {}));
//# sourceMappingURL=mapscrollbkcommand.js.map