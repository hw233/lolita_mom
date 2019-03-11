// Author: 雨晨
// Date: 2018/3/
// Desc: 世界聊天框
module widget {
    export class chat_ui extends utils.game_widget {
        private UIins: ui.game.chat_uiUI;
        private showAll: boolean = false;
        private showFace: boolean = false;
        public curChannel: number = 3;
        public chatLine_pos: number = 0;
        private input_record: Array<string> = new Array<string>();
        private record_index: number = 0;
        private isShowAllChat: boolean = true;
        private htmlele_arr: Array<ChatLine>;
        private b_visible: boolean = true;
        private isFirstChanged: boolean = true;
        private bottom_pos_y: number = 0;
        private keyboard_y: number = 0;
        constructor() {
            super("res/atlas/chat.atlas", ui.game.chat_uiUI);
            this.append_extrares("res/atlas/emotion.atlas", Laya.Loader.ATLAS);
            this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
        }

        public on_init(): void {
            let designwh: Object = helper.get_design_wh();
            let d_w: number = designwh['w'];
            let d_h: number = designwh['h'];
            
            this.m_ui.scale(0.5,0.5,true);

            //this.m_ui.width = d_w;
            this.m_ui.x = 0;
            this.m_ui.y = d_h;
            fontmgr.set_ui_font(this.m_ui);
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.b_visible = true;
                this.record_index = 0;
                this.input_record = [];
                this.htmlele_arr = [];
                this.UIins = this.m_ui as ui.game.chat_uiUI;
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
        }
        
        private update_ui(): void {
            let c_data: data.channel_data = data.get_data(data_enum.DATA_CHAT) as data.channel_data;
            let chat_arr = c_data.get_all_chat();
            this.new_chat(chat_arr);
            this.UIins.input_bg.visible = false;
            this.UIins.input_gray_bg.visible = false;
        }
        private new_chat(chat_arr?: Array<Object>): void {
            chat_arr.forEach(element => {
                let ch = element['ch'];
                let pid = element['pid'];
                let shape = element['shape'];
                let vip = element['vip'];
                let name = element['name'];
                let msg = element['msg'];
                let svrid: number = element['svrid'];
                // let chatline = new ChatLine();
                let chatline: ChatLine = Laya.Pool.getItemByClass('chatLine', ChatLine);
                chatline.init(ch, pid, shape, vip, name, msg, svrid);
                this.htmlele_arr.push(chatline);
                chatline.y = this.chatLine_pos;
                if (this.curChannel == element['ch'] || this.isShowAllChat == true) {
                    this.chatLine_pos += chatline.height;
                    this.UIins.chatPanel.addChild(chatline);
                    this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
                    Laya.Tween.to(this.UIins.chatPanel.vScrollBar, { value: this.UIins.chatPanel.vScrollBar.max }, 300);
                }
                if (this.htmlele_arr.length >= 80) {
                    this.htmlele_arr.splice(0, 50);
                    this.resetPanelInfo();
                }
            });
            let c_data: data.channel_data = data.get_data(data_enum.DATA_CHAT) as data.channel_data;
            c_data.clear_new_chat();
        }
        private disable_ch_color(prev_ch: number): void {
            if (prev_ch == 2) {//帮派
                this.UIins.ch2_bg.skin = "chat/Tag2.png";
                this.UIins.ch2_title.skin = "chat/bangpai2.png";
            } else if (prev_ch == 3) {
                if (this.isShowAllChat) {//综合
                    this.UIins.ch0_bg.skin = "chat/Tag2.png";
                    this.UIins.ch0_title.skin = "chat/zonghe2.png";
                } else {//世界
                    this.UIins.ch1_bg.skin = "chat/Tag2.png";
                    this.UIins.ch1_title.skin = "chat/shijie2.png";
                }
            } else if (prev_ch == 4) {//跨服
                this.UIins.ch3_bg.skin = "chat/Tag2.png";
                this.UIins.ch3_title.skin = "chat/kuafu2.png";
            }
        }
        private able_ch_color(): void {
            if (this.curChannel == 2) {
                this.UIins.ch2_bg.skin = "chat/Tag1.png";
                this.UIins.ch2_title.skin = "chat/bangpai1.png";
            } else if (this.curChannel == 3) {
                if (this.isShowAllChat) {
                    this.UIins.ch0_bg.skin = "chat/Tag1.png";
                    this.UIins.ch0_title.skin = "chat/zonghe1.png";
                } else {
                    this.UIins.ch1_bg.skin = "chat/Tag1.png";
                    this.UIins.ch1_title.skin = "chat/shijie1.png";
                }
            } else if (this.curChannel == 4) {
                this.UIins.ch3_bg.skin = "chat/Tag1.png";
                this.UIins.ch3_title.skin = "chat/kuafu1.png";
            }
        }
        private selectChannel(e: Laya.Event): void {
            helper.play_sound("sound/mousedown_btn.wav");
            let target = e.target;
            switch (target.name) {
                case "ch0":
                    if (this.isShowAllChat) {
                        return;
                    }
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = true;//综合
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
                        if (this.curChannel == 3) return;
                        this.disable_ch_color(this.curChannel);
                        this.curChannel = 3;//世界
                        this.able_ch_color();
                        this.resetPanelInfo();
                    }
                    break;
                case "ch2":
                    if (this.curChannel == 2) return;//帮派
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = false;
                    this.curChannel = 2;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                case "ch3":
                    if (this.curChannel == 4) return;//跨服
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = false;
                    this.curChannel = 4;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                default:
                    break;
            }
        }
        private clearAll(): void {
            if (this.UIins != null) {
                this.UIins.chatPanel.removeChildren();
                this.chatLine_pos = 0;
            }
        }
        private resetPanelInfo(): void {
            let arr = this.UIins.chatPanel._childs[0]._childs;
            this.UIins.chatPanel.removeChildren();
            for (let ele of arr) {
                Laya.Pool.recover('chatLine', ele);
            }
            this.chatLine_pos = 0;
            let cur_ch_chat_arr = this.get_cur_ch_chat();
            cur_ch_chat_arr.forEach(element => {
                element.y = this.chatLine_pos;
                this.chatLine_pos += element.height;
                this.UIins.chatPanel.addChild(element);
            });
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
        }
        private get_cur_ch_chat(): Array<ChatLine> {
            let cur_ch_chat_arr: Array<ChatLine> = [];
            this.htmlele_arr.forEach(element => {
                if (this.isShowAllChat) {
                    cur_ch_chat_arr.push(element);
                }
                else {
                    if (this.curChannel == element.channel) {
                        cur_ch_chat_arr.push(element);
                    }
                }
            });
            return cur_ch_chat_arr;
        }
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
        private sendText(): void {
            let msg: string = this.UIins.inputInfo.text;
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
                let data_arr: Array<string>;
                data_arr = msg.split(" ");
                data_arr.shift();
                helper.do_test(data_arr);
                this.UIins.inputInfo.text = "";
            }
            else {
                if (helper.is_sys_open('聊天', true)) {
                    let channel: number = this.curChannel;
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
                } else {
                    this.UIins.inputInfo.text = "";
                }
            }
            if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_CHAT_FACE)) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_FACE, false);
                this.showFace = false;
            }
            helper.play_sound("sound/mousedown_btn.wav");
            helper.chat_input_dict.set(helper.main_chat, "");
        }
        public open_bag(us: any = null): void {
            //if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_BAG_UI) == false)
            //    utils.widget_ins().show_widget(widget_enum.WIDGET_BAG_UI, true);
            //else
            //    utils.widget_ins().show_widget(widget_enum.WIDGET_BAG_UI, false);
            helper.play_sound("sound/mousedown_btn.wav");
        }
        private addEmotion(e_str: string): void {
            this.UIins.inputInfo.text += e_str;
            helper.chat_input_dict.set(helper.main_chat, this.UIins.inputInfo.text);
        }
        private onSceneChange(ud: any = null): void {
            if (helper.is_wlmz_scene()) {//显示综合频道，无法切换至其它频道
                this.UIins.ch0.mouseEnabled = false;
                this.UIins.ch1.mouseEnabled = false;
                this.UIins.ch2.mouseEnabled = false;
                this.UIins.ch3.mouseEnabled = false;
                if (!this.isShowAllChat) {
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = true;//综合
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
        }
        private openFaceList(): void {
            this.showFace = !this.showFace;
            utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_FACE, this.showFace);
            helper.play_sound("sound/mousedown_btn.wav");
        }
        private on_change_msg_area(): void {
            this.showAll = !this.showAll;
            if (this.showAll) {
                this.blowUpChatBox();
            }
            else {
                this.shrinkChatBox();
            }
            helper.play_sound("sound/mousedown_btn.wav");
        }

        private on_tab_show(ud: any = null): void {
            let b_visible = !ud["flag"] as boolean;
            if (this.b_visible != b_visible) {
                this.m_ui.visible = b_visible;
                this.b_visible = b_visible;
            }
        }

        private blowUpChatBox(): void {
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
        }
        private shrinkChatBox(): void {
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
            if (this.curChannel == 3 && this.isShowAllChat) {//综合
                this.UIins.ch1.y = 242;
                this.UIins.ch2.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 3 && !this.isShowAllChat) {//世界
                this.UIins.ch1.y = 242;
                this.UIins.ch2.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 2) {//帮派
                this.UIins.ch2.y = 242;
                this.UIins.ch1.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 4) {//跨服
                this.UIins.ch3.y = 242;
                this.UIins.ch1.visible = false;
                this.UIins.ch2.visible = false;
            }

            this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
        }
        private onKeyEvent(e: Laya.Event): void {
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
        }

        private on_focus(): void {
            helper.set_focus_str(helper.main_chat);
        }


        public on_input_limit(ud: any = null): void {
            this.UIins.inputInfo.maxChars = 500;
            helper.show_text_tips(game.L_CHAR_LIMIT_CHANGED);
            this.UIins.inputInfo.focus = false;
        }

        

        private on_input_msg(ud: Object): void {
            let focus_str = helper.get_focus_str();
            if (focus_str == helper.main_chat) {
                this.UIins.inputInfo.text = ud["msg"];
                helper.clear_focus_str();
            }
        }

        private on_input_send(ud: Object): void {
            let focus_str = helper.get_focus_str();
            if (focus_str == helper.main_chat) {
                this.UIins.inputInfo.text = ud["msg"];
                this.sendText();
                helper.clear_focus_str();
            }
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}

class ChatLine extends Laya.Box {
    public channel: number;
    public textField: Laya.HTMLDivElement;
    constructor() {
        super();
        this.textField = new Laya.HTMLDivElement();
        this.addChild(this.textField);
        //监听用户名点击事件
        this.textField.on(Laya.Event.LINK, this, this.on_click_link);
    }
    private get_channel_prefix(channel: number): string {
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
    }
    private get_channel_color(channel: number): string {
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
    }
    private get_name_color(sex: number): string {
        switch (sex) {
            case 1:
                return base.FORMAT_COLOR["#C12&"];
            case 2:
                return base.FORMAT_COLOR["#C13&"];
            default:
                break;
        }
        return base.FORMAT_COLOR["#C12&"];
    }
    public init(channel: number, userID: number, shape: number, vipLevel: number, userName: string, msg_str: string, svrId: number) {
        this.channel = channel;
        let fontsize: string = "44";
        this.pos(0, 0);
        // let textField: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        this.textField.width = 1276;
        this.textField.style.color = this.get_channel_color(channel);
        this.textField.style.valign = "middle";
        this.textField.style.leading = 10;
        this.textField.style.letterSpacing = 2;
        this.textField.style.font = "44px h5font";
        let chInfo: string = this.get_channel_prefix(channel);
        let chat_data = data.get_data(data_enum.DATA_CHAT) as data.channel_data;
        if (channel == base.CHANNEL_ACROSSSVR) {
            let str: string = chat_data.get_svr_name(svrId);
            if (str)
                chInfo = '【'+str+'】';
        }
        let ch_color = this.get_channel_color(channel);
        let channelHTML: string = helper.createSpanTag(ch_color, fontsize) + chInfo + '</span>';
        let userData = userName + "," + base.HYPERLINK_TYPE.TYPE_OPEN_PLAYER_INFO + "," + userID + "," + shape;
        let nameHTML: string = "";
        if (userName) {
            let sex = helper.get_sex(shape);
            let name_color: string = this.get_name_color(sex);
            nameHTML = helper.createLinkTag(name_color, fontsize, userData, userName) + ':</span>';
        }
        let vipHTML: string = "";
        // if (this.channel != 6) {
        //     vipHTML = helper.createImgTag(helper.get_VIP_numSkin(vipLevel)) + ": ";
        // }
        let msgHTML: string = helper.analysisMsgStr(msg_str, ch_color, fontsize);
        let totalInfoHTML: string = channelHTML + nameHTML + vipHTML + msgHTML;
        try {
            this.textField.innerHTML = totalInfoHTML;
        } catch (error) {
            core.game_tiplog("异常，含有特殊字符");
            return;
        }
        // this.addChild(this.textField);
        this.height = this.textField.contextHeight + 10;
    }
    public on_click_link(data: string): void {
        let index: number = 0;
        let data_arr = new Array<any>();
        let tempArr = data.split(",");
        for (let str of tempArr) {
            if (index == 0)
                data_arr.push(str);
            else
                data_arr.push(parseInt(str));
            index += 1;
        }
        //let channel = utils.module_ins().get_module(module_enum.MODULE_CHANNEL) as game.channel;
        //channel.chat_hyperlink({ "text": data_arr[0], "hyperlink_type": data_arr[1], "u1": data_arr[2], "u2": data_arr[3], "u3": data_arr[4] })
        // helper.hyperlink_handle(data_arr[0], data_arr[1], data_arr[2], data_arr[3], data_arr[4]);
    }
}