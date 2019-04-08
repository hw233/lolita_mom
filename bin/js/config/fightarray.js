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
    var fightarray_map = null;
    function fightarray_map_init(config_obj) {
        fightarray_map = config_obj["fightarray_map"];
    }
    config.fightarray_map_init = fightarray_map_init;
    var Fightarray = /** @class */ (function (_super) {
        __extends(Fightarray, _super);
        function Fightarray(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightarray_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightarray.get_Fightarray = function (key) {
            if (Fightarray.m_static_map.hasOwnProperty(key) == false) {
                Fightarray.m_static_map[key] = Fightarray.create_Fightarray(key);
            }
            return Fightarray.m_static_map[key];
        };
        Fightarray.create_Fightarray = function (key) {
            if (fightarray_map.hasOwnProperty(key)) {
                return new Fightarray(key);
            }
            return null;
        };
        Fightarray.get_cfg_object = function () {
            return fightarray_map;
        };
        Fightarray.m_static_map = new Object();
        return Fightarray;
    }(Object));
    config.Fightarray = Fightarray;
})(config || (config = {}));
//# sourceMappingURL=fightarray.js.map