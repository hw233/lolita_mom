module core {
    export class rendermap {
        public m_bk:rendermapbk = null;
        public m_scrollbk:rendermapscrollbk = null;
        //need code objects pool
        public m_slots:Array<rendermapslot>;
        public m_mapid:number = 0;
        public m_mapw:number;
        public m_maph:number;
        public m_block:rendermapblock;
        public m_pathfind:pathfind;
        constructor(){
            this.m_bk = null;
            this.m_scrollbk = null;
            this.m_slots = new Array<rendermapslot>();
            this.m_block = new rendermapblock();
            this.m_pathfind = new pathfind(null,0,0);
        }
        public setmapid(mapid:number,b_create_slot:boolean = true):void
        {
            core.core_tiplog("rendermap setmapid 1 ",mapid,this.m_mapid);
            if(mapid == this.m_mapid){
                return;
            }
            this.clear();
            if(mapid == 0){
                return;
            }
            core.core_tiplog("rendermap setmapid 2 ",mapid,this.m_mapid);
            this.m_mapid = mapid;
            this.m_block.setmapid(this.m_mapid);
            let mapw:number = matinfo_mgr().getmapw(this.m_mapid);
            let maph:number = matinfo_mgr().getmaph(this.m_mapid);
            this.m_mapw = mapw;
            this.m_maph = maph;
            if(!b_create_slot){
                return;
            }
            let gridw:number = matinfo_mgr().m_map_grid_w;
            let gridh:number = matinfo_mgr().m_map_grid_h;
            let colnum:number = mapw/gridw;
            let rownum:number = maph/gridh;
            for(let i = 0;i < colnum;++i)//x
            {
                for(let j = 0;j < rownum;++j)//y
                {
                    let x:number = i*gridw;
                    let y:number = j*gridh;
                    let slot:rendermapslot = utils.getitembycls("rendermapslot",rendermapslot);
                    slot.re_init(mapid,x,y,i,j);
                    //let slot:rendermapslot = new rendermapslot(mapid,x,y,i,j);
                    //core.core_tiplog("rendermap push slot ",x,y,i,j);
                    this.m_slots.push(slot);
                }
            }
        }
        public delallslot():void{
            for(let i of this.m_slots)
            {
                i.dispose();
                utils.recover("rendermapslot",i);
            }
            this.m_slots = new Array<rendermapslot>();
        }
        public clear():void{
            this.clearscrollbk();
            if(this.m_bk != null)
            {
                this.m_bk.dispose();
                utils.recover("rendermapbk",this.m_bk);
                this.m_bk = null;
            }
            this.delallslot();
            this.m_mapid = 0;
        }
        public is_block(sx:number,sy:number):boolean{
            let bw:number = this.m_block.m_mat.m_grid_w;
            let bh:number = this.m_block.m_mat.m_grid_h;
            let ssx:number = Math.floor(sx/bw);
            let ssy:number = Math.floor(sy/bh);
            return this.m_block.m_mat.is_block_cache(ssx,ssy);
        }
        public findpath(sx:number,sy:number,dx:number,dy:number,bclosest:boolean,spd:number):path
        {
            let starttm:number = utils.get_render_milltm();
            //core.core_tiplog("rendermap findpath start time ",sx,sy,dx,dy,starttm);
            let bw:number = this.m_block.m_mat.m_grid_w;
            let bh:number = this.m_block.m_mat.m_grid_h;
            let ssx:number = Math.floor(sx/bw);
            let ssy:number = Math.floor(sy/bh);
            let ddx:number = Math.floor(dx/bw);
            let ddy:number = Math.floor(dy/bh);
            //core.core_tiplog("grid pos ",ssx,ssy,ddx,ddy,bw,bh);
            this.m_pathfind.set_block(this.m_block.m_mat,this.m_block.m_mat.m_block_w_num,this.m_block.m_mat.m_block_h_num);
            let ret:Array<laya.maths.Point> =  this.m_pathfind.findpath(ssx,ssy,ddx,ddy,bclosest);
            let endtm:number = utils.get_render_milltm();
            //core.core_tiplog("rendermap findpath end time ",sx,sy,dx,dy,endtm,endtm - starttm);
            //core.core_tiplog("findpath cost++++++++++ ",endtm - starttm);
            if(ret != null)
            {
                let lastnode:laya.maths.Point = null;
                let retpath:path = utils.getitembycls("path",path);
                retpath.init(spd);
                for(let i:number = 0;i < ret.length;++i)
                {
                    if(lastnode == null)
                    {
                        lastnode = ret[i];
                    }
                    else
                    {
                        if(i == 1){
                            retpath.push_pt(sx,sy,ret[i].x*bw,ret[i].y*bh);
                        }
                        else{
                            retpath.push_pt(lastnode.x*bw,lastnode.y*bh,ret[i].x*bw,ret[i].y*bh);
                        }
                        
                        lastnode = ret[i];
                    }
                }
                
                return retpath;
            }
            //
            
            return null;
        }
        public addscrollbk(res:string,w:number,h:number):void{
            if(this.m_scrollbk == null){
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk",rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.addres(res,w,h);
        }
        public setscrollbkpos(x:number,y:number):void{
            if(this.m_scrollbk == null){
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk",rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.setdeltapos(x,y);
        }
        public setscrollbkview(w:number,h:number):void{
            if(this.m_scrollbk == null){
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk",rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.m_view_w = w;
        }
        public setscrollbkspd(spd:number):void{
            if(this.m_scrollbk == null){
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk",rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.setspd(spd);
        }
        public clearscrollbk():void{
            if(this.m_scrollbk != null){
                this.m_scrollbk.dispose();
                utils.recover("rendermapscrollbk",this.m_scrollbk);
                this.m_scrollbk = null;
            }
        }
        public setbk(res:string):void
        {
            
            if(res == null)
            {
                if(this.m_bk != null)
                {
                    this.m_bk.dispose();
                    utils.recover("rendermapbk",this.m_bk);
                    this.m_bk = null;
                }
                return;
            }
            if(this.m_bk == null){
                this.m_bk = utils.getitembycls("rendermapbk",rendermapbk);
                this.m_bk.re_init();
            }
            //this.m_bk = new rendermapbk();
            
            this.m_bk.setres(res);
        }
        public setsp(sp:Laya.Sprite):void{
            if(this.m_bk == null){
                //this.m_bk = new rendermapbk();
                this.m_bk = utils.getitembycls("rendermapbk",rendermapbk);
                this.m_bk.re_init();
            }
            this.m_bk.setsp(sp);
        }
        public removesp():void{
            if(this.m_bk != null){
                this.m_bk.clearsp();
            }
        }
        public dispose():void
        {
            this.clear();
            if(this.m_block != null)
            {
                this.m_block.dispose();
                this.m_block = null;
            }
        }
        public update(delta:number):void
        {
            if(this.m_scrollbk != null){
                this.m_scrollbk.update(delta);
            }
        }
        public project(context:rendercontext):boolean
        {
            let ret:boolean = false;
            if(this.m_scrollbk != null){
                ret = this.m_scrollbk.project(context) || ret;
            }
            if(this.m_bk != null)
            {
                ret = this.m_bk.project(context) || ret;
            }
            if(this.m_block != null)
            {
                //ret = this.m_block.project(context) || ret;
            }
            let num:number = 0;
            for(let i of this.m_slots)
            {
                //core.core_tiplog("rendermap project slot ",num);
                ret = i.project(context) || ret;
                num++;
            }
            return ret;
        }
    }
}