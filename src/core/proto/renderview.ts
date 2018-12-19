module core {
    export class renderview extends laya.display.Sprite {
        public m_map_mask:Laya.Sprite;
        public m_mapView:laya.display.Sprite;
        public m_ani_underunit_View:laya.display.Sprite;
        public m_unitshadow_View:Laya.Sprite;
        public m_unitname_View:Laya.Sprite;
        public m_unitground_View:Laya.Sprite;
        public m_unitView:laya.display.Sprite;
        public m_unitfront_View:Laya.Sprite;
        public m_ani_uponunit_view:laya.display.Sprite;
        public m_screeneffect_view:Laya.Sprite;
        constructor(){
            super();
            
            
            this.m_mapView = new laya.display.Sprite();
            this.addChild(this.m_mapView);

            this.m_map_mask = new Laya.Sprite();
            this.m_map_mask.graphics.drawRect(0,0,3000,3000,"#000000");
            this.m_map_mask.alpha = 0.3;
            //this.addChild(this.m_map_mask);

            this.m_screeneffect_view = new Laya.Sprite();
            this.addChild(this.m_screeneffect_view);

            this.m_ani_underunit_View = new laya.display.Sprite();
            this.addChild(this.m_ani_underunit_View);

            this.m_unitshadow_View = new Laya.Sprite();
            this.addChild(this.m_unitshadow_View);
            this.m_unitname_View = new Laya.Sprite();
            this.addChild(this.m_unitname_View);
            this.m_unitground_View = new Laya.Sprite();
            this.addChild(this.m_unitground_View);

            this.m_unitView = new laya.display.Sprite();
            this.addChild(this.m_unitView);

            this.m_unitfront_View = new Laya.Sprite();
            this.addChild(this.m_unitfront_View);

            this.m_ani_uponunit_view = new laya.display.Sprite();
            this.addChild(this.m_ani_uponunit_view);
        }
        public renderbefore():void
        {
            this.m_mapView.graphics.clear();
            this.m_mapView.removeChildren();

            this.m_ani_underunit_View.graphics.clear();
            this.m_ani_underunit_View.removeChildren();

            this.m_unitshadow_View.removeChildren();
            this.m_unitshadow_View.graphics.clear();

            this.m_unitname_View.removeChildren();
            this.m_unitname_View.graphics.clear();

            this.m_unitground_View.graphics.clear();
            this.m_unitground_View.removeChildren();

            this.m_unitView.graphics.clear();
            this.m_unitView.removeChildren();

            this.m_unitfront_View.graphics.clear();
            this.m_unitfront_View.removeChildren();

            this.m_ani_uponunit_view.graphics.clear();
            this.m_ani_uponunit_view.removeChildren();
        }
        public blackscreen(tm:number):void{
            if(this.m_screeneffect_view != null){
                Laya.Tween.clearAll(this.m_screeneffect_view);
                this.m_screeneffect_view.graphics.clear();
                this.m_screeneffect_view.graphics.drawRect(-500,-500,3000,3000,'#000000');
                this.m_screeneffect_view.alpha = 0;
                Laya.Tween.to(this.m_screeneffect_view,{alpha:1},tm,Laya.Ease.linearIn,Laya.Handler.create(this,this.blackreset,[1000]));
            }
        }
        public blackreset(tm:number):void{
            if(this.m_screeneffect_view != null){
                Laya.Tween.clearAll(this.m_screeneffect_view);
                Laya.Tween.to(this.m_screeneffect_view,{alpha:0},tm,Laya.Ease.linearIn,Laya.Handler.create(this,this.resetscreenview));
            }
        }
        public resetscreenview():void{
            if(this.m_screeneffect_view != null){
                Laya.Tween.clearAll(this.m_screeneffect_view);
                this.m_screeneffect_view.graphics.clear();
            }
        }
        public renderafter():void
        {

        }
        public update(delta:number):void
        {

        }
        public show_map_mask(flag:boolean,alpha:number = 0.3):void{
            this.m_map_mask.alpha = alpha;
            if(flag){
                this.addChildAt(this.m_map_mask,1);
            }
            else{
                this.removeChild(this.m_map_mask);
            }
        }
        public project(context:rendercontext):void
        {
            let cx:number = context.m_camera.x;
            let cy:number = context.m_camera.y;
            this.x = (context.m_camera.width>>1)-cx;
            this.y = (context.m_camera.height>>1)-cy;
            this.m_map_mask.x = context.m_camera.x - (context.m_camera.width>>1);
            this.m_map_mask.y = context.m_camera.y - (context.m_camera.height>>1);
            //this.x = -cx;
            //this.y = -cy;
            //core.core_tiplog("renderview project ",this.x,this.y,cx,cy,context.m_camera.width,context.m_camera.height);
        }
        public get_mapviewport_canvas(context:rendercontext,w:number,h:number):Laya.HTMLCanvas{
            return this.m_mapView.drawToCanvas(w,h,0,0);
        }
        public dispose():void
        {
            this.removeChildren();
            this.m_screeneffect_view = null;
            this.m_map_mask = null;
            this.m_mapView = null;
            this.m_unitshadow_View = null;
            this.m_unitname_View = null;
            this.m_unitground_View = null;
            this.m_unitView = null;
            this.m_unitfront_View = null;
            this.m_ani_underunit_View = null;
            this.m_ani_uponunit_view = null;
        }
    }
}