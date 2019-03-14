module widget {
    export class loading_ui extends utils.game_widget {
        private m_bk_rect: Laya.Sprite = new Laya.Sprite();
        constructor()  {
            super("res/atlas/loading.atlas", ui.game.loadingUI);
            this.append_extrares("bigpic/LOGO.png", Laya.Loader.IMAGE);
            this.append_extrares("bigpic/barBK.png", Laya.Loader.IMAGE);
            // this.append_extrares("bigpic/进度条底板$bar.png",Laya.Loader.IMAGE);

            this.m_layer = utils.WIDGET_LAYER.TOPMOST;
            this.m_bk_rect.graphics.drawRect(0, 0, 2000, 3000, '#000000');
            //this.m_bk_rect.alpha = 0.5;
        }
        public on_init(): void  {
            fontmgr.set_ui_style(this.m_ui, fontmgr.FONTSTYLE_ENUM.FONT_PINK);
            let uiins: ui.game.loadingUI = this.m_ui as ui.game.loadingUI;
            let width: number = helper.get_design_w();
            let height: number = helper.get_design_h();
            let ratio: number = width / height;
            let scaleX: number = width / uiins.width;
            let scaleY: number = height / uiins.height;
            let scale = scaleX > scaleY ? scaleX : scaleY;
            uiins.m_bk.scale(scale, scale);
            uiins.width = width;
            uiins.height = height;

            fontmgr.set_lable(uiins.m_info, fontmgr.FONTSTYLE_ENUM.FONT_PINK);
        }
        public on_show(flag: boolean): void  {
            if (flag)  {
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                this.register_event(game_event.EVENT_LOADINGUI_PROGRESS, this.on_progress_event);
                this.set_progress(0);

                this.m_ui.addChildAt(this.m_bk_rect, 0);
                this.m_ui.hitArea = new Laya.Rectangle(-100, -100, 2000, 3000);
            }
            else  {
                this.unregister_allevent();
            }
        }
        private set_progress(v: number): void {
            //core.game_tiplog("loading_ui set_progress ",v);
            let ui_ins: ui.game.loadingUI = this.m_ui as ui.game.loadingUI;
            let m_progress: laya.ui.ProgressBar = ui_ins.m_progress1;
            let m_progresslight: laya.ui.Image = ui_ins.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width - 70) * m_progress.value + 30;
        }
        private on_progress_event(ud: any = null): void {
            this.set_progress(ud);
        }
        public on_dispose(): void  {

        }
        public dispose()  {
            super.dispose();
        }

    }
}