module core {
    export class rendercommand {
        public m_obj:renderobject;
        public m_screen_z:number;
        constructor(obj:renderobject){
            this.re_init(obj);
        }
        public re_init(obj:renderobject){
            this.m_obj = obj;
            if(this.m_obj != null){
                this.update_z();
            }
            
        }
        public update_z():void
        {
            this.m_screen_z = this.m_obj.y;
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            let view = context.m_view.m_unitView;
            view.addChild(this.m_obj);
        }
        public is_contain(x:number,y:number):boolean{
            return false;
        }
    }
}