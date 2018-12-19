module core {
    function render_sort(a,b){
        return a.m_screen_z - b.m_screen_z;//a - b small 2 big;b - a big 2 small
    }
    export class renderimpl {
        public m_camera:rendercamera;
        public m_view:renderview;
        public m_scene:renderscene;
        public m_renderrcs:Array<rendercommand>;
        public m_context:rendercontext;
    
        public m_world_rect:laya.maths.Rectangle;
        public m_eye:renderavatar = null;
        public m_eye_tm:number = 0;
        constructor(){
            this.m_camera = new rendercamera();
            this.m_view = new renderview();
            this.m_scene = new renderscene();
            this.m_renderrcs = new Array<rendercommand>();
            this.m_context = new rendercontext();

            this.m_context.m_camera = this.m_camera;
            this.m_context.m_render = this;
            this.m_context.m_view = this.m_view;
            this.m_world_rect = new laya.maths.Rectangle();
        }
        public initstage(sp:laya.display.Sprite):void
        {
            this.m_view.removeSelf();
            sp.addChild(this.m_view);
        }
        public setworldwh(w:number,h:number):void
        {
            this.m_world_rect.setTo(0,0,w,h);
        }
        public getworldw():number
        {
            return this.m_world_rect.width;
        }
        public getworldh():number
        {
            return this.m_world_rect.height;
        }
        public set_eye(unit:renderavatar):void
        {
            this.m_eye = unit;
        }
        //new start
        public _get_renderavatar_ins(shape:number,x:number,y:number,use_default:boolean = true):renderavatar{
            let ret:renderavatar = utils.getitembycls("renderavatar",renderavatar);
            ret.re_init(shape,x,y,use_default);
            
            return ret;
        }
        public _del_renderavatar_ins(ins:renderavatar):void{
            ins.dispose();
            utils.recover("renderavatar",ins);
        }
        public _get_rendereff_ins(aniid:number,x:number,y:number,underunit:boolean,autodel:boolean):rendereff{
            let ret:rendereff = utils.getitembycls("rendereff",rendereff);
            ret.re_init(aniid,x,y,underunit,autodel);
            
            return ret;
        }
        public _del_rendereff_ins(ins:rendereff):void{
            ins.dispose();
            utils.recover("rendereff",ins);
        }
        public _get_renderani_ins(aniid:number,x:number,y:number,underunit:boolean):renderani{
            let ret:renderani = utils.getitembycls("renderani",renderani);
            ret.re_init(aniid,x,y,underunit);
            return ret;
        }
        public _del_renderani_ins(ins:renderani):void{
            ins.dispose();
            utils.recover("renderani",ins);
        }
        public _get_rendersprite_ins(sp:renderspcontent,x:number,y:number,b_unit_front:boolean = true):rendersprite{
            let ret:rendersprite = utils.getitembycls("rendersprite",rendersprite);
            ret.re_init(sp,x,y,b_unit_front);
            return ret;
        }
        public _del_rendersprite_ins(ins:rendersprite):void{
            ins.dispose();
            utils.recover("rendersprite",ins);
        }
        //end
        public update_camera_pos(delta:number):void
        {
            if(this.m_eye != null)
            {
                this.m_eye_tm += delta;
                if(this.m_eye_tm > 0)
                {
                    this.m_eye_tm = 0;
                    this.setcamerapos(this.m_eye.x,this.m_eye.y,true);
                }
            }
        }
        public setcamerapos(x:number,y:number,force:boolean = true):void
        {
            let min_x:number = 0;
            let max_x:number = 0;
            let min_y:number = 0;
            let max_y:number = 0;
            if(this.getviewportw() >= this.getworldw()){
                x = this.getworldw()>>1;
            }
            else{
                min_x = (this.getviewportw()>>1);
                if(x < min_x)
                {
                    x = min_x;
                }
                max_x = this.getworldw()-(this.getviewportw()>>1);
                if(x > max_x)
                {
                    x = max_x;
                }
            }
            if(this.getviewporth() >= this.getworldh()){
                y = this.getworldh()>>1;
            }
            else{
                min_y = (this.getviewporth()>>1);
                if(y < min_y)
                {
                    y = min_y;
                }
                max_y = this.getworldh()-(this.getviewporth()>>1);
                if(y > max_y)
                {
                    y = max_y;
                }
            }
            //core.core_tiplog("renderimpl setcamerapos ",x,y,min_x,max_x,min_y,max_y,this.getworldw(),this.getworldh(),this.getviewportw(),this.getviewporth());
            this.m_camera.set_pos(x,y,force);
        }
        public setviewport(w:number,h:number):void
        {
            this.m_camera.setTo(this.m_camera.x,this.m_camera.y,w,h);
        }
        public getviewportw():number
        {
            return this.m_camera.width;
        }
        public getviewporth():number
        {
            return this.m_camera.height;
        }
        public dispose():void
        {
            this.m_renderrcs = null;
            if(this.m_scene != null)
            {
                this.m_scene.dispose();
                this.m_scene = null;
            }
            if(this.m_context != null)
            {
                this.m_context.dispose();
                this.m_context = null;
            }
            if(this.m_camera != null)
            {
                this.m_camera.dispose();
                this.m_camera = null;
            }
            if(this.m_view != null)
            {
                this.m_view.removeSelf();
                this.m_view.dispose();
                this.m_view = null;
            }
        }
        public addrc(rc:rendercommand):void
        {
            this.m_renderrcs.push(rc);
        }
        //自己管理时间
        public update(delta:number):void
        {
            //update delta
            this.update_camera_pos(delta);
            this.m_camera.update(delta);
            this.m_scene.update(delta);
            this.m_view.update(delta);
        }
        public render():void
        {
            this.m_renderrcs.length = 0;
            this.m_camera.project(this.m_context);
            this.m_view.project(this.m_context);
            this.m_scene.project(this.m_context);
            this.m_renderrcs.sort(render_sort);
            this.m_view.renderbefore();
            for(let i of this.m_renderrcs)
            {
                i.render(this.m_context);
            }
            this.m_view.renderafter();
        }
        public check_click(x:number,y:number):number{
            
            for(let i:number = this.m_renderrcs.length - 1;i > 0;--i){
                if(this.m_renderrcs[i].is_contain(x,y)){
                    return this.m_renderrcs[i].m_obj.m_obj_id;
                }
            }
            return 0;
        }
    }
}