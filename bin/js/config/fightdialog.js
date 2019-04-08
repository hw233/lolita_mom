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
    var fightdialog_map = null;
    function fightdialog_map_init(config_obj) {
        fightdialog_map = config_obj["fightdialog_map"];
    }
    config.fightdialog_map_init = fightdialog_map_init;
    var Fightdialog = /** @class */ (function (_super) {
        __extends(Fightdialog, _super);
        function Fightdialog(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightdialog_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightdialog.get_Fightdialog = function (key) {
            if (Fightdialog.m_static_map.hasOwnProperty(key) == false) {
                Fightdialog.m_static_map[key] = Fightdialog.create_Fightdialog(key);
            }
            return Fightdialog.m_static_map[key];
        };
        Fightdialog.create_Fightdialog = function (key) {
            if (fightdialog_map.hasOwnProperty(key)) {
                return new Fightdialog(key);
            }
            return null;
        };
        Fightdialog.get_cfg_object = function () {
            return fightdialog_map;
        };
        Fightdialog.m_static_map = new Object();
        return Fightdialog;
    }(Object));
    config.Fightdialog = Fightdialog;
})(config || (config = {}));
//# sourceMappingURL=fightdialog.js.map