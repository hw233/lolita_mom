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
var game;
(function (game) {
    var sys_msg = /** @class */ (function (_super) {
        __extends(sys_msg, _super);
        function sys_msg() {
            return _super.call(this) || this;
        }
        sys_msg.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_net_event(protocol_def.S2C_CLIENT_COMMAND, this.on_netcmd_client_cmd);
        };
        sys_msg.prototype.show_msgbox = function (p_content) {
            var mb_data = data.get_data(data_enum.DATA_MSGBOX);
            mb_data.set_msgbox_data(1, p_content, null, null, "");
            if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_MSGBOX) == false) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_MSGBOX, true);
            }
        };
        // 提示弹窗
        sys_msg.prototype.show_msg_box = function (p_caller, p_content, p_user_data, NoTips_keys) {
            if (p_user_data === void 0) { p_user_data = null; }
            if (NoTips_keys === void 0) { NoTips_keys = ""; }
            var mb_data = data.get_data(data_enum.DATA_MSGBOX);
            mb_data.set_msgbox_data(2, p_content, p_caller, p_user_data, NoTips_keys);
            var NT_flag = mb_data.get_NoTips_flag(NoTips_keys);
            if (NT_flag == true) {
                this.fire_choosed(p_caller, true, p_user_data);
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_MSGBOX) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_MSGBOX, true);
                }
            }
        };
        sys_msg.prototype.fire_choosed = function (p_caller, b_choosed, p_user_data) {
            if (p_user_data === void 0) { p_user_data = null; }
            this.fire_event_next_frame(game_event.EVENT_MSGBOX_CHOOSED, [p_caller, b_choosed, p_user_data]);
        };
        // 服务器执行客户端指令
        sys_msg.prototype.on_netcmd_client_cmd = function (ud) {
            if (ud === void 0) { ud = null; }
            var cmd = ud["msg"];
            var data_arr = cmd.split(" ");
            helper.do_test(data_arr);
        };
        sys_msg.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return sys_msg;
    }(utils.game_module));
    game.sys_msg = sys_msg;
})(game || (game = {}));
//# sourceMappingURL=sys_msg.js.map