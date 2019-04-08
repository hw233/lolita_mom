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
    var combat_skip_cfg_map = null;
    function combat_skip_cfg_map_init(config_obj) {
        combat_skip_cfg_map = config_obj["combat_skip_cfg_map"];
    }
    config.combat_skip_cfg_map_init = combat_skip_cfg_map_init;
    var Combat_skip_cfg = /** @class */ (function (_super) {
        __extends(Combat_skip_cfg, _super);
        function Combat_skip_cfg(key) {
            var _this = _super.call(this) || this;
            _this.m_config = combat_skip_cfg_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Combat_skip_cfg.get_Combat_skip_cfg = function (key) {
            if (Combat_skip_cfg.m_static_map.hasOwnProperty(key) == false) {
                Combat_skip_cfg.m_static_map[key] = Combat_skip_cfg.create_Combat_skip_cfg(key);
            }
            return Combat_skip_cfg.m_static_map[key];
        };
        Combat_skip_cfg.create_Combat_skip_cfg = function (key) {
            if (combat_skip_cfg_map.hasOwnProperty(key)) {
                return new Combat_skip_cfg(key);
            }
            return null;
        };
        Combat_skip_cfg.get_cfg_object = function () {
            return combat_skip_cfg_map;
        };
        Combat_skip_cfg.m_static_map = new Object();
        return Combat_skip_cfg;
    }(Object));
    config.Combat_skip_cfg = Combat_skip_cfg;
})(config || (config = {}));
//# sourceMappingURL=combat_skip_cfg.js.map