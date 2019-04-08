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
    var renderspcontent = /** @class */ (function (_super) {
        __extends(renderspcontent, _super);
        function renderspcontent() {
            var _this = _super.call(this) || this;
            _this.m_w = 0;
            _this.m_h = 0;
            return _this;
        }
        renderspcontent.prototype.update = function (delta) {
        };
        //从parent里把自己移除?
        renderspcontent.prototype.dispose = function () {
        };
        renderspcontent.prototype.selfremove = function () {
        };
        return renderspcontent;
    }(laya.display.Sprite));
    core.renderspcontent = renderspcontent;
})(core || (core = {}));
//# sourceMappingURL=renderspcontent.js.map