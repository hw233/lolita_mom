module core {
    export class mapblockcommand extends rendercommand{
        constructor(obj:renderobject = null){
            super(obj);
        }
        public update_z():void
        {
            this.m_screen_z = -1000000000;//must be the bottom;
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            let view = context.m_view.m_ani_underunit_View;
            view.addChild(this.m_obj);
        }
    }
}