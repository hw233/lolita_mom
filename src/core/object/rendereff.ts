module core {
    export class rendereff extends renderobject {
        public m_aniid:number;
        public m_mat:effmaterial;
        public m_aw:number;
        public m_ah:number;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        public m_framecurrenttm:number = 0;
        public m_b_loop:boolean = true;
        public m_b_end:boolean = false;
        public m_b_autodel:boolean = false;
        constructor(){
            super();
        }
        public re_init(aniid:number,x:number,y:number,underunit:boolean = true,autodel:boolean = false):void{
            this.set_id();
            this.m_aniid = aniid;
            this.m_rc = utils.getitembycls("effcommand",effcommand);
            this.m_rc.re_init(this);

            super.set_pos(x,y);
            this.m_data = underunit;
            
            this.m_mat = null;//only start to load when it is projected 
            this.m_aw = matinfo_mgr().geteffw(this.m_aniid);
            this.m_ah = matinfo_mgr().geteffh(this.m_aniid);
            this.m_framecount = matinfo_mgr().geteffframecount(this.m_aniid);
            this.m_framespeed = matinfo_mgr().geteffframespeed(this.m_aniid);
            this.m_b_loop = matinfo_mgr().geteffcycle(this.m_aniid);
            this.m_b_autodel = autodel;
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;
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
                    this.m_mat = mat_mgr().geteffmat(this.m_aniid);
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
            if(this.m_b_end){
                return;
            }
            this.m_framecurrenttm += delta;
            if(this.m_framecurrenttm >= this.m_frametotalmillsec){
                if(this.m_b_autodel){
                    this.m_b_end = true;
                    return;
                }
                if(this.m_b_loop == false){
                    this.m_b_end = true;
                    return;
                }
            }
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
                mat_mgr().deleffmat(this.m_mat);
                this.m_mat = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("effcommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}