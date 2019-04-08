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
    var fightcombatai_map = null;
    function fightcombatai_map_init(config_obj) {
        fightcombatai_map = config_obj["fightcombatai_map"];
    }
    config.fightcombatai_map_init = fightcombatai_map_init;
    var Fightcombatai = /** @class */ (function (_super) {
        __extends(Fightcombatai, _super);
        function Fightcombatai(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightcombatai_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightcombatai.get_Fightcombatai = function (key) {
            if (Fightcombatai.m_static_map.hasOwnProperty(key) == false) {
                Fightcombatai.m_static_map[key] = Fightcombatai.create_Fightcombatai(key);
            }
            return Fightcombatai.m_static_map[key];
        };
        Fightcombatai.create_Fightcombatai = function (key) {
            if (fightcombatai_map.hasOwnProperty(key)) {
                return new Fightcombatai(key);
            }
            return null;
        };
        Fightcombatai.get_cfg_object = function () {
            return fightcombatai_map;
        };
        Fightcombatai.m_static_map = new Object();
        return Fightcombatai;
    }(Object));
    config.Fightcombatai = Fightcombatai;
})(config || (config = {}));
//# sourceMappingURL=fightcombatai.js.map