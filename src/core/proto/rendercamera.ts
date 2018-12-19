module core {
    export class rendercamera extends laya.maths.Rectangle {
        private m_tween:laya.utils.Tween = null;
        private m_dst:laya.maths.Point = new laya.maths.Point();
        public m_viewport:laya.maths.Rectangle = new laya.maths.Rectangle();
        constructor(){
            super();
        }
        public dispose():void
        {
        }
        public update(delta:number):void
        {
            
        }
        public project(context:rendercontext):void
        {
            //core.core_tiplog("renderview project ",this.x,this.y,cx,cy,context.m_camera.width,context.m_camera.height);
            this.m_viewport.setTo(this.x - (this.width>>1),this.y - (this.height>>1),this.width,this.height);
        }
        public is_project(rt:laya.maths.Rectangle):boolean
        {
            return this.m_viewport.intersects(rt);
        }
        public set_pos(dx:number,dy:number,force:boolean = true):void
        {
            if(this.m_dst.x == dx && this.m_dst.y == dy)
            {
                return;
            }
            this.m_dst.setTo(dx,dy);
            if(this.m_tween != null)
            {
                laya.utils.Tween.clear(this.m_tween);
                this.m_tween = null;
            }
            if(force)
            {
                this.setTo(dx,dy,this.width,this.height);
            }
            else
            {
                laya.utils.Tween.to(this,{x:dx,y:dy},500,Laya.Ease.cubicOut,null,0,true,true);
            }
        }
    }
}