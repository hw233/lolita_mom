module utils{
    export class game_event_receiver{
        protected m_event_func:Object = new Object();
        constructor()
        {

        }
        protected register_event_func(event:string,func:Function):void{
            this.m_event_func[event] = func;
            return;
        }
        protected unregister_event_func(event:string):void{
            if(this.m_event_func.hasOwnProperty(event))
            {
                delete this.m_event_func[event];
            }
        }
        
        protected unregister_all_event_func():void{
            this.m_event_func = new Object();
        }
        public on_event(event:string,user_data:any = null):void {
            if(this.m_event_func.hasOwnProperty(event))
            {
                let func:Function = this.m_event_func[event];
                func.apply(this,[user_data]);
            }
            return;
        }
        public dispose():void
        {
            this.unregister_all_event_func();
        }
    }
    export class game_event_dispatcher{
        private m_pause:boolean = false;
        private m_handler_map:Object = new Object();
        private m_handler_next_frame_map:Object = new Object();
        constructor()
        {

        }
        public pause():void
        {
            this.m_pause = true;
        }
        public resume():void
        {
            this.m_pause = false;
        }
        public register_event(event:string,hander:game_event_receiver):void
        {
            if(this.m_handler_map.hasOwnProperty(event) == false)
            {
                this.m_handler_map[event] = new Array<game_event_receiver>();
            }
            let arr:Array<game_event_receiver> = this.m_handler_map[event];
            if(arr.indexOf(hander) < 0)
            {
                arr.push(hander);
            }
        }
        public unregister_event(event:string,hander:game_event_receiver):void
        {
            if(this.m_handler_map.hasOwnProperty(event))
            {
                let arr:Array<game_event_receiver> = this.m_handler_map[event];
                let idx:number = arr.indexOf(hander);
                if(idx >= 0)
                {
                    arr.splice(idx,1);
                }
            }
        }
        public unregister_allevent(hander:game_event_receiver):void
        {
            for(let i in this.m_handler_map)
            {
                if(this.m_handler_map.hasOwnProperty(i))
                {
                    this.unregister_event(i,hander);
                }
            }
        }
        public fire_event(event:string,user_data:any = null):void
        {
            if(this.m_handler_map.hasOwnProperty(event))
            {
                let arr:Array<game_event_receiver> = this.m_handler_map[event];
                for(let i of arr)
                {
                    i.on_event(event,user_data);
                }
            }
        }
        public fire_event_next_frame(event:string,user_data = null):void
        {
            this.m_handler_next_frame_map[event] = user_data;
        }
        public dispatch_all_delay_event():void
        {
            if(this.m_pause)
            {
                return;
            }
            let tmpmap:Object = this.m_handler_next_frame_map;
            this.m_handler_next_frame_map = new Object();
            for(let prop of Object.keys(tmpmap))
            {
                this.fire_event(prop,tmpmap[prop]);
                //delete tmpmap[prop];
                //if(this.m_pause)
                //{
                 //   return;
                //}
            }
            
        }
        public dispose():void
        {
            this.m_handler_map = new Object();
            this.m_handler_next_frame_map = new Object();
        }
    }
    let g_event_ins:game_event_dispatcher = null;
    export function event_ins():game_event_dispatcher
    {
        if(g_event_ins == null)
        {
            g_event_ins = new game_event_dispatcher();
        }
        return g_event_ins;
    } 
}