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
    var winginfo_map = null;
    function winginfo_map_init(config_obj) {
        winginfo_map = config_obj["winginfo_map"];
    }
    config.winginfo_map_init = winginfo_map_init;
    var Winginfo = /** @class */ (function (_super) {
        __extends(Winginfo, _super);
        function Winginfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = winginfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Winginfo.get_Winginfo = function (key) {
            if (Winginfo.m_static_map.hasOwnProperty(key) == false) {
                Winginfo.m_static_map[key] = Winginfo.create_Winginfo(key);
            }
            return Winginfo.m_static_map[key];
        };
        Winginfo.create_Winginfo = function (key) {
            if (winginfo_map.hasOwnProperty(key)) {
                return new Winginfo(key);
            }
            return null;
        };
        Winginfo.get_cfg_object = function () {
            return winginfo_map;
        };
        Winginfo.m_static_map = new Object();
        return Winginfo;
    }(Object));
    config.Winginfo = Winginfo;
})(config || (config = {}));
//# sourceMappingURL=winginfo.js.map