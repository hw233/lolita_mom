// Author: bingoo
// Date: 2018/08/23
// Desc: 战斗界面module

module game {
    export class combat_ui_mgr extends utils.game_module {
        private b_in_war: boolean = false;
        private war_type: number = 0;
        private war_subType: number = 0;
        private war_id: number = 0;
        private war_round_max: number = 0;
        private war_skip_roundNum: number = 0;  //当前可以跳过战斗的回合数，暂未启用

        private round_detail_war_subType_arr = new Array<number>();  // 需要显示回合描述的战斗子类型
        private skip_war_subType_arr = new Array<number>();  // 需要显示回合数的战斗子类型
        private b_skip_show: boolean = false;
        private b_RoundDetail_show: boolean = false;
        private b_hpPgBar_show: boolean = false;

        constructor() {
            super();
        }

        public start() {
            super.start();
            this.init_cfg();
            this.register_event(game_event.EVENT_ENTERCOMBAT, this.on_enter_combat);
            this.register_event(game_event.EVENT_COMBATPLAYING, this.on_combat_playing);
            this.register_event(game_event.EVENT_OUTCOMBAT, this.on_out_combat);
            this.register_net_event(protocol_def.S2C_QMBOSS_FIGHT_DAMAGE, this.on_netcmd_commobn_boss_hp);
        }

        private init_cfg(): void {
            let keyStr_arr: Array<string>;
            this.skip_war_subType_arr = [];
            keyStr_arr = Object.keys(config.Combat_skip_cfg.get_cfg_object());
            for (let str of keyStr_arr) {
                this.skip_war_subType_arr.push(parseInt(str));
            }
            keyStr_arr = Object.keys(config.Cli_round_detail_cfg.get_cfg_object());
            this.round_detail_war_subType_arr = [];
            for (let str of keyStr_arr) {
                this.round_detail_war_subType_arr.push(parseInt(str));
            }
        }

        public on_enter_combat(ud: any = null): void {
        }

        public on_combat_playing(ud: any = null): void {
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
        }

        public on_out_combat(ud: any = null): void {
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
        }

        public get_cur_war_info(): Array<number> {
            return [this.war_type, this.war_subType, this.war_id, this.war_round_max];
        }


        // 设置回合界面
        private _show_combat_round(b_show: boolean): void {
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
        }

        // 设置回合描述
        private _show_combat_detail(b_show: boolean): void {
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
        }

        // 设置跳过按钮
        private _show_skip(b_show: boolean): void {
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
        }

        public on_netcmd_commobn_boss_hp(ud: any = null): void {
            let war_id: number = ud["warid"];
            let my_rank: number = ud["myrank"];
            let my_dmg: number = ud["mystartdmg"];
            let start_hp: number = ud["starthp"];
            let total_hp: number = ud["hpmax"];
            let info_arr: Array<any> = ud["damagelist"];
            let rank_arr = new Array<any>();
            for (let info of info_arr) {
                rank_arr.push([info["id"], info["name"], info["damage"]]);
            }
            let data_ins = { "myrank": my_rank, "my_dmg": my_dmg, "start_hp": start_hp, "total_hp": total_hp, "rank_arr": rank_arr };
            helper.set_transfer_data("common_boss_hp_data", data_ins);
            this._show_boss_HpPgBar(true);
        }

        // 显示boss血量
        private _show_boss_HpPgBar(b_show: boolean): void {
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
        }

        public dispose() {
            super.dispose();
        }
    }
}