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
var data;
(function (data) {
    var player_data = /** @class */ (function (_super) {
        __extends(player_data, _super);
        function player_data() {
            var _this = _super.call(this) || this;
            _this.m_lv = 0;
            _this.m_shape = 0;
            _this.m_exp = 0;
            _this.m_expmax = 0;
            _this.m_gold = 0;
            _this.m_expspd = 0;
            _this.m_goldspd = 0;
            _this.m_stamina = 0;
            _this.m_last_time = 0;
            return _this;
        }
        player_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return player_data;
    }(utils.game_data));
    data.player_data = player_data;
})(data || (data = {}));
//# sourceMappingURL=player_data.js.map