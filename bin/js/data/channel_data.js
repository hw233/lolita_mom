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
    var channel_data = /** @class */ (function (_super) {
        __extends(channel_data, _super);
        function channel_data() {
            var _this = _super.call(this) || this;
            _this.new_chat = [];
            _this.all_chat_arr = [];
            return _this;
        }
        channel_data.prototype.set_chat_msg = function (ch, pid, shape, vip, name, msg, svrid) {
            this.new_chat.push({ ch: ch, pid: pid, shape: shape, vip: vip, name: name, msg: msg, svrid: svrid });
            this.all_chat_arr.push({ ch: ch, pid: pid, shape: shape, vip: vip, name: name, msg: msg, svrid: svrid });
            if (this.all_chat_arr.length >= 80) {
                this.all_chat_arr.splice(0, 50);
            }
        };
        channel_data.prototype.get_new_chat = function () {
            return this.new_chat;
        };
        channel_data.prototype.get_all_chat = function () {
            return this.all_chat_arr;
        };
        channel_data.prototype.clear_new_chat = function () {
            this.new_chat = [];
        };
        channel_data.prototype.get_svr_name = function (svr_id) {
            var sdata = data.get_data(data_enum.DATA_SVRLIST);
            var svr_ins = sdata.get_svr_data(svr_id);
            if (svr_ins != null) {
                return svr_ins.m_name;
            }
            return "";
        };
        channel_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return channel_data;
    }(utils.game_data));
    data.channel_data = channel_data;
})(data || (data = {}));
//# sourceMappingURL=channel_data.js.map