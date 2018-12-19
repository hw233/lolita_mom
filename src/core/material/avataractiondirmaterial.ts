module core {
    export class avataractiondirmaterial extends material {
        public m_graphic:laya.display.Animation;
        public m_ready:boolean = false;
        public m_dir:number = 0;
        constructor(){
            super();
            this.m_graphic = new laya.display.Animation();
        }
        public re_init():void{
            this.m_graphic.clear();
            this.m_ready = false;            
        }
        public get_rect():Laya.Rectangle{
            let ret:Laya.Rectangle = null;
            if(this.m_ready){
                ret = this.m_graphic.getGraphicBounds(true);
            }
            return ret;
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
                //core.core_tiplog("avataractiondirmaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
                //this.m_graphic.graphics.clear();
                //this.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");
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