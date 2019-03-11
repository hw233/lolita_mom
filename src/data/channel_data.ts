module data {
    export class channel_data extends utils.game_data {
        public new_chat: Array<Object>;
        private all_chat_arr: Array<Object>;
        constructor() {
            super();
            this.new_chat = [];
            this.all_chat_arr = [];
        }

        public set_chat_msg(ch: number, pid: number, shape: number, vip: number, name: string, msg: string, svrid: number): void {
            this.new_chat.push({ ch: ch, pid: pid, shape: shape, vip: vip, name: name, msg: msg, svrid: svrid });
            this.all_chat_arr.push({ ch: ch, pid: pid, shape: shape, vip: vip, name: name, msg: msg, svrid: svrid });
            if (this.all_chat_arr.length >= 80) {
                this.all_chat_arr.splice(0, 50);
            }
        }
        public get_new_chat(): Array<Object> {
            return this.new_chat;
        }

        public get_all_chat(): Array<Object> {
            return this.all_chat_arr;
        }

        public clear_new_chat(): void {
            this.new_chat = [];
        }

        public get_svr_name(svr_id:number): string {
            let sdata = data.get_data(data_enum.DATA_SVRLIST) as data.svrlist_data;
            let svr_ins = sdata.get_svr_data(svr_id);
            if (svr_ins != null){
                return svr_ins.m_name;
            }
            return "";
        }
        public dispose() {
            super.dispose();
        }
    }

}