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
    var playerskill1_map = null;
    function playerskill1_map_init(config_obj) {
        playerskill1_map = config_obj["playerskill1_map"];
    }
    config.playerskill1_map_init = playerskill1_map_init;
    var Playerskill1 = /** @class */ (function (_super) {
        __extends(Playerskill1, _super);
        function Playerskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = playerskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Playerskill1.get_Playerskill1 = function (key) {
            if (Playerskill1.m_static_map.hasOwnProperty(key) == false) {
                Playerskill1.m_static_map[key] = Playerskill1.create_Playerskill1(key);
            }
            return Playerskill1.m_static_map[key];
        };
        Playerskill1.create_Playerskill1 = function (key) {
            if (playerskill1_map.hasOwnProperty(key)) {
                return new Playerskill1(key);
            }
            return null;
        };
        Playerskill1.get_cfg_object = function () {
            return playerskill1_map;
        };
        Playerskill1.m_static_map = new Object();
        return Playerskill1;
    }(Object));
    config.Playerskill1 = Playerskill1;
})(config || (config = {}));
//# sourceMappingURL=playerskill1.js.map