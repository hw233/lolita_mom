module icon_mgr{
    //玩家描述
    class icon_bitmap extends Laya.Sprite{
        public m_ref_count:number = 0;
        public m_icon_path:string = "";
        public m_b_loaded:boolean = false;
        public m_b_loading:boolean = false;
        public m_owner:icon_sub_set = null;
        public m_id:number = 0;
        constructor(){
            super();
        }
        public addref():void{
            this.m_ref_count += 1;
        }
        public loadres():void{//图集下载后调用，如果引用计数小于等于0则不用调用
            if(this.m_b_loaded){
                return;
            }
            this.m_b_loading = true;
            this.loadImage(this.m_icon_path,0,0,0,0,Laya.Handler.create(this,this.on_loaded))
        }

        public on_loaded(ud:any = null):void{
            this.m_b_loading = false;
            this.m_b_loaded = true;
        }
        public delref():void{
            this.m_ref_count -= 1;
        }
        public can_release():boolean{
            if(this.m_b_loading){
                return false;
            }
            if(this.m_ref_count > 0){
                return false;
            }
            return true;
        }
        public dispose(){
            this.m_owner.recover_iconbm(this);
        }
    }
    class icon_sub_set{
        public m_atlas_path:string = "";
        public m_prefix:string = "";
        public m_b_loaded:boolean = false;
        public m_b_loading:boolean = false;
        public m_loaderrorcount:number = 0;
        public m_start_id:number = 0;
        public m_end_id:number = 0;
        public m_iconbm_idle:Object = new Object();
        public m_iconbm_used:Object = new Object();
        public m_idle_num:number = 0;
        public m_used_num:number = 0;
        constructor(){

        }
        public has_id(id:number):boolean{
            return id >= this.m_start_id && id <= this.m_end_id;
        }
        public get_icon(id:number):icon_bitmap{
            if(this.has_id(id) == false){
                return null;
            }
            let ret:icon_bitmap = null;
            let arr:Array<icon_bitmap> = null;
            if(this.m_iconbm_idle.hasOwnProperty(id.toString())){
                arr = this.m_iconbm_idle[id];
                if(arr.length > 0){
                    ret = arr.shift();
                }
                if(arr.length <= 0){
                    delete this.m_iconbm_idle[id];
                    this.m_idle_num -= 1;
                }
            }
            if(ret == null){
                ret = new icon_bitmap();
                ret.m_id = id;
                ret.m_owner = this;
                let filename:string = id.toString();
                //filename = (Array(5).join('0')+id.toString()).slice(-5);
                ret.m_icon_path = this.m_prefix + filename+'.png';
            }
            if(this.m_iconbm_used.hasOwnProperty(id.toString()) == false){
                this.m_iconbm_used[id] = new Array<icon_bitmap>();
                this.m_used_num += 1;
            }
            this.m_iconbm_used[id].push(ret);
            if(this.m_b_loaded){
                if(ret.m_b_loaded == false){
                    ret.loadres();
                }
            }
            else{
                if(!this.m_b_loading){
                    this.loadres();
                }
            }
            return ret;
        }
        public loadres():void{
            if(this.m_b_loaded){
                return;
            }
            this.m_b_loading = true;
            Laya.loader.on(Laya.Event.ERROR, this, this.on_error);
            core.myload(this.m_atlas_path,Laya.Handler.create(this,this.on_loaded),null,Laya.Loader.ATLAS,2);
        }
        public on_error(ud:any = null):void{
            Laya.loader.off(Laya.Event.ERROR,this,this.on_error);
            this.m_loaderrorcount += 1;
            this.m_b_loaded = false;
            this.m_b_loading = false;
        }
        public on_loaded(ud:any = null):void{
            Laya.loader.off(Laya.Event.ERROR,this,this.on_error);
            this.m_b_loaded = true;
            this.m_b_loading = false;
            for(let key of Object.keys(this.m_iconbm_used)){
                if(this.m_iconbm_used.hasOwnProperty(key)){
                    let arr:Array<icon_bitmap>  = this.m_iconbm_used[parseInt(key)];
                    for(let i:number = arr.length - 1;i >= 0; --i){
                        let iconbm:icon_bitmap = arr[i];
                        if(iconbm.m_ref_count > 0 && iconbm.m_b_loaded == false){
                            iconbm.loadres();
                        }
                    }
                }
            }
        }
        public recover_iconbm(bm:icon_bitmap):void{
            let id:number = bm.m_id;
            let arr:Array<icon_bitmap> = null;
            if(this.m_iconbm_used.hasOwnProperty(id.toString())){
                arr = this.m_iconbm_used[id];
            }
            else{
                core.game_tiplog("icon sub set recover iconbm error!the used array of specify id is not exist! ",id)
            }
            let b_removed:boolean = false;
            for(let i:number = arr.length - 1;i >= 0 ;--i){
                if(arr[i] == bm){
                    arr.splice(i,1);
                    b_removed = true;
                    if(arr.length <= 0){
                        delete this.m_iconbm_used[id];
                        this.m_used_num -= 1;
                    }
                    break;
                }
            }
            if(!b_removed){
                core.game_tiplog("icon sub set recover iconbm error!the used array of specify id has not this icon_bitmap! ",id)
            }
            if(this.m_iconbm_idle.hasOwnProperty(id.toString()) == false){
                this.m_iconbm_idle[id] = new Array<icon_bitmap>();
                this.m_idle_num += 1;
            }
            arr = this.m_iconbm_idle[id];
            for(let i of arr){
                if(i == bm){
                    core.game_tiplog("icon sub set recover iconbm error!the idle array of specify id already has this icon_bitmap! ",id);
                    return;
                }
            }
            arr.push(bm);
        }
        public check_release(){
            for(let key of Object.keys(this.m_iconbm_idle)){
                if(this.m_iconbm_idle.hasOwnProperty(key)){
                    let arr:Array<icon_bitmap>  = this.m_iconbm_idle[parseInt(key)];
                    for(let i:number = arr.length - 1;i >= 0; --i){
                        let iconbm:icon_bitmap = arr[i];
                        if(iconbm.can_release()){
                            iconbm.m_owner = null;
                            iconbm.destroy();
                            arr.splice(i,1);
                        }
                    }
                    if(arr.length <= 0){
                        delete this.m_iconbm_idle[parseInt(key)];
                        this.m_idle_num -= 1;
                    }
                }
            }
            if(this.m_b_loaded && this.m_idle_num == 0 && this.m_used_num == 0){
                Laya.loader.clearRes(this.m_atlas_path,true);
                this.m_b_loaded = false;
                core.game_tiplog("icon sub set check_release release atlas res! ",this.m_atlas_path);
            }
        }
        public dispose(){

        }
    }
    class icon_set{
        public m_sub_list:Array<icon_sub_set> = new Array<icon_sub_set>();
        constructor(){

        }
        public get_set_by_id(id:number):icon_sub_set{
            for(let i of this.m_sub_list){
                if(i.has_id(id)){
                    return i;
                }
            }
            return null;
        }
        public add_set(start_id:number,end_id:number,atlas:string,prefix:string):boolean{
            let new_set:icon_sub_set = new icon_sub_set();
            new_set.m_start_id = start_id;
            new_set.m_end_id = end_id;
            new_set.m_atlas_path = atlas;
            new_set.m_prefix = prefix;
            this.m_sub_list.push(new_set);
            return true;
        }
        public get_icon(id:number):icon_bitmap{
            let ret:icon_bitmap = null;
            let set:icon_sub_set = this.get_set_by_id(id);
            if(set != null){
                ret = set.get_icon(id);
            }
            return ret;
        }
        public check_release(){
            for(let i of this.m_sub_list){
                i.check_release();
            }
        }
        public dispose(){

        }
    }
    export class icon_obj extends Laya.Sprite{
        private m_bitmap:icon_bitmap = null;
        private m_iconmgr:iconmgr = null;
        constructor(){
            super();
        }
        public set_bitmap(bm:icon_bitmap,imgr:iconmgr):void{
            if(imgr == null){
                return;
            }
            this.m_iconmgr = imgr;
            this._clear_bitmap();
            this.m_bitmap = bm;
            if(this.m_bitmap != null){
                this.m_bitmap.addref();
                this.addChild(this.m_bitmap);
            }
        }
        public addref():void{
            if(this.m_bitmap != null){
                this.m_bitmap.addref();
            }
        }
        public delref():void{
            if(this.m_bitmap != null){
                this.m_bitmap.delref();
            }
        }

        private _clear_bitmap():void{
            if(this.m_bitmap != null){
                this.removeChild(this.m_bitmap);
                this.m_bitmap.delref();
                this.m_bitmap.dispose();
                this.m_bitmap = null;
            }
        }
        public dispose(){
            this._clear_bitmap();
            if(this.m_iconmgr != null){
                this.m_iconmgr = null;
            }
        }
    }
    class iconmgr {
        private m_item_set:icon_set = new icon_set();
        private m_buff_set:icon_set = new icon_set();
        private m_head_set:icon_set = new icon_set();
        private m_skill_set:icon_set = new icon_set();
        private m_other_set:icon_set = new icon_set();
        private m_b_inited:boolean = false;
        constructor()
        {
            
        }
        public init_set_config(cfg:any,set:icon_set):void{
            for(let i of cfg){
                let filepath:string = i["file"];
                let prefix:string = i["prefix"];
                let start:number = parseInt(i["start"]);
                let end:number = parseInt(i["end"]);
                set.add_set(start,end,filepath,prefix);
            }
        }
        public init_config(func:Function):boolean{
            if(this.m_b_inited){
                return;
            }
            this.m_b_inited = true;
            let cfg:any = null;
            cfg = func("item");
            this.init_set_config(cfg["data"],this.m_item_set);
            cfg = func("buff");
            this.init_set_config(cfg["data"],this.m_buff_set);
            cfg = func("head");
            this.init_set_config(cfg["data"],this.m_head_set);
            cfg = func("skill");
            this.init_set_config(cfg["data"],this.m_skill_set);
            cfg = func("other");
            this.init_set_config(cfg["data"],this.m_other_set);
            return true;
        }
        public get_item(id:number):icon_obj
        {
            let ret:icon_obj = utils.getitembycls("icon_obj",icon_obj);
            let bm:icon_bitmap = this.m_item_set.get_icon(id);
            ret.set_bitmap(bm,this);
            return ret;
        }
        public get_buff(id:number):icon_obj{
            let ret:icon_obj = utils.getitembycls("icon_obj",icon_obj);
            let bm:icon_bitmap = this.m_buff_set.get_icon(id);
            ret.set_bitmap(bm,this);
            return ret;
        }
        public get_head(id:number):icon_obj{
            let ret:icon_obj = utils.getitembycls("icon_obj",icon_obj);
            let bm:icon_bitmap = this.m_head_set.get_icon(id);
            ret.set_bitmap(bm,this);
            return ret;
        }
        public get_skill(id:number):icon_obj{
            let ret:icon_obj = utils.getitembycls("icon_obj",icon_obj);
            let bm:icon_bitmap = this.m_skill_set.get_icon(id);
            ret.set_bitmap(bm,this);
            return ret;
        }
        public get_other(id:number):icon_obj{
            let ret:icon_obj = utils.getitembycls("icon_obj",icon_obj);
            let bm:icon_bitmap = this.m_other_set.get_icon(id);
            ret.set_bitmap(bm,this);
            return ret;
        }
        public check_release():void{
            this.m_item_set.check_release();
            this.m_head_set.check_release();
            this.m_buff_set.check_release();
            this.m_skill_set.check_release();
            this.m_other_set.check_release();
        }
        public recover_icon(item:icon_obj):void{
            utils.recover("icon_obj",item);
        }
        public dispose()
        {
            
        }
    }
    let g_iconmgr:iconmgr = null;
    export function icon_ins():iconmgr
    {
        if(g_iconmgr == null){
            g_iconmgr = new iconmgr();
        }
        return g_iconmgr;
    }
    
    function fastset_icon(tp:number,id:number,grid:Laya.Sprite,b_small:boolean = true):icon_obj{
        if(grid == null){
            return null;
        }
        let icon:icon_obj = null;
        switch(tp){
            case 0:
                icon = icon_ins().get_item(id);
                break;
            case 1:
                icon = icon_ins().get_buff(id);
                break;
            case 2:
                icon = icon_ins().get_head(id);
                break;
            case 3:
                icon = icon_ins().get_skill(id);
                break;
            case 4:
                icon = icon_ins().get_other(id);
                break;
            default:
                return null;
        }
        icon.name = "this_is_iconmgr_gen_icon";
        let rate:number = 180/90;
        if(b_small){
            rate = 134/90;
        }
        icon.scale(rate,rate,true);
        grid.addChild(icon);
        return icon;
    }
    export function fastset_item_icon(id:number,grid:Laya.Sprite,caller:any,b_small:boolean = false):icon_obj
    {
        fastdel_icon(grid);
        return fastset_icon(0,id,grid,b_small);
    }
    export function fastset_buff_icon(id:number,grid:Laya.Sprite,caller:any,b_small:boolean = false):icon_obj
    {
        fastdel_icon(grid);
        return fastset_icon(1,id,grid,b_small);
    }
    export function fastset_head_icon(id:number,grid:Laya.Sprite,caller:any,b_small:boolean = false):icon_obj
    {
        fastdel_icon(grid);
        return fastset_icon(2,id,grid,b_small);
    }
    export function fastset_skill_icon(id:number,grid:Laya.Sprite,caller:any,b_small:boolean = false):icon_obj
    {
        fastdel_icon(grid);
        return fastset_icon(3,id,grid,b_small);
    }
    export function fastset_other_icon(id:number,grid:Laya.Sprite,caller:any,b_small:boolean = false):icon_obj
    {
        fastdel_icon(grid);
        return fastset_icon(4,id,grid,b_small);
    }
    export function get_item(id:number):icon_obj
    {
        return icon_ins().get_item(id);
    }

    export function get_buff(id:number):icon_obj{
        return icon_ins().get_buff(id);
    }
    export function get_head(id:number):icon_obj{
        return icon_ins().get_head(id);
    }
    export function get_skill(id:number):icon_obj{
        return icon_ins().get_skill(id);
    }
    export function get_other(id:number):icon_obj{
        return icon_ins().get_other(id);
    }
    export function fastdel_icon(grid:Laya.Sprite):void{
        if(grid == null){
            return;
        }

        let icon:icon_obj = grid.getChildByName("this_is_iconmgr_gen_icon") as icon_obj;
        if(icon != null){
            grid.removeChild(icon);
            icon.dispose();
        }
        return;
    }
    export function init_icon_config(cfg_func:Function):void{
        icon_ins().init_config(cfg_func);
    }
    
    export function check_release():void{
        icon_ins().check_release();
    }
}