module core {
    export class rendersprite extends renderobject {
        public m_sprite:renderspcontent = null;
        public m_b_upon_unit:boolean = true;
        constructor(){
            super();
        }
        
        public re_init(sp:renderspcontent,x:number,y:number,b_upon:boolean = true){
            this.set_id();
            this.m_b_upon_unit = b_upon;
            this.m_sprite = sp;
            this.removeChildren();
            if(this.m_sprite != null){
                this.addChild(this.m_sprite);
            }
            this.m_rc = utils.getitembycls("spritecommand",spritecommand);
            this.m_rc.re_init(this);
            super.set_pos(x,y);
            
            this.m_box.setTo(this.x-sp.m_w/2,this.y-sp.m_h/2,sp.m_w,sp.m_h);
        }
        public project(context:rendercontext):boolean
        {
            let ret:boolean = super.project(context);
            return ret;
        }
        public update(delta:number):void
        {
            if(this.m_sprite != null){
                this.m_sprite.update(delta);
            }
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_sprite != null){
                this.m_sprite.selfremove();
                //utils.recover("renderspcontent",this.m_sprite);
            }
            this.m_sprite = null;
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("spritecommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}