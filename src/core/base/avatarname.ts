module core{
    export class avatarname extends Laya.Sprite{
        private m_bk:Laya.Sprite = new Laya.Sprite();
        public m_text:Laya.Text = new Laya.Text();
        private m_bk_w:number = 80;
        private m_bk_h:number = 40;
        constructor(){
            super();
            //this.m_bk.loadImage("avatar/namepanel.png");
            //this.addChild(this.m_bk);
            this.addChild(this.m_text);
            //this.m_bk.scaleY = 0.5;
            this.m_text.font = "h5font";
            this.m_text.overflow = Laya.Text.HIDDEN;
            this.m_text.color = "#65ff65";
            this.m_text.stroke = 2;
            this.m_text.strokeColor = "#19591c";
            this.m_text.align = "center";
            this.m_text.fontSize = 22;
            this.m_text.size(200,40);
            this.m_text.y = 0;
            this.m_text.x = -100;
            this.y = 25;
        }
        public re_init():void{
            this.y = 25;
            this.x = 0;
        }
        public dispose():void{
        }
    }
    export class avatarhp extends Laya.Sprite{
        private m_progress:Laya.ProgressBar = null;
        public m_w:number = 62;
        public m_h:number = 18;
        constructor(){
            super();
            this.m_progress = new Laya.ProgressBar("avatar/blood.png");
            this.m_progress.width = this.m_w;
            this.m_progress.height = this.m_h;
            this.addChild(this.m_progress);
        }

        public re_init():void{
            this.m_progress.value = 1;
        }
        public set_v(v:number,m:number):void{
            this.m_progress.value = v/m;
        }
        public clear():void{

        }
        public dispose():void{
            this.removeChildren();
            if(this.m_progress != null){
                this.m_progress = null;
            }
        }
    }
    export class avatarbuff extends Laya.Sprite{
        public m_id:number = 0;
        public m_shape:number = 0;
        public m_cd:number = 0;
        public m_overlap:number = 0;
        public m_datas:any = null;
        public m_icon:Laya.Sprite = null;
        public m_cd_label:Laya.Label = null;
        public m_w:number = 0;
        public m_h:number = 0;
        public m_cd_label_h:number = 12;
        public m_effid:number = 0;
        constructor(){
            super();
            this.m_icon = new Laya.Sprite();
            this.m_cd_label = new Laya.Label();
            this.m_cd_label.color = '#fff200';
            this.m_cd_label.stroke = 1;
            this.m_cd_label.strokeColor = "#000000";
            this.addChild(this.m_icon);
            this.addChild(this.m_cd_label);
        }
        public re_init():void{
            this.m_cd_label.y = this.m_h - this.m_cd_label_h;
            this.m_effid = 0;
        }
        public set_id(id:number,shape:number):void{
            if(this.m_id != id){
                this.m_icon.graphics.clear();
            }
            this.m_id = id;
            this.m_shape = shape;

            this.m_icon.graphics.loadImage("icon/buff/"+this.m_shape.toString()+".jpg",0,0,this.m_w,this.m_h);
        }
        public set_data(cd:number,overlap:number,datas:any):void{
            this.set_cd(cd);
            this.m_overlap = overlap;
            this.m_datas = datas;
        }
        public set_cd(cd:number):void{
            this.m_cd = cd;
            this.m_cd_label.text = this.m_cd.toString();
        }
        public set_effid(id:number):void{
            this.m_effid = id;
        }
        public dispose():void{
            this.m_icon.graphics.clear();
        }
    }
    export class avatarbuffui extends Laya.Sprite{
        public m_list:Array<avatarbuff> = null;
        public m_num_per_row:number = 3;
        public m_buffw:number = 32;
        public m_buffh:number = 32;
        constructor(){
            super();
            this.m_list = new Array<avatarbuff>();
        }
        private _re_arrange():void{
            let dx:number = 0;
            let dy:number = 0;
            let idx:number = 0;
            for(let i of this.m_list){
                i.x = dx;
                i.y = dy;
                idx += 1;
                dx += this.m_buffw;
                if(idx > 2){
                    dx = 0;
                    dy += this.m_buffh;
                    idx = 0;
                }
            }
            dy += this.m_buffh;
            this.x = 0-this.m_buffw*this.m_num_per_row/2;
            this.y = 0-100;
        }
       
        public addbuff(bid:number,shape:number,cd:number,overlap:number,datas:any,effid:number = 0):void{
            let addbuff:avatarbuff = this.getbuff(bid);
            if(addbuff == null){
                addbuff = utils.getitembycls("avatarbuff",avatarbuff);
                addbuff.m_w = this.m_buffw;
                addbuff.m_h = this.m_buffh;
                addbuff.re_init();
                
                this.addChild(addbuff);
                addbuff.set_id(bid,shape);
                addbuff.set_effid(effid);
                this.m_list.push(addbuff);
                this._re_arrange();
            }
            addbuff.set_data(cd,overlap,datas);
        }
        public getbuff(bid:number):avatarbuff
        {
            for(let i of this.m_list){
                if(i.m_id == bid){
                    return i;
                }
            }
            return null;
        }
        public delbuff(bid:number):boolean{
            for(let i:number = 0;i<this.m_list.length;++i){
                let b:avatarbuff = this.m_list[i];
                if(b.m_id == bid){
                    b.removeSelf();
                    b.dispose();
                    utils.recover("avatarbuff",b);
                    this.m_list.splice(i,1);
                    this._re_arrange();
                    return true;
                }
            }
            return false;
        }

        public buffautocd():void{
            for(let i of this.m_list){
                i.set_cd(i.m_cd-1);
            }
        }
        public delallbuff():void{
            this.removeChildren();
            for(let i of this.m_list){
                i.dispose();
                utils.recover("avatarbuff",i);
            }
            this.m_list.length = 0;
        }
        public re_init():void{

        }
        public clear():void{
            this.delallbuff();
        }
        public dispose():void{
            this.clear();
        }
    }
}