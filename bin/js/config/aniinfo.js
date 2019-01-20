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
    var aniinfo_map = null;
    function aniinfo_map_init(config_obj) {
        aniinfo_map = config_obj["aniinfo_map"];
    }
    config.aniinfo_map_init = aniinfo_map_init;
    var Aniinfo = /** @class */ (function (_super) {
        __extends(Aniinfo, _super);
        function Aniinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = aniinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Aniinfo.get_Aniinfo = function (key) {
            if (Aniinfo.m_static_map.hasOwnProperty(key) == false) {
                Aniinfo.m_static_map[key] = Aniinfo.create_Aniinfo(key);
            }
            return Aniinfo.m_static_map[key];
        };
        Aniinfo.create_Aniinfo = function (key) {
            if (aniinfo_map.hasOwnProperty(key)) {
                return new Aniinfo(key);
            }
            return null;
        };
        Aniinfo.get_cfg_object = function () {
            return aniinfo_map;
        };
        Aniinfo.m_static_map = new Object();
        return Aniinfo;
    }(Object));
    config.Aniinfo = Aniinfo;
})(config || (config = {}));
//# sourceMappingURL=aniinfo.js.map