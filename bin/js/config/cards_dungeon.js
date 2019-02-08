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
    var cards_dungeon_map = null;
    function cards_dungeon_map_init(config_obj) {
        cards_dungeon_map = config_obj["cards_dungeon_map"];
    }
    config.cards_dungeon_map_init = cards_dungeon_map_init;
    var Cards_dungeon = /** @class */ (function (_super) {
        __extends(Cards_dungeon, _super);
        function Cards_dungeon(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_dungeon_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_dungeon.get_Cards_dungeon = function (key) {
            if (Cards_dungeon.m_static_map.hasOwnProperty(key) == false) {
                Cards_dungeon.m_static_map[key] = Cards_dungeon.create_Cards_dungeon(key);
            }
            return Cards_dungeon.m_static_map[key];
        };
        Cards_dungeon.create_Cards_dungeon = function (key) {
            if (cards_dungeon_map.hasOwnProperty(key)) {
                return new Cards_dungeon(key);
            }
            return null;
        };
        Cards_dungeon.get_cfg_object = function () {
            return cards_dungeon_map;
        };
        Cards_dungeon.m_static_map = new Object();
        return Cards_dungeon;
    }(Object));
    config.Cards_dungeon = Cards_dungeon;
})(config || (config = {}));
//# sourceMappingURL=cards_dungeon.js.map