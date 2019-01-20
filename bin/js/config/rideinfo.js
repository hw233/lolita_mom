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
    var rideinfo_map = null;
    function rideinfo_map_init(config_obj) {
        rideinfo_map = config_obj["rideinfo_map"];
    }
    config.rideinfo_map_init = rideinfo_map_init;
    var Rideinfo = /** @class */ (function (_super) {
        __extends(Rideinfo, _super);
        function Rideinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = rideinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Rideinfo.get_Rideinfo = function (key) {
            if (Rideinfo.m_static_map.hasOwnProperty(key) == false) {
                Rideinfo.m_static_map[key] = Rideinfo.create_Rideinfo(key);
            }
            return Rideinfo.m_static_map[key];
        };
        Rideinfo.create_Rideinfo = function (key) {
            if (rideinfo_map.hasOwnProperty(key)) {
                return new Rideinfo(key);
            }
            return null;
        };
        Rideinfo.get_cfg_object = function () {
            return rideinfo_map;
        };
        Rideinfo.m_static_map = new Object();
        return Rideinfo;
    }(Object));
    config.Rideinfo = Rideinfo;
})(config || (config = {}));
//# sourceMappingURL=rideinfo.js.map