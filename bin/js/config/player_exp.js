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
    var player_exp_map = null;
    function player_exp_map_init(config_obj) {
        player_exp_map = config_obj["player_exp_map"];
    }
    config.player_exp_map_init = player_exp_map_init;
    var Player_exp = /** @class */ (function (_super) {
        __extends(Player_exp, _super);
        function Player_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = player_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Player_exp.get_Player_exp = function (key) {
            if (Player_exp.m_static_map.hasOwnProperty(key) == false) {
                Player_exp.m_static_map[key] = Player_exp.create_Player_exp(key);
            }
            return Player_exp.m_static_map[key];
        };
        Player_exp.create_Player_exp = function (key) {
            if (player_exp_map.hasOwnProperty(key)) {
                return new Player_exp(key);
            }
            return null;
        };
        Player_exp.get_cfg_object = function () {
            return player_exp_map;
        };
        Player_exp.m_static_map = new Object();
        return Player_exp;
    }(Object));
    config.Player_exp = Player_exp;
})(config || (config = {}));
//# sourceMappingURL=player_exp.js.map