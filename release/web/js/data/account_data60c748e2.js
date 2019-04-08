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
    var account_data = /** @class */ (function (_super) {
        __extends(account_data, _super);
        function account_data() {
            var _this = _super.call(this) || this;
            _this.m_account = "";
            _this.m_role_num = 0;
            _this.m_role_id = 0;
            return _this;
        }
        account_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return account_data;
    }(utils.game_data));
    data.account_data = account_data;
})(data || (data = {}));
//# sourceMappingURL=account_data.js.map