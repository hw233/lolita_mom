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
    var fightprop_map = null;
    function fightprop_map_init(config_obj) {
        fightprop_map = config_obj["fightprop_map"];
    }
    config.fightprop_map_init = fightprop_map_init;
    var Fightprop = /** @class */ (function (_super) {
        __extends(Fightprop, _super);
        function Fightprop(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightprop_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightprop.get_Fightprop = function (key) {
            if (Fightprop.m_static_map.hasOwnProperty(key) == false) {
                Fightprop.m_static_map[key] = Fightprop.create_Fightprop(key);
            }
            return Fightprop.m_static_map[key];
        };
        Fightprop.create_Fightprop = function (key) {
            if (fightprop_map.hasOwnProperty(key)) {
                return new Fightprop(key);
            }
            return null;
        };
        Fightprop.get_cfg_object = function () {
            return fightprop_map;
        };
        Fightprop.m_static_map = new Object();
        return Fightprop;
    }(Object));
    config.Fightprop = Fightprop;
})(config || (config = {}));
//# sourceMappingURL=fightprop.js.map