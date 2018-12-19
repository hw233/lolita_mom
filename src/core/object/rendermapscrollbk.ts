module core {
    export class scrollbkslot extends Laya.Sprite{
        public m_mat:mapbkmaterial = null;
        public m_mat_res:string = "";
        public m_w:number = 0;
        public m_h:number = 0;
        public m_drawx:number = 0;
        public m_drawy:number = 0;
        public m_view_w:number = 0;
        public m_b_draw:boolean = false;
        constructor(){
            super();
        }
        public set_pos(x:number,y:number):void{
            this.m_drawx = x;
            this.m_drawy = y;
            this.x = this.m_drawx;
            this.y = this.m_drawy;
            this.removeChildren();
            if(this.m_drawx >= (-this.m_w) && this.m_drawx <= this.m_view_w){
                this.m_b_draw = true;
                this.addChild(this.m_mat.m_graphic);
            }
            else{
                this.m_b_draw = false;
            }
        }
        public re_init(respath:string){
            this.m_mat = mat_mgr().getmapbkres(respath);
            this.m_mat_res = respath;
            this.m_w = 0;
            this.m_h = 0;
            this.m_drawx = 0;
            this.m_drawy = 0;
            this.m_view_w = 0;
            this.m_b_draw = false;
            this.x = 0;
            this.y = 0;
            this.removeChildren();
        }
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null){
                mat_mgr().delmapbkres(this.m_mat);
                this.m_mat = null;
            }
        }
    }
    export class rendermapscrollbk extends renderobject {
        public m_mat_list:Array<scrollbkslot> = new Array<scrollbkslot>();
        public m_tmpmat_list:Array<scrollbkslot> = new Array<scrollbkslot>();
        public m_dx:number = 0;
        public m_dy:number = 0;
        public m_spd:number = 200;
        public m_view_w:number = 0;
        constructor(){
            super();
            this.re_init();
        }
        public re_init():void{
            this.m_mat_list.length = 0;
            this.m_dx = 0;
            this.m_dy = 0;
            this.x = 0;
            this.y = 0;
            this.m_spd = 200;
            this.m_rc = utils.getitembycls("mapscrollbkcommand",mapscrollbkcommand);
            this.m_rc.re_init(this);
        }
        public setdeltapos(x:number,y:number):void{
            this.m_dx = x;
            this.m_dy = y;
            this.x = x;
            this.y = y;
        }
        public setspd(spd:number):void{
            this.m_spd = spd;
        }
        public addres(res:string,w:number,h:number):void
        {
            let mat:scrollbkslot = utils.getitembycls("scrollbkslot",scrollbkslot);
            mat.re_init(res);
            mat.m_view_w = this.m_view_w;
            mat.m_w = w;
            mat.m_h = h;
            if(this.m_mat_list.length <= 0){
                mat.set_pos(0,0);
            }
            else{
                let pre_mat:scrollbkslot = this.m_mat_list[this.m_mat_list.length - 1];
                mat.set_pos(pre_mat.m_drawx+pre_mat.m_w,0);
            }
            this.m_mat_list.push(mat);
            //this.m_mat = mat_mgr().getmapbkres(res);
            //this.removeChildren();
            this.addChild(mat);
        }
        public update(delta:number):void
        {
            this.m_tmpmat_list.length = 0;
            let dx:number = delta/1000*this.m_spd;
            let mat:scrollbkslot = null;
            for(let i:number = this.m_mat_list.length - 1;i >= 0;--i){
                mat = this.m_mat_list[i];
                let drawx:number = mat.m_drawx - dx;
                if(drawx < -mat.m_w){
                    this.m_tmpmat_list.push(mat);
                    this.m_mat_list.splice(i,1);
                }
                else{
                    mat.set_pos(drawx,0);
                }
            }
            if(this.m_tmpmat_list.length > 0){
                this.m_tmpmat_list.reverse();
                let startx:number = 0;
                if(this.m_mat_list.length > 0){
                    mat = this.m_mat_list[this.m_mat_list.length - 1];
                    startx = mat.m_drawx + mat.m_w;
                }
                for(let i of this.m_tmpmat_list){
                    this.m_mat_list.push(i);
                    i.set_pos(startx,0);
                    startx += i.m_w;
                }
                this.m_tmpmat_list.length = 0;
            }
            
        }
        public clearRes():void{
            this.removeChildren();
            for(let i of this.m_mat_list){
                i.dispose();
                utils.recover("scrollbkslot",i);
            }
            this.m_mat_list.length = 0;
        }
        public project(context:rendercontext):boolean
        {
            context.m_render.addrc(this.m_rc);
            return true;
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.clearRes();
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("mapscrollbkcommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
}