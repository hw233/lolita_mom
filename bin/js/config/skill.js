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
    var skill_map = null;
    function skill_map_init(config_obj) {
        skill_map = config_obj["skill_map"];
    }
    config.skill_map_init = skill_map_init;
    var Skill = /** @class */ (function (_super) {
        __extends(Skill, _super);
        function Skill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skill.get_Skill = function (key) {
            if (Skill.m_static_map.hasOwnProperty(key) == false) {
                Skill.m_static_map[key] = Skill.create_Skill(key);
            }
            return Skill.m_static_map[key];
        };
        Skill.create_Skill = function (key) {
            if (skill_map.hasOwnProperty(key)) {
                return new Skill(key);
            }
            return null;
        };
        Skill.get_cfg_object = function () {
            return skill_map;
        };
        Skill.m_static_map = new Object();
        return Skill;
    }(Object));
    config.Skill = Skill;
})(config || (config = {}));
//# sourceMappingURL=skill.js.map