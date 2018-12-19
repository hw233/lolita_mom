module core {
    export class avataractionmaterial extends material {
        public m_graphic:laya.display.Sprite;
        public m_shape:number = 0;
        public m_action:number = 0;
        public m_curdir:number = 0;
        public m_curdirmat:avataractiondirmaterial = null;
        public m_dir_list:Object = {};
        public m_width:number = 0;
        public m_height:number = 0;
        public m_b_mirrior:boolean = true;
        public m_b_dir4:boolean = false;
        public m_alink:avatarlink = null;
        public m_cur_link:Laya.Point = new Laya.Point(0,0);
        public m_b_loaded:boolean = false;
        public m_cur_mirrior:boolean = false;
        public m_link_sp:Laya.Sprite = null;
        constructor(){
            super();
            this.m_graphic = new laya.display.Sprite();
            
            this.m_link_sp = new Laya.Sprite();
        }
        public re_init():void{
            this.m_mat_res = "";
            this.m_shape = 0;
            this.m_action = 0;
            this.m_curdir = 0;
            this.m_curdirmat = null;
            this.m_width = 0;
            this.m_height = 0;
            this.m_b_mirrior = true;
            this.m_b_dir4 = false;
            this.m_alink = null;
            this.m_cur_link = new Laya.Point(0,0);
            this.m_b_loaded = false;
            this.m_cur_mirrior = false;
        }
        public get_link(dir:number,pt_idx:number,frame:number):Laya.Point{
            let dirmat:avataractiondirmaterial = this.m_dir_list[dir];
            if(dirmat != undefined && dirmat.m_dir != dir){
                dir = dirmat.m_dir;
            }
            
            if(this.m_alink != null){
                return this.m_alink.get_pt(dir,pt_idx,frame);
            }
            return this.m_cur_link;
        }
        public goto_frame(frame:number):void
        {
            if(this.m_curdirmat != null)
            {
                //core.core_tiplog("avataractionmaterial goto_frame ",this.m_shape,this.m_action,this.m_curdir,frame);
                this.m_curdirmat.goto_frame(frame);
            }
        }
        public is_dir_loaded(dir:number):boolean{
            if(this.m_dir_list[dir] != null && this.m_dir_list[dir] != undefined){
                return this.m_dir_list[dir].m_ready;
            }
            return false;
        }
        public load_res():void{
            let mat_info = matinfo_mgr()._get_avatar_info(this.m_shape,this.m_action);
            let atlspre = mat_info.prefix;
            let dirlist = mat_info.dir.split(',');
            let prefix:string = matinfo_mgr().getavataractiontexprefix(this.m_shape,this.m_action);
            let framecount:number = matinfo_mgr().getavataractionframecount(this.m_shape,this.m_action);
            let dir_idx:number = 0;
            for(let i of dirlist)
            {
                this.adddirmat(prefix,dir_idx,i,4,framecount);
                dir_idx+=1;
            }
            this.m_b_loaded = true;
        }
        public adddirmat(anipre:string,dir:number,use_dir:number,pad_num:number,length:number):void
        {
            if(this.m_graphic == null)
            {
                core.core_tiplog("avataractionmaterial adddirmat already release ",anipre,dir,pad_num,length);
                return;
            }
            //todo can be dirmat pool
            let dirmat:avataractiondirmaterial = null;
            //dirmat = new avataractiondirmaterial();
            dirmat = utils.getitembycls("avataractiondirmaterial",avataractiondirmaterial);
            dirmat.re_init();
            dirmat.loadres(anipre,use_dir.toString(),pad_num,length);
            dirmat.m_dir = use_dir;
            dirmat.m_ready = true;
            this.m_dir_list[dir] = dirmat;
            if(dir == this.m_curdir)
            {
                this.changedir(this.m_curdir);
            }
            this.m_b_loaded = true;
            /*
            else
            {
                if(this.m_b_mirrior){
                    if(this.m_curdir == 5 && dir == 3){
                        this.changedir(this.m_curdir);
                    }
                    else if(this.m_curdir == 6 && dir == 2){
                        this.changedir(this.m_curdir);
                    }
                    else if(this.m_curdir == 7 && dir == 1){
                        this.changedir(this.m_curdir);
                    }
                }
                
            }
            */
        }
        public changedir(dir:number):void
        {
            this.m_curdir = dir;
            this.m_graphic.removeChildren();
            this.m_curdirmat = null;
            let truedir:number = this.m_curdir;
            let scalex:number = 1;
            let scalexv:number = -1;
            this.m_cur_mirrior = false;
            /*
            if(this.m_b_mirrior){
                if(this.m_curdir == 5){
                    truedir = 3;
                    scalex = scalexv;
                }
                else if(this.m_curdir == 6){
                    truedir = 2;
                    scalex = scalexv;
                }
                else if(this.m_curdir == 7){
                    truedir = 1;
                    scalex = scalexv;
                }
            }
            if(this.m_b_dir4){
                if(truedir == 0){
                    truedir = 1;
                }
                else if(truedir == 2){
                    truedir = 1;
                }
                else if(truedir == 4){
                    truedir = 3;
                }
                else if(truedir == 6){//
                    truedir = 7;
                }
            }
            */
            let dirmat:avataractiondirmaterial = this.m_dir_list[this.m_curdir];
            
            if(dirmat != undefined)
            {
                //
                if(dirmat.m_dir != this.m_curdir){
                    if(this.m_b_mirrior){
                        if(this.m_curdir == 3)
                        {
                            if(dirmat.m_dir == 5)
                            {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if(this.m_curdir == 5)
                        {
                            if(dirmat.m_dir == 3)
                            {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if(this.m_curdir == 1)
                        {
                            if(dirmat.m_dir == 7)
                            {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if(this.m_curdir == 7)
                        {
                            if(dirmat.m_dir == 1)
                            {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if(this.m_curdir == 2)
                        {
                            if(dirmat.m_dir > 4)
                            {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if(this.m_curdir == 6)
                        {
                            if(dirmat.m_dir < 4)
                            {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                    }
                }
                //
                this.m_curdirmat = dirmat;
                this.m_graphic.pivotX = this.m_width>>1;
                this.m_graphic.scaleX = scalex;
                //this.m_curdirmat.m_graphic.scaleX = scalex;
                this.m_graphic.addChild(this.m_curdirmat.m_graphic);
                //this.m_graphic.graphics.clear();
                //this.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");
            }
        }
        public get_rect():Laya.Rectangle{
            if(this.m_curdirmat != null)
            {
                return this.m_curdirmat.get_rect();
            }
            return null;
        }
        public clear():void{
            this.m_b_loaded = false;
            this.m_graphic.removeChildren();
            this.m_curdirmat = null;
            for(let key in this.m_dir_list)
            {
                let mat:avataractiondirmaterial = this.m_dir_list[key];
                
                if(mat != undefined)
                {
                    mat.clear();
                    utils.recover("avataractiondirmaterial",mat);
                }
            }
            this.m_dir_list = {};
        }
        public dispose():void
        {
            this.clear();
            this.m_graphic = null;
            this.m_link_sp = null;
            for(let key in this.m_dir_list)
            {
                let mat:avataractiondirmaterial = this.m_dir_list[key];
                
                if(mat != undefined)
                {
                    //mat.clear();
                    mat.dispose();//really release
                    //utils.recover("avataractiondirmaterial",mat);
                }
            }
            this.m_dir_list = {};
        }
        
        public update(delta:number):void
        {
            
        }
    }
}