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
    var buff_map = null;
    function buff_map_init(config_obj) {
        buff_map = config_obj["buff_map"];
    }
    config.buff_map_init = buff_map_init;
    var Buff = /** @class */ (function (_super) {
        __extends(Buff, _super);
        function Buff(key) {
            var _this = _super.call(this) || this;
            _this.m_config = buff_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Buff.get_Buff = function (key) {
            if (Buff.m_static_map.hasOwnProperty(key) == false) {
                Buff.m_static_map[key] = Buff.create_Buff(key);
            }
            return Buff.m_static_map[key];
        };
        Buff.create_Buff = function (key) {
            if (buff_map.hasOwnProperty(key)) {
                return new Buff(key);
            }
            return null;
        };
        Buff.get_cfg_object = function () {
            return buff_map;
        };
        Buff.m_static_map = new Object();
        return Buff;
    }(Object));
    config.Buff = Buff;
})(config || (config = {}));
//# sourceMappingURL=buff.js.map