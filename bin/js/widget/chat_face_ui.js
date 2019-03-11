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
// Author: 雨晨
// Date: 2018/
// Desc: 表情
var widget;
(function (widget) {
    var chat_face = /** @class */ (function (_super) {
        __extends(chat_face, _super);
        function chat_face() {
            var _this = _super.call(this, "res/atlas/emotion.atlas", ui.game.chat_faceUI) || this;
            _this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            return _this;
        }
        chat_face.prototype.on_init = function () {
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.x = (d_w - this.m_ui.width) / 2;
            this.m_ui.y = d_h - this.m_ui.height - 354;
        };
        chat_face.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.faceArray = [];
                // //往数组中添加表情图片
                for (var i = 0; i < 35; i++) {
                    this.faceArray.push({ url: "emotion/face" + i + ".png" });
                }
                this.UIins.faceList.vScrollBarSkin = "";
                this.UIins.faceList.array = this.faceArray;
                this.UIins.faceList.renderHandler = new Laya.Handler(this, this.onRender);
                this.UIins.faceList.mouseEnabled = true;
                this.UIins.faceList.mouseHandler = new Laya.Handler(this, this.on_click);
            }
            else {
                this.faceArray = [];
                this.UIins.faceList.array = [];
                this.UIins = null;
            }
        };
        chat_face.prototype.on_click = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var e_str = "#" + index.toString();
                this.fire_event_next_frame(game_event.EVENT_SELECT_EMOTION, e_str);
            }
        };
        chat_face.prototype.onRender = function (item, index) {
            var img = item.getChildByName("face");
            img.skin = this.faceArray[index].url;
        };
        chat_face.prototype.update_ui = function () {
        };
        chat_face.prototype.on_dispose = function () {
        };
        chat_face.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_face;
    }(utils.game_widget));
    widget.chat_face = chat_face;
})(widget || (widget = {}));
//# sourceMappingURL=chat_face_ui.js.map