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
    var item_map = null;
    function item_map_init(config_obj) {
        item_map = config_obj["item_map"];
    }
    config.item_map_init = item_map_init;
    var Item = /** @class */ (function (_super) {
        __extends(Item, _super);
        function Item(key) {
            var _this = _super.call(this) || this;
            _this.m_config = item_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Item.get_Item = function (key) {
            if (Item.m_static_map.hasOwnProperty(key) == false) {
                Item.m_static_map[key] = Item.create_Item(key);
            }
            return Item.m_static_map[key];
        };
        Item.create_Item = function (key) {
            if (item_map.hasOwnProperty(key)) {
                return new Item(key);
            }
            return null;
        };
        Item.get_cfg_object = function () {
            return item_map;
        };
        Item.m_static_map = new Object();
        return Item;
    }(Object));
    config.Item = Item;
})(config || (config = {}));
//# sourceMappingURL=item.js.map