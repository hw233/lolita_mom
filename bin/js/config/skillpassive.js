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
    var skillpassive_map = null;
    function skillpassive_map_init(config_obj) {
        skillpassive_map = config_obj["skillpassive_map"];
    }
    config.skillpassive_map_init = skillpassive_map_init;
    var Skillpassive = /** @class */ (function (_super) {
        __extends(Skillpassive, _super);
        function Skillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skillpassive.get_Skillpassive = function (key) {
            if (Skillpassive.m_static_map.hasOwnProperty(key) == false) {
                Skillpassive.m_static_map[key] = Skillpassive.create_Skillpassive(key);
            }
            return Skillpassive.m_static_map[key];
        };
        Skillpassive.create_Skillpassive = function (key) {
            if (skillpassive_map.hasOwnProperty(key)) {
                return new Skillpassive(key);
            }
            return null;
        };
        Skillpassive.get_cfg_object = function () {
            return skillpassive_map;
        };
        Skillpassive.m_static_map = new Object();
        return Skillpassive;
    }(Object));
    config.Skillpassive = Skillpassive;
})(config || (config = {}));
//# sourceMappingURL=skillpassive.js.map