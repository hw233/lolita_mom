module widget {
    export class msgbox_ui extends utils.game_widget {
        private no_tips_flag: boolean = false;
        private mb_data: data.msgbox_data = null;
        private UIins: ui.game.msgboxUI = null;

        constructor() {
            super("res/atlas/ui.atlas", ui.game.msgboxUI);
            this.append_extrares("res/atlas/ui/title.atlas", Laya.Loader.ATLAS);
            this.m_layer = utils.WIDGET_LAYER.TIPS;
        }

        public on_init(): void {
            let uiins = this.m_ui as ui.game.msgboxUI;
            uiins.htmlText_content.style.font = "48px h5font";
            uiins.htmlText_content.style.color = "#bd8651";
            // uiins.htmlText_content.style.align = "center";
            fontmgr.set_button(uiins.btn_ok, fontmgr.FONTSTYLE_ENUM.FONT_REDDRAK);
            fontmgr.set_button(uiins.btn_cancle, fontmgr.FONTSTYLE_ENUM.FONT_REDDRAK);
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.msgboxUI;
                this.UIins.btn_ok.on(Laya.Event.CLICK, this, this.on_ok);
                this.UIins.btn_cancle.on(Laya.Event.CLICK, this, this.on_cancel);
                this.UIins.btn_close.on(Laya.Event.CLICK, this, this.on_close);
                this.mb_data = data.get_data(data_enum.DATA_MSGBOX) as data.msgbox_data;
                this.set_msgbox();
                helper.center_widget(this.m_ui);
                helper.add_widget_hitArea(this.m_ui);
            }
            else {
                this.UIins.btn_ok.off(Laya.Event.CLICK, this, this.on_ok);
                this.UIins.btn_cancle.off(Laya.Event.CLICK, this, this.on_cancel);
                this.UIins.btn_close.off(Laya.Event.CLICK, this, this.on_close);
                helper.remove_widget_hitArea(this.m_ui);
                if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                    this.UIins.btn_NoTips.off(Laya.Event.CLICK, this, this.on_NoTips);
                }
                this.mb_data = null;
                this.UIins = null;
            }
        }

        private set_msgbox(): void {
            if (this.mb_data) {
                this.UIins.htmlText_content.innerHTML = this.mb_data.content;
                if (this.mb_data.type == 1) {
                    this.UIins.btn_ok.pos(240, 345);
                    this.UIins.btn_cancle.visible = false;
                }
                else if (this.mb_data.type == 2) {
                    this.UIins.btn_ok.pos(375, 345);
                    this.UIins.btn_cancle.pos(110, 345);
                    this.UIins.btn_cancle.visible = true;
                }
                if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                    this.UIins.btn_NoTips.visible = this.UIins.lab_NoTips.visible = true;
                    this.no_tips_flag = false;
                    this.UIins.btn_NoTips.skin = "ui/selectn.png";
                    this.UIins.btn_NoTips.on(Laya.Event.CLICK, this, this.on_NoTips);
                }
                else {
                    this.UIins.btn_NoTips.visible = this.UIins.lab_NoTips.visible = false;
                }
            }
        }

        public on_ok(): void {
            if (this.mb_data.caller != null) {
                let sys_msg = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG) as game.sys_msg;
                sys_msg.fire_choosed(this.mb_data.caller, true, this.mb_data.user_data);
            }
            this.show(false);
        }

        public on_cancel(): void {
            if (this.mb_data.caller != null) {
                let sys_msg = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG) as game.sys_msg;
                sys_msg.fire_choosed(this.mb_data.caller, false, this.mb_data.user_data);
            }
            this.show(false);
        }

        public on_NoTips(): void {
            if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                this.no_tips_flag = !this.no_tips_flag;
                this.UIins.btn_NoTips.skin = this.no_tips_flag == true ? "ui/selecty.png" : "ui/selectn.png";
                this.mb_data.set_NoTips_flag(this.mb_data.NoTips_keys, this.no_tips_flag);
            }
        }

        public on_close(): void {
            this.show(false);
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }

    }
}