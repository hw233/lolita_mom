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
    var pet_exp_map = null;
    function pet_exp_map_init(config_obj) {
        pet_exp_map = config_obj["pet_exp_map"];
    }
    config.pet_exp_map_init = pet_exp_map_init;
    var Pet_exp = /** @class */ (function (_super) {
        __extends(Pet_exp, _super);
        function Pet_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = pet_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Pet_exp.get_Pet_exp = function (key) {
            if (Pet_exp.m_static_map.hasOwnProperty(key) == false) {
                Pet_exp.m_static_map[key] = Pet_exp.create_Pet_exp(key);
            }
            return Pet_exp.m_static_map[key];
        };
        Pet_exp.create_Pet_exp = function (key) {
            if (pet_exp_map.hasOwnProperty(key)) {
                return new Pet_exp(key);
            }
            return null;
        };
        Pet_exp.get_cfg_object = function () {
            return pet_exp_map;
        };
        Pet_exp.m_static_map = new Object();
        return Pet_exp;
    }(Object));
    config.Pet_exp = Pet_exp;
})(config || (config = {}));
//# sourceMappingURL=pet_exp.js.map