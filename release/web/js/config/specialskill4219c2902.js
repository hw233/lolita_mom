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
    var specialskill4_map = null;
    function specialskill4_map_init(config_obj) {
        specialskill4_map = config_obj["specialskill4_map"];
    }
    config.specialskill4_map_init = specialskill4_map_init;
    var Specialskill4 = /** @class */ (function (_super) {
        __extends(Specialskill4, _super);
        function Specialskill4(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill4_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill4.get_Specialskill4 = function (key) {
            if (Specialskill4.m_static_map.hasOwnProperty(key) == false) {
                Specialskill4.m_static_map[key] = Specialskill4.create_Specialskill4(key);
            }
            return Specialskill4.m_static_map[key];
        };
        Specialskill4.create_Specialskill4 = function (key) {
            if (specialskill4_map.hasOwnProperty(key)) {
                return new Specialskill4(key);
            }
            return null;
        };
        Specialskill4.get_cfg_object = function () {
            return specialskill4_map;
        };
        Specialskill4.m_static_map = new Object();
        return Specialskill4;
    }(Object));
    config.Specialskill4 = Specialskill4;
})(config || (config = {}));
//# sourceMappingURL=specialskill4.js.map