// Author: bingoo
// Date: 2018/07/04
// Desc: 战斗回合数和回合描述
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
    // 回合数
    var combat_round_ui = /** @class */ (function (_super) {
        __extends(combat_round_ui, _super);
        function combat_round_ui() {
            var _this = _super.call(this, "res/atlas/combat_round.atlas", ui.game.combat_round_uiUI) || this;
            _this.round = 1;
            _this.round_max = 0;
            _this.b_con_show = false;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_round_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.x = (d_w - 330) / 2;
            this.m_ui.y = 375 + helper.TOPBAR_HEIGHT;
        };
        combat_round_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.update_ui);
                var combatui = game.get_module(module_enum.MODULE_COMBATUI);
                var info_arr = combatui.get_cur_war_info();
                this.round_max = info_arr[3];
                this.show_con(false);
            }
            else {
                this.unregister_event(game_event.EVENT_COMBATTURNSCHANGE);
                this.UIins = null;
            }
        };
        combat_round_ui.prototype.update_ui = function (ud) {
            if (ud === void 0) { ud = null; }
            this.round = ud;
            if (this.round > 0 && this.round_max > 0) {
                if (this.round > 99) {
                    this.round = 99;
                }
                if (this.round_max > 99) {
                    this.round_max = 99;
                }
                if (!this.b_con_show) {
                    this.show_con(true);
                }
                // 当前回合
                var img_num = void 0;
                img_num = this.get_con("img_cur0");
                if (this.round >= 10) {
                    img_num.skin = "combat_round/" + Math.floor(this.round / 10).toString() + ".png";
                    img_num.visible = true;
                }
                else {
                    img_num.visible = false;
                }
                img_num = this.get_con("img_cur1");
                img_num.skin = "combat_round/" + Math.floor(this.round % 10).toString() + ".png";
                // 总回合
                if (this.round_max >= 10) {
                    img_num = this.get_con("img_ttl0");
                    img_num.skin = "combat_round/" + Math.floor(this.round_max / 10).toString() + ".png";
                    img_num.visible = true;
                    img_num = this.get_con("img_ttl1");
                    img_num.skin = "combat_round/" + Math.floor(this.round_max % 10).toString() + ".png";
                }
                else {
                    img_num = this.get_con("img_ttl0");
                    img_num.skin = "combat_round/" + Math.floor(this.round_max % 10).toString() + ".png";
                    img_num = this.get_con("img_ttl1");
                    img_num.visible = false;
                }
            }
        };
        combat_round_ui.prototype.show_con = function (flag) {
            this.b_con_show = flag;
            this.UIins.img_bk.visible = flag;
            this.UIins.img_cur0.visible = flag;
            this.UIins.img_cur1.visible = flag;
            this.UIins.img_line.visible = flag;
            this.UIins.img_ttl0.visible = flag;
            this.UIins.img_ttl1.visible = flag;
        };
        combat_round_ui.prototype.on_dispose = function () {
        };
        combat_round_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_round_ui;
    }(utils.game_widget));
    widget.combat_round_ui = combat_round_ui;
    // 回合描述
    var combat_roundDetail_ui = /** @class */ (function (_super) {
        __extends(combat_roundDetail_ui, _super);
        function combat_roundDetail_ui() {
            var _this = _super.call(this, "res/atlas/combat_roundDetail.atlas", ui.game.combat_roundDetail_uiUI) || this;
            _this.show_type = 0; //1:简单文本描述，2：进度读条
            _this.war_type = 0;
            _this.war_subType = 0;
            // private war_id:number = 0;
            _this.round = 1;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_roundDetail_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
        };
        combat_roundDetail_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.on_round_changed);
                var combatui = game.get_module(module_enum.MODULE_COMBATUI);
                var info_arr = combatui.get_cur_war_info();
                this.war_type = info_arr[0];
                this.war_subType = info_arr[1];
                // this.war_id = info_arr[2];
                this.init_ui();
            }
            else {
                this.unregister_event(game_event.EVENT_COMBATTURNSCHANGE);
                this.show_type = 0;
                this.war_type = 0;
                this.war_subType = 0;
                this.round = 0;
                this.UIins = null;
            }
        };
        combat_roundDetail_ui.prototype.init_ui = function () {
            var cfg = config.Cli_round_detail_cfg.get_Cli_round_detail_cfg(this.war_subType);
            if (cfg) {
                this.show_type = cfg["descType"];
                if (this.show_type == 1) {
                    this.UIins.sp1_title.text = cfg["title"];
                    this.UIins.sp1_lab_content.text = cfg["desc"];
                    var designwh = helper.get_design_wh();
                    var d_w = designwh['w'];
                    // let d_h: number = designwh['h'];
                    this.m_ui.x = d_w - 516;
                    this.m_ui.y = 100 + helper.TOPBAR_HEIGHT;
                    this.UIins.sp_1.visible = true;
                    this.UIins.sp_2.visible = false;
                }
                else if (this.show_type == 2) {
                    this.UIins.sp2_title.text = cfg["title"];
                    this.UIins.sp2_lab_content.text = cfg["desc"];
                    this.UIins.sp2_pgbar.value = 1;
                    var designwh = helper.get_design_wh();
                    var d_w = designwh['w'];
                    // let d_h: number = designwh['h'];
                    this.m_ui.x = d_w - 516;
                    this.m_ui.y = 100 + helper.TOPBAR_HEIGHT;
                    this.UIins.sp_1.visible = false;
                    this.UIins.sp_2.visible = true;
                }
                else {
                    this.UIins.sp_1.visible = false;
                    this.UIins.sp_2.visible = false;
                }
            }
        };
        combat_roundDetail_ui.prototype.update_round = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.show_type == 2) {
                var value = (10 - this.round) / 10;
                if (value < 0)
                    value = 0;
                this.UIins.sp2_pgbar.value = value;
            }
        };
        combat_roundDetail_ui.prototype.on_round_changed = function (ud) {
            if (ud === void 0) { ud = null; }
            this.round = ud;
            if (this.round > 0) {
                this.update_round();
            }
        };
        combat_roundDetail_ui.prototype.on_dispose = function () {
        };
        combat_roundDetail_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_roundDetail_ui;
    }(utils.game_widget));
    widget.combat_roundDetail_ui = combat_roundDetail_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_round.js.map