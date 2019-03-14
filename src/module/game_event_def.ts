module game_event{
    export const EVENT_TEST:string = "test";
    export const EVENT_TEST1:string = "test1";
    export const EVENT_TEST2:string = "test2";
    export const EVENT_TEST3:string = "test3";
    export const EVENT_TIMER_TICK_1S:string = "timer_tick_1s";
    export const EVENT_PLAYERDATA_UPDATED:string = "playerdata_updated";

    export const EVENT_SCENE_CLICK:string = "game_click";
    export const EVENT_SCENE_STOP:string = "scene_stop";
    
    export const EVENT_PLAYER_ENTER:string = "player_enterscene";
    export const EVENT_PLAYER_OUT:string = "player_outscene";
    export const EVENT_MAINPLAYER_MOVE:string = "mainplayer_move";
    export const EVENT_ENTERSCENE:string = "mainplayer_enterscene";
    export const EVENT_CLICK_PLAYER:string = "scene_click_player";

    export const EVENT_UI_MAINTOPUPDATE:string = "ui_maintop_update";
    export const EVENT_UI_MAINUPDATE:string = "ui_main_update";

    export const EVENT_MSGBOX_CHOOSED:string = "msgbox_choosed";

    export const EVENT_CARD_UPDATEHANDS:string = "card_updatehands";
    export const EVENT_CARD_UPDATECARDS:string = "card_updatecards";
    
    export const EVENT_CARD_REQ_START:string = "card_req_start";
    export const EVENT_CARD_UPDATEDLV:string = "card_updatedlv";
    export const EVENT_CARD_CARDCHANGED:string = "card_cardchanged";
    export const EVENT_CARD_ATTACK:string = "card_attack";
    export const EVENT_CARD_DELCARD:string = "card_delcard";
    export const EVENT_CARD_OPENCARD:string = "card_open";
    export const EVENT_CARD_PLAYERINFO:string = "card_playerinfo";
    export const EVENT_CARD_END:string = "card_end";

    // chat
    export const EVENT_CHAT: string = "chat";
    export const EVENT_CHAT_HYPERLINK: string = "chat_hyperlink";  // 超链接点击，userdata：{"text":data_arr[0], "hyperlink_type":data_arr[1], "u2":data_arr[2], "u3":data_arr[3], "u4":data_arr[4]}
    export const EVENT_CHATWND_SIZE: string = "chatwnd_size";
    export const EVENT_CHATWND_SYSMSG:string = "chatwnd_sysmsg";
    // export const EVENT_CHAT_VISIBLE: string = "chat_visible";
    // chat end
    export const EVENT_CHANGE_INPUT_LIMIT: string = "cancel_input_limit";
    export const EVENT_SELECT_EMOTION: string = "select_emotion";
    export const EVENT_SELECT_EMOTION_FCHAT: string = "select_emotion_fchat";
    export const EVENT_KEYBOARD_SHOW = "keyboard_show";

    //键盘消失
    export const EVENT_KEYBOARD_HIDDEN: string = "keyboard_hidden";
    export const EVENT_KEYBOARD_HEIGHT_CHANGE: string = "keyboard_height_change";
    export const EVENT_CHAT_INPUT_MSG: string = "chat_input_msg";
    export const EVENT_CHAT_INPUT_SEND: string = "chat_input_send";
    export const EVENT_CHAT_CLEAR: string = "chat_clear";

    export const EVENT_SOUND_OPEN:string = "sound_open";
    export const EVENT_SOUND_CLOSE:string = "sound_close";

    export const EVENT_BUTTON_CLICK:string = "button_click";

    export const EVENT_TAB_SHOW:string = "tab_show";

    export const EVENT_GAMELOADINGUI_PROGRESS:string = "gameloadingui_progress";
    //combat
    export const EVENT_ENTERCOMBAT:string = "enter_combat";
    export const EVENT_OUTCOMBAT:string = "out_combat";
    export const EVENT_COMBATPLAYING:string = "combatplaying";
    export const EVENT_COMBATLOADINGUI_PROGRESS:string = "combatloadingui_progress";
    export const EVENT_COMBATPLAYERATTACK:string = "combat_playerattack";
    export const EVENT_COMBATPLAYERHPCHANGED:string = "combat_playerhpchanged";
    export const EVENT_COMBAT_DEFEAT:string = "combat_defeat";
    export const EVENT_COMBAT_SERIAL:string = "combat_serial";
    export const EVENT_COMBAT_NORMAL:string = "combat_normal";
    export const EVENT_COMBAT_QUICK:string = "combat_quick";
    export const EVENT_COMBAT_SPDCHANGED:string = "combat_spdchanged";

    export const EVENT_COMBATTURNSCHANGE:string = "combat_turnchanged";
    export const EVENT_COMBATLOADINGMGR_COMPLETE:string = "combatloadingmgr_complete";
    export const EVENT_COMBATLOADINGMGRV2_COMPLETE:string = "combatloadingmgrv2_complete";
    export const EVENT_COMBATLOADINGMGR_ERROR:string = "combatloadingmgr_error";
    export const EVENT_COMBATGO2NEXT:string = "combatgo2next";


    export const EVENT_LOADINGUI_PROGRESS:string = "loadingui_progress";
    export const EVENT_LOADINGMGR_ERROR:string = "loadingmgr_error";
    export const EVENT_LOADINGMGR_COMPLETE:string = "loadingmgr_complete";
}