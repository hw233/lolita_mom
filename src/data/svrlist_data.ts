module data{
    export class svr_data{
        public m_id:number = 0;
        public m_name:string = "";
        public m_ip:string = "";
        public m_port:number = 0;
        public m_type:number = 0;//1表示新服
        public m_state:number = 0;//1拥挤2停服
        constructor(){

        }
    }
    export class svr_district{
        public m_id:number = 0;
        public m_name:string = "";
        public m_svr_list:Array<number> = new Array<number>();
    }
    export class svrlist_data extends utils.game_data{
        public m_svrlist_json:Object = null;
        public m_recent_list:Array<number> = new Array<number>();
        public m_district_list:Array<svr_district> = new Array<svr_district>();
        private m_svr_dict = new Laya.Dictionary();
        public m_cur_svr_id:number = 0;
        public m_pre_connect_svr_id:number = 0;
        constructor()
        {
            super();
        }
        public get_districtid_by_svrid(svr_id:number){
            for(let i of this.m_district_list){
                for(let j of i.m_svr_list){
                    if(j == svr_id){
                        return i.m_id;
                    }
                }
            }
            return 0;
        }
        public get_district_data(district_id:number):svr_district{
            for(let i of this.m_district_list){
                if(i.m_id == district_id){
                    return i;
                }
            }
            return null;
        }
        public get_svr_data(svr_id: number): svr_data {
            return this.m_svr_dict.get(svr_id);
        }
        public get_svr_dict(): Laya.Dictionary {
            return this.m_svr_dict;
        }
        public get_recommend_svr():number{
            return 0;
        }
        public update_recent():void{
            this.m_recent_list.length = 0;
            let v:string = helper.get_local("recent_svr_list");
            if(v != null && v.length > 0){
                let vlist:Array<string> = v.split(',');
                for(let i of vlist){
                    if(i != null && i.length > 0){
                        let bfind:boolean = false;
                        for(let j of this.m_recent_list){
                            if(j == parseInt(i)){
                                bfind = true;
                                break;
                            }
                        }
                        if(!bfind){
                            this.m_recent_list.push(parseInt(i));
                        }
                    }
                    
                }
            }
            core.game_tiplog("svrlist_data get recent_svr_list ",v,this.m_recent_list.toString());
        }
        public add_recent(svr_id:number):void{
            let tmp:Array<number> = new Array<number>();
            tmp.push(svr_id);
            for(let i of this.m_recent_list){
                if(i != svr_id && this.get_svr_data(i) != null){
                    tmp.push(i);
                }
            }
            this.m_recent_list = tmp;
            let save_str:string = "";
            for(let i of this.m_recent_list){
                if(save_str.length > 0){
                    save_str = save_str + ",";
                }
                save_str = save_str + i.toString();
            }
            core.game_tiplog("svrlist_data save recent_svr_list ",save_str);
            helper.set_local("recent_svr_list",save_str);
        }
        public update_json(json_data:string):void{
            let jdata:Object = JSON.parse(json_data);;
            this.set_json_data(jdata);
        }
        public set_json_data(jdata:Object):void{
            this.m_svrlist_json = jdata;
            this.m_svr_dict.clear();
            for(let i of this.m_svrlist_json['svr_cfg']){
                let sdata:svr_data = new svr_data();
                sdata.m_id = parseInt(i['id']);
                sdata.m_name = i['name'];
                sdata.m_ip = i['ip'];
                sdata.m_port = parseInt(i['port']);
                sdata.m_type = parseInt(i['type']);
                sdata.m_state = parseInt(i['state']);
                this.m_svr_dict.set(sdata.m_id, sdata);
            }
            this.m_district_list = new Array<svr_district>();
            this.m_district_list.length = 0;
            for(let i of this.m_svrlist_json['dis_cfg']){
                let sddata:svr_district = new svr_district();
                sddata.m_id = parseInt(i['id']);
                for(let j of i['svrlist']){
                    sddata.m_svr_list.push(parseInt(j));
                }
                sddata.m_svr_list.sort(this._svr_sort); // 排序
                this.m_district_list.push(sddata);
            }
            this.m_district_list.sort(this._dis_sort); // 排序
            // 内网测试服务器地址
            if (this.is_testing() == true) {
                if (this.m_district_list.length > 0) {
                    let sd_ins = this.m_district_list[0] as svr_district;
                    let t_svr_list = [153, 158, 136, 160, 181, 155, 176, 182, 130, 184];
                    let new_svr_list = t_svr_list.concat(sd_ins.m_svr_list);
                    sd_ins.m_svr_list = new_svr_list;
                }
            }
        }
        private _dis_sort(dis_ins1: svr_district, dis_ins2: svr_district): number {
            return dis_ins1.m_id - dis_ins2.m_id;
        }
        private _svr_sort(svr_id1: number, svr_id2: number): number {
            return svr_id1 - svr_id2;
        }
        private is_testing(): boolean {
            return false;
        }
        public dispose()
        {
            super.dispose();
        }
    }
}