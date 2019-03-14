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
var base;
(function (base) {
    var ExtButton = /** @class */ (function (_super) {
        __extends(ExtButton, _super);
        function ExtButton() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.CLICK, _this, _this.on_click);
            return _this;
        }
        ExtButton.prototype.on_click = function (ud) {
            if (ud === void 0) { ud = null; }
            utils.event_ins().fire_event_next_frame(game_event.EVENT_BUTTON_CLICK);
        };
        return ExtButton;
    }(Laya.Button));
    base.ExtButton = ExtButton;
})(base || (base = {}));
//# sourceMappingURL=ExtButton.js.map