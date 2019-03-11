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
    var sys_preview_cfg_map = null;
    function sys_preview_cfg_map_init(config_obj) {
        sys_preview_cfg_map = config_obj["sys_preview_cfg_map"];
    }
    config.sys_preview_cfg_map_init = sys_preview_cfg_map_init;
    var Sys_preview_cfg = /** @class */ (function (_super) {
        __extends(Sys_preview_cfg, _super);
        function Sys_preview_cfg(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sys_preview_cfg_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sys_preview_cfg.get_Sys_preview_cfg = function (key) {
            if (Sys_preview_cfg.m_static_map.hasOwnProperty(key) == false) {
                Sys_preview_cfg.m_static_map[key] = Sys_preview_cfg.create_Sys_preview_cfg(key);
            }
            return Sys_preview_cfg.m_static_map[key];
        };
        Sys_preview_cfg.create_Sys_preview_cfg = function (key) {
            if (sys_preview_cfg_map.hasOwnProperty(key)) {
                return new Sys_preview_cfg(key);
            }
            return null;
        };
        Sys_preview_cfg.get_cfg_object = function () {
            return sys_preview_cfg_map;
        };
        Sys_preview_cfg.m_static_map = new Object();
        return Sys_preview_cfg;
    }(Object));
    config.Sys_preview_cfg = Sys_preview_cfg;
})(config || (config = {}));
//# sourceMappingURL=sys_preview_cfg.js.map