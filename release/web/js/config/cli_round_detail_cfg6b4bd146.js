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
    var cli_round_detail_cfg_map = null;
    function cli_round_detail_cfg_map_init(config_obj) {
        cli_round_detail_cfg_map = config_obj["cli_round_detail_cfg_map"];
    }
    config.cli_round_detail_cfg_map_init = cli_round_detail_cfg_map_init;
    var Cli_round_detail_cfg = /** @class */ (function (_super) {
        __extends(Cli_round_detail_cfg, _super);
        function Cli_round_detail_cfg(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cli_round_detail_cfg_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cli_round_detail_cfg.get_Cli_round_detail_cfg = function (key) {
            if (Cli_round_detail_cfg.m_static_map.hasOwnProperty(key) == false) {
                Cli_round_detail_cfg.m_static_map[key] = Cli_round_detail_cfg.create_Cli_round_detail_cfg(key);
            }
            return Cli_round_detail_cfg.m_static_map[key];
        };
        Cli_round_detail_cfg.create_Cli_round_detail_cfg = function (key) {
            if (cli_round_detail_cfg_map.hasOwnProperty(key)) {
                return new Cli_round_detail_cfg(key);
            }
            return null;
        };
        Cli_round_detail_cfg.get_cfg_object = function () {
            return cli_round_detail_cfg_map;
        };
        Cli_round_detail_cfg.m_static_map = new Object();
        return Cli_round_detail_cfg;
    }(Object));
    config.Cli_round_detail_cfg = Cli_round_detail_cfg;
})(config || (config = {}));
//# sourceMappingURL=cli_round_detail_cfg.js.map