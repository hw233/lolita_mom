module core {
    export class avatarcommand extends rendercommand{
        constructor(obj:renderobject = null){
            super(obj);
        }
        public update_z():void
        {
            this.m_screen_z = -400000000+this.m_obj.y;//;
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            context.m_view.m_unitView.addChild(this.m_obj);
        }
        public is_contain(x:number,y:number):boolean{
            return this.m_obj.is_contain(x,y);
        }
    }
    export class avatarcommand_new extends rendercommand{
        private m_a:renderavatar;
        constructor(obj:renderobject = null){
            super(obj);
            this.m_a = obj as renderavatar;
        }
        public re_init(obj:renderobject){
            super.re_init(obj);
            this.m_a = obj as renderavatar;
        }
        public update_z():void
        {
            this.m_screen_z = -400000000+this.m_obj.y;//;
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            context.m_view.m_unitView.addChild(this.m_obj);
            if(this.m_obj.alpha > 0){
                let x:number = this.m_obj.x+this.m_a.m_dx;
                let y:number = this.m_obj.y+this.m_a.m_dy;
                //this.m_a.m_sp_back.x = x;
                //this.m_a.m_sp_back.y = y;
                if(this.m_a.m_aura_adorn != null){
                    this.m_a.m_aura_adorn.draw2sp(context.m_view.m_unitground_View,x,y,false);
                }
                //context.m_view.m_unitground_View.addChild(this.m_a.m_sp_back);
                if(this.m_a.m_title_adorn != null){
                    this.m_a.m_title_adorn.draw2sp(context.m_view.m_unitfront_View,x,y);
                }
                if(this.m_a.m_shadow_sp != null){
                    context.m_view.m_unitshadow_View.graphics.drawTexture(this.m_a.m_shadow_sp,x-50,y-35);
                }

                if(this.m_a.m_name.length > 0){
                    context.m_view.m_unitname_View.graphics.fillBorderText(this.m_a.m_name,x+this.m_a.m_name_dx,y+25+this.m_a.m_name_dy,"22px h5font","#65ff65","#19591c",2,"center");
                }
            }
            
        }
        public is_contain(x:number,y:number):boolean{
            if(this.m_obj == null){
                return false;
            }
            return this.m_obj.is_contain(x,y);
        }
    }
}