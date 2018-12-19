module utils{
    export class game_module extends game_event_receiver{
        constructor()
        {
            super();
        }
        protected register_net_event(cmd:number,func:Function):void{
            let event:string = game_event.gen_netcmd_event(cmd);
            event_ins().register_event(event,this);
            this.register_event_func(event,func);
        }
        protected unregister_net_event(cmd:number):void
        {
            let event:string = game_event.gen_netcmd_event(cmd);
            event_ins().unregister_event(event,this);
            this.unregister_event_func(event);
        }
        public register_event(event:string,func:Function):void
        {
            event_ins().register_event(event,this);
            this.register_event_func(event,func);
        }
        public unregister_event(event:string):void
        {
            event_ins().unregister_event(event,this);
            this.unregister_event_func(event);
        }
        public fire_event(event:string,user_data:any = null):void
        {
            event_ins().fire_event(event,user_data);
        }
        public unregister_allevent():void
        {
            event_ins().unregister_allevent(this);
            this.unregister_all_event_func();
        }
        public fire_event_next_frame(event:string,user_data = null):void
        {
            event_ins().fire_event_next_frame(event,user_data);
        }
        public start():void
        {

        }
        public update(delta:number):void
        {

        }
        public dispose()
        {
            super.dispose();
            this.unregister_allevent();
        }
    }
}