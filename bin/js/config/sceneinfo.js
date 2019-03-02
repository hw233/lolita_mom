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
    var sceneinfo_map = null;
    function sceneinfo_map_init(config_obj) {
        sceneinfo_map = config_obj["sceneinfo_map"];
    }
    config.sceneinfo_map_init = sceneinfo_map_init;
    var Sceneinfo = /** @class */ (function (_super) {
        __extends(Sceneinfo, _super);
        function Sceneinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sceneinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sceneinfo.get_Sceneinfo = function (key) {
            if (Sceneinfo.m_static_map.hasOwnProperty(key) == false) {
                Sceneinfo.m_static_map[key] = Sceneinfo.create_Sceneinfo(key);
            }
            return Sceneinfo.m_static_map[key];
        };
        Sceneinfo.create_Sceneinfo = function (key) {
            if (sceneinfo_map.hasOwnProperty(key)) {
                return new Sceneinfo(key);
            }
            return null;
        };
        Sceneinfo.get_cfg_object = function () {
            return sceneinfo_map;
        };
        Sceneinfo.m_static_map = new Object();
        return Sceneinfo;
    }(Object));
    config.Sceneinfo = Sceneinfo;
})(config || (config = {}));
//# sourceMappingURL=sceneinfo.js.map