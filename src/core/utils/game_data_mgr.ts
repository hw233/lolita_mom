module utils{
    export class game_data_mgr{
        private m_data_class_map:Object = new Object();
        private m_data_map:Object = new Object();
        constructor()
        {

        }
        public register_data(name:string,module_cls:any):void
        {
            this.m_data_class_map[name] = module_cls;
        }
        public get_data(name:string):game_data
        {
            if(this.m_data_map.hasOwnProperty(name))
            {
                return this.m_data_map[name];
            }
            if(this.m_data_class_map.hasOwnProperty(name))
            {
                let m_cls = this.m_data_class_map[name];
                let m:game_data = new m_cls();
                this.m_data_map[name] = m;
                return m;
            }
            return null;
        }
        public dispose()
        {
            this.m_data_class_map = new Object();
            for(let i of Object.keys(this.m_data_map))
            {
                let m:game_data_mgr = this.m_data_map[i];
                m.dispose();
            }
            this.m_data_map = new Object();
        }
    }

    let g_ins:game_data_mgr = null;
    export function data_ins():game_data_mgr
    {
        if(g_ins == null)
        {
            g_ins = new game_data_mgr();
        }
        return g_ins;
    }
}