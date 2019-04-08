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
    var cardbuff_map = null;
    function cardbuff_map_init(config_obj) {
        cardbuff_map = config_obj["cardbuff_map"];
    }
    config.cardbuff_map_init = cardbuff_map_init;
    var Cardbuff = /** @class */ (function (_super) {
        __extends(Cardbuff, _super);
        function Cardbuff(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cardbuff_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cardbuff.get_Cardbuff = function (key) {
            if (Cardbuff.m_static_map.hasOwnProperty(key) == false) {
                Cardbuff.m_static_map[key] = Cardbuff.create_Cardbuff(key);
            }
            return Cardbuff.m_static_map[key];
        };
        Cardbuff.create_Cardbuff = function (key) {
            if (cardbuff_map.hasOwnProperty(key)) {
                return new Cardbuff(key);
            }
            return null;
        };
        Cardbuff.get_cfg_object = function () {
            return cardbuff_map;
        };
        Cardbuff.m_static_map = new Object();
        return Cardbuff;
    }(Object));
    config.Cardbuff = Cardbuff;
})(config || (config = {}));
//# sourceMappingURL=cardbuff.js.map