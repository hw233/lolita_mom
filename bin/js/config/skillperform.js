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
    var skillperform_map = null;
    function skillperform_map_init(config_obj) {
        skillperform_map = config_obj["skillperform_map"];
    }
    config.skillperform_map_init = skillperform_map_init;
    var Skillperform = /** @class */ (function (_super) {
        __extends(Skillperform, _super);
        function Skillperform(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skillperform_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skillperform.get_Skillperform = function (key) {
            if (Skillperform.m_static_map.hasOwnProperty(key) == false) {
                Skillperform.m_static_map[key] = Skillperform.create_Skillperform(key);
            }
            return Skillperform.m_static_map[key];
        };
        Skillperform.create_Skillperform = function (key) {
            if (skillperform_map.hasOwnProperty(key)) {
                return new Skillperform(key);
            }
            return null;
        };
        Skillperform.get_cfg_object = function () {
            return skillperform_map;
        };
        Skillperform.m_static_map = new Object();
        return Skillperform;
    }(Object));
    config.Skillperform = Skillperform;
})(config || (config = {}));
//# sourceMappingURL=skillperform.js.map