var core;
(function (core) {
    function render_sort(a, b) {
        return a.m_screen_z - b.m_screen_z; //a - b small 2 big;b - a big 2 small
    }
    var renderimpl = /** @class */ (function () {
        function renderimpl() {
            this.m_eye = null;
            this.m_eye_tm = 0;
            this.m_camera = new core.rendercamera();
            this.m_view = new core.renderview();
            this.m_scene = new core.renderscene();
            this.m_renderrcs = new Array();
            this.m_context = new core.rendercontext();
            this.m_context.m_camera = this.m_camera;
            this.m_context.m_render = this;
            this.m_context.m_view = this.m_view;
            this.m_world_rect = new laya.maths.Rectangle();
        }
        renderimpl.prototype.initstage = function (sp) {
            this.m_view.removeSelf();
            sp.addChild(this.m_view);
        };
        renderimpl.prototype.setworldwh = function (w, h) {
            this.m_world_rect.setTo(0, 0, w, h);
        };
        renderimpl.prototype.getworldw = function () {
            return this.m_world_rect.width;
        };
        renderimpl.prototype.getworldh = function () {
            return this.m_world_rect.height;
        };
        renderimpl.prototype.set_eye = function (unit) {
            this.m_eye = unit;
        };
        //new start
        renderimpl.prototype._get_renderavatar_ins = function (shape, x, y, use_default) {
            if (use_default === void 0) { use_default = true; }
            var ret = utils.getitembycls("renderavatar", core.renderavatar);
            ret.re_init(shape, x, y, use_default);
            return ret;
        };
        renderimpl.prototype._del_renderavatar_ins = function (ins) {
            ins.dispose();
            utils.recover("renderavatar", ins);
        };
        renderimpl.prototype._get_rendereff_ins = function (aniid, x, y, underunit, autodel) {
            var ret = utils.getitembycls("rendereff", core.rendereff);
            ret.re_init(aniid, x, y, underunit, autodel);
            return ret;
        };
        renderimpl.prototype._del_rendereff_ins = function (ins) {
            ins.dispose();
            utils.recover("rendereff", ins);
        };
        renderimpl.prototype._get_renderani_ins = function (aniid, x, y, underunit) {
            var ret = utils.getitembycls("renderani", core.renderani);
            ret.re_init(aniid, x, y, underunit);
            return ret;
        };
        renderimpl.prototype._del_renderani_ins = function (ins) {
            ins.dispose();
            utils.recover("renderani", ins);
        };
        renderimpl.prototype._get_rendersprite_ins = function (sp, x, y, b_unit_front) {
            if (b_unit_front === void 0) { b_unit_front = true; }
            var ret = utils.getitembycls("rendersprite", core.rendersprite);
            ret.re_init(sp, x, y, b_unit_front);
            return ret;
        };
        renderimpl.prototype._del_rendersprite_ins = function (ins) {
            ins.dispose();
            utils.recover("rendersprite", ins);
        };
        //end
        renderimpl.prototype.update_camera_pos = function (delta) {
            if (this.m_eye != null) {
                this.m_eye_tm += delta;
                if (this.m_eye_tm > 0) {
                    this.m_eye_tm = 0;
                    this.setcamerapos(this.m_eye.x, this.m_eye.y, true);
                }
            }
        };
        renderimpl.prototype.setcamerapos = function (x, y, force) {
            if (force === void 0) { force = true; }
            var min_x = 0;
            var max_x = 0;
            var min_y = 0;
            var max_y = 0;
            if (this.getviewportw() >= this.getworldw()) {
                x = this.getworldw() >> 1;
            }
            else {
                min_x = (this.getviewportw() >> 1);
                if (x < min_x) {
                    x = min_x;
                }
                max_x = this.getworldw() - (this.getviewportw() >> 1);
                if (x > max_x) {
                    x = max_x;
                }
            }
            if (this.getviewporth() >= this.getworldh()) {
                y = this.getworldh() >> 1;
            }
            else {
                min_y = (this.getviewporth() >> 1);
                if (y < min_y) {
                    y = min_y;
                }
                max_y = this.getworldh() - (this.getviewporth() >> 1);
                if (y > max_y) {
                    y = max_y;
                }
            }
            //core.core_tiplog("renderimpl setcamerapos ",x,y,min_x,max_x,min_y,max_y,this.getworldw(),this.getworldh(),this.getviewportw(),this.getviewporth());
            this.m_camera.set_pos(x, y, force);
        };
        renderimpl.prototype.setviewport = function (w, h) {
            this.m_camera.setTo(this.m_camera.x, this.m_camera.y, w, h);
        };
        renderimpl.prototype.getviewportw = function () {
            return this.m_camera.width;
        };
        renderimpl.prototype.getviewporth = function () {
            return this.m_camera.height;
        };
        renderimpl.prototype.dispose = function () {
            this.m_renderrcs = null;
            if (this.m_scene != null) {
                this.m_scene.dispose();
                this.m_scene = null;
            }
            if (this.m_context != null) {
                this.m_context.dispose();
                this.m_context = null;
            }
            if (this.m_camera != null) {
                this.m_camera.dispose();
                this.m_camera = null;
            }
            if (this.m_view != null) {
                this.m_view.removeSelf();
                this.m_view.dispose();
                this.m_view = null;
            }
        };
        renderimpl.prototype.addrc = function (rc) {
            this.m_renderrcs.push(rc);
        };
        //自己管理时间
        renderimpl.prototype.update = function (delta) {
            //update delta
            this.update_camera_pos(delta);
            this.m_camera.update(delta);
            this.m_scene.update(delta);
            this.m_view.update(delta);
        };
        renderimpl.prototype.render = function () {
            this.m_renderrcs.length = 0;
            this.m_camera.project(this.m_context);
            this.m_view.project(this.m_context);
            this.m_scene.project(this.m_context);
            this.m_renderrcs.sort(render_sort);
            this.m_view.renderbefore();
            for (var _i = 0, _a = this.m_renderrcs; _i < _a.length; _i++) {
                var i = _a[_i];
                i.render(this.m_context);
            }
            this.m_view.renderafter();
        };
        renderimpl.prototype.check_click = function (x, y) {
            for (var i = this.m_renderrcs.length - 1; i > 0; --i) {
                if (this.m_renderrcs[i].is_contain(x, y)) {
                    return this.m_renderrcs[i].m_obj.m_obj_id;
                }
            }
            return 0;
        };
        return renderimpl;
    }());
    core.renderimpl = renderimpl;
})(core || (core = {}));
//# sourceMappingURL=renderimpl.js.map