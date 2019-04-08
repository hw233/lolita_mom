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
    var sys_open_map = null;
    function sys_open_map_init(config_obj) {
        sys_open_map = config_obj["sys_open_map"];
    }
    config.sys_open_map_init = sys_open_map_init;
    var Sys_open = /** @class */ (function (_super) {
        __extends(Sys_open, _super);
        function Sys_open(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sys_open_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sys_open.get_Sys_open = function (key) {
            if (Sys_open.m_static_map.hasOwnProperty(key) == false) {
                Sys_open.m_static_map[key] = Sys_open.create_Sys_open(key);
            }
            return Sys_open.m_static_map[key];
        };
        Sys_open.create_Sys_open = function (key) {
            if (sys_open_map.hasOwnProperty(key)) {
                return new Sys_open(key);
            }
            return null;
        };
        Sys_open.get_cfg_object = function () {
            return sys_open_map;
        };
        Sys_open.m_static_map = new Object();
        return Sys_open;
    }(Object));
    config.Sys_open = Sys_open;
})(config || (config = {}));
//# sourceMappingURL=sys_open.js.map