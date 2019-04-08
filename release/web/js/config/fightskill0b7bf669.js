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
    var fightskill_map = null;
    function fightskill_map_init(config_obj) {
        fightskill_map = config_obj["fightskill_map"];
    }
    config.fightskill_map_init = fightskill_map_init;
    var Fightskill = /** @class */ (function (_super) {
        __extends(Fightskill, _super);
        function Fightskill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightskill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightskill.get_Fightskill = function (key) {
            if (Fightskill.m_static_map.hasOwnProperty(key) == false) {
                Fightskill.m_static_map[key] = Fightskill.create_Fightskill(key);
            }
            return Fightskill.m_static_map[key];
        };
        Fightskill.create_Fightskill = function (key) {
            if (fightskill_map.hasOwnProperty(key)) {
                return new Fightskill(key);
            }
            return null;
        };
        Fightskill.get_cfg_object = function () {
            return fightskill_map;
        };
        Fightskill.m_static_map = new Object();
        return Fightskill;
    }(Object));
    config.Fightskill = Fightskill;
})(config || (config = {}));
//# sourceMappingURL=fightskill.js.map