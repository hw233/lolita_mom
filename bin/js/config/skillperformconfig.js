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
    var skillperformconfig_map = null;
    function skillperformconfig_map_init(config_obj) {
        skillperformconfig_map = config_obj["skillperformconfig_map"];
    }
    config.skillperformconfig_map_init = skillperformconfig_map_init;
    var Skillperformconfig = /** @class */ (function (_super) {
        __extends(Skillperformconfig, _super);
        function Skillperformconfig(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skillperformconfig_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skillperformconfig.get_Skillperformconfig = function (key) {
            if (Skillperformconfig.m_static_map.hasOwnProperty(key) == false) {
                Skillperformconfig.m_static_map[key] = Skillperformconfig.create_Skillperformconfig(key);
            }
            return Skillperformconfig.m_static_map[key];
        };
        Skillperformconfig.create_Skillperformconfig = function (key) {
            if (skillperformconfig_map.hasOwnProperty(key)) {
                return new Skillperformconfig(key);
            }
            return null;
        };
        Skillperformconfig.get_cfg_object = function () {
            return skillperformconfig_map;
        };
        Skillperformconfig.m_static_map = new Object();
        return Skillperformconfig;
    }(Object));
    config.Skillperformconfig = Skillperformconfig;
})(config || (config = {}));
//# sourceMappingURL=skillperformconfig.js.map