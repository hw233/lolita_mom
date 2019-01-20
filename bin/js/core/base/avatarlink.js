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
            if (idx >= this.m_pt_arr[pt_idx].length) {
                if (this.m_pt_arr[pt_idx].length <= 0) {
                    return this.m_invalid_pt;
                }
                return this.m_pt_arr[pt_idx][idx % this.m_pt_arr[pt_idx].length];
            }
            return this.m_pt_arr[pt_idx][idx];
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