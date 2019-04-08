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
    var combat_loading_ui = /** @class */ (function (_super) {
        __extends(combat_loading_ui, _super);
        function combat_loading_ui() {
            var _this = _super.call(this, "res/atlas/loading.atlas", ui.game.combat_loadingUI) || this;
            _this.m_bk_rect = new Laya.Sprite();
            _this.m_uiins = null;
            _this.append_extrares("bigpic/scene_loading.jpg", Laya.Loader.IMAGE);
            _this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            _this.m_bk_rect.graphics.drawRect(0, 0, 2000, 3000, '#000000');
            return _this;
            //this.m_bk_rect.alpha = 0.5;
        }
        combat_loading_ui.prototype.on_init = function () {
            this.m_uiins = this.m_ui;
            var width = helper.get_design_w();
            var height = helper.get_design_h();
            var ratio = width / height;
            var scaleX = width / this.m_uiins.width;
            var scaleY = height / this.m_uiins.height;
            var scale = scaleX > scaleY ? scaleX : scaleY;
            this.m_uiins.m_bk.scale(scale, scale);
            this.m_uiins.width = width;
            this.m_uiins.height = height;
            fontmgr.set_ui_style(this.m_ui, fontmgr.FONTSTYLE_ENUM.FONT_WHTIE);
            fontmgr.set_lable(this.m_uiins.m_info, fontmgr.FONTSTYLE_ENUM.FONT_WHTIE);
        };
        combat_loading_ui.prototype.init_event = function () {
            this.register_event(game_event.EVENT_COMBATLOADINGUI_PROGRESS, this.on_progress_event);
        };
        combat_loading_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                this.init_event();
                this.set_progress(0);
                this.m_ui.addChildAt(this.m_bk_rect, 0);
                this.m_ui.hitArea = new Laya.Rectangle(-100, -100, 2000, 3000);
                var b_first_enter = helper.get_local("first_enter_game");
                if (!b_first_enter) {
                    helper.set_local("first_enter_game", "1");
                    this.m_uiins.img_vip.visible = true;
                }
                else {
                    this.m_uiins.img_vip.visible = false;
                }
            }
            else {
                this.unregister_allevent();
            }
        };
        combat_loading_ui.prototype.set_progress = function (v) {
            var m_progress = this.m_uiins.m_progress1;
            var m_progresslight = this.m_uiins.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width - 70) * m_progress.value + 30;
            this.m_uiins.m_info.text = Math.floor(v * 100).toString() + "%";
        };
        combat_loading_ui.prototype.on_progress_event = function (ud) {
            if (ud === void 0) { ud = null; }
            this.set_progress(ud);
        };
        combat_loading_ui.prototype.on_dispose = function () {
        };
        combat_loading_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_loading_ui;
    }(utils.game_widget));
    widget.combat_loading_ui = combat_loading_ui;
    var game_loading_ui = /** @class */ (function (_super) {
        __extends(game_loading_ui, _super);
        function game_loading_ui() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        game_loading_ui.prototype.init_event = function () {
            this.register_event(game_event.EVENT_GAMELOADINGUI_PROGRESS, this.on_progress_event);
        };
        return game_loading_ui;
    }(combat_loading_ui));
    widget.game_loading_ui = game_loading_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_loading_ui.js.map