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
    var petskill2_map = null;
    function petskill2_map_init(config_obj) {
        petskill2_map = config_obj["petskill2_map"];
    }
    config.petskill2_map_init = petskill2_map_init;
    var Petskill2 = /** @class */ (function (_super) {
        __extends(Petskill2, _super);
        function Petskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = petskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Petskill2.get_Petskill2 = function (key) {
            if (Petskill2.m_static_map.hasOwnProperty(key) == false) {
                Petskill2.m_static_map[key] = Petskill2.create_Petskill2(key);
            }
            return Petskill2.m_static_map[key];
        };
        Petskill2.create_Petskill2 = function (key) {
            if (petskill2_map.hasOwnProperty(key)) {
                return new Petskill2(key);
            }
            return null;
        };
        Petskill2.get_cfg_object = function () {
            return petskill2_map;
        };
        Petskill2.m_static_map = new Object();
        return Petskill2;
    }(Object));
    config.Petskill2 = Petskill2;
})(config || (config = {}));
//# sourceMappingURL=petskill2.js.map