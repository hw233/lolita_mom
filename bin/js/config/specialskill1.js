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
    var specialskill1_map = null;
    function specialskill1_map_init(config_obj) {
        specialskill1_map = config_obj["specialskill1_map"];
    }
    config.specialskill1_map_init = specialskill1_map_init;
    var Specialskill1 = /** @class */ (function (_super) {
        __extends(Specialskill1, _super);
        function Specialskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill1.get_Specialskill1 = function (key) {
            if (Specialskill1.m_static_map.hasOwnProperty(key) == false) {
                Specialskill1.m_static_map[key] = Specialskill1.create_Specialskill1(key);
            }
            return Specialskill1.m_static_map[key];
        };
        Specialskill1.create_Specialskill1 = function (key) {
            if (specialskill1_map.hasOwnProperty(key)) {
                return new Specialskill1(key);
            }
            return null;
        };
        Specialskill1.get_cfg_object = function () {
            return specialskill1_map;
        };
        Specialskill1.m_static_map = new Object();
        return Specialskill1;
    }(Object));
    config.Specialskill1 = Specialskill1;
})(config || (config = {}));
//# sourceMappingURL=specialskill1.js.map