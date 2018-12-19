module core {
    export class effmaterial extends material {
        public m_graphic:laya.display.Animation;
        public m_ani_path:string = null;
        public m_res_path:string = null;
        public m_ani_id:number = 0;
        public m_ready:boolean = false;
        constructor(){
            super();
            this.m_graphic = new laya.display.Animation();
        }
        public re_init():void{
            this.m_mat_res = "";
        }
        public load_res():void{
            this.loadres(matinfo_mgr().geteffname(this.m_ani_id),matinfo_mgr().geteffcycle(this.m_ani_id));
        }
        public loadres(name:string,cycle:boolean):void
        {
            if(this.m_graphic == null){
                return;
            }
            this.m_graphic.loadAnimation(this.m_ani_path);
            this.m_ready = true;
            this.m_graphic.play(0,cycle,name);
            this.m_graphic.gotoAndStop(0);
        }
        public goto_frame(frame:number):void
        {
            if(this.m_ready)
            {
                //core.core_tiplog("animaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
            }
        }
        public clear():void{
            if(this.m_graphic){
                this.m_graphic.clear();
            }
            this.m_ready = false;
        }
        public dispose():void
        {
            if(this.m_graphic){
                this.m_graphic.clear();
                this.m_graphic = null;
            }
            this.m_ready = false;
        }
        
        public update(delta:number):void
        {
            
        }
    }
}