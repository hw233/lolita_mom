var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var net;
(function (net) {
    var protocol_item = /** @class */ (function () {
        function protocol_item(cmd, data) {
            this.m_cmd = 0;
            this.m_data = null;
            this.m_cmd = cmd;
            this.m_data = data;
        }
        return protocol_item;
    }());
    net.protocol_item = protocol_item;
    var game_net_mgr = /** @class */ (function () {
        function game_net_mgr() {
            this.m_b_connect = false;
            this.m_recv_list = new Array();
            this.m_protocol_map = new Object();
            this.m_s2c_protocol_map = new Object();
            this.m_protobuf_root = null;
            this.m_buf_handle = new protocolbuf.protocolbuf();
            this.m_buff = new laya.utils.Byte();
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
        game_net_mgr.prototype.init = function () {
            if (this.m_protobuf_root != null) {
                return;
            }
            core.net_errlog("game_net_mgr init");
            //Browser.window.protobuf.load("res/protocol/protocol.proto",this.on_protobuf_loaded);
        };
        game_net_mgr.prototype.on_protobuf_loaded = function (err, root) {
            core.net_errlog("game_net_mgr on_protobuf_loaded ", err, root);
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
        };
        game_net_mgr.prototype.get_s2c_protocol_cls = function (cmd) {
            if (this.m_s2c_protocol_map[cmd] == undefined) {
                if (protocol_def.S2C_CMD_2_TYPE[cmd] == undefined) {
                    core.net_errlog("game_net_mgr get_s2c_protocol_cls error!! ", cmd);
                    return null;
                }
                var cls_str = protocol_def.S2C_CMD_2_TYPE[cmd.toString()];
                var cls = this.m_protobuf_root.lookupType(cls_str);
                this.m_s2c_protocol_map[cmd] = cls;
            }
            return this.m_s2c_protocol_map[cmd];
        };
        game_net_mgr.prototype.get_protocol_cls = function (cmd) {
            if (this.m_protocol_map[cmd] == undefined) {
                if (protocol_def.C2S_CMD_2_TYPE[cmd] == undefined) {
                    core.net_errlog("game_net_mgr get_protocol_cls error!! ", cmd);
                    return null;
                }
                var cls_str = protocol_def.C2S_CMD_2_TYPE[cmd.toString()];
                var cls = this.m_protobuf_root.lookupType(cls_str);
                this.m_protocol_map[cmd] = cls;
            }
            return this.m_protocol_map[cmd];
        };
        game_net_mgr.prototype.openHandler = function (event) {
            if (event === void 0) { event = null; }
            core.net_errlog("=======openHandler ", event);
            //正确建立连接；
            this.m_b_connect = true;
            utils.event_ins().fire_event(game_event.EVENT_NET_CONNECTED, this);
        };
        game_net_mgr.prototype.receiveHandler = function (msg) {
            if (msg === void 0) { msg = null; }
            ///接收到数据触发函数
            //core.net_errlog("=======receiveHandler ",msg,typeof(msg));
            //let recvbuff:laya.utils.Byte = msg as laya.utils.Byte;
            var recvbuff = this.m_socket.input;
            for (var i = 0; i < recvbuff.length; ++i) {
                this.m_buff.writeUint8(recvbuff.getUint8());
            }
            //let data:{} = this.m_buf_handle.s2c_buf2data(this.m_socket.input);
            //let cmd:number = data['cmd'];
            //let recv:{} = data['data'];
            //this.m_recv_list.push(new protocol_item(cmd,recv));
            //core.net_errlog("recv ",cmd,recv);
            this.m_buff.pos = 0;
            this._on_split_netpack();
        };
        //
        game_net_mgr.prototype._on_split_netpack = function () {
            //core.net_errlog("TL_Login_net receiveHandler normal pkg ",this.m_buff);
            //this._print_pkg(this.m_buff,"split buff ");
            while (this.m_buff.bytesAvailable > 0) {
                var data_1 = this.m_buf_handle.s2c_buf2data(this.m_buff);
                if (data_1 == null) {
                    if (this.m_buff.pos > 0) {
                        var tmp = new laya.utils.Byte();
                        while (this.m_buff.bytesAvailable > 0) {
                            tmp.writeUint8(this.m_buff.getUint8());
                        }
                        this.m_buff.clear();
                        this.m_buff = tmp;
                    }
                    return;
                }
                var cmd = data_1['cmd'];
                var recv = data_1['data'];
                this.m_recv_list.push(new protocol_item(cmd, recv));
                core.net_tiplog("recv ", cmd.toString(16), recv);
            }
            this.m_buff.clear();
        };
        //
        game_net_mgr.prototype.closeHandler = function (e) {
            if (e === void 0) { e = null; }
            //关闭事件
            core.net_errlog("=======closeHandler ", e);
            utils.event_ins().fire_event(game_event.EVENT_NET_CLOSED, [e, this]);
            this.close();
        };
        game_net_mgr.prototype.errorHandler = function (e) {
            if (e === void 0) { e = null; }
            //连接出错
            core.net_errlog("=======errorHandler ", e);
            utils.event_ins().fire_event(game_event.EVENT_NET_ERROR, [e, this]);
            this.close();
        };
        game_net_mgr.prototype.connect = function (host, port, svrid) {
            if (svrid === void 0) { svrid = 11; }
            if (this.m_b_connect) {
                this.close();
            }
            var port_s = port.toString();
            var url = "ws://" + host + ":" + port_s;
            this.m_socket.connectByUrl(url);
        };
        game_net_mgr.prototype.close = function () {
            if (this.m_b_connect) {
                this.m_socket.close();
                this.m_socket.cleanSocket();
            }
            this.m_b_connect = false;
        };
        game_net_mgr.prototype.send_raw_buff = function (cmd, buff) {
            core.net_errlog("send send_raw_buff ", cmd.toString(16));
            if (this.m_b_connect == false) {
                return;
            }
            var buffer = this.m_buf_handle.c2s_rawbuff2buf(cmd, buff);
            //core.net_errlog("send send_raw_buff ",buffer.length);
            this.m_socket.send(buffer.buffer);
            core.net_errlog("send send_raw_buff ", cmd.toString(16), buffer.length);
            this.m_socket.flush();
        };
        game_net_mgr.prototype.send = function (cmd, data) {
            if (data === void 0) { data = null; }
            core.net_tiplog("game_net_mgr send ", cmd, data, this.m_b_connect);
            if (this.m_b_connect == false) {
                return;
            }
            //let cls:any = this.get_protocol_cls(cmd);
            //let ins:any = cls.create(data);
            //let buffer = cls.encode(ins).finish();
            var buffer = this.m_buf_handle.c2s_data2buf(cmd, data);
            core.net_tiplog("c2s buf ", buffer);
            /*
            buffer.pos = 0;
            let tmp = this.m_buf_handle.s2c_buf2data(cmd,buffer);
            core.net_errlog("s2c data ",tmp);
            for(let i of tmp["data"])
            {
                core.net_errlog("data ",i);
            }
            */
            core.net_tiplog("send databuflen ", buffer.length);
            this.m_socket.send(buffer.buffer);
            core.net_tiplog("send bufferlen ", buffer.length);
            this.m_socket.flush();
        };
        game_net_mgr.prototype.update = function () {
            if (this.m_recv_list.length > 0) {
                for (var _i = 0, _a = this.m_recv_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    utils.event_ins().fire_event(game_event.gen_netcmd_event(i.m_cmd), i.m_data);
                }
                this.m_recv_list = new Array();
            }
        };
        game_net_mgr.prototype.update2 = function () {
            if (this.m_recv_list.length > 0) {
                for (var _i = 0, _a = this.m_recv_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    utils.event_ins().fire_event(game_event.gen_netcmd_event(i.m_cmd), [i.m_data, this]);
                }
                this.m_recv_list = new Array();
            }
        };
        game_net_mgr.prototype.dispose = function () {
            if (this.m_b_connect) {
                this.close();
            }
        };
        return game_net_mgr;
    }());
    net.game_net_mgr = game_net_mgr;
    ////////////////////////////////////////////////////////////
    var PBK_LENGTH = 256;
    var PUBLIC_LOGIN_EKEY = [
        0x904dca28, 0x384efb76, 0xd673484c, 0x20608059, 0x24b1741b, 0x04b6e8a5, 0xabf6f2f4, 0x780b8079,
        0xbdaa5280, 0x37a3d148, 0xa9224c58, 0x874ffdfc, 0xfe0ffef3, 0x8fae9e64, 0xb96bfcfd, 0xf6859b5f,
        0x7cfd3fbc, 0x6f7e1c2c, 0x301afad1, 0xb8cec699, 0xa3f57ea0, 0xb4d8ec66, 0x8affbe4b, 0x72857cf2,
        0x8ea9f177, 0xd719bb3f, 0xeb38feeb, 0x7f7cd7e7, 0x87e1929b, 0x1f571efa, 0xdfbdf889, 0x135ffcf1,
        0x4de31076, 0xcdcf5f44, 0xc15ee89f, 0x2b17df51, 0x8f1cdfff, 0xfc42f2fb, 0x9be32af8, 0x2a1c7cf4,
        0x2f1cd50f, 0x7d71e5e8, 0xbefaf74e, 0x37ff4d06, 0xf0f83631, 0xe843bcd9, 0x67b29cac, 0x9d3d11d0,
        0x7cfff548, 0xf9ae976b, 0x73eacf0f, 0xad663cb9, 0xd297f196, 0xc45120de, 0x3b9a7f87, 0x3f90a5a5,
        0x4a5a5a4e, 0xe0ed6d61, 0x76fa3464, 0x2327274f, 0x4dbbd1e5, 0xb778f1e6, 0x8f8bfbf8, 0x17c2d4d9,
    ];
    var CLoginEncode = /** @class */ (function () {
        function CLoginEncode() {
            this.m_seed = 0;
            this.m_bfish = new blowfish.CBlowFish();
            this.m_buff = new Laya.Byte();
            for (var i = 0; i < PUBLIC_LOGIN_EKEY.length; ++i) {
                this.m_buff.writeUint32(PUBLIC_LOGIN_EKEY[i]);
            }
            this.m_buff.pos = 0;
            this.m_bfish.InitializeKey(this.m_buff);
            this.m_bfish.Initialize(0xB426017C);
        }
        CLoginEncode.prototype.print_data = function () {
            this.m_bfish._print_array("print_data", true);
        };
        CLoginEncode.prototype.MixKey = function (buff) {
            this.m_bfish.InitializeKey(buff);
        };
        CLoginEncode.prototype.Create = function (key) {
            this.m_bfish.Initialize(key);
        };
        CLoginEncode.prototype.Encode = function (buff) {
            this.m_bfish.Encode(buff);
        };
        CLoginEncode.prototype.Decode = function (buff) {
            this.m_bfish.Decode(buff);
        };
        CLoginEncode.prototype.GetSeed = function () {
            return this.m_seed;
        };
        return CLoginEncode;
    }());
    net.CLoginEncode = CLoginEncode;
    var PUBLIC_LOGIN_DKEY = [
        0x6e5c79e3, 0x766cb435, 0xf9b99339, 0x3c5eecf5, 0xdd66b3e6, 0x60888033, 0xe208a008, 0x692a1b67,
        0x15a0bce5, 0x7f0a40bc, 0xe5fc5352, 0xb4b447cb, 0x1d7623ae, 0x267d2a84, 0xb9f9a391, 0xe84b39b5,
        0x7b10e93d, 0x75c22b58, 0x9e9ec0db, 0xca954387, 0x61c395bc, 0x31b93f93, 0xd9edaafa, 0xf5be1268,
        0xcc11309a, 0x493a3dad, 0x983c730c, 0x16d8e581, 0x9160301f, 0x81369885, 0x98134302, 0xad00e5ad,
        0xf65300e2, 0xa7aab7a8, 0x0b0dd5f9, 0x74ecd867, 0xb3b52d2c, 0x69d62cea, 0xbb2eec31, 0xd67f55e4,
        0x9fa87ffd, 0xc4f10e89, 0xd5383a2a, 0x67f0f616, 0xaf3679f2, 0xd9624422, 0x5779c5e3, 0xf3af7447,
        0xda76bb5a, 0xcd081326, 0x06e3e4ec, 0x73f45c4e, 0x0138ba05, 0x041824cc, 0xfe952b18, 0x78eb7794,
        0xa4fc1480, 0xadd7b31f, 0x6df1e260, 0xa859f3a5, 0x89169d78, 0xb68a02ca, 0xffbaf647, 0x33319852,
    ];
    var CLoginDecode = /** @class */ (function () {
        function CLoginDecode() {
            this.m_seed = 0;
            this.m_bfish = new blowfish.CBlowFish();
            this.m_buff = new Laya.Byte();
            //this.m_bfish.testfunc();
            for (var i = 0; i < PUBLIC_LOGIN_DKEY.length; ++i) {
                this.m_buff.writeUint32(PUBLIC_LOGIN_DKEY[i]);
            }
            this.m_buff.pos = 0;
            this.m_bfish.InitializeKey(this.m_buff);
        }
        CLoginDecode.prototype.MixKey = function (buff) {
            this.m_bfish.InitializeKey(buff);
        };
        CLoginDecode.prototype.Create = function (key) {
            this.m_bfish.Initialize(key);
        };
        CLoginDecode.prototype.Encode = function (buff) {
            this.m_bfish.Encode(buff);
        };
        CLoginDecode.prototype.Decode = function (buff) {
            this.m_bfish.Decode(buff);
        };
        CLoginDecode.prototype.GetSeed = function () {
            return this.m_seed;
        };
        return CLoginDecode;
    }());
    net.CLoginDecode = CLoginDecode;
    var TL_Login_net = /** @class */ (function (_super) {
        __extends(TL_Login_net, _super);
        function TL_Login_net() {
            var _this = _super.call(this) || this;
            _this.m_svrid = 0;
            _this.m_host = "";
            _this.m_port = 0;
            _this.m_loginstep = 0;
            _this.m_b_connected = false;
            _this.m_loginencode = null;
            _this.m_logindecode = null;
            _this.m_sendencode = new myencode.MyEncode();
            _this.m_recvdecode = null;
            _this.m_loginIdx = 0;
            _this.m_decodebuff = new laya.utils.Byte();
            _this.m_sendbuff = new laya.utils.Byte();
            _this.m_parent = null;
            _this.m_testsendcount = 999;
            _this.m_buff.endian = Laya.Byte.BIG_ENDIAN;
            processencode.RC4_InitCode();
            _this.m_recvdecode = new processencode.CProcessEncode();
            return _this;
        }
        TL_Login_net.prototype.connect = function (host, port, svrid) {
            if (svrid === void 0) { svrid = 11; }
            this.close();
            this.m_svrid = svrid;
            this.m_host = host;
            this.m_port = port;
            if (this.m_socket == null) {
                this.m_socket = new laya.net.Socket();
                this.m_socket.endian = Laya.Byte.BIG_ENDIAN; //Laya.Byte.LITTLE_ENDIAN;BIG_ENDIAN
                this.m_socket.on(Laya.Event.OPEN, this, this.openHandler);
                this.m_socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
                this.m_socket.on(Laya.Event.CLOSE, this, this.closeHandler);
                this.m_socket.on(Laya.Event.ERROR, this, this.errorHandler);
            }
            this.m_socket.connectByUrl("ws://" + host + ":" + port.toString());
        };
        TL_Login_net.prototype._getbuffuint8 = function (buff, pos) {
            var oldpos = buff.pos;
            buff.pos = pos;
            var ret = buff.getUint8();
            buff.pos = oldpos;
            return ret;
        };
        TL_Login_net.prototype._setbuffuint8 = function (buff, pos, v) {
            var oldpos = buff.pos;
            buff.pos = pos;
            buff.writeUint8(v);
            buff.pos = oldpos;
        };
        TL_Login_net.prototype.testfunc2 = function () {
            var test_data1 = [
                0xca, 0xc2, 0xf6, 0xfd, 0x3f, 0x30, 0x2e, 0x04, 0xe0, 0xf6, 0x8f, 0xa6, 0x71, 0xa7, 0xf2, 0x0b, 0xb9, 0xd2, 0xef, 0xe9, 0xd5, 0xcf, 0x2b, 0x11, 0xaf, 0x80, 0x8b, 0x3a, 0x63, 0x93, 0x56, 0x73
            ];
            var firstpkg = new laya.utils.Byte();
            for (var i = 0; i < test_data1.length; ++i) {
                firstpkg.writeUint8(test_data1[i]);
            }
            this._print_pkg(firstpkg, "recv src ");
            this.m_recvdecode.Create(0xf73e39fb);
            this.m_recvdecode.Encode(firstpkg);
            this._print_pkg(firstpkg, "recv decode ");
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
        };
        TL_Login_net.prototype.testfunc = function () {
            var firstpkg = new laya.utils.Byte();
            var firstpkg_len = 40;
            var test_data = [
                0xca, 0xc2, 0xf6, 0xfd, 0x3f, 0x30, 0x2e, 0x04, 0xe0, 0xf6, 0x8f, 0xa6, 0x71, 0xa7, 0xf2, 0x0b, 0xb9, 0xd2, 0xef, 0xe9, 0xd5, 0xcf, 0x2b, 0x11, 0xaf, 0x80, 0x8b, 0x3a, 0x63, 0x93, 0x56, 0x73, 0x21, 0xb2, 0xd0, 0xae, 0xd3, 0x3b, 0x97, 0x9d
            ];
            for (var i = 0; i < firstpkg_len; ++i) {
                firstpkg.writeUint8(test_data[i]);
            }
            this._print_pkg(firstpkg, "testbuff ");
            this.m_loginIdx = 0;
            firstpkg.pos = 0;
            for (var i = 0; i < firstpkg_len - 1; ++i) {
                this.m_loginIdx += (this._getbuffuint8(firstpkg, i) ^ this._getbuffuint8(firstpkg, i + 1));
            }
            this.m_loginIdx = this.m_loginIdx % 36;
            core.net_errlog("this.m_loginIdx ", this.m_loginIdx);
            var mixkey = new laya.utils.Byte();
            firstpkg.pos = 3;
            for (var i = 0; i < 32; ++i) {
                mixkey.writeUint8(firstpkg.getUint8());
            }
            this._print_pkg(mixkey, "testbuff mixkey ");
            mixkey.pos = 0;
            if (this.m_logindecode == null) {
                this.m_logindecode = new CLoginDecode();
            }
            this.m_logindecode.MixKey(mixkey);
            mixkey.pos = 0;
            if (this.m_loginencode == null) {
                this.m_loginencode = new CLoginEncode();
            }
            this.m_loginencode.MixKey(mixkey);
            var svrencode = new CLoginEncode();
            mixkey.pos = 0;
            svrencode.MixKey(mixkey);
            var test_data1 = [
                0xf1, 0x73, 0x3c, 0x25, 0x68, 0x10, 0xc5, 0xe2, 0x2c, 0x85, 0x13, 0xff, 0xef, 0x6b, 0x3c, 0xe4, 0x88, 0xac, 0x44, 0x68, 0x8c, 0x5d, 0x43, 0x9e, 0x4e, 0x12, 0x20, 0x74, 0x04, 0x05, 0x0b, 0x7c, 0x67, 0x9e, 0xba, 0x6e, 0xc6, 0x3c, 0x40, 0xc3
            ];
            var tempbuff = new laya.utils.Byte();
            for (var i = 0; i < firstpkg_len; ++i) {
                tempbuff.writeUint8(test_data1[i]);
            }
            tempbuff.pos = 0;
            this.m_logindecode.Decode(tempbuff);
            this._print_pkg(tempbuff, "tempbuff ");
            tempbuff.pos = 27;
            var m_nToken = tempbuff.getUint32();
            tempbuff.pos = this.m_loginIdx;
            var tmpkey = tempbuff.getUint32();
            core.net_errlog("m_nToken tmpkey ", m_nToken.toString(16), tmpkey.toString(16));
            /////second pkg start
            var test_data2 = [
                0xd9, 0xa6, 0x1f, 0x99, 0xa8, 0x08, 0x68, 0xe9, 0x9d, 0x59, 0x54, 0x83, 0xdb, 0x21, 0x52, 0xa6
            ];
            var secondpkg = new laya.utils.Byte();
            for (var i = 0; i < test_data2.length; ++i) {
                secondpkg.writeUint8(test_data2[i]);
            }
            this._print_pkg(secondpkg, "send secondpkg src ");
            //this.m_loginencode.print_data();
            secondpkg.pos = 0;
            this.m_loginencode.Encode(secondpkg);
            this._print_pkg(secondpkg, "send secondpkg encoded ");
            secondpkg.pos = 0;
            svrencode.Decode(secondpkg);
            this._print_pkg(secondpkg, " econdpkg decode ");
            /////second pkg end
        };
        TL_Login_net.prototype._print_pkg = function (buff, pre) {
            if (pre === void 0) { pre = ""; }
            core.net_errlog("======_print_pkg start ", pre, buff.length);
            var oldpos = buff.pos;
            buff.pos = 0;
            var output = "";
            var total = 0;
            while (total < buff.length) {
                output = "";
                for (var i = 0; i < 32; ++i) {
                    var c = buff.getUint8();
                    if (c <= 0xF) {
                        output = output + " 0" + c.toString(16);
                    }
                    else {
                        output = output + " " + c.toString(16);
                    }
                    total += 1;
                    if (total >= buff.length) {
                        break;
                    }
                }
                core.net_errlog(output);
            }
            core.net_errlog("======_print_pkg end");
            buff.pos = oldpos;
        };
        TL_Login_net.prototype._gen_firstpkg = function () {
            var firstpkg = new laya.utils.Byte();
            var firstpkg_len = 40;
            var temp = 0;
            var temp1 = 0;
            for (var i = 0; i < firstpkg_len; ++i) {
                temp = Math.floor(Math.random() * 0xFF);
                firstpkg.writeUint8(temp);
            }
            var svrid = (this.m_svrid ^ 0x6a95) & 0xffff;
            firstpkg.pos = 35;
            firstpkg.writeUint16(svrid);
            this._setbuffuint8(firstpkg, 35, this._getbuffuint8(firstpkg, 35) ^ this._getbuffuint8(firstpkg, 5));
            this._setbuffuint8(firstpkg, 36, this._getbuffuint8(firstpkg, 36) ^ this._getbuffuint8(firstpkg, 16));
            this._setbuffuint8(firstpkg, 39, 0 ^ 0x72 ^ this._getbuffuint8(firstpkg, 18));
            this._setbuffuint8(firstpkg, 13, 0x4e ^ this._getbuffuint8(firstpkg, 19));
            this._setbuffuint8(firstpkg, 17, 0xa3 ^ this._getbuffuint8(firstpkg, 12));
            this._setbuffuint8(firstpkg, 23, 0xf8 ^ this._getbuffuint8(firstpkg, 19));
            this._setbuffuint8(firstpkg, 28, 0x95 ^ this._getbuffuint8(firstpkg, 9));
            this.m_loginIdx = 0;
            firstpkg.pos = 0;
            for (var i = 0; i < firstpkg_len - 1; ++i) {
                this.m_loginIdx += (this._getbuffuint8(firstpkg, i) ^ this._getbuffuint8(firstpkg, i + 1));
            }
            this.m_loginIdx = this.m_loginIdx % 36;
            //core.net_errlog("send firstpkg loginidx ",this.m_loginIdx);
            var mixkey = new laya.utils.Byte();
            var mixkey_len = 32;
            firstpkg.pos = 3;
            for (var i = 0; i < mixkey_len; ++i) {
                mixkey.writeUint8(firstpkg.getUint8());
            }
            //this._print_pkg(mixkey,"send firstpkg mixkey ");
            mixkey.pos = 0;
            if (this.m_logindecode == null) {
                this.m_logindecode = new CLoginDecode();
            }
            this.m_logindecode.MixKey(mixkey);
            mixkey.pos = 0;
            if (this.m_loginencode == null) {
                this.m_loginencode = new CLoginEncode();
            }
            this.m_loginencode.MixKey(mixkey);
            return firstpkg;
        };
        TL_Login_net.prototype.send_firstpkg = function () {
            //core.net_errlog("TL_Login_net send_firstpkg ");
            var firstpkg = this._gen_firstpkg();
            firstpkg.pos = 0;
            this.m_socket.send(firstpkg.buffer);
            //core.net_errlog("send firstpkg ",firstpkg.length);
            this.m_socket.flush();
        };
        TL_Login_net.prototype.send_secondpkg = function (seed) {
            //core.net_errlog("TL_Login_net send_secondpkg ");
            var ipbuff = new laya.utils.Byte();
            ipbuff.writeUint8(192);
            ipbuff.writeUint8(168);
            ipbuff.writeUint8(1);
            ipbuff.writeUint8(110);
            var macbuff = new laya.utils.Byte();
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            macbuff.writeUint8(0);
            var ipkey = [0xA8, 0x41, 0x9C, 0x37];
            var mackey = [0x54, 0x83, 0xDB, 0x21, 0x52, 0xA6];
            for (var i = 0; i < 4; ++i) {
                this._setbuffuint8(ipbuff, i, ipkey[i] ^ this._getbuffuint8(ipbuff, i));
            }
            for (var i = 0; i < 6; ++i) {
                this._setbuffuint8(macbuff, i, mackey[i] ^ this._getbuffuint8(macbuff, i));
            }
            var seedbuff = new laya.utils.Byte();
            var seedbuff_len = 6;
            var temp = 0;
            for (var i = 0; i < seedbuff_len; ++i) {
                temp = Math.floor(Math.random() * 0xFF);
                seedbuff.writeUint8(temp);
            }
            var npos = seed % 3;
            seedbuff.pos = npos;
            seedbuff.writeUint32(seed);
            var secondpkg = new laya.utils.Byte();
            seedbuff.pos = 0;
            for (var i = 0; i < seedbuff.length; ++i) {
                secondpkg.writeUint8(seedbuff.getUint8());
            }
            ipbuff.pos = 0;
            for (var i = 0; i < ipbuff.length; ++i) {
                secondpkg.writeUint8(ipbuff.getUint8());
            }
            macbuff.pos = 0;
            for (var i = 0; i < macbuff.length; ++i) {
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
        };
        TL_Login_net.prototype.get_first_seed = function (msg) {
            if (msg === void 0) { msg = null; }
            //core.net_errlog("TL_Login_net get_first_seed ",msg);
            var recvbuff = msg;
            for (var i = 0; i < recvbuff.length; ++i) {
                this.m_buff.writeUint8(recvbuff.getUint8());
            }
            var firstpkglen = 40;
            if (this.m_buff.length < firstpkglen) {
                core.net_errlog("get_first_seed this.m_buff.length < firstpkglen ", this.m_buff.length);
                return;
            }
            var firstpkgbuff = new laya.utils.Byte();
            this.m_buff.pos = 0;
            for (var i = 0; i < firstpkglen; ++i) {
                firstpkgbuff.writeUint8(this.m_buff.getUint8());
            }
            var newbuff = new laya.utils.Byte();
            while (this.m_buff.pos < this.m_buff.length) {
                newbuff.writeUint8(this.m_buff.getUint8());
            }
            this.m_buff = newbuff;
            //this._print_pkg(firstpkgbuff,"get firstpkg src ");
            firstpkgbuff.pos = 0;
            this.m_logindecode.Decode(firstpkgbuff);
            //this._print_pkg(firstpkgbuff,"get firstpkg decoded ");
            var idx = this.m_loginIdx;
            firstpkgbuff.pos = 27;
            var m_nToken = firstpkgbuff.getUint32();
            firstpkgbuff.pos = idx;
            var tmpkey = firstpkgbuff.getUint32();
            //core.net_errlog("get first key ",m_nToken,tmpkey,m_nToken.toString(16),tmpkey.toString(16));
            this.m_logindecode.Create(tmpkey);
            this.send_secondpkg(m_nToken);
            this.m_loginIdx = 0;
            firstpkgbuff.pos = 0;
            for (var i = 0; i < firstpkgbuff.length - 1; ++i) {
                this.m_loginIdx += (this._getbuffuint8(firstpkgbuff, i) ^ this._getbuffuint8(firstpkgbuff, i + 1));
            }
            this.m_loginIdx = this.m_loginIdx % 32;
            //core.net_errlog("get first key loginidx ",this.m_loginIdx);
            this.m_loginstep = 1;
        };
        TL_Login_net.prototype.get_second_seed = function (msg) {
            //core.net_errlog("TL_Login_net get_second_seed ",msg);
            if (msg === void 0) { msg = null; }
            var recvbuff = msg;
            for (var i = 0; i < recvbuff.length; ++i) {
                this.m_buff.writeUint8(recvbuff.getUint8());
            }
            var secondpkglen = 40;
            if (this.m_buff.length < secondpkglen) {
                core.net_errlog("get_second_seed this.m_buff.length < secondpkglen ", this.m_buff.length);
                return;
            }
            var secondpkgbuff = new laya.utils.Byte();
            this.m_buff.pos = 0;
            for (var i = 0; i < secondpkglen; ++i) {
                secondpkgbuff.writeUint8(this.m_buff.getUint8());
            }
            var newbuff = new laya.utils.Byte();
            while (this.m_buff.pos < this.m_buff.length) {
                newbuff.writeUint8(this.m_buff.getUint8());
            }
            this.m_buff = newbuff;
            //this._print_pkg(secondpkgbuff,"get secondpkg src ");
            secondpkgbuff.pos = 0;
            this.m_logindecode.Decode(secondpkgbuff);
            //this._print_pkg(secondpkgbuff,"get secondpkg decode ");
            var idx = this.m_loginIdx;
            secondpkgbuff.pos = idx;
            var tmpkey = secondpkgbuff.getUint32();
            var idxkey2 = idx + 4;
            secondpkgbuff.pos = idxkey2;
            var tmpkey2 = secondpkgbuff.getUint32();
            //core.net_errlog("get secondpkg loginidx ",this.m_loginIdx,tmpkey.toString(16));
            this.m_recvdecode.Create(tmpkey);
            //core.net_errlog("get_second_seed sendkey recvkey ",tmpkey2.toString(16),tmpkey.toString(16));
            this.m_loginstep = 2;
            this.m_b_connected = true;
            if (this.m_parent != null) {
                this.m_parent.on_notify("connect succeed");
            }
            core.net_errlog("connected succeed");
            utils.event_ins().fire_event(game_event.EVENT_NET_CONNECTED, this);
            if (this.m_buff.length > 0) {
                this.m_buff.pos = 0;
                this._decrypt_buff(this.m_buff);
                this._on_split_netpack();
            }
        };
        TL_Login_net.prototype._testsend = function (count) {
            var msg = count.toString() + " lalala,hello svr!";
            var cc = 8;
            while (cc > 0) {
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
        };
        TL_Login_net.prototype.openHandler = function (event) {
            if (event === void 0) { event = null; }
            //正确建立连接；
            core.net_errlog("TL_Login_net openHandler ", event);
            this.send_firstpkg();
        };
        TL_Login_net.prototype._decrypt_buff = function (buff) {
            //this._print_pkg(buff,"_decrypt_buff src ");
            var oldpos = buff.pos;
            buff.pos = 0;
            this.m_recvdecode.Encode(buff);
            buff.pos = oldpos;
            //this._print_pkg(buff,"_decrypt_buff decode ");
        };
        TL_Login_net.prototype._on_split_netpack = function () {
            //core.net_errlog("TL_Login_net receiveHandler normal pkg ",this.m_buff);
            //this._print_pkg(this.m_buff,"split buff ");
            while (this.m_buff.bytesAvailable > 0) {
                var data_2 = this.m_buf_handle.s2c_buf2data_tl(this.m_buff);
                if (data_2 == null) {
                    if (this.m_buff.pos > 0) {
                        var tmp = new laya.utils.Byte();
                        while (this.m_buff.bytesAvailable > 0) {
                            tmp.writeUint8(this.m_buff.getUint8());
                        }
                        this.m_buff.clear();
                        this.m_buff = tmp;
                    }
                    return;
                }
                var cmd = data_2['cmd'];
                var recv = data_2['data'];
                this.m_recv_list.push(new protocol_item(cmd, recv));
                core.net_tiplog("recv ", cmd.toString(16), recv);
            }
            this.m_buff.clear();
        };
        TL_Login_net.prototype.receiveHandler = function (msg) {
            ///接收到数据触发函数
            if (msg === void 0) { msg = null; }
            if (this.m_loginstep == 0) {
                this.get_first_seed(this.m_socket.input);
            }
            else if (this.m_loginstep == 1) {
                this.get_second_seed(this.m_socket.input);
            }
            else {
                //
                core.net_errlog("TL_Login_net receiveHandler ", msg, msg.length, this.m_socket.input.length);
                var tmp = this.m_socket.input;
                this.m_decodebuff.clear();
                while (tmp.pos < tmp.length) {
                    this.m_decodebuff.writeUint8(tmp.getUint8());
                }
                this.m_decodebuff.pos = 0;
                this._decrypt_buff(this.m_decodebuff);
                if (this.m_buff.length > 0) {
                    this.m_buff.pos = this.m_buff.length - 1;
                }
                this.m_decodebuff.pos = 0;
                while (this.m_decodebuff.pos < this.m_decodebuff.length) {
                    this.m_buff.writeUint8(this.m_decodebuff.getUint8());
                }
                this.m_buff.pos = 0;
                this._on_split_netpack();
            }
        };
        TL_Login_net.prototype.send_raw_buff = function (cmd, buff) {
            if (!this.m_b_connected) {
                return;
            }
            core.net_errlog("send_raw_buff ", cmd.toString(16), buff.length);
            this.m_sendbuff.clear();
            this.m_sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            var buffer = this.m_buf_handle.c2s_rawbuff2buf_tl(cmd, buff, this.m_sendbuff);
            buffer.pos = 0;
            this.m_sendencode.Encode(buffer);
            buffer.pos = 0;
            this.m_socket.send(buffer.buffer);
            core.net_errlog("send send_raw_buff len ", cmd.toString(16), buffer.length);
            this.m_socket.flush();
        };
        TL_Login_net.prototype.send = function (cmd, data) {
            if (data === void 0) { data = null; }
            if (!this.m_b_connected) {
                return;
            }
            core.net_errlog("send ", cmd.toString(16), data);
            this.m_sendbuff.clear();
            this.m_sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            var buffer = this.m_buf_handle.c2s_data2buf_tl(cmd, data, this.m_sendbuff);
            //this._print_pkg(buffer,"send src");
            buffer.pos = 0;
            this.m_sendencode.Encode(buffer);
            //this._print_pkg(buffer,"send encode ");
            buffer.pos = 0;
            this.m_socket.send(buffer.buffer);
            core.net_errlog("send bufferlen ", cmd.toString(16), buffer.length);
            this.m_socket.flush();
        };
        TL_Login_net.prototype.testlogin = function (account, pwd) {
            if (!this.m_b_connected) {
                alert("Have not connected to svr");
                return;
            }
            this.m_sendbuff.clear();
            var plen = 130;
            this.m_sendbuff.clear();
            var newret = this.m_sendbuff;
            newret.endian = Laya.Byte.BIG_ENDIAN;
            if (plen < 0xff) {
                newret.writeUint8(plen);
            }
            else {
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
            var alen = 64 - account.length;
            while (alen > 0) {
                this.m_sendbuff.writeUint8(0);
                alen -= 1;
            }
            this.m_sendbuff.writeUTFBytes(pwd);
            var pwdlen = 32 - pwd.length;
            while (pwdlen > 0) {
                this.m_sendbuff.writeUint8(0);
                pwdlen -= 1;
            }
            this.m_sendbuff.writeUint8(0);
            this.m_sendbuff.writeUint8(0);
            this.m_sendbuff.writeUint8(0);
            var extlen = 11;
            while (extlen > 0) {
                this.m_sendbuff.writeUint8(0);
                extlen -= 1;
            }
            this._print_pkg(this.m_sendbuff, "testlogin src");
            this.m_sendbuff.pos = 0;
            this.m_sendencode.Encode(this.m_sendbuff);
            this._print_pkg(this.m_sendbuff, "testlogin encode ");
            this.m_sendbuff.pos = 0;
            this.m_socket.send(this.m_sendbuff.buffer);
            core.net_errlog("testlogin bufferlen ", this.m_sendbuff.length);
            this.m_socket.flush();
        };
        TL_Login_net.prototype.close = function () {
            _super.prototype.close.call(this);
            this.m_loginstep = 0;
            this.m_b_connected = false;
        };
        TL_Login_net.prototype.dispose = function () {
            this.close();
        };
        return TL_Login_net;
    }(game_net_mgr));
    net.TL_Login_net = TL_Login_net;
    ////////////////////////////////////////////////////////////
    var g_ins = null;
    var g_b_mysvr = false;
    function net_ins() {
        if (g_ins == null) {
            if (g_b_mysvr) {
                g_ins = new game_net_mgr();
            }
            else {
                g_ins = new TL_Login_net();
            }
        }
        return g_ins;
    }
    net.net_ins = net_ins;
    function my_svr(flag) {
        g_b_mysvr = flag;
    }
    net.my_svr = my_svr;
    function is_mysvr() {
        return g_b_mysvr;
    }
    net.is_mysvr = is_mysvr;
    function clear() {
        if (g_ins != null) {
            g_ins.dispose();
            g_ins = null;
        }
    }
    net.clear = clear;
    //
})(net || (net = {}));
//# sourceMappingURL=game_net_mgr.js.map