module net{
    export class protocol_item{
        public m_cmd:number = 0;
        public m_data:any = null;
        
        constructor(cmd:number,data:any)
        {
            this.m_cmd = cmd;
            this.m_data = data;
        }
    }
    export class game_net_mgr{
        protected m_socket: Laya.Socket;
        protected m_byte: Laya.Byte;
        protected m_b_connect:boolean = false;
        protected m_recv_list:Array<protocol_item> = new Array<protocol_item>();
        protected m_protocol_map:Object = new Object();
        protected m_s2c_protocol_map:Object = new Object();
        public m_protobuf_root:any = null;
        protected m_tmp_buf:Laya.Byte;
        protected m_buf_handle:protocolbuf.protocolbuf = new protocolbuf.protocolbuf();
        protected m_buff:laya.utils.Byte = new laya.utils.Byte();
        constructor()
        {
            this.m_byte = new Laya.Byte();
            this.m_tmp_buf = new Laya.Byte();
            //这里我们采用小端
            this.m_byte.endian = Laya.Byte.BIG_ENDIAN;
            this.m_buff.endian = Laya.Byte.BIG_ENDIAN;
            this.m_socket = new Laya.Socket();
            
            //这里我们采用小端
            //this.m_socket.endian = Laya.Byte.LITTLE_ENDIAN;

            this.m_socket.on(Laya.Event.OPEN, this, this.openHandler);
            this.m_socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
            this.m_socket.on(Laya.Event.CLOSE, this, this.closeHandler);
            this.m_socket.on(Laya.Event.ERROR, this, this.errorHandler);
        }
        public init():void
        {
            if(this.m_protobuf_root != null)
            {
                return;
            }
            core.net_errlog("game_net_mgr init");
            //Browser.window.protobuf.load("res/protocol/protocol.proto",this.on_protobuf_loaded);
        }
        private on_protobuf_loaded(err:any,root:any):void
        {
            core.net_errlog("game_net_mgr on_protobuf_loaded ",err,root);
            net.net_ins().m_protobuf_root = root;
            /*
            for(let i in protocol_def.S2C_CMD_2_TYPE)
            {
                this.get_s2c_protocol_cls(Number(i));
            }
            for(let i in protocol_def.C2S_CMD_2_TYPE)
            {
                this.get_protocol_cls(Number(i));
            }*/
        }
        protected get_s2c_protocol_cls(cmd:number):any
        {
            if(this.m_s2c_protocol_map[cmd] == undefined)
            {
                if(protocol_def.S2C_CMD_2_TYPE[cmd] == undefined)
                {
                    core.net_errlog("game_net_mgr get_s2c_protocol_cls error!! ",cmd);
                    return null;
                }
                let cls_str:string = protocol_def.S2C_CMD_2_TYPE[cmd.toString()];
                let cls:any = this.m_protobuf_root.lookupType(cls_str);
                this.m_s2c_protocol_map[cmd] = cls;
            }
            return this.m_s2c_protocol_map[cmd];
        }
        protected get_protocol_cls(cmd:number):any
        {
            if(this.m_protocol_map[cmd] == undefined)
            {
                if(protocol_def.C2S_CMD_2_TYPE[cmd] == undefined)
                {
                    core.net_errlog("game_net_mgr get_protocol_cls error!! ",cmd);
                    return null;
                }
                let cls_str:string = protocol_def.C2S_CMD_2_TYPE[cmd.toString()];
                let cls:any = this.m_protobuf_root.lookupType(cls_str);
                this.m_protocol_map[cmd] = cls;
            }
            return this.m_protocol_map[cmd];
        }
        protected openHandler(event: any = null): void {
            core.net_errlog("=======openHandler ",event);
            //正确建立连接；
            this.m_b_connect = true;
            utils.event_ins().fire_event(game_event.EVENT_NET_CONNECTED,this);
        }
        protected receiveHandler(msg: any = null): void {
            ///接收到数据触发函数
            //core.net_errlog("=======receiveHandler ",msg,typeof(msg));
            //let recvbuff:laya.utils.Byte = msg as laya.utils.Byte;
            let recvbuff:laya.utils.Byte = this.m_socket.input as laya.utils.Byte;
            for(let i:number = 0;i < recvbuff.length;++i){
                this.m_buff.writeUint8(recvbuff.getUint8());
            }

            //let data:{} = this.m_buf_handle.s2c_buf2data(this.m_socket.input);
            //let cmd:number = data['cmd'];
            //let recv:{} = data['data'];
            //this.m_recv_list.push(new protocol_item(cmd,recv));
            //core.net_errlog("recv ",cmd,recv);
            this.m_buff.pos = 0;
            this._on_split_netpack();
        }
        //
        protected _on_split_netpack():void{
            //core.net_errlog("TL_Login_net receiveHandler normal pkg ",this.m_buff);
            //this._print_pkg(this.m_buff,"split buff ");
            while(this.m_buff.bytesAvailable > 0){
                let data:{} = this.m_buf_handle.s2c_buf2data(this.m_buff);
                if(data == null){
                    if(this.m_buff.pos > 0){
                        let tmp:laya.utils.Byte = new laya.utils.Byte();
                        while(this.m_buff.bytesAvailable > 0){
                            tmp.writeUint8(this.m_buff.getUint8());
                        }
                        this.m_buff.clear();
                        this.m_buff = tmp;
                    }
                    return;
                }
                
                let cmd:number = data['cmd'];
                let recv:{} = data['data'];
                this.m_recv_list.push(new protocol_item(cmd,recv));
                core.net_tiplog("recv ",cmd.toString(16),recv);
            }
            this.m_buff.clear();
        }
        //
        protected closeHandler(e: any = null): void {
            //关闭事件
            core.net_errlog("=======closeHandler ",e);
            utils.event_ins().fire_event(game_event.EVENT_NET_CLOSED,[e,this]);
            this.close();
        }
        protected errorHandler(e: any = null): void {
            //连接出错
            core.net_errlog("=======errorHandler ",e);
            utils.event_ins().fire_event(game_event.EVENT_NET_ERROR,[e,this]);
            this.close();
        }
        public connect(host:string,port:number,svrid:number = 11):void
        {
            if(this.m_b_connect)
            {
                this.close();
            }
            let port_s:string = port.toString();
            let url:string = "ws://"+host+":"+port_s;
            this.m_socket.connectByUrl(url);
        }
        public close():void
        {
            if(this.m_b_connect)
            {
                this.m_socket.close();
                this.m_socket.cleanSocket();
            }
            this.m_b_connect = false;
        }
        public send_raw_buff(cmd:number,buff:Laya.Byte):void{
            core.net_errlog("send send_raw_buff ",cmd.toString(16));
            if(this.m_b_connect == false){
                return;
            }
            let buffer:Laya.Byte = this.m_buf_handle.c2s_rawbuff2buf(cmd,buff);
            //core.net_errlog("send send_raw_buff ",buffer.length);
            
            this.m_socket.send(buffer.buffer);
            core.net_errlog("send send_raw_buff ",cmd.toString(16),buffer.length);
            
            this.m_socket.flush();
        }
        public send(cmd:number,data:Object = null):void
        {
            core.net_tiplog("game_net_mgr send ",cmd,data,this.m_b_connect);
            if(this.m_b_connect == false){
                return;
            }
            //let cls:any = this.get_protocol_cls(cmd);
            //let ins:any = cls.create(data);
            //let buffer = cls.encode(ins).finish();
            let buffer:Laya.Byte = this.m_buf_handle.c2s_data2buf(cmd,data);
            core.net_tiplog("c2s buf ",buffer);
            /*
            buffer.pos = 0;
            let tmp = this.m_buf_handle.s2c_buf2data(cmd,buffer);
            core.net_errlog("s2c data ",tmp);
            for(let i of tmp["data"])
            {
                core.net_errlog("data ",i);
            }
            */
            
            core.net_tiplog("send databuflen ",buffer.length);
            
            this.m_socket.send(buffer.buffer);
            core.net_tiplog("send bufferlen ",buffer.length);
            
            this.m_socket.flush();

        }
        public update():void
        {
            if(this.m_recv_list.length > 0)
            {
                for(let i of this.m_recv_list)
                {
                    utils.event_ins().fire_event(game_event.gen_netcmd_event(i.m_cmd),i.m_data);
                }
                this.m_recv_list = new Array<protocol_item>();
            }
        }
        public update2():void{
            if(this.m_recv_list.length > 0)
            {
                for(let i of this.m_recv_list)
                {
                    utils.event_ins().fire_event(game_event.gen_netcmd_event(i.m_cmd),[i.m_data,this]);
                }
                this.m_recv_list = new Array<protocol_item>();
            }
        }
        public dispose()
        {
            if(this.m_b_connect)
            {
                this.close();
            }
        }
    }
////////////////////////////////////////////////////////////
    const PBK_LENGTH:number = 256;
    const PUBLIC_LOGIN_EKEY:Array<number> = [
0x904dca28, 0x384efb76, 0xd673484c, 0x20608059, 0x24b1741b, 0x04b6e8a5, 0xabf6f2f4, 0x780b8079,
0xbdaa5280, 0x37a3d148, 0xa9224c58, 0x874ffdfc, 0xfe0ffef3, 0x8fae9e64, 0xb96bfcfd, 0xf6859b5f,
0x7cfd3fbc, 0x6f7e1c2c, 0x301afad1, 0xb8cec699, 0xa3f57ea0, 0xb4d8ec66, 0x8affbe4b, 0x72857cf2,
0x8ea9f177, 0xd719bb3f, 0xeb38feeb, 0x7f7cd7e7, 0x87e1929b, 0x1f571efa, 0xdfbdf889, 0x135ffcf1,
0x4de31076, 0xcdcf5f44, 0xc15ee89f, 0x2b17df51, 0x8f1cdfff, 0xfc42f2fb, 0x9be32af8, 0x2a1c7cf4,
0x2f1cd50f, 0x7d71e5e8, 0xbefaf74e, 0x37ff4d06, 0xf0f83631, 0xe843bcd9, 0x67b29cac, 0x9d3d11d0,
0x7cfff548, 0xf9ae976b, 0x73eacf0f, 0xad663cb9, 0xd297f196, 0xc45120de, 0x3b9a7f87, 0x3f90a5a5,
0x4a5a5a4e, 0xe0ed6d61, 0x76fa3464, 0x2327274f, 0x4dbbd1e5, 0xb778f1e6, 0x8f8bfbf8, 0x17c2d4d9,
    ];
    export class CLoginEncode{
        private m_seed:number = 0;
        private m_bfish:blowfish.CBlowFish = new blowfish.CBlowFish();
        private m_buff:Laya.Byte = new Laya.Byte();
        constructor(){
            for(let i:number = 0;i < PUBLIC_LOGIN_EKEY.length;++i){
                this.m_buff.writeUint32(PUBLIC_LOGIN_EKEY[i]);
            }
            this.m_buff.pos = 0;
            this.m_bfish.InitializeKey(this.m_buff);
            this.m_bfish.Initialize(0xB426017C);
            
        }
        public print_data():void{
            this.m_bfish._print_array("print_data",true);
        }
        public MixKey(buff:Laya.Byte):void{
            this.m_bfish.InitializeKey(buff);
        }
        public Create(key:number):void{
            this.m_bfish.Initialize(key);
        }
        public Encode(buff:Laya.Byte):void{
            this.m_bfish.Encode(buff);
        }
        public Decode(buff:Laya.Byte):void{
            this.m_bfish.Decode(buff);
        }
        public GetSeed(){
            return this.m_seed;
        }
    }

    let PUBLIC_LOGIN_DKEY:Array<number> = [
0x6e5c79e3, 0x766cb435, 0xf9b99339, 0x3c5eecf5, 0xdd66b3e6, 0x60888033, 0xe208a008, 0x692a1b67,
0x15a0bce5, 0x7f0a40bc, 0xe5fc5352, 0xb4b447cb, 0x1d7623ae, 0x267d2a84, 0xb9f9a391, 0xe84b39b5,
0x7b10e93d, 0x75c22b58, 0x9e9ec0db, 0xca954387, 0x61c395bc, 0x31b93f93, 0xd9edaafa, 0xf5be1268,
0xcc11309a, 0x493a3dad, 0x983c730c, 0x16d8e581, 0x9160301f, 0x81369885, 0x98134302, 0xad00e5ad,
0xf65300e2, 0xa7aab7a8, 0x0b0dd5f9, 0x74ecd867, 0xb3b52d2c, 0x69d62cea, 0xbb2eec31, 0xd67f55e4,
0x9fa87ffd, 0xc4f10e89, 0xd5383a2a, 0x67f0f616, 0xaf3679f2, 0xd9624422, 0x5779c5e3, 0xf3af7447,
0xda76bb5a, 0xcd081326, 0x06e3e4ec, 0x73f45c4e, 0x0138ba05, 0x041824cc, 0xfe952b18, 0x78eb7794,
0xa4fc1480, 0xadd7b31f, 0x6df1e260, 0xa859f3a5, 0x89169d78, 0xb68a02ca, 0xffbaf647, 0x33319852,
    ];

    export class CLoginDecode{
        private m_seed:number = 0;
        private m_bfish:blowfish.CBlowFish = new blowfish.CBlowFish();
        private m_buff:Laya.Byte = new Laya.Byte();
        constructor(){
            //this.m_bfish.testfunc();
            for(let i:number = 0;i < PUBLIC_LOGIN_DKEY.length;++i){
                this.m_buff.writeUint32(PUBLIC_LOGIN_DKEY[i]);
            }
            this.m_buff.pos = 0;
            this.m_bfish.InitializeKey(this.m_buff);
        }
        public MixKey(buff:Laya.Byte):void{
            this.m_bfish.InitializeKey(buff);
        }
        public Create(key:number):void{
            this.m_bfish.Initialize(key);
        }
        public Encode(buff:Laya.Byte):void{
            this.m_bfish.Encode(buff);
        }
        public Decode(buff:Laya.Byte):void{
            this.m_bfish.Decode(buff);
        }
        public GetSeed(){
            return this.m_seed;
        }
    }
    
    export class TL_Login_net extends game_net_mgr{
        private m_svrid:number = 0;
        private m_host:string = "";
        private m_port:number = 0;
        private m_loginstep:number = 0;
        private m_b_connected:boolean = false;
        private m_loginencode:CLoginEncode = null;
        private m_logindecode:CLoginDecode = null;
        private m_sendencode:myencode.MyEncode = new myencode.MyEncode();
        private m_recvdecode:processencode.CProcessEncode = null;
        private m_loginIdx:number = 0;
        private m_decodebuff:laya.utils.Byte = new laya.utils.Byte();
        private m_sendbuff:laya.utils.Byte = new laya.utils.Byte();
        public m_parent:any = null;
        private m_testsendcount:number = 999;
        constructor(){
            super();
            this.m_buff.endian = Laya.Byte.BIG_ENDIAN;
            processencode.RC4_InitCode();
            this.m_recvdecode = new processencode.CProcessEncode();
        }
        public connect(host:string,port:number,svrid:number = 11):void{
            this.close();
            this.m_svrid = svrid;
            this.m_host = host;
            this.m_port = port;
            if(this.m_socket == null){
                this.m_socket = new laya.net.Socket();
                this.m_socket.endian = Laya.Byte.BIG_ENDIAN;//Laya.Byte.LITTLE_ENDIAN;BIG_ENDIAN
                this.m_socket.on(Laya.Event.OPEN, this, this.openHandler);
                this.m_socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
                this.m_socket.on(Laya.Event.CLOSE, this, this.closeHandler);
                this.m_socket.on(Laya.Event.ERROR, this, this.errorHandler);
            }
            this.m_socket.connectByUrl("ws://"+host+":"+port.toString());
        }
        private _getbuffuint8(buff:laya.utils.Byte,pos:number):number{
            let oldpos = buff.pos;
            buff.pos = pos;
            let ret:number = buff.getUint8();
            buff.pos = oldpos;
            return ret;
        }
        private _setbuffuint8(buff:laya.utils.Byte,pos:number,v:number):void{
            let oldpos = buff.pos;
            buff.pos = pos;
            buff.writeUint8(v);
            buff.pos = oldpos;
        }
        public testfunc2():void{
            let test_data1:Array<number> = [
		0xca,0xc2,0xf6,0xfd,0x3f,0x30,0x2e,0x04,0xe0,0xf6,0x8f,0xa6,0x71,0xa7,0xf2,0x0b,0xb9,0xd2,0xef,0xe9,0xd5,0xcf,0x2b,0x11,0xaf,0x80,0x8b,0x3a,0x63,0x93,0x56,0x73];
            let firstpkg:laya.utils.Byte = new laya.utils.Byte();
            for(let i:number = 0;i < test_data1.length;++i){
                firstpkg.writeUint8(test_data1[i]);
            }
            this._print_pkg(firstpkg,"recv src ");
            this.m_recvdecode.Create(0xf73e39fb);
            this.m_recvdecode.Encode(firstpkg);
            this._print_pkg(firstpkg,"recv decode ");


             //test send
             /*
            let teststring:string = "999666333";
            
            let newret:Laya.Byte = new Laya.Byte();
            newret.endian = Laya.Byte.LITTLE_ENDIAN;
            newret.writeUint8(0);
            newret.writeUint16(0x100);
            newret.writeUint16(teststring.length);
            newret.writeUTFBytes(teststring);
            let plen:number = newret.length-1;
            core.net_errlog("newret len ",newret.length);
            newret.pos = 0;
            newret.writeUint8(plen);

            newret.pos = 0;
            this._print_pkg(newret,"send src");
            newret.pos = 0;
            this.m_sendencode.Encode(newret);
            this._print_pkg(newret,"send encode ");

            let recvdecode:myencode.MyEncode = new myencode.MyEncode();
            newret.pos = 0;
            recvdecode.Decode(newret);
            this._print_pkg(newret,"send decode ");
            */
        }

        public testfunc():void{
            let firstpkg:laya.utils.Byte = new laya.utils.Byte();
            let firstpkg_len:number = 40;
            let test_data:Array<number> = [
		0xca,0xc2,0xf6,0xfd,0x3f,0x30,0x2e,0x04,0xe0,0xf6,0x8f,0xa6,0x71,0xa7,0xf2,0x0b,0xb9,0xd2,0xef,0xe9,0xd5,0xcf,0x2b,0x11,0xaf,0x80,0x8b,0x3a,0x63,0x93,0x56,0x73,0x21,0xb2,0xd0,0xae,0xd3,0x3b,0x97,0x9d];
            for(let i:number = 0;i < firstpkg_len;++i){
                firstpkg.writeUint8(test_data[i]);
            }

            this._print_pkg(firstpkg,"testbuff ");

            this.m_loginIdx = 0;
            firstpkg.pos = 0;
            for(let i:number = 0; i<firstpkg_len-1;++i){
                this.m_loginIdx += (this._getbuffuint8(firstpkg,i)^this._getbuffuint8(firstpkg,i+1));
            }
            this.m_loginIdx = this.m_loginIdx%36;
            core.net_errlog("this.m_loginIdx ",this.m_loginIdx);

            let mixkey:laya.utils.Byte = new laya.utils.Byte();
            firstpkg.pos = 3;
            for(let i:number = 0;i < 32;++i){
                mixkey.writeUint8(firstpkg.getUint8());
            }
            this._print_pkg(mixkey,"testbuff mixkey ");
            mixkey.pos = 0;
            if(this.m_logindecode == null){
                this.m_logindecode = new CLoginDecode();
            }
            this.m_logindecode.MixKey(mixkey);
            mixkey.pos = 0;
            if(this.m_loginencode == null){
                this.m_loginencode = new CLoginEncode();
            }
            this.m_loginencode.MixKey(mixkey);

            let svrencode:CLoginEncode = new CLoginEncode();
            mixkey.pos = 0;
            svrencode.MixKey(mixkey);

            let test_data1:Array<number> = [
		0xf1,0x73,0x3c,0x25,0x68,0x10,0xc5,0xe2,0x2c,0x85,0x13,0xff,0xef,0x6b,0x3c,0xe4,0x88,0xac,0x44,0x68,0x8c,0x5d,0x43,0x9e,0x4e,0x12,0x20,0x74,0x04,0x05,0x0b,0x7c,0x67,0x9e,0xba,0x6e,0xc6,0x3c,0x40,0xc3];
            let tempbuff:laya.utils.Byte = new laya.utils.Byte();
            for(let i:number = 0;i < firstpkg_len;++i){
                tempbuff.writeUint8(test_data1[i]);
            }
            tempbuff.pos = 0;
            this.m_logindecode.Decode(tempbuff);
            this._print_pkg(tempbuff,"tempbuff ");

            tempbuff.pos = 27;
            let m_nToken:number = tempbuff.getUint32();

            tempbuff.pos = this.m_loginIdx;
            let tmpkey:number = tempbuff.getUint32();
            core.net_errlog("m_nToken tmpkey ",m_nToken.toString(16),tmpkey.toString(16));

            /////second pkg start
            let test_data2:Array<number> = [
		0xd9,0xa6,0x1f,0x99,0xa8,0x08,0x68,0xe9,0x9d,0x59,0x54,0x83,0xdb,0x21,0x52,0xa6];
            let secondpkg:laya.utils.Byte = new laya.utils.Byte();
            for(let i:number = 0;i < test_data2.length;++i){
                secondpkg.writeUint8(test_data2[i]);
            }
            this._print_pkg(secondpkg,"send secondpkg src ");

            //this.m_loginencode.print_data();
            secondpkg.pos = 0;
            this.m_loginencode.Encode(secondpkg);
            this._print_pkg(secondpkg,"send secondpkg encoded ");

            secondpkg.pos = 0;
            svrencode.Decode(secondpkg);
            this._print_pkg(secondpkg," econdpkg decode ");
            /////second pkg end
        }
        public _print_pkg(buff:laya.utils.Byte,pre:string = ""):void{
            core.net_errlog("======_print_pkg start ",pre,buff.length);
            let oldpos:number = buff.pos;
            buff.pos = 0;
            let output:string = "";
            let total:number = 0;
            while(total < buff.length){
                output = "";
                for(let i:number = 0;i < 32;++i){
                    let c:number = buff.getUint8();
                    if(c <= 0xF){
                        output = output + " 0" + c.toString(16);
                    }
                    else{
                        output = output + " " + c.toString(16);
                    }
                    
                    total += 1;
                    if(total >= buff.length){
                        break;
                    }
                }
                core.net_errlog(output);
            }
            core.net_errlog("======_print_pkg end");
            buff.pos = oldpos;
        }
        private _gen_firstpkg():laya.utils.Byte{
            let firstpkg:laya.utils.Byte = new laya.utils.Byte();
            let firstpkg_len:number = 40;
            let temp:number = 0;
            let temp1:number = 0;
            for(let i:number = 0;i < firstpkg_len;++i){
                temp = Math.floor(Math.random()*0xFF);
                firstpkg.writeUint8(temp);
            }
            let svrid:number = (this.m_svrid^0x6a95)&0xffff;
            firstpkg.pos = 35;
            firstpkg.writeUint16(svrid);

            this._setbuffuint8(firstpkg,35,this._getbuffuint8(firstpkg,35)^this._getbuffuint8(firstpkg,5));

            this._setbuffuint8(firstpkg,36,this._getbuffuint8(firstpkg,36)^this._getbuffuint8(firstpkg,16));

            this._setbuffuint8(firstpkg,39,0^0x72^this._getbuffuint8(firstpkg,18));
            
            this._setbuffuint8(firstpkg,13,0x4e^this._getbuffuint8(firstpkg,19));

            this._setbuffuint8(firstpkg,17,0xa3^this._getbuffuint8(firstpkg,12));

            this._setbuffuint8(firstpkg,23,0xf8^this._getbuffuint8(firstpkg,19));

            this._setbuffuint8(firstpkg,28,0x95^this._getbuffuint8(firstpkg,9));

            
            this.m_loginIdx = 0;
            firstpkg.pos = 0;
            for(let i:number = 0; i<firstpkg_len-1;++i){
                this.m_loginIdx += (this._getbuffuint8(firstpkg,i)^this._getbuffuint8(firstpkg,i+1));
            }
            this.m_loginIdx = this.m_loginIdx%36;

            //core.net_errlog("send firstpkg loginidx ",this.m_loginIdx);
            let mixkey:laya.utils.Byte = new laya.utils.Byte();
            let mixkey_len:number = 32;
            firstpkg.pos = 3;
            for(let i:number = 0;i < mixkey_len;++i){
                mixkey.writeUint8(firstpkg.getUint8());
            }
            //this._print_pkg(mixkey,"send firstpkg mixkey ");

            mixkey.pos = 0;
            if(this.m_logindecode == null){
                this.m_logindecode = new CLoginDecode();
            }
            this.m_logindecode.MixKey(mixkey);
            mixkey.pos = 0;
            if(this.m_loginencode == null){
                this.m_loginencode = new CLoginEncode();
            }
            this.m_loginencode.MixKey(mixkey);
            return firstpkg;
        }
        private send_firstpkg():void{
            //core.net_errlog("TL_Login_net send_firstpkg ");
            
            let firstpkg:laya.utils.Byte = this._gen_firstpkg();

            firstpkg.pos = 0;
            this.m_socket.send(firstpkg.buffer);
            //core.net_errlog("send firstpkg ",firstpkg.length);
            this.m_socket.flush();
        }
        private send_secondpkg(seed:number):void{
            //core.net_errlog("TL_Login_net send_secondpkg ");
            let ipbuff:laya.utils.Byte = new laya.utils.Byte();
            ipbuff.writeUint8(192);
            ipbuff.writeUint8(168);
            ipbuff.writeUint8(1);
            ipbuff.writeUint8(110);

            let macbuff:laya.utils.Byte = new laya.utils.Byte();
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);

            let ipkey:Array<number> = [0xA8,0x41,0x9C,0x37];
            let mackey:Array<number> = [0x54,0x83,0xDB,0x21,0x52,0xA6];

            for(let i:number = 0;i < 4;++i){
                this._setbuffuint8(ipbuff,i,ipkey[i]^this._getbuffuint8(ipbuff,i));
            }

            for(let i:number = 0;i < 6;++i){
                this._setbuffuint8(macbuff,i,mackey[i]^this._getbuffuint8(macbuff,i));
            }

            let seedbuff:laya.utils.Byte = new laya.utils.Byte();
            let seedbuff_len:number = 6;
            let temp:number = 0;
            for(let i:number = 0;i < seedbuff_len;++i){
                temp = Math.floor(Math.random()*0xFF);
                seedbuff.writeUint8(temp);
            }
            let npos:number = seed%3;
            seedbuff.pos = npos;
            seedbuff.writeUint32(seed);

            let secondpkg:laya.utils.Byte = new laya.utils.Byte();
            seedbuff.pos = 0;
            for(let i:number = 0;i < seedbuff.length;++i){
                secondpkg.writeUint8(seedbuff.getUint8());
            }
            ipbuff.pos = 0;
            for(let i:number = 0;i < ipbuff.length;++i){
                secondpkg.writeUint8(ipbuff.getUint8());
            }
            macbuff.pos = 0;
            for(let i:number = 0;i < macbuff.length;++i){
                secondpkg.writeUint8(macbuff.getUint8());
            }
            //this._print_pkg(secondpkg,"send secondpkg src ");

            secondpkg.pos = 0;
            this.m_loginencode.Encode(secondpkg);
            //this._print_pkg(secondpkg,"send secondpkg encoded ");
            secondpkg.pos = 0;
            this.m_socket.send(secondpkg.buffer);
            //core.net_errlog("send secondpkg ",secondpkg.length);
            this.m_socket.flush();
        }
        private get_first_seed(msg:any = null):void{
            //core.net_errlog("TL_Login_net get_first_seed ",msg);
            let recvbuff:laya.utils.Byte = msg as laya.utils.Byte;
            for(let i:number = 0;i < recvbuff.length;++i){
                this.m_buff.writeUint8(recvbuff.getUint8());
            }
            let firstpkglen:number = 40;
            if(this.m_buff.length < firstpkglen){
                core.net_errlog("get_first_seed this.m_buff.length < firstpkglen ",this.m_buff.length);
                return;
            }
            let firstpkgbuff:laya.utils.Byte = new laya.utils.Byte();
            this.m_buff.pos = 0;
            for(let i:number = 0;i < firstpkglen;++i){
                firstpkgbuff.writeUint8(this.m_buff.getUint8());
            }

            let newbuff:laya.utils.Byte = new laya.utils.Byte();
            while(this.m_buff.pos < this.m_buff.length){
                newbuff.writeUint8(this.m_buff.getUint8());
            }
            this.m_buff = newbuff;

            //this._print_pkg(firstpkgbuff,"get firstpkg src ");

            firstpkgbuff.pos = 0;
            this.m_logindecode.Decode(firstpkgbuff);

            //this._print_pkg(firstpkgbuff,"get firstpkg decoded ");

            let idx:number = this.m_loginIdx;
            
            firstpkgbuff.pos = 27;
            let m_nToken:number = firstpkgbuff.getUint32();

            firstpkgbuff.pos = idx;
            let tmpkey:number = firstpkgbuff.getUint32();

            //core.net_errlog("get first key ",m_nToken,tmpkey,m_nToken.toString(16),tmpkey.toString(16));

            this.m_logindecode.Create(tmpkey);

            this.send_secondpkg(m_nToken);

            this.m_loginIdx = 0;
            firstpkgbuff.pos = 0;
            for(let i:number = 0; i<firstpkgbuff.length-1;++i){
                this.m_loginIdx += (this._getbuffuint8(firstpkgbuff,i)^this._getbuffuint8(firstpkgbuff,i+1));
            }
            this.m_loginIdx = this.m_loginIdx%32;

            //core.net_errlog("get first key loginidx ",this.m_loginIdx);

            this.m_loginstep = 1;
        }
        private get_second_seed(msg:any = null):void{
            //core.net_errlog("TL_Login_net get_second_seed ",msg);

            let recvbuff:laya.utils.Byte = msg as laya.utils.Byte;
            for(let i:number = 0;i < recvbuff.length;++i){
                this.m_buff.writeUint8(recvbuff.getUint8());
            }
            let secondpkglen:number = 40;
            if(this.m_buff.length < secondpkglen){
                core.net_errlog("get_second_seed this.m_buff.length < secondpkglen ",this.m_buff.length);
                return;
            }
            let secondpkgbuff:laya.utils.Byte = new laya.utils.Byte();
            this.m_buff.pos = 0;
            for(let i:number = 0;i < secondpkglen;++i){
                secondpkgbuff.writeUint8(this.m_buff.getUint8());
            }

            let newbuff:laya.utils.Byte = new laya.utils.Byte();
            while(this.m_buff.pos < this.m_buff.length){
                newbuff.writeUint8(this.m_buff.getUint8());
            }
            this.m_buff = newbuff;

            //this._print_pkg(secondpkgbuff,"get secondpkg src ");

            secondpkgbuff.pos = 0;
            this.m_logindecode.Decode(secondpkgbuff);

            //this._print_pkg(secondpkgbuff,"get secondpkg decode ");

            let idx:number = this.m_loginIdx;
            secondpkgbuff.pos = idx;
            let tmpkey:number = secondpkgbuff.getUint32();

            let idxkey2 = idx + 4;
            secondpkgbuff.pos = idxkey2;
            let tmpkey2:number = secondpkgbuff.getUint32();
            
            //core.net_errlog("get secondpkg loginidx ",this.m_loginIdx,tmpkey.toString(16));

            this.m_recvdecode.Create(tmpkey);
            //core.net_errlog("get_second_seed sendkey recvkey ",tmpkey2.toString(16),tmpkey.toString(16));
            this.m_loginstep = 2;
            this.m_b_connected = true;

            if(this.m_parent != null){
                this.m_parent.on_notify("connect succeed");
            }
            core.net_errlog("connected succeed");
            utils.event_ins().fire_event(game_event.EVENT_NET_CONNECTED,this);
            if(this.m_buff.length > 0){
                this.m_buff.pos = 0;
                this._decrypt_buff(this.m_buff);
                this._on_split_netpack();
            }
        }
        public _testsend(count:number):void{
            
            let msg:string = count.toString() + " lalala,hello svr!";
            let cc:number = 8;
            while(cc > 0){
                msg += " lalala,hello svr!";
                cc -= 1;
            }
            /*
            this.m_sendbuff.clear();
            this.m_sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            this.m_sendbuff.writeUint8(0);
            this.m_sendbuff.writeUint16(0x100);
            this.m_sendbuff.writeUint16(0);
            let pos:number = this.m_sendbuff.pos;
            this.m_sendbuff.writeUTFBytes(msg);
            let truelen:number = this.m_sendbuff.pos - pos;
            this.m_sendbuff.pos = 3;
            this.m_sendbuff.writeUint16(truelen);
            //core.net_errlog("truelen ",msg.length,truelen,this.m_sendbuff.length);
            this.m_sendbuff.pos = 0;
            this.m_sendbuff.writeUint8(this.m_sendbuff.length - 1);
            //this._print_pkg(buffer,"send src");
            this.m_sendbuff.pos = 0;
            this.m_sendencode.Encode(this.m_sendbuff);
            //this._print_pkg(buffer,"send encode ");
            this.m_sendbuff.pos = 0;
            this.m_socket.send(this.m_sendbuff.buffer);
            core.net_errlog("send bufferlen ",this.m_sendbuff.length,msg);
            
            this.m_socket.flush();
            */
            //this.send(protocol_def.c2s_test,{"key":msg});
        }
        protected openHandler(event: any = null): void {
            //正确建立连接；
            core.net_errlog("TL_Login_net openHandler ",event);
            this.send_firstpkg();
            
        }
        private _decrypt_buff(buff:laya.utils.Byte):void{
            //this._print_pkg(buff,"_decrypt_buff src ");
            let oldpos:number = buff.pos;
            buff.pos = 0;
            this.m_recvdecode.Encode(buff);
            buff.pos = oldpos;
            //this._print_pkg(buff,"_decrypt_buff decode ");
        }
        protected _on_split_netpack():void{
            //core.net_errlog("TL_Login_net receiveHandler normal pkg ",this.m_buff);
            //this._print_pkg(this.m_buff,"split buff ");
            while(this.m_buff.bytesAvailable > 0){
                let data:{} = this.m_buf_handle.s2c_buf2data_tl(this.m_buff);
                if(data == null){
                    if(this.m_buff.pos > 0){
                        let tmp:laya.utils.Byte = new laya.utils.Byte();
                        while(this.m_buff.bytesAvailable > 0){
                            tmp.writeUint8(this.m_buff.getUint8());
                        }
                        this.m_buff.clear();
                        this.m_buff = tmp;
                    }
                    return;
                }
                
                let cmd:number = data['cmd'];
                let recv:{} = data['data'];
                this.m_recv_list.push(new protocol_item(cmd,recv));
                core.net_tiplog("recv ",cmd.toString(16),recv);
            }
            this.m_buff.clear();
        }
        protected receiveHandler(msg: any = null): void {
            ///接收到数据触发函数
            
            if(this.m_loginstep == 0){
                this.get_first_seed(this.m_socket.input);
            }
            else if(this.m_loginstep == 1){
                this.get_second_seed(this.m_socket.input);
            }
            else{
                //
                core.net_errlog("TL_Login_net receiveHandler ",msg,msg.length,this.m_socket.input.length);
                let tmp:laya.utils.Byte = this.m_socket.input as laya.utils.Byte;
                this.m_decodebuff.clear();

                while(tmp.pos < tmp.length){
                    this.m_decodebuff.writeUint8(tmp.getUint8());
                }
                this.m_decodebuff.pos = 0;
                this._decrypt_buff(this.m_decodebuff);

                if(this.m_buff.length > 0){
                    this.m_buff.pos = this.m_buff.length - 1;
                }
                this.m_decodebuff.pos = 0;
                while(this.m_decodebuff.pos < this.m_decodebuff.length){
                    this.m_buff.writeUint8(this.m_decodebuff.getUint8());
                }
                this.m_buff.pos = 0;
                this._on_split_netpack();
            }
        }
        public send_raw_buff(cmd:number,buff:Laya.Byte):void{
            if(!this.m_b_connected){
                return;
            }
            core.net_errlog("send_raw_buff ",cmd.toString(16),buff.length);
            this.m_sendbuff.clear();
            this.m_sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            let buffer:Laya.Byte = this.m_buf_handle.c2s_rawbuff2buf_tl(cmd,buff,this.m_sendbuff);
            buffer.pos = 0;
            this.m_sendencode.Encode(buffer);
            buffer.pos = 0;
            this.m_socket.send(buffer.buffer);
            core.net_errlog("send send_raw_buff len ",cmd.toString(16),buffer.length);
            this.m_socket.flush();
        }
        public send(cmd:number,data:Object = null):void
        {
            if(!this.m_b_connected){
                return;
            }
            core.net_errlog("send ",cmd.toString(16),data);
            this.m_sendbuff.clear();
            this.m_sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            let buffer:Laya.Byte = this.m_buf_handle.c2s_data2buf_tl(cmd,data,this.m_sendbuff);
            //this._print_pkg(buffer,"send src");
            buffer.pos = 0;
            this.m_sendencode.Encode(buffer);
            //this._print_pkg(buffer,"send encode ");
            buffer.pos = 0;
            this.m_socket.send(buffer.buffer);
            core.net_errlog("send bufferlen ",cmd.toString(16),buffer.length);
            
            this.m_socket.flush();

        }
        public testlogin(account:string,pwd:string):void
        {
            if(!this.m_b_connected){
                alert("Have not connected to svr");
                return;
            }
            this.m_sendbuff.clear();

            let plen:number = 130;
            this.m_sendbuff.clear();
            let newret:Laya.Byte = this.m_sendbuff;
            newret.endian = Laya.Byte.BIG_ENDIAN;
            if(plen < 0xff){
                newret.writeUint8(plen);
            }
            else{
                newret.writeUint32(plen);
                newret.pos = 0;
                newret.writeUint8(0xff);
                newret.pos = 4;
            }

            this.m_sendbuff.writeUint16(0x97);

            this.m_sendbuff.writeUint16(0x0);
            this.m_sendbuff.writeUint16(0x0);
            this.m_sendbuff.writeUint16(0x1);

            this.m_sendbuff.writeUint16(0x0);
            this.m_sendbuff.writeUint16(0x0);
            this.m_sendbuff.writeUint16(0x2);

            this.m_sendbuff.writeUint16(0x0);
            this.m_sendbuff.writeUint16(0x0);
            this.m_sendbuff.writeUint16(0x3);


            this.m_sendbuff.writeUTFBytes(account);
            let alen:number = 64 - account.length;
            while(alen > 0){
                this.m_sendbuff.writeUint8(0);
                alen -= 1;
            }
            this.m_sendbuff.writeUTFBytes(pwd);
            let pwdlen:number = 32 - pwd.length;
            while(pwdlen > 0){
                this.m_sendbuff.writeUint8(0);
                pwdlen -= 1;
            }

            this.m_sendbuff.writeUint8(0);

            this.m_sendbuff.writeUint8(0);

            this.m_sendbuff.writeUint8(0);

            let extlen:number = 11;
            while(extlen > 0){
                this.m_sendbuff.writeUint8(0);
                extlen -= 1;
            }

            this._print_pkg(this.m_sendbuff,"testlogin src");
            this.m_sendbuff.pos = 0;
            this.m_sendencode.Encode(this.m_sendbuff);
            this._print_pkg(this.m_sendbuff,"testlogin encode ");
            this.m_sendbuff.pos = 0;
            this.m_socket.send(this.m_sendbuff.buffer);
            core.net_errlog("testlogin bufferlen ",this.m_sendbuff.length);
            
            this.m_socket.flush();

        }
        public close():void{
            super.close();
            this.m_loginstep = 0;
            this.m_b_connected = false;
        }
        public dispose():void{
            this.close();
        }
    }
////////////////////////////////////////////////////////////
    let g_ins:game_net_mgr = null;
    let g_b_mysvr:boolean = false;
    export function net_ins():game_net_mgr
    {
        if(g_ins == null)
        {
            if(g_b_mysvr){
                g_ins = new game_net_mgr();
            }
            else{
                g_ins = new TL_Login_net();
            }
        }
        return g_ins;
    }
    export function my_svr(flag:boolean):void{
        g_b_mysvr = flag;
    }
    export function is_mysvr():boolean{
        return g_b_mysvr;
    }
    export function clear():void{
        if(g_ins != null){
            g_ins.dispose();
            g_ins = null;
        }
    }
    //
}