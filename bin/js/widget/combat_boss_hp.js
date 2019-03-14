// Author: bingoo
// Date: 2018/08/23
// Desc: 战斗中boss血量与伤害排行widget
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
    var combat_boss_hp_ui = /** @class */ (function (_super) {
        __extends(combat_boss_hp_ui, _super);
        function combat_boss_hp_ui() {
            var _this = _super.call(this, "res/atlas/boss_hp.atlas", ui.game.combat_boss_hpUI) || this;
            _this.start_hp = 0;
            _this.total_hp = 0;
            _this.my_dmg = 0;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_boss_hp_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
            var designwh = helper.get_design_wh();
            var d_h = designwh['h'];
            this.m_ui.x = 0;
            this.m_ui.y = d_h - 1330;
        };
        combat_boss_hp_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_COMBATPLAYERATTACK, this.update_damage);
                this.update_ui();
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        combat_boss_hp_ui.prototype.update_ui = function () {
            var data_ins = helper.get_transfer_data("common_boss_hp_data");
            helper.remove_transfer_data("common_boss_hp_data");
            if (data_ins != null) {
                this.my_dmg = data_ins["my_dmg"];
                this.start_hp = data_ins["start_hp"];
                this.total_hp = data_ins["total_hp"];
                var my_rank = data_ins["myrank"];
                if (my_rank < 0) {
                    this.UIins.lab_myrank.text = "";
                }
                else {
                    my_rank += 1; // 服务器发的我的排名是从0开始
                    this.UIins.lab_myrank.text = my_rank.toString();
                }
                this.UIins.lab_myname.text = helper.mine().m_name;
                this.UIins.lab_mydmg.text = this.my_dmg.toString();
                this.UIins.pgbar.value = this.start_hp / this.total_hp;
                this.UIins.lab_hp.text = this.start_hp.toString() + "/" + this.total_hp.toString();
                this.set_rank(data_ins["rank_arr"]);
            }
        };
        combat_boss_hp_ui.prototype.set_rank = function (rank_arr) {
            for (var i = 0; i < 5; i++) {
                var lab_rank = this.get_con("lab_r" + i.toString());
                var lab_name = this.get_con("lab_name" + i.toString());
                var lab_dmg = this.get_con("lab_d" + i.toString());
                if (i < rank_arr.length) {
                    var rank_info = rank_arr[i];
                    lab_rank.text = (i + 1).toString();
                    lab_name.text = rank_info[1];
                    lab_dmg.text = rank_info[2].toString();
                    lab_rank.visible = lab_name.visible = lab_dmg.visible = true;
                }
                else {
                    lab_rank.visible = lab_name.visible = lab_dmg.visible = false;
                }
            }
        };
        combat_boss_hp_ui.prototype.update_damage = function (atk_status) {
            if (atk_status === void 0) { atk_status = null; }
            if (atk_status != null && atk_status.id == base.WARPOS_LEFTLEADER) {
                var damage = atk_status.damage;
                this.my_dmg += damage;
                this.UIins.lab_mydmg.text = this.my_dmg.toString();
                this.start_hp -= damage;
                if (this.start_hp < 0) {
                    this.start_hp = 0;
                }
                this.UIins.pgbar.value = this.start_hp / this.total_hp;
                this.UIins.lab_hp.text = this.start_hp.toString() + "/" + this.total_hp.toString();
            }
        };
        combat_boss_hp_ui.prototype.on_dispose = function () {
        };
        combat_boss_hp_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_boss_hp_ui;
    }(utils.game_widget));
    widget.combat_boss_hp_ui = combat_boss_hp_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_boss_hp.js.map