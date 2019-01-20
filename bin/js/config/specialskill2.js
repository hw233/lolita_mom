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
    var specialskill2_map = null;
    function specialskill2_map_init(config_obj) {
        specialskill2_map = config_obj["specialskill2_map"];
    }
    config.specialskill2_map_init = specialskill2_map_init;
    var Specialskill2 = /** @class */ (function (_super) {
        __extends(Specialskill2, _super);
        function Specialskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill2.get_Specialskill2 = function (key) {
            if (Specialskill2.m_static_map.hasOwnProperty(key) == false) {
                Specialskill2.m_static_map[key] = Specialskill2.create_Specialskill2(key);
            }
            return Specialskill2.m_static_map[key];
        };
        Specialskill2.create_Specialskill2 = function (key) {
            if (specialskill2_map.hasOwnProperty(key)) {
                return new Specialskill2(key);
            }
            return null;
        };
        Specialskill2.get_cfg_object = function () {
            return specialskill2_map;
        };
        Specialskill2.m_static_map = new Object();
        return Specialskill2;
    }(Object));
    config.Specialskill2 = Specialskill2;
})(config || (config = {}));
//# sourceMappingURL=specialskill2.js.map