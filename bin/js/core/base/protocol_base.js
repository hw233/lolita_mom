var game_event;
(function (game_event) {
    game_event.EVENT_NET_PACKET = "net_packet";
    game_event.EVENT_NET_CONNECTED = "net_connected";
    game_event.EVENT_NET_CLOSED = "net_closed";
    game_event.EVENT_NET_ERROR = "net_error";
    game_event.EVENT_WIDGET_ONSHOW = "ui_widget_onshow";
    game_event.EVENT_WIDGET_ONHIDE = "ui_widget_onhide";
    game_event.EVENT_WIDGET_ONDISPOSE = "ui_widget_ondispose";
    game_event.EVENT_WIDGET_ALLDISPOSE = "ui_widget_alldispose";
    game_event.EVENT_TESTCOMBAT = "test_combat";
    game_event.EVENT_TESTCOMBATPROTO = "test_combatproto";
    function gen_netcmd_event(cmd) {
        return game_event.EVENT_NET_PACKET + "_" + cmd.toString();
    }
    game_event.gen_netcmd_event = gen_netcmd_event;
})(game_event || (game_event = {}));
var protocol_def;
(function (protocol_def) {
    protocol_def.C2S_CMD_2_TYPE = {};
    //   C2S_CMD_2_TYPE[C2S_CHAT] = "net_protocol.ChatMsg";
    protocol_def.S2C_CMD_2_TYPE = {};
    protocol_def.C2S_CMD_2_PROTO = {};
    protocol_def.S2C_CMD_2_PROTO = {};
    function register_cmd(c2s_map, s2c_map) {
        for (var i in c2s_map) {
            if (c2s_map.hasOwnProperty(i)) {
                protocol_def.C2S_CMD_2_PROTO[i] = c2s_map[i];
            }
        }
        for (var i in s2c_map) {
            if (s2c_map.hasOwnProperty(i)) {
                protocol_def.S2C_CMD_2_PROTO[i] = s2c_map[i];
            }
        }
    }
    protocol_def.register_cmd = register_cmd;
    protocol_def.Protocol_desc_map = {};
    function register_protocol_desc(desc_map) {
        protocol_def.Protocol_desc_map = desc_map;
    }
    protocol_def.register_protocol_desc = register_protocol_desc;
})(protocol_def || (protocol_def = {}));
var protocolbuf;
(function (protocolbuf_1) {
    var protocolbuf = /** @class */ (function () {
        function protocolbuf() {
            this.m_temp = new laya.utils.Byte();
        }
        protocolbuf.prototype.get_desc_byname = function (name) {
            var desc = protocol_def.Protocol_desc_map[name];
            return desc;
        };
        protocolbuf.prototype.pack_uint8 = function (buf, v) {
            buf.writeUint8(v);
        };
        protocolbuf.prototype.unpack_uint8 = function (buf) {
            return buf.getUint8();
        };
        protocolbuf.prototype.pack_uint16 = function (buf, v) {
            buf.writeUint16(v);
        };
        protocolbuf.prototype.unpack_uint16 = function (buf) {
            return buf.getUint16();
        };
        protocolbuf.prototype.pack_uint32 = function (buf, v) {
            buf.writeUint32(v);
        };
        protocolbuf.prototype.unpack_uint32 = function (buf) {
            return buf.getUint32();
        };
        //
        protocolbuf.prototype.pack_int8 = function (buf, v) {
            if (v < 0) {
                v += 256;
            }
            buf.writeUint8(v);
        };
        protocolbuf.prototype.unpack_int8 = function (buf) {
            var ret = buf.getUint8();
            if (ret > 127) {
                ret -= 256;
            }
            return ret;
        };
        protocolbuf.prototype.pack_int16 = function (buf, v) {
            buf.writeInt16(v);
            //if(v < 0){
            //    v += 0x10000;
            //    v = v&0xffff;
            //}
            //buf.writeUint16(v);
        };
        protocolbuf.prototype.unpack_int16 = function (buf) {
            var ret = buf.getInt16();
            //let ret:number = buf.getUint16();
            //if(ret > (0xffff>>1)){
            //    ret -= 0x10000;
            //    ret = ret&0xffff;
            //}
            return ret;
        };
        protocolbuf.prototype.pack_int32 = function (buf, v) {
            buf.writeInt32(v);
            //if(v < 0){
            //    v += (0xffffffff + 1);
            //    v = v & 0xffffffff;
            //}
            //buf.writeUint32(v);
        };
        protocolbuf.prototype.unpack_int32 = function (buf) {
            var ret = buf.getInt32();
            //let ret:number = buf.getUint32();
            //if(ret > (0xffffffff>>1)){
            //    ret -= (0xffffffff + 1);
            //    ret = ret&0xffffffff;
            //}
            return ret;
        };
        //
        protocolbuf.prototype.pack_byte = function (buf, v) {
            if (v == undefined || v == null || v.length <= 0) {
                return;
            }
            v.pos = 0;
            while (v.bytesAvailable > 0) {
                buf.writeUint8(v.getUint8());
            }
        };
        protocolbuf.prototype.unpack_byte = function (buf, blen) {
            var ret = new Laya.Byte();
            while (buf.bytesAvailable > 0 && blen > 0) {
                ret.writeUint8(buf.getUint8());
                blen -= 1;
            }
            return ret;
        };
        protocolbuf.prototype.pack_byte8 = function (buf, v) {
            if (v == null) {
                buf.writeUint8(0);
                return;
            }
            v.pos = 0;
            buf.writeUint8(v.length);
            var len = v.length;
            if (len > 0xff) {
                len = 0xff;
            }
            if (v.length > 0) {
                while (v.bytesAvailable > 0 && len > 0) {
                    buf.writeUint8(v.getUint8());
                    len -= 1;
                }
            }
        };
        protocolbuf.prototype.unpack_byte8 = function (buf) {
            var ret = new Laya.Byte();
            var len = buf.getUint8();
            while (buf.bytesAvailable > 0 && len > 0) {
                ret.writeUint8(buf.getUint8());
                len -= 1;
            }
            return ret;
        };
        protocolbuf.prototype.pack_byte16 = function (buf, v) {
            if (v == null) {
                buf.writeUint16(0);
                return;
            }
            v.pos = 0;
            buf.writeUint16(v.length);
            var len = v.length;
            if (len > 0xffff) {
                len = 0xffff;
            }
            if (v.length > 0) {
                while (v.bytesAvailable > 0 && len > 0) {
                    buf.writeUint8(v.getUint8());
                    len -= 1;
                }
            }
        };
        protocolbuf.prototype.unpack_byte16 = function (buf) {
            var ret = new Laya.Byte();
            var len = buf.getUint16();
            while (buf.bytesAvailable > 0 && len > 0) {
                ret.writeUint8(buf.getUint8());
                len -= 1;
            }
            return ret;
        };
        protocolbuf.prototype.pack_byte32 = function (buf, v) {
            if (v == null) {
                buf.writeUint32(0);
                return;
            }
            v.pos = 0;
            buf.writeUint32(v.length);
            var len = v.length;
            if (len > 0xffffffff) {
                len = 0xffffffff;
            }
            if (v.length > 0) {
                while (v.bytesAvailable > 0 && len > 0) {
                    buf.writeUint8(v.getUint8());
                    len -= 1;
                }
            }
        };
        protocolbuf.prototype.unpack_byte32 = function (buf) {
            var ret = new Laya.Byte();
            var len = buf.getUint32();
            while (buf.bytesAvailable > 0 && len > 0) {
                ret.writeUint8(buf.getUint8());
                len -= 1;
            }
            return ret;
        };
        //
        protocolbuf.prototype.pack_string8 = function (buf, v) {
            if (v == undefined || v == null) {
                v = "";
            }
            var oldp = buf.pos;
            buf.writeUint8(v.length);
            var startp = buf.pos;
            buf.writeUTFBytes(v);
            var p = buf.pos;
            var truelen = p - startp;
            buf.pos = oldp;
            buf.writeUint8(truelen);
            buf.pos = p;
        };
        protocolbuf.prototype.unpack_string8 = function (buf) {
            var len = buf.getUint8();
            return buf.getUTFBytes(len);
        };
        protocolbuf.prototype.pack_string16 = function (buf, v) {
            if (v == undefined || v == null) {
                v = "";
            }
            var oldp = buf.pos;
            buf.writeUint16(v.length);
            var startp = buf.pos;
            buf.writeUTFBytes(v);
            var p = buf.pos;
            var truelen = p - startp;
            buf.pos = oldp;
            buf.writeUint16(truelen);
            buf.pos = p;
        };
        protocolbuf.prototype.unpack_string16 = function (buf) {
            var len = buf.getUint16();
            var ret = buf.getUTFBytes(len);
            return ret;
        };
        protocolbuf.prototype.pack_string32 = function (buf, v) {
            if (v == undefined || v == null) {
                v = "";
            }
            var oldp = buf.pos;
            buf.writeUint32(v.length);
            var startp = buf.pos;
            buf.writeUTFBytes(v);
            var p = buf.pos;
            var truelen = p - startp;
            buf.pos = oldp;
            buf.writeUint32(truelen);
            buf.pos = p;
        };
        protocolbuf.prototype.unpack_string32 = function (buf) {
            var len = buf.getUint32();
            return buf.getUTFBytes(len);
        };
        protocolbuf.prototype.pack_int_data = function (ret, type, v) {
            if (type == 'uint8') {
                this.pack_uint8(ret, v);
            }
            else if (type == 'uint16') {
                this.pack_uint16(ret, v);
            }
            else if (type == 'uint32') {
                this.pack_uint32(ret, v);
            }
            else if (type == 'int8') {
                this.pack_int8(ret, v);
            }
            else if (type == 'int16') {
                this.pack_int16(ret, v);
            }
            else if (type == 'int32') {
                this.pack_int32(ret, v);
            }
        };
        protocolbuf.prototype.unpack_int_data = function (ret, type) {
            if (type == 'uint8') {
                return this.unpack_uint8(ret);
            }
            else if (type == 'uint16') {
                return this.unpack_uint16(ret);
            }
            else if (type == 'uint32') {
                return this.unpack_uint32(ret);
            }
            else if (type == 'int8') {
                return this.unpack_int8(ret);
            }
            else if (type == 'int16') {
                return this.unpack_int16(ret);
            }
            else if (type == 'int32') {
                return this.unpack_int32(ret);
            }
            return 0;
        };
        protocolbuf.prototype.pack_string_data = function (ret, type, v) {
            if (type == 'string8') {
                this.pack_string8(ret, v);
            }
            else if (type == 'string16') {
                this.pack_string16(ret, v);
            }
            else if (type == 'string32') {
                this.pack_string32(ret, v);
            }
        };
        protocolbuf.prototype.unpack_string_data = function (ret, type) {
            if (type == 'string8') {
                return this.unpack_string8(ret);
            }
            else if (type == 'string16') {
                return this.unpack_string16(ret);
            }
            else if (type == 'string32') {
                return this.unpack_string32(ret);
            }
            return "";
        };
        protocolbuf.prototype.pack_data = function (ret, type, value, data) {
            if (type == "int8" || type == "int16" || type == "int32" || type == "uint8" || type == "uint16" || type == "uint32") {
                this.pack_int_data(ret, type, data);
            }
            else if (type == "string8" || type == "string16" || type == "string32") {
                this.pack_string_data(ret, type, data);
            }
            else if (type == "byte8") {
                this.pack_byte8(ret, data);
            }
            else if (type == "byte16") {
                this.pack_byte16(ret, data);
            }
            else if (type == "byte32") {
                this.pack_byte32(ret, data);
            }
            else if (type == "byte") {
                this.pack_byte(ret, data);
            }
            else if (type == 'list8' || type == 'list16' || type == 'list32') {
                var listdata = data;
                var len = listdata.length;
                if (type == 'list8') {
                    this.pack_uint8(ret, len);
                }
                else if (type == 'list16') {
                    this.pack_uint16(ret, len);
                }
                else if (type == 'list32') {
                    this.pack_uint32(ret, len);
                }
                var subtype = value;
                for (var _i = 0, listdata_1 = listdata; _i < listdata_1.length; _i++) {
                    var i = listdata_1[_i];
                    if (subtype == "int8" || subtype == "int16" || subtype == "int32" || subtype == "uint8" || subtype == "uint16" || subtype == "uint32") {
                        this.pack_int_data(ret, subtype, i);
                    }
                    else if (subtype == "string8" || subtype == "string16" || subtype == "string32") {
                        this.pack_string_data(ret, subtype, i);
                    }
                    else if (subtype == "byte8") {
                        this.pack_byte8(ret, i);
                    }
                    else if (subtype == "byte16") {
                        this.pack_byte16(ret, i);
                    }
                    else if (subtype == "byte32") {
                        this.pack_byte32(ret, i);
                    }
                    else if (subtype == "byte") {
                        this.pack_byte(ret, i);
                    }
                    else {
                        var desc = this.get_desc_byname(subtype);
                        for (var _a = 0, desc_1 = desc; _a < desc_1.length; _a++) {
                            var j = desc_1[_a];
                            var p = j[0];
                            var stype = j[1];
                            var svalue = j[2];
                            this.pack_data(ret, stype, svalue, i[p]);
                        }
                    }
                }
            }
            else {
                var desc = this.get_desc_byname(type);
                for (var _b = 0, desc_2 = desc; _b < desc_2.length; _b++) {
                    var j = desc_2[_b];
                    var p = j[0];
                    var stype = j[1];
                    var svalue = j[2];
                    this.pack_data(ret, stype, svalue, data[p]);
                }
            }
        };
        protocolbuf.prototype.unpack_data = function (type, value, buf, max_len) {
            if (max_len === void 0) { max_len = -1; }
            var nv;
            var sv;
            var bv;
            if (max_len < 0) {
                max_len = buf.length;
            }
            if (type == "int8" || type == "int16" || type == "int32" || type == "uint8" || type == "uint16" || type == "uint32") {
                nv = this.unpack_int_data(buf, type);
                return nv;
            }
            else if (type == "string8" || type == "string16" || type == "string32") {
                sv = this.unpack_string_data(buf, type);
                return sv;
            }
            else if (type == "byte8") {
                bv = this.unpack_byte8(buf);
                return bv;
            }
            else if (type == "byte16") {
                bv = this.unpack_byte8(buf);
                return bv;
            }
            else if (type == "byte32") {
                bv = this.unpack_byte8(buf);
                return bv;
            }
            else if (type == "byte") {
                bv = this.unpack_byte(buf, max_len);
                return bv;
            }
            else if (type == 'list8' || type == 'list16' || type == 'list32') {
                var len = 0;
                if (type == 'list8') {
                    len = this.unpack_uint8(buf);
                }
                else if (type == 'list16') {
                    len = this.unpack_uint16(buf);
                }
                else if (type == 'list32') {
                    len = this.unpack_uint32(buf);
                }
                var subtype = value;
                var listdata = [];
                for (var i = 0; i < len; ++i) {
                    if (subtype == "int8" || subtype == "int16" || subtype == "int32" || subtype == "uint8" || subtype == "uint16" || subtype == "uint32") {
                        nv = this.unpack_int_data(buf, subtype);
                        listdata.push(nv);
                    }
                    else if (subtype == "string8" || subtype == "string16" || subtype == "string32") {
                        sv = this.unpack_string_data(buf, subtype);
                        listdata.push(sv);
                    }
                    else if (subtype == "byte8") {
                        bv = this.unpack_byte8(buf);
                        listdata.push(bv);
                    }
                    else if (subtype == "byte16") {
                        bv = this.unpack_byte8(buf);
                        listdata.push(bv);
                    }
                    else if (subtype == "byte32") {
                        bv = this.unpack_byte8(buf);
                        listdata.push(bv);
                    }
                    else if (subtype == "byte") {
                        bv = this.unpack_byte(buf, max_len);
                        listdata.push(bv);
                    }
                    else {
                        var desc = this.get_desc_byname(subtype);
                        var ret = {};
                        for (var _i = 0, desc_3 = desc; _i < desc_3.length; _i++) {
                            var j = desc_3[_i];
                            var p = j[0];
                            var stype = j[1];
                            var svalue = j[2];
                            ret[p] = this.unpack_data(stype, svalue, buf, max_len);
                        }
                        listdata.push(ret);
                    }
                }
                //
                return listdata;
            }
            else {
                var desc = this.get_desc_byname(type);
                var ret = {};
                for (var _a = 0, desc_4 = desc; _a < desc_4.length; _a++) {
                    var j = desc_4[_a];
                    var p = j[0];
                    var stype = j[1];
                    var svalue = j[2];
                    ret[p] = this.unpack_data(stype, svalue, buf, max_len);
                }
                return ret;
            }
        };
        protocolbuf.prototype.c2s_rawbuff2buf = function (cmd, buff) {
            var ret = new Laya.Byte();
            ret.endian = Laya.Byte.BIG_ENDIAN;
            //
            ret.writeByte(19);
            ret.writeByte(82);
            ret.writeByte(8);
            ret.writeByte(28);
            ret.writeByte(1);
            ret.writeInt32(1);
            var lenpos = ret.pos;
            ret.writeInt32(0);
            ret.writeInt32(cmd);
            //
            buff.pos = 0;
            while (buff.pos < buff.length) {
                ret.writeUint8(buff.getUint8());
            }
            var cp = ret.pos;
            var tl = cp - lenpos - 4;
            ret.pos = lenpos;
            ret.writeInt32(tl);
            ret.pos = 0;
            return ret;
        };
        protocolbuf.prototype.c2s_data2buf = function (cmd, data) {
            var ret = new Laya.Byte();
            ret.endian = Laya.Byte.BIG_ENDIAN;
            //
            ret.writeByte(19);
            ret.writeByte(82);
            ret.writeByte(8);
            ret.writeByte(28);
            ret.writeByte(1);
            ret.writeInt32(1);
            var lenpos = ret.pos;
            ret.writeInt32(0);
            ret.writeInt32(cmd);
            //
            if (protocol_def.C2S_CMD_2_PROTO[cmd] != undefined) {
                var desc_name = protocol_def.C2S_CMD_2_PROTO[cmd];
                var desc = this.get_desc_byname(desc_name);
                for (var _i = 0, desc_5 = desc; _i < desc_5.length; _i++) {
                    var i = desc_5[_i];
                    var p = i[0];
                    var type = i[1];
                    var value = i[2];
                    this.pack_data(ret, type, value, data[p]);
                }
            }
            var cp = ret.pos;
            var tl = cp - lenpos - 4;
            ret.pos = lenpos;
            ret.writeInt32(tl);
            ret.pos = 0;
            return ret;
        };
        protocolbuf.prototype.s2c_buf2data = function (buf) {
            core.net_errlog("s2c_buf2data ", buf);
            var cmd = 0;
            var ret = {};
            var tmp = 0;
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getByte();
            tmp = buf.getInt32();
            var buflen = buf.getInt32();
            cmd = buf.getInt32();
            core.net_errlog("s2c_buf2data1 ", buf.length, buf.pos, buflen, cmd);
            if (protocol_def.S2C_CMD_2_PROTO[cmd] != undefined) {
                var desc_name = protocol_def.S2C_CMD_2_PROTO[cmd];
                var desc = this.get_desc_byname(desc_name);
                for (var _i = 0, desc_6 = desc; _i < desc_6.length; _i++) {
                    var i = desc_6[_i];
                    var p = i[0];
                    var type = i[1];
                    var value = i[2];
                    ret[p] = this.unpack_data(type, value, buf, buflen);
                }
            }
            var data_r = {};
            data_r['cmd'] = cmd;
            data_r['data'] = ret;
            return data_r;
        };
        /////
        protocolbuf.prototype.c2s_rawbuff2buf_tl = function (cmd, sbuff, sendbuff) {
            var plen = sbuff.length;
            plen += 2;
            sendbuff.clear();
            sendbuff.endian = Laya.Byte.LITTLE_ENDIAN;
            if (plen < 0xff) {
                sendbuff.writeUint8(plen);
            }
            else {
                sendbuff.pos = 0;
                sendbuff.writeUint8(0xff);
                sendbuff.writeUint32(plen);
                sendbuff.pos = 4;
            }
            sendbuff.writeInt16(cmd);
            sbuff.pos = 0;
            while (sbuff.pos < sbuff.length) {
                sendbuff.writeUint8(sbuff.getUint8());
            }
            sendbuff.pos = 0;
            return sendbuff;
        };
        protocolbuf.prototype.c2s_data2buf_tl = function (cmd, data, sendbuff) {
            //core.net_errlog("c2s_data2buf_tl ",cmd,data);
            this.m_temp.clear();
            var ret = this.m_temp;
            ret.endian = Laya.Byte.LITTLE_ENDIAN;
            //
            ret.writeInt16(cmd);
            //
            if (protocol_def.C2S_CMD_2_PROTO[cmd] != undefined) {
                var desc_name = protocol_def.C2S_CMD_2_PROTO[cmd];
                var desc = this.get_desc_byname(desc_name);
                for (var _i = 0, desc_7 = desc; _i < desc_7.length; _i++) {
                    var i = desc_7[_i];
                    var p = i[0];
                    var type = i[1];
                    var value = i[2];
                    this.pack_data(ret, type, value, data[p]);
                }
            }
            var plen = ret.length;
            sendbuff.clear();
            var newret = sendbuff;
            newret.endian = Laya.Byte.LITTLE_ENDIAN;
            if (plen < 0xff) {
                newret.writeUint8(plen);
            }
            else {
                newret.pos = 0;
                newret.writeUint8(0xff);
                newret.writeUint32(plen);
                newret.pos = 4;
            }
            ret.pos = 0;
            while (ret.pos < ret.length) {
                newret.writeUint8(ret.getUint8());
            }
            newret.pos = 0;
            return newret;
        };
        protocolbuf.prototype.s2c_buf2data_tl = function (buf) {
            //core.net_errlog("s2c_buf2data_tl ",buf);
            var cmd = 0;
            var ret = {};
            var tmp = 0;
            var buffoldpos = buf.pos;
            tmp = buf.getUint8();
            var recvlen = buf.length - buf.pos;
            var plen = 0;
            if (tmp == 0xff) {
                buf.pos = buffoldpos;
                plen = buf.getUint32();
                plen = plen >> 8;
                recvlen = recvlen - 3;
            }
            else {
                plen = tmp;
            }
            if (plen > recvlen) {
                core.net_errlog("s2c_buf2data_tl is not enough ", plen, recvlen, buf.length);
                buf.pos = buffoldpos;
                return null;
            }
            cmd = buf.getInt16();
            plen -= 2;
            core.net_tiplog("s2c_buf2data_tl ", cmd.toString(16), buf.length, buf.pos, plen);
            if (protocol_def.S2C_CMD_2_PROTO[cmd] != undefined) {
                var desc_name = protocol_def.S2C_CMD_2_PROTO[cmd];
                var desc = this.get_desc_byname(desc_name);
                for (var _i = 0, desc_8 = desc; _i < desc_8.length; _i++) {
                    var i = desc_8[_i];
                    var p = i[0];
                    var type = i[1];
                    var value = i[2];
                    ret[p] = this.unpack_data(type, value, buf, plen);
                }
            }
            else {
                buf.getUTFBytes(plen);
                core.net_errlog("cmd is not defined! ", cmd.toString(16));
            }
            var data_r = {};
            data_r['cmd'] = cmd;
            data_r['data'] = ret;
            return data_r;
        };
        return protocolbuf;
    }());
    protocolbuf_1.protocolbuf = protocolbuf;
})(protocolbuf || (protocolbuf = {}));
//# sourceMappingURL=protocol_base.js.map