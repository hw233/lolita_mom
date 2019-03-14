module widget {
    export function init_game_widget() {
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINUI, widget.main_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINTOPUI,widget.maintop_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CARDUI,widget.card_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TIPS,widget.tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TEXTTIPS,widget.help_tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MSGBOX,widget.msgbox_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_BOX, widget.chat_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_FACE, widget.chat_face);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_INPUT, widget.chat_input_ui);
        
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_BOSS_HP,widget.combat_boss_hp_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBATLOADING_UI,widget.combat_loading_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_ROUND, widget.combat_round_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_ROUNDDETAIL, widget.combat_roundDetail_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_SKIP, widget.combat_skip_ui);

        utils.widget_ins().register_widget(widget_enum.WIDGET_LOADING_UI, widget.loading_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_GAMELOADING,widget.game_loading_ui);

        utils.widget_ins().register_widget(widget_enum.WIDGET_BOSS_GODX, widget.boss_godx_ui);
        
    }
}