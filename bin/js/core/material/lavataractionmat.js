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