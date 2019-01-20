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