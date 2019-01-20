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
    var rendermapbk = /** @class */ (function (_super) {
        __extends(rendermapbk, _super);
        function rendermapbk() {
            var _this = _super.call(this) || this;
            _this.re_init();
            return _this;
        }
        rendermapbk.prototype.re_init = function () {
            this.m_mat = null;
            this.m_rc = utils.getitembycls("mapbkcommand", core.mapbkcommand);
            this.m_rc.re_init(this);
        };
        rendermapbk.prototype.setres = function (res) {
            if (this.m_mat != null) {
                core.mat_mgr().delmapbkres(this.m_mat);
            }
            this.m_mat = core.mat_mgr().getmapbkres(res);
            this.removeChildren();
            this.addChild(this.m_mat.m_graphic);
        };
        rendermapbk.prototype.setsp = function (sp) {
            this.addChild(sp);
        };
        rendermapbk.prototype.clearsp = function () {
            this.removeChildren();
        };
        rendermapbk.prototype.project = function (context) {
            context.m_render.addrc(this.m_rc);
            return true;
        };
        //从parent里把自己移除?
        rendermapbk.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_mat != null) {
                core.mat_mgr().delmapbkres(this.m_mat);
                this.m_mat = null;
            }
            if (this.m_rc != null) {
                this.m_rc.dispose();
                utils.recover("mapbkcommand", this.m_rc);
                this.m_rc = null;
            }
            _super.prototype.dispose.call(this);
        };
        return rendermapbk;
    }(core.renderobject));
    core.rendermapbk = rendermapbk;
})(core || (core = {}));
//# sourceMappingURL=rendermapbk.js.map