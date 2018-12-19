module combat{
    export class combat_action{
        public m_type:number = 0;
        public m_data:any;
        public m_mgr:combatimpl = null;
        static ATTACKED_TM:number = 450;
        static DEAD_ATTACKED_TM:number = 500;
        static DEAD_TM:number = 400;
        static FLY_ATTACKED_TM:number = 500;
        static FLY_TM:number = 400;
        static DODGE_TM:number = 300;
        static DEFEND_TM:number = 200;
        static REVIVE_TM:number = 400;
        constructor(tp:number,data:any,mgr:combatimpl){
            this.m_type = tp;
            this.m_data = data;
            this.m_mgr = mgr;
        }
        public do():void{
            this.m_mgr.clearplayernode();
            switch(this.m_type){
                case ACTION_ADDWARRIOR:
                    this.do_addwarrior();
                    break;
                case ACTION_INITWARRIORS:
                    this.do_initwarrior();
                    break;
                case ACTION_INITWARRIORHPS:
                    this.do_initwarriorhps();
                    break;
                case ACTION_SETWARRIORADORN:
                    this.do_setadorn();
                    break;
                case ACTION_CUSTOMEVENT:
                    this.do_customevent();
                    break;
                case ACTION_ENTER:
                    this.do_enter();
                    break;
                case ACTION_CHANGELINEUP:
                    this.do_changelineup();
                    break;
                case ACTION_SKILL:
                    this.do_skill();
                    break;
                case ACTION_DELWARRIOR:
                    this.do_delwarrior();
                    break;
                case ACTION_SETHP:
                    this.do_sethp();
                    break;
                case ACTION_ADDBUFF:
                    this.do_addbuff();
                    break;
                case ACTION_DELBUFF:
                    this.do_delbuff();
                    break;
                case ACTION_BUFFCD:
                    this.do_buffcd();
                    break;
                case ACTION_BUFFAUTOCD:
                    this.do_buffautocd();
                    break;
                case ACTION_PROPCHANGE:
                    this.do_propchange();
                    break;
                default:
                    break;
            }
            this.m_mgr.startplayernode();
        }
        private _get_skill_unitid(param:string):number{
            if(param == "dst"){
                return this.m_data.dst_list[0]
            }
            return this.m_data.id;
        }
        private _pop_skill_dst():void{
            this.m_data.dst_list.pop();
        }
        private _parse_skill_move(tm:number,data:Object,self_group:number):void{
            let src_id:number = this._get_skill_unitid(data['param1']);
            let dst_id:number = this._get_skill_unitid(data['param2']);
            let fdir:number = -1;
            if(data['param3'] != null){
                fdir = parseInt(data['param3']);
            }
            else{
                if(this._is_downteam(src_id,self_group)){
                    fdir = 3;
                }
                else{
                    fdir = 7;
                }
            }
            let ud:{} = {"src":src_id,"dst":dst_id,"forcedir":fdir};
            this._add_node(tm,COMBATSCENE_WARRIORMOVE2WARRIOR,ud);
        }
        private _parse_skill_move2(tm:number,data:Object,self_group:number):void{
            let src_id:number = this._get_skill_unitid(data['param1']);
            let x:number = parseInt(data["param2"]);
            let y:number = parseInt(data["param3"]);
            let fdir:number = -1;
            
            if(data['param4'] != null){
                fdir = parseInt(data['param4']);
            }
            else{
                if(this._is_downteam(src_id,self_group)){
                    fdir = 3;
                }
                else{
                    fdir = 7;
                }
            }
            let ud:{} = {"src":src_id,"x":x,"y":y,"forcedir":fdir};
            this._add_node(tm,COMBATSCENE_WARRIORMOVE,ud);
        }
        private _is_downteam(id:number,self_group:number):boolean{
            return this.m_mgr.m_scene.is_downteambywid(id,self_group);
        }
        private _parse_skill_blacks(tm:number,data:Object):void{
            let tmlen:number = parseInt(data["param1"]);
            let ud:{} = {"tm":tmlen};
            this._add_node(tm,COMBATSCENE_BLACKSCENE,ud);
        }
        private _parse_skill_dir(tm:number,data:Object,self_group:number):void{
            let src_id:number = this._get_skill_unitid(data['param1']);
            let dst_id:number = 0;
            let param:string = data['param2'];
            if(param == 'self'){
                if(this._is_downteam(src_id,self_group)){
                    let ud:{} = {"src":src_id,"dir":7};
                    this._add_node(tm,COMBATSCENE_WARRIORDIR,ud);
                }
                else{
                    let ud:{} = {"src":src_id,"dir":3};
                    this._add_node(tm,COMBATSCENE_WARRIORDIR,ud);
                }
            }
            else if(param == 'enemy'){
                if(this._is_downteam(src_id,self_group)){
                    let ud:{} = {"src":src_id,"dir":3};
                    this._add_node(tm,COMBATSCENE_WARRIORDIR,ud);
                }
                else{
                    let ud:{} = {"src":src_id,"dir":7};
                    this._add_node(tm,COMBATSCENE_WARRIORDIR,ud);
                }
            }
            else if(param == 'dst'){
                dst_id = this.m_data.dst_list[0];
                let ud:{} = {"src":src_id,"dst":dst_id};
                this._add_node(tm,COMBATSCENE_WARRIORDIR2W,ud);
            }
            else if(param == 'src'){
                dst_id = this.m_data.id;
                let ud:{} = {"src":src_id,"dst":dst_id};
                this._add_node(tm,COMBATSCENE_WARRIORDIR2W,ud);
            }
        }
        private _parse_skill_act(tm:number,data:Object):void{
            let src_id:number = this._get_skill_unitid(data['param1']);
            let actionid:number = parseInt(data['param2']);
            let ud:{} = {"src":src_id,"actionid":actionid};
            this._add_node(tm,COMBATSCENE_WARRIORACTION,ud);
        }
        private _get_skill_atkstatus(data:skillatk,id:number):atk_status{
            for(let i of data.atkstatus_list){
                if(i.id == id){
                    return i;
                }
            }
            return null;
        }
        private _parse_ninjaatk(tm:number,data:Object,self_group:number):void{
            let src:number = this.m_data.id;
            let dir:number = 3;
            let dx:number = 0;
            let dy:number = 0;
            if(this._is_downteam(src,self_group)){
                dir = 3;
                dx = this.m_mgr.m_scene.m_pos_dx;
                dy = this.m_mgr.m_scene.m_pos_dy;
            }
            else{
                dir = 7;
                dx = -this.m_mgr.m_scene.m_pos_dx;
                dy = -this.m_mgr.m_scene.m_pos_dy;
            }
            let src_pt:Laya.Point = this.m_mgr.m_scene.get_pos(src);

            let srcud:{} = {"src":src,"x":0,"y":0};

            this._add_node(tm,COMBATSCENE_WARRIORSETPOS,srcud);

            for(let i of this.m_data.dst_list){
                let atk_id:number = i;
                let clone_id:number = 10000+i;
                let x:number = 0;
                let y:number = 0;
                let dst_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(atk_id);
                //
                x = dst_pos.x+3*dx;
                y = dst_pos.y+3*dy;
                x = src_pt.x;
                y = src_pt.y;
                //
                let ud:{} = {"src":src,"dst":clone_id,"x":x,"y":y,"dir":dir};
                this._add_node(tm,COMBATSCENE_ADDCLONEWARRIOR,ud);
                let mx:number = 0;
                let my:number = 0;

                
                mx = dst_pos.x+dx;
                my = dst_pos.y+dy;

                let mud:{} = {"src":clone_id,"x":mx,"y":my,"forcedir":dir};

                this._add_node(tm+10,COMBATSCENE_WARRIORMOVE,mud);

                let dud:{} = {"src":clone_id,"dir":dir};
                this._add_node(tm+310,COMBATSCENE_WARRIORDIR,dud);

                let aud:{} = {"src":clone_id,"actionid":core.AVATAR_ACTON.ACTION_ATTACK};
                this._add_node(tm+400,COMBATSCENE_WARRIORACTION,aud);
            }
        }
        private _parse_clearninja(tm:number,data:Object):void{
            let src:number = this.m_data.id;
            let mud:{} = {"src":src};
            this._add_node(tm,COMBATSCENE_WARRIORREADY,mud);
            this._add_node(tm,COMBATSCENE_DELNINJA,10000);
        }
        private _parse_skill_attacked(tm:number,data:Object):void{
            let dst_list:Array<number> = new Array<number>();
            if(data['param1'] == 'dst'){
                dst_list.push(this.m_data.dst_list[0]);
            }
            else{
                for(let i of this.m_data.dst_list){
                    dst_list.push(i);
                }
            }
            let skillatkdata:skillatk = this.m_data as skillatk;
            for(let i of dst_list){
                let atkstatus:atk_status = this._get_skill_atkstatus(skillatkdata,i);
                if(atkstatus == null){
                    continue;
                }
                this._gen_propchange(i,tm,atkstatus);
            }
            for(let i of skillatkdata.subbuff_list){
                let buffobj:buff_status = i as buff_status;
                let ud:{} = {"src":buffobj.id,"buffid":buffobj.buffid,"shape":buffobj.buffshape};
                this._add_node(tm,COMBATSCENE_DELBUFF,ud);
            }
            for(let i of skillatkdata.addbuff_list){
                let buffobj:buff_status = i as buff_status;
                let ud:{} = {"src":buffobj.id,"buffid":buffobj.buffid,"shape":buffobj.buffshape,"cd":buffobj.cd,"overlay":buffobj.overlay,"datas":buffobj.datas,"buffeffid":buffobj.buffeffid};
                this._add_node(tm,COMBATSCENE_ADDBUFF,ud);
            }
        }
        private _parse_skill_effect(tm:number,data:Object,self_group:number):void{
            let effectid:number = parseInt(data['param1']);
            let pos:string = data['param2'];
            let x:number = 0;
            let y:number = 0;
            if(pos == 'src'){
                let src_id:number = this.m_data.id;
                let ud:{} = {"src":src_id,"effectid":effectid};
                this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
            }
            else if(pos == 'dst'){
                let src_id:number = this.m_data.dst_list[0];
                let ud:{} = {"src":src_id,"effectid":effectid};
                this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
            }
            else if(pos == 'all'){
                for(let i of this.m_data.dst_list){
                    let ud:{} = {"src":i,"effectid":effectid};
                    this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
                }
            }
            else if(pos == 'center'){
                let src_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(1);
                let dst_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(21);
                let ud:{} = {"x":src_pos.x + (dst_pos.x-src_pos.x)/2,"y":src_pos.y+(dst_pos.y - src_pos.y)/2,"effectid":effectid};
                this._add_node(tm,COMBATSCENE_EFFECT,ud);
            }
            else if(pos == 'self'){
                if(this._is_downteam(this.m_data.id,self_group)){
                    let src_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(1);
                    let ud:{} = {"x":src_pos.x,"y":src_pos.y,"effectid":effectid};
                    this._add_node(tm,COMBATSCENE_EFFECT,ud);
                }
                else{
                    let src_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(21);
                    let ud:{} = {"x":src_pos.x,"y":src_pos.y,"effectid":effectid};
                    this._add_node(tm,COMBATSCENE_EFFECT,ud);
                }
            }
            else if(pos == 'enemy'){
                if(this._is_downteam(this.m_data.id,self_group)){
                    let src_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(21);
                    let ud:{} = {"x":src_pos.x,"y":src_pos.y,"effectid":effectid};
                    this._add_node(tm,COMBATSCENE_EFFECT,ud);
                }
                else{
                    let src_pos:laya.maths.Point = this.m_mgr.m_scene.get_pos(1);
                    let ud:{} = {"x":src_pos.x,"y":src_pos.y,"effectid":effectid};
                    this._add_node(tm,COMBATSCENE_EFFECT,ud);
                }
            }
            else{
                x = parseInt(data["param2"]);
                y = parseInt(data["param3"]);
                let ud:{} = {"x":x,"y":y,"effectid":effectid};
                this._add_node(tm,COMBATSCENE_EFFECT_SCREENPOS,ud);
            }
        }
        private _parse_skill_moveback(tm:number,data:Object,self_group:number):void{
            let src_id:number = this._get_skill_unitid(data['param1']);
            let fdir:number = -1;
            if(this._is_downteam(src_id,self_group)){
                fdir = 3;
            }
            else{
                fdir = 7;
            }

            let ud:{} = {"src":src_id,"forcedir":fdir};
            this._add_node(tm,COMBATSCENE_WARRIORMOVEBACK,ud);
            let dud:{} = {"src":src_id,"dir":fdir};
            this._add_node(tm+100,COMBATSCENE_WARRIORDIR,dud);
        }
        private _add_node(tm:number,node_type:string,user_data:any):void{
            let node:combat_playernode = this.m_mgr._get_player_ins(tm,node_type,user_data);
            this.m_mgr.addplayernode(node);
        }
        private _parse_skill_end(tm:number,data:Object):void{
            this._add_node(tm,COMBATSCENE_EMPTY,this.m_data);
        }
        private _parse_skill_action(tm:number,action:string,data:Object,self_group:number):void{
            switch(action){
                case "move":
                    this._parse_skill_move(tm,data,self_group);
                    break;
                case "ninjaatk":
                    this._parse_ninjaatk(tm,data,self_group);
                    break;
                case "clearninja":
                    this._parse_clearninja(tm,data);
                    break;
                case "move2":
                    this._parse_skill_move2(tm,data,self_group);
                    break;
                case "dir":
                    this._parse_skill_dir(tm,data,self_group);
                    break;
                case "action":
                    this._parse_skill_act(tm,data);
                    break;
                case "attacked":
                    this._parse_skill_attacked(tm,data);
                    break;
                case "effect":
                    this._parse_skill_effect(tm,data,self_group);
                    break;
                case "black":
                    this._parse_skill_blacks(tm,data);
                    break;
                case "moveback":
                    this._parse_skill_moveback(tm,data,self_group);
                    break;
                case "nextdst":
                    this._pop_skill_dst();
                    break;
                case "end":
                    this._parse_skill_end(tm,data);
                    break;
                default:
                    break;
            }
        }
        private _gen_propchange(i:number,tm:number,atkstatus:combat.atk_status):void{
            if(atkstatus.b_dodge == false){
                let ud:{} = {"src":i,"type":atkstatus.damagetype,"damage":atkstatus.damage,"crack":atkstatus.b_crack};
                this._add_node(tm,COMBATSCENE_POPNUMBER,ud);
                if(atkstatus.b_dead || atkstatus.b_fly){
                    let hpins:warrior_hp = new warrior_hp();
                    hpins.hp = 0;
                    hpins.hpmax = 1000;
                    hpins.id = i;
                    this._add_node(tm,COMBATSCENE_SETHP,hpins);
                }
            }
            
            if(atkstatus.b_dead){
                let ud:{} = {"src":i,"stopf":1};
                this._add_node(tm,COMBATSCENE_WARRIORATTACKED,ud);
                ud = {"src":i,"dst":1};
                this._add_node(tm,COMBATSCENE_WARRIORBACKMOVE,ud);
                ud["effectid"] = 106;
                this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
                if(atkstatus.b_vanish){
                    this._add_node(tm+combat_action.DEAD_ATTACKED_TM,COMBATSCENE_WARRIORDEADVANISH,ud);
                }
                else{
                    this._add_node(tm+combat_action.DEAD_ATTACKED_TM,COMBATSCENE_WARRIORDEAD,ud);
                }
                this._add_node(tm+combat_action.DEAD_TM,COMBATSCENE_EMPTY,null);
            }
            else if(atkstatus.b_fly){
                let ud:{} = null;
                ud = {"src":i,"dst":1};
                this._add_node(tm,COMBATSCENE_WARRIORBACKMOVE,ud);

                ud = {"src":i,"stopf":1};
                this._add_node(tm,COMBATSCENE_WARRIORATTACKED,ud);
                ud["effectid"] = 106;
                this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
                

                this._add_node(tm+combat_action.FLY_ATTACKED_TM,COMBATSCENE_WARRIORFLY,ud);
                this._add_node(tm+combat_action.FLY_TM,COMBATSCENE_EMPTY,null);
            }
            else if(atkstatus.b_dodge){
                let ud:{} = {"src":i};
                this._add_node(tm,COMBATSCENE_WARRIORDODGE,ud);
                this._add_node(tm+combat_action.DODGE_TM,COMBATSCENE_WARRIORREADY,ud);
            }
            else if(atkstatus.b_defend){
                let ud:{} = {"src":i,"stopf":0};
                this._add_node(tm,COMBATSCENE_WARRIORDEFEND,ud);
                ud["effectid"] = 102;
                this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
                ud = {"src":i,"dst":1};
                this._add_node(tm,COMBATSCENE_WARRIORBACKMOVE,ud);

                this._add_node(tm+combat_action.DEFEND_TM,COMBATSCENE_WARRIORREADY,ud);
            }
            else if(atkstatus.b_revive){
                let ud:{} = {"src":i};
                this._add_node(tm,COMBATSCENE_WARRIORREVIVE,ud);
                this._add_node(tm+combat_action.REVIVE_TM,COMBATSCENE_EMPTY,null);
                
            }
            else{
                if(atkstatus.damagetype != DAMAGETYPE_HP_ADD){
                    let ud:{} = {"src":i,"stopf":1};
                    this._add_node(tm,COMBATSCENE_WARRIORATTACKED,ud);
                    ud["effectid"] = 101;
                    this._add_node(tm,COMBATSCENE_EFFECT2W,ud);
                    this._add_node(tm+combat_action.ATTACKED_TM,COMBATSCENE_WARRIORREADY,ud);
                }
            }
        }
        private do_propchange():void{
            let atkstatus:combat.atk_status = this.m_data as combat.atk_status;
            this._gen_propchange(atkstatus.id,0,atkstatus);
        }
        private do_skill():void{
            let skilldata:combat.skillatk = this.m_data as combat.skillatk;
            let delta:number = 200;
            if(skilldata.m_type == 2){
                let ud:{} = {"src":skilldata.id,"content":"反震"};
                this._add_node(0,COMBATSCENE_CRYOUT,ud);
            }
            else if(skilldata.m_type == 3){
                let ud:{} = {"src":skilldata.id,"content":"反击"};
                this._add_node(0,COMBATSCENE_CRYOUT,ud);
            }
            else if(skilldata.m_type == 0){
                let ud:{} = {"src":skilldata.id,"content":"普通攻击"};
                //this._add_node(0,COMBATSCENE_CRYOUT,ud);
                delta = 0;
            }
            else if(skilldata.m_type == 1){
                let cstring:string = this.m_mgr.get_skillperformcryout(skilldata.skillid);
                if(cstring == null || cstring == undefined || cstring.length <= 0){
                    delta = 0;
                }
                else
                {
                    let ud:{} = {"src":skilldata.id,"content":cstring};
                    this._add_node(0,COMBATSCENE_CRYOUT,ud);
                }
                
            }
            else{
                delta = 0;
            }
            let skillcfgobj:any = this.m_mgr.get_skillperformconfig(skilldata.skillid,skilldata.skilllv,skilldata.m_config_id);
            if(skillcfgobj == null){
                skillcfgobj = this.m_mgr.get_skillperformconfig(10001,1,skilldata.m_config_id);
            }
            let skillcfg:any = skillcfgobj['data'];
            core.combat_errlog("combat_action do_skill ",skilldata.skillid,skilldata.skilllv,skillcfg);
            for(let i of skillcfg){
                core.combat_errlog('do_skill ',i);
                let tm:number = i.tm;
                let action:string = i.action;
                this._parse_skill_action(tm+delta,action,i,skilldata.self_group);
            }
        }
        private do_enter():void{
            this._add_node(0,COMBATSCENE_ENTER,this.m_data);
        }
        private do_changelineup():void{
            this._add_node(0,COMBATSCENE_CHANGELINEUP,this.m_data);
        }
        private do_customevent():void{
            this._add_node(0,COMBATSCENE_CUSTOMEVENT,this.m_data);
        }
        private do_addwarrior():void{
            this._add_node(0,COMBATSCENE_ADDWARRIOR,this.m_data);
        }
        private do_initwarrior():void{
            this._add_node(0,COMBATSCENE_INITWARRIOR,this.m_data);
        }
        private do_setadorn():void{
            this._add_node(0,COMBATSCENE_SETADORN,this.m_data);
        }
        private do_delwarrior():void{
            this._add_node(0,COMBATSCENE_DELWARRIOR,this.m_data);
        }
        private do_sethp():void{
            this._add_node(0,COMBATSCENE_SETHP,this.m_data);
        }
        private do_initwarriorhps():void{
            for(let i of this.m_data){
                this._add_node(0,COMBATSCENE_SETHP,i);
            }
        }
        private do_addbuff():void{
            let buffobj:buff_status = this.m_data as buff_status;
            let ud:{} = {"src":buffobj.id,"buffid":buffobj.buffid,"shape":buffobj.buffshape,"cd":buffobj.cd,"overlay":buffobj.overlay,"datas":buffobj.datas,"buffeffid":buffobj.buffeffid};
            this._add_node(0,COMBATSCENE_ADDBUFF,ud);
        }
        private do_delbuff():void{
            let buffobj:buff_status = this.m_data as buff_status;
            let ud:{} = {"src":buffobj.id,"buffid":buffobj.buffid,"shape":buffobj.buffshape};
            this._add_node(0,COMBATSCENE_DELBUFF,ud);
        }
        private do_buffcd():void{
            let buffobj:buff_status = this.m_data as buff_status;
            let ud:{} = {"src":buffobj.id,"buffid":buffobj.buffid,"cd":buffobj.cd};
            this._add_node(0,COMBATSCENE_BUFFCD,ud);
        }
        private do_buffautocd():void{
            let buffobj:buff_status = this.m_data as buff_status;
            this._add_node(0,COMBATSCENE_BUFFAUTOCD,null);
        }
    }
}