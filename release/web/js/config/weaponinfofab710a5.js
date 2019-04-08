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
    var weaponinfo_map = null;
    function weaponinfo_map_init(config_obj) {
        weaponinfo_map = config_obj["weaponinfo_map"];
    }
    config.weaponinfo_map_init = weaponinfo_map_init;
    var Weaponinfo = /** @class */ (function (_super) {
        __extends(Weaponinfo, _super);
        function Weaponinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = weaponinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Weaponinfo.get_Weaponinfo = function (key) {
            if (Weaponinfo.m_static_map.hasOwnProperty(key) == false) {
                Weaponinfo.m_static_map[key] = Weaponinfo.create_Weaponinfo(key);
            }
            return Weaponinfo.m_static_map[key];
        };
        Weaponinfo.create_Weaponinfo = function (key) {
            if (weaponinfo_map.hasOwnProperty(key)) {
                return new Weaponinfo(key);
            }
            return null;
        };
        Weaponinfo.get_cfg_object = function () {
            return weaponinfo_map;
        };
        Weaponinfo.m_static_map = new Object();
        return Weaponinfo;
    }(Object));
    config.Weaponinfo = Weaponinfo;
})(config || (config = {}));
//# sourceMappingURL=weaponinfo.js.map