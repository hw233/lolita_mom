module game{
    export class game_main extends utils.game_module{
        public m_ui_sp:laya.display.Sprite = null;
        public m_render_sp:laya.display.Sprite = null;
        public m_render:core.renderagent = null;

        public m_combat_render:combat.combatimpl = null;
        public m_combat_sp:laya.display.Sprite;
        private m_b_combat:boolean = false;
        private m_b_combatplaying:boolean = false;
        private m_combat_spd:number = 1.0;
        public m_b_net_inited:boolean = false;
        private m_b_gamestart:boolean = false;

        private m_curtime:number = 0;
        private m_itemlist:Array<Object> = new Array<Object>();
        private m_svr_tm:number = 0;
        private m_svr_clitm:number = 0;
        
        private m_b_req_guestaccount:boolean = false;
        private m_b_logining:boolean = false;

        private m_b_RC_sp:boolean = true;
        constructor()
        {
            super();
            frametask.add_task(this,this.update30,1);
            frametask.add_task(this,this.update20,2);
            frametask.add_task(this,this.update10,6);
            frametask.add_task(this,this.update1,60);
        }
        private on_1s_tick():void{
            this.fire_event_next_frame(game_event.EVENT_TIMER_TICK_1S);
        }
        public start(){
            super.start();
            core.game_tiplog('game_main start');
            this.m_ui_sp = new laya.display.Sprite();
            this.m_render_sp = new laya.display.Sprite();
            this.m_combat_sp = new laya.display.Sprite();

            utils.widget_ins().set_root(this.m_ui_sp);

            
            this.m_combat_render = new combat.combatimpl(this.m_combat_sp);
            this.m_combat_render.set_skill_config(config.Skillperform.get_Skillperform);
            this.m_combat_render.set_skillperform_config(config.Skillperformconfig.get_Skillperformconfig);

            this.m_render = new core.renderagent();
            this.m_render.set_walk_spd(200);
            this.m_render.set_avatar_config(config.Avatarinfo.get_Avatarinfo);
            this.m_render.set_map_config(config.Mapinfo.get_Mapinfo);
            this.m_render.set_ani_config(config.Aniinfo.get_Aniinfo);
            this.m_render.set_eff_config(config.Effectinfo.get_Effectinfo);

            this.m_render.initstage(this.m_render_sp);
            this.m_render.m_render.setworldwh(2560,2560);
            this.m_render.setviewport(Laya.stage.designWidth,Laya.stage.designHeight);

            this.m_combat_render.m_scene.set_viewport(Laya.stage.designWidth,Laya.stage.designHeight);

            this.m_render.setcamerapos(0,0);
            this.m_render_sp.width = 2560;
            this.m_render_sp.height = 2560;
            this.m_render_sp.on(Laya.Event.CLICK,this,this.on_click_sp);
            this.register_net_event(protocol_def.S2C_NOTIFY_MESSAGE,this.on_svr_messagebox);
            this.register_net_event(protocol_def.S2C_WEBSOCKET_HELLO,this.on_svr_notify);
            this.register_net_event(protocol_def.S2C_LOGIN,this.on_login_err);
            this.register_net_event(protocol_def.S2C_LOGIN_OK,this.on_login_ok);
            this.register_net_event(protocol_def.S2C_LOGIN_RELOGIN,this.on_relogin);
            this.register_net_event(protocol_def.S2C_NOTIFY_FLOAT,this.on_notifyfloat);
            this.register_net_event(protocol_def.S2C_LOGIN_SELECTROLE,this.on_selectrole);
            this.register_net_event(protocol_def.S2C_LOGIN_ROLEINFO,this.on_roleid);
            
            this.register_net_event(protocol_def.S2C_ITEM_LIST,this.on_get_itemlist);
            this.register_net_event(protocol_def.S2C_ASYNTIME,this.on_sync_svrtime);
            this.register_net_event(protocol_def.S2C_ACCOUNT_GUEST,this.on_account_guest);

            this.register_event(game_event.EVENT_NET_CONNECTED,this.on_net_connected);
            this.register_event(game_event.EVENT_NET_CLOSED,this.on_net_closed);
            this.register_event(game_event.EVENT_NET_ERROR,this.on_net_error);
            this.register_event(game_event.EVENT_TEST,this.on_testfunc);
            this.register_event(game_event.EVENT_TEST1,this.on_testfunc1);
            this.register_event(game_event.EVENT_TEST2,this.on_testfunc2);
            this.register_event(game_event.EVENT_TEST3,this.on_testfunc3);

            timer.timer_ins().add_timer(1000,this,this.on_1s_tick);

            get_module(module_enum.MODULE_SOUND).start();
            get_module(module_enum.MODULE_PLAYER).start();
            get_module(module_enum.MODULE_CARD).start();
            get_module(module_enum.MODULE_SCENE).start();
            get_module(module_enum.MODULE_CHAT_MSG).start();

            let combat_ins:combatmgr = get_module(module_enum.MODULE_COMBAT) as combatmgr;
            combat_ins.start();
            
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINUI,true);
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINTOPUI,true);


            this.register_event(game_event.EVENT_ENTERCOMBAT,this.on_entercombat);
            this.register_event(game_event.EVENT_COMBATPLAYING,this.on_combatplaying);
            this.register_event(game_event.EVENT_OUTCOMBAT,this.on_outcombat);
            
            this.register_event(game_event.EVENT_COMBAT_NORMAL,this.on_combat_normal);
            this.register_event(game_event.EVENT_COMBAT_QUICK,this.on_combat_quick);
            this.register_event(game_event.EVENT_COMBAT_SPDCHANGED,this.on_combatspd_changed);
            
            let loading_ins:loadingmgr = get_module(module_enum.MODULE_LOADING) as loadingmgr;
            loading_ins.start();

            let combatloading_ins:combatloadingmgr = get_module(module_enum.MODULE_COMBATLOADING) as combatloadingmgr;
            combatloading_ins.start();
            
            get_module(module_enum.MODULE_COMBATLOADINGV2).start();

            net.net_ins().connect("129.204.91.54",11009);

            this.on_outcombat();
        }
        public get_render():core.renderagent{
            return this.m_render;
        }
        public get_combat_render():combat.combatimpl{
            return this.m_combat_render;
        }
        private on_combat_normal(ud:any = null):void{
            this.m_combat_spd = 1.0;
        }
        private on_combat_quick(ud:any = null):void{
            this.m_combat_spd = 1.5;
        }
        private on_combatspd_changed(ud:any = null):void{
            if(this.m_combat_spd > 1.0){
                this.m_combat_spd = 1.0;
            }
            else{
                this.m_combat_spd = 2.0;
            }
        }
        private on_entercombat(user_data:any = null):void{
            this.m_b_combat = true;
            let soundins:game.soundmgr = get_module(module_enum.MODULE_SOUND) as game.soundmgr;
            soundins.enter_boss();
        }
        private on_combatplaying(user_data:any = null):void{
            if (this.m_b_RC_sp == true){
                this.m_render_sp.removeSelf();
                this.m_combat_sp.removeSelf();
                // this.m_ui_sp.removeSelf();
                Laya.stage.addChild(this.m_combat_sp);
                Laya.stage.addChild(this.m_ui_sp);
            }
            this.m_b_combatplaying = true;
        }
        private on_outcombat(user_data:any = null):void{
            if (this.m_b_RC_sp == true){
                this.m_render_sp.removeSelf();
                this.m_combat_sp.removeSelf();
                // this.m_ui_sp.removeSelf();
                Laya.stage.addChild(this.m_render_sp);
                Laya.stage.addChild(this.m_ui_sp);
            }
            let soundins:game.soundmgr = get_module(module_enum.MODULE_SOUND) as game.soundmgr;
            soundins.enter_scene();
            this.m_b_combat = false;
            this.m_b_combatplaying = false;
        }
        public on_tab_show(ud:any = null):void{
            let flag = ud["flag"];
            if (flag == true){
                this._remove_RC_sp();
            }
            else{
                this._add_RC_sp();
            }
        }
        private _add_RC_sp():void{
            if (this.m_b_RC_sp == false){
                this.m_combat_sp.removeSelf();
                this.m_render_sp.removeSelf();
                if (this.m_b_combatplaying == true){
                    Laya.stage.addChild(this.m_combat_sp);
                }
                else{
                    Laya.stage.addChild(this.m_render_sp);
                }
                Laya.stage.addChild(this.m_ui_sp);
                this.m_b_RC_sp = true;
            }
        }
        private _remove_RC_sp():void{
            if (this.m_b_RC_sp == true){
                this.m_combat_sp.removeSelf();
                this.m_render_sp.removeSelf();
                this.m_b_RC_sp = false;
            }
        }
        private on_click_sp(e:Laya.Event):void{
            core.game_tiplog("onClick sp ",e.stageX,e.stageY);
            //
            this.fire_event_next_frame(game_event.EVENT_SCENE_CLICK,[e.stageX,e.stageY]);
            //
        }
        private on_net_error(ud:any = null):void{
            core.net_errlog("on_net_error");
            this.m_b_logining = false;
            this.m_b_req_guestaccount = false;
            helper.show_msgbox("net error");
        }
        private on_net_closed(ud:any = null):void{
            core.net_errlog("on_net_closed");
            this.m_b_logining = false;
            this.m_b_req_guestaccount = false;
            helper.show_msgbox("net closed");
        }
        private on_net_connected(ud:any = null):void{
            core.net_tiplog("on_net_connected");
            let account:string = helper.get_local("my_demo_account");
            let pwd:string = helper.get_local("my_demo_pwd");
            if(account == null || account.length <= 0){
                this.req_guest_account();
            }
            else{
                this.req_login(account,pwd);
            }
        }
        private req_guest_account():void{
            if(this.m_b_req_guestaccount){
                return;
            }
            this.m_b_req_guestaccount = true;
            net.net_ins().send(protocol_def.C2S_ACCOUNT_GUEST,{});
        }
        private on_account_guest(ud:any = null):void{
            console.log("on_account_guest ",ud,this.m_b_req_guestaccount);
            this.m_b_req_guestaccount = false;
            let account:string = ud["account"];
            let pwd:string = ud["pwd"];
            helper.set_local("my_demo_account",account);
            helper.set_local("my_demo_pwd",pwd);
            this.req_login(account,pwd);
        }
        private req_login(account:string,pwd:string):void{
            core.net_tiplog("req_login ",account,pwd,this.m_b_logining);
            if(this.m_b_logining){
                return;
            }
            this.m_b_logining = true;
            let ld:Object = {};
            ld["clientver"] = {"major":0,"minor":0,"patch":0};
            ld["scriptver"] = {"major":0,"minor":0,"patch":0};
            ld["productver"] = {"major":0,"minor":0,"patch":0};
            ld["account"] = account;
            ld["pwd"] = pwd;
            ld["platform"] = 0;
            ld["client_type"] = 0;
            ld["device"] = "";
            ld["ret_session"] = 0;
            ld["token"] = "";
            ld["hwinfo"] = "";
            ld["idfa"] = "";
            net.net_ins().send(protocol_def.C2S_LOGIN,ld);
        }
        private on_notifyfloat(ud:any = null):void{
            console.log("on_notifyfloat ",ud);
        }
        private on_relogin(ud:any = null):void
        {
            console.log("on_relogin ",ud);
        }
        private on_login_ok(ud:any = null):void{
            console.log("on_login_ok ",ud);
            this.m_b_logining = false;
        }
        private req_svr_tm():void{
            console.log("req_svr_tm ");
            let curtm:number = laya.utils.Browser.now()/1000;
            net.net_ins().send(protocol_def.C2S_LOGIN_ASYN_TIME,{"time":curtm,"sign":""});
        }
        public get_svr_tm():number{
            if(this.m_svr_clitm == 0){
                return 0;
            }
            let curclitm:number = laya.utils.Browser.now()/1000;
            let delta:number = curclitm - this.m_svr_clitm;
            return this.m_svr_tm + delta;
        }
        private on_sync_svrtime(ud:any = null):void{
            console.log("on_sync_svrtime ",ud);
            let clitm:number = ud["time"];
            let svrtm:number = ud["srvtime"];
            
            this.m_svr_tm = svrtm;
            this.m_svr_clitm = clitm;
            console.log("on_sync_svrtime cur svrtm ",clitm,this.m_svr_tm);
        }
        private on_testfunc2(ud:any = null):void{
            console.log("on_testfunc2",ud);
            
        }
        private on_testfunc3(ud:any = null):void{
            console.log("on_testfunc3 buyitem",ud);
            
        }
        private on_testfunc1(ud:any = null):void{
            console.log("on_testfunc1 refresh",ud);
            
        }
        private on_testfunc(ud:any = null):void{
            console.log("on_testfunc");
            
            
        }
        private on_roleid(ud:any = null):void{
            console.log("on_roleinfo ",ud);
            let roleid:number = ud["roles"][0]["rid"];
            let shape:number = ud["roles"][0]["shape"];
            let name:string = ud["roles"][0]["name"];
            let mp:data.player_data = data.get_data(data_enum.DATA_PLAYER) as data.player_data;
            mp.m_pid = roleid;
            mp.m_name = name;
            mp.m_shape = shape;
            console.log("request select ",roleid);
            net.net_ins().send(protocol_def.C2S_LOGIN_SELECTROLE,{"rid":roleid});
        }
        private on_get_itemlist(ud:any = null):void{
            console.log("on_get_itemlist ",ud);
            let items:Array<Object> = ud['items'];
            this.m_itemlist = new Array<Object>();
            let idx:number = 0;
            for(let i of items){
                let id:number = i['id'];
                let shape:number = i['sid'];
                let pos:number = i['pos'];
                let used:number = i['key'];
                console.log("item:",idx,id,shape,pos,used);
                idx += 1;
                this.m_itemlist.push(i);
            }
        }
        
        private on_selectrole(ud:any = null):void{
            console.log("on_selectrole ",ud);
            net.net_ins().send(protocol_def.C2S_ROLE_INFO,{});
            net.net_ins().send(protocol_def.C2S_ITEM_GETLIST,{});
            this.req_svr_tm();
        }
        private on_login_err(ud:any = null):void{
            console.log("on_login_err ",ud);
            this.m_b_logining = false;
        }
        private on_svr_notify(ud:any = null):void{
            console.log("on_svr_notify ",ud);
        }
        private on_svr_messagebox(ud:any = null):void{

        }
        public update30():void{
            //update here
            if(this.m_curtime == 0){
                this.m_curtime = laya.utils.Browser.now();
            }
            else{
                let nowtime:number = laya.utils.Browser.now();
                let delta:number = nowtime - this.m_curtime;
                this.m_curtime = nowtime;
                
                if(this.m_b_combatplaying){
                    this.m_combat_render.update(delta*this.m_combat_spd);
                }
                else{
                    this.m_render.update(delta);
                }
            }
            timer.timer_ins().update(laya.utils.Browser.now());
        }
        public update20():void{

        }
        public update10():void{
            utils.event_ins().dispatch_all_delay_event();
            net.net_ins().update();
        }
        public update1():void{
            utils.widget_ins().check_release();
            if(this.m_render != null&&!this.m_b_combatplaying){
                this.m_render.check_release();
            }
        }
        public update(d:number):void
        {
            //
            
            let nowtime:number = laya.utils.Browser.now();
            //render here
            if(this.m_b_combatplaying){
                this.m_combat_render.render();
            }
            else{
                this.m_render.render();
            }
            let nowtimeafterrender:number = laya.utils.Browser.now();
            let tm_total:number = 17;
            frametask.run(tm_total - nowtimeafterrender + nowtime);
        }
        public dispose()
        {
            if(this.m_render != null){
                this.m_render.dispose();
                this.m_render = null;
            }
            if(this.m_combat_render != null)
            {
                this.m_combat_render.dispose();
                this.m_combat_render = null;
            }

            this.m_ui_sp.removeSelf();
            this.m_render_sp.removeSelf();
            this.m_combat_sp.removeSelf();
            this.m_combat_sp = null;
            this.m_ui_sp = null;
            this.m_render_sp = null;
            super.dispose();
        }
    }
}