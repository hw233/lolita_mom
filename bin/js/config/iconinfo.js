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
    var iconinfo_map = null;
    function iconinfo_map_init(config_obj) {
        iconinfo_map = config_obj["iconinfo_map"];
    }
    config.iconinfo_map_init = iconinfo_map_init;
    var Iconinfo = /** @class */ (function (_super) {
        __extends(Iconinfo, _super);
        function Iconinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = iconinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Iconinfo.get_Iconinfo = function (key) {
            if (Iconinfo.m_static_map.hasOwnProperty(key) == false) {
                Iconinfo.m_static_map[key] = Iconinfo.create_Iconinfo(key);
            }
            return Iconinfo.m_static_map[key];
        };
        Iconinfo.create_Iconinfo = function (key) {
            if (iconinfo_map.hasOwnProperty(key)) {
                return new Iconinfo(key);
            }
            return null;
        };
        Iconinfo.get_cfg_object = function () {
            return iconinfo_map;
        };
        Iconinfo.m_static_map = new Object();
        return Iconinfo;
    }(Object));
    config.Iconinfo = Iconinfo;
})(config || (config = {}));
//# sourceMappingURL=iconinfo.js.map