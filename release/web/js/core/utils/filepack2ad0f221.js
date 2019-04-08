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