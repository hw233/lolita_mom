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
    var skininfo_map = null;
    function skininfo_map_init(config_obj) {
        skininfo_map = config_obj["skininfo_map"];
    }
    config.skininfo_map_init = skininfo_map_init;
    var Skininfo = /** @class */ (function (_super) {
        __extends(Skininfo, _super);
        function Skininfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skininfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skininfo.get_Skininfo = function (key) {
            if (Skininfo.m_static_map.hasOwnProperty(key) == false) {
                Skininfo.m_static_map[key] = Skininfo.create_Skininfo(key);
            }
            return Skininfo.m_static_map[key];
        };
        Skininfo.create_Skininfo = function (key) {
            if (skininfo_map.hasOwnProperty(key)) {
                return new Skininfo(key);
            }
            return null;
        };
        Skininfo.get_cfg_object = function () {
            return skininfo_map;
        };
        Skininfo.m_static_map = new Object();
        return Skininfo;
    }(Object));
    config.Skininfo = Skininfo;
})(config || (config = {}));
//# sourceMappingURL=skininfo.js.map