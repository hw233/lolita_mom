var game;
(function (game) {
    function init_game_module() {
        utils.module_ins().register_module(module_enum.MODULE_MAIN, game.game_main);
        utils.module_ins().register_module(module_enum.MODULE_PLAYER, game.player_main);
        utils.module_ins().register_module(module_enum.MODULE_CARD, game.card_main);
        utils.module_ins().register_module(module_enum.MODULE_TIPS, game.tips_mgr);
        utils.module_ins().register_module(module_enum.MODULE_SYS_MSG, game.sys_msg);
        utils.module_ins().register_module(module_enum.MODULE_SCENE, game.scene);
        utils.module_ins().register_module(module_enum.MODULE_CHAT_MSG, game.chat_msg);
        utils.module_ins().register_module(module_enum.MODULE_SOUND, game.soundmgr);
        utils.module_ins().register_module(module_enum.MODULE_COMBATLOADING, game.combatloadingmgr);
        utils.module_ins().register_module(module_enum.MODULE_COMBATPLAYER, game.combatplayer);
        utils.module_ins().register_module(module_enum.MODULE_COMBATLOADINGV2, game.combatloadingmgrV2);
        utils.module_ins().register_module(module_enum.MODULE_COMBAT, game.combatmgr);
        utils.module_ins().register_module(module_enum.MODULE_COMBATUI, game.combat_ui_mgr);
        utils.module_ins().register_module(module_enum.MODULE_LOADING, game.loadingmgr);
    }
    game.init_game_module = init_game_module;
    function get_module(module_name) {
        return utils.module_ins().get_module(module_name);
    }
    game.get_module = get_module;
})(game || (game = {}));
//# sourceMappingURL=module_def.js.map