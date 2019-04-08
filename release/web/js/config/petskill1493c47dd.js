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
    var petskill1_map = null;
    function petskill1_map_init(config_obj) {
        petskill1_map = config_obj["petskill1_map"];
    }
    config.petskill1_map_init = petskill1_map_init;
    var Petskill1 = /** @class */ (function (_super) {
        __extends(Petskill1, _super);
        function Petskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = petskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Petskill1.get_Petskill1 = function (key) {
            if (Petskill1.m_static_map.hasOwnProperty(key) == false) {
                Petskill1.m_static_map[key] = Petskill1.create_Petskill1(key);
            }
            return Petskill1.m_static_map[key];
        };
        Petskill1.create_Petskill1 = function (key) {
            if (petskill1_map.hasOwnProperty(key)) {
                return new Petskill1(key);
            }
            return null;
        };
        Petskill1.get_cfg_object = function () {
            return petskill1_map;
        };
        Petskill1.m_static_map = new Object();
        return Petskill1;
    }(Object));
    config.Petskill1 = Petskill1;
})(config || (config = {}));
//# sourceMappingURL=petskill1.js.map