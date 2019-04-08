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
    var fightskillpassive_map = null;
    function fightskillpassive_map_init(config_obj) {
        fightskillpassive_map = config_obj["fightskillpassive_map"];
    }
    config.fightskillpassive_map_init = fightskillpassive_map_init;
    var Fightskillpassive = /** @class */ (function (_super) {
        __extends(Fightskillpassive, _super);
        function Fightskillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightskillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightskillpassive.get_Fightskillpassive = function (key) {
            if (Fightskillpassive.m_static_map.hasOwnProperty(key) == false) {
                Fightskillpassive.m_static_map[key] = Fightskillpassive.create_Fightskillpassive(key);
            }
            return Fightskillpassive.m_static_map[key];
        };
        Fightskillpassive.create_Fightskillpassive = function (key) {
            if (fightskillpassive_map.hasOwnProperty(key)) {
                return new Fightskillpassive(key);
            }
            return null;
        };
        Fightskillpassive.get_cfg_object = function () {
            return fightskillpassive_map;
        };
        Fightskillpassive.m_static_map = new Object();
        return Fightskillpassive;
    }(Object));
    config.Fightskillpassive = Fightskillpassive;
})(config || (config = {}));
//# sourceMappingURL=fightskillpassive.js.map