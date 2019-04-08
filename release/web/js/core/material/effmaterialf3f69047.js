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
    var effmaterial = /** @class */ (function (_super) {
        __extends(effmaterial, _super);
        function effmaterial() {
            var _this = _super.call(this) || this;
            _this.m_ani_path = null;
            _this.m_res_path = null;
            _this.m_ani_id = 0;
            _this.m_ready = false;
            _this.m_graphic = new laya.display.Animation();
            return _this;
        }
        effmaterial.prototype.re_init = function () {
            this.m_mat_res = "";
        };
        effmaterial.prototype.load_res = function () {
            this.loadres(core.matinfo_mgr().geteffname(this.m_ani_id), core.matinfo_mgr().geteffcycle(this.m_ani_id));
        };
        effmaterial.prototype.loadres = function (name, cycle) {
            if (this.m_graphic == null) {
                return;
            }
            this.m_graphic.loadAnimation(this.m_ani_path);
            this.m_ready = true;
            this.m_graphic.play(0, cycle, name);
            this.m_graphic.gotoAndStop(0);
        };
        effmaterial.prototype.goto_frame = function (frame) {
            if (this.m_ready) {
                //core.core_tiplog("animaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
            }
        };
        effmaterial.prototype.clear = function () {
            if (this.m_graphic) {
                this.m_graphic.clear();
            }
            this.m_ready = false;
        };
        effmaterial.prototype.dispose = function () {
            if (this.m_graphic) {
                this.m_graphic.clear();
                this.m_graphic = null;
            }
            this.m_ready = false;
        };
        effmaterial.prototype.update = function (delta) {
        };
        return effmaterial;
    }(core.material));
    core.effmaterial = effmaterial;
})(core || (core = {}));
//# sourceMappingURL=effmaterial.js.map