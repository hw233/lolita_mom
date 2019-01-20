/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var mapinfo_map = null;
    function mapinfo_map_init(config_obj) {
        mapinfo_map = config_obj["mapinfo_map"];
    }
    config.mapinfo_map_init = mapinfo_map_init;
    var Mapinfo = /** @class */ (function (_super) {
        __extends(Mapinfo, _super);
        function Mapinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = mapinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Mapinfo.get_Mapinfo = function (key) {
            if (Mapinfo.m_static_map.hasOwnProperty(key) == false) {
                Mapinfo.m_static_map[key] = Mapinfo.create_Mapinfo(key);
            }
            return Mapinfo.m_static_map[key];
        };
        Mapinfo.create_Mapinfo = function (key) {
            if (mapinfo_map.hasOwnProperty(key)) {
                return new Mapinfo(key);
            }
            return null;
        };
        Mapinfo.get_cfg_object = function () {
            return mapinfo_map;
        };
        Mapinfo.m_static_map = new Object();
        return Mapinfo;
    }(Object));
    config.Mapinfo = Mapinfo;
})(config || (config = {}));
//# sourceMappingURL=mapinfo.js.map