module core{
    export class renderspcontent extends laya.display.Sprite{
        public m_w:number = 0;
        public m_h:number = 0;
        constructor(){
            super();
        }
        public update(delta:number):void
        {
        }
        //从parent里把自己移除?
        public dispose():void
        {
        }
        public selfremove():void{

        }
    }
}