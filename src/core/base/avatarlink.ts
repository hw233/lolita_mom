module core{
    export class avatardirlink{
        public m_dir:number = 0;
        public m_framecount:number = 0;
        public m_ptcount:number = 0;
        public m_pt_arr:Array<Array<Laya.Point>> = null;
        private m_pt_max:number = 4;
        private m_invalid_pt:Laya.Point = new Laya.Point(0,0);
        constructor(){
            this.init();
        }
        public init():void{
            this.m_pt_arr = new Array<Array<Laya.Point>>();
            for(let i:number = 0;i < this.m_pt_max;++i){
                this.m_pt_arr.push(new Array<Laya.Point>());
            }
        }
        public dispose():void{
            
        }
        public add_pt(idx:number,x:number,y:number):void{
            this.m_pt_arr[idx].push(new Laya.Point(x,y));
        }
        public get_pt(pt_idx:number,idx:number):Laya.Point{
            if(idx >= this.m_pt_arr[pt_idx].length){
                if(this.m_pt_arr[pt_idx].length <= 0)
                {
                    return this.m_invalid_pt;
                }
                return this.m_pt_arr[pt_idx][idx%this.m_pt_arr[pt_idx].length];
            }
            return this.m_pt_arr[pt_idx][idx];
        }
        public print_data():void{
            for(let i:number = 0;i < this.m_pt_max;++i){
                let output:string = "ptidx "+i.toString()+" ";
                for(let j:number = 0;j < this.m_pt_arr[i].length;++j){
                    output = output + this.m_pt_arr[i][j].x.toString()+","+this.m_pt_arr[i][j].y.toString()+" ";
                }
                core.core_tiplog("avatardirlink ",output);
            }
        }
    }
    export class avatarlink{
        public m_id:number = 0;
        public m_action:number = 0;
        public m_sign:number = 0;
        public m_sign_txt:string = "";
        public m_version:number = 0;
        public m_dircount:number = 0;
        public m_dir_max:number = 8;
        public m_dir_arr:Array<avatardirlink> = null;
        constructor(){
            this.init();
        }
        public print_data():void{
            core.core_tiplog("avatarlink ",this.m_id,this.m_version,this.m_dircount);
            for(let i:number = 0;i < this.m_dir_max;++i){
                let dir_d:avatardirlink = this.m_dir_arr[i];
                core.core_tiplog("dir data:",dir_d.m_dir,dir_d.m_framecount,dir_d.m_ptcount);
                dir_d.print_data();
            }
        }
        public dispose():void{
            if(this.m_dir_arr == null){
                return;
            }
            for(let i:number = 0;i < this.m_dir_arr.length;++i){
                utils.recover("avatardirlink",this.m_dir_arr[i]);
            }
            this.m_dir_arr = null;
        }
        public get_pt(dir:number,pt_idx:number,idx:number):Laya.Point{
            return this.m_dir_arr[dir].get_pt(pt_idx,idx);
        }
        public init():void{
            this.dispose();
            this.m_dir_arr = new Array<avatardirlink>();
            for(let i:number = 0;i < this.m_dir_max;++i){
                let new_dir:avatardirlink = utils.getitembycls("avatardirlink",avatardirlink);
                new_dir.init();
                this.m_dir_arr.push(new_dir);
            }
        }
        //
        public set_txt_buff(buf:Laya.Byte,buf_len:number):void{
            let f_buf:string = buf.getUTFBytes(buf_len);
            let line_arr:Array<string> = f_buf.split("\r\n");
            if(line_arr.length < 3){
                core.core_errlog("avatar_link set_txt_buff error line_arr.length < 3 ",f_buf);
                return;
            }
            let tmp_arr:Array<string> = null;
            let line_no:number = 0;
            this.m_sign_txt = line_arr[line_no];
            line_no += 1;
            let line_str:string = line_arr[line_no];
            tmp_arr = line_str.split(":");
            this.m_version = parseInt(tmp_arr[1]);
            line_no += 1;

            line_str = line_arr[line_no];
            tmp_arr = line_str.split(":");
            this.m_dircount = parseInt(tmp_arr[1]);
            line_no += 1;

            for(let i:number = 0;i < this.m_dircount;++i){
                line_str = line_arr[line_no];
                tmp_arr = line_str.split(":");
                let dir:number = parseInt(tmp_arr[1]);
                line_no += 1;

                line_str = line_arr[line_no];
                tmp_arr = line_str.split(":");
                let framecount:number = parseInt(tmp_arr[1]);
                line_no += 1;

                line_str = line_arr[line_no];
                tmp_arr = line_str.split(":");
                let ptcount:number = parseInt(tmp_arr[1]);
                line_no += 1;

                this.m_dir_arr[dir].m_dir = dir;
                this.m_dir_arr[dir].m_framecount = framecount;
                this.m_dir_arr[dir].m_ptcount = ptcount;
                this.m_dir_arr[dir].init();
                for(let j:number = 0;j < ptcount;++j){
                    line_str = line_arr[line_no];
                    tmp_arr = line_str.split(":");
                    let ptidx:number = parseInt(tmp_arr[1]);
                    line_no += 1;

                    for(let k:number = 0;k < framecount;++k){
                        line_str = line_arr[line_no];
                        tmp_arr = line_str.split(",");
                        line_no += 1;
                        let x:number = parseInt(tmp_arr[0]);
                        let y:number = parseInt(tmp_arr[1]);
                        this.m_dir_arr[dir].add_pt(ptidx,x,y);
                    }
                }
            }

        }
        //
        public set_buff(buf:Laya.Byte,buf_len:number):void{
            this.m_sign = buf.getUint32();
            this.m_version = buf.getUint8();
            this.m_dircount = buf.getUint8();
            for(let i:number = 0;i < this.m_dircount;++i){
                let dir:number = buf.getUint8();
                let framecount:number = buf.getUint8();
                let ptcount:number = buf.getUint8();
                this.m_dir_arr[dir].m_dir = dir;
                this.m_dir_arr[dir].m_framecount = framecount;
                this.m_dir_arr[dir].m_ptcount = ptcount;
                this.m_dir_arr[dir].init();
                for(let j:number = 0;j < ptcount;++j){
                    let ptidx:number = buf.getUint8();
                    for(let k:number = 0;k < framecount;++k){
                        let x:number = buf.getUint16();
                        let y:number = buf.getUint16();
                        this.m_dir_arr[dir].add_pt(ptidx,x,y);
                    }
                }
            }
        }
    }
}