module core {
    export class anicommand extends rendercommand{
        constructor(obj:renderobject = null){
            super(obj);
        }
        public update_z():void
        {
            if(this.m_obj.m_data == true)
            {
                this.m_screen_z = -500000000+this.m_obj.y;//;
            }
            else
            {
                this.m_screen_z = -100000000+this.m_obj.y;
            }
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            if(this.m_obj.m_data == true)
            {
                //core.core_tiplog("anicommand render true");
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
            else
            {
                //core.core_tiplog("anicommand render false");
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
        }
    }
}