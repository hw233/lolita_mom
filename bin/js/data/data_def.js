var data;
(function (data) {
    function init_data_module() {
        utils.data_ins().register_data(data_enum.DATA_ACCOUNT, data.account_data);
        utils.data_ins().register_data(data_enum.DATA_PLAYER, data.player_data);
    }
    data.init_data_module = init_data_module;
    function get_data(data_name) {
        return utils.data_ins().get_data(data_name);
    }
    data.get_data = get_data;
})(data || (data = {}));
//# sourceMappingURL=data_def.js.map