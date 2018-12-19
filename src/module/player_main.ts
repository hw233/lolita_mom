module game{
    export class player_main extends utils.game_module{
        private m_pdata_ins:data.player_data = null;
        private m_gamemain_ins:game_main = null;
        constructor()
        {
            super();
        }
        public start(){
            super.start();
            this.register_event(game_event.EVENT_TIMER_TICK_1S,this.on_1s_tick);
            this.register_net_event(protocol_def.S2C_ROLE_INFO,this.on_get_roleinfo);
            this.m_pdata_ins = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            this.m_gamemain_ins = get_module(module_enum.MODULE_MAIN) as game_main;
        }
        private on_1s_tick(ud:any = null):void{
            let curtm:number = this.m_gamemain_ins.get_svr_tm();
            if(curtm == 0){
                return;
            }
            let gold:number = this.m_pdata_ins.m_gold;
            let goldspd:number = this.m_pdata_ins.m_goldspd;
            let exp:number = this.m_pdata_ins.m_exp;
            let expspd:number = this.m_pdata_ins.m_expspd;
            let stamina:number = this.m_pdata_ins.m_stamina;
            let lasttm:number = this.m_pdata_ins.m_last_time;
            gold = gold + (goldspd * (curtm - lasttm));
            exp = exp + (expspd * (curtm - lasttm));
            this.fire_event_next_frame(game_event.EVENT_UI_MAINTOPUPDATE,[gold,stamina]);

            this.fire_event_next_frame(game_event.EVENT_UI_MAINUPDATE,[exp,this.m_pdata_ins.m_expmax]);            
        }
        private on_get_roleinfo(ud:any = null):void{
            console.log("on_get_roleinfo ",ud);
            let lv:number = ud['lv'];
            let shape:number = ud['shape'];
            let exp:number = ud['exp'];
            let gold:number = ud['gold'];
            let expspd:number = ud['expspd'];
            let goldspd:number = ud['goldspd'];
            let stamina:number = ud['stamina'];
            let tm:number = ud['tm'];
            console.log("info:",lv,shape,exp,gold,expspd,goldspd,stamina,tm);
            let pdata:data.player_data = this.m_pdata_ins;
            pdata.m_lv = lv;
            pdata.m_shape = shape;
            pdata.m_exp = exp;
            pdata.m_gold = gold;
            pdata.m_expspd = expspd;
            pdata.m_goldspd = goldspd;
            pdata.m_stamina = stamina;
            pdata.m_last_time = tm;

            let exp_obj:Object = config.Player_exp.get_Player_exp(pdata.m_lv);;
            if(exp_obj != null){
                let expmax:number = exp_obj['exp'];
                pdata.m_expmax = expmax;
            }

            this.fire_event_next_frame(game_event.EVENT_PLAYERDATA_UPDATED);
        }
        public dispose()
        {
            super.dispose();
        }
    }
}