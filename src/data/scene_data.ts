module data{
    export class scene_role_data{
        public m_name:string = "";
        public m_pid:number = 0;
        public m_shape:number = 0;
        public m_lv:number = 0;
        public m_class:number = 0;
        public m_desc:Laya.Byte = null;
        public x:number = 0;
        public y:number = 0;
        public m_role_id = 0;
        // public m_fairy_role_id:number = 0;
        public m_status:number = 0;
        constructor(id:number,shape:number,name:string,lv:number,cls:number,x:number,y:number,desc:Laya.Byte = null)
        {
            this.m_pid = id;
            this.m_shape = shape;
            this.m_name = name;
            this.m_lv = lv;
            this.m_class = cls;
            this.x = x;
            this.y = y;
            this.m_desc = desc;
        }
        public set_pos(x:number,y:number):void
        {
            this.x = x;
            this.y = y;
        }
        public set_role_id(id:number):void
        {
            this.m_role_id = id;
        }
        // public set_fairy_role_id(id:number):void
        // {
        //     this.m_fairy_role_id = id;
        // }
        // public get_fairy_role_id():number
        // {
        //     return this.m_fairy_role_id;
        // }
        public set_status(status:number):void
        {
            this.m_status = status;
        }
        public get_status():number
        {
            return this.m_status;
        }
    }
    export class scene_role_mgr{
        public m_role_list:Array<scene_role_data> = new Array<scene_role_data>();
        constructor()
        {
        }
        public addrole(id:number,shape:number,name:string,lv:number,cls:number,x:number,y:number,desc:Laya.Byte):void
        {
            let newrole:scene_role_data = new scene_role_data(id,shape,name,lv,cls,x,y,desc);
            this.m_role_list.push(newrole);
        }
        public getrole(id:number):scene_role_data
        {
            for(let i of this.m_role_list)
            {
                if(i.m_pid == id)
                {
                    return i;
                }
            }
            return null;
        }
        public getrolebyroleid(role_id:number):scene_role_data
        {
            for(let i of this.m_role_list)
            {
                if(i.m_role_id == role_id)
                {
                    return i;
                }
            }
            return null;
        }
        public setroleid(id:number,role_id:number):void
        {
            let role:scene_role_data = this.getrole(id);
            if(role != null)
            {
                role.set_role_id(role_id);
            }
        }
        public setrole_pos(id:number,x:number,y:number):void
        {
            let role:scene_role_data = this.getrole(id);
            if(role != null)
            {
                role.set_pos(x,y);
            }
        }
        public delrole(id:number):void
        {
            for(let i:number = 0;i < this.m_role_list.length;++i)
            {
                let role:scene_role_data = this.m_role_list[i];
                if(role.m_pid == id)
                {
                    this.m_role_list.splice(i,1);
                    return
                }
            }
        }
        public clearallrole():void
        {
            this.m_role_list = new Array<scene_role_data>();
        }
        public get_scene_role_amount():number{
            return this.m_role_list.length;
        }
        public get_scene_role_arr():Array<scene_role_data>{
            return this.m_role_list;
        }
        public dispose()
        {
            this.clearallrole();
        }
    }
    export class scene_data extends utils.game_data{
        public m_role_mgr:scene_role_mgr = new scene_role_mgr();
        public m_npc_mgr:scene_role_mgr = new scene_role_mgr();
        public m_cli_npc_mgr:scene_role_mgr = new scene_role_mgr();
        constructor()
        {
            super();
        }
        public addrole(id:number,shape:number,name:string,lv:number,cls:number,x:number,y:number,desc:Laya.Byte):void
        {
            return this.m_role_mgr.addrole(id,shape,name,lv,cls,x,y,desc);
        }
        public getrole(id:number):scene_role_data
        {
            return this.m_role_mgr.getrole(id);
        }
        public getrolebyroleid(role_id:number):scene_role_data
        {
            return this.m_role_mgr.getrolebyroleid(role_id);
        }
        public setroleid(id:number,role_id:number):void
        {
            return this.m_role_mgr.setroleid(id,role_id);
        }
        public setrole_pos(id:number,x:number,y:number):void
        {
            return this.m_role_mgr.setrole_pos(id,x,y);
        }
        public delrole(id:number):void
        {
            return this.m_role_mgr.delrole(id);
        }
        public clearallrole():void
        {
            return this.m_role_mgr.clearallrole();
        }
        public get_scene_role_amount():number
        {
            return this.m_role_mgr.get_scene_role_amount();
        }
        public get_scene_role_arr():Array<scene_role_data>
        {
            return this.m_role_mgr.get_scene_role_arr();
        }
        //npc start
        public addnpc(id:number,shape:number,name:string,lv:number,cls:number,x:number,y:number,desc:Laya.Byte):void
        {
            return this.m_npc_mgr.addrole(id,shape,name,lv,cls,x,y,desc);
        }
        public getnpc(id:number):scene_role_data
        {
            return this.m_npc_mgr.getrole(id);
        }
        public getnpcbyroleid(role_id:number):scene_role_data
        {
            return this.m_npc_mgr.getrolebyroleid(role_id);
        }
        public setnpcid(id:number,role_id:number):void
        {
            return this.m_npc_mgr.setroleid(id,role_id);
        }
        public setnpc_pos(id:number,x:number,y:number):void
        {
            return this.m_npc_mgr.setrole_pos(id,x,y);
        }
        public delnpc(id:number):void
        {
            return this.m_npc_mgr.delrole(id);
        }
        public clearallnpc():void
        {
            return this.m_npc_mgr.clearallrole();
        }
        //npc end

        //client npc start
        public add_cli_npc(id:number,shape:number,name:string,lv:number,cls:number,x:number,y:number,desc:Laya.Byte):void
        {
            return this.m_cli_npc_mgr.addrole(id,shape,name,lv,cls,x,y,desc);
        }
        public get_cli_npc(id:number):scene_role_data
        {
            return this.m_cli_npc_mgr.getrole(id);
        }
        public get_cli_npc_by_role_id(role_id:number):scene_role_data
        {
            return this.m_cli_npc_mgr.getrolebyroleid(role_id);
        }
        public set_cli_npcid(id:number,role_id:number):void
        {
            return this.m_cli_npc_mgr.setroleid(id,role_id);
        }
        public set_cli_npc_pos(id:number,x:number,y:number):void
        {
            return this.m_cli_npc_mgr.setrole_pos(id,x,y);
        }
        public del_cli_npc(id:number):void
        {
            return this.m_cli_npc_mgr.delrole(id);
        }
        public clear_all_cli_npc():void
        {
            return this.m_cli_npc_mgr.clearallrole();
        }
        //client npc end
        public dispose()
        {
            this.m_role_mgr.dispose();
            this.m_npc_mgr.dispose();
            this.m_cli_npc_mgr.dispose();
            super.dispose();
        }
    }
}