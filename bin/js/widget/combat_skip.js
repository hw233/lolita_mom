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
    // 战斗跳过
    var combat_skip_ui = /** @class */ (function (_super) {
        __extends(combat_skip_ui, _super);
        function combat_skip_ui() {
            var _this = _super.call(this, "res/atlas/combat_round.atlas", ui.game.combat_skipUI) || this;
            // private war_type: number = 0;
            _this.war_subType = 0;
            _this.round = 0;
            _this.skip_show_round = 0;
            _this.b_can_skip = false;
            _this.tips = "";
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_skip_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.x = d_w - 280;
            this.m_ui.y = d_h - 1020;
        };
        combat_skip_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.UIins.btn_skip.on(Laya.Event.CLICK, this, this.on_skip);
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.update_ui);
                this.UIins.btn_skip.visible = false;
                this.update_cfg();
                this.update_ui();
            }
            else {
                this.UIins.btn_skip.off(Laya.Event.CLICK, this, this.on_skip);
                this.unregister_allevent();
                // this.war_type = 0;
                this.war_subType = 0;
                this.UIins = null;
            }
        };
        combat_skip_ui.prototype.update_cfg = function () {
            var combatui = game.get_module(module_enum.MODULE_COMBATUI);
            var info_arr = combatui.get_cur_war_info();
            // this.war_type = info_arr[0];
            this.war_subType = info_arr[1];
            var skip_cfg = config.Combat_skip_cfg.get_Combat_skip_cfg(this.war_subType);
            if (skip_cfg != null) {
                var need_lv = skip_cfg["lv"];
                var need_vip = skip_cfg["vip"];
                this.skip_show_round = skip_cfg["pass_round"];
                this.b_can_skip = (helper.mine().m_lv >= need_lv) || (helper.mine().m_vip >= need_vip);
                if (this.b_can_skip == false) {
                    this.tips = skip_cfg["tips"];
                }
            }
        };
        combat_skip_ui.prototype.update_ui = function (ud) {
            if (ud === void 0) { ud = null; }
            this.round = ud;
            if (this.round >= this.skip_show_round) {
                this.UIins.btn_skip.visible = true;
            }
        };
        combat_skip_ui.prototype.on_skip = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.b_can_skip) {
                this.fire_event_next_frame(game_event.EVENT_COMBATGO2NEXT);
            }
            else {
                helper.show_text_tips(this.tips);
            }
            helper.play_sound("sound/mousedown_btn.wav");
        };
        combat_skip_ui.prototype.on_dispose = function () {
        };
        combat_skip_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_skip_ui;
    }(utils.game_widget));
    widget.combat_skip_ui = combat_skip_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_skip.js.map