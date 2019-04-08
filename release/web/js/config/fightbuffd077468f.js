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
    var fightbuff_map = null;
    function fightbuff_map_init(config_obj) {
        fightbuff_map = config_obj["fightbuff_map"];
    }
    config.fightbuff_map_init = fightbuff_map_init;
    var Fightbuff = /** @class */ (function (_super) {
        __extends(Fightbuff, _super);
        function Fightbuff(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightbuff_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightbuff.get_Fightbuff = function (key) {
            if (Fightbuff.m_static_map.hasOwnProperty(key) == false) {
                Fightbuff.m_static_map[key] = Fightbuff.create_Fightbuff(key);
            }
            return Fightbuff.m_static_map[key];
        };
        Fightbuff.create_Fightbuff = function (key) {
            if (fightbuff_map.hasOwnProperty(key)) {
                return new Fightbuff(key);
            }
            return null;
        };
        Fightbuff.get_cfg_object = function () {
            return fightbuff_map;
        };
        Fightbuff.m_static_map = new Object();
        return Fightbuff;
    }(Object));
    config.Fightbuff = Fightbuff;
})(config || (config = {}));
//# sourceMappingURL=fightbuff.js.map