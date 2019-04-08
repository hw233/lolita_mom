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