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
                    var c_role = this.getunit(c_id);
                    if (f_role != null && c_role != null) {
                        pt.x = f_role.x;
                        pt.y = f_role.y;
                        pt = this._gen_back_pos(pt, f_role.m_dir);
                        if (pt.x != c_role.x || pt.y != c_role.y) {
                            this.unit_walk2(c_id, pt.x, pt.y, true, true);
                        }
                        else {
                            c_role.change_dir(f_role.m_dir);
                        }
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