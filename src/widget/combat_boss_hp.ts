// Author: bingoo
// Date: 2018/08/23
// Desc: 战斗中boss血量与伤害排行widget

module widget {
    export class combat_boss_hp_ui extends utils.game_widget {
        private start_hp: number = 0;
        private total_hp: number = 0;
        private my_dmg: number = 0;
        private UIins: ui.game.combat_boss_hpUI = null;

        constructor() {
            super("res/atlas/boss_hp.atlas", ui.game.combat_boss_hpUI);
            this.m_layer = utils.WIDGET_LAYER.SCENE;
        }

        public on_init(): void {
            fontmgr.set_ui_font(this.m_ui);
            let designwh: Object = helper.get_design_wh();
            let d_h: number = designwh['h'];
            this.m_ui.x = 0;
            this.m_ui.y = d_h - 1330;
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.combat_boss_hpUI;
                this.register_event(game_event.EVENT_COMBATPLAYERATTACK, this.update_damage);
                this.update_ui();
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        }

        private update_ui(): void {
            let data_ins = helper.get_transfer_data("common_boss_hp_data");
            helper.remove_transfer_data("common_boss_hp_data");
            if (data_ins != null) {
                this.my_dmg = data_ins["my_dmg"];
                this.start_hp = data_ins["start_hp"];
                this.total_hp = data_ins["total_hp"];
                let my_rank = data_ins["myrank"];
                if (my_rank < 0) {
                    this.UIins.lab_myrank.text = "";
                }
                else {
                    my_rank += 1;  // 服务器发的我的排名是从0开始
                    this.UIins.lab_myrank.text = my_rank.toString();
                }
                this.UIins.lab_myname.text = helper.mine().m_name;
                this.UIins.lab_mydmg.text = this.my_dmg.toString();
                this.UIins.pgbar.value = this.start_hp / this.total_hp;
                this.UIins.lab_hp.text = this.start_hp.toString() + "/" + this.total_hp.toString();
                this.set_rank(data_ins["rank_arr"])
            }
        }

        private set_rank(rank_arr: Array<any>): void {
            for (let i = 0; i < 5; i++) {
                let lab_rank: Laya.Label = this.get_con("lab_r" + i.toString());
                let lab_name: Laya.Label = this.get_con("lab_name" + i.toString());
                let lab_dmg: Laya.Label = this.get_con("lab_d" + i.toString());
                if (i < rank_arr.length) {
                    let rank_info = rank_arr[i];
                    lab_rank.text = (i + 1).toString();
                    lab_name.text = rank_info[1];
                    lab_dmg.text = rank_info[2].toString();
                    lab_rank.visible = lab_name.visible = lab_dmg.visible = true;
                }
                else {
                    lab_rank.visible = lab_name.visible = lab_dmg.visible = false;
                }
            }
        }

        public update_damage(atk_status: combat.atk_status = null): void {
            if (atk_status != null && atk_status.id == base.WARPOS_LEFTLEADER) {
                let damage = atk_status.damage;
                this.my_dmg += damage;
                this.UIins.lab_mydmg.text = this.my_dmg.toString();
                this.start_hp -= damage;
                if (this.start_hp < 0) {
                    this.start_hp = 0;
                }
                this.UIins.pgbar.value = this.start_hp / this.total_hp;
                this.UIins.lab_hp.text = this.start_hp.toString() + "/" + this.total_hp.toString();
            }
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}