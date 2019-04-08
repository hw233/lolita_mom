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
// Author: 雨晨
// Date: 2018/3/
// Desc: 世界聊天框
var widget;
(function (widget) {
    var chat_ui = /** @class */ (function (_super) {
        __extends(chat_ui, _super);
        function chat_ui() {
            var _this = _super.call(this, "res/atlas/chat.atlas", ui.game.chat_uiUI) || this;
            _this.showAll = false;
            _this.showFace = false;
            _this.curChannel = 3;
            _this.chatLine_pos = 0;
            _this.input_record = new Array();
            _this.record_index = 0;
            _this.isShowAllChat = true;
            _this.b_visible = true;
            _this.isFirstChanged = true;
            _this.bottom_pos_y = 0;
            _this.keyboard_y = 0;
            _this.append_extrares("res/atlas/emotion.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            return _this;
        }
        chat_ui.prototype.on_init = function () {
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.scale(0.5, 0.5, true);
            //this.m_ui.width = d_w;
            this.m_ui.x = 0;
            this.m_ui.y = d_h;
            fontmgr.set_ui_font(this.m_ui);
        };
        chat_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.b_visible = true;
                this.record_index = 0;
                this.input_record = [];
                this.htmlele_arr = [];
                this.UIins = this.m_ui;
                this.shrinkChatBox();
                // if (helper.is_sys_open('聊天', false)) {
                //     this.UIins.inputInfo.text = "";
                // } else {
                //     this.UIins.inputInfo.text = game.AIXIYOUAISHENGHUO;
                // }
                this.UIins.chatPanel.vScrollBar.visible = false;
                this.UIins.showBtn.on(Laya.Event.CLICK, this, this.on_change_msg_area);
                this.UIins.faceBtn.on(Laya.Event.CLICK, this, this.openFaceList);
                this.UIins.ch0.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch1.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch2.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch3.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.sendBtn.on(Laya.Event.CLICK, this, this.sendText);
                this.UIins.bagBtn.on(Laya.Event.CLICK, this, this.open_bag);
                this.UIins.on(Laya.Event.KEY_DOWN, this, this.onKeyEvent);
                this.UIins.inputInfo.on(Laya.Event.FOCUS, this, this.on_focus);
                this.register_event(game_event.EVENT_CHAT, this.new_chat);
                this.register_event(game_event.EVENT_SELECT_EMOTION, this.addEmotion);
                this.register_event(game_event.EVENT_CHANGE_INPUT_LIMIT, this.on_input_limit);
                this.register_event(game_event.EVENT_ENTERSCENE, this.onSceneChange);
                this.register_event(game_event.EVENT_TAB_SHOW, this.on_tab_show);
                this.register_event(game_event.EVENT_CHAT_CLEAR, this.clearAll);
                this.register_event(game_event.EVENT_CHAT_INPUT_MSG, this.on_input_msg);
                this.register_event(game_event.EVENT_CHAT_INPUT_SEND, this.on_input_send);
                this.update_ui();
                this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
            }
            else {
                this.UIins.showBtn.off(Laya.Event.CLICK, this, this.on_change_msg_area);
                this.UIins.faceBtn.off(Laya.Event.CLICK, this, this.openFaceList);
                this.UIins.ch0.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch1.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch2.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch3.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.sendBtn.off(Laya.Event.CLICK, this, this.sendText);
                this.UIins.bagBtn.off(Laya.Event.CLICK, this, this.open_bag);
                this.UIins.off(Laya.Event.KEY_DOWN, this, this.onKeyEvent);
                this.UIins.inputInfo.off(Laya.Event.FOCUS, this, this.on_focus);
                this.unregister_allevent();
                this.UIins.chatPanel.removeChildren();
                this.UIins = null;
                this.chatLine_pos = 0;
                this.input_record = [];
                this.record_index = 0;
                this.htmlele_arr = [];
                Laya.Pool.clearBySign('chatLine');
            }
        };
        chat_ui.prototype.update_ui = function () {
            var c_data = data.get_data(data_enum.DATA_CHAT);
            var chat_arr = c_data.get_all_chat();
            this.new_chat(chat_arr);
            this.UIins.input_bg.visible = false;
            this.UIins.input_gray_bg.visible = false;
        };
        chat_ui.prototype.new_chat = function (chat_arr) {
            var _this = this;
            chat_arr.forEach(function (element) {
                var ch = element['ch'];
                var pid = element['pid'];
                var shape = element['shape'];
                var vip = element['vip'];
                var name = element['name'];
                var msg = element['msg'];
                var svrid = element['svrid'];
                // let chatline = new ChatLine();
                var chatline = Laya.Pool.getItemByClass('chatLine', ChatLine);
                chatline.init(ch, pid, shape, vip, name, msg, svrid);
                _this.htmlele_arr.push(chatline);
                chatline.y = _this.chatLine_pos;
                if (_this.curChannel == element['ch'] || _this.isShowAllChat == true) {
                    _this.chatLine_pos += chatline.height;
                    _this.UIins.chatPanel.addChild(chatline);
                    _this.UIins.chatPanel.vScrollBar.max = _this.UIins.chatPanel.contentHeight;
                    Laya.Tween.to(_this.UIins.chatPanel.vScrollBar, { value: _this.UIins.chatPanel.vScrollBar.max }, 300);
                }
                if (_this.htmlele_arr.length >= 80) {
                    _this.htmlele_arr.splice(0, 50);
                    _this.resetPanelInfo();
                }
            });
            var c_data = data.get_data(data_enum.DATA_CHAT);
            c_data.clear_new_chat();
        };
        chat_ui.prototype.disable_ch_color = function (prev_ch) {
            if (prev_ch == 2) { //帮派
                this.UIins.ch2_bg.skin = "chat/Tag2.png";
                this.UIins.ch2_title.skin = "chat/bangpai2.png";
            }
            else if (prev_ch == 3) {
                if (this.isShowAllChat) { //综合
                    this.UIins.ch0_bg.skin = "chat/Tag2.png";
                    this.UIins.ch0_title.skin = "chat/zonghe2.png";
                }
                else { //世界
                    this.UIins.ch1_bg.skin = "chat/Tag2.png";
                    this.UIins.ch1_title.skin = "chat/shijie2.png";
                }
            }
            else if (prev_ch == 4) { //跨服
                this.UIins.ch3_bg.skin = "chat/Tag2.png";
                this.UIins.ch3_title.skin = "chat/kuafu2.png";
            }
        };
        chat_ui.prototype.able_ch_color = function () {
            if (this.curChannel == 2) {
                this.UIins.ch2_bg.skin = "chat/Tag1.png";
                this.UIins.ch2_title.skin = "chat/bangpai1.png";
            }
            else if (this.curChannel == 3) {
                if (this.isShowAllChat) {
                    this.UIins.ch0_bg.skin = "chat/Tag1.png";
                    this.UIins.ch0_title.skin = "chat/zonghe1.png";
                }
                else {
                    this.UIins.ch1_bg.skin = "chat/Tag1.png";
                    this.UIins.ch1_title.skin = "chat/shijie1.png";
                }
            }
            else if (this.curChannel == 4) {
                this.UIins.ch3_bg.skin = "chat/Tag1.png";
                this.UIins.ch3_title.skin = "chat/kuafu1.png";
            }
        };
        chat_ui.prototype.selectChannel = function (e) {
            helper.play_sound("sound/mousedown_btn.wav");
            var target = e.target;
            switch (target.name) {
                case "ch0":
                    if (this.isShowAllChat) {
                        return;
                    }
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = true; //综合
                    this.curChannel = 3;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                case "ch1":
                    if (this.isShowAllChat) {
                        this.disable_ch_color(this.curChannel);
                        this.isShowAllChat = false;
                        this.curChannel = 3;
                        this.able_ch_color();
                        this.resetPanelInfo();
                    }
                    else {
                        if (this.curChannel == 3)
                            return;
                        this.disable_ch_color(this.curChannel);
                        this.curChannel = 3; //世界
                        this.able_ch_color();
                        this.resetPanelInfo();
                    }
                    break;
                case "ch2":
                    if (this.curChannel == 2)
                        return; //帮派
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = false;
                    this.curChannel = 2;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                case "ch3":
                    if (this.curChannel == 4)
                        return; //跨服
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = false;
                    this.curChannel = 4;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                default:
                    break;
            }
        };
        chat_ui.prototype.clearAll = function () {
            if (this.UIins != null) {
                this.UIins.chatPanel.removeChildren();
                this.chatLine_pos = 0;
            }
        };
        chat_ui.prototype.resetPanelInfo = function () {
            var _this = this;
            var arr = this.UIins.chatPanel._childs[0]._childs;
            this.UIins.chatPanel.removeChildren();
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var ele = arr_1[_i];
                Laya.Pool.recover('chatLine', ele);
            }
            this.chatLine_pos = 0;
            var cur_ch_chat_arr = this.get_cur_ch_chat();
            cur_ch_chat_arr.forEach(function (element) {
                element.y = _this.chatLine_pos;
                _this.chatLine_pos += element.height;
                _this.UIins.chatPanel.addChild(element);
            });
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
        };
        chat_ui.prototype.get_cur_ch_chat = function () {
            var _this = this;
            var cur_ch_chat_arr = [];
            this.htmlele_arr.forEach(function (element) {
                if (_this.isShowAllChat) {
                    cur_ch_chat_arr.push(element);
                }
                else {
                    if (_this.curChannel == element.channel) {
                        cur_ch_chat_arr.push(element);
                    }
                }
            });
            return cur_ch_chat_arr;
        };
        // private get_cur_ch_chat(): Array<Object> {
        //     let cur_ch_chat_arr: Array<Object> = [];
        //     let c_data: data.channel_data = data.get_data(data_enum.DATA_CHAT) as data.channel_data;
        //     let all_chat: Array<Object> = c_data.get_all_chat();
        //     all_chat.forEach(element => {
        //         if (this.isShowAllChat) {
        //             cur_ch_chat_arr.push(element);
        //         }
        //         else {
        //             if (this.curChannel == element['ch']) {
        //                 cur_ch_chat_arr.push(element);
        //             }
        //         }
        //     });
        //     return cur_ch_chat_arr;
        // }
        chat_ui.prototype.sendText = function () {
            var msg = this.UIins.inputInfo.text;
            if (!msg)
                return;
            this.input_record.push(msg);
            if (this.input_record.length > 50) {
                this.input_record.shift();
            }
            this.record_index = this.input_record.length;
            if (msg[0] == "$") {
                net.net_ins().send(protocol_def.C2S_CHAT_GM, { "msg": msg });
                this.UIins.inputInfo.text = "";
            }
            else if (msg.length >= 5 && !!msg.match(/^&test/)) {
                var data_arr = void 0;
                data_arr = msg.split(" ");
                data_arr.shift();
                helper.do_test(data_arr);
                this.UIins.inputInfo.text = "";
            }
            else {
                if (helper.is_sys_open('聊天', true)) {
                    var channel = this.curChannel;
                    if (channel == base.CHANNEL_GANG) {
                        if (helper.is_join_gang() == false) {
                            helper.show_text_tips(game.L_GANGNO);
                        }
                        else {
                            net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": helper.trans_info(msg) });
                        }
                    }
                    net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": helper.trans_info(msg) });
                    this.UIins.inputInfo.text = "";
                }
                else {
                    this.UIins.inputInfo.text = "";
                }
            }
            if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_CHAT_FACE)) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_FACE, false);
                this.showFace = false;
            }
            helper.play_sound("sound/mousedown_btn.wav");
            helper.chat_input_dict.set(helper.main_chat, "");
        };
        chat_ui.prototype.open_bag = function (us) {
            if (us === void 0) { us = null; }
            //if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_BAG_UI) == false)
            //    utils.widget_ins().show_widget(widget_enum.WIDGET_BAG_UI, true);
            //else
            //    utils.widget_ins().show_widget(widget_enum.WIDGET_BAG_UI, false);
            helper.play_sound("sound/mousedown_btn.wav");
        };
        chat_ui.prototype.addEmotion = function (e_str) {
            this.UIins.inputInfo.text += e_str;
            helper.chat_input_dict.set(helper.main_chat, this.UIins.inputInfo.text);
        };
        chat_ui.prototype.onSceneChange = function (ud) {
            if (ud === void 0) { ud = null; }
            if (helper.is_wlmz_scene()) { //显示综合频道，无法切换至其它频道
                this.UIins.ch0.mouseEnabled = false;
                this.UIins.ch1.mouseEnabled = false;
                this.UIins.ch2.mouseEnabled = false;
                this.UIins.ch3.mouseEnabled = false;
                if (!this.isShowAllChat) {
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = true; //综合
                    this.curChannel = 3;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    if (this.UIins.height == 585) {
                        this.UIins.ch1.y = 242;
                        this.UIins.ch1.visible = true;
                        this.UIins.ch2.visible = false;
                        this.UIins.ch3.visible = false;
                    }
                }
            }
            else if (helper.is_guaji_scene()) {
                this.UIins.ch0.mouseEnabled = true;
                this.UIins.ch1.mouseEnabled = true;
                this.UIins.ch2.mouseEnabled = true;
                this.UIins.ch3.mouseEnabled = true;
            }
        };
        chat_ui.prototype.openFaceList = function () {
            this.showFace = !this.showFace;
            utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_FACE, this.showFace);
            helper.play_sound("sound/mousedown_btn.wav");
        };
        chat_ui.prototype.on_change_msg_area = function () {
            this.showAll = !this.showAll;
            if (this.showAll) {
                this.blowUpChatBox();
            }
            else {
                this.shrinkChatBox();
            }
            helper.play_sound("sound/mousedown_btn.wav");
        };
        chat_ui.prototype.on_tab_show = function (ud) {
            if (ud === void 0) { ud = null; }
            var b_visible = !ud["flag"];
            if (this.b_visible != b_visible) {
                this.m_ui.visible = b_visible;
                this.b_visible = b_visible;
            }
        };
        chat_ui.prototype.blowUpChatBox = function () {
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
            this.UIins.height = 956;
            this.UIins.showBtn.y = -10;
            this.UIins.showBtn.skin = "chat/arrowBtn1.png";
            this.UIins.chatPanel.y = 84;
            this.UIins.chatPanel.height = 714;
            this.UIins.ch0.y = 45;
            this.UIins.ch1.y = 234;
            this.UIins.ch2.y = 424;
            this.UIins.ch3.y = 615;
            this.UIins.bagBtn.y = this.UIins.red_bag.y = this.UIins.bottom_box.y = this.UIins.input_box.y = this.m_ui.height - this.UIins.bottom_box.height;
            this.bottom_pos_y = this.UIins.bottom_box.y;
            this.UIins.chatBg.y = this.UIins.bottom_box.y - 2;
            this.UIins.chatBg.height = 793;
            this.keyboard_y = 970 + helper.TOPBAR_HEIGHT;
            this.UIins.ch0.visible = true;
            this.UIins.ch1.visible = true;
            this.UIins.ch2.visible = true;
            this.UIins.ch3.visible = true;
            this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
        };
        chat_ui.prototype.shrinkChatBox = function () {
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
            this.UIins.height = 585;
            this.UIins.showBtn.y = -10;
            this.UIins.showBtn.skin = "chat/arrowBtn0.png";
            this.UIins.chatPanel.y = 84;
            this.UIins.chatPanel.height = 328;
            this.UIins.bagBtn.y = this.UIins.red_bag.y = this.UIins.bottom_box.y = this.UIins.input_box.y = this.m_ui.height - this.UIins.bottom_box.height;
            this.bottom_pos_y = this.UIins.bottom_box.y;
            this.UIins.chatBg.y = this.UIins.bottom_box.y - 2;
            this.UIins.chatBg.height = 412;
            this.keyboard_y = 589 + helper.TOPBAR_HEIGHT;
            this.UIins.ch0.y = 51;
            // this.UIins.ch1.y = 242;
            // this.UIins.ch2.y = -328;
            // this.UIins.ch3.y = -193;
            if (this.curChannel == 3 && this.isShowAllChat) { //综合
                this.UIins.ch1.y = 242;
                this.UIins.ch2.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 3 && !this.isShowAllChat) { //世界
                this.UIins.ch1.y = 242;
                this.UIins.ch2.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 2) { //帮派
                this.UIins.ch2.y = 242;
                this.UIins.ch1.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 4) { //跨服
                this.UIins.ch3.y = 242;
                this.UIins.ch1.visible = false;
                this.UIins.ch2.visible = false;
            }
            this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
        };
        chat_ui.prototype.onKeyEvent = function (e) {
            if (e["keyCode"] == Laya.Keyboard.ENTER) {
                this.sendText();
            }
            else if (e["keyCode"] == Laya.Keyboard.UP) {
                if (this.record_index > 0) {
                    this.record_index--;
                }
                if (this.input_record[this.record_index]) {
                    this.UIins.inputInfo.text = this.input_record[this.record_index];
                }
            }
            else if (e["keyCode"] == Laya.Keyboard.DOWN) {
                if (this.record_index < this.input_record.length - 1) {
                    this.record_index++;
                }
                if (this.input_record[this.record_index]) {
                    this.UIins.inputInfo.text = this.input_record[this.record_index];
                }
            }
        };
        chat_ui.prototype.on_focus = function () {
            helper.set_focus_str(helper.main_chat);
        };
        chat_ui.prototype.on_input_limit = function (ud) {
            if (ud === void 0) { ud = null; }
            this.UIins.inputInfo.maxChars = 500;
            helper.show_text_tips(game.L_CHAR_LIMIT_CHANGED);
            this.UIins.inputInfo.focus = false;
        };
        chat_ui.prototype.on_input_msg = function (ud) {
            var focus_str = helper.get_focus_str();
            if (focus_str == helper.main_chat) {
                this.UIins.inputInfo.text = ud["msg"];
                helper.clear_focus_str();
            }
        };
        chat_ui.prototype.on_input_send = function (ud) {
            var focus_str = helper.get_focus_str();
            if (focus_str == helper.main_chat) {
                this.UIins.inputInfo.text = ud["msg"];
                this.sendText();
                helper.clear_focus_str();
            }
        };
        chat_ui.prototype.on_dispose = function () {
        };
        chat_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_ui;
    }(utils.game_widget));
    widget.chat_ui = chat_ui;
})(widget || (widget = {}));
var ChatLine = /** @class */ (function (_super) {
    __extends(ChatLine, _super);
    function ChatLine() {
        var _this = _super.call(this) || this;
        _this.textField = new Laya.HTMLDivElement();
        _this.addChild(_this.textField);
        //监听用户名点击事件
        _this.textField.on(Laya.Event.LINK, _this, _this.on_click_link);
        return _this;
    }
    ChatLine.prototype.get_channel_prefix = function (channel) {
        switch (channel) {
            case base.CHANNEL_WORLD:
                return '【' + game.L_SHIJIE + '】';
            case base.CHANNEL_GANG:
                return '【' + game.L_BANGPAI + '】';
            case base.CHANNEL_ACROSSSVR:
                return '【' + game.L_KUAFU + '】';
            case base.CHANNEL_INFO:
                return '【' + game.L_XITONG + '】';
            case base.CHANNEL_SYS:
                return '【' + game.L_XITONG + '】';
            case base.CHANNEL_RECRUIT:
                return '【' + game.L_XITONG + '】';
            default:
                break;
        }
        return 'unknown';
    };
    ChatLine.prototype.get_channel_color = function (channel) {
        switch (channel) {
            case base.CHANNEL_WORLD:
                return base.FORMAT_COLOR["#C14&"];
            case base.CHANNEL_GANG:
                return base.FORMAT_COLOR["#C18&"];
            case base.CHANNEL_ACROSSSVR:
                return base.FORMAT_COLOR["#C12&"];
            case base.CHANNEL_SYS:
                return base.FORMAT_COLOR["#C15&"];
            case base.CHANNEL_RECRUIT:
                return base.FORMAT_COLOR["#C15&"];
            default:
                break;
        }
        return base.FORMAT_COLOR["#C5&"];
    };
    ChatLine.prototype.get_name_color = function (sex) {
        switch (sex) {
            case 1:
                return base.FORMAT_COLOR["#C12&"];
            case 2:
                return base.FORMAT_COLOR["#C13&"];
            default:
                break;
        }
        return base.FORMAT_COLOR["#C12&"];
    };
    ChatLine.prototype.init = function (channel, userID, shape, vipLevel, userName, msg_str, svrId) {
        this.channel = channel;
        var fontsize = "44";
        this.pos(0, 0);
        // let textField: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        this.textField.width = 1276;
        this.textField.style.color = this.get_channel_color(channel);
        this.textField.style.valign = "middle";
        this.textField.style.leading = 10;
        this.textField.style.letterSpacing = 2;
        this.textField.style.font = "44px h5font";
        var chInfo = this.get_channel_prefix(channel);
        var chat_data = data.get_data(data_enum.DATA_CHAT);
        if (channel == base.CHANNEL_ACROSSSVR) {
            var str = chat_data.get_svr_name(svrId);
            if (str)
                chInfo = '【' + str + '】';
        }
        var ch_color = this.get_channel_color(channel);
        var channelHTML = helper.createSpanTag(ch_color, fontsize) + chInfo + '</span>';
        var userData = userName + "," + base.HYPERLINK_TYPE.TYPE_OPEN_PLAYER_INFO + "," + userID + "," + shape;
        var nameHTML = "";
        if (userName) {
            var sex = helper.get_sex(shape);
            var name_color = this.get_name_color(sex);
            nameHTML = helper.createLinkTag(name_color, fontsize, userData, userName) + ':</span>';
        }
        var vipHTML = "";
        // if (this.channel != 6) {
        //     vipHTML = helper.createImgTag(helper.get_VIP_numSkin(vipLevel)) + ": ";
        // }
        var msgHTML = helper.analysisMsgStr(msg_str, ch_color, fontsize);
        var totalInfoHTML = channelHTML + nameHTML + vipHTML + msgHTML;
        try {
            this.textField.innerHTML = totalInfoHTML;
        }
        catch (error) {
            core.game_tiplog("异常，含有特殊字符");
            return;
        }
        // this.addChild(this.textField);
        this.height = this.textField.contextHeight + 10;
    };
    ChatLine.prototype.on_click_link = function (data) {
        var index = 0;
        var data_arr = new Array();
        var tempArr = data.split(",");
        for (var _i = 0, tempArr_1 = tempArr; _i < tempArr_1.length; _i++) {
            var str = tempArr_1[_i];
            if (index == 0)
                data_arr.push(str);
            else
                data_arr.push(parseInt(str));
            index += 1;
        }
        //let channel = utils.module_ins().get_module(module_enum.MODULE_CHANNEL) as game.channel;
        //channel.chat_hyperlink({ "text": data_arr[0], "hyperlink_type": data_arr[1], "u1": data_arr[2], "u2": data_arr[3], "u3": data_arr[4] })
        // helper.hyperlink_handle(data_arr[0], data_arr[1], data_arr[2], data_arr[3], data_arr[4]);
    };
    return ChatLine;
}(Laya.Box));
//# sourceMappingURL=chat_ui.js.map