module core {
    export class rendermapblock extends renderobject {
        public m_mat:mapblock;
        constructor(){
            super();
            this.re_init();
        }
        public re_init():void{
            this.m_mat = utils.getitembycls("mapblock",mapblock);
            this.m_mat.re_init();
            this.addChild(this.m_mat.m_graphic);
            this.m_rc = utils.getitembycls("mapblockcommand",mapblockcommand);
            this.m_rc.re_init(this);
        }
        public setmapid(mapid:number):void
        {
            mat_mgr().getmapblock(this.m_mat,mapid);
        }
        public project(context:rendercontext):boolean
        {
            if(this.m_mat != null && this.m_mat.m_init_sp == false)
            {
                this.m_mat.get_block_sp();
            }
            context.m_render.addrc(this.m_rc);
            return true;
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null)
            {
                this.m_mat.dispose();
                utils.recover("mapblock",this.m_mat);
                this.m_mat = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("mapblockcommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}