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
    var animaterial = /** @class */ (function (_super) {
        __extends(animaterial, _super);
        function animaterial() {
            var _this = _super.call(this) || this;
            _this.m_res_path = null;
            _this.m_ani_id = 0;
            _this.m_ready = false;
            _this.m_graphic = new laya.display.Animation();
            return _this;
        }
        animaterial.prototype.re_init = function () {
            this.m_mat_res = "";
        };
        animaterial.prototype.ani_index_pad = function (index, pad_num) {
            var ret = index.toString();
            var count = ret.length;
            while (count < pad_num) {
                ret = "0" + ret;
                count++;
            }
            return ret;
        };
        animaterial.prototype.aniUrls = function (aniName, pre, pad_num, length) {
            var urls = [];
            for (var i = 0; i < length; i++) {
                //动画资源路径要和动画图集打包前的资源命名对应起来
                urls.push(aniName + pre + this.ani_index_pad(i, pad_num) + ".png");
            }
            return urls;
        };
        animaterial.prototype.load_res = function () {
            this.loadres(core.matinfo_mgr().getanitexprefix(this.m_ani_id), "0", 4, core.matinfo_mgr().getaniframecount(this.m_ani_id));
        };
        animaterial.prototype.loadres = function (anipre, pre, pad_num, length) {
            this.m_graphic.loadImages(this.aniUrls(anipre, pre, pad_num, length));
            this.m_ready = true;
            this.m_graphic.play();
            this.m_graphic.gotoAndStop(0);
        };
        animaterial.prototype.goto_frame = function (frame) {
            if (this.m_ready) {
                //core.core_tiplog("animaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
            }
        };
        animaterial.prototype.clear = function () {
            this.m_graphic.clear();
            this.m_ready = false;
        };
        animaterial.prototype.dispose = function () {
            this.m_graphic.clear();
            this.m_graphic = null;
        };
        animaterial.prototype.update = function (delta) {
        };
        return animaterial;
    }(core.material));
    core.animaterial = animaterial;
})(core || (core = {}));
//# sourceMappingURL=animaterial.js.map