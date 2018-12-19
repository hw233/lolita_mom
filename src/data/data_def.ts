module data{
    export function init_data_module()
    {
        utils.data_ins().register_data(data_enum.DATA_ACCOUNT,data.account_data);
        utils.data_ins().register_data(data_enum.DATA_PLAYER,data.player_data)
    }
    export function get_data(data_name:string):utils.game_data
    {
        return utils.data_ins().get_data(data_name);
    }
}