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
    var fightaidefine_map = null;
    function fightaidefine_map_init(config_obj) {
        fightaidefine_map = config_obj["fightaidefine_map"];
    }
    config.fightaidefine_map_init = fightaidefine_map_init;
    var Fightaidefine = /** @class */ (function (_super) {
        __extends(Fightaidefine, _super);
        function Fightaidefine(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightaidefine_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightaidefine.get_Fightaidefine = function (key) {
            if (Fightaidefine.m_static_map.hasOwnProperty(key) == false) {
                Fightaidefine.m_static_map[key] = Fightaidefine.create_Fightaidefine(key);
            }
            return Fightaidefine.m_static_map[key];
        };
        Fightaidefine.create_Fightaidefine = function (key) {
            if (fightaidefine_map.hasOwnProperty(key)) {
                return new Fightaidefine(key);
            }
            return null;
        };
        Fightaidefine.get_cfg_object = function () {
            return fightaidefine_map;
        };
        Fightaidefine.m_static_map = new Object();
        return Fightaidefine;
    }(Object));
    config.Fightaidefine = Fightaidefine;
})(config || (config = {}));
//# sourceMappingURL=fightaidefine.js.map