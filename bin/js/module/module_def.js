var game;
(function (game) {
    function init_game_module() {
        utils.module_ins().register_module(module_enum.MODULE_MAIN, game.game_main);
        utils.module_ins().register_module(module_enum.MODULE_PLAYER, game.player_main);
    }
    game.init_game_module = init_game_module;
    function get_module(module_name) {
        return utils.module_ins().get_module(module_name);
    }
    game.get_module = get_module;
})(game || (game = {}));
//# sourceMappingURL=module_def.js.map