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
    var assist_info_map = null;
    function assist_info_map_init(config_obj) {
        assist_info_map = config_obj["assist_info_map"];
    }
    config.assist_info_map_init = assist_info_map_init;
    var Assist_info = /** @class */ (function (_super) {
        __extends(Assist_info, _super);
        function Assist_info(key) {
            var _this = _super.call(this) || this;
            _this.m_config = assist_info_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Assist_info.get_Assist_info = function (key) {
            if (Assist_info.m_static_map.hasOwnProperty(key) == false) {
                Assist_info.m_static_map[key] = Assist_info.create_Assist_info(key);
            }
            return Assist_info.m_static_map[key];
        };
        Assist_info.create_Assist_info = function (key) {
            if (assist_info_map.hasOwnProperty(key)) {
                return new Assist_info(key);
            }
            return null;
        };
        Assist_info.get_cfg_object = function () {
            return assist_info_map;
        };
        Assist_info.m_static_map = new Object();
        return Assist_info;
    }(Object));
    config.Assist_info = Assist_info;
})(config || (config = {}));
//# sourceMappingURL=assist_info.js.map