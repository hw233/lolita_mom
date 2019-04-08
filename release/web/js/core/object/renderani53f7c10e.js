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
    var renderani = /** @class */ (function (_super) {
        __extends(renderani, _super);
        function renderani() {
            var _this = _super.call(this) || this;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_framecurrenttm = 0;
            return _this;
        }
        renderani.prototype.re_init = function (aniid, x, y, underunit) {
            if (underunit === void 0) { underunit = true; }
            this.set_id();
            this.m_aniid = aniid;
            this.m_rc = utils.getitembycls("anicommand", core.anicommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_data = underunit;
            this.m_mat = null; //only start to load when it is projected 
            this.m_aw = core.matinfo_mgr().getaniw(this.m_aniid);
            this.m_ah = core.matinfo_mgr().getanih(this.m_aniid);
            this.m_framecount = core.matinfo_mgr().getaniframecount(this.m_aniid);
            this.m_framespeed = core.matinfo_mgr().getaniframespeed(this.m_aniid);
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_box.setTo(this.x - this.m_aw / 2, this.y - this.m_ah / 2, this.m_aw, this.m_ah);
        };
        renderani.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("renderani project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().getanimat(this.m_aniid);
                    this.addChild(this.m_mat.m_graphic);
                }
            }
            else {
                //core.core_tiplog("renderani project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        };
        renderani.prototype.update = function (delta) {
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_mat != null) {
                this.m_mat.goto_frame(this.m_framecurrent);
            }
        };
        //从parent里把自己移除?
        renderani.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().delanimat(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("anicommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return renderani;
    }(core.renderobject));
    core.renderani = renderani;
})(core || (core = {}));
//# sourceMappingURL=renderani.js.map