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
    var itemmerge_map = null;
    function itemmerge_map_init(config_obj) {
        itemmerge_map = config_obj["itemmerge_map"];
    }
    config.itemmerge_map_init = itemmerge_map_init;
    var Itemmerge = /** @class */ (function (_super) {
        __extends(Itemmerge, _super);
        function Itemmerge(key) {
            var _this = _super.call(this) || this;
            _this.m_config = itemmerge_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Itemmerge.get_Itemmerge = function (key) {
            if (Itemmerge.m_static_map.hasOwnProperty(key) == false) {
                Itemmerge.m_static_map[key] = Itemmerge.create_Itemmerge(key);
            }
            return Itemmerge.m_static_map[key];
        };
        Itemmerge.create_Itemmerge = function (key) {
            if (itemmerge_map.hasOwnProperty(key)) {
                return new Itemmerge(key);
            }
            return null;
        };
        Itemmerge.get_cfg_object = function () {
            return itemmerge_map;
        };
        Itemmerge.m_static_map = new Object();
        return Itemmerge;
    }(Object));
    config.Itemmerge = Itemmerge;
})(config || (config = {}));
//# sourceMappingURL=itemmerge.js.map