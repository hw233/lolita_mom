module utils{
    export class game_module_mgr{
        private m_module_class_map:Object = new Object();
        private m_module_map:Object = new Object();
        constructor()
        {

        }
        public register_module(name:string,module_cls:any):void
        {
            this.m_module_class_map[name] = module_cls;
        }
        public get_module(name:string):game_module
        {
            if(this.m_module_map.hasOwnProperty(name))
            {
                return this.m_module_map[name];
            }
            if(this.m_module_class_map.hasOwnProperty(name))
            {
                let m_cls = this.m_module_class_map[name];
                let m:game_module = new m_cls();
                this.m_module_map[name] = m;
                return m;
            }
            return null;
        }
        public dispose()
        {
            this.m_module_class_map = new Object();
            for(let i of Object.keys(this.m_module_map))
            {
                let m:game_module_mgr = this.m_module_map[i];
                m.dispose();
            }
            this.m_module_map = new Object();
        }
    }

    let g_ins:game_module_mgr = null;
    export function module_ins():game_module_mgr
    {
        if(g_ins == null)
        {
            g_ins = new game_module_mgr();
        }
        return g_ins;
    }
}