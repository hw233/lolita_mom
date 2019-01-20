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
    var rendereff = /** @class */ (function (_super) {
        __extends(rendereff, _super);
        function rendereff() {
            var _this = _super.call(this) || this;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_b_loop = true;
            _this.m_b_end = false;
            _this.m_b_autodel = false;
            return _this;
        }
        rendereff.prototype.re_init = function (aniid, x, y, underunit, autodel) {
            if (underunit === void 0) { underunit = true; }
            if (autodel === void 0) { autodel = false; }
            this.set_id();
            this.m_aniid = aniid;
            this.m_rc = utils.getitembycls("effcommand", core.effcommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_data = underunit;
            this.m_mat = null; //only start to load when it is projected 
            this.m_aw = core.matinfo_mgr().geteffw(this.m_aniid);
            this.m_ah = core.matinfo_mgr().geteffh(this.m_aniid);
            this.m_framecount = core.matinfo_mgr().geteffframecount(this.m_aniid);
            this.m_framespeed = core.matinfo_mgr().geteffframespeed(this.m_aniid);
            this.m_b_loop = core.matinfo_mgr().geteffcycle(this.m_aniid);
            this.m_b_autodel = autodel;
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            this.m_box.setTo(this.x - this.m_aw / 2, this.y - this.m_ah / 2, this.m_aw, this.m_ah);
        };
        rendereff.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().geteffmat(this.m_aniid);
                    this.addChild(this.m_mat.m_graphic);
                }
            }
            else {
                //core.core_tiplog("renderani project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        };
        rendereff.prototype.update = function (delta) {
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
        rendereff.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().deleffmat(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("effcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendereff;
    }(core.renderobject));
    core.rendereff = rendereff;
})(core || (core = {}));
//# sourceMappingURL=rendereff.js.map