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
    var avataractiondirmaterial = /** @class */ (function (_super) {
        __extends(avataractiondirmaterial, _super);
        function avataractiondirmaterial() {
            var _this = _super.call(this) || this;
            _this.m_ready = false;
            _this.m_dir = 0;
            _this.m_graphic = new laya.display.Animation();
            return _this;
        }
        avataractiondirmaterial.prototype.re_init = function () {
            this.m_graphic.clear();
            this.m_ready = false;
        };
        avataractiondirmaterial.prototype.get_rect = function () {
            var ret = null;
            if (this.m_ready) {
                ret = this.m_graphic.getGraphicBounds(true);
            }
            return ret;
        };
        avataractiondirmaterial.prototype.ani_index_pad = function (index, pad_num) {
            var ret = index.toString();
            var count = ret.length;
            while (count < pad_num) {
                ret = "0" + ret;
                count++;
            }
            return ret;
        };
        avataractiondirmaterial.prototype.aniUrls = function (aniName, pre, pad_num, length) {
            var urls = [];
            for (var i = 0; i < length; i++) {
                //动画资源路径要和动画图集打包前的资源命名对应起来
                urls.push(aniName + pre + this.ani_index_pad(i, pad_num) + ".png");
            }
            return urls;
        };
        avataractiondirmaterial.prototype.loadres = function (anipre, pre, pad_num, length) {
            this.m_graphic.loadImages(this.aniUrls(anipre, pre, pad_num, length));
            this.m_ready = true;
            this.m_graphic.play();
            this.m_graphic.gotoAndStop(0);
        };
        avataractiondirmaterial.prototype.goto_frame = function (frame) {
            if (this.m_ready) {
                //core.core_tiplog("avataractiondirmaterial goto_frame ",frame);
                this.m_graphic.gotoAndStop(frame);
                //this.m_graphic.graphics.clear();
                //this.m_graphic.graphics.drawRect(0,0,6,6,"#ffffff");
            }
        };
        avataractiondirmaterial.prototype.clear = function () {
            this.m_graphic.clear();
            this.m_ready = false;
        };
        avataractiondirmaterial.prototype.dispose = function () {
            this.m_graphic.clear();
            this.m_graphic = null;
        };
        avataractiondirmaterial.prototype.update = function (delta) {
        };
        return avataractiondirmaterial;
    }(core.material));
    core.avataractiondirmaterial = avataractiondirmaterial;
})(core || (core = {}));
//# sourceMappingURL=avataractiondirmaterial.js.map