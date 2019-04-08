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
    var effectinfo_map = null;
    function effectinfo_map_init(config_obj) {
        effectinfo_map = config_obj["effectinfo_map"];
    }
    config.effectinfo_map_init = effectinfo_map_init;
    var Effectinfo = /** @class */ (function (_super) {
        __extends(Effectinfo, _super);
        function Effectinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = effectinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Effectinfo.get_Effectinfo = function (key) {
            if (Effectinfo.m_static_map.hasOwnProperty(key) == false) {
                Effectinfo.m_static_map[key] = Effectinfo.create_Effectinfo(key);
            }
            return Effectinfo.m_static_map[key];
        };
        Effectinfo.create_Effectinfo = function (key) {
            if (effectinfo_map.hasOwnProperty(key)) {
                return new Effectinfo(key);
            }
            return null;
        };
        Effectinfo.get_cfg_object = function () {
            return effectinfo_map;
        };
        Effectinfo.m_static_map = new Object();
        return Effectinfo;
    }(Object));
    config.Effectinfo = Effectinfo;
})(config || (config = {}));
//# sourceMappingURL=effectinfo.js.map