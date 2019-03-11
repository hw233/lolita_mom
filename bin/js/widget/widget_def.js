var widget;
(function (widget) {
    function init_game_widget() {
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINUI, widget.main_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINTOPUI, widget.maintop_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CARDUI, widget.card_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TIPS, widget.tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TEXTTIPS, widget.help_tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MSGBOX, widget.msgbox_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_BOX, widget.chat_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_FACE, widget.chat_face);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_INPUT, widget.chat_input_ui);
    }
    widget.init_game_widget = init_game_widget;
})(widget || (widget = {}));
//# sourceMappingURL=widget_def.js.map