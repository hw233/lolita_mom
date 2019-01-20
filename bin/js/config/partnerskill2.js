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
    var partnerskill2_map = null;
    function partnerskill2_map_init(config_obj) {
        partnerskill2_map = config_obj["partnerskill2_map"];
    }
    config.partnerskill2_map_init = partnerskill2_map_init;
    var Partnerskill2 = /** @class */ (function (_super) {
        __extends(Partnerskill2, _super);
        function Partnerskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = partnerskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Partnerskill2.get_Partnerskill2 = function (key) {
            if (Partnerskill2.m_static_map.hasOwnProperty(key) == false) {
                Partnerskill2.m_static_map[key] = Partnerskill2.create_Partnerskill2(key);
            }
            return Partnerskill2.m_static_map[key];
        };
        Partnerskill2.create_Partnerskill2 = function (key) {
            if (partnerskill2_map.hasOwnProperty(key)) {
                return new Partnerskill2(key);
            }
            return null;
        };
        Partnerskill2.get_cfg_object = function () {
            return partnerskill2_map;
        };
        Partnerskill2.m_static_map = new Object();
        return Partnerskill2;
    }(Object));
    config.Partnerskill2 = Partnerskill2;
})(config || (config = {}));
//# sourceMappingURL=partnerskill2.js.map