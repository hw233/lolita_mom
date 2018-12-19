module core {
    
    //todo
    export class avatar_ani_frame{
        public m_tex:Laya.Texture = null;
        public m_path:string = "";
        public m_dx:number = 0;//pre calculate
        public m_dy:number = 0;
        constructor(){

        }
        public re_init():void{
            this.clear();
        }
        public load_res():void{
            this.m_tex = Laya.Loader.getRes(this.m_path) as Laya.Texture;
        }
        public clear():void{
            this.m_tex = null;
            this.m_dx = 0;
            this.m_dy = 0;
        }
        public dispose():void{
            this.clear();
        }
    }
    export class avatar_ani_mat  extends material{
        public m_atlas_path:string = "";
        public m_ani_path:string = "";
        public m_atlas_data:avatar_atlas_struct = null;
        public m_ani_data:avatar_ani_struct = null;
        public m_frames:Array<avatar_ani_frame> = new Array<avatar_ani_frame>();
        public m_b_loaded:boolean = false;
        //
        public m_aniid:number;
        public m_aw:number;
        public m_ah:number;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        //
        constructor(){
            super();
        }
        public re_init():void{
            this.clear();
            this.m_atlas_data = null;
            this.m_ani_data = null;
            this.m_aniid = 0;
            this.m_framecount = 1;
            this.m_framespeed = 2;
            this.m_framemillsec = 0;
            this.m_frametotalmillsec = 0;
        }
        public get_frame(idx:number):avatar_ani_frame{
            if(this.m_frames.length <= 0 || idx < 0 || idx >= this.m_frames.length ){
                return null;
            }
            return this.m_frames[idx];
        }
        public load_res():void{
            this.m_ani_data = mat_mgr().get_avatar_anidata(this.m_ani_path);
            this.m_atlas_data = mat_mgr().get_avatar_anitalasdata(this.m_atlas_path);
            //init frame
            let totalframe:number = this.m_ani_data.m_frames.length;
            if(this.m_framecount != totalframe){
                this.m_framecount = totalframe;
                this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;
            }
            let ax:number = this.m_ani_data.m_anchorX;
            let ay:number = this.m_ani_data.m_anchorY;
            let dx:number = this.m_ani_data.m_dx;
            let dy:number = this.m_ani_data.m_dy;
            for(let i:number = 0;i < totalframe;++i){
                let f:avatar_ani_frame = utils.getitembycls("avatar_ani_frame",avatar_ani_frame);
                f.re_init();
                f.m_path = this.m_ani_data.m_frames[i];
                let aw:number = 512;
                if(i < this.m_atlas_data.m_frames.length){
                    aw = this.m_atlas_data.m_frames[i].m_source_w;
                }
                let ah:number = 512;
                if(i < this.m_atlas_data.m_frames.length){
                    ah = this.m_atlas_data.m_frames[i].m_source_h;
                }
                f.m_dx = dx-aw*ax;
                f.m_dy = dy-ah*ay;
                f.load_res();
                this.m_frames.push(f);
            }
            this.m_b_loaded = true;
        }
        public clear():void{
            this.m_b_loaded = false;
            for(let i of this.m_frames){
                i.dispose();
                utils.recover("avatar_ani_frame",i);
            }
            this.m_frames = new Array<avatar_ani_frame>();
        }
        public dispose():void{
            this.clear();
        }
    }
    //end todo
    ////////////////////////
    export class lavatartexture {
        public m_tex:Laya.Texture = null;//point
        constructor(){

        }
        public re_init():void{
            this.m_tex = null;
        }
        public dispose():void{
            this.m_tex = null;
        }
    }
    export class lavatartextureframes{
        public m_frames:Array<lavatartexture> = new Array<lavatartexture>();
        public m_use_dir:number = 0;
        public m_dir:number = 0;
        public m_b_mirror:boolean = false;
        public m_m:Laya.Matrix = new Laya.Matrix();
        public m_mm:Laya.Matrix = new Laya.Matrix();
        public m_matrix:Laya.Matrix = null;
        constructor(){
            this.m_m.a = 1;
            this.m_m.tx = 0;
            this.m_mm.a = -1;
            this.m_mm.tx = 0;
            this.m_matrix = this.m_m;
        }
        public get_texture(idx:number):Laya.Texture{
            if(this.m_frames.length <= 0 || idx < 0 || idx >= this.m_frames.length || this.m_frames[idx] == null){
                return null;
            }
            return this.m_frames[idx].m_tex;
        }
        public set_mirror(flag:boolean):void{
            this.m_b_mirror = flag;
            if(this.m_b_mirror){
                this.m_matrix = this.m_mm;
            }
            else{
                this.m_matrix = this.m_m;
            }
        }
        public matrix():Laya.Matrix{
            if(this.m_b_mirror){
                return this.m_mm;
            }
            else{
                return this.m_m;
            }
        }
        public re_init():void{
            this.clear();
        }
        public clear():void{
            for(let i of this.m_frames){
                i.dispose();
                utils.recover("lavatartexture",i);
            }
            this.m_frames = new Array<lavatartexture>();
        }
        public dispose():void{
            this.clear();
        }
    }
    export class lavataractionmat extends material {
        public m_shape:number = 0;
        public m_action:number = 0;
        public m_b_loaded:boolean = false;
        public m_dir_tex:Array<lavatartextureframes> = new Array<lavatartextureframes>();
        public m_texture_map:Object = new Object();//dir+frames = laya.texture;
        public m_alink:avatarlink = null;
        public m_width:number = 0;
        public m_height:number = 0;
        public m_cur_link:Laya.Point = new Laya.Point(0,0);
        constructor(){
            super();
            for(let i:number = 0;i < 8;++i){
                this.m_dir_tex.push(new lavatartextureframes());
            }
        }
        public re_init():void{
            this.m_mat_res = "";
            this.m_shape = 0;
            this.m_action = 0;
            this.m_alink = null;
            this.m_width = 0;
            this.m_height = 0;
            this.m_b_loaded = false;
            this.clear();
        }
        public get_link(dir:number,pt_idx:number,frame:number):Laya.Point{
            if(this.m_alink != null){
                return this.m_alink.get_pt(this.m_dir_tex[dir].m_use_dir,pt_idx,frame);
            }
            return this.m_cur_link;
        }
        private _gen_res_path(pre:string,dir:number,frame:number):string
        {
            let count:number = 5;
            let ret:string = "";
            ret = dir.toString();
            let fs:string = frame.toString();
            let num:number = ret.length + fs.length;
            while(num < count)
            {
                ret = ret + "0";
                num++;
            }
            ret += fs;
            ret += ".png";
            ret = pre+ret;
            return ret;
        }
        private _gen_tex_key(dir:number,frame:number):number{
            return dir*10000+frame;
        }
        public load_res():void{
            let mat_info = matinfo_mgr()._get_avatar_info(this.m_shape,this.m_action);
            let atlspre = mat_info.prefix;
            let dirlist = mat_info.dir.split(',');
            let framecount:number = matinfo_mgr().getavataractionframecount(this.m_shape,this.m_action);
            let b_mirrior:boolean = mat_info.mirror == 1;
            let dir_idx:number = 0;
            for(let i of dirlist)
            {
                //
                this.m_dir_tex[dir_idx].m_dir = dir_idx;
                this.m_dir_tex[dir_idx].m_use_dir = i;
                this.m_dir_tex[dir_idx].set_mirror(false);
                if(b_mirrior){
                    if(dir_idx == 3){
                        if(i == 5){
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if(dir_idx == 5){
                        if(i == 3){
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if(dir_idx == 1){
                        if(i == 7){
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if(dir_idx == 7){
                        if(i == 1){
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if(dir_idx == 6){
                        if(i == 2){
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if(dir_idx == 2){
                        if(i == 6){
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                }
                //
                for(let j:number = 0;j < framecount;++j){
                    let res:string = this._gen_res_path(atlspre,i,j);
                    let tkey:number = this._gen_tex_key(i,j);
                    let t:Laya.Texture = this.m_texture_map[tkey];
                    if(t == null){
                        t = Laya.Loader.getRes(res) as Laya.Texture;
                        if(t == undefined || t == null){
                            console.log("error!tex = null",res);
                        }
                        this.m_texture_map[tkey] = t;
                    }
                    let af:lavatartexture = utils.getitembycls("lavatartexture",lavatartexture);
                    af.re_init();
                    af.m_tex = t;
                    
                    this.m_dir_tex[dir_idx].m_frames.push(af);
                }
                dir_idx+=1;
            }
            this.m_b_loaded = true;
        }
        
        public clear():void{
            this.m_alink = null;
            this.m_b_loaded = false;
            for(let i of this.m_dir_tex){
                i.clear();
            }
            for(let k in this.m_texture_map){
                if(this.m_texture_map.hasOwnProperty(k)){
                    let t:Laya.Texture = this.m_texture_map[k];
                    //t.destroy(true);
                }
            }
            this.m_texture_map = new Object();
        }
        public dispose():void
        {
            this.clear();
            
            for(let i of this.m_dir_tex){
                i.dispose();
            }
            this.m_dir_tex = null;
        }
        
        public update(delta:number):void
        {
            
        }
    }
}