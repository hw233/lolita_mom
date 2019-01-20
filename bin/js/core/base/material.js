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