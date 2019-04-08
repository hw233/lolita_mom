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
    var rendermapslot = /** @class */ (function (_super) {
        __extends(rendermapslot, _super);
        function rendermapslot() {
            return _super.call(this) || this;
        }
        rendermapslot.prototype.re_init = function (mapid, x, y, colnum, rownum) {
            this.set_id();
            this.m_mapid = mapid;
            this.m_rc = utils.getitembycls("mapslotcommand", core.mapslotcommand);
            this.m_rc.re_init(this);
            _super.prototype.set_pos.call(this, x, y);
            this.m_colnum = colnum;
            this.m_rownum = rownum;
            this.m_mat = null; //only start to load when it is projected 
            this.m_box.setTo(this.x, this.y, core.matinfo_mgr().m_map_grid_w, core.matinfo_mgr().m_map_grid_h);
        };
        rendermapslot.prototype.project = function (context) {
            var ret = _super.prototype.project.call(this, context);
            //core.core_tiplog("rendermapslot project:",this.x,this.y,this.m_colnum,this.m_rownum,this.m_box.x,this.m_box.y,this.m_box.width,this.m_box.height);
            if (ret) {
                //core.core_tiplog("rendermapslot project succeed ",this.x,this.y,this.m_box);
                if (this.m_mat == null) {
                    this.m_mat = core.mat_mgr().getmapslot(this.m_mapid, this.m_rownum, this.m_colnum);
                }
                this.addChild(this.m_mat.m_graphic);
            }
            else {
                //core.core_tiplog("rendermapslot project failed ",this.x,this.y,this.m_box);
            }
            return ret;
        };
        //从parent里把自己移除?
        rendermapslot.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapslotcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapslot;
    }(core.renderobject));
    core.rendermapslot = rendermapslot;
})(core || (core = {}));
//# sourceMappingURL=rendermapslot.js.map