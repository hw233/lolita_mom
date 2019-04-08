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
    var fighteffecttime_map = null;
    function fighteffecttime_map_init(config_obj) {
        fighteffecttime_map = config_obj["fighteffecttime_map"];
    }
    config.fighteffecttime_map_init = fighteffecttime_map_init;
    var Fighteffecttime = /** @class */ (function (_super) {
        __extends(Fighteffecttime, _super);
        function Fighteffecttime(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fighteffecttime_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fighteffecttime.get_Fighteffecttime = function (key) {
            if (Fighteffecttime.m_static_map.hasOwnProperty(key) == false) {
                Fighteffecttime.m_static_map[key] = Fighteffecttime.create_Fighteffecttime(key);
            }
            return Fighteffecttime.m_static_map[key];
        };
        Fighteffecttime.create_Fighteffecttime = function (key) {
            if (fighteffecttime_map.hasOwnProperty(key)) {
                return new Fighteffecttime(key);
            }
            return null;
        };
        Fighteffecttime.get_cfg_object = function () {
            return fighteffecttime_map;
        };
        Fighteffecttime.m_static_map = new Object();
        return Fighteffecttime;
    }(Object));
    config.Fighteffecttime = Fighteffecttime;
})(config || (config = {}));
//# sourceMappingURL=fighteffecttime.js.map