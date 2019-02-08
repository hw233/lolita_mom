module widget {
    export class help_tips_ui extends utils.game_widget {
        private UIins: ui.game.help_tipsUI = null;

        constructor() {
            super("res/atlas/ui/other.atlas", ui.game.help_tipsUI);
            this.m_layer = utils.WIDGET_LAYER.TIPS;
        }

        public on_init(): void {
            fontmgr.set_ui_font(this.m_ui);
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.help_tipsUI;
                this.UIins.btn_close.on(Laya.Event.CLICK, this, this.on_close);
                this.UIins.btn_close.on(Laya.Event.MOUSE_OUT,this,this.on_mouseout);
            }
            else {
                this.UIins.btn_close.off(Laya.Event.MOUSE_OUT,this,this.on_mouseout);
                this.UIins.btn_close.off(Laya.Event.CLICK, this, this.on_close);
                this.UIins.lab_text.text = "";
                this.UIins = null;
            }
        }
        public on_show_ud(flag:boolean,ud:any = null):void{
            if(flag){
                this.UIins.lab_text.text = ud[0] as string;
                let b_center:boolean = ud[3];
                if(b_center){
                    let w:number = this.UIins.img_bk.width;
                    let h:number = this.UIins.img_bk.height;
                    let sw:number = Laya.stage.width;
                    let sh:number = Laya.stage.height;
                    let x:number = (sw - w)/2;
                    let y:number = (sh - h)/2;
                    this.move_bk(x,y);
                }
                else{
                    this.move_bk(ud[1] as number,ud[2] as number);
                }
            }
        }
        private move_bk(x:number,y:number):void{
            this.UIins.x = x;
            this.UIins.y = y;
            //this.UIins.img_bk.x = x;
            //this.UIins.img_bk.y = y;
            //this.UIins.btn_close.x = x;
            //this.UIins.btn_close.y = y;

            //this.UIins.lab_text.x = this.UIins.img_bk.x+66;
            //this.UIins.lab_text.y = +this.UIins.img_bk.y+66;
        }
        public on_mouseout(ud:any = null):void{
            this.show(false);
        }
        public on_close(): void {
            this.show(false);
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }

    }
}