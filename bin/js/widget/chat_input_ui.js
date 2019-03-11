// Author: 阿栋
// Date: 2018/01/03
// Desc: 聊天输入框
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
var widget;
(function (widget) {
    var chat_input_ui = /** @class */ (function (_super) {
        __extends(chat_input_ui, _super);
        function chat_input_ui() {
            var _this = _super.call(this, "res/atlas/chat.atlas", ui.game.chat_input_uiUI) || this;
            _this.bottom_distance = 0;
            _this.is_send = false; //控制键盘点击回车发送、弹出框发送按钮发送
            _this.focus_ui = ""; //发起界面的标记量
            _this.m_layer = utils.WIDGET_LAYER.TOP;
            return _this;
        }
        chat_input_ui.prototype.on_init = function () {
            this.m_ui.width = helper.get_design_w();
            this.m_ui.bottom = 200;
        };
        chat_input_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_KEYBOARD_HIDDEN, this.on_hidden);
                this.register_event(game_event.EVENT_KEYBOARD_HEIGHT_CHANGE, this.on_height_change);
                this.UIins.img_send.on(Laya.Event.CLICK, this, this.on_send);
                this.UIins.on(Laya.Event.KEY_DOWN, this, this.on_key_event);
                if (this.m_ud) {
                    this.bottom_distance = Number(this.m_ud["height"]);
                }
                Laya.timer.once(300, this, this.on_timer);
                this.init_input_text();
            }
            else {
                this.unregister_allevent();
                this.UIins.img_send.off(Laya.Event.CLICK, this, this.on_send);
                this.UIins.off(Laya.Event.KEY_DOWN, this, this.on_key_event);
                Laya.timer.clearAll(this);
                this.UIins.input_msg.text = "";
                this.is_send = false;
                this.UIins = null;
            }
        };
        chat_input_ui.prototype.on_timer = function () {
            this.UIins.bottom = -helper.get_design_h() + helper.get_design_h() / Laya.Browser.height * this.bottom_distance;
            this.UIins.input_msg.focus = true;
        };
        chat_input_ui.prototype.init_input_text = function () {
            //let uiswitch_mgr = utils.module_ins().get_module(module_enum.MODULE_UISWITCH) as game.UIswitch_mgr;
            this.focus_ui = helper.get_focus_str();
            var msg = helper.chat_input_dict.get(this.focus_ui);
            if (msg && msg != "") {
                this.UIins.input_msg.text = msg;
            }
        };
        chat_input_ui.prototype.on_key_event = function (evt) {
            if (evt.keyCode == Laya.Keyboard.ENTER) {
                this.on_send();
            }
        };
        chat_input_ui.prototype.on_send = function () {
            this.is_send = true;
        };
        chat_input_ui.prototype.on_hidden = function () {
            var msg = this.UIins.input_msg.text;
            if (this.is_send) {
                this.fire_event_next_frame(game_event.EVENT_CHAT_INPUT_SEND, { "msg": msg });
                helper.chat_input_dict.set(this.focus_ui, "");
            }
            else {
                this.fire_event_next_frame(game_event.EVENT_CHAT_INPUT_MSG, { "msg": msg });
                helper.chat_input_dict.set(this.focus_ui, msg);
            }
            this.show(false);
        };
        chat_input_ui.prototype.on_height_change = function (ud) {
            if (ud && ud["height"] !== undefined) {
                this.bottom_distance = Number(ud["height"]);
            }
        };
        chat_input_ui.prototype.on_dispose = function () { };
        chat_input_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_input_ui;
    }(utils.game_widget));
    widget.chat_input_ui = chat_input_ui;
})(widget || (widget = {}));
//# sourceMappingURL=chat_input_ui.js.map