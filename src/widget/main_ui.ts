module widget {
    export class main_ui extends utils.game_widget {
        private UIins: ui.game.main_ui_newUI = null;

        constructor() {
            super("res/atlas/mainui.atlas", ui.game.main_ui_newUI);
            this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            this.append_extrares("res/atlas/ui/new.atlas", Laya.Loader.ATLAS);
            this.m_layer = utils.WIDGET_LAYER.NORMAL;
        }

        public on_init(): void {
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.main_ui_newUI;
                this.UIins.btn1.on(Laya.Event.CLICK, this, this.on_battle);
                this.UIins.btn2.on(Laya.Event.CLICK, this, this.on_maincity);
                this.UIins.btn3.on(Laya.Event.CLICK, this, this.on_mainequip);
                this.UIins.btn4.on(Laya.Event.CLICK, this, this.on_add);
                this.UIins.btn5.on(Laya.Event.CLICK, this, this.on_partner);
                this.UIins.y = Laya.stage.designHeight - this.UIins.height;
                this.register_event(game_event.EVENT_UI_MAINUPDATE,this.on_update_data);
            }
            else {
                this.UIins.btn1.off(Laya.Event.CLICK, this, this.on_battle);
                this.UIins.btn2.off(Laya.Event.CLICK, this, this.on_maincity);
                this.UIins.btn3.off(Laya.Event.CLICK, this, this.on_mainequip);
                this.UIins.btn4.off(Laya.Event.CLICK, this, this.on_add);
                this.UIins.btn5.off(Laya.Event.CLICK, this, this.on_partner);
                this.unregister_allevent();
                this.UIins = null;
            }
        }

        private on_update_data(ud:any = null):void{
            let exp:number = ud[0];
            let expmax:number = ud[1];
            let rate:number = exp/expmax;
            this.UIins.exp_progress.value = rate;
            this.UIins.exp_label.changeText((rate*100).toFixed(2)+"%");
        }
        public on_battle(ud: any = null): void {
            

            let card_m:game.card_main = game.get_module(module_enum.MODULE_CARD) as game.card_main;
            let tud:Object = new Object();

            let idlist:Array<number> = new Array<number>();
            tud["idlist"] = idlist;
            let shapelist:Array<number> = new Array<number>();
            tud["shapelist"] = shapelist;
            let hplist:Array<number> = new Array<number>();
            tud["hplist"] = hplist;
            let atklist:Array<number> = new Array<number>();
            tud["atklist"] = atklist;
            let durationlist:Array<number> = new Array<number>();
            tud["durationlist"] = durationlist;
            
            for(let i:number = 0;i < 16;++i){
                idlist.push(i+1);
                shapelist.push(1001);
                hplist.push(i+1);
                atklist.push(i+1);
                durationlist.push(i+1);
            }
            shapelist[1] = 3001;
            shapelist[2] = 9999;
            shapelist[3] = 3102;
            shapelist[4] = 3301;
            shapelist[5] = 0;
            shapelist[6] = 0;
            shapelist[7] = 0;
            shapelist[8] = 0;
            card_m.on_cards_arr(tud);

            utils.widget_ins().show_widget(widget_enum.WIDGET_CARDUI,true);
        }

        public on_maincity(ud: any = null): void {
            console.log("hahahaha");
            helper.show_text_tips("hahahahah,this is a test");
            //this.fire_event_next_frame(game_event.EVENT_TEST);
        }

        public on_mainequip(ud: any = null): void {
            helper.show_msgbox("OK,let's go");
            //this.fire_event_next_frame(game_event.EVENT_TEST1);
        }

        public on_add(ud: any = null): void {
            this.fire_event_next_frame(game_event.EVENT_TEST3);
        }

        public on_partner(ud: any = null): void {
            this.fire_event_next_frame(game_event.EVENT_TEST2);
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}