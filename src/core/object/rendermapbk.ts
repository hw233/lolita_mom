module core {
    export class rendermapbk extends renderobject {
        public m_mat:mapbkmaterial;
        constructor(){
            super();
            this.re_init();
        }
        public re_init():void{
            this.m_mat = null;
            this.m_rc = utils.getitembycls("mapbkcommand",mapbkcommand);
            this.m_rc.re_init(this);
        }
        public setres(res:string):void
        {
            if(this.m_mat != null)
            {
                mat_mgr().delmapbkres(this.m_mat);
            }
            this.m_mat = mat_mgr().getmapbkres(res);
            this.removeChildren();
            this.addChild(this.m_mat.m_graphic);
        }
        public setsp(sp:Laya.Sprite):void{
            this.addChild(sp);
        }
        public clearsp():void{
            this.removeChildren();
        }
        public project(context:rendercontext):boolean
        {
            context.m_render.addrc(this.m_rc);
            return true;
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null)
            {
                mat_mgr().delmapbkres(this.m_mat);
                this.m_mat = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("mapbkcommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}