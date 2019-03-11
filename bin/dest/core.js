var core;
(function (core) {
    var avatardirlink = /** @class */ (function () {
        function avatardirlink() {
            this.m_dir = 0;
            this.m_framecount = 0;
            this.m_ptcount = 0;
            this.m_pt_arr = null;
            this.m_pt_max = 4;
            this.m_invalid_pt = new Laya.Point(0, 0);
            this.init();
        }
        avatardirlink.prototype.init = function () {
            this.m_pt_arr = new Array();
            for (var i = 0; i < this.m_pt_max; ++i) {
                this.m_pt_arr.push(new Array());
            }
        };
        avatardirlink.prototype.dispose = function () {
        };
        avatardirlink.prototype.add_pt = function (idx, x, y) {
            this.m_pt_arr[idx].push(new Laya.Point(x, y));
        };
        avatardirlink.prototype.get_pt = function (pt_idx, idx) {
            if (this.m_pt_arr[pt_idx].length <= 0) {
                return this.m_invalid_pt;
            }
            var ret = this.m_pt_arr[pt_idx][idx % this.m_pt_arr[pt_idx].length];
            if (!ret) {
                ret = this.m_invalid_pt;
            }
            return ret;
            //if(idx >= this.m_pt_arr[pt_idx].length){
            //    if(this.m_pt_arr[pt_idx].length <= 0)
            //    {
            //        return this.m_invalid_pt;
            //    }
            //    return this.m_pt_arr[pt_idx][idx%this.m_pt_arr[pt_idx].length];
            //}
            //return this.m_pt_arr[pt_idx][idx];
        };
        avatardirlink.prototype.print_data = function () {
            for (var i = 0; i < this.m_pt_max; ++i) {
                var output = "ptidx " + i.toString() + " ";
                for (var j = 0; j < this.m_pt_arr[i].length; ++j) {
                    output = output + this.m_pt_arr[i][j].x.toString() + "," + this.m_pt_arr[i][j].y.toString() + " ";
                }
                core.core_tiplog("avatardirlink ", output);
            }
        };
        return avatardirlink;
    }());
    core.avatardirlink = avatardirlink;
    var avatarlink = /** @class */ (function () {
        function avatarlink() {
            this.m_id = 0;
            this.m_action = 0;
            this.m_sign = 0;
            this.m_sign_txt = "";
            this.m_version = 0;
            this.m_dircount = 0;
            this.m_dir_max = 8;
            this.m_dir_arr = null;
            this.init();
        }
        avatarlink.prototype.print_data = function () {
            core.core_tiplog("avatarlink ", this.m_id, this.m_version, this.m_dircount);
            for (var i = 0; i < this.m_dir_max; ++i) {
                var dir_d = this.m_dir_arr[i];
                core.core_tiplog("dir data:", dir_d.m_dir, dir_d.m_framecount, dir_d.m_ptcount);
                dir_d.print_data();
            }
        };
        avatarlink.prototype.dispose = function () {
            if (this.m_dir_arr == null) {
                return;
            }
            for (var i = 0; i < this.m_dir_arr.length; ++i) {
                utils.recover("avatardirlink", this.m_dir_arr[i]);
            }
            this.m_dir_arr = null;
        };
        avatarlink.prototype.get_pt = function (dir, pt_idx, idx) {
            return this.m_dir_arr[dir].get_pt(pt_idx, idx);
        };
        avatarlink.prototype.init = function () {
            this.dispose();
            this.m_dir_arr = new Array();
            for (var i = 0; i < this.m_dir_max; ++i) {
                var new_dir = utils.getitembycls("avatardirlink", avatardirlink);
                new_dir.init();
                this.m_dir_arr.push(new_dir);
            }
        };
        //
        avatarlink.prototype.set_txt_buff = function (buf, buf_len) {
            var f_buf = buf.getUTFBytes(buf_len);
            var line_arr = f_buf.split("\r\n");
            if (line_arr.length < 3) {
                core.core_errlog("avatar_link set_txt_buff error line_arr.length < 3 ", f_buf);
                return;
            }
            var tmp_arr = null;
            var line_no = 0;
            this.m_sign_txt = line_arr[line_no];
            line_no += 1;
            var line_str = line_arr[line_no];
            tmp_arr = line_str.split(":");
            this.m_version = parseInt(tmp_arr[1]);
            line_no += 1;
            line_str = line_arr[line_no];
            tmp_arr = line_str.split(":");
            this.m_dircount = parseInt(tmp_arr[1]);
            line_no += 1;
            for (var i = 0; i < this.m_dircount; ++i) {
                line_str = line_arr[line_no];
                tmp_arr = line_str.split(":");
                var dir = parseInt(tmp_arr[1]);
                line_no += 1;
                line_str = line_arr[line_no];
                tmp_arr = line_str.split(":");
                var framecount = parseInt(tmp_arr[1]);
                line_no += 1;
                line_str = line_arr[line_no];
                tmp_arr = line_str.split(":");
                var ptcount = parseInt(tmp_arr[1]);
                line_no += 1;
                this.m_dir_arr[dir].m_dir = dir;
                this.m_dir_arr[dir].m_framecount = framecount;
                this.m_dir_arr[dir].m_ptcount = ptcount;
                this.m_dir_arr[dir].init();
                for (var j = 0; j < ptcount; ++j) {
                    line_str = line_arr[line_no];
                    tmp_arr = line_str.split(":");
                    var ptidx = parseInt(tmp_arr[1]);
                    line_no += 1;
                    for (var k = 0; k < framecount; ++k) {
                        line_str = line_arr[line_no];
                        tmp_arr = line_str.split(",");
                        line_no += 1;
                        var x = parseInt(tmp_arr[0]);
                        var y = parseInt(tmp_arr[1]);
                        this.m_dir_arr[dir].add_pt(ptidx, x, y);
                    }
                }
            }
        };
        //
        avatarlink.prototype.set_buff = function (buf, buf_len) {
            this.m_sign = buf.getUint32();
            this.m_version = buf.getUint8();
            this.m_dircount = buf.getUint8();
            for (var i = 0; i < this.m_dircount; ++i) {
                var dir = buf.getUint8();
                var framecount = buf.getUint8();
                var ptcount = buf.getUint8();
                this.m_dir_arr[dir].m_dir = dir;
                this.m_dir_arr[dir].m_framecount = framecount;
                this.m_dir_arr[dir].m_ptcount = ptcount;
                this.m_dir_arr[dir].init();
                for (var j = 0; j < ptcount; ++j) {
                    var ptidx = buf.getUint8();
                    for (var k = 0; k < framecount; ++k) {
                        var x = buf.getUint16();
                        var y = buf.getUint16();
                        this.m_dir_arr[dir].add_pt(ptidx, x, y);
                    }
                }
            }
        };
        return avatarlink;
    }());
    core.avatarlink = avatarlink;
})(core || (core = {}));
//# sourceMappingURL=avatarlink.js.map
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
var core;
(function (core) {
    var avatarname = /** @class */ (function (_super) {
        __extends(avatarname, _super);
        function avatarname() {
            var _this = _super.call(this) || this;
            _this.m_bk = new Laya.Sprite();
            _this.m_text = new Laya.Text();
            _this.m_bk_w = 80;
            _this.m_bk_h = 40;
            //this.m_bk.loadImage("avatar/namepanel.png");
            //this.addChild(this.m_bk);
            _this.addChild(_this.m_text);
            //this.m_bk.scaleY = 0.5;
            _this.m_text.font = "h5font";
            _this.m_text.overflow = Laya.Text.HIDDEN;
            _this.m_text.color = "#65ff65";
            _this.m_text.stroke = 2;
            _this.m_text.strokeColor = "#19591c";
            _this.m_text.align = "center";
            _this.m_text.fontSize = 22;
            _this.m_text.size(200, 40);
            _this.m_text.y = 0;
            _this.m_text.x = -100;
            _this.y = 25;
            return _this;
        }
        avatarname.prototype.re_init = function () {
            this.y = 25;
            this.x = 0;
        };
        avatarname.prototype.dispose = function () {
        };
        return avatarname;
    }(Laya.Sprite));
    core.avatarname = avatarname;
    var avatarhp = /** @class */ (function (_super) {
        __extends(avatarhp, _super);
        function avatarhp() {
            var _this = _super.call(this) || this;
            _this.m_progress = null;
            _this.m_w = 62;
            _this.m_h = 18;
            _this.m_progress = new Laya.ProgressBar("avatar/blood.png");
            _this.m_progress.width = _this.m_w;
            _this.m_progress.height = _this.m_h;
            _this.addChild(_this.m_progress);
            return _this;
        }
        avatarhp.prototype.re_init = function () {
            this.m_progress.value = 1;
        };
        avatarhp.prototype.set_v = function (v, m) {
            this.m_progress.value = v / m;
        };
        avatarhp.prototype.clear = function () {
        };
        avatarhp.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_progress != null) {
                this.m_progress = null;
            }
        };
        return avatarhp;
    }(Laya.Sprite));
    core.avatarhp = avatarhp;
    var avatarbuff = /** @class */ (function (_super) {
        __extends(avatarbuff, _super);
        function avatarbuff() {
            var _this = _super.call(this) || this;
            _this.m_id = 0;
            _this.m_shape = 0;
            _this.m_cd = 0;
            _this.m_overlap = 0;
            _this.m_datas = null;
            _this.m_icon = null;
            _this.m_cd_label = null;
            _this.m_w = 0;
            _this.m_h = 0;
            _this.m_cd_label_h = 12;
            _this.m_effid = 0;
            _this.m_icon = new Laya.Sprite();
            _this.m_cd_label = new Laya.Label();
            _this.m_cd_label.color = '#fff200';
            _this.m_cd_label.stroke = 1;
            _this.m_cd_label.strokeColor = "#000000";
            _this.addChild(_this.m_icon);
            _this.addChild(_this.m_cd_label);
            return _this;
        }
        avatarbuff.prototype.re_init = function () {
            this.m_cd_label.y = this.m_h - this.m_cd_label_h;
            this.m_effid = 0;
        };
        avatarbuff.prototype.set_id = function (id, shape) {
            if (this.m_id != id) {
                this.m_icon.graphics.clear();
            }
            this.m_id = id;
            this.m_shape = shape;
            this.m_icon.graphics.loadImage("icon/buff/" + this.m_shape.toString() + ".jpg", 0, 0, this.m_w, this.m_h);
        };
        avatarbuff.prototype.set_data = function (cd, overlap, datas) {
            this.set_cd(cd);
            this.m_overlap = overlap;
            this.m_datas = datas;
        };
        avatarbuff.prototype.set_cd = function (cd) {
            this.m_cd = cd;
            this.m_cd_label.text = this.m_cd.toString();
        };
        avatarbuff.prototype.set_effid = function (id) {
            this.m_effid = id;
        };
        avatarbuff.prototype.dispose = function () {
            this.m_icon.graphics.clear();
        };
        return avatarbuff;
    }(Laya.Sprite));
    core.avatarbuff = avatarbuff;
    var avatarbuffui = /** @class */ (function (_super) {
        __extends(avatarbuffui, _super);
        function avatarbuffui() {
            var _this = _super.call(this) || this;
            _this.m_list = null;
            _this.m_num_per_row = 3;
            _this.m_buffw = 32;
            _this.m_buffh = 32;
            _this.m_list = new Array();
            return _this;
        }
        avatarbuffui.prototype._re_arrange = function () {
            var dx = 0;
            var dy = 0;
            var idx = 0;
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.x = dx;
                i.y = dy;
                idx += 1;
                dx += this.m_buffw;
                if (idx > 2) {
                    dx = 0;
                    dy += this.m_buffh;
                    idx = 0;
                }
            }
            dy += this.m_buffh;
            this.x = 0 - this.m_buffw * this.m_num_per_row / 2;
            this.y = 0 - 100;
        };
        avatarbuffui.prototype.addbuff = function (bid, shape, cd, overlap, datas, effid) {
            if (effid === void 0) { effid = 0; }
            var addbuff = this.getbuff(bid);
            if (addbuff == null) {
                addbuff = utils.getitembycls("avatarbuff", avatarbuff);
                addbuff.m_w = this.m_buffw;
                addbuff.m_h = this.m_buffh;
                addbuff.re_init();
                this.addChild(addbuff);
                addbuff.set_id(bid, shape);
                addbuff.set_effid(effid);
                this.m_list.push(addbuff);
                this._re_arrange();
            }
            addbuff.set_data(cd, overlap, datas);
        };
        avatarbuffui.prototype.getbuff = function (bid) {
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == bid) {
                    return i;
                }
            }
            return null;
        };
        avatarbuffui.prototype.delbuff = function (bid) {
            for (var i = 0; i < this.m_list.length; ++i) {
                var b = this.m_list[i];
                if (b.m_id == bid) {
                    b.removeSelf();
                    b.dispose();
                    utils.recover("avatarbuff", b);
                    this.m_list.splice(i, 1);
                    this._re_arrange();
                    return true;
                }
            }
            return false;
        };
        avatarbuffui.prototype.buffautocd = function () {
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.set_cd(i.m_cd - 1);
            }
        };
        avatarbuffui.prototype.delallbuff = function () {
            this.removeChildren();
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("avatarbuff", i);
            }
            this.m_list.length = 0;
        };
        avatarbuffui.prototype.re_init = function () {
        };
        avatarbuffui.prototype.clear = function () {
            this.delallbuff();
        };
        avatarbuffui.prototype.dispose = function () {
            this.clear();
        };
        return avatarbuffui;
    }(Laya.Sprite));
    core.avatarbuffui = avatarbuffui;
})(core || (core = {}));
//# sourceMappingURL=avatarname.js.map
var blowfish;
(function (blowfish) {
    var MAXKEYBYTES = 56; // 448 bits max
    var PLEN = 18; // SBox passes
    var bf_P = [
        0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344,
        0xa4093822, 0x299f31d0, 0x082efa98, 0xec4e6c89,
        0x452821e6, 0x38d01377, 0xbe5466cf, 0x34e90c6c,
        0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5, 0xb5470917,
        0x9216d5d9, 0x8979fb1b
    ];
    var SW = 4;
    var SLEN = 256;
    var bf_S = [
        [
            0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7,
            0xb8e1afed, 0x6a267e96, 0xba7c9045, 0xf12c7f99,
            0x24a19947, 0xb3916cf7, 0x0801f2e2, 0x858efc16,
            0x636920d8, 0x71574e69, 0xa458fea3, 0xf4933d7e,
            0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee,
            0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013,
            0xc5d1b023, 0x286085f0, 0xca417918, 0xb8db38ef,
            0x8e79dcb0, 0x603a180e, 0x6c9e0e8b, 0xb01e8a3e,
            0xd71577c1, 0xbd314b27, 0x78af2fda, 0x55605c60,
            0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
            0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce,
            0xa15486af, 0x7c72e993, 0xb3ee1411, 0x636fbc2a,
            0x2ba9c55d, 0x741831f6, 0xce5c3e16, 0x9b87931e,
            0xafd6ba33, 0x6c24cf5c, 0x7a325381, 0x28958677,
            0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
            0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032,
            0xef845d5d, 0xe98575b1, 0xdc262302, 0xeb651b88,
            0x23893e81, 0xd396acc5, 0x0f6d6ff3, 0x83f44239,
            0x2e0b4482, 0xa4842004, 0x69c8f04a, 0x9e1f9b5e,
            0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
            0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3,
            0x6eef0b6c, 0x137a3be4, 0xba3bf050, 0x7efb2a98,
            0xa1f1651d, 0x39af0176, 0x66ca593e, 0x82430e88,
            0x8cee8619, 0x456f9fb4, 0x7d84a5c3, 0x3b8b5ebe,
            0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6,
            0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d,
            0x37d0d724, 0xd00a1248, 0xdb0fead3, 0x49f1c09b,
            0x075372c9, 0x80991b7b, 0x25d479d8, 0xf6e8def7,
            0xe3fe501a, 0xb6794c3b, 0x976ce0bd, 0x04c006ba,
            0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
            0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f,
            0x6dfc511f, 0x9b30952c, 0xcc814544, 0xaf5ebd09,
            0xbee3d004, 0xde334afd, 0x660f2807, 0x192e4bb3,
            0xc0cba857, 0x45c8740f, 0xd20b5f39, 0xb9d3fbdb,
            0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
            0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8,
            0x3c7516df, 0xfd616b15, 0x2f501ec8, 0xad0552ab,
            0x323db5fa, 0xfd238760, 0x53317b48, 0x3e00df82,
            0x9e5c57bb, 0xca6f8ca0, 0x1a87562e, 0xdf1769db,
            0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
            0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0,
            0x10fa3d98, 0xfd2183b8, 0x4afcb56c, 0x2dd1d35b,
            0x9a53e479, 0xb6f84565, 0xd28e49bc, 0x4bfb9790,
            0xe1ddf2da, 0xa4cb7e33, 0x62fb1341, 0xcee4c6e8,
            0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
            0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0,
            0xd08ed1d0, 0xafc725e0, 0x8e3c5b2f, 0x8e7594b7,
            0x8ff6e2fb, 0xf2122b64, 0x8888b812, 0x900df01c,
            0x4fad5ea0, 0x688fc31c, 0xd1cff191, 0xb3a8c1ad,
            0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
            0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299,
            0xb4a84fe0, 0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9,
            0x165fa266, 0x80957705, 0x93cc7314, 0x211a1477,
            0xe6ad2065, 0x77b5fa86, 0xc75442f5, 0xfb9d35cf,
            0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49,
            0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af,
            0x2464369b, 0xf009b91e, 0x5563911d, 0x59dfa6aa,
            0x78c14389, 0xd95a537f, 0x207d5ba2, 0x02e5b9c5,
            0x83260376, 0x6295cfa9, 0x11c81968, 0x4e734a41,
            0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
            0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400,
            0x08ba6fb5, 0x571be91f, 0xf296ec6b, 0x2a0dd915,
            0xb6636521, 0xe7b9f9b6, 0xff34052e, 0xc5855664,
            0x53b02d5d, 0xa99f8fa1, 0x08ba4799, 0x6e85076a,
        ],
        [
            0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623,
            0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266,
            0xecaa8c71, 0x699a17ff, 0x5664526c, 0xc2b19ee1,
            0x193602a5, 0x75094c29, 0xa0591340, 0xe4183a3e,
            0x3f54989a, 0x5b429d65, 0x6b8fe4d6, 0x99f73fd6,
            0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
            0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e,
            0x09686b3f, 0x3ebaefc9, 0x3c971814, 0x6b6a70a1,
            0x687f3584, 0x52a0e286, 0xb79c5305, 0xaa500737,
            0x3e07841c, 0x7fdeae5c, 0x8e7d44ec, 0x5716f2b8,
            0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
            0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd,
            0xd19113f9, 0x7ca92ff6, 0x94324773, 0x22f54701,
            0x3ae5e581, 0x37c2dadc, 0xc8b57634, 0x9af3dda7,
            0xa9446146, 0x0fd0030e, 0xecc8c73e, 0xa4751e41,
            0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
            0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf,
            0x2cb81290, 0x24977c79, 0x5679b072, 0xbcaf89af,
            0xde9a771f, 0xd9930810, 0xb38bae12, 0xdccf3f2e,
            0x5512721f, 0x2e6b7124, 0x501adde6, 0x9f84cd87,
            0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c,
            0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2,
            0xef1c1847, 0x3215d908, 0xdd433b37, 0x24c2ba16,
            0x12a14d43, 0x2a65c451, 0x50940002, 0x133ae4dd,
            0x71dff89e, 0x10314e55, 0x81ac77d6, 0x5f11199b,
            0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
            0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e,
            0x86e34570, 0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3,
            0x771fe71c, 0x4e3d06fa, 0x2965dcb9, 0x99e71d0f,
            0x803e89d6, 0x5266c825, 0x2e4cc978, 0x9c10b36a,
            0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4,
            0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960,
            0x5223a708, 0xf71312b6, 0xebadfe6e, 0xeac31f66,
            0xe3bc4595, 0xa67bc883, 0xb17f37d1, 0x018cff28,
            0xc332ddef, 0xbe6c5aa5, 0x65582185, 0x68ab9802,
            0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
            0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510,
            0x13cca830, 0xeb61bd96, 0x0334fe1e, 0xaa0363cf,
            0xb5735c90, 0x4c70a239, 0xd59e9e0b, 0xcbaade14,
            0xeecc86bc, 0x60622ca7, 0x9cab5cab, 0xb2f3846e,
            0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
            0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7,
            0x9b540b19, 0x875fa099, 0x95f7997e, 0x623d7da8,
            0xf837889a, 0x97e32d77, 0x11ed935f, 0x16681281,
            0x0e358829, 0xc7e61fd6, 0x96dedfa1, 0x7858ba99,
            0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
            0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128,
            0x58ebf2ef, 0x34c6ffea, 0xfe28ed61, 0xee7c3c73,
            0x5d4a14d9, 0xe864b7e3, 0x42105d14, 0x203e13e0,
            0x45eee2b6, 0xa3aaabea, 0xdb6c4f15, 0xfacb4fd0,
            0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105,
            0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250,
            0xcf62a1f2, 0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3,
            0x7f1524c3, 0x69cb7492, 0x47848a0b, 0x5692b285,
            0x095bbf00, 0xad19489d, 0x1462b174, 0x23820e00,
            0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
            0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb,
            0x7cde3759, 0xcbee7460, 0x4085f2a7, 0xce77326e,
            0xa6078084, 0x19f8509e, 0xe8efd855, 0x61d99735,
            0xa969a7aa, 0xc50c06c2, 0x5a04abfc, 0x800bcadc,
            0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9,
            0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340,
            0xc5c43465, 0x713e38d8, 0x3d28f89e, 0xf16dff20,
            0x153e21e7, 0x8fb03d4a, 0xe6e39f2b, 0xdb83adf7,
        ],
        [
            0xe93d5a68, 0x948140f7, 0xf64c261c, 0x94692934,
            0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
            0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af,
            0x1e39f62e, 0x97244546, 0x14214f74, 0xbf8b8840,
            0x4d95fc1d, 0x96b591af, 0x70f4ddd3, 0x66a02f45,
            0xbfbc09ec, 0x03bd9785, 0x7fac6dd0, 0x31cb8504,
            0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
            0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb,
            0x68dc1462, 0xd7486900, 0x680ec0a4, 0x27a18dee,
            0x4f3ffea2, 0xe887ad8c, 0xb58ce006, 0x7af4d6b6,
            0xaace1e7c, 0xd3375fec, 0xce78a399, 0x406b2a42,
            0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
            0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2,
            0x3a6efa74, 0xdd5b4332, 0x6841e7f7, 0xca7820fb,
            0xfb0af54e, 0xd8feb397, 0x454056ac, 0xba489527,
            0x55533a3a, 0x20838d87, 0xfe6ba9b7, 0xd096954b,
            0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
            0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c,
            0xfdf8e802, 0x04272f70, 0x80bb155c, 0x05282ce3,
            0x95c11548, 0xe4c66d22, 0x48c1133f, 0xc70f86dc,
            0x07f9c9ee, 0x41041f0f, 0x404779a4, 0x5d886e17,
            0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
            0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b,
            0x0e12b4c2, 0x02e1329e, 0xaf664fd1, 0xcad18115,
            0x6b2395e0, 0x333e92e1, 0x3b240b62, 0xeebeb922,
            0x85b2a20e, 0xe6ba0d99, 0xde720c8c, 0x2da2f728,
            0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0,
            0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e,
            0x0a476341, 0x992eff74, 0x3a6f6eab, 0xf4f8fd37,
            0xa812dc60, 0xa1ebddf8, 0x991be14c, 0xdb6e6b0d,
            0xc67b5510, 0x6d672c37, 0x2765d43b, 0xdcd0e804,
            0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
            0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3,
            0xbb132f88, 0x515bad24, 0x7b9479bf, 0x763bd6eb,
            0x37392eb3, 0xcc115979, 0x8026e297, 0xf42e312d,
            0x6842ada7, 0xc66a2b3b, 0x12754ccc, 0x782ef11c,
            0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
            0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9,
            0x44421659, 0x0a121386, 0xd90cec6e, 0xd5abea2a,
            0x64af674e, 0xda86a85f, 0xbebfe988, 0x64e4c3fe,
            0x9dbc8057, 0xf0f7c086, 0x60787bf8, 0x6003604d,
            0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
            0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f,
            0x77a057be, 0xbde8ae24, 0x55464299, 0xbf582e61,
            0x4e58f48f, 0xf2ddfda2, 0xf474ef38, 0x8789bdc2,
            0x5366f9c3, 0xc8b38e74, 0xb475f255, 0x46fcd9b9,
            0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2,
            0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c,
            0xb90bace1, 0xbb8205d0, 0x11a86248, 0x7574a99e,
            0xb77f19b6, 0xe0a9dc09, 0x662d09a1, 0xc4324633,
            0xe85a1f02, 0x09f0be8c, 0x4a99a025, 0x1d6efe10,
            0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
            0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52,
            0x50115e01, 0xa70683fa, 0xa002b5c4, 0x0de6d027,
            0x9af88c27, 0x773f8641, 0xc3604c06, 0x61a806b5,
            0xf0177a28, 0xc0f586e0, 0x006058aa, 0x30dc7d62,
            0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634,
            0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76,
            0x6f05e409, 0x4b7c0188, 0x39720a3d, 0x7c927c24,
            0x86e3725f, 0x724d9db9, 0x1ac15bb4, 0xd39eb8fc,
            0xed545578, 0x08fca5b5, 0xd83d7cd3, 0x4dad0fc4,
            0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
            0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837,
            0xd79a3234, 0x92638212, 0x670efa8e, 0x406000e0,
        ],
        [
            0x3a39ce37, 0xd3faf5cf, 0xabc27737, 0x5ac52d1b,
            0x5cb0679e, 0x4fa33742, 0xd3822740, 0x99bc9bbe,
            0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
            0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4,
            0x5748ab2f, 0xbc946e79, 0xc6a376d2, 0x6549c2c8,
            0x530ff8ee, 0x468dde7d, 0xd5730a1d, 0x4cd04dc6,
            0x2939bbdb, 0xa9ba4650, 0xac9526e8, 0xbe5ee304,
            0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
            0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4,
            0x83c061ba, 0x9be96a4d, 0x8fe51550, 0xba645bd6,
            0x2826a2f9, 0xa73a3ae1, 0x4ba99586, 0xef5562e9,
            0xc72fefd3, 0xf752f7da, 0x3f046f69, 0x77fa0a59,
            0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593,
            0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51,
            0x96d5ac3a, 0x017da67d, 0xd1cf3ed6, 0x7c7d2d28,
            0x1f9f25cf, 0xadf2b89b, 0x5ad6b472, 0x5a88f54c,
            0xe029ac71, 0xe019a5e6, 0x47b0acfd, 0xed93fa9b,
            0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
            0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c,
            0x15056dd4, 0x88f46dba, 0x03a16125, 0x0564f0bd,
            0xc3eb9e15, 0x3c9057a2, 0x97271aec, 0xa93a072a,
            0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb, 0x26dcf319,
            0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb,
            0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f,
            0x4de81751, 0x3830dc8e, 0x379d5862, 0x9320f991,
            0xea7a90c2, 0xfb3e7bce, 0x5121ce64, 0x774fbe32,
            0xa8b6e37e, 0xc3293d46, 0x48de5369, 0x6413e680,
            0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
            0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae,
            0x5bbef7dd, 0x1b588d40, 0xccd2017f, 0x6bb4e3bb,
            0xdda26a7e, 0x3a59ff45, 0x3e350a44, 0xbcb4cdd5,
            0x72eacea8, 0xfa6484bb, 0x8d6612ae, 0xbf3c6f47,
            0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
            0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d,
            0x4040cb08, 0x4eb4e2cc, 0x34d2466a, 0x0115af84,
            0xe1b00428, 0x95983a1d, 0x06b89fb4, 0xce6ea048,
            0x6f3f3b82, 0x3520ab82, 0x011a1d4b, 0x277227f8,
            0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
            0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9,
            0xe01cc87e, 0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7,
            0x1a908749, 0xd44fbd9a, 0xd0dadecb, 0xd50ada38,
            0x0339c32a, 0xc6913667, 0x8df9317c, 0xe0b12b4f,
            0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c,
            0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525,
            0xfae59361, 0xceb69ceb, 0xc2a86459, 0x12baa8d1,
            0xb6c1075e, 0xe3056a0c, 0x10d25065, 0xcb03a442,
            0xe0ec6e0e, 0x1698db3b, 0x4c98a0be, 0x3278e964,
            0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
            0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8,
            0xdf359f8d, 0x9b992f2e, 0xe60b6f47, 0x0fe3f11d,
            0xe54cda54, 0x1edad891, 0xce6279cf, 0xcd3e7e6f,
            0x1618b166, 0xfd2c1d05, 0x848fd2c5, 0xf6fb2299,
            0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02,
            0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc,
            0xde966292, 0x81b949d0, 0x4c50901b, 0x71c65614,
            0xe6c6c7bd, 0x327a140a, 0x45e1d006, 0xc3f27b9a,
            0xc9aa53fd, 0x62a80f00, 0xbb25bfe2, 0x35bdd2f6,
            0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
            0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0,
            0xba38209c, 0xf746ce76, 0x77afa1c5, 0x20756060,
            0x85cbfe4e, 0x8ae88dd8, 0x7aaaf9b0, 0x4cf9aa7e,
            0x1948c25c, 0x02fb8a8c, 0x01c36ae4, 0xd6ebe1f9,
            0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
            0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6,
        ]
    ];
    var CBlowFish = /** @class */ (function () {
        function CBlowFish() {
            this.m_index = 0;
            this.m_PArray = new Array(PLEN);
            this.m_SBoxes = new Array();
            for (var i = 0; i < PLEN; ++i) {
                this.m_PArray[i] = bf_P[i];
            }
            for (var i = 0; i < SW; ++i) {
                this.m_SBoxes.push(new Array(SLEN));
                for (var j = 0; j < SLEN; ++j) {
                    this.m_SBoxes[i][j] = bf_S[i][j];
                }
            }
            this._print_array("constructor");
        }
        CBlowFish.prototype._print_array = function (msg, b_force) {
            if (msg === void 0) { msg = ""; }
            if (b_force === void 0) { b_force = false; }
            if (b_force == false) {
                return;
            }
            var output = "_print_array " + msg + " ";
            for (var i = 0; i < PLEN; ++i) {
                var c = this.m_PArray[i];
                output = output + " " + c.toString(16);
            }
            core.net_errlog(output);
            core.net_errlog("sbox start ");
            output = "";
            for (var i = 0; i < SW; ++i) {
                var ta = this.m_SBoxes[i];
                var cidx = 0;
                for (var j = 0; j < SLEN; ++j) {
                    var c = this.m_SBoxes[i][j];
                    if (c < 0) {
                        c = c + 0xffffffff + 1;
                    }
                    output = output + " " + c.toString(16);
                    if (cidx >= 15) {
                        core.net_errlog(output);
                        output = "";
                        cidx = 0;
                    }
                    else {
                        cidx += 1;
                    }
                }
            }
            core.net_errlog("sbox end ");
        };
        CBlowFish.prototype._bf_F = function (v) {
            //little endian
            //let byte3:number = (v>>24)&0xFF;
            //let byte2:number = (v>>16)&0xFF;
            //let byte1:number = (v>>8)&0xFF;
            //let byte0:number = (v)&0xFF;
            //
            //big endian
            var byte0 = (v >> 24) & 0xFF;
            var byte1 = (v >> 16) & 0xFF;
            var byte2 = (v >> 8) & 0xFF;
            var byte3 = (v) & 0xFF;
            //
            //core.net_errlog("_bf_F ",v,byte0,byte1,byte2,byte3);
            var v1 = this.m_SBoxes[0][byte0];
            var v2 = this.m_SBoxes[1][byte1];
            var v3 = this.m_SBoxes[2][byte2];
            var v4 = this.m_SBoxes[3][byte3];
            var tmp = ((v1 + v2) ^ v3) + v4;
            //core.net_errlog("_bf_F1 ",tmp,v1,v2,v3,v4);
            var ret = ((this.m_SBoxes[0][byte0] + this.m_SBoxes[1][byte1]) ^ this.m_SBoxes[2][byte2]) + this.m_SBoxes[3][byte3];
            return ret;
        };
        CBlowFish.prototype.ROUND = function (a, b, idx) {
            a ^= (this._bf_F(b) ^ this.m_PArray[idx]);
            return a;
        };
        CBlowFish.prototype.Blowfish_encipher = function (xl, xr) {
            var TXL = xl;
            var TXR = xr;
            TXL ^= this.m_PArray[0];
            TXR = this.ROUND(TXR, TXL, 1);
            TXL = this.ROUND(TXL, TXR, 2);
            TXR = this.ROUND(TXR, TXL, 3);
            TXL = this.ROUND(TXL, TXR, 4);
            TXR = this.ROUND(TXR, TXL, 5);
            TXL = this.ROUND(TXL, TXR, 6);
            TXR = this.ROUND(TXR, TXL, 7);
            TXL = this.ROUND(TXL, TXR, 8);
            TXR = this.ROUND(TXR, TXL, 9);
            TXL = this.ROUND(TXL, TXR, 10);
            TXR = this.ROUND(TXR, TXL, 11);
            TXL = this.ROUND(TXL, TXR, 12);
            TXR = this.ROUND(TXR, TXL, 13);
            TXL = this.ROUND(TXL, TXR, 14);
            TXR = this.ROUND(TXR, TXL, 15);
            TXL = this.ROUND(TXL, TXR, 16);
            TXR ^= this.m_PArray[17];
            this.m_PArray[this.m_index] ^= TXL;
            this.m_index++;
            if (this.m_index >= 18) {
                this.m_index = 0;
            }
            return [TXR, TXL];
        };
        CBlowFish.prototype.Blowfish_decipher = function (xl, xr) {
            var TXL = xl;
            var TXR = xr;
            var TXR_BACKUP = xr;
            TXL ^= this.m_PArray[17];
            TXR = this.ROUND(TXR, TXL, 16);
            TXL = this.ROUND(TXL, TXR, 15);
            TXR = this.ROUND(TXR, TXL, 14);
            TXL = this.ROUND(TXL, TXR, 13);
            TXR = this.ROUND(TXR, TXL, 12);
            TXL = this.ROUND(TXL, TXR, 11);
            TXR = this.ROUND(TXR, TXL, 10);
            TXL = this.ROUND(TXL, TXR, 9);
            TXR = this.ROUND(TXR, TXL, 8);
            TXL = this.ROUND(TXL, TXR, 7);
            TXR = this.ROUND(TXR, TXL, 6);
            TXL = this.ROUND(TXL, TXR, 5);
            TXR = this.ROUND(TXR, TXL, 4);
            TXL = this.ROUND(TXL, TXR, 3);
            TXR = this.ROUND(TXR, TXL, 2);
            TXL = this.ROUND(TXL, TXR, 1);
            TXR ^= this.m_PArray[0];
            this.m_PArray[this.m_index] ^= TXR_BACKUP;
            this.m_index++;
            if (this.m_index >= 18) {
                this.m_index = 0;
            }
            return [TXR, TXL];
        };
        CBlowFish.prototype.testfunc = function () {
            var testv = 0x2a8a33d7;
            var TXL = 0;
            var TXR = 0;
            TXL ^= testv;
            TXR = this.ROUND(TXR, TXL, 1);
            var byte0 = TXR & 0xff;
            var byte1 = (TXR >> 8) & 0xff;
            var byte2 = (TXR >> 16) & 0xff;
            var byte3 = (TXR >> 24) & 0xff;
            core.net_errlog("byte01234 ", byte0, byte1, byte2, byte3);
        };
        CBlowFish.prototype.InitializeKey = function (buff) {
            var blen = buff.length;
            if (blen <= 0) {
                return;
            }
            var j = 0;
            for (var i = 0; i < 18; ++i) {
                buff.pos = j;
                var byte0 = buff.getUint8();
                buff.pos = (j + 1) % blen;
                var byte1 = buff.getUint8();
                buff.pos = (j + 2) % blen;
                var byte2 = buff.getUint8();
                buff.pos = (j + 3) % blen;
                var byte3 = buff.getUint8();
                //let temp:number = byte0|(byte1<<8)|(byte2<<16)|(byte3<<24);
                var temp = byte3 | (byte2 << 8) | (byte1 << 16) | (byte0 << 24);
                this.m_PArray[i] ^= temp;
                j = (j + 4) % blen;
            }
            this._print_array("InitializeKey1 ");
            var datal = 0;
            var datar = 0;
            for (var i = 0; i < 18; i += 2) {
                var bret = this.Blowfish_encipher(datal, datar);
                datal = bret[0];
                datar = bret[1];
                this.m_PArray[i] = datal;
                this.m_PArray[i + 1] = datar;
            }
            for (var i = 0; i < 4; ++i) {
                for (var j_1 = 0; j_1 < 256; j_1 += 2) {
                    var bret = this.Blowfish_encipher(datal, datar);
                    datal = bret[0];
                    datar = bret[1];
                    this.m_SBoxes[i][j_1] = datal;
                    this.m_SBoxes[i][j_1 + 1] = datar;
                }
            }
            this._print_array("InitializeKey2 ");
        };
        CBlowFish.prototype.Initialize = function (seed) {
            //core.net_errlog("Initialize seed m_index1 ",this.m_index);
            this.m_index ^= seed;
            if (this.m_index < 0) {
                this.m_index += (0xffffffff + 1);
            }
            //core.net_errlog("Initialize seed m_index2 ",this.m_index);
            this.m_index %= 18;
            //core.net_errlog("Initialize seed m_index3 ",this.m_index);
            for (var i = 0; i < 9; i++) {
                var v = 1 << i;
                //core.net_errlog("Initialize seed ",seed,v,seed&v);
                if (seed & v) {
                    var temp = this.m_PArray[i * 2];
                    this.m_PArray[i * 2] = this.m_PArray[i * 2 + 1];
                    this.m_PArray[i * 2 + 1] = temp;
                }
            }
            for (var i = 9; i < 18; i++) {
                var v = 1 << i;
                if (seed & v) {
                    var temp = this.m_PArray[i - 9];
                    this.m_PArray[i - 9] = this.m_PArray[17 - (i - 9)];
                    this.m_PArray[17 - (i - 9)] = temp;
                }
            }
            this._print_array("Initialize seed1 " + this.m_index);
            for (var i = 18; i < 32; i++) {
                var v = 1 << i;
                if (seed & v) {
                    var t = i - 18;
                    var offset = (seed + this.m_index) & 0xFF;
                    var offset2 = ((seed >> 8) + t) & 0xFF;
                    var temp = this.m_SBoxes[t & 3][offset];
                    this.m_SBoxes[t & 3][offset] = this.m_SBoxes[this.m_index & 3][offset2];
                    this.m_SBoxes[this.m_index & 3][offset2] = temp;
                }
            }
            this._print_array("Initialize seed2");
        };
        CBlowFish.prototype.Encode = function (buff) {
            if ((buff.length & 7) != 0) {
                return false;
            }
            if (buff.length < 8) {
                return false;
            }
            var oldpos = buff.pos;
            //todo
            for (var i = 0; i < buff.length; i += 8) {
                var opos = buff.pos;
                buff.pos = i;
                var xl = buff.getUint32();
                var xr = buff.getUint32();
                var bret = this.Blowfish_encipher(xl, xr);
                buff.pos = opos;
                buff.writeUint32(bret[0]);
                buff.writeUint32(bret[1]);
            }
            buff.pos = oldpos;
            return true;
        };
        CBlowFish.prototype.Decode = function (buff) {
            if ((buff.length & 7) != 0) {
                return false;
            }
            if (buff.length < 8) {
                return false;
            }
            var oldpos = buff.pos;
            for (var i = 0; i < buff.length; i += 8) {
                var opos = buff.pos;
                buff.pos = i;
                var xl = buff.getUint32();
                var xr = buff.getUint32();
                var bret = this.Blowfish_decipher(xl, xr);
                buff.pos = opos;
                buff.writeUint32(bret[0]);
                buff.writeUint32(bret[1]);
            }
            buff.pos = oldpos;
            return true;
        };
        return CBlowFish;
    }());
    blowfish.CBlowFish = CBlowFish;
})(blowfish || (blowfish = {}));
//# sourceMappingURL=blowfish.js.map
var core;
(function (core) {
    var avatar_ani_struct = /** @class */ (function () {
        function avatar_ani_struct() {
            this.m_anchorX = 0;
            this.m_anchorY = 0;
            this.m_dx = 0;
            this.m_dy = 0;
            this.m_frameRate = 24;
            this.m_frames = new Array();
        }
        avatar_ani_struct.prototype.set_data = function (o) {
            var ani_data = o["animations"][0];
            this.m_frameRate = ani_data["frameRate"];
            var keyframes = ani_data["nodes"][0]["keyframes"];
            if (keyframes["anchorX"]) {
                this.m_anchorX = keyframes["anchorX"][0]["value"];
            }
            if (keyframes["anchorY"]) {
                this.m_anchorY = keyframes["anchorY"][0]["value"];
            }
            if (keyframes["x"]) {
                this.m_dx = keyframes["x"][0]["value"];
            }
            if (keyframes["y"]) {
                this.m_dy = keyframes["y"][0]["value"];
            }
            this.m_frames.length = 0;
            for (var _i = 0, _a = keyframes["skin"]; _i < _a.length; _i++) {
                var i = _a[_i];
                this.m_frames.push(i["value"]);
            }
        };
        avatar_ani_struct.parse = function (o) {
            if (o != null) {
                var n = new avatar_ani_struct();
                n.set_data(o);
                return n;
            }
            return null;
        };
        return avatar_ani_struct;
    }());
    core.avatar_ani_struct = avatar_ani_struct;
    var avatar_atlas_img_struct = /** @class */ (function () {
        function avatar_atlas_img_struct() {
            this.m_name = "";
            this.m_w = 0;
            this.m_h = 0;
            this.m_source_w = 0;
            this.m_source_h = 0;
        }
        return avatar_atlas_img_struct;
    }());
    core.avatar_atlas_img_struct = avatar_atlas_img_struct;
    var avatar_atlas_struct = /** @class */ (function () {
        function avatar_atlas_struct() {
            this.m_prefix = "";
            this.m_frames = new Array();
        }
        avatar_atlas_struct.prototype.set_data = function (o) {
            this.m_prefix = o["meta"]["prefix"];
            this.m_frames.length = 0;
            for (var _i = 0, _a = Object.keys(o["frames"]); _i < _a.length; _i++) {
                var key = _a[_i];
                if (o["frames"].hasOwnProperty(key)) {
                    var f = o["frames"][key];
                    var n_img = new avatar_atlas_img_struct();
                    n_img.m_name = key;
                    n_img.m_w = f["frame"]["w"];
                    n_img.m_h = f["frame"]["h"];
                    n_img.m_source_w = f["sourceSize"]["w"];
                    n_img.m_source_h = f["sourceSize"]["h"];
                    this.m_frames.push(n_img);
                }
            }
        };
        avatar_atlas_struct.parse = function (o) {
            if (o != null) {
                var n = new avatar_atlas_struct();
                n.set_data(o);
                return n;
            }
            return null;
        };
        return avatar_atlas_struct;
    }());
    core.avatar_atlas_struct = avatar_atlas_struct;
    var material = /** @class */ (function () {
        function material() {
            this.m_ref = 0;
            this.m_mat_res = "";
            this.m_mat_id = 0;
            material.s_mat_id += 1;
            this.m_mat_id = material.s_mat_id;
        }
        material.prototype.dispose = function () {
        };
        material.prototype.update = function (delta) {
        };
        material.prototype.load_res = function () {
        };
        material.prototype.addref = function () {
            this.m_ref++;
        };
        material.prototype.delref = function () {
            this.m_ref--;
        };
        material.s_mat_id = 0;
        return material;
    }());
    core.material = material;
    var material_loader = /** @class */ (function () {
        function material_loader(res, restype) {
            this.m_mat_res = "";
            this.m_mat_res_type = "";
            this.m_loaded = false;
            this.m_loading = false;
            this.m_ref = 0;
            this.m_unload_mat = new Object();
            this.m_ref_tm = 0;
            this.m_res_release = false;
            this.m_extra_res = new Array();
            this.re_init(res, restype);
        }
        material_loader.prototype.re_init = function (res, restype) {
            this.m_mat_res = res;
            this.m_mat_res_type = restype;
            this.m_loaded = false;
            this.m_loading = false;
            this.m_ref = 0;
            this.m_unload_mat = new Object();
            this.m_ref_tm = 0;
            this.m_extra_res = new Array();
        };
        material_loader.prototype.add_unload_mat = function (mat) {
            this.m_unload_mat[mat.m_mat_id] = mat;
        };
        material_loader.prototype.del_unload_mat = function (mat) {
            delete this.m_unload_mat[mat.m_mat_id];
        };
        material_loader.prototype.on_load = function () {
            this.m_loaded = true;
            this.m_loading = false;
            //let idx:number = 0;
            for (var key in this.m_unload_mat) {
                var m = this.m_unload_mat[key];
                m.load_res();
                //idx += 1;
            }
            core.res_tiplog("material loader on_load ", this.m_mat_res);
            this.m_unload_mat = new Object();
        };
        material_loader.prototype.addextrares = function (res, types) {
            this.m_extra_res.push({ url: res, type: types });
        };
        material_loader.prototype.setextrares = function (res, types) {
            this.m_extra_res = new Array();
            this.m_extra_res.push({ url: res, type: types });
        };
        material_loader.prototype.load_res = function (line) {
            if (this.m_loaded) {
                return;
            }
            if (this.m_loading) {
                return;
            }
            this.addextrares(this.m_mat_res, this.m_mat_res_type);
            this.m_loading = true;
            if (this.m_res_release) {
                this.on_load();
                return;
            }
            var comp = laya.utils.Handler.create(this, this.on_load, []);
            core.myload(this.m_extra_res, comp, null, null, line, true);
            core.res_tiplog("material loader load ", this.m_mat_res, this.m_extra_res.length);
        };
        material_loader.prototype.addref = function () {
            this.m_ref++;
        };
        material_loader.prototype.delref = function () {
            this.m_ref--;
            if (this.m_ref <= 0) {
                this.update_ref_tm();
            }
        };
        material_loader.prototype.update_ref_tm = function () {
            this.m_ref_tm = Laya.Browser.now();
        };
        material_loader.prototype.check_release = function () {
            if (!this.m_loaded) {
                return false;
            }
            if (this.m_ref <= 0) {
                var cur_tm = Laya.Browser.now();
                if (cur_tm > (this.m_ref_tm + 10 * 1000)) {
                    this.m_loaded = false;
                    this.m_loading = false;
                    Laya.Loader.clearTextureRes(this.m_mat_res);
                    core.res_tiplog("material loader check_release ", this.m_mat_res);
                    this.m_res_release = true;
                    return true;
                }
            }
            return false;
        };
        material_loader.prototype.dispose = function () {
            this.m_unload_mat = new Object();
        };
        return material_loader;
    }());
    core.material_loader = material_loader;
})(core || (core = {}));
//# sourceMappingURL=material.js.map
var core;
(function (core) {
    var materialinfomgr = /** @class */ (function () {
        function materialinfomgr() {
            this.m_map_grid_w = 128;
            this.m_map_grid_h = 128;
            this.m_map_info_dict = new Object();
            this.m_ani_info_dict = new Object();
            this.m_eff_info_dict = new Object();
            this.m_avatar_action_mat_dict = new Object();
            this.m_avatar_config = null;
            this.m_map_config = null;
            this.m_ani_config = null;
            this.m_eff_config = null;
        }
        materialinfomgr.prototype.set_avatar_config = function (conf) {
            this.m_avatar_config = conf;
        };
        materialinfomgr.prototype.set_map_config = function (conf) {
            this.m_map_config = conf;
        };
        materialinfomgr.prototype.set_ani_config = function (conf) {
            this.m_ani_config = conf;
        };
        materialinfomgr.prototype.set_eff_config = function (conf) {
            this.m_eff_config = conf;
        };
        materialinfomgr.prototype._get_avatar_info = function (avatarid, actionid) {
            var key = this.genavatarmatkey(avatarid, actionid);
            if (this.m_avatar_action_mat_dict.hasOwnProperty(key.toString()) == false) {
                var avainfo = this.m_avatar_config(avatarid);
                if (avainfo != null) {
                    var actioninfo = avainfo.info_data;
                    for (var _i = 0, actioninfo_1 = actioninfo; _i < actioninfo_1.length; _i++) {
                        var i = actioninfo_1[_i];
                        if (i.aid == actionid) {
                            this.m_avatar_action_mat_dict[key] = i;
                            break;
                        }
                    }
                }
            }
            return this.m_avatar_action_mat_dict[key];
        };
        materialinfomgr.prototype._get_map_info = function (mapid) {
            if (this.m_map_info_dict.hasOwnProperty(mapid.toString()) == false) {
                this.m_map_info_dict[mapid] = this.m_map_config(mapid);
            }
            return this.m_map_info_dict[mapid];
        };
        materialinfomgr.prototype._get_eff_info = function (aniid) {
            if (this.m_eff_info_dict.hasOwnProperty(aniid.toString()) == false) {
                this.m_eff_info_dict[aniid] = this.m_eff_config(aniid);
            }
            return this.m_eff_info_dict[aniid];
        };
        materialinfomgr.prototype._get_ani_info = function (aniid) {
            if (this.m_ani_info_dict.hasOwnProperty(aniid.toString()) == false) {
                this.m_ani_info_dict[aniid] = this.m_ani_config(aniid);
            }
            return this.m_ani_info_dict[aniid];
        };
        materialinfomgr.prototype.dispose = function () {
        };
        materialinfomgr.prototype.getmapw = function (mapid) {
            var info = this._get_map_info(mapid);
            var ret = 0;
            //core.core_tiplog("materialmgr getmapw ",info)
            if (info != undefined && info != null) {
                ret = info.w;
            }
            return ret;
        };
        materialinfomgr.prototype.getmaph = function (mapid) {
            var info = this._get_map_info(mapid);
            var ret = 0;
            if (info != undefined && info != null) {
                ret = info.h;
            }
            return ret;
        };
        materialinfomgr.prototype.genmappath = function (mapid) {
            return "map/city/" + mapid.toString() + "/";
        };
        materialinfomgr.prototype.geteffw = function (aniid) {
            var ret = 16;
            var obj = this._get_eff_info(aniid);
            if (obj != undefined) {
                ret = obj.w;
            }
            return ret;
        };
        materialinfomgr.prototype.geteffh = function (aniid) {
            var ret = 16;
            var obj = this._get_eff_info(aniid);
            if (obj != undefined) {
                ret = obj.h;
            }
            return ret;
        };
        materialinfomgr.prototype.geteffframecount = function (aniid) {
            var ret = 30;
            var obj = this._get_eff_info(aniid);
            if (obj != undefined) {
                ret = obj.total;
            }
            return ret;
        };
        materialinfomgr.prototype.geteffframespeed = function (aniid) {
            var ret = 30;
            var obj = this._get_eff_info(aniid);
            if (obj != undefined) {
                ret = obj.speed;
            }
            return ret;
        };
        materialinfomgr.prototype.geteffname = function (aniid) {
            var ret = "";
            var obj = this._get_eff_info(aniid);
            if (obj != undefined) {
                ret = obj.name;
            }
            return ret;
        };
        materialinfomgr.prototype.geteffcycle = function (aniid) {
            var ret = true;
            var obj = this._get_eff_info(aniid);
            if (obj != undefined) {
                if (obj.cycle == 0) {
                    ret = false;
                }
            }
            return ret;
        };
        ///////
        materialinfomgr.prototype.getaniw = function (aniid) {
            var ret = 16;
            var obj = this._get_ani_info(aniid);
            if (obj != undefined) {
                ret = obj.w;
            }
            return ret;
        };
        materialinfomgr.prototype.getanih = function (aniid) {
            var ret = 16;
            var obj = this._get_ani_info(aniid);
            if (obj != undefined) {
                ret = obj.h;
            }
            return ret;
        };
        materialinfomgr.prototype.getaniframecount = function (aniid) {
            var ret = 30;
            var obj = this._get_ani_info(aniid);
            if (obj != undefined) {
                ret = obj.total;
            }
            return ret;
        };
        materialinfomgr.prototype.getaniframespeed = function (aniid) {
            var ret = 30;
            var obj = this._get_ani_info(aniid);
            if (obj != undefined) {
                ret = obj.speed;
            }
            return ret;
        };
        materialinfomgr.prototype.getanitexprefix = function (aniid) {
            var ret = "";
            var obj = this._get_ani_info(aniid);
            if (obj != undefined) {
                ret = obj.prefix;
            }
            return ret;
        };
        materialinfomgr.prototype.genavatarmatkey = function (shape, action) {
            return shape * 100 + action;
        };
        materialinfomgr.prototype.getavataractionw = function (shape, action) {
            var ret = 16;
            var key = this.genavatarmatkey(shape, action);
            var obj = this._get_avatar_info(shape, action);
            if (obj != undefined) {
                ret = obj.w;
            }
            return ret;
        };
        materialinfomgr.prototype.getavataractionh = function (shape, action) {
            var ret = 16;
            var key = this.genavatarmatkey(shape, action);
            var obj = this._get_avatar_info(shape, action);
            ;
            if (obj != undefined) {
                ret = obj.h;
            }
            return ret;
        };
        materialinfomgr.prototype.getavataractionframecount = function (shape, action) {
            var ret = 30;
            var key = this.genavatarmatkey(shape, action);
            var obj = this._get_avatar_info(shape, action);
            if (obj != undefined) {
                ret = obj.total;
            }
            return ret;
        };
        materialinfomgr.prototype.getavataractionframespeed = function (shape, action) {
            var ret = 30;
            var key = this.genavatarmatkey(shape, action);
            var obj = this._get_avatar_info(shape, action);
            if (obj != undefined) {
                ret = obj.speed;
            }
            return ret;
        };
        materialinfomgr.prototype.getavataractiontexprefix = function (shape, action) {
            var ret = "";
            var obj = this._get_avatar_info(shape, action);
            if (obj != undefined) {
                ret = obj.prefix;
            }
            return ret;
        };
        materialinfomgr.prototype._gen_avatarlink_key = function (shape, action) {
            var key = shape * 10000 + action;
            return key.toString();
        };
        materialinfomgr.prototype._gen_avatarlink_filename = function (shape, action) {
            //let key:string = "avatarlink\\"+shape.toString()+"\\"+action.toString()+".lk";
            //return key;
            var ret = "";
            var obj = this._get_avatar_info(shape, action);
            if (obj != undefined) {
                ret = obj.link;
            }
            if (ret == null) {
                ret = "";
            }
            return ret;
        };
        materialinfomgr.prototype.get_backride_shape = function (ride) {
            //todo
            return 0;
        };
        return materialinfomgr;
    }());
    core.materialinfomgr = materialinfomgr;
    var g_ins = null;
    function matinfo_mgr() {
        if (g_ins == null) {
            g_ins = new materialinfomgr();
        }
        return g_ins;
    }
    core.matinfo_mgr = matinfo_mgr;
})(core || (core = {}));
//# sourceMappingURL=materialinfo.js.map
var core;
(function (core) {
    var HASH_OFFSET = 0;
    var HASH_A = 1;
    var HASH_B = 2;
    var b_init_table = false;
    var g_crypt_table = new Array();
    function init_crypt_table() {
        if (b_init_table) {
            return;
        }
        b_init_table = true;
        for (var i = 0; i < 0x500; ++i) {
            g_crypt_table.push(0);
        }
        var seed = 0x00100001;
        var index2 = 0;
        for (var index1 = 0; index1 < 0x100; index1++) {
            index2 = index1;
            for (var i = 0; i < 5; ++i) {
                seed = (seed * 125 + 3) % 0x2AAAAB;
                var temp1 = (seed & 0xffff) << 0x10;
                seed = (seed * 125 + 3) % 0x2AAAAB;
                var temp2 = (seed & 0xffff);
                g_crypt_table[index2] = (temp1 | temp2);
                index2 += 0x100;
            }
        }
    }
    function my_hash(hash_str, hash_type) {
        init_crypt_table();
        var seed1 = 0x7FED7FED;
        var seed2 = 0xEEEEEEEE;
        hash_str = hash_str.toUpperCase();
        var char_c;
        for (var i = 0; i < hash_str.length; ++i) {
            char_c = hash_str.charCodeAt(i);
            var idx = (hash_type << 8) + char_c;
            seed1 = g_crypt_table[idx] ^ (seed1 + seed2);
            seed1 = seed1 & 0xffffffff;
            seed2 = char_c + seed1 + seed2 + (seed2 << 5) + 3;
            seed2 = seed2 & 0xffffffff;
        }
        if (seed1 < 0) {
            seed1 = seed1 + 0xffffffff + 0x1;
        }
        return seed1;
    }
    function get_file_key(file_name) {
        return my_hash(file_name, HASH_OFFSET);
    }
    core.get_file_key = get_file_key;
})(core || (core = {}));
//# sourceMappingURL=myhash.js.map
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
var myrandom;
(function (myrandom) {
    var CRandBase = /** @class */ (function () {
        function CRandBase() {
            this.m_nSeed = 0xf3cc945a;
        }
        CRandBase.prototype.GetSeed = function () {
            return this.m_nSeed;
        };
        CRandBase.prototype.SetSeed = function (seed) {
            this.m_nSeed = seed;
        };
        CRandBase.prototype.Random_01 = function () {
            return 0;
        };
        CRandBase.prototype.RandomInt = function () {
            return 0;
        };
        CRandBase.prototype.Random = function (Max, Min) {
            if (Min === void 0) { Min = 0; }
            var ret = this.Random_01();
            var ret2 = Max - Min + 1;
            ret2 *= ret;
            return Min + ret2;
        };
        return CRandBase;
    }());
    myrandom.CRandBase = CRandBase;
    var CLcg1_Rand = /** @class */ (function (_super) {
        __extends(CLcg1_Rand, _super);
        function CLcg1_Rand() {
            return _super.call(this) || this;
        }
        CLcg1_Rand.prototype.Random_01 = function () {
            var k = this.m_nSeed / 127773;
            this.m_nSeed = 16807 * (this.m_nSeed - (k * 127773)) - k * 2836;
            if (this.m_nSeed <= 0) {
                this.m_nSeed += 2147483647;
            }
            var ret = this.m_nSeed * 4.656612875E-10;
            return ret;
        };
        CLcg1_Rand.prototype.RandomInt = function () {
            var k = this.m_nSeed / 127773;
            this.m_nSeed = 16807 * (this.m_nSeed - (k * 127773)) - k * 2836;
            if (this.m_nSeed <= 0) {
                this.m_nSeed += 2147483647;
            }
            return this.m_nSeed & 0xffff;
        };
        return CLcg1_Rand;
    }(CRandBase));
    myrandom.CLcg1_Rand = CLcg1_Rand;
    var CLcg2_Rand = /** @class */ (function (_super) {
        __extends(CLcg2_Rand, _super);
        function CLcg2_Rand() {
            return _super.call(this) || this;
        }
        CLcg2_Rand.prototype.Random_01 = function () {
            var nFirst = this.m_nSeed;
            nFirst = (nFirst >> 16) & 0x7fff;
            this.m_nSeed = this.m_nSeed * 214013 + 2531011;
            var nSecond = this.m_nSeed;
            nSecond = (nSecond >> 16) & 0x7fff;
            this.m_nSeed = this.m_nSeed * 214013 + 2531011;
            var f = (nFirst << 15) | nSecond;
            return (f / 0x40000000);
        };
        CLcg2_Rand.prototype.RandomInt = function () {
            this.m_nSeed = this.m_nSeed * 214013 + 2531011;
            this.m_nSeed &= 0xffffffff;
            if (this.m_nSeed < 0) {
                this.m_nSeed += 0xffffffff + 1;
            }
            //core.net_errlog("RandomInt ",this.m_nSeed,this.m_nSeed>>15,(this.m_nSeed>>15)&0xffff,this.m_nSeed/32768,(this.m_nSeed/32768)&0xffff);
            return (this.m_nSeed >> 15) & 0xffff;
        };
        return CLcg2_Rand;
    }(CRandBase));
    myrandom.CLcg2_Rand = CLcg2_Rand;
})(myrandom || (myrandom = {}));
var myencode;
(function (myencode) {
    var MyEncode = /** @class */ (function () {
        function MyEncode() {
            this.m_rand = new myrandom.CLcg2_Rand();
            this.m_remain = 0;
            this.m_flag = 0;
            this.m_rand.SetSeed(0xf3cc945a);
        }
        MyEncode.prototype.Encode = function (buff) {
            if (buff.length < 1) {
                return false;
            }
            var i = 0;
            var temp = 0;
            if (this.m_remain > 0xffff) {
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^ (this.m_remain & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i;
                buff.writeUint8(temp);
                this.m_flag = temp;
                this.m_remain = 0;
                i++;
            }
            if (buff.length < (i + 2)) {
                return false;
            }
            var r = 0;
            for (; i < buff.length - 1; i += 2) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = i;
                buff.writeUint8(temp);
                buff.pos = i + 1;
                temp = buff.getUint8();
                temp = temp ^ ((r >> 8) & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i + 1;
                buff.writeUint8(temp);
                this.m_flag = temp;
            }
            if (i < buff.length) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = buff.length - 1;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = buff.length - 1;
                buff.writeUint8(temp);
                this.m_remain = (r >> 8) + 0x10000;
            }
            return true;
        };
        MyEncode.prototype.Decode = function (buff) {
            if (buff.length < 1) {
                return false;
            }
            var i = 0;
            var temp = 0;
            if (this.m_remain > 0xffff) {
                this.m_remain = (this.m_remain & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i;
                temp = buff.getUint8();
                this.m_flag = temp;
                temp = (temp ^ this.m_remain) & 0xff;
                buff.pos = 0;
                buff.writeUint8(temp);
                this.m_remain = 0;
                i++;
            }
            if (buff.length < (i + 2)) {
                return false;
            }
            var r = 0;
            for (; i < buff.length - 1; i += 2) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = i;
                buff.writeUint8(temp);
                r = ((r >> 8) & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i + 1;
                this.m_flag = buff.getUint8();
                temp = (this.m_flag ^ (r & 0xff)) & 0xff;
                buff.pos = i + 1;
                buff.writeUint8(temp);
            }
            if (i < buff.length) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = buff.length - 1;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = buff.length - 1;
                buff.writeUint8(temp);
                this.m_remain = (r >> 8) + 0x10000;
            }
            return true;
        };
        return MyEncode;
    }());
    myencode.MyEncode = MyEncode;
})(myencode || (myencode = {}));
//# sourceMappingURL=myrandom.js.map
var core;
(function (core) {
    var log_level_enum;
    (function (log_level_enum) {
        log_level_enum[log_level_enum["LOG_ERROR"] = 0] = "LOG_ERROR";
        log_level_enum[log_level_enum["LOG_WARNNING"] = 1] = "LOG_WARNNING";
        log_level_enum[log_level_enum["LOG_TIPS"] = 2] = "LOG_TIPS";
        log_level_enum[log_level_enum["LOG_MAX"] = 3] = "LOG_MAX";
    })(log_level_enum = core.log_level_enum || (core.log_level_enum = {}));
    var log_level = log_level_enum.LOG_MAX;
    var log_module_enum;
    (function (log_module_enum) {
        log_module_enum[log_module_enum["MODULE_CORE"] = 0] = "MODULE_CORE";
        log_module_enum[log_module_enum["MODULE_RES"] = 1] = "MODULE_RES";
        log_module_enum[log_module_enum["MODULE_COMBAT"] = 2] = "MODULE_COMBAT";
        log_module_enum[log_module_enum["MODULE_NET"] = 3] = "MODULE_NET";
        log_module_enum[log_module_enum["MODULE_UI"] = 4] = "MODULE_UI";
        log_module_enum[log_module_enum["MODULE_GAME"] = 5] = "MODULE_GAME";
        log_module_enum[log_module_enum["MODULE_OTHER"] = 6] = "MODULE_OTHER";
        log_module_enum[log_module_enum["MODULE_LOADING"] = 7] = "MODULE_LOADING";
        log_module_enum[log_module_enum["MODULE_ALL"] = 8] = "MODULE_ALL";
    })(log_module_enum = core.log_module_enum || (core.log_module_enum = {}));
    var log_module = log_module_enum.MODULE_ALL;
    function set_log_level(v) {
        log_level = v;
    }
    core.set_log_level = set_log_level;
    function set_log_module(v) {
        log_module = v;
    }
    core.set_log_module = set_log_module;
    function fast_log(module) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("module:" + module + " " + args);
    }
    function log(level, module) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (level > log_level) {
            return;
        }
        if (log_module != log_module_enum.MODULE_ALL && module != log_module) {
            return;
        }
        fast_log(module, args);
    }
    core.log = log;
    function res_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_RES, args);
    }
    core.res_errlog = res_errlog;
    function res_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_RES, args);
    }
    core.res_warnlog = res_warnlog;
    function res_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_RES, args);
    }
    core.res_tiplog = res_tiplog;
    function core_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_CORE, args);
    }
    core.core_errlog = core_errlog;
    function core_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_CORE, args);
    }
    core.core_warnlog = core_warnlog;
    function core_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_CORE, args);
    }
    core.core_tiplog = core_tiplog;
    function net_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_NET, args);
    }
    core.net_errlog = net_errlog;
    function net_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_NET, args);
    }
    core.net_warnlog = net_warnlog;
    function net_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_NET, args);
    }
    core.net_tiplog = net_tiplog;
    function combat_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_COMBAT, args);
    }
    core.combat_errlog = combat_errlog;
    function combat_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_COMBAT, args);
    }
    core.combat_warnlog = combat_warnlog;
    function combat_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_COMBAT, args);
    }
    core.combat_tiplog = combat_tiplog;
    function ui_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_UI, args);
    }
    core.ui_errlog = ui_errlog;
    function ui_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_UI, args);
    }
    core.ui_warnlog = ui_warnlog;
    function ui_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_UI, args);
    }
    core.ui_tiplog = ui_tiplog;
    function game_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_GAME, args);
    }
    core.game_errlog = game_errlog;
    function game_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_GAME, args);
    }
    core.game_warnlog = game_warnlog;
    function game_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_GAME, args);
    }
    core.game_tiplog = game_tiplog;
    function game_log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_GAME, args);
    }
    core.game_log = game_log;
    function loading_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_LOADING, args);
    }
    core.loading_tiplog = loading_tiplog;
    core.g_b_open_loadinglog = false;
    function open_loading_log(flag) {
        core.g_b_open_loadinglog = flag;
    }
    core.open_loading_log = open_loading_log;
    function myload_complete(comp, url) {
        if (core.g_b_open_loadinglog) {
            if (url instanceof Array) {
                loading_tiplog("gameload complete time ", Laya.Browser.now());
                for (var _i = 0, url_1 = url; _i < url_1.length; _i++) {
                    var i = url_1[_i];
                    loading_tiplog("gameload complete ", i.type, i.url);
                }
            }
            else {
                loading_tiplog("gameload complete ", Laya.Browser.now(), url);
            }
        }
        comp.run();
    }
    function myload(url, complete, progress, type, priority, cache, group, ignoreCache) {
        if (core.g_b_open_loadinglog) {
            if (url instanceof Array) {
                loading_tiplog("gameload start time ", Laya.Browser.now());
                for (var _i = 0, url_2 = url; _i < url_2.length; _i++) {
                    var i = url_2[_i];
                    loading_tiplog("gameload start ", i.type, i.url);
                }
            }
            else {
                loading_tiplog("gameload start ", Laya.Browser.now(), url);
            }
        }
        var comp = Laya.Handler.create(null, myload_complete, [complete, url]);
        return Laya.loader.load(url, comp, progress, type, priority, cache, group, ignoreCache);
    }
    core.myload = myload;
})(core || (core = {}));
//# sourceMappingURL=output_log.js.map
var processencode;
(function (processencode) {
    var PUBLIC_KEY = [
        0xb62d3baa, 0x39232eda, 0x6e0e759c, 0x2bbe586d, 0xabf49478, 0xe56c78fd, 0xb98c38ca, 0x3d800586,
        0xdc4bc118, 0xa3bd8c46, 0xed966bb7, 0x20de2a53, 0x41bd7414, 0x026bb617, 0x6bd49d9e, 0x2d4c292b,
        0x370cc4c5, 0x9762472f, 0xe549ee5d, 0xfe4ffaef, 0x7f216d36, 0xd4d494b2, 0xc68edd39, 0xad5baf7e,
        0xc58a317d, 0x0a067333, 0x4db576dd, 0xa302af72, 0x78491a14, 0x0250a60b, 0x734e4212, 0xb97c7022,
        0x66aadd92, 0x8c027ebb, 0x64964564, 0x11572cd6, 0xcd1c2bab, 0xc6435a5a, 0x264eb56a, 0xdf357932,
        0xbdfc2f29, 0x4254eb7f, 0x71b25c4e, 0x1d1b2b2b, 0xa14b6d6d, 0xe1a16edd, 0x9e74f932, 0x6fbd5c18,
        0xd2a6ac2e, 0x3318c0f8, 0xf44fdd6e, 0x744b40ae, 0xf57b4535, 0xde12f0ba, 0xa85c1420, 0xda6cc6bf,
        0x75a2a2be, 0x0e6b6b2b, 0x89a2457f, 0xb3d2a551, 0xf23b3b79, 0x41ff0690, 0xed522426, 0xcb994f92,
    ];
    var SBOX_LENGTH = 256;
    var PUBLIC_SBOX = new Array(SBOX_LENGTH);
    function print_array(pre, arr) {
        var output = pre + " start";
        core.net_errlog(output);
        output = "";
        var count = 16;
        var idx = 0;
        for (var i = 0; i < arr.length; ++i) {
            var c = arr[i];
            if (c < 0) {
                //c += 0xffffffff + 1;
            }
            output = output + " " + c.toString(16);
            if (idx >= 15) {
                core.net_errlog(output);
                idx = 0;
                output = "";
            }
            else {
                idx += 1;
            }
        }
        if (idx != 0) {
            core.net_errlog(output);
            idx = 0;
            output = "";
        }
        output = pre + " end";
        core.net_errlog(output);
    }
    function RC4_Init(code) {
        var codelen = code.length;
        for (var i = 0; i < SBOX_LENGTH; ++i) {
            PUBLIC_SBOX[i] = i;
        }
        var j = 0;
        var temp = 0;
        for (var i = 0; i < SBOX_LENGTH; ++i) {
            j = (j + code[i % codelen] + PUBLIC_SBOX[i]) % SBOX_LENGTH;
            temp = PUBLIC_SBOX[i];
            PUBLIC_SBOX[i] = PUBLIC_SBOX[j];
            PUBLIC_SBOX[j] = temp;
        }
        //print_array("rc4_init3",PUBLIC_SBOX);
    }
    var g_bRC4_Inited = false;
    function RC4_InitCode() {
        if (g_bRC4_Inited) {
            return;
        }
        g_bRC4_Inited = true;
        var code_size = PUBLIC_KEY.length * 4;
        var code = new Array(code_size);
        for (var i = 0; i < (code_size / 4); ++i) {
            var temp_1 = ((PUBLIC_KEY[i] % 0x758b) << 16) | (PUBLIC_KEY[i] % 0x7159);
            //todo big endian
            var byte3 = (temp_1 >> 24) & 0xFF;
            var byte2 = (temp_1 >> 16) & 0xFF;
            var byte1 = (temp_1 >> 8) & 0xFF;
            var byte0 = (temp_1) & 0xFF;
            //todo litter endian
            //let byte0:number = (temp >> 24)&0xFF;
            //let byte1:number = (temp >> 16)&0xFF;
            //let byte2:number = (temp >> 8)&0xFF;
            //let byte3:number = (temp)&0xFF;
            //core.net_errlog("0 1 2 3 ",byte0,byte1,byte2,byte3);
            code[i * 4] = byte0;
            code[i * 4 + 1] = byte1;
            code[i * 4 + 2] = byte2;
            code[i * 4 + 3] = byte3;
        }
        //print_array("rc4_init1",code);
        var j = 0;
        var temp = 0;
        for (var i = 0; i < code_size; ++i) {
            j = (j + code[i]) % code_size;
            temp = code[i];
            code[i] = code[j];
            code[j] = temp;
        }
        //print_array("rc4_init2",code);
        RC4_Init(code);
    }
    processencode.RC4_InitCode = RC4_InitCode;
    var CProcessEncode = /** @class */ (function () {
        function CProcessEncode() {
            this.m_SBox = new Array(SBOX_LENGTH);
            this.m_x = 0;
            this.m_y = 0;
            this.m_seed = 0;
            for (var i = 0; i < SBOX_LENGTH; ++i) {
                this.m_SBox[i] = PUBLIC_SBOX[i];
            }
        }
        CProcessEncode.prototype.Create = function (seed) {
            this.m_seed = seed;
            this.m_x = (this.m_seed & 0xfff) ^ 0xE21;
            this.m_y = ((this.m_seed >> 12) & 0xfff) ^ 0x35A;
        };
        CProcessEncode.prototype.Encode = function (buff) {
            var temp = 0;
            var v = 0;
            var tab = this.m_SBox;
            var x = this.m_x;
            var y = this.m_y;
            //core.net_errlog("pe x y ",x,y);
            for (var i = 0; i < buff.length; ++i) {
                x = (x + 7) % SBOX_LENGTH;
                y = (tab[x] + y) % SBOX_LENGTH;
                temp = tab[x];
                tab[x] = tab[y];
                tab[y] = temp;
                temp = (tab[x] + tab[y]) % SBOX_LENGTH;
                buff.pos = i;
                v = buff.getUint8();
                buff.pos = i;
                //core.net_errlog("temp v d ",x,y,tab[x],tab[y],temp,v,v^tab[temp]);
                buff.writeUint8(v ^ tab[temp]);
            }
            this.m_x = x;
            this.m_y = y;
        };
        CProcessEncode.prototype.Encode2 = function (buff) {
            var temp = 0;
            var v = 0;
            var tab = this.m_SBox;
            var x = this.m_x;
            var y = this.m_y;
            for (var i = 0; i < buff.length; ++i) {
                y = (y + 5 + x) % SBOX_LENGTH;
                x = tab[y] % SBOX_LENGTH;
                tab[x] ^= tab[y];
                tab[y] ^= tab[x];
                tab[x] ^= tab[y];
                temp = (tab[x] + tab[y] + 9) % SBOX_LENGTH;
                buff.pos = i;
                v = buff.getUint8();
                buff.pos = i;
                buff.writeUint8(v ^ tab[temp]);
            }
            this.m_x = x;
            this.m_y = y;
        };
        return CProcessEncode;
    }());
    processencode.CProcessEncode = CProcessEncode;
})(processencode || (processencode = {}));
//# sourceMappingURL=processencode.js.map
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
var core;
(function (core) {
    var rendercommand = /** @class */ (function () {
        function rendercommand(obj) {
            this.re_init(obj);
        }
        rendercommand.prototype.re_init = function (obj) {
            this.m_obj = obj;
            if (this.m_obj != null) {
                this.update_z();
            }
        };
        rendercommand.prototype.update_z = function () {
            this.m_screen_z = this.m_obj.y;
        };
        rendercommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        rendercommand.prototype.render = function (context) {
            var view = context.m_view.m_unitView;
            view.addChild(this.m_obj);
        };
        rendercommand.prototype.is_contain = function (x, y) {
            return false;
        };
        return rendercommand;
    }());
    core.rendercommand = rendercommand;
})(core || (core = {}));
//# sourceMappingURL=rendercommand.js.map
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
var core;
(function (core) {
    var renderobject = /** @class */ (function (_super) {
        __extends(renderobject, _super);
        function renderobject() {
            var _this = _super.call(this) || this;
            _this.m_box = new laya.maths.Rectangle();
            _this.m_rc = null;
            _this.set_id();
            return _this;
        }
        renderobject.prototype.set_id = function () {
            this.m_obj_id = this.get_obj_id();
        };
        renderobject.prototype.set_pos = function (x, y) {
            this.x = x;
            this.y = y;
            this.m_box.setTo(this.x - this.m_box.width / 2, this.y - this.m_box.height / 2, this.m_box.width, this.m_box.height);
            this.m_rc.update_z();
        };
        Object.defineProperty(renderobject.prototype, "set_x", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
                this.m_box.setTo(this.x - this.m_box.width / 2, this.y - this.m_box.height / 2, this.m_box.width, this.m_box.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(renderobject.prototype, "set_y", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
                this.m_box.setTo(this.x - this.m_box.width / 2, this.y - this.m_box.height / 2, this.m_box.width, this.m_box.height);
                this.m_rc.update_z();
            },
            enumerable: true,
            configurable: true
        });
        renderobject.prototype.set_scale = function (sx, sy) {
        };
        renderobject.prototype.get_obj_id = function () {
            return renderobject.S_RO_IDMAX++;
        };
        renderobject.prototype.dispose = function () {
            this.removeSelf();
        };
        renderobject.prototype.update = function (delta) {
        };
        renderobject.prototype.is_contain = function (x, y) {
            return this.m_box.contains(x, y);
        };
        renderobject.prototype.project = function (context) {
            if (context.m_camera.is_project(this.m_box)) {
                context.m_render.addrc(this.m_rc);
                return true;
            }
            ;
            return false;
        };
        renderobject.S_RO_IDMAX = 1;
        return renderobject;
    }(laya.display.Sprite));
    core.renderobject = renderobject;
})(core || (core = {}));
//# sourceMappingURL=renderobject.js.map
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
var core;
(function (core) {
    var anicommand = /** @class */ (function (_super) {
        __extends(anicommand, _super);
        function anicommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        anicommand.prototype.update_z = function () {
            if (this.m_obj.m_data == true) {
                this.m_screen_z = -500000000 + this.m_obj.y; //;
            }
            else {
                this.m_screen_z = -100000000 + this.m_obj.y;
            }
        };
        anicommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        anicommand.prototype.render = function (context) {
            if (this.m_obj.m_data == true) {
                //core.core_tiplog("anicommand render true");
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
            else {
                //core.core_tiplog("anicommand render false");
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
        };
        return anicommand;
    }(core.rendercommand));
    core.anicommand = anicommand;
})(core || (core = {}));
//# sourceMappingURL=anicommand.js.map
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
var core;
(function (core) {
    var avatarcommand = /** @class */ (function (_super) {
        __extends(avatarcommand, _super);
        function avatarcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        avatarcommand.prototype.update_z = function () {
            this.m_screen_z = -400000000 + this.m_obj.y; //;
        };
        avatarcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        avatarcommand.prototype.render = function (context) {
            context.m_view.m_unitView.addChild(this.m_obj);
        };
        avatarcommand.prototype.is_contain = function (x, y) {
            return this.m_obj.is_contain(x, y);
        };
        return avatarcommand;
    }(core.rendercommand));
    core.avatarcommand = avatarcommand;
    var avatarcommand_new = /** @class */ (function (_super) {
        __extends(avatarcommand_new, _super);
        function avatarcommand_new(obj) {
            if (obj === void 0) { obj = null; }
            var _this = _super.call(this, obj) || this;
            _this.m_a = obj;
            return _this;
        }
        avatarcommand_new.prototype.re_init = function (obj) {
            _super.prototype.re_init.call(this, obj);
            this.m_a = obj;
        };
        avatarcommand_new.prototype.update_z = function () {
            this.m_screen_z = -400000000 + this.m_obj.y; //;
        };
        avatarcommand_new.prototype.dispose = function () {
            this.m_obj = null;
        };
        avatarcommand_new.prototype.render = function (context) {
            context.m_view.m_unitView.addChild(this.m_obj);
            if (this.m_obj.alpha > 0) {
                var x = this.m_obj.x + this.m_a.m_dx;
                var y = this.m_obj.y + this.m_a.m_dy;
                //this.m_a.m_sp_back.x = x;
                //this.m_a.m_sp_back.y = y;
                if (this.m_a.m_aura_adorn != null) {
                    this.m_a.m_aura_adorn.draw2sp(context.m_view.m_unitground_View, x, y, false);
                }
                //context.m_view.m_unitground_View.addChild(this.m_a.m_sp_back);
                if (this.m_a.m_title_adorn != null) {
                    this.m_a.m_title_adorn.draw2sp(context.m_view.m_unitfront_View, x, y);
                }
                if (this.m_a.m_shadow_sp != null) {
                    context.m_view.m_unitshadow_View.graphics.drawTexture(this.m_a.m_shadow_sp, x - 50, y - 35);
                }
                if (this.m_a.m_name.length > 0) {
                    context.m_view.m_unitname_View.graphics.fillBorderText(this.m_a.m_name, x + this.m_a.m_name_dx, y + 25 + this.m_a.m_name_dy, "22px h5font", "#65ff65", "#19591c", 2, "center");
                }
            }
        };
        avatarcommand_new.prototype.is_contain = function (x, y) {
            if (this.m_obj == null) {
                return false;
            }
            return this.m_obj.is_contain(x, y);
        };
        return avatarcommand_new;
    }(core.rendercommand));
    core.avatarcommand_new = avatarcommand_new;
})(core || (core = {}));
//# sourceMappingURL=avatarcommand.js.map
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
var core;
(function (core) {
    var effcommand = /** @class */ (function (_super) {
        __extends(effcommand, _super);
        function effcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        effcommand.prototype.update_z = function () {
            if (this.m_obj.m_data == true) {
                this.m_screen_z = -500000000 + this.m_obj.y; //;
            }
            else {
                this.m_screen_z = -100000000 + this.m_obj.y;
            }
        };
        effcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        effcommand.prototype.render = function (context) {
            if (this.m_obj.m_data == true) {
                //core.core_tiplog("anicommand render true");
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
            else {
                //core.core_tiplog("anicommand render false");
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
        };
        return effcommand;
    }(core.rendercommand));
    core.effcommand = effcommand;
})(core || (core = {}));
//# sourceMappingURL=effcommand.js.map
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
var core;
(function (core) {
    var mapbkcommand = /** @class */ (function (_super) {
        __extends(mapbkcommand, _super);
        function mapbkcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapbkcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000; //must be the bottom;
        };
        mapbkcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapbkcommand.prototype.render = function (context) {
            var view = context.m_view.m_mapView;
            view.addChild(this.m_obj);
        };
        return mapbkcommand;
    }(core.rendercommand));
    core.mapbkcommand = mapbkcommand;
})(core || (core = {}));
//# sourceMappingURL=mapbkcommand.js.map
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
var core;
(function (core) {
    var mapblockcommand = /** @class */ (function (_super) {
        __extends(mapblockcommand, _super);
        function mapblockcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapblockcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000; //must be the bottom;
        };
        mapblockcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapblockcommand.prototype.render = function (context) {
            var view = context.m_view.m_ani_underunit_View;
            view.addChild(this.m_obj);
        };
        return mapblockcommand;
    }(core.rendercommand));
    core.mapblockcommand = mapblockcommand;
})(core || (core = {}));
//# sourceMappingURL=mapblockcommand.js.map
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
var core;
(function (core) {
    var mapscrollbkcommand = /** @class */ (function (_super) {
        __extends(mapscrollbkcommand, _super);
        function mapscrollbkcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapscrollbkcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000 + 1; //must be the bottom;
        };
        mapscrollbkcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapscrollbkcommand.prototype.render = function (context) {
            var view = context.m_view.m_mapView;
            view.addChild(this.m_obj);
        };
        return mapscrollbkcommand;
    }(core.rendercommand));
    core.mapscrollbkcommand = mapscrollbkcommand;
})(core || (core = {}));
//# sourceMappingURL=mapscrollbkcommand.js.map
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
var core;
(function (core) {
    var mapslotcommand = /** @class */ (function (_super) {
        __extends(mapslotcommand, _super);
        function mapslotcommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        mapslotcommand.prototype.update_z = function () {
            this.m_screen_z = -1000000000 + this.m_obj.y; //;
        };
        mapslotcommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        mapslotcommand.prototype.render = function (context) {
            var view = context.m_view.m_mapView;
            var mapslot = this.m_obj;
            if (mapslot.m_mat != null && mapslot.m_mat.m_tex != null) {
                view.graphics.drawTexture(mapslot.m_mat.m_tex, mapslot.x, mapslot.y);
            }
            //view.addChild(this.m_obj);
        };
        return mapslotcommand;
    }(core.rendercommand));
    core.mapslotcommand = mapslotcommand;
})(core || (core = {}));
//# sourceMappingURL=mapslotcommand.js.map
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
var core;
(function (core) {
    var spritecommand = /** @class */ (function (_super) {
        __extends(spritecommand, _super);
        function spritecommand(obj) {
            if (obj === void 0) { obj = null; }
            return _super.call(this, obj) || this;
        }
        spritecommand.prototype.update_z = function () {
            this.m_screen_z = -100000000 + this.m_obj.y;
        };
        spritecommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        spritecommand.prototype.render = function (context) {
            var obj = this.m_obj;
            if (obj.m_b_upon_unit) {
                context.m_view.m_ani_uponunit_view.addChild(this.m_obj);
            }
            else {
                context.m_view.m_ani_underunit_View.addChild(this.m_obj);
            }
        };
        return spritecommand;
    }(core.rendercommand));
    core.spritecommand = spritecommand;
})(core || (core = {}));
//# sourceMappingURL=spritecommand.js.map
//# sourceMappingURL=const.js.map
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
var core;
(function (core) {
    var animaterial = /** @class */ (function (_super) {
        __extends(animaterial, _super);
        function animaterial() {
            var _this = _super.call(this) || this;
            _this.m_res_path = null;
            _this.m_ani_id = 0;
            _this.m_ready = false;
            _this.m_graphic = new laya.display.Animation();
            return _this;
        }
        animaterial.prototype.re_init = function () {
            this.m_mat_res = "";
        };
        animaterial.prototype.ani_index_pad = function (index, pad_num) {
            var ret = index.toString();
            var count = ret.length;
            while (count < pad_num) {
                ret = "0" + ret;
                count++;
            }
            return ret;
        };
        animaterial.prototype.aniUrls = function (aniName, pre, pad_num, length) {
            var urls = [];
            for (var i = 0; i < length; i++) {
                //动画资源路径要和动画图集打包前的资源命名对应起来
                urls.push(aniName + pre + this.ani_index_pad(i, pad_num) + ".png");
            }
            return urls;
        };
        animaterial.prototype.load_res = function () {
            this.loadres(core.matinfo_mgr().getanitexprefix(this.m_ani_id), "0", 4, core.matinfo_mgr().getaniframecount(this.m_ani_id));
        };
        animaterial.prototype.loadres = function (anipre, pre, pad_num, length) {
            this.m_graphic.loadImages(this.aniUrls(anipre, pre, pad_num, length));
            this.m_ready = true;
            this.m_graphic.play();
            this.m_graphic.gotoAndStop(0);
        };
        animaterial.prototype.goto_frame = function (frame) {
            if (this.m_ready) {
                //core.core_tiplog("animaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
            }
        };
        animaterial.prototype.clear = function () {
            this.m_graphic.clear();
            this.m_ready = false;
        };
        animaterial.prototype.dispose = function () {
            this.m_graphic.clear();
            this.m_graphic = null;
        };
        animaterial.prototype.update = function (delta) {
        };
        return animaterial;
    }(core.material));
    core.animaterial = animaterial;
})(core || (core = {}));
//# sourceMappingURL=animaterial.js.map
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
var core;
(function (core) {
    var avataractiondirmaterial = /** @class */ (function (_super) {
        __extends(avataractiondirmaterial, _super);
        function avataractiondirmaterial() {
            var _this = _super.call(this) || this;
            _this.m_ready = false;
            _this.m_dir = 0;
            _this.m_graphic = new laya.display.Animation();
            return _this;
        }
        avataractiondirmaterial.prototype.re_init = function () {
            this.m_graphic.clear();
            this.m_ready = false;
        };
        avataractiondirmaterial.prototype.get_rect = function () {
            var ret = null;
            if (this.m_ready) {
                ret = this.m_graphic.getGraphicBounds(true);
            }
            return ret;
        };
        avataractiondirmaterial.prototype.ani_index_pad = function (index, pad_num) {
            var ret = index.toString();
            var count = ret.length;
            while (count < pad_num) {
                ret = "0" + ret;
                count++;
            }
            return ret;
        };
        avataractiondirmaterial.prototype.aniUrls = function (aniName, pre, pad_num, length) {
            var urls = [];
            for (var i = 0; i < length; i++) {
                //动画资源路径要和动画图集打包前的资源命名对应起来
                urls.push(aniName + pre + this.ani_index_pad(i, pad_num) + ".png");
            }
            return urls;
        };
        avataractiondirmaterial.prototype.loadres = function (anipre, pre, pad_num, length) {
            this.m_graphic.loadImages(this.aniUrls(anipre, pre, pad_num, length));
            this.m_ready = true;
            this.m_graphic.play();
            this.m_graphic.gotoAndStop(0);
        };
        avataractiondirmaterial.prototype.goto_frame = function (frame) {
            if (this.m_ready) {
                //core.core_tiplog("avataractiondirmaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
                //this.m_graphic.graphics.clear();
                //this.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");
            }
        };
        avataractiondirmaterial.prototype.clear = function () {
            this.m_graphic.clear();
            this.m_ready = false;
        };
        avataractiondirmaterial.prototype.dispose = function () {
            this.m_graphic.clear();
            this.m_graphic = null;
        };
        avataractiondirmaterial.prototype.update = function (delta) {
        };
        return avataractiondirmaterial;
    }(core.material));
    core.avataractiondirmaterial = avataractiondirmaterial;
})(core || (core = {}));
//# sourceMappingURL=avataractiondirmaterial.js.map
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
var core;
(function (core) {
    var avataractionmaterial = /** @class */ (function (_super) {
        __extends(avataractionmaterial, _super);
        function avataractionmaterial() {
            var _this = _super.call(this) || this;
            _this.m_shape = 0;
            _this.m_action = 0;
            _this.m_curdir = 0;
            _this.m_curdirmat = null;
            _this.m_dir_list = {};
            _this.m_width = 0;
            _this.m_height = 0;
            _this.m_b_mirrior = true;
            _this.m_b_dir4 = false;
            _this.m_alink = null;
            _this.m_cur_link = new Laya.Point(0, 0);
            _this.m_b_loaded = false;
            _this.m_cur_mirrior = false;
            _this.m_link_sp = null;
            _this.m_graphic = new laya.display.Sprite();
            _this.m_link_sp = new Laya.Sprite();
            return _this;
        }
        avataractionmaterial.prototype.re_init = function () {
            this.m_mat_res = "";
            this.m_shape = 0;
            this.m_action = 0;
            this.m_curdir = 0;
            this.m_curdirmat = null;
            this.m_width = 0;
            this.m_height = 0;
            this.m_b_mirrior = true;
            this.m_b_dir4 = false;
            this.m_alink = null;
            this.m_cur_link = new Laya.Point(0, 0);
            this.m_b_loaded = false;
            this.m_cur_mirrior = false;
        };
        avataractionmaterial.prototype.get_link = function (dir, pt_idx, frame) {
            var dirmat = this.m_dir_list[dir];
            if (dirmat != undefined && dirmat.m_dir != dir) {
                dir = dirmat.m_dir;
            }
            if (this.m_alink != null) {
                return this.m_alink.get_pt(dir, pt_idx, frame);
            }
            return this.m_cur_link;
        };
        avataractionmaterial.prototype.goto_frame = function (frame) {
            if (this.m_curdirmat != null) {
                //core.core_tiplog("avataractionmaterial goto_frame ",this.m_shape,this.m_action,this.m_curdir,frame);
                this.m_curdirmat.goto_frame(frame);
            }
        };
        avataractionmaterial.prototype.is_dir_loaded = function (dir) {
            if (this.m_dir_list[dir] != null && this.m_dir_list[dir] != undefined) {
                return this.m_dir_list[dir].m_ready;
            }
            return false;
        };
        avataractionmaterial.prototype.load_res = function () {
            var mat_info = core.matinfo_mgr()._get_avatar_info(this.m_shape, this.m_action);
            var atlspre = mat_info.prefix;
            var dirlist = mat_info.dir.split(',');
            var prefix = core.matinfo_mgr().getavataractiontexprefix(this.m_shape, this.m_action);
            var framecount = core.matinfo_mgr().getavataractionframecount(this.m_shape, this.m_action);
            var dir_idx = 0;
            for (var _i = 0, dirlist_1 = dirlist; _i < dirlist_1.length; _i++) {
                var i = dirlist_1[_i];
                this.adddirmat(prefix, dir_idx, i, 4, framecount);
                dir_idx += 1;
            }
            this.m_b_loaded = true;
        };
        avataractionmaterial.prototype.adddirmat = function (anipre, dir, use_dir, pad_num, length) {
            if (this.m_graphic == null) {
                core.core_tiplog("avataractionmaterial adddirmat already release ", anipre, dir, pad_num, length);
                return;
            }
            //todo can be dirmat pool
            var dirmat = null;
            //dirmat = new avataractiondirmaterial();
            dirmat = utils.getitembycls("avataractiondirmaterial", core.avataractiondirmaterial);
            dirmat.re_init();
            dirmat.loadres(anipre, use_dir.toString(), pad_num, length);
            dirmat.m_dir = use_dir;
            dirmat.m_ready = true;
            this.m_dir_list[dir] = dirmat;
            if (dir == this.m_curdir) {
                this.changedir(this.m_curdir);
            }
            this.m_b_loaded = true;
            /*
            else
            {
                if(this.m_b_mirrior){
                    if(this.m_curdir == 5 && dir == 3){
                        this.changedir(this.m_curdir);
                    }
                    else if(this.m_curdir == 6 && dir == 2){
                        this.changedir(this.m_curdir);
                    }
                    else if(this.m_curdir == 7 && dir == 1){
                        this.changedir(this.m_curdir);
                    }
                }
                
            }
            */
        };
        avataractionmaterial.prototype.changedir = function (dir) {
            this.m_curdir = dir;
            this.m_graphic.removeChildren();
            this.m_curdirmat = null;
            var truedir = this.m_curdir;
            var scalex = 1;
            var scalexv = -1;
            this.m_cur_mirrior = false;
            /*
            if(this.m_b_mirrior){
                if(this.m_curdir == 5){
                    truedir = 3;
                    scalex = scalexv;
                }
                else if(this.m_curdir == 6){
                    truedir = 2;
                    scalex = scalexv;
                }
                else if(this.m_curdir == 7){
                    truedir = 1;
                    scalex = scalexv;
                }
            }
            if(this.m_b_dir4){
                if(truedir == 0){
                    truedir = 1;
                }
                else if(truedir == 2){
                    truedir = 1;
                }
                else if(truedir == 4){
                    truedir = 3;
                }
                else if(truedir == 6){//
                    truedir = 7;
                }
            }
            */
            var dirmat = this.m_dir_list[this.m_curdir];
            if (dirmat != undefined) {
                //
                if (dirmat.m_dir != this.m_curdir) {
                    if (this.m_b_mirrior) {
                        if (this.m_curdir == 3) {
                            if (dirmat.m_dir == 5) {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if (this.m_curdir == 5) {
                            if (dirmat.m_dir == 3) {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if (this.m_curdir == 1) {
                            if (dirmat.m_dir == 7) {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if (this.m_curdir == 7) {
                            if (dirmat.m_dir == 1) {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if (this.m_curdir == 2) {
                            if (dirmat.m_dir > 4) {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                        else if (this.m_curdir == 6) {
                            if (dirmat.m_dir < 4) {
                                scalex = scalexv;
                                this.m_cur_mirrior = true;
                            }
                        }
                    }
                }
                //
                this.m_curdirmat = dirmat;
                this.m_graphic.pivotX = this.m_width >> 1;
                this.m_graphic.scaleX = scalex;
                //this.m_curdirmat.m_graphic.scaleX = scalex;
                this.m_graphic.addChild(this.m_curdirmat.m_graphic);
                //this.m_graphic.graphics.clear();
                //this.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");
            }
        };
        avataractionmaterial.prototype.get_rect = function () {
            if (this.m_curdirmat != null) {
                return this.m_curdirmat.get_rect();
            }
            return null;
        };
        avataractionmaterial.prototype.clear = function () {
            this.m_b_loaded = false;
            this.m_graphic.removeChildren();
            this.m_curdirmat = null;
            for (var key in this.m_dir_list) {
                var mat = this.m_dir_list[key];
                if (mat != undefined) {
                    mat.clear();
                    utils.recover("avataractiondirmaterial", mat);
                }
            }
            this.m_dir_list = {};
        };
        avataractionmaterial.prototype.dispose = function () {
            this.clear();
            this.m_graphic = null;
            this.m_link_sp = null;
            for (var key in this.m_dir_list) {
                var mat = this.m_dir_list[key];
                if (mat != undefined) {
                    //mat.clear();
                    mat.dispose(); //really release
                    //utils.recover("avataractiondirmaterial",mat);
                }
            }
            this.m_dir_list = {};
        };
        avataractionmaterial.prototype.update = function (delta) {
        };
        return avataractionmaterial;
    }(core.material));
    core.avataractionmaterial = avataractionmaterial;
})(core || (core = {}));
//# sourceMappingURL=avataractionmaterial.js.map
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
var core;
(function (core) {
    var effmaterial = /** @class */ (function (_super) {
        __extends(effmaterial, _super);
        function effmaterial() {
            var _this = _super.call(this) || this;
            _this.m_ani_path = null;
            _this.m_res_path = null;
            _this.m_ani_id = 0;
            _this.m_ready = false;
            _this.m_graphic = new laya.display.Animation();
            return _this;
        }
        effmaterial.prototype.re_init = function () {
            this.m_mat_res = "";
        };
        effmaterial.prototype.load_res = function () {
            this.loadres(core.matinfo_mgr().geteffname(this.m_ani_id), core.matinfo_mgr().geteffcycle(this.m_ani_id));
        };
        effmaterial.prototype.loadres = function (name, cycle) {
            if (this.m_graphic == null) {
                return;
            }
            this.m_graphic.loadAnimation(this.m_ani_path);
            this.m_ready = true;
            this.m_graphic.play(0, cycle, name);
            this.m_graphic.gotoAndStop(0);
        };
        effmaterial.prototype.goto_frame = function (frame) {
            if (this.m_ready) {
                //core.core_tiplog("animaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
            }
        };
        effmaterial.prototype.clear = function () {
            if (this.m_graphic) {
                this.m_graphic.clear();
            }
            this.m_ready = false;
        };
        effmaterial.prototype.dispose = function () {
            if (this.m_graphic) {
                this.m_graphic.clear();
                this.m_graphic = null;
            }
            this.m_ready = false;
        };
        effmaterial.prototype.update = function (delta) {
        };
        return effmaterial;
    }(core.material));
    core.effmaterial = effmaterial;
})(core || (core = {}));
//# sourceMappingURL=effmaterial.js.map
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
var core;
(function (core) {
    //todo
    var avatar_ani_frame = /** @class */ (function () {
        function avatar_ani_frame() {
            this.m_tex = null;
            this.m_path = "";
            this.m_dx = 0; //pre calculate
            this.m_dy = 0;
        }
        avatar_ani_frame.prototype.re_init = function () {
            this.clear();
        };
        avatar_ani_frame.prototype.load_res = function () {
            this.m_tex = Laya.Loader.getRes(this.m_path);
        };
        avatar_ani_frame.prototype.clear = function () {
            this.m_tex = null;
            this.m_dx = 0;
            this.m_dy = 0;
        };
        avatar_ani_frame.prototype.dispose = function () {
            this.clear();
        };
        return avatar_ani_frame;
    }());
    core.avatar_ani_frame = avatar_ani_frame;
    var avatar_ani_mat = /** @class */ (function (_super) {
        __extends(avatar_ani_mat, _super);
        //
        function avatar_ani_mat() {
            var _this = _super.call(this) || this;
            _this.m_atlas_path = "";
            _this.m_ani_path = "";
            _this.m_atlas_data = null;
            _this.m_ani_data = null;
            _this.m_frames = new Array();
            _this.m_b_loaded = false;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            return _this;
        }
        avatar_ani_mat.prototype.re_init = function () {
            this.clear();
            this.m_atlas_data = null;
            this.m_ani_data = null;
            this.m_aniid = 0;
            this.m_framecount = 1;
            this.m_framespeed = 2;
            this.m_framemillsec = 0;
            this.m_frametotalmillsec = 0;
        };
        avatar_ani_mat.prototype.get_frame = function (idx) {
            if (this.m_frames.length <= 0 || idx < 0 || idx >= this.m_frames.length) {
                return null;
            }
            return this.m_frames[idx];
        };
        avatar_ani_mat.prototype.load_res = function () {
            this.m_ani_data = core.mat_mgr().get_avatar_anidata(this.m_ani_path);
            this.m_atlas_data = core.mat_mgr().get_avatar_anitalasdata(this.m_atlas_path);
            //init frame
            var totalframe = this.m_ani_data.m_frames.length;
            if (this.m_framecount != totalframe) {
                this.m_framecount = totalframe;
                this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            }
            var ax = this.m_ani_data.m_anchorX;
            var ay = this.m_ani_data.m_anchorY;
            var dx = this.m_ani_data.m_dx;
            var dy = this.m_ani_data.m_dy;
            for (var i = 0; i < totalframe; ++i) {
                var f = utils.getitembycls("avatar_ani_frame", avatar_ani_frame);
                f.re_init();
                f.m_path = this.m_ani_data.m_frames[i];
                var aw = 512;
                if (i < this.m_atlas_data.m_frames.length) {
                    aw = this.m_atlas_data.m_frames[i].m_source_w;
                }
                var ah = 512;
                if (i < this.m_atlas_data.m_frames.length) {
                    ah = this.m_atlas_data.m_frames[i].m_source_h;
                }
                f.m_dx = dx - aw * ax;
                f.m_dy = dy - ah * ay;
                f.load_res();
                this.m_frames.push(f);
            }
            this.m_b_loaded = true;
        };
        avatar_ani_mat.prototype.clear = function () {
            this.m_b_loaded = false;
            for (var _i = 0, _a = this.m_frames; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("avatar_ani_frame", i);
            }
            this.m_frames = new Array();
        };
        avatar_ani_mat.prototype.dispose = function () {
            this.clear();
        };
        return avatar_ani_mat;
    }(core.material));
    core.avatar_ani_mat = avatar_ani_mat;
    //end todo
    ////////////////////////
    var lavatartexture = /** @class */ (function () {
        function lavatartexture() {
            this.m_tex = null; //point
        }
        lavatartexture.prototype.re_init = function () {
            this.m_tex = null;
        };
        lavatartexture.prototype.dispose = function () {
            this.m_tex = null;
        };
        return lavatartexture;
    }());
    core.lavatartexture = lavatartexture;
    var lavatartextureframes = /** @class */ (function () {
        function lavatartextureframes() {
            this.m_frames = new Array();
            this.m_use_dir = 0;
            this.m_dir = 0;
            this.m_b_mirror = false;
            this.m_m = new Laya.Matrix();
            this.m_mm = new Laya.Matrix();
            this.m_matrix = null;
            this.m_m.a = 1;
            this.m_m.tx = 0;
            this.m_mm.a = -1;
            this.m_mm.tx = 0;
            this.m_matrix = this.m_m;
        }
        lavatartextureframes.prototype.get_texture = function (idx) {
            if (this.m_frames.length <= 0 || idx < 0 || idx >= this.m_frames.length || this.m_frames[idx] == null) {
                return null;
            }
            return this.m_frames[idx].m_tex;
        };
        lavatartextureframes.prototype.set_mirror = function (flag) {
            this.m_b_mirror = flag;
            if (this.m_b_mirror) {
                this.m_matrix = this.m_mm;
            }
            else {
                this.m_matrix = this.m_m;
            }
        };
        lavatartextureframes.prototype.matrix = function () {
            if (this.m_b_mirror) {
                return this.m_mm;
            }
            else {
                return this.m_m;
            }
        };
        lavatartextureframes.prototype.re_init = function () {
            this.clear();
        };
        lavatartextureframes.prototype.clear = function () {
            for (var _i = 0, _a = this.m_frames; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("lavatartexture", i);
            }
            this.m_frames = new Array();
        };
        lavatartextureframes.prototype.dispose = function () {
            this.clear();
        };
        return lavatartextureframes;
    }());
    core.lavatartextureframes = lavatartextureframes;
    var lavataractionmat = /** @class */ (function (_super) {
        __extends(lavataractionmat, _super);
        function lavataractionmat() {
            var _this = _super.call(this) || this;
            _this.m_shape = 0;
            _this.m_action = 0;
            _this.m_b_loaded = false;
            _this.m_dir_tex = new Array();
            _this.m_texture_map = new Object(); //dir+frames = laya.texture;
            _this.m_alink = null;
            _this.m_width = 0;
            _this.m_height = 0;
            _this.m_cur_link = new Laya.Point(0, 0);
            for (var i = 0; i < 8; ++i) {
                _this.m_dir_tex.push(new lavatartextureframes());
            }
            return _this;
        }
        lavataractionmat.prototype.re_init = function () {
            this.m_mat_res = "";
            this.m_shape = 0;
            this.m_action = 0;
            this.m_alink = null;
            this.m_width = 0;
            this.m_height = 0;
            this.m_b_loaded = false;
            this.clear();
        };
        lavataractionmat.prototype.get_link = function (dir, pt_idx, frame) {
            if (this.m_alink != null) {
                return this.m_alink.get_pt(this.m_dir_tex[dir].m_use_dir, pt_idx, frame);
            }
            return this.m_cur_link;
        };
        lavataractionmat.prototype._gen_res_path = function (pre, dir, frame) {
            var count = 5;
            var ret = "";
            ret = dir.toString();
            var fs = frame.toString();
            var num = ret.length + fs.length;
            while (num < count) {
                ret = ret + "0";
                num++;
            }
            ret += fs;
            ret += ".png";
            ret = pre + ret;
            return ret;
        };
        lavataractionmat.prototype._gen_tex_key = function (dir, frame) {
            return dir * 10000 + frame;
        };
        lavataractionmat.prototype.load_res = function () {
            var mat_info = core.matinfo_mgr()._get_avatar_info(this.m_shape, this.m_action);
            var atlspre = mat_info.prefix;
            var dirlist = mat_info.dir.split(',');
            var framecount = core.matinfo_mgr().getavataractionframecount(this.m_shape, this.m_action);
            var b_mirrior = mat_info.mirror == 1;
            var dir_idx = 0;
            for (var _i = 0, dirlist_1 = dirlist; _i < dirlist_1.length; _i++) {
                var i = dirlist_1[_i];
                //
                this.m_dir_tex[dir_idx].m_dir = dir_idx;
                this.m_dir_tex[dir_idx].m_use_dir = i;
                this.m_dir_tex[dir_idx].set_mirror(false);
                if (b_mirrior) {
                    if (dir_idx == 3) {
                        if (i == 5) {
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if (dir_idx == 5) {
                        if (i == 3) {
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if (dir_idx == 1) {
                        if (i == 7) {
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if (dir_idx == 7) {
                        if (i == 1) {
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if (dir_idx == 6) {
                        if (i == 2) {
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                    else if (dir_idx == 2) {
                        if (i == 6) {
                            this.m_dir_tex[dir_idx].set_mirror(true);
                        }
                    }
                }
                //
                for (var j = 0; j < framecount; ++j) {
                    var res = this._gen_res_path(atlspre, i, j);
                    var tkey = this._gen_tex_key(i, j);
                    var t = this.m_texture_map[tkey];
                    if (t == null) {
                        t = Laya.Loader.getRes(res);
                        if (t == undefined || t == null) {
                            console.log("error!tex = null", res);
                        }
                        this.m_texture_map[tkey] = t;
                    }
                    var af = utils.getitembycls("lavatartexture", lavatartexture);
                    af.re_init();
                    af.m_tex = t;
                    this.m_dir_tex[dir_idx].m_frames.push(af);
                }
                dir_idx += 1;
            }
            this.m_b_loaded = true;
        };
        lavataractionmat.prototype.clear = function () {
            this.m_alink = null;
            this.m_b_loaded = false;
            for (var _i = 0, _a = this.m_dir_tex; _i < _a.length; _i++) {
                var i = _a[_i];
                i.clear();
            }
            for (var k in this.m_texture_map) {
                if (this.m_texture_map.hasOwnProperty(k)) {
                    var t = this.m_texture_map[k];
                    //t.destroy(true);
                }
            }
            this.m_texture_map = new Object();
        };
        lavataractionmat.prototype.dispose = function () {
            this.clear();
            for (var _i = 0, _a = this.m_dir_tex; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_dir_tex = null;
        };
        lavataractionmat.prototype.update = function (delta) {
        };
        return lavataractionmat;
    }(core.material));
    core.lavataractionmat = lavataractionmat;
})(core || (core = {}));
//# sourceMappingURL=lavataractionmat.js.map
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
var core;
(function (core) {
    var mapbkmaterial = /** @class */ (function (_super) {
        __extends(mapbkmaterial, _super);
        function mapbkmaterial() {
            var _this = _super.call(this) || this;
            _this.m_graphic = new laya.display.Sprite();
            return _this;
        }
        mapbkmaterial.prototype.re_init = function (respath) {
            this.m_mat_res = respath;
        };
        mapbkmaterial.prototype.load_res = function () {
            this.m_graphic.graphics.clear();
            this.m_graphic.loadImage(this.m_mat_res);
        };
        mapbkmaterial.prototype.clear = function () {
            this.m_graphic.graphics.clear();
        };
        mapbkmaterial.prototype.dispose = function () {
            this.m_graphic.graphics.clear();
            this.m_graphic = null;
        };
        mapbkmaterial.prototype.update = function (delta) {
        };
        return mapbkmaterial;
    }(core.material));
    core.mapbkmaterial = mapbkmaterial;
})(core || (core = {}));
//# sourceMappingURL=mapbkmaterial.js.map
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
var core;
(function (core) {
    var mapblock = /** @class */ (function (_super) {
        __extends(mapblock, _super);
        function mapblock() {
            var _this = _super.call(this) || this;
            _this.m_res_path = null;
            _this.m_map_id = 0;
            _this.m_grid_w = 32;
            _this.m_grid_h = 32;
            _this.m_buf = null;
            _this.m_block_array = null;
            _this.m_block_w_num = 0;
            _this.m_block_h_num = 0;
            _this.m_mask_array = null;
            _this.m_mask_cache = null;
            _this.m_mask_w_num = 0;
            _this.m_mask_h_num = 0;
            _this.m_b_n_per_byte = 8;
            _this.m_init_sp = false;
            _this.m_block_cache = null;
            _this.m_graphic = new laya.display.Sprite();
            return _this;
        }
        mapblock.prototype.re_init = function () {
        };
        mapblock.prototype.load = function (mapid) {
            if (this.m_buf != null) {
                this.m_buf.clear();
                this.m_buf = null;
            }
            this.m_map_id = mapid;
            core.mat_mgr().getmapblock(this, this.m_map_id);
        };
        mapblock.prototype.setbuff = function (buf) {
            this.m_buf = new laya.utils.Byte(buf);
            var offset = 0;
            var block_len = 0;
            core.core_tiplog("mapblock setbuff len ", this.m_buf.length);
            //"ma"
            core.core_tiplog("mapblock setbuff ", this.m_buf.getByte().toString(16));
            core.core_tiplog("mapblock setbuff ", this.m_buf.getByte().toString(16));
            offset += 2;
            //version
            core.core_tiplog("mapblock setbuff ", this.m_buf.getByte().toString(16));
            offset += 1;
            //cx,cy,sw,sh
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            offset += 16;
            //bw,bh,slen
            core.core_tiplog("mapblock setbuff bw1 ", this.m_buf.getUint16());
            core.core_tiplog("mapblock setbuff bh1 ", this.m_buf.getUint16());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            offset += 8;
            //bw,bh,slen
            this.m_block_w_num = this.m_buf.getUint32();
            this.m_block_h_num = this.m_buf.getUint32();
            core.core_tiplog("mapblock setbuff bw ", this.m_block_w_num);
            core.core_tiplog("mapblock setbuff bh ", this.m_block_h_num);
            block_len = this.m_buf.getUint32();
            core.core_tiplog("mapblock setbuff block_len ", block_len);
            offset += 12;
            this.m_block_array = this.m_buf.getUint8Array(offset, block_len);
            /*for(let i:number = 0;i < 32;++i)
            {
                let idx:number = this.m_block_array.length - i - 1;
                core.core_tiplog("mapblock setbuff block ",i,this.m_block_array[idx]);
            }*/
            this.m_init_sp = false;
            //this.get_block_sp();
            this.m_block_cache = new Uint8Array(this.m_block_w_num * this.m_block_h_num);
            for (var i = 0; i < this.m_block_h_num; ++i) {
                for (var j = 0; j < this.m_block_w_num; ++j) {
                    this.m_block_cache[i * this.m_block_w_num + j] = this.is_block(j, i) ? 1 : 0;
                }
            }
            //
            offset += block_len;
            var tmp = this.m_buf.getUint32(); //leftwall len
            offset += 4;
            this.m_buf.getUint8Array(offset, tmp);
            offset += tmp;
            tmp = this.m_buf.getUint32(); //rightwall len
            offset += 4;
            this.m_buf.getUint8Array(offset, tmp);
            offset += tmp;
            tmp = this.m_buf.getUint32(); //floor count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint32(); //floor 128*64 count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint32(); //floor 256*128 count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint32(); //wallpaper left count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint32(); //wallpaper right count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint32(); //decoration count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint32(); //plant count
            offset += 4;
            for (var i = 0; i < tmp; ++i) {
                var tmplen = this.m_buf.getUint32();
                offset += 4;
                this.m_buf.getUint8Array(offset, tmplen);
                offset += tmplen;
            }
            tmp = this.m_buf.getUint16(); //name len
            offset += 2;
            if (tmp > 0) {
                this.m_buf.getUint8Array(offset, tmp);
                offset += tmp;
            }
            if (this.m_buf.length > offset) {
                //
                //bw,bh,slen
                core.core_tiplog("mapblock setbuff bw1 ", this.m_buf.getUint16());
                core.core_tiplog("mapblock setbuff bh1 ", this.m_buf.getUint16());
                core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
                offset += 8;
                this.m_mask_w_num = this.m_buf.getUint32();
                this.m_mask_h_num = this.m_buf.getUint32();
                core.core_tiplog("mapblock mask bw ", this.m_mask_w_num);
                core.core_tiplog("mapblock mask bh ", this.m_mask_h_num);
                block_len = this.m_buf.getUint32();
                core.core_tiplog("mapblock mask block_len ", block_len);
                offset += 12;
                this.m_mask_array = this.m_buf.getUint8Array(offset, block_len);
                this.m_mask_cache = new Uint8Array(this.m_mask_w_num * this.m_mask_h_num);
                for (var i = 0; i < this.m_mask_h_num; ++i) {
                    for (var j = 0; j < this.m_mask_w_num; ++j) {
                        this.m_mask_cache[i * this.m_mask_w_num + j] = this.is_mask(j, i) ? 1 : 0;
                    }
                }
                //
            }
            //
        };
        mapblock.prototype._is_block = function (v, pos) {
            return (v & (0x80 >> pos)) != 0;
            //return (v&(1<<pos)) != 0;
        };
        mapblock.prototype.is_mask = function (x, y) {
            if (this.m_buf != null) {
                var offset = y * this.m_mask_w_num + x;
                var vpos = Math.floor(offset / this.m_b_n_per_byte);
                var v = this.m_mask_array[vpos];
                var pos = offset % this.m_b_n_per_byte;
                return this._is_block(v, pos);
            }
            return true;
        };
        mapblock.prototype.is_block = function (x, y) {
            if (this.m_buf != null) {
                var offset = y * this.m_block_w_num + x;
                var vpos = Math.floor(offset / this.m_b_n_per_byte);
                var v = this.m_block_array[vpos];
                var pos = offset % this.m_b_n_per_byte;
                return this._is_block(v, pos);
            }
            return true;
        };
        mapblock.prototype.is_block_cache = function (x, y) {
            //core.core_tiplog("mapblock is_block_cache ",x,y,this.m_block_w_num,this.m_block_h_num);
            //core.core_tiplog("mapblock is_block_cache is_block ",this.is_block(x,y));
            if (this.m_buf == null || x < 0 || y < 0 || x >= this.m_block_w_num || y >= this.m_block_h_num) {
                return true;
            }
            //core.core_tiplog("mapblock is_block_cache ",this.m_block_cache[y*this.m_block_w_num+x]);
            return this.m_block_cache[y * this.m_block_w_num + x] != 0;
        };
        mapblock.prototype.is_mask_cache = function (x, y) {
            if (this.m_buf == null || x < 0 || y < 0 || x >= this.m_mask_w_num || y >= this.m_mask_h_num) {
                return true;
            }
            return this.m_mask_cache[y * this.m_mask_w_num + x] != 0;
        };
        mapblock.prototype.get_block_sp = function () {
            this.m_init_sp = true;
            this.m_graphic.removeChildren();
            var idx = 0;
            for (var i = 0; i < this.m_block_w_num; ++i) {
                for (var j = 0; j < this.m_block_h_num; ++j) {
                    var v = this.is_block_cache(i, j);
                    //core.core_tiplog("get_block_sp ",idx,i,j,v);
                    idx++;
                    if (v) {
                        if (i == 20) {
                            this.m_graphic.graphics.drawRect(i * 32, j * 32, 32, 32, "#ffff00", "#000000");
                        }
                        else {
                            this.m_graphic.graphics.drawRect(i * 32, j * 32, 32, 32, "#ff0000", "#000000");
                        }
                        //this.m_graphic.graphics.drawRect(i*32,j*32,32,32,"#ff0000","#000000");
                    }
                    else {
                        this.m_graphic.graphics.drawRect(i * 32, j * 32, 32, 32, "#00ff00", "#000000");
                    }
                }
            }
            return this.m_graphic;
        };
        mapblock.prototype.dispose = function () {
            this.m_block_array = null;
            this.m_block_cache = null;
            this.m_mask_array = null;
            this.m_mask_cache = null;
            if (this.m_buf != null) {
                this.m_buf.clear();
                this.m_buf = null;
            }
            if (this.m_graphic != null) {
                this.m_graphic.removeChildren();
                this.m_graphic.graphics.clear();
                this.m_graphic = null;
            }
        };
        mapblock.prototype.update = function (delta) {
        };
        return mapblock;
    }(core.material));
    core.mapblock = mapblock;
})(core || (core = {}));
//# sourceMappingURL=mapblock.js.map
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
var core;
(function (core) {
    var mapslotmaterial = /** @class */ (function (_super) {
        __extends(mapslotmaterial, _super);
        function mapslotmaterial() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_tex = null;
            _this.m_res_path = null;
            _this.m_map_id = 0;
            _this.m_grid_w = 0;
            _this.m_grid_h = 0;
            _this.m_graphic = new laya.display.Sprite();
            return _this;
        }
        mapslotmaterial.prototype.init = function () {
            this.m_tex = null;
        };
        mapslotmaterial.prototype.clear = function () {
            this.m_graphic.graphics.clear();
            this.m_tex = null;
        };
        mapslotmaterial.prototype.dispose = function () {
            this.m_tex = null;
            this.m_graphic.graphics.clear();
            this.m_graphic = null;
        };
        mapslotmaterial.prototype.update = function (delta) {
        };
        return mapslotmaterial;
    }(core.material));
    core.mapslotmaterial = mapslotmaterial;
})(core || (core = {}));
//# sourceMappingURL=mapslotmaterial.js.map
var core;
(function (core) {
    var materialmgr = /** @class */ (function () {
        function materialmgr() {
            this.m_map_slot_dict = new Object();
            this.m_ani_mat_dict = new Object();
            this.m_eff_mat_dict = new Object(); //path:[loaded,ref,[mat_list]];
            this.m_avatar_link_dict = new Object();
            this.m_lavatar_mat_dict = new Object();
            this.m_lavatar_animat_dict = new Object();
            this.m_lavatar_anidata_dict = new Object();
            this.m_lavatar_aniatlasdata_dict = new Object();
            //need code all ani mat and avatar mat needs ref count,not really
            this.m_mat_loader = new Object();
            this.m_avatar_shadow_mat = null;
        }
        materialmgr.prototype.dispose = function () {
        };
        materialmgr.prototype.get_avatar_shadow_mat = function () {
            if (this.m_avatar_shadow_mat == null) {
                this.m_avatar_shadow_mat = new Laya.Texture();
                this.m_avatar_shadow_mat.load("avatar/shadow.png");
            }
            return this.m_avatar_shadow_mat;
        };
        materialmgr.prototype.check_release = function () {
            for (var i in this.m_mat_loader) {
                this.m_mat_loader[i].check_release();
            }
        };
        materialmgr.prototype.get_avatar_anidata = function (res) {
            if (this.m_lavatar_anidata_dict.hasOwnProperty(res)) {
                return this.m_lavatar_anidata_dict[res];
            }
            var o = Laya.Loader.getRes(res);
            if (o != null) {
                var data_1 = core.avatar_ani_struct.parse(o);
                this.m_lavatar_anidata_dict[res] = data_1;
                return data_1;
            }
            return null;
        };
        materialmgr.prototype.get_avatar_anitalasdata = function (res) {
            if (this.m_lavatar_aniatlasdata_dict.hasOwnProperty(res)) {
                return this.m_lavatar_aniatlasdata_dict[res];
            }
            var o = Laya.Loader.getRes(res);
            if (o != null) {
                var data_2 = core.avatar_atlas_struct.parse(o);
                this.m_lavatar_aniatlasdata_dict[res] = data_2;
                return data_2;
            }
            return null;
        };
        materialmgr.prototype.get_mat_loader = function (res, restype) {
            if (restype === void 0) { restype = Laya.Loader.ATLAS; }
            if (this.m_mat_loader.hasOwnProperty(res) == false) {
                this.m_mat_loader[res] = new core.material_loader(res, restype);
            }
            return this.m_mat_loader[res];
        };
        materialmgr.prototype.add_mat_ref = function (res) {
            this.get_mat_loader(res).addref();
        };
        materialmgr.prototype.del_mat_ref = function (res) {
            this.get_mat_loader(res).delref();
        };
        materialmgr.prototype.preload_mat = function (res, extrares, types) {
            if (extrares === void 0) { extrares = ""; }
            if (types === void 0) { types = ""; }
            var mat_loader = this.get_mat_loader(res);
            if (!mat_loader.m_loaded && !mat_loader.m_loading) {
                if (extrares.length > 0) {
                    mat_loader.setextrares(extrares, types);
                }
                mat_loader.load_res(0);
                mat_loader.update_ref_tm();
            }
        };
        materialmgr.prototype.update = function (delta) {
        };
        materialmgr.prototype.onLoadmapslot = function (key, path) {
            var sp = Laya.loader.getRes(path);
            var mat = this.m_map_slot_dict[key];
            if (mat != undefined) {
                //core.core_tiplog("materialmgr onLoadmapslot set ",key,path,sp);
                mat.m_graphic.graphics.drawTexture(sp, 0, 0);
                mat.m_tex = sp;
                mat.m_res_path = path;
            }
            else {
                core.core_tiplog("materialmgr onLoadmapslot set error ", key, path);
            }
        };
        materialmgr.prototype.getmapslot = function (mapid, x, y) {
            var key = mapid.toString() + '_' + x.toString() + '_' + y.toString();
            var mat = this.m_map_slot_dict[key];
            if (mat == undefined) {
                var slotpath = core.matinfo_mgr().genmappath(mapid) + mapid.toString() + "_tile/" + x.toString() + "_" + y.toString() + ".png";
                var comp = laya.utils.Handler.create(this, this.onLoadmapslot, [key, slotpath]);
                core.myload(slotpath, comp, null, Laya.Loader.IMAGE, 2, true, mapid.toString());
                mat = utils.getitembycls("mapslotmaterial", core.mapslotmaterial);
                mat.init();
                //mat = new mapslotmaterial();
                mat.m_map_id = mapid;
                mat.m_grid_w = core.matinfo_mgr().m_map_grid_w;
                mat.m_grid_h = core.matinfo_mgr().m_map_grid_h;
                this.m_map_slot_dict[key] = mat;
                core.core_tiplog("materialmgr getmapslot load ", key, slotpath);
            }
            return this.m_map_slot_dict[key];
        };
        materialmgr.prototype.clearallmapslot = function () {
            for (var key in this.m_map_slot_dict) {
                var mat = this.m_map_slot_dict[key];
                //find the first loaded slot,delete res by its mapid
                //ignore that more than one group in dict
                if (mat != undefined && mat.m_res_path != null) {
                    Laya.loader.clearResByGroup(mat.m_map_id.toString());
                    mat.clear();
                    utils.recover("mapslotmaterial", mat);
                    break; //
                }
            }
            this.m_map_slot_dict = {};
        };
        materialmgr.prototype.onLoadmapblock = function (mat, path) {
            var buf = Laya.loader.getRes(path);
            if (mat != null && buf != null && buf != undefined) {
                //core.core_tiplog("rendermap onLoadmapslot set ",key,path,sp);
                mat.setbuff(buf);
                mat.m_res_path = path;
            }
            else {
                core.core_tiplog("rendermap onLoadmapblock set error ", path);
            }
        };
        materialmgr.prototype.getmapblock = function (mb, mapid) {
            var slotpath = core.matinfo_mgr().genmappath(mapid) + mapid.toString() + ".bin";
            var mat = mb;
            var comp = laya.utils.Handler.create(this, this.onLoadmapblock, [mat, slotpath]);
            mat.m_map_id = mapid;
            core.myload(slotpath, comp, null, Laya.Loader.BUFFER, 0, true, mapid.toString());
            return mat;
        };
        materialmgr.prototype.getmapbkres = function (respath) {
            var mat = utils.getitembycls("mapbkmaterial", core.mapbkmaterial);
            mat.re_init(respath);
            var mat_loader = this.get_mat_loader(mat.m_mat_res, Laya.Loader.IMAGE);
            if (mat_loader.m_loaded) {
                mat.load_res();
            }
            else {
                mat_loader.add_unload_mat(mat);
                if (!mat_loader.m_loading) {
                    mat_loader.load_res(3);
                }
            }
            mat_loader.addref();
            return mat;
        };
        materialmgr.prototype.delmapbkres = function (mat) {
            //
            var mat_loader = this.get_mat_loader(mat.m_mat_res);
            mat_loader.del_unload_mat(mat);
            mat_loader.delref();
            mat.delref();
            mat.clear();
            utils.recover("mapbkmaterial", mat);
            //
        };
        ///////
        materialmgr.prototype.geteffmat = function (aniid) {
            var mat = null;
            var slotpath = core.matinfo_mgr()._get_eff_info(aniid).path;
            var res = core.matinfo_mgr()._get_eff_info(aniid).res;
            mat = utils.getitembycls("effmaterial", core.effmaterial);
            //mat = new effmaterial();
            mat.re_init();
            mat.m_ani_id = aniid;
            mat.m_res_path = res;
            mat.m_ani_path = slotpath;
            mat.m_mat_res = res;
            mat.addref();
            var mat_loader = this.get_mat_loader(mat.m_mat_res);
            if (mat_loader.m_loaded) {
                mat.load_res();
            }
            else {
                mat_loader.add_unload_mat(mat);
                if (!mat_loader.m_loading) {
                    mat_loader.load_res(4);
                }
            }
            mat_loader.addref();
            core.core_tiplog("materialmgr geteffmat load ", aniid, slotpath);
            return mat;
        };
        materialmgr.prototype.deleffmat = function (mat) {
            var mat_loader = this.get_mat_loader(mat.m_mat_res);
            mat_loader.del_unload_mat(mat);
            mat_loader.delref();
            mat.delref();
            mat.clear();
            utils.recover("effmaterial", mat);
        };
        ///////
        materialmgr.prototype.getanimat = function (aniid) {
            var mat = null;
            var slotpath = "ani/" + core.matinfo_mgr()._get_ani_info(aniid).path;
            mat = utils.getitembycls("animaterial", core.animaterial);
            //mat = new animaterial();
            mat.re_init();
            mat.m_ani_id = aniid;
            mat.m_res_path = slotpath;
            mat.m_mat_res = slotpath;
            mat.addref();
            //
            var mat_loader = this.get_mat_loader(mat.m_mat_res);
            if (mat_loader.m_loaded) {
                mat.load_res();
            }
            else {
                mat_loader.add_unload_mat(mat);
                if (!mat_loader.m_loading) {
                    mat_loader.load_res(4);
                }
            }
            mat_loader.addref();
            //
            core.core_tiplog("materialmgr getanimat load ", aniid, slotpath);
            return mat;
        };
        materialmgr.prototype.delanimat = function (mat) {
            var mat_loader = this.get_mat_loader(mat.m_mat_res);
            mat_loader.del_unload_mat(mat);
            mat_loader.delref();
            mat.delref();
            mat.clear();
            utils.recover("animaterial", mat);
        };
        materialmgr.prototype.onLoadavatar = function (mat) {
            if (mat != undefined) {
                mat.load_res();
            }
        };
        materialmgr.prototype.getavataractionmat = function (shape, action) {
            var key = core.matinfo_mgr().genavatarmatkey(shape, action);
            var mat;
            //mat = new avataractionmaterial();
            mat = utils.getitembycls("avataractionmaterial", core.avataractionmaterial);
            mat.re_init();
            mat.m_shape = shape;
            mat.m_action = action;
            mat.m_alink = this.getavatarlinkdata(shape, action);
            var mat_info = core.matinfo_mgr()._get_avatar_info(shape, action);
            mat.addref();
            if (mat_info != null) {
                var slotpath = "avatar/" + mat_info.path;
                mat.m_width = mat_info.w;
                mat.m_height = mat_info.h;
                if (mat_info.mirror == 1) {
                    mat.m_b_mirrior = true;
                }
                else {
                    mat.m_b_mirrior = false;
                }
                if (mat_info.dir4 == 1) {
                    mat.m_b_dir4 = true;
                }
                else {
                    mat.m_b_dir4 = false;
                }
                mat.m_mat_res = slotpath;
                //
                var mat_loader = this.get_mat_loader(mat.m_mat_res);
                if (mat_loader.m_loaded) {
                    mat.load_res();
                }
                else {
                    mat_loader.add_unload_mat(mat);
                    if (!mat_loader.m_loading) {
                        mat_loader.load_res(3);
                    }
                }
                mat_loader.addref();
                //
                core.core_tiplog("materialmgr getavatarmat load ", key, slotpath);
            }
            return mat;
        };
        materialmgr.prototype.delavataractionmaterial = function (mat) {
            if (mat.m_mat_res.length > 0) {
                var mat_loader = this.get_mat_loader(mat.m_mat_res);
                mat_loader.del_unload_mat(mat);
                mat_loader.delref();
            }
            mat.delref();
            mat.clear();
            utils.recover("avataractionmaterial", mat);
            return;
        };
        //
        materialmgr.prototype.getlavatarmat = function (shape, action) {
            var key = core.matinfo_mgr().genavatarmatkey(shape, action);
            var mat;
            if (this.m_lavatar_mat_dict.hasOwnProperty(key.toString())) {
                mat = this.m_lavatar_mat_dict[key];
                mat.addref();
                return mat;
            }
            //mat = new avataractionmaterial();
            mat = utils.getitembycls("lavataractionmat", core.lavataractionmat);
            mat.re_init();
            mat.m_shape = shape;
            mat.m_action = action;
            mat.m_alink = this.getavatarlinkdata(shape, action);
            var mat_info = core.matinfo_mgr()._get_avatar_info(shape, action);
            mat.addref();
            if (mat_info != null) {
                var slotpath = "avatar/" + mat_info.path;
                mat.m_width = mat_info.w;
                mat.m_height = mat_info.h;
                mat.m_mat_res = slotpath;
                //
                var mat_loader = this.get_mat_loader(mat.m_mat_res);
                if (mat_loader.m_loaded) {
                    mat.load_res();
                }
                else {
                    mat_loader.add_unload_mat(mat);
                    if (!mat_loader.m_loading) {
                        mat_loader.load_res(3);
                    }
                }
                mat_loader.addref();
                //
                core.core_tiplog("materialmgr getlavatarmat load ", key, slotpath);
            }
            return mat;
        };
        materialmgr.prototype.dellavatarmaterial = function (mat) {
            mat.delref();
            if (mat.m_ref <= 0) {
                var key = core.matinfo_mgr().genavatarmatkey(mat.m_shape, mat.m_action);
                if (mat.m_mat_res.length > 0) {
                    var mat_loader = this.get_mat_loader(mat.m_mat_res);
                    mat_loader.del_unload_mat(mat);
                    mat_loader.delref();
                }
                mat.clear();
                utils.recover("lavataractionmat", mat);
                delete this.m_lavatar_mat_dict[key];
            }
            return;
        };
        materialmgr.prototype.getlavataranimat = function (aniid) {
            var mat = null;
            if (this.m_lavatar_animat_dict.hasOwnProperty(aniid.toString())) {
                mat = this.m_lavatar_animat_dict[aniid];
                mat.addref();
                return mat;
            }
            mat = utils.getitembycls("avatar_ani_mat", core.avatar_ani_mat);
            mat.re_init();
            //
            var slotpath = core.matinfo_mgr()._get_eff_info(aniid).path;
            var res = core.matinfo_mgr()._get_eff_info(aniid).res;
            mat.m_aniid = aniid;
            mat.m_ani_path = slotpath;
            mat.m_mat_res = res;
            mat.m_atlas_path = res;
            //
            mat.m_aw = core.matinfo_mgr().geteffw(aniid);
            mat.m_ah = core.matinfo_mgr().geteffh(aniid);
            mat.m_framecount = core.matinfo_mgr().geteffframecount(aniid);
            mat.m_framespeed = core.matinfo_mgr().geteffframespeed(aniid);
            mat.m_framemillsec = 1000.0 / mat.m_framespeed;
            mat.m_frametotalmillsec = mat.m_framecount * 1000.0 / mat.m_framespeed;
            //
            mat.addref();
            var mat_loader = this.get_mat_loader(mat.m_mat_res);
            if (mat_loader.m_loaded) {
                mat.load_res();
            }
            else {
                mat_loader.add_unload_mat(mat);
                if (!mat_loader.m_loading) {
                    mat_loader.addextrares(mat.m_ani_path, Laya.Loader.JSON);
                    mat_loader.load_res(4);
                }
            }
            mat_loader.addref();
            core.core_tiplog("materialmgr getlavataranimat load ", aniid, slotpath);
            //
            return mat;
        };
        materialmgr.prototype.dellavataranimat = function (mat) {
            mat.delref();
            if (mat.m_ref <= 0) {
                if (mat.m_mat_res.length > 0) {
                    var mat_loader = this.get_mat_loader(mat.m_mat_res);
                    mat_loader.del_unload_mat(mat);
                    mat_loader.delref();
                }
                mat.clear();
                utils.recover("avatar_ani_mat", mat);
                delete this.m_lavatar_animat_dict[mat.m_aniid];
            }
        };
        //
        materialmgr.prototype.setavatarlinkdata = function (shape, action, buff, bufflen, b_txt) {
            this.clearavatarlinkdata(shape, action);
            var avtarlink_ins = utils.getitembycls("avatarlink", core.avatarlink);
            avtarlink_ins.init();
            if (b_txt) {
                avtarlink_ins.set_txt_buff(buff, bufflen);
            }
            else {
                avtarlink_ins.set_buff(buff, bufflen);
            }
            var key = core.matinfo_mgr()._gen_avatarlink_key(shape, action);
            this.m_avatar_link_dict[key] = avtarlink_ins;
        };
        materialmgr.prototype.clearavatarlinkdata = function (shape, action) {
            var key = core.matinfo_mgr()._gen_avatarlink_key(shape, action);
            if (this.m_avatar_link_dict.hasOwnProperty(key)) {
                var ad = this.m_avatar_link_dict[key];
                ad.dispose();
                utils.recover("avatarlink", ad);
                delete this.m_avatar_link_dict[key];
            }
        };
        materialmgr.prototype.getavatarlinkdata = function (shape, action) {
            var key = core.matinfo_mgr()._gen_avatarlink_key(shape, action);
            if (this.m_avatar_link_dict.hasOwnProperty(key)) {
                return this.m_avatar_link_dict[key];
            }
            var filen = core.matinfo_mgr()._gen_avatarlink_filename(shape, action);
            if (filen == null || filen.length <= 0) {
                return null;
            }
            var b_txt = true;
            var buff = null;
            buff = core.filepack_ins().get_file("link_data_txt", filen);
            if (buff == null) {
                buff = core.filepack_ins().get_file("link_data", filen);
                b_txt = false;
            }
            if (buff == null) {
                return null;
            }
            var bufflen;
            if (b_txt) {
                bufflen = core.filepack_ins().get_file_len("link_data_txt", filen);
            }
            else {
                bufflen = core.filepack_ins().get_file_len("link_data", filen);
            }
            var avtarlink_ins = utils.getitembycls("avatarlink", core.avatarlink);
            avtarlink_ins.init();
            if (b_txt) {
                avtarlink_ins.set_txt_buff(buff, bufflen);
            }
            else {
                avtarlink_ins.set_buff(buff, bufflen);
            }
            this.m_avatar_link_dict[key] = avtarlink_ins;
            return avtarlink_ins;
        };
        return materialmgr;
    }());
    core.materialmgr = materialmgr;
    var g_ins = null;
    function mat_mgr() {
        if (g_ins == null) {
            g_ins = new materialmgr();
        }
        return g_ins;
    }
    core.mat_mgr = mat_mgr;
})(core || (core = {}));
//# sourceMappingURL=materialmgr.js.map
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
var core;
(function (core) {
    var renderani = /** @class */ (function (_super) {
        __extends(renderani, _super);
        function renderani() {
            var _this = _super.call(this) || this;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_framecurrenttm = 0;
            return _this;
        }
        renderani.prototype.re_init = function (aniid, x, y, underunit) {
            if (underunit === void 0) { underunit = true; }
            this.set_id();
            this.m_aniid = aniid;
            this.m_rc = utils.getitembycls("anicommand", core.anicommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_data = underunit;
            this.m_mat = null; //only start to load when it is projected 
            this.m_aw = core.matinfo_mgr().getaniw(this.m_aniid);
            this.m_ah = core.matinfo_mgr().getanih(this.m_aniid);
            this.m_framecount = core.matinfo_mgr().getaniframecount(this.m_aniid);
            this.m_framespeed = core.matinfo_mgr().getaniframespeed(this.m_aniid);
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_box.setTo(this.x - this.m_aw / 2, this.y - this.m_ah / 2, this.m_aw, this.m_ah);
        };
        renderani.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().getanimat(this.m_aniid);
                    this.addChild(this.m_mat.m_graphic);
                }
            }
            else {
                //core.core_tiplog("renderani project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        };
        renderani.prototype.update = function (delta) {
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_mat != null) {
                this.m_mat.goto_frame(this.m_framecurrent);
            }
        };
        //从parent里把自己移除?
        renderani.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().delanimat(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("anicommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return renderani;
    }(core.renderobject));
    core.renderani = renderani;
})(core || (core = {}));
//# sourceMappingURL=renderani.js.map
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
var core;
(function (core) {
    var renderavatar_default = /** @class */ (function (_super) {
        __extends(renderavatar_default, _super);
        function renderavatar_default() {
            var _this = _super.call(this) || this;
            _this.graphics.loadImage("avatar/default.png");
            return _this;
        }
        return renderavatar_default;
    }(Laya.Sprite));
    core.renderavatar_default = renderavatar_default;
    var renderavatar_shadow = /** @class */ (function (_super) {
        __extends(renderavatar_shadow, _super);
        function renderavatar_shadow() {
            var _this = _super.call(this) || this;
            _this.graphics.loadImage("avatar/shadow.png");
            return _this;
        }
        return renderavatar_shadow;
    }(Laya.Sprite));
    core.renderavatar_shadow = renderavatar_shadow;
    var renderavatar_adorn = /** @class */ (function (_super) {
        __extends(renderavatar_adorn, _super);
        function renderavatar_adorn() {
            var _this = _super.call(this) || this;
            _this.m_id = 0;
            _this.m_front = true;
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_id = _this._gen_id();
            return _this;
        }
        renderavatar_adorn.prototype._gen_id = function () {
            return renderavatar_adorn.S_ADORN_IDMAX++;
        };
        renderavatar_adorn.prototype.draw2sp = function (sp, x, y, b_front) {
            if (b_front === void 0) { b_front = true; }
        };
        renderavatar_adorn.prototype.update = function (delta) {
        };
        renderavatar_adorn.prototype.dispose = function () {
        };
        renderavatar_adorn.S_ADORN_IDMAX = 1;
        return renderavatar_adorn;
    }(Laya.Sprite));
    core.renderavatar_adorn = renderavatar_adorn;
    var avatar_aura = /** @class */ (function (_super) {
        __extends(avatar_aura, _super);
        function avatar_aura() {
            var _this = _super.call(this) || this;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_b_loop = true;
            _this.m_b_end = false;
            _this.m_b_autodel = false;
            _this.m_b_loaded = false;
            return _this;
        }
        avatar_aura.prototype.re_init = function (aura_id) {
            this.m_id = this._gen_id();
            this.m_aniid = aura_id;
            this.m_mat = null; //only start to load when it is projected 
            this.m_aw = core.matinfo_mgr().geteffw(this.m_aniid);
            this.m_ah = core.matinfo_mgr().geteffh(this.m_aniid);
            this.m_framecount = core.matinfo_mgr().geteffframecount(this.m_aniid);
            this.m_framespeed = core.matinfo_mgr().geteffframespeed(this.m_aniid);
            this.m_b_loop = core.matinfo_mgr().geteffcycle(this.m_aniid);
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            this.m_b_loaded = false;
        };
        avatar_aura.prototype.load_res = function () {
            if (this.m_b_loaded) {
                return true;
            }
            if (this.m_mat == null) {
                this.m_mat = core.mat_mgr().geteffmat(this.m_aniid);
                this.addChild(this.m_mat.m_graphic);
                this.m_b_loaded = true;
            }
            return true;
        };
        avatar_aura.prototype.update = function (delta) {
            if (this.m_b_loaded == false) {
                return;
            }
            if (this.m_b_end) {
                return;
            }
            this.m_framecurrenttm += delta;
            if (this.m_framecurrenttm >= this.m_frametotalmillsec) {
                if (this.m_b_autodel) {
                    this.m_b_end = true;
                    return;
                }
                if (this.m_b_loop == false) {
                    this.m_b_end = true;
                    return;
                }
            }
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_mat != null) {
                this.m_mat.goto_frame(this.m_framecurrent);
            }
        };
        //从parent里把自己移除?
        avatar_aura.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().deleffmat(this.m_mat);
                this.m_mat = null;
            }
            _super.prototype.dispose.call(this);
            utils.recover("avatar_aura", this);
        };
        return avatar_aura;
    }(renderavatar_adorn));
    core.avatar_aura = avatar_aura;
    //////
    var avatar_aura_new = /** @class */ (function (_super) {
        __extends(avatar_aura_new, _super);
        function avatar_aura_new() {
            var _this = _super.call(this) || this;
            _this.m_framecurrent = 0;
            _this.m_framecurrenttm = 0;
            _this.m_b_loaded = false;
            return _this;
        }
        avatar_aura_new.prototype.re_init = function (aura_id) {
            this.m_id = this._gen_id();
            this.m_aniid = aura_id;
            this.m_mat = null;
            this.m_framecurrent = 0;
            this.m_framecurrenttm = 0;
            this.m_b_loaded = false;
            this.m_dx = 0;
            this.m_dy = 0;
            this.m_front = true;
        };
        avatar_aura_new.prototype.load_res = function () {
            if (this.m_b_loaded == false) {
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().getlavataranimat(this.m_aniid); //only start to load when it is projected 
                }
                this.m_b_loaded = this.m_mat.m_b_loaded;
            }
            return true;
        };
        avatar_aura_new.prototype.draw2sp = function (sp, x, y, b_front) {
            if (b_front === void 0) { b_front = true; }
            if (this.m_b_loaded && this.m_mat != null && this.m_mat.m_b_loaded && this.m_front == b_front) {
                //let f:avatar_ani_frame = this.m_mat.m_frames[this.m_framecurrent];
                var f = this.m_mat.get_frame(this.m_framecurrent);
                if (f) {
                    sp.graphics.drawTexture(f.m_tex, x + f.m_dx + this.m_dx, y + f.m_dy + this.m_dy);
                }
            }
        };
        avatar_aura_new.prototype.update = function (delta) {
            this.m_framecurrenttm += delta;
            if (this.m_b_loaded) {
                var framecount = Math.floor(this.m_framecurrenttm / this.m_mat.m_framemillsec);
                this.m_framecurrent = framecount % this.m_mat.m_framecount;
            }
        };
        //从parent里把自己移除?
        avatar_aura_new.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().dellavataranimat(this.m_mat);
                this.m_mat = null;
            }
            _super.prototype.dispose.call(this);
            utils.recover("avatar_aura_new", this);
        };
        return avatar_aura_new;
    }(renderavatar_adorn));
    core.avatar_aura_new = avatar_aura_new;
    //////
    var renderavatar_old = /** @class */ (function (_super) {
        __extends(renderavatar_old, _super);
        function renderavatar_old() {
            var _this = _super.call(this) || this;
            _this.m_designw = 512;
            _this.m_designh = 512;
            _this.m_shape = 0;
            _this.m_shape_weapon = 0;
            _this.m_shape_wing = 0;
            _this.m_shape_ride = 0;
            _this.m_shape_backride = 0;
            _this.m_shape_hair = 0;
            _this.m_aura_id = 0;
            _this.m_aura_adorn = null;
            _this.m_title_id = 0;
            _this.m_title_adorn = null;
            _this.m_action = 0;
            _this.m_lastaction = 0;
            _this.m_dir = 0;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_mat_dx = 0; //-256;
            _this.m_mat_dy = -_this.m_designh / 2; //-256;
            _this.m_ride_h = 0;
            _this.m_user_data = 0;
            _this.m_name = "";
            _this.m_name_dx = 0;
            _this.m_name_dy = 0;
            _this.m_name_sp = null;
            _this.m_hp = null;
            _this.m_buff = null;
            _this.m_b_cycle = true;
            _this.m_b_stop_frame = -1;
            _this.m_sp_front = null;
            _this.m_sp_back = null;
            _this.m_sp_center = null;
            _this.m_sp_center_f = null;
            _this.m_sp_center_b = null;
            _this.m_sp_center_c = null;
            _this.m_sp_center_rf = null;
            _this.m_sp_center_rb = null;
            _this.m_adorn_list = new Array();
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_org_pt = new Laya.Point(0, 0);
            _this.m_shadow_sp = null;
            _this.m_default_sp = null;
            _this.m_draw_avatar = false;
            _this.m_use_default = true;
            _this.m_draw_link = false;
            return _this;
        }
        renderavatar_old.prototype.re_init = function (shape, x, y, use_default) {
            if (use_default === void 0) { use_default = true; }
            this.set_id();
            this.m_name_dx = 0;
            this.m_name_dy = 0;
            this.m_draw_link = false;
            this.m_sp_front = new Laya.Sprite();
            this.m_sp_back = new Laya.Sprite();
            this.m_sp_center = new Laya.Sprite();
            this.m_sp_center_rb = new Laya.Sprite();
            this.m_sp_center_rf = new Laya.Sprite();
            this.m_sp_center_b = new Laya.Sprite();
            this.m_sp_center_c = new Laya.Sprite();
            this.m_sp_center_f = new Laya.Sprite();
            this.m_shadow_sp = utils.getitembycls("renderavatar_shadow", renderavatar_shadow);
            this.addChild(this.m_shadow_sp);
            this.m_shadow_sp.x = -50;
            this.m_shadow_sp.y = -35;
            this.set_ride_h(0);
            this.m_mat_dy = -this.m_designh / 2;
            this.m_use_default = use_default;
            if (this.m_use_default) {
                this.m_draw_avatar = false;
                this.create_default_sp();
            }
            else {
                this.m_draw_avatar = true;
            }
            this.m_sp_center.addChild(this.m_sp_center_rb);
            this.m_sp_center.addChild(this.m_sp_center_b);
            this.m_sp_center.addChild(this.m_sp_center_c);
            this.m_sp_center.addChild(this.m_sp_center_f);
            this.m_sp_center.addChild(this.m_sp_center_rf);
            this.m_dx = 0;
            this.m_dy = 0;
            this.addChild(this.m_sp_back);
            this.addChild(this.m_sp_center);
            this.addChild(this.m_sp_front);
            this.m_shape = shape;
            this.rotation = 0;
            this.alpha = 1;
            this.m_rc = utils.getitembycls("avatarcommand", core.avatarcommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_mat = null; //only start to load when it is projected 
            this.m_mat_weapon = null;
            this.m_mat_wing = null;
            this.m_mat_ride = null;
            this.m_mat_backride = null;
            this.m_mat_hair = null;
            this.m_shape_weapon = 0;
            this.m_shape_wing = 0;
            this.m_shape_ride = 0;
            this.m_shape_backride = 0;
            this.m_shape_hair = 0;
            this.m_aura_id = 0;
            this.m_aura_adorn = null;
            this.m_title_id = 0;
            this.m_title_adorn = null;
            this.reset_data();
        };
        renderavatar_old.prototype.show_shadow = function (flag) {
            if (flag) {
                this.addChildAt(this.m_shadow_sp, 0);
            }
            else {
                this.m_shadow_sp.removeSelf();
            }
        };
        renderavatar_old.prototype.set_dxy = function (x, y) {
            this.m_dx = x;
            this.m_dy = y;
            this.m_sp_front.x = this.m_dx;
            this.m_sp_front.y = this.m_dy;
            this.m_sp_center.x = this.m_dx;
            this.m_sp_center.y = this.m_dy;
            this.m_sp_back.x = this.m_dx;
            this.m_sp_back.y = this.m_dy;
        };
        renderavatar_old.prototype.change_shape = function (shape) {
            if (shape == this.m_shape) {
                return;
            }
            if (this.m_mat != null) {
                this.m_mat.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(this.m_mat);
                this.m_mat = null;
            }
            this.m_shape = shape;
            this.reset_data();
            if (this.m_use_default) {
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        };
        renderavatar_old.prototype.change_weapon = function (shape) {
            if (shape == this.m_shape_weapon) {
                return;
            }
            if (this.m_mat_weapon != null) {
                this.m_mat_weapon.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(this.m_mat_weapon);
                this.m_mat_weapon = null;
            }
            this.m_shape_weapon = shape;
        };
        renderavatar_old.prototype.change_wing = function (shape) {
            if (shape == this.m_shape_wing) {
                return;
            }
            if (this.m_mat_wing != null) {
                this.m_mat_wing.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(this.m_mat_wing);
                this.m_mat_wing = null;
            }
            this.m_shape_wing = shape;
        };
        renderavatar_old.prototype.change_ride = function (shape, backshape) {
            if (shape == this.m_shape_ride) {
                return;
            }
            if (this.m_mat_ride != null) {
                this.m_mat_ride.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(this.m_mat_ride);
                this.m_mat_ride = null;
            }
            if (this.m_mat_backride != null) {
                this.m_mat_backride.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(this.m_mat_backride);
                this.m_mat_backride = null;
            }
            this.m_shape_ride = shape;
            this.m_shape_backride = backshape;
            if (this.m_use_default) {
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        };
        renderavatar_old.prototype.set_ride_h = function (v) {
            this.m_ride_h = v;
        };
        renderavatar_old.prototype.change_hair = function (shape) {
            if (shape == this.m_shape_hair) {
                return;
            }
            if (this.m_mat_hair != null) {
                this.m_mat_hair.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(this.m_mat_hair);
                this.m_mat_hair = null;
            }
            this.m_shape_hair = shape;
        };
        renderavatar_old.prototype.change_aura = function (shape) {
            if (this.m_aura_id != 0) {
                this.del_adorn(this.m_aura_id);
                this.m_aura_adorn = null;
                this.m_aura_id = 0;
            }
            if (shape == 0) {
                return;
            }
            var aura_adorn = utils.getitembycls("avatar_aura", avatar_aura);
            aura_adorn.re_init(shape);
            this.m_aura_id = aura_adorn.m_id;
            this.m_aura_adorn = aura_adorn;
            this.add_adorn(aura_adorn, true);
        };
        renderavatar_old.prototype.change_title = function (shape) {
            if (this.m_title_id != 0) {
                this.del_adorn(this.m_title_id);
                this.m_title_adorn = null;
                this.m_title_id = 0;
            }
            if (shape == 0) {
                return;
            }
            var aura_adorn = utils.getitembycls("avatar_aura", avatar_aura);
            aura_adorn.re_init(shape);
            this.m_title_id = aura_adorn.m_id;
            this.m_title_adorn = aura_adorn;
            this.add_adorn(aura_adorn, false);
        };
        renderavatar_old.prototype.reset_data = function () {
            this.m_aw = core.matinfo_mgr().getavataractionw(this.m_shape, this.m_action);
            this.m_ah = core.matinfo_mgr().getavataractionh(this.m_shape, this.m_action);
            this.m_framecount = core.matinfo_mgr().getavataractionframecount(this.m_shape, this.m_action);
            this.m_framespeed = core.matinfo_mgr().getavataractionframespeed(this.m_shape, this.m_action);
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            this.m_framecurrenttm = 0;
            this.m_box.setTo(this.x - this.m_aw / 2, this.y - this.m_ah / 2, this.m_aw, this.m_ah);
            core.core_tiplog("renderavatar resetdata ", this.m_obj_id, this.m_shape, this.m_dir, this.m_action, this.m_framecount);
        };
        renderavatar_old.prototype.set_name = function (name) {
            this.m_name = name;
            //todo
            if (this.m_name_sp == null) {
                this.m_name_sp = utils.getitembycls("avatarname", core.avatarname);
                this.m_name_sp.re_init();
                this.m_sp_front.addChild(this.m_name_sp);
            }
            this.m_name_sp.m_text.text = this.m_name;
            if (this.m_name.length > 0) {
                this.m_sp_front.addChild(this.m_name_sp);
            }
            else {
                this.m_name_sp.removeSelf();
            }
        };
        renderavatar_old.prototype.set_name_dxy = function (x, y) {
            this.m_name_dx = x;
            this.m_name_dy = y;
            if (this.m_name_sp != null) {
                this.m_name_sp.x = x;
                this.m_name_sp.y = y;
            }
        };
        renderavatar_old.prototype.set_dy = function (dy) {
            this.m_mat_dy = dy - this.m_ah / 2;
        };
        renderavatar_old.prototype.set_dx = function (dx) {
            this.m_mat_dx = dx;
        };
        renderavatar_old.prototype.get_buffui = function () {
            if (this.m_buff == null) {
                this.m_buff = utils.getitembycls("avatarbuffui", core.avatarbuffui);
                this.m_buff.re_init();
                this.m_sp_front.addChild(this.m_buff);
            }
            return this.m_buff;
        };
        renderavatar_old.prototype.del_buffui = function () {
            if (this.m_buff != null) {
                this.m_buff.removeSelf();
                this.m_buff.clear();
                utils.recover("avatarbuffui", this.m_buff);
                this.m_buff = null;
            }
        };
        renderavatar_old.prototype.add_buffeff = function (eff_id) {
            return 0;
        };
        renderavatar_old.prototype.del_buffeff = function (buff_eff_id) {
        };
        renderavatar_old.prototype.clearall_buffeff = function () {
        };
        renderavatar_old.prototype.set_hp = function (v, m) {
            if (this.m_hp == null) {
                this.m_hp = utils.getitembycls("avatarhp", core.avatarhp);
                this.m_hp.re_init();
                this.m_sp_front.addChild(this.m_hp);
                this.m_hp.x = 0 - (this.m_hp.m_w / 2);
                this.m_hp.y = -120;
            }
            this.m_hp.set_v(v, m);
        };
        renderavatar_old.prototype.del_hp = function () {
            if (this.m_hp != null) {
                this.m_hp.removeSelf();
                this.m_hp.clear();
                utils.recover("avatarhp", this.m_hp);
                this.m_hp = null;
            }
        };
        renderavatar_old.prototype.add_adorn = function (sp, b_back) {
            this.del_adorn(sp.m_id);
            if (b_back) {
                this.m_sp_back.addChild(sp);
            }
            else {
                this.m_sp_front.addChild(sp);
            }
            this.m_adorn_list.push(sp);
            return sp.m_id;
        };
        renderavatar_old.prototype.get_adorn = function (id) {
            var idx = 0;
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == id) {
                    return i;
                }
                idx++;
            }
            return null;
        };
        renderavatar_old.prototype.del_adorn = function (id) {
            var idx = 0;
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == id) {
                    i.removeSelf();
                    i.dispose();
                    this.m_adorn_list.splice(idx, 1);
                    return;
                }
                idx++;
            }
        };
        renderavatar_old.prototype.change_action = function (action, b_cycle, stop_f) {
            if (b_cycle === void 0) { b_cycle = true; }
            if (stop_f === void 0) { stop_f = -1; }
            core.core_tiplog("renderavatar change_action ", this.m_obj_id, this.m_shape, this.m_action, action, this.m_dir);
            this.m_lastaction = this.m_action;
            this.m_action = action;
            this.m_b_cycle = b_cycle;
            this.m_b_stop_frame = stop_f;
            if (action != this.m_action) {
                if (this.m_use_default) {
                    this.m_draw_avatar = false;
                    this.m_sp_center.removeSelf();
                    this.create_default_sp();
                }
            }
        };
        renderavatar_old.prototype.change_dir = function (dir) {
            if (dir == this.m_dir) {
                return;
            }
            this.m_dir = dir;
            if (this.m_mat != null) {
                this.m_mat.changedir(dir);
            }
            //
            if (this.m_mat_weapon != null) {
                this.m_mat_weapon.changedir(dir);
                var sp = this._get_weapon_sp(dir, this.m_mat_weapon.m_b_mirrior);
                this.m_mat_weapon.m_graphic.removeSelf();
                sp.addChild(this.m_mat_weapon.m_graphic);
            }
            if (this.m_mat_wing != null) {
                this.m_mat_wing.changedir(dir);
                var sp = this._get_wing_sp(dir, this.m_mat_wing.m_b_mirrior);
                this.m_mat_wing.m_graphic.removeSelf();
                sp.addChild(this.m_mat_wing.m_graphic);
            }
            if (this.m_mat_ride != null) {
                this.m_mat_ride.changedir(dir);
            }
            if (this.m_mat_backride != null) {
                this.m_mat_backride.changedir(dir);
            }
            if (this.m_mat_hair != null) {
                this.m_mat_hair.changedir(dir);
            }
            //
        };
        renderavatar_old.prototype._project_mat = function (mat, mtype, shape, sp, b_create) {
            if (b_create === void 0) { b_create = true; }
            if (mat != null && mat.m_action != this.m_action) {
                //core.core_tiplog("renderavatar project change mat ",this.m_mat.m_action,this.m_action);
                mat.m_graphic.removeSelf();
                core.mat_mgr().delavataractionmaterial(mat);
                mat = null;
            }
            if (mat == null) {
                mat = core.mat_mgr().getavataractionmat(shape, this.m_action);
                //mat.m_graphic.x = this._get_mat_dx();
                //mat.m_graphic.y = this._get_mat_dy();
                if (sp) {
                    sp.addChild(mat.m_graphic);
                }
                //if(this.m_draw_link){
                //    mat.m_graphic.addChild(mat.m_link_sp);
                //}
                mat.changedir(this.m_dir);
            }
            return mat;
        };
        renderavatar_old.prototype.set_scale = function (sx, sy) {
            this.m_sp_center.scale(sx, sy);
        };
        renderavatar_old.prototype._get_mat_dx = function () {
            return this.m_mat_dx;
        };
        renderavatar_old.prototype._get_mat_dy = function () {
            return this.m_mat_dy - this.m_ride_h;
        };
        renderavatar_old.prototype._get_weapon_sp = function (dir, b_mirror) {
            if (b_mirror === void 0) { b_mirror = false; }
            if (dir >= 2 && dir <= 5) {
                return this.m_sp_center_b;
            }
            return this.m_sp_center_f;
        };
        renderavatar_old.prototype._get_wing_sp = function (dir, b_mirror) {
            if (b_mirror === void 0) { b_mirror = false; }
            if (dir >= 2 && dir <= 5) {
                return this.m_sp_center_f;
            }
            return this.m_sp_center_b;
        };
        renderavatar_old.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat != null && this.m_mat.m_action != this.m_action) {
                    this.reset_data();
                }
                if (this.m_aura_adorn != null) {
                    this.m_aura_adorn.load_res();
                }
                if (this.m_title_adorn != null) {
                    this.m_title_adorn.load_res();
                }
                var b_br = true;
                if (this.m_shape_backride != 0) {
                    this.m_mat_backride = this._project_mat(this.m_mat_backride, 5, this.m_shape_backride, this.m_sp_center_rb, this.m_action != 5 /* ACTION_DEAD */);
                    if (!this.m_draw_avatar) {
                        b_br = this.m_mat_backride.m_b_loaded;
                    }
                }
                var b_m = true;
                this.m_mat = this._project_mat(this.m_mat, 0, this.m_shape, this.m_sp_center_c);
                if (!this.m_draw_avatar) {
                    b_m = this.m_mat.m_b_loaded;
                }
                if (this.m_shape_weapon != 0) {
                    this.m_mat_weapon = this._project_mat(this.m_mat_weapon, 1, this.m_shape_weapon, this._get_weapon_sp(this.m_dir));
                }
                if (this.m_shape_wing != 0) {
                    this.m_mat_wing = this._project_mat(this.m_mat_wing, 2, this.m_shape_wing, this._get_wing_sp(this.m_dir));
                }
                var b_fr = true;
                if (this.m_shape_ride != 0) {
                    this.m_mat_ride = this._project_mat(this.m_mat_ride, 3, this.m_shape_ride, this.m_sp_center_rf, this.m_action != 5 /* ACTION_DEAD */);
                    if (!this.m_draw_avatar) {
                        b_fr = this.m_mat_ride.m_b_loaded;
                    }
                }
                if (this.m_shape_hair != 0) {
                    this.m_mat_hair = this._project_mat(this.m_mat_hair, 4, this.m_shape_hair, this.m_sp_center);
                }
                if (!this.m_draw_avatar) {
                    if (b_br && b_m && b_fr) {
                        this.m_draw_avatar = true;
                        this.m_sp_back.removeSelf();
                        this.m_sp_front.removeSelf();
                        this.addChild(this.m_sp_back);
                        this.addChild(this.m_sp_center);
                        this.addChild(this.m_sp_front);
                        this.del_default_sp();
                    }
                }
            }
            return ret;
        };
        renderavatar_old.prototype._update_mat = function (mat, frame) {
            mat.goto_frame(frame);
        };
        renderavatar_old.prototype.update = function (delta) {
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.update(delta);
            }
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            //core.core_tiplog("renderavatar update ",this.m_obj_id,this.m_shape,this.m_dir,this.m_action,this.m_framecurrent,framecount,this.m_framecount);
            if (this.m_b_cycle == false) {
                if (this.m_b_stop_frame == 0) {
                    if (framecount > this.m_framecount - 1) {
                        this.change_action(this.m_lastaction);
                        return;
                    }
                }
                else {
                    var stop_f = this.m_framecount - 1;
                    if (this.m_b_stop_frame != -1) {
                        stop_f = this.m_b_stop_frame;
                    }
                    if (framecount > stop_f) {
                        framecount = stop_f;
                        if (framecount < 0) {
                            framecount = 0;
                        }
                    }
                }
            }
            this.m_framecurrent = framecount % this.m_framecount;
            if (!this.m_draw_avatar) {
                return;
            }
            //this.m_sp_front.graphics.clear();
            //this.m_sp_front.graphics.drawRect(0,0,6,6,"#ff00ff");
            var org_pt = this.m_org_pt;
            if (this.m_mat != null) {
                org_pt = this.m_mat.get_link(this.m_dir, 0, this.m_framecurrent);
                this._update_mat(this.m_mat, this.m_framecurrent);
                this.m_mat.m_graphic.x = this._get_mat_dx();
                this.m_mat.m_graphic.y = this._get_mat_dy();
                //this.m_mat.m_graphic.graphics.clear();
                //this.m_mat.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");
                /*
                if(this.m_draw_link){
                    this.m_mat.m_link_sp.graphics.clear();
                    this.m_mat.m_graphic.addChild(this.m_mat.m_link_sp);
                    let tmpx:number = org_pt.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat.m_link_sp.graphics.drawRect(tmpx,org_pt.y,6,6,"#ff0000");
                    let org_pt1:Laya.Point = this.m_mat.get_link(this.m_dir,3,this.m_framecurrent);
                    tmpx = org_pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat.m_link_sp.graphics.drawRect(tmpx,org_pt1.y,6,6,"#00ff00");
                    org_pt1 = this.m_mat.get_link(this.m_dir,1,this.m_framecurrent);
                    tmpx = org_pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat.m_link_sp.graphics.drawRect(tmpx,org_pt1.y,6,6,"#ff0000");
                    //console.log("body link ",org_pt.x,org_pt.y);
                }
                */
            }
            else {
                return;
            }
            if (this.m_mat_weapon != null) {
                this._update_mat(this.m_mat_weapon, this.m_framecurrent);
                var pt = this.m_mat.get_link(this.m_dir, 3, this.m_framecurrent);
                var pt1 = this.m_mat_weapon.get_link(this.m_dir, 0, this.m_framecurrent);
                if (this.m_mat.m_cur_mirrior) {
                    this.m_mat_weapon.m_graphic.x = this._get_mat_dx() + pt1.x - pt.x;
                }
                else {
                    this.m_mat_weapon.m_graphic.x = this._get_mat_dx() + pt.x - pt1.x;
                }
                this.m_mat_weapon.m_graphic.y = this._get_mat_dy() + pt.y - pt1.y;
                /*
                if(this.m_draw_link){
                    this.m_mat_weapon.m_link_sp.graphics.clear();
                    this.m_mat_weapon.m_graphic.addChild(this.m_mat_weapon.m_link_sp);
                    let tmpx:number = pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat_weapon.m_link_sp.graphics.drawRect(tmpx,pt1.y,6,6,"#000000");
                    //console.log("ride link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
            }
            if (this.m_mat_wing != null) {
                this._update_mat(this.m_mat_wing, this.m_framecurrent);
                var pt = this.m_mat.get_link(this.m_dir, 1, this.m_framecurrent);
                var pt1 = this.m_mat_wing.get_link(this.m_dir, 0, this.m_framecurrent);
                if (this.m_mat.m_cur_mirrior) {
                    this.m_mat_wing.m_graphic.x = this._get_mat_dx() + pt1.x - pt.x;
                }
                else {
                    this.m_mat_wing.m_graphic.x = this._get_mat_dx() + pt.x - pt1.x;
                }
                this.m_mat_wing.m_graphic.y = this._get_mat_dy() + pt.y - pt1.y;
                /*
                if(this.m_draw_link){
                    this.m_mat_wing.m_link_sp.graphics.clear();
                    this.m_mat_wing.m_graphic.addChild(this.m_mat_wing.m_link_sp);
                    let tmpx:number = pt1.x;
                    if(this.m_mat.m_cur_mirrior){
                        //tmpx = 512 - tmpx;
                    }
                    this.m_mat_wing.m_link_sp.graphics.drawRect(tmpx,pt1.y,6,6,"#ffffff");
                    //console.log("ride link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
            }
            this.m_sp_center_b.x = 0;
            this.m_sp_center_b.y = 0;
            this.m_sp_center_c.x = 0;
            this.m_sp_center_c.y = 0;
            this.m_sp_center_f.x = 0;
            this.m_sp_center_f.y = 0;
            if (this.m_mat_ride != null) {
                this._update_mat(this.m_mat_ride, this.m_framecurrent);
                var pt = this.m_mat_ride.get_link(this.m_dir, 3, this.m_framecurrent);
                var pt1 = this.m_mat_ride.get_link(this.m_dir, 0, this.m_framecurrent);
                this.m_mat_ride.m_graphic.x = this._get_mat_dx(); // + pt1.x - pt.x - (pt1.x-org_pt.x);
                this.m_mat_ride.m_graphic.y = this._get_mat_dy(); // + pt1.y - pt.y - (pt1.y -org_pt.y);
                /*
                if(this.m_draw_link){
                    this.m_mat_ride.m_link_sp.graphics.clear();
                    this.m_mat_ride.m_graphic.addChild(this.m_mat_ride.m_link_sp);
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt.x,pt.y,2,2,"#ff0000");
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt1.x,pt1.y,2,2,"#00ff00");
                    //console.log("ride link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
            }
            if (this.m_mat_backride != null) {
                this._update_mat(this.m_mat_backride, this.m_framecurrent);
                var pt = this.m_mat_backride.get_link(this.m_dir, 3, this.m_framecurrent);
                var pt1 = this.m_mat_backride.get_link(this.m_dir, 0, this.m_framecurrent);
                this.m_mat_backride.m_graphic.x = this._get_mat_dx(); // + pt1.x - pt.x- (pt1.x-org_pt.x);
                this.m_mat_backride.m_graphic.y = this._get_mat_dy(); // + pt1.y - pt.y- (pt1.y -org_pt.y);
                /*
                if(this.m_draw_link){
                    this.m_mat_ride.m_link_sp.graphics.clear();
                    this.m_mat_ride.m_graphic.addChild(this.m_mat_ride.m_link_sp);
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt.x,pt.y,4,4,"#00ff00");
                    this.m_mat_ride.m_link_sp.graphics.drawRect(pt1.x,pt1.y,4,4,"#ff0000");
                    //console.log("rideback  link ",pt.x,pt.y,pt1.x,pt1.y,org_pt.x,org_pt.y);
                }
                */
                var rb_dx = pt.x - pt1.x;
                if (this.m_mat.m_cur_mirrior) {
                    rb_dx = pt1.x - pt.x;
                }
                var rb_dy = pt.y - pt1.y + pt1.y - org_pt.y;
                this.m_sp_center_b.x = rb_dx;
                this.m_sp_center_b.y = rb_dy;
                this.m_sp_center_c.x = rb_dx;
                this.m_sp_center_c.y = rb_dy;
                this.m_sp_center_f.x = rb_dx;
                this.m_sp_center_f.y = rb_dy;
            }
            if (this.m_mat_hair != null) {
                this._update_mat(this.m_mat_hair, this.m_framecurrent);
                var pt = this.m_mat.get_link(this.m_dir, 2, this.m_framecurrent);
                var pt1 = this.m_mat_hair.get_link(this.m_dir, 0, this.m_framecurrent);
                if (this.m_mat.m_cur_mirrior) {
                    this.m_mat_hair.m_graphic.x = this._get_mat_dx() + pt1.x - pt.x;
                }
                else {
                    this.m_mat_hair.m_graphic.x = this._get_mat_dx() + pt.x - pt1.x;
                }
                this.m_mat_hair.m_graphic.y = this._get_mat_dy() + pt.y - pt1.y;
            }
        };
        //从parent里把自己移除?
        renderavatar_old.prototype.is_contain = function (x, y) {
            var ret = _super.prototype.is_contain.call(this, x, y);
            if (ret) {
                var rt = null;
                ret = false;
                var rx = void 0;
                var ry = void 0;
                var w = void 0;
                var h = void 0;
                if (this.m_mat != null) {
                    rt = this.m_mat.get_rect();
                    if (rt != null) {
                        rx = this.x + this.m_mat.m_graphic.x - this.m_aw / 2 + rt.x - this._get_mat_dx();
                        ry = this.y + this.m_mat.m_graphic.y - this.m_ah / 2 + rt.y - this._get_mat_dy() - this.m_ride_h;
                        if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                            ret = true;
                        }
                    }
                }
                if (!ret && this.m_mat_weapon != null) {
                    rt = this.m_mat_weapon.get_rect();
                    if (rt != null) {
                        rx = this.x + this.m_mat_weapon.m_graphic.x - this.m_aw / 2 + rt.x - this._get_mat_dx();
                        ry = this.y + this.m_mat_weapon.m_graphic.y - this.m_ah / 2 + rt.y - this._get_mat_dy() - this.m_ride_h;
                        if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                            ret = true;
                        }
                    }
                }
                if (!ret && this.m_mat_wing != null) {
                    rt = this.m_mat_wing.get_rect();
                    if (rt != null) {
                        rx = this.x + this.m_mat_wing.m_graphic.x - this.m_aw / 2 + rt.x - this._get_mat_dx();
                        ry = this.y + this.m_mat_wing.m_graphic.y - this.m_ah / 2 + rt.y - this._get_mat_dy() - this.m_ride_h;
                        if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                            ret = true;
                        }
                    }
                }
                if (!ret && this.m_mat_ride != null) {
                    rt = this.m_mat_ride.get_rect();
                    if (rt != null) {
                        rx = this.x + this.m_mat_ride.m_graphic.x - this.m_aw / 2 + rt.x - this._get_mat_dx();
                        ry = this.y + this.m_mat_ride.m_graphic.y - this.m_ah / 2 + rt.y - this._get_mat_dy() - this.m_ride_h;
                        if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height) && rt.width != 512) {
                            ret = true;
                        }
                    }
                }
                if (!ret && this.m_mat_backride != null) {
                    rt = this.m_mat_backride.get_rect();
                    if (rt != null) {
                        rx = this.x + this.m_mat_backride.m_graphic.x - this.m_aw / 2 + rt.x - this._get_mat_dx();
                        ry = this.y + this.m_mat_backride.m_graphic.y - this.m_ah / 2 + rt.y - this._get_mat_dy() - this.m_ride_h;
                        if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height) && rt.width != 512) {
                            ret = true;
                        }
                    }
                }
                if (!ret && this.m_mat_hair != null) {
                    rt = this.m_mat_hair.get_rect();
                    if (rt != null) {
                        rx = this.x + this.m_mat_hair.m_graphic.x - this.m_aw / 2 + rt.x - this._get_mat_dx();
                        ry = this.y + this.m_mat_hair.m_graphic.y - this.m_ah / 2 + rt.y - this._get_mat_dy() - this.m_ride_h;
                        if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                            ret = true;
                        }
                    }
                }
            }
            return ret;
        };
        renderavatar_old.prototype.create_default_sp = function () {
            if (this.m_default_sp == null) {
                this.m_default_sp = utils.getitembycls("renderavatar_default", renderavatar_default);
                this.addChild(this.m_default_sp);
                this.m_default_sp.y = -120;
                this.m_default_sp.x = -26;
            }
        };
        renderavatar_old.prototype.del_default_sp = function () {
            if (this.m_default_sp != null) {
                this.m_default_sp.removeSelf();
                utils.recover("renderavatar_default", this.m_default_sp);
                this.m_default_sp = null;
            }
        };
        renderavatar_old.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_shadow_sp != null) {
                this.m_shadow_sp.removeSelf();
                utils.recover("renderavatar_shadow", this.m_shadow_sp);
                this.m_shadow_sp = null;
            }
            this.del_default_sp();
            if (this.m_sp_back != null) {
                this.m_sp_back.removeChildren();
                this.m_sp_back = null;
            }
            if (this.m_sp_front != null) {
                this.m_sp_front.removeChildren();
                this.m_sp_front = null;
            }
            if (this.m_sp_center != null) {
                this.m_sp_center.removeChildren();
                this.m_sp_center = null;
            }
            if (this.m_sp_center_c != null) {
                this.m_sp_center_c.removeChildren();
                this.m_sp_center_c = null;
            }
            if (this.m_sp_center_b != null) {
                this.m_sp_center_b.removeChildren();
                this.m_sp_center_b = null;
            }
            if (this.m_sp_center_f != null) {
                this.m_sp_center_f.removeChildren();
                this.m_sp_center_f = null;
            }
            if (this.m_sp_center_rb != null) {
                this.m_sp_center_rb.removeChildren();
                this.m_sp_center_rb = null;
            }
            if (this.m_sp_center_rf != null) {
                this.m_sp_center_rf.removeChildren();
                this.m_sp_center_rf = null;
            }
            if (this.m_aura_id != 0) {
                this.change_aura(0);
            }
            if (this.m_title_id != 0) {
                this.change_title(0);
            }
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_adorn_list.length = 0;
            this.removeChildren();
            if (this.m_name_sp != null) {
                this.m_name_sp.dispose();
                utils.recover("avatarname", this.m_name_sp);
                this.m_name_sp = null;
            }
            this.del_hp();
            this.del_buffui();
            if (this.m_mat != null) {
                core.mat_mgr().delavataractionmaterial(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_mat_weapon != null) {
                core.mat_mgr().delavataractionmaterial(this.m_mat_weapon);
                this.m_mat_weapon = null;
            }
            if (this.m_mat_wing != null) {
                core.mat_mgr().delavataractionmaterial(this.m_mat_wing);
                this.m_mat_wing = null;
            }
            if (this.m_mat_ride != null) {
                core.mat_mgr().delavataractionmaterial(this.m_mat_ride);
                this.m_mat_ride = null;
            }
            if (this.m_mat_backride != null) {
                core.mat_mgr().delavataractionmaterial(this.m_mat_backride);
                this.m_mat_backride = null;
            }
            if (this.m_mat_hair != null) {
                core.mat_mgr().delavataractionmaterial(this.m_mat_hair);
                this.m_mat_hair = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("avatarcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return renderavatar_old;
    }(core.renderobject));
    core.renderavatar_old = renderavatar_old;
    //////////////////////////////////////////////////////////////////////////////////////
    var renderavatar_new = /** @class */ (function (_super) {
        __extends(renderavatar_new, _super);
        function renderavatar_new() {
            var _this = _super.call(this) || this;
            _this.m_designw = 512;
            _this.m_designh = 512;
            _this.m_shape = 0;
            _this.m_shape_weapon = 0;
            _this.m_shape_wing = 0;
            _this.m_shape_ride = 0;
            _this.m_shape_backride = 0;
            _this.m_shape_hair = 0;
            _this.m_aura_id = 0;
            _this.m_aura_adorn = null;
            _this.m_title_id = 0;
            _this.m_title_adorn = null;
            _this.m_action = 0;
            _this.m_lastaction = 0;
            _this.m_dir = 0;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_mat_dx = 0; //-256;
            _this.m_mat_dy = -_this.m_designh / 2; //-256;
            _this.m_ride_h = 0;
            _this.m_user_data = 0;
            _this.m_name = "";
            _this.m_name_dx = 0;
            _this.m_name_dy = 0;
            _this.m_name_sp = null;
            _this.m_hp = null;
            _this.m_buff = null;
            _this.m_buffeff_list = new Array();
            _this.m_eff_list = new Array();
            _this.m_b_cycle = true;
            _this.m_b_stop_frame = -1;
            _this.m_sp_front = null;
            _this.m_sp_back = null;
            _this.m_sp_center = null;
            _this.m_adorn_list = new Array();
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_org_pt = new Laya.Point(0, 0);
            _this.m_shadow_sp = null;
            _this.m_default_sp = null;
            _this.m_draw_avatar = false;
            _this.m_use_default = true;
            _this.m_b_projected = false;
            _this.m_draw_link = false;
            _this.m_mat_rt = new Laya.Rectangle();
            _this.m_weapon_behind = false;
            _this.m_mat_weapon_rt = new Laya.Rectangle();
            _this.m_mat_wing_rt = new Laya.Rectangle();
            _this.m_mat_ride_rt = new Laya.Rectangle();
            _this.m_mat_backeride_rt = new Laya.Rectangle();
            _this.m_mat_hair_rt = new Laya.Rectangle();
            return _this;
        }
        renderavatar_new.prototype.re_init = function (shape, x, y, use_default) {
            if (use_default === void 0) { use_default = true; }
            this.set_id();
            this.scale(1.0, 1.0);
            this.alpha = 1.0;
            this.m_draw_link = false;
            this.m_name_dx = 0;
            this.m_name_dy = 0;
            this.m_sp_front = new Laya.Sprite();
            this.m_sp_back = new Laya.Sprite();
            this.m_sp_center = new Laya.Sprite();
            this.m_shadow_sp = core.mat_mgr().get_avatar_shadow_mat();
            this.set_ride_h(0);
            this.m_mat_dy = -this.m_designh / 2;
            this.m_use_default = use_default;
            if (this.m_use_default) {
                this.m_draw_avatar = false;
                this.create_default_sp();
            }
            else {
                this.m_draw_avatar = true;
            }
            this.m_dx = 0;
            this.m_dy = 0;
            //avatarcmdnew
            //this.addChild(this.m_sp_back);
            //this.addChild(this.m_sp_center);
            //this.addChild(this.m_sp_front);
            this.m_shape = shape;
            this.rotation = 0;
            this.alpha = 1;
            //avatarcmdnew
            this.m_rc = utils.getitembycls("avatarcommand_new", core.avatarcommand_new);
            //this.m_rc = utils.getitembycls("avatarcommand",avatarcommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            if (this.m_mat != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat);
            }
            this.m_mat = null; //only start to load when it is projected 
            if (this.m_mat_weapon != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_weapon);
            }
            this.m_mat_weapon = null;
            if (this.m_mat_wing != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_wing);
            }
            this.m_mat_wing = null;
            if (this.m_mat_ride != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_ride);
            }
            this.m_mat_ride = null;
            if (this.m_mat_backride != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_backride);
            }
            this.m_mat_backride = null;
            if (this.m_mat_hair != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_hair);
            }
            this.m_mat_hair = null;
            this.m_weapon_behind = false;
            this.m_shape_weapon = 0;
            this.m_shape_wing = 0;
            this.m_shape_ride = 0;
            this.m_shape_backride = 0;
            this.m_shape_hair = 0;
            this.m_aura_id = 0;
            this.m_aura_adorn = null;
            this.m_title_id = 0;
            this.m_title_adorn = null;
            this.m_buffeff_list = new Array();
            this.m_eff_list = new Array();
            this.reset_data();
            this.graphics.clear();
        };
        renderavatar_new.prototype.show_shadow = function (flag) {
            if (flag) {
                this.m_shadow_sp = core.mat_mgr().get_avatar_shadow_mat();
            }
            else {
                this.m_shadow_sp = null;
            }
        };
        renderavatar_new.prototype.set_dxy = function (x, y) {
            this.m_dx = x;
            this.m_dy = y;
            this.m_sp_front.x = this.m_dx;
            this.m_sp_front.y = this.m_dy;
            this.m_sp_center.x = this.m_dx;
            this.m_sp_center.y = this.m_dy;
            this.m_sp_back.x = this.m_dx;
            this.m_sp_back.y = this.m_dy;
        };
        renderavatar_new.prototype.change_shape = function (shape) {
            if (shape == this.m_shape) {
                return;
            }
            this.m_shape = shape;
            this.reset_data();
            if (this.m_use_default) {
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        };
        renderavatar_new.prototype.change_weapon = function (shape, behind_body) {
            if (behind_body === void 0) { behind_body = false; }
            if (shape == this.m_shape_weapon) {
                return;
            }
            this.m_shape_weapon = shape;
            this.m_weapon_behind = behind_body;
        };
        renderavatar_new.prototype.change_wing = function (shape) {
            if (shape == this.m_shape_wing) {
                return;
            }
            this.m_shape_wing = shape;
        };
        renderavatar_new.prototype.change_ride = function (shape, backshape) {
            if (shape == this.m_shape_ride) {
                return;
            }
            this.m_shape_ride = shape;
            this.m_shape_backride = backshape;
            if (this.m_use_default) {
                this.m_draw_avatar = false;
                this.create_default_sp();
                this.m_sp_center.removeSelf();
            }
        };
        renderavatar_new.prototype.set_ride_h = function (v) {
            this.m_ride_h = v;
        };
        renderavatar_new.prototype.change_hair = function (shape) {
            if (shape == this.m_shape_hair) {
                return;
            }
            this.m_shape_hair = shape;
        };
        renderavatar_new.prototype.change_aura = function (shape) {
            if (this.m_aura_id != 0) {
                this.del_adorn(this.m_aura_id);
                this.m_aura_adorn = null;
                this.m_aura_id = 0;
            }
            if (shape == 0) {
                return;
            }
            var aura_adorn = utils.getitembycls("avatar_aura_new", avatar_aura_new);
            aura_adorn.re_init(shape);
            this.m_aura_id = aura_adorn.m_id;
            this.m_aura_adorn = aura_adorn;
            this.add_adorn(aura_adorn, true);
        };
        renderavatar_new.prototype.change_title = function (shape) {
            if (this.m_title_id != 0) {
                this.del_adorn(this.m_title_id);
                this.m_title_adorn = null;
                this.m_title_id = 0;
            }
            if (shape == 0) {
                return;
            }
            var aura_adorn = utils.getitembycls("avatar_aura_new", avatar_aura_new);
            aura_adorn.re_init(shape);
            this.m_title_id = aura_adorn.m_id;
            this.m_title_adorn = aura_adorn;
            this.add_adorn(aura_adorn, false);
        };
        renderavatar_new.prototype.reset_data = function () {
            this.m_aw = core.matinfo_mgr().getavataractionw(this.m_shape, this.m_action);
            this.m_ah = core.matinfo_mgr().getavataractionh(this.m_shape, this.m_action);
            this.m_mat_dy = -this.m_ah / 2;
            this.m_framecount = core.matinfo_mgr().getavataractionframecount(this.m_shape, this.m_action);
            this.m_framespeed = core.matinfo_mgr().getavataractionframespeed(this.m_shape, this.m_action);
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            this.m_framecurrenttm = 0;
            this.m_box.setTo(this.x - this.m_aw / 2, this.y - this.m_ah / 2, this.m_aw, this.m_ah);
            core.core_tiplog("renderavatar resetdata ", this.m_obj_id, this.m_shape, this.m_dir, this.m_action, this.m_framecount);
        };
        renderavatar_new.prototype.set_name = function (name) {
            this.m_name = name;
            //todo
            if (this.m_name_sp == null) {
                this.m_name_sp = utils.getitembycls("avatarname", core.avatarname);
                this.m_name_sp.re_init();
                //this.m_sp_front.addChild(this.m_name_sp);
            }
            this.m_name_sp.m_text.text = this.m_name;
            if (this.m_name.length > 0) {
                //this.m_sp_front.addChild(this.m_name_sp);
            }
            else {
                this.m_name_sp.removeSelf();
            }
        };
        renderavatar_new.prototype.set_name_dxy = function (x, y) {
            this.m_name_dx = x;
            this.m_name_dy = y;
            if (this.m_name_sp != null) {
                this.m_name_sp.x = x;
                this.m_name_sp.y = y;
            }
        };
        renderavatar_new.prototype.set_dy = function (dy) {
            this.m_mat_dy = dy - this.m_ah / 2;
        };
        renderavatar_new.prototype.set_dx = function (dx) {
            this.m_mat_dx = dx;
        };
        renderavatar_new.prototype.get_buffui = function () {
            if (this.m_buff == null) {
                this.m_buff = utils.getitembycls("avatarbuffui", core.avatarbuffui);
                this.m_buff.re_init();
                this.addChild(this.m_buff);
            }
            return this.m_buff;
        };
        renderavatar_new.prototype.del_buffui = function () {
            if (this.m_buff != null) {
                this.m_buff.removeSelf();
                this.m_buff.clear();
                utils.recover("avatarbuffui", this.m_buff);
                this.m_buff = null;
            }
        };
        renderavatar_new.prototype.addeff = function (eff_id, b_front, dx, dy) {
            if (b_front === void 0) { b_front = true; }
            if (dx === void 0) { dx = 0; }
            if (dy === void 0) { dy = 0; }
            if (eff_id == 0) {
                return;
            }
            var aura_adorn = utils.getitembycls("avatar_aura_new", avatar_aura_new);
            aura_adorn.re_init(eff_id);
            aura_adorn.m_dx = dx;
            aura_adorn.m_dy = dy;
            var id = aura_adorn.m_id;
            this.add_adorn(aura_adorn, !b_front);
            this.m_eff_list.push(aura_adorn);
            return id;
        };
        renderavatar_new.prototype.del_eff = function (eff_id) {
            for (var i = 0; i < this.m_eff_list.length; ++i) {
                var b = this.m_eff_list[i];
                if (b.m_id == eff_id) {
                    this.del_adorn(b.m_id);
                    this.m_eff_list.splice(i, 1);
                    return;
                }
            }
        };
        renderavatar_new.prototype.clearall_eff = function () {
            for (var _i = 0, _a = this.m_eff_list; _i < _a.length; _i++) {
                var i = _a[_i];
                this.del_adorn(i.m_id);
            }
            this.m_eff_list = new Array();
        };
        renderavatar_new.prototype.add_buffeff = function (eff_id) {
            if (eff_id == 0) {
                return;
            }
            var aura_adorn = utils.getitembycls("avatar_aura_new", avatar_aura_new);
            aura_adorn.re_init(eff_id);
            var id = aura_adorn.m_id;
            this.add_adorn(aura_adorn, false);
            this.m_buffeff_list.push(aura_adorn);
            return id;
        };
        renderavatar_new.prototype.del_buffeff = function (buff_eff_id) {
            for (var i = 0; i < this.m_buffeff_list.length; ++i) {
                var b = this.m_buffeff_list[i];
                if (b.m_id == buff_eff_id) {
                    this.del_adorn(b.m_id);
                    this.m_buffeff_list.splice(i, 1);
                    return;
                }
            }
        };
        renderavatar_new.prototype.clearall_buffeff = function () {
            for (var _i = 0, _a = this.m_buffeff_list; _i < _a.length; _i++) {
                var i = _a[_i];
                this.del_adorn(i.m_id);
            }
            this.m_buffeff_list = new Array();
        };
        renderavatar_new.prototype.set_hp = function (v, m) {
            if (this.m_hp == null) {
                this.m_hp = utils.getitembycls("avatarhp", core.avatarhp);
                this.m_hp.re_init();
                this.addChild(this.m_hp);
                this.m_hp.x = 0 - (this.m_hp.m_w / 2);
                this.m_hp.y = -120;
            }
            this.m_hp.set_v(v, m);
        };
        renderavatar_new.prototype.del_hp = function () {
            if (this.m_hp != null) {
                this.m_hp.removeSelf();
                this.m_hp.clear();
                utils.recover("avatarhp", this.m_hp);
                this.m_hp = null;
            }
        };
        renderavatar_new.prototype.add_adorn = function (sp, b_back) {
            this.del_adorn(sp.m_id);
            if (b_back) {
                //this.m_sp_back.addChild(sp);
            }
            else {
                //this.m_sp_front.addChild(sp);
            }
            sp.m_front = !b_back;
            this.m_adorn_list.push(sp);
            return sp.m_id;
        };
        renderavatar_new.prototype.get_adorn = function (id) {
            var idx = 0;
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == id) {
                    return i;
                }
                idx++;
            }
            return null;
        };
        renderavatar_new.prototype.del_adorn = function (id) {
            var idx = 0;
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == id) {
                    i.removeSelf();
                    i.dispose();
                    this.m_adorn_list.splice(idx, 1);
                    return;
                }
                idx++;
            }
        };
        renderavatar_new.prototype.change_action = function (action, b_cycle, stop_f) {
            if (b_cycle === void 0) { b_cycle = true; }
            if (stop_f === void 0) { stop_f = -1; }
            core.core_tiplog("renderavatar change_action ", this.m_obj_id, this.m_shape, this.m_action, action, this.m_dir);
            var b_changed = this.m_action != action;
            this.m_lastaction = this.m_action;
            this.m_action = action;
            this.reset_data();
            this.m_b_cycle = b_cycle;
            this.m_b_stop_frame = stop_f;
            b_changed = false; //very ugly,dont changed
            if (b_changed) {
                if (this.m_use_default) {
                    this.m_draw_avatar = false;
                    this.m_sp_center.removeSelf();
                    this.create_default_sp();
                }
            }
        };
        renderavatar_new.prototype.change_dir = function (dir) {
            if (dir == this.m_dir) {
                return;
            }
            this.m_dir = dir;
            //
        };
        renderavatar_new.prototype._project_mat = function (mat, cur_shape) {
            if (mat != null && (mat.m_action != this.m_action || mat.m_shape != cur_shape)) {
                //core.core_tiplog("renderavatar project change mat ",this.m_mat.m_action,this.m_action);
                core.mat_mgr().dellavatarmaterial(mat);
                mat = null;
            }
            if (mat == null) {
                mat = core.mat_mgr().getlavatarmat(cur_shape, this.m_action);
            }
            return mat;
        };
        renderavatar_new.prototype.set_scale = function (sx, sy) {
            this.scale(sx, sy);
        };
        renderavatar_new.prototype._get_mat_dx = function () {
            return this.m_mat_dx;
        };
        renderavatar_new.prototype._get_mat_dy = function () {
            return this.m_mat_dy - this.m_ride_h;
        };
        renderavatar_new.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            this.m_b_projected = ret;
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat != null && (this.m_mat.m_action != this.m_action || this.m_mat.m_shape != this.m_shape)) {
                    this.reset_data();
                }
                if (this.m_aura_adorn != null) {
                    this.m_aura_adorn.load_res();
                }
                if (this.m_title_adorn != null) {
                    this.m_title_adorn.load_res();
                }
                for (var _i = 0, _a = this.m_buffeff_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.load_res();
                }
                for (var _b = 0, _c = this.m_eff_list; _b < _c.length; _b++) {
                    var i = _c[_b];
                    i.load_res();
                }
                var b_br = true;
                if (this.m_shape_backride != 0) {
                    this.m_mat_backride = this._project_mat(this.m_mat_backride, this.m_shape_backride);
                    if (!this.m_draw_avatar) {
                        b_br = this.m_mat_backride.m_b_loaded;
                    }
                }
                var b_m = true;
                this.m_mat = this._project_mat(this.m_mat, this.m_shape);
                if (!this.m_draw_avatar) {
                    b_m = this.m_mat.m_b_loaded;
                }
                if (this.m_shape_weapon != 0) {
                    this.m_mat_weapon = this._project_mat(this.m_mat_weapon, this.m_shape_weapon);
                }
                if (this.m_shape_wing != 0) {
                    this.m_mat_wing = this._project_mat(this.m_mat_wing, this.m_shape_wing);
                }
                var b_fr = true;
                if (this.m_shape_ride != 0) {
                    this.m_mat_ride = this._project_mat(this.m_mat_ride, this.m_shape_ride);
                    if (!this.m_draw_avatar) {
                        b_fr = this.m_mat_ride.m_b_loaded;
                    }
                }
                if (this.m_shape_hair != 0) {
                    this.m_mat_hair = this._project_mat(this.m_mat_hair, this.m_shape_hair);
                }
                if (!this.m_draw_avatar) {
                    if (b_br && b_m && b_fr) {
                        this.m_draw_avatar = true;
                        this.m_sp_back.removeSelf();
                        this.m_sp_front.removeSelf();
                        //avatarcmdnew
                        //this.addChild(this.m_sp_back);
                        //this.addChild(this.m_sp_center);
                        //this.addChild(this.m_sp_front);
                        this.del_default_sp();
                    }
                }
            }
            return ret;
        };
        //
        ////
        renderavatar_new.prototype._draw_mat = function (mat, link_idx, rt, dx, dy, b_body_mirrior, body_link_dir) {
            if (mat != null && mat.m_b_loaded) {
                var link_dir = this.m_dir;
                var b_mirrior = mat.m_dir_tex[this.m_dir].m_b_mirror;
                var drawx = dx;
                var drawy = dy;
                if (b_mirrior) {
                    link_dir = mat.m_dir_tex[this.m_dir].m_use_dir;
                }
                var pt = this.m_mat.get_link(body_link_dir, link_idx, this.m_framecurrent);
                var pt1 = mat.get_link(link_dir, 0, this.m_framecurrent);
                if (b_mirrior) {
                    if (b_body_mirrior) {
                        drawx = dx + (this.m_aw - pt1.x) - (this.m_aw - pt.x);
                    }
                    else {
                        drawx = dx + (this.m_aw - pt1.x) - pt.x;
                    }
                }
                else {
                    if (b_body_mirrior) {
                        drawx = dx + pt1.x - (this.m_aw - pt.x);
                    }
                    else {
                        drawx = dx + pt1.x - pt.x;
                    }
                }
                drawy = dy + pt.y - pt1.y;
                var tex = void 0;
                var matf = void 0;
                matf = mat.m_dir_tex[this.m_dir];
                //tex = matf.m_frames[this.m_framecurrent].m_tex;
                tex = matf.get_texture(this.m_framecurrent);
                if (tex) {
                    this.graphics.drawTexture(tex, drawx, drawy, mat.m_width, mat.m_height, matf.m_matrix);
                    rt.x = drawx + tex.offsetX;
                    if (b_mirrior) {
                        rt.x = drawx + tex.sourceWidth - tex.offsetX - tex.width;
                    }
                    rt.y = drawy + tex.offsetY;
                    rt.width = tex.width;
                    rt.height = tex.height;
                }
            }
            return rt;
        };
        ////
        renderavatar_new.prototype.update = function (delta) {
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.update(delta);
            }
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            //core.core_tiplog("renderavatar update ",this.m_obj_id,this.m_shape,this.m_dir,this.m_action,this.m_framecurrent,framecount,this.m_framecount);
            if (this.m_b_cycle == false) {
                if (this.m_b_stop_frame == 0) {
                    if (framecount > this.m_framecount - 1) {
                        this.change_action(this.m_lastaction);
                        return;
                    }
                }
                else {
                    var stop_f = this.m_framecount - 1;
                    if (this.m_b_stop_frame != -1) {
                        stop_f = this.m_b_stop_frame;
                    }
                    if (framecount > stop_f) {
                        framecount = stop_f;
                        if (framecount < 0) {
                            framecount = 0;
                        }
                    }
                }
            }
            this.m_framecurrent = framecount % this.m_framecount;
            if (!this.m_draw_avatar) {
                return;
            }
            if (!this.m_b_projected) {
                return;
            }
            this.graphics.clear();
            this.m_sp_back.graphics.clear();
            if (this.m_mat == null || this.m_mat.m_b_loaded == false) {
                return;
            }
            //if(this.m_aura_adorn != null){
            //this.m_aura_adorn.draw2sp(this.m_sp_back,0,0);
            //}
            var org_pt = this.m_org_pt;
            var tmp_pt = new Laya.Point();
            var dx = 0;
            var dy = 0;
            var rdx = 0;
            var rdy = 0;
            var drawx = 0;
            var drawy = 0;
            var b_mirrior = false;
            var pivot_x = -this.m_aw / 2;
            dx = this._get_mat_dx() + pivot_x;
            dy = this._get_mat_dy();
            var link_dir = this.m_dir;
            var b_body_mirrior = this.m_mat.m_dir_tex[this.m_dir].m_b_mirror;
            var body_link_dir = this.m_dir;
            if (b_body_mirrior) {
                body_link_dir = this.m_mat.m_dir_tex[this.m_dir].m_use_dir;
            }
            var tmp_org_pt = this.m_mat.get_link(body_link_dir, 0, this.m_framecurrent);
            if (b_body_mirrior) {
                org_pt.x = this.m_aw - tmp_org_pt.x;
            }
            else {
                org_pt.x = tmp_org_pt.x;
            }
            org_pt.y = tmp_org_pt.y;
            var tex;
            var mat;
            var matf;
            for (var _b = 0, _c = this.m_eff_list; _b < _c.length; _b++) {
                var i = _c[_b];
                i.draw2sp(this, this.m_dx, this.m_dy, false);
            }
            //
            if (this.m_mat_backride != null && this.m_mat_backride.m_b_loaded) {
                link_dir = this.m_dir;
                b_mirrior = this.m_mat_backride.m_dir_tex[this.m_dir].m_b_mirror;
                if (b_mirrior) {
                    link_dir = this.m_mat_backride.m_dir_tex[this.m_dir].m_use_dir;
                }
                mat = this.m_mat_backride;
                matf = mat.m_dir_tex[this.m_dir];
                var pt = this.m_mat_backride.get_link(link_dir, 3, this.m_framecurrent);
                var pt1 = this.m_mat_backride.get_link(link_dir, 0, this.m_framecurrent);
                rdx = pt.x - pt1.x;
                if (b_mirrior) {
                    rdx = pt1.x - pt.x;
                    //drawx = dx+rdx+mat.m_width;
                }
                rdy = pt.y - org_pt.y; //-(512-pt.y - (512-org_pt.y))
                if (b_mirrior) {
                    drawx = dx + rdx + (this.m_aw - pt.x) - org_pt.x + this.m_dx;
                }
                else {
                    drawx = dx + rdx + pt.x - org_pt.x + this.m_dx;
                }
                drawy = dy + this.m_dy;
                //tex = matf.m_frames[this.m_framecurrent].m_tex;
                tex = matf.get_texture(this.m_framecurrent);
                if (tex) {
                    this.graphics.drawTexture(tex, drawx, drawy, mat.m_width, mat.m_height, matf.m_matrix);
                    this.m_mat_backeride_rt.x = drawx + tex.offsetX;
                    if (b_mirrior) {
                        this.m_mat_backeride_rt.x = drawx + tex.sourceWidth - tex.offsetX - tex.width;
                    }
                    this.m_mat_backeride_rt.y = drawy + tex.offsetY;
                    this.m_mat_backeride_rt.width = tex.width;
                    this.m_mat_backeride_rt.height = tex.height;
                }
            }
            //
            if (this.m_dir >= 2 && this.m_dir <= 5) {
                if (!this.m_weapon_behind) {
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon, 3, this.m_mat_weapon_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
                }
            }
            else {
                if (this.m_weapon_behind) {
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon, 3, this.m_mat_weapon_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
                }
                this.m_mat_wing_rt = this._draw_mat(this.m_mat_wing, 1, this.m_mat_wing_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
            }
            mat = this.m_mat;
            matf = mat.m_dir_tex[this.m_dir];
            //tex = matf.m_frames[this.m_framecurrent].m_tex;
            tex = matf.get_texture(this.m_framecurrent);
            if (tex) {
                this.graphics.drawTexture(tex, dx + rdx + this.m_dx, dy + rdy + this.m_dy, mat.m_width, mat.m_height, matf.m_matrix);
                this.m_mat_rt.x = dx + rdx + tex.offsetX + this.m_dx;
                if (b_mirrior) {
                    this.m_mat_rt.x = dx + rdx + tex.sourceWidth - tex.offsetX - tex.width + this.m_dx;
                }
                this.m_mat_rt.y = dy + rdy + tex.offsetY + this.m_dy;
                this.m_mat_rt.width = tex.width;
                this.m_mat_rt.height = tex.height;
            }
            if (this.m_dir >= 2 && this.m_dir <= 5) {
                if (this.m_weapon_behind) {
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon, 3, this.m_mat_weapon_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
                }
                this.m_mat_wing_rt = this._draw_mat(this.m_mat_wing, 1, this.m_mat_wing_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
            }
            else {
                if (!this.m_weapon_behind) {
                    this.m_mat_weapon_rt = this._draw_mat(this.m_mat_weapon, 3, this.m_mat_weapon_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
                }
            }
            if (this.m_mat_ride != null && this.m_mat_ride.m_b_loaded) {
                link_dir = this.m_dir;
                b_mirrior = this.m_mat_ride.m_dir_tex[this.m_dir].m_b_mirror;
                if (b_mirrior) {
                    link_dir = this.m_mat_ride.m_dir_tex[this.m_dir].m_use_dir;
                }
                var pt = this.m_mat_ride.get_link(link_dir, 3, this.m_framecurrent);
                var pt1 = this.m_mat_ride.get_link(link_dir, 0, this.m_framecurrent);
                if (b_mirrior) {
                    drawx = dx + rdx + (this.m_aw - pt.x) - org_pt.x + this.m_dx;
                }
                else {
                    drawx = dx + rdx + pt.x - org_pt.x + this.m_dx;
                }
                drawy = dy + this.m_dy;
                mat = this.m_mat_ride;
                matf = mat.m_dir_tex[this.m_dir];
                //tex = matf.m_frames[this.m_framecurrent].m_tex;
                tex = matf.get_texture(this.m_framecurrent);
                if (tex) {
                    this.graphics.drawTexture(tex, drawx, drawy, mat.m_width, mat.m_height, matf.m_matrix);
                    this.m_mat_ride_rt.x = drawx + tex.offsetX;
                    if (b_mirrior) {
                        this.m_mat_ride_rt.x = drawy + tex.sourceWidth - tex.offsetX - tex.width;
                    }
                    this.m_mat_ride_rt.y = drawy + tex.offsetY;
                    this.m_mat_ride_rt.width = tex.width;
                    this.m_mat_ride_rt.height = tex.height;
                }
            }
            this.m_mat_hair_rt = this._draw_mat(this.m_mat_hair, 2, this.m_mat_hair_rt, dx + rdx + this.m_dx, dy + rdy + this.m_dy, b_body_mirrior, body_link_dir);
            for (var _d = 0, _e = this.m_buffeff_list; _d < _e.length; _d++) {
                var i = _e[_d];
                i.draw2sp(this, this.m_dx, this.m_dy, true);
            }
            for (var _f = 0, _g = this.m_eff_list; _f < _g.length; _f++) {
                var i = _g[_f];
                i.draw2sp(this, this.m_dx, this.m_dy, true);
            }
            //if(this.m_title_adorn != null){
            //    this.m_title_adorn.draw2sp(this.m_sp_front,0,0);
            //}
            //this.m_sp_center.cacheAs = "bitmap";
        };
        //从parent里把自己移除?
        renderavatar_new.prototype.is_contain = function (x, y) {
            var ret = _super.prototype.is_contain.call(this, x, y);
            if (ret) {
                var rt = null;
                ret = false;
                var rx = void 0;
                var ry = void 0;
                var w = void 0;
                var h = void 0;
                if (this.m_mat != null && this.m_mat.m_b_loaded) {
                    rt = this.m_mat_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                        ret = true;
                    }
                }
                if (!ret && this.m_mat_weapon != null && this.m_mat_weapon.m_b_loaded) {
                    rt = this.m_mat_weapon_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                        ret = true;
                    }
                }
                if (!ret && this.m_mat_wing != null && this.m_mat_wing.m_b_loaded) {
                    rt = this.m_mat_wing_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                        ret = true;
                    }
                }
                if (!ret && this.m_mat_ride != null && this.m_mat_ride.m_b_loaded) {
                    rt = this.m_mat_ride_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height) && rt.width != 512) {
                        ret = true;
                    }
                }
                if (!ret && this.m_mat_backride != null && this.m_mat_backride.m_b_loaded) {
                    rt = this.m_mat_backeride_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height) && rt.width != 512) {
                        ret = true;
                    }
                }
                if (!ret && this.m_mat_hair != null && this.m_mat_hair.m_b_loaded) {
                    rt = this.m_mat_hair_rt;
                    rx = this.x + rt.x;
                    ry = this.y + rt.y;
                    if (x >= rx && x <= (rx + rt.width) && y >= ry && y <= (ry + rt.height)) {
                        ret = true;
                    }
                }
            }
            return ret;
        };
        renderavatar_new.prototype.create_default_sp = function () {
            if (this.m_default_sp == null) {
                this.m_default_sp = utils.getitembycls("renderavatar_default", renderavatar_default);
                this.addChild(this.m_default_sp);
                this.m_default_sp.y = -120;
                this.m_default_sp.x = -26;
            }
        };
        renderavatar_new.prototype.del_default_sp = function () {
            if (this.m_default_sp != null) {
                this.m_default_sp.removeSelf();
                utils.recover("renderavatar_default", this.m_default_sp);
                this.m_default_sp = null;
            }
        };
        renderavatar_new.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_shadow_sp != null) {
                this.m_shadow_sp = null;
            }
            this.del_default_sp();
            if (this.m_sp_back != null) {
                this.m_sp_back.removeChildren();
                this.m_sp_back = null;
            }
            if (this.m_sp_front != null) {
                this.m_sp_front.removeChildren();
                this.m_sp_front = null;
            }
            if (this.m_sp_center != null) {
                this.m_sp_center.removeChildren();
                this.m_sp_center = null;
            }
            if (this.m_aura_id != 0) {
                this.change_aura(0);
            }
            if (this.m_title_id != 0) {
                this.change_title(0);
            }
            this.m_buffeff_list = new Array();
            this.m_eff_list = new Array();
            for (var _i = 0, _a = this.m_adorn_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_adorn_list.length = 0;
            this.removeChildren();
            if (this.m_name_sp != null) {
                this.m_name_sp.dispose();
                utils.recover("avatarname", this.m_name_sp);
                this.m_name_sp = null;
            }
            this.del_hp();
            this.del_buffui();
            if (this.m_mat != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_mat_weapon != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_weapon);
                this.m_mat_weapon = null;
            }
            if (this.m_mat_wing != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_wing);
                this.m_mat_wing = null;
            }
            if (this.m_mat_ride != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_ride);
                this.m_mat_ride = null;
            }
            if (this.m_mat_backride != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_backride);
                this.m_mat_backride = null;
            }
            if (this.m_mat_hair != null) {
                core.mat_mgr().dellavatarmaterial(this.m_mat_hair);
                this.m_mat_hair = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                //avatarcmdnew
                //utils.recover("avatarcommand",this.m_rc);
                utils.recover("avatarcommand_new", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return renderavatar_new;
    }(core.renderobject));
    core.renderavatar_new = renderavatar_new;
    var renderavatar = /** @class */ (function (_super) {
        __extends(renderavatar, _super);
        function renderavatar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return renderavatar;
    }(renderavatar_new));
    core.renderavatar = renderavatar;
})(core || (core = {}));
//# sourceMappingURL=renderavatar.js.map
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
var core;
(function (core) {
    var rendereff = /** @class */ (function (_super) {
        __extends(rendereff, _super);
        function rendereff() {
            var _this = _super.call(this) || this;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_b_loop = true;
            _this.m_b_end = false;
            _this.m_b_autodel = false;
            return _this;
        }
        rendereff.prototype.re_init = function (aniid, x, y, underunit, autodel) {
            if (underunit === void 0) { underunit = true; }
            if (autodel === void 0) { autodel = false; }
            this.set_id();
            this.m_aniid = aniid;
            this.m_rc = utils.getitembycls("effcommand", core.effcommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_data = underunit;
            this.m_mat = null; //only start to load when it is projected 
            this.m_aw = core.matinfo_mgr().geteffw(this.m_aniid);
            this.m_ah = core.matinfo_mgr().geteffh(this.m_aniid);
            this.m_framecount = core.matinfo_mgr().geteffframecount(this.m_aniid);
            this.m_framespeed = core.matinfo_mgr().geteffframespeed(this.m_aniid);
            this.m_b_loop = core.matinfo_mgr().geteffcycle(this.m_aniid);
            this.m_b_autodel = autodel;
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            this.m_box.setTo(this.x - this.m_aw / 2, this.y - this.m_ah / 2, this.m_aw, this.m_ah);
        };
        rendereff.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().geteffmat(this.m_aniid);
                    this.addChild(this.m_mat.m_graphic);
                }
            }
            else {
                //core.core_tiplog("renderani project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        };
        rendereff.prototype.update = function (delta) {
            if (this.m_b_end) {
                return;
            }
            this.m_framecurrenttm += delta;
            if (this.m_framecurrenttm >= this.m_frametotalmillsec) {
                if (this.m_b_autodel) {
                    this.m_b_end = true;
                    return;
                }
                if (this.m_b_loop == false) {
                    this.m_b_end = true;
                    return;
                }
            }
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_mat != null) {
                this.m_mat.goto_frame(this.m_framecurrent);
            }
        };
        //从parent里把自己移除?
        rendereff.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().deleffmat(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("effcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendereff;
    }(core.renderobject));
    core.rendereff = rendereff;
})(core || (core = {}));
//# sourceMappingURL=rendereff.js.map
var core;
(function (core) {
    var rendermap = /** @class */ (function () {
        function rendermap() {
            this.m_bk = null;
            this.m_scrollbk = null;
            this.m_mapid = 0;
            this.m_bk = null;
            this.m_scrollbk = null;
            this.m_slots = new Array();
            this.m_block = new core.rendermapblock();
            this.m_pathfind = new core.pathfind(null, 0, 0);
        }
        rendermap.prototype.setmapid = function (mapid, b_create_slot) {
            if (b_create_slot === void 0) { b_create_slot = true; }
            core.core_tiplog("rendermap setmapid 1 ", mapid, this.m_mapid);
            if (mapid == this.m_mapid) {
                return;
            }
            this.clear();
            if (mapid == 0) {
                return;
            }
            core.core_tiplog("rendermap setmapid 2 ", mapid, this.m_mapid);
            this.m_mapid = mapid;
            this.m_block.setmapid(this.m_mapid);
            var mapw = core.matinfo_mgr().getmapw(this.m_mapid);
            var maph = core.matinfo_mgr().getmaph(this.m_mapid);
            this.m_mapw = mapw;
            this.m_maph = maph;
            if (!b_create_slot) {
                return;
            }
            var gridw = core.matinfo_mgr().m_map_grid_w;
            var gridh = core.matinfo_mgr().m_map_grid_h;
            var colnum = mapw / gridw;
            var rownum = maph / gridh;
            for (var i = 0; i < colnum; ++i) //x
             {
                for (var j = 0; j < rownum; ++j) //y
                 {
                    var x = i * gridw;
                    var y = j * gridh;
                    var slot = utils.getitembycls("rendermapslot", core.rendermapslot);
                    slot.re_init(mapid, x, y, i, j);
                    //let slot:rendermapslot = new rendermapslot(mapid,x,y,i,j);
                    //core.core_tiplog("rendermap push slot ",x,y,i,j);
                    this.m_slots.push(slot);
                }
            }
        };
        rendermap.prototype.delallslot = function () {
            for (var _i = 0, _a = this.m_slots; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("rendermapslot", i);
            }
            this.m_slots = new Array();
        };
        rendermap.prototype.clear = function () {
            this.clearscrollbk();
            if (this.m_bk != null) {
                this.m_bk.dispose();
                utils.recover("rendermapbk", this.m_bk);
                this.m_bk = null;
            }
            this.delallslot();
            this.m_mapid = 0;
        };
        rendermap.prototype.is_block = function (sx, sy) {
            var bw = this.m_block.m_mat.m_grid_w;
            var bh = this.m_block.m_mat.m_grid_h;
            var ssx = Math.floor(sx / bw);
            var ssy = Math.floor(sy / bh);
            return this.m_block.m_mat.is_block_cache(ssx, ssy);
        };
        rendermap.prototype.is_mask = function (sx, sy) {
            var bw = this.m_block.m_mat.m_grid_w;
            var bh = this.m_block.m_mat.m_grid_h;
            var ssx = Math.floor(sx / bw);
            var ssy = Math.floor(sy / bh);
            return this.m_block.m_mat.is_mask_cache(ssx, ssy);
        };
        rendermap.prototype.findpath = function (sx, sy, dx, dy, bclosest, spd) {
            var starttm = utils.get_render_milltm();
            //core.core_tiplog("rendermap findpath start time ",sx,sy,dx,dy,starttm);
            var bw = this.m_block.m_mat.m_grid_w;
            var bh = this.m_block.m_mat.m_grid_h;
            var ssx = Math.floor(sx / bw);
            var ssy = Math.floor(sy / bh);
            var ddx = Math.floor(dx / bw);
            var ddy = Math.floor(dy / bh);
            //core.core_tiplog("grid pos ",ssx,ssy,ddx,ddy,bw,bh);
            this.m_pathfind.set_block(this.m_block.m_mat, this.m_block.m_mat.m_block_w_num, this.m_block.m_mat.m_block_h_num);
            var ret = this.m_pathfind.findpath(ssx, ssy, ddx, ddy, bclosest);
            var endtm = utils.get_render_milltm();
            //core.core_tiplog("rendermap findpath end time ",sx,sy,dx,dy,endtm,endtm - starttm);
            //core.core_tiplog("findpath cost++++++++++ ",endtm - starttm);
            if (ret != null) {
                var lastnode = null;
                var retpath = utils.getitembycls("path", core.path);
                retpath.init(spd);
                for (var i = 0; i < ret.length; ++i) {
                    if (lastnode == null) {
                        lastnode = ret[i];
                    }
                    else {
                        if (i == 1) {
                            retpath.push_pt(sx, sy, ret[i].x * bw, ret[i].y * bh);
                        }
                        else {
                            retpath.push_pt(lastnode.x * bw, lastnode.y * bh, ret[i].x * bw, ret[i].y * bh);
                        }
                        lastnode = ret[i];
                    }
                }
                return retpath;
            }
            //
            return null;
        };
        rendermap.prototype.addscrollbk = function (res, w, h) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.addres(res, w, h);
        };
        rendermap.prototype.setscrollbkpos = function (x, y) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.setdeltapos(x, y);
        };
        rendermap.prototype.setscrollbkview = function (w, h) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.m_view_w = w;
        };
        rendermap.prototype.setscrollbkspd = function (spd) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.setspd(spd);
        };
        rendermap.prototype.clearscrollbk = function () {
            if (this.m_scrollbk != null) {
                this.m_scrollbk.dispose();
                utils.recover("rendermapscrollbk", this.m_scrollbk);
                this.m_scrollbk = null;
            }
        };
        rendermap.prototype.setbk = function (res) {
            if (res == null) {
                if (this.m_bk != null) {
                    this.m_bk.dispose();
                    utils.recover("rendermapbk", this.m_bk);
                    this.m_bk = null;
                }
                return;
            }
            if (this.m_bk == null) {
                this.m_bk = utils.getitembycls("rendermapbk", core.rendermapbk);
                this.m_bk.re_init();
            }
            //this.m_bk = new rendermapbk();
            this.m_bk.setres(res);
        };
        rendermap.prototype.setsp = function (sp) {
            if (this.m_bk == null) {
                //this.m_bk = new rendermapbk();
                this.m_bk = utils.getitembycls("rendermapbk", core.rendermapbk);
                this.m_bk.re_init();
            }
            this.m_bk.setsp(sp);
        };
        rendermap.prototype.removesp = function () {
            if (this.m_bk != null) {
                this.m_bk.clearsp();
            }
        };
        rendermap.prototype.dispose = function () {
            this.clear();
            if (this.m_block != null) {
                this.m_block.dispose();
                this.m_block = null;
            }
        };
        rendermap.prototype.update = function (delta) {
            if (this.m_scrollbk != null) {
                this.m_scrollbk.update(delta);
            }
        };
        rendermap.prototype.project = function (context) {
            var ret = false;
            if (this.m_scrollbk != null) {
                ret = this.m_scrollbk.project(context) || ret;
            }
            if (this.m_bk != null) {
                ret = this.m_bk.project(context) || ret;
            }
            if (this.m_block != null) {
                //ret = this.m_block.project(context) || ret;
            }
            var num = 0;
            for (var _i = 0, _a = this.m_slots; _i < _a.length; _i++) {
                var i = _a[_i];
                //core.core_tiplog("rendermap project slot ",num);
                ret = i.project(context) || ret;
                num++;
            }
            return ret;
        };
        return rendermap;
    }());
    core.rendermap = rendermap;
})(core || (core = {}));
//# sourceMappingURL=rendermap.js.map
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
var core;
(function (core) {
    var rendermapbk = /** @class */ (function (_super) {
        __extends(rendermapbk, _super);
        function rendermapbk() {
            var _this = _super.call(this) || this;
            _this.re_init();
            return _this;
        }
        rendermapbk.prototype.re_init = function () {
            this.m_mat = null;
            this.m_rc = utils.getitembycls("mapbkcommand", core.mapbkcommand);
            this.m_rc.re_init(this);
        };
        rendermapbk.prototype.setres = function (res) {
            if (this.m_mat != null) {
                core.mat_mgr().delmapbkres(this.m_mat);
            }
            this.m_mat = core.mat_mgr().getmapbkres(res);
            this.removeChildren();
            this.addChild(this.m_mat.m_graphic);
        };
        rendermapbk.prototype.setsp = function (sp) {
            this.addChild(sp);
        };
        rendermapbk.prototype.clearsp = function () {
            this.removeChildren();
        };
        rendermapbk.prototype.project = function (context) {
            context.m_render.addrc(this.m_rc);
            return true;
        };
        //从parent里把自己移除?
        rendermapbk.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().delmapbkres(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapbkcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapbk;
    }(core.renderobject));
    core.rendermapbk = rendermapbk;
})(core || (core = {}));
//# sourceMappingURL=rendermapbk.js.map
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
var core;
(function (core) {
    var rendermapblock = /** @class */ (function (_super) {
        __extends(rendermapblock, _super);
        function rendermapblock() {
            var _this = _super.call(this) || this;
            _this.re_init();
            return _this;
        }
        rendermapblock.prototype.re_init = function () {
            this.m_mat = utils.getitembycls("mapblock", core.mapblock);
            this.m_mat.re_init();
            this.addChild(this.m_mat.m_graphic);
            this.m_rc = utils.getitembycls("mapblockcommand", core.mapblockcommand);
            this.m_rc.re_init(this);
        };
        rendermapblock.prototype.setmapid = function (mapid) {
            core.mat_mgr().getmapblock(this.m_mat, mapid);
        };
        rendermapblock.prototype.project = function (context) {
            if (this.m_mat != null && this.m_mat.m_init_sp == false) {
                this.m_mat.get_block_sp();
            }
            context.m_render.addrc(this.m_rc);
            return true;
        };
        //从parent里把自己移除?
        rendermapblock.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                this.m_mat.dispose();
                utils.recover("mapblock", this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapblockcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapblock;
    }(core.renderobject));
    core.rendermapblock = rendermapblock;
})(core || (core = {}));
//# sourceMappingURL=rendermapblock.js.map
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
var core;
(function (core) {
    var scrollbkslot = /** @class */ (function (_super) {
        __extends(scrollbkslot, _super);
        function scrollbkslot() {
            var _this = _super.call(this) || this;
            _this.m_mat = null;
            _this.m_mat_res = "";
            _this.m_w = 0;
            _this.m_h = 0;
            _this.m_drawx = 0;
            _this.m_drawy = 0;
            _this.m_view_w = 0;
            _this.m_b_draw = false;
            return _this;
        }
        scrollbkslot.prototype.set_pos = function (x, y) {
            this.m_drawx = x;
            this.m_drawy = y;
            this.x = this.m_drawx;
            this.y = this.m_drawy;
            this.removeChildren();
            if (this.m_drawx >= (-this.m_w) && this.m_drawx <= this.m_view_w) {
                this.m_b_draw = true;
                this.addChild(this.m_mat.m_graphic);
            }
            else {
                this.m_b_draw = false;
            }
        };
        scrollbkslot.prototype.re_init = function (respath) {
            this.m_mat = core.mat_mgr().getmapbkres(respath);
            this.m_mat_res = respath;
            this.m_w = 0;
            this.m_h = 0;
            this.m_drawx = 0;
            this.m_drawy = 0;
            this.m_view_w = 0;
            this.m_b_draw = false;
            this.x = 0;
            this.y = 0;
            this.removeChildren();
        };
        scrollbkslot.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().delmapbkres(this.m_mat);
                this.m_mat = null;
            }
        };
        return scrollbkslot;
    }(Laya.Sprite));
    core.scrollbkslot = scrollbkslot;
    var rendermapscrollbk = /** @class */ (function (_super) {
        __extends(rendermapscrollbk, _super);
        function rendermapscrollbk() {
            var _this = _super.call(this) || this;
            _this.m_mat_list = new Array();
            _this.m_tmpmat_list = new Array();
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_spd = 200;
            _this.m_view_w = 0;
            _this.re_init();
            return _this;
        }
        rendermapscrollbk.prototype.re_init = function () {
            this.m_mat_list.length = 0;
            this.m_dx = 0;
            this.m_dy = 0;
            this.x = 0;
            this.y = 0;
            this.m_spd = 200;
            this.m_rc = utils.getitembycls("mapscrollbkcommand", core.mapscrollbkcommand);
            this.m_rc.re_init(this);
        };
        rendermapscrollbk.prototype.setdeltapos = function (x, y) {
            this.m_dx = x;
            this.m_dy = y;
            this.x = x;
            this.y = y;
        };
        rendermapscrollbk.prototype.setspd = function (spd) {
            this.m_spd = spd;
        };
        rendermapscrollbk.prototype.addres = function (res, w, h) {
            var mat = utils.getitembycls("scrollbkslot", scrollbkslot);
            mat.re_init(res);
            mat.m_view_w = this.m_view_w;
            mat.m_w = w;
            mat.m_h = h;
            if (this.m_mat_list.length <= 0) {
                mat.set_pos(0, 0);
            }
            else {
                var pre_mat = this.m_mat_list[this.m_mat_list.length - 1];
                mat.set_pos(pre_mat.m_drawx + pre_mat.m_w, 0);
            }
            this.m_mat_list.push(mat);
            //this.m_mat = mat_mgr().getmapbkres(res);
            //this.removeChildren();
            this.addChild(mat);
        };
        rendermapscrollbk.prototype.update = function (delta) {
            this.m_tmpmat_list.length = 0;
            var dx = delta / 1000 * this.m_spd;
            var mat = null;
            for (var i = this.m_mat_list.length - 1; i >= 0; --i) {
                mat = this.m_mat_list[i];
                var drawx = mat.m_drawx - dx;
                if (drawx < -mat.m_w) {
                    this.m_tmpmat_list.push(mat);
                    this.m_mat_list.splice(i, 1);
                }
                else {
                    mat.set_pos(drawx, 0);
                }
            }
            if (this.m_tmpmat_list.length > 0) {
                this.m_tmpmat_list.reverse();
                var startx = 0;
                if (this.m_mat_list.length > 0) {
                    mat = this.m_mat_list[this.m_mat_list.length - 1];
                    startx = mat.m_drawx + mat.m_w;
                }
                for (var _i = 0, _a = this.m_tmpmat_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    this.m_mat_list.push(i);
                    i.set_pos(startx, 0);
                    startx += i.m_w;
                }
                this.m_tmpmat_list.length = 0;
            }
        };
        rendermapscrollbk.prototype.clearRes = function () {
            this.removeChildren();
            for (var _i = 0, _a = this.m_mat_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("scrollbkslot", i);
            }
            this.m_mat_list.length = 0;
        };
        rendermapscrollbk.prototype.project = function (context) {
            context.m_render.addrc(this.m_rc);
            return true;
        };
        //从parent里把自己移除?
        rendermapscrollbk.prototype.dispose = function () {
            this.clearRes();
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapscrollbkcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapscrollbk;
    }(core.renderobject));
    core.rendermapscrollbk = rendermapscrollbk;
})(core || (core = {}));
//# sourceMappingURL=rendermapscrollbk.js.map
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
var core;
(function (core) {
    var rendermapslot = /** @class */ (function (_super) {
        __extends(rendermapslot, _super);
        function rendermapslot() {
            return _super.call(this) || this;
        }
        rendermapslot.prototype.re_init = function (mapid, x, y, colnum, rownum) {
            this.set_id();
            this.m_mapid = mapid;
            this.m_rc = utils.getitembycls("mapslotcommand", core.mapslotcommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_colnum = colnum;
            this.m_rownum = rownum;
            this.m_mat = null; //only start to load when it is projected 
            this.m_box.setTo(this.x, this.y, core.matinfo_mgr().m_map_grid_w, core.matinfo_mgr().m_map_grid_h);
        };
        rendermapslot.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("rendermapslot project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().getmapslot(this.m_mapid, this.m_rownum, this.m_colnum);
                }
                this.addChild(this.m_mat.m_graphic);
            }
            else {
                //core.core_tiplog("rendermapslot project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        };
        //从parent里把自己移除?
        rendermapslot.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapslotcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapslot;
    }(core.renderobject));
    core.rendermapslot = rendermapslot;
})(core || (core = {}));
//# sourceMappingURL=rendermapslot.js.map
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
var core;
(function (core) {
    var renderspcontent = /** @class */ (function (_super) {
        __extends(renderspcontent, _super);
        function renderspcontent() {
            var _this = _super.call(this) || this;
            _this.m_w = 0;
            _this.m_h = 0;
            return _this;
        }
        renderspcontent.prototype.update = function (delta) {
        };
        //从parent里把自己移除?
        renderspcontent.prototype.dispose = function () {
        };
        renderspcontent.prototype.selfremove = function () {
        };
        return renderspcontent;
    }(laya.display.Sprite));
    core.renderspcontent = renderspcontent;
})(core || (core = {}));
//# sourceMappingURL=renderspcontent.js.map
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
var core;
(function (core) {
    var rendersprite = /** @class */ (function (_super) {
        __extends(rendersprite, _super);
        function rendersprite() {
            var _this = _super.call(this) || this;
            _this.m_sprite = null;
            _this.m_b_upon_unit = true;
            return _this;
        }
        rendersprite.prototype.re_init = function (sp, x, y, b_upon) {
            if (b_upon === void 0) { b_upon = true; }
            this.set_id();
            this.m_b_upon_unit = b_upon;
            this.m_sprite = sp;
            this.removeChildren();
            if (this.m_sprite != null) {
                this.addChild(this.m_sprite);
            }
            this.m_rc = utils.getitembycls("spritecommand", core.spritecommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_box.setTo(this.x - sp.m_w / 2, this.y - sp.m_h / 2, sp.m_w, sp.m_h);
        };
        rendersprite.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            return ret;
        };
        rendersprite.prototype.update = function (delta) {
            if (this.m_sprite != null) {
                this.m_sprite.update(delta);
            }
        };
        //从parent里把自己移除?
        rendersprite.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_sprite != null) {
                this.m_sprite.selfremove();
                //utils.recover("renderspcontent",this.m_sprite);
            }
            this.m_sprite = null;
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("spritecommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendersprite;
    }(core.renderobject));
    core.rendersprite = rendersprite;
})(core || (core = {}));
//# sourceMappingURL=rendersprite.js.map
var core;
(function (core) {
    var path = /** @class */ (function () {
        function path(spd) {
            this.m_nodes = null;
            this.m_dir_count = 8;
            this.m_speed = 300; //pixels per sec
            this.m_ret_node = null;
            this.m_unit_id = 0;
            this.m_force_dir = -1;
            this.m_nodes = new Array();
            this.init(spd);
        }
        path.prototype.init = function (spd) {
            this.m_speed = spd;
            this.m_ret_node = utils.getitembycls("pathnode", core.pathnode);
            this.m_ret_node.init(0, 0, 0, 0);
            this.m_force_dir = -1;
        };
        path.prototype.push_pt = function (sx, sy, dx, dy) {
            var node = utils.getitembycls("pathnode", core.pathnode);
            node.init(sx, sy, dx, dy, this.m_dir_count);
            node.cal_total_tm(this.m_speed);
            var tm = 0;
            if (this.m_nodes.length > 0) {
                var last = this.m_nodes[this.m_nodes.length - 1];
                tm = last.m_start_tm + last.m_total_tm;
            }
            else {
                this.m_ret_node.x = node.x;
                this.m_ret_node.y = node.y;
                this.m_ret_node.m_dir = node.m_dir;
            }
            node.m_start_tm = tm;
            this.m_nodes.push(node);
        };
        path.prototype.start = function () {
            this.m_cur_tm = 0;
            this.m_cur_node_idx = 0;
        };
        path.prototype.update = function (delta) {
            if (this.m_nodes.length <= 0) {
                return;
            }
            this.m_cur_tm += delta;
            while (this.m_cur_node_idx < this.m_nodes.length) {
                var node = this.m_nodes[this.m_cur_node_idx];
                if (this.m_cur_tm >= (node.m_start_tm + node.m_total_tm)) {
                    this.m_cur_node_idx++;
                }
                else {
                    break;
                }
            }
        };
        path.prototype.get_end = function () {
            return this.m_nodes[this.m_nodes.length - 1].m_end_pt;
        };
        path.prototype.is_end = function () {
            return this.m_cur_node_idx >= this.m_nodes.length;
        };
        path.prototype.get_cur_pt = function () {
            var idx = this.m_cur_node_idx < this.m_nodes.length ? this.m_cur_node_idx : this.m_nodes.length - 1;
            var cur_node = this.m_nodes[idx].get_pos(this.m_cur_tm);
            this.m_ret_node.x = cur_node.x;
            this.m_ret_node.y = cur_node.y;
            this.m_ret_node.m_dir = this.m_nodes[idx].m_dir;
            if (this.m_force_dir >= 0) {
                this.m_ret_node.m_dir = this.m_force_dir;
            }
            return this.m_ret_node;
        };
        path.prototype.dispose = function () {
            for (var _i = 0, _a = this.m_nodes; _i < _a.length; _i++) {
                var i = _a[_i];
                utils.recover("pathnode", i);
            }
            this.m_nodes.length = 0;
            utils.recover("pathnode", this.m_ret_node);
            this.m_ret_node = null;
        };
        return path;
    }());
    core.path = path;
})(core || (core = {}));
//# sourceMappingURL=path.js.map
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
var core;
(function (core) {
    var pathfindnode = /** @class */ (function (_super) {
        __extends(pathfindnode, _super);
        function pathfindnode(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, x, y) || this;
            _this.m_g = 0;
            _this.m_h = 0;
            _this.m_f = 0;
            _this.m_key = 0; //x*100000+y;
            _this.m_parent_x = 0; //;
            _this.m_parent_y = 0;
            _this.m_key = pathfindnode._genkey(x, y);
            return _this;
        }
        pathfindnode._genkey = function (x, y) {
            return x * 10000 + y;
        };
        pathfindnode.prototype.init = function (x, y) {
            this.setTo(x, y);
            this.m_key = pathfindnode._genkey(x, y);
        };
        pathfindnode.prototype.calc = function (dx, dy) {
            this.m_h = Math.sqrt(Math.abs((dx - this.x) * (dx - this.x)) + Math.abs((dy - this.y) * (dy - this.y)));
            this.m_f = this.m_g + this.m_h;
            return;
        };
        return pathfindnode;
    }(laya.maths.Point));
    core.pathfindnode = pathfindnode;
    var pathfind = /** @class */ (function () {
        function pathfind(mb, w, h) {
            this.m_g_h = 10;
            this.m_g_c = 14;
            this.m_map_block_ref = null;
            this.m_block_w_num = 0;
            this.m_block_h_num = 0;
            this.m_open_heap = new utils.small_heap();
            this.m_open_flag = new Object();
            this.m_close_flag = new Object();
            this.m_map_block_ref = mb;
            this.m_block_w_num = w;
            this.m_block_h_num = h;
        }
        pathfind.prototype.set_block = function (mb, w, h) {
            this.m_map_block_ref = mb;
            this.m_block_w_num = w;
            this.m_block_h_num = h;
        };
        pathfind.prototype._get_pfd = function (x, y) {
            var ret = utils.getitembycls("pathfindnode", pathfindnode);
            ret.init(x, y);
            return ret;
        };
        pathfind.prototype._del_pfd = function (nd) {
            utils.recover("pathfindnode", nd);
        };
        pathfind.prototype._clear_pfd_cache = function () {
            utils.clearbysign("pathfindnode");
        };
        pathfind.prototype._clear_openclose_flag = function () {
            for (var key in this.m_open_flag) {
                if (this.m_open_flag.hasOwnProperty(key)) {
                    var tmp = this.m_open_flag[key];
                    if (tmp != null && tmp != undefined) {
                        this._del_pfd(tmp);
                    }
                }
            }
            this.m_open_flag = new Object();
            for (var key in this.m_close_flag) {
                if (this.m_close_flag.hasOwnProperty(key)) {
                    var tmp = this.m_close_flag[key];
                    if (tmp != null && tmp != undefined) {
                        this._del_pfd(tmp);
                    }
                }
            }
            this.m_close_flag = new Object();
        };
        pathfind.prototype._add_node = function (x, y, cx, cy, cur_g, dx, dy) {
            var nd_key;
            var hp_idx;
            var pfn;
            var node;
            nd_key = pathfindnode._genkey(cx, cy);
            //已经在闭列表里，什么都不做
            if (this.m_close_flag[nd_key] == undefined) {
                //如果不在，判定是否已经在开列表里
                //如果在，判定是否要修正f值
                if (this.m_open_flag[nd_key] != undefined) {
                    pfn = this.m_open_flag[nd_key];
                    if (cur_g < pfn.m_g) {
                        pfn.m_g = cur_g;
                        pfn.m_f = pfn.m_g + pfn.m_h;
                        pfn.m_parent_x = x;
                        pfn.m_parent_y = y;
                        hp_idx = this.m_open_heap.get_idx(pfn.m_key);
                        this.m_open_heap.modify(hp_idx, pfn.m_f);
                    }
                }
                else {
                    //判断是否在障碍里，如果不在，则判断是否目的地，如果是，则直接结束
                    if (this.m_map_block_ref.is_block_cache(cx, cy) == false) {
                        node = this._get_pfd(cx, cy);
                        node.m_parent_x = x;
                        node.m_parent_y = y;
                        if (cx == dx && cy == dy) {
                            this.m_close_flag[node.m_key] = node;
                            return true;
                        }
                        //不是目的地，添加到开列表里
                        node.m_g = cur_g;
                        node.calc(dx, dy);
                        this.m_open_heap.push(node.m_h, node.m_key);
                        this.m_open_flag[node.m_key] = node;
                        //core.core_tiplog("pathfind while add ",node.m_key,node.m_key);
                    }
                }
            }
            return false;
        };
        pathfind.prototype.findpath = function (sx, sy, dx, dy, bclostest) {
            if (sx == dx && sy == dy) {
                core.core_tiplog("pathfind findpath sx=dx sy=dy return null", sx, sy, dx, dy);
                return null;
            }
            //目标点是否在障碍里，如果是，拉一条直线，找到第一个非障碍点替代目标点
            if (this.m_map_block_ref.is_block_cache(sx, sy)) {
                core.core_tiplog("pathfind findpath sx sy is in block return null", sx, sy, dx, dy);
                return null;
            }
            var gridline = utils.genpointlinefrom2point(sx, sy, dx, dy, this.m_map_block_ref.m_grid_w, this.m_map_block_ref.m_grid_h);
            if (gridline == null || gridline.length <= 0) {
                core.core_tiplog("pathfind gen first line failed return null", sx, sy, dx, dy);
                return null;
            }
            var i;
            var line_count = gridline.length;
            var pt;
            if (this.m_map_block_ref.is_block_cache(dx, dy)) {
                if (bclostest == false) {
                    core.core_tiplog("pathfind findpath dx dy is in block and bclosest = false return null", sx, sy, dx, dy);
                    return null;
                }
                for (i = 0; i < line_count; ++i) {
                    pt = gridline[line_count - i - 1];
                    if (this.m_map_block_ref.is_block_cache(pt.x, pt.y)) {
                        gridline.splice(line_count - i - 1, 1);
                    }
                    else {
                        break;
                    }
                }
                if (gridline.length <= 1) //if only src is in the line,failed;
                 {
                    core.core_tiplog("pathfind findpath firstline only have 1 point return null", sx, sy, dx, dy);
                    return null;
                }
                dx = gridline[gridline.length - 1].x;
                dy = gridline[gridline.length - 1].y;
                core.core_tiplog("pathfind findpath get substitution of dest ", dx, dy);
            }
            //目标点和起点是否中间没有障碍可以直接到达，如果是，直接返回
            line_count = gridline.length;
            if (this.has_ptline_block(gridline) == false) {
                var ret = new Array();
                ret.push(new laya.maths.Point(sx, sy));
                ret.push(new laya.maths.Point(dx, dy));
                core.core_tiplog("pathfind findpath dx dy can get directly return true", sx, sy, dx, dy);
                return ret;
            }
            core.core_tiplog("pathfind findpath dx dy can not get directly ", sx, sy, dx, dy, gridline.length, gridline);
            //
            var bfind = false;
            this.m_open_heap.clear();
            this._clear_openclose_flag();
            var node = this._get_pfd(sx, sy);
            node.m_g = 0;
            node.calc(dx, dy);
            node.m_parent_x = -1;
            node.m_parent_y = -1;
            this.m_open_heap.push(node.m_h, node.m_key);
            //core.core_tiplog("pathfind while add first",node.m_key,node.m_key);
            this.m_open_flag[node.m_key] = node;
            while (true) {
                if (this.m_open_heap.is_empty()) {
                    break;
                }
                var curnode = this.m_open_heap.top();
                var curnode_id = curnode.m_user_id;
                this.m_open_heap.pop();
                //this.m_open_heap.print_data();
                var pfn = this.m_open_flag[curnode_id];
                //core.core_tiplog("pathfind while pop ",curnode_id,pfn.m_key);
                this.m_close_flag[pfn.m_key] = pfn;
                this.m_open_flag[pfn.m_key] = undefined;
                bfind = this._add_node(pfn.x, pfn.y, pfn.x + 1, pfn.y, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x - 1, pfn.y, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x, pfn.y + 1, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x, pfn.y - 1, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x + 1, pfn.y + 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x + 1, pfn.y - 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x - 1, pfn.y + 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x - 1, pfn.y - 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
            }
            if (bfind == false) //没找到
             {
                core.core_tiplog("pathfind findpath failed return null", sx, sy, dx, dy);
                return null;
            }
            //生成路径链表
            var dst_node_key = pathfindnode._genkey(dx, dy);
            var tmp_path = Array();
            while (true) {
                var dst_node = this.m_close_flag[dst_node_key];
                if (dst_node.m_parent_x == -1 && dst_node.m_parent_y == -1) {
                    tmp_path.push(new laya.maths.Point(dst_node.x, dst_node.y));
                    break;
                }
                //core.core_tiplog("pathfind findpath push path ",dst_node.x,dst_node.y);
                tmp_path.push(new laya.maths.Point(dst_node.x, dst_node.y));
                dst_node_key = pathfindnode._genkey(dst_node.m_parent_x, dst_node.m_parent_y);
            }
            tmp_path.reverse();
            line_count = tmp_path.length;
            //core.core_tiplog("pathfind findpath before optimal 1 ",sx,sy,dx,dy,tmp_path)
            if (line_count > 2) {
                //去掉处在同一条直线上的连续三个点中间那个
                var start = 0;
                var mid = 1;
                var end = 2;
                while (true) {
                    var a = tmp_path[start];
                    var b = tmp_path[mid];
                    var c = tmp_path[end];
                    var bdel = false;
                    if (b.x == a.x && c.x == b.x) {
                        bdel = true;
                    }
                    else if (b.y == a.y && c.y == b.y) {
                        bdel = true;
                    }
                    else if (((b.x - a.x) == (c.x - b.x)) && ((b.y - a.y) == (c.y - b.y))) {
                        bdel = true;
                    }
                    if (bdel) {
                        tmp_path.splice(mid, 1);
                        mid = start + 1;
                        end = mid + 1;
                    }
                    else {
                        start = mid;
                        mid = start + 1;
                        end = mid + 1;
                    }
                    if (end >= tmp_path.length) {
                        break;
                    }
                }
            }
            //core.core_tiplog("pathfind findpath before optimal 2 ",sx,sy,dx,dy,tmp_path)
            //将寻出来的路径进行折半查找，将中间可连成直线的路径点优化
            line_count = tmp_path.length;
            if (line_count > 3) //小于3个点是不存在的，2个点可以直接到达，3个点不可能减到2个点
             {
                //for(i = 0;i < tmp_path.length;++i)
                //{
                //    core.core_tiplog("before delsurpluspoint ",i,tmp_path[i].x,tmp_path[i].y);
                //}
                var tmp_path2 = this.delsurpluspoint(tmp_path);
                tmp_path = tmp_path2;
                //for(i = 0;i < tmp_path.length;++i)
                // {
                //     core.core_tiplog("after delsurpluspoint ",i,tmp_path[i].x,tmp_path[i].y);
                // }
            }
            core.core_tiplog("pathfind findpath normal end return true ", sx, sy, dx, dy, tmp_path);
            return tmp_path;
        };
        pathfind.prototype.has_ptline_block = function (pt_line) {
            var line_count = pt_line.length;
            //core.core_tiplog("pathfind has_ptline_block ",line_count);
            for (var i = 0; i < line_count; ++i) {
                var pt = pt_line[i];
                //core.core_tiplog("pathfind has_ptline_block x y ",pt.x,pt.y);
                if (this.m_map_block_ref.is_block_cache(pt.x, pt.y)) {
                    return true;
                }
            }
            return false;
        };
        pathfind.prototype.delsurpluspoint = function (path) {
            if (path.length < 3) {
                return path;
            }
            var ret = new Array();
            var min = 0;
            var max = 0;
            var start = new laya.maths.Point();
            start.x = path[0].x;
            start.y = path[0].y;
            path.splice(0, 1);
            min = 0;
            max = path.length - 1;
            var b_continue = true;
            while (b_continue) {
                if (path.length <= 1) {
                    //core.core_tiplog("delsurpluspoint end ",start.x,start.y,path.length,ret.length);
                    ret.push(start);
                    if (path.length > 0) {
                        ret.push(new laya.maths.Point(path[0].x, path[0].y));
                    }
                    //ret.concat(path);
                    b_continue = false;
                    break;
                }
                else {
                    var cur = (min + max) >> 1;
                    var curpt = path[cur];
                    //core.core_tiplog("delsurpluspoint ",start.x,start.y,curpt.x,curpt.y,min,max,cur,path.length);
                    if (this.has_block_between_2pt(start.x, start.y, curpt.x, curpt.y)) {
                        //core.core_tiplog("has_block 1 ",min,max,cur,path.length);
                        max = cur;
                        if (max == min) //下一个已经是第一个点，表示目前除了第一个点，后面都没有能直接到的，则进行修改起始点操作
                         {
                            ret.push(start);
                            //core.core_tiplog('delsurpluspoint push 1 ',start.x,start.y);
                            start = new laya.maths.Point();
                            start.x = path[min].x;
                            start.y = path[min].y;
                            if (min == 0) {
                                min = 1;
                            }
                            path.splice(0, min);
                            min = 0;
                            max = path.length - 1;
                        }
                        //core.core_tiplog("has_block 2 ",min,max,cur,path.length);
                    }
                    else {
                        //core.core_tiplog("has not block 1 ",min,max,cur,path.length);
                        //这里没有判断cur+1是否不可直接到（要找的目标点),因为在删除操作后，下次判断到它后面那个不可直接到达点时
                        //会将max前移，然后会将start保存，而将cur设为新的start
                        if (cur == 0) //当前计算出的cur为0，只有可能min为0，max为1
                         {
                            //手动删除第一个，固定前移，避免死循环
                            var tmp = path[cur + 1];
                            if (this.has_block_between_2pt(start.x, start.y, tmp.x, tmp.y)) //不能直接到后一个
                             {
                                //core.core_tiplog('delsurpluspoint push 2 ',start.x,start.y);
                                ret.push(start);
                                start = new laya.maths.Point();
                                start.x = path[cur].x;
                                start.y = path[cur].y;
                                //修改新的起始点
                            }
                            //能直接到后一个，则直接删除当前第一个点
                            path.splice(0, 1);
                        }
                        else {
                            path.splice(0, cur); //删掉当前前面所有点，没有删掉当前点，因为没有用cur+1
                        }
                        min = 0; //重新取min和max
                        max = path.length - 1;
                        //core.core_tiplog("has not block 2 ",min,max,cur,path.length);
                    }
                }
            }
            return ret;
        };
        pathfind.prototype.has_block_between_2pt = function (sx, sy, dx, dy) {
            var gridline = utils.genpointlinefrom2point(sx, sy, dx, dy, this.m_map_block_ref.m_grid_w, this.m_map_block_ref.m_grid_h);
            if (gridline == null || gridline.length <= 0) {
                return true;
            }
            return this.has_ptline_block(gridline);
        };
        pathfind.prototype.dispose = function () {
            this._clear_openclose_flag();
        };
        return pathfind;
    }());
    core.pathfind = pathfind;
})(core || (core = {}));
//# sourceMappingURL=pathfind.js.map
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
var core;
(function (core) {
    var pathnode = /** @class */ (function (_super) {
        __extends(pathnode, _super);
        function pathnode(sx, sy, dx, dy, dircount) {
            if (dircount === void 0) { dircount = 8; }
            var _this = _super.call(this) || this;
            _this.m_end_pt = null;
            _this.m_start_tm = 0;
            _this.m_total_tm = 0;
            _this.m_dir = 0;
            _this.m_cur_pt = null;
            _this.m_dir_count = 8;
            _this.m_angle = 0;
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_dx_idis = 0;
            _this.m_dy_idis = 0;
            _this.m_idis_sec = 1000;
            _this.m_idis_millsec = 1000000;
            _this.m_end_pt = new laya.maths.Point();
            _this.m_cur_pt = new laya.maths.Point();
            _this.init(sx, sy, dx, dy, dircount);
            return _this;
        }
        pathnode.prototype.init = function (sx, sy, dx, dy, dircount) {
            if (dircount === void 0) { dircount = 8; }
            this.x = sx;
            this.y = sy;
            this.m_end_pt.setTo(dx, dy);
            this.m_dx = dx - sx;
            this.m_dy = dy - sy;
            this.m_angle = utils.genangle(this.m_dx, this.m_dy);
            this.m_dir = utils.gendir(this.m_dx, this.m_dy, this.m_dir_count, this.m_angle);
            //core.core_tiplog("pathnode init ",sx,sy,dx,dy);
        };
        pathnode.prototype.cal_total_tm = function (speed) {
            /*
            let cosRatio:number = Math.cos(this.m_angle);
            let sinRatio:number = Math.sin(this.m_angle);
            let idis:number = speed*this.m_idis_sec;//speed:pixels of every sec;
            let dx:number = Math.floor(idis*cosRatio);
            let dy:number = Math.floor(idis*sinRatio);
            this.m_dx_idis = dx;
            this.m_dy_idis = dy;
            if(dx != 0)
            {
                //millsec
                this.m_total_tm = (this.m_dx)*this.m_idis_millsec/dx;
            }
            else if(dy != 0)
            {
                this.m_total_tm = (this.m_dy)*this.m_idis_millsec/dy;
            }
            else
            {
                this.m_total_tm = 1;
            }
            */
            //
            var adx = Math.abs(this.m_dx);
            var ady = Math.abs(this.m_dy);
            var totaldis = Math.sqrt(adx * adx + ady * ady);
            this.m_total_tm = totaldis * 1000 / speed;
            //
            //core.core_tiplog("pathnode calc total tm ",this.m_dx,this.m_dy,this.m_total_tm);
        };
        pathnode.prototype.is_end = function (tm) {
            return ((tm - this.m_start_tm) >= this.m_total_tm);
        };
        pathnode.prototype.get_pos = function (tm) {
            var delta = tm - this.m_start_tm;
            if (delta <= 0) {
                this.m_cur_pt.x = this.x;
                this.m_cur_pt.y = this.y;
            }
            else if (delta >= this.m_total_tm) {
                this.m_cur_pt.x = this.m_end_pt.x;
                this.m_cur_pt.y = this.m_end_pt.y;
            }
            else {
                //this.m_cur_pt.x = this.x + delta*this.m_dx_idis/this.m_idis_millsec;
                //this.m_cur_pt.y = this.y + delta*this.m_dy_idis/this.m_idis_millsec;
                this.m_cur_pt.x = this.x + delta * this.m_dx / this.m_total_tm;
                this.m_cur_pt.y = this.y + delta * this.m_dy / this.m_total_tm;
            }
            //core.core_tiplog("pathnode get_pos ",delta,this.x,this.y,this.m_end_pt.x,this.m_end_pt.y,this.m_cur_pt.x,this.m_cur_pt.y);
            return this.m_cur_pt;
        };
        pathnode.prototype.dispose = function () {
        };
        return pathnode;
    }(laya.maths.Point));
    core.pathnode = pathnode;
})(core || (core = {}));
//# sourceMappingURL=pathnode.js.map
var utils;
(function (utils) {
    function getitembycls(sign, cls) {
        return Laya.Pool.getItemByClass(sign, cls);
    }
    utils.getitembycls = getitembycls;
    function recover(sign, item) {
        return Laya.Pool.recover(sign, item);
    }
    utils.recover = recover;
    function clearbysign(sign) {
        Laya.Pool.clearBySign(sign);
    }
    utils.clearbysign = clearbysign;
})(utils || (utils = {}));
//# sourceMappingURL=pool.js.map
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
var core;
(function (core) {
    var rendercamera = /** @class */ (function (_super) {
        __extends(rendercamera, _super);
        function rendercamera() {
            var _this = _super.call(this) || this;
            _this.m_tween = null;
            _this.m_dst = new laya.maths.Point();
            _this.m_viewport = new laya.maths.Rectangle();
            return _this;
        }
        rendercamera.prototype.dispose = function () {
        };
        rendercamera.prototype.update = function (delta) {
        };
        rendercamera.prototype.project = function (context) {
            //core.core_tiplog("renderview project ",this.x,this.y,cx,cy,context.m_camera.width,context.m_camera.height);
            this.m_viewport.setTo(this.x - (this.width >> 1), this.y - (this.height >> 1), this.width, this.height);
        };
        rendercamera.prototype.is_project = function (rt) {
            return this.m_viewport.intersects(rt);
        };
        rendercamera.prototype.set_pos = function (dx, dy, force) {
            if (force === void 0) { force = true; }
            if (this.m_dst.x == dx && this.m_dst.y == dy) {
                return;
            }
            this.m_dst.setTo(dx, dy);
            if (this.m_tween != null) {
                laya.utils.Tween.clear(this.m_tween);
                this.m_tween = null;
            }
            if (force) {
                this.setTo(dx, dy, this.width, this.height);
            }
            else {
                laya.utils.Tween.to(this, { x: dx, y: dy }, 500, Laya.Ease.cubicOut, null, 0, true, true);
            }
        };
        return rendercamera;
    }(laya.maths.Rectangle));
    core.rendercamera = rendercamera;
})(core || (core = {}));
//# sourceMappingURL=rendercamera.js.map
var core;
(function (core) {
    var rendercontext = /** @class */ (function () {
        function rendercontext() {
            this.m_walk_speed = 300;
            this.m_run_speed = 8000;
        }
        rendercontext.prototype.get_move_spd = function (b_run) {
            if (b_run) {
                return this.m_run_speed;
            }
            return this.m_walk_speed;
        };
        rendercontext.prototype.dispose = function () {
            this.m_render = null;
            this.m_camera = null;
            this.m_view = null;
        };
        return rendercontext;
    }());
    core.rendercontext = rendercontext;
})(core || (core = {}));
//# sourceMappingURL=rendercontext.js.map
var core;
(function (core) {
    function render_sort(a, b) {
        return a.m_screen_z - b.m_screen_z; //a - b small 2 big;b - a big 2 small
    }
    var renderimpl = /** @class */ (function () {
        function renderimpl() {
            this.m_eye = null;
            this.m_eye_tm = 0;
            this.m_camera = new core.rendercamera();
            this.m_view = new core.renderview();
            this.m_scene = new core.renderscene();
            this.m_renderrcs = new Array();
            this.m_context = new core.rendercontext();
            this.m_context.m_camera = this.m_camera;
            this.m_context.m_render = this;
            this.m_context.m_view = this.m_view;
            this.m_world_rect = new laya.maths.Rectangle();
        }
        renderimpl.prototype.initstage = function (sp) {
            this.m_view.removeSelf();
            sp.addChild(this.m_view);
        };
        renderimpl.prototype.setworldwh = function (w, h) {
            this.m_world_rect.setTo(0, 0, w, h);
        };
        renderimpl.prototype.getworldw = function () {
            return this.m_world_rect.width;
        };
        renderimpl.prototype.getworldh = function () {
            return this.m_world_rect.height;
        };
        renderimpl.prototype.set_eye = function (unit) {
            this.m_eye = unit;
        };
        //new start
        renderimpl.prototype._get_renderavatar_ins = function (shape, x, y, use_default) {
            if (use_default === void 0) { use_default = true; }
            var ret = utils.getitembycls("renderavatar", core.renderavatar);
            ret.re_init(shape, x, y, use_default);
            return ret;
        };
        renderimpl.prototype._del_renderavatar_ins = function (ins) {
            ins.dispose();
            utils.recover("renderavatar", ins);
        };
        renderimpl.prototype._get_rendereff_ins = function (aniid, x, y, underunit, autodel) {
            var ret = utils.getitembycls("rendereff", core.rendereff);
            ret.re_init(aniid, x, y, underunit, autodel);
            return ret;
        };
        renderimpl.prototype._del_rendereff_ins = function (ins) {
            ins.dispose();
            utils.recover("rendereff", ins);
        };
        renderimpl.prototype._get_renderani_ins = function (aniid, x, y, underunit) {
            var ret = utils.getitembycls("renderani", core.renderani);
            ret.re_init(aniid, x, y, underunit);
            return ret;
        };
        renderimpl.prototype._del_renderani_ins = function (ins) {
            ins.dispose();
            utils.recover("renderani", ins);
        };
        renderimpl.prototype._get_rendersprite_ins = function (sp, x, y, b_unit_front) {
            if (b_unit_front === void 0) { b_unit_front = true; }
            var ret = utils.getitembycls("rendersprite", core.rendersprite);
            ret.re_init(sp, x, y, b_unit_front);
            return ret;
        };
        renderimpl.prototype._del_rendersprite_ins = function (ins) {
            ins.dispose();
            utils.recover("rendersprite", ins);
        };
        //end
        renderimpl.prototype.update_camera_pos = function (delta) {
            if (this.m_eye != null) {
                this.m_eye_tm += delta;
                if (this.m_eye_tm > 0) {
                    this.m_eye_tm = 0;
                    this.setcamerapos(this.m_eye.x, this.m_eye.y, true);
                }
            }
        };
        renderimpl.prototype.setcamerapos = function (x, y, force) {
            if (force === void 0) { force = true; }
            var min_x = 0;
            var max_x = 0;
            var min_y = 0;
            var max_y = 0;
            if (this.getviewportw() >= this.getworldw()) {
                x = this.getworldw() >> 1;
            }
            else {
                min_x = (this.getviewportw() >> 1);
                if (x < min_x) {
                    x = min_x;
                }
                max_x = this.getworldw() - (this.getviewportw() >> 1);
                if (x > max_x) {
                    x = max_x;
                }
            }
            if (this.getviewporth() >= this.getworldh()) {
                y = this.getworldh() >> 1;
            }
            else {
                min_y = (this.getviewporth() >> 1);
                if (y < min_y) {
                    y = min_y;
                }
                max_y = this.getworldh() - (this.getviewporth() >> 1);
                if (y > max_y) {
                    y = max_y;
                }
            }
            //core.core_tiplog("renderimpl setcamerapos ",x,y,min_x,max_x,min_y,max_y,this.getworldw(),this.getworldh(),this.getviewportw(),this.getviewporth());
            this.m_camera.set_pos(x, y, force);
        };
        renderimpl.prototype.setviewport = function (w, h) {
            this.m_camera.setTo(this.m_camera.x, this.m_camera.y, w, h);
        };
        renderimpl.prototype.getviewportw = function () {
            return this.m_camera.width;
        };
        renderimpl.prototype.getviewporth = function () {
            return this.m_camera.height;
        };
        renderimpl.prototype.dispose = function () {
            this.m_renderrcs = null;
            if (this.m_scene != null) {
                this.m_scene.dispose();
                this.m_scene = null;
            }
            if (this.m_context != null) {
                this.m_context.dispose();
                this.m_context = null;
            }
            if (this.m_camera != null) {
                this.m_camera.dispose();
                this.m_camera = null;
            }
            if (this.m_view != null) {
                this.m_view.removeSelf();
                this.m_view.dispose();
                this.m_view = null;
            }
        };
        renderimpl.prototype.addrc = function (rc) {
            this.m_renderrcs.push(rc);
        };
        //自己管理时间
        renderimpl.prototype.update = function (delta) {
            //update delta
            this.update_camera_pos(delta);
            this.m_camera.update(delta);
            this.m_scene.update(delta);
            this.m_view.update(delta);
        };
        renderimpl.prototype.render = function () {
            this.m_renderrcs.length = 0;
            this.m_camera.project(this.m_context);
            this.m_view.project(this.m_context);
            this.m_scene.project(this.m_context);
            this.m_renderrcs.sort(render_sort);
            this.m_view.renderbefore();
            for (var _i = 0, _a = this.m_renderrcs; _i < _a.length; _i++) {
                var i = _a[_i];
                i.render(this.m_context);
            }
            this.m_view.renderafter();
        };
        renderimpl.prototype.check_click = function (x, y) {
            for (var i = this.m_renderrcs.length - 1; i > 0; --i) {
                if (this.m_renderrcs[i].is_contain(x, y)) {
                    return this.m_renderrcs[i].m_obj.m_obj_id;
                }
            }
            return 0;
        };
        return renderimpl;
    }());
    core.renderimpl = renderimpl;
})(core || (core = {}));
//# sourceMappingURL=renderimpl.js.map
var core;
(function (core) {
    var renderscene = /** @class */ (function () {
        function renderscene() {
            this.m_units = new Array();
            this.m_units_dict = new Object();
            this.m_anis = new Array();
            this.m_effs = new Array();
            this.m_tempeffs = new Array();
            this.m_sprites = new Array();
            this.m_map = new core.rendermap();
            this.m_unitpath = new Array();
            this.m_follow_list = new Object();
        }
        renderscene.prototype.findpath = function (sx, sy, dx, dy, bclosest, spd) {
            return this.m_map.findpath(sx, sy, dx, dy, bclosest, spd);
        };
        renderscene.prototype.addpath = function (unit_path, unit_id) {
            this.delpath(unit_id);
            if (this.getunit(unit_id) == null) {
                return;
            }
            unit_path.m_unit_id = unit_id;
            this.m_unitpath.push(unit_path);
        };
        renderscene.prototype.get_unitpath = function (unit_id) {
            for (var _i = 0, _a = this.m_unitpath; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_unit_id == unit_id) {
                    return i;
                }
            }
            return null;
        };
        renderscene.prototype.delpath = function (unit_id) {
            for (var i = 0; i < this.m_unitpath.length; ++i) {
                var unitpath = this.m_unitpath[i];
                if (unitpath.m_unit_id == unit_id) {
                    unitpath.dispose();
                    this.m_unitpath.splice(i, 1);
                    utils.recover("path", unitpath);
                    return unitpath;
                }
            }
            return null;
        };
        renderscene.prototype.addunit = function (name, unit) {
            unit.set_name(name);
            this.m_units.push(unit);
            this.m_units_dict[unit.m_obj_id] = unit;
            return unit.m_obj_id;
        };
        renderscene.prototype.delunit = function (id) {
            for (var i = 0; i < this.m_units.length; ++i) {
                var unit = this.m_units[i];
                if (unit.m_obj_id == id) {
                    delete this.m_units_dict[id];
                    this.delpath(id);
                    unit.dispose();
                    this.m_units.splice(i, 1);
                    return unit;
                }
            }
            return null;
        };
        renderscene.prototype.getunitbyud = function (ud) {
            for (var i = 0; i < this.m_units.length; ++i) {
                var unit = this.m_units[i];
                if (unit.m_user_data == ud) {
                    return unit;
                }
            }
            return null;
        };
        renderscene.prototype.getunit = function (id) {
            var obj = this.m_units_dict[id];
            if (obj != undefined) {
                return obj;
            }
            return null;
        };
        renderscene.prototype.setunit_pos = function (id, x, y) {
            var obj = this.getunit(id);
            if (obj != null) {
                obj.set_pos(x, y);
            }
        };
        renderscene.prototype.setunit_dir = function (id, dir) {
            var obj = this.getunit(id);
            if (obj != null) {
                obj.change_dir(dir);
            }
        };
        renderscene.prototype.setunit_action = function (id, action_id) {
            var obj = this.getunit(id);
            if (obj != null) {
                obj.change_action(action_id);
            }
        };
        renderscene.prototype.clear = function () {
        };
        renderscene.prototype.dispose = function () {
            if (this.m_sprites != null) {
                for (var _i = 0, _a = this.m_sprites; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.dispose();
                }
                this.m_sprites = null;
            }
            if (this.m_anis != null) {
                for (var _b = 0, _c = this.m_anis; _b < _c.length; _b++) {
                    var i = _c[_b];
                    i.dispose();
                }
                this.m_anis = null;
            }
            if (this.m_effs != null) {
                for (var _d = 0, _e = this.m_effs; _d < _e.length; _d++) {
                    var i = _e[_d];
                    i.dispose();
                }
                this.m_effs = null;
            }
            if (this.m_units != null) {
                for (var _f = 0, _g = this.m_units; _f < _g.length; _f++) {
                    var i = _g[_f];
                    i.dispose();
                }
                this.m_units = null;
            }
            this.m_units_dict = null;
            if (this.m_map != null) {
                this.m_map.dispose();
                this.m_map = null;
            }
            this.m_unitpath = null;
            this.m_follow_list = null;
        };
        renderscene.prototype.update = function (delta) {
            this.m_map.update(delta);
            for (var _i = 0, _a = this.m_units; _i < _a.length; _i++) {
                var i = _a[_i];
                i.update(delta);
            }
            for (var _b = 0, _c = this.m_anis; _b < _c.length; _b++) {
                var i = _c[_b];
                i.update(delta);
            }
            //for(let i of this.m_sprites)
            //{
            //    i.update(delta);
            //}
            this.m_tempeffs = new Array();
            for (var _d = 0, _e = this.m_effs; _d < _e.length; _d++) {
                var i = _e[_d];
                if (i.m_b_end && i.m_b_autodel) {
                    i.dispose();
                }
                else {
                    i.update(delta);
                    this.m_tempeffs.push(i);
                }
            }
            this.m_effs = this.m_tempeffs;
            for (var i = this.m_unitpath.length - 1; i >= 0; --i) {
                var unitpath = this.m_unitpath[i];
                unitpath.update(delta);
                var cur_node = unitpath.get_cur_pt();
                //core.core_tiplog("unit walk ",unitpath.m_unit_id,cur_node.x,cur_node.y);
                this.setunit_pos(unitpath.m_unit_id, cur_node.x, cur_node.y);
                this.setunit_dir(unitpath.m_unit_id, cur_node.m_dir);
                if (unitpath.is_end()) {
                    this.setunit_action(unitpath.m_unit_id, 0 /* ACTION_STAND */);
                    unitpath.dispose();
                    this.m_unitpath.splice(i, 1);
                }
            }
        };
        renderscene.prototype.project = function (context) {
            this.m_map.project(context);
            for (var _i = 0, _a = this.m_units; _i < _a.length; _i++) {
                var i = _a[_i];
                i.project(context);
            }
            for (var _b = 0, _c = this.m_anis; _b < _c.length; _b++) {
                var i = _c[_b];
                i.project(context);
            }
            for (var _d = 0, _e = this.m_sprites; _d < _e.length; _d++) {
                var i = _e[_d];
                i.project(context);
            }
            for (var _f = 0, _g = this.m_effs; _f < _g.length; _f++) {
                var i = _g[_f];
                i.project(context);
            }
        };
        return renderscene;
    }());
    core.renderscene = renderscene;
})(core || (core = {}));
//# sourceMappingURL=renderscene.js.map
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
var core;
(function (core) {
    var renderview = /** @class */ (function (_super) {
        __extends(renderview, _super);
        function renderview() {
            var _this = _super.call(this) || this;
            _this.m_mapView = new laya.display.Sprite();
            _this.addChild(_this.m_mapView);
            _this.m_map_mask = new Laya.Sprite();
            _this.m_map_mask.graphics.drawRect(0, 0, 3000, 3000, "#000000");
            _this.m_map_mask.alpha = 0.3;
            //this.addChild(this.m_map_mask);
            _this.m_screeneffect_view = new Laya.Sprite();
            _this.addChild(_this.m_screeneffect_view);
            _this.m_ani_underunit_View = new laya.display.Sprite();
            _this.addChild(_this.m_ani_underunit_View);
            _this.m_unitshadow_View = new Laya.Sprite();
            _this.addChild(_this.m_unitshadow_View);
            _this.m_unitname_View = new Laya.Sprite();
            _this.addChild(_this.m_unitname_View);
            _this.m_unitground_View = new Laya.Sprite();
            _this.addChild(_this.m_unitground_View);
            _this.m_unitView = new laya.display.Sprite();
            _this.addChild(_this.m_unitView);
            _this.m_unitfront_View = new Laya.Sprite();
            _this.addChild(_this.m_unitfront_View);
            _this.m_ani_uponunit_view = new laya.display.Sprite();
            _this.addChild(_this.m_ani_uponunit_view);
            return _this;
        }
        renderview.prototype.renderbefore = function () {
            this.m_mapView.graphics.clear();
            this.m_mapView.removeChildren();
            this.m_ani_underunit_View.graphics.clear();
            this.m_ani_underunit_View.removeChildren();
            this.m_unitshadow_View.removeChildren();
            this.m_unitshadow_View.graphics.clear();
            this.m_unitname_View.removeChildren();
            this.m_unitname_View.graphics.clear();
            this.m_unitground_View.graphics.clear();
            this.m_unitground_View.removeChildren();
            this.m_unitView.graphics.clear();
            this.m_unitView.removeChildren();
            this.m_unitfront_View.graphics.clear();
            this.m_unitfront_View.removeChildren();
            this.m_ani_uponunit_view.graphics.clear();
            this.m_ani_uponunit_view.removeChildren();
        };
        renderview.prototype.blackscreen = function (tm) {
            if (this.m_screeneffect_view != null) {
                Laya.Tween.clearAll(this.m_screeneffect_view);
                this.m_screeneffect_view.graphics.clear();
                this.m_screeneffect_view.graphics.drawRect(-500, -500, 3000, 3000, '#000000');
                this.m_screeneffect_view.alpha = 0;
                Laya.Tween.to(this.m_screeneffect_view, { alpha: 1 }, tm, Laya.Ease.linearIn, Laya.Handler.create(this, this.blackreset, [1000]));
            }
        };
        renderview.prototype.blackreset = function (tm) {
            if (this.m_screeneffect_view != null) {
                Laya.Tween.clearAll(this.m_screeneffect_view);
                Laya.Tween.to(this.m_screeneffect_view, { alpha: 0 }, tm, Laya.Ease.linearIn, Laya.Handler.create(this, this.resetscreenview));
            }
        };
        renderview.prototype.resetscreenview = function () {
            if (this.m_screeneffect_view != null) {
                Laya.Tween.clearAll(this.m_screeneffect_view);
                this.m_screeneffect_view.graphics.clear();
            }
        };
        renderview.prototype.renderafter = function () {
        };
        renderview.prototype.update = function (delta) {
        };
        renderview.prototype.show_map_mask = function (flag, alpha) {
            if (alpha === void 0) { alpha = 0.3; }
            this.m_map_mask.alpha = alpha;
            if (flag) {
                this.addChildAt(this.m_map_mask, 1);
            }
            else {
                this.removeChild(this.m_map_mask);
            }
        };
        renderview.prototype.project = function (context) {
            var cx = context.m_camera.x;
            var cy = context.m_camera.y;
            this.x = (context.m_camera.width >> 1) - cx;
            this.y = (context.m_camera.height >> 1) - cy;
            this.m_map_mask.x = context.m_camera.x - (context.m_camera.width >> 1);
            this.m_map_mask.y = context.m_camera.y - (context.m_camera.height >> 1);
            //this.x = -cx;
            //this.y = -cy;
            //core.core_tiplog("renderview project ",this.x,this.y,cx,cy,context.m_camera.width,context.m_camera.height);
        };
        renderview.prototype.get_mapviewport_canvas = function (context, w, h) {
            return this.m_mapView.drawToCanvas(w, h, 0, 0);
        };
        renderview.prototype.dispose = function () {
            this.removeChildren();
            this.m_screeneffect_view = null;
            this.m_map_mask = null;
            this.m_mapView = null;
            this.m_unitshadow_View = null;
            this.m_unitname_View = null;
            this.m_unitground_View = null;
            this.m_unitView = null;
            this.m_unitfront_View = null;
            this.m_ani_underunit_View = null;
            this.m_ani_uponunit_view = null;
        };
        return renderview;
    }(laya.display.Sprite));
    core.renderview = renderview;
})(core || (core = {}));
//# sourceMappingURL=renderview.js.map
var core;
(function (core) {
    var renderagent = /** @class */ (function () {
        function renderagent() {
            this.m_update_follow_tm = 0;
            this.m_render = new core.renderimpl();
        }
        renderagent.prototype.set_avatar_config = function (conf) {
            core.matinfo_mgr().set_avatar_config(conf);
        };
        renderagent.prototype.set_map_config = function (conf) {
            core.matinfo_mgr().set_map_config(conf);
        };
        renderagent.prototype.set_ani_config = function (conf) {
            core.matinfo_mgr().set_ani_config(conf);
        };
        renderagent.prototype.set_eff_config = function (conf) {
            core.matinfo_mgr().set_eff_config(conf);
        };
        renderagent.prototype.initstage = function (sp) {
            this.m_render.initstage(sp);
        };
        renderagent.prototype.check_point = function (x, y) {
            return this.m_render.check_click(x, y);
        };
        renderagent.prototype.blackscene = function (tm) {
            this.m_render.m_view.blackscreen(tm);
        };
        renderagent.prototype.setcamerapos = function (x, y, force) {
            if (force === void 0) { force = true; }
            this.m_render.setcamerapos(x, y, force);
        };
        renderagent.prototype.cameralookat = function (unit) {
            this.m_render.set_eye(unit);
        };
        renderagent.prototype.setviewport = function (w, h) {
            this.m_render.setviewport(w, h);
        };
        renderagent.prototype.update = function (delta) {
            this.m_render.update(delta);
            this.m_update_follow_tm += delta;
            if (this.m_update_follow_tm > 500) {
                this.update_follow_pos();
                this.m_update_follow_tm = 0;
            }
        };
        renderagent.prototype.render = function () {
            this.m_render.render();
        };
        renderagent.prototype.dispose = function () {
            if (this.m_render != null) {
                this.m_render.dispose();
                this.m_render = null;
            }
        };
        renderagent.prototype.clear = function () {
            this.m_render.m_scene.m_map.clear();
            this.delallani();
            this.delalleff();
            this.delallsprite();
            this.delallunit();
        };
        renderagent.prototype.check_release = function () {
            core.mat_mgr().check_release();
        };
        renderagent.prototype.preload_matres = function (res, extrares, types) {
            if (extrares === void 0) { extrares = ""; }
            if (types === void 0) { types = ""; }
            core.mat_mgr().preload_mat(res, extrares, types);
        };
        renderagent.prototype.clearmap = function () {
            this.m_render.m_scene.m_map.clear();
        };
        renderagent.prototype.clearmapslotcache = function () {
            core.mat_mgr().clearallmapslot();
        };
        renderagent.prototype.set_map_filter = function (f) {
            this.m_render.m_view.m_mapView.filters = f;
        };
        renderagent.prototype.show_map_mask = function (flag, alpha) {
            if (alpha === void 0) { alpha = 0.3; }
            this.m_render.m_view.show_map_mask(flag, alpha);
        };
        renderagent.prototype.setmapbk = function (res) {
            this.m_render.m_scene.m_map.setbk(res);
        };
        renderagent.prototype.addmapscrollbk = function (res, w, h) {
            this.m_render.m_scene.m_map.addscrollbk(res, w, h);
        };
        renderagent.prototype.setmapscrollbkpos = function (x, y) {
            this.m_render.m_scene.m_map.setscrollbkpos(x, y);
        };
        renderagent.prototype.setmapscrollbkview = function (w, h) {
            this.m_render.m_scene.m_map.setscrollbkview(w, h);
        };
        renderagent.prototype.setmapscrollbkspd = function (spd) {
            this.m_render.m_scene.m_map.setscrollbkspd(spd);
        };
        renderagent.prototype.clearmapscrollbk = function () {
            this.m_render.m_scene.m_map.clearscrollbk();
        };
        renderagent.prototype.setmapbksp = function (sp) {
            this.m_render.m_scene.m_map.setsp(sp);
        };
        renderagent.prototype.clearmapbksp = function () {
            this.m_render.m_scene.m_map.removesp();
        };
        renderagent.prototype.stagepos2worldpos = function (pos) {
            return new laya.maths.Point(pos.x + this.m_render.m_camera.m_viewport.x, pos.y + this.m_render.m_camera.m_viewport.y);
        };
        renderagent.prototype.worldpos2stagepos = function (pos) {
            return new laya.maths.Point(pos.x - this.m_render.m_camera.m_viewport.x, pos.y - this.m_render.m_camera.m_viewport.y);
        };
        renderagent.prototype.entermap = function (mapid, b_slot) {
            if (b_slot === void 0) { b_slot = true; }
            this.m_render.m_scene.m_map.setmapid(mapid, b_slot);
            this.m_render.setworldwh(this.m_render.m_scene.m_map.m_mapw, this.m_render.m_scene.m_map.m_maph);
        };
        renderagent.prototype.addani = function (aniid, x, y, underunit) {
            if (underunit === void 0) { underunit = true; }
            //need code objects pool
            var ani = this.m_render._get_renderani_ins(aniid, x, y, underunit);
            this.m_render.m_scene.m_anis.push(ani);
            return ani.m_obj_id;
        };
        renderagent.prototype.delani = function (objid) {
            var idx = 0;
            for (var _i = 0, _a = this.m_render.m_scene.m_anis; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_obj_id == objid) {
                    i.dispose();
                    this.m_render.m_scene.m_anis.splice(idx, 1);
                    this.m_render._del_renderani_ins(i);
                    return;
                }
                idx++;
            }
        };
        renderagent.prototype.delallani = function () {
            for (var _i = 0, _a = this.m_render.m_scene.m_anis; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render._del_renderani_ins(i);
            }
            this.m_render.m_scene.m_anis = new Array();
        };
        renderagent.prototype.addsprite = function (sp, x, y, b_unit_front) {
            if (b_unit_front === void 0) { b_unit_front = true; }
            //need code objects pool
            var rsp = this.m_render._get_rendersprite_ins(sp, x, y, b_unit_front);
            this.m_render.m_scene.m_sprites.push(rsp);
            return rsp.m_obj_id;
        };
        renderagent.prototype.getsprite = function (objid) {
            for (var _i = 0, _a = this.m_render.m_scene.m_sprites; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_obj_id == objid) {
                    return i;
                }
            }
            return null;
        };
        renderagent.prototype.delsprite = function (objid) {
            var idx = 0;
            for (var _i = 0, _a = this.m_render.m_scene.m_sprites; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_obj_id == objid) {
                    i.dispose();
                    this.m_render.m_scene.m_sprites.splice(idx, 1);
                    this.m_render._del_rendersprite_ins(i);
                    return;
                }
                idx++;
            }
        };
        renderagent.prototype.delallsprite = function () {
            for (var _i = 0, _a = this.m_render.m_scene.m_sprites; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render._del_rendersprite_ins(i);
            }
            this.m_render.m_scene.m_sprites = new Array();
        };
        /////
        //.ani
        renderagent.prototype.addeff = function (aniid, x, y, underunit, autodel) {
            if (underunit === void 0) { underunit = true; }
            if (autodel === void 0) { autodel = false; }
            //need code objects pool
            var ani = this.m_render._get_rendereff_ins(aniid, x, y, underunit, autodel);
            this.m_render.m_scene.m_effs.push(ani);
            return ani.m_obj_id;
        };
        renderagent.prototype.deleff = function (objid) {
            var idx = 0;
            for (var _i = 0, _a = this.m_render.m_scene.m_effs; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_obj_id == objid) {
                    i.dispose();
                    this.m_render.m_scene.m_effs.splice(idx, 1);
                    this.m_render._del_rendereff_ins(i);
                    return;
                }
                idx++;
            }
        };
        renderagent.prototype.delalleff = function () {
            for (var _i = 0, _a = this.m_render.m_scene.m_effs; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render._del_rendereff_ins(i);
            }
            this.m_render.m_scene.m_effs = new Array();
        };
        renderagent.prototype.addunit = function (name, shape, x, y, use_default) {
            if (use_default === void 0) { use_default = true; }
            var unitobj = this.m_render._get_renderavatar_ins(shape, x, y, use_default);
            return this.m_render.m_scene.addunit(name, unitobj);
        };
        renderagent.prototype.delunit = function (id) {
            var delunit = this.m_render.m_scene.delunit(id);
            if (delunit != null && this.m_render.m_eye != null && this.m_render.m_eye == delunit) {
                this.cameralookat(null);
            }
            if (delunit != null) {
                if (this.m_render.m_scene.m_follow_list[id] != undefined) {
                    delete this.m_render.m_scene.m_follow_list[id];
                }
                var del_chase_list = new Array();
                for (var _i = 0, _a = Object.keys(this.m_render.m_scene.m_follow_list); _i < _a.length; _i++) {
                    var k = _a[_i];
                    if (this.m_render.m_scene.m_follow_list.hasOwnProperty(k)) {
                        var c_id = parseInt(k);
                        var f_id = this.m_render.m_scene.m_follow_list[c_id];
                        if (f_id == id) {
                            del_chase_list.push(c_id);
                            delete this.m_render.m_scene.m_follow_list[c_id];
                        }
                    }
                }
                this.m_render._del_renderavatar_ins(delunit);
                for (var _b = 0, del_chase_list_1 = del_chase_list; _b < del_chase_list_1.length; _b++) {
                    var i = del_chase_list_1[_b];
                    this.delunit(i);
                }
            }
        };
        renderagent.prototype.set_follow_id = function (chase_id, follow_id) {
            var chase_role = this.getunit(chase_id);
            if (chase_role == null) {
                return;
            }
            var follow_role = this.getunit(follow_id);
            if (follow_role == null) {
                return;
            }
            this.m_render.m_scene.m_follow_list[chase_id] = follow_id;
            var deltax = 100;
            var deltay = 100;
            chase_role.set_pos(follow_role.x + Math.random() * deltax - deltax / 2, follow_role.y + Math.random() * deltay - deltay / 2);
        };
        renderagent.prototype.clear_follow_id = function (chase_id) {
            if (this.m_render.m_scene.m_follow_list.hasOwnProperty(chase_id.toString())) {
                delete this.m_render.m_scene.m_follow_list[chase_id];
            }
        };
        renderagent.prototype.clear_all_follow = function (follow_id) {
            for (var _i = 0, _a = Object.keys(this.m_render.m_scene.m_follow_list); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_render.m_scene.m_follow_list.hasOwnProperty(key)) {
                    var f_id = this.m_render.m_scene.m_follow_list[parseInt(key)];
                    if (f_id == follow_id) {
                        this.delunit(parseInt(key));
                        delete this.m_render.m_scene.m_follow_list[parseInt(key)];
                    }
                }
            }
        };
        renderagent.prototype._gen_back_pos = function (pt, dir) {
            switch (dir) {
                case 0:
                    pt.y -= 30;
                    pt.x += 40;
                    break;
                case 1:
                    pt.y += 10;
                    pt.x += 45;
                    break;
                case 2:
                    pt.y += 40;
                    pt.x += 30;
                    break;
                case 3:
                    pt.y += 45;
                    pt.x -= 10;
                    break;
                case 4:
                    pt.y += 30;
                    pt.x -= 40;
                    break;
                case 5:
                    pt.y -= 15;
                    pt.x -= 40;
                    break;
                case 6:
                    pt.y -= 40;
                    pt.x -= 30;
                    break;
                case 7:
                    pt.y += 10;
                    pt.x -= 45;
                    break;
                default:
                    break;
            }
            return pt;
        };
        renderagent.prototype.update_follow_pos = function () {
            var pt = new Laya.Point();
            for (var _i = 0, _a = Object.keys(this.m_render.m_scene.m_follow_list); _i < _a.length; _i++) {
                var k = _a[_i];
                if (this.m_render.m_scene.m_follow_list.hasOwnProperty(k)) {
                    var c_id = parseInt(k);
                    var f_id = this.m_render.m_scene.m_follow_list[c_id];
                    var f_role = this.getunit(f_id);
                    if (f_role != null) {
                        pt.x = f_role.x;
                        pt.y = f_role.y;
                        pt = this._gen_back_pos(pt, f_role.m_dir);
                        this.unit_walk2(c_id, pt.x, pt.y, true);
                    }
                }
            }
        };
        renderagent.prototype.delallunit = function () {
            this.cameralookat(null);
            for (var i = 0; i < this.m_render.m_scene.m_units.length; ++i) {
                var unit = this.m_render.m_scene.m_units[i];
                this.m_render.m_scene.delpath(unit.m_obj_id);
                unit.dispose();
                this.m_render._del_renderavatar_ins(unit);
            }
            this.m_render.m_scene.m_units_dict = new Object();
            this.m_render.m_scene.m_units.length = 0;
            this.m_render.m_scene.m_follow_list = new Object();
        };
        renderagent.prototype.getunitbyud = function (ud) {
            return this.m_render.m_scene.getunitbyud(ud);
        };
        renderagent.prototype.getunit = function (id) {
            return this.m_render.m_scene.getunit(id);
        };
        renderagent.prototype.getmap_gridw = function () {
            return this.m_render.m_scene.m_map.m_block.m_mat.m_grid_w;
        };
        renderagent.prototype.getmap_gridh = function () {
            return this.m_render.m_scene.m_map.m_block.m_mat.m_grid_h;
        };
        renderagent.prototype.unit_stop = function (id) {
            var unit = this.getunit(id);
            if (unit != null) {
                this.m_render.m_scene.delpath(id);
                unit.change_action(0 /* ACTION_STAND */);
            }
        };
        renderagent.prototype.is_unit_walk = function (id) {
            var p = this.m_render.m_scene.get_unitpath(id);
            return p != null;
        };
        renderagent.prototype.get_unit_walk = function (id) {
            return this.m_render.m_scene.get_unitpath(id);
        };
        renderagent.prototype.is_scene_block = function (x, y) {
            return this.m_render.m_scene.m_map.is_block(x, y);
        };
        renderagent.prototype.is_scene_mask = function (x, y) {
            return this.m_render.m_scene.m_map.is_mask(x, y);
        };
        renderagent.prototype.get_map_canvas = function (w, h, x, y) {
            return this.m_render.m_view.get_mapviewport_canvas(this.m_render.m_context, w, h);
        };
        renderagent.prototype.get_camera_x = function () {
            return this.m_render.m_camera.x;
        };
        renderagent.prototype.get_view_x = function () {
            return this.m_render.m_view.x;
        };
        renderagent.prototype.get_view_y = function () {
            return this.m_render.m_view.y;
        };
        renderagent.prototype.get_camera_y = function () {
            return this.m_render.m_camera.y;
        };
        renderagent.prototype.set_walk_spd = function (spd) {
            this.m_render.m_context.m_walk_speed = spd;
        };
        renderagent.prototype.set_run_spd = function (spd) {
            this.m_render.m_context.m_run_speed = spd;
        };
        renderagent.prototype.unit_walk2inspd = function (id, x, y, b_force, spd) {
            var unit = this.getunit(id);
            if (unit != null) {
                //let newpath:path = new path();
                var sx = unit.x;
                var sy = unit.y;
                if (sx == x && sy == y) {
                    return;
                }
                core.core_tiplog("unit_walk2 findpath start ", id, sx, sy, x, y);
                var newpath = null;
                if (b_force) {
                    newpath = utils.getitembycls("path", core.path);
                    newpath.init(spd);
                    newpath.push_pt(sx, sy, x, y);
                }
                else {
                    newpath = this.m_render.m_scene.findpath(sx, sy, x, y, true, spd);
                }
                core.core_tiplog("unit_walk2 findpath end ", id, sx, sy, x, y, newpath);
                //newpath.push_pt(sx,sy,x,y);
                if (newpath == null) {
                    return;
                }
                newpath.start();
                this.m_render.m_scene.addpath(newpath, id);
                if (unit.m_action != 1 /* ACTION_RUN */) {
                    unit.change_action(1 /* ACTION_RUN */);
                }
                return newpath.get_end();
            }
            return;
        };
        renderagent.prototype.unit_walk2 = function (id, x, y, b_force, b_run) {
            if (b_force === void 0) { b_force = false; }
            if (b_run === void 0) { b_run = false; }
            return this.unit_walk2inspd(id, x, y, b_force, this.m_render.m_context.get_move_spd(b_run));
        };
        return renderagent;
    }());
    core.renderagent = renderagent;
})(core || (core = {}));
//# sourceMappingURL=renderagent.js.map
var core;
(function (core) {
    var filehead = /** @class */ (function () {
        function filehead() {
            this.m_key = 0;
            this.m_size = 0;
            this.m_offset = 0;
        }
        return filehead;
    }());
    var filepack = /** @class */ (function () {
        function filepack(buff) {
            this.m_sign = 0;
            this.m_version = 0;
            this.m_filecount = 0;
            this.m_filehead_arr = new Array();
            this.m_filehead_dict = new Object();
            this.m_buff = null;
            this.m_fh_sign = "pack_file_head";
            this.m_buff = buff;
            this.m_buff.pos = 0;
            this.m_sign = this.m_buff.getUint32();
            this.m_version = this.m_buff.getUint8();
            this.m_filecount = this.m_buff.getUint32();
            //core.core_tiplog("init pack ",this.m_sign,this.m_version,this.m_filecount);
            for (var i = 0; i < this.m_filecount; ++i) {
                var key = this.m_buff.getUint32();
                var size = this.m_buff.getUint32();
                var offset = this.m_buff.getUint32();
                var new_filehead = utils.getitembycls(this.m_fh_sign, filehead);
                new_filehead.m_key = key;
                new_filehead.m_size = size;
                new_filehead.m_offset = offset;
                this.m_filehead_arr.push(new_filehead);
                this.m_filehead_dict[key] = new_filehead;
                //core.core_tiplog("file ",key.toString(16),size,offset);
            }
        }
        filepack.prototype.dispose = function () {
            for (var _i = 0, _a = this.m_filehead_arr; _i < _a.length; _i++) {
                var i = _a[_i];
                utils.recover(this.m_fh_sign, i);
            }
            this.m_filehead_arr.length = 0;
            this.m_filehead_dict = new Object();
            this.m_buff.clear();
            this.m_buff = null;
        };
        filepack.prototype._gen_key = function (file_name) {
            var ret = core.get_file_key(file_name);
            core.core_tiplog("filepack _gen_key ", file_name, ret.toString(16));
            return ret;
        };
        filepack.prototype.get_file = function (file_name) {
            var key = this._gen_key(file_name);
            if (this.m_filehead_dict[key] == undefined) {
                return null;
            }
            var fh = this.m_filehead_dict[key];
            this.m_buff.pos = fh.m_offset;
            var size = fh.m_size;
            return this.m_buff;
        };
        filepack.prototype.get_file_len = function (file_name) {
            var key = this._gen_key(file_name);
            if (this.m_filehead_dict[key] == undefined) {
                return 0;
            }
            var fh = this.m_filehead_dict[key];
            return fh.m_size;
        };
        return filepack;
    }());
    var filepackmgr = /** @class */ (function () {
        function filepackmgr() {
            this.m_pack_dict = new Object();
        }
        filepackmgr.prototype.delpack = function (pack_name) {
            if (this.m_pack_dict.hasOwnProperty(pack_name) == false) {
                return;
            }
            var fp = this.m_pack_dict[pack_name];
            if (fp != undefined && fp != null) {
                fp.dispose();
            }
            this.m_pack_dict[pack_name] = null;
        };
        filepackmgr.prototype.addpack = function (pack_name, buff) {
            if (this.m_pack_dict.hasOwnProperty(pack_name)) {
                this.delpack(pack_name);
            }
            var new_fp = new filepack(buff);
            this.m_pack_dict[pack_name] = new_fp;
        };
        filepackmgr.prototype.get_file = function (pack_name, file_name) {
            if (this.m_pack_dict.hasOwnProperty(pack_name) == false) {
                return;
            }
            var fp = this.m_pack_dict[pack_name];
            if (fp != undefined && fp != null) {
                return fp.get_file(file_name);
            }
            return null;
        };
        filepackmgr.prototype.get_file_len = function (pack_name, file_name) {
            if (this.m_pack_dict.hasOwnProperty(pack_name) == false) {
                return 0;
            }
            var fp = this.m_pack_dict[pack_name];
            if (fp != undefined && fp != null) {
                return fp.get_file_len(file_name);
            }
            return 0;
        };
        return filepackmgr;
    }());
    core.filepackmgr = filepackmgr;
    var g_ins = null;
    function filepack_ins() {
        if (g_ins == null) {
            g_ins = new filepackmgr();
        }
        return g_ins;
    }
    core.filepack_ins = filepack_ins;
})(core || (core = {}));
//# sourceMappingURL=filepack.js.map
var utils;
(function (utils) {
    var game_data_mgr = /** @class */ (function () {
        function game_data_mgr() {
            this.m_data_class_map = new Object();
            this.m_data_map = new Object();
        }
        game_data_mgr.prototype.register_data = function (name, module_cls) {
            this.m_data_class_map[name] = module_cls;
        };
        game_data_mgr.prototype.get_data = function (name) {
            if (this.m_data_map.hasOwnProperty(name)) {
                return this.m_data_map[name];
            }
            if (this.m_data_class_map.hasOwnProperty(name)) {
                var m_cls = this.m_data_class_map[name];
                var m = new m_cls();
                this.m_data_map[name] = m;
                return m;
            }
            return null;
        };
        game_data_mgr.prototype.dispose = function () {
            this.m_data_class_map = new Object();
            for (var _i = 0, _a = Object.keys(this.m_data_map); _i < _a.length; _i++) {
                var i = _a[_i];
                var m = this.m_data_map[i];
                m.dispose();
            }
            this.m_data_map = new Object();
        };
        return game_data_mgr;
    }());
    utils.game_data_mgr = game_data_mgr;
    var g_ins = null;
    function data_ins() {
        if (g_ins == null) {
            g_ins = new game_data_mgr();
        }
        return g_ins;
    }
    utils.data_ins = data_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_data_mgr.js.map
var utils;
(function (utils) {
    var game_data = /** @class */ (function () {
        function game_data() {
        }
        game_data.prototype.dispose = function () {
        };
        return game_data;
    }());
    utils.game_data = game_data;
})(utils || (utils = {}));
//# sourceMappingURL=game_data.js.map
var utils;
(function (utils) {
    var game_event_receiver = /** @class */ (function () {
        function game_event_receiver() {
            this.m_event_func = new Object();
        }
        game_event_receiver.prototype.register_event_func = function (event, func) {
            this.m_event_func[event] = func;
            return;
        };
        game_event_receiver.prototype.unregister_event_func = function (event) {
            if (this.m_event_func.hasOwnProperty(event)) {
                delete this.m_event_func[event];
            }
        };
        game_event_receiver.prototype.unregister_all_event_func = function () {
            this.m_event_func = new Object();
        };
        game_event_receiver.prototype.on_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            if (this.m_event_func.hasOwnProperty(event)) {
                var func = this.m_event_func[event];
                func.apply(this, [user_data]);
            }
            return;
        };
        game_event_receiver.prototype.dispose = function () {
            this.unregister_all_event_func();
        };
        return game_event_receiver;
    }());
    utils.game_event_receiver = game_event_receiver;
    var game_event_dispatcher = /** @class */ (function () {
        function game_event_dispatcher() {
            this.m_pause = false;
            this.m_handler_map = new Object();
            this.m_handler_next_frame_map = new Object();
        }
        game_event_dispatcher.prototype.pause = function () {
            this.m_pause = true;
        };
        game_event_dispatcher.prototype.resume = function () {
            this.m_pause = false;
        };
        game_event_dispatcher.prototype.register_event = function (event, hander) {
            if (this.m_handler_map.hasOwnProperty(event) == false) {
                this.m_handler_map[event] = new Array();
            }
            var arr = this.m_handler_map[event];
            if (arr.indexOf(hander) < 0) {
                arr.push(hander);
            }
        };
        game_event_dispatcher.prototype.unregister_event = function (event, hander) {
            if (this.m_handler_map.hasOwnProperty(event)) {
                var arr = this.m_handler_map[event];
                var idx = arr.indexOf(hander);
                if (idx >= 0) {
                    arr.splice(idx, 1);
                }
            }
        };
        game_event_dispatcher.prototype.unregister_allevent = function (hander) {
            for (var i in this.m_handler_map) {
                if (this.m_handler_map.hasOwnProperty(i)) {
                    this.unregister_event(i, hander);
                }
            }
        };
        game_event_dispatcher.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            if (this.m_handler_map.hasOwnProperty(event)) {
                var arr = this.m_handler_map[event];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var i = arr_1[_i];
                    i.on_event(event, user_data);
                }
            }
        };
        game_event_dispatcher.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            this.m_handler_next_frame_map[event] = user_data;
        };
        game_event_dispatcher.prototype.dispatch_all_delay_event = function () {
            if (this.m_pause) {
                return;
            }
            var tmpmap = this.m_handler_next_frame_map;
            this.m_handler_next_frame_map = new Object();
            for (var _i = 0, _a = Object.keys(tmpmap); _i < _a.length; _i++) {
                var prop = _a[_i];
                this.fire_event(prop, tmpmap[prop]);
            }
        };
        game_event_dispatcher.prototype.dispose = function () {
            this.m_handler_map = new Object();
            this.m_handler_next_frame_map = new Object();
        };
        return game_event_dispatcher;
    }());
    utils.game_event_dispatcher = game_event_dispatcher;
    var g_event_ins = null;
    function event_ins() {
        if (g_event_ins == null) {
            g_event_ins = new game_event_dispatcher();
        }
        return g_event_ins;
    }
    utils.event_ins = event_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_event_dispatcher.js.map
var utils;
(function (utils) {
    var game_module_mgr = /** @class */ (function () {
        function game_module_mgr() {
            this.m_module_class_map = new Object();
            this.m_module_map = new Object();
        }
        game_module_mgr.prototype.register_module = function (name, module_cls) {
            this.m_module_class_map[name] = module_cls;
        };
        game_module_mgr.prototype.get_module = function (name) {
            if (this.m_module_map.hasOwnProperty(name)) {
                return this.m_module_map[name];
            }
            if (this.m_module_class_map.hasOwnProperty(name)) {
                var m_cls = this.m_module_class_map[name];
                var m = new m_cls();
                this.m_module_map[name] = m;
                return m;
            }
            return null;
        };
        game_module_mgr.prototype.dispose = function () {
            this.m_module_class_map = new Object();
            for (var _i = 0, _a = Object.keys(this.m_module_map); _i < _a.length; _i++) {
                var i = _a[_i];
                var m = this.m_module_map[i];
                m.dispose();
            }
            this.m_module_map = new Object();
        };
        return game_module_mgr;
    }());
    utils.game_module_mgr = game_module_mgr;
    var g_ins = null;
    function module_ins() {
        if (g_ins == null) {
            g_ins = new game_module_mgr();
        }
        return g_ins;
    }
    utils.module_ins = module_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_module_mgr.js.map
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
var utils;
(function (utils) {
    var game_module = /** @class */ (function (_super) {
        __extends(game_module, _super);
        function game_module() {
            return _super.call(this) || this;
        }
        game_module.prototype.register_net_event = function (cmd, func) {
            var event = game_event.gen_netcmd_event(cmd);
            utils.event_ins().register_event(event, this);
            this.register_event_func(event, func);
        };
        game_module.prototype.unregister_net_event = function (cmd) {
            var event = game_event.gen_netcmd_event(cmd);
            utils.event_ins().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        game_module.prototype.register_event = function (event, func) {
            utils.event_ins().register_event(event, this);
            this.register_event_func(event, func);
        };
        game_module.prototype.unregister_event = function (event) {
            utils.event_ins().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        game_module.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event(event, user_data);
        };
        game_module.prototype.unregister_allevent = function () {
            utils.event_ins().unregister_allevent(this);
            this.unregister_all_event_func();
        };
        game_module.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event_next_frame(event, user_data);
        };
        game_module.prototype.start = function () {
        };
        game_module.prototype.update = function (delta) {
        };
        game_module.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.unregister_allevent();
        };
        return game_module;
    }(utils.game_event_receiver));
    utils.game_module = game_module;
})(utils || (utils = {}));
//# sourceMappingURL=game_module.js.map
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
var utils;
(function (utils) {
    //
    //
    var ui_loadingUI = /** @class */ (function (_super) {
        __extends(ui_loadingUI, _super);
        function ui_loadingUI() {
            var _this = _super.call(this) || this;
            _this.m_b_use_ani = true;
            return _this;
        }
        ui_loadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui_loadingUI.uiView);
        };
        ui_loadingUI.prototype.init = function () {
            this.m_mask = new Laya.Sprite();
            this.m_mask.x = 0;
            //this.addChild(this.m_mask);
            this.m_mask.graphics.drawRect(0, 0, this.m_logo.width, this.m_logo.height, "#000000");
            //wechat should close
            //this.m_logo_grey.mask = this.m_mask;
        };
        ui_loadingUI.prototype.start = function () {
            if (this.m_b_use_ani) {
                this.m_logo.visible = false;
                this.m_logo_grey.visible = false;
                this.m_mask.visible = false;
                this.m_progress.visible = false;
                this.m_ani.play();
                this.m_ani.visible = true;
            }
            else {
                this.m_logo.visible = true;
                this.m_logo_grey.visible = true;
                this.m_mask.visible = true;
                this.m_progress.visible = true;
                this.m_ani.stop();
                this.m_ani.visible = false;
                this.m_mask.x = 0;
            }
        };
        ui_loadingUI.prototype.update = function () {
            if (this.m_b_use_ani) {
                return;
            }
            if (this.m_mask.x >= this.m_logo_grey.width) {
                this.m_mask.x = 0;
            }
            else {
                this.m_mask.x += 2;
            }
        };
        ui_loadingUI.uiView = { "type": "Dialog", "props": { "y": 0, "x": 0, "width": 800, "height": 400, "anchorY": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "m_logo", "skin": "bigpic/ui_loading.png", "gray": false } }, { "type": "Label", "props": { "y": 309, "x": 326, "width": 192, "var": "m_progress", "height": 88, "fontSize": 50, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "m_logo_grey", "skin": "bigpic/ui_loading.png", "gray": true } }, { "type": "Animation", "props": { "y": 231, "x": 400, "width": 0, "var": "m_ani", "source": "game_ani/uiloading.ani", "name": "m_ani", "height": 0 } }] };
        return ui_loadingUI;
    }(laya.ui.Dialog));
    utils.ui_loadingUI = ui_loadingUI;
    //
    /*
    export class ui_loadingUI extends laya.ui.Dialog {
        public m_logo:Laya.Image;
        public m_progress:Laya.Label;
        public m_logo_grey:Laya.Image;
        public m_mask:Laya.Sprite;
        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":800,"height":400,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"m_logo","skin":"bigpic/ui_loading.png","gray":false}},{"type":"Label","props":{"y":309,"x":326,"width":192,"var":"m_progress","height":88,"fontSize":50,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":0,"var":"m_logo_grey","skin":"bigpic/ui_loading.png","gray":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui_loadingUI.uiView);

        }
        public init():void{
            this.m_mask = new Laya.Sprite();
            this.m_mask.x = 0;
            //this.addChild(this.m_mask);
            this.m_mask.graphics.drawRect(0,0,this.m_logo.width,this.m_logo.height,"#000000");
            this.m_logo_grey.mask = this.m_mask;
        }
        public start():void{
            this.m_mask.x = 0;
        }
        public update():void{
            if(this.m_mask.x >= this.m_logo_grey.width){
                this.m_mask.x = 0;
            }
            else{
                this.m_mask.x += 2;
            }
        }
    }
    */
    //
    var game_widget_mgr = /** @class */ (function () {
        function game_widget_mgr() {
            this.m_widget_class_map = new Object();
            this.m_widget_group_map = new Object();
            this.m_widget_map = new Object();
            this.m_root_view = null;
            this.m_view_ins = new utils.game_widget_view();
            this.m_release_dict = new Object();
            this.m_loading_ui = null;
            this.m_loadingui_dict = new Object();
            this.m_loadingui_refs = 0;
        }
        game_widget_mgr.prototype.show_loadingui = function () {
            if (this.m_loading_ui == null) {
                this.m_loading_ui = new ui_loadingUI();
                this.m_loading_ui.init();
                this.m_loading_ui.x = (Laya.stage.width - this.m_loading_ui.width) >> 1;
                this.m_loading_ui.y = (Laya.stage.height - this.m_loading_ui.height) >> 1;
            }
            this.m_loading_ui.visible = true;
            this.m_loading_ui.start();
            this.m_view_ins.m_view_topmost.addChild(this.m_loading_ui);
        };
        game_widget_mgr.prototype.hide_loadingui = function () {
            if (this.m_loading_ui == null) {
                return;
            }
            this.m_loading_ui.visible = false;
            this.m_loading_ui.removeSelf();
        };
        game_widget_mgr.prototype.update_loadingui = function () {
            if (this.m_loading_ui == null || this.m_loading_ui.visible == false) {
                return;
            }
            this.m_loading_ui.update();
        };
        game_widget_mgr.prototype.del_loadingui = function () {
            if (this.m_loading_ui != null) {
                this.m_loading_ui.removeSelf();
                this.m_loading_ui.destroy();
                this.m_loading_ui = null;
            }
        };
        game_widget_mgr.prototype.start_load = function (uiins) {
            if (this.m_loadingui_dict.hasOwnProperty(uiins.m_id.toString()) == false) {
                this.m_loadingui_dict[uiins.m_id.toString()] = true;
                this.m_loadingui_refs += 1;
                this.show_loadingui();
            }
        };
        game_widget_mgr.prototype.end_load = function (uiins) {
            if (this.m_loadingui_dict.hasOwnProperty(uiins.m_id.toString())) {
                delete this.m_loadingui_dict[uiins.m_id.toString()];
                this.m_loadingui_refs -= 1;
                if (this.m_loadingui_refs <= 0) {
                    this.hide_loadingui();
                }
            }
        };
        game_widget_mgr.prototype.add_preload_res = function (path) {
            utils.game_widget.s_loaded_dict[path] = true;
        };
        game_widget_mgr.prototype.set_root = function (sp) {
            this.m_view_ins.removeSelf();
            this.m_root_view = sp;
            this.m_root_view.addChild(this.m_view_ins);
        };
        game_widget_mgr.prototype.get_view = function (layer) {
            return this.m_view_ins.get_view(layer);
        };
        game_widget_mgr.prototype.register_widget = function (name, widget_cls, w_group) {
            if (w_group === void 0) { w_group = utils.WIDGET_GROUP.GROUP_DEFAULT; }
            this.m_widget_class_map[name] = widget_cls;
            this.m_widget_group_map[name] = w_group;
        };
        game_widget_mgr.prototype.set_widget_group = function (name, w_group) {
            this.m_widget_group_map[name] = w_group;
        };
        game_widget_mgr.prototype.get_module = function (name) {
            if (this.m_widget_map.hasOwnProperty(name)) {
                return this.m_widget_map[name];
            }
            if (this.m_widget_class_map.hasOwnProperty(name)) {
                var m_cls = this.m_widget_class_map[name];
                var m = new m_cls();
                //m.load();
                this.m_widget_map[name] = m;
                m.m_widget_name = name;
                return m;
            }
            return null;
        };
        game_widget_mgr.prototype.show_widget = function (widget_name, flag, ud) {
            if (ud === void 0) { ud = null; }
            var w = this.get_module(widget_name);
            if (w != null) {
                if (ud != null) {
                    w.m_ud = ud;
                }
                w.show(flag);
                if (!flag) {
                    this.m_release_dict[widget_name] = [w, utils.get_render_milltm()];
                }
                else {
                    delete this.m_release_dict[widget_name];
                }
            }
        };
        game_widget_mgr.prototype.call_widget_hide = function (w) {
            this.m_release_dict[w.m_widget_name] = [w, utils.get_render_milltm()];
        };
        game_widget_mgr.prototype.check_release = function () {
            this.update_loadingui();
            for (var _i = 0, _a = Object.keys(this.m_release_dict); _i < _a.length; _i++) {
                var k = _a[_i];
                if (this.m_release_dict.hasOwnProperty(k)) {
                    var tm = this.m_release_dict[k][1];
                    if ((utils.get_render_milltm() - tm) > 10 * 1000) {
                        var m = this.m_widget_map[k];
                        utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONDISPOSE, m);
                        m.dispose();
                        delete this.m_widget_map[k];
                        delete this.m_release_dict[k];
                        core.core_errlog("game_widget_mgr release ", k);
                        return;
                    }
                }
            }
        };
        game_widget_mgr.prototype.show_widget_bygroup = function (v, flag, ud) {
            if (ud === void 0) { ud = null; }
            for (var k in this.m_widget_group_map) {
                if (this.m_widget_group_map.hasOwnProperty(k)) {
                    var w_v = this.m_widget_group_map[k];
                    if (v == w_v) {
                        this.show_widget(k, flag, ud);
                    }
                }
            }
        };
        game_widget_mgr.prototype.is_widget_show = function (widget_name) {
            var w = this.get_module(widget_name);
            if (w != null) {
                return w.m_b_show;
            }
            return false;
        };
        game_widget_mgr.prototype.dispose = function () {
            this.del_loadingui();
            this.m_widget_class_map = new Object();
            utils.event_ins().fire_event(game_event.EVENT_WIDGET_ALLDISPOSE);
            for (var _i = 0, _a = Object.keys(this.m_widget_map); _i < _a.length; _i++) {
                var i = _a[_i];
                var m = this.m_widget_map[i];
                m.dispose();
            }
            if (this.m_view_ins != null) {
                this.m_view_ins.removeSelf();
                this.m_view_ins.dispose();
                this.m_view_ins = null;
            }
            this.m_root_view = null;
            this.m_widget_map = new Object();
            this.m_widget_group_map = new Object();
        };
        return game_widget_mgr;
    }());
    utils.game_widget_mgr = game_widget_mgr;
    var g_ins = null;
    function widget_ins() {
        if (g_ins == null) {
            g_ins = new game_widget_mgr();
        }
        return g_ins;
    }
    utils.widget_ins = widget_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_widget_mgr.js.map
var utils;
(function (utils) {
    var WIDGET_LAYER;
    (function (WIDGET_LAYER) {
        WIDGET_LAYER[WIDGET_LAYER["SCENE"] = 0] = "SCENE";
        WIDGET_LAYER[WIDGET_LAYER["BACKGROUND"] = 1] = "BACKGROUND";
        WIDGET_LAYER[WIDGET_LAYER["BOTTOM"] = 2] = "BOTTOM";
        WIDGET_LAYER[WIDGET_LAYER["NORMAL"] = 3] = "NORMAL";
        WIDGET_LAYER[WIDGET_LAYER["POPUP"] = 4] = "POPUP";
        WIDGET_LAYER[WIDGET_LAYER["TIPS"] = 5] = "TIPS";
        WIDGET_LAYER[WIDGET_LAYER["TOP"] = 6] = "TOP";
        WIDGET_LAYER[WIDGET_LAYER["TOPMOST"] = 7] = "TOPMOST";
    })(WIDGET_LAYER = utils.WIDGET_LAYER || (utils.WIDGET_LAYER = {}));
    var WIDGET_GROUP;
    (function (WIDGET_GROUP) {
        WIDGET_GROUP[WIDGET_GROUP["GROUP_DEFAULT"] = 0] = "GROUP_DEFAULT";
        WIDGET_GROUP[WIDGET_GROUP["GROUP_0"] = 1] = "GROUP_0";
        WIDGET_GROUP[WIDGET_GROUP["GROUP_1"] = 2] = "GROUP_1";
        WIDGET_GROUP[WIDGET_GROUP["GROUP_2"] = 3] = "GROUP_2";
        WIDGET_GROUP[WIDGET_GROUP["GROUP_3"] = 4] = "GROUP_3";
        WIDGET_GROUP[WIDGET_GROUP["GROUP_4"] = 5] = "GROUP_4";
    })(WIDGET_GROUP = utils.WIDGET_GROUP || (utils.WIDGET_GROUP = {}));
})(utils || (utils = {}));
//# sourceMappingURL=game_widget_view_def.js.map
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
var utils;
(function (utils) {
    var game_widget_view = /** @class */ (function (_super) {
        __extends(game_widget_view, _super);
        function game_widget_view() {
            var _this = _super.call(this) || this;
            _this.m_view_scene = new laya.display.Sprite();
            _this.m_view_bk = new laya.display.Sprite();
            _this.m_view_bottom = new laya.display.Sprite();
            _this.m_view_normal = new laya.display.Sprite();
            _this.m_view_tips = new laya.display.Sprite();
            _this.m_view_popup = new laya.display.Sprite();
            _this.m_view_top = new laya.display.Sprite();
            _this.m_view_topmost = new laya.display.Sprite();
            _this.addChild(_this.m_view_scene);
            _this.addChild(_this.m_view_bk);
            _this.addChild(_this.m_view_bottom);
            _this.addChild(_this.m_view_normal);
            _this.addChild(_this.m_view_popup);
            _this.addChild(_this.m_view_tips);
            _this.addChild(_this.m_view_top);
            _this.addChild(_this.m_view_topmost);
            return _this;
        }
        game_widget_view.prototype.get_view = function (layer) {
            var ret = null;
            switch (layer) {
                case utils.WIDGET_LAYER.SCENE:
                    ret = this.m_view_scene;
                    break;
                case utils.WIDGET_LAYER.BACKGROUND:
                    ret = this.m_view_bk;
                    break;
                case utils.WIDGET_LAYER.BOTTOM:
                    ret = this.m_view_bottom;
                    break;
                case utils.WIDGET_LAYER.NORMAL:
                    ret = this.m_view_normal;
                    break;
                case utils.WIDGET_LAYER.TIPS:
                    ret = this.m_view_tips;
                    break;
                case utils.WIDGET_LAYER.POPUP:
                    ret = this.m_view_popup;
                    break;
                case utils.WIDGET_LAYER.TOP:
                    ret = this.m_view_top;
                    break;
                case utils.WIDGET_LAYER.TOPMOST:
                    ret = this.m_view_topmost;
                    break;
                default:
                    ret = this.m_view_normal;
                    break;
            }
            return ret;
        };
        game_widget_view.prototype.dispose = function () {
            this.removeChildren();
            this.m_view_scene.removeChildren();
            this.m_view_bk.removeChildren();
            this.m_view_bottom.removeChildren();
            this.m_view_normal.removeChildren();
            this.m_view_top.removeChildren();
            this.m_view_scene = null;
            this.m_view_bk = null;
            this.m_view_bottom = null;
            this.m_view_normal = null;
            this.m_view_popup = null;
            this.m_view_tips = null;
            this.m_view_top = null;
            this.m_view_topmost = null;
        };
        return game_widget_view;
    }(laya.display.Sprite));
    utils.game_widget_view = game_widget_view;
})(utils || (utils = {}));
//# sourceMappingURL=game_widget_view.js.map
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
var utils;
(function (utils) {
    var game_widget = /** @class */ (function (_super) {
        __extends(game_widget, _super);
        function game_widget(res_path, view_cls) {
            var _this = _super.call(this) || this;
            _this.m_res_path = null;
            _this.m_extra_res_list = new Array();
            _this.m_ui_cls = null;
            _this.m_ui = null;
            _this.m_b_loaded = false;
            _this.m_b_loading = false;
            _this.m_b_show = false;
            _this.m_b_disposed = false;
            _this.m_layer = utils.WIDGET_LAYER.NORMAL;
            _this.m_id = 0;
            _this.m_widget_name = "unknown_widget";
            _this.m_ud = null;
            _this.m_res_path = res_path;
            _this.m_ui_cls = view_cls;
            game_widget.m_start_id += 1;
            _this.m_id = game_widget.m_start_id;
            return _this;
        }
        game_widget.prototype.append_extrares = function (res_url, res_type) {
            this.m_extra_res_list.push({ url: res_url, type: res_type });
        };
        game_widget.prototype.move_center = function () {
            this.m_ui.x = (Laya.stage.width - this.m_ui.width) >> 1;
            this.m_ui.y = (Laya.stage.height - this.m_ui.height) >> 1;
        };
        game_widget.prototype.register_event = function (event, func) {
            utils.event_ins().register_event(event, this);
            this.register_event_func(event, func);
        };
        game_widget.prototype.unregister_event = function (event) {
            utils.event_ins().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        game_widget.prototype.unregister_allevent = function () {
            utils.event_ins().unregister_allevent(this);
            this.unregister_all_event_func();
        };
        game_widget.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event(event, user_data);
        };
        game_widget.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event_next_frame(event, user_data);
        };
        game_widget.prototype.register_btn_click = function (con_name, func) {
            var btn = this.get_con(con_name);
            if (btn != null) {
                btn.on(Laya.Event.CLICK, this, func);
            }
        };
        game_widget.prototype.unregister_btn_click = function (con_name, func) {
            var btn = this.get_con(con_name);
            if (btn != null) {
                btn.off(Laya.Event.CLICK, this, func);
            }
        };
        game_widget.prototype._get_con = function (node, name) {
            for (var i = 0; i < node.numChildren; ++i) {
                var nd = node.getChildAt(i);
                if (nd.name == name) {
                    return nd;
                }
                nd = this._get_con(nd, name);
                if (nd != null) {
                    return nd;
                }
            }
            return null;
        };
        game_widget.prototype.get_con = function (con_name) {
            if (this.m_b_loaded) {
                return this._get_con(this.m_ui, con_name);
            }
            return null;
        };
        game_widget.prototype.load = function () {
            //core.core_tiplog("game_widget start load ",this.m_res_path,this.m_ui_cls);
            //this.m_b_loaded = true;
            //alert("start load ui");
            var b_need_loaded = false;
            for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (game_widget.s_loaded_dict.hasOwnProperty(i["url"]) == false) {
                    core.ui_tiplog("game_widget load need download ", i["url"]);
                    b_need_loaded = true;
                }
            }
            if (b_need_loaded) { //有资源需要下载，显示loading界面
                utils.widget_ins().start_load(this);
            }
            this.m_b_loading = true;
            Laya.loader.on(Laya.Event.ERROR, this, this.on_load_error);
            core.res_tiplog("game_widget load res ", this.m_extra_res_list);
            core.myload(this.m_extra_res_list, laya.utils.Handler.create(this, this.on_load_complete), null, null, 0);
        };
        game_widget.prototype.init_uiins = function () {
            this.m_ui = new this.m_ui_cls();
            this.on_init();
            //todo
            //core.core_tiplog("game_widget on_load_complete ",this.m_res_path,this.m_ui_cls);
            if (this.m_b_show) {
                this.m_b_show = false;
                this.show(true);
            }
        };
        game_widget.prototype.on_load_complete = function () {
            if (this.m_b_disposed) {
                return;
            }
            if (this.m_b_loading == false) {
                core.res_errlog("game_widget on_load_complete this.m_b_loading = false");
                return;
            }
            utils.widget_ins().end_load(this);
            //
            for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (Laya.loader.getRes(i["url"]) != null) {
                    game_widget.s_loaded_dict[i["url"]] = true;
                }
            }
            //
            this.m_b_loading = false;
            Laya.loader.off(Laya.Event.ERROR, this, this.on_load_error);
            if (Laya.loader.getRes(this.m_res_path) == null) {
                core.res_errlog("game_widget on_load_complete getRes(this.m_res_path) == null ", this.m_res_path);
                return;
            }
            //
            //
            this.m_b_loaded = true;
            this.init_uiins();
        };
        game_widget.prototype.on_load_error = function (err) {
            //alert("ui load error err "+err);
            core.res_errlog("game_widget on_load_error ", err);
        };
        game_widget.prototype.on_init = function () {
        };
        game_widget.prototype.on_show = function (flag) {
        };
        game_widget.prototype.on_show_ud = function (flag, ud) {
            if (ud === void 0) { ud = null; }
        };
        game_widget.prototype.on_dispose = function () {
        };
        game_widget.prototype.show = function (flag) {
            if (this.m_b_show == flag) {
                return;
            }
            this.m_b_show = flag;
            if (this.m_b_loaded == false) {
                if (!this.m_b_show) {
                    core.core_tiplog("game_widget do not load when it is hiden");
                    return;
                }
                //
                if (this.m_res_path == null || this.m_res_path.length <= 0) {
                    core.core_tiplog("game_widget load error,invalided res path! ");
                    return;
                }
                if (this.m_ui_cls == null) {
                    core.core_tiplog("game_widget load error,invalided ui cls! ");
                    return;
                }
                if (this.m_b_loading) {
                    core.core_tiplog("game_widget loading,return");
                    return;
                }
                //
                this.m_extra_res_list.push({ url: this.m_res_path, type: Laya.Loader.ATLAS });
                for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (game_widget.s_res_dict.hasOwnProperty(i["url"])) {
                        game_widget.s_res_dict[i["url"]] += 1;
                    }
                    else {
                        game_widget.s_res_dict[i["url"]] = 1;
                    }
                }
                //
                //
                this.load();
                return;
            }
            else {
                if (this.m_b_show) {
                    var view = utils.widget_ins().get_view(this.m_layer);
                    view.addChild(this.m_ui);
                }
                else {
                    this.m_ui.removeSelf();
                }
                this.on_show(this.m_b_show);
                this.on_show_ud(this.m_b_show, this.m_ud);
                if (this.m_b_show) {
                    utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONSHOW, this);
                }
                else {
                    utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONHIDE, this);
                }
                if (!this.m_b_show) {
                    utils.widget_ins().call_widget_hide(this);
                }
            }
        };
        game_widget.prototype.dispose = function () {
            if (this.m_b_disposed) {
                return;
            }
            this.unregister_allevent();
            this.on_dispose();
            if (this.m_ui != null) {
                this.m_ui.removeSelf();
                this.m_ui.destroy();
                this.m_ui = null;
            }
            if (this.m_b_loaded) {
                for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (game_widget.s_res_dict.hasOwnProperty(i["url"])) {
                        game_widget.s_res_dict[i["url"]] -= 1;
                        if (game_widget.s_res_dict[i["url"]] <= 0) {
                            core.res_tiplog("widget dispose release res ", game_widget.s_res_dict[i["url"]], i["url"]);
                            Laya.loader.clearTextureRes(i["url"]);
                            delete game_widget.s_res_dict[i["url"]];
                            //从内存里释放掉不需要去掉引用，下面这个缓存主要解决未下载资源的问题
                            //if(game_widget.s_loaded_dict.hasOwnProperty(i["url"])){
                            //    delete game_widget.s_loaded_dict[i["url"]];
                            //}
                        }
                    }
                }
            }
            if (this.m_b_loading) {
                utils.widget_ins().end_load(this);
                Laya.loader.off(Laya.Event.ERROR, this, this.on_load_error);
            }
            this.m_b_loading = false;
            this.m_extra_res_list = null;
            this.m_ui_cls = null;
            this.m_res_path = null;
            this.m_b_loaded = false;
            this.m_b_disposed = true;
            this.m_b_show = false;
        };
        game_widget.m_start_id = 0;
        game_widget.s_res_dict = new Object();
        game_widget.s_loaded_dict = new Object();
        return game_widget;
    }(utils.game_event_receiver));
    utils.game_widget = game_widget;
})(utils || (utils = {}));
//# sourceMappingURL=game_widget.js.map
var utils;
(function (utils) {
    var heap_node = /** @class */ (function () {
        function heap_node(v, uid, ud) {
            if (v === void 0) { v = 0; }
            if (uid === void 0) { uid = 0; }
            if (ud === void 0) { ud = null; }
            this.m_value = 0;
            this.m_user_data = null;
            this.m_user_id = 0;
            this.m_value = v;
            this.m_user_id = uid;
            if (ud == null) {
                ud = new Object();
            }
            this.m_user_data = ud;
        }
        heap_node.prototype.init = function (v, uid, ud) {
            this.m_value = v;
            this.m_user_id = uid;
            if (ud == null) {
                ud = new Object();
            }
            this.m_user_data = ud;
        };
        return heap_node;
    }());
    utils.heap_node = heap_node;
    var small_heap = /** @class */ (function () {
        function small_heap() {
            this.m_array = new Array();
        }
        small_heap.prototype._get_nd = function (v, uid, ud) {
            if (uid === void 0) { uid = 0; }
            if (ud === void 0) { ud = null; }
            var ret = utils.getitembycls("heap_node", heap_node);
            ret.init(v, uid, ud);
            return ret;
        };
        small_heap.prototype._del_nd = function (nd) {
            utils.recover("heap_node", nd);
        };
        small_heap.prototype._clear_nd = function () {
            utils.clearbysign("heap_node");
        };
        small_heap.prototype._cmp_v = function (v1, v2) {
            return v1 < v2;
        };
        small_heap.prototype._filter_up = function (start) {
            var idx;
            var i = start;
            var nd = this.m_array[i];
            var nd_v = nd.m_value;
            var nd_id = nd.m_user_id;
            var nd_obj = nd.m_user_data;
            while (i > 0) {
                idx = (i - 1) >> 1;
                //core.core_tiplog("_filter_up ",start,i,idx);
                if (this._cmp_v(nd_v, this.m_array[idx].m_value)) {
                    this.m_array[i].m_value = this.m_array[idx].m_value;
                    this.m_array[i].m_user_id = this.m_array[idx].m_user_id;
                    this.m_array[i].m_user_data = this.m_array[idx].m_user_data;
                    this.m_array[i].m_user_data['idx'] = i;
                    //this.print_data("filter_up swap");
                    i = idx;
                }
                else {
                    break;
                }
            }
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            //this.print_data("filter_up end");
            return i;
        };
        small_heap.prototype._filter_down = function (start) {
            var idx;
            var i = start;
            var tmp = 0;
            var i1 = 0;
            var i2 = 0;
            var total = this.m_array.length;
            var nd = this.m_array[i];
            var nd_v = nd.m_value;
            var nd_id = nd.m_user_id;
            var nd_obj = nd.m_user_data;
            while (true) {
                i1 = (i << 1) + 1;
                i2 = (i << 1) + 2;
                if (i1 >= total) //have no more child
                 {
                    break;
                }
                var f = (i2 < total) && (this._cmp_v(this.m_array[i2].m_value, this.m_array[i1].m_value));
                tmp = f ? i2 : i1; //find better child
                //core.core_tiplog("filter down ",tmp,i2,i1,this.m_array[tmp].m_value,nd.m_value,i,this.m_array[i].m_value);
                if (this._cmp_v(this.m_array[tmp].m_value, nd_v)) {
                    //child is better
                    //this.m_array[i] = this.m_array[tmp];
                    this.m_array[i].m_value = this.m_array[tmp].m_value;
                    this.m_array[i].m_user_id = this.m_array[tmp].m_user_id;
                    this.m_array[i].m_user_data = this.m_array[tmp].m_user_data;
                    this.m_array[i].m_user_data['idx'] = i;
                }
                else {
                    break;
                }
                i = tmp;
            }
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            return i;
        };
        small_heap.prototype.push = function (v, uid, ud) {
            if (uid === void 0) { uid = 0; }
            if (ud === void 0) { ud = null; }
            //core.core_tiplog("smallheap push ",v,uid);
            var nd = this._get_nd(v, uid, ud);
            this.m_array.push(nd);
            this._filter_up(this.m_array.length - 1);
            //this.print_data();
            return nd;
        };
        small_heap.prototype.pop = function () {
            //core.core_tiplog("smallheap pop ",this.m_array[0].m_value,this.m_array[0].m_user_id,this.m_array.length);
            if (this.m_array.length <= 1) {
                this._del_nd(this.top());
                this.m_array.pop();
                return;
            }
            var nd = this.m_array[this.m_array.length - 1];
            var nd_v = nd.m_value;
            var nd_id = nd.m_user_id;
            var nd_obj = nd.m_user_data;
            var i = 0;
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            //this.m_array[0] = this.m_array[this.m_array.length-1];
            //core.core_tiplog("smallheap pop size ",this.m_array.length);
            this._del_nd(this.m_array[this.m_array.length - 1]);
            this.m_array.splice(this.m_array.length - 1, 1);
            //core.core_tiplog("smallheap pop size2 ",this.m_array.length);
            this._filter_down(i);
            //this.print_data();
            return;
        };
        small_heap.prototype.get_idx = function (id) {
            for (var i = 0; i < this.m_array.length; ++i) {
                var nd = this.m_array[i];
                if (nd.m_user_id == id) {
                    return i;
                }
            }
            return -1;
        };
        small_heap.prototype.modify = function (idx, v) {
            var nd = this.m_array[idx];
            //core.core_tiplog("smallheap modify ",idx,v,nd.m_value,nd.m_user_id);
            if (nd.m_value == v) {
                return;
            }
            if (this._cmp_v(nd.m_value, v)) //new v is bigger
             {
                nd.m_value = v;
                this._filter_down(idx);
            }
            else {
                nd.m_value = v;
                this._filter_up(idx);
            }
            //this.print_data();
        };
        small_heap.prototype.clear = function () {
            for (var i = 0; i < this.m_array.length; ++i) {
                this._del_nd(this.m_array[i]);
            }
            this.m_array = new Array();
        };
        small_heap.prototype.top = function () {
            return this.m_array[0];
        };
        small_heap.prototype.is_empty = function () {
            return this.m_array.length <= 0;
        };
        small_heap.prototype.print_data = function (pre) {
            if (pre === void 0) { pre = ""; }
            core.core_tiplog("smallheap begin ", pre, this.m_array.length);
            for (var _i = 0, _a = this.m_array; _i < _a.length; _i++) {
                var i = _a[_i];
                core.core_tiplog("smallheap ", pre, i.m_value, i.m_user_id);
            }
            core.core_tiplog("smallheap end ", pre);
        };
        return small_heap;
    }());
    utils.small_heap = small_heap;
})(utils || (utils = {}));
//# sourceMappingURL=heap.js.map
var utils;
(function (utils) {
    function get_view_wh() {
        var ret = { 'w': 640, 'h': 960 };
        var cw = Laya.Browser.clientWidth;
        var ch = Laya.Browser.clientHeight;
        if (cw > ret['w'] && ch > ret['h']) {
            //ret['w'] = cw;
            //ret['h'] = ch;
        }
        return ret;
    }
    utils.get_view_wh = get_view_wh;
    function get_render_milltm() {
        return laya.utils.Browser.now();
    }
    utils.get_render_milltm = get_render_milltm;
    function getRandom(n, m) {
        //省略特殊情形下的处理过程，比如n>m，或者n、m之一无法转化为有效数字；
        return Math.round(Math.random() * (m - n) + n);
    }
    utils.getRandom = getRandom;
    function genangle(dx, dy) {
        var angle = Math.atan2(dy * 1.4142135623731, dx);
        return angle;
    }
    utils.genangle = genangle;
    function gendir(dx, dy, dircount, ale) {
        if (dircount === void 0) { dircount = 8; }
        if (ale === void 0) { ale = null; }
        if (dx == 0) {
            if (dy > 0) {
                return 0;
            }
            else if (dy < 0) {
                return 4;
            }
            return 0;
        }
        else if (dy == 0) {
            if (dx > 0) {
                return 6;
            }
            else if (dx < 0) {
                return 2;
            }
            return 0;
        }
        else {
            if (dx > 0 && dy > 0) {
                return 7;
            }
            else if (dx > 0 && dy < 0) {
                return 5;
            }
            else if (dx < 0 && dy > 0) {
                return 1;
            }
            else if (dx < 0 && dy < 0) {
                return 3;
            }
            return 0;
        }
        /*
        let angle:number = ale;
        if(angle == null)
        {
            angle = genangle(dx,dy);
        }
        let ret:number;
        if(dircount == 8)
        {
            let ddir:number = angle*(4/3.14159265359);//direction
            let idir:number;
            if(ddir > 0)
            {
                idir = ddir+0.5;//get int
            }
            else
            {
                idir = ddir-0.5;
            }
            ret = (idir - 2 + 16)&7;
        }
        else//dircount == 4
        {
            let ddir:number = angle*(2/3.14159265359);
            let idir:number = ddir;
            if(ddir < 0)
            {
                idir--;
            }
            ret = (idir*2 - 1 + 16)&7;
        }
        return ret;
        */
    }
    utils.gendir = gendir;
    //y = ax+b; the line can not be vertical or horizontal;
    function genafrom2point(sx, sy, dx, dy) {
        var a = (sy - dy) / (sx - dx);
        return a;
    }
    utils.genafrom2point = genafrom2point;
    function genbfrom2point(sx, sy, a) {
        var b = sy - sx * a;
        //let b:number = (sx*dy - dx*sy)/(sx-dx);
        return b;
    }
    utils.genbfrom2point = genbfrom2point;
    function genpointlinefrom2point(sx, sy, dx, dy, gridw, gridh) {
        if (gridw === void 0) { gridw = 32; }
        if (gridh === void 0) { gridh = 32; }
        //core.core_tiplog("genpointlinefrom2point start ",sx,sy,dx,dy);
        var ret = new Array();
        var ddx = Math.abs(dx - sx);
        var ddy = Math.abs(dy - sy);
        if ((ddx == 0) && (ddy == 0)) {
            return ret;
        }
        var stepx;
        var stepy;
        var cx;
        var cy;
        var tmp = new Object();
        var addx;
        var addy;
        var addkey;
        if (ddx == 0 || ddy == 0 || ddx == ddy) {
            stepx = 1;
            if (ddx == 0) {
                stepx = 0;
            }
            else if (dx < sx) {
                stepx = -1;
            }
            stepy = 1;
            if (ddy == 0) {
                stepy = 0;
            }
            else if (dy < sy) {
                stepy = -1;
            }
            while (true) {
                cx = sx;
                cy = sy;
                if (ddx == 0 || ddy == 0) {
                    ret.push(new laya.maths.Point(cx, cy));
                }
                else {
                    addx = cx;
                    addy = cy;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                    addx = cx - 1;
                    addy = cy;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                    addx = cx + 1;
                    addy = cy - 1;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                    addx = cx - 1;
                    addy = cy;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                }
                if (sx == dx && sy == dy) {
                    break;
                }
                sx = sx + stepx;
                sy = sy + stepy;
            }
        }
        else {
            //let a1:number = genafrom2point(sx,sy,dx,dy);
            // let b1:number = genbfrom2point(sx,sy,a1);
            //core.core_tiplog("a1,b1 ",a1,b1);
            var a = genafrom2point(sx * gridw, sy * gridh, dx * gridw, dy * gridh);
            var b = genbfrom2point(sx * gridw + (gridw >> 1), sy * gridh + (gridh >> 1), a);
            //core.core_tiplog("a,b ",a,b);
            cx = sx * gridw + (gridw >> 1);
            cy = sy * gridh + (gridh >> 1);
            var dcx = dx * gridw + (gridw >> 1);
            var dcy = dy * gridh + (gridh >> 1);
            stepx = gridw;
            stepy = gridh;
            if (dx < sx) {
                stepx = 0 - gridw;
            }
            if (dy < sy) {
                stepy = 0 - gridh;
            }
            //y = a*x + b;
            //x = (y - b)/a;
            addkey = (sx * 100000 + sy).toString();
            if (tmp.hasOwnProperty(addkey) == false) {
                tmp[addkey] = true;
                //core.core_tiplog('gpl start ',sx,sy);
                ret.push(new laya.maths.Point(sx, sy));
            }
            if (ddx > ddy) //horizontal
             {
                var circle_count = ddx;
                while (true) {
                    //core.core_tiplog('gpl hor 1 ',cx,cy,stepx,a,b);
                    cx = cx + stepx / 2;
                    cy = a * cx + b;
                    //core.core_tiplog('gpl hor 2 ',cx,cy,cx%gridw,cy%gridh,cx/gridw,cy/gridh);
                    if ((cx % gridw) == 0 && (cy % gridh) == 0) {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 1 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 2 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx + 1;
                        addy = addy - 1;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 3 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 4 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    else {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 5 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 6 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    cx = cx + stepx / 2;
                    if (cx == dcx) {
                        break;
                    }
                }
            }
            else if (ddx < ddy) //vertical
             {
                var circle_count = ddy;
                while (true) {
                    //x = (y - b)/a;
                    cy = cy + stepy / 2;
                    cx = (cy - b) / a;
                    if ((cx % gridw) == 0 && (cy % gridh) == 0) {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 7 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 8 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx + 1;
                        addy = addy - 1;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 9 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 10 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    else {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 11 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx;
                        addy = addy - 1;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 12 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    cy = cy + stepy / 2;
                    if (cy == dcy) {
                        break;
                    }
                }
            }
        }
        addkey = (dx * 100000 + dy).toString();
        if (tmp.hasOwnProperty(addkey) == false) {
            tmp[addkey] = true;
            //core.core_tiplog('gpl end ',dx,dy);
            ret.push(new laya.maths.Point(dx, dy));
        }
        //
        /*
        core.core_tiplog("genpointlinefrom2point end ",ret.length);
        for(let i:number = 0;i < ret.length;++i)
        {
            core.core_tiplog("pt ",i,ret[i].x,ret[i].y);
        }
        */
        //
        return ret;
    }
    utils.genpointlinefrom2point = genpointlinefrom2point;
})(utils || (utils = {}));
//# sourceMappingURL=utils.js.map