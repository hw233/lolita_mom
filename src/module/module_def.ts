module game{
    export function init_game_module()
    {
        utils.module_ins().register_module(module_enum.MODULE_MAIN,game.game_main);
        utils.module_ins().register_module(module_enum.MODULE_PLAYER,game.player_main);
        utils.module_ins().register_module(module_enum.MODULE_CARD,game.card_main);
        utils.module_ins().register_module(module_enum.MODULE_TIPS,game.tips_mgr);
        utils.module_ins().register_module(module_enum.MODULE_SYS_MSG,game.sys_msg);
        utils.module_ins().register_module(module_enum.MODULE_SCENE,game.scene);
        utils.module_ins().register_module(module_enum.MODULE_CHAT_MSG,game.chat_msg);
        utils.module_ins().register_module(module_enum.MODULE_SOUND,game.soundmgr);
    }
    export function get_module(module_name:string):utils.game_module
    {
        return utils.module_ins().get_module(module_name);
    }
}