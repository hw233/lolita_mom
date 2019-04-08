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
    var randomname_map = null;
    function randomname_map_init(config_obj) {
        randomname_map = config_obj["randomname_map"];
    }
    config.randomname_map_init = randomname_map_init;
    var Randomname = /** @class */ (function (_super) {
        __extends(Randomname, _super);
        function Randomname(key) {
            var _this = _super.call(this) || this;
            _this.m_config = randomname_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Randomname.get_Randomname = function (key) {
            if (Randomname.m_static_map.hasOwnProperty(key) == false) {
                Randomname.m_static_map[key] = Randomname.create_Randomname(key);
            }
            return Randomname.m_static_map[key];
        };
        Randomname.create_Randomname = function (key) {
            if (randomname_map.hasOwnProperty(key)) {
                return new Randomname(key);
            }
            return null;
        };
        Randomname.get_cfg_object = function () {
            return randomname_map;
        };
        Randomname.m_static_map = new Object();
        return Randomname;
    }(Object));
    config.Randomname = Randomname;
})(config || (config = {}));
//# sourceMappingURL=randomname.js.map