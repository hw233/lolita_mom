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
    var scrollbkslot = /** @class */ (function (_super) {
        __extends(scrollbkslot, _super);
        function scrollbkslot() {
            var _this = _super.call(this) || this;
            _this.m_mat = null;
            _this.m_mat_res = "";
            _this.m_w = 0;
            _this.m_h = 0;
            _this.m_drawx = 0;
            _this.m_drawy = 0;
            _this.m_view_w = 0;
            _this.m_b_draw = false;
            return _this;
        }
        scrollbkslot.prototype.set_pos = function (x, y) {
            this.m_drawx = x;
            this.m_drawy = y;
            this.x = this.m_drawx;
            this.y = this.m_drawy;
            this.removeChildren();
            if (this.m_drawx >= (-this.m_w) && this.m_drawx <= this.m_view_w) {
                this.m_b_draw = true;
                this.addChild(this.m_mat.m_graphic);
            }
            else {
                this.m_b_draw = false;
            }
        };
        scrollbkslot.prototype.re_init = function (respath) {
            this.m_mat = core.mat_mgr().getmapbkres(respath);
            this.m_mat_res = respath;
            this.m_w = 0;
            this.m_h = 0;
            this.m_drawx = 0;
            this.m_drawy = 0;
            this.m_view_w = 0;
            this.m_b_draw = false;
            this.x = 0;
            this.y = 0;
            this.removeChildren();
        };
        scrollbkslot.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().delmapbkres(this.m_mat);
                this.m_mat = null;
            }
        };
        return scrollbkslot;
    }(Laya.Sprite));
    core.scrollbkslot = scrollbkslot;
    var rendermapscrollbk = /** @class */ (function (_super) {
        __extends(rendermapscrollbk, _super);
        function rendermapscrollbk() {
            var _this = _super.call(this) || this;
            _this.m_mat_list = new Array();
            _this.m_tmpmat_list = new Array();
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_spd = 200;
            _this.m_view_w = 0;
            _this.re_init();
            return _this;
        }
        rendermapscrollbk.prototype.re_init = function () {
            this.m_mat_list.length = 0;
            this.m_dx = 0;
            this.m_dy = 0;
            this.x = 0;
            this.y = 0;
            this.m_spd = 200;
            this.m_rc = utils.getitembycls("mapscrollbkcommand", core.mapscrollbkcommand);
            this.m_rc.re_init(this);
        };
        rendermapscrollbk.prototype.setdeltapos = function (x, y) {
            this.m_dx = x;
            this.m_dy = y;
            this.x = x;
            this.y = y;
        };
        rendermapscrollbk.prototype.setspd = function (spd) {
            this.m_spd = spd;
        };
        rendermapscrollbk.prototype.addres = function (res, w, h) {
            var mat = utils.getitembycls("scrollbkslot", scrollbkslot);
            mat.re_init(res);
            mat.m_view_w = this.m_view_w;
            mat.m_w = w;
            mat.m_h = h;
            if (this.m_mat_list.length <= 0) {
                mat.set_pos(0, 0);
            }
            else {
                var pre_mat = this.m_mat_list[this.m_mat_list.length - 1];
                mat.set_pos(pre_mat.m_drawx + pre_mat.m_w, 0);
            }
            this.m_mat_list.push(mat);
            //this.m_mat = mat_mgr().getmapbkres(res);
            //this.removeChildren();
            this.addChild(mat);
        };
        rendermapscrollbk.prototype.update = function (delta) {
            this.m_tmpmat_list.length = 0;
            var dx = delta / 1000 * this.m_spd;
            var mat = null;
            for (var i = this.m_mat_list.length - 1; i >= 0; --i) {
                mat = this.m_mat_list[i];
                var drawx = mat.m_drawx - dx;
                if (drawx < -mat.m_w) {
                    this.m_tmpmat_list.push(mat);
                    this.m_mat_list.splice(i, 1);
                }
                else {
                    mat.set_pos(drawx, 0);
                }
            }
            if (this.m_tmpmat_list.length > 0) {
                this.m_tmpmat_list.reverse();
                var startx = 0;
                if (this.m_mat_list.length > 0) {
                    mat = this.m_mat_list[this.m_mat_list.length - 1];
                    startx = mat.m_drawx + mat.m_w;
                }
                for (var _i = 0, _a = this.m_tmpmat_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    this.m_mat_list.push(i);
                    i.set_pos(startx, 0);
                    startx += i.m_w;
                }
                this.m_tmpmat_list.length = 0;
            }
        };
        rendermapscrollbk.prototype.clearRes = function () {
            this.removeChildren();
            for (var _i = 0, _a = this.m_mat_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("scrollbkslot", i);
            }
            this.m_mat_list.length = 0;
        };
        rendermapscrollbk.prototype.project = function (context) {
            context.m_render.addrc(this.m_rc);
            return true;
        };
        //从parent里把自己移除?
        rendermapscrollbk.prototype.dispose = function () {
            this.clearRes();
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapscrollbkcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapscrollbk;
    }(core.renderobject));
    core.rendermapscrollbk = rendermapscrollbk;
})(core || (core = {}));
//# sourceMappingURL=rendermapscrollbk.js.map