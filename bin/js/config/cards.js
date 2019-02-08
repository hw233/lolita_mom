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
    var cards_map = null;
    function cards_map_init(config_obj) {
        cards_map = config_obj["cards_map"];
    }
    config.cards_map_init = cards_map_init;
    var Cards = /** @class */ (function (_super) {
        __extends(Cards, _super);
        function Cards(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards.get_Cards = function (key) {
            if (Cards.m_static_map.hasOwnProperty(key) == false) {
                Cards.m_static_map[key] = Cards.create_Cards(key);
            }
            return Cards.m_static_map[key];
        };
        Cards.create_Cards = function (key) {
            if (cards_map.hasOwnProperty(key)) {
                return new Cards(key);
            }
            return null;
        };
        Cards.get_cfg_object = function () {
            return cards_map;
        };
        Cards.m_static_map = new Object();
        return Cards;
    }(Object));
    config.Cards = Cards;
})(config || (config = {}));
//# sourceMappingURL=cards.js.map