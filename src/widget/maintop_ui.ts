module widget {
    export class maintop_ui extends utils.game_widget {
        private UIins: ui.game.main_topui_newUI = null;

        constructor() {
            super("res/atlas/mainui.atlas", ui.game.main_topui_newUI);
            this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            this.append_extrares("res/atlas/ui/new.atlas", Laya.Loader.ATLAS);
            this.m_layer = utils.WIDGET_LAYER.NORMAL;
        }

        public on_init(): void {
            fontmgr.set_ui_font(this.m_ui);
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.main_topui_newUI;
                this.register_event(game_event.EVENT_UI_MAINTOPUPDATE,this.on_update_data);
                this.register_event(game_event.EVENT_MAINPLAYER_MOVE,this.on_mainplayer_move);
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        }
        private on_mainplayer_move(ud:any = null):void{
            let x:number = ud[0];
            let y:number = ud[1];
            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            this.UIins.name_label.text = mp.m_name + " ("+x.toString()+","+y.toString()+")";
        }
        private on_update_data(ud:any = null):void{
            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            let gold:number = mp.m_gold;
            let stamnia:number = mp.m_stamina;
            this.UIins.num_gold.text = gold.toString();
            this.UIins.num_slv.text = stamnia.toString();
            this.UIins.level_label.text = mp.m_lv.toString();
        }
        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}