module utils{
    export class game_widget extends game_event_receiver{
        static m_start_id:number = 0;
        private m_res_path:string = null;
        private m_extra_res_list:Array<Object> = new Array<Object>();
        private m_ui_cls:any = null;
        public m_ui:laya.ui.View = null;
        public m_b_loaded:boolean = false;
        public m_b_loading:boolean = false;
        public m_b_show:boolean = false;
        private m_b_disposed:boolean = false;
        public m_layer:WIDGET_LAYER = WIDGET_LAYER.NORMAL;
        static s_res_dict:Object = new Object();
        static s_loaded_dict:Object = new Object();
        public m_id:number = 0;
        public m_widget_name:string = "unknown_widget";
        public m_ud:any = null;
        constructor(res_path:string,view_cls:any)
        {
            super();
            this.m_res_path = res_path;
            this.m_ui_cls = view_cls;
            game_widget.m_start_id += 1;
            this.m_id = game_widget.m_start_id;
        }
        protected append_extrares(res_url:string,res_type:string):void{
            this.m_extra_res_list.push({url:res_url,type:res_type});
        }
        public move_center():void{
            this.m_ui.x = (Laya.stage.width - this.m_ui.width)>> 1;
            this.m_ui.y = (Laya.stage.height - this.m_ui.height)>>1;
        }
        public register_event(event:string,func:Function):void
        {
            event_ins().register_event(event,this);
            this.register_event_func(event,func);
        }
        public unregister_event(event:string):void
        {
            event_ins().unregister_event(event,this);
            this.unregister_event_func(event);
        }
        public unregister_allevent():void
        {
            event_ins().unregister_allevent(this);
            this.unregister_all_event_func();
        }
        public fire_event(event:string,user_data:any = null):void
        {
            event_ins().fire_event(event,user_data);
        }
        public fire_event_next_frame(event:string,user_data = null):void
        {
            event_ins().fire_event_next_frame(event,user_data);
        }
        protected register_btn_click(con_name:string,func:Function):void{
            let btn = this.get_con(con_name);
            if(btn != null){
                btn.on(Laya.Event.CLICK,this,func);
            }
        }
        protected unregister_btn_click(con_name:string,func:Function):void{
            let btn = this.get_con(con_name);
            if(btn != null){
                btn.off(Laya.Event.CLICK,this,func);
            }
        }
        private _get_con(node:Laya.Node,name:string):Laya.Node{
            for(let i:number = 0;i < node.numChildren;++i){
                let nd:Laya.Node = node.getChildAt(i);
                if(nd.name == name){
                    return nd;
                }
                nd = this._get_con(nd,name);
                if(nd != null){
                    return nd;
                }
            }
            return null;
        }
        public get_con(con_name:string):any
        {
            if(this.m_b_loaded)
            {
                return this._get_con(this.m_ui,con_name);
            }
            return null;
        }
        public load():void
        {
            
            //core.core_tiplog("game_widget start load ",this.m_res_path,this.m_ui_cls);
            //this.m_b_loaded = true;
            //alert("start load ui");
            let b_need_loaded:boolean = false;
            for(let i of this.m_extra_res_list){
                if(game_widget.s_loaded_dict.hasOwnProperty(i["url"]) == false){
                    core.ui_tiplog("game_widget load need download ",i["url"]);
                    b_need_loaded = true;
                }
            }
            if(b_need_loaded){//有资源需要下载，显示loading界面
                utils.widget_ins().start_load(this);
            }

            
            this.m_b_loading = true;
            Laya.loader.on(Laya.Event.ERROR,this,this.on_load_error);
            core.res_tiplog("game_widget load res ",this.m_extra_res_list);
            core.myload(this.m_extra_res_list,laya.utils.Handler.create(this,this.on_load_complete),null,null,0);
        }
        private init_uiins():void{
            
            this.m_ui = new this.m_ui_cls();
            
            this.on_init();
            //todo
            //core.core_tiplog("game_widget on_load_complete ",this.m_res_path,this.m_ui_cls);
            if(this.m_b_show){
                this.m_b_show = false;
                this.show(true);
            }
        }
        private on_load_complete():void
        {
            if(this.m_b_disposed){
                return;
            }
            if(this.m_b_loading == false){
                core.res_errlog("game_widget on_load_complete this.m_b_loading = false");
                return;
            }
            utils.widget_ins().end_load(this);
            //
            for(let i of this.m_extra_res_list){
                if(Laya.loader.getRes(i["url"]) != null){
                    game_widget.s_loaded_dict[i["url"]] = true;
                }
            }
            //
            this.m_b_loading = false;
            Laya.loader.off(Laya.Event.ERROR,this,this.on_load_error);
            if(Laya.loader.getRes(this.m_res_path) == null){
                core.res_errlog("game_widget on_load_complete getRes(this.m_res_path) == null ",this.m_res_path);
                return;
            }
            //

            //
            this.m_b_loaded = true;
            
            this.init_uiins();
        }
        private on_load_error(err:string):void
        {
            //alert("ui load error err "+err);
            core.res_errlog("game_widget on_load_error ",err);
        }
        public on_init():void
        {

        }
        public on_show(flag:boolean):void
        {

        }
        public on_dispose():void
        {
            
        }
        public show(flag:boolean):void
        {
            if(this.m_b_show == flag){
                return;
            }
            this.m_b_show = flag;
            if(this.m_b_loaded == false)
            {
                if(!this.m_b_show){
                    core.core_tiplog("game_widget do not load when it is hiden");
                    return;
                }
                //
                if(this.m_res_path == null || this.m_res_path.length <= 0)
                {
                    core.core_tiplog("game_widget load error,invalided res path! ");
                    return;
                }
                if(this.m_ui_cls == null)
                {
                    core.core_tiplog("game_widget load error,invalided ui cls! ");
                    return;
                }
                if(this.m_b_loading){
                    core.core_tiplog("game_widget loading,return");
                    return;
                }
                //
                this.m_extra_res_list.push({url:this.m_res_path,type:Laya.Loader.ATLAS});
                for(let i of this.m_extra_res_list){
                    if(game_widget.s_res_dict.hasOwnProperty(i["url"])){
                        game_widget.s_res_dict[i["url"]] += 1;
                    }
                    else{
                        game_widget.s_res_dict[i["url"]] = 1;
                    }
                }
                //
                
                //
                this.load();
                return;
            }
            else
            {
                if(this.m_b_show)
                {
                    let view:laya.display.Sprite = utils.widget_ins().get_view(this.m_layer);
                    view.addChild(this.m_ui);
                }
                else
                {
                    this.m_ui.removeSelf();
                }
                this.on_show(this.m_b_show);
                if(this.m_b_show){
                    utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONSHOW,this);
                }
                else{
                    utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONHIDE,this);
                }
                
                if(!this.m_b_show){
                    utils.widget_ins().call_widget_hide(this);
                }
            }
        }
        public dispose():void
        {
            if(this.m_b_disposed)
            {
                return;
            }
            this.unregister_allevent();
            this.on_dispose();
             if(this.m_ui != null)
             {
                 this.m_ui.removeSelf();
                 this.m_ui.destroy();
                 this.m_ui = null;
             }
             if(this.m_b_loaded)
             {
                for(let i of this.m_extra_res_list){
                    if(game_widget.s_res_dict.hasOwnProperty(i["url"])){
                        game_widget.s_res_dict[i["url"]] -= 1;
                        if(game_widget.s_res_dict[i["url"]] <= 0){
                            core.res_tiplog("widget dispose release res ",game_widget.s_res_dict[i["url"]],i["url"]);
                            Laya.loader.clearTextureRes(i["url"]);
                            delete game_widget.s_res_dict[i["url"]];
                            //从内存里释放掉不需要去掉引用，下面这个缓存主要解决未下载资源的问题
                            //if(game_widget.s_loaded_dict.hasOwnProperty(i["url"])){
                            //    delete game_widget.s_loaded_dict[i["url"]];
                            //}
                        }
                    }
                }
             }
             if(this.m_b_loading){
                 utils.widget_ins().end_load(this);
                 Laya.loader.off(Laya.Event.ERROR,this,this.on_load_error);
             }
             this.m_b_loading = false;
             this.m_extra_res_list = null;
             this.m_ui_cls = null;
             this.m_res_path = null;
             this.m_b_loaded = false;
             this.m_b_disposed = true;
             this.m_b_show = false;
        }
    }
}