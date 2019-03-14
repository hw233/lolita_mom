// Author: 阿栋
// Date: 2018/08/22
// Desc: 助战BOSS类入场表现
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
var widget;
(function (widget) {
    var boss_godx_ui = /** @class */ (function (_super) {
        __extends(boss_godx_ui, _super);
        function boss_godx_ui() {
            var _this = _super.call(this, "res/atlas/boss_godx.atlas", ui.game.boss_godx_uiUI) || this;
            _this.left_speed = 90;
            _this.right_speed = 60;
            _this.count = -1;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        boss_godx_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.img_left = this.UIins.img_left;
                this.img_left.x = -720;
                var sub_type = 0;
                if (this.m_ud) {
                    sub_type = this.m_ud['war_subType'];
                }
                if (sub_type == game.WARSUBTYPE_SCENEPASS_HELP) {
                    this.img_right = this.UIins.img_daxia;
                    this.UIins.img_boss.visible = false;
                    this.UIins.img_daxia.visible = true;
                }
                else {
                    this.img_right = this.UIins.img_boss;
                    this.UIins.img_boss.visible = true;
                    this.UIins.img_daxia.visible = false;
                }
                this.img_right.x = 1020;
                this.m_ui.x = 0;
                this.m_ui.y = 500;
                timer.timer_ins().add_timer(16, this, this.on_tick);
            }
            else {
                timer.timer_ins().remove_all_timer(this);
                this.count = -1;
                this.img_left = null;
                this.img_right = null;
                this.UIins = null;
            }
        };
        boss_godx_ui.prototype.on_tick = function () {
            if (this.count < 0) {
                this.img_left.x += this.left_speed;
                this.img_right.x -= this.right_speed;
                if (this.img_left.x >= 0) {
                    this.count = 1;
                }
            }
            else {
                this.count += 1;
                if (this.count > 30) {
                    this.show(false);
                }
            }
        };
        boss_godx_ui.prototype.on_dispose = function () {
        };
        boss_godx_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return boss_godx_ui;
    }(utils.game_widget));
    widget.boss_godx_ui = boss_godx_ui;
})(widget || (widget = {}));
//# sourceMappingURL=boss_godx_ui.js.map