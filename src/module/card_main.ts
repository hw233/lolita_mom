module game{
    export class card_main extends utils.game_module{
        private m_pdata_ins:data.player_data = null;
        private m_gamemain_ins:game_main = null;
        constructor()
        {
            super();
        }
        public start(){
            super.start();
            this.register_event(game_event.EVENT_TIMER_TICK_1S,this.on_1s_tick);
            this.m_pdata_ins = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            this.m_gamemain_ins = get_module(module_enum.MODULE_MAIN) as game_main;
            this.register_net_event(protocol_def.S2C_CARDS_ARR,this.on_cards_arr);
            this.register_net_event(protocol_def.S2C_CARDS_START,this.on_cards_start);
            this.register_net_event(protocol_def.S2C_CARDS_END,this.on_cards_end);
            this.register_net_event(protocol_def.S2C_CARDS_HANDS,this.on_cards_hands);
            this.register_net_event(protocol_def.S2C_CARDS_PLAYERINFO,this.on_cards_pinfo);
            this.register_net_event(protocol_def.S2C_CARDS_ATK,this.on_cards_atk);
            this.register_net_event(protocol_def.S2C_CARDS_DEL,this.on_cards_del);
            this.register_net_event(protocol_def.S2C_CARDS_OPEN,this.on_cards_open);
            this.register_net_event(protocol_def.S2C_CARDS_CHANGED,this.on_cards_changed);
            this.register_net_event(protocol_def.S2C_CARDS_TURNSTART,this.on_cards_turnstart);
            this.register_net_event(protocol_def.S2C_CARDS_TURNEND,this.on_cards_turnend);
            this.register_net_event(protocol_def.S2C_CARDS_ENTERDLV,this.on_cards_enterdlv);
            this.register_net_event(protocol_def.S2C_CARDS_DELHAND,this.on_cards_delhand);
        }
        private on_cards_enterdlv(ud:any = null):void{
            core.game_tiplog("on_cards_enterdlv ",ud);
            let lv:number = ud["lv"];
        }
        private on_cards_delhand(ud:any = null):void{
            core.game_tiplog("on_cards_delhand ",ud);
            let id:number = ud["id"];
        }
        private on_cards_changed(ud:any = null):void{
            core.game_tiplog("on_cards_changed ",ud);
            let id:number = ud["id"];
            let shape:number = ud["shape"];
            let atk:number = ud["atk"];
            let hp:number = ud["hp"];
            let duration:number = ud["duration"];
        }
        private on_cards_turnstart(ud:any = null):void{
            core.game_tiplog("on_cards_turnstart ",ud);
        }
        private on_cards_turnend(ud:any = null):void{
            core.game_tiplog("on_cards_turnend ",ud);
        }
        private on_cards_atk(ud:any = null):void{
            core.game_tiplog("on_cards_atk ",ud);
            let srcid:number = ud["srcid"];
            let dstid:number = ud["dstid"];
            let value:number = ud["value"];
        }
        private on_cards_del(ud:any = null):void{
            core.game_tiplog("on_cards_del ",ud);
            let id:number = ud["id"];
        }
        private on_cards_open(ud:any = null):void{
            core.game_tiplog("on_cards_open ",ud);
            let id:number = ud["id"];
            let shape:number = ud["shape"];
        }
        private on_cards_hands(ud:any = null):void{
            core.game_tiplog("on_cards_hands ",ud);
            let idlist:Array<number> = ud["idlist"];
            let shapelist:Array<number> = ud["shapelist"];
            let hplist:Array<number> = ud["hplist"];
            let atklist:Array<number> = ud["atklist"];
            let durationlist:Array<number> = ud["durationlist"];
        }
        private on_cards_pinfo(ud:any = null):void{
            core.game_tiplog("on_cards_pinfo ",ud);
            let hp:number = ud["hp"];
            let stamina:number = ud["stamina"];
            let armor:number = ud["armor"];
            let atk:number = ud["atk"];
            let exp:number = ud["exp"];
            let dlv:number = ud["dlv"];
            let clv:number = ud["clv"];
            let hpmax:number = ud["hpmax"];
            let staminamax:number = ud["staminamax"];
        }
        private on_cards_start(ud:any = null):void{
            core.game_tiplog("on_cards_start ",ud);
        }
        private on_cards_end(ud:any = null):void{
            core.game_tiplog("on_cards_end ",ud);
        }
        private on_cards_arr(ud:any = null):void{
            core.game_tiplog("on_cards_arr ",ud);
            let idlist:Array<number> = ud["idlist"];
            let shapelist:Array<number> = ud["shapelist"];
            let hplist:Array<number> = ud["hplist"];
            let atklist:Array<number> = ud["atklist"];
            let durationlist:Array<number> = ud["durationlist"];
        }
        //
        public req_start():void{
            net.net_ins().send(protocol_def.C2S_CARDS_START,{});
        }
        public req_quit():void{
            net.net_ins().send(protocol_def.C2S_CARDS_QUIT,{});
        }
        public req_del_card(id:number):void{
            net.net_ins().send(protocol_def.C2S_CARDS_DEL,{"id":id});
        }
        public req_click_card(id:number):void{
            net.net_ins().send(protocol_def.C2S_CARDS_CLICK,{"id":id});
        }
        public req_flip_card(id:number):void{
            net.net_ins().send(protocol_def.C2S_CARDS_FLIP,{"id":id});
        }
        public req_use_card(srcid:number,dstid:number):void{
            net.net_ins().send(protocol_def.C2S_CARDS_USE,{"srcid":srcid,"dstid":srcid});
        }
        //
        private on_1s_tick(ud:any = null):void{
            let curtm:number = this.m_gamemain_ins.get_svr_tm();
            if(curtm == 0){
                return;
            }
                      
        }
        
        public dispose()
        {
            super.dispose();
        }
    }
}