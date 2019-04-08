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
    var fightdungeon_map = null;
    function fightdungeon_map_init(config_obj) {
        fightdungeon_map = config_obj["fightdungeon_map"];
    }
    config.fightdungeon_map_init = fightdungeon_map_init;
    var Fightdungeon = /** @class */ (function (_super) {
        __extends(Fightdungeon, _super);
        function Fightdungeon(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightdungeon_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightdungeon.get_Fightdungeon = function (key) {
            if (Fightdungeon.m_static_map.hasOwnProperty(key) == false) {
                Fightdungeon.m_static_map[key] = Fightdungeon.create_Fightdungeon(key);
            }
            return Fightdungeon.m_static_map[key];
        };
        Fightdungeon.create_Fightdungeon = function (key) {
            if (fightdungeon_map.hasOwnProperty(key)) {
                return new Fightdungeon(key);
            }
            return null;
        };
        Fightdungeon.get_cfg_object = function () {
            return fightdungeon_map;
        };
        Fightdungeon.m_static_map = new Object();
        return Fightdungeon;
    }(Object));
    config.Fightdungeon = Fightdungeon;
})(config || (config = {}));
//# sourceMappingURL=fightdungeon.js.map