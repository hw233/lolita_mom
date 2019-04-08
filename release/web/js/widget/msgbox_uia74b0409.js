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
    var msgbox_ui = /** @class */ (function (_super) {
        __extends(msgbox_ui, _super);
        function msgbox_ui() {
            var _this = _super.call(this, "res/atlas/ui.atlas", ui.game.msgboxUI) || this;
            _this.no_tips_flag = false;
            _this.mb_data = null;
            _this.UIins = null;
            _this.append_extrares("res/atlas/ui/title.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.TIPS;
            return _this;
        }
        msgbox_ui.prototype.on_init = function () {
            var uiins = this.m_ui;
            uiins.htmlText_content.style.font = "48px h5font";
            uiins.htmlText_content.style.color = "#bd8651";
            // uiins.htmlText_content.style.align = "center";
            fontmgr.set_button(uiins.btn_ok, fontmgr.FONTSTYLE_ENUM.FONT_REDDRAK);
            fontmgr.set_button(uiins.btn_cancle, fontmgr.FONTSTYLE_ENUM.FONT_REDDRAK);
        };
        msgbox_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.UIins.btn_ok.on(Laya.Event.CLICK, this, this.on_ok);
                this.UIins.btn_cancle.on(Laya.Event.CLICK, this, this.on_cancel);
                this.UIins.btn_close.on(Laya.Event.CLICK, this, this.on_close);
                this.mb_data = data.get_data(data_enum.DATA_MSGBOX);
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
        };
        msgbox_ui.prototype.set_msgbox = function () {
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
        };
        msgbox_ui.prototype.on_ok = function () {
            if (this.mb_data.caller != null) {
                var sys_msg = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG);
                sys_msg.fire_choosed(this.mb_data.caller, true, this.mb_data.user_data);
            }
            this.show(false);
        };
        msgbox_ui.prototype.on_cancel = function () {
            if (this.mb_data.caller != null) {
                var sys_msg = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG);
                sys_msg.fire_choosed(this.mb_data.caller, false, this.mb_data.user_data);
            }
            this.show(false);
        };
        msgbox_ui.prototype.on_NoTips = function () {
            if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                this.no_tips_flag = !this.no_tips_flag;
                this.UIins.btn_NoTips.skin = this.no_tips_flag == true ? "ui/selecty.png" : "ui/selectn.png";
                this.mb_data.set_NoTips_flag(this.mb_data.NoTips_keys, this.no_tips_flag);
            }
        };
        msgbox_ui.prototype.on_close = function () {
            this.show(false);
        };
        msgbox_ui.prototype.on_dispose = function () {
        };
        msgbox_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return msgbox_ui;
    }(utils.game_widget));
    widget.msgbox_ui = msgbox_ui;
})(widget || (widget = {}));
//# sourceMappingURL=msgbox_ui.js.map