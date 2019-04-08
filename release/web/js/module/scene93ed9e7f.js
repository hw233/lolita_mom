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
var game;
(function (game) {
    var scene = /** @class */ (function (_super) {
        __extends(scene, _super);
        function scene() {
            var _this = _super.call(this) || this;
            _this.m_role_obj = null;
            _this.m_b_start_run = false;
            _this.m_b_run_start_x = -1;
            _this.m_b_run_start_y = -1;
            return _this;
        }
        scene.prototype.start = function () {
            _super.prototype.start.call(this);
            core.game_tiplog('scene start');
            //this.m_render.setmapbk("1002.jpg");
            //this.m_render.m_render.setworldwh(9600,5504);
            //this.m_render.addani(1001,100,100,false);
            //this.m_render.addani(1001,150,100,true);
            //this.m_render.addani(1001,this.m_render.m_render.getworldw()/2,this.m_render.m_render.getworldh()/2,false);
            //
            this.register_net_event(protocol_def.S2C_HERO_GOTO, this.on_main_force_goto);
            this.register_net_event(protocol_def.S2C_HERO_ENTERSCENE, this.on_main_enterscene);
            this.register_net_event(protocol_def.S2C_MAP_TRACK, this.on_net_rolemove);
            this.register_net_event(protocol_def.S2C_MAP_DEL, this.on_net_scenedel);
            this.register_net_event(protocol_def.S2C_MAP_ADDPLAYER, this.on_net_addplayer);
            this.register_net_event(protocol_def.S2C_MAP_REGIONCHANGE, this.on_regionchanged);
            this.register_event(game_event.EVENT_SCENE_CLICK, this.on_scene_click);
            this.register_event(game_event.EVENT_SCENE_STOP, this.on_scene_stop);
            var game_ins = game.get_module(module_enum.MODULE_MAIN);
            this.m_render = game_ins.get_render();
            this.register_event(game_event.EVENT_TIMER_TICK_1S, this.on_check_mainplayer_pos);
        };
        scene.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        scene.prototype._get_mainrole_id = function () {
            var mp = data.get_data(data_enum.DATA_PLAYER);
            return mp.m_scene_roleid;
        };
        scene.prototype.is_mainplayer = function (pid) {
            var mp = data.get_data(data_enum.DATA_PLAYER);
            return pid == mp.m_pid;
        };
        scene.prototype.on_role_enter = function (id, name, shape, lv, cls, x, y, desc) {
            core.game_tiplog("scene on_role_enter ", id, name, shape, lv, cls, x, y);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(id);
            var role_id = 0;
            if (sroledata != null) {
                core.game_tiplog("error! already have this role ", id);
                role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delrole(id);
            }
            scenedata.addrole(id, shape, name, lv, cls, x, y, desc);
            sroledata = scenedata.getrole(id);
            var sx = x * this.m_render.getmap_gridw();
            var sy = y * this.m_render.getmap_gridh();
            if (shape == 0) {
                shape = 102;
            }
            role_id = this.m_render.addunit(name, shape, sx, sy);
            sroledata.set_role_id(role_id);
            sroledata.m_desc = desc;
            var ra = this.m_render.getunit(role_id);
            if (ra != null) {
                ra.change_action(0 /* ACTION_STAND */);
                ra.change_weapon(10001);
                ra.change_ride(20001, 30001);
                ra.set_ride_h(30);
                ra.change_wing(40001);
            }
            this.fire_event_next_frame(game_event.EVENT_PLAYER_ENTER);
        };
        scene.prototype.on_role_out = function (id) {
            core.game_tiplog("scene on_role_out ", id);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(id);
            if (sroledata != null) {
                var role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delrole(id);
                this.fire_event_next_frame(game_event.EVENT_PLAYER_OUT);
                return;
            }
            sroledata = scenedata.getnpc(id);
            if (sroledata != null) {
                var role_id = sroledata.m_role_id;
                this.m_render.delunit(role_id);
                scenedata.delnpc(id);
                return;
            }
        };
        scene.prototype.on_role_move = function (id, x, y) {
            core.game_tiplog("scene on_role_move ", id, x, y);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(id);
            if (sroledata == null) {
                sroledata = scenedata.getnpc(id);
                if (sroledata == null) {
                    core.game_tiplog("scene have not this role ", id, x, y);
                    return;
                }
            }
            sroledata.set_pos(x, y);
            var role_id = sroledata.m_role_id;
            var pt = this.m_render.unit_walk2(role_id, x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh());
            var mavatar = this.m_render.getunit(role_id);
            if (pt == null && mavatar != null) {
                if (this.m_render.is_scene_block(mavatar.x, mavatar.y)) {
                    pt = this.m_render.unit_walk2(role_id, x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh(), true);
                }
            }
        };
        scene.prototype.on_enter_scene = function (ssid, resid, x, y) {
            core.game_tiplog("scene on_enter_scene ", ssid, resid, x, y);
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
            var mavatar = this.m_render.getunit(this._get_mainrole_id());
            if (mavatar != null) {
                this.m_render.unit_stop(this._get_mainrole_id());
            }
            this.m_render.clear();
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            scenedata.clearallrole();
            scenedata.clearallnpc();
            scenedata.clear_all_cli_npc();
            var mp = data.get_data(data_enum.DATA_PLAYER);
            mp.m_sid = ssid;
            mp.m_sresid = resid;
            mp.x = x;
            mp.y = y;
            scenedata.addrole(mp.m_pid, mp.m_shape, mp.m_name, mp.m_lv, mp.m_class, mp.x, mp.y, mp.m_desc);
            //sid = 1700;
            this.m_render.entermap(resid, false);
            this.m_render.setmapbk("map/city/" + resid.toString() + "/" + resid.toString() + ".jpg");
            var sx = x * this.m_render.getmap_gridw();
            var sy = y * this.m_render.getmap_gridh();
            core.game_tiplog("enter scene create main player ", mp.m_name, mp.m_shape, sx, sy, x, y);
            var m_role_id = this.m_render.addunit(mp.m_name, mp.m_shape, sx, sy);
            scenedata.setroleid(mp.m_pid, m_role_id);
            mp.m_scene_roleid = m_role_id;
            /*
            let chase_id:number = this.m_render.addunit("",50001,0,0);
            this.m_render.set_follow_id(chase_id,this.m_role_id);
            let chase_role:core.renderavatar = this.m_render.getunit(chase_id);
            chase_role.set_dxy(0,-100);
            chase_role.show_shadow(false);
            chase_role = this.m_render.getunit(this.m_role_id);
            chase_role.change_weapon(10001);
            chase_role.change_ride(20001,30001);
            chase_role.set_ride_h(30);
            chase_role.change_wing(40001);
            */
            //this.m_render.addani(1001,150,100,true);
            //this.m_render.addani(1001,this.m_render.m_render.getworldw()/2,this.m_render.m_render.getworldh()/2,false);
            //
            var unit = this.m_render.getunit(this._get_mainrole_id());
            if (unit != null) {
                unit.change_action(0 /* ACTION_STAND */);
                unit.change_weapon(10001);
                unit.change_ride(20001, 30001);
                unit.set_ride_h(30);
                unit.change_wing(40001);
                this.m_render.cameralookat(unit);
                this.m_role_obj = unit;
            }
            this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE, [x, y]);
            this.fire_event_next_frame(game_event.EVENT_ENTERSCENE, { "scene_id": ssid });
        };
        scene.prototype.req_unit_move = function (uid, sx, sy) {
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            var sroledata = scenedata.getrole(uid);
            if (sroledata != null) {
                uid = sroledata.m_role_id;
            }
            else {
                return;
            }
            var wpos = new Laya.Point();
            wpos.x = sx * this.m_render.getmap_gridw();
            wpos.y = sy * this.m_render.getmap_gridh();
            var ret = this.m_render.unit_walk2(uid, wpos.x, wpos.y);
            var mavatar = this.m_render.getunit(uid);
            if (ret == null && mavatar != null) {
                if (this.m_render.is_scene_block(mavatar.x, mavatar.y)) {
                    ret = this.m_render.unit_walk2(uid, wpos.x, wpos.y, true);
                }
            }
            return ret;
        };
        scene.prototype.req_main_move = function (sx, sy) {
            var wpos = new Laya.Point();
            wpos.x = sx * this.m_render.getmap_gridw();
            wpos.y = sy * this.m_render.getmap_gridh();
            this.m_render.addeff(1003, wpos.x, wpos.y, true, true);
            var mp = data.get_data(data_enum.DATA_PLAYER);
            var ret = this.req_unit_move(mp.m_pid, sx, sy);
            if (ret != null) {
                var mx = ret.x;
                var my = ret.y;
                mx = Math.floor(mx / this.m_render.getmap_gridw());
                my = Math.floor(my / this.m_render.getmap_gridh());
                //net.net_ins().send(protocol_def.c2s_move,{'x':mx,'y':my});
                this.m_b_start_run = true;
                var mavatar = this.m_render.getunit(this._get_mainrole_id());
                var cx = mavatar.x;
                var cy = mavatar.y;
                cx = Math.floor(cx / this.m_render.getmap_gridw());
                cy = Math.floor(cy / this.m_render.getmap_gridh());
                if (this.m_b_run_start_x == -1) {
                    this.m_b_run_start_x = cx;
                    this.m_b_run_start_y = cy;
                }
                mp.x = mx;
                mp.y = my;
                //this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE,[mx,my]);
            }
        };
        scene.prototype.wpos2spos = function (x, y) {
            var wpos = new laya.maths.Point(x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh());
            var spos = this.m_render.worldpos2stagepos(wpos);
            spos.x = spos.x * 1.0;
            spos.y = spos.y * 1.0;
            return spos;
        };
        scene.prototype.on_click_sp = function (sx, sy) {
            if (this._get_mainrole_id() == 0) {
                return;
            }
            //
            //
            var src_x = sx;
            var src_y = sy;
            //
            var spos = new laya.maths.Point(sx, sy);
            var wpos = this.m_render.stagepos2worldpos(spos);
            var click_id = this.m_render.check_point(wpos.x, wpos.y);
            if (click_id != 0) {
                var scenedata = data.get_data(data_enum.DATA_SCENE);
                for (var _i = 0, _a = scenedata.m_npc_mgr.m_role_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.m_role_id == click_id) {
                        net.net_ins().send(protocol_def.C2S_NPC_LOOK, { 'id': i.m_pid });
                        return;
                    }
                }
                for (var _b = 0, _c = scenedata.m_role_mgr.m_role_list; _b < _c.length; _b++) {
                    var i = _c[_b];
                    if (i.m_role_id == click_id && !this.is_mainplayer(i.m_pid)) {
                        this.fire_event_next_frame(game_event.EVENT_CLICK_PLAYER, { "pid": i.m_pid });
                        return;
                    }
                }
            }
            this.req_main_move(wpos.x / this.m_render.getmap_gridw(), wpos.y / this.m_render.getmap_gridh());
        };
        scene.prototype._get_move_dir = function (pt) {
            if (pt.x == 0 && pt.y == 0) {
                alert("get_move_dir error!!");
                return 0;
            }
            if (pt.x == 0 && pt.y > 0) {
                return 0;
            }
            if (pt.x == 0 && pt.y < 0) {
                return 4;
            }
            if (pt.x > 0 && pt.y == 0) {
                return 6;
            }
            if (pt.x < 0 && pt.y == 0) {
                return 2;
            }
            if (pt.x > 0 && pt.y > 0) {
                return 7;
            }
            if (pt.x > 0 && pt.y < 0) {
                return 5;
            }
            if (pt.x < 0 && pt.y > 0) {
                return 1;
            }
            if (pt.x < 0 && pt.y < 0) {
                return 3;
            }
            alert("get_move_dir error end!!");
            return 0;
        };
        scene.prototype.send_move_step = function (sx, sy, step_list) {
            var C2S_MOVE_STEP = 0x140;
            var C2S_MOVE_STEP_SUB = 0x0;
            var STEP_MAX = 16;
            var sendbuff = new Laya.Byte();
            sendbuff.endian = Laya.Byte.BIG_ENDIAN;
            while (step_list.length > 0) {
                sendbuff.clear();
                //sendbuff.writeUint8(C2S_MOVE_STEP_SUB);
                sendbuff.writeUint16(sx);
                sendbuff.writeUint16(sy);
                var step_count = step_list.length;
                if (step_count > STEP_MAX) {
                    step_count = STEP_MAX;
                }
                sendbuff.writeUint8(step_count);
                var idx = 0;
                var tmp = "" + sx.toString() + " " + sy.toString();
                var step_obj = new Array();
                var start_x = sx;
                var start_y = sy;
                while (idx < step_count) {
                    var pt = step_list.shift();
                    var dir = this._get_move_dir(pt) + 1;
                    sendbuff.writeUint8(dir);
                    sx = sx + pt.x;
                    sy = sy + pt.y;
                    idx += 1;
                    tmp += " " + pt.x.toString() + " " + pt.y.toString() + " " + dir.toString();
                    step_obj.push(dir);
                }
                core.game_tiplog("s2c movestep ", tmp);
                net.net_ins().send_raw_buff(C2S_MOVE_STEP, sendbuff);
                //net.net_ins().send(protocol_def.C2S_MAP_MOVE,{'x':start_x,'y':start_y,'step':step_obj});
            }
        };
        scene.prototype.on_check_mainplayer_pos = function (ud) {
            if (ud === void 0) { ud = null; }
            //
            if (this.m_role_obj != null) {
                var x = this.m_role_obj.x;
                var y = this.m_role_obj.y;
                var ret = this.m_render.is_scene_mask(x, y);
                if (ret) {
                    this.m_role_obj.alpha = 0.5;
                }
                else {
                    this.m_role_obj.alpha = 1.0;
                }
            }
            //
            if (this.m_b_start_run) {
                core.game_tiplog("on_check_mainplayer_pos start");
                var mavatar = this.m_render.getunit(this._get_mainrole_id());
                var cx = mavatar.x;
                var cy = mavatar.y;
                cx = Math.floor(cx / this.m_render.getmap_gridw());
                cy = Math.floor(cy / this.m_render.getmap_gridh());
                core.game_tiplog("on_check_mainplayer_pos ", this.m_b_run_start_x, this.m_b_run_start_y, cx, cy);
                if (cx == this.m_b_run_start_x && cy == this.m_b_run_start_y) {
                    if (this.m_render.is_unit_walk(this._get_mainrole_id()) == false) {
                        this.m_b_start_run = false;
                    }
                    this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE, [cx, cy]);
                    core.game_tiplog("on_check_mainplayer_pos end1");
                    return;
                }
                else {
                    var dx = cx - this.m_b_run_start_x;
                    var dy = cy - this.m_b_run_start_y;
                    if (dx != 0) {
                        dx = dx / Math.abs(dx);
                    }
                    if (dy != 0) {
                        dy = dy / Math.abs(dy);
                    }
                    var step_list = new Array();
                    var stepx = this.m_b_run_start_x;
                    var stepy = this.m_b_run_start_y;
                    while (stepx != cx || stepy != cy) {
                        step_list.push(new laya.maths.Point(dx, dy));
                        stepx = stepx + dx;
                        stepy = stepy + dy;
                        if (stepx == cx) {
                            dx = 0;
                        }
                        if (stepy == cy) {
                            dy = 0;
                        }
                    }
                    this.send_move_step(this.m_b_run_start_x, this.m_b_run_start_y, step_list);
                    this.m_b_run_start_x = cx;
                    this.m_b_run_start_y = cy;
                    this.fire_event_next_frame(game_event.EVENT_MAINPLAYER_MOVE, [cx, cy]);
                }
                core.game_tiplog("on_check_mainplayer_pos end2");
            }
        };
        scene.prototype.on_scene_stop = function (ud) {
            if (ud === void 0) { ud = null; }
            //this.on_check_mainplayer_pos();
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
        };
        scene.prototype.on_main_force_goto = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_start_run = false;
            this.m_b_run_start_x = -1;
            this.m_b_run_start_y = -1;
            var x = ud['x'];
            var y = ud['y'];
            core.game_errlog("on_main_force_goto ", x, y);
            var mavatar = this.m_render.getunit(this._get_mainrole_id());
            if (mavatar != null) {
                this.m_render.unit_stop(this._get_mainrole_id());
                mavatar.set_pos(x * this.m_render.getmap_gridw(), y * this.m_render.getmap_gridh());
            }
        };
        scene.prototype.on_main_enterscene = function (ud) {
            if (ud === void 0) { ud = null; }
            var rid = ud['id'];
            var sid = ud['scid'];
            var ssid = ud['scsid'];
            var resid = ud['resid'];
            var scname = ud['scname'];
            var x = ud['x'];
            var y = ud['y'];
            core.game_tiplog("on_main_enterscene ", ud, x, y);
            //resid = 1001;
            this.on_enter_scene(ssid, resid, x, y);
        };
        scene.prototype.on_net_addplayer = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_net_addplayer ", ud);
            var id = ud["id"];
            var name = ud["name"];
            var shape = ud["shape"];
            var cls = 1; //ud["class"];
            var lv = 1; //ud["lv"];
            var x = ud["x"];
            var y = ud["y"];
            var desc = ud["desc"];
            // 服务器去掉了这两个字段
            // let title:number = ud["title"];
            // let touxian:number = ud["touxian"];
            this.on_role_enter(id, name, shape, lv, cls, x, y, desc);
        };
        scene.prototype.on_regionchanged = function (ud) {
            core.game_tiplog("on_regionchanged ", ud);
            var left = ud['x'];
            var top = ud['y'];
            var right = ud['rw'];
            var bottom = ud['rh'];
            core.game_tiplog("on_regionchanged ", left, top, right, bottom);
            var scenedata = data.get_data(data_enum.DATA_SCENE);
            for (var _i = 0, _a = scenedata.m_role_mgr.m_role_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (this.is_mainplayer(i.m_pid)) {
                    continue;
                }
                //自己不删除
                //need code 如果将来场景里有组队，则要加入下面处理
                //如果在组队中，并且只是队员，而不是队长，暂时跳过不处理
                //如果在组队中，并且是队长，则连整个队伍一起删除
                //end need code
                if (i.x < left || i.x > right || i.y < top || i.y > bottom) {
                    this.on_role_out(i.m_pid);
                }
            }
        };
        scene.prototype.on_net_scenedel = function (ud) {
            core.game_tiplog("on_net_scenedel ", ud);
            var id = ud["id"];
            this.on_role_out(id);
        };
        scene.prototype.on_net_rolemove = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_net_rolemove ", ud);
            var id = ud["id"];
            var x = ud["x"];
            var y = ud["y"];
            var dx = ud["dx"];
            var dy = ud["dy"];
            core.game_tiplog("on_net_rolemove data ", id, x, y, dx, dy);
            this.on_role_move(id, dx, dy);
        };
        scene.prototype.on_scene_click = function (user_data) {
            if (user_data === void 0) { user_data = null; }
            core.game_tiplog("scene ins on_game_click ", user_data);
            this.on_click_sp(user_data[0], user_data[1]);
        };
        return scene;
    }(utils.game_module));
    game.scene = scene;
})(game || (game = {}));
//# sourceMappingURL=scene.js.map