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
    var mapblockcommand = /** @class */ (function (_super) {
        __extends(mapblockcommand, _super);
        function mapblockcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapblockcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000; //must be the bottom;
        };
        mapblockcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapblockcommand.prototype.render = function (context) {
            var view = context.m_view.m_ani_underunit_View;
            view.addChild(this.m_obj);
        };
        return mapblockcommand;
    }(core.rendercommand));
    core.mapblockcommand = mapblockcommand;
})(core || (core = {}));
//# sourceMappingURL=mapblockcommand.js.map