// Author: bingoo
// Date: 2018/08/23
// Desc: 战斗界面module
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
var game;
(function (game) {
    var combat_ui_mgr = /** @class */ (function (_super) {
        __extends(combat_ui_mgr, _super);
        function combat_ui_mgr() {
            var _this = _super.call(this) || this;
            _this.b_in_war = false;
            _this.war_type = 0;
            _this.war_subType = 0;
            _this.war_id = 0;
            _this.war_round_max = 0;
            _this.war_skip_roundNum = 0; //当前可以跳过战斗的回合数，暂未启用
            _this.round_detail_war_subType_arr = new Array(); // 需要显示回合描述的战斗子类型
            _this.skip_war_subType_arr = new Array(); // 需要显示回合数的战斗子类型
            _this.b_skip_show = false;
            _this.b_RoundDetail_show = false;
            _this.b_hpPgBar_show = false;
            return _this;
        }
        combat_ui_mgr.prototype.start = function () {
            _super.prototype.start.call(this);
            this.init_cfg();
            this.register_event(game_event.EVENT_ENTERCOMBAT, this.on_enter_combat);
            this.register_event(game_event.EVENT_COMBATPLAYING, this.on_combat_playing);
            this.register_event(game_event.EVENT_OUTCOMBAT, this.on_out_combat);
            this.register_net_event(protocol_def.S2C_QMBOSS_FIGHT_DAMAGE, this.on_netcmd_commobn_boss_hp);
        };
        combat_ui_mgr.prototype.init_cfg = function () {
            var keyStr_arr;
            this.skip_war_subType_arr = [];
            keyStr_arr = Object.keys(config.Combat_skip_cfg.get_cfg_object());
            for (var _i = 0, keyStr_arr_1 = keyStr_arr; _i < keyStr_arr_1.length; _i++) {
                var str = keyStr_arr_1[_i];
                this.skip_war_subType_arr.push(parseInt(str));
            }
            keyStr_arr = Object.keys(config.Cli_round_detail_cfg.get_cfg_object());
            this.round_detail_war_subType_arr = [];
            for (var _a = 0, keyStr_arr_2 = keyStr_arr; _a < keyStr_arr_2.length; _a++) {
                var str = keyStr_arr_2[_a];
                this.round_detail_war_subType_arr.push(parseInt(str));
            }
        };
        combat_ui_mgr.prototype.on_enter_combat = function (ud) {
            if (ud === void 0) { ud = null; }
        };
        combat_ui_mgr.prototype.on_combat_playing = function (ud) {
            if (ud === void 0) { ud = null; }
            this.b_in_war = true;
            this.war_type = ud[0];
            this.war_subType = ud[1];
            this.war_id = ud[2];
            this.war_round_max = ud[3];
            this.war_skip_roundNum = ud[4];
            if (this.war_type != game.WARTYPE_GUAJI) {
                this._show_combat_round(true);
                if (this.skip_war_subType_arr.indexOf(this.war_subType) >= 0) {
                    this._show_skip(true);
                }
                if (this.round_detail_war_subType_arr.indexOf(this.war_subType) >= 0) {
                    this._show_combat_detail(true);
                }
                if (this.war_type == game.WARTYPE_NORMAL || this.war_type == game.WARTYPE_BOSS) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_BOSS_GODX, true, { "war_subType": this.war_subType });
                }
            }
        };
        combat_ui_mgr.prototype.on_out_combat = function (ud) {
            if (ud === void 0) { ud = null; }
            this.b_in_war = false;
            this.war_type = ud[0];
            this.war_subType = ud[1];
            this.war_id = ud[2];
            if (this.war_type != game.WARTYPE_GUAJI) {
                this._show_combat_round(false);
                if (this.b_skip_show) {
                    this._show_skip(false);
                }
                if (this.b_RoundDetail_show) {
                    this._show_combat_detail(false);
                }
                if (this.b_hpPgBar_show) {
                    this._show_boss_HpPgBar(false);
                }
            }
        };
        combat_ui_mgr.prototype.get_cur_war_info = function () {
            return [this.war_type, this.war_subType, this.war_id, this.war_round_max];
        };
        // 设置回合界面
        combat_ui_mgr.prototype._show_combat_round = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUND) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUND, true);
                }
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUND) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUND, false);
                }
            }
        };
        // 设置回合描述
        combat_ui_mgr.prototype._show_combat_detail = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUNDDETAIL) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUNDDETAIL, true);
                }
                this.b_RoundDetail_show = true;
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_ROUNDDETAIL) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_ROUNDDETAIL, false);
                }
                this.b_RoundDetail_show = false;
            }
        };
        // 设置跳过按钮
        combat_ui_mgr.prototype._show_skip = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_SKIP) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_SKIP, true);
                }
                this.b_skip_show = true;
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_SKIP) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_SKIP, false);
                }
                this.b_skip_show = false;
            }
        };
        combat_ui_mgr.prototype.on_netcmd_commobn_boss_hp = function (ud) {
            if (ud === void 0) { ud = null; }
            var war_id = ud["warid"];
            var my_rank = ud["myrank"];
            var my_dmg = ud["mystartdmg"];
            var start_hp = ud["starthp"];
            var total_hp = ud["hpmax"];
            var info_arr = ud["damagelist"];
            var rank_arr = new Array();
            for (var _i = 0, info_arr_1 = info_arr; _i < info_arr_1.length; _i++) {
                var info = info_arr_1[_i];
                rank_arr.push([info["id"], info["name"], info["damage"]]);
            }
            var data_ins = { "myrank": my_rank, "my_dmg": my_dmg, "start_hp": start_hp, "total_hp": total_hp, "rank_arr": rank_arr };
            helper.set_transfer_data("common_boss_hp_data", data_ins);
            this._show_boss_HpPgBar(true);
        };
        // 显示boss血量
        combat_ui_mgr.prototype._show_boss_HpPgBar = function (b_show) {
            if (b_show) {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_BOSS_HP) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_BOSS_HP, true);
                    this.b_hpPgBar_show = true;
                }
            }
            else {
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_COMBAT_BOSS_HP) == true) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_COMBAT_BOSS_HP, false);
                    this.b_hpPgBar_show = false;
                }
            }
        };
        combat_ui_mgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_ui_mgr;
    }(utils.game_module));
    game.combat_ui_mgr = combat_ui_mgr;
})(game || (game = {}));
//# sourceMappingURL=combat_ui_mgr.js.map