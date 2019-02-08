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
    var cards_initcards_map = null;
    function cards_initcards_map_init(config_obj) {
        cards_initcards_map = config_obj["cards_initcards_map"];
    }
    config.cards_initcards_map_init = cards_initcards_map_init;
    var Cards_initcards = /** @class */ (function (_super) {
        __extends(Cards_initcards, _super);
        function Cards_initcards(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_initcards_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_initcards.get_Cards_initcards = function (key) {
            if (Cards_initcards.m_static_map.hasOwnProperty(key) == false) {
                Cards_initcards.m_static_map[key] = Cards_initcards.create_Cards_initcards(key);
            }
            return Cards_initcards.m_static_map[key];
        };
        Cards_initcards.create_Cards_initcards = function (key) {
            if (cards_initcards_map.hasOwnProperty(key)) {
                return new Cards_initcards(key);
            }
            return null;
        };
        Cards_initcards.get_cfg_object = function () {
            return cards_initcards_map;
        };
        Cards_initcards.m_static_map = new Object();
        return Cards_initcards;
    }(Object));
    config.Cards_initcards = Cards_initcards;
})(config || (config = {}));
//# sourceMappingURL=cards_initcards.js.map