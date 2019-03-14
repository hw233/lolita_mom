module game{
    export class combatplayer extends utils.game_module{
        private m_combat:combat.combatimpl = null;
        private m_cmd_arr:Array<any> = new Array<any>();
        private m_b_pushcmd:boolean = false;
        private m_self_group:number = 0;
        private m_b_preend:boolean = false;
        private m_b_turnstart:boolean = false;
        private m_turnnum:number = 0;
        private m_wartype:number = 0;
        private m_warsubtype:number = 0;
        constructor()
        {
            super();
        }
        public start(){
            super.start();
            core.combat_tiplog('combatplayer start');
            
            let game_ins:game_main = get_module(module_enum.MODULE_MAIN) as game_main;
            this.m_combat = game_ins.get_combat_render();
               
        }
        private push_cmd(cmd:number,ud:any):void{
            this.m_cmd_arr.push({'cmd':cmd,'ud':ud});
        }
        public is_guaji_combat():boolean{
            return this.m_wartype == WARTYPE_GUAJI;
        }
        public is_boss_combat():boolean{
            return this.m_wartype == WARTYPE_BOSS;
        }
        public is_summon_caching():boolean{
            return this.m_wartype == WARTYPE_CATCHSUMMON;
        }
        public is_playerend():boolean{
            return this.m_combat.isplayerend();
        }
        public is_turnend():boolean{
            return this.m_combat.isturnend();
        }
        public get_preend_cmd():boolean{
            return this.m_b_preend;
        }
        public force_end():void{
            this.m_cmd_arr.length = 0;
            this.m_combat.end();
        }
        //
        public on_war_start(ud:any):void{
            core.combat_tiplog("combatplayer on_war_start ",ud);
            this.m_b_preend = false;
            let wartype:number = ud['type'];
            let warsubtype:number = ud['subtype'];
            this.m_wartype = wartype;
            this.m_warsubtype = warsubtype;

            if(this.is_guaji_combat() == false && this.is_summon_caching() == false){
                let soundins:game.soundmgr = get_module(module_enum.MODULE_SOUND) as game.soundmgr;
                soundins.enter_boss();
            }

            this.m_self_group = ud['lineup'];
            let gm:game_main = get_module(module_enum.MODULE_MAIN) as game_main;
            let cw:number = 2560;
            let ch:number = 2560;
            let hc:Laya.HTMLCanvas = null;
            if(!Laya.Render.isConchApp)
            {
                //hc = gm.get_render().get_map_canvas(cw,ch,0,0);
            }
            let mp:data.player_data = utils.data_ins().get_data(data_enum.DATA_PLAYER) as data.player_data;
            let res_id = mp.get_scene_res_id(); 
            this.m_combat.start(hc,cw,ch,gm.get_render().get_camera_x(),gm.get_render().get_camera_y(),res_id,"map/city/"+res_id.toString()+"/"+res_id.toString()+".jpg");
            this.m_b_turnstart = true;
            this.m_turnnum = 0;
            this.m_combat.turnstart(this.m_turnnum);
            this.m_combat.change_lineup("avatar/lineup.png",-330,-210);
        }
        public on_war_end(ud:any):void{
            core.combat_tiplog("combatplayer on_war_end ",ud['force']);
            if(this.m_b_pushcmd){
                this.do_cmd();
            }
            if(this.m_b_turnstart){
                this.m_b_turnstart = false;
                this.m_combat.turnend();
            }
        }
        public on_war_preend(ud:any):void{
            core.combat_tiplog("combatplayer on_war_preend ",ud);
            this.m_b_preend = true;
        }
        public on_war_turnstart(ud:any):void{
            core.combat_tiplog("combatplayer on_war_turnstart ",ud);
            if(this.m_b_turnstart){
                this.m_combat.turnend();
            }
            this.m_b_turnstart = true;
            this.m_turnnum = ud['bout'];
            this.m_combat.turnstart(this.m_turnnum);
            this.m_combat.buffautocd();
            this.m_combat.send_event(game_event.EVENT_COMBATTURNSCHANGE,ud['bout']);
        }
        public on_war_turnend(ud:any):void{
            core.combat_tiplog("combatplayer on_war_turnend ",ud);
            this.m_b_pushcmd = false;
            this.m_b_turnstart = false;
            this.do_cmd();
            this.m_combat.turnend();
            //todo handle buff cd
        }
        private gen_pos(pos:number,group:number):number{
            if(group == 0){
                return pos;
            }
            if(pos <=12){
                pos += 20;
            }
            else{
                pos -= 20;
            }
            return pos;
        }
        public on_war_add(ud:any):void{
            core.combat_tiplog("combatplayer on_war_add ",ud,ud['warid'],ud['shape'],ud['name']);
            //todo
            //this.m_combat.addwarrior()
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_ADD,ud);
                return;
            }
            if(this.m_b_turnstart == false){
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            let wdata:combat.warrior = this.m_combat.get_warrior_ins();
            wdata.id = ud['warid'];
            wdata.pos = this.gen_pos(ud['warid'],this.m_self_group);
            let type:number = ud['type'];
            let status:number = ud['status'];//dead or normal
            let owner:number = ud['owner'];
            wdata.shape = ud['shape'];
            let desc:Laya.Byte = ud['desc'];
            let lv:number = ud['grade'];
            let cls:number = ud['classes'];
            let name:string = ud['name'];
            let zoomlvl:number = ud['zoomlvl'];
            wdata.scale = ud['scale'];
            wdata.name = name;
            wdata.lv = lv;
            wdata.cls = cls;
            wdata.b_dead = (status&0x8) != 0;
            

            //
            
            if(desc != null && desc.length){
                //
                desc.pos = 0;
                let skin:number = desc.getUint8();
                if(skin != 0){
                    if(config.Skininfo.get_Skininfo(skin) != null){
                        skin = config.Skininfo.get_Skininfo(skin).aid;
                        skin = helper._get_post_value_by_shape(wdata.shape, skin);
                        wdata.m_desc[0] = skin;
                        //this.m_combat.changeshape(wdata.id,skin);
                    }
                    
                }
                desc.pos = 2;
                let weapon:number = desc.getUint8();
                if(weapon != 0){
                    if(config.Weaponinfo.get_Weaponinfo(weapon) != null){
                        weapon = config.Weaponinfo.get_Weaponinfo(weapon).aid;
                        wdata.m_desc[1] = weapon;
                        //this.m_combat.changeweapon(wdata.id,weapon);
                    }
                }
                
                desc.pos = 4;
                let ride:number = desc.getUint8();
                let ride_back:number = 0;
                if(ride != 0){
                    if(config.Rideinfo.get_Rideinfo(ride) != null){
                        ride_back = config.Rideinfo.get_Rideinfo(ride).baid;
                        ride = config.Rideinfo.get_Rideinfo(ride).faid;
                        //
                        wdata.m_desc[6] = ride;
                        wdata.m_desc[7] = ride_back;
                        wdata.m_desc[8] = 30;
                        //this.m_combat.changeride(wdata.id,ride,ride_back);
                    }
                }
                
                desc.pos = 6;
                let wing:number = desc.getUint8();
                if(wing != 0){
                    if(config.Winginfo.get_Winginfo(wing) != null){
                        wing = config.Winginfo.get_Winginfo(wing).aid;
                        wdata.m_desc[2] = wing;
                        //this.m_combat.changewing(wdata.id,wing);
                    }
                }
                
                desc.pos = 8;
                let fairy:number = desc.getUint8();
                if(fairy != 0){
                    if(config.Fairyinfo.get_Fairyinfo(fairy) != null){
                        fairy = config.Fairyinfo.get_Fairyinfo(fairy).aid;
                        wdata.m_desc[3] = fairy;
                        //this.m_combat.changefairy(wdata.id,fairy);
                    }
                }
                
                desc.pos = 10;
                let aura:number = desc.getUint8();
                if(aura != 0){
                    if(config.Auraresinfo.get_Auraresinfo(aura) != null){
                        aura = config.Auraresinfo.get_Auraresinfo(aura).aid;
                        wdata.m_desc[4] = aura;
                        //this.m_combat.changeaurn(wdata.id,aura);
                    }
                }
                
                desc.pos = 11;
                let title:number = desc.getUint8();
                if (title != 0){
                    if (config.Titleresinfo.get_Titleresinfo(title) != null){
                        title = config.Titleresinfo.get_Titleresinfo(title).aid;
                        wdata.m_desc[5] = title;
                        //this.m_combat.changetitle(wdata.id,title);
                    }
                }
                
                //
            }
            this.m_combat.addwarrior(wdata);
            //
        }
        public on_war_del(ud:any):void{
            core.combat_tiplog("combatplayer on_war_del ",ud,this.m_b_preend,ud['warid']);
            if(this.m_b_preend){
                return;
            }
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_LEAVE,ud);
                return;
            }
            if(this.m_b_turnstart == false){
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            this.m_combat.delwarrior(ud['warid']);
        }
        public on_war_status(ud:any):void{
            core.combat_tiplog("combatplayer on_war_status ",ud,ud['warid'],ud['hprate']);
            //todo
            this.m_combat.send_event(game_event.EVENT_COMBATPLAYERHPCHANGED,ud);

            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_STATUS,ud);
                return;
            }
            if(this.m_b_turnstart == false){
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            let wdata:combat.warrior_hp = this.m_combat.get_warriorhp_ins();
            wdata.id = ud['warid'];
            wdata.hp = ud['hprate'];
            wdata.hpmax = 1000;
            this.m_combat.set_warrior_hp(wdata);
        }
        public on_war_attack(ud:any):void{
            core.combat_tiplog("combatplayer on_war_attackstart ",ud);
            if(this.m_b_pushcmd){
                this.do_cmd();
            }
            this.push_cmd(protocol_def.S2C_WAR_ATTACK_NORMAL,ud);
            this.m_b_pushcmd = true;
        }
        public on_war_attackend(ud:any):void{
            core.combat_tiplog("combatplayer on_war_attackend ",ud);
            this.m_b_pushcmd = false;
            this.do_cmd();
        }
        public on_war_skill(ud:any):void{
            core.combat_tiplog("combatplayer on_war_skillstart ",ud);
            if(this.m_b_pushcmd){
                this.do_cmd();
            }
            this.push_cmd(protocol_def.S2C_WAR_PERFORM,ud);
            this.m_b_pushcmd = true;
        }
        public on_war_skillend(ud:any):void{
            core.combat_tiplog("combatplayer on_war_skillend ",ud);
            this.m_b_pushcmd = false;
            this.do_cmd();
        }
        public on_war_partneratk(ud:any):void{
            core.combat_tiplog("combatplayer on_war_partneratk ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_PARTNER_ATTACK,ud);
                return;
            }
            //todo
        }
        public on_war_backatk(ud:any):void{
            core.combat_tiplog("combatplayer on_war_backatk ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_BACKATTACK,ud);
                return;
            }
            //todo
        }
        public on_war_backatkend(ud:any):void{
            core.combat_tiplog("combatplayer on_war_backatkend ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_BACKATTACK_END,ud);
            }
            //todo
        }
        public on_war_shake(ud:any):void{
            core.combat_tiplog("combatplayer on_war_shake ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_SHAKE,ud);
                return;
            }

        }
        public on_war_protect(ud:any):void{
            core.combat_tiplog("combatplayer on_war_protect ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_PROTECT,ud);
                return;
            }
        }
        public _gen_war_atkstatus(ud:any):combat.atk_status{
            let id:number = ud['target'];
            let status:number = ud['status'];
            let value:number = ud['value'];

            //status1
            //War_AttackedBehave_Normal = 0;
            //War_AttackedBehave_Hit = 1;
            //War_AttackedBehave_Defence = 2;
            //War_AttackedBehave_Dodge = 3;
            //War_AttackedBehave_BLOOD = 4;
            //status2
            //War_AttackType_Crack = 1;
            //status3
            //War_AttackedResult_Normal = 0;
            //War_AttackedResult_Dead = 1;
            //War_AttackedResult_FlyAway = 2;
            let status1:number = status & 0x3;//
            let status2:number = status & 0x4;
            status2 = status2 >> 2;//bcrack
            let status4:number = status & 0x8;
            status4 = status4 >> 3;
            let status3:number = status & 0xF0;
            status3 = status3 >> 4;

            let sdata:combat.atk_status = this.m_combat.get_atkstatus_ins();
            sdata.id = id;
            sdata.damage = value;
            if (value >= 0){
                sdata.damagetype = combat.DAMAGETYPE_HP_SUB;
            }
            else{
                sdata.damagetype = combat.DAMAGETYPE_HP_ADD;
                sdata.damage = -value;
            }
            // sdata.damagetype = combat.DAMAGETYPE_HP_SUB;
            // if(status3 == War_AttackedResult_Normal)
            // {
            //     //sdata.damagetype = combat.DAMAGETYPE_HP_ADD;
            // }
            if(status2 == War_AttackType_Crack){
                sdata.b_crack = true;
            }
            if(status3 == War_AttackedResult_FlyAway){
                sdata.b_fly = true;
            }
            else if(status3 == War_AttackedResult_Dead){
                sdata.b_dead = true;
            }
            if(status1 == War_AttackedBehave_Dodge){
                sdata.b_dodge = true;
            }
            else if(status1 == War_AttackedBehave_Defence){
                sdata.b_defend = true;
            }
            return sdata;
        }
        public on_war_atkstatus(ud:any):void{
            core.combat_tiplog("combatplayer on_war_atkstatus ",ud,ud['target'],ud['status'],ud['value']);
            let sdata:combat.atk_status = this._gen_war_atkstatus(ud);
            this.m_combat.send_event(game_event.EVENT_COMBATPLAYERATTACK,sdata);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_ATTACK_STATUS,ud);
                return;
            }
            if(this.m_b_turnstart == false){
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            this.m_combat.propchange(sdata);
        }
        public _gen_delbuff_ins(ud:any):combat.buff_status{
            let id:number = ud['warid'];
            let buffid:number = ud['bid'];
            let bdata:combat.buff_status = this.m_combat.get_buffstatus_ins();
            bdata.id = id;
            bdata.buffid = buffid;
            return bdata;
        }
        public on_war_buffdel(ud:any):void{
            core.combat_tiplog("combatplayer on_war_buffdel ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_BUFF_DEL,ud);
                return;
            }
            if(this.m_b_turnstart == false){
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            let bdata:combat.buff_status = this._gen_delbuff_ins(ud);
            this.m_combat.delbuff(bdata);
        }
        public _gen_addbuff_ins(ud:any):combat.buff_status{
            let id:number = ud['warid'];
            let buffid:number = ud['bid'];
            let shape:number = 0;
            let buffeffid:number = 0;
            let cfg:Object = config.Buffinfo.get_Buffinfo(buffid);
            if(cfg != null){
                shape = cfg["icon"];
                buffeffid = cfg["aid"];
            }
            let overlay:number = ud['overlay'];
            let bout:number = ud['bout'];
            let blist:Array<number> = ud['datas'];
            let blen:number = blist.length;//0 means del

            let bdata:combat.buff_status = this.m_combat.get_buffstatus_ins();
            bdata.id = id;
            bdata.buffid = buffid;
            bdata.cd = bout;
            bdata.overlay = overlay;
            bdata.buffshape = shape;
            bdata.buffeffid = buffeffid;
            
            for(let i of blist){
                let value:number = i;
                bdata.datas.push(value);
            }
            return bdata;
        }
        public on_war_buff(ud:any):void{
            core.combat_tiplog("combatplayer on_war_buff ",ud);
            if(this.m_b_pushcmd){
                this.push_cmd(protocol_def.S2C_WAR_BUFF_ADD,ud);
                return;
            }
            if(this.m_b_turnstart == false){
                this.m_b_turnstart = true;
                this.m_combat.turnstart(this.m_turnnum);
            }
            //todo

            let bdata:combat.buff_status = this._gen_addbuff_ins(ud);
            this.m_combat.addbuff(bdata);
        }
        public _handle_last_cmd(cmd_arr:Array<any>):Array<any>{
            let left_cmd_arr:Array<any> = new Array<any>();
            for(let j:number = 0;j < cmd_arr.length;++j){
                let i:any = cmd_arr[j];
                if(i['cmd'] == protocol_def.S2C_WAR_ATTACK_STATUS){
                    let sub_ud:any = i['ud'];
                    let sdata:combat.atk_status = this._gen_war_atkstatus(sub_ud);
                    this.m_combat.propchange(sdata);
                }
                else if(i['cmd'] == protocol_def.S2C_WAR_STATUS){
                    let w_hp:combat.warrior_hp = this.m_combat.get_warriorhp_ins();
                    w_hp.id = i['ud']['warid'];
                    w_hp.hp = i['ud']['hprate'];
                    w_hp.hpmax = 1000;
                    this.m_combat.set_warrior_hp(w_hp);
                }
                else if(i['cmd'] == protocol_def.S2C_WAR_BUFF_ADD){
                    let bdata:combat.buff_status = this._gen_addbuff_ins(i['ud']);
                    this.m_combat.addbuff(bdata);
                }
                else if(i['cmd'] == protocol_def.S2C_WAR_BUFF_DEL){
                    let bdata:combat.buff_status = this._gen_delbuff_ins(i['ud']);
                    this.m_combat.delbuff(bdata);
                }
                else if(i['cmd'] == protocol_def.S2C_WAR_ADD){
                    this.on_war_add(i['ud']);
                }
                else if(i['cmd'] == protocol_def.S2C_WAR_LEAVE){
                    this.on_war_del(i['ud']);
                }
                else{
                    left_cmd_arr.push(i);
                }
            }
            return left_cmd_arr;
        }
        public _do_skill_cmd(skill_cmd:any,cmd_arr:Array<any>):Array<any>{
            let skillatkobj:combat.skillatk = this.m_combat.get_skillatk_ins();
            let cmd:number = skill_cmd['cmd'];
            let ud:any = skill_cmd['ud'];
            skillatkobj.m_type = 0;
            skillatkobj.self_group = this.m_self_group;
            if(cmd == protocol_def.S2C_WAR_ATTACK_NORMAL){
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = 1;
                skillatkobj.skilllv = 1;
                skillatkobj.dst_list.push(ud['vic']);
                skillatkobj.m_type = 0;
            }
            else if(cmd == protocol_def.S2C_WAR_PERFORM){
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = ud['skillid'];
                skillatkobj.skilllv = ud['lv'];
                let round:number = ud['round'];
                let dstlist:Array<number> = ud['lsvic'];
                for(let i of dstlist){
                    skillatkobj.dst_list.push(i);
                }
                if(this.gen_pos(skillatkobj.id,this.m_self_group) <= 12){
                    skillatkobj.m_config_id = 1;
                }
                else{
                    skillatkobj.m_config_id = 2;
                }
                skillatkobj.m_type = 1;
            }
            else if(cmd == protocol_def.S2C_WAR_SHAKE){
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = 2;
                skillatkobj.skilllv = 1;
                skillatkobj.dst_list.push(ud['vic']);
                skillatkobj.m_type = 2;
            }
            else if(cmd == protocol_def.S2C_WAR_BACKATTACK){
                skillatkobj.id = ud['att'];
                skillatkobj.skillid = ud['skillid'];
                skillatkobj.skilllv = ud['lv'];
                let round:number = ud['round'];
                let dstlist:Array<number> = ud['lsvic'];
                for(let i of dstlist){
                    skillatkobj.dst_list.push(i);
                }
                skillatkobj.m_type = 3;
            }
            else{
                core.combat_errlog("do_cmd errortype ",cmd);
            }
            if(skillatkobj.skillid == 0)
            {
                skillatkobj.skillid = 2;
            }
            if(skillatkobj.skilllv == 0)
            {
                skillatkobj.skilllv = 1;
            }
            for(let i of skillatkobj.dst_list){
                let b_find:boolean = true;
                for(let j:number = 0;j < cmd_arr.length&&b_find;++j){
                    if(cmd_arr[j]['cmd'] == protocol_def.S2C_WAR_ATTACK_STATUS){
                        let sub_ud:any = cmd_arr[j]['ud'];
                        if(sub_ud['target'] == i){
                            //popnumber
                            let sdata:combat.atk_status = this._gen_war_atkstatus(sub_ud);
                            skillatkobj.atkstatus_list.push(sdata);
                            b_find = false;
                            cmd_arr.splice(j,1);
                        }
                    }
                }
            }
            this.m_combat.attack(skillatkobj);
            //hp
            for(let i of skillatkobj.dst_list){
                let b_find:boolean = true;
                for(let j:number = cmd_arr.length - 1;j >= 0;--j){
                    let sub_cmd:number = cmd_arr[j]['cmd'];
                    let sub_ud:any = cmd_arr[j]['ud'];
                    if(sub_cmd == protocol_def.S2C_WAR_STATUS){
                        if(sub_ud['warid'] == i){
                            let w_hp:combat.warrior_hp = this.m_combat.get_warriorhp_ins();
                            w_hp.id = sub_ud['warid'];
                            w_hp.hp = sub_ud['hprate'];
                            w_hp.hpmax = 1000;
                            this.m_combat.set_warrior_hp(w_hp);
                            cmd_arr.splice(j,1);
                        }
                    }
                    else if(sub_cmd == protocol_def.S2C_WAR_BUFF_ADD){
                        if(sub_ud['warid'] == i){
                            let bdata:combat.buff_status = this._gen_addbuff_ins(sub_ud);
                            this.m_combat.addbuff(bdata);
                        }
                    }
                    else if(sub_cmd == protocol_def.S2C_WAR_BUFF_DEL){
                        if(sub_ud['warid'] == i){
                            let bdata:combat.buff_status = this._gen_delbuff_ins(sub_ud);
                            this.m_combat.delbuff(bdata);
                        }
                    }
                }
            }
            
            return cmd_arr;
        }
        public do_cmd():void{
            core.combat_tiplog("combatplayer do_cmd ",this.m_cmd_arr.length);
            if(this.m_cmd_arr.length <= 0){
                return;
            }
            let cur_cmd:Object;
            let cur_skill_cmd:Object = this.m_cmd_arr.shift();
           
            //
            let shake_list:Array<any> = new Array<any>();
            for(let i:number = this.m_cmd_arr.length - 1;i >= 0;--i){
                cur_cmd = this.m_cmd_arr[i];
                if(cur_cmd['cmd'] == protocol_def.S2C_WAR_SHAKE){
                    shake_list.push(cur_cmd);
                    this.m_cmd_arr.splice(i,1);
                }
            }
            let counteratklist:Array<Array<any>> = new Array<Array<any>>();
            let b_push:boolean = false;
            let cur_list:Array<any> = null;
            for(let i:number = this.m_cmd_arr.length - 1;i >= 0;--i){
                cur_cmd = this.m_cmd_arr[i];
                if(cur_cmd['cmd'] == protocol_def.S2C_WAR_BACKATTACK_END){
                    b_push = true;
                    if(cur_list != null){
                        core.combat_errlog("counteratk error!multi backattackend")
                    }
                    else{
                        cur_list = new Array<any>();
                    }
                    this.m_cmd_arr.splice(i,1);
                }
                else if(cur_cmd['cmd'] == protocol_def.S2C_WAR_BACKATTACK){
                    b_push = false;
                    if(cur_list == null){
                        core.combat_errlog("counteratk error!have not backattackend,only start");
                        cur_list = new Array<any>();
                    }
                    cur_list.push(cur_cmd);
                    cur_list.reverse();
                    counteratklist.push(cur_list);
                    this.m_cmd_arr.splice(i,1);
                    cur_list = null;
                }
                else{
                    if(b_push){
                        cur_list.push(cur_cmd);
                        this.m_cmd_arr.splice(i,1);
                    }
                }
            }
            if(cur_list != null){
                core.combat_errlog("counteratk error!have not backattackstart,only end");
                cur_list.reverse();
                for(let i of cur_list){
                    this.m_cmd_arr.push(i);
                }
                cur_list = null;
            }
            counteratklist.reverse();
            //
            this.m_cmd_arr = this._do_skill_cmd(cur_skill_cmd,this.m_cmd_arr);
            //shake
            for(let i of shake_list){
                this.m_cmd_arr = this._do_skill_cmd(i,this.m_cmd_arr);
            }
            shake_list = null;
            //counterattack
            for(let i of counteratklist){
                cur_cmd = i.shift();
                let last_cmd_arr:Array<any> = this._do_skill_cmd(cur_cmd,i);
                if(last_cmd_arr.length > 0){
                    last_cmd_arr = this._handle_last_cmd(last_cmd_arr);
                    if(last_cmd_arr.length > 0){
                        core.combat_errlog("counteratk error! still has cmd left ",last_cmd_arr.length);
                    }
                }
            }
            this.m_cmd_arr = this._handle_last_cmd(this.m_cmd_arr);
            if(this.m_cmd_arr.length > 0){
                core.combat_errlog("skillatk error! still has cmd left ",this.m_cmd_arr.length);
            }
            
            this.m_b_pushcmd = false;
            this.m_cmd_arr.length = 0;
        }
        //
        
        
        public dispose()
        {
            this.m_combat = null;
            super.dispose();
        }
    }
}