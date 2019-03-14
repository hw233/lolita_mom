module widget{
    export class combat_loading_ui extends utils.game_widget{
        private m_bk_rect:Laya.Sprite = new Laya.Sprite();
        private m_uiins:ui.game.combat_loadingUI = null;
        constructor()
        {
            super("res/atlas/loading.atlas",ui.game.combat_loadingUI);
            this.append_extrares("bigpic/scene_loading.jpg",Laya.Loader.IMAGE);
            this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            this.m_bk_rect.graphics.drawRect(0,0,2000,3000,'#000000');
            //this.m_bk_rect.alpha = 0.5;
        }
        public on_init():void
        {
            this.m_uiins = this.m_ui as ui.game.combat_loadingUI;
            let width: number = helper.get_design_w();
            let height: number = helper.get_design_h();
            let ratio: number = width / height;
            let scaleX: number = width / this.m_uiins.width;
            let scaleY: number = height / this.m_uiins.height;
            let scale = scaleX > scaleY ? scaleX : scaleY;
            this.m_uiins.m_bk.scale(scale, scale);
            this.m_uiins.width = width;
            this.m_uiins.height = height;
            fontmgr.set_ui_style(this.m_ui,fontmgr.FONTSTYLE_ENUM.FONT_WHTIE);
            fontmgr.set_lable(this.m_uiins.m_info,fontmgr.FONTSTYLE_ENUM.FONT_WHTIE);
        }
        protected init_event():void{
            this.register_event(game_event.EVENT_COMBATLOADINGUI_PROGRESS,this.on_progress_event);
        }
        public on_show(flag:boolean):void
        {
            if(flag)
            {
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                this.init_event();
                this.set_progress(0);

                this.m_ui.addChildAt(this.m_bk_rect,0);
                this.m_ui.hitArea = new Laya.Rectangle(-100, -100, 2000, 3000);


                let b_first_enter: string = helper.get_local("first_enter_game");
                if (!b_first_enter) {
                    helper.set_local("first_enter_game", "1");
                    this.m_uiins.img_vip.visible = true;
                }
                else {
                    this.m_uiins.img_vip.visible = false;
                }

            }
            else
            {
                this.unregister_allevent();
            }
        }
        private set_progress(v:number):void{
            let m_progress:laya.ui.ProgressBar = this.m_uiins.m_progress1;
            let m_progresslight:laya.ui.Image = this.m_uiins.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width-70)*m_progress.value+30;
            this.m_uiins.m_info.text = Math.floor(v*100).toString()+"%";
        }
        protected on_progress_event(ud:any = null):void{
            this.set_progress(ud as number);
        }
        public on_dispose():void
        {

        }
        public dispose()
        {
            super.dispose();
        }
        
    }
    export class game_loading_ui extends combat_loading_ui{
        protected init_event():void{
            this.register_event(game_event.EVENT_GAMELOADINGUI_PROGRESS,this.on_progress_event);
        }
    }
}