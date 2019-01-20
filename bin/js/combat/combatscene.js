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
var combat;
(function (combat) {
    var combat_warrior_action = /** @class */ (function () {
        function combat_warrior_action() {
            this.m_id = 0;
            this.m_warrior = null;
            this.m_is_end = true;
            this.m_start_tm = 0;
        }
        combat_warrior_action.prototype.re_init = function () {
            this.m_id = 0;
            this.m_warrior = null;
            this.m_is_end = true;
            this.m_start_tm = 0;
        };
        combat_warrior_action.prototype.start = function (tm) {
            this.m_start_tm = tm;
        };
        combat_warrior_action.prototype.update = function (delta) {
        };
        combat_warrior_action.prototype.is_end = function () {
            return this.m_is_end;
        };
        combat_warrior_action.prototype.clear = function () {
        };
        combat_warrior_action.prototype.dispose = function () {
            this.m_warrior = null;
        };
        return combat_warrior_action;
    }());
    combat.combat_warrior_action = combat_warrior_action;
    var dead_action = /** @class */ (function (_super) {
        __extends(dead_action, _super);
        function dead_action() {
            var _this = _super.call(this) || this;
            _this.m_b_open = true;
            _this.m_fade_max = 6;
            _this.m_fade_tm = 200;
            _this.m_cur_fadeidx = 0;
            _this.m_cur_tm = 0;
            _this.m_fadeout = true;
            return _this;
        }
        dead_action.prototype.start = function (tm) {
            this.m_start_tm = tm;
            if (this.m_b_open) {
                this.m_is_end = false;
                this.m_fadeout = true;
                this.m_cur_fadeidx = 0;
                this.m_cur_tm = this.m_start_tm;
                this.m_warrior.change_action(0 /* ACTION_STAND */);
                return;
            }
            this.m_warrior.change_action(5 /* ACTION_DEAD */, false);
            this.m_is_end = true;
        };
        dead_action.prototype.update = function (delta) {
            if (this.m_is_end) {
                return;
            }
            this.m_cur_tm += delta;
            if (this.m_cur_tm > (this.m_start_tm + this.m_fade_tm)) {
                this.m_cur_fadeidx += 1;
                if (this.m_cur_fadeidx >= this.m_fade_max) {
                    this.m_is_end = true;
                    this.m_warrior.alpha = 1;
                    return;
                }
                this.m_start_tm = this.m_cur_tm;
                this.m_fadeout = !this.m_fadeout;
            }
            var rate = 1;
            rate = (this.m_cur_tm - this.m_start_tm) / this.m_fade_tm;
            if (rate > 1) {
                rate = 1;
            }
            if (rate < 0) {
                rate = 0;
            }
            if (this.m_fadeout) {
                rate = 1 - rate;
            }
            this.m_warrior.alpha = rate;
        };
        dead_action.prototype.is_end = function () {
            return this.m_is_end;
        };
        dead_action.prototype.dispose = function () {
            if (this.m_warrior != null) {
                this.m_warrior.alpha = 1;
                this.m_warrior = null;
            }
            utils.recover("dead_action", this);
        };
        return dead_action;
    }(combat_warrior_action));
    combat.dead_action = dead_action;
    var fly_action = /** @class */ (function (_super) {
        __extends(fly_action, _super);
        function fly_action() {
            var _this = _super.call(this) || this;
            _this.m_start_pt = new Laya.Point();
            _this.m_from_pt = new Laya.Point();
            _this.m_lt_pt = new Laya.Point();
            _this.m_rb_pt = new Laya.Point();
            _this.m_collision_max = 2;
            _this.m_collision_num = 0;
            _this.m_a = 0;
            _this.m_b = 0;
            _this.m_cur_tm = 0;
            _this.m_cur_rtm = 0;
            _this.m_start_rtm = 0;
            _this.m_rspeed = 360 * 5; //angle per sec
            _this.m_speed = 360 * 5;
            _this.m_bsign = 1.0;
            return _this;
        }
        fly_action.prototype.start = function (tm) {
            if (this.m_start_pt.x == this.m_from_pt.x) {
                this.m_is_end = true;
                return;
            }
            if (this.m_start_pt.y == this.m_from_pt.y) {
                this.m_is_end = true;
                return;
            }
            this.m_start_tm = tm;
            this.m_cur_rtm = this.m_start_tm;
            this.m_start_rtm = this.m_start_tm;
            this.m_collision_num = this.m_collision_max;
            this.m_warrior.change_action(0 /* ACTION_STAND */);
            this.m_cur_tm = this.m_start_tm;
            this.m_warrior.rotation = 0;
            this.m_is_end = false;
            this._cal_param();
        };
        fly_action.prototype._cal_param = function () {
            this.m_a = utils.genafrom2point(this.m_from_pt.x, this.m_from_pt.y, this.m_start_pt.x, this.m_start_pt.y);
            this.m_b = utils.genbfrom2point(this.m_from_pt.x, this.m_from_pt.y, this.m_a);
            //y = a*x + b;
            //x = (y - b)/a;
            //only use x to calculate,so,if start x equal dst x,it will be in trouble;
            this.m_bsign = (this.m_start_pt.x - this.m_from_pt.x) / Math.abs(this.m_start_pt.x - this.m_from_pt.x);
        };
        fly_action.prototype._rotate = function (delta) {
            this.m_cur_rtm += delta;
            var a = (this.m_cur_rtm - this.m_start_rtm) * this.m_rspeed / 1000;
            a = a % 360;
            this.m_warrior.rotation = a;
        };
        fly_action.prototype._is_out = function (x, y) {
            if (x < this.m_lt_pt.x || x > this.m_rb_pt.x) {
                return true;
            }
            if (y < this.m_lt_pt.y || y > this.m_rb_pt.y) {
                return true;
            }
            return false;
        };
        fly_action.prototype._collision = function () {
            var ty = 0;
            if (this.m_bsign < 0) //right 2 left
             {
                ty = this.m_a * this.m_lt_pt.x + this.m_b;
            }
            else { //left 2 right
                ty = this.m_a * this.m_rb_pt.x + this.m_b;
            }
            if (ty == this.m_lt_pt.y || ty == this.m_rb_pt.y) {
                this.m_collision_num = -1;
                return;
            }
            //y = a*x + b;
            //x = (y - b)/a;
            if (ty < this.m_lt_pt.y) //top
             {
                this.m_start_pt.x = (this.m_lt_pt.y - this.m_b) / this.m_a;
                this.m_start_pt.y = this.m_lt_pt.y;
                var temp = (this.m_from_pt.y - this.m_lt_pt.y) * 2;
                this.m_from_pt.y -= temp;
            }
            else if (ty > this.m_rb_pt.y) //bottom
             {
                this.m_start_pt.x = (this.m_rb_pt.y - this.m_b) / this.m_a;
                this.m_start_pt.y = this.m_rb_pt.y;
                var temp = (this.m_rb_pt.y - this.m_from_pt.y) * 2;
                this.m_from_pt.y += temp;
            }
            else {
                if (this.m_bsign < 0) //right 2 left ,left
                 {
                    this.m_start_pt.x = this.m_lt_pt.x;
                    this.m_start_pt.y = this.m_a * this.m_start_pt.x + this.m_b;
                    var temp = (this.m_from_pt.x - this.m_lt_pt.x) * 2;
                    this.m_from_pt.x -= temp;
                }
                else //left 2 right,right
                 {
                    this.m_start_pt.x = this.m_rb_pt.x;
                    this.m_start_pt.y = this.m_a * this.m_start_pt.x + this.m_b;
                    var temp = (this.m_rb_pt.x - this.m_from_pt.x) * 2;
                    this.m_from_pt.x += temp;
                }
            }
            this._cal_param();
        };
        fly_action.prototype.update = function (delta) {
            if (this.m_is_end) {
                return;
            }
            this._rotate(delta);
            this.m_cur_tm += delta;
            var dx = this.m_speed * (this.m_cur_tm - this.m_start_tm) / 1000;
            var cur_x = this.m_start_pt.x + dx * this.m_bsign;
            var cur_y = this.m_a * cur_x + this.m_b;
            if (this._is_out(cur_x, cur_y)) {
                this.m_collision_num -= 1;
                if (this.m_collision_num < 0) {
                    this.m_is_end = true;
                    return;
                }
                this._collision();
                if (this.m_collision_num < 0) {
                    this.m_is_end = true;
                    return;
                }
                this.m_start_tm = this.m_cur_tm;
            }
            this.m_warrior.set_pos(cur_x, cur_y);
        };
        fly_action.prototype.is_end = function () {
            return this.m_is_end;
        };
        fly_action.prototype.dispose = function () {
            if (this.m_warrior != null) {
                this.m_warrior.alpha = 0;
                this.m_warrior = null;
            }
            utils.recover("fly_action", this);
        };
        return fly_action;
    }(combat_warrior_action));
    combat.fly_action = fly_action;
    var combatscene = /** @class */ (function (_super) {
        __extends(combatscene, _super);
        function combatscene(mgr, sp) {
            var _this = _super.call(this) || this;
            _this.m_combat_mgr = null;
            _this.m_render = null;
            _this.m_pos_map = new Object();
            _this.m_warrior_map = new Object();
            _this.m_mw = 2560;
            _this.m_mh = 2560;
            _this.m_map = "1704.jpg";
            _this.m_camera_x = 0;
            _this.m_camera_y = 0;
            _this.m_pos_centerx = 0;
            _this.m_pos_centerdx = 40;
            _this.m_pos_centerdy = -60;
            _this.m_pos_centery = 0;
            _this.m_view_w = 0;
            _this.m_view_h = 0;
            _this.m_pos_dx = 92;
            _this.m_pos_dy = 52;
            _this.m_pos_c2dx = 0 + _this.m_pos_dx;
            _this.m_pos_c2dy = 120 + _this.m_pos_dy;
            _this.m_numpic_list = new Array();
            _this.m_tempnumpic_list = new Array();
            _this.m_cryout_list = new Array();
            _this.m_tempcryout_list = new Array();
            _this.m_waction_list = new Array();
            _this.m_bk_htmlcanvas = null;
            _this.m_bk_htmltexture = null;
            _this.m_bk_sp = null;
            _this.m_lineupsp = null;
            _this.m_combat_mgr = mgr;
            _this._init_event();
            _this.m_render = new core.renderagent();
            _this.m_render.initstage(sp);
            _this.m_render.m_render.setworldwh(_this.m_mw, _this.m_mh);
            _this.m_view_w = 720;
            _this.m_view_h = 1280;
            _this.m_render.setviewport(_this.m_view_w, _this.m_view_h);
            sp.width = _this.m_mw;
            sp.height = _this.m_mh;
            //
            _this.m_render.setcamerapos(_this.m_camera_x, _this.m_camera_y);
            //
            //this.m_render.setmapbk("1002.jpg");
            _this._init_pos_map();
            sp.on(Laya.Event.CLICK, _this, _this.onClick);
            return _this;
        }
        combatscene.prototype._init_pos_map = function () {
            var dx = this.m_pos_dx;
            var dy = this.m_pos_dy;
            var cx = this.m_pos_centerx;
            var cy = this.m_pos_centery;
            this.m_pos_map[1] = [cx + this.m_pos_c2dx, cy + this.m_pos_c2dy, 3];
            this.m_pos_map[2] = [this.m_pos_map[1][0] - this.m_pos_dx, this.m_pos_map[1][1] + this.m_pos_dy, 3];
            this.m_pos_map[3] = [this.m_pos_map[1][0] + this.m_pos_dx, this.m_pos_map[1][1] - this.m_pos_dy, 3];
            this.m_pos_map[4] = [this.m_pos_map[2][0] - this.m_pos_dx, this.m_pos_map[2][1] + this.m_pos_dy, 3];
            this.m_pos_map[5] = [this.m_pos_map[3][0] + this.m_pos_dx, this.m_pos_map[3][1] - this.m_pos_dy, 3];
            for (var i = 6; i < 11; ++i) {
                var tx = this.m_pos_map[i - 5][0] - dx;
                var ty = this.m_pos_map[i - 5][1] - dy;
                this.m_pos_map[i] = [tx, ty, 3];
            }
            var ddx = this.m_pos_c2dx * 2;
            var ddy = this.m_pos_c2dy * 2;
            for (var i = 21; i < 26; ++i) {
                var tx = this.m_pos_map[i - 15][0] - ddx;
                var ty = this.m_pos_map[i - 15][1] - ddy;
                this.m_pos_map[i] = [tx, ty, 7];
            }
            for (var i = 26; i < 31; ++i) {
                var tx = this.m_pos_map[i - 5][0] + dx;
                var ty = this.m_pos_map[i - 5][1] + dy;
                this.m_pos_map[i] = [tx, ty, 7];
            }
            this.m_pos_map[11] = [100, 100, 3];
            this.m_pos_map[12] = [100, 100, 3];
            this.m_pos_map[31] = [100, 100, 7];
            this.m_pos_map[32] = [100, 100, 7];
        };
        combatscene.prototype.get_pos = function (id) {
            var x = this.m_pos_map[id][0];
            var y = this.m_pos_map[id][1];
            //x = this.m_camera_x - (this.m_view_w>>1) + x;
            //y = this.m_camera_y - (this.m_view_h>>1) + y;
            var ret = new laya.maths.Point(x, y);
            return ret;
        };
        combatscene.prototype.get_dir = function (id) {
            return this.m_pos_map[id][2];
        };
        combatscene.prototype.get_warrior = function (id) {
            if (this.m_warrior_map[id] == undefined) {
                return null;
            }
            return this.m_warrior_map[id];
        };
        combatscene.prototype.get_warrior_avatar = function (id) {
            var wobj = this.get_warrior(id);
            if (wobj == null) {
                return null;
            }
            return this.m_render.getunit(wobj.roleid);
        };
        combatscene.prototype.get_warrior_avatarid = function (id) {
            var wobj = this.get_warrior(id);
            if (wobj == null) {
                return 0;
            }
            return wobj.roleid;
        };
        combatscene.prototype.onClick = function (e) {
            //
            var sx = e.stageX;
            var sy = e.stageY;
            sx = 0.5 * sx;
            sy = 0.5 * sy;
            //
            var spos = new laya.maths.Point(sx, sy);
            var wpos = this.m_render.stagepos2worldpos(spos);
            core.combat_tiplog("combatscene onClick ", e.stageX, e.stageY, wpos.x, wpos.y);
            //this.m_render.setcamerapos(wpos.x,wpos.y);
            //let obj:warrior = this.get_warrior(12);
            //let ra:core.renderavatar = this.m_render.getunit(obj.roleid);
            //ra.set_pos(wpos.x,wpos.y);
            //ra.set_name('w1_'+wpos.x+'_'+wpos.y);
        };
        combatscene.prototype._init_event = function () {
            this.register_event(combat.COMBATSCENE_ENTER, this.on_enter);
            this.register_event(combat.COMBATSCENE_CHANGELINEUP, this.on_change_lineup);
            this.register_event(combat.COMBATSCENE_QUIT, this.on_quit);
            this.register_event(combat.COMBATSCENE_POPNUMBER, this.on_popnumber);
            this.register_event(combat.COMBATSCENE_CRYOUT, this.on_cryout);
            this.register_event(combat.COMBATSCENE_ADDWARRIOR, this.on_addwarrior);
            this.register_event(combat.COMBATSCENE_ADDCLONEWARRIOR, this.on_addclonewarrior);
            this.register_event(combat.COMBATSCENE_INITWARRIOR, this.on_initwarrior);
            this.register_event(combat.COMBATSCENE_SETADORN, this.on_setadorn);
            this.register_event(combat.COMBATSCENE_DELWARRIOR, this.on_delwarrior);
            this.register_event(combat.COMBATSCENE_DELNINJA, this.on_delninja);
            this.register_event(combat.COMBATSCENE_ADDBUFF, this.on_addbuff);
            this.register_event(combat.COMBATSCENE_DELBUFF, this.on_delbuff);
            this.register_event(combat.COMBATSCENE_BUFFCD, this.on_buffcd);
            this.register_event(combat.COMBATSCENE_BUFFAUTOCD, this.on_buffautocd);
            this.register_event(combat.COMBATSCENE_WARRIORACTION, this.on_warrioraction);
            this.register_event(combat.COMBATSCENE_WARRIORDEAD, this.on_warriordead);
            this.register_event(combat.COMBATSCENE_WARRIORDEADVANISH, this.on_warriordeadvanish);
            this.register_event(combat.COMBATSCENE_WARRIORFLY, this.on_warriorfly);
            this.register_event(combat.COMBATSCENE_WARRIORREVIVE, this.on_warriorrevive);
            this.register_event(combat.COMBATSCENE_WARRIORDEFEND, this.on_warriordefend);
            this.register_event(combat.COMBATSCENE_WARRIORDODGE, this.on_warriordodge);
            this.register_event(combat.COMBATSCENE_WARRIORATTACKED, this.on_warriorattacked);
            this.register_event(combat.COMBATSCENE_WARRIORBACKMOVE, this.on_warriorbackmove);
            this.register_event(combat.COMBATSCENE_WARRIORSETPOS, this.on_warriorsetpos);
            this.register_event(combat.COMBATSCENE_WARRIORMOVE, this.on_warriormove);
            this.register_event(combat.COMBATSCENE_WARRIORMOVEBACK, this.on_warriormoveback);
            this.register_event(combat.COMBATSCENE_WARRIORMOVE2WARRIOR, this.on_warriormove2warrior);
            this.register_event(combat.COMBATSCENE_EFFECT, this.on_effect);
            this.register_event(combat.COMBATSCENE_EFFECT_SCREENPOS, this.on_effect_screenpos);
            this.register_event(combat.COMBATSCENE_EFFECT2W, this.on_effect2w);
            this.register_event(combat.COMBATSCENE_ACTIONBEGIN, this.on_actionbegin);
            this.register_event(combat.COMBATSCENE_ACTIONEND, this.on_actionend);
            this.register_event(combat.COMBATSCENE_WARRIORDIR, this.on_warriordir);
            this.register_event(combat.COMBATSCENE_WARRIORDIR2W, this.on_warriordir2w);
            this.register_event(combat.COMBATSCENE_WARRIORREADY, this.on_warriorready);
            this.register_event(combat.COMBATSCENE_SETHP, this.on_sethp);
            this.register_event(combat.COMBATSCENE_BLACKSCENE, this.on_blackscene);
            this.register_event(combat.COMBATSCENE_CUSTOMEVENT, this.on_customevent);
        };
        combatscene.prototype.on_actionend = function (user_data) {
        };
        combatscene.prototype.on_actionbegin = function (user_data) {
        };
        combatscene.prototype.clearallwarrior = function () {
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_waction_list.length = 0;
            for (var i in this.m_warrior_map) {
                if (this.m_warrior_map.hasOwnProperty(i)) {
                    var wdata = this.m_warrior_map[i];
                    if (wdata != null) {
                        var wrolea = this.m_render.getunit(wdata.roleid);
                        if (wrolea != null) {
                            laya.utils.Tween.clearAll(wrolea);
                        }
                        this.m_render.delunit(wdata.roleid);
                    }
                }
            }
            this.m_warrior_map = new Object();
        };
        combatscene.prototype.init_bk_htmlcanvas = function (hc, w, h) {
            this.clear_bk_htmlcanvas();
            if (hc == null) {
                return;
            }
            this.m_bk_htmlcanvas = hc;
            this.m_bk_htmltexture = new Laya.Texture(this.m_bk_htmlcanvas);
            this.m_bk_sp = new Laya.Sprite();
            this.m_bk_sp.graphics.fillTexture(this.m_bk_htmltexture, 0, 0, w, h, "no-repeat");
        };
        combatscene.prototype.clear_bk_htmlcanvas = function () {
            if (this.m_bk_sp != null) {
                this.m_bk_sp.graphics.clear();
                this.m_bk_sp.destroy(true);
                this.m_bk_sp = null;
            }
            if (this.m_bk_htmlcanvas != null) {
                this.m_bk_htmlcanvas.clear();
                this.m_bk_htmlcanvas.releaseResource(true);
                this.m_bk_htmlcanvas.destroy();
                this.m_bk_htmltexture.destroy(true);
                this.m_bk_htmlcanvas = null;
                this.m_bk_htmltexture = null;
            }
        };
        combatscene.prototype.on_change_lineup = function (user_data) {
            this.clear_lineupsp();
            var path = user_data[0];
            var dx = user_data[1];
            var dy = user_data[2];
            core.combat_tiplog('combatscene on_change_lineup ', path, dx, dy);
            var ret = utils.getitembycls("combat_lineup", combat.combat_lineup);
            ret.re_init();
            ret.set_respath(path, dx, dy);
            ret.m_obj_id = this.m_render.addsprite(ret, this.m_pos_centerx, this.m_pos_centery, false);
            this.m_lineupsp = ret;
        };
        combatscene.prototype.clear_lineupsp = function () {
            if (this.m_lineupsp != null) {
                this.m_render.delsprite(this.m_lineupsp.m_obj_id);
                this.m_lineupsp.dispose();
                this.m_lineupsp = null;
            }
        };
        combatscene.prototype.set_viewport = function (w, h) {
            this.m_view_w = w;
            this.m_view_h = h;
            this.m_render.setviewport(w, h);
        };
        combatscene.prototype.on_enter = function (user_data) {
            //this.m_render.setmapbk(this.m_map);
            var hc = user_data[0];
            var w = user_data[1];
            var h = user_data[2];
            var x = user_data[3];
            var y = user_data[4];
            var sid = user_data[5];
            var s_res = user_data[6];
            this.m_render.clearmapbksp();
            this.m_camera_x = (this.m_mw >> 1);
            this.m_camera_y = (this.m_mh >> 1);
            this.m_pos_centerx = this.m_camera_x + this.m_pos_centerdx;
            this.m_pos_centery = this.m_camera_y + this.m_pos_centerdy;
            if (hc != null) {
                this.init_bk_htmlcanvas(hc, w, h);
                this.m_render.setmapbksp(this.m_bk_sp);
                this.m_bk_sp.x = this.m_camera_x - x;
                this.m_bk_sp.y = this.m_camera_y - y;
            }
            else {
                if (sid == 0) {
                    this.m_render.setmapbk(this.m_map);
                }
                else {
                    var b_slot = s_res == null;
                    this.m_render.entermap(sid, b_slot);
                    if (!b_slot) {
                        this.m_render.setmapbk(s_res);
                    }
                    this.m_camera_x = x;
                    this.m_camera_y = y;
                    this.m_pos_centerx = this.m_camera_x + this.m_pos_centerdx;
                    this.m_pos_centery = this.m_camera_y + this.m_pos_centerdy;
                }
            }
            this._init_pos_map();
            core.combat_tiplog("combatscene on_enter setcamerapos ", this.m_mw >> 1, this.m_mh >> 1);
            this.m_render.setcamerapos(this.m_camera_x, this.m_camera_y);
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_waction_list.length = 0;
            this.m_render.show_map_mask(true, 0.5);
            //this.m_render.set_map_filter([
            //    new Laya.ColorFilter([0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0]),
            //]);
        };
        combatscene.prototype.on_quit = function (user_data) {
        };
        combatscene.prototype.on_setadorn = function (user_data) {
            var wid = user_data[0];
            var pos = user_data[1];
            var aid = user_data[2];
            if (this.get_warrior(wid) != null) {
                var wavatar = this.get_warrior_avatar(wid);
                if (wavatar != null) {
                    switch (pos) {
                        case 0:
                            wavatar.change_shape(aid);
                            break;
                        case 1:
                            wavatar.change_weapon(aid);
                            break;
                        case 2:
                            wavatar.change_wing(aid);
                            break;
                        case 3:
                            wavatar.change_ride(aid[0], aid[1]);
                            if (aid[0] != 0) {
                                wavatar.set_ride_h(30);
                                if (aid.length > 2) {
                                    wavatar.set_ride_h(aid[2]);
                                }
                            }
                            else {
                                wavatar.set_ride_h(30);
                            }
                            break;
                        case 4:
                            wavatar.change_hair(aid);
                            break;
                        case 5:
                            wavatar.change_aura(aid);
                            break;
                        case 6:
                            wavatar.change_title(aid);
                            break;
                        case 7:
                            var fid = aid;
                            this.m_render.clear_all_follow(wid);
                            if (fid != 0) {
                                var pid = this.get_warrior_avatarid(wid);
                                var chase_id = this.m_render.addunit("", fid, 0, 0);
                                this.m_render.set_follow_id(chase_id, pid);
                                var chase_role = this.m_render.getunit(chase_id);
                                chase_role.set_dxy(0, -100);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        combatscene.prototype.get_posid_bywid = function (wid) {
            var wdata = this.get_warrior(wid);
            if (wdata != null) {
                return wdata.pos;
            }
            return wid;
        };
        combatscene.prototype.on_initwarrior = function (user_data) {
            var arr = user_data;
            core.combat_tiplog('combatscene initwarrior ', arr);
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var i = arr_1[_i];
                this.on_addwarrior(i);
            }
        };
        combatscene.prototype.on_addclonewarrior = function (user_data) {
            core.combat_tiplog('combatscene on_addclonewarrior ', user_data);
            var src = user_data["src"];
            var dst = user_data["dst"];
            var x = user_data["x"];
            var y = user_data["y"];
            var dir = user_data["dir"];
            if (this.get_warrior(src) == null) {
                core.combat_errlog("on_addclonewarrior have not this warrior ", src, dst);
                return;
            }
            if (this.get_warrior(dst) != null) {
                this.on_delwarrior(dst);
            }
            var wdata = this.get_warrior(src);
            var new_data = new combat.warrior();
            wdata.clone_data(new_data);
            new_data.id = dst;
            new_data.roleid = this._add_warrior_ins(new_data, x, y);
            this.m_warrior_map[new_data.id] = new_data;
            //
            var wrolea = this.m_render.getunit(new_data.roleid);
            wrolea.change_action(2 /* ACTION_READY */);
            wrolea.change_dir(dir);
            //
        };
        combatscene.prototype._add_warrior_ins = function (wdata, x, y) {
            core.combat_tiplog('combatscene _add_warrior_ins ', wdata.id, x, y);
            var wrolea = null;
            wdata.roleid = this.m_render.addunit(wdata.name, wdata.shape, x, y);
            wrolea = this.m_render.getunit(wdata.roleid);
            wrolea.set_scale(wdata.scale, wdata.scale);
            var v = wdata.m_desc[0];
            if (v != 0) {
                wrolea.change_shape(v);
            }
            v = wdata.m_desc[1];
            if (v != 0) {
                wrolea.change_weapon(v);
            }
            v = wdata.m_desc[2];
            if (v != 0) {
                wrolea.change_wing(v);
            }
            v = wdata.m_desc[3]; //fairy
            if (v != 0) {
                var chase_id = this.m_render.addunit("", v, 0, 0);
                this.m_render.set_follow_id(chase_id, wdata.roleid);
                var chase_role = this.m_render.getunit(chase_id);
                chase_role.set_dxy(0, -100);
            }
            v = wdata.m_desc[4]; //aura
            if (v != 0) {
                wrolea.change_aura(v);
            }
            v = wdata.m_desc[5]; //title
            if (v != 0) {
                wrolea.change_title(v);
            }
            v = wdata.m_desc[6]; //ride
            if (v != 0) {
                var vb = wdata.m_desc[7];
                var rh = wdata.m_desc[8];
                if (rh == 0) {
                    rh = 30;
                }
                wrolea.change_ride(v, vb);
                wrolea.set_ride_h(rh);
            }
            else {
                wrolea.set_ride_h(30);
            }
            return wdata.roleid;
        };
        combatscene.prototype.on_addwarrior = function (user_data) {
            var wdata = user_data;
            var wrolea = null;
            if (this.get_warrior(wdata.id) != null) {
                wrolea = this.m_render.getunit(this.get_warrior(wdata.id).roleid);
                if (wrolea != null) {
                    laya.utils.Tween.clearAll(wrolea);
                }
                this.m_render.delunit(this.get_warrior(wdata.id).roleid);
            }
            var pos = this.get_pos(wdata.pos);
            var dir = this.get_dir(wdata.pos);
            //
            core.combat_tiplog('combatscene addwarrior ', wdata.id, pos.x, pos.y, dir);
            wdata.roleid = this._add_warrior_ins(wdata, pos.x, pos.y);
            //
            this.m_warrior_map[wdata.id] = wdata;
            this.on_warriorready({ "src": wdata.id });
            //let ra:core.renderavatar = this.m_render.getunit(wdata.roleid);
        };
        combatscene.prototype.on_delninja = function (user_data) {
            var id = user_data;
            core.combat_tiplog('combatscene on_delninja ', id);
            for (var _i = 0, _a = Object.keys(this.m_warrior_map); _i < _a.length; _i++) {
                var k = _a[_i];
                if (this.m_warrior_map.hasOwnProperty(k)) {
                    var tid = parseInt(k);
                    if (tid >= id) {
                        this.on_delwarrior(tid);
                    }
                }
            }
        };
        combatscene.prototype.on_delwarrior = function (user_data) {
            var id = user_data;
            core.combat_tiplog('combatscene on_delwarrior ', id);
            this._del_waction_obj(id);
            if (this.get_warrior(id) != null) {
                var wrolea = this.m_render.getunit(this.get_warrior(id).roleid);
                if (wrolea != null) {
                    laya.utils.Tween.clearAll(wrolea);
                }
                this.m_render.delunit(this.get_warrior(id).roleid);
                this.m_warrior_map[id] = null;
            }
        };
        combatscene.prototype._add_waction_obj = function (obj) {
            this._del_waction_obj(obj.m_id);
            this.m_waction_list.push(obj);
            return true;
        };
        combatscene.prototype._del_waction_obj = function (id) {
            var idx = 0;
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == id) {
                    i.dispose();
                    this.m_waction_list.splice(idx, 1);
                    return;
                }
                idx += 1;
            }
        };
        combatscene.prototype.on_warrioraction = function (user_data) {
            var src = user_data["src"];
            var actionid = user_data["actionid"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            this.m_render.unit_stop(wavatar.m_obj_id);
            wavatar.change_action(actionid, false, 0);
        };
        combatscene.prototype.on_addbuff = function (user_data) {
            //todo
            var src = user_data["src"];
            var id = user_data["buffid"];
            var shape = user_data["shape"];
            var buffeffid = user_data["buffeffid"];
            var cd = user_data["cd"];
            var overlap = user_data["overlay"];
            var datas = user_data["datas"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar != null) {
                var buffui = wavatar.get_buffui();
                var effid = 0;
                if (buffui.getbuff(id) == null) {
                    effid = wavatar.add_buffeff(buffeffid);
                }
                else {
                    effid = buffui.getbuff(id).m_effid;
                }
                buffui.addbuff(id, shape, cd, overlap, datas, effid);
            }
        };
        combatscene.prototype.on_delbuff = function (user_data) {
            //todo
            var src = user_data["src"];
            var id = user_data["buffid"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar != null) {
                var buffui = wavatar.get_buffui();
                var b = buffui.getbuff(id);
                if (b != null) {
                    wavatar.del_buffeff(b.m_effid);
                    buffui.delbuff(id);
                }
            }
        };
        combatscene.prototype.on_buffcd = function (user_data) {
            //todo
            var src = user_data["src"];
            var id = user_data["buffid"];
            var cd = user_data["cd"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar != null) {
                var buffui = wavatar.get_buffui();
                var buffins = buffui.getbuff(id);
                if (buffins != null) {
                    buffins.set_cd(cd);
                }
            }
        };
        combatscene.prototype.on_buffautocd = function (user_data) {
            //todo
            for (var i in this.m_warrior_map) {
                if (this.m_warrior_map.hasOwnProperty(i)) {
                    var wdata = this.m_warrior_map[i];
                    if (wdata != null) {
                        var wavatar = this.m_render.getunit(wdata.roleid);
                        if (wavatar != null) {
                            var buffui = wavatar.get_buffui();
                            buffui.buffautocd();
                        }
                    }
                }
            }
        };
        combatscene.prototype.on_cryout = function (user_data) {
            var src = user_data["src"];
            var v = user_data["content"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            var cn = this._get_combatcryout(v);
            cn.start();
            var x = wavatar.x;
            var y = wavatar.y;
            cn.m_obj_id = this.m_render.addsprite(cn, x, y);
            this.m_cryout_list.push(cn);
        };
        combatscene.prototype.clearallcryout = function () {
            for (var _i = 0, _a = this.m_cryout_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render.delsprite(i.m_obj_id);
            }
            this.m_cryout_list.length = 0;
        };
        combatscene.prototype.on_popnumber = function (user_data) {
            //todo
            var src = user_data["src"];
            var tp = user_data["type"];
            var v = user_data["damage"];
            var b_crack = user_data["crack"];
            if (b_crack) {
                tp = combat.DAMAGETYPE_CRACK;
            }
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            var cn;
            if (tp == combat.DAMAGETYPE_CRACK) {
                cn = this._get_combatcrack(v, tp);
            }
            else {
                cn = this._get_combatnum(v, tp);
            }
            cn.start();
            var x = wavatar.x;
            var y = wavatar.y;
            cn.m_obj_id = this.m_render.addsprite(cn, x, y);
            this.m_numpic_list.push(cn);
        };
        combatscene.prototype.on_warriorfly = function (user_data) {
            //todo
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorfly error!have not this role ", src);
                return;
            }
            var fly_a = utils.getitembycls("fly_action", fly_action);
            fly_a.re_init();
            fly_a.m_id = src;
            fly_a.m_warrior = wavatar;
            var gap = 0;
            fly_a.m_lt_pt.x = this.m_camera_x - this.m_view_w / 2 - gap;
            fly_a.m_lt_pt.y = this.m_camera_y - this.m_view_h / 2 - gap;
            fly_a.m_rb_pt.x = this.m_camera_x + this.m_view_w / 2 + gap;
            fly_a.m_rb_pt.y = this.m_camera_y + this.m_view_h / 2 + gap;
            fly_a.m_start_pt.x = wavatar.x;
            fly_a.m_start_pt.y = wavatar.y;
            if (this.is_downteam(this.get_posid_bywid(src))) {
                fly_a.m_from_pt.x = wavatar.x - this.m_pos_dx;
                fly_a.m_from_pt.y = wavatar.y - this.m_pos_dy;
            }
            else {
                fly_a.m_from_pt.x = wavatar.x + this.m_pos_dx;
                fly_a.m_from_pt.y = wavatar.y + this.m_pos_dy;
            }
            fly_a.start(utils.get_render_milltm());
            this._add_waction_obj(fly_a);
            //this.m_waction_list.push(fly_a);
        };
        combatscene.prototype.on_warriordeadvanish = function (user_data) {
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            wobj.b_dead = true;
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriordeadvanish error!have not this guy!", src);
                return;
            }
            var d_a = utils.getitembycls("dead_action", dead_action);
            d_a.re_init();
            d_a.m_id = src;
            d_a.m_warrior = wavatar;
            d_a.start(utils.get_render_milltm());
            this._add_waction_obj(d_a);
        };
        combatscene.prototype.on_warriordead = function (user_data) {
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            wobj.b_dead = true;
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriordead error!have not this guy!", src);
                return;
            }
            wavatar.change_action(5 /* ACTION_DEAD */, false);
            //let d_a:dead_action = utils.getitembycls("dead_action",dead_action);
            //d_a.re_init();
            //d_a.m_id = src;
            //d_a.m_warrior = wavatar;
            //d_a.start(utils.get_render_milltm());
            //this._add_waction_obj(d_a);
        };
        combatscene.prototype.on_warriorrevive = function (user_data) {
            var src = user_data["src"];
            var wobj = this.get_warrior(src);
            if (wobj == null) {
                return;
            }
            wobj.b_dead = true;
            this.on_warriorready({ "src": src });
        };
        combatscene.prototype.on_warriordodge = function (user_data) {
            var src = user_data["src"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            var x = wavatar.x;
            var y = wavatar.y;
            if (this.is_downteam(this.get_posid_bywid(src))) {
                x += this.m_pos_dx;
                y += this.m_pos_dy;
            }
            else {
                x -= this.m_pos_dx;
                y -= this.m_pos_dy;
            }
            laya.utils.Tween.to(wavatar, { set_x: x, set_y: y }, 500, laya.utils.Ease.strongOut);
            var cn = this._get_combatnum(0, combat.DAMAGETYPE_DODGE);
            cn.start();
            var x1 = wavatar.x - (cn.m_w >> 1);
            var y1 = wavatar.y - 100;
            cn.m_obj_id = this.m_render.addsprite(cn, x1, y1);
            this.m_numpic_list.push(cn);
        };
        combatscene.prototype.clearallnumpic = function () {
            for (var _i = 0, _a = this.m_numpic_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this.m_render.delsprite(i.m_obj_id);
            }
            this.m_numpic_list.length = 0;
        };
        combatscene.prototype.on_warriorsetpos = function (user_data) {
            var src = user_data["src"];
            var x = user_data["x"];
            var y = user_data["y"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorsetpos error!have not this guy!", src);
                return;
            }
            wavatar.set_pos(x, y);
        };
        combatscene.prototype.on_warriorbackmove = function (user_data) {
            var src = user_data["src"];
            var dst = user_data["dst"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorbackmove error!have not this guy!", src);
                return;
            }
            var x = wavatar.x;
            var y = wavatar.y;
            if (this.is_downteam(this.get_posid_bywid(src))) {
                x += this.m_pos_dx * dst;
                y += this.m_pos_dy * dst;
            }
            else {
                x -= this.m_pos_dx * dst;
                y -= this.m_pos_dy * dst;
            }
            laya.utils.Tween.to(wavatar, { set_x: x, set_y: y }, 500, laya.utils.Ease.elasticOut);
        };
        combatscene.prototype.on_warriorattacked = function (user_data) {
            var src = user_data["src"];
            var stopf = user_data["stopf"];
            var bcycle = true;
            if (stopf != undefined && stopf != null) {
                bcycle = false;
            }
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                core.combat_errlog("combatscene on_warriorattacked error!have not this guy!", src);
                return;
            }
            wavatar.change_action(4 /* ACTION_ATTACKED */, bcycle, stopf);
        };
        combatscene.prototype.on_warriordefend = function (user_data) {
            var src = user_data["src"];
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            wavatar.change_action(6 /* ACTION_DEFEND */);
        };
        combatscene.prototype.on_warriorready = function (user_data) {
            var src = user_data["src"];
            core.combat_tiplog("combatscene warrior ready ", src);
            var wavatar = this.get_warrior_avatar(src);
            if (wavatar == null) {
                return;
            }
            laya.utils.Tween.clearAll(wavatar);
            wavatar.change_action(2 /* ACTION_READY */);
            var pos = this.get_pos(this.get_posid_bywid(src));
            var dir = this.get_dir(this.get_posid_bywid(src));
            wavatar.change_dir(dir);
            wavatar.set_pos(pos.x, pos.y);
        };
        combatscene.prototype.on_sethp = function (user_data) {
            var hpins = user_data;
            core.combat_tiplog("combatscene on_sethp ", hpins.id, hpins.hp, hpins.hpmax);
            var wavatar = this.get_warrior_avatar(hpins.id);
            if (wavatar == null) {
                return;
            }
            wavatar.set_hp(hpins.hp, hpins.hpmax);
        };
        combatscene.prototype.on_warriormove = function (user_data) {
            var src = user_data["src"];
            var x = user_data["x"];
            var y = user_data["y"];
            this.m_render.unit_walk2(this.get_warrior_avatarid(src), x, y, true, true);
            var fdir = -1;
            if (user_data["forcedir"] != null) {
                fdir = user_data["forcedir"];
                var p = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if (p != null) {
                    p.m_force_dir = fdir;
                }
            }
        };
        combatscene.prototype.on_warriormoveback = function (user_data) {
            var src = user_data["src"];
            var pos = this.get_pos(this.get_posid_bywid(src));
            this.m_render.unit_walk2(this.get_warrior_avatarid(src), pos.x, pos.y, true, true);
            var fdir = -1;
            if (user_data["forcedir"] != null) {
                fdir = user_data["forcedir"];
                var p = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if (p != null) {
                    p.m_force_dir = fdir;
                }
            }
        };
        combatscene.prototype.on_warriormove2warrior = function (user_data) {
            var src = user_data["src"];
            var dst = user_data["dst"];
            var pos = this.get_pos(this.get_posid_bywid(dst));
            if (this.is_downteam(this.get_posid_bywid(src))) {
                pos.x += this.m_pos_dx;
                pos.y += this.m_pos_dy;
            }
            else {
                pos.x -= this.m_pos_dx;
                pos.y -= this.m_pos_dy;
            }
            this.m_render.unit_walk2(this.get_warrior_avatarid(src), pos.x, pos.y, true, true);
            var fdir = -1;
            if (user_data["forcedir"] != null) {
                fdir = user_data["forcedir"];
                var p = this.m_render.get_unit_walk(this.get_warrior_avatarid(src));
                if (p != null) {
                    p.m_force_dir = fdir;
                }
            }
        };
        combatscene.prototype.on_warriordir2w = function (user_data) {
            var src = user_data["src"];
            var dst = user_data["dst"];
            var srcavatar = this.m_render.getunit(this.get_warrior_avatarid(src));
            var dstavatar = this.m_render.getunit(this.get_warrior_avatarid(dst));
            if (srcavatar == null || dstavatar == null) {
                return;
            }
            var dir = utils.gendir(dstavatar.x - srcavatar.x, dstavatar.y - srcavatar.y);
            srcavatar.change_dir(dir);
        };
        combatscene.prototype.on_warriordir = function (user_data) {
            var src = user_data["src"];
            var dir = user_data["dir"];
            var wavatar = this.m_render.getunit(this.get_warrior_avatarid(src));
            if (wavatar == null) {
                return;
            }
            wavatar.change_dir(dir);
        };
        combatscene.prototype.on_effect_screenpos = function (user_data) {
            var effectid = user_data["effectid"];
            var x = user_data["x"];
            var y = user_data["y"];
            var pos = this.m_render.stagepos2worldpos(new Laya.Point(x, y));
            this.m_render.addeff(effectid, pos.x, pos.y, false, true);
        };
        combatscene.prototype.on_effect = function (user_data) {
            var effectid = user_data["effectid"];
            var x = user_data["x"];
            var y = user_data["y"];
            this.m_render.addeff(effectid, x, y, false, true);
        };
        combatscene.prototype.on_effect2w = function (user_data) {
            var effectid = user_data["effectid"];
            var srcid = user_data["src"];
            var wavatar = this.get_warrior_avatar(srcid);
            if (wavatar == null) {
                return;
            }
            var x = wavatar.x;
            var y = wavatar.y;
            this.m_render.addeff(effectid, x, y, false, true);
        };
        combatscene.prototype.on_customevent = function (user_data) {
            core.combat_tiplog("combatscene customevent ", user_data);
            utils.event_ins().fire_event_next_frame(user_data[0], user_data[1]);
        };
        combatscene.prototype.on_blackscene = function (user_data) {
            var tm = user_data["tm"];
            this.m_render.blackscene(tm);
        };
        combatscene.prototype.is_downteambywid = function (wid, self_group) {
            var pos = wid;
            if (self_group != 0) {
                if (pos <= 12) {
                    pos += 20;
                }
                else {
                    pos -= 20;
                }
            }
            return this.is_downteam(pos);
        };
        combatscene.prototype.is_downteam = function (id) {
            if (id <= 12) {
                return true;
            }
            return false;
        };
        combatscene.prototype.mgr = function () {
            return this.m_combat_mgr;
        };
        combatscene.prototype.register_event = function (event, func) {
            this.mgr().register_event(event, this);
            this.register_event_func(event, func);
        };
        combatscene.prototype.unregister_event = function (event) {
            this.mgr().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        combatscene.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            this.mgr().fire_event(event, user_data);
        };
        combatscene.prototype.unregister_allevent = function () {
            this.mgr().unregister_allevent(this);
            this.unregister_all_event_func();
        };
        combatscene.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            this.mgr().fire_event_next_frame(event, user_data);
        };
        combatscene.prototype.start = function () {
        };
        combatscene.prototype._get_combatnum = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            var ret = utils.getitembycls("combat_number", combat.combat_number);
            ret.re_init(v, tp, content);
            return ret;
        };
        combatscene.prototype._get_combatcrack = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            var ret = utils.getitembycls("combat_crack", combat.combat_crack);
            ret.re_init(v, tp, content);
            return ret;
        };
        combatscene.prototype._get_combatcryout = function (content) {
            if (content === void 0) { content = ""; }
            var ret = utils.getitembycls("combat_cryout", combat.combat_cryout);
            ret.re_init(content);
            return ret;
        };
        combatscene.prototype.clear = function () {
            this.clear_bk_htmlcanvas();
            this.clearallwarrior();
            for (var _i = 0, _a = this.m_waction_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
            }
            this.m_waction_list.length = 0;
            this.clear_lineupsp();
            this.clearallnumpic();
            this.clearallcryout();
            this.m_render.clearmapbksp();
            this.m_render.clear();
        };
        combatscene.prototype.update = function (delta) {
            this.m_tempnumpic_list.length = 0;
            for (var _i = 0, _a = this.m_numpic_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.is_end()) {
                    i.dispose();
                    this.m_render.delsprite(i.m_obj_id);
                }
                else {
                    i.tick(delta);
                    this.m_tempnumpic_list.push(i);
                }
            }
            var temp = this.m_numpic_list;
            this.m_numpic_list = this.m_tempnumpic_list;
            this.m_tempnumpic_list = temp;
            //
            this.m_tempcryout_list.length = 0;
            for (var _b = 0, _c = this.m_cryout_list; _b < _c.length; _b++) {
                var i = _c[_b];
                if (i.is_end()) {
                    i.dispose();
                    this.m_render.delsprite(i.m_obj_id);
                }
                else {
                    i.tick(delta);
                    this.m_tempcryout_list.push(i);
                }
            }
            var temp1 = this.m_cryout_list;
            this.m_cryout_list = this.m_tempcryout_list;
            this.m_tempcryout_list = temp1;
            //
            for (var i = this.m_waction_list.length - 1; i >= 0; --i) {
                var wa = this.m_waction_list[i];
                wa.update(delta);
                if (wa.is_end()) {
                    wa.dispose();
                    this.m_waction_list.splice(i, 1);
                }
            }
            this.m_render.update(delta);
        };
        combatscene.prototype.render = function () {
            this.m_render.render();
        };
        combatscene.prototype.dispose = function () {
            this.clear();
            if (this.m_render != null) {
                this.m_render.dispose();
                this.m_render = null;
            }
            this.m_combat_mgr = null;
            _super.prototype.dispose.call(this);
            this.unregister_allevent();
        };
        return combatscene;
    }(utils.game_event_receiver));
    combat.combatscene = combatscene;
})(combat || (combat = {}));
//# sourceMappingURL=combatscene.js.map