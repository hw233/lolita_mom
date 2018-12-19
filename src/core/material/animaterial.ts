module core {
    
    export class animaterial extends material {
        public m_graphic:laya.display.Animation;
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
        private ani_index_pad(index:number,pad_num:number):string
        {
            let ret:string = index.toString();
            let count:number = ret.length;
            while(count < pad_num)
            {
                ret = "0"+ret;
                count++;
            }
            return ret;
        }
        private aniUrls(aniName:string,pre:string,pad_num:number,length:number):any
        {
            var urls:any = [];
            
            for(var i:number = 0;i<length;i++){
                //动画资源路径要和动画图集打包前的资源命名对应起来
                urls.push(aniName+pre+this.ani_index_pad(i,pad_num)+".png");
            }
            return urls;
        }
        public load_res():void{
            this.loadres(matinfo_mgr().getanitexprefix(this.m_ani_id),"0",4,matinfo_mgr().getaniframecount(this.m_ani_id));
        }
        public loadres(anipre:string,pre:string,pad_num:number,length:number):void
        {
            this.m_graphic.loadImages(this.aniUrls(anipre,pre,pad_num,length));
            this.m_ready = true;
            this.m_graphic.play();
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
            this.m_graphic.clear();
            this.m_ready = false;
        }
        public dispose():void
        {
            this.m_graphic.clear();
            this.m_graphic = null;
        }
        
        public update(delta:number):void
        {
            
        }
    }
}