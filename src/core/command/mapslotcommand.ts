module core {
    export class mapslotcommand extends rendercommand{
        constructor(obj:renderobject = null){
            super(obj);
        }
        public update_z():void
        {
            this.m_screen_z = -1000000000+this.m_obj.y;//;
        }
        public dispose():void
        {
            this.m_obj = null;
        }
        public render(context:rendercontext):void
        {
            let view = context.m_view.m_mapView;
            let mapslot:rendermapslot = this.m_obj as rendermapslot;
            if(mapslot.m_mat != null && mapslot.m_mat.m_tex != null){
                view.graphics.drawTexture(mapslot.m_mat.m_tex,mapslot.x,mapslot.y);
            }
            
            //view.addChild(this.m_obj);
        }
    }
}