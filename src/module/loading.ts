module game{
    export class loadingmgr extends utils.game_module{
        private m_assets:Array<any> = null;
        private m_caller:any = null;
        private m_min_time:number = 3000;
        private m_start_time:number = 0;
        private m_cur_progress:number = 0;
        private m_temp_show:boolean = false;
        private m_b_loginsucceed:boolean = false;
        constructor()
        {
            super();
        }
        public start(){
            super.start();
            core.game_tiplog('loadingmgr start');
            timer.timer_ins().add_timer(50,this,this.on_time_func);
            
        }
        public login_succeed(flag:boolean):void{
            this.m_b_loginsucceed = flag;
        }
        private on_time_func():void{
            if(this.m_temp_show){
                let cur_time:number = helper.get_cur_milltime();
                if(cur_time >= (this.m_start_time + this.m_min_time)){
                    this.notify_end();
                    this.m_temp_show = false;
                }
                else{
                    this.m_cur_progress += (1.0 - this.m_cur_progress)*(this.m_start_time + this.m_min_time - cur_time)/this.m_min_time;
                    if(this.m_cur_progress > 1.0){
                        this.m_cur_progress = 1.0;
                    }
                    if(!this.m_b_loginsucceed){
                        this.fire_event_next_frame(game_event.EVENT_LOADINGUI_PROGRESS,this.m_cur_progress);
                    }
                    else{
                        this.fire_event_next_frame(game_event.EVENT_GAMELOADINGUI_PROGRESS,this.m_cur_progress);
                    }
                    
                }
            }
        }
        public start_load(assets:Array<any>,caller:any,state:number = 0):void{
            if(this.m_caller != null){
                return;
            }
            this.m_caller = caller;
            this.m_assets = assets;
            if(!this.m_b_loginsucceed){
                utils.widget_ins().show_widget(widget_enum.WIDGET_LOADING_UI,true);
            }
            else{
                utils.widget_ins().show_widget(widget_enum.WIDGET_GAMELOADING,true);
            }
            core.myload(assets, laya.utils.Handler.create(this, this.on_load),laya.utils.Handler.create(this,this.on_progress,null,false));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
            core.res_warnlog("loading 加载开始 ",this.m_assets,this.m_caller);
            this.m_start_time = helper.get_cur_milltime();
            this.m_cur_progress = 0;
            this.m_temp_show = false;
        }
        public is_loading():boolean{
            return this.m_caller != null;
        }
        public end_load():void{
            utils.widget_ins().show_widget(widget_enum.WIDGET_LOADING_UI,false);
            utils.widget_ins().show_widget(widget_enum.WIDGET_GAMELOADING,false);
            this.m_caller = null;
            this.m_temp_show = false;
        }
        private on_progress(v:number):void{
            core.game_tiplog("loading 加载进度 ",v,this.m_assets);
            this.m_cur_progress = v;
            if(this.m_cur_progress > 1.0){
                this.m_cur_progress = 1.0;
            }
            if(!this.m_b_loginsucceed){
                this.fire_event_next_frame(game_event.EVENT_LOADINGUI_PROGRESS,this.m_cur_progress);
            }
            else{
                this.fire_event_next_frame(game_event.EVENT_GAMELOADINGUI_PROGRESS,this.m_cur_progress);
            }
        }
        private on_load(ud:any = null):void{
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.res_warnlog("loading 加载完成 ",this.m_assets);
            let cur_time:number = helper.get_cur_milltime();
            if(cur_time < (this.m_start_time + this.m_min_time)){
                this.m_temp_show = true;
                return;
            }
            this.notify_end();
        }
        private notify_end():void{
            this.fire_event(game_event.EVENT_LOADINGMGR_COMPLETE,this.m_caller);
            this.m_caller = null;
        }
        private onError(err: String): void {
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
			core.game_tiplog("loading 加载失败 ",err,this.m_assets);
            this.fire_event(game_event.EVENT_LOADINGMGR_ERROR,this.m_caller);
            this.m_caller = null;
		}
        public dispose()
        {
            super.dispose();
        }
    }
}