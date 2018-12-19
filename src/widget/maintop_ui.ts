module widget {
    export class maintop_ui extends utils.game_widget {
        private UIins: ui.game.main_topuiUI = null;

        constructor() {
            super("res/atlas/mainui.atlas", ui.game.main_topuiUI);
            this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            this.append_extrares("bigpic/mainuibg.png", Laya.Loader.IMAGE);
            this.m_layer = utils.WIDGET_LAYER.NORMAL;
        }

        public on_init(): void {
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.main_topuiUI;
                this.register_event(game_event.EVENT_UI_MAINTOPUPDATE,this.on_update_data);
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        }
        private on_update_data(ud:any = null):void{
            let gold:number = ud[0];
            let stamnia:number = ud[1];
            this.UIins.num_gold.text = gold.toString();
            this.UIins.num_bgold.text = "";
            this.UIins.num_slv.text = stamnia.toString();
        }
        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}