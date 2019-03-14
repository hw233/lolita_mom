module game{
    export class combatloadingmgr extends utils.game_module{
        private m_assets:Array<any> = null;
        private m_caller:any = null;
        private m_min_time:number = 1000;
        private m_start_time:number = 0;
        private m_cur_progress:number = 0;
        private m_start_loading:boolean = false;
        private m_alreadyloaded:boolean = false;
        public m_alreadyload_recorder:Object = new Object();
        private m_delay:number = 0;//1000
        constructor()
        {
            super();
        }
        
        public start(){
            super.start();
            core.combat_tiplog('combatloadingmgr start');
            timer.timer_ins().add_timer(50,this,this.on_time_func);
        }
        private on_time_func():void{
            if(this.m_start_loading){
                let cur_time:number = helper.get_cur_milltime();
                if(this.m_alreadyloaded){
                    if(cur_time >= (this.m_start_time + this.m_min_time)){
                        this.notify_end();
                        return;
                    }
                }
                
                this.m_cur_progress += 0.05;
                if(this.m_cur_progress > 1.0){
                    this.m_cur_progress = 1.0;
                }
                this.fire_event_next_frame(game_event.EVENT_COMBATLOADINGUI_PROGRESS,this.m_cur_progress);
            }
        }
        public add_loadedres(path:string):void{
            this.m_alreadyload_recorder[path] = true;
        }
        public clear_loadedres_recorder():void{
            this.m_alreadyload_recorder = new Object();
        }
        public start_load(assets:Array<any>,caller:any):void{
            if(this.m_caller != null){
                return;
            }
            if(assets.length <= 0){
                this.notify_end();
                return;
            }
            let need_load:Array<any> = new Array<any>();
            for(let i of assets){
                if(this.m_alreadyload_recorder.hasOwnProperty(i["url"]) == false){
                    this.m_alreadyload_recorder[i["url"]] = true;
                    need_load.push(i);
                    core.combat_tiplog("assets ",i["type"],i["url"]);
                }
            }
            if(need_load.length <= 0){
                this.notify_end();
                return;
            }
            this.m_caller = caller;
            this.m_assets = need_load;
            core.combat_tiplog("combat loading 加载开始 ",this.m_assets,this.m_assets.length,this.m_caller,this.m_assets.toString());
            
            
            this.m_start_time = helper.get_cur_milltime();
            this.m_cur_progress = 0;
            this.m_start_loading = true;
            this.m_alreadyloaded = false;

            core.myload(this.m_assets, laya.utils.Handler.create(this, this.on_load),laya.utils.Handler.create(this,this.on_progress,null,false));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
            utils.widget_ins().show_widget(widget_enum.WIDGET_COMBATLOADING_UI,true);
            //this.fire_event_next_frame(game_event.EVENT_NEWBEES_SHOW,false);
        }
        public is_loading():boolean{
            return this.m_caller != null;
        }
        public end_load():void{
            utils.widget_ins().show_widget(widget_enum.WIDGET_COMBATLOADING_UI,false);
            this.m_start_loading = false;
            this.m_alreadyloaded = false;
            this.m_caller = null;
        }
        private on_progress(v:number):void{
            core.combat_tiplog("combatloading 加载进度 ",v,this.m_assets);
            if(v <= this.m_cur_progress){
                return;
            }
            this.m_cur_progress = v;
            if(this.m_cur_progress > 1.0){
                this.m_cur_progress = 1.0;
            }
            this.fire_event_next_frame(game_event.EVENT_COMBATLOADINGUI_PROGRESS,this.m_cur_progress);
        }
        private on_load(ud:any = null):void{
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.combat_tiplog("combatloading 加载完成 ",this.m_assets);
            let cur_time:number = helper.get_cur_milltime();
            if(cur_time < (this.m_start_time + this.m_min_time)){
                this.m_alreadyloaded = true;
                return;
            }
            this.notify_end();
        }
        private notify_end():void{
            this.fire_event(game_event.EVENT_COMBATLOADINGMGR_COMPLETE,this.m_caller);
            this.m_start_loading = false;
            this.m_alreadyloaded = false;
            this.m_caller = null;
            //this.fire_event_next_frame(game_event.EVENT_NEWBEES_SHOW,true);
        }
        private onError(err: String): void {
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
			core.combat_tiplog("combatloading 加载失败 ",err,this.m_assets);
            this.fire_event(game_event.EVENT_COMBATLOADINGMGR_ERROR,this.m_caller);
            //this.m_caller = null;
		}
        public dispose()
        {
            super.dispose();
        }
    }
    //
    export class combatloadingmgrV2 extends utils.game_module{
        private m_assets:Array<any> = null;
        private m_min_time:number = 500;
        private m_start_time:number = 0;
        private m_start_loading:boolean = false;

        constructor()
        {
            super();
        }
        
        public start(){
            super.start();
            core.combat_tiplog('combatloadingmgrV2 start');
            timer.timer_ins().add_timer(50,this,this.on_time_func);
        }
        private on_time_func():void{
            if(this.m_start_loading){
                let cur_time:number = helper.get_cur_milltime();
                if(cur_time >= (this.m_start_time + this.m_min_time)){
                    this.notify_end();
                    return;
                }
            }
        }
        public start_load(assets:Array<any>):void{
            if(assets.length <= 0){
                return;
            }
            this.m_assets = assets;
            core.combat_tiplog("combatloadingmgrV2 加载开始 ",this.m_assets,this.m_assets.length,this.m_assets.toString());
            
            this.m_start_time = helper.get_cur_milltime();
            this.m_start_loading = true;

            Laya.loader.load(this.m_assets, laya.utils.Handler.create(this, this.on_load),null,null,0);
            
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        }
        public is_loading():boolean{
            return this.m_start_loading;
        }
        public end_load():void{
            this.m_start_loading = false;
        }
        
        private on_load(ud:any = null):void{
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
            core.combat_tiplog("combatloadingmgrV2 加载完成 ",this.m_assets);
            this.notify_end();
        }
        private notify_end():void{
            if(this.m_start_loading){
                this.fire_event_next_frame(game_event.EVENT_COMBATLOADINGMGRV2_COMPLETE);
            }
            this.m_start_loading = false;
        }
        private onError(err: String): void {
            Laya.loader.off(Laya.Event.ERROR, this, this.onError);
			core.combat_tiplog("combatloadingmgrV2 加载失败 ",err,this.m_assets);
		}
        public dispose()
        {
            super.dispose();
        }
    }
}