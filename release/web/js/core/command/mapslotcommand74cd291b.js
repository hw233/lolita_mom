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
    var mapslotcommand = /** @class */ (function (_super) {
        __extends(mapslotcommand, _super);
        function mapslotcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapslotcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000 + this.m_obj.y; //;
        };
        mapslotcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapslotcommand.prototype.render = function (context) {
            var view = context.m_view.m_mapView;
            var mapslot = this.m_obj;
            if (mapslot.m_mat != null && mapslot.m_mat.m_tex != null) {
                view.graphics.drawTexture(mapslot.m_mat.m_tex, mapslot.x, mapslot.y);
            }
            //view.addChild(this.m_obj);
        };
        return mapslotcommand;
    }(core.rendercommand));
    core.mapslotcommand = mapslotcommand;
})(core || (core = {}));
//# sourceMappingURL=mapslotcommand.js.map