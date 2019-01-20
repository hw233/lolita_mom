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
    var playerskill2_map = null;
    function playerskill2_map_init(config_obj) {
        playerskill2_map = config_obj["playerskill2_map"];
    }
    config.playerskill2_map_init = playerskill2_map_init;
    var Playerskill2 = /** @class */ (function (_super) {
        __extends(Playerskill2, _super);
        function Playerskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = playerskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Playerskill2.get_Playerskill2 = function (key) {
            if (Playerskill2.m_static_map.hasOwnProperty(key) == false) {
                Playerskill2.m_static_map[key] = Playerskill2.create_Playerskill2(key);
            }
            return Playerskill2.m_static_map[key];
        };
        Playerskill2.create_Playerskill2 = function (key) {
            if (playerskill2_map.hasOwnProperty(key)) {
                return new Playerskill2(key);
            }
            return null;
        };
        Playerskill2.get_cfg_object = function () {
            return playerskill2_map;
        };
        Playerskill2.m_static_map = new Object();
        return Playerskill2;
    }(Object));
    config.Playerskill2 = Playerskill2;
})(config || (config = {}));
//# sourceMappingURL=playerskill2.js.map