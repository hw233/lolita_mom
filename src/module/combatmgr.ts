module game{
    //status1
    export let War_AttackedBehave_Normal:number = 0;
    export let War_AttackedBehave_Hit:number = 1;
    export let War_AttackedBehave_Defence:number = 2;
    export let War_AttackedBehave_Dodge:number = 3;
    export let War_AttackedBehave_BLOOD:number = 4;
    //status2
    export let War_AttackType_Crack:number = 1;
    //status3
    export let War_AttackedResult_Normal:number = 0;
    export let War_AttackedResult_Dead:number = 1;
    export let War_AttackedResult_FlyAway:number = 2;

    // 服务器主类型和子类型不存在关联关系，可以视为类型1和类型2。
    // 战斗主类型定义
    export let WARTYPE_NORMAL:number	    = 0;  //普通
    export let WARTYPE_GUAJI:number         = 1;  //挂机
    export let WARTYPE_BOSS:number			= 2;  //多人BOSS
    // export let WARTYPE_STORY:number          = 3;  //剧情
    // export let WARTYPE_TASK:number			= 4;  //任务
    // export let WARTYPE_ENDLESS:number		= 9;  //服务器未定义
    export let WARTYPE_GAME:number			= 10; //PVP,活动
    export let WARTYPE_PK:number			= 11; //PVP,PK
    export let WARTYPE_CATCHSUMMON:number   = 0xffffffff;

    // 战斗子类型定义
    export let WARSUBTYPE_NONE:number	        = 0;  
    export let WARSUBTYPE_GANGPK:number         = 1;    //帮战
    export let WARSUBTYPE_SVRPK:number          = 2;    //竞技场
    export let WARSUBTYPE_MIBAO:number	        = 3;    //上古秘宝
    export let WARSUBTYPE_TIANTING:number       = 4;    //天庭降妖
    export let WARSUBTYPE_DAYAN:number          = 5;    //大雁神塔
    export let WARSUBTYPE_BEST:number           = 6;    //天下第一
    export let WARSUBTYPE_COMMONBOSS:number     = 7;    //全民boss
    export let WARSUBTYPE_ESCORT_PLUNDER:number	= 9;	//每日押镖-劫镖
    export let WARSUBTYPE_ESCORT_REVENGE:number	= 10;	//每日押镖-复仇
    export let WARSUBTYPE_FENGYAO:number		= 11;	//封妖
    export let WARSUBTYPE_SCENEPASS:number	    = 12;	//主线关卡
    export let WARSUBTYPE_MATERIALFB:number	    = 13;	//材料副本
    export let WARSUBTYPE_PERSONALBOSS:number	= 14;	//个人BOSS
    export let WARSUBTYPE_PDYW:number			= 15;	//平定妖王
    export let WARSUBTYPE_WB_ROLE:number		= 16;	//野外BOSS,挑战玩家
    export let WARSUBTYPE_WB_BOSS:number		= 17;	//野外BOSS,挑战BOSS
    export let WARSUBTYPE_GANG_BOSS:number	    = 18;	//帮派BOSS
    export let WARSUBTYPE_GANG_FUBNE:number	    = 19;	//帮派副本
    export let WARSUBTYPE_TEAMFB:number		    = 20;	//组队副本(跨服抓鬼)
    export let WARSUBTYPE_SCENEPASS_HELP:number = 21;	//主线关卡协助
    export let WARSUBTYPE_WULINHEAD:number      = 22;	//武林盟主
    export let WARSUBTYPE_FUMO:number           = 24;	//伏魔之路

    export let WAR_PLAYTYPE_CANJUMP:number = 0;
    export let WAR_PLAYTYPE_CANNOTJUMP:number = 1;
    enum COMBAT_STATE{
        STATE_IDLE,
        STATE_RECVPROTOCOL,
        STATE_LOADING,
        STATE_PLAYING,
    }
    export class combatmgr extends utils.game_module{
        private m_combat:combat.combatimpl = null;
        private m_num_path:string = "res/atlas/combat_num.atlas";
        private m_cmd_arr:Array<any> = new Array<any>();
        private m_b_in_war:boolean = false;
        private m_b_warstart_cmd:boolean = true;
        private m_b_excluded:boolean = false;//排它性，是否不能被后面的战斗强制结束
        private m_savecmd_list:Array<Array<any>> = new Array<Array<any>>();
        private m_time_id:number = 0;

        private m_b_preend:boolean = false;

        private m_wartype:number = 0;
        private m_warsubtype:number = 0;
        private m_state:COMBAT_STATE = COMBAT_STATE.STATE_IDLE;//0 recv protocol;1 download res 2 playing
        private m_combatplayer:combatplayer = null;
        private m_combatloading:combatloadingmgr = null;
        private m_combatloadingv2:combatloadingmgrV2 = null;
        private m_load_assets:Array<any> = new Array<any>();
        private m_combat_id:number = 0;
        private m_max_bout:number = 0;
        private m_can_skip:number = 0;
        //public m_skip_resload:number = 0xffffffff;
        public m_skip_resload:number = 0;
        constructor()
        {
            super();
        }
        public start(){
            super.start();
            core.combat_tiplog('combatmgr start');
            
            let game_ins:game_main = get_module(module_enum.MODULE_MAIN) as game_main;
            this.m_combat = game_ins.get_combat_render();
            this.m_combat.m_scene.m_render.set_avatar_config(config.Avatarinfo.create_Avatarinfo);
            this.m_combat.m_scene.m_render.set_map_config(config.Mapinfo.create_Mapinfo);
            this.m_combat.m_scene.m_render.set_ani_config(config.Aniinfo.create_Aniinfo);
            this.m_combat.m_scene.m_render.set_eff_config(config.Effectinfo.create_Effectinfo);
            this.register_event(game_event.EVENT_TESTCOMBATPROTO,this._on_test_combat_protocol);
            //this.register_event(game_event.EVENT_TESTCOMBATPROTO,this._on_test_combatpos_protocol);
            this.register_event(game_event.EVENT_COMBATLOADINGMGR_COMPLETE,this.on_load_complete);
            this.register_event(game_event.EVENT_COMBATLOADINGMGRV2_COMPLETE,this.on_load_completev2);
            this.register_event(game_event.EVENT_COMBATLOADINGMGR_ERROR,this.on_load_err);
            this.register_event(game_event.EVENT_COMBATGO2NEXT,this._on_go2next);
            this.register_net_event(protocol_def.S2C_WAR_START,this.on_war_start);
            this.register_net_event(protocol_def.S2C_WAR_END,this.on_war_end);
            this.register_net_event(protocol_def.S2C_WAR_PREEND,this.on_war_preend);
            this.register_net_event(protocol_def.S2C_WAR_NEXT,this.on_war_turnstart);
            this.register_net_event(protocol_def.S2C_WAR_TURN,this.on_war_turnend);

            this.register_net_event(protocol_def.S2C_WAR_ADD,this.on_war_add);
            this.register_net_event(protocol_def.S2C_WAR_LEAVE,this.on_war_del);
            this.register_net_event(protocol_def.S2C_WAR_STATUS,this.on_war_status);

            this.register_net_event(protocol_def.S2C_WAR_ATTACK_NORMAL,this.on_war_attack);
            this.register_net_event(protocol_def.S2C_WAR_ATTACK_END,this.on_war_attackend);

            this.register_net_event(protocol_def.S2C_WAR_PERFORM,this.on_war_skill);
            this.register_net_event(protocol_def.S2C_WAR_PERFORM_END,this.on_war_skillend);

            this.register_net_event(protocol_def.S2C_WAR_PARTNER_ATTACK,this.on_war_partneratk);
            this.register_net_event(protocol_def.S2C_WAR_BACKATTACK,this.on_war_backatk);
            this.register_net_event(protocol_def.S2C_WAR_BACKATTACK_END,this.on_war_backatkend);
            this.register_net_event(protocol_def.S2C_WAR_SHAKE,this.on_war_shake);
            this.register_net_event(protocol_def.S2C_WAR_PROTECT,this.on_war_protect);

            this.register_net_event(protocol_def.S2C_WAR_ATTACK_STATUS,this.on_war_atkstatus);

            this.register_net_event(protocol_def.S2C_WAR_BUFF_ADD,this.on_war_buff);
            this.register_net_event(protocol_def.S2C_WAR_BUFF_DEL,this.on_war_buffdel);

            this.register_net_event(protocol_def.S2C_WAR_DEFEAT,this.on_war_defeat);
            this.register_net_event(protocol_def.S2C_WAR_SERIAL,this.on_war_serial);    
            this.m_time_id = timer.timer_ins().add_timer(1000,this,this.on_wait_warend);   
            this.m_combatplayer = get_module(module_enum.MODULE_COMBATPLAYER) as combatplayer;
            this.m_combatplayer.start();
            this.m_combatloading = get_module(module_enum.MODULE_COMBATLOADING) as combatloadingmgr;
            this.m_combatloadingv2 = get_module(module_enum.MODULE_COMBATLOADINGV2) as combatloadingmgrV2;
        }
        private push_cmd(cmd:number,ud:any):void{
            this.m_cmd_arr.push({'cmd':cmd,'ud':ud});
        }
        private on_wait_warend():void{
            if(this.m_state == COMBAT_STATE.STATE_PLAYING){
                if(this.m_combatplayer != null){
                    if(this.m_combatplayer.is_turnend() && this.m_combatplayer.is_playerend() && this.m_combatplayer.get_preend_cmd()){
                        this.force_end();
                        this.do_nextwar_cmd();
                    }
                }
            }
        }

        private force_end():void{
            this.m_cmd_arr.length = 0;
            this.m_combatplayer.force_end();
            this.m_combatloading.end_load();
            this.m_combatloadingv2.end_load();
            this.m_b_in_war = false;
            net.net_ins().send(protocol_def.C2S_WAR_PLAYEND, {"id":this.m_combat_id});
            this.fire_event(game_event.EVENT_OUTCOMBAT,[this.m_wartype,this.m_warsubtype,this.m_combat_id]);
            this.m_wartype = 0;
            this.m_warsubtype = 0;
            this.m_state = COMBAT_STATE.STATE_IDLE;
        }

        public end_war(all_clear:boolean = false):void{
            this.force_end();
            if(all_clear){
                this.clear_cachewar_cmd();
            }
            else{
                this.do_nextwar_cmd();
            }
        }
        private _on_go2next(ud:any = null):void{
            this.go2next();
        }
        public go2next():void{
            if(this.m_state == COMBAT_STATE.STATE_PLAYING){
                if(this.m_combatplayer != null){
                    this.force_end();
                    this.do_nextwar_cmd();
                }
            }
        }
        public in_combat():boolean{
            return this.m_b_in_war;
        }
        public is_guaji_combat():boolean{
            return this.m_b_in_war && (this.m_wartype == WARTYPE_GUAJI || this.m_warsubtype == WARSUBTYPE_SCENEPASS);
        }
        public is_not_guaji_combat():boolean{
            return this.m_b_in_war && (this.m_wartype != WARTYPE_GUAJI && this.m_warsubtype != WARSUBTYPE_SCENEPASS);
        }        
        private get_combat_res():Array<any>{
            let assets: Array<any> = [];
            assets.push({ url: "res/atlas/ani_res/cryout.atlas", type: Laya.Loader.ATLAS });
            assets.push({ url: "game_ani/combat/cryout.ani", type: Laya.Loader.JSON });
            assets.push({ url: "res/atlas/ani_res/crack.atlas", type: Laya.Loader.ATLAS });
            assets.push({ url: "game_ani/combat/crack.ani", type: Laya.Loader.JSON });
            assets.push({ url: "res/atlas/combat_num.atlas", type: Laya.Loader.ATLAS });
            return assets;
        }
        private get_effect_res(eid:number):Array<any>{
            let assets: Array<any> = [];
            let eff_cfg:Object = config.Effectinfo.get_Effectinfo(eid);
            if(eff_cfg != null){
                assets.push({ url: eff_cfg["res"], type: Laya.Loader.ATLAS });
                assets.push({ url: eff_cfg["path"], type: Laya.Loader.JSON });
            }
            return assets;
        }
        private get_skilleffect_res(pid:number):Array<any>{
            let assets: Array<any> = [];
            let skill_perform_cfg:Object = config.Skillperform.get_Skillperform(pid);
            if(skill_perform_cfg != null){
                for(let i of skill_perform_cfg["data"]){
                    if(i["action"] == "effect"){
                        let effid:number = parseInt(i["param1"]);
                        let eff_path:Array<any> = this.get_effect_res(effid);
                        if(eff_path.length > 0){
                            assets = assets.concat(eff_path);
                        }
                    }
                }
            }
            return assets;
        }
        private get_skill_res(skillid:number,skilllv:number):Array<any>{
            let assets: Array<any> = [];
            let skill_cfg:Object = config.Skillperformconfig.get_Skillperformconfig(skillid);
            if(skill_cfg != null){
                for(let i of skill_cfg["data"]){
                    if(i["skilllv"] == skilllv){
                        let cid1:number = i["config1"];
                        let cid2:number = i["config2"];
                        assets = assets.concat(this.get_skilleffect_res(cid1));
                        assets = assets.concat(this.get_skilleffect_res(cid2));
                    }
                }
            }
            return assets;
        }
        private get_cmd_res():Array<any>{
            let assets: Array<any> = [];
            for(let i of this.m_cmd_arr){
                let cmd:number = i['cmd'];
                let ud:any = i['ud'];
                if(cmd == protocol_def.S2C_WAR_ADD){
                    let shape:number = ud['shape'];
                    let desc:Laya.Byte = ud['desc'];
                    if(desc.length > 0){
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_RUN));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_STAND));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_ATTACK));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_ATTACKED));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_SKILL));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_DEAD));
                    }
                    
                }
                else if(cmd == protocol_def.S2C_WAR_PERFORM){
                    let skillid:number = ud['skillid'];
                    let skilllv:number = ud['lv'];
                    assets = assets.concat(this.get_skill_res(skillid,skilllv));
                }
                else if(cmd == protocol_def.S2C_WAR_BACKATTACK){
                    let skillid:number = ud['skillid'];
                    let skilllv:number = ud['lv'];
                    assets = assets.concat(this.get_skill_res(skillid,skilllv));
                }
            }
            return assets;
        }
        private start_load_res():void{
            this.m_state = COMBAT_STATE.STATE_LOADING;
            let assets:Array<any> = this.get_combat_res();
            assets = assets.concat(this.get_cmd_res());
            core.combat_tiplog("start_load_res ",assets);
            if(assets.length <= 0){
                this.start_playing();
                this.fire_event(game_event.EVENT_COMBATPLAYING,[this.m_wartype,this.m_warsubtype,this.m_combat_id,this.m_max_bout,this.m_can_skip]);
                return;
            }
            //this.m_combatloading.start_load(assets,this);
            this.m_combatloadingv2.start_load(assets);

            //this.m_load_assets.length = 0;
            //this.m_load_assets.concat(assets);
            //
        }
        private on_load_completev2(ud:any = null):void{
            core.combat_tiplog("on_load_complete ");
            this.m_combatloadingv2.end_load();
            //
            let assets: Array<any> = [];
            for(let i of this.m_cmd_arr){
                let cmd:number = i['cmd'];
                let ud:any = i['ud'];
                if(cmd == protocol_def.S2C_WAR_ADD){
                    let shape:number = ud['shape'];
                    let desc:Laya.Byte = ud['desc'];
                    if(desc.length > 0){
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_RUN));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_STAND));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_ATTACK));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_ATTACKED));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_SKILL));
                        assets = assets.concat(helper.get_avatar_res(desc,shape,core.AVATAR_ACTON.ACTION_DEAD));
                    }
                    
                }
                else if(cmd == protocol_def.S2C_WAR_PERFORM){
                    let skillid:number = ud['skillid'];
                    let skilllv:number = ud['lv'];
                    assets = assets.concat(this.get_skill_res(skillid,skilllv));
                }
                else if(cmd == protocol_def.S2C_WAR_BACKATTACK){
                    let skillid:number = ud['skillid'];
                    let skilllv:number = ud['lv'];
                    assets = assets.concat(this.get_skill_res(skillid,skilllv));
                }
            }
            for(let i of assets){
                this.m_combat.m_scene.m_render.preload_matres(i.url);
            }
            //
            this.start_playing();
            this.fire_event(game_event.EVENT_COMBATPLAYING,[this.m_wartype,this.m_warsubtype,this.m_combat_id,this.m_max_bout,this.m_can_skip]);
        }
        private on_load_complete(ud:any = null):void{
            core.combat_tiplog("on_load_complete ");
            this.m_combatloading.end_load();
            this.start_playing();
            this.fire_event(game_event.EVENT_COMBATPLAYING,[this.m_wartype,this.m_warsubtype,this.m_combat_id,this.m_max_bout,this.m_can_skip]);
        }
        private on_load_err(ud:any = null):void{
            core.combat_errlog("on_load_err ",this.m_load_assets);
            //this.m_combatloading.end_load();
            //this.start_playing();
        }
        private start_playing():void{
            core.combat_tiplog("start_playing");
            this.m_state = COMBAT_STATE.STATE_PLAYING;
            for(let i of this.m_cmd_arr){
                let cmd:number = i['cmd'];
                let ud:any = i['ud'];
                this.run_cmd(cmd,ud);
            }
            this.m_cmd_arr.length = 0;
        }
        private run_cmd(cmd:number,ud:any):void{
            core.combat_tiplog("run_cmd ",cmd,ud);
            switch(cmd){
                case protocol_def.S2C_WAR_START:
                    this.m_combatplayer.on_war_start(ud);
                    break;
                case protocol_def.S2C_WAR_END:
                    this.m_combatplayer.on_war_end(ud);
                    break;
                case protocol_def.S2C_WAR_PREEND:
                    this.m_combatplayer.on_war_preend(ud);
                    break;
                case protocol_def.S2C_WAR_NEXT:
                    this.m_combatplayer.on_war_turnstart(ud);
                    break;
                case protocol_def.S2C_WAR_TURN:
                    this.m_combatplayer.on_war_turnend(ud);
                    break;
                case protocol_def.S2C_WAR_ADD:
                    this.m_combatplayer.on_war_add(ud);
                    break;
                case protocol_def.S2C_WAR_LEAVE:
                    this.m_combatplayer.on_war_del(ud);
                    break;
                case protocol_def.S2C_WAR_STATUS:
                    this.m_combatplayer.on_war_status(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_NORMAL:
                    this.m_combatplayer.on_war_attack(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_END:
                    this.m_combatplayer.on_war_attackend(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM:
                    this.m_combatplayer.on_war_skill(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM_END:
                    this.m_combatplayer.on_war_skillend(ud);
                    break;
                //
                case protocol_def.S2C_WAR_PARTNER_ATTACK:
                    this.m_combatplayer.on_war_partneratk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK:
                    this.m_combatplayer.on_war_backatk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK_END:
                    this.m_combatplayer.on_war_backatkend(ud);
                    break;
                case protocol_def.S2C_WAR_SHAKE:
                    this.m_combatplayer.on_war_shake(ud);
                    break;
                case protocol_def.S2C_WAR_PROTECT:
                    this.m_combatplayer.on_war_protect(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_STATUS:
                    this.m_combatplayer.on_war_atkstatus(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_ADD:
                    this.m_combatplayer.on_war_buff(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_DEL:
                    this.m_combatplayer.on_war_buffdel(ud);
                    break;
                default:
                    core.combat_errlog("run_cmd error cmd! ",cmd,ud);
                    break;
            }
        }
        private is_saving_cmd():boolean{
            let ret:boolean = this.m_b_in_war && this.m_b_excluded && !this.m_b_warstart_cmd;
            return ret;
        }
        private save_war_cmd(cmd:number,ud:any):void{
            core.combat_tiplog("save_war_cmd ",cmd,ud,this.m_savecmd_list.length);
            
            this.m_savecmd_list[this.m_savecmd_list.length - 1].push({'cmd':cmd,'ud':ud});
        }
        private do_nextwar_cmd():void{
            core.combat_tiplog("do_nextwar_cmd ");
            while(this.m_savecmd_list.length > 0){
                let arr:Array<any> = this.m_savecmd_list.shift();
                if(arr.length > 1)
                {
                    let first_cmd:any = arr[0];
                    if(first_cmd['cmd'] == protocol_def.S2C_WAR_START){
                        let ud:any = first_cmd['ud'];
                        if((ud['playmode'] == null || ud['playmode'] == WAR_PLAYTYPE_CANJUMP)&&(this.m_savecmd_list.length > 0)){
                            //do nothing,go to next one;
                        }
                        else{
                            for(let i of arr){
                                this.pop_war_cmd(i['cmd'],i['ud']);
                            }
                            return;
                        }
                    }
                }
                //
            }
        }
        private clear_cachewar_cmd():void{
            core.combat_tiplog("clear_cachewar_cmd ");
            this.m_savecmd_list = new Array<Array<any>>();
        }
        private pop_war_cmd(cmd:number,ud:any):void{
            core.combat_tiplog("pop_war_cmd ",cmd,ud);
            switch(cmd){
                case protocol_def.S2C_WAR_START:
                    this.on_war_start(ud);
                    break;
                case protocol_def.S2C_WAR_END:
                    this.on_war_end(ud);
                    break;
                case protocol_def.S2C_WAR_PREEND:
                    this.on_war_preend(ud);
                    break;
                case protocol_def.S2C_WAR_NEXT:
                    this.on_war_turnstart(ud);
                    break;
                case protocol_def.S2C_WAR_TURN:
                    this.on_war_turnend(ud);
                    break;
                case protocol_def.S2C_WAR_ADD:
                    this.on_war_add(ud);
                    break;
                case protocol_def.S2C_WAR_LEAVE:
                    this.on_war_del(ud);
                    break;
                case protocol_def.S2C_WAR_STATUS:
                    this.on_war_status(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_NORMAL:
                    this.on_war_attack(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_END:
                    this.on_war_attackend(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM:
                    this.on_war_skill(ud);
                    break;
                case protocol_def.S2C_WAR_PERFORM_END:
                    this.on_war_skillend(ud);
                    break;
                //
                case protocol_def.S2C_WAR_PARTNER_ATTACK:
                    this.on_war_partneratk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK:
                    this.on_war_backatk(ud);
                    break;
                case protocol_def.S2C_WAR_BACKATTACK_END:
                    this.on_war_backatkend(ud);
                    break;
                case protocol_def.S2C_WAR_SHAKE:
                    this.on_war_shake(ud);
                    break;
                case protocol_def.S2C_WAR_PROTECT:
                    this.on_war_protect(ud);
                    break;
                case protocol_def.S2C_WAR_ATTACK_STATUS:
                    this.on_war_atkstatus(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_ADD:
                    this.on_war_buff(ud);
                    break;
                case protocol_def.S2C_WAR_BUFF_DEL:
                    this.on_war_buffdel(ud);
                    break;
                default:
                    core.combat_errlog("run_cmd error cmd! ",cmd,ud);
                    break;
            }
        }
        private is_skip_preloadres():boolean{
            return this.m_skip_resload > 0;
        }
        private skip_preloadres():void{
            this.m_skip_resload -= 1;
        }
        private on_war_start(ud:any):void{
            core.combat_tiplog("on_war_start ",ud);
            
            if(this.m_b_in_war){
                if(this.m_b_excluded){
                    this.m_savecmd_list.push(new Array<any>());
                    this.save_war_cmd(protocol_def.S2C_WAR_START,ud);
                    return;
                }
                this.force_end();
            }
            this.m_b_warstart_cmd = true;
            this.m_b_preend = false;
            let wartype:number = ud['type'];
            let warsubtype:number = ud['subtype'];
            if(ud["id"] != null){
                this.m_combat_id = ud["id"];
            }
            else{
                this.m_combat_id = 0;
            }
            if(ud["skip"] != null){
                this.m_can_skip = ud["skip"];
            }
            else{
                this.m_can_skip = 0;
            }

            if(ud['playmode'] != null && ud['playmode'] == WAR_PLAYTYPE_CANNOTJUMP){
                this.m_b_excluded = true;
            }
            else{
                this.m_b_excluded = false;
            }

            let max_bout:number = 999;
            if(ud['maxbout'] != null){
                max_bout = ud['maxbout'];
            }
            this.m_max_bout = max_bout;
            this.m_wartype = wartype;
            this.m_warsubtype = warsubtype;

            this.m_b_in_war = true;

            this.fire_event(game_event.EVENT_ENTERCOMBAT,[this.m_wartype,this.m_warsubtype,this.m_combat_id,this.m_max_bout,this.m_can_skip]);

            
            this.m_state = COMBAT_STATE.STATE_RECVPROTOCOL;
            this.m_cmd_arr.length = 0;
            this.push_cmd(protocol_def.S2C_WAR_START,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
                this.fire_event(game_event.EVENT_COMBATPLAYING,[this.m_wartype,this.m_warsubtype,this.m_combat_id,this.m_max_bout,this.m_can_skip]);
            }
        }
        private on_war_end(ud:any):void{
            core.combat_tiplog("on_war_end ",ud['force']);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_END,ud);
                return;
            }
            this.m_b_warstart_cmd = false;
            if(ud["force"] == 1){
                this.force_end();
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_END,ud);
            if(this.is_skip_preloadres()){
                this.skip_preloadres();
                this.start_playing();
            }
            else{
                this.start_load_res();
            }
            
        }
        private on_war_preend(ud:any):void{
            core.combat_tiplog("on_war_preend ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_PREEND,ud);
                return;
            }
            this.m_b_preend = true;
            this.push_cmd(protocol_def.S2C_WAR_PREEND,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_turnstart(ud:any):void{
            core.combat_tiplog("on_war_turnstart ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_NEXT,ud);
                return;
            }

            this.push_cmd(protocol_def.S2C_WAR_NEXT,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_turnend(ud:any):void{
            core.combat_tiplog("on_war_turnend ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_TURN,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_TURN,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_add(ud:any):void{
            core.combat_tiplog("on_war_add ",ud,ud['warid'],ud['shape'],ud['name'],this.m_wartype);
            if (ud["zoomlvl"] == 1){
                ud['scale'] = 1.5;
            }
            else{
                ud['scale'] = 1.0;
            }
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_ADD,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ADD,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_del(ud:any):void{
            core.combat_tiplog("on_war_del ",ud,this.m_b_preend,ud['warid']);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_LEAVE,ud);
                return;
            }
            if(this.m_b_preend){
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_LEAVE,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_status(ud:any):void{
            core.combat_tiplog("on_war_status ",ud,ud['warid'],ud['hprate']);
            //todo
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_STATUS,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_STATUS,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_attack(ud:any):void{
            core.combat_tiplog("on_war_attackstart ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_ATTACK_NORMAL,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_NORMAL,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_attackend(ud:any):void{
            core.combat_tiplog("on_war_attackend ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_ATTACK_END,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_END,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_skill(ud:any):void{
            core.combat_tiplog("on_war_skillstart ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_PERFORM,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PERFORM,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_skillend(ud:any):void{
            core.combat_tiplog("on_war_skillend ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_PERFORM_END,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PERFORM_END,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_partneratk(ud:any):void{
            core.combat_tiplog("on_war_partneratk ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_PARTNER_ATTACK,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PARTNER_ATTACK,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_backatk(ud:any):void{
            core.combat_tiplog("on_war_backatk ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_BACKATTACK,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BACKATTACK,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_backatkend(ud:any):void{
            core.combat_tiplog("on_war_backatkend ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_BACKATTACK_END,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BACKATTACK_END,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_shake(ud:any):void{
            core.combat_tiplog("on_war_shake ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_SHAKE,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_SHAKE,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        private on_war_protect(ud:any):void{
            core.combat_tiplog("on_war_protect ",ud);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_PROTECT,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_PROTECT,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        
        private on_war_atkstatus(ud:any):void{
            core.combat_tiplog("on_war_atkstatus ",ud,ud['target'],ud['status'],ud['value']);
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_ATTACK_STATUS,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_STATUS,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        
        private on_war_buffdel(ud:any):void{
            core.combat_tiplog("on_war_buffdel ",ud);
            let cfg:Object = config.Buffinfo.get_Buffinfo(ud['bid']);
            if(cfg == null){
                return
            }
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_BUFF_DEL,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BUFF_DEL,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }
        
        private on_war_buff(ud:any):void{
            core.combat_tiplog("on_war_buff ",ud);
            let cfg:Object = config.Buffinfo.get_Buffinfo(ud['bid']);
            if(cfg == null){
                return
            }
            if(this.is_saving_cmd()){
                this.save_war_cmd(protocol_def.S2C_WAR_BUFF_ADD,ud);
                return;
            }
            this.push_cmd(protocol_def.S2C_WAR_BUFF_ADD,ud);
            if(this.is_skip_preloadres()){
                this.start_playing();
            }
        }

        private on_war_defeat(ud: any): void {
            let wai_id: number = ud["idx"];
            this.fire_event_next_frame(game_event.EVENT_COMBAT_DEFEAT, { "war_id": wai_id });
        }

        private on_war_serial(ud: any): void {
            this.fire_event_next_frame(game_event.EVENT_COMBAT_SERIAL, { "war_id": this.m_combat_id });
        }

        private on_load_succeed():void
        {
            Laya.loader.off(Laya.Event.ERROR,this,this.on_load_error);
        }
        private on_load_error(err:string):void
        {
            
        }
    
        private _on_test_combat_protocol(ud:any):void{
            //this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_START),{"type":0});
			let eud:any = ud;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_START),{"type":0,"subtype":0,"lineup":0,"playmode":1});

            let bout:number = 0;
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT),ud);
            ud = {};
            ud['warid'] = 1;
            ud['type'] = 0;
            ud['status'] = 0;//dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;

            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_1";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);

            ud = {};
            ud['warid'] = 21;
            ud['type'] = 0;
            ud['status'] = 0;//dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_21";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);
            ud = {};
            ud['warid'] = 22;
            ud['type'] = 0;
            ud['status'] = 0;//dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_22";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);

            ud = {};
            ud['warid'] = 23;
            ud['type'] = 0;
            ud['status'] = 0;//dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;
            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_23";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);


            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 1000;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            ud['warid'] = 21;
            ud['hprate'] = 1000;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            ud['warid'] = 22;
            ud['hprate'] = 1000;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN),ud);
            //////
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT),ud);

            //attack start
            ud = {};
            ud['att'] = 1;
            ud['skillid'] = 2;
            ud['lv'] = 1;
            ud['lsvic'] = new Array<number>();
            ud['lsvic'].push(21);
            ud['lsvic'].push(22);
            ud['round'] = 1;
            //
			if(eud != null){
                ud['skillid'] = eud;
            }
            //
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PERFORM),ud);

            ud = {};
            ud['warid'] = 23;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_LEAVE),ud);

            ud = {};
            ud['warid'] = 23;
            ud['type'] = 0;
            ud['status'] = 0;//dead or normal
            ud['owner'] = 0;
            ud['shape'] = 101;

            ud['desc'] = helper.init_empty_desc();
            ud['grade'] = 0;
            ud['classes'] = 0;
            ud['name'] = "warrior_23_2";
            ud['title'] = "";
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);

            for(let i:number = 2;i < 11;++i){
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0;//dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;

                ud['desc'] = helper.init_empty_desc();
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_"+i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);
            }
            for(let i:number = 24;i < 31;++i){
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0;//dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;

                ud['desc'] = helper.init_empty_desc();
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_"+i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);
            }
            //
            //
            ud = {};
            ud['target'] = 21;
            ud['status'] = 0x21;
            ud['value'] = 12345;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);


            ud = {};
            ud['target'] = 22;
            ud['status'] = 0x20;
            ud['value'] = 23456;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);

            

            ud = {};
            ud['warid'] = 22;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PERFORM_END),ud);
            //attack end
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN),ud);
            //////
            let testf:boolean = true;
            if(testf){
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PREEND),{});
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_END),{"force":0});
                return;
            }
            ud = {};
            ud['bout'] = 2;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT),ud);

            //attack start
            ud = {};
            ud['att'] = 1;
            ud['vic'] = 21;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_NORMAL),ud);

            ud = {};
            ud['warid'] = 21;
            ud['bid'] = 1001;
            ud['overlay'] = 1;
            ud['bout'] = 3;
            ud['datas'] = [0,0,0];
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_ADD),ud);

            //
            ud = {};
            ud['att'] = 21;
            ud['skillid'] = 10001;
            ud['lv'] = 1;
            ud['round'] = 1;
            ud['lsvic'] = [1];
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BACKATTACK),ud);

            ud = {};
            ud['target'] = 1;
            ud['status'] = 0;
            ud['value'] = 77777;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);

            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BACKATTACK_END),ud);
            //
            ud = {};
            ud['target'] = 21;
            ud['status'] = 0x1;
            ud['value'] = 123456789;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);

            ud = {};
            ud['warid'] = 21;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            ud['warid'] = 1;
            ud['bid'] = 1002;
            ud['overlay'] = 1;
            ud['bout'] = 3;
            ud['datas'] = [0,0,0];
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_ADD),ud);

            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_END),ud);
            //attack end
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN),ud);

            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT),ud);

            //attack start
            ud = {};
            ud['att'] = 21;
            ud['vic'] = 1;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_NORMAL),ud);

            ud = {};
            ud['target'] = 1;
            ud['status'] = 3;
            ud['value'] = 987654321;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);

            ud = {};
            ud['warid'] = 21;
            ud['bid'] = 1001;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_DEL),ud);

            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 800;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            ud['att'] = 1;
            ud['vic'] = 21;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_SHAKE),ud);
            ud = {};
            ud['target'] = 21;
            ud['status'] = 0;
            ud['value'] = 500;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);

            ud = {};
            ud['warid'] = 21;
            ud['hprate'] = 500;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_END),ud);

            ud = {};
            ud['att'] = 22;
            ud['vic'] = 1;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_NORMAL),ud);

            ud = {};
            ud['target'] = 1;
            ud['status'] = 0;
            ud['value'] = 666666;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_STATUS),ud);

            ud = {};
            ud['warid'] = 1;
            ud['hprate'] = 200;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_STATUS),ud);

            ud = {};
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ATTACK_END),ud);

            //attack end
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN),ud);

            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PREEND),{});
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_END),{"force":0});
        }
        //
        private _on_test_combatpos_protocol(ud:any):void{
			let eud:any = ud;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_START),{"type":0,"subtype":0,"lineup":0,"playmode":1});

            let bout:number = 0;
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT),ud);
            
            for(let i:number = 1;i < 11;++i){
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0;//dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;

                ud['desc'] = helper.init_empty_desc();
                helper.set_ride_fdesc(ud['desc'],1);
                helper.set_weapon_fdesc(ud['desc'],1);
                helper.set_wing_fdesc(ud['desc'],1);
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_"+i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);
            }
            for(let i:number = 21;i < 31;++i){
                ud = {};
                ud['warid'] = i;
                ud['type'] = 0;
                ud['status'] = 0;//dead or normal
                ud['owner'] = 0;
                ud['shape'] = 101;

                ud['desc'] = helper.init_empty_desc();
                helper.set_ride_fdesc(ud['desc'],1);
                helper.set_weapon_fdesc(ud['desc'],1);
                helper.set_wing_fdesc(ud['desc'],1);
                ud['grade'] = 0;
                ud['classes'] = 0;
                ud['name'] = "warrior_"+i.toString();
                ud['title'] = "";
                this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_ADD),ud);
            }

            //
            ud = {};
            ud['warid'] = 1;
            ud['bid'] = 101;//102
            
            ud['overlay'] = 1;
            ud['bout'] = 99;
            let arr:Array<number> = new Array<number>();
            arr.push(1);
            ud['datas'] = arr;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_BUFF_ADD),ud);
            //
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_TURN),ud);
            //////
            ud = {};
            ud['bout'] = bout;
            bout++;
            this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_NEXT),ud);
            //////

            //this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_PREEND),{});
            //this.fire_event(game_event.gen_netcmd_event(protocol_def.S2C_WAR_END),{"force":0});
        }
        //
        public dispose()
        {
            this.m_combat = null;
            this.m_combatloading = null;
            this.m_combatloadingv2 = null;
            this.m_combatplayer = null;
            super.dispose();
        }
    }
}