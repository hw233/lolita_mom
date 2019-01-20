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
    var rendermapblock = /** @class */ (function (_super) {
        __extends(rendermapblock, _super);
        function rendermapblock() {
            var _this = _super.call(this) || this;
            _this.re_init();
            return _this;
        }
        rendermapblock.prototype.re_init = function () {
            this.m_mat = utils.getitembycls("mapblock", core.mapblock);
            this.m_mat.re_init();
            this.addChild(this.m_mat.m_graphic);
            this.m_rc = utils.getitembycls("mapblockcommand", core.mapblockcommand);
            this.m_rc.re_init(this);
        };
        rendermapblock.prototype.setmapid = function (mapid) {
            core.mat_mgr().getmapblock(this.m_mat, mapid);
        };
        rendermapblock.prototype.project = function (context) {
            if (this.m_mat != null && this.m_mat.m_init_sp == false) {
                this.m_mat.get_block_sp();
            }
            context.m_render.addrc(this.m_rc);
            return true;
        };
        //从parent里把自己移除?
        rendermapblock.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                this.m_mat.dispose();
                utils.recover("mapblock", this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapblockcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapblock;
    }(core.renderobject));
    core.rendermapblock = rendermapblock;
})(core || (core = {}));
//# sourceMappingURL=rendermapblock.js.map