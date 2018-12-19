module timer{
    class Timer{
        public id:number = 0;
        public interval:number = 0;
        public trigger_ms_timestamp:number = 0;
        public caller:any = null;
        public callback_func:Function = null;
    }

    class timer_mgr{
        private cur_id:number = 0;
        private timer_dict = new Laya.Dictionary(); //{id:Timer}
        private caller_dict = new Laya.Dictionary(); //{caller:[id,...]}

        public add_timer(interval:number, caller:any, callback_func:Function):number
        {
            let tid_arr:Array<number> = this.caller_dict.get(caller);
            if (tid_arr)
            {
                for (let tid of tid_arr)
                {
                    let timer:Timer = this.timer_dict.get(tid);
                    if (timer && timer.callback_func == callback_func)
                    {
                        core.game_tiplog("WARNING:timer_mgr add_timer repeat, id:",tid);
                        return tid;
                    }
                }
            }

            let timer = new Timer();
            let new_id:number = this._get_next_id();
            timer.id = new_id;
            timer.interval = interval;
            timer.trigger_ms_timestamp = laya.utils.Browser.now();
            timer.caller = caller;
            timer.callback_func = callback_func;
            this.timer_dict.set(new_id, timer);
            if (tid_arr == null)
                tid_arr = new Array<number>();
            tid_arr.push(new_id);
            this.caller_dict.set(caller, tid_arr);
            return new_id;
        }

        private _get_next_id():number
        {
            this.cur_id += 1;
            return this.cur_id;
        }

        public remove_timer(t_id:number):void
        {
            let timer:Timer = this.timer_dict.get(t_id);
            if (timer)
            {
                let tid_arr:Array<number> = this.caller_dict.get(timer.caller);
                if (tid_arr)
                {
                    let idx:number = tid_arr.indexOf(t_id);
                    if (idx >= 0)
                        tid_arr.splice(idx, 1);
                    if (tid_arr.length == 0)
                        this.caller_dict.remove(timer.caller);
                    else
                        this.caller_dict.set(timer.caller, tid_arr);
                }
            }
            this.timer_dict.remove(t_id);
        }

        public remove_all_timer(caller:any):void
        {
            let tid_arr:Array<number> = this.caller_dict.get(caller);
            if (tid_arr)
            {
                for (let tid of tid_arr)
                    this.timer_dict.remove(tid);
                this.caller_dict.remove(caller);
            }
        }

        public update(cur_ms_timestamp:number):void
        {
            let timer_ins:Timer;
            let triger_list = new Array<Timer>();
            for (timer_ins of this.timer_dict.values)
            {
                if (timer_ins.trigger_ms_timestamp < cur_ms_timestamp)
                {
                    timer_ins.trigger_ms_timestamp += timer_ins.interval;
                    triger_list.push(timer_ins);
                }
            }
            for (timer_ins of triger_list)
            {
                if (timer_ins && timer_ins.caller && timer_ins.callback_func)
                    timer_ins.callback_func.apply(timer_ins.caller);
            }
        }
    }

    let g_timer_mgr:timer_mgr = null;
    export function timer_ins():timer_mgr{
        if(g_timer_mgr == null){
            g_timer_mgr = new timer_mgr();
        }
        return g_timer_mgr;
    }
}