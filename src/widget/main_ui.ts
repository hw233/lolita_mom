module widget {
    export class main_ui extends utils.game_widget {
        private UIins: ui.game.main_uiUI = null;

        constructor() {
            super("res/atlas/mainui.atlas", ui.game.main_uiUI);
            this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            this.append_extrares("bigpic/mainuibg.png", Laya.Loader.IMAGE);
            this.m_layer = utils.WIDGET_LAYER.NORMAL;
        }

        public on_init(): void {
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.main_uiUI;
                this.UIins.btn1.on(Laya.Event.CLICK, this, this.on_battle);
                this.UIins.btn2.on(Laya.Event.CLICK, this, this.on_maincity);
                this.UIins.btn3.on(Laya.Event.CLICK, this, this.on_mainequip);
                this.UIins.btn4.on(Laya.Event.CLICK, this, this.on_add);
                this.UIins.btn5.on(Laya.Event.CLICK, this, this.on_partner);
                this.UIins.btn6.on(Laya.Event.CLICK, this, this.on_summon);
                this.UIins.y = Laya.stage.designHeight - this.UIins.height;
                this.register_event(game_event.EVENT_UI_MAINUPDATE,this.on_update_data);
            }
            else {
                this.UIins.btn1.off(Laya.Event.CLICK, this, this.on_battle);
                this.UIins.btn2.off(Laya.Event.CLICK, this, this.on_maincity);
                this.UIins.btn3.off(Laya.Event.CLICK, this, this.on_mainequip);
                this.UIins.btn4.off(Laya.Event.CLICK, this, this.on_add);
                this.UIins.btn5.off(Laya.Event.CLICK, this, this.on_partner);
                this.UIins.btn6.off(Laya.Event.CLICK, this, this.on_summon);
                this.unregister_allevent();
                this.UIins = null;
            }
        }

        private on_update_data(ud:any = null):void{
            let exp:number = ud[0];
            let expmax:number = ud[1];
            let rate:number = exp/expmax;
            this.UIins.pgbar.value = rate;
            this.UIins.lab_exp.changeText((rate*100).toFixed(2)+"%");
        }
        public on_battle(ud: any = null): void {
        }

        public on_maincity(ud: any = null): void {
            console.log("hahahaha");
            this.fire_event_next_frame(game_event.EVENT_TEST);
        }

        public on_mainequip(ud: any = null): void {
            this.fire_event_next_frame(game_event.EVENT_TEST1);
        }

        public on_add(ud: any = null): void {
        }

        public on_partner(ud: any = null): void {
            this.fire_event_next_frame(game_event.EVENT_TEST2);
        }

        public on_summon(ud: any = null): void {
            this.fire_event_next_frame(game_event.EVENT_TEST3);
        }

        

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}