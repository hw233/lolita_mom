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
    var chat_msg = /** @class */ (function (_super) {
        __extends(chat_msg, _super);
        function chat_msg() {
            var _this = _super.call(this) || this;
            _this.m_btn_y = 800;
            return _this;
        }
        chat_msg.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_net_event(protocol_def.S2C_CHAT, this.on_net_chat);
            this.register_net_event(protocol_def.S2C_CHAT_SYSTEM, this.on_sys_msg);
            this.register_event(game_event.EVENT_CHATWND_SIZE, this.on_chatwnd_size);
            this.register_event(game_event.EVENT_CHATWND_SYSMSG, this.on_sys_msg);
            this.register_event(game_event.EVENT_CHAT_HYPERLINK, this.onPlayerInfo);
            utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_BOX, true);
        };
        chat_msg.prototype.on_chatwnd_size = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_btn_y = ud;
        };
        chat_msg.prototype.on_net_chat = function (user_data) {
            var ch = user_data["ch"];
            var svrid = user_data['srvid'];
            var pid = user_data["pid"];
            var shape = user_data["shape"];
            var vip = user_data["vip"];
            var name = user_data["name"];
            var msg = user_data["msg"];
            this.chat(ch, pid, shape, vip, name, msg, svrid);
        };
        chat_msg.prototype.chat = function (ch, pid, shape, vip, name, msg, svrid) {
            var c_data = data.get_data(data_enum.DATA_CHAT);
            c_data.set_chat_msg(ch, pid, shape, vip, name, msg, svrid);
            this.fire_event(game_event.EVENT_CHAT, c_data.get_new_chat());
        };
        chat_msg.prototype.on_sys_msg = function (user_data) {
            var ch = user_data['ch'];
            var msg = user_data['msg'];
            this.chat(ch, 0, 0, 0, "", msg, 0);
        };
        chat_msg.prototype.send_msg = function (content, channel) {
            if (channel === void 0) { channel = base.CHANNEL_WORLD; }
            net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": content });
        };
        chat_msg.prototype.onPlayerInfo = function (ud) {
            if (ud === void 0) { ud = null; }
            if (ud != null) {
                if (ud["hyperlink_type"] == base.HYPERLINK_TYPE.TYPE_OPEN_PLAYER_INFO) {
                    var pid = ud["u1"];
                    var pdata = utils.data_ins().get_data(data_enum.DATA_PLAYER);
                    if (pdata.m_pid == pid) {
                        utils.widget_ins().show_widget(widget_enum.WIDGET_MAINPLAYER_INFO, true);
                    }
                    else {
                        net.net_ins().send(protocol_def.C2S_ROLE_INFO, { "id": pid });
                    }
                }
            }
        };
        chat_msg.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_msg;
    }(utils.game_module));
    game.chat_msg = chat_msg;
})(game || (game = {}));
//# sourceMappingURL=chat_msg.js.map