module core {
    export class materialmgr {

        private m_map_slot_dict:Object= new Object();
        
        private m_ani_mat_dict:Object= new Object();

        private m_eff_mat_dict:Object = new Object();//path:[loaded,ref,[mat_list]];

        private m_avatar_link_dict:Object = new Object();

        private m_lavatar_mat_dict:Object = new Object();
        private m_lavatar_animat_dict:Object = new Object();
        private m_lavatar_anidata_dict:Object = new Object();
        private m_lavatar_aniatlasdata_dict:Object = new Object();
        //need code all ani mat and avatar mat needs ref count,not really

        private m_mat_loader:Object = new Object();
        private m_avatar_shadow_mat:Laya.Texture = null;
        constructor(){
            
        }
        
        public dispose():void
        {
        }
        public get_avatar_shadow_mat():Laya.Texture{
            if(this.m_avatar_shadow_mat == null){
                this.m_avatar_shadow_mat = new Laya.Texture();
                this.m_avatar_shadow_mat.load("avatar/shadow.png");
            }
            return this.m_avatar_shadow_mat;
        }
        public check_release():void{
            for(let i in this.m_mat_loader){
                this.m_mat_loader[i].check_release();
            }
        }
        public get_avatar_anidata(res:string):avatar_ani_struct{
            if(this.m_lavatar_anidata_dict.hasOwnProperty(res)){
                return this.m_lavatar_anidata_dict[res];
            }
            let o:Object = Laya.Loader.getRes(res);
            if(o != null){
                let data:avatar_ani_struct = avatar_ani_struct.parse(o);
                this.m_lavatar_anidata_dict[res] = data;
                return data;
            }
            return null;
        }
        public get_avatar_anitalasdata(res:string):avatar_atlas_struct{
            if(this.m_lavatar_aniatlasdata_dict.hasOwnProperty(res)){
                return this.m_lavatar_aniatlasdata_dict[res];
            }
            let o:Object = Laya.Loader.getRes(res);
            if(o != null){
                let data:avatar_atlas_struct = avatar_atlas_struct.parse(o);
                this.m_lavatar_aniatlasdata_dict[res] = data;
                return data;
            }
            return null;
        }
        public get_mat_loader(res:string,restype:string = Laya.Loader.ATLAS):material_loader{
            if(this.m_mat_loader.hasOwnProperty(res) == false){
                this.m_mat_loader[res] = new material_loader(res,restype);
            }
            return this.m_mat_loader[res];
        }
        public add_mat_ref(res:string):void{
            this.get_mat_loader(res).addref();
        }
        public del_mat_ref(res:string):void{
            this.get_mat_loader(res).delref();
        }
        public preload_mat(res:string,extrares:string = "",types:string = ""):void{
            let mat_loader:material_loader = this.get_mat_loader(res);
            if(!mat_loader.m_loaded && !mat_loader.m_loading){
                if(extrares.length > 0){
                    mat_loader.setextrares(extrares,types);
                }
                mat_loader.load_res(0);
                mat_loader.update_ref_tm();
            }
        }
        public update(delta:number):void
        {
            
        }
        
        private onLoadmapslot(key:string,path:string):void
        {
            var sp: laya.resource.Texture = Laya.loader.getRes(path);
            let mat:mapslotmaterial = this.m_map_slot_dict[key];
            if(mat != undefined)
            {
                //core.core_tiplog("materialmgr onLoadmapslot set ",key,path,sp);
                mat.m_graphic.graphics.drawTexture(sp,0,0)
                mat.m_tex = sp;
                mat.m_res_path = path;
            }
            else
            {
                core.core_tiplog("materialmgr onLoadmapslot set error ",key,path);
            }
        }
        
        public getmapslot(mapid:number,x:number,y:number):mapslotmaterial
        {
            let key:string = mapid.toString()+ '_' + x.toString() + '_' + y.toString();
            let mat:mapslotmaterial = this.m_map_slot_dict[key];
            if(mat == undefined)
            {
                let slotpath:string = matinfo_mgr().genmappath(mapid)+mapid.toString()+"_tile/"+x.toString()+"_"+y.toString()+".png";
                let comp:laya.utils.Handler = laya.utils.Handler.create(this,this.onLoadmapslot,[key,slotpath]);
                core.myload(slotpath,comp,null,Laya.Loader.IMAGE,2,true,mapid.toString());
                
                mat = utils.getitembycls("mapslotmaterial",mapslotmaterial);
                mat.init();
                //mat = new mapslotmaterial();
                mat.m_map_id = mapid;
                mat.m_grid_w = matinfo_mgr().m_map_grid_w;
                mat.m_grid_h = matinfo_mgr().m_map_grid_h;
                this.m_map_slot_dict[key] = mat;
                core.core_tiplog("materialmgr getmapslot load ",key,slotpath);
            }
            return this.m_map_slot_dict[key];
        }
        public clearallmapslot():void
        {
            for(let key in this.m_map_slot_dict)
            {
                let mat:mapslotmaterial = this.m_map_slot_dict[key];
                //find the first loaded slot,delete res by its mapid
                //ignore that more than one group in dict
                if(mat != undefined && mat.m_res_path != null)
                {
                    Laya.loader.clearResByGroup(mat.m_map_id.toString());
                    mat.clear();
                    utils.recover("mapslotmaterial",mat);
                    break;//
                }
            }
            this.m_map_slot_dict = {};
        }
        private onLoadmapblock(mat:mapblock,path:string):void
        {
            var buf:any = Laya.loader.getRes(path);
            if(mat != null && buf != null && buf != undefined)
            {
                //core.core_tiplog("rendermap onLoadmapslot set ",key,path,sp);
                mat.setbuff(buf);
                mat.m_res_path = path;
            }
            else
            {
                core.core_tiplog("rendermap onLoadmapblock set error ",path);
            }
        }
        public getmapblock(mb:mapblock,mapid:number):mapblock
        {
            let slotpath:string = matinfo_mgr().genmappath(mapid)+mapid.toString()+".bin";
            let mat:mapblock = mb;
            let comp:laya.utils.Handler = laya.utils.Handler.create(this,this.onLoadmapblock,[mat,slotpath]);
            
            mat.m_map_id = mapid;
            core.myload(slotpath,comp,null,Laya.Loader.BUFFER,0,true,mapid.toString());
            return mat;
        }
        public getmapbkres(respath:string):mapbkmaterial
        {
            let mat:mapbkmaterial = utils.getitembycls("mapbkmaterial",mapbkmaterial);
            mat.re_init(respath);
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res,Laya.Loader.IMAGE);
            if(mat_loader.m_loaded){
                mat.load_res();
            }
            else{
                mat_loader.add_unload_mat(mat);
                if(!mat_loader.m_loading){
                    mat_loader.load_res(3);
                }
            }
            mat_loader.addref();

            return mat;
        }
        public delmapbkres(mat:mapbkmaterial):void{
            //
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
            mat_loader.del_unload_mat(mat);
            mat_loader.delref();
            mat.delref();
            mat.clear();
            utils.recover("mapbkmaterial",mat);
            //
        }
        ///////
        public geteffmat(aniid:number):effmaterial
        {
            let mat:effmaterial = null;
            let slotpath:string = matinfo_mgr()._get_eff_info(aniid).path;
            let res:string = matinfo_mgr()._get_eff_info(aniid).res;
            mat = utils.getitembycls("effmaterial",effmaterial);
            //mat = new effmaterial();
            mat.re_init();
            mat.m_ani_id = aniid;
            mat.m_res_path = res;
            mat.m_ani_path = slotpath;
            mat.m_mat_res = res;
            mat.addref();
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
            if(mat_loader.m_loaded){
                mat.load_res();
            }
            else{
                mat_loader.add_unload_mat(mat);
                if(!mat_loader.m_loading){
                    mat_loader.load_res(4);
                }
            }
            mat_loader.addref();
            core.core_tiplog("materialmgr geteffmat load ",aniid,slotpath);
            return mat;
        }
        public deleffmat(mat:effmaterial):void{
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
            mat_loader.del_unload_mat(mat);
            mat_loader.delref();
            mat.delref();
            mat.clear();
            utils.recover("effmaterial",mat);
        }
        ///////
        
        public getanimat(aniid:number):animaterial
        {
            let mat:animaterial = null;
            let slotpath:string = "ani/"+matinfo_mgr()._get_ani_info(aniid).path;
            mat = utils.getitembycls("animaterial",animaterial);
            //mat = new animaterial();
            mat.re_init();
            mat.m_ani_id = aniid;
            mat.m_res_path = slotpath;
            mat.m_mat_res = slotpath;
            mat.addref();
            //
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
            if(mat_loader.m_loaded){
                mat.load_res();
            }
            else{
                mat_loader.add_unload_mat(mat);
                if(!mat_loader.m_loading){
                    mat_loader.load_res(4);
                }
            }
            mat_loader.addref();
            //
            core.core_tiplog("materialmgr getanimat load ",aniid,slotpath);
            
            return mat;
        }
        public delanimat(mat:animaterial):void{
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
            mat_loader.del_unload_mat(mat);
            mat_loader.delref();
            mat.delref();
            mat.clear();
            utils.recover("animaterial",mat);
        }
        private onLoadavatar(mat:avataractionmaterial):void
        {
            if(mat != undefined)
            {
                mat.load_res();
            }
        }
        public getavataractionmat(shape:number,action:number):avataractionmaterial
        {
            let key:number = matinfo_mgr().genavatarmatkey(shape,action);
            let mat:avataractionmaterial;
            //mat = new avataractionmaterial();
            mat = utils.getitembycls("avataractionmaterial",avataractionmaterial);
            mat.re_init();
            mat.m_shape = shape;
            mat.m_action = action;
            mat.m_alink = this.getavatarlinkdata(shape,action);
            let mat_info = matinfo_mgr()._get_avatar_info(shape,action);
            mat.addref();
            if(mat_info != null){
                let slotpath:string = "avatar/"+mat_info.path;
                mat.m_width = mat_info.w;
                mat.m_height = mat_info.h;
                if(mat_info.mirror == 1){
                    mat.m_b_mirrior = true;
                }
                else{
                    mat.m_b_mirrior = false;
                }
                if(mat_info.dir4 == 1){
                    mat.m_b_dir4 = true;
                }
                else{
                    mat.m_b_dir4 = false;
                }
                mat.m_mat_res = slotpath;
                //
                let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
                if(mat_loader.m_loaded){
                    mat.load_res();
                }
                else{
                    mat_loader.add_unload_mat(mat);
                    if(!mat_loader.m_loading){
                        mat_loader.load_res(3);
                    }
                }
                mat_loader.addref();
                //
                core.core_tiplog("materialmgr getavatarmat load ",key,slotpath);
            }
            return mat;
        }
        public delavataractionmaterial(mat:avataractionmaterial):void{
            if(mat.m_mat_res.length > 0){
                let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
                mat_loader.del_unload_mat(mat);
                mat_loader.delref();
            }
            
            mat.delref();
            mat.clear();
            utils.recover("avataractionmaterial",mat);
            return;
        }
        //
        public getlavatarmat(shape:number,action:number):lavataractionmat
        {
            let key:number = matinfo_mgr().genavatarmatkey(shape,action);
            let mat:lavataractionmat;
            if(this.m_lavatar_mat_dict.hasOwnProperty(key.toString())){
                mat = this.m_lavatar_mat_dict[key];
                mat.addref();
                return mat;
            }
            //mat = new avataractionmaterial();
            mat = utils.getitembycls("lavataractionmat",lavataractionmat);
            mat.re_init();
            mat.m_shape = shape;
            mat.m_action = action;
            mat.m_alink = this.getavatarlinkdata(shape,action);
            let mat_info = matinfo_mgr()._get_avatar_info(shape,action);
            mat.addref();
            if(mat_info != null){
                let slotpath:string = "avatar/"+mat_info.path;
                mat.m_width = mat_info.w;
                mat.m_height = mat_info.h;
                mat.m_mat_res = slotpath;
                //
                let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
                if(mat_loader.m_loaded){
                    mat.load_res();
                }
                else{
                    mat_loader.add_unload_mat(mat);
                    if(!mat_loader.m_loading){
                        mat_loader.load_res(3);
                    }
                }
                mat_loader.addref();
                //
                core.core_tiplog("materialmgr getlavatarmat load ",key,slotpath);
            }
            return mat;
        }
        public dellavatarmaterial(mat:lavataractionmat):void{
            mat.delref();
            if(mat.m_ref <= 0){
                let key:number = matinfo_mgr().genavatarmatkey(mat.m_shape,mat.m_action);
                if(mat.m_mat_res.length > 0){
                    let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
                    mat_loader.del_unload_mat(mat);
                    mat_loader.delref();
                }
                mat.clear();
                utils.recover("lavataractionmat",mat);
                delete this.m_lavatar_mat_dict[key];
            }
            return;
        }
        public getlavataranimat(aniid:number):avatar_ani_mat{
            let mat:avatar_ani_mat = null;
            if(this.m_lavatar_animat_dict.hasOwnProperty(aniid.toString())){
                mat = this.m_lavatar_animat_dict[aniid];
                mat.addref();
                return mat;
            }
            mat = utils.getitembycls("avatar_ani_mat",avatar_ani_mat);
            mat.re_init();
            //
            let slotpath:string = matinfo_mgr()._get_eff_info(aniid).path;
            let res:string = matinfo_mgr()._get_eff_info(aniid).res;
            
            mat.m_aniid = aniid;

            mat.m_ani_path = slotpath;
            mat.m_mat_res = res;
            mat.m_atlas_path = res;
            //
            mat.m_aw = matinfo_mgr().geteffw(aniid);
            mat.m_ah = matinfo_mgr().geteffh(aniid);
            mat.m_framecount = matinfo_mgr().geteffframecount(aniid);
            mat.m_framespeed = matinfo_mgr().geteffframespeed(aniid);
            mat.m_framemillsec = 1000.0/mat.m_framespeed;
            mat.m_frametotalmillsec = mat.m_framecount*1000.0/mat.m_framespeed;
            //
            mat.addref();
            let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
            if(mat_loader.m_loaded){
                mat.load_res();
            }
            else{
                mat_loader.add_unload_mat(mat);
                if(!mat_loader.m_loading){
                    mat_loader.addextrares(mat.m_ani_path,Laya.Loader.JSON);
                    mat_loader.load_res(4);
                }
                
            }
            mat_loader.addref();
            core.core_tiplog("materialmgr getlavataranimat load ",aniid,slotpath);
            //
            return mat;
        }
        public dellavataranimat(mat:avatar_ani_mat):void{
            mat.delref();
            if(mat.m_ref <= 0){
                if(mat.m_mat_res.length > 0){
                    let mat_loader:material_loader = this.get_mat_loader(mat.m_mat_res);
                    mat_loader.del_unload_mat(mat);
                    mat_loader.delref();
                }
                mat.clear();
                utils.recover("avatar_ani_mat",mat);
                delete this.m_lavatar_animat_dict[mat.m_aniid];
            }
        }
        //
        public setavatarlinkdata(shape:number,action:number,buff:Laya.Byte,bufflen:number,b_txt:boolean):void{
            this.clearavatarlinkdata(shape,action);
            let avtarlink_ins:avatarlink = utils.getitembycls("avatarlink",avatarlink);
            avtarlink_ins.init();
            if(b_txt){
                avtarlink_ins.set_txt_buff(buff,bufflen);
            }
            else{
                avtarlink_ins.set_buff(buff,bufflen);
            }
            let key:string = matinfo_mgr()._gen_avatarlink_key(shape,action);
            this.m_avatar_link_dict[key] = avtarlink_ins;
        }
        public clearavatarlinkdata(shape:number,action:number):void{
            let key:string = matinfo_mgr()._gen_avatarlink_key(shape,action);
            if(this.m_avatar_link_dict.hasOwnProperty(key)){
                let ad:avatarlink = this.m_avatar_link_dict[key];
                ad.dispose();
                utils.recover("avatarlink",ad);
                delete this.m_avatar_link_dict[key];
            }
        }
        private getavatarlinkdata(shape:number,action:number):avatarlink{
            let key:string = matinfo_mgr()._gen_avatarlink_key(shape,action);
            if(this.m_avatar_link_dict.hasOwnProperty(key)){
                return this.m_avatar_link_dict[key];
            }
            let filen:string = matinfo_mgr()._gen_avatarlink_filename(shape,action);
            if(filen == null || filen.length <= 0){
                return null;
            }
            let b_txt:boolean = true;
            let buff:Laya.Byte = null;
            buff = filepack_ins().get_file("link_data_txt",filen);
            if(buff == null){
                buff = filepack_ins().get_file("link_data",filen);
                b_txt = false;
            }
            
            if(buff == null){
                return null;
            }

            let bufflen:number;
            if(b_txt){
                bufflen = filepack_ins().get_file_len("link_data_txt",filen);
            }
            else{
                bufflen = filepack_ins().get_file_len("link_data",filen);
            }
             
            let avtarlink_ins:avatarlink = utils.getitembycls("avatarlink",avatarlink);
            avtarlink_ins.init();
            if(b_txt){
                avtarlink_ins.set_txt_buff(buff,bufflen);
            }
            else{
                avtarlink_ins.set_buff(buff,bufflen);
            }
            
            this.m_avatar_link_dict[key] = avtarlink_ins;
            return avtarlink_ins;
        }
    }
    let g_ins:materialmgr = null;
    export function mat_mgr():materialmgr{
        if(g_ins == null){
            g_ins = new materialmgr();
        }
        return g_ins;
    }
}