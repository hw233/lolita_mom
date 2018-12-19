module core {
    export class avatar_ani_struct{
        public m_anchorX:number = 0;
        public m_anchorY:number = 0;
        public m_dx:number = 0;
        public m_dy:number = 0;
        public m_frameRate:number = 24;
        public m_frames:Array<string> = new Array<string>();
        constructor(){

        }
        public set_data(o:Object){
            let ani_data:Object = o["animations"][0];
            this.m_frameRate = ani_data["frameRate"];
            let keyframes:Object = ani_data["nodes"][0]["keyframes"];
            if(keyframes["anchorX"]){
                this.m_anchorX = keyframes["anchorX"][0]["value"];
            }
            if(keyframes["anchorY"]){
                this.m_anchorY = keyframes["anchorY"][0]["value"];
            }
            if(keyframes["x"]){
                this.m_dx = keyframes["x"][0]["value"];
            }
            if(keyframes["y"]){
                this.m_dy = keyframes["y"][0]["value"];
            }
            
            
            this.m_frames.length = 0;
            for(let i of keyframes["skin"]){
                this.m_frames.push(i["value"]);
            }
        }
        public static parse(o:Object):avatar_ani_struct{
            if(o != null){
                let n:avatar_ani_struct = new avatar_ani_struct();
                n.set_data(o);
                return n;
            }
            return null;
        }
    }
    export class avatar_atlas_img_struct{
        public m_name:string = "";
        public m_w:number = 0;
        public m_h:number = 0;
        public m_source_w:number = 0;
        public m_source_h:number = 0;
        constructor(){

        }
    }
    export class avatar_atlas_struct{
        public m_prefix:string = "";
        public m_frames:Array<avatar_atlas_img_struct> = new Array<avatar_atlas_img_struct>();
        constructor(){

        }
        public set_data(o:Object):void{
            this.m_prefix = o["meta"]["prefix"];
            this.m_frames.length = 0;
            for(let key of Object.keys(o["frames"])){
                if(o["frames"].hasOwnProperty(key)){
                    let f:Object = o["frames"][key];
                    let n_img:avatar_atlas_img_struct = new avatar_atlas_img_struct();
                    n_img.m_name = key;
                    n_img.m_w = f["frame"]["w"];
                    n_img.m_h = f["frame"]["h"];
                    n_img.m_source_w = f["sourceSize"]["w"];
                    n_img.m_source_h = f["sourceSize"]["h"];
                    this.m_frames.push(n_img);
                }
            }
        }
        public static parse(o:Object):avatar_atlas_struct{
            if(o != null){
                let n:avatar_atlas_struct = new avatar_atlas_struct();
                n.set_data(o);
                return n;
            }
            return null;
        }
    }
    export class material {
        public m_ref:number = 0;
        public m_mat_res:string = "";
        static s_mat_id:number = 0;
        public m_mat_id:number = 0;
        constructor(){
            material.s_mat_id += 1;
            this.m_mat_id = material.s_mat_id;
        }
        public dispose():void
        {
        }
        public update(delta:number):void
        {
            
        }
        public load_res():void{

        }
        public addref():void
        {
            this.m_ref++;
        }
        public delref():void
        {
            this.m_ref--;
        }
    }
    export class material_loader{
        public m_mat_res:string = "";
        public m_mat_res_type:string = "";
        public m_loaded:boolean = false;
        public m_loading:boolean = false;
        public m_ref:number = 0;
        public m_unload_mat:Object = new Object();
        public m_ref_tm:number = 0;
        public m_res_release:boolean = false;
        public m_extra_res:Array<any> = new Array<any>();
        constructor(res:string,restype:string){
            this.re_init(res,restype);
        }
        public re_init(res:string,restype:string):void{
            this.m_mat_res = res;
            this.m_mat_res_type = restype;
            this.m_loaded = false;
            this.m_loading = false;
            this.m_ref = 0;
            this.m_unload_mat = new Object();
            this.m_ref_tm = 0;
            this.m_extra_res = new Array<any>();
        }
        public add_unload_mat(mat:material):void{
            this.m_unload_mat[mat.m_mat_id] = mat;
        }
        public del_unload_mat(mat:material):void{
            delete this.m_unload_mat[mat.m_mat_id];
        }
        public on_load():void{
            this.m_loaded = true;
            this.m_loading = false;
            //let idx:number = 0;
            for(let key in this.m_unload_mat){
                let m:material = this.m_unload_mat[key];
                m.load_res();
                //idx += 1;
            }
            core.res_tiplog("material loader on_load ",this.m_mat_res);
            this.m_unload_mat = new Object();
        }
        public addextrares(res:string,types:string){
            this.m_extra_res.push({url:res,type:types});
        }
        public setextrares(res:string,types:string){
            this.m_extra_res = new Array<any>();
            this.m_extra_res.push({url:res,type:types});
        }
        public load_res(line:number):void{
            if(this.m_loaded){
                return;
            }
            if(this.m_loading){
                return;
            }
            this.addextrares(this.m_mat_res,this.m_mat_res_type);
            this.m_loading = true;
            if(this.m_res_release){
                this.on_load();
                return;
            }
            let comp:laya.utils.Handler = laya.utils.Handler.create(this,this.on_load,[]);
            core.myload(this.m_extra_res,comp,null,null,line,true);
            core.res_tiplog("material loader load ",this.m_mat_res,this.m_extra_res.length);
        }
        public addref():void
        {
            this.m_ref++;
        }
        public delref():void
        {
            this.m_ref--;
            if(this.m_ref <= 0){
                this.update_ref_tm();
            }
        }
        public update_ref_tm():void{
            this.m_ref_tm = Laya.Browser.now();
        }
        public check_release():boolean{
            if(!this.m_loaded){
                return false;
            }
            if(this.m_ref <= 0){
                let cur_tm:number = Laya.Browser.now();
                if(cur_tm > (this.m_ref_tm + 10*1000)){
                    this.m_loaded = false;
                    this.m_loading = false;
                    Laya.Loader.clearTextureRes(this.m_mat_res);
                    core.res_tiplog("material loader check_release ",this.m_mat_res);
                    this.m_res_release = true;
                    return true;
                }
            }
            return false;
        }
        public dispose():void
        {
            this.m_unload_mat = new Object();
        }
    }
}