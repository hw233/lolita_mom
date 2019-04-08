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
    var fightbuffeffect_map = null;
    function fightbuffeffect_map_init(config_obj) {
        fightbuffeffect_map = config_obj["fightbuffeffect_map"];
    }
    config.fightbuffeffect_map_init = fightbuffeffect_map_init;
    var Fightbuffeffect = /** @class */ (function (_super) {
        __extends(Fightbuffeffect, _super);
        function Fightbuffeffect(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightbuffeffect_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightbuffeffect.get_Fightbuffeffect = function (key) {
            if (Fightbuffeffect.m_static_map.hasOwnProperty(key) == false) {
                Fightbuffeffect.m_static_map[key] = Fightbuffeffect.create_Fightbuffeffect(key);
            }
            return Fightbuffeffect.m_static_map[key];
        };
        Fightbuffeffect.create_Fightbuffeffect = function (key) {
            if (fightbuffeffect_map.hasOwnProperty(key)) {
                return new Fightbuffeffect(key);
            }
            return null;
        };
        Fightbuffeffect.get_cfg_object = function () {
            return fightbuffeffect_map;
        };
        Fightbuffeffect.m_static_map = new Object();
        return Fightbuffeffect;
    }(Object));
    config.Fightbuffeffect = Fightbuffeffect;
})(config || (config = {}));
//# sourceMappingURL=fightbuffeffect.js.map