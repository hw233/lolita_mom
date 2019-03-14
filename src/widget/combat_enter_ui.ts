module widget{
    export class combat_enter_ui extends utils.game_widget{
        private m_sp_top:Laya.Sprite = null;
        private m_sp_bottom:Laya.Sprite = null;
        private m_htmlcavas:Laya.HTMLCanvas = null;
        private m_htmltexture:Laya.Texture = null;
        constructor()
        {
            super("res/atlas/ui.atlas",ui.game.combat_enterUI);
            
            this.m_layer = utils.WIDGET_LAYER.TOP;
        }
        public on_init():void
        {
            this.m_sp_top = new Laya.Sprite();
            this.m_sp_bottom = new Laya.Sprite();
            this.m_ui.addChild(this.m_sp_top);
            this.m_ui.addChild(this.m_sp_bottom);
        }
        private _init_sp():void{
            if(this.m_sp_top == null){
                this.m_sp_top = new Laya.Sprite();
                this.m_ui.addChild(this.m_sp_top);
            }
            if(this.m_sp_bottom == null){
                this.m_sp_bottom = new Laya.Sprite();
                this.m_ui.addChild(this.m_sp_bottom);
            }
            if(this.m_htmlcavas != null){
                this.m_htmlcavas.destroy();
                this.m_htmltexture.destroy(true);
                this.m_htmlcavas = null;
                this.m_htmltexture = null;
            }
        }
        private _clear_sp():void{
            this.m_ui.removeChildren();
            if(this.m_sp_top != null)
            {
                Laya.Tween.clearAll(this.m_sp_top);
                this.m_sp_top.graphics.clear();
                this.m_sp_top.destroy(true);
            }
            if(this.m_sp_bottom != null){
                Laya.Tween.clearAll(this.m_sp_bottom);
                this.m_sp_bottom.graphics.clear();
                this.m_sp_bottom.destroy(true);
            }
            this.m_sp_top = null;
            this.m_sp_bottom = null;
            if(this.m_htmlcavas != null){
                this.m_htmlcavas.clear();
                this.m_htmlcavas.releaseResource(true);//important func
                this.m_htmlcavas.destroy();
                this.m_htmltexture.destroy(true);
                this.m_htmlcavas = null;
                this.m_htmltexture = null;
            }
        }
        public on_show(flag:boolean):void
        {
            if(flag)
            {
                this._init_sp();                
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                let main_ins:game.game_main = game.get_module(module_enum.MODULE_MAIN) as game.game_main;
                let render:core.renderagent = main_ins.get_render();
                let hc:Laya.HTMLCanvas = null;//main_ins.get_scene_screen();
                let uiins:ui.game.combat_enterUI = this.m_ui as ui.game.combat_enterUI;
                let tx:Laya.Texture = new Laya.Texture(hc);
                this.m_htmlcavas = hc;
                this.m_htmltexture = tx;

                let sd_wh:Object = helper.get_design_wh();
                let sd_w:number = sd_wh['w'];
                let sd_h:number = sd_wh['h'];

                let designwh:Object = helper.get_design_wh();

                let designw:number = designwh['w'];
                let designh:number = designwh['h'];

                this.m_sp_top.graphics.drawRect(0,0,designw,designh/2,"#000000");
                this.m_sp_bottom.graphics.drawRect(0,0,designw,designh/2,"#000000");
                this.m_sp_top.graphics.fillTexture(tx,0,0,designw,designh/2,"no-repeat",new Laya.Point(0,0));
                this.m_sp_bottom.graphics.fillTexture(tx,0,0,designw,designh/2,"no-repeat",new Laya.Point(0,designh/2));

                this.m_sp_top.x = 0;
                this.m_sp_bottom.x = 0;
                this.m_sp_top.y = 0;
                this.m_sp_bottom.y = designh/2;
                Laya.Tween.to(this.m_sp_top,{x:-designw},800,Laya.Ease.linearIn,Laya.Handler.create(this,this.show,[false]));
                Laya.Tween.to(this.m_sp_bottom,{x:designw},800,Laya.Ease.linearIn);
            }
            else
            {
                this.unregister_allevent();
                this._clear_sp();
            }
        }
        
        public on_dispose():void
        {
            if(this.m_sp_top != null){
                Laya.Tween.clearAll(this.m_sp_top);
                this.m_sp_top.graphics.clear();
                this.m_sp_top = null;
            }
            if(this.m_sp_bottom != null){
                Laya.Tween.clearAll(this.m_sp_bottom);
                this.m_sp_bottom.graphics.clear();
                this.m_sp_bottom = null;
            }
        }
        public dispose()
        {
            super.dispose();
        }
        
    }
}