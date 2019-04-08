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
    var cards_effect_map = null;
    function cards_effect_map_init(config_obj) {
        cards_effect_map = config_obj["cards_effect_map"];
    }
    config.cards_effect_map_init = cards_effect_map_init;
    var Cards_effect = /** @class */ (function (_super) {
        __extends(Cards_effect, _super);
        function Cards_effect(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_effect_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_effect.get_Cards_effect = function (key) {
            if (Cards_effect.m_static_map.hasOwnProperty(key) == false) {
                Cards_effect.m_static_map[key] = Cards_effect.create_Cards_effect(key);
            }
            return Cards_effect.m_static_map[key];
        };
        Cards_effect.create_Cards_effect = function (key) {
            if (cards_effect_map.hasOwnProperty(key)) {
                return new Cards_effect(key);
            }
            return null;
        };
        Cards_effect.get_cfg_object = function () {
            return cards_effect_map;
        };
        Cards_effect.m_static_map = new Object();
        return Cards_effect;
    }(Object));
    config.Cards_effect = Cards_effect;
})(config || (config = {}));
//# sourceMappingURL=cards_effect.js.map