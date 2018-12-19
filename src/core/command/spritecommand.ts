module core {
    export class spritecommand extends rendercommand{
        constructor(obj:renderobject = null){
            super(obj);
        }
        public update_z():void
        {
            this.m_screen_z = -100000000+this.m_obj.y;
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            let obj:rendersprite = this.m_obj as rendersprite;
            if(obj.m_b_upon_unit){
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
            else{
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
        }
    }
}