module core {
    export class renderscene {
        public m_units:Array<renderavatar>;
        public m_units_dict:Object;
        public m_anis:Array<renderani>;
        public m_effs:Array<rendereff>;
        public m_tempeffs:Array<rendereff>;
        public m_sprites:Array<rendersprite>;
        public m_map:rendermap;
        public m_unitpath:Array<path>;
        public m_follow_list:Object;
        constructor(){
            this.m_units = new Array<renderavatar>();
            this.m_units_dict = new Object();
            this.m_anis = new Array<renderani>();
            this.m_effs = new Array<rendereff>();
            this.m_tempeffs = new Array<rendereff>();
            this.m_sprites = new Array<rendersprite>();
            this.m_map = new rendermap();
            this.m_unitpath = new Array<path>();
            this.m_follow_list = new Object();
        }
        public findpath(sx:number,sy:number,dx:number,dy:number,bclosest:boolean,spd:number):path
        {
            return this.m_map.findpath(sx,sy,dx,dy,bclosest,spd);
        }
        public addpath(unit_path:path,unit_id:number):void
        {
            this.delpath(unit_id);
            if(this.getunit(unit_id) == null)
            {
                return;
            }
            unit_path.m_unit_id = unit_id;
            this.m_unitpath.push(unit_path);
        }
        public get_unitpath(unit_id:number):path{
            for(let i of this.m_unitpath){
                if(i.m_unit_id == unit_id){
                    return i;
                }
            }
            return null;
        }
        public delpath(unit_id:number):path
        {
            for(let i:number = 0;i < this.m_unitpath.length;++i)
            {
                let unitpath:path = this.m_unitpath[i];
                if(unitpath.m_unit_id == unit_id)
                {
                    unitpath.dispose();
                    this.m_unitpath.splice(i,1);
                    utils.recover("path",unitpath);
                    return unitpath;
                }
            }
            return null;
        }
        public addunit(name:string,unit:renderavatar):number
        {
            unit.set_name(name);
            this.m_units.push(unit);
            this.m_units_dict[unit.m_obj_id] = unit;
            return unit.m_obj_id;
        }
        public delunit(id:number):renderavatar
        {
            for(let i:number = 0;i < this.m_units.length;++i)
            {
                let unit:renderavatar = this.m_units[i];
                if(unit.m_obj_id == id)
                {
                    delete this.m_units_dict[id];
                    this.delpath(id);
                    unit.dispose();
                    this.m_units.splice(i,1);
                    return unit;
                }
            }
            return null;
        }
        public getunitbyud(ud:any):renderavatar
        {
            for(let i:number = 0;i < this.m_units.length;++i)
            {
                let unit:renderavatar = this.m_units[i];
                if(unit.m_user_data == ud)
                {
                    return unit;
                }
            }
            return null;
        }
        public getunit(id:number):renderavatar
        {
            let obj:renderavatar = this.m_units_dict[id];
            if(obj != undefined)
            {
                return obj;
            }
            return null;
        }
        public setunit_pos(id:number,x:number,y:number):void
        {
            let obj:renderavatar = this.getunit(id);
            if(obj != null)
            {
                obj.set_pos(x,y);
            }
        }
        public setunit_dir(id:number,dir:number):void
        {
            let obj:renderavatar = this.getunit(id);
            if(obj != null)
            {
                obj.change_dir(dir);
            }
        }
        public setunit_action(id:number,action_id:number):void
        {
            let obj:renderavatar = this.getunit(id);
            if(obj != null)
            {
                obj.change_action(action_id);
            }
        }
        public clear():void{
            
        }
        public dispose():void
        {
            if(this.m_sprites != null){
                for(let i of this.m_sprites){
                    i.dispose();
                }
                this.m_sprites = null;
            }
            if(this.m_anis != null)
            {
                for(let i of this.m_anis)
                {
                    i.dispose();
                }
                this.m_anis = null;
            }
            if(this.m_effs != null){
                for(let i of this.m_effs){
                    i.dispose();
                }
                this.m_effs = null;
            }
            if(this.m_units != null)
            {
                for(let i of this.m_units)
                {
                    i.dispose();
                }
                this.m_units = null;
            }
            this.m_units_dict = null;
            if(this.m_map != null)
            {
                this.m_map.dispose();
                this.m_map = null;
            }
            this.m_unitpath = null;
            this.m_follow_list = null;
        }
        public update(delta:number):void
        {
            this.m_map.update(delta);
            for(let i of this.m_units)
            {
                i.update(delta);
            }
            
            for(let i of this.m_anis)
            {
                i.update(delta);
            }
            //for(let i of this.m_sprites)
            //{
            //    i.update(delta);
            //}
            this.m_tempeffs = new Array<rendereff>();
            for(let i of this.m_effs){
                if(i.m_b_end && i.m_b_autodel){
                    i.dispose();
                }
                else{
                    i.update(delta);
                    this.m_tempeffs.push(i);
                }
            }
            this.m_effs = this.m_tempeffs;
            for(let i:number = this.m_unitpath.length - 1;i >= 0;--i)
            {
                let unitpath:path = this.m_unitpath[i];
                unitpath.update(delta);
                let cur_node:pathnode = unitpath.get_cur_pt();
                //core.core_tiplog("unit walk ",unitpath.m_unit_id,cur_node.x,cur_node.y);
                this.setunit_pos(unitpath.m_unit_id,cur_node.x,cur_node.y);
                this.setunit_dir(unitpath.m_unit_id,cur_node.m_dir);
                if(unitpath.is_end())
                {
                    this.setunit_action(unitpath.m_unit_id,AVATAR_ACTON.ACTION_STAND);
                    unitpath.dispose();
                    this.m_unitpath.splice(i,1);
                }
            }
        }
        public project(context:rendercontext):void
        {
            this.m_map.project(context);
            for(let i of this.m_units)
            {
                i.project(context);
            }
            for(let i of this.m_anis)
            {
                i.project(context);
            }
            for(let i of this.m_sprites){
                i.project(context);
            }
            for(let i of this.m_effs){
                i.project(context);
            }
        }
    }
}