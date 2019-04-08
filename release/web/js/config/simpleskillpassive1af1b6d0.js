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
    var simpleskillpassive_map = null;
    function simpleskillpassive_map_init(config_obj) {
        simpleskillpassive_map = config_obj["simpleskillpassive_map"];
    }
    config.simpleskillpassive_map_init = simpleskillpassive_map_init;
    var Simpleskillpassive = /** @class */ (function (_super) {
        __extends(Simpleskillpassive, _super);
        function Simpleskillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = simpleskillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Simpleskillpassive.get_Simpleskillpassive = function (key) {
            if (Simpleskillpassive.m_static_map.hasOwnProperty(key) == false) {
                Simpleskillpassive.m_static_map[key] = Simpleskillpassive.create_Simpleskillpassive(key);
            }
            return Simpleskillpassive.m_static_map[key];
        };
        Simpleskillpassive.create_Simpleskillpassive = function (key) {
            if (simpleskillpassive_map.hasOwnProperty(key)) {
                return new Simpleskillpassive(key);
            }
            return null;
        };
        Simpleskillpassive.get_cfg_object = function () {
            return simpleskillpassive_map;
        };
        Simpleskillpassive.m_static_map = new Object();
        return Simpleskillpassive;
    }(Object));
    config.Simpleskillpassive = Simpleskillpassive;
})(config || (config = {}));
//# sourceMappingURL=simpleskillpassive.js.map