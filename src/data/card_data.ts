module data{
    export let CARD_TYPE_MONSTER:number = 0;
    export let CARD_TYPE_SWORD:number = 1;
    export let CARD_TYPE_SPELL:number = 2;
    export let CARD_TYPE_TRAP:number = 3;
    export let CARD_TYPE_ARMOR:number = 4;
    export class card_obj{
        public m_id:number = 0;
        public m_shape:number = 0;
        public m_atk:number = 0;
        public m_hp:number = 0;
        public m_duration:number = 0;
        public m_name:string = "";
        public m_desc:string = "";
        public m_iconid:number = 0;
        public m_type:number = 0;
        constructor(){

        }
        public re_init():void{

        }
        public dispose():void{

        }
    }
    export class card_data extends utils.game_data{
        public m_cards:Array<card_obj> = new Array<card_obj>();
        public m_hands:Array<card_obj> = new Array<card_obj>();
        public m_cards_map:Object = new Object();
        public m_cards_map_count:number = 0;

        public m_hp:number = 0;
        public m_stamina:number = 0;
        public m_armor:number = 0;
        public m_atk:number = 0;
        public m_exp:number = 0;
        public m_dlv:number = 0;
        public m_clv:number = 0;
        public m_hpmax:number = 0;
        public m_staminamax:number = 0;

        constructor()
        {
            super();
        }
        public clear_hands():void{
            for(let i of this.m_hands){
                i.dispose();
                this._recover_card_obj(i);
            }
            this.m_hands = new Array<card_obj>();
        }
        public clear_cards():void{
            for(let i of this.m_cards){
                i.dispose();
                this._recover_card_obj(i);
            }
            this.m_cards = new Array<card_obj>();
        }
        private _gen_card_obj():card_obj{
            let obj:card_obj = utils.getitembycls("card_data_card_obj",card_obj);
            obj.re_init();
            return obj;
        }
        private _recover_card_obj(obj:card_obj):void{
            utils.recover("card_data_card_obj",obj);
        }
        private _gen_card_cfg(shape:number,c:card_obj):void{
            let c_cfg:Object = config.Cards.get_Cards(shape);
            if(c_cfg == null){
                return;
            }
            let tp:number = c_cfg["type"];
            let cshape:number = c_cfg["shape"];
            let name:string = c_cfg["name"];
            let desc:string = c_cfg["desc"];
            c.m_name = name;
            c.m_desc = desc;
            c.m_iconid = cshape;
            c.m_type = c_cfg["type"];
        }
        public add_hands(id:number,shape:number,atk:number,hp:number,duration:number):void{
            let c:card_obj = this._gen_card_obj();
            c.m_id = id;
            c.m_shape = shape;
            c.m_atk = atk;
            c.m_hp = hp;
            c.m_duration = duration;
            this._gen_card_cfg(shape,c);
            this.m_hands.push(c);
        }
        public open_card(id:number,shape:number):Boolean{
            for(let i:number = 0;i < this.m_cards.length;++i){
                let c:card_obj = this.m_cards[i];
                if(c.m_id == id){
                    c.m_shape = shape;
                    this._gen_card_cfg(shape,c);
                    return true;
                }
            }
            return false;
        }
        public update_cardsorhands(id:number,shape:number,atk:number,hp:number,duration:number):Boolean{
            for(let i:number = 0;i < this.m_hands.length;++i){
                let c:card_obj = this.m_hands[i];
                if(c.m_id == id){
                    c.m_shape = shape;
                    c.m_atk = atk;
                    c.m_hp = hp;
                    c.m_duration = duration;
                    this._gen_card_cfg(shape,c);
                    return true;
                }
            }
            for(let i:number = 0;i > this.m_cards.length;++i){
                let c:card_obj = this.m_cards[i];
                if(c.m_id == id){
                    c.m_shape = shape;
                    c.m_atk = atk;
                    c.m_hp = hp;
                    c.m_duration = duration;
                    this._gen_card_cfg(shape,c);
                    return true;
                }
            }
            return false;
        }
        public del_cards(id:number):Boolean{
            for(let i:number = 0;i < this.m_cards.length; ++i){
                let c:card_obj = this.m_cards[i];
                if(c.m_id == id){
                    delete this.m_cards_map[id];
                    c.m_id = 0;
                    c.m_shape = 0;
                    return true;
                }
            }
            return false;
        }
        public del_hands(id:number):Boolean{
            for(let i:number = 0;i < this.m_hands.length; ++i){
                let c:card_obj = this.m_hands[i];
                if(c.m_id == id){
                    this._recover_card_obj(c);
                    this.m_hands.splice(i,1);
                    return true;
                }
            }
            return false;
        }
        public reset_map():void{
            this.m_cards_map = new Object();
            this.m_cards_map_count = 0;
        }
        public get_card_data(id:number):card_obj{
            for(let i:number = 0;i < this.m_hands.length; ++i){
                let c:card_obj = this.m_hands[i];
                if(c.m_id == id){
                    return c;
                }
            }
            for(let i:number = 0;i < this.m_cards.length; ++i){
                let c:card_obj = this.m_cards[i];
                if(c.m_id == id){
                    return c;
                }
            }
        }
        public update_cards(idlist:Array<number>,shapelist:Array<number>,atklist:Array<number>,hplist:Array<number>,durationlist:Array<number>):void{
            if(this.m_cards.length <= 0){
                for(let i:number = 0;i < idlist.length;++i){
                    let c:card_obj = this._gen_card_obj();
                    c.m_id = idlist[i];
                    c.m_shape = shapelist[i];
                    c.m_atk = atklist[i];
                    c.m_hp = hplist[i];
                    c.m_duration = durationlist[i];
                    this._gen_card_cfg(c.m_shape,c);
                    this.m_cards.push(c);
                    this.m_cards_map[c.m_id] = c;
                    this.m_cards_map_count += 1;
                }
            }
            else{
                for(let i:number = 0;i < idlist.length;++i){
                    let id:number = idlist[i];
                    if(this.m_cards_map.hasOwnProperty(id.toString())){
                        this.m_cards_map[id].m_shape = shapelist[i];
                        this.m_cards_map[id].m_atk = atklist[i];
                        this.m_cards_map[id].m_hp = hplist[i];
                        this.m_cards_map[id].m_duration = durationlist[i];
                        this._gen_card_cfg(this.m_cards_map[id].m_shape,this.m_cards_map[id]);
                    }
                    
                }
            }
        }
        public dispose():void
        {
            super.dispose();
        }
    }
}