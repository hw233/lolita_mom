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
    var cardskill_map = null;
    function cardskill_map_init(config_obj) {
        cardskill_map = config_obj["cardskill_map"];
    }
    config.cardskill_map_init = cardskill_map_init;
    var Cardskill = /** @class */ (function (_super) {
        __extends(Cardskill, _super);
        function Cardskill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cardskill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cardskill.get_Cardskill = function (key) {
            if (Cardskill.m_static_map.hasOwnProperty(key) == false) {
                Cardskill.m_static_map[key] = Cardskill.create_Cardskill(key);
            }
            return Cardskill.m_static_map[key];
        };
        Cardskill.create_Cardskill = function (key) {
            if (cardskill_map.hasOwnProperty(key)) {
                return new Cardskill(key);
            }
            return null;
        };
        Cardskill.get_cfg_object = function () {
            return cardskill_map;
        };
        Cardskill.m_static_map = new Object();
        return Cardskill;
    }(Object));
    config.Cardskill = Cardskill;
})(config || (config = {}));
//# sourceMappingURL=cardskill.js.map