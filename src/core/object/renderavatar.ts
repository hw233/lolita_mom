module core {
    export class renderavatar_default extends Laya.Sprite{
        constructor(){
            super();
            this.graphics.loadImage("avatar/default.png");
        }
    }
    export class renderavatar_shadow extends Laya.Sprite{
        constructor(){
            super();
            this.graphics.loadImage("avatar/shadow.png");
        }
    }
    export class renderavatar_adorn extends Laya.Sprite{
        private static S_ADORN_IDMAX = 1;
        public m_id:number = 0;
        public m_front:boolean = true;
        public m_dx:number = 0;
        public m_dy:number = 0;
        constructor(){
            super();
            this.m_id = this._gen_id();
        }
        protected _gen_id():number{
            return renderavatar_adorn.S_ADORN_IDMAX++;
        }
        public draw2sp(sp:Laya.Sprite,x:number,y:number,b_front:boolean = true):void{

        }
        public update(delta:number):void{

        }
        public dispose(){

        }
    }
    export class avatar_aura extends renderavatar_adorn{
        ///////////////////////////////
        public m_aniid:number;
        public m_mat:effmaterial;
        public m_aw:number;
        public m_ah:number;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        public m_framecurrenttm:number = 0;
        public m_b_loop:boolean = true;
        public m_b_end:boolean = false;
        public m_b_autodel:boolean = false;
        public m_b_loaded:boolean = false;
        constructor(){
            super();
        }
        public re_init(aura_id:number):void{
            this.m_id = this._gen_id();
            this.m_aniid = aura_id;
            this.m_mat = null;//only start to load when it is projected 
            this.m_aw = matinfo_mgr().geteffw(this.m_aniid);
            this.m_ah = matinfo_mgr().geteffh(this.m_aniid);
            this.m_framecount = matinfo_mgr().geteffframecount(this.m_aniid);
            this.m_framespeed = matinfo_mgr().geteffframespeed(this.m_aniid);
            this.m_b_loop = matinfo_mgr().geteffcycle(this.m_aniid);
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;
            this.m_b_loaded = false;
        }
        public load_res():boolean
        {
            if(this.m_b_loaded){
                return true;
            }
            if(this.m_mat == null)
            {
                this.m_mat = mat_mgr().geteffmat(this.m_aniid);
                this.addChild(this.m_mat.m_graphic);
                this.m_b_loaded = true;
            }
            return true;
        }
        public update(delta:number):void
        {
            if(this.m_b_loaded == false){
                return;
            }
            if(this.m_b_end){
                return;
            }
            this.m_framecurrenttm += delta;
            if(this.m_framecurrenttm >= this.m_frametotalmillsec){
                if(this.m_b_autodel){
                    this.m_b_end = true;
                    return;
                }
                if(this.m_b_loop == false){
                    this.m_b_end = true;
                    return;
                }
            }
            let framecount:number = Math.floor(this.m_framecurrenttm/this.m_framemillsec);
            this.m_framecurrent = framecount%this.m_framecount;
            if(this.m_mat != null)
            {
                this.m_mat.goto_frame(this.m_framecurrent);
            }
            
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null)
            {
                mat_mgr().deleffmat(this.m_mat);
                this.m_mat = null;
            }
            super.dispose();
            utils.recover("avatar_aura",this);
        }
        ////////////////////////////////
    }
    //////
    export class avatar_aura_new extends renderavatar_adorn{
        ///////////////////////////////
        public m_aniid:number;
        public m_mat:avatar_ani_mat;
        
        public m_framecurrent:number = 0;
        public m_framecurrenttm:number = 0;
        
        public m_b_loaded:boolean = false;
        constructor(){
            super();
        }
        public re_init(aura_id:number):void{
            this.m_id = this._gen_id();
            this.m_aniid = aura_id;
            this.m_mat = null;
            this.m_framecurrent = 0;
            this.m_framecurrenttm = 0;
            this.m_b_loaded = false;
            this.m_dx = 0;
            this.m_dy = 0;
            this.m_front = true;
        }
        public load_res():boolean
        {
            if(this.m_b_loaded == false){
                if(this.m_mat == null){
                    this.m_mat = mat_mgr().getlavataranimat(this.m_aniid);//only start to load when it is projected 
                }
                this.m_b_loaded = this.m_mat.m_b_loaded;
            }
            return true;
        }
        public draw2sp(sp:Laya.Sprite,x:number,y:number,b_front:boolean = true):void{
            if(this.m_b_loaded && this.m_mat != null && this.m_mat.m_b_loaded&&this.m_front == b_front){
                //let f:avatar_ani_frame = this.m_mat.m_frames[this.m_framecurrent];
                let f:avatar_ani_frame = this.m_mat.get_frame(this.m_framecurrent);
                if(f){
                    sp.graphics.drawTexture(f.m_tex,x+f.m_dx+this.m_dx,y+f.m_dy+this.m_dy);
                }
                
            }
        }
        public update(delta:number):void
        {   
            this.m_framecurrenttm += delta;
            if(this.m_b_loaded){
                let framecount:number = Math.floor(this.m_framecurrenttm/this.m_mat.m_framemillsec);
                this.m_framecurrent = framecount%this.m_mat.m_framecount;
            }
        }
        //从parent里把自己移除?
        public dispose():void
        {
            this.removeChildren();
            if(this.m_mat != null)
            {
                mat_mgr().dellavataranimat(this.m_mat);
                this.m_mat = null;
            }
            super.dispose();
            utils.recover("avatar_aura_new",this);
        }
        ////////////////////////////////
    }
    //////
    export class renderavatar_old extends renderobject {
        public m_designw:number = 512;
        public m_designh:number = 512;
        public m_shape:number = 0;
        public m_shape_weapon:number = 0;
        public m_shape_wing:number = 0;
        public m_shape_ride:number = 0;
        public m_shape_backride:number = 0;
        public m_shape_hair:number = 0;
        public m_aura_id:number = 0;
        public m_aura_adorn:avatar_aura = null;
        public m_title_id:number = 0;
        public m_title_adorn:avatar_aura = null;
        public m_action:number = 0;
        public m_lastaction:number = 0;
        public m_dir:number = 0;
        public m_mat:avataractionmaterial;
        public m_mat_weapon:avataractionmaterial;
        public m_mat_wing:avataractionmaterial;
        public m_mat_ride:avataractionmaterial;
        public m_mat_backride:avataractionmaterial;
        public m_mat_hair:avataractionmaterial;
        public m_aw:number;
        public m_ah:number;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        public m_framecurrenttm:number = 0;
        public m_mat_dx:number = 0;//-256;
        public m_mat_dy:number = -this.m_designh/2;//-256;
        public m_ride_h:number = 0;
        public m_user_data:any = 0;
        public m_name:string = "";
        public m_name_dx:number = 0;
        public m_name_dy:number = 0;
        public m_name_sp:avatarname = null;
        public m_hp:avatarhp = null;
        public m_buff:avatarbuffui = null;
        public m_b_cycle:boolean = true;
        public m_b_stop_frame:number = -1;
        public m_sp_front:Laya.Sprite = null;
        public m_sp_back:Laya.Sprite = null;
        public m_sp_center:Laya.Sprite = null;
        public m_sp_center_f:Laya.Sprite = null;
        public m_sp_center_b:Laya.Sprite = null;
        public m_sp_center_c:Laya.Sprite = null;
        public m_sp_center_rf:Laya.Sprite = null;
        public m_sp_center_rb:Laya.Sprite = null;
        public m_adorn_list:Array<renderavatar_adorn> = new Array<renderavatar_adorn>();
        public m_dx:number = 0;
        public m_dy:number = 0;
        public m_org_pt:Laya.Point = new Laya.Point(0,0);
        private m_shadow_sp:renderavatar_shadow = null;
        private m_default_sp:renderavatar_default = null;
        private m_draw_avatar:boolean = false;
        private m_use_default:boolean = true;
        public m_draw_link:boolean = false;
        constructor(){
            super();

        }
        public re_init(shape:number,x:number,y:number,use_default:boolean = true):void{
            this.set_id();
            this.m_name_dx = 0;
            this.m_name_dy = 0;
            this.m_draw_link = false;
            this.m_sp_front = new Laya.Sprite();
            
            this.m_sp_back = new Laya.Sprite();
            this.m_sp_center = new Laya.Sprite();
            this.m_sp_center_rb = new Laya.Sprite();
            this.m_sp_center_rf = new Laya.Sprite();
            this.m_sp_center_b = new Laya.Sprite();
            this.m_sp_center_c = new Laya.Sprite();
            this.m_sp_center_f = new Laya.Sprite();
            this.m_shadow_sp = utils.getitembycls("renderavatar_shadow",renderavatar_shadow);
            this.addChild(this.m_shadow_sp);
            this.m_shadow_sp.x = -50;
            this.m_shadow_sp.y = -35;
            this.set_ride_h(0);
            this.m_mat_dy = -this.m_designh/2;
            this.m_use_default = use_default;
            if(this.m_use_default){
                this.m_draw_avatar = false;
                this.create_default_sp();
            }
            else{
                this.m_draw_avatar = true;
            }
            
            
            this.m_sp_center.addChild(this.m_sp_center_rb);
            this.m_sp_center.addChild(this.m_sp_center_b);
            this.m_sp_center.addChild(this.m_sp_center_c);
            this.m_sp_center.addChild(this.m_sp_center_f);
            this.m_sp_center.addChild(this.m_sp_center_rf);
            this.m_dx = 0;
            this.m_dy = 0;
            this.addChild(this.m_sp_back);
            this.addChild(this.m_sp_center);
            this.addChild(this.m_sp_front);
            this.m_shape = shape;
            this.rotation = 0;
            this.alpha = 1;
            this.m_rc = utils.getitembycls("avatarcommand",avatarcommand);
            this.m_rc.re_init(this);
            
            super.set_pos(x,y);
            
            
            this.m_mat = null;//only start to load when it is projected 
            this.m_mat_weapon = null;
            this.m_mat_wing = null;
            this.m_mat_ride = null;
            this.m_mat_backride = null;
            this.m_mat_hair = null;
            this.m_shape_weapon = 0;
            this.m_shape_wing = 0;
            this.m_shape_ride = 0;
            this.m_shape_backride = 0;
            this.m_shape_hair = 0;
            this.m_aura_id = 0;
            this.m_aura_adorn = null;
            this.m_title_id = 0;
            this.m_title_adorn = null;
            this.reset_data();

        }
        public show_shadow(flag:boolean):void{
            if(flag){
                this.addChildAt(this.m_shadow_sp,0);
            }
            else{
                this.m_shadow_sp.removeSelf();
            }
        }
        public set_dxy(x:number,y:number):void{
            this.m_dx = x;
            this.m_dy = y;
            this.m_sp_front.x = this.m_dx;
            this.m_sp_front.y = this.m_dy;
            this.m_sp_center.x = this.m_dx;
            this.m_sp_center.y = this.m_dy;
            this.m_sp_back.x = this.m_dx;
            this.m_sp_back.y = this.m_dy;
        }
        public change_shape(shape:number):void{
            if(shape == this.m_shape){
                return;
            }
            if(this.m_mat != null)
            {
                this.m_mat.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(this.m_mat);
                this.m_mat = null;
            }
            this.m_shape = shape;
            this.reset_data();
            if(this.m_use_default){
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        }
        public change_weapon(shape:number):void{
            if(shape == this.m_shape_weapon){
                return;
            }
            if(this.m_mat_weapon != null)
            {
                this.m_mat_weapon.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(this.m_mat_weapon);
                this.m_mat_weapon = null;
            }
            this.m_shape_weapon = shape;
        }
        public change_wing(shape:number):void{
            if(shape == this.m_shape_wing){
                return;
            }
            if(this.m_mat_wing != null)
            {
                this.m_mat_wing.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(this.m_mat_wing);
                this.m_mat_wing = null;
            }
            this.m_shape_wing = shape;
        }
        public change_ride(shape:number,backshape:number):void{
            if(shape == this.m_shape_ride){
                return;
            }
            
            if(this.m_mat_ride != null)
            {
                this.m_mat_ride.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(this.m_mat_ride);
                this.m_mat_ride = null;
            }
            if(this.m_mat_backride != null){
                this.m_mat_backride.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(this.m_mat_backride);
                this.m_mat_backride = null;
            }
            this.m_shape_ride = shape;
            this.m_shape_backride = backshape;
            if(this.m_use_default){
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        }
        public set_ride_h(v:number):void{
            this.m_ride_h = v;
        }
        public change_hair(shape:number):void{
            if(shape == this.m_shape_hair){
                return;
            }
            if(this.m_mat_hair != null)
            {
                this.m_mat_hair.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(this.m_mat_hair);
                this.m_mat_hair = null;
            }
            this.m_shape_hair = shape;
        }
        public change_aura(shape:number):void{
            if(this.m_aura_id != 0){
                this.del_adorn(this.m_aura_id);
                this.m_aura_adorn = null;
                this.m_aura_id = 0;
            }
            if(shape == 0){
                return;
            }
            let aura_adorn:avatar_aura = utils.getitembycls("avatar_aura",avatar_aura);
            aura_adorn.re_init(shape);
            this.m_aura_id = aura_adorn.m_id;
            this.m_aura_adorn = aura_adorn;
            this.add_adorn(aura_adorn,true);
        }
        public change_title(shape:number):void{
            if(this.m_title_id != 0){
                this.del_adorn(this.m_title_id);
                this.m_title_adorn = null;
                this.m_title_id = 0;
            }
            if(shape == 0){
                return;
            }
            let aura_adorn:avatar_aura = utils.getitembycls("avatar_aura",avatar_aura);
            aura_adorn.re_init(shape);
            this.m_title_id = aura_adorn.m_id;
            this.m_title_adorn = aura_adorn;
            this.add_adorn(aura_adorn,false);
        }
        private reset_data():void
        {
            this.m_aw = matinfo_mgr().getavataractionw(this.m_shape,this.m_action);
            this.m_ah = matinfo_mgr().getavataractionh(this.m_shape,this.m_action);
            this.m_framecount = matinfo_mgr().getavataractionframecount(this.m_shape,this.m_action);
            this.m_framespeed = matinfo_mgr().getavataractionframespeed(this.m_shape,this.m_action);
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;
            this.m_framecurrenttm = 0;
            this.m_box.setTo(this.x-this.m_aw/2,this.y-this.m_ah/2,this.m_aw,this.m_ah);
            core.core_tiplog("renderavatar resetdata ",this.m_obj_id,this.m_shape,this.m_dir,this.m_action,this.m_framecount);
        }
        public set_name(name):void
        {
            this.m_name = name;
            //todo
            if(this.m_name_sp == null)
            {
                this.m_name_sp = utils.getitembycls("avatarname",avatarname);
                this.m_name_sp.re_init();
                this.m_sp_front.addChild(this.m_name_sp);
            }
            this.m_name_sp.m_text.text = this.m_name;
            if(this.m_name.length > 0){
                this.m_sp_front.addChild(this.m_name_sp);
            }
            else{
                this.m_name_sp.removeSelf()
            }
        }
        public set_name_dxy(x:number,y:number):void{
            this.m_name_dx = x;
            this.m_name_dy = y;
            if(this.m_name_sp != null){
                this.m_name_sp.x = x;
                this.m_name_sp.y = y;
            }
        }
        public set_dy(dy:number):void{
            this.m_mat_dy = dy-this.m_ah/2;
        }
        public set_dx(dx:number):void{
            this.m_mat_dx = dx;
        }
        public get_buffui():avatarbuffui{
            if(this.m_buff == null){
                this.m_buff = utils.getitembycls("avatarbuffui",avatarbuffui);
                this.m_buff.re_init();
                this.m_sp_front.addChild(this.m_buff);
            }
            return this.m_buff;
        }
        public del_buffui():void{
            if(this.m_buff != null){
                this.m_buff.removeSelf();
                this.m_buff.clear();
                utils.recover("avatarbuffui",this.m_buff);
                this.m_buff = null;
            }
        }
        public add_buffeff(eff_id:number):number{
            return 0;
        }
        public del_buffeff(buff_eff_id:number):void{
        }
        public clearall_buffeff():void{
        }
        public set_hp(v:number,m:number):void
        {
            if(this.m_hp == null){
                this.m_hp = utils.getitembycls("avatarhp",avatarhp);
                this.m_hp.re_init();
                this.m_sp_front.addChild(this.m_hp);
                this.m_hp.x = 0-(this.m_hp.m_w/2);
                this.m_hp.y = -120;
            }
            this.m_hp.set_v(v,m);
        }
        public del_hp():void{
            if(this.m_hp != null){
                this.m_hp.removeSelf();
                this.m_hp.clear();
                utils.recover("avatarhp",this.m_hp);
                this.m_hp = null;
            }
        }
        public add_adorn(sp:renderavatar_adorn,b_back:boolean):number{
            this.del_adorn(sp.m_id);
            if(b_back){
                this.m_sp_back.addChild(sp);
            }
            else{
                this.m_sp_front.addChild(sp);
            }
            this.m_adorn_list.push(sp);
            return sp.m_id;
        }
        public get_adorn(id:number):renderavatar_adorn{
            let idx:number = 0;
            for(let i of this.m_adorn_list){
                if(i.m_id == id){
                    return i;
                }
                idx++;
            }
            return null;
        }
        public del_adorn(id:number):void{
            let idx:number = 0;
            for(let i of this.m_adorn_list){
                if(i.m_id == id){
                    i.removeSelf();
                    i.dispose();
                    this.m_adorn_list.splice(idx,1);
                    return;
                }
                idx++;
            }
        }
        public change_action(action:number,b_cycle:boolean = true,stop_f:number = -1):void
        {
            core.core_tiplog("renderavatar change_action ",this.m_obj_id,this.m_shape,this.m_action,action,this.m_dir);
            
            this.m_lastaction = this.m_action;
            this.m_action = action;
            this.m_b_cycle = b_cycle;
            this.m_b_stop_frame = stop_f;
            if(action != this.m_action){
                if(this.m_use_default){
                    this.m_draw_avatar = false;
                    this.m_sp_center.removeSelf();
                    this.create_default_sp();
                }
            }
            
        }
        public change_dir(dir:number):void
        {
            if(dir == this.m_dir)
            {
                return;
            }
            this.m_dir = dir;
            if(this.m_mat != null)
            {
                this.m_mat.changedir(dir);
            }
            //
            if(this.m_mat_weapon != null)
            {
                this.m_mat_weapon.changedir(dir);
                let sp:Laya.Sprite = this._get_weapon_sp(dir,this.m_mat_weapon.m_b_mirrior);
                this.m_mat_weapon.m_graphic.removeSelf();
                sp.addChild(this.m_mat_weapon.m_graphic);
            }
            if(this.m_mat_wing != null)
            {
                this.m_mat_wing.changedir(dir);
                let sp:Laya.Sprite = this._get_wing_sp(dir,this.m_mat_wing.m_b_mirrior);
                this.m_mat_wing.m_graphic.removeSelf();
                sp.addChild(this.m_mat_wing.m_graphic);
            }
            if(this.m_mat_ride != null)
            {
                this.m_mat_ride.changedir(dir);
            }
            if(this.m_mat_backride != null){
                this.m_mat_backride.changedir(dir);
            }
            if(this.m_mat_hair != null)
            {
                this.m_mat_hair.changedir(dir);
            }
            //
        }
        private _project_mat(mat:avataractionmaterial,mtype:number,shape:number,sp:Laya.Sprite,b_create:boolean = true):avataractionmaterial{
            if(mat != null && mat.m_action != this.m_action)
            {
                //core.core_tiplog("renderavatar project change mat ",this.m_mat.m_action,this.m_action);
                mat.m_graphic.removeSelf();
                mat_mgr().delavataractionmaterial(mat);
                mat = null;
            }
            if(mat == null)
            {
                mat = mat_mgr().getavataractionmat(shape,this.m_action);
                //mat.m_graphic.x = this._get_mat_dx();
                //mat.m_graphic.y = this._get_mat_dy();
                if(sp){
                    sp.addChild(mat.m_graphic);
                }
                
                //if(this.m_draw_link){
                //    mat.m_graphic.addChild(mat.m_link_sp);
                //}
                mat.changedir(this.m_dir);
            }
            return mat;
        }
        public set_scale(sx:number,sy:number):void{
            this.m_sp_center.scale(sx,sy);
        }

        private _get_mat_dx():number{
            return this.m_mat_dx;
        }
        private _get_mat_dy():number{
            return this.m_mat_dy-this.m_ride_h;
        }
        private _get_weapon_sp(dir:number,b_mirror:boolean = false):Laya.Sprite{
            if(dir >= 2 && dir <= 5){
                return this.m_sp_center_b;
            }
            return this.m_sp_center_f;
        }
        private _get_wing_sp(dir:number,b_mirror:boolean = false):Laya.Sprite{
            if(dir >= 2 && dir <= 5){
                return this.m_sp_center_f;
            }
            return this.m_sp_center_b;
        }
        public project(context:rendercontext):boolean
        {
            let ret:boolean = super.project(context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if(ret)
            {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);

                if(this.m_mat != null && this.m_mat.m_action != this.m_action)
                {
                    this.reset_data();
                }
                if(this.m_aura_adorn != null){
                    this.m_aura_adorn.load_res();
                }
                if(this.m_title_adorn != null){
                    this.m_title_adorn.load_res();
                }
                let b_br:boolean = true;
                if(this.m_shape_backride != 0){
                    this.m_mat_backride = this._project_mat(this.m_mat_backride,5,this.m_shape_backride,this.m_sp_center_rb,this.m_action != AVATAR_ACTON.ACTION_DEAD);
                    if(!this.m_draw_avatar){
                        b_br = this.m_mat_backride.m_b_loaded;
                    }
                }
                let b_m:boolean = true;
                this.m_mat = this._project_mat(this.m_mat,0,this.m_shape,this.m_sp_center_c);
                if(!this.m_draw_avatar){
                    b_m = this.m_mat.m_b_loaded;
                }
                if(this.m_shape_weapon != 0){
                    this.m_mat_weapon = this._project_mat(this.m_mat_weapon,1,this.m_shape_weapon,this._get_weapon_sp(this.m_dir));
                }
                if(this.m_shape_wing != 0){
                    this.m_mat_wing = this._project_mat(this.m_mat_wing,2,this.m_shape_wing,this._get_wing_sp(this.m_dir));
                }
                let b_fr:boolean = true;
                if(this.m_shape_ride != 0){
                    this.m_mat_ride = this._project_mat(this.m_mat_ride,3,this.m_shape_ride,this.m_sp_center_rf,this.m_action != AVATAR_ACTON.ACTION_DEAD);
                    if(!this.m_draw_avatar){
                        b_fr = this.m_mat_ride.m_b_loaded;
                    }
                }
                
                if(this.m_shape_hair != 0){
                    this.m_mat_hair = this._project_mat(this.m_mat_hair,4,this.m_shape_hair,this.m_sp_center);
                }
                if(!this.m_draw_avatar){
                    if(b_br && b_m && b_fr){
                        this.m_draw_avatar = true;
                        this.m_sp_back.removeSelf();
                        this.m_sp_front.removeSelf();
                        this.addChild(this.m_sp_back);
                        this.addChild(this.m_sp_center);
                        this.addChild(this.m_sp_front);
                        this.del_default_sp();
                    }
                }
            }
            return ret;
        }
        private _update_mat(mat:avataractionmaterial,frame:number):void
        {
            mat.goto_frame(frame);
        }
        public update(delta:number):void
        {
            for(let i of this.m_adorn_list){
                i.update(delta);
            }

            this.m_framecurrenttm += delta;
            let framecount:number = Math.floor(this.m_framecurrenttm/this.m_framemillsec);
            
            //core.core_tiplog("renderavatar update ",this.m_obj_id,this.m_shape,this.m_dir,this.m_action,this.m_framecurrent,framecount,this.m_framecount);
            if(this.m_b_cycle == false){
                if(this.m_b_stop_frame == 0){
                    if(framecount > this.m_framecount - 1)
                    {
                        this.change_action(this.m_lastaction);
                        return;
                    }
                }
                else
                {
                    let stop_f:number = this.m_framecount - 1;
                    if(this.m_b_stop_frame != -1){
                        stop_f = this.m_b_stop_frame;
                    }
                    if(framecount > stop_f){
                        framecount = stop_f;
                        if(framecount < 0){
                            framecount = 0;
                        }
                    }
                }
            }
            this.m_framecurrent = framecount%this.m_framecount;
            if(!this.m_draw_avatar){
                return;
            }
            //this.m_sp_front.graphics.clear();
            //this.m_sp_front.graphics.drawRect(0,0,6,6,"#ff00ff");

            let org_pt:Laya.Point = this.m_org_pt;
            if(this.m_mat != null)
            {
                org_pt = this.m_mat.get_link(this.m_dir,0,this.m_framecurrent);
                this._update_mat(this.m_mat,this.m_framecurrent);
                this.m_mat.m_graphic.x = this._get_mat_dx();
                this.m_mat.m_graphic.y = this._get_mat_dy();
                //this.m_mat.m_graphic.graphics.clear();
                //this.m_mat.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");

                /*
                if(this.m_draw_link){
                    this.m_mat.m_link_sp.graphics.clear();
                    this.m_mat.m_graphic.addChild(this.m_mat.m_link_sp);
                    let tmpx:number = org_pt.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat.m_link_sp.graphics.drawRect(tmpx,org_pt.y,6,6,"#ff0000");
                    let org_pt1:Laya.Point = this.m_mat.get_link(this.m_dir,3,this.m_framecurrent);
                    tmpx = org_pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat.m_link_sp.graphics.drawRect(tmpx,org_pt1.y,6,6,"#00ff00");
                    org_pt1 = this.m_mat.get_link(this.m_dir,1,this.m_framecurrent);
                    tmpx = org_pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat.m_link_sp.graphics.drawRect(tmpx,org_pt1.y,6,6,"#ff0000");
                    //console.log("body link ",org_pt.x,org_pt.y);
                }
                */
            }
            else{
                return;
            }
            if(this.m_mat_weapon != null)
            {
                this._update_mat(this.m_mat_weapon,this.m_framecurrent);
                let pt:Laya.Point = this.m_mat.get_link(this.m_dir,3,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_weapon.get_link(this.m_dir,0,this.m_framecurrent);
                if(this.m_mat.m_cur_mirrior){
                    this.m_mat_weapon.m_graphic.x = this._get_mat_dx()+pt1.x-pt.x;
                }
                else{
                    this.m_mat_weapon.m_graphic.x = this._get_mat_dx()+pt.x-pt1.x;
                }
                
                this.m_mat_weapon.m_graphic.y = this._get_mat_dy()+pt.y-pt1.y;
                /*
                if(this.m_draw_link){
                    this.m_mat_weapon.m_link_sp.graphics.clear();
                    this.m_mat_weapon.m_graphic.addChild(this.m_mat_weapon.m_link_sp);
                    let tmpx:number = pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat_weapon.m_link_sp.graphics.drawRect(tmpx,pt1.y,6,6,"#000000");
                    //console.log("ride link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
            }
            if(this.m_mat_wing != null)
            {
                this._update_mat(this.m_mat_wing,this.m_framecurrent);
                let pt:Laya.Point = this.m_mat.get_link(this.m_dir,1,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_wing.get_link(this.m_dir,0,this.m_framecurrent);
                if(this.m_mat.m_cur_mirrior){
                    this.m_mat_wing.m_graphic.x = this._get_mat_dx()+pt1.x-pt.x;
                }
                else{
                    this.m_mat_wing.m_graphic.x = this._get_mat_dx()+pt.x-pt1.x;
                }
                
                this.m_mat_wing.m_graphic.y = this._get_mat_dy()+pt.y-pt1.y;
                /*
                if(this.m_draw_link){
                    this.m_mat_wing.m_link_sp.graphics.clear();
                    this.m_mat_wing.m_graphic.addChild(this.m_mat_wing.m_link_sp);
                    let tmpx:number = pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat_wing.m_link_sp.graphics.drawRect(tmpx,pt1.y,6,6,"#ffffff");
                    //console.log("ride link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
            }
            this.m_sp_center_b.x = 0;
            this.m_sp_center_b.y = 0;
            this.m_sp_center_c.x = 0;
            this.m_sp_center_c.y = 0;
            this.m_sp_center_f.x = 0;
            this.m_sp_center_f.y = 0;
            if(this.m_mat_ride != null)
            {
                this._update_mat(this.m_mat_ride,this.m_framecurrent);
                let pt:Laya.Point = this.m_mat_ride.get_link(this.m_dir,3,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_ride.get_link(this.m_dir,0,this.m_framecurrent);
                this.m_mat_ride.m_graphic.x = this._get_mat_dx();// + pt1.x - pt.x - (pt1.x-org_pt.x);
                this.m_mat_ride.m_graphic.y = this._get_mat_dy();// + pt1.y - pt.y - (pt1.y -org_pt.y);
                /*
                if(this.m_draw_link){
                    this.m_mat_ride.m_link_sp.graphics.clear();
                    this.m_mat_ride.m_graphic.addChild(this.m_mat_ride.m_link_sp);
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt.x,pt.y,2,2,"#ff0000");
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt1.x,pt1.y,2,2,"#00ff00");
                    //console.log("ride link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
            }
            if(this.m_mat_backride != null){
                this._update_mat(this.m_mat_backride,this.m_framecurrent);
                let pt:Laya.Point = this.m_mat_backride.get_link(this.m_dir,3,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_backride.get_link(this.m_dir,0,this.m_framecurrent);
                this.m_mat_backride.m_graphic.x = this._get_mat_dx();// + pt1.x - pt.x- (pt1.x-org_pt.x);
                this.m_mat_backride.m_graphic.y = this._get_mat_dy();// + pt1.y - pt.y- (pt1.y -org_pt.y);
                /*
                if(this.m_draw_link){
                    this.m_mat_ride.m_link_sp.graphics.clear();
                    this.m_mat_ride.m_graphic.addChild(this.m_mat_ride.m_link_sp);
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt.x,pt.y,4,4,"#00ff00");
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt1.x,pt1.y,4,4,"#ff0000");
                    //console.log("rideback  link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
                let rb_dx:number = pt.x - pt1.x;
                if(this.m_mat.m_cur_mirrior){
                    rb_dx = pt1.x - pt.x;
                }
                let rb_dy:number = pt.y - pt1.y+pt1.y-org_pt.y;
                this.m_sp_center_b.x = rb_dx;
                this.m_sp_center_b.y = rb_dy;
                this.m_sp_center_c.x = rb_dx;
                this.m_sp_center_c.y = rb_dy;
                this.m_sp_center_f.x = rb_dx;
                this.m_sp_center_f.y = rb_dy;
            }
            if(this.m_mat_hair != null)
            {
                this._update_mat(this.m_mat_hair,this.m_framecurrent);
                let pt:Laya.Point = this.m_mat.get_link(this.m_dir,2,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_hair.get_link(this.m_dir,0,this.m_framecurrent);
                if(this.m_mat.m_cur_mirrior){
                    this.m_mat_hair.m_graphic.x = this._get_mat_dx()+pt1.x-pt.x;
                }
                else{
                    this.m_mat_hair.m_graphic.x = this._get_mat_dx()+pt.x-pt1.x;
                }
                
                this.m_mat_hair.m_graphic.y = this._get_mat_dy()+pt.y-pt1.y;
            }
        }
        //从parent里把自己移除?
        public is_contain(x:number,y:number):boolean{
            let ret:boolean = super.is_contain(x,y);
            if(ret){
                let rt:Laya.Rectangle = null;
                ret = false;
                let rx:number;
                let ry:number;
                let w:number;
                let h:number;
                if(this.m_mat != null)
                {
                    rt = this.m_mat.get_rect();
                    if(rt != null){
                        rx = this.x + this.m_mat.m_graphic.x-this.m_aw/2+rt.x-this._get_mat_dx();
                        ry = this.y + this.m_mat.m_graphic.y-this.m_ah/2+rt.y-this._get_mat_dy()-this.m_ride_h;
                        if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                            ret = true;
                        }
                    }
                    
                    
                }
                if(!ret && this.m_mat_weapon != null){
                    rt = this.m_mat_weapon.get_rect();
                    if(rt != null){
                        rx = this.x + this.m_mat_weapon.m_graphic.x-this.m_aw/2+rt.x-this._get_mat_dx();
                        ry = this.y + this.m_mat_weapon.m_graphic.y-this.m_ah/2+rt.y-this._get_mat_dy()-this.m_ride_h;
                        if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                            ret = true;
                        }
                    }
                    
                }
                if(!ret && this.m_mat_wing != null){
                    rt = this.m_mat_wing.get_rect();
                    if(rt != null){
                        rx = this.x + this.m_mat_wing.m_graphic.x-this.m_aw/2+rt.x-this._get_mat_dx();
                        ry = this.y + this.m_mat_wing.m_graphic.y-this.m_ah/2+rt.y-this._get_mat_dy()-this.m_ride_h;
                        if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                            ret = true;
                        }
                    }
                    
                }
                if(!ret && this.m_mat_ride != null){
                    rt = this.m_mat_ride.get_rect();
                    if(rt != null){
                        rx = this.x + this.m_mat_ride.m_graphic.x-this.m_aw/2+rt.x-this._get_mat_dx();
                        ry = this.y + this.m_mat_ride.m_graphic.y-this.m_ah/2+rt.y-this._get_mat_dy()-this.m_ride_h;
                        if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)&&rt.width!=512){
                            ret = true;
                        }
                    }
                }
                if(!ret && this.m_mat_backride != null){
                    rt = this.m_mat_backride.get_rect();
                    if(rt != null){
                        rx = this.x + this.m_mat_backride.m_graphic.x-this.m_aw/2+rt.x-this._get_mat_dx();
                        ry = this.y + this.m_mat_backride.m_graphic.y-this.m_ah/2+rt.y-this._get_mat_dy()-this.m_ride_h;
                        if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)&&rt.width!=512){
                            ret = true;
                        }
                    }
                }
                if(!ret && this.m_mat_hair != null){
                    rt = this.m_mat_hair.get_rect();
                    if(rt != null){
                        rx = this.x + this.m_mat_hair.m_graphic.x-this.m_aw/2+rt.x-this._get_mat_dx();
                        ry = this.y + this.m_mat_hair.m_graphic.y-this.m_ah/2+rt.y-this._get_mat_dy()-this.m_ride_h;
                        if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                            ret = true;
                        }
                    }
                }
            }
            return ret;
        }
        private create_default_sp():void{
            if(this.m_default_sp == null){
                this.m_default_sp = utils.getitembycls("renderavatar_default",renderavatar_default);
                this.addChild(this.m_default_sp);
                this.m_default_sp.y = -120;
                this.m_default_sp.x = -26;
            }
        }
        private del_default_sp():void{
            if(this.m_default_sp != null){
                this.m_default_sp.removeSelf();
                utils.recover("renderavatar_default",this.m_default_sp);
                this.m_default_sp = null;
            }
        }
        public dispose():void
        {
            this.removeChildren();
            if(this.m_shadow_sp != null){
                this.m_shadow_sp.removeSelf();
                utils.recover("renderavatar_shadow",this.m_shadow_sp);
                this.m_shadow_sp = null;
            }
            this.del_default_sp();
            if(this.m_sp_back != null){
                this.m_sp_back.removeChildren();
                this.m_sp_back = null;
            }
            if(this.m_sp_front != null){
                this.m_sp_front.removeChildren();
                this.m_sp_front = null;
            }
            if(this.m_sp_center != null){
                this.m_sp_center.removeChildren();
                this.m_sp_center = null;
            }
            if(this.m_sp_center_c != null){
                this.m_sp_center_c.removeChildren();
                this.m_sp_center_c = null;
            }
            if(this.m_sp_center_b != null){
                this.m_sp_center_b.removeChildren();
                this.m_sp_center_b = null;
            }
            if(this.m_sp_center_f != null){
                this.m_sp_center_f.removeChildren();
                this.m_sp_center_f = null;
            }
            if(this.m_sp_center_rb != null){
                this.m_sp_center_rb.removeChildren();
                this.m_sp_center_rb = null;
            }
            if(this.m_sp_center_rf != null){
                this.m_sp_center_rf.removeChildren();
                this.m_sp_center_rf = null;
            }
            if(this.m_aura_id != 0){
                this.change_aura(0);
            }
            if(this.m_title_id != 0){
                this.change_title(0);
            }
            for(let i of this.m_adorn_list){
                i.dispose();
            }
            this.m_adorn_list.length = 0;
            this.removeChildren();
            if(this.m_name_sp != null)
            {
                this.m_name_sp.dispose();
                utils.recover("avatarname",this.m_name_sp);
                this.m_name_sp = null;
            }
            this.del_hp();
            this.del_buffui();
            if(this.m_mat != null)
            {
                mat_mgr().delavataractionmaterial(this.m_mat);
                this.m_mat = null;
            }
            if(this.m_mat_weapon != null){
                mat_mgr().delavataractionmaterial(this.m_mat_weapon);
                this.m_mat_weapon = null;
            }
            if(this.m_mat_wing != null){
                mat_mgr().delavataractionmaterial(this.m_mat_wing);
                this.m_mat_wing = null;
            }
            if(this.m_mat_ride != null){
                mat_mgr().delavataractionmaterial(this.m_mat_ride);
                this.m_mat_ride = null;
            }
            if(this.m_mat_backride != null){
                mat_mgr().delavataractionmaterial(this.m_mat_backride);
                this.m_mat_backride = null;
            }
            if(this.m_mat_hair != null){
                mat_mgr().delavataractionmaterial(this.m_mat_hair);
                this.m_mat_hair = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                utils.recover("avatarcommand",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
//////////////////////////////////////////////////////////////////////////////////////
    export class renderavatar_new extends renderobject {
        public m_designw:number = 512;
        public m_designh:number = 512;
        public m_shape:number = 0;
        public m_shape_weapon:number = 0;
        public m_shape_wing:number = 0;
        public m_shape_ride:number = 0;
        public m_shape_backride:number = 0;
        public m_shape_hair:number = 0;
        public m_aura_id:number = 0;
        public m_aura_adorn:avatar_aura_new = null;
        public m_title_id:number = 0;
        public m_title_adorn:avatar_aura_new = null;
        public m_action:number = 0;
        public m_lastaction:number = 0;
        public m_dir:number = 0;
        public m_aw:number;
        public m_ah:number;
        public m_framecount:number;
        public m_framespeed:number;
        public m_framecurrent:number = 0;
        public m_framemillsec:number = 0;
        public m_frametotalmillsec:number = 0;
        public m_framecurrenttm:number = 0;
        public m_mat_dx:number = 0;//-256;
        public m_mat_dy:number = -this.m_designh/2;//-256;
        public m_ride_h:number = 0;
        public m_user_data:any = 0;
        public m_name:string = "";
        public m_name_dx:number = 0;
        public m_name_dy:number = 0;
        public m_name_sp:avatarname = null;
        public m_hp:avatarhp = null;
        public m_buff:avatarbuffui = null;
        public m_buffeff_list:Array<avatar_aura_new> = new Array<avatar_aura_new>();
        public m_eff_list:Array<avatar_aura_new> = new Array<avatar_aura_new>();
        public m_b_cycle:boolean = true;
        public m_b_stop_frame:number = -1;
        public m_sp_front:Laya.Sprite = null;
        public m_sp_back:Laya.Sprite = null;
        public m_sp_center:Laya.Sprite = null;
        
        public m_adorn_list:Array<renderavatar_adorn> = new Array<renderavatar_adorn>();
        public m_dx:number = 0;
        public m_dy:number = 0;
        public m_org_pt:Laya.Point = new Laya.Point(0,0);
        public m_shadow_sp:Laya.Texture = null;
        private m_default_sp:renderavatar_default = null;
        public m_draw_avatar:boolean = false;
        private m_use_default:boolean = true;
        public m_b_projected:boolean = false;
        public m_draw_link:boolean = false;

        public m_mat:lavataractionmat;
        public m_mat_rt:Laya.Rectangle = new Laya.Rectangle();
        public m_weapon_behind:boolean = false;
        public m_mat_weapon:lavataractionmat;
        public m_mat_weapon_rt:Laya.Rectangle = new Laya.Rectangle();
        public m_mat_wing:lavataractionmat;
        public m_mat_wing_rt:Laya.Rectangle = new Laya.Rectangle();
        public m_mat_ride:lavataractionmat;
        public m_mat_ride_rt:Laya.Rectangle = new Laya.Rectangle();
        public m_mat_backride:lavataractionmat;
        public m_mat_backeride_rt:Laya.Rectangle = new Laya.Rectangle();
        public m_mat_hair:lavataractionmat;
        public m_mat_hair_rt:Laya.Rectangle = new Laya.Rectangle();
        constructor(){
            super();

        }
        public re_init(shape:number,x:number,y:number,use_default:boolean = true):void{
            this.set_id();
            this.scale(1.0,1.0);
            this.alpha = 1.0;
            this.m_draw_link = false;
            this.m_name_dx = 0;
            this.m_name_dy = 0;

            this.m_sp_front = new Laya.Sprite();
            
            this.m_sp_back = new Laya.Sprite();
            this.m_sp_center = new Laya.Sprite();
            
            this.m_shadow_sp = mat_mgr().get_avatar_shadow_mat();
            
            this.set_ride_h(0);
            this.m_mat_dy = -this.m_designh/2;
            this.m_use_default = use_default;
            if(this.m_use_default){
                this.m_draw_avatar = false;
                this.create_default_sp();
            }
            else{
                this.m_draw_avatar = true;
            }
            
            this.m_dx = 0;
            this.m_dy = 0;
            //avatarcmdnew
            //this.addChild(this.m_sp_back);
            //this.addChild(this.m_sp_center);
            //this.addChild(this.m_sp_front);
            this.m_shape = shape;
            this.rotation = 0;
            this.alpha = 1;
            
            //avatarcmdnew
            this.m_rc = utils.getitembycls("avatarcommand_new",avatarcommand_new);
            //this.m_rc = utils.getitembycls("avatarcommand",avatarcommand);
            this.m_rc.re_init(this);
            
            super.set_pos(x,y);
            
            if(this.m_mat != null){
                mat_mgr().dellavatarmaterial(this.m_mat);
            }
            this.m_mat = null;//only start to load when it is projected 
            if(this.m_mat_weapon != null){
                mat_mgr().dellavatarmaterial(this.m_mat_weapon);
            }
            this.m_mat_weapon = null;
            if(this.m_mat_wing != null){
                mat_mgr().dellavatarmaterial(this.m_mat_wing);
            }
            this.m_mat_wing = null;
            if(this.m_mat_ride != null){
                mat_mgr().dellavatarmaterial(this.m_mat_ride);
            }
            this.m_mat_ride = null;
            if(this.m_mat_backride != null){
                mat_mgr().dellavatarmaterial(this.m_mat_backride);
            }
            this.m_mat_backride = null;
            if(this.m_mat_hair != null){
                mat_mgr().dellavatarmaterial(this.m_mat_hair);
            }
            this.m_mat_hair = null;

            this.m_weapon_behind = false;
            this.m_shape_weapon = 0;
            this.m_shape_wing = 0;
            this.m_shape_ride = 0;
            this.m_shape_backride = 0;
            this.m_shape_hair = 0;
            this.m_aura_id = 0;
            this.m_aura_adorn = null;
            this.m_title_id = 0;
            this.m_title_adorn = null;
            this.m_buffeff_list = new Array<avatar_aura_new>();
            this.m_eff_list = new Array<avatar_aura_new>();
            this.reset_data();
            this.graphics.clear();
        }
        public show_shadow(flag:boolean):void{
            if(flag){
                this.m_shadow_sp = mat_mgr().get_avatar_shadow_mat();
            }
            else{
                this.m_shadow_sp = null;
            }
        }
        public set_dxy(x:number,y:number):void{
            this.m_dx = x;
            this.m_dy = y;
            this.m_sp_front.x = this.m_dx;
            this.m_sp_front.y = this.m_dy;
            this.m_sp_center.x = this.m_dx;
            this.m_sp_center.y = this.m_dy;
            this.m_sp_back.x = this.m_dx;
            this.m_sp_back.y = this.m_dy;
        }
        public change_shape(shape:number):void{
            if(shape == this.m_shape){
                return;
            }
            this.m_shape = shape;
            this.reset_data();
            if(this.m_use_default){
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        }
        public change_weapon(shape:number,behind_body:boolean = false):void{
            if(shape == this.m_shape_weapon){
                return;
            }
            this.m_shape_weapon = shape;
            this.m_weapon_behind = behind_body;
        }
        public change_wing(shape:number):void{
            if(shape == this.m_shape_wing){
                return;
            }
            this.m_shape_wing = shape;
        }
        public change_ride(shape:number,backshape:number):void{
            if(shape == this.m_shape_ride){
                return;
            }
            
            this.m_shape_ride = shape;
            this.m_shape_backride = backshape;
            if(this.m_use_default){
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        }
        public set_ride_h(v:number):void{
            this.m_ride_h = v;
        }
        public change_hair(shape:number):void{
            if(shape == this.m_shape_hair){
                return;
            }
            this.m_shape_hair = shape;
        }
        public change_aura(shape:number):void{
            if(this.m_aura_id != 0){
                this.del_adorn(this.m_aura_id);
                this.m_aura_adorn = null;
                this.m_aura_id = 0;
            }
            if(shape == 0){
                return;
            }
            let aura_adorn:avatar_aura_new = utils.getitembycls("avatar_aura_new",avatar_aura_new);
            aura_adorn.re_init(shape);
            this.m_aura_id = aura_adorn.m_id;
            this.m_aura_adorn = aura_adorn;
            this.add_adorn(aura_adorn,true);
        }
        public change_title(shape:number):void{
            if(this.m_title_id != 0){
                this.del_adorn(this.m_title_id);
                this.m_title_adorn = null;
                this.m_title_id = 0;
            }
            if(shape == 0){
                return;
            }
            let aura_adorn:avatar_aura_new = utils.getitembycls("avatar_aura_new",avatar_aura_new);
            aura_adorn.re_init(shape);
            this.m_title_id = aura_adorn.m_id;
            this.m_title_adorn = aura_adorn;
            this.add_adorn(aura_adorn,false);
        }
        private reset_data():void
        {
            this.m_aw = matinfo_mgr().getavataractionw(this.m_shape,this.m_action);
            this.m_ah = matinfo_mgr().getavataractionh(this.m_shape,this.m_action);
            this.m_mat_dy = -this.m_ah/2;
            this.m_framecount = matinfo_mgr().getavataractionframecount(this.m_shape,this.m_action);
            this.m_framespeed = matinfo_mgr().getavataractionframespeed(this.m_shape,this.m_action);
            this.m_framemillsec = 1000.0/this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount*1000.0/this.m_framespeed;
            this.m_framecurrenttm = 0;
            this.m_box.setTo(this.x-this.m_aw/2,this.y-this.m_ah/2,this.m_aw,this.m_ah);
            core.core_tiplog("renderavatar resetdata ",this.m_obj_id,this.m_shape,this.m_dir,this.m_action,this.m_framecount);
        }
        public set_name(name):void
        {
            this.m_name = name;
            //todo
            if(this.m_name_sp == null)
            {
                this.m_name_sp = utils.getitembycls("avatarname",avatarname);
                this.m_name_sp.re_init();
                //this.m_sp_front.addChild(this.m_name_sp);
            }
            this.m_name_sp.m_text.text = this.m_name;
            if(this.m_name.length > 0){
                //this.m_sp_front.addChild(this.m_name_sp);
            }
            else{
                this.m_name_sp.removeSelf()
            }
        }
        public set_name_dxy(x:number,y:number):void{
            this.m_name_dx = x;
            this.m_name_dy = y;
            if(this.m_name_sp != null){
                this.m_name_sp.x = x;
                this.m_name_sp.y = y;
            }
        }
        public set_dy(dy:number):void{
            this.m_mat_dy = dy-this.m_ah/2;
        }
        public set_dx(dx:number):void{
            this.m_mat_dx = dx;
        }
        public get_buffui():avatarbuffui{
            if(this.m_buff == null){
                this.m_buff = utils.getitembycls("avatarbuffui",avatarbuffui);
                this.m_buff.re_init();
                this.addChild(this.m_buff);
            }
            return this.m_buff;
        }
        public del_buffui():void{
            if(this.m_buff != null){
                this.m_buff.removeSelf();
                this.m_buff.clear();
                utils.recover("avatarbuffui",this.m_buff);
                this.m_buff = null;
            }
        }
        public addeff(eff_id:number,b_front:boolean = true,dx:number = 0,dy:number = 0):number{
            if(eff_id == 0){
                return;
            }
            let aura_adorn:avatar_aura_new = utils.getitembycls("avatar_aura_new",avatar_aura_new);
            aura_adorn.re_init(eff_id);
            aura_adorn.m_dx = dx;
            aura_adorn.m_dy = dy;
            let id:number = aura_adorn.m_id;
            this.add_adorn(aura_adorn,!b_front);
            this.m_eff_list.push(aura_adorn);
            return id;
        }
        public del_eff(eff_id:number):void{
            for(let i:number = 0;i < this.m_eff_list.length;++i){
                let b:avatar_aura_new = this.m_eff_list[i];
                if(b.m_id == eff_id){
                    this.del_adorn(b.m_id);
                    this.m_eff_list.splice(i,1);
                    return;
                }
            }
        }
        public clearall_eff():void{
            for(let i of this.m_eff_list){
                this.del_adorn(i.m_id);
            }
            this.m_eff_list = new Array<avatar_aura_new>();
        }
        public add_buffeff(eff_id:number):number{
            if(eff_id == 0){
                return;
            }
            let aura_adorn:avatar_aura_new = utils.getitembycls("avatar_aura_new",avatar_aura_new);
            aura_adorn.re_init(eff_id);
            let id:number = aura_adorn.m_id;
            this.add_adorn(aura_adorn,false);
            this.m_buffeff_list.push(aura_adorn);
            return id;
        }
        public del_buffeff(buff_eff_id:number):void{
            for(let i:number = 0;i < this.m_buffeff_list.length;++i){
                let b:avatar_aura_new = this.m_buffeff_list[i];
                if(b.m_id == buff_eff_id){
                    this.del_adorn(b.m_id);
                    this.m_buffeff_list.splice(i,1);
                    return;
                }
            }
        }
        public clearall_buffeff():void{
            for(let i of this.m_buffeff_list){
                this.del_adorn(i.m_id);
            }
            this.m_buffeff_list = new Array<avatar_aura_new>();
        }
        public set_hp(v:number,m:number):void
        {
            if(this.m_hp == null){
                this.m_hp = utils.getitembycls("avatarhp",avatarhp);
                this.m_hp.re_init();
                this.addChild(this.m_hp);
                this.m_hp.x = 0-(this.m_hp.m_w/2);
                this.m_hp.y = -120;
            }
            this.m_hp.set_v(v,m);
        }
        public del_hp():void{
            if(this.m_hp != null){
                this.m_hp.removeSelf();
                this.m_hp.clear();
                utils.recover("avatarhp",this.m_hp);
                this.m_hp = null;
            }
        }
        public add_adorn(sp:renderavatar_adorn,b_back:boolean):number{
            this.del_adorn(sp.m_id);
            if(b_back){
                //this.m_sp_back.addChild(sp);
            }
            else{
                //this.m_sp_front.addChild(sp);
            }
            sp.m_front = !b_back;
            this.m_adorn_list.push(sp);
            return sp.m_id;
        }
        public get_adorn(id:number):renderavatar_adorn{
            let idx:number = 0;
            for(let i of this.m_adorn_list){
                if(i.m_id == id){
                    return i;
                }
                idx++;
            }
            return null;
        }
        public del_adorn(id:number):void{
            let idx:number = 0;
            for(let i of this.m_adorn_list){
                if(i.m_id == id){
                    i.removeSelf();
                    i.dispose();
                    this.m_adorn_list.splice(idx,1);
                    return;
                }
                idx++;
            }
        }
        public change_action(action:number,b_cycle:boolean = true,stop_f:number = -1):void
        {
            core.core_tiplog("renderavatar change_action ",this.m_obj_id,this.m_shape,this.m_action,action,this.m_dir);
            let b_changed:boolean = this.m_action != action;
            this.m_lastaction = this.m_action;
            this.m_action = action;
            this.reset_data();
            this.m_b_cycle = b_cycle;
            this.m_b_stop_frame = stop_f;
            b_changed = false;//very ugly,dont changed
            if(b_changed){
                if(this.m_use_default){
                    this.m_draw_avatar = false;
                    this.m_sp_center.removeSelf();
                    this.create_default_sp();
                }
            }
            
        }
        public change_dir(dir:number):void
        {
            if(dir == this.m_dir)
            {
                return;
            }
            this.m_dir = dir;
            //
        }
        private _project_mat(mat:lavataractionmat,cur_shape:number):lavataractionmat{
            if(mat != null && (mat.m_action != this.m_action || mat.m_shape != cur_shape))
            {
                //core.core_tiplog("renderavatar project change mat ",this.m_mat.m_action,this.m_action);
                mat_mgr().dellavatarmaterial(mat);
                mat = null;
            }
            if(mat == null)
            {
                mat = mat_mgr().getlavatarmat(cur_shape,this.m_action);
            }
            return mat;
        }
        public set_scale(sx:number,sy:number):void{
            this.scale(sx,sy);
        }

        private _get_mat_dx():number{
            return this.m_mat_dx;
        }
        private _get_mat_dy():number{
            return this.m_mat_dy-this.m_ride_h;
        }
        public project(context:rendercontext):boolean
        {
            let ret:boolean = super.project(context);
            this.m_b_projected = ret;
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if(ret)
            {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);

                if(this.m_mat != null && (this.m_mat.m_action != this.m_action || this.m_mat.m_shape != this.m_shape))
                {
                    this.reset_data();
                }
                if(this.m_aura_adorn != null){
                    this.m_aura_adorn.load_res();
                }
                if(this.m_title_adorn != null){
                    this.m_title_adorn.load_res();
                }
                for(let i of this.m_buffeff_list){
                    i.load_res();
                }
                for(let i of this.m_eff_list){
                    i.load_res();
                }
                let b_br:boolean = true;
                if(this.m_shape_backride != 0){
                    this.m_mat_backride = this._project_mat(this.m_mat_backride,this.m_shape_backride);
                    if(!this.m_draw_avatar){
                        b_br = this.m_mat_backride.m_b_loaded;
                    }
                }
                let b_m:boolean = true;
                this.m_mat = this._project_mat(this.m_mat,this.m_shape);
                if(!this.m_draw_avatar){
                    b_m = this.m_mat.m_b_loaded;
                }
                if(this.m_shape_weapon != 0){
                    this.m_mat_weapon = this._project_mat(this.m_mat_weapon,this.m_shape_weapon);
                }
                if(this.m_shape_wing != 0){
                    this.m_mat_wing = this._project_mat(this.m_mat_wing,this.m_shape_wing);
                }
                let b_fr:boolean = true;
                if(this.m_shape_ride != 0){
                    this.m_mat_ride = this._project_mat(this.m_mat_ride,this.m_shape_ride);
                    if(!this.m_draw_avatar){
                        b_fr = this.m_mat_ride.m_b_loaded;
                    }
                }
                
                if(this.m_shape_hair != 0){
                    this.m_mat_hair = this._project_mat(this.m_mat_hair,this.m_shape_hair);
                }
                if(!this.m_draw_avatar){
                    if(b_br && b_m && b_fr){
                        this.m_draw_avatar = true;
                        this.m_sp_back.removeSelf();
                        this.m_sp_front.removeSelf();
                        //avatarcmdnew
                        //this.addChild(this.m_sp_back);
                        //this.addChild(this.m_sp_center);
                        //this.addChild(this.m_sp_front);
                        this.del_default_sp();
                    }
                }
            }
            return ret;
        }
        //
        ////
        private _draw_mat(mat:lavataractionmat,link_idx:number,rt:Laya.Rectangle,dx:number,dy:number,b_body_mirrior:boolean,body_link_dir:number):Laya.Rectangle{
            if(mat != null&&mat.m_b_loaded)
            {
                let link_dir:number = this.m_dir;
                let b_mirrior:boolean = mat.m_dir_tex[this.m_dir].m_b_mirror;
                let drawx:number = dx;
                let drawy:number = dy;
                if(b_mirrior){
                    link_dir = mat.m_dir_tex[this.m_dir].m_use_dir;
                }
                
                let pt:Laya.Point = this.m_mat.get_link(body_link_dir,link_idx,this.m_framecurrent);
                let pt1:Laya.Point = mat.get_link(link_dir,0,this.m_framecurrent);
                if(b_mirrior){
                    if(b_body_mirrior){
                        drawx = dx+(this.m_aw - pt1.x)-(this.m_aw - pt.x);
                    }
                    else{
                        drawx = dx+(this.m_aw - pt1.x)-pt.x;
                    }
                }
                else{
                    if(b_body_mirrior){
                        drawx = dx+pt1.x-(this.m_aw - pt.x);
                    }
                    else{
                        drawx = dx+pt1.x-pt.x;
                    }
                    
                }
                
                drawy = dy+pt.y-pt1.y;

                let tex:Laya.Texture;
                let matf:lavatartextureframes;
          
                matf = mat.m_dir_tex[this.m_dir];
                //tex = matf.m_frames[this.m_framecurrent].m_tex;
                tex = matf.get_texture(this.m_framecurrent);
                if(tex){
                    this.graphics.drawTexture(tex,drawx,drawy,mat.m_width,mat.m_height,matf.m_matrix);
                    rt.x = drawx+tex.offsetX;
                    if(b_mirrior){
                        rt.x = drawx+tex.sourceWidth-tex.offsetX-tex.width;
                    }
                    rt.y = drawy+tex.offsetY;
                    rt.width = tex.width;
                    rt.height = tex.height;
                }
                
            }
            return rt;
        }
        ////
        public update(delta:number):void
        {
            for(let i of this.m_adorn_list){
                i.update(delta);
            }

            this.m_framecurrenttm += delta;
            let framecount:number = Math.floor(this.m_framecurrenttm/this.m_framemillsec);
            
            //core.core_tiplog("renderavatar update ",this.m_obj_id,this.m_shape,this.m_dir,this.m_action,this.m_framecurrent,framecount,this.m_framecount);
            if(this.m_b_cycle == false){
                if(this.m_b_stop_frame == 0){
                    if(framecount > this.m_framecount - 1)
                    {
                        this.change_action(this.m_lastaction);
                        return;
                    }
                }
                else
                {
                    let stop_f:number = this.m_framecount - 1;
                    if(this.m_b_stop_frame != -1){
                        stop_f = this.m_b_stop_frame;
                    }
                    if(framecount > stop_f){
                        framecount = stop_f;
                        if(framecount < 0){
                            framecount = 0;
                        }
                    }
                }
            }
            this.m_framecurrent = framecount%this.m_framecount;
            if(!this.m_draw_avatar){
                return;
            }
            if(!this.m_b_projected){
                return;
            }
            this.graphics.clear();
            this.m_sp_back.graphics.clear();
            if(this.m_mat == null || this.m_mat.m_b_loaded == false){
                return;
            }
            //if(this.m_aura_adorn != null){
                //this.m_aura_adorn.draw2sp(this.m_sp_back,0,0);
            //}
            
            let org_pt:Laya.Point = this.m_org_pt;
            let tmp_pt:Laya.Point = new Laya.Point();
            let dx:number = 0;
            let dy:number = 0;
            let rdx:number = 0;
            let rdy:number = 0;
            let drawx:number = 0;
            let drawy:number = 0;
            
            let b_mirrior:boolean = false;
            let pivot_x:number = -this.m_aw/2;
            dx = this._get_mat_dx()+pivot_x;
            dy = this._get_mat_dy();
            let link_dir:number = this.m_dir;
            let b_body_mirrior:boolean = this.m_mat.m_dir_tex[this.m_dir].m_b_mirror;
            let body_link_dir:number = this.m_dir;
            if(b_body_mirrior){
                body_link_dir = this.m_mat.m_dir_tex[this.m_dir].m_use_dir;
            }
            let tmp_org_pt = this.m_mat.get_link(body_link_dir,0,this.m_framecurrent);
            if(b_body_mirrior){
                org_pt.x = this.m_aw - tmp_org_pt.x;
            }
            else{
                org_pt.x = tmp_org_pt.x;
            }
            org_pt.y = tmp_org_pt.y;

            let tex:Laya.Texture;
            let mat:lavataractionmat;
            let matf:lavatartextureframes;

            for(let i of this.m_eff_list){
                i.draw2sp(this,this.m_dx,this.m_dy,false);
            }
            //
            if(this.m_mat_backride != null&&this.m_mat_backride.m_b_loaded){
                link_dir = this.m_dir;
                b_mirrior = this.m_mat_backride.m_dir_tex[this.m_dir].m_b_mirror;
                if(b_mirrior){
                    link_dir = this.m_mat_backride.m_dir_tex[this.m_dir].m_use_dir;
                }
                mat = this.m_mat_backride;
                matf = mat.m_dir_tex[this.m_dir];
                
                let pt:Laya.Point = this.m_mat_backride.get_link(link_dir,3,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_backride.get_link(link_dir,0,this.m_framecurrent);
                
                rdx = pt.x - pt1.x;
                if(b_mirrior){
                    rdx = pt1.x - pt.x;
                    //drawx = dx+rdx+mat.m_width;
                }
                rdy = pt.y - org_pt.y;//-(512-pt.y - (512-org_pt.y))

                if(b_mirrior){
                    drawx = dx+rdx+(this.m_aw - pt.x)-org_pt.x+this.m_dx;
                }
                else{
                    drawx = dx+rdx+pt.x-org_pt.x+this.m_dx;
                }
                
                drawy = dy+this.m_dy;
                
                //tex = matf.m_frames[this.m_framecurrent].m_tex;
                tex = matf.get_texture(this.m_framecurrent);
                if(tex){
                    this.graphics.drawTexture(tex,drawx,drawy,mat.m_width,mat.m_height,matf.m_matrix);
                    this.m_mat_backeride_rt.x = drawx+tex.offsetX;
                    if(b_mirrior){
                        this.m_mat_backeride_rt.x = drawx+tex.sourceWidth-tex.offsetX-tex.width;
                    }
                    this.m_mat_backeride_rt.y = drawy+tex.offsetY;
                    this.m_mat_backeride_rt.width = tex.width;
                    this.m_mat_backeride_rt.height = tex.height;
                }

                
            }
            //
            if(this.m_dir >=2 && this.m_dir <= 5){
                if(!this.m_weapon_behind){
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon,3,this.m_mat_weapon_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
                }
            }
            else{
                if(this.m_weapon_behind){
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon,3,this.m_mat_weapon_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
                }
                this.m_mat_wing_rt = this._draw_mat(this.m_mat_wing,1,this.m_mat_wing_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
            }
            
            mat = this.m_mat;
            matf = mat.m_dir_tex[this.m_dir];
            //tex = matf.m_frames[this.m_framecurrent].m_tex;
            tex = matf.get_texture(this.m_framecurrent);
            if(tex){
                this.graphics.drawTexture(tex,dx+rdx+this.m_dx,dy+rdy+this.m_dy,mat.m_width,mat.m_height,matf.m_matrix);
                this.m_mat_rt.x = dx+rdx+tex.offsetX+this.m_dx;
                if(b_mirrior){
                    this.m_mat_rt.x = dx+rdx+tex.sourceWidth-tex.offsetX-tex.width+this.m_dx;
                }
                this.m_mat_rt.y = dy+rdy+tex.offsetY+this.m_dy;
                this.m_mat_rt.width = tex.width;
                this.m_mat_rt.height = tex.height;
            }
            

            if(this.m_dir >=2 && this.m_dir <= 5){
                this.m_mat_wing_rt = this._draw_mat(this.m_mat_wing,1,this.m_mat_wing_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
                if(this.m_weapon_behind){
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon,3,this.m_mat_weapon_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
                }
            }
            else{
                if(!this.m_weapon_behind){
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon,3,this.m_mat_weapon_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
                }
            }
            
            
            if(this.m_mat_ride != null&&this.m_mat_ride.m_b_loaded)
            {
                link_dir = this.m_dir;
                b_mirrior = this.m_mat_ride.m_dir_tex[this.m_dir].m_b_mirror;
                if(b_mirrior){
                    link_dir = this.m_mat_ride.m_dir_tex[this.m_dir].m_use_dir;
                }

                let pt:Laya.Point = this.m_mat_ride.get_link(link_dir,3,this.m_framecurrent);
                let pt1:Laya.Point = this.m_mat_ride.get_link(link_dir,0,this.m_framecurrent);
                if(b_mirrior){
                    drawx = dx+rdx+(this.m_aw - pt.x)-org_pt.x+this.m_dx;
                }
                else{
                    drawx = dx+rdx+pt.x-org_pt.x+this.m_dx;
                }
                
                drawy = dy+this.m_dy;

                mat = this.m_mat_ride;
                matf = mat.m_dir_tex[this.m_dir];
                //tex = matf.m_frames[this.m_framecurrent].m_tex;
                tex = matf.get_texture(this.m_framecurrent);
                if(tex){
                    this.graphics.drawTexture(tex,drawx,drawy,mat.m_width,mat.m_height,matf.m_matrix);
                    this.m_mat_ride_rt.x = drawx+tex.offsetX;
                    if(b_mirrior){
                        this.m_mat_ride_rt.x = drawy+tex.sourceWidth-tex.offsetX-tex.width;
                    }
                    this.m_mat_ride_rt.y = drawy+tex.offsetY;
                    this.m_mat_ride_rt.width = tex.width;
                    this.m_mat_ride_rt.height = tex.height;
                }
                
            }
            this.m_mat_hair_rt = this._draw_mat(this.m_mat_hair,2,this.m_mat_hair_rt,dx+rdx+this.m_dx,dy+rdy+this.m_dy,b_body_mirrior,body_link_dir);
            
            for(let i of this.m_buffeff_list){
                i.draw2sp(this,this.m_dx,this.m_dy,true);
            }
            for(let i of this.m_eff_list){
                i.draw2sp(this,this.m_dx,this.m_dy,true);
            }
            //if(this.m_title_adorn != null){
            //    this.m_title_adorn.draw2sp(this.m_sp_front,0,0);
            //}
            //this.m_sp_center.cacheAs = "bitmap";

        }
        //从parent里把自己移除?
        public is_contain(x:number,y:number):boolean{
            let ret:boolean = super.is_contain(x,y);
            if(ret){
                let rt:Laya.Rectangle = null;
                ret = false;
                let rx:number;
                let ry:number;
                let w:number;
                let h:number;
                if(this.m_mat != null&&this.m_mat.m_b_loaded)
                {
                    rt = this.m_mat_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                        ret = true;
                    }
                    
                    
                }
                if(!ret && this.m_mat_weapon != null&&this.m_mat_weapon.m_b_loaded){
                    rt = this.m_mat_weapon_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                        ret = true;
                    }
                }
                if(!ret && this.m_mat_wing != null&&this.m_mat_wing.m_b_loaded){
                    rt = this.m_mat_wing_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                        ret = true;
                    }
                }
                if(!ret && this.m_mat_ride != null&&this.m_mat_ride.m_b_loaded){
                    rt = this.m_mat_ride_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)&&rt.width!=512){
                        ret = true;
                    }
                }
                if(!ret && this.m_mat_backride != null&&this.m_mat_backride.m_b_loaded){
                    rt = this.m_mat_backeride_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)&&rt.width!=512){
                        ret = true;
                    }
                }
                if(!ret && this.m_mat_hair != null&&this.m_mat_hair.m_b_loaded){
                    rt = this.m_mat_hair_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if(x >=rx&&x<=(rx+rt.width)&&y>=ry&&y<=(ry+rt.height)){
                        ret = true;
                    }
                }
            }
            return ret;
        }
        private create_default_sp():void{
            if(this.m_default_sp == null){
                this.m_default_sp = utils.getitembycls("renderavatar_default",renderavatar_default);
                this.addChild(this.m_default_sp);
                this.m_default_sp.y = -120;
                this.m_default_sp.x = -26;
            }
        }
        private del_default_sp():void{
            if(this.m_default_sp != null){
                this.m_default_sp.removeSelf();
                utils.recover("renderavatar_default",this.m_default_sp);
                this.m_default_sp = null;
            }
        }
        public dispose():void
        {
            this.removeChildren();
            if(this.m_shadow_sp != null){
                this.m_shadow_sp = null;
            }
            this.del_default_sp();
            if(this.m_sp_back != null){
                this.m_sp_back.removeChildren();
                this.m_sp_back = null;
            }
            if(this.m_sp_front != null){
                this.m_sp_front.removeChildren();
                this.m_sp_front = null;
            }
            if(this.m_sp_center != null){
                this.m_sp_center.removeChildren();
                this.m_sp_center = null;
            }
            if(this.m_aura_id != 0){
                this.change_aura(0);
            }
            if(this.m_title_id != 0){
                this.change_title(0);
            }
            this.m_buffeff_list = new Array<avatar_aura_new>();
            this.m_eff_list = new Array<avatar_aura_new>();
            for(let i of this.m_adorn_list){
                i.dispose();
            }
            this.m_adorn_list.length = 0;
            this.removeChildren();
            if(this.m_name_sp != null)
            {
                this.m_name_sp.dispose();
                utils.recover("avatarname",this.m_name_sp);
                this.m_name_sp = null;
            }
            this.del_hp();
            this.del_buffui();
            if(this.m_mat != null)
            {
                mat_mgr().dellavatarmaterial(this.m_mat);
                this.m_mat = null;
            }
            if(this.m_mat_weapon != null){
                mat_mgr().dellavatarmaterial(this.m_mat_weapon);
                this.m_mat_weapon = null;
            }
            if(this.m_mat_wing != null){
                mat_mgr().dellavatarmaterial(this.m_mat_wing);
                this.m_mat_wing = null;
            }
            if(this.m_mat_ride != null){
                mat_mgr().dellavatarmaterial(this.m_mat_ride);
                this.m_mat_ride = null;
            }
            if(this.m_mat_backride != null){
                mat_mgr().dellavatarmaterial(this.m_mat_backride);
                this.m_mat_backride = null;
            }
            if(this.m_mat_hair != null){
                mat_mgr().dellavatarmaterial(this.m_mat_hair);
                this.m_mat_hair = null;
            }
            if(this.m_rc != null)
            {
                this.m_rc.dispose();
                
                //avatarcmdnew
                //utils.recover("avatarcommand",this.m_rc);
                utils.recover("avatarcommand_new",this.m_rc);
                this.m_rc = null;
            }
            super.dispose();
        }
    }
    export class renderavatar extends renderavatar_new{

    }
}