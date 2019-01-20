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