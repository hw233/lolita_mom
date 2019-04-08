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
    var cards_exp_map = null;
    function cards_exp_map_init(config_obj) {
        cards_exp_map = config_obj["cards_exp_map"];
    }
    config.cards_exp_map_init = cards_exp_map_init;
    var Cards_exp = /** @class */ (function (_super) {
        __extends(Cards_exp, _super);
        function Cards_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_exp.get_Cards_exp = function (key) {
            if (Cards_exp.m_static_map.hasOwnProperty(key) == false) {
                Cards_exp.m_static_map[key] = Cards_exp.create_Cards_exp(key);
            }
            return Cards_exp.m_static_map[key];
        };
        Cards_exp.create_Cards_exp = function (key) {
            if (cards_exp_map.hasOwnProperty(key)) {
                return new Cards_exp(key);
            }
            return null;
        };
        Cards_exp.get_cfg_object = function () {
            return cards_exp_map;
        };
        Cards_exp.m_static_map = new Object();
        return Cards_exp;
    }(Object));
    config.Cards_exp = Cards_exp;
})(config || (config = {}));
//# sourceMappingURL=cards_exp.js.map