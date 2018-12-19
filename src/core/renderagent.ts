module core {
    export class renderagent {
        public m_render:renderimpl;
        public m_update_follow_tm:number = 0;
        constructor(){
            this.m_render = new renderimpl();
        }
        public set_avatar_config(conf:any):void{
            matinfo_mgr().set_avatar_config(conf);
        }
        public set_map_config(conf:any):void{
            matinfo_mgr().set_map_config(conf);
        }
        public set_ani_config(conf:any):void{
            matinfo_mgr().set_ani_config(conf);
        }
        public set_eff_config(conf:any):void{
            matinfo_mgr().set_eff_config(conf);
        }

        public initstage(sp:laya.display.Sprite):void
        {
            this.m_render.initstage(sp);
        }
        public check_point(x:number,y:number):number{
            return this.m_render.check_click(x,y);
        }
        public blackscene(tm:number):void{
            this.m_render.m_view.blackscreen(tm);
        }
        public setcamerapos(x:number,y:number,force:boolean = true):void
        {
            this.m_render.setcamerapos(x,y,force);
        }
        public cameralookat(unit:renderavatar):void
        {
            this.m_render.set_eye(unit);
        }
        public setviewport(w:number,h:number):void
        {
            this.m_render.setviewport(w,h);
        }
        public update(delta:number):void
        {
            this.m_render.update(delta);
            this.m_update_follow_tm += delta;
            if(this.m_update_follow_tm > 500){
                this.update_follow_pos();
                this.m_update_follow_tm = 0;
            }
        }
        public render():void
        {
            this.m_render.render();
        }
        public dispose():void
        {
            if(this.m_render != null)
            {
                this.m_render.dispose();
                this.m_render = null;
            }
        }
        public clear():void{
            this.m_render.m_scene.m_map.clear();
            this.delallani();
            this.delalleff();
            this.delallsprite();
            this.delallunit();
        }
        public check_release():void{
            mat_mgr().check_release();
        }
        public preload_matres(res:string,extrares:string = "",types:string = ""):void{
            mat_mgr().preload_mat(res,extrares,types);
        }
        public clearmap():void{
            this.m_render.m_scene.m_map.clear();
        }
        public clearmapslotcache():void{
            mat_mgr().clearallmapslot();
        }
        public set_map_filter(f:Array<any>):void{
            this.m_render.m_view.m_mapView.filters = f;
        }
        public show_map_mask(flag:boolean,alpha:number = 0.3):void{
            this.m_render.m_view.show_map_mask(flag,alpha);
        }
        public setmapbk(res:string):void
        {
            this.m_render.m_scene.m_map.setbk(res);
        }
        public addmapscrollbk(res:string,w:number,h:number):void{
            this.m_render.m_scene.m_map.addscrollbk(res,w,h);
        }
        public setmapscrollbkpos(x:number,y:number):void{
            this.m_render.m_scene.m_map.setscrollbkpos(x,y);
        }
        public setmapscrollbkview(w:number,h:number):void{
            this.m_render.m_scene.m_map.setscrollbkview(w,h);
        }
        public setmapscrollbkspd(spd:number):void{
            this.m_render.m_scene.m_map.setscrollbkspd(spd);
        }
        public clearmapscrollbk():void{
            this.m_render.m_scene.m_map.clearscrollbk();
        }
        public setmapbksp(sp:Laya.Sprite):void{
            this.m_render.m_scene.m_map.setsp(sp);
        }
        public clearmapbksp():void{
            this.m_render.m_scene.m_map.removesp();
        }
        public stagepos2worldpos(pos:laya.maths.Point):laya.maths.Point
        {
            return new laya.maths.Point(pos.x+this.m_render.m_camera.m_viewport.x,pos.y+this.m_render.m_camera.m_viewport.y);
        }
        public worldpos2stagepos(pos:laya.maths.Point):laya.maths.Point
        {
            return new laya.maths.Point(pos.x-this.m_render.m_camera.m_viewport.x,pos.y-this.m_render.m_camera.m_viewport.y);
        }
        public entermap(mapid:number,b_slot:boolean = true):void
        {
            this.m_render.m_scene.m_map.setmapid(mapid,b_slot);
            this.m_render.setworldwh(this.m_render.m_scene.m_map.m_mapw,this.m_render.m_scene.m_map.m_maph);
        }
        
        public addani(aniid:number,x:number,y:number,underunit:boolean = true):number
        {
            //need code objects pool
            let ani:renderani = this.m_render._get_renderani_ins(aniid,x,y,underunit);
            this.m_render.m_scene.m_anis.push(ani);
            return ani.m_obj_id;
        }
        public delani(objid:number):void{
            let idx:number = 0;
            for(let i of this.m_render.m_scene.m_anis){
                if(i.m_obj_id == objid){
                    i.dispose();
                    this.m_render.m_scene.m_anis.splice(idx,1);
                    this.m_render._del_renderani_ins(i);
                    return;
                }
                idx++;
            }
        }
        public delallani():void{
            for(let i of this.m_render.m_scene.m_anis){
                i.dispose();
                this.m_render._del_renderani_ins(i);
            }
            this.m_render.m_scene.m_anis = new Array<renderani>();
        }
        public addsprite(sp:renderspcontent,x:number,y:number,b_unit_front:boolean = true):number
        {
            //need code objects pool
            let rsp:rendersprite = this.m_render._get_rendersprite_ins(sp,x,y,b_unit_front);
            this.m_render.m_scene.m_sprites.push(rsp);
            return rsp.m_obj_id;
        }
        public getsprite(objid:number):rendersprite{
            for(let i of this.m_render.m_scene.m_sprites){
                if(i.m_obj_id == objid){
                    return i;
                }
            }
            return null;
        }
        public delsprite(objid:number):void{
            let idx:number = 0;
            for(let i of this.m_render.m_scene.m_sprites){
                if(i.m_obj_id == objid){
                    i.dispose();
                    this.m_render.m_scene.m_sprites.splice(idx,1);
                    this.m_render._del_rendersprite_ins(i);
                    return;
                }
                idx++;
            }
        }
        public delallsprite():void{
            for(let i of this.m_render.m_scene.m_sprites){
                i.dispose();
                this.m_render._del_rendersprite_ins(i);
            }
            this.m_render.m_scene.m_sprites = new Array<rendersprite>();
        }
        /////
        //.ani
        public addeff(aniid:number,x:number,y:number,underunit:boolean = true,autodel:boolean = false):number
        {
            //need code objects pool
            let ani:rendereff = this.m_render._get_rendereff_ins(aniid,x,y,underunit,autodel);
            this.m_render.m_scene.m_effs.push(ani);
            return ani.m_obj_id;
        }
        public deleff(objid:number):void{
            let idx:number = 0;
            for(let i of this.m_render.m_scene.m_effs){
                if(i.m_obj_id == objid){
                    i.dispose();
                    this.m_render.m_scene.m_effs.splice(idx,1);
                    this.m_render._del_rendereff_ins(i);
                    return;
                }
                idx++;
            }
        }
        public delalleff():void{
            for(let i of this.m_render.m_scene.m_effs){
                i.dispose();
                this.m_render._del_rendereff_ins(i);
            }
            this.m_render.m_scene.m_effs = new Array<rendereff>();
        }
        public addunit(name:string,shape:number,x:number,y:number,use_default:boolean = true):number
        {
            let unitobj:renderavatar = this.m_render._get_renderavatar_ins(shape,x,y,use_default);
            return this.m_render.m_scene.addunit(name,unitobj);
        }
        public delunit(id:number):void
        {
            let delunit:renderavatar = this.m_render.m_scene.delunit(id);
            if(delunit != null && this.m_render.m_eye != null && this.m_render.m_eye == delunit)
            {
                this.cameralookat(null);
            }
            if(delunit != null){
                if(this.m_render.m_scene.m_follow_list[id] != undefined){
                    delete this.m_render.m_scene.m_follow_list[id];
                }
                let del_chase_list:Array<number> = new Array();
                for(let k of Object.keys(this.m_render.m_scene.m_follow_list)){
                    if(this.m_render.m_scene.m_follow_list.hasOwnProperty(k)){
                        let c_id:number = parseInt(k);
                        let f_id:number = this.m_render.m_scene.m_follow_list[c_id];
                        if(f_id == id){
                            del_chase_list.push(c_id);
                            delete this.m_render.m_scene.m_follow_list[c_id];
                        }
                    }
                }

                this.m_render._del_renderavatar_ins(delunit);

                for(let i of del_chase_list){
                    this.delunit(i);
                }
            }
        }
        public set_follow_id(chase_id:number,follow_id:number):void{
            let chase_role:renderavatar = this.getunit(chase_id);
            if(chase_role == null){
                return;
            }
            let follow_role:renderavatar = this.getunit(follow_id);
            if(follow_role == null){
                return;
            }
            this.m_render.m_scene.m_follow_list[chase_id] = follow_id;
            let deltax:number = 100;
            let deltay:number = 100;
            chase_role.set_pos(follow_role.x+Math.random()*deltax-deltax/2,follow_role.y+Math.random()*deltay-deltay/2);
        }
        public clear_follow_id(chase_id:number):void{
            if(this.m_render.m_scene.m_follow_list.hasOwnProperty(chase_id.toString())){
                delete this.m_render.m_scene.m_follow_list[chase_id];
            }
        }
        public clear_all_follow(follow_id:number):void{
            for(let key of Object.keys(this.m_render.m_scene.m_follow_list)){
                if(this.m_render.m_scene.m_follow_list.hasOwnProperty(key)){
                    let f_id:number = this.m_render.m_scene.m_follow_list[parseInt(key)];
                    if(f_id == follow_id){
                        this.delunit(parseInt(key));
                        delete this.m_render.m_scene.m_follow_list[parseInt(key)];
                    }
                }
            }
        }
        private _gen_back_pos(pt:Laya.Point,dir:number):Laya.Point{
            switch(dir){
                case 0:
                    pt.y -= 30;
                    pt.x += 40;
                    break;
                case 1:
                    pt.y += 10;
                    pt.x += 45;
                    break;
                case 2:
                    pt.y += 40;
                    pt.x += 30;
                    break;
                case 3:
                    pt.y += 45;
                    pt.x -= 10;
                    break;
                case 4:
                    pt.y += 30;
                    pt.x -= 40;
                    break;
                case 5:
                    pt.y -= 15;
                    pt.x -= 40;
                    break;
                case 6:
                    pt.y -= 40;
                    pt.x -= 30;
                    break;
                case 7:
                    pt.y += 10;
                    pt.x -= 45;
                    break;
                default:
                    break;
            }
                
            return pt;
        }
        public update_follow_pos():void{
            let pt:Laya.Point = new Laya.Point();
            for(let k of Object.keys(this.m_render.m_scene.m_follow_list)){
                if(this.m_render.m_scene.m_follow_list.hasOwnProperty(k)){
                    let c_id:number = parseInt(k);
                    let f_id:number = this.m_render.m_scene.m_follow_list[c_id];
                    let f_role:renderavatar = this.getunit(f_id);
                    if(f_role != null){
                        pt.x = f_role.x;
                        pt.y = f_role.y;
                        pt = this._gen_back_pos(pt,f_role.m_dir);
                        this.unit_walk2(c_id,pt.x,pt.y,true);
                    }
                }
            }
        }
        public delallunit():void{
            this.cameralookat(null);
            for(let i:number = 0;i < this.m_render.m_scene.m_units.length;++i)
            {
                let unit:renderavatar = this.m_render.m_scene.m_units[i];
                this.m_render.m_scene.delpath(unit.m_obj_id);
                unit.dispose();
                this.m_render._del_renderavatar_ins(unit);
            }
            this.m_render.m_scene.m_units_dict = new Object();
            this.m_render.m_scene.m_units.length = 0;
            this.m_render.m_scene.m_follow_list = new Object();
        }
        public getunitbyud(ud:any):renderavatar
        {
            return this.m_render.m_scene.getunitbyud(ud);
        }
        public getunit(id:number):renderavatar
        {
            return this.m_render.m_scene.getunit(id);
        }
        public getmap_gridw():number
        {
            return this.m_render.m_scene.m_map.m_block.m_mat.m_grid_w;
        }
        public getmap_gridh():number
        {
            return this.m_render.m_scene.m_map.m_block.m_mat.m_grid_h;
        }
        public unit_stop(id):void
        {
            let unit:renderavatar = this.getunit(id);
            if(unit != null)
            {
                this.m_render.m_scene.delpath(id);
                unit.change_action(AVATAR_ACTON.ACTION_STAND);
            }
        }
        public is_unit_walk(id:number):boolean{
            let p:path = this.m_render.m_scene.get_unitpath(id);
            return p != null;
        }
        public get_unit_walk(id:number):path{
            return this.m_render.m_scene.get_unitpath(id);
        }
        public is_scene_block(x:number,y:number):boolean{
            return this.m_render.m_scene.m_map.is_block(x,y);
        }
        public get_map_canvas(w:number,h:number,x:number,y:number):Laya.HTMLCanvas{
            return this.m_render.m_view.get_mapviewport_canvas(this.m_render.m_context,w,h);
        }
        public get_camera_x():number{
            return this.m_render.m_camera.x;
        }
        public get_view_x():number{
            return this.m_render.m_view.x;
        }
        public get_view_y():number{
            return this.m_render.m_view.y;
        }
        public get_camera_y():number{
            return this.m_render.m_camera.y;
        }
        public set_walk_spd(spd:number):void{
            this.m_render.m_context.m_walk_speed = spd;
        }
        public set_run_spd(spd:number):void{
            this.m_render.m_context.m_run_speed = spd;
        }
        public unit_walk2inspd(id:number,x:number,y:number,b_force:boolean,spd:number):laya.maths.Point
        {
            let unit:renderavatar = this.getunit(id);
            if(unit != null)
            {
                //let newpath:path = new path();
                let sx:number = unit.x;
                let sy:number = unit.y;
                if(sx == x && sy == y){
                    return;
                }
                core.core_tiplog("unit_walk2 findpath start ",id,sx,sy,x,y);
                let newpath:path = null;
                if(b_force){
                    newpath = utils.getitembycls("path",path);
                    newpath.init(spd);
                    newpath.push_pt(sx,sy,x,y);
                }
                else{
                    newpath = this.m_render.m_scene.findpath(sx,sy,x,y,true,spd);
                }
                
                core.core_tiplog("unit_walk2 findpath end ",id,sx,sy,x,y,newpath);
                //newpath.push_pt(sx,sy,x,y);
                if(newpath == null)
                {
                    return;
                }
                newpath.start();
                this.m_render.m_scene.addpath(newpath,id);
                unit.change_action(AVATAR_ACTON.ACTION_RUN);
                return newpath.get_end();
            }
            return;
        }
        public unit_walk2(id:number,x:number,y:number,b_force:boolean = false,b_run:boolean = false):laya.maths.Point
        {
            return this.unit_walk2inspd(id,x,y,b_force,this.m_render.m_context.get_move_spd(b_run));
        }
    }
}