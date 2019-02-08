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
    var cards_spell_map = null;
    function cards_spell_map_init(config_obj) {
        cards_spell_map = config_obj["cards_spell_map"];
    }
    config.cards_spell_map_init = cards_spell_map_init;
    var Cards_spell = /** @class */ (function (_super) {
        __extends(Cards_spell, _super);
        function Cards_spell(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_spell_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_spell.get_Cards_spell = function (key) {
            if (Cards_spell.m_static_map.hasOwnProperty(key) == false) {
                Cards_spell.m_static_map[key] = Cards_spell.create_Cards_spell(key);
            }
            return Cards_spell.m_static_map[key];
        };
        Cards_spell.create_Cards_spell = function (key) {
            if (cards_spell_map.hasOwnProperty(key)) {
                return new Cards_spell(key);
            }
            return null;
        };
        Cards_spell.get_cfg_object = function () {
            return cards_spell_map;
        };
        Cards_spell.m_static_map = new Object();
        return Cards_spell;
    }(Object));
    config.Cards_spell = Cards_spell;
})(config || (config = {}));
//# sourceMappingURL=cards_spell.js.map