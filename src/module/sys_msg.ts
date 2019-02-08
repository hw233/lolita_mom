module game {
    export class sys_msg extends utils.game_module {

        constructor() {
            super();
        }

        public start() {
            super.start();
            this.register_net_event(protocol_def.S2C_CLIENT_COMMAND, this.on_netcmd_client_cmd);
        }

        public show_msgbox(p_content: string): void {
            let mb_data: data.msgbox_data = data.get_data(data_enum.DATA_MSGBOX) as data.msgbox_data;
            mb_data.set_msgbox_data(1, p_content, null, null, "");
            if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_MSGBOX) == false) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_MSGBOX, true);
            }
        }

        // 提示弹窗
        public show_msg_box(p_caller: any, p_content: string, p_user_data: Array<any> = null, NoTips_keys: string = ""): void {
            let mb_data: data.msgbox_data = data.get_data(data_enum.DATA_MSGBOX) as data.msgbox_data;
            mb_data.set_msgbox_data(2, p_content, p_caller, p_user_data, NoTips_keys);
            let NT_flag = mb_data.get_NoTips_flag(NoTips_keys);
            if (NT_flag == true) {
                this.fire_choosed(p_caller, true, p_user_data);
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_MSGBOX) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_MSGBOX, true);
                }
            }
        }

        public fire_choosed(p_caller: any, b_choosed: boolean, p_user_data: Array<any> = null): void {
            this.fire_event_next_frame(game_event.EVENT_MSGBOX_CHOOSED, [p_caller, b_choosed, p_user_data]);
        }

        // 服务器执行客户端指令
        public on_netcmd_client_cmd(ud: any = null) {
            let cmd: string = ud["msg"];
            let data_arr = cmd.split(" ");
            helper.do_test(data_arr);
        }

        public dispose() {
            super.dispose();
        }
    }
}