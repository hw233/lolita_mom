module game{
    export function init_game_module()
    {
        utils.module_ins().register_module(module_enum.MODULE_MAIN,game.game_main);
        utils.module_ins().register_module(module_enum.MODULE_PLAYER,game.player_main);
    }
    export function get_module(module_name:string):utils.game_module
    {
        return utils.module_ins().get_module(module_name);
    }
}