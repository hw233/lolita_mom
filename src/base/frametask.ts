module frametask{
    function task_comp(a:any,b:any):number{
        if(a.m_weight > b.m_weight){
            return 1;
        }
        return 0;
    }
    class task{
        public m_caller:any = null;
        public m_func:Function = null;
        private m_max_weight:number = 0;
        public m_id:number = 0;
        public m_weight:number = 0;
        constructor(c:any,f:Function,weight:number,id:number){
            this.m_caller = c;
            this.m_func = f;
            this.m_max_weight = weight;
            this.m_weight = this.m_max_weight;
            this.m_id = id;
        }
        public run(delta:number):void{
            if(this.m_weight > 0 && delta < 0){
                this.m_weight -= 1;
                return;
            }
            this.m_func.apply(this.m_caller);
            this.m_weight = this.m_max_weight;
        }
    }
    class task_mgr{
        private m_tlist:Array<task> = new Array<task>();
        private m_task_count:number = 0;
        constructor(){

        }
        private sort():void{
            this.m_tlist.sort(task_comp);
        }
        public run(delta:number):void{
            let start_time:number = laya.utils.Browser.now();
            let cur_time:number;
            this.sort();
            for(let i of this.m_tlist){
                cur_time = laya.utils.Browser.now();
                delta = delta + start_time - cur_time;
                start_time = cur_time;
                i.run(delta);
            }
        }
        public add_task(caller:any,call_func:Function,weight:number = 1):void{
            this.del_task(caller,call_func);
            this.m_tlist.push(new task(caller,call_func,weight,this.m_task_count));
            this.m_task_count += 1;
        }
        public del_task(caller:any,call_func:Function):void{
            for(let i:number = this.m_tlist.length - 1;i >= 0;--i){
                if(this.m_tlist[i].m_caller == caller && this.m_tlist[i].m_func == call_func){
                    this.m_tlist.splice(i,1);
                }
            }
        }
    }
    let g_task_ins:task_mgr = null;
    function ins():task_mgr{
        if(g_task_ins == null){
            g_task_ins = new task_mgr();
        }
        return g_task_ins;
    }
    export function add_task(caller:any,call_func:Function,weight:number = 1):void{
        ins().add_task(caller,call_func,weight);
    }
    export function del_task(caller:any,call_func:Function):void{
        ins().del_task(caller,call_func);
    }
    export function run(delta:number):void{
        ins().run(delta);
    }
}