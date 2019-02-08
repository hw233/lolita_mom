module widget {
    let CARD_ITEM_FRAME_W:number = 144;
    let CARD_ITEM_FRAME_H:number = 184;
    let CARD_ITEM_FRAMEC_W:number = 122;
    let CARD_ITEM_FRAMEC_H:number = 184;
    let CARD_ITEM_FRAMEBK_W:number = 100;
    let CARD_ITEM_FRAMEBK_H:number = 160;
    let CARD_ITEM_ICON_W:number = 120;
    let CARD_ITEM_ICON_H:number = 120;
    export class card_item extends Laya.Sprite{
        public m_id:number = 0;
        public m_root:Laya.Sprite = new Laya.Sprite();
        public m_frame:Laya.Sprite = new Laya.Sprite();
        public m_bk:Laya.Sprite = new Laya.Sprite();
        public m_icon:Laya.Sprite = new Laya.Sprite();
        public m_info_label:Laya.Sprite = new Laya.Sprite();

        public m_parent:card_ui = null;
        public m_open_tp:number = 0;
        public m_showopening:boolean = false;

        public m_card_id:number = 0;
        public m_card_type:number = 0;
        public m_card_shape:number = 0;
        public m_card_hp:number = 0;
        public m_card_atk:number = 0;
        public m_card_duration:number = 0;
        public m_name:string = "";
        public m_desc:string = "";
        public m_info:string = "";

        constructor(){
            super();
            this.mouseEnabled = true;
            this.addChild(this.m_root);
            this.m_root.pivot(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);
            this.m_root.width = CARD_ITEM_FRAME_W;
            this.m_root.height = CARD_ITEM_FRAME_H;
            this.m_root.pos(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);

        }
        private _is_valid():boolean{
            return this.m_card_id != 0;
        }
        public update_data(cid:number,ctype:number,cshape:number,chp:number,catk:number,cdu:number):void{
            //todo
            this.m_card_id = cid;
            this.m_card_type = ctype;
            this.m_card_shape = cshape;
            this.m_card_atk = catk;
            this.m_card_hp = chp;
            this.m_card_duration = cdu;
            this.del_icon();
            if(this.m_card_shape != 0){
                
                icon_mgr.fastset_item_icon(this.m_card_shape,this.m_icon,this);
                this.show_frame(this.m_card_type);

                if(this.m_card_type == data.CARD_TYPE_ARMOR || this.m_card_type == data.CARD_TYPE_SWORD){
                    this.set_icon_wh(CARD_ITEM_ICON_W,CARD_ITEM_ICON_H);
                }
                else if(this.m_card_type == data.CARD_TYPE_SPELL || this.m_card_type == data.CARD_TYPE_TRAP){
                    this.set_icon_wh(CARD_ITEM_ICON_W,CARD_ITEM_ICON_H);
                }
                else{
                    this.set_icon_wh(CARD_ITEM_ICON_W,CARD_ITEM_ICON_H);
                }
            }
            else{
                this.show_bk();
            }
        }
        public update_info(name:string,desc:string,info:string):void{
            this.m_name = name;
            this.m_desc = desc;
            this.m_info = info;
            //todo
            this.update_draw_info();
        }
        public clear_data():void{
            this.stop_showopen();
            this.clear_img();
            this.del_icon();
            this.m_card_id = 0;

        }
        public register_event():void{
            this.m_root.on(Laya.Event.MOUSE_OVER,this,this.on_over);
            this.m_root.on(Laya.Event.MOUSE_OUT,this,this.on_out);
            
            this.m_root.on(Laya.Event.MOUSE_DOWN,this,this.on_mousedown);
            this.m_root.on(Laya.Event.MOUSE_UP,this,this.on_mouseup);
        }
        public unregister_event():void{
            this.m_root.off(Laya.Event.MOUSE_OVER,this,this.on_over);
            this.m_root.off(Laya.Event.MOUSE_OUT,this,this.on_out);
            this.m_root.off(Laya.Event.MOUSE_DOWN,this,this.on_mousedown);
            this.m_root.off(Laya.Event.MOUSE_UP,this,this.on_mouseup);
        }
        public on_mousedown(ud:any = null):void{
            //core.ui_tiplog("card_item on_mousedown ",this.m_id);
            if(this.m_parent&&this._is_valid()){
                this.m_parent.on_mousedown_card(this.m_id);
            }
        }
        public on_mouseup(ud:any = null):void{
            //core.ui_tiplog("card_item on_mouseup ",this.m_id);
            if(this.m_parent&&this._is_valid()){
                this.m_parent.on_mouseup_card(this.m_id);
            }
        }
        public on_over(ud:any = null):void{
            //core.ui_tiplog("card_item on_over ",this.m_id);
            if(!this._is_valid()){
                return;
            }
            if(this.m_showopening){
                return;
            }
            this.m_root.scale(1.2,1.2);

            if(this.m_parent && this.m_card_id != 0&& this.m_card_shape != 0){
                let x:number = this.x+CARD_ITEM_FRAME_W;
                let y:number = this.y+CARD_ITEM_FRAME_H/2;
                let pt:Laya.Point = new Laya.Point(x,y);
                pt = this.m_parent.m_ui.localToGlobal(pt);
                let nx:number = pt.x - CARD_ITEM_FRAME_W - 360;
                if(pt.x > Laya.stage.designWidth - 360 && nx >= 0){
                    pt.x = nx;
                }
                
                helper.show_float_text_tips(this.m_desc+"\n"+this.m_info,pt.x,pt.y);
            }
        }
        public on_out(ud:any = null):void{
            //core.ui_tiplog("card_item on_out ",this.m_id);
            if(!this._is_valid()){
                return;
            }

            if(this.m_showopening){
                return;
            }
            this.m_root.scale(1.0,1.0);
            if(this.m_parent && this.m_card_id != 0){
                helper.hide_float_text_tips();
            }
        } 
        public show_open(tp:number):void{
            //Laya.Tween.to()
            this.on_out();
            this.m_showopening = true;
            this.m_open_tp = tp;
            this.show_bk();
            Laya.Tween.to(this.m_root,{scaleX:0},100,Laya.Ease.linearIn,laya.utils.Handler.create(this,this.on_showopen_phase1));

        }
        public on_showopen_phase1(ud:any = null):void{
            this.show_frame(this.m_open_tp);
            Laya.Tween.to(this.m_root,{scaleX:1},100,Laya.Ease.linearIn,laya.utils.Handler.create(this,this.on_showopen_phase2));
        }
        public on_showopen_phase2(ud:any = null):void{
            this.stop_showopen();
            this.show_frame(this.m_open_tp);
        }
        public stop_showopen():void{
            this.m_showopening = false;
            Laya.Tween.clearAll(this.m_root);
        }
        public re_init():void{
            this.m_name = "";
            this.m_desc = "";
            this.m_info = "";
            this.m_card_id = 0;
            this.m_card_type = 0;
            this.m_card_shape = 0;
            this.m_card_hp = 0;
            this.m_card_atk = 0;
            this.m_card_duration = 0;
        }
        
        public show_bk():void{
            this.clear_img();
            this.m_frame.graphics.loadImage("card/Cardback01_minmin.png");
            this.m_frame.pivot(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);
            this.m_frame.width = CARD_ITEM_FRAME_W;
            this.m_frame.height = CARD_ITEM_FRAME_H;
            this.m_frame.pos(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);
            
            this.m_root.addChild(this.m_frame);
        }
        public set_icon_wh(w:number,h:number):void{
            this.m_icon.pivot(w/2,h/2);
            this.m_icon.width = w;
            this.m_icon.height = h;
        }
        public show_frame(tp:number):void{
            this.clear_img();
            this.m_root.addChild(this.m_bk);
            this.m_root.addChild(this.m_icon);
            this.m_root.addChild(this.m_frame);
            this.m_root.addChild(this.m_info_label);

            this.m_frame.pivot(CARD_ITEM_FRAMEC_W/2,CARD_ITEM_FRAMEC_H/2);
            this.m_frame.width = CARD_ITEM_FRAMEC_W;
            this.m_frame.height = CARD_ITEM_FRAMEC_H;
            this.m_frame.pos(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);

            this.m_bk.pivot(CARD_ITEM_FRAMEBK_W/2,CARD_ITEM_FRAMEBK_H/2);
            this.m_bk.width = CARD_ITEM_FRAMEBK_W;
            this.m_bk.height = CARD_ITEM_FRAMEBK_H;
            this.m_bk.pos(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);
            
            this.m_icon.pos(CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H/2);
            if(tp == 1){
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv2_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big4_min.png");
            }
            else if(tp == 2){
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv3_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big4_min.png");
            }
            else if(tp == 3){
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv4_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big4_min.png");
            }
            else if(tp == 4){
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv5_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big5_min.png");
            }
            else{
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv1_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big2_min.png");
            }
            this.update_draw_info();
        }
        private update_draw_info():void{
            this.m_info_label.graphics.clear();
            this.m_info_label.graphics.fillBorderText(this.m_name,CARD_ITEM_FRAME_W/2,CARD_ITEM_FRAME_H-40,"20px SimHei","#ffffff","#000000",2,"center");  
            //this.m_info_label.graphics.fillBorderText(this.m_info,CARD_ITEM_FRAME_W-20,40,"20px SimHei","#ffffff","#000000",2,"right");  
        }
        public clear_img():void{
            this.m_root.removeChildren();
            this.m_frame.graphics.clear();
            this.m_bk.graphics.clear();
            this.m_info_label.graphics.clear();
        }
        public del_icon():void{
            icon_mgr.fastdel_icon(this.m_icon);
        }
    }
    export class card_ui extends utils.game_widget {
        private UIins: ui.game.card_mainUI = null;
        private m_card_list:Array<card_item> = new Array<card_item>();
        private m_card_max:number = 16;
        private m_card_linecnt:number = 4;
        private m_card_dx:number = 20;
        private m_card_dy:number = 0;
        private m_card_gap:number = 0;
        private m_card_w:number = CARD_ITEM_FRAME_W;
        private m_card_h:number = CARD_ITEM_FRAME_H;
        private m_card_cls_sign:string = "card_ui_card_item";

        private m_hand_id_start:number = 10000;
        private m_hand_list:Array<card_item> = new Array<card_item>();
        private m_hand_max:number = 5;
        private m_hand_gap:number = 130;

        private m_arror_ani:Laya.Animation = null;
        private m_arror_start:boolean = false;
        private m_start_pt:Laya.Point = new Laya.Point();
        private m_end_pt:Laya.Point = new Laya.Point();
        constructor() {
            super("res/atlas/card.atlas", ui.game.card_mainUI);
            this.m_layer = utils.WIDGET_LAYER.NORMAL;
            let ui_w:number = 720;
            this.m_card_gap = (ui_w - this.m_card_w*this.m_card_linecnt - this.m_card_dx*2)/(this.m_card_linecnt-1);
        }

        public on_init(): void {
        }
        private init_allcard():void{
            this.clear_allcard();
            this.UIins.m_card_sp.width = 720;
            this.UIins.m_card_sp.height = 1280;
            for(let i:number = 0;i < this.m_card_max;++i){
                let citem:card_item = utils.getitembycls(this.m_card_cls_sign,card_item);
                citem.re_init();
                citem.m_parent = this;
                citem.register_event();
                this.UIins.m_card_sp.addChild(citem);
                citem.x = this.m_card_dx + (this.m_card_w+this.m_card_gap)*(i%this.m_card_linecnt);
                citem.y = this.m_card_dy + (this.m_card_h+4)*(Math.ceil(((i+1)/this.m_card_linecnt))-1);
                
                citem.m_id = i;
                this.m_card_list.push(citem);
                citem.clear_data();
            }
        }
        private clear_allcard():void{
            for(let i:number = 0;i < this.m_card_list.length;++i){
                let citem:card_item = this.m_card_list[i];
                citem.clear_data();
                citem.stop_showopen();
                citem.removeSelf();
                citem.m_parent = null;
                citem.unregister_event();
                citem.clear_img();
                citem.del_icon();
                utils.recover(this.m_card_cls_sign,citem);
            }
            this.m_card_list = new Array<card_item>();
        }

        private init_allhand():void{
            this.clear_allhand();
            this.UIins.m_hand_sp.width = 720;
            this.UIins.m_hand_sp.height = 200;
            for(let i:number = 0;i < this.m_hand_max;++i){
                let citem:card_item = utils.getitembycls(this.m_card_cls_sign,card_item);
                citem.re_init();
                citem.m_parent = this;
                
                citem.register_event();
                this.UIins.m_hand_sp.addChild(citem);
                
                citem.x = (this.m_hand_gap)*(i);
                citem.y = 0;
                
                citem.m_id = this.m_hand_id_start+i;
                this.m_hand_list.push(citem);
                citem.clear_data();
            }
        }
        private clear_allhand():void{
            for(let i:number = 0;i < this.m_hand_list.length;++i){
                let citem:card_item = this.m_hand_list[i];
                citem.clear_data();
                citem.stop_showopen();
                citem.removeSelf();
                citem.m_parent = null;
                citem.unregister_event();
                citem.clear_img();
                citem.del_icon();
                utils.recover(this.m_card_cls_sign,citem);
            }
            this.m_hand_list = new Array<card_item>();
        }
        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.card_mainUI;
                this.UIins.m_closebtn.on(Laya.Event.CLICK, this, this.on_click_closebtn);
                this.init_allcard();
                this.init_allhand();
                
                if(!this.m_arror_ani){
                    this.m_arror_ani = new Laya.Animation();
                    this.m_arror_ani.loadAnimation("game_ani/arrow.ani");
                    this.m_arror_ani.play();
                    //this.UIins.addChild(this.m_arror_ani);
                    //this.m_arror_ani.x = 100;
                    //this.m_arror_ani.y = 200;
                }
                this.UIins.on(Laya.Event.MOUSE_DOWN,this,this.on_mousedown);
                this.UIins.on(Laya.Event.MOUSE_UP,this,this.on_mouseup);
                this.UIins.on(Laya.Event.MOUSE_MOVE,this,this.on_mousemove);
                this.register_event(game_event.EVENT_CARD_UPDATEHANDS,this.on_update_hands);
                this.register_event(game_event.EVENT_CARD_UPDATECARDS,this.on_udpate_cards);
                this.on_update_hands();
                this.on_udpate_cards();
            }
            else {
                this.UIins.off(Laya.Event.MOUSE_DOWN,this,this.on_mousedown);
                this.UIins.off(Laya.Event.MOUSE_UP,this,this.on_mouseup);
                this.UIins.off(Laya.Event.MOUSE_MOVE,this,this.on_mousemove);
                if(this.m_arror_ani){
                    this.m_arror_ani.removeSelf();
                    this.m_arror_ani.clear();
                    this.m_arror_ani.destroy();
                    this.m_arror_ani = null;
                }
                this.clear_allcard();
                this.clear_allhand();
                this.UIins.m_closebtn.off(Laya.Event.CLICK, this, this.on_click_closebtn);
                this.unregister_allevent();
                this.UIins = null;
            }
        }
        private on_udpate_cards(ud:any = null):void{
            let cdata:data.card_data = data.get_data(data_enum.DATA_CARD) as data.card_data;
            for(let i:number = 0;i < this.m_card_list.length;++i){
                let citem:card_item = this.m_card_list[i];
                citem.clear_data();
                citem.stop_showopen();
                if(i < cdata.m_cards.length){
                    let hdata:data.card_obj = cdata.m_cards[i];
                    if(hdata.m_id != 0){
                        citem.update_data(hdata.m_id,hdata.m_type,hdata.m_shape,hdata.m_hp,hdata.m_atk,hdata.m_duration);
                        let info:string = this._gen_card_info(hdata.m_type,hdata.m_hp,hdata.m_atk,hdata.m_duration);
                        citem.update_info(hdata.m_name,hdata.m_desc,info);
                    }
                }
            }
        }
        private on_update_hands(ud:any = null):void{
            for(let i:number = 0;i < this.m_hand_list.length;++i){
                let citem:card_item = this.m_hand_list[i];
                citem.clear_data();
                citem.stop_showopen(); 
            }
            let cdata:data.card_data = data.get_data(data_enum.DATA_CARD) as data.card_data;
            for(let i:number = 0;i < cdata.m_hands.length;++i){
                let hdata:data.card_obj = cdata.m_hands[i];
                if(i < this.m_hand_list.length){
                    let citem:card_item = this.m_hand_list[i];
                    citem.update_data(hdata.m_id,hdata.m_type,hdata.m_shape,hdata.m_hp,hdata.m_atk,hdata.m_duration);
                    let info:string = this._gen_card_info(hdata.m_type,hdata.m_hp,hdata.m_atk,hdata.m_duration);
                    citem.update_info(hdata.m_name,hdata.m_desc,info);
                }
            }
        }
        private _gen_card_info(tp:number,hp:number,atk:number,duration:number):string{
            let ret:string = "";
            if(tp == data.CARD_TYPE_MONSTER){
                ret = game.PROP_KEY_MAP["atk"]+":"+atk.toString()+"\n"+game.PROP_KEY_MAP["hp"]+":"+hp.toString();
            }
            else if(tp == data.CARD_TYPE_SWORD){
                ret = game.PROP_KEY_MAP["atk"]+":"+atk.toString()+"\n"+game.PROP_KEY_MAP["dura"]+":"+duration.toString();
            }
            else if(tp == data.CARD_TYPE_ARMOR){
                ret = game.PROP_KEY_MAP["def"]+":"+hp.toString()+"\n"+game.PROP_KEY_MAP["dura"]+":"+duration.toString();
            }
            return ret;
        }
        public on_mouseup_card(card_id:number):void{
            //core.game_tiplog("on_mouseup_card ",card_id);
            //todo
            for(let i:number = 0;i < this.m_card_list.length;++i){
                let citem:card_item = this.m_card_list[i];
                if(citem.m_card_id == card_id){
                    //todo
                    return;
                }
            }
            for(let i:number = 0;i < this.m_hand_list.length;++i){
                let citem:card_item = this.m_hand_list[i];
                if(citem.m_card_id == card_id){
                    //todo
                    return;
                }
            }
        }
        public show_arrow(sx:number,sy:number,dx:number,dy:number):void{
            core.game_tiplog("show_arrow ",sx,sy,dx,dy);
            this.UIins.addChild(this.m_arror_ani);
            let distance:number = Math.sqrt((dx - sx)*(dx - sx)+(dy - sy)*(dy - sy));
            let tan_angle:number = (sy - dy)/(sx - dx);
            let angle:number = Math.atan2(dy-sy,dx-sx)*180/Math.PI;
            //angle = Math.atan(tan_angle)*180/Math.PI;
            core.game_tiplog("angle ",angle);
            let scale_v:number = distance/400;
            this.m_arror_ani.scale(scale_v,1.0);
            this.m_arror_ani.rotation = angle;
            this.m_arror_ani.x = sx + (dx - sx)/2;
            this.m_arror_ani.y = sy + (dy - sy)/2;
            //this.m_arror_ani.x = 100;
            //this.m_arror_ani.y = 200;
        }
        
        private on_mousedown(e:Laya.Event):void{
            //core.game_tiplog("on_mousedown ",e.stageX,e.stageY);
            this.m_start_pt.x = Laya.stage.mouseX;
            this.m_start_pt.y = Laya.stage.mouseY;

            this.m_start_pt = this.UIins.globalToLocal(this.m_start_pt);
            this.m_arror_start = true;
        }
        private on_mousemove(e:Laya.Event):void{
            if(!this.m_arror_start){
                return;
            }
            //core.game_tiplog("on_mousemove ",e.stageX,e.stageY);
            this.m_end_pt.x = Laya.stage.mouseX;
            this.m_end_pt.y = Laya.stage.mouseY;

            this.m_end_pt = this.UIins.globalToLocal(this.m_end_pt);
            this.show_arrow(this.m_start_pt.x,this.m_start_pt.y,this.m_end_pt.x,this.m_end_pt.y);
        }
        private on_mouseup(e:Laya.Event):void{
            this.m_arror_start = false;
            //core.game_tiplog("on_mouseup ",e.target.x,e.target.y);
            this.hide_arrow();

            //helper.show_float_text_tips("12345",Laya.stage.mouseX,Laya.stage.mouseY);
        }
        public hide_arrow():void{
            this.m_arror_ani.removeSelf();
        }
        public on_mousedown_card(card_id:number):void{
            //core.game_tiplog("on_mousedown_card ",card_id);
        }
        private on_click_closebtn(ud:any = null):void{
            this.show(false);
        }

        public on_dispose(): void {
            this.clear_allhand();
            this.clear_allcard();
        }

        public dispose() {
            super.dispose();
        }
    }
}