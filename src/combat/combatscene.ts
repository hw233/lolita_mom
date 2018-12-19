module combat{
    export class combat_warrior_action{
        public m_id:number = 0;
        public m_warrior:core.renderavatar = null;
        public m_is_end:boolean = true;
        public m_start_tm:number = 0;
        constructor(){

        }
        public re_init():void{
            this.m_id = 0;
            this.m_warrior = null;
            this.m_is_end = true;
            this.m_start_tm = 0;
        }
        public start(tm:number):void{
            this.m_start_tm = tm;
        }
        public update(delta:number):void{

        }
        public is_end():boolean{
            return this.m_is_end;
        }
        public clear():void{

        }
        public dispose():void{
            this.m_warrior = null;
        }
    }
    export class dead_action extends combat_warrior_action{
        private m_b_open:boolean = true;
        private m_fade_max:number = 6;
        private m_fade_tm:number = 200;
        private m_cur_fadeidx:number = 0;
        private m_cur_tm:number = 0;
        private m_fadeout:boolean = true;
        constructor(){
            super();
        }
        public start(tm:number):void{
            this.m_start_tm = tm;
            if(this.m_b_open){
                this.m_is_end = false;
                this.m_fadeout = true;
                this.m_cur_fadeidx = 0;
                this.m_cur_tm = this.m_start_tm;
                this.m_warrior.change_action(core.AVATAR_ACTON.ACTION_STAND);
                return;
            }
            this.m_warrior.change_action(core.AVATAR_ACTON.ACTION_DEAD,false);
            this.m_is_end = true;
        }
        public update(delta:number):void{
            if(this.m_is_end){
                return;
            }
            this.m_cur_tm += delta;
            if(this.m_cur_tm > (this.m_start_tm + this.m_fade_tm)){
                this.m_cur_fadeidx += 1;
                if(this.m_cur_fadeidx >= this.m_fade_max){
                    this.m_is_end = true;
                    this.m_warrior.alpha = 1;
                    return;
                }
                this.m_start_tm = this.m_cur_tm;
                this.m_fadeout = !this.m_fadeout;
            }
            let rate:number = 1;
            rate = (this.m_cur_tm - this.m_start_tm)/this.m_fade_tm;
            if(rate > 1){
                rate = 1;
            }
            if(rate < 0){
                rate = 0;
            }
            if(this.m_fadeout){
                 rate = 1 - rate;
            }
            this.m_warrior.alpha = rate;
        }
        public is_end():boolean{
            return this.m_is_end;
        }
        public dispose():void{
            if(this.m_warrior != null){
                this.m_warrior.alpha = 1;
                this.m_warrior = null;
            }
            
            utils.recover("dead_action",this);
        }
    }
    export class fly_action extends combat_warrior_action{
        public m_start_pt:Laya.Point = new Laya.Point();
        public m_from_pt:Laya.Point = new Laya.Point();
        public m_lt_pt:Laya.Point = new Laya.Point();
        public m_rb_pt:Laya.Point = new Laya.Point();
        private m_collision_max:number = 2;
        public m_collision_num:number = 0;
        private m_a:number = 0;
        private m_b:number = 0;
        private m_cur_tm:number = 0;
        private m_cur_rtm:number = 0;
        private m_start_rtm:number = 0;
        private m_rspeed:number = 360*5;//angle per sec
        private m_speed:number = 360*5;
        private m_bsign:number = 1.0;
        constructor(){
            super();
        }
        public start(tm:number):void{
            if(this.m_start_pt.x == this.m_from_pt.x){
                this.m_is_end = true;
                return;
            }
            if(this.m_start_pt.y == this.m_from_pt.y){
                this.m_is_end = true;
                return;
            }
            this.m_start_tm = tm;
            this.m_cur_rtm = this.m_start_tm;
            this.m_start_rtm = this.m_start_tm;
            this.m_collision_num = this.m_collision_max;
            this.m_warrior.change_action(core.AVATAR_ACTON.ACTION_STAND);
            
            this.m_cur_tm = this.m_start_tm;
            
            this.m_warrior.rotation = 0;
            this.m_is_end = false;
            this._cal_param();
        }
        private _cal_param():void{
            this.m_a = utils.genafrom2point(this.m_from_pt.x,this.m_from_pt.y,this.m_start_pt.x,this.m_start_pt.y);
            this.m_b = utils.genbfrom2point(this.m_from_pt.x,this.m_from_pt.y,this.m_a);
            //y = a*x + b;
            //x = (y - b)/a;
            //only use x to calculate,so,if start x equal dst x,it will be in trouble;
            this.m_bsign = (this.m_start_pt.x - this.m_from_pt.x)/Math.abs(this.m_start_pt.x - this.m_from_pt.x);
        }
        private _rotate(delta:number):void{
            this.m_cur_rtm += delta;
            let a:number = (this.m_cur_rtm - this.m_start_rtm)*this.m_rspeed/1000;
            a = a%360;
            this.m_warrior.rotation = a;
        }
        private _is_out(x:number,y:number):boolean{
            if(x < this.m_lt_pt.x || x > this.m_rb_pt.x){
                return true;
            }
            if(y < this.m_lt_pt.y || y > this.m_rb_pt.y){
                return true;
            }
            return false;
        }
        private _collision():void{
            let ty:number = 0;
            if(this.m_bsign < 0)//right 2 left
            {
                ty = this.m_a*this.m_lt_pt.x + this.m_b;
            }
            else{//left 2 right
                ty = this.m_a*this.m_rb_pt.x + this.m_b;
            }
            if(ty == this.m_lt_pt.y || ty == this.m_rb_pt.y){
                this.m_collision_num = -1;
                return;
            }
            //y = a*x + b;
            //x = (y - b)/a;
            if(ty < this.m_lt_pt.y)//top
            {
                this.m_start_pt.x = (this.m_lt_pt.y - this.m_b)/this.m_a;
                this.m_start_pt.y = this.m_lt_pt.y;
                let temp:number = (this.m_from_pt.y - this.m_lt_pt.y)*2;
                this.m_from_pt.y -= temp;
            }
            else if(ty > this.m_rb_pt.y)//bottom
            {
                this.m_start_pt.x = (this.m_rb_pt.y - this.m_b)/this.m_a;
                this.m_start_pt.y = this.m_rb_pt.y;
                let temp:number = (this.m_rb_pt.y - this.m_from_pt.y)*2;
                this.m_from_pt.y += temp;
            }
            else{
                if(this.m_bsign < 0)//right 2 left ,left
                {
                    this.m_start_pt.x = this.m_lt_pt.x;
                    this.m_start_pt.y = this.m_a*this.m_start_pt.x + this.m_b;
                    let temp:number = (this.m_from_pt.x - this.m_lt_pt.x)*2;
                    this.m_from_pt.x -= temp;
                }
                else//left 2 right,right
                {
                    this.m_start_pt.x = this.m_rb_pt.x;
                    this.m_start_pt.y = this.m_a*this.m_start_pt.x + this.m_b;
                    let temp:number = (this.m_rb_pt.x - this.m_from_pt.x)*2;
                    this.m_from_pt.x += temp;
                }
            }
            this._cal_param();
        }
        public update(delta:number):void{
            if(this.m_is_end){
                return;
            }
            this._rotate(delta);
            this.m_cur_tm += delta;
            let dx:number = this.m_speed*(this.m_cur_tm - this.m_start_tm)/1000;
            let cur_x:number = this.m_start_pt.x + dx*this.m_bsign;
            let cur_y:number = this.m_a*cur_x+this.m_b;
            if(this._is_out(cur_x,cur_y)){
                this.m_collision_num -= 1;
                if(this.m_collision_num < 0){
                    this.m_is_end = true;
                    return;
                }
                this._collision();
                if(this.m_collision_num < 0){
                    this.m_is_end = true;
                    return;
                }
                this.m_start_tm = this.m_cur_tm;
            }
            this.m_warrior.set_pos(cur_x,cur_y);
        }
        public is_end():boolean{
            return this.m_is_end;
        }
        public dispose():void{
            if(this.m_warrior != null){
                this.m_warrior.alpha = 0;
                this.m_warrior = null;
            }
            
            utils.recover("fly_action",this);
        }
    }
    export class combatscene extends utils.game_event_receiver{
        private m_combat_mgr:combatimpl = null;
        public m_render:core.renderagent = null;
        private m_pos_map:Object = new Object();
        private m_warrior_map:Object = new Object();
        private m_mw:number = 2560;
        private m_mh:number = 2560;
        private m_map:string = "1704.jpg";
        private m_camera_x:number = 0;
        private m_camera_y:number = 0;
        private m_pos_centerx:number = 0;
        private m_pos_centerdx:number = 40;
        private m_pos_centerdy:number = -60;
        private m_pos_centery:number = 0;
        private m_view_w:number = 0;
        private m_view_h:number = 0;
        public m_pos_dx:number = 92;
        public m_pos_dy:number = 52;
        private m_pos_c2dx:number = 0+this.m_pos_dx;
        private m_pos_c2dy:number = 120+this.m_pos_dy;
        private m_numpic_list:Array<combat_number> = new Array<combat_number>();
        private m_tempnumpic_list:Array<combat_number> = new Array<combat_number>();
        private m_cryout_list:Array<combat_cryout> = new Array<combat_cryout>();
        private m_tempcryout_list:Array<combat_cryout> = new Array<combat_cryout>();
        private m_waction_list:Array<combat_warrior_action> = new Array<combat_warrior_action>();
        private m_bk_htmlcanvas:Laya.HTMLCanvas = null;
        private m_bk_htmltexture:Laya.Texture = null;
        private m_bk_sp:Laya.Sprite = null;
        private m_lineupsp:combat_lineup = null;
        constructor(mgr:combatimpl,sp:laya.display.Sprite){
            super();
            this.m_combat_mgr = mgr;
            this._init_event();
            this.m_render = new core.renderagent();
            this.m_render.initstage(sp);
            
            this.m_render.m_render.setworldwh(this.m_mw,this.m_mh);

            this.m_view_w = 720;
            this.m_view_h = 1280;
            this.m_render.setviewport(this.m_view_w,this.m_view_h);
            sp.width = this.m_mw;
            sp.height = this.m_mh;
            //
            this.m_render.setcamerapos(this.m_camera_x,this.m_camera_y);
            //
            //this.m_render.setmapbk("1002.jpg");
            this._init_pos_map();

            sp.on(Laya.Event.CLICK, this, this.onClick);
        }

        private _init_pos_map():void{
            let dx:number = this.m_pos_dx;
            let dy:number = this.m_pos_dy;
            let cx:number = this.m_pos_centerx;
            let cy:number = this.m_pos_centery;
  
            this.m_pos_map[1] = [cx+this.m_pos_c2dx,cy+this.m_pos_c2dy,3];

            this.m_pos_map[2] = [this.m_pos_map[1][0]-this.m_pos_dx,this.m_pos_map[1][1]+this.m_pos_dy,3];

            this.m_pos_map[3] = [this.m_pos_map[1][0]+this.m_pos_dx,this.m_pos_map[1][1]-this.m_pos_dy,3];

            this.m_pos_map[4] = [this.m_pos_map[2][0]-this.m_pos_dx,this.m_pos_map[2][1]+this.m_pos_dy,3];

            this.m_pos_map[5] = [this.m_pos_map[3][0]+this.m_pos_dx,this.m_pos_map[3][1]-this.m_pos_dy,3];

            for(let i:number = 6;i < 11;++i){
                let tx:number = this.m_pos_map[i-5][0] - dx;
                let ty:number = this.m_pos_map[i-5][1] - dy;
                this.m_pos_map[i] = [tx,ty,3];
                
            }
            let ddx:number = this.m_pos_c2dx*2;
            let ddy:number = this.m_pos_c2dy*2;
            for(let i:number = 21;i < 26;++i){
                let tx:number = this.m_pos_map[i-15][0] - ddx;
                let ty:number = this.m_pos_map[i-15][1] - ddy;
                this.m_pos_map[i] = [tx,ty,7]; 
            }

            for(let i:number = 26;i < 31;++i){
                let tx:number = this.m_pos_map[i-5][0] + dx;
                let ty:number = this.m_pos_map[i-5][1] + dy;
                this.m_pos_map[i] = [tx,ty,7];
                
            }
            this.m_pos_map[11] = [100,100,3];
            this.m_pos_map[12] = [100,100,3];

            this.m_pos_map[31] = [100,100,7];
            this.m_pos_map[32] = [100,100,7];
        }
        public get_pos(id:number):laya.maths.Point{
            let x:number = this.m_pos_map[id][0];
            let y:number = this.m_pos_map[id][1];
            //x = this.m_camera_x - (this.m_view_w>>1) + x;
            //y = this.m_camera_y - (this.m_view_h>>1) + y;
            let ret:laya.maths.Point = new laya.maths.Point(x,y);
            return ret;
        }
        public get_dir(id:number):number{
            return this.m_pos_map[id][2];
        }
        public get_warrior(id:number):warrior{
            if(this.m_warrior_map[id] == undefined)
            {
                return null;
            }
            return this.m_warrior_map[id];
        }
        public get_warrior_avatar(id:number):core.renderavatar{
            let wobj:warrior = this.get_warrior(id);
            if(wobj == null){
                return null;
            }
            return this.m_render.getunit(wobj.roleid);
        }
        public get_warrior_avatarid(id:number):number{
            let wobj:warrior = this.get_warrior(id);
            if(wobj == null){
                return 0;
            }
            return wobj.roleid;
        }
        private onClick(e:Laya.Event):void
        {       
            //
            let sx:number = e.stageX;
            let sy:number = e.stageY;

            sx = 0.5*sx;
            sy = 0.5*sy;
            //
            let spos:laya.maths.Point = new laya.maths.Point(sx,sy);

            let wpos:laya.maths.Point = this.m_render.stagepos2worldpos(spos);

            core.combat_tiplog("combatscene onClick ",e.stageX,e.stageY,wpos.x,wpos.y);
            //this.m_render.setcamerapos(wpos.x,wpos.y);
            //let obj:warrior = this.get_warrior(12);
            //let ra:core.renderavatar = this.m_render.getunit(obj.roleid);
            //ra.set_pos(wpos.x,wpos.y);
            //ra.set_name('w1_'+wpos.x+'_'+wpos.y);
        }
        private _init_event():void{
            this.register_event(COMBATSCENE_ENTER,this.on_enter);
            this.register_event(COMBATSCENE_CHANGELINEUP,this.on_change_lineup);
            this.register_event(COMBATSCENE_QUIT,this.on_quit);
            this.register_event(COMBATSCENE_POPNUMBER,this.on_popnumber);
            this.register_event(COMBATSCENE_CRYOUT,this.on_cryout);
            this.register_event(COMBATSCENE_ADDWARRIOR,this.on_addwarrior);
            this.register_event(COMBATSCENE_ADDCLONEWARRIOR,this.on_addclonewarrior);
            this.register_event(COMBATSCENE_INITWARRIOR,this.on_initwarrior)
            this.register_event(COMBATSCENE_SETADORN,this.on_setadorn)
            this.register_event(COMBATSCENE_DELWARRIOR,this.on_delwarrior);
            this.register_event(COMBATSCENE_DELNINJA,this.on_delninja);
            this.register_event(COMBATSCENE_ADDBUFF,this.on_addbuff);
            this.register_event(COMBATSCENE_DELBUFF,this.on_delbuff);
            this.register_event(COMBATSCENE_BUFFCD,this.on_buffcd);
            this.register_event(COMBATSCENE_BUFFAUTOCD,this.on_buffautocd);
            this.register_event(COMBATSCENE_WARRIORACTION,this.on_warrioraction);
            this.register_event(COMBATSCENE_WARRIORDEAD,this.on_warriordead);
            this.register_event(COMBATSCENE_WARRIORDEADVANISH,this.on_warriordeadvanish);
            this.register_event(COMBATSCENE_WARRIORFLY,this.on_warriorfly);
            this.register_event(COMBATSCENE_WARRIORREVIVE,this.on_warriorrevive);
            this.register_event(COMBATSCENE_WARRIORDEFEND,this.on_warriordefend);
            this.register_event(COMBATSCENE_WARRIORDODGE,this.on_warriordodge);
            this.register_event(COMBATSCENE_WARRIORATTACKED,this.on_warriorattacked);
            this.register_event(COMBATSCENE_WARRIORBACKMOVE,this.on_warriorbackmove);
            this.register_event(COMBATSCENE_WARRIORSETPOS,this.on_warriorsetpos);
            this.register_event(COMBATSCENE_WARRIORMOVE,this.on_warriormove);
            this.register_event(COMBATSCENE_WARRIORMOVEBACK,this.on_warriormoveback);
            this.register_event(COMBATSCENE_WARRIORMOVE2WARRIOR,this.on_warriormove2warrior);
            this.register_event(COMBATSCENE_EFFECT,this.on_effect);
            this.register_event(COMBATSCENE_EFFECT_SCREENPOS,this.on_effect_screenpos);
            this.register_event(COMBATSCENE_EFFECT2W,this.on_effect2w);
            this.register_event(COMBATSCENE_ACTIONBEGIN,this.on_actionbegin);
            this.register_event(COMBATSCENE_ACTIONEND,this.on_actionend);
            this.register_event(COMBATSCENE_WARRIORDIR,this.on_warriordir);
            this.register_event(COMBATSCENE_WARRIORDIR2W,this.on_warriordir2w);
            this.register_event(COMBATSCENE_WARRIORREADY,this.on_warriorready)
            this.register_event(COMBATSCENE_SETHP,this.on_sethp);
            this.register_event(COMBATSCENE_BLACKSCENE,this.on_blackscene);
            this.register_event(COMBATSCENE_CUSTOMEVENT,this.on_customevent);
        }
        private on_actionend(user_data:any):void{

        }
        private on_actionbegin(user_data:any):void{

        }
        private clearallwarrior():void{
            for(let i of this.m_waction_list){
                i.dispose();
            }
            this.m_waction_list.length = 0;

            for(let i in this.m_warrior_map){
                if(this.m_warrior_map.hasOwnProperty(i)){
                    let wdata:warrior = this.m_warrior_map[i] as warrior;
                    if(wdata != null){
                        let wrolea:core.renderavatar = this.m_render.getunit(wdata.roleid);
                        if(wrolea != null){
                            laya.utils.Tween.clearAll(wrolea);
                        }
                        
                        this.m_render.delunit(wdata.roleid);
                    }
                    
                }
            }
            this.m_warrior_map = new Object();
            
        }
        private init_bk_htmlcanvas(hc:Laya.HTMLCanvas,w:number,h:number):void{
            this.clear_bk_htmlcanvas();
            if(hc == null){
                return;
            }
            this.m_bk_htmlcanvas = hc;
            this.m_bk_htmltexture = new Laya.Texture(this.m_bk_htmlcanvas);
            this.m_bk_sp = new Laya.Sprite();
            this.m_bk_sp.graphics.fillTexture(this.m_bk_htmltexture,0,0,w,h,"no-repeat");
        }
        private clear_bk_htmlcanvas():void{
            if(this.m_bk_sp != null){
                this.m_bk_sp.graphics.clear();
                this.m_bk_sp.destroy(true);
                this.m_bk_sp = null;
            }
            if(this.m_bk_htmlcanvas != null){
                this.m_bk_htmlcanvas.clear();
                this.m_bk_htmlcanvas.releaseResource(true);
                this.m_bk_htmlcanvas.destroy();
                this.m_bk_htmltexture.destroy(true);
                this.m_bk_htmlcanvas = null;
                this.m_bk_htmltexture = null;
            }
        }
        private on_change_lineup(user_data:any):void{
            this.clear_lineupsp();
            let path:string = user_data[0];
            let dx:number = user_data[1];
            let dy:number = user_data[2];
            core.combat_tiplog('combatscene on_change_lineup ',path,dx,dy);
            let ret:combat_lineup = utils.getitembycls("combat_lineup",combat_lineup);
            ret.re_init();
            ret.set_respath(path,dx,dy);
            ret.m_obj_id = this.m_render.addsprite(ret,this.m_pos_centerx,this.m_pos_centery,false);
            this.m_lineupsp = ret;
        }
        private clear_lineupsp():void{
            if(this.m_lineupsp != null){
                this.m_render.delsprite(this.m_lineupsp.m_obj_id);
                this.m_lineupsp.dispose();
                this.m_lineupsp = null;
            }
        }
        public set_viewport(w:number,h:number):void{
            this.m_view_w = w;
            this.m_view_h = h;
            this.m_render.setviewport(w,h);
        }
        private on_enter(user_data:any):void{
            //this.m_render.setmapbk(this.m_map);
            let hc:Laya.HTMLCanvas = user_data[0];
            let w:number = user_data[1];
            let h:number = user_data[2];
            let x:number = user_data[3];
            let y:number = user_data[4];
            let sid:number = user_data[5];
            let s_res:string = user_data[6];
            this.m_render.clearmapbksp();
            this.m_camera_x = (this.m_mw>>1);
            this.m_camera_y = (this.m_mh>>1);
            this.m_pos_centerx = this.m_camera_x+this.m_pos_centerdx;
            this.m_pos_centery = this.m_camera_y+this.m_pos_centerdy;
            if(hc != null){
                this.init_bk_htmlcanvas(hc,w,h);
                this.m_render.setmapbksp(this.m_bk_sp);
                this.m_bk_sp.x = this.m_camera_x-x;
                this.m_bk_sp.y = this.m_camera_y-y;
            }
            else{
                if(sid == 0){
                    this.m_render.setmapbk(this.m_map);
                }
                else{
                    let b_slot:boolean = s_res == null;
                    this.m_render.entermap(sid,b_slot);
                    if(!b_slot){
                        this.m_render.setmapbk(s_res);
                    }
                    this.m_camera_x = x;
                    this.m_camera_y = y;
                    this.m_pos_centerx = this.m_camera_x+this.m_pos_centerdx;
                    this.m_pos_centery = this.m_camera_y+this.m_pos_centerdy;
                }
            }
            this._init_pos_map();
            core.combat_tiplog("combatscene on_enter setcamerapos ",this.m_mw>>1,this.m_mh>>1);
            
            this.m_render.setcamerapos(this.m_camera_x,this.m_camera_y);
            for(let i of this.m_waction_list){
                i.dispose();
            }
            this.m_waction_list.length = 0;
            this.m_render.show_map_mask(true,0.5);
            //this.m_render.set_map_filter([
            //    new Laya.ColorFilter([0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0]),
            //]);
        }
        private on_quit(user_data:any):void{
            
        }
        private on_setadorn(user_data:any):void{
            let wid:number = user_data[0];
            let pos:number = user_data[1];
            let aid:any = user_data[2];
            if(this.get_warrior(wid) != null){
                let wavatar:core.renderavatar = this.get_warrior_avatar(wid);
                if(wavatar != null){
                    switch(pos){
                        case 0:
                            wavatar.change_shape(aid as number);
                            break;
                        case 1:
                            wavatar.change_weapon(aid as number);
                            break;
                        case 2:
                            wavatar.change_wing(aid as number);
                            break;
                        case 3:
                            wavatar.change_ride(aid[0],aid[1]);
                            if(aid[0] != 0)
                            {
                                wavatar.set_ride_h(30);
                                if(aid.length > 2){
                                    wavatar.set_ride_h(aid[2]);
                                }
                            }
                            else{
                                wavatar.set_ride_h(30);
                            }
                            break;
                        case 4:
                            wavatar.change_hair(aid as number);
                            break;
                        case 5:
                            wavatar.change_aura(aid as number);
                            break;
                        case 6:
                            wavatar.change_title(aid as number);
                            break;
                        case 7:
                            let fid:number = aid as number;
                            this.m_render.clear_all_follow(wid);
                            if(fid != 0){
                                let pid:number = this.get_warrior_avatarid(wid);
                                let chase_id:number = this.m_render.addunit("",fid,0,0);
                                this.m_render.set_follow_id(chase_id,pid);
                                let chase_role:core.renderavatar = this.m_render.getunit(chase_id);
                                chase_role.set_dxy(0,-100);
                            }
                            
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        private get_posid_bywid(wid:number):number{
            let wdata:warrior = this.get_warrior(wid);
            if(wdata != null){
                return wdata.pos;
            }
            return wid;
        }
        private on_initwarrior(user_data:any):void{
            let arr:Array<any> = user_data as Array<any>;
            core.combat_tiplog('combatscene initwarrior ',arr);
            for(let i of arr){
                this.on_addwarrior(i);
            }
        }
        private on_addclonewarrior(user_data:any):void{
            core.combat_tiplog('combatscene on_addclonewarrior ',user_data);
            let src:number = user_data["src"];
            let dst:number = user_data["dst"];
            let x:number = user_data["x"];
            let y:number = user_data["y"];
            let dir:number = user_data["dir"];
            if(this.get_warrior(src) == null){
                core.combat_errlog("on_addclonewarrior have not this warrior ",src,dst);
                return;
            }
            if(this.get_warrior(dst) != null){
                this.on_delwarrior(dst);
            }
            let wdata:warrior = this.get_warrior(src);
            let new_data:warrior = new warrior();
            wdata.clone_data(new_data);
            new_data.id = dst;
            new_data.roleid = this._add_warrior_ins(new_data,x,y);
            this.m_warrior_map[new_data.id] = new_data;
            //
            let wrolea:core.renderavatar = this.m_render.getunit(new_data.roleid);
            wrolea.change_action(core.AVATAR_ACTON.ACTION_READY);
            wrolea.change_dir(dir);
            //
        }
        private _add_warrior_ins(wdata:warrior,x:number,y:number):number{
            core.combat_tiplog('combatscene _add_warrior_ins ',wdata.id,x,y);
            let wrolea:core.renderavatar = null;
            wdata.roleid = this.m_render.addunit(wdata.name,wdata.shape,x,y);
            wrolea = this.m_render.getunit(wdata.roleid);
            wrolea.set_scale(wdata.scale,wdata.scale);
            let v:number = wdata.m_desc[0];
            if(v != 0){
                wrolea.change_shape(v);
            }
            v = wdata.m_desc[1];
            if(v != 0){
                wrolea.change_weapon(v);
            }
            v = wdata.m_desc[2];
            if(v != 0){
                wrolea.change_wing(v);
            }
            v = wdata.m_desc[3];//fairy
            if(v != 0){
                let chase_id:number = this.m_render.addunit("",v,0,0);
                this.m_render.set_follow_id(chase_id,wdata.roleid);
                let chase_role:core.renderavatar = this.m_render.getunit(chase_id);
                chase_role.set_dxy(0,-100);
            }
            v = wdata.m_desc[4];//aura
            if(v != 0){
                wrolea.change_aura(v);
            }
            v = wdata.m_desc[5];//title
            if(v != 0){
                wrolea.change_title(v);
            }
            v = wdata.m_desc[6];//ride
            if(v != 0){
                let vb:number = wdata.m_desc[7];
                let rh:number = wdata.m_desc[8];
                if(rh == 0){
                    rh = 30;
                }
                wrolea.change_ride(v,vb);
                wrolea.set_ride_h(rh);
            }
            else{
                wrolea.set_ride_h(30);
            }
            return wdata.roleid;
        }
        private on_addwarrior(user_data:any):void{
            let wdata:warrior = user_data as warrior;
            let wrolea:core.renderavatar = null;
            if(this.get_warrior(wdata.id) != null){
                wrolea = this.m_render.getunit(this.get_warrior(wdata.id).roleid);
                if(wrolea != null){
                    laya.utils.Tween.clearAll(wrolea);
                }
                this.m_render.delunit(this.get_warrior(wdata.id).roleid);
            }

            let pos:laya.maths.Point = this.get_pos(wdata.pos);
            let dir:number = this.get_dir(wdata.pos);
            //
            core.combat_tiplog('combatscene addwarrior ',wdata.id,pos.x,pos.y,dir);

            wdata.roleid = this._add_warrior_ins(wdata,pos.x,pos.y);
            //
            this.m_warrior_map[wdata.id] = wdata;

            this.on_warriorready({"src":wdata.id});
            //let ra:core.renderavatar = this.m_render.getunit(wdata.roleid);
        }
        private on_delninja(user_data:any):void{
            let id:number = user_data as number;
            core.combat_tiplog('combatscene on_delninja ',id);
            for(let k of Object.keys(this.m_warrior_map)){
                if(this.m_warrior_map.hasOwnProperty(k)){
                    let tid:number = parseInt(k);
                    if(tid >= id){
                        this.on_delwarrior(tid);
                    }
                }
            }
        }
        private on_delwarrior(user_data:any):void{
            let id:number = user_data as number;
            core.combat_tiplog('combatscene on_delwarrior ',id);
            this._del_waction_obj(id);

            if(this.get_warrior(id) != null){
                let wrolea:core.renderavatar = this.m_render.getunit(this.get_warrior(id).roleid);
                if(wrolea != null){
                    laya.utils.Tween.clearAll(wrolea);
                }

                this.m_render.delunit(this.get_warrior(id).roleid);
                this.m_warrior_map[id] = null;
            }
            
        }
        private _add_waction_obj(obj:combat_warrior_action):boolean{
            this._del_waction_obj(obj.m_id);
            this.m_waction_list.push(obj);
            return true;
        }
        private _del_waction_obj(id:number){
            let idx:number = 0;
            for(let i of this.m_waction_list){
                if(i.m_id == id){
                    i.dispose();
                    this.m_waction_list.splice(idx,1);
                    return;
                }
                idx += 1;
            }
        }
        private on_warrioraction(user_data:any):void{
            let src:number = user_data["src"];
            let actionid:number = user_data["actionid"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                return;
            }
            this.m_render.unit_stop(wavatar.m_obj_id);
            wavatar.change_action(actionid,false,0);
        }
        private on_addbuff(user_data:any):void{
            //todo
            let src:number = user_data["src"];
            let id:number = user_data["buffid"];
            let shape:number = user_data["shape"];
            let buffeffid:number = user_data["buffeffid"];
            let cd:number = user_data["cd"];
            let overlap:number = user_data["overlay"];
            let datas:any = user_data["datas"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            
            if(wavatar != null){
                let buffui:core.avatarbuffui = wavatar.get_buffui();
                let effid:number = 0;
                if(buffui.getbuff(id) == null){
                    effid = wavatar.add_buffeff(buffeffid);
                }
                else{
                    effid = buffui.getbuff(id).m_effid;
                }
                
                buffui.addbuff(id,shape,cd,overlap,datas,effid);
            }
        }
        private on_delbuff(user_data:any):void{
            //todo
            let src:number = user_data["src"];
            let id:number = user_data["buffid"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar != null){
                let buffui:core.avatarbuffui = wavatar.get_buffui();
                let b:core.avatarbuff = buffui.getbuff(id);
                if(b != null){
                    wavatar.del_buffeff(b.m_effid);
                    buffui.delbuff(id);
                }
            }
        }
        private on_buffcd(user_data:any):void{
            //todo
            let src:number = user_data["src"];
            let id:number = user_data["buffid"];
            let cd:number = user_data["cd"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar != null){
                let buffui:core.avatarbuffui = wavatar.get_buffui();
                let buffins:core.avatarbuff = buffui.getbuff(id);
                if(buffins != null){
                    buffins.set_cd(cd);
                }
            }
        }
        private on_buffautocd(user_data:any):void{
            //todo
            for(let i in this.m_warrior_map){
                if(this.m_warrior_map.hasOwnProperty(i)){
                    let wdata:warrior = this.m_warrior_map[i] as warrior;
                    if(wdata != null){
                        let wavatar:core.renderavatar = this.m_render.getunit(wdata.roleid);
                        if(wavatar != null){
                            let buffui:core.avatarbuffui = wavatar.get_buffui();
                            buffui.buffautocd();
                        }
                    }
                    
                }
            }
        }
        private on_cryout(user_data:any):void{
            let src:number = user_data["src"];
            let v:string = user_data["content"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                return;
            }
            let cn:combat_cryout = this._get_combatcryout(v);
            cn.start();
            let x:number = wavatar.x;
            let y:number = wavatar.y;
            cn.m_obj_id = this.m_render.addsprite(cn,x,y);
            this.m_cryout_list.push(cn);
        }
        private clearallcryout():void{
            for(let i of this.m_cryout_list){
                i.dispose();
                this.m_render.delsprite(i.m_obj_id);
            }
            this.m_cryout_list.length = 0;
        }
        private on_popnumber(user_data:any):void{
            //todo
            let src:number = user_data["src"];
            let tp:number = user_data["type"];
            let v:number = user_data["damage"];
            let b_crack:boolean = user_data["crack"];
            if(b_crack){
                tp = DAMAGETYPE_CRACK;
            }
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                return;
            }
            let cn:combat_number;
            if(tp == DAMAGETYPE_CRACK){
                cn = this._get_combatcrack(v,tp) as combat_number;
            }
            else{
                cn = this._get_combatnum(v,tp);
            }
            cn.start();
            let x:number = wavatar.x;
            let y:number = wavatar.y;
            cn.m_obj_id = this.m_render.addsprite(cn,x,y);
            this.m_numpic_list.push(cn);
        }

        private on_warriorfly(user_data:any):void{
            //todo
            let src:number = user_data["src"];
            let wobj:warrior = this.get_warrior(src);
            if(wobj == null){
                return;
            }
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                core.combat_errlog("combatscene on_warriorfly error!have not this role ",src);
                return;
            }
            let fly_a:fly_action = utils.getitembycls("fly_action",fly_action);
            fly_a.re_init();
            fly_a.m_id = src;
            fly_a.m_warrior = wavatar;
            let gap:number = 0;
            fly_a.m_lt_pt.x = this.m_camera_x - this.m_view_w/2-gap;
            fly_a.m_lt_pt.y = this.m_camera_y - this.m_view_h/2-gap;
            fly_a.m_rb_pt.x = this.m_camera_x + this.m_view_w/2+gap;
            fly_a.m_rb_pt.y = this.m_camera_y + this.m_view_h/2+gap;
            fly_a.m_start_pt.x = wavatar.x;
            fly_a.m_start_pt.y = wavatar.y;
            if(this.is_downteam(this.get_posid_bywid(src))){
                fly_a.m_from_pt.x = wavatar.x - this.m_pos_dx;
                fly_a.m_from_pt.y = wavatar.y - this.m_pos_dy;
            }
            else{
                fly_a.m_from_pt.x = wavatar.x + this.m_pos_dx;
                fly_a.m_from_pt.y = wavatar.y + this.m_pos_dy;
            }
            fly_a.start(utils.get_render_milltm());
            this._add_waction_obj(fly_a);
            //this.m_waction_list.push(fly_a);
        }
        private on_warriordeadvanish(user_data:any):void{
            let src:number = user_data["src"];
            let wobj:warrior = this.get_warrior(src);
            if(wobj == null){
                return;
            }
            wobj.b_dead = true;
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            
            if(wavatar == null){
                core.combat_errlog("combatscene on_warriordeadvanish error!have not this guy!",src);
                return;
            }

            let d_a:dead_action = utils.getitembycls("dead_action",dead_action);
            d_a.re_init();
            d_a.m_id = src;
            d_a.m_warrior = wavatar;
            d_a.start(utils.get_render_milltm());
            this._add_waction_obj(d_a);
        }
        private on_warriordead(user_data:any):void{
            let src:number = user_data["src"];
            let wobj:warrior = this.get_warrior(src);
            if(wobj == null){
                return;
            }
            wobj.b_dead = true;
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            
            if(wavatar == null){
                core.combat_errlog("combatscene on_warriordead error!have not this guy!",src);
                return;
            }
            wavatar.change_action(core.AVATAR_ACTON.ACTION_DEAD,false);

            //let d_a:dead_action = utils.getitembycls("dead_action",dead_action);
            //d_a.re_init();
            //d_a.m_id = src;
            //d_a.m_warrior = wavatar;
            //d_a.start(utils.get_render_milltm());
            //this._add_waction_obj(d_a);
        }
        
        private on_warriorrevive(user_data:any):void{
            let src:number = user_data["src"];
            let wobj:warrior = this.get_warrior(src);
            if(wobj == null){
                return;
            }
            wobj.b_dead = true;
            this.on_warriorready({"src":src});
        }
        private on_warriordodge(user_data:any):void{
            let src:number = user_data["src"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                return;
            }
            let x:number = wavatar.x;
            let y:number = wavatar.y;
            if(this.is_downteam(this.get_posid_bywid(src))){
                x += this.m_pos_dx;
                y += this.m_pos_dy;
            }
            else{
                x -= this.m_pos_dx;
                y -= this.m_pos_dy;
            }
            laya.utils.Tween.to(wavatar,{set_x:x,set_y:y},500,laya.utils.Ease.strongOut);


            let cn:combat_number = this._get_combatnum(0,DAMAGETYPE_DODGE);
            cn.start();
            let x1:number = wavatar.x - (cn.m_w>>1);
            let y1:number = wavatar.y - 100;
            cn.m_obj_id = this.m_render.addsprite(cn,x1,y1);
            this.m_numpic_list.push(cn);
        }
        private clearallnumpic():void{
            for(let i of this.m_numpic_list){
                i.dispose();
                this.m_render.delsprite(i.m_obj_id);
            }
            this.m_numpic_list.length = 0;
        }
        private on_warriorsetpos(user_data:any):void{
            let src:number = user_data["src"];
            let x:number = user_data["x"];
            let y:number = user_data["y"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                core.combat_errlog("combatscene on_warriorsetpos error!have not this guy!",src);
                return;
            }
            wavatar.set_pos(x,y);
        }
        private on_warriorbackmove(user_data:any):void{
            let src:number = user_data["src"];
            let dst:number = user_data["dst"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                core.combat_errlog("combatscene on_warriorbackmove error!have not this guy!",src);
                return;
            }
            let x:number = wavatar.x;
            let y:number = wavatar.y;
            if(this.is_downteam(this.get_posid_bywid(src))){
                x += this.m_pos_dx*dst;
                y += this.m_pos_dy*dst;
            }
            else{
                x -= this.m_pos_dx*dst;
                y -= this.m_pos_dy*dst;
            }
            laya.utils.Tween.to(wavatar,{set_x:x,set_y:y},500,laya.utils.Ease.elasticOut);
        }
        private on_warriorattacked(user_data:any):void{
            let src:number = user_data["src"];
            let stopf:number = user_data["stopf"];
            let bcycle:boolean = true;
            if(stopf != undefined && stopf != null){
                bcycle = false;
            }
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                core.combat_errlog("combatscene on_warriorattacked error!have not this guy!",src);
                return;
            }
            wavatar.change_action(core.AVATAR_ACTON.ACTION_ATTACKED,bcycle,stopf);
        }
        private on_warriordefend(user_data:any):void{
            let src:number = user_data["src"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                return;
            }
            wavatar.change_action(core.AVATAR_ACTON.ACTION_DEFEND);
        }
        private on_warriorready(user_data:any):void{
            let src:number = user_data["src"];
            core.combat_tiplog("combatscene warrior ready ",src); 
            let wavatar:core.renderavatar = this.get_warrior_avatar(src);
            if(wavatar == null){
                return;
            }
            laya.utils.Tween.clearAll(wavatar);
            wavatar.change_action(core.AVATAR_ACTON.ACTION_READY);
            let pos:laya.maths.Point = this.get_pos(this.get_posid_bywid(src));
            let dir:number = this.get_dir(this.get_posid_bywid(src));
            wavatar.change_dir(dir);
            wavatar.set_pos(pos.x,pos.y);
        }
        private on_sethp(user_data:any):void{
            let hpins:warrior_hp = user_data as warrior_hp;
            core.combat_tiplog("combatscene on_sethp ",hpins.id,hpins.hp,hpins.hpmax);
            let wavatar:core.renderavatar = this.get_warrior_avatar(hpins.id);
            if(wavatar == null){
                return;
            }
            wavatar.set_hp(hpins.hp,hpins.hpmax);
        }
        private on_warriormove(user_data:any):void{
            let src:number = user_data["src"];
            let x:number = user_data["x"];
            let y:number = user_data["y"];
            this.m_render.unit_walk2(this.get_warrior_avatarid(src),x,y,true,true);
            let fdir:number = -1;
            if(user_data["forcedir"] != null){
                fdir = user_data["forcedir"];
                let p:core.path = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if(p != null){
                    p.m_force_dir = fdir;
                }
            }
        }
        private on_warriormoveback(user_data:any):void{
            let src:number = user_data["src"];
            
            let pos:laya.maths.Point = this.get_pos(this.get_posid_bywid(src));
            this.m_render.unit_walk2(this.get_warrior_avatarid(src),pos.x,pos.y,true,true);
            let fdir:number = -1;
            if(user_data["forcedir"] != null){
                fdir = user_data["forcedir"];
                let p:core.path = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if(p != null){
                    p.m_force_dir = fdir;
                }
            }
        }
        private on_warriormove2warrior(user_data:any):void{
            let src:number = user_data["src"];
            let dst:number = user_data["dst"];
            let pos:laya.maths.Point = this.get_pos(this.get_posid_bywid(dst));
            if(this.is_downteam(this.get_posid_bywid(src))){
                pos.x += this.m_pos_dx;
                pos.y += this.m_pos_dy;
            }
            else{
                pos.x -= this.m_pos_dx;
                pos.y -= this.m_pos_dy;
            }
            this.m_render.unit_walk2(this.get_warrior_avatarid(src),pos.x,pos.y,true,true);
            let fdir:number = -1;
            if(user_data["forcedir"] != null){
                fdir = user_data["forcedir"];
                let p:core.path = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if(p != null){
                    p.m_force_dir = fdir;
                }
            }
        }
        
        private on_warriordir2w(user_data:any):void{
            let src:number = user_data["src"];
            let dst:number = user_data["dst"];
            let srcavatar:core.renderavatar = this.m_render.getunit(this.get_warrior_avatarid(src));
            let dstavatar:core.renderavatar = this.m_render.getunit(this.get_warrior_avatarid(dst));
            if(srcavatar == null || dstavatar == null){
                return;
            }
            let dir:number = utils.gendir(dstavatar.x - srcavatar.x,dstavatar.y - srcavatar.y);
            srcavatar.change_dir(dir);
        }
        private on_warriordir(user_data:any):void{
            let src:number = user_data["src"];
            let dir:number = user_data["dir"];
            let wavatar:core.renderavatar = this.m_render.getunit(this.get_warrior_avatarid(src));
            if(wavatar == null){
                return;
            }
            wavatar.change_dir(dir);
        }
        private on_effect_screenpos(user_data:any):void{
            let effectid:number = user_data["effectid"];
            let x:number = user_data["x"];
            let y:number = user_data["y"];
            let pos:Laya.Point = this.m_render.stagepos2worldpos(new Laya.Point(x,y));
            this.m_render.addeff(effectid,pos.x,pos.y,false,true);
        }
        private on_effect(user_data:any):void{
            let effectid:number = user_data["effectid"];
            let x:number = user_data["x"];
            let y:number = user_data["y"];
            this.m_render.addeff(effectid,x,y,false,true);
        }
        private on_effect2w(user_data:any):void{
            let effectid:number = user_data["effectid"];
            let srcid:number = user_data["src"];
            let wavatar:core.renderavatar = this.get_warrior_avatar(srcid);
            if(wavatar == null){
                return;
            }
            let x:number = wavatar.x;
            let y:number = wavatar.y;
            this.m_render.addeff(effectid,x,y,false,true);
        }
        private on_customevent(user_data:any):void{
            core.combat_tiplog("combatscene customevent ",user_data);
            utils.event_ins().fire_event_next_frame(user_data[0],user_data[1]);
        }
        private on_blackscene(user_data:any):void{
            let tm:number = user_data["tm"];
            this.m_render.blackscene(tm);
        }
        public is_downteambywid(wid:number,self_group:number):boolean{
            let pos:number = wid;
            if(self_group != 0){
                if(pos <= 12){
                    pos += 20;
                }
                else{
                    pos -= 20;
                }
            }
            return this.is_downteam(pos);
        }
        public is_downteam(id:number):boolean{
            if(id <= 12){
                return true;
            }
            return false;
        }
        private mgr():combatimpl{
            return this.m_combat_mgr;
        }
        public register_event(event:string,func:Function):void
        {
            this.mgr().register_event(event,this);
            this.register_event_func(event,func);
        }
        public unregister_event(event:string):void
        {
            this.mgr().unregister_event(event,this);
            this.unregister_event_func(event);
        }
        public fire_event(event:string,user_data:any = null):void
        {
            this.mgr().fire_event(event,user_data);
        }
        public unregister_allevent():void
        {
            this.mgr().unregister_allevent(this);
            this.unregister_all_event_func();
        }
        public fire_event_next_frame(event:string,user_data = null):void
        {
            this.mgr().fire_event_next_frame(event,user_data);
        }
        public start():void
        {

        }
        private _get_combatnum(v:number,tp:number,content:string = ""):combat_number{
            let ret:combat_number = utils.getitembycls("combat_number",combat_number);
            ret.re_init(v,tp,content);
            return ret;
        }
        private _get_combatcrack(v:number,tp:number,content:string = ""):combat_crack{
            let ret:combat_crack = utils.getitembycls("combat_crack",combat_crack);
            ret.re_init(v,tp,content);
            return ret;
        }
        private _get_combatcryout(content:string = ""):combat_cryout{
            let ret:combat_cryout= utils.getitembycls("combat_cryout",combat_cryout);
            ret.re_init(content);
            return ret;
        }
        
        public clear():void{
            this.clear_bk_htmlcanvas();
            this.clearallwarrior();
            for(let i of this.m_waction_list){
                i.dispose();
            }
            this.m_waction_list.length = 0;
            this.clear_lineupsp();
            this.clearallnumpic();
            this.clearallcryout();
            this.m_render.clearmapbksp();
            this.m_render.clear();
        }
        public update(delta:number):void
        {
            this.m_tempnumpic_list.length = 0;
            for(let i of this.m_numpic_list){
                if(i.is_end()){
                    i.dispose();
                    this.m_render.delsprite(i.m_obj_id);
                }
                else{
                    i.tick(delta);
                    this.m_tempnumpic_list.push(i);
                }
            }
            let temp:Array<combat_number> = this.m_numpic_list;
            this.m_numpic_list = this.m_tempnumpic_list;
            this.m_tempnumpic_list = temp;

            //
            this.m_tempcryout_list.length = 0;
            for(let i of this.m_cryout_list){
                if(i.is_end()){
                    i.dispose();
                    this.m_render.delsprite(i.m_obj_id);
                }
                else{
                    i.tick(delta);
                    this.m_tempcryout_list.push(i);
                }
            }
            let temp1:Array<combat_cryout> = this.m_cryout_list;
            this.m_cryout_list = this.m_tempcryout_list;
            this.m_tempcryout_list = temp1;
            //
            for(let i:number = this.m_waction_list.length - 1;i >= 0;--i){
                let wa:combat_warrior_action = this.m_waction_list[i];
                wa.update(delta);
                if(wa.is_end()){
                    wa.dispose();
                    this.m_waction_list.splice(i,1);
                }
            }
            this.m_render.update(delta);
            
            
        }
        public render():void{
            this.m_render.render();
        }
        public dispose()
        {
            this.clear();
            if(this.m_render != null)
            {
                this.m_render.dispose();
                this.m_render = null;
            }
            this.m_combat_mgr = null;
            super.dispose();
            this.unregister_allevent();
        }
    }
}