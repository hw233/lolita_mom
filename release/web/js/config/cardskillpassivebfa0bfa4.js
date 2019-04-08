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
    var cardskillpassive_map = null;
    function cardskillpassive_map_init(config_obj) {
        cardskillpassive_map = config_obj["cardskillpassive_map"];
    }
    config.cardskillpassive_map_init = cardskillpassive_map_init;
    var Cardskillpassive = /** @class */ (function (_super) {
        __extends(Cardskillpassive, _super);
        function Cardskillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cardskillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cardskillpassive.get_Cardskillpassive = function (key) {
            if (Cardskillpassive.m_static_map.hasOwnProperty(key) == false) {
                Cardskillpassive.m_static_map[key] = Cardskillpassive.create_Cardskillpassive(key);
            }
            return Cardskillpassive.m_static_map[key];
        };
        Cardskillpassive.create_Cardskillpassive = function (key) {
            if (cardskillpassive_map.hasOwnProperty(key)) {
                return new Cardskillpassive(key);
            }
            return null;
        };
        Cardskillpassive.get_cfg_object = function () {
            return cardskillpassive_map;
        };
        Cardskillpassive.m_static_map = new Object();
        return Cardskillpassive;
    }(Object));
    config.Cardskillpassive = Cardskillpassive;
})(config || (config = {}));
//# sourceMappingURL=cardskillpassive.js.map