module game{
    export class game_main extends utils.game_module{
        public m_ui_sp:laya.display.Sprite = null;
        public m_render_sp:laya.display.Sprite = null;
        public m_render:core.renderagent = null;
        private m_curtime:number = 0;
        private m_roleid:number = 0;
        private m_itemlist:Array<Object> = new Array<Object>();
        private m_svr_tm:number = 0;
        private m_svr_clitm:number = 0;
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
            utils.widget_ins().set_root(this.m_ui_sp);

            Laya.stage.addChild(this.m_render_sp);
            Laya.stage.addChild(this.m_ui_sp);

            
            this.m_render = new core.renderagent();
            this.m_render.set_walk_spd(200);
            this.m_render.set_avatar_config(config.Avatarinfo.get_Avatarinfo);
            this.m_render.set_map_config(config.Mapinfo.get_Mapinfo);
            this.m_render.set_ani_config(config.Aniinfo.get_Aniinfo);
            this.m_render.set_eff_config(config.Effectinfo.get_Effectinfo);

            this.m_render.initstage(this.m_render_sp);
            this.m_render.m_render.setworldwh(2560,2560);
            this.m_render.setviewport(Laya.stage.designWidth,Laya.stage.designHeight);
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

            this.register_event(game_event.EVENT_NET_CONNECTED,this.on_net_connected);
            this.register_event(game_event.EVENT_NET_CLOSED,this.on_net_closed);
            this.register_event(game_event.EVENT_NET_ERROR,this.on_net_error);
            this.register_event(game_event.EVENT_TEST,this.on_testfunc);
            this.register_event(game_event.EVENT_TEST1,this.on_testfunc1);
            this.register_event(game_event.EVENT_TEST2,this.on_testfunc2);
            this.register_event(game_event.EVENT_TEST3,this.on_testfunc3);

            timer.timer_ins().add_timer(1000,this,this.on_1s_tick);

            get_module(module_enum.MODULE_PLAYER).start();

            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINUI,true);
            utils.widget_ins().show_widget(widget_enum.WIDGET_MAINTOPUI,true);


            net.net_ins().connect("123.207.239.21",11009);

            //this.m_render.setmapbk("map/city/2001/2001.jpg");
            this.m_render.setmapscrollbkview(Laya.stage.designWidth,Laya.stage.designHeight);
            this.m_render.addmapscrollbk("map/scrollmap/1001.png",1136,640);
            this.m_render.addmapscrollbk("map/scrollmap/1001.png",1136,640);
            this.m_render.addmapscrollbk("map/scrollmap/1001.png",1136,640);
            this.m_render.setmapscrollbkpos(0,800);
            this.m_render.setmapscrollbkspd(200);

            let uid:number = this.m_render.addunit("role1",2,200,1224);
            let ra:core.renderavatar = this.m_render.getunit(uid);
            ra.change_dir(6);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);

            uid = this.m_render.addunit("enemy1",3,600,1224);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);

            uid = this.m_render.addunit("enemy2",4,700,1224);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);

            uid = this.m_render.addunit("enemy3",5,800,1224);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);

            uid = this.m_render.addunit("enemy4",6,900,1224);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);

            uid = this.m_render.addunit("enemy5",7,1000,1224);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);

            uid = this.m_render.addunit("enemy6",8,1100,1224);
            ra = this.m_render.getunit(uid);
            ra.change_dir(2);
            ra.change_action(core.AVATAR_ACTON.ACTION_RUN);
            ra.set_dx(-15);
            ra.set_dy(-60);
        }
        private on_click_sp(e:Laya.Event):void{
            core.game_tiplog("onClick sp ",e.stageX,e.stageY);

        }
        private on_net_error(ud:any = null):void{
            core.net_errlog("on_net_error");
        }
        private on_net_closed(ud:any = null):void{
            core.net_errlog("on_net_closed");
        }
        private on_net_connected(ud:any = null):void{
            core.net_tiplog("on_net_connected");
            let ld:Object = {};
            ld["clientver"] = {"major":0,"minor":0,"patch":0};
            ld["scriptver"] = {"major":0,"minor":0,"patch":0};
            ld["productver"] = {"major":0,"minor":0,"patch":0};
            ld["account"] = "mytesta";
            ld["pwd"] = "112233";
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
            console.log("on_testfunc2 move item",ud);
            if(this.m_itemlist.length > 1){
                let item:Object = this.m_itemlist[1];
                let dstpos:number = 2;
                net.net_ins().send(protocol_def.C2S_ITEM_MOVE,{"id":item['id'],"dstpos":dstpos});
            }
        }
        private on_testfunc3(ud:any = null):void{
            console.log("on_testfunc3 buyitem",ud);
            this.m_render.setmapbk("map/city/2002/2002.jpg");
            //net.net_ins().send(protocol_def.C2S_ITEM_BUY,{"id":1001});
        }
        private on_testfunc1(ud:any = null):void{
            console.log("on_testfunc1 refresh",ud);
            this.m_render.setmapbk("map/city/2001/2001.jpg");
            //net.net_ins().send(protocol_def.C2S_ROLE_INFO,{});
            //net.net_ins().send(protocol_def.C2S_ITEM_GETLIST,{});
        }
        private on_testfunc(ud:any = null):void{
            console.log("haha,i get event from main_ui");
            console.log("on_testfunc useitem",ud);
            //net.net_ins().send(protocol_def.C2S_CHAT_GM,{"msg":"addgold 10000"});
            if(this.m_itemlist.length > 0){
                let item:Object = this.m_itemlist[0];
                net.net_ins().send(protocol_def.C2S_ITEM_USE,{"id":item['id'],"amount":1});
            }
        }
        private on_roleid(ud:any = null):void{
            console.log("on_roleinfo ",ud);
            let roleid:number = ud["roles"][0]["rid"];
            console.log("request select ",roleid);
            net.net_ins().send(protocol_def.C2S_LOGIN_SELECTROLE,{"rid":roleid});
            this.m_roleid = roleid;
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
                if(this.m_render != null){
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
            if(this.m_render != null){
                this.m_render.check_release();
            }
        }
        public update(d:number):void
        {
            //
            
            let nowtime:number = laya.utils.Browser.now();
            //render here
            if(this.m_render != null){
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
            this.m_ui_sp.removeSelf();
            this.m_render_sp.removeSelf();
            this.m_ui_sp = null;
            this.m_render_sp = null;
            super.dispose();
        }
    }
}