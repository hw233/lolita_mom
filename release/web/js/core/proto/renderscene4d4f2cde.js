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