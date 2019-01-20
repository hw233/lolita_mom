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
    var fairyinfo_map = null;
    function fairyinfo_map_init(config_obj) {
        fairyinfo_map = config_obj["fairyinfo_map"];
    }
    config.fairyinfo_map_init = fairyinfo_map_init;
    var Fairyinfo = /** @class */ (function (_super) {
        __extends(Fairyinfo, _super);
        function Fairyinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fairyinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fairyinfo.get_Fairyinfo = function (key) {
            if (Fairyinfo.m_static_map.hasOwnProperty(key) == false) {
                Fairyinfo.m_static_map[key] = Fairyinfo.create_Fairyinfo(key);
            }
            return Fairyinfo.m_static_map[key];
        };
        Fairyinfo.create_Fairyinfo = function (key) {
            if (fairyinfo_map.hasOwnProperty(key)) {
                return new Fairyinfo(key);
            }
            return null;
        };
        Fairyinfo.get_cfg_object = function () {
            return fairyinfo_map;
        };
        Fairyinfo.m_static_map = new Object();
        return Fairyinfo;
    }(Object));
    config.Fairyinfo = Fairyinfo;
})(config || (config = {}));
//# sourceMappingURL=fairyinfo.js.map