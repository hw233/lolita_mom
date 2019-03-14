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
(function (data_1) {
    var transfer_data = /** @class */ (function (_super) {
        __extends(transfer_data, _super);
        function transfer_data() {
            var _this = _super.call(this) || this;
            _this.data_dict = new Laya.Dictionary();
            return _this;
        }
        transfer_data.prototype.add_transfer_data = function (key_str, data) {
            this.data_dict.set(key_str, data);
        };
        transfer_data.prototype.get_transfer_data = function (key_str) {
            return this.data_dict.get(key_str);
        };
        transfer_data.prototype.remove_transfer_data = function (key_str) {
            this.data_dict.remove(key_str);
        };
        transfer_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return transfer_data;
    }(utils.game_data));
    data_1.transfer_data = transfer_data;
})(data || (data = {}));
//# sourceMappingURL=transfer_data.js.map