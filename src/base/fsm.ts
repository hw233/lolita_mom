module fsm{
    export class fsm_state_base{
        public m_start_id:number = 0;
        public m_event_id:number = 0;
        public m_end_id:number = 0;
        public m_desc:string = "unknown state";
        public m_caller:any = null;
        public m_func:Function = null;
        constructor(){

        }
        public re_init(sid:number,e:number,eid:number,desc:string,caller:any,func:Function):void{
            this.m_start_id = sid;
            this.m_event_id = e;
            this.m_end_id = eid;
            this.m_desc = desc;
            this.m_caller = caller;
            this.m_func = func;
        }
        public dispose():void{
            this.m_caller = null;
            this.m_func = null;
        }
    }
    export class fsm_base {
        public m_cur_state:number = 0;
        public m_fsm_group:Object = new Object();
        constructor(){
        }
        private _genkey(sid:number,e:number):number{
            return sid*10000+e;
        }
        public set_state(sid:number,e:number,eid:number,desc:string,caller:any,func:Function):void{
            let key:number = this._genkey(sid,e);
            let new_state:fsm_state_base = utils.getitembycls("fsm_state_base",fsm_state_base);
            new_state.re_init(sid,e,eid,desc,caller,func);
            this.m_fsm_group[key] = new_state;
        }
        public clear_state():void{
            for(let key of Object.keys(this.m_fsm_group)){
                if(this.m_fsm_group.hasOwnProperty(key)){
                    let s:fsm_state_base = this.m_fsm_group[parseInt(key)];
                    utils.recover("fsm_state_base",s);
                }
            }
            this.m_fsm_group = new Object();
            this.m_cur_state = 0;
        }
        public start(sid:number):void{
            this.m_cur_state = sid;
        }
        public next(e:number,...args):number{
            let key:number = this._genkey(this.m_cur_state,e);
            let state:fsm_state_base = this.m_fsm_group[key];
            while(state != null){
                let next_state = state.m_end_id;
                let ret:boolean = true;
                if(state.m_func != null){
                    ret = state.m_func.apply(this,args);
                }
                if(ret){
                    this.m_cur_state = next_state;
                }
                return this.m_cur_state;
            }
            return -1;
        }
        public dispose(){
            this.clear_state();
        }
    }
}