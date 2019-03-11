module game{
    export class scene extends utils.game_module{
        public m_render:core.renderagent;
        private m_role_obj:core.renderavatar = null;
        private m_b_start_run:boolean = false;
        private m_b_run_start_x:number = -1;
        private m_b_run_start_y:number = -1;

        constructor()
        {
            super();
        }
        public start(){
            super.start();
            core.game_tiplog('scene start');
            //this.m_render.setmapbk("1002.jpg");
            //this.m_render.m_render.setworldwh(9600,5504);
            //this.m_render.addani(1001,100,100,false);
            //this.m_render.addani(1001,150,100,true);
            //this.m_render.addani(1001,this.m_render.m_render.getworldw()/2,this.m_render.m_render.getworldh()/2,false);
            //
            this.register_net_event(protocol_def.S2C_HERO_GOTO,this.on_main_force_goto);
            this.register_net_event(protocol_def.S2C_HERO_ENTERSCENE,this.on_main_enterscene);
            this.register_net_event(protocol_def.S2C_MAP_TRACK,this.on_net_rolemove);
            this.register_net_event(protocol_def.S2C_MAP_DEL,this.on_net_scenedel);
            this.register_net_event(protocol_def.S2C_MAP_ADDPLAYER,this.on_net_addplayer);
            this.register_net_event(protocol_def.S2C_MAP_REGIONCHANGE,this.on_regionchanged);

            
            this.register_event(game_event.EVENT_SCENE_CLICK,this.on_scene_click);
            this.register_event(game_event.EVENT_SCENE_STOP,this.on_scene_stop);
            
            let game_ins:game_main = get_module(module_enum.MODULE_MAIN) as game_main;
            this.m_render = game_ins.get_render();

            this.register_event(game_event.EVENT_TIMER_TICK_1S,this.on_check_mainplayer_pos);
        }
        public dispose()
        {
            super.dispose();
        }
        private _get_mainrole_id():number{
            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            return mp.m_scene_roleid;
        }
        private is_mainplayer(pid:number):boolean{
            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            return pid == mp.m_pid;
        }
        private on_role_enter(id:number,name:string,shape:number,lv:number,cls:number,x:number,y:number,desc:Laya.Byte):void
        {
            core.game_tiplog("scene on_role_enter ",id,name,shape,lv,cls,x,y);
            
            let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
            let sroledata:data.scene_role_data = scenedata.getrole(id);
            let role_id:number = 0;
            if(sroledata != null)
            {
                core.game_tiplog("error! already have this role ",id);
                role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delrole(id);
            }
            scenedata.addrole(id,shape,name,lv,cls,x,y,desc);
            sroledata = scenedata.getrole(id);
            let sx:number = x*this.m_render.getmap_gridw();
            let sy:number = y*this.m_render.getmap_gridh();
            
            if(shape == 0){
                shape = 102;
            }
            role_id = this.m_render.addunit(name,shape,sx,sy);
            sroledata.set_role_id(role_id);
            sroledata.m_desc = desc;
            let ra:core.renderavatar = this.m_render.getunit(role_id);
            if (ra != null){
                ra.change_action(core.AVATAR_ACTON.ACTION_STAND);
                ra.change_weapon(10001);
                ra.change_ride(20001,30001);
                ra.set_ride_h(30);
                ra.change_wing(40001);
            }
            
            this.fire_event_next_frame(game_event.EVENT_PLAYER_ENTER);
        }

        
        private on_role_out(id:number):void
        {
            core.game_tiplog("scene on_role_out ",id);
            
            let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
            let sroledata:data.scene_role_data = scenedata.getrole(id);
            if(sroledata != null)
            {
                let role_id:number = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delrole(id);
                this.fire_event_next_frame(game_event.EVENT_PLAYER_OUT);
                return;
            }
            sroledata = scenedata.getnpc(id);
            if(sroledata != null)
            {
                let role_id:number = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delnpc(id);
                return
            }
        }
        private on_role_move(id:number,x:number,y:number):void
        {
            core.game_tiplog("scene on_role_move ",id,x,y);
            let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
            let sroledata:data.scene_role_data = scenedata.getrole(id);
            if(sroledata == null)
            {
                sroledata = scenedata.getnpc(id);
                if(sroledata == null){
                    core.game_tiplog("scene have not this role ",id,x,y);
                    return
                }
            }
            
            sroledata.set_pos(x,y);
            let role_id:number = sroledata.m_role_id;
            let pt:laya.maths.Point = this.m_render.unit_walk2(role_id,x*this.m_render.getmap_gridw(),y*this.m_render.getmap_gridh());
            let mavatar:core.renderavatar = this.m_render.getunit(role_id);
            if(pt == null && mavatar != null){
                if(this.m_render.is_scene_block(mavatar.x,mavatar.y)){
                    pt = this.m_render.unit_walk2(role_id,x*this.m_render.getmap_gridw(),y*this.m_render.getmap_gridh(),true);
                }
            }
        }
        private on_enter_scene(ssid:number,resid:number,x:number,y:number):void
        {
            core.game_tiplog("scene on_enter_scene ",ssid,resid,x,y);
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1; 
            let mavatar:core.renderavatar = this.m_render.getunit(this._get_mainrole_id());
            if(mavatar != null){
                this.m_render.unit_stop(this._get_mainrole_id());
            }

            this.m_render.clear();
            let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
            scenedata.clearallrole();
            scenedata.clearallnpc();
            scenedata.clear_all_cli_npc();


            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            mp.m_sid = ssid;
            mp.m_sresid = resid;
            mp.x = x;
            mp.y = y;

            scenedata.addrole(mp.m_pid,mp.m_shape,mp.m_name,mp.m_lv,mp.m_class,mp.x,mp.y,mp.m_desc);
            //sid = 1700;
            this.m_render.entermap(resid,false);
            this.m_render.setmapbk("map/city/"+resid.toString()+"/"+resid.toString()+".jpg");
            let sx:number = x*this.m_render.getmap_gridw();
            let sy:number = y*this.m_render.getmap_gridh();
            core.game_tiplog("enter scene create main player ",mp.m_name,mp.m_shape,sx,sy,x,y);
            let m_role_id:number = this.m_render.addunit(mp.m_name,mp.m_shape,sx,sy);
            scenedata.setroleid(mp.m_pid,m_role_id);
            mp.m_scene_roleid = m_role_id;
            /*
            let chase_id:number = this.m_render.addunit("",50001,0,0);
            this.m_render.set_follow_id(chase_id,this.m_role_id);
            let chase_role:core.renderavatar = this.m_render.getunit(chase_id);
            chase_role.set_dxy(0,-100);
            chase_role.show_shadow(false);
            chase_role = this.m_render.getunit(this.m_role_id);
            chase_role.change_weapon(10001);
            chase_role.change_ride(20001,30001);
            chase_role.set_ride_h(30);
            chase_role.change_wing(40001);
            */
            //this.m_render.addani(1001,150,100,true);
            //this.m_render.addani(1001,this.m_render.m_render.getworldw()/2,this.m_render.m_render.getworldh()/2,false);
            //
            let unit:core.renderavatar = this.m_render.getunit(this._get_mainrole_id());
            if (unit != null){
                unit.change_action(core.AVATAR_ACTON.ACTION_STAND);
                unit.change_weapon(10001);
                unit.change_ride(20001,30001);
                unit.set_ride_h(30);
                unit.change_wing(40001);
                
                this.m_render.cameralookat(unit);
                this.m_role_obj = unit;
            }
            
            this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE,[x,y]);
            this.fire_event_next_frame(game_event.EVENT_ENTERSCENE, {"scene_id":ssid});
        }
        
        private req_unit_move(uid:number,sx:number,sy:number):Laya.Point{
            let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
            let sroledata:data.scene_role_data = scenedata.getrole(uid);
            if(sroledata != null)
            {
                uid = sroledata.m_role_id;
            }
            else{
                return;
            }

            let wpos:Laya.Point = new Laya.Point();
            wpos.x = sx*this.m_render.getmap_gridw();
            wpos.y = sy*this.m_render.getmap_gridh();

            let ret:Laya.Point = this.m_render.unit_walk2(uid,wpos.x,wpos.y);
            let mavatar:core.renderavatar = this.m_render.getunit(uid);
            if(ret == null && mavatar != null){
                if(this.m_render.is_scene_block(mavatar.x,mavatar.y)){
                    ret = this.m_render.unit_walk2(uid,wpos.x,wpos.y,true);
                }
            }
            return ret;
        }
        private req_main_move(sx:number,sy:number):void{
            let wpos:Laya.Point = new Laya.Point();
            wpos.x = sx*this.m_render.getmap_gridw();
            wpos.y = sy*this.m_render.getmap_gridh();

            this.m_render.addeff(1003,wpos.x,wpos.y,true,true);
            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            let ret:Laya.Point = this.req_unit_move(mp.m_pid,sx,sy);
        
            if(ret != null)
            {
                let mx:number = ret.x;
                let my:number = ret.y;
                mx = Math.floor(mx / this.m_render.getmap_gridw());
                my = Math.floor(my / this.m_render.getmap_gridh());

                //net.net_ins().send(protocol_def.c2s_move,{'x':mx,'y':my});
                this.m_b_start_run = true;
                let mavatar:core.renderavatar = this.m_render.getunit(this._get_mainrole_id());
                let cx:number = mavatar.x;
                let cy:number = mavatar.y;

                cx = Math.floor(cx / this.m_render.getmap_gridw());
                cy = Math.floor(cy / this.m_render.getmap_gridh());
                if(this.m_b_run_start_x == -1){
                    this.m_b_run_start_x = cx;
                    this.m_b_run_start_y = cy;
                }
                
                mp.x = mx;
                mp.y = my;
                //this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE,[mx,my]);
            }
        }

       
        public wpos2spos(x:number,y:number):Laya.Point{
            let wpos:laya.maths.Point = new laya.maths.Point(x*this.m_render.getmap_gridw(),y*this.m_render.getmap_gridh());
            let spos:laya.maths.Point = this.m_render.worldpos2stagepos(wpos);
            spos.x = spos.x*1.0;
            spos.y = spos.y*1.0;
            return spos;
        }
        private on_click_sp(sx:number,sy:number):void
        {
            if(this._get_mainrole_id() == 0)
            {
                return;
            }
            //
            
            
            //
            

            let src_x:number = sx;
            let src_y:number = sy;

           
            //
            let spos:laya.maths.Point = new laya.maths.Point(sx,sy);

            let wpos:laya.maths.Point = this.m_render.stagepos2worldpos(spos);

            let click_id:number = this.m_render.check_point(wpos.x,wpos.y);
            if(click_id != 0){
                let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
                for(let i of scenedata.m_npc_mgr.m_role_list){
                    if(i.m_role_id == click_id){
                        net.net_ins().send(protocol_def.C2S_NPC_LOOK,{'id':i.m_pid});
                        return;
                    }
                }
                
                for(let i of scenedata.m_role_mgr.m_role_list){
                    if(i.m_role_id == click_id && !this.is_mainplayer(i.m_pid)){
                        this.fire_event_next_frame(game_event.EVENT_CLICK_PLAYER, {"pid": i.m_pid});
                        return
                    }
                }
            }  
            this.req_main_move(wpos.x/this.m_render.getmap_gridw(),wpos.y/this.m_render.getmap_gridh());
            
        }
        private _get_move_dir(pt:laya.maths.Point):number{
            if(pt.x == 0 && pt.y == 0){
                alert("get_move_dir error!!");
                return 0;
            }
            if(pt.x == 0 && pt.y > 0){
                return 0;
            }
            if(pt.x == 0 && pt.y < 0){
                return 4;
            }
            if(pt.x > 0 && pt.y == 0){
                return 6;
            }
            if(pt.x < 0 && pt.y == 0){
                return 2;
            }
            if(pt.x > 0 && pt.y > 0){
                return 7;
            }
            if(pt.x > 0 && pt.y < 0){
                return 5;
            }
            if(pt.x < 0 && pt.y > 0){
                return 1;
            }
            if(pt.x < 0 && pt.y < 0){
                return 3;
            }
            alert("get_move_dir error end!!")
            return 0;
        }
        private send_move_step(sx:number,sy:number,step_list:Array<laya.maths.Point>):void{
            let C2S_MOVE_STEP:number = 0x140;
            let C2S_MOVE_STEP_SUB:number = 0x0;
            let STEP_MAX:number = 16;
            let sendbuff:Laya.Byte = new Laya.Byte();
            sendbuff.endian = Laya.Byte.BIG_ENDIAN;
            while(step_list.length > 0){
                sendbuff.clear();
                //sendbuff.writeUint8(C2S_MOVE_STEP_SUB);
                sendbuff.writeUint16(sx);
                sendbuff.writeUint16(sy);
                let step_count:number = step_list.length;
                if(step_count > STEP_MAX){
                    step_count = STEP_MAX;
                }
                sendbuff.writeUint8(step_count);
                let idx:number = 0;
                let tmp:string = ""+sx.toString()+" "+sy.toString();
                let step_obj:Array<number> = new Array<number>();
                let start_x:number = sx;
                let start_y:number = sy;
                while(idx < step_count){
                    let pt:laya.maths.Point = step_list.shift();
                    let dir:number = this._get_move_dir(pt)+1;
                    sendbuff.writeUint8(dir);
                    sx = sx + pt.x;
                    sy = sy + pt.y;
                    idx += 1;
                    tmp += " "+pt.x.toString()+" "+pt.y.toString()+" "+dir.toString();
                    step_obj.push(dir);
                }
                core.game_tiplog("s2c movestep ",tmp)
                net.net_ins().send_raw_buff(C2S_MOVE_STEP,sendbuff);
                //net.net_ins().send(protocol_def.C2S_MAP_MOVE,{'x':start_x,'y':start_y,'step':step_obj});
            }
        }
        public on_check_mainplayer_pos(ud:any = null):void{
            //
            if(this.m_role_obj != null){
                let x:number = this.m_role_obj.x;
                let y:number = this.m_role_obj.y;
                let ret:boolean = this.m_render.is_scene_mask(x,y);
                if(ret){
                    this.m_role_obj.alpha = 0.5;
                }
                else{
                    this.m_role_obj.alpha = 1.0;
                }
            }
            //
            if(this.m_b_start_run){
                core.game_tiplog("on_check_mainplayer_pos start");
                let mavatar:core.renderavatar = this.m_render.getunit(this._get_mainrole_id());
                let cx:number = mavatar.x;
                let cy:number = mavatar.y;

                cx = Math.floor(cx / this.m_render.getmap_gridw());
                cy = Math.floor(cy / this.m_render.getmap_gridh());
                core.game_tiplog("on_check_mainplayer_pos ",this.m_b_run_start_x,this.m_b_run_start_y,cx,cy);
                if(cx == this.m_b_run_start_x && cy == this.m_b_run_start_y){
                    if(this.m_render.is_unit_walk(this._get_mainrole_id()) == false){
                        this.m_b_start_run = false;
                    }
                    this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE,[cx,cy]);
                    core.game_tiplog("on_check_mainplayer_pos end1");
                    return;
                }
                else{
                    let dx:number = cx - this.m_b_run_start_x;
                    let dy:number = cy - this.m_b_run_start_y;
                    if(dx != 0){
                        dx = dx/Math.abs(dx);
                    }
                    if(dy != 0){
                        dy = dy/Math.abs(dy);
                    }
                    
                    let step_list:Array<laya.maths.Point> = new Array<laya.maths.Point>();
                    let stepx:number = this.m_b_run_start_x;
                    let stepy:number = this.m_b_run_start_y;
                    while(stepx != cx || stepy != cy){
                        step_list.push(new laya.maths.Point(dx,dy));
                        stepx = stepx + dx;
                        stepy = stepy + dy;
                        if(stepx == cx){
                            dx = 0;
                        }
                        if(stepy == cy){
                            dy = 0;
                        }
                    }
                    this.send_move_step(this.m_b_run_start_x,this.m_b_run_start_y,step_list);
                    this.m_b_run_start_x = cx;
                    this.m_b_run_start_y = cy;
                    this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE,[cx,cy]);
                }
                core.game_tiplog("on_check_mainplayer_pos end2");
            }
            
        }
        private on_scene_stop(ud:any = null):void{
            //this.on_check_mainplayer_pos();
            this.m_b_start_run = false;
            
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
        }
        private on_main_force_goto(ud:any = null):void{
            this.m_b_start_run = false;
            
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
            let x:number = ud['x'];
            let y:number = ud['y'];
            core.game_errlog("on_main_force_goto ",x,y);
            let mavatar:core.renderavatar = this.m_render.getunit(this._get_mainrole_id());
            if(mavatar != null){
                this.m_render.unit_stop(this._get_mainrole_id());
                mavatar.set_pos(x*this.m_render.getmap_gridw(),y*this.m_render.getmap_gridh());
            }
        }
        
        private on_main_enterscene(ud:any = null):void{
            let rid:number = ud['id'];
            let sid:number = ud['scid'];
            let ssid:number = ud['scsid'];
            let resid:number = ud['resid'];
            let scname:string = ud['scname'];
            let x:number = ud['x'];
            let y:number = ud['y'];
            core.game_tiplog("on_main_enterscene ",ud,x,y);
            //resid = 1001;
            this.on_enter_scene(ssid,resid,x,y);
            
        }
        
        private on_net_addplayer(ud:any = null):void{
            core.game_tiplog("on_net_addplayer ",ud);
            let id:number = ud["id"];
            let name:string = ud["name"];
            let shape:number = ud["shape"];
            let cls:number = 1;//ud["class"];
            let lv:number = 1;//ud["lv"];
            let x:number = ud["x"];
            let y:number = ud["y"];
            let desc:Laya.Byte = ud["desc"];
            // 服务器去掉了这两个字段
            // let title:number = ud["title"];
            // let touxian:number = ud["touxian"];
            this.on_role_enter(id,name,shape,lv,cls,x,y,desc);
        }
        private on_regionchanged(ud:any):void{
            core.game_tiplog("on_regionchanged ",ud);
            let left:number = ud['x'];
            let top:number = ud['y'];
            let right:number = ud['rw'];
            let bottom:number = ud['rh'];

            core.game_tiplog("on_regionchanged ",left,top,right,bottom);
            let scenedata:data.scene_data = data.get_data(data_enum.DATA_SCENE) as data.scene_data;
            for(let i of scenedata.m_role_mgr.m_role_list){
                if(this.is_mainplayer(i.m_pid)){
                    continue;
                }
                //自己不删除
                //need code 如果将来场景里有组队，则要加入下面处理
                //如果在组队中，并且只是队员，而不是队长，暂时跳过不处理
                //如果在组队中，并且是队长，则连整个队伍一起删除
                //end need code
                if(i.x < left || i.x > right || i.y < top || i.y > bottom){
                    this.on_role_out(i.m_pid);
                }
            }
        }
        private on_net_scenedel(ud:any):void{
            core.game_tiplog("on_net_scenedel ",ud);
            let id:number = ud["id"];
            this.on_role_out(id);
        }
        
        private on_net_rolemove(ud:any = null):void{
            core.game_tiplog("on_net_rolemove ",ud);
            let id:number = ud["id"];
            let x:number = ud["x"];
            let y:number = ud["y"];
            let dx:number = ud["dx"];
            let dy:number = ud["dy"];
            core.game_tiplog("on_net_rolemove data ",id,x,y,dx,dy);
            this.on_role_move(id,dx,dy);
        }
        private on_scene_click(user_data:any = null):void
        {
            core.game_tiplog("scene ins on_game_click ",user_data);
            
            this.on_click_sp(user_data[0],user_data[1]);
        }
    }
}