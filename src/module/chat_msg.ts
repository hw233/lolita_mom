module game {
    export class chat_msg extends utils.game_module {
        public m_btn_y: number = 800;
        constructor() {
            super();
        }
        public start() {
            super.start();
            this.register_net_event(protocol_def.S2C_CHAT, this.on_net_chat);
            this.register_net_event(protocol_def.S2C_CHAT_SYSTEM, this.on_sys_msg);
            this.register_event(game_event.EVENT_CHATWND_SIZE, this.on_chatwnd_size);
            this.register_event(game_event.EVENT_CHATWND_SYSMSG, this.on_sys_msg);
            this.register_event(game_event.EVENT_CHAT_HYPERLINK, this.onPlayerInfo);
            utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_BOX, true);
        }
        private on_chatwnd_size(ud: any = null): void {
            this.m_btn_y = ud as number;
        }
        public on_net_chat(user_data: any): void {
            let ch: number = user_data["ch"];
            let svrid: number = user_data['srvid'];
            let pid: number = user_data["pid"];
            let shape: number = user_data["shape"];
            let vip: number = user_data["vip"];
            let name: string = user_data["name"];
            let msg: string = user_data["msg"];
            this.chat(ch, pid, shape, vip, name, msg, svrid);
        }
        public chat(ch: number, pid: number, shape: number, vip: number, name: string, msg: string, svrid: number): void {
            let c_data: data.channel_data = data.get_data(data_enum.DATA_CHAT) as data.channel_data;
            c_data.set_chat_msg(ch, pid, shape, vip, name, msg, svrid);
            this.fire_event(game_event.EVENT_CHAT, c_data.get_new_chat());
        }
        public on_sys_msg(user_data: any) {
            let ch: number = user_data['ch'];
            let msg: string = user_data['msg'];
            this.chat(ch, 0, 0, 0, "", msg, 0);
        }
        public send_msg(content: string, channel: number = base.CHANNEL_WORLD): void {
            net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": content });
        }
        public onPlayerInfo(ud: any = null): void {
            if (ud != null) {
                if (ud["hyperlink_type"] == base.HYPERLINK_TYPE.TYPE_OPEN_PLAYER_INFO) {
                    let pid = ud["u1"];
                    let pdata:data.player_data = utils.data_ins().get_data(data_enum.DATA_PLAYER) as data.player_data;
                    if (pdata.m_pid == pid) {
                        utils.widget_ins().show_widget(widget_enum.WIDGET_MAINPLAYER_INFO, true);
                    }
                    else {
                        net.net_ins().send(protocol_def.C2S_ROLE_INFO, { "id": pid });
                    }
                }
            }
        }
        public dispose() {
            super.dispose();
        }
    }
}