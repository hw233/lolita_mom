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
    var fightgroup_map = null;
    function fightgroup_map_init(config_obj) {
        fightgroup_map = config_obj["fightgroup_map"];
    }
    config.fightgroup_map_init = fightgroup_map_init;
    var Fightgroup = /** @class */ (function (_super) {
        __extends(Fightgroup, _super);
        function Fightgroup(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightgroup_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightgroup.get_Fightgroup = function (key) {
            if (Fightgroup.m_static_map.hasOwnProperty(key) == false) {
                Fightgroup.m_static_map[key] = Fightgroup.create_Fightgroup(key);
            }
            return Fightgroup.m_static_map[key];
        };
        Fightgroup.create_Fightgroup = function (key) {
            if (fightgroup_map.hasOwnProperty(key)) {
                return new Fightgroup(key);
            }
            return null;
        };
        Fightgroup.get_cfg_object = function () {
            return fightgroup_map;
        };
        Fightgroup.m_static_map = new Object();
        return Fightgroup;
    }(Object));
    config.Fightgroup = Fightgroup;
})(config || (config = {}));
//# sourceMappingURL=fightgroup.js.map