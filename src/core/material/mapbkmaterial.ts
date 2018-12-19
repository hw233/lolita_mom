module core {
    export class mapbkmaterial extends material {
        public m_graphic:laya.display.Sprite;
        constructor(){
            super();
            this.m_graphic = new laya.display.Sprite();
        }
        public re_init(respath:string){
            this.m_mat_res = respath;
        }
        public load_res():void{
            this.m_graphic.graphics.clear();
            this.m_graphic.loadImage(this.m_mat_res);
        }
        public clear(){
            this.m_graphic.graphics.clear();
        }
        public dispose():void
        {
            this.m_graphic.graphics.clear();
            this.m_graphic = null;
        }
        public update(delta:number):void
        {
            
        }
    }
}