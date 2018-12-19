module combat{
    function player_sort(a,b){
        return a.m_sortnum - b.m_sortnum;//a - b small 2 big;b - a big 2 small
    }
    export class combat_playernode{
        public m_tm:number = 0;
        public m_idx:number = 0;
        public m_sortnum:number = 0;
        public m_event:string = "";
        public m_ud:any = null;
        public m_mgr:combatimpl;
        constructor(tm:number,event:string,user_data:any,mgr:combatimpl){
            this.m_tm = tm;
            this.m_event = event;
            this.m_ud = user_data;
            this.m_mgr = mgr;
        }
        public set_idx(idx:number):void{
            this.m_idx = idx;
            this.m_sortnum = this.m_tm + this.m_idx*1.0/100.0;
        }
        public do(tm:number):boolean{
            if(tm < this.m_tm){
                return false;
            }
            this.m_mgr.fire_event(this.m_event,this.m_ud);
            return true;
        }
    }
    export class combat_player{
        public m_arr:Array<combat_playernode> = new Array<combat_playernode>();
        private m_b_end:boolean = false;
        private m_cur_tm:number = 0;
        private m_cur_idx:number = 0;
        private m_max_idx:number = 0;
        constructor(){

        }
        public addnode(node:combat_playernode):void{
            node.set_idx(this.m_arr.length);
            this.m_arr.push(node);
        }
        public start():void{
            this.m_arr.sort(player_sort);
            this.m_cur_tm = 0;
            this.m_cur_idx = 0;
            this.m_max_idx = this.m_arr.length;
            this.m_b_end = false;
        }
        public clear():void{
            this.m_arr = new Array<combat_playernode>();
            this.m_b_end = true;
        }
        public is_end():boolean{
            return this.m_b_end;
        }
        public update(delta:number):void{
            if(this.is_end()){
                return;
            }
            this.m_cur_tm = this.m_cur_tm + delta;
            for(let i:number = this.m_cur_idx;i < this.m_max_idx;++i)
            {
                let node:combat_playernode = this.m_arr[i];
                if(node.do(this.m_cur_tm) == false){
                    this.m_cur_idx = i;
                    return;
                }
            }
            this.m_b_end = true;
        }
    }
}
