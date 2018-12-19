module game_event{
    export const EVENT_NET_PACKET:string = "net_packet";
    export const EVENT_NET_CONNECTED:string = "net_connected";
    export const EVENT_NET_CLOSED:string = "net_closed";
    export const EVENT_NET_ERROR:string = "net_error";
    export const EVENT_WIDGET_ONSHOW:string = "ui_widget_onshow";
    export const EVENT_WIDGET_ONHIDE:string = "ui_widget_onhide";
    export const EVENT_WIDGET_ONDISPOSE:string = "ui_widget_ondispose";
    export const EVENT_WIDGET_ALLDISPOSE:string = "ui_widget_alldispose";
    export const EVENT_TESTCOMBAT:string = "test_combat";
    export const EVENT_TESTCOMBATPROTO:string = "test_combatproto";
    export function gen_netcmd_event(cmd:number):string{
        return EVENT_NET_PACKET+"_"+cmd.toString();
    }
}
module protocol_def{
    export const C2S_CMD_2_TYPE:{[key:number]:string;} = {
    }
 //   C2S_CMD_2_TYPE[C2S_CHAT] = "net_protocol.ChatMsg";

    export const S2C_CMD_2_TYPE:{[key:number]:string;} = {
    }
    export let C2S_CMD_2_PROTO:{[key:number]:string;} = {
    }
    export let S2C_CMD_2_PROTO:{[key:number]:string;} = {
    }
    export function register_cmd(c2s_map:{[key:number]:string;},s2c_map:{[key:number]:string;}):void{
        for(let i in c2s_map){
            if(c2s_map.hasOwnProperty(i)){
                C2S_CMD_2_PROTO[i] = c2s_map[i];
            }
        }
        for(let i in s2c_map){
            if(s2c_map.hasOwnProperty(i)){
                S2C_CMD_2_PROTO[i] = s2c_map[i];
            }
        }
    }
    export let Protocol_desc_map = {};
    export function register_protocol_desc(desc_map:{}):void{
        Protocol_desc_map = desc_map; 
    }
}
module protocolbuf{
    export class protocolbuf{
        private m_temp:laya.utils.Byte = new laya.utils.Byte();
        constructor()
        {
        }
        public get_desc_byname(name:string):Array<Array<string>>
        {
            let desc:Array<Array<string>> = protocol_def.Protocol_desc_map[name];
            return desc;
        }
        public pack_uint8(buf:Laya.Byte,v:number):void
        {
            buf.writeUint8(v);
        }
        public unpack_uint8(buf:Laya.Byte):number
        {
            return buf.getUint8();
        }
        public pack_uint16(buf:Laya.Byte,v:number):void
        {
            buf.writeUint16(v);
        }
        public unpack_uint16(buf:Laya.Byte):number
        {
            return buf.getUint16();
        }
        public pack_uint32(buf:Laya.Byte,v:number):void
        {
            buf.writeUint32(v);
        }
        public unpack_uint32(buf:Laya.Byte):number
        {
            return buf.getUint32();
        }
        //
        public pack_int8(buf:Laya.Byte,v:number):void
        {
            if(v < 0){
                v += 256;
            }
            buf.writeUint8(v);
        }
        public unpack_int8(buf:Laya.Byte):number
        {
            let ret:number = buf.getUint8();
            if(ret > 127){
                ret -= 256;
            }
            return ret;
        }
        public pack_int16(buf:Laya.Byte,v:number):void
        {
            buf.writeInt16(v);
            //if(v < 0){
            //    v += 0x10000;
            //    v = v&0xffff;
            //}
            //buf.writeUint16(v);
        }
        public unpack_int16(buf:Laya.Byte):number
        {
            let ret:number = buf.getInt16();
            //let ret:number = buf.getUint16();
            //if(ret > (0xffff>>1)){
            //    ret -= 0x10000;
            //    ret = ret&0xffff;
            //}
            return ret;
        }
        public pack_int32(buf:Laya.Byte,v:number):void
        {
            buf.writeInt32(v);
            //if(v < 0){
            //    v += (0xffffffff + 1);
            //    v = v & 0xffffffff;
            //}
            //buf.writeUint32(v);
        }
        public unpack_int32(buf:Laya.Byte):number
        {
            let ret:number = buf.getInt32();
            //let ret:number = buf.getUint32();
            //if(ret > (0xffffffff>>1)){
            //    ret -= (0xffffffff + 1);
            //    ret = ret&0xffffffff;
            //}
            return ret;
        }
        //
        public pack_byte(buf:Laya.Byte,v:Laya.Byte):void{
            if(v == undefined || v == null || v.length <= 0)
            {
                return;
            }
            v.pos = 0;
            while(v.bytesAvailable > 0){
                buf.writeUint8(v.getUint8());
            }
        }
        public unpack_byte(buf:Laya.Byte,blen:number):Laya.Byte
        {
            let ret:Laya.Byte = new Laya.Byte();
            while(buf.bytesAvailable > 0 && blen > 0){
                ret.writeUint8(buf.getUint8());
                blen -= 1;
            }
            return ret;
        }
        public pack_byte8(buf:Laya.Byte,v:Laya.Byte):void{
            if(v == null){
                buf.writeUint8(0);
                return;
            }
            v.pos = 0;
            buf.writeUint8(v.length);
            let len = v.length;
            if(len > 0xff){
                len = 0xff;
            }
            if(v.length > 0){
                while(v.bytesAvailable > 0 && len > 0){
                    buf.writeUint8(v.getUint8());
                    len -= 1;
                }
            }
        }
        public unpack_byte8(buf:Laya.Byte):Laya.Byte
        {
            let ret:Laya.Byte = new Laya.Byte();
            let len:number = buf.getUint8();
            while(buf.bytesAvailable > 0 && len > 0){
                ret.writeUint8(buf.getUint8());
                len -= 1;
            }
            return ret;
        }
        public pack_byte16(buf:Laya.Byte,v:Laya.Byte):void{
            if(v == null){
                buf.writeUint16(0);
                return;
            }
            v.pos = 0;
            buf.writeUint16(v.length);
            let len = v.length;
            if(len > 0xffff){
                len = 0xffff;
            }
            if(v.length > 0){
                while(v.bytesAvailable > 0 && len > 0){
                    buf.writeUint8(v.getUint8());
                    len -= 1;
                }
            }
        }
        public unpack_byte16(buf:Laya.Byte):Laya.Byte
        {
            let ret:Laya.Byte = new Laya.Byte();
            let len:number = buf.getUint16();
            while(buf.bytesAvailable > 0 && len > 0){
                ret.writeUint8(buf.getUint8());
                len -= 1;
            }
            return ret;
        }
        public pack_byte32(buf:Laya.Byte,v:Laya.Byte):void{
            if(v == null){
                buf.writeUint32(0);
                return;
            }
            v.pos = 0;
            buf.writeUint32(v.length);
            let len = v.length;
            if(len > 0xffffffff){
                len = 0xffffffff;
            }
            if(v.length > 0){
                while(v.bytesAvailable > 0 && len > 0){
                    buf.writeUint8(v.getUint8());
                    len -= 1;
                }
            }
        }
        public unpack_byte32(buf:Laya.Byte):Laya.Byte
        {
            let ret:Laya.Byte = new Laya.Byte();
            let len:number = buf.getUint32();
            while(buf.bytesAvailable > 0 && len > 0){
                ret.writeUint8(buf.getUint8());
                len -= 1;
            }
            return ret;
        }
        //
        public pack_string8(buf:Laya.Byte,v:string):void
        {
            if(v == undefined || v == null)
            {
                v = "";
            }
            let oldp:number = buf.pos;
            buf.writeUint8(v.length);
            let startp:number = buf.pos;
            buf.writeUTFBytes(v);
            let p:number = buf.pos;
            let truelen:number = p - startp;
            buf.pos = oldp;
            buf.writeUint8(truelen);
            buf.pos = p;
        }
        public unpack_string8(buf:Laya.Byte):string
        {
            let len:number = buf.getUint8();
            return buf.getUTFBytes(len);
        }
        public pack_string16(buf:Laya.Byte,v:string):void
        {
            if(v == undefined || v == null)
            {
                v = "";
            }
            let oldp:number = buf.pos;
            buf.writeUint16(v.length);
            let startp:number = buf.pos;
            buf.writeUTFBytes(v);
            let p:number = buf.pos;
            let truelen:number = p - startp;
            buf.pos = oldp;
            buf.writeUint16(truelen);
            buf.pos = p
        }
        public unpack_string16(buf:Laya.Byte):string
        {
            let len:number = buf.getUint16();
            let ret:string = buf.getUTFBytes(len);
            return ret;
        }
        public pack_string32(buf:Laya.Byte,v:string):void
        {
            if(v == undefined || v == null)
            {
                v = "";
            }
            let oldp:number = buf.pos;
            buf.writeUint32(v.length);
            let startp:number = buf.pos;
            buf.writeUTFBytes(v);
            let p:number = buf.pos;
            let truelen:number = p - startp;
            buf.pos = oldp;
            buf.writeUint32(truelen);
            buf.pos = p
        }
        public unpack_string32(buf:Laya.Byte):string
        {
            let len:number = buf.getUint32();
            return buf.getUTFBytes(len);
        }
        public pack_int_data(ret:Laya.Byte,type:string,v:number):void
        {
            if(type == 'uint8')
            {
                this.pack_uint8(ret,v);
            }
            else if(type == 'uint16')
            {
                this.pack_uint16(ret,v);
            }
            else if(type == 'uint32')
            {
                this.pack_uint32(ret,v);
            }
            else if(type == 'int8')
            {
                this.pack_int8(ret,v);
            }
            else if(type == 'int16')
            {
                this.pack_int16(ret,v);
            }
            else if(type == 'int32')
            {
                this.pack_int32(ret,v);
            }
        }
        public unpack_int_data(ret:Laya.Byte,type:string):number
        {
            if(type == 'uint8')
            {
                return this.unpack_uint8(ret);
            }
            else if(type == 'uint16')
            {
                return this.unpack_uint16(ret);
            }
            else if(type == 'uint32')
            {
                return this.unpack_uint32(ret);
            }
            else if(type == 'int8')
            {
                return this.unpack_int8(ret);
            }
            else if(type == 'int16')
            {
                return this.unpack_int16(ret);
            }
            else if(type == 'int32')
            {
                return this.unpack_int32(ret);
            }
            return 0;
        }
        public pack_string_data(ret:Laya.Byte,type:string,v:string):void
        {
            if(type == 'string8')
            {
                this.pack_string8(ret,v);
            }
            else if(type == 'string16')
            {
                this.pack_string16(ret,v);
            }
            else if(type == 'string32')
            {
                this.pack_string32(ret,v);
            }
        }
        public unpack_string_data(ret:Laya.Byte,type:string):string
        {
            if(type == 'string8')
            {
                return this.unpack_string8(ret);
            }
            else if(type == 'string16')
            {
                return this.unpack_string16(ret);
            }
            else if(type == 'string32')
            {
                return this.unpack_string32(ret);
            }
            return "";
        }
        public pack_data(ret:Laya.Byte,type:string,value:string,data:any):void
        {
            if(type == "int8" || type == "int16" || type == "int32" || type == "uint8"||type=="uint16"||type=="uint32")
            {
                this.pack_int_data(ret,type,data as number);
            }
            else if(type == "string8" || type == "string16" || type == "string32")
            {
                this.pack_string_data(ret,type,data as string);
            }
            else if(type == "byte8"){
                this.pack_byte8(ret,data as Laya.Byte);
            }
            else if(type == "byte16"){
                this.pack_byte16(ret,data as Laya.Byte);
            }
            else if(type == "byte32"){
                this.pack_byte32(ret,data as Laya.Byte);
            }
            else if(type == "byte"){
                this.pack_byte(ret,data as Laya.Byte);
            }
            else if(type == 'list8' || type == 'list16' || type == 'list32')
            {
                let listdata:any[] = data as any[];
                let len:number = listdata.length;
                if(type == 'list8')
                {
                    this.pack_uint8(ret,len);
                }
                else if(type == 'list16')
                {
                    this.pack_uint16(ret,len);
                }
                else if(type == 'list32')
                {
                    this.pack_uint32(ret,len);
                }
                let subtype:string = value;
                for(let i of listdata)
                {
                    if(subtype == "int8" || subtype == "int16" || subtype == "int32" || subtype=="uint8" || subtype=="uint16" || subtype=="uint32")
                    {
                        this.pack_int_data(ret,subtype,i as number);
                    }
                    else if(subtype == "string8" || subtype == "string16" || subtype == "string32")
                    {
                        this.pack_string_data(ret,subtype,i as string);
                    }
                    else if(subtype == "byte8"){
                        this.pack_byte8(ret,i as Laya.Byte);
                    }
                    else if(subtype == "byte16"){
                        this.pack_byte16(ret,i as Laya.Byte);
                    }
                    else if(subtype == "byte32"){
                        this.pack_byte32(ret,i as Laya.Byte);
                    }
                    else if(subtype == "byte"){
                        this.pack_byte(ret,i as Laya.Byte);
                    }
                    else
                    {
                        let desc:Array<Array<string>> = this.get_desc_byname(subtype);
                        for(let j of desc)
                        {
                            let p:string = j[0];
                            let stype:string = j[1];
                            let svalue:string = j[2];
                            this.pack_data(ret,stype,svalue,i[p]);
                        }
                    }
                    
                }
            }
            else
            {
                let desc:Array<Array<string>> = this.get_desc_byname(type);
                for(let j of desc)
                {
                    let p:string = j[0];
                    let stype:string = j[1];
                    let svalue:string = j[2];
                    this.pack_data(ret,stype,svalue,data[p]);
                }
            }
        }
        public unpack_data(type:string,value:string,buf:Laya.Byte,max_len:number = -1):any
        {
            let nv:number;
            let sv:string;
            let bv:Laya.Byte;
            if(max_len < 0){
                max_len = buf.length;
            }
            if(type == "int8" || type == "int16" || type == "int32" || type=="uint8" || type=="uint16" || type=="uint32")
            {
                nv = this.unpack_int_data(buf,type);
                return nv;
            }
            else if(type == "string8" || type == "string16" || type == "string32")
            {
                sv = this.unpack_string_data(buf,type);
                return sv;
            }
            else if(type == "byte8"){
                bv = this.unpack_byte8(buf);
                return bv;
            }
            else if(type == "byte16"){
                bv = this.unpack_byte8(buf);
                return bv;
            }
            else if(type == "byte32"){
                bv = this.unpack_byte8(buf);
                return bv;
            }
            else if(type == "byte"){
                bv = this.unpack_byte(buf,max_len);
                return bv;
            }
            else if(type == 'list8' || type == 'list16' || type == 'list32')
            {
                let len:number = 0;
                if(type == 'list8')
                {
                    len = this.unpack_uint8(buf);
                }
                else if(type == 'list16')
                {
                    len = this.unpack_uint16(buf);
                }
                else if(type == 'list32')
                {
                    len = this.unpack_uint32(buf);
                }
                let subtype:string = value;
                let listdata:any[] = [];
                for(let i = 0;i < len;++i)
                {
                    if(subtype == "int8" || subtype == "int16" || subtype == "int32" || subtype == "uint8" || subtype == "uint16" || subtype == "uint32")
                    {
                        nv = this.unpack_int_data(buf,subtype);
                        listdata.push(nv);
                    }
                    else if(subtype == "string8" || subtype == "string16" || subtype == "string32")
                    {
                        sv = this.unpack_string_data(buf,subtype);
                        listdata.push(sv);
                    }
                    else if(subtype == "byte8"){
                        bv = this.unpack_byte8(buf);
                        listdata.push(bv);
                    }
                    else if(subtype == "byte16"){
                        bv = this.unpack_byte8(buf);
                        listdata.push(bv);
                    }
                    else if(subtype == "byte32"){
                        bv = this.unpack_byte8(buf);
                        listdata.push(bv);
                    }
                    else if(subtype == "byte"){
                        bv = this.unpack_byte(buf,max_len);
                        listdata.push(bv);
                    }
                    else
                    {
                        let desc:Array<Array<string>> = this.get_desc_byname(subtype);
                        let ret:{} = {};
                        for(let j of desc)
                        {
                            let p:string = j[0];
                            let stype:string = j[1];
                            let svalue:string = j[2];
                            ret[p] = this.unpack_data(stype,svalue,buf,max_len);
                        }
                        listdata.push(ret);
                    }
                }
                //
                return listdata;
            }
            else
            {
                let desc:Array<Array<string>> = this.get_desc_byname(type);
                let ret:{} = {};
                for(let j of desc)
                {
                    let p:string = j[0];
                    let stype:string = j[1];
                    let svalue:string = j[2];
                    ret[p] = this.unpack_data(stype,svalue,buf,max_len);
                }
                return ret;
            }
        }
        public c2s_rawbuff2buf(cmd:number,buff:Laya.Byte):Laya.Byte{
            let ret:Laya.Byte = new Laya.Byte();
            ret.endian = Laya.Byte.BIG_ENDIAN;
            //
            ret.writeByte(19);
            ret.writeByte(82);
            ret.writeByte(8);
            ret.writeByte(28);
            ret.writeByte(1);
            ret.writeInt32(1);
            let lenpos:number = ret.pos;
            ret.writeInt32(0);
            ret.writeInt32(cmd);
            //
            buff.pos = 0;
            while(buff.pos < buff.length){
                ret.writeUint8(buff.getUint8());
            }
            
            let cp:number = ret.pos;
            let tl:number = cp - lenpos - 4;
            ret.pos = lenpos;
            ret.writeInt32(tl);
            ret.pos = 0;
            return ret;
        }
        public c2s_data2buf(cmd:number,data:{}):Laya.Byte
        {
            let ret:Laya.Byte = new Laya.Byte();
            ret.endian = Laya.Byte.BIG_ENDIAN;
            //
            ret.writeByte(19);
            ret.writeByte(82);
            ret.writeByte(8);
            ret.writeByte(28);
            ret.writeByte(1);
            ret.writeInt32(1);
            let lenpos:number = ret.pos;
            ret.writeInt32(0);
            ret.writeInt32(cmd);
            //
            if(protocol_def.C2S_CMD_2_PROTO[cmd] != undefined)
            {
                let desc_name:string = protocol_def.C2S_CMD_2_PROTO[cmd];
                let desc:Array<Array<string>> = this.get_desc_byname(desc_name);
                for(let i of desc)
                {
                    let p:string = i[0];
                    let type:string = i[1];
                    let value:string = i[2];
                    this.pack_data(ret,type,value,data[p]);
                }
            }
            
            let cp:number = ret.pos;
            let tl:number = cp - lenpos - 4;
            ret.pos = lenpos;
            ret.writeInt32(tl);
            ret.pos = 0;
            return ret;
        }
        public s2c_buf2data(buf:Laya.Byte):{}
        {
            core.net_errlog("s2c_buf2data ",buf);
            let cmd:number = 0;
            let ret:{} = {};
            let tmp:number = 0;
            
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getInt32();
            let buflen:number = buf.getInt32();
            cmd = buf.getInt32();
            core.net_errlog("s2c_buf2data1 ",buf.length,buf.pos,buflen,cmd);
            if(protocol_def.S2C_CMD_2_PROTO[cmd] != undefined)
            {
                let desc_name:string = protocol_def.S2C_CMD_2_PROTO[cmd];
                let desc:Array<Array<string>> = this.get_desc_byname(desc_name);
                for(let i of desc)
                {
                    let p:string = i[0];
                    let type:string = i[1];
                    let value:string = i[2];
                    ret[p] = this.unpack_data(type,value,buf,buflen);
                }
            }
            
            let data_r:{} = {};
            data_r['cmd'] = cmd;
            data_r['data'] = ret;
            return data_r;
        }
        /////
        public c2s_rawbuff2buf_tl(cmd:number,sbuff:Laya.Byte,sendbuff:Laya.Byte):Laya.Byte{
            let plen:number = sbuff.length;
            plen += 2;
            sendbuff.clear();
            sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            if(plen < 0xff){
                sendbuff.writeUint8(plen);
            }
            else{
                sendbuff.pos = 0;
                sendbuff.writeUint8(0xff);
                sendbuff.writeUint32(plen);
                sendbuff.pos = 4;

            }
            sendbuff.writeInt16(cmd);
            sbuff.pos = 0;
            while(sbuff.pos < sbuff.length){
                sendbuff.writeUint8(sbuff.getUint8());
            }
            sendbuff.pos = 0;
            return sendbuff;
        }
        public c2s_data2buf_tl(cmd:number,data:{},sendbuff:laya.utils.Byte):Laya.Byte
        {
            //core.net_errlog("c2s_data2buf_tl ",cmd,data);
            this.m_temp.clear();
            let ret:Laya.Byte = this.m_temp;
            ret.endian = Laya.Byte.LITTLE_ENDIAN;
            //
            ret.writeInt16(cmd);
            //
            if(protocol_def.C2S_CMD_2_PROTO[cmd] != undefined)
            {
                let desc_name:string = protocol_def.C2S_CMD_2_PROTO[cmd];
                let desc:Array<Array<string>> = this.get_desc_byname(desc_name);
                for(let i of desc)
                {
                    let p:string = i[0];
                    let type:string = i[1];
                    let value:string = i[2];
                    this.pack_data(ret,type,value,data[p]);
                }
            }
            
            let plen:number = ret.length;
            sendbuff.clear();
            let newret:Laya.Byte = sendbuff;
            newret.endian = Laya.Byte.LITTLE_ENDIAN;
            if(plen < 0xff){
                newret.writeUint8(plen);
            }
            else{
                newret.pos = 0;
                newret.writeUint8(0xff);
                newret.writeUint32(plen);
                newret.pos = 4;
            }
            ret.pos = 0;
            while(ret.pos < ret.length){
                newret.writeUint8(ret.getUint8());
            }
            newret.pos = 0;
            return newret;
        }
        public s2c_buf2data_tl(buf:Laya.Byte):{}
        {
            //core.net_errlog("s2c_buf2data_tl ",buf);
            let cmd:number = 0;
            let ret:{} = {};
            let tmp:number = 0;
            let buffoldpos:number = buf.pos;
            tmp = buf.getUint8();
            let recvlen:number = buf.length - buf.pos;
            let plen:number = 0;
            if(tmp == 0xff){
                buf.pos = buffoldpos;
                plen = buf.getUint32();
                plen = plen >> 8;
                recvlen = recvlen - 3;
            }
            else{
                plen = tmp;
            }
            if(plen > recvlen){
                core.net_errlog("s2c_buf2data_tl is not enough ",plen,recvlen,buf.length);
                buf.pos = buffoldpos;
                return null;
            }
            cmd = buf.getInt16();
            plen -= 2;
            core.net_tiplog("s2c_buf2data_tl ",cmd.toString(16),buf.length,buf.pos,plen);
            if(protocol_def.S2C_CMD_2_PROTO[cmd] != undefined)
            {
                let desc_name:string = protocol_def.S2C_CMD_2_PROTO[cmd];
                let desc:Array<Array<string>> = this.get_desc_byname(desc_name);
                for(let i of desc)
                {
                    let p:string = i[0];
                    let type:string = i[1];
                    let value:string = i[2];
                    ret[p] = this.unpack_data(type,value,buf,plen);
                }
            }
            else{
                buf.getUTFBytes(plen);
                core.net_errlog("cmd is not defined! ",cmd.toString(16));
            }
            
            let data_r:{} = {};
            data_r['cmd'] = cmd;
            data_r['data'] = ret;
            return data_r;
        }
        /////
    }
}