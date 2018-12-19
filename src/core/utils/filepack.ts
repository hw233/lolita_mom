module core{
    class filehead{
        public m_key:number = 0;
        public m_size:number = 0;
        public m_offset:number = 0;
        constructor(){

        }
    }
    class filepack{
        public m_sign:number = 0;
        public m_version:number = 0;
        public m_filecount:number = 0;

        private m_filehead_arr:Array<filehead> = new Array<filehead>();
        private m_filehead_dict:Object = new Object();
        private m_buff:Laya.Byte = null;

        private m_fh_sign:string = "pack_file_head";
        constructor(buff:Laya.Byte){
            this.m_buff = buff;
            this.m_buff.pos = 0;
            this.m_sign = this.m_buff.getUint32();
            this.m_version = this.m_buff.getUint8();
            this.m_filecount = this.m_buff.getUint32();

            //core.core_tiplog("init pack ",this.m_sign,this.m_version,this.m_filecount);
            for(let i:number = 0;i < this.m_filecount;++i){
                let key:number = this.m_buff.getUint32();
                let size:number = this.m_buff.getUint32();
                let offset:number = this.m_buff.getUint32();
                let new_filehead:filehead = utils.getitembycls(this.m_fh_sign,filehead);
                new_filehead.m_key = key;
                new_filehead.m_size = size;
                new_filehead.m_offset = offset;
                this.m_filehead_arr.push(new_filehead);
                this.m_filehead_dict[key] = new_filehead;
                //core.core_tiplog("file ",key.toString(16),size,offset);
            }
        }
        public dispose(){
            for(let i of this.m_filehead_arr){
                utils.recover(this.m_fh_sign,i);
            }
            this.m_filehead_arr.length = 0;
            this.m_filehead_dict = new Object();
            this.m_buff.clear();
            this.m_buff = null;
        }
        private _gen_key(file_name:string):number{
            let ret:number = get_file_key(file_name);
            core.core_tiplog("filepack _gen_key ",file_name,ret.toString(16));
            return ret;
        }
        public get_file(file_name:string):Laya.Byte{
            let key:number = this._gen_key(file_name);

            if(this.m_filehead_dict[key] == undefined){
                return null; 
            }
            let fh:filehead = this.m_filehead_dict[key];
            this.m_buff.pos = fh.m_offset;
            let size:number = fh.m_size;
            return this.m_buff;
        }
        public get_file_len(file_name:string):number{
            let key:number = this._gen_key(file_name);

            if(this.m_filehead_dict[key] == undefined){
                return 0; 
            }
            let fh:filehead = this.m_filehead_dict[key];
            return fh.m_size;
        }
    }

    export class filepackmgr{
        private m_pack_dict:Object = new Object();
        constructor(){

        }
        public delpack(pack_name:string):void{
            if(this.m_pack_dict.hasOwnProperty(pack_name) == false){
                return;
            }
            let fp:filepack = this.m_pack_dict[pack_name];
            if(fp != undefined && fp != null){
                fp.dispose();
            }
            this.m_pack_dict[pack_name] = null;
        }
        public addpack(pack_name:string,buff:Laya.Byte):void{
            if(this.m_pack_dict.hasOwnProperty(pack_name)){
                this.delpack(pack_name);
            }
            let new_fp:filepack = new filepack(buff);
            this.m_pack_dict[pack_name] = new_fp;
        }
        public get_file(pack_name:string,file_name:string):Laya.Byte{
            if(this.m_pack_dict.hasOwnProperty(pack_name) == false){
                return;
            }let fp:filepack = this.m_pack_dict[pack_name];
            if(fp != undefined && fp != null){
                return fp.get_file(file_name);
            }
            return null;
        }
        public get_file_len(pack_name:string,file_name:string):number{
            if(this.m_pack_dict.hasOwnProperty(pack_name) == false){
                return 0;
            }let fp:filepack = this.m_pack_dict[pack_name];
            if(fp != undefined && fp != null){
                return fp.get_file_len(file_name);
            }
            return 0;
        }
    }

    let g_ins:filepackmgr = null;
    export function filepack_ins():filepackmgr{
        if(g_ins == null){
            g_ins = new filepackmgr();
        }
        return g_ins;
    }
}