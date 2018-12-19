module core {
    export class rendermapslot extends renderobject {
        public m_mapid:number;
        public m_colnum:number;
        public m_rownum:number;
        public m_mat:mapslotmaterial;
        constructor(){
            super();
        }
        public re_init(mapid:number,x:number,y:number,colnum:number,rownum:number):void{
            this.set_id();
            this.m_mapid = mapid;
            this.m_rc = utils.getitembycls("mapslotcommand",mapslotcommand);
            this.m_rc.re_init(this);

            super.set_pos(x,y);
            this.m_colnum = colnum;
            this.m_rownum = rownum;
            
            this.m_mat = null;//only start to load when it is projected 
            this.m_box.setTo(this.x,this.y,matinfo_mgr().m_map_grid_w,matinfo_mgr().m_map_grid_h);
        }
        public project(context:rendercontext):boolean
        {
            let ret:boolean = super.project(context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if(ret)
            {
                //core.core_tiplog("rendermapslot project succeed ",this.x,this.y,this.m_box);
                if(this.m_mat == null)
                {
                    this.m_mat = mat_mgr().getmapslot(this.m_mapid,this.m_rownum,this.m_colnum);
                }
                this.addChild(this.m_mat.m_graphic);
            }
            else
            {
                //core.core_tiplog("rendermapslot project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null)
            {
                this.m_mat = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("mapslotcommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}