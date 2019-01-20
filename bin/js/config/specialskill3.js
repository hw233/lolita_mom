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
    var specialskill3_map = null;
    function specialskill3_map_init(config_obj) {
        specialskill3_map = config_obj["specialskill3_map"];
    }
    config.specialskill3_map_init = specialskill3_map_init;
    var Specialskill3 = /** @class */ (function (_super) {
        __extends(Specialskill3, _super);
        function Specialskill3(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill3_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill3.get_Specialskill3 = function (key) {
            if (Specialskill3.m_static_map.hasOwnProperty(key) == false) {
                Specialskill3.m_static_map[key] = Specialskill3.create_Specialskill3(key);
            }
            return Specialskill3.m_static_map[key];
        };
        Specialskill3.create_Specialskill3 = function (key) {
            if (specialskill3_map.hasOwnProperty(key)) {
                return new Specialskill3(key);
            }
            return null;
        };
        Specialskill3.get_cfg_object = function () {
            return specialskill3_map;
        };
        Specialskill3.m_static_map = new Object();
        return Specialskill3;
    }(Object));
    config.Specialskill3 = Specialskill3;
})(config || (config = {}));
//# sourceMappingURL=specialskill3.js.map