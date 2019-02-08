module widget {
    export function init_game_widget() {
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINUI, widget.main_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINTOPUI,widget.maintop_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CARDUI,widget.card_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TIPS,widget.tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TEXTTIPS,widget.help_tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MSGBOX,widget.msgbox_ui);
    }
}