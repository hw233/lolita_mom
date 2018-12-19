module core {
    export class rendercontext {
        public m_render:renderimpl;
        public m_camera:rendercamera;
        public m_view:renderview;
        public m_walk_speed:number = 300;
        public m_run_speed:number = 8000;
        constructor(){
        }
        public get_move_spd(b_run:boolean):number{
            if(b_run){
                return this.m_run_speed;
            }
            return this.m_walk_speed;
        }
        public dispose():void
        {
            this.m_render = null;
            this.m_camera = null;
            this.m_view = null;
        }
    }
}