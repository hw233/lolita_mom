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
    var simpleskill_map = null;
    function simpleskill_map_init(config_obj) {
        simpleskill_map = config_obj["simpleskill_map"];
    }
    config.simpleskill_map_init = simpleskill_map_init;
    var Simpleskill = /** @class */ (function (_super) {
        __extends(Simpleskill, _super);
        function Simpleskill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = simpleskill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Simpleskill.get_Simpleskill = function (key) {
            if (Simpleskill.m_static_map.hasOwnProperty(key) == false) {
                Simpleskill.m_static_map[key] = Simpleskill.create_Simpleskill(key);
            }
            return Simpleskill.m_static_map[key];
        };
        Simpleskill.create_Simpleskill = function (key) {
            if (simpleskill_map.hasOwnProperty(key)) {
                return new Simpleskill(key);
            }
            return null;
        };
        Simpleskill.get_cfg_object = function () {
            return simpleskill_map;
        };
        Simpleskill.m_static_map = new Object();
        return Simpleskill;
    }(Object));
    config.Simpleskill = Simpleskill;
})(config || (config = {}));
//# sourceMappingURL=simpleskill.js.map