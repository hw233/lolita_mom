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
    var avatarinfo_map = null;
    function avatarinfo_map_init(config_obj) {
        avatarinfo_map = config_obj["avatarinfo_map"];
    }
    config.avatarinfo_map_init = avatarinfo_map_init;
    var Avatarinfo = /** @class */ (function (_super) {
        __extends(Avatarinfo, _super);
        function Avatarinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = avatarinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Avatarinfo.get_Avatarinfo = function (key) {
            if (Avatarinfo.m_static_map.hasOwnProperty(key) == false) {
                Avatarinfo.m_static_map[key] = Avatarinfo.create_Avatarinfo(key);
            }
            return Avatarinfo.m_static_map[key];
        };
        Avatarinfo.create_Avatarinfo = function (key) {
            if (avatarinfo_map.hasOwnProperty(key)) {
                return new Avatarinfo(key);
            }
            return null;
        };
        Avatarinfo.get_cfg_object = function () {
            return avatarinfo_map;
        };
        Avatarinfo.m_static_map = new Object();
        return Avatarinfo;
    }(Object));
    config.Avatarinfo = Avatarinfo;
})(config || (config = {}));
//# sourceMappingURL=avatarinfo.js.map