module core {
    export class renderobject extends laya.display.Sprite {
        private static S_RO_IDMAX = 1;
        public m_rc:rendercommand;
        public m_box:laya.maths.Rectangle;
        public m_obj_id:number;
        public m_data:any;
        constructor(){
            super();
            this.m_box = new laya.maths.Rectangle();
            this.m_rc = null;
            this.set_id();
        }
        public set_id():void{
            this.m_obj_id = this.get_obj_id();
        }
        public set_pos(x:number,y:number):void
        {
            this.x = x;
            this.y = y;
            this.m_box.setTo(this.x-this.m_box.width/2,this.y-this.m_box.height/2,this.m_box.width,this.m_box.height);
            this.m_rc.update_z();
        }
        public get set_x():number{
            return this.x;
        }
        public get set_y():number{
            return this.y;
        }
        public set set_x(value:number){
            this.x = value;
            this.m_box.setTo(this.x-this.m_box.width/2,this.y-this.m_box.height/2,this.m_box.width,this.m_box.height);
        }
        public set set_y(value:number){
            this.y = value;
            this.m_box.setTo(this.x-this.m_box.width/2,this.y-this.m_box.height/2,this.m_box.width,this.m_box.height);
            this.m_rc.update_z();
        }
        public set_scale(sx:number,sy:number):void{
            
        }
        private get_obj_id():number
        {
            return renderobject.S_RO_IDMAX++;
        }
        public dispose():void
        {
            this.removeSelf();
        }
        public update(delta:number):void
        {
            
        }
        public is_contain(x:number,y:number):boolean{
            return this.m_box.contains(x,y);
        }
        public project(context:rendercontext):boolean
        {
            if(context.m_camera.is_project(this.m_box))
            {
                context.m_render.addrc(this.m_rc);
                return true;
            };
            return false
        }
    }
}