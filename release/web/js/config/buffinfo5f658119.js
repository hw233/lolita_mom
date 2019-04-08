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
    var buffinfo_map = null;
    function buffinfo_map_init(config_obj) {
        buffinfo_map = config_obj["buffinfo_map"];
    }
    config.buffinfo_map_init = buffinfo_map_init;
    var Buffinfo = /** @class */ (function (_super) {
        __extends(Buffinfo, _super);
        function Buffinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = buffinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Buffinfo.get_Buffinfo = function (key) {
            if (Buffinfo.m_static_map.hasOwnProperty(key) == false) {
                Buffinfo.m_static_map[key] = Buffinfo.create_Buffinfo(key);
            }
            return Buffinfo.m_static_map[key];
        };
        Buffinfo.create_Buffinfo = function (key) {
            if (buffinfo_map.hasOwnProperty(key)) {
                return new Buffinfo(key);
            }
            return null;
        };
        Buffinfo.get_cfg_object = function () {
            return buffinfo_map;
        };
        Buffinfo.m_static_map = new Object();
        return Buffinfo;
    }(Object));
    config.Buffinfo = Buffinfo;
})(config || (config = {}));
//# sourceMappingURL=buffinfo.js.map