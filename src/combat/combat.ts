module combat{
    export class warrior{
        public id:number = 0;
        public roleid:number = 0;
        public pos:number = 0;
        public shape:number = 0;
        public group:number = 0;
        public cls:number = 0;
        public lv:number = 0;
        public scale:number = 1.0;
        public name:string = "undefine";
        public b_dead:boolean = false;
        public desc:Laya.Byte = null;
        public m_desc:Array<number> = new Array<number>();//skin,weapon,wing,fairy,aurn,title,ride,rideback,rideh
        constructor(){
            for(let i:number = 0;i < 10;++i){
                this.m_desc.push(0);
            }
        }
        public clone_data(d:warrior):void{
            d.id = this.id;
            d.roleid = this.roleid;
            d.pos = this.pos;
            d.shape = this.shape;
            d.group = this.group;
            d.cls = this.cls;
            d.lv = this.lv;
            d.scale = this.scale;
            d.name = this.name;
            d.b_dead = this.b_dead;
            if(this.desc != null){
                d.desc = new Laya.Byte();
                this.desc.pos = 0;
                while(this.desc.bytesAvailable > 0){
                    d.desc.writeByte(this.desc.getByte());
                }
            }
            if(this.m_desc.length > 0){
                for(let i :number = 0;i < this.m_desc.length;++i){
                    d.m_desc.push(this.m_desc[i]);
                }
            }
        }
    }
    export class warrior_hp{
        public id:number = 0;
        public hp:number = 0;
        public hpmax:number = 0;
        public mp:number = 0;
        public mpmax:number = 0;
        constructor(){
        }
    }
    export class atk_status{
        public id:number;
        public skillid:number;
        public skilllv:number;
        public damage:number;
        public damagetype:number = 0;
        public b_crack:boolean = false;
        public b_dead:boolean = false;
        public b_vanish:boolean = false;
        public b_fly:boolean = false;
        public b_revive:boolean = false;
        public b_defend:boolean = false;
        public b_dodge:boolean = false;
        constructor(){

        }
    }
    export class buff_status{
        public id:number;
        public skillid:number;
        public skilllv:number;
        public buffid:number;
        public buffshape:number;
        public buffeffid:number;
        public cd:number;
        public overlay:number;
        public datas:Array<number> = new Array<number>();
        constructor(){

        }
    }
    export class skillatk{
        public id:number;
        public self_group:number = 0;
        public skillid:number;
        public skilllv:number;
        public dst_list:Array<number> = new Array<number>();
        public atkstatus_list:Array<atk_status> = new Array<atk_status>();
        public addbuff_list:Array<buff_status> = new Array<buff_status>();
        public subbuff_list:Array<buff_status> = new Array<buff_status>();
        public m_type:number;//0 normal,1 skill,2 shake,3 counteratk
        public m_config_id:number = 1;
        constructor(){

        }
    }
    
    export class combat_turn{
        public m_num:number = 0;
        public m_action_list:Array<combat_action> = new Array<combat_action>();
        public m_action_idx:number = 0;
        public m_add_list:Array<any> = new Array<any>();
        public m_sethp_list:Array<any> = new Array<any>();
        constructor(num:number){
            this.m_num = num;
        }
        public is_end():boolean{
            return this.m_action_idx >= this.m_action_list.length;
        }
        public do():void{
            if(this.is_end() == false){
                this.m_action_list[this.m_action_idx].do();
                this.m_action_idx += 1;
            }
        }
        public dispose():void{
        }
    }
    export class combatimpl extends utils.game_event_dispatcher{
        public m_scene:combatscene = null;
        
        private m_turn_list:Array<combat_turn> = new Array<combat_turn>();
        private m_turn_idx:number = 0;
        private m_cur_turn:combat_turn = null;
        private m_player:combat_player = new combat_player();
        private m_b_end:boolean = true;
        public m_skillperform_config:any = null;
        public m_skill_config:any = null;
        private m_skill_configmap:Object = new Object;
        private m_skillperform_cache:Object = new Object;
        constructor(sp:laya.display.Sprite)
        {
            super();
            this.m_scene = new combatscene(this,sp);
        }
        public set_tm(tp:number,tm:number):void{
            switch(tp){
                case 0:
                    combat_action.ATTACKED_TM = tm;
                    break;
                case 1:
                    combat_action.DEAD_ATTACKED_TM = tm;
                    break;
                case 2:
                    combat_action.DEAD_TM = tm;
                    break;
                case 3:
                    combat_action.FLY_ATTACKED_TM = tm;
                    break;
                case 4:
                    combat_action.FLY_TM = tm;
                    break;
                case 5:
                    combat_action.DODGE_TM = tm;
                    break;
                case 6:
                    combat_action.DEFEND_TM = tm;
                    break;
                case 7:
                    combat_action.REVIVE_TM = tm;
                    break;
                default:
                    break;
            }
        }
        public get_skillperformcryout(skillid:number):string{
            let skillconfig:any = this.m_skillperform_config(skillid);
            if(skillconfig == null || skillconfig == undefined){
                return "未知技能"+skillid.toString();
            }
            return skillconfig.cryout;
        }
        public parse_skillcfg_by_s(id:number,s:string):Object{
            let ret:Object = new Object();
            ret["id"] = id;
            ret["data"] = [];
            let l:Array<string> = s.split("\r\n");
            for(let i of l){
                let p:Array<string> = i.split(",");
                if(p.length > 1){
                    let tm:number = parseInt(p[0]);
                    let action:string = p[1];
                    let o:Object = new Object();
                    o["tm"] = tm;
                    o["action"] = action;
                    let p_idx:number = 1;
                    for(let j:number = 2;j < p.length;++j){
                        let param:string = p[j];
                        o["param"+p_idx.toString()] = param;
                        p_idx += 1;
                    }
                    ret["data"].push(o);
                }
            }
            return ret;
        }
        public set_skillperformcfg_cache(id:number,cfg:Object):void{
            this.m_skillperform_cache[id] = cfg;
        }
        public get_skillperformcfg_cache_frompack(id:number):Object{
            if(this.m_skillperform_cache[id] != undefined){
                return this.m_skillperform_cache[id]; 
            }
            let file_name:string = "/"+id.toString()+".txt";
            let n:number = core.filepack_ins().get_file_len("skillperform",file_name);
            if(n > 0){
                let fb:Laya.Byte = core.filepack_ins().get_file("skillperform",file_name);
                let s:string = fb.getUTFBytes(n);
                let s_o:Object = this.parse_skillcfg_by_s(id,s);
                this.set_skillperformcfg_cache(id,s_o);
            }
            return this.m_skillperform_cache[id];
        }
        private get_skillperformcfg(id:number):Object{
            let ret:Object = this.get_skillperformcfg_cache_frompack(id);
            if(ret == null || ret == undefined){
                ret = this.m_skill_config(id);
            }
            if(ret == null){
                ret = this.m_skill_config(1);
            }
            return ret;
        }
        public get_skillperformconfig(skillid:number,skilllv:number,config_id:number):any{
            let skillconfigkey:number = skillid*10000+skilllv*10+config_id;
            if(this.m_skill_configmap[skillconfigkey] == undefined){
                let skillconfig:any = this.m_skillperform_config(skillid);
                if(skillconfig == null || skillconfig == undefined){
                    core.combat_errlog("get skillperform config error! ",skillid,skilllv);
                    return null;
                }
                let cfg:any = null;
                for(let i of skillconfig.data){
                    if(i.skilllv == skilllv){
                        cfg = i;
                        break;
                    }
                }
                if(cfg == null){
                    cfg = skillconfig.data[0];
                }
                //
                if(config_id == 1){
                    if(cfg['config1'] != undefined){
                        this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config1']);
                    }
                    else{
                        if(cfg['config2'] != undefined){
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config2']);
                        }
                        else{
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(1);
                        }
                    }
                }
                else{
                    if(cfg['config2'] != undefined){
                        this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config2']);
                    }
                    else{
                        if(cfg['config1'] != undefined){
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(cfg['config1']);
                        }
                        else{
                            this.m_skill_configmap[skillconfigkey] = this.get_skillperformcfg(1);
                        }
                    }
                }
                //
            }
            return this.m_skill_configmap[skillconfigkey];
        }
        public set_skill_config(cfg:any):void{
            this.m_skill_config = cfg;
        }
        public set_skillperform_config(cfg:any):void{
            this.m_skillperform_config = cfg;
        }
        public addplayernode(node:combat_playernode):void{
            this.m_player.addnode(node);
        }
        public clearplayernode():void{
            for(let i of this.m_player.m_arr){
                this._del_player_ins(i);
            }
            this.m_player.clear();
        }
        public startplayernode():void{
            this.m_player.start();
        }
        public isplayerend():boolean{
            return this.m_player.is_end();
        }
        public isturnend():boolean{
            if(this.m_turn_idx < this.m_turn_list.length){
                return false;
            }
            return true;
        }
        public _get_turn_ins(num:number):combat_turn{
            return new combat_turn(num);
        }
        public _del_turn_ins(ins:combat_turn):void{
            
        }
        public _get_action_ins(type:number,data:any):combat_action{
            return new combat_action(type,data,this);
        }
        public _del_action_ins(ins:combat_action):void{

        }
        public _get_player_ins(tm:number,event:string,user_data:any):combat_playernode{
            return new combat_playernode(tm,event,user_data,this);
        }
        public _del_player_ins(ins:combat_playernode):void{

        }
        public get_warrior_ins():warrior{
            return new warrior();
        }
        public del_warrior_ins(warrior_ins:warrior):void{

        }
        public get_skillatk_ins():skillatk{
            return new skillatk();
        }
        public del_skillatk_ins(skillatk_ins:skillatk):void{

        }
        public get_atkstatus_ins():atk_status{
            return new atk_status();
        }
        public del_atkstatus_ins(ins:atk_status):void{

        }
        public get_buffstatus_ins():buff_status{
            return new buff_status();
        }
        public del_buffstatus_ins(ins:buff_status):void{

        }
        public get_warriorhp_ins():warrior_hp{
            return new warrior_hp();
        }
        public del_warriorhp_ins(ins:warrior_hp):void{

        }
        public start(hc:Laya.HTMLCanvas = null,w:number = 0,h:number = 0,x:number = 0,y:number = 0,scene_id:number = 0,scene_res:string = null):void
        {
            core.combat_errlog("combat start");
            for(let i of this.m_turn_list){
                for(let j of i.m_action_list){
                    this._del_action_ins(j);
                }
                this._del_turn_ins(i);
            }
            this.m_turn_list = new Array<combat_turn>();
            this.m_turn_idx = 0;
            this.m_cur_turn = null;
            this.m_b_end = false;
            this.m_scene.start();
            let newturn:combat_turn = this._get_turn_ins(-1);
            newturn.m_action_list.push(this._get_action_ins(ACTION_ENTER,[hc,w,h,x,y,scene_id,scene_res]));
            this.m_turn_list.push(newturn);
        }
        public end():void{
            //todo
            core.combat_errlog("combat end");
            this.m_b_end = true;

            for(let i of this.m_turn_list){
                for(let j of i.m_action_list){
                    this._del_action_ins(j);
                }
                this._del_turn_ins(i);
            }
            this.m_turn_list = new Array<combat_turn>();
            this.m_turn_idx = 0;
            this.m_cur_turn = null;

            this.m_scene.clear();
            this.m_player.clear();
        }
        public combatend():void{
            let newturn:combat_turn = this._get_turn_ins(-1);
            newturn.m_action_list.push(this._get_action_ins(ACTION_END,null));
            this.m_turn_list.push(newturn);
        }
        public addwarrior(data:warrior):void{
            if(this.m_cur_turn.m_num == 0){
                this.m_cur_turn.m_add_list.push(data);
            }
            else{
                this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_ADDWARRIOR,data));
            }
            
        }
        public change_lineup(res:string,dx:number,dy:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_CHANGELINEUP,[res,dx,dy]));
        }
        public changeweapon(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,1,aid]));
        }
        public changewing(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,2,aid]));
        }
        public changeride(wid:number,aid:number,abid:number,ride_h:number = 30):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,3,[aid,abid,ride_h]]));
        }
        public changehair(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,4,aid]));
        }
        public changeshape(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,0,aid]));
        }
        public changeaurn(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,5,aid]));
        }
        public changetitle(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,6,aid]));
        }
        public changefairy(wid:number,aid:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETWARRIORADORN,[wid,7,aid]));
        }
        public attack(data:skillatk):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SKILL,data));
        }
        public send_event(event:string,user_data:any):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_CUSTOMEVENT,[event,user_data]));
        }
        public delwarrior(id:number):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_DELWARRIOR,id));
        }
        public addbuff(data:buff_status):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_ADDBUFF,data));
        }
        public delbuff(data:buff_status):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_DELBUFF,data));
        }
        public buffcd(data:buff_status):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_BUFFCD,data));
        }
        public buffautocd():void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_BUFFAUTOCD,null));
        }
        public propchange(data:atk_status):void{
            this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_PROPCHANGE,data));
        }
        public set_warrior_hp(data:warrior_hp):void{
            if(this.m_cur_turn.m_num == 0){
                this.m_cur_turn.m_sethp_list.push(data);
            }
            else{
                this.m_cur_turn.m_action_list.push(this._get_action_ins(ACTION_SETHP,data));
            }
        }
        public turnstart(count:number):void{
            if(this.m_cur_turn != null)
            {
                if(this.m_cur_turn.m_sethp_list.length > 0){
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(ACTION_INITWARRIORHPS,this.m_cur_turn.m_sethp_list.concat([])));
                }
                if(this.m_cur_turn.m_add_list.length > 0){
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(ACTION_INITWARRIORS,this.m_cur_turn.m_add_list.concat([])));
                }
                
                this.m_turn_list.push(this.m_cur_turn);
            }
            this.m_cur_turn = this._get_turn_ins(count);
        }
        public turnend():void{
            if(this.m_cur_turn != null){
                if(this.m_cur_turn.m_sethp_list.length > 0){
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(ACTION_INITWARRIORHPS,this.m_cur_turn.m_sethp_list.concat([])));
                }
                if(this.m_cur_turn.m_add_list.length > 0){
                    this.m_cur_turn.m_action_list.unshift(this._get_action_ins(ACTION_INITWARRIORS,this.m_cur_turn.m_add_list.concat([])));
                }
                this.m_turn_list.push(this.m_cur_turn);
            }
            
            this.m_cur_turn = null;
        }
        public update(delta:number):void
        {
            if(this.m_b_end){
                return;
            }
            if(this.m_player.is_end())
            {
                if(this.m_turn_idx < this.m_turn_list.length)
                {
                    let turn:combat_turn = this.m_turn_list[this.m_turn_idx];
                    if(turn.is_end())
                    {
                        this.m_turn_idx += 1;
                    }
                    else
                    {
                        turn.do();
                    }
                }
            }
            this.dispatch_all_delay_event();
            this.m_scene.update(delta);
            this.m_player.update(delta);
        }
        public render():void{
            this.m_scene.render();
        }
        public dispose():void
        {
            if(this.m_scene != null)
            {
                this.m_scene.dispose();
                this.m_scene = null;
            }
            super.dispose();
        }
    }
}