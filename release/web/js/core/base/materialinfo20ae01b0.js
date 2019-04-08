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