var game_event;
(function (game_event) {
    game_event.EVENT_TEST = "test";
    game_event.EVENT_TEST1 = "test1";
    game_event.EVENT_TEST2 = "test2";
    game_event.EVENT_TEST3 = "test3";
    game_event.EVENT_TIMER_TICK_1S = "timer_tick_1s";
    game_event.EVENT_PLAYERDATA_UPDATED = "playerdata_updated";
    game_event.EVENT_SCENE_CLICK = "game_click";
    game_event.EVENT_SCENE_STOP = "scene_stop";
    game_event.EVENT_PLAYER_ENTER = "player_enterscene";
    game_event.EVENT_PLAYER_OUT = "player_outscene";
    game_event.EVENT_MAINPLAYER_MOVE = "mainplayer_move";
    game_event.EVENT_ENTERSCENE = "mainplayer_enterscene";
    game_event.EVENT_CLICK_PLAYER = "scene_click_player";
    game_event.EVENT_UI_MAINTOPUPDATE = "ui_maintop_update";
    game_event.EVENT_UI_MAINUPDATE = "ui_main_update";
    game_event.EVENT_MSGBOX_CHOOSED = "msgbox_choosed";
    game_event.EVENT_CARD_UPDATEHANDS = "card_updatehands";
    game_event.EVENT_CARD_UPDATECARDS = "card_updatecards";
    game_event.EVENT_CARD_REQ_START = "card_req_start";
    game_event.EVENT_CARD_UPDATEDLV = "card_updatedlv";
    game_event.EVENT_CARD_CARDCHANGED = "card_cardchanged";
    game_event.EVENT_CARD_ATTACK = "card_attack";
    game_event.EVENT_CARD_DELCARD = "card_delcard";
    game_event.EVENT_CARD_OPENCARD = "card_open";
    game_event.EVENT_CARD_PLAYERINFO = "card_playerinfo";
    game_event.EVENT_CARD_END = "card_end";
    // chat
    game_event.EVENT_CHAT = "chat";
    game_event.EVENT_CHAT_HYPERLINK = "chat_hyperlink"; // 超链接点击，userdata：{"text":data_arr[0], "hyperlink_type":data_arr[1], "u2":data_arr[2], "u3":data_arr[3], "u4":data_arr[4]}
    game_event.EVENT_CHATWND_SIZE = "chatwnd_size";
    game_event.EVENT_CHATWND_SYSMSG = "chatwnd_sysmsg";
    // export const EVENT_CHAT_VISIBLE: string = "chat_visible";
    // chat end
    game_event.EVENT_CHANGE_INPUT_LIMIT = "cancel_input_limit";
    game_event.EVENT_SELECT_EMOTION = "select_emotion";
    game_event.EVENT_SELECT_EMOTION_FCHAT = "select_emotion_fchat";
    game_event.EVENT_KEYBOARD_SHOW = "keyboard_show";
    //键盘消失
    game_event.EVENT_KEYBOARD_HIDDEN = "keyboard_hidden";
    game_event.EVENT_KEYBOARD_HEIGHT_CHANGE = "keyboard_height_change";
    game_event.EVENT_CHAT_INPUT_MSG = "chat_input_msg";
    game_event.EVENT_CHAT_INPUT_SEND = "chat_input_send";
    game_event.EVENT_CHAT_CLEAR = "chat_clear";
    game_event.EVENT_SOUND_OPEN = "sound_open";
    game_event.EVENT_SOUND_CLOSE = "sound_close";
    game_event.EVENT_BUTTON_CLICK = "button_click";
    game_event.EVENT_TAB_SHOW = "tab_show";
})(game_event || (game_event = {}));
//# sourceMappingURL=game_event_def.js.map