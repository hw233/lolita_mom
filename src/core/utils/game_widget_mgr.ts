module utils{
    //
    //
    export class ui_loadingUI extends laya.ui.Dialog {
		public m_logo:Laya.Image;
		public m_progress:Laya.Label;
		public m_logo_grey:Laya.Image;
		public m_ani:Laya.Animation;
        public m_mask:Laya.Sprite;
        private m_b_use_ani:boolean = true;
        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":800,"height":400,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"m_logo","skin":"bigpic/ui_loading.png","gray":false}},{"type":"Label","props":{"y":309,"x":326,"width":192,"var":"m_progress","height":88,"fontSize":50,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":0,"var":"m_logo_grey","skin":"bigpic/ui_loading.png","gray":true}},{"type":"Animation","props":{"y":231,"x":400,"width":0,"var":"m_ani","source":"game_ani/uiloading.ani","name":"m_ani","height":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui_loadingUI.uiView);

        }
        public init():void{
            this.m_mask = new Laya.Sprite();
            this.m_mask.x = 0;
            //this.addChild(this.m_mask);
            this.m_mask.graphics.drawRect(0,0,this.m_logo.width,this.m_logo.height,"#000000");
            //wechat should close
            //this.m_logo_grey.mask = this.m_mask;
        }
        public start():void{
            if(this.m_b_use_ani){
                this.m_logo.visible = false;
                this.m_logo_grey.visible = false;
                this.m_mask.visible = false;
                this.m_progress.visible = false;
                this.m_ani.play();
                this.m_ani.visible = true;
            }
            else{
                this.m_logo.visible = true;
                this.m_logo_grey.visible = true;
                this.m_mask.visible = true;
                this.m_progress.visible = true;
                this.m_ani.stop();
                this.m_ani.visible = false;

                this.m_mask.x = 0;
            }
            
        }
        public update():void{
            if(this.m_b_use_ani){
                return;
            }
            if(this.m_mask.x >= this.m_logo_grey.width){
                this.m_mask.x = 0;
            }
            else{
                this.m_mask.x += 2;
            }
        }

    }
    //
    /*
    export class ui_loadingUI extends laya.ui.Dialog {
		public m_logo:Laya.Image;
		public m_progress:Laya.Label;
		public m_logo_grey:Laya.Image;
        public m_mask:Laya.Sprite;
        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":800,"height":400,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"m_logo","skin":"bigpic/ui_loading.png","gray":false}},{"type":"Label","props":{"y":309,"x":326,"width":192,"var":"m_progress","height":88,"fontSize":50,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":0,"var":"m_logo_grey","skin":"bigpic/ui_loading.png","gray":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui_loadingUI.uiView);

        }
        public init():void{
            this.m_mask = new Laya.Sprite();
            this.m_mask.x = 0;
            //this.addChild(this.m_mask);
            this.m_mask.graphics.drawRect(0,0,this.m_logo.width,this.m_logo.height,"#000000");
            this.m_logo_grey.mask = this.m_mask;
        }
        public start():void{
            this.m_mask.x = 0;
        }
        public update():void{
            if(this.m_mask.x >= this.m_logo_grey.width){
                this.m_mask.x = 0;
            }
            else{
                this.m_mask.x += 2;
            }
        }
    }
    */
    //
    export class game_widget_mgr{
        private m_widget_class_map:Object = new Object();
        private m_widget_group_map:Object = new Object();
        private m_widget_map:Object = new Object();
        private m_root_view:laya.display.Sprite = null;
        private m_view_ins:game_widget_view = new game_widget_view();
        private m_release_dict:Object = new Object();
        private m_loading_ui:ui_loadingUI = null;
        private m_loadingui_dict:Object = new Object();
        private m_loadingui_refs:number = 0;
        constructor()
        {

        }
        public show_loadingui():void{
            if(this.m_loading_ui == null){
                this.m_loading_ui = new ui_loadingUI();
                this.m_loading_ui.init();
                this.m_loading_ui.x = (Laya.stage.width - this.m_loading_ui.width)>> 1;
                this.m_loading_ui.y = (Laya.stage.height - this.m_loading_ui.height)>>1;
            }
            this.m_loading_ui.visible = true;
            this.m_loading_ui.start();
            this.m_view_ins.m_view_topmost.addChild(this.m_loading_ui);
        }
        public hide_loadingui():void{
            if(this.m_loading_ui == null){
                return;
            }
            this.m_loading_ui.visible = false;
            this.m_loading_ui.removeSelf();
        }
        public update_loadingui():void{
            if(this.m_loading_ui == null || this.m_loading_ui.visible == false){
                return;
            }
            this.m_loading_ui.update();
        }
        public del_loadingui():void{
            if(this.m_loading_ui != null){
                this.m_loading_ui.removeSelf();
                this.m_loading_ui.destroy();
                this.m_loading_ui = null;
            }
        }
        public start_load(uiins:game_widget):void{
            if(this.m_loadingui_dict.hasOwnProperty(uiins.m_id.toString()) == false){
                this.m_loadingui_dict[uiins.m_id.toString()] = true;
                this.m_loadingui_refs += 1;
                this.show_loadingui();
            }
        }
        public end_load(uiins:game_widget):void{
            if(this.m_loadingui_dict.hasOwnProperty(uiins.m_id.toString())){
                delete this.m_loadingui_dict[uiins.m_id.toString()];
                this.m_loadingui_refs -= 1;
                if(this.m_loadingui_refs <= 0){
                    this.hide_loadingui();
                }
            }
        }
        public add_preload_res(path:string):void{
            game_widget.s_loaded_dict[path] = true;
        }
        public set_root(sp:laya.display.Sprite):void
        {
            this.m_view_ins.removeSelf();
            this.m_root_view = sp;
            this.m_root_view.addChild(this.m_view_ins);
        }
        public get_view(layer:WIDGET_LAYER):laya.display.Sprite
        {
            return this.m_view_ins.get_view(layer);
        }
        public register_widget(name:string,widget_cls:any,w_group:WIDGET_GROUP = WIDGET_GROUP.GROUP_DEFAULT):void
        {
            this.m_widget_class_map[name] = widget_cls;
            this.m_widget_group_map[name] = w_group;
        }
        public set_widget_group(name:string,w_group:WIDGET_GROUP):void{
            this.m_widget_group_map[name] = w_group;
        }
        public get_module(name:string):game_widget
        {
            if(this.m_widget_map.hasOwnProperty(name))
            {
                return this.m_widget_map[name];
            }
            if(this.m_widget_class_map.hasOwnProperty(name))
            {
                let m_cls = this.m_widget_class_map[name];
                let m:game_widget = new m_cls();
                //m.load();
                this.m_widget_map[name] = m;
                m.m_widget_name = name;
                return m;
            }
            return null;
        }
        public show_widget(widget_name:string,flag:boolean,ud:any = null):void
        {
            let w:game_widget = this.get_module(widget_name);
            if(w != null)
            {
                if(ud != null){
                    w.m_ud = ud;
                }
                w.show(flag);
                if(!flag){
                    this.m_release_dict[widget_name] = [w,utils.get_render_milltm()];
                }
                else{
                    delete this.m_release_dict[widget_name];
                }
            }
        }
        public call_widget_hide(w:game_widget):void{
            this.m_release_dict[w.m_widget_name] = [w,utils.get_render_milltm()];
        }
        public check_release():void{
            this.update_loadingui();
            for(let k of Object.keys(this.m_release_dict)){
                if(this.m_release_dict.hasOwnProperty(k)){
                    let tm:number = this.m_release_dict[k][1];
                    if((utils.get_render_milltm() - tm) > 10*1000){
                        let m:game_widget = this.m_widget_map[k];
                        utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONDISPOSE,m);
                        m.dispose();
                        delete this.m_widget_map[k];
                        delete this.m_release_dict[k];
                        core.core_errlog("game_widget_mgr release ",k);
                        return;
                    }
                }
            }
        }
        public show_widget_bygroup(v:WIDGET_GROUP,flag:boolean,ud:any = null):void{
            for(let k in this.m_widget_group_map){
                if(this.m_widget_group_map.hasOwnProperty(k)){
                    let w_v:WIDGET_GROUP = this.m_widget_group_map[k];
                    if(v == w_v){
                        this.show_widget(k,flag,ud);
                    }
                }
            }
        }
        public is_widget_show(widget_name:string):boolean
        {
            let w:game_widget = this.get_module(widget_name);
            if(w != null)
            {
                return w.m_b_show;
            }
            return false;
        }
        public dispose()
        {
            this.del_loadingui();
            this.m_widget_class_map = new Object();
            utils.event_ins().fire_event(game_event.EVENT_WIDGET_ALLDISPOSE);
            for(let i of Object.keys(this.m_widget_map))
            {
                let m:game_widget = this.m_widget_map[i];
                m.dispose();
            }
            if(this.m_view_ins != null)
            {
                this.m_view_ins.removeSelf();
                this.m_view_ins.dispose();
                this.m_view_ins = null;
            }
            this.m_root_view = null;
            this.m_widget_map = new Object();
            this.m_widget_group_map = new Object();
        }
    }

    let g_ins:game_widget_mgr = null;
    export function widget_ins():game_widget_mgr
    {
        if(g_ins == null)
        {
            g_ins = new game_widget_mgr();
        }
        return g_ins;
    }
}