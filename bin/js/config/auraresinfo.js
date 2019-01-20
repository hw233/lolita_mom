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
    var auraresinfo_map = null;
    function auraresinfo_map_init(config_obj) {
        auraresinfo_map = config_obj["auraresinfo_map"];
    }
    config.auraresinfo_map_init = auraresinfo_map_init;
    var Auraresinfo = /** @class */ (function (_super) {
        __extends(Auraresinfo, _super);
        function Auraresinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = auraresinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Auraresinfo.get_Auraresinfo = function (key) {
            if (Auraresinfo.m_static_map.hasOwnProperty(key) == false) {
                Auraresinfo.m_static_map[key] = Auraresinfo.create_Auraresinfo(key);
            }
            return Auraresinfo.m_static_map[key];
        };
        Auraresinfo.create_Auraresinfo = function (key) {
            if (auraresinfo_map.hasOwnProperty(key)) {
                return new Auraresinfo(key);
            }
            return null;
        };
        Auraresinfo.get_cfg_object = function () {
            return auraresinfo_map;
        };
        Auraresinfo.m_static_map = new Object();
        return Auraresinfo;
    }(Object));
    config.Auraresinfo = Auraresinfo;
})(config || (config = {}));
//# sourceMappingURL=auraresinfo.js.map