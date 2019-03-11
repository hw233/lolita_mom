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
    var fighteffect_map = null;
    function fighteffect_map_init(config_obj) {
        fighteffect_map = config_obj["fighteffect_map"];
    }
    config.fighteffect_map_init = fighteffect_map_init;
    var Fighteffect = /** @class */ (function (_super) {
        __extends(Fighteffect, _super);
        function Fighteffect(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fighteffect_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fighteffect.get_Fighteffect = function (key) {
            if (Fighteffect.m_static_map.hasOwnProperty(key) == false) {
                Fighteffect.m_static_map[key] = Fighteffect.create_Fighteffect(key);
            }
            return Fighteffect.m_static_map[key];
        };
        Fighteffect.create_Fighteffect = function (key) {
            if (fighteffect_map.hasOwnProperty(key)) {
                return new Fighteffect(key);
            }
            return null;
        };
        Fighteffect.get_cfg_object = function () {
            return fighteffect_map;
        };
        Fighteffect.m_static_map = new Object();
        return Fighteffect;
    }(Object));
    config.Fighteffect = Fighteffect;
})(config || (config = {}));
//# sourceMappingURL=fighteffect.js.map