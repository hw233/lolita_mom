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
    var sys_open_activity_map = null;
    function sys_open_activity_map_init(config_obj) {
        sys_open_activity_map = config_obj["sys_open_activity_map"];
    }
    config.sys_open_activity_map_init = sys_open_activity_map_init;
    var Sys_open_activity = /** @class */ (function (_super) {
        __extends(Sys_open_activity, _super);
        function Sys_open_activity(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sys_open_activity_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sys_open_activity.get_Sys_open_activity = function (key) {
            if (Sys_open_activity.m_static_map.hasOwnProperty(key) == false) {
                Sys_open_activity.m_static_map[key] = Sys_open_activity.create_Sys_open_activity(key);
            }
            return Sys_open_activity.m_static_map[key];
        };
        Sys_open_activity.create_Sys_open_activity = function (key) {
            if (sys_open_activity_map.hasOwnProperty(key)) {
                return new Sys_open_activity(key);
            }
            return null;
        };
        Sys_open_activity.get_cfg_object = function () {
            return sys_open_activity_map;
        };
        Sys_open_activity.m_static_map = new Object();
        return Sys_open_activity;
    }(Object));
    config.Sys_open_activity = Sys_open_activity;
})(config || (config = {}));
//# sourceMappingURL=sys_open_activity.js.map