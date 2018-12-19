module core {
    export class mapslotmaterial extends material {
        public m_graphic:laya.display.Sprite = null;
        public m_tex:Laya.Texture = null;
        public m_res_path:string = null;
        public m_map_id:number = 0;
        public m_grid_w:number = 0;
        public m_grid_h:number = 0;
        constructor(){
            super();
            this.m_graphic = new laya.display.Sprite();
        }
        public init():void{
            this.m_tex = null;
        }
        public clear():void{
            this.m_graphic.graphics.clear();
            this.m_tex = null;
        }
        public dispose():void
        {
            this.m_tex = null;
            this.m_graphic.graphics.clear();
            this.m_graphic = null;
        }
        public update(delta:number):void
        {
            
        }
    }
}