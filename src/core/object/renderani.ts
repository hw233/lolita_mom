module core {
    export class renderani extends renderobject {
        public m_aniid:number;
        public m_mat:animaterial;
        public m_aw:number;
        public m_ah:number;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_framecurrenttm:number = 0;
        constructor(){
            super();
        }
        public re_init(aniid:number,x:number,y:number,underunit:boolean = true):void{
            this.set_id();
            this.m_aniid = aniid;
            this.m_rc = utils.getitembycls("anicommand",anicommand);
            this.m_rc.re_init(this);
            
            super.set_pos(x,y);
            this.m_data = underunit;
            
            this.m_mat = null;//only start to load when it is projected 
            this.m_aw = matinfo_mgr().getaniw(this.m_aniid);
            this.m_ah = matinfo_mgr().getanih(this.m_aniid);
            this.m_framecount = matinfo_mgr().getaniframecount(this.m_aniid);
            this.m_framespeed = matinfo_mgr().getaniframespeed(this.m_aniid);
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_box.setTo(this.x-this.m_aw/2,this.y-this.m_ah/2,this.m_aw,this.m_ah);
        }
        public project(context:rendercontext):boolean
        {
            let ret:boolean = super.project(context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if(ret)
            {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if(this.m_mat == null)
                {
                    this.m_mat = mat_mgr().getanimat(this.m_aniid);
                    this.addChild(this.m_mat.m_graphic);
                }
            }
            else
            {
                //core.core_tiplog("renderani project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        }
        public update(delta:number):void
        {
            this.m_framecurrenttm += delta;
            let framecount:number = Math.floor(this.m_framecurrenttm/this.m_framemillsec);
            this.m_framecurrent = framecount%this.m_framecount;
            if(this.m_mat != null)
            {
                this.m_mat.goto_frame(this.m_framecurrent);
            }
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null)
            {
                mat_mgr().delanimat(this.m_mat);
                this.m_mat = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("anicommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}