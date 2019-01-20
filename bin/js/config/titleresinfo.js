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
    var titleresinfo_map = null;
    function titleresinfo_map_init(config_obj) {
        titleresinfo_map = config_obj["titleresinfo_map"];
    }
    config.titleresinfo_map_init = titleresinfo_map_init;
    var Titleresinfo = /** @class */ (function (_super) {
        __extends(Titleresinfo, _super);
        function Titleresinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = titleresinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Titleresinfo.get_Titleresinfo = function (key) {
            if (Titleresinfo.m_static_map.hasOwnProperty(key) == false) {
                Titleresinfo.m_static_map[key] = Titleresinfo.create_Titleresinfo(key);
            }
            return Titleresinfo.m_static_map[key];
        };
        Titleresinfo.create_Titleresinfo = function (key) {
            if (titleresinfo_map.hasOwnProperty(key)) {
                return new Titleresinfo(key);
            }
            return null;
        };
        Titleresinfo.get_cfg_object = function () {
            return titleresinfo_map;
        };
        Titleresinfo.m_static_map = new Object();
        return Titleresinfo;
    }(Object));
    config.Titleresinfo = Titleresinfo;
})(config || (config = {}));
//# sourceMappingURL=titleresinfo.js.map