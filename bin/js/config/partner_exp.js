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
    var partner_exp_map = null;
    function partner_exp_map_init(config_obj) {
        partner_exp_map = config_obj["partner_exp_map"];
    }
    config.partner_exp_map_init = partner_exp_map_init;
    var Partner_exp = /** @class */ (function (_super) {
        __extends(Partner_exp, _super);
        function Partner_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = partner_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Partner_exp.get_Partner_exp = function (key) {
            if (Partner_exp.m_static_map.hasOwnProperty(key) == false) {
                Partner_exp.m_static_map[key] = Partner_exp.create_Partner_exp(key);
            }
            return Partner_exp.m_static_map[key];
        };
        Partner_exp.create_Partner_exp = function (key) {
            if (partner_exp_map.hasOwnProperty(key)) {
                return new Partner_exp(key);
            }
            return null;
        };
        Partner_exp.get_cfg_object = function () {
            return partner_exp_map;
        };
        Partner_exp.m_static_map = new Object();
        return Partner_exp;
    }(Object));
    config.Partner_exp = Partner_exp;
})(config || (config = {}));
//# sourceMappingURL=partner_exp.js.map