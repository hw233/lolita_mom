module combat{
    export class combat_number_sp extends laya.display.Sprite{
        protected m_value:number = 0;
        private m_root:string = "combat_num/";
        protected m_prex:string = "damage_";
        public m_w:number  = 0;
        public m_h:number  = 0;
        public m_type:number = DAMAGETYPE_HP_SUB;
        private m_text:Laya.Label = null;
        constructor(){
            super();
        }
        public re_init(tp:number):void{
            this.m_type = tp;
            if(this.m_type == DAMAGETYPE_HP_ADD){
                this.m_prex = "heal_";
            }
            else if(this.m_type == DAMAGETYPE_CRACK){
                //this.m_prex = "gearscore_";
                this.m_prex = "countdown_";
            }
            else{
                this.m_prex = "damage_";
            }
        }
        public set_content(c:string):void{
            this.release_pic();
            if(this.m_text == null){
                this.m_text = new Laya.Label();
                this.m_text.color = "#0000ff";
                this.m_text.stroke = 1;
                this.m_text.strokeColor = "#ffffff"
                this.m_text.fontSize = 32;
                this.m_text.bold = true;
                this.m_text.align = "center";
                this.m_text.size(120,40);
                this.addChild(this.m_text);
            }
            this.m_text.text = c;
            this.init_wh();
        }
        public set_value(v:number):void{
            this.m_value = v;
            this.release_pic();
            if(this.m_type ==DAMAGETYPE_DODGE){
                if(this.m_value == 0){
                    this.loadImage(this.m_root+"damage_shan.png");
                }
                else{
                     this.loadImage(this.m_root+"damage_bi.png");
                }
            }
            else if(this.m_type == DAMAGETYPE_SHAKE){
                if(this.m_text == null){
                    this.m_text = new Laya.Label();
                    this.m_text.color = "#0000ff";
                    this.m_text.stroke = 1;
                    this.m_text.strokeColor = "#ffffff"
                    this.m_text.fontSize = 32;
                    this.m_text.bold = true;
                    this.m_text.align = "center";
                    this.m_text.size(120,40);
                    this.addChild(this.m_text);
                }
                this.m_text.text = "反震";
            }
            else if(this.m_type == DAMAGETYPE_COUNTERATK){
                if(this.m_text == null){
                    this.m_text = new Laya.Label();
                    this.m_text.color = "#0000ff";
                    this.m_text.stroke = 1;
                    this.m_text.strokeColor = "#ffffff"
                    this.m_text.fontSize = 32;
                    this.m_text.bold = true;
                    this.m_text.align = "center";
                    this.m_text.size(120,40);
                    this.addChild(this.m_text);
                }
                this.m_text.text = "反击";
            }
            else{
                this.loadImage(this.m_root+this.m_prex+v.toString()+".png");
            }
            
            this.init_wh();
        }
        public _init_cryout_wh():void{
            this.m_w = 120;
            this.m_h = 40;
        }
        public _init_counteratk_wh():void{
            this.m_w = 120;
            this.m_h = 40;
        }
        public _init_shake_wh():void{
            this.m_w = 120;
            this.m_h = 40;
        }
        public _init_dodge_wh():void{
            this.m_w = 32;
            this.m_h = 32;
        }
        public _init_sub_wh():void{
            this.m_w = 16;
            this.m_h = 16;
            switch(this.m_value){
                case 0:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 1:
                    this.m_w = 22;
                    this.m_h = 33;
                    break;
                case 2:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 3:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 4:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 5:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 6:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 7:
                    this.m_w = 34;
                    this.m_h = 36;
                    break;
                case 8:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 9:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                default:
                    break;
            }
        }
        public init_add_wh():void{
            this.m_w = 16;
            this.m_h = 16;
            switch(this.m_value){
                case 0:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 1:
                    this.m_w = 18;
                    this.m_h = 31;
                    break;
                case 2:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 3:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 4:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 5:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 6:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 7:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 8:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 9:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                default:
                    break;
            }
        }
        public _init_countdown_wh():void{
            this.m_w = 16;
            this.m_h = 16;
            switch(this.m_value){
                case 0:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 1:
                    this.m_w = 32;
                    this.m_h = 47;
                    break;
                case 2:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 3:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 4:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 5:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                case 6:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 7:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                case 8:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 9:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                default:
                    break;
            }
            this.m_w -= 2;
        }
        public _init_crack_wh():void{
            this.m_w = 16;
            this.m_h = 16;
            switch(this.m_value){
                case 0:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 1:
                    this.m_w = 20;
                    this.m_h = 30;
                    break;
                case 2:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 3:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 4:
                    this.m_w = 30;
                    this.m_h = 30;
                    break;
                case 5:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 6:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 7:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 8:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 9:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                default:
                    break;
            }
        }
        public init_wh():void{
            if(this.m_type == DAMAGETYPE_HP_ADD){
                this.init_add_wh();
            }
            else if(this.m_type == DAMAGETYPE_HP_SUB){
                this._init_sub_wh();
            }
            else if(this.m_type == DAMAGETYPE_DODGE){
                this._init_dodge_wh();
            }
            else if(this.m_type == DAMAGETYPE_SHAKE){
                this._init_shake_wh();
            }
            else if(this.m_type == DAMAGETYPE_CRYOUT){
                this._init_cryout_wh();
            }
            else if(this.m_type == DAMAGETYPE_COUNTERATK){
                this._init_counteratk_wh();
            }
            else if(this.m_type == DAMAGETYPE_CRACK){
                this._init_countdown_wh();
                //this._init_crack_wh();
            }
        }
        public release_pic():void{
            this.removeChildren();
            if(this.m_text != null){
                this.m_text = null;
            }
            this.graphics.clear();
        }
        public dispose():void{
            this.release_pic();
        }
    }
    export class combat_number extends core.renderspcontent{
        public m_value:number = 0;
        public m_type:number = 0;
        public m_sp_list:Array<combat_number_sp>;
        public m_life:number = 0;
        public m_obj_id:number = 0;
        public m_text:string = "";
        constructor(){
            super();
            this.m_sp_list = new Array<combat_number_sp>();
        }
        public re_init(v:number,tp:number,content:string = ""):void{
            this.m_value = v;
            this.m_type = tp;
            this.m_sp_list.length = 0;
            this.m_text = content;
        }
        public release_allsp():void{
            this.removeChildren();
            for(let i of this.m_sp_list){
                laya.utils.Tween.clearAll(i);
                this._del_sp(i);
            }
            this.m_sp_list = new Array<combat_number_sp>();
        }
        protected _get_sp(tp:number):combat_number_sp{
            let ret:combat_number_sp = utils.getitembycls("combat_number_sp",combat_number_sp);
            ret.re_init(tp);
            return ret;
        }
        protected _del_sp(ins:combat_number_sp):void{
            ins.dispose();
            utils.recover("combat_number_sp",ins);
        }
        public start():void{
            this.release_allsp();
            let dx:number = 0;
            let idx:number = 0;
            let totalw:number = 0;
            let totalh:number = 200;
            
            if(this.m_type == DAMAGETYPE_DODGE){
                let shan:combat_number_sp = this._get_sp(this.m_type);
                shan.set_value(0);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 150;
                this.addChild(shan);
                laya.utils.Tween.to(shan,{y:50},300,laya.utils.Ease.elasticOut,null,0);
                let bi:combat_number_sp = this._get_sp(this.m_type);
                bi.set_value(1);
                this.m_sp_list.push(bi);
                bi.x = shan.m_w;
                bi.y = 150;
                this.addChild(bi);
                laya.utils.Tween.to(bi,{y:50},300,laya.utils.Ease.elasticOut,null,0);
                this.m_w = shan.m_w+bi.m_w;
                this.m_h = totalh;
                this.m_life = 500;
            }
            else if(this.m_type == DAMAGETYPE_SHAKE || this.m_type == DAMAGETYPE_COUNTERATK){
                let shan:combat_number_sp = this._get_sp(this.m_type);
                shan.set_value(0);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 0;
                this.addChild(shan);
                laya.utils.Tween.from(shan,{y:-160},300,laya.utils.Ease.elasticOut,null,0);
                this.m_w = shan.m_w;
                this.m_h = totalh;
                this.m_life = 500;
            }
            else if(this.m_type == DAMAGETYPE_CRYOUT){
                let shan:combat_number_sp = this._get_sp(this.m_type);
                //shan.set_value(0);
                shan.set_content(this.m_text);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 0;
                this.addChild(shan);
                laya.utils.Tween.to(shan,{y:-50},500,laya.utils.Ease.elasticOut,null,0);
                this.m_w = shan.m_w;
                this.m_h = totalh;
                this.m_life = 700;
            }
            else{
                let v_str:string = this.m_value.toString();
                let duration:number = 300;
                let delta:number = 50;
                for(let i of v_str){
                    let snum:combat_number_sp = this._get_sp(this.m_type);
                    snum.set_value(parseInt(i));
                    this.m_sp_list.push(snum);
                    snum.x = dx;
                    snum.y = 0;
                    this.addChild(snum);
                    laya.utils.Tween.from(snum,{y:-50},duration,laya.utils.Ease.elasticOut,null,idx*delta);
                    idx += 1;
                    dx += snum.m_w;
                }
                this.m_life = (idx-1)*delta+duration;
                totalw = dx;
                this.m_w = totalw;
                this.m_h = totalh;
            }
            this.y = -100;
            this.x = 0-this.m_w/2;
        }
        public tick(delta:number):void{
            this.m_life -= delta;
        }
        public is_end():boolean{
            return this.m_life <= 0;
        }
        public dispose():void{
            this.release_allsp();
            utils.recover("combat_number",this);
        }
        public selfremove():void{

        }
    }
    //
    export class combat_cryout extends core.renderspcontent{
        public m_graphic:laya.display.Animation = null;
        public m_life:number = 0;
        public m_obj_id:number = 0;
        public m_text:Laya.Label = null;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        public m_framecurrenttm:number = 0;
        constructor(){
            super();
            this.m_graphic = new laya.display.Animation();
            this.m_text = new Laya.Label();
            this.m_text.color = "#ffffff";
            this.m_text.stroke = 1;
            this.m_text.strokeColor = "#1794f9"
            this.m_text.fontSize = 24;
            this.m_text.align = "center";
            this.m_text.font = "h5font";
            this.m_text.x = -40;
            this.m_text.y = -10;
            this.m_text.size(120,40);
            this.addChild(this.m_graphic);
            this.addChild(this.m_text);
        }
        public re_init(content:string = ""):void{
            this.m_text.text = content;
            this.m_graphic.visible = false;
            this.m_text.visible = false;
        }
        
        public start():void{
            this.m_text.visible = true;
            this.m_graphic.visible = true;
            this.m_graphic.loadAnimation("game_ani/combat/cryout.ani");
            this.m_graphic.stop();
            this.m_graphic.play(0,false,"ani1");
            this.m_graphic.gotoAndStop(0);
            this.m_life = 1500;
            this.y = -150;
            this.x = -20;
            this.m_framecount = 5;
            this.m_framespeed = 10;
            this.m_framecurrenttm = 0;
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;
        }
        public tick(delta:number):void{
            this.m_life -= delta;
            this.m_framecurrenttm += delta;
            let framecount:number = Math.floor(this.m_framecurrenttm/this.m_framemillsec);
            this.m_framecurrent = framecount%this.m_framecount;

            if(this.m_framecurrenttm >= this.m_frametotalmillsec){
                this.m_framecurrent = this.m_framecount - 1;
            }
            
            this.m_graphic.gotoAndStop(this.m_framecurrent);
        }
        public is_end():boolean{
            return this.m_life <= 0;
        }
        public dispose():void{
            utils.recover("combat_cryout",this);
        }
        public selfremove():void{

        }
    }
    //
    export class combat_crack extends combat_number{
        public m_graphic:laya.display.Animation = null;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        public m_framecurrenttm:number = 0;
        constructor(){
            super();
            this.m_graphic = new laya.display.Animation();
            this.addChild(this.m_graphic);
        }
        public re_init(v:number,tp:number,content:string = ""):void{
            super.re_init(v,tp,content);
            this.m_graphic.visible = false;
            this.m_graphic.scale(2.0,2.0);
        }
     
        public start():void{
            this.release_allsp();
            this.addChild(this.m_graphic);
            let v_str:string = this.m_value.toString();
            let dx:number = 0;
            let idx:number = 0;
            let totalh:number = 200;
            let totalw:number = 0;
            for(let i of v_str){
                let snum:combat_number_sp = this._get_sp(this.m_type);
                snum.set_value(parseInt(i));
                this.m_sp_list.push(snum);
                snum.x = dx;
                snum.y = 0;
                this.addChild(snum);
                idx += 1;
                dx += snum.m_w;
                totalw += snum.m_w;
            }
            //
            this.m_graphic.visible = true;
            this.m_graphic.loadAnimation("game_ani/combat/crack.ani");
            this.m_graphic.stop();
            this.m_graphic.play(0,false,"ani1");
            this.m_graphic.gotoAndStop(0);
   
            this.m_framecount = 11;
            this.m_framespeed = 20;
            
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;

            //
            this.m_life = 800;
            this.m_w = totalw;
            this.m_h = totalh;
            this.y = -100;
            this.x = 0-this.m_w/2;
            this.m_graphic.x = this.m_w/2;
            this.m_graphic.y = 20;
            this.m_framecurrenttm = 0;
        }
        public tick(delta:number):void{
            this.m_life -= delta;
            this.m_framecurrenttm += delta;
            let framecount:number = Math.floor(this.m_framecurrenttm/this.m_framemillsec);
            this.m_framecurrent = framecount%this.m_framecount;

            if(this.m_framecurrenttm >= this.m_frametotalmillsec){
                this.m_framecurrent = this.m_framecount - 1;
                this.m_graphic.visible = false;
                return;
            }
            
            this.m_graphic.gotoAndStop(this.m_framecurrent);
        }
        public is_end():boolean{
            return this.m_life <= 0;
        }
        public dispose():void{
            this.release_allsp();
            utils.recover("combat_crack",this);
        }
        public selfremove():void{

        }
    }
    export class combat_lineup extends core.renderspcontent{
        public m_graphic:Laya.Sprite = null;
        public m_obj_id:number = 0;
        constructor(){
            super();
            this.m_graphic = new Laya.Sprite();
            this.addChild(this.m_graphic);
        }
        public re_init():void{
            this.m_obj_id = 0;
            this.m_graphic.x = 0;
            this.m_graphic.y = 0;
            this.m_graphic.graphics.clear();
        }
        
        public set_respath(path:string,x:number,y:number):void{
            this.m_graphic.graphics.loadImage(path);
            this.m_graphic.x = x;
            this.m_graphic.y = y;
        }
        
        public dispose():void{
            utils.recover("combat_lineup",this);
        }
        public selfremove():void{

        }
    }
}