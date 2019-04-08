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
    var partnerskill1_map = null;
    function partnerskill1_map_init(config_obj) {
        partnerskill1_map = config_obj["partnerskill1_map"];
    }
    config.partnerskill1_map_init = partnerskill1_map_init;
    var Partnerskill1 = /** @class */ (function (_super) {
        __extends(Partnerskill1, _super);
        function Partnerskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = partnerskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Partnerskill1.get_Partnerskill1 = function (key) {
            if (Partnerskill1.m_static_map.hasOwnProperty(key) == false) {
                Partnerskill1.m_static_map[key] = Partnerskill1.create_Partnerskill1(key);
            }
            return Partnerskill1.m_static_map[key];
        };
        Partnerskill1.create_Partnerskill1 = function (key) {
            if (partnerskill1_map.hasOwnProperty(key)) {
                return new Partnerskill1(key);
            }
            return null;
        };
        Partnerskill1.get_cfg_object = function () {
            return partnerskill1_map;
        };
        Partnerskill1.m_static_map = new Object();
        return Partnerskill1;
    }(Object));
    config.Partnerskill1 = Partnerskill1;
})(config || (config = {}));
//# sourceMappingURL=partnerskill1.js.map