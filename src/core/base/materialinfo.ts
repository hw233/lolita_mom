module core {
    export class materialinfomgr {
        public m_map_grid_w:number = 128;
        public m_map_grid_h:number = 128;
        private m_map_info_dict:Object= new Object();
        
        private m_ani_info_dict:Object= new Object();

        private m_eff_info_dict:Object = new Object();

        private m_avatar_action_mat_dict:Object= new Object();
        
        private m_avatar_config:any = null;
        private m_map_config:any = null;
        private m_ani_config:any = null;
        private m_eff_config:any = null;

        constructor(){
        }
        public set_avatar_config(conf:any):void{
            this.m_avatar_config = conf;
        }
        
        public set_map_config(conf:any):void{
            this.m_map_config = conf;
        }
        public set_ani_config(conf:any):void{
            this.m_ani_config = conf;
        }
        public set_eff_config(conf:any):void{
            this.m_eff_config = conf;
        }
        public _get_avatar_info(avatarid:number,actionid:number):any
        {
            let key = this.genavatarmatkey(avatarid,actionid);
            if(this.m_avatar_action_mat_dict.hasOwnProperty(key.toString()) == false)
            {
                let avainfo:any = this.m_avatar_config(avatarid);
                if(avainfo != null){
                    let actioninfo = avainfo.info_data;
                    for(let i of actioninfo)
                    {
                        if(i.aid == actionid)
                        {
                            this.m_avatar_action_mat_dict[key] = i;
                            break;
                        }
                    }
                }
            }
            return this.m_avatar_action_mat_dict[key];
        }
        public _get_map_info(mapid:number):any
        {
            if(this.m_map_info_dict.hasOwnProperty(mapid.toString()) == false)
            {
                this.m_map_info_dict[mapid] = this.m_map_config(mapid);
            }
            return this.m_map_info_dict[mapid];
        }
        public _get_eff_info(aniid:number):any{
            if(this.m_eff_info_dict.hasOwnProperty(aniid.toString()) == false)
            {
                this.m_eff_info_dict[aniid] = this.m_eff_config(aniid);
            }
            return this.m_eff_info_dict[aniid];
        }
        public _get_ani_info(aniid:number):any
        {
            if(this.m_ani_info_dict.hasOwnProperty(aniid.toString()) == false)
            {
                this.m_ani_info_dict[aniid] = this.m_ani_config(aniid);
            }
            return this.m_ani_info_dict[aniid];
        }
        public dispose():void
        {
 
        }
        public getmapw(mapid:number):number
        {
            let info = this._get_map_info(mapid);
            let ret = 0;
            //core.core_tiplog("materialmgr getmapw ",info)
            if(info != undefined && info != null)
            {
                ret = info.w;
            }
            return ret;
        }
        public getmaph(mapid:number):number
        {
            let info = this._get_map_info(mapid);
            let ret = 0;
            if(info != undefined && info != null)
            {
                ret = info.h;
            }
            return ret;
        }
        
        public genmappath(mapid:number):string
        {
            return "map/city/"+mapid.toString()+"/"
        }
        
        public geteffw(aniid:number):number{
            let ret:number = 16;
            let obj = this._get_eff_info(aniid);
            if(obj != undefined){
                ret = obj.w;
            }
            return ret;
        }
        public geteffh(aniid:number):number{
            let ret:number = 16;
            let obj = this._get_eff_info(aniid);
            if(obj != undefined){
                ret = obj.h;
            }
            return ret;
        }
        public geteffframecount(aniid:number):number
        {
            let ret:number = 30;
            let obj = this._get_eff_info(aniid);
            if(obj != undefined)
            {
                ret = obj.total;
            }
            return ret;
        }
        public geteffframespeed(aniid:number):number
        {
            let ret:number = 30;
            let obj = this._get_eff_info(aniid);
            if(obj != undefined)
            {
                ret = obj.speed;
            }
            return ret;
        }
        public geteffname(aniid:number):string{
            let ret:string = "";
            let obj = this._get_eff_info(aniid);
            if(obj != undefined)
            {
                ret = obj.name;
            }
            return ret;
        }
        public geteffcycle(aniid:number):boolean{
            let ret:boolean = true;
            let obj = this._get_eff_info(aniid);
            if(obj != undefined){
                if(obj.cycle == 0){
                    ret = false;
                }
            }
            return ret;
        }
        ///////
        
        public getaniw(aniid:number):number
        {
            let ret:number = 16;
            let obj = this._get_ani_info(aniid);
            if(obj != undefined)
            {
                ret = obj.w;
            }
            return ret;
        }
        public getanih(aniid:number):number
        {
            let ret:number = 16;
            let obj = this._get_ani_info(aniid);
            if(obj != undefined)
            {
                ret = obj.h;
            }
            return ret;
        }
        public getaniframecount(aniid:number):number
        {
            let ret:number = 30;
            let obj = this._get_ani_info(aniid);
            if(obj != undefined)
            {
                ret = obj.total;
            }
            return ret;
        }
        public getaniframespeed(aniid:number):number
        {
            let ret:number = 30;
            let obj = this._get_ani_info(aniid);
            if(obj != undefined)
            {
                ret = obj.speed;
            }
            return ret;
        }
        public getanitexprefix(aniid:number):string
        {
            let ret:string = "";
            let obj = this._get_ani_info(aniid);
            if(obj != undefined)
            {
                ret = obj.prefix;
            }
            return ret;
        }
        
        public genavatarmatkey(shape:number,action:number):number
        {
            return shape*100+action;
        }
        public getavataractionw(shape:number,action:number):number
        {
            let ret:number = 16;
            let key:number = this.genavatarmatkey(shape,action);
            let obj = this._get_avatar_info(shape,action);
            if(obj != undefined)
            {
                ret = obj.w;
            }
            return ret;
        }
        public getavataractionh(shape:number,action:number):number
        {
            let ret:number = 16;
            let key:number = this.genavatarmatkey(shape,action);
            let obj =this._get_avatar_info(shape,action);;
            if(obj != undefined)
            {
                ret = obj.h;
            }
            return ret;
        }
        public getavataractionframecount(shape:number,action:number):number
        {
            let ret:number = 30;
            let key:number = this.genavatarmatkey(shape,action);
            let obj = this._get_avatar_info(shape,action);
            if(obj != undefined)
            {
                ret = obj.total;
            }
            return ret;
        }
        public getavataractionframespeed(shape:number,action:number):number
        {
            let ret:number = 30;
            let key:number = this.genavatarmatkey(shape,action);
            let obj = this._get_avatar_info(shape,action);
            if(obj != undefined)
            {
                ret = obj.speed;
            }
            return ret;
        }
        public getavataractiontexprefix(shape:number,action:number):string
        {
            let ret:string = "";
            let obj = this._get_avatar_info(shape,action);
            if(obj != undefined)
            {
                ret = obj.prefix;
            }
            return ret;
        }
        public _gen_avatarlink_key(shape:number,action:number):string{
            let key:number = shape*10000+action;
            return key.toString();
        }
        public _gen_avatarlink_filename(shape:number,action:number):string{
            //let key:string = "avatarlink\\"+shape.toString()+"\\"+action.toString()+".lk";
            //return key;
            let ret:string = "";
            let obj = this._get_avatar_info(shape,action);
            if(obj != undefined)
            {
                ret = obj.link;
            }
            if(ret == null){
                ret = "";
            }
            return ret;
        }
        public get_backride_shape(ride:number):number{
            //todo
            return 0;
        }
    }
    let g_ins:materialinfomgr = null;
    export function matinfo_mgr():materialinfomgr{
        if(g_ins == null){
            g_ins = new materialinfomgr();
        }
        return g_ins;
    }
}