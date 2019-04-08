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
    var fightdata_map = null;
    function fightdata_map_init(config_obj) {
        fightdata_map = config_obj["fightdata_map"];
    }
    config.fightdata_map_init = fightdata_map_init;
    var Fightdata = /** @class */ (function (_super) {
        __extends(Fightdata, _super);
        function Fightdata(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightdata_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightdata.get_Fightdata = function (key) {
            if (Fightdata.m_static_map.hasOwnProperty(key) == false) {
                Fightdata.m_static_map[key] = Fightdata.create_Fightdata(key);
            }
            return Fightdata.m_static_map[key];
        };
        Fightdata.create_Fightdata = function (key) {
            if (fightdata_map.hasOwnProperty(key)) {
                return new Fightdata(key);
            }
            return null;
        };
        Fightdata.get_cfg_object = function () {
            return fightdata_map;
        };
        Fightdata.m_static_map = new Object();
        return Fightdata;
    }(Object));
    config.Fightdata = Fightdata;
})(config || (config = {}));
//# sourceMappingURL=fightdata.js.map