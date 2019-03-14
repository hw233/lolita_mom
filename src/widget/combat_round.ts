// Author: bingoo
// Date: 2018/07/04
// Desc: 战斗回合数和回合描述

module widget {
    // 回合数
    export class combat_round_ui extends utils.game_widget {
        private round: number = 1;
        private round_max: number = 0;
        private b_con_show: boolean = false;
        private UIins: ui.game.combat_round_uiUI = null;

        constructor() {
            super("res/atlas/combat_round.atlas", ui.game.combat_round_uiUI);
            this.m_layer = utils.WIDGET_LAYER.SCENE;
        }

        public on_init(): void {
            fontmgr.set_ui_font(this.m_ui);
            let designwh: Object = helper.get_design_wh();
            let d_w: number = designwh['w'];
            let d_h: number = designwh['h'];
            this.m_ui.x = (d_w - 330) / 2;
            this.m_ui.y = 375 + helper.TOPBAR_HEIGHT;
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.combat_round_uiUI;
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.update_ui);
                let combatui = game.get_module(module_enum.MODULE_COMBATUI) as game.combat_ui_mgr;
                let info_arr = combatui.get_cur_war_info();
                this.round_max = info_arr[3];
                this.show_con(false);
            }
            else {
                this.unregister_event(game_event.EVENT_COMBATTURNSCHANGE);
                this.UIins = null;
            }
        }

        public update_ui(ud: any = null): void {
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
                let img_num: Laya.Image;
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
        }

        private show_con(flag: boolean): void {
            this.b_con_show = flag;
            this.UIins.img_bk.visible = flag;
            this.UIins.img_cur0.visible = flag;
            this.UIins.img_cur1.visible = flag;
            this.UIins.img_line.visible = flag;
            this.UIins.img_ttl0.visible = flag;
            this.UIins.img_ttl1.visible = flag;
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }

    // 回合描述
    export class combat_roundDetail_ui extends utils.game_widget {
        private show_type: number = 0;  //1:简单文本描述，2：进度读条
        private war_type: number = 0;
        private war_subType: number = 0;
        // private war_id:number = 0;
        private round: number = 1;
        private UIins: ui.game.combat_roundDetail_uiUI = null;

        constructor() {
            super("res/atlas/combat_roundDetail.atlas", ui.game.combat_roundDetail_uiUI);
            this.m_layer = utils.WIDGET_LAYER.SCENE;
        }

        public on_init(): void {
            fontmgr.set_ui_font(this.m_ui);
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.combat_roundDetail_uiUI;
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.on_round_changed);
                let combatui = game.get_module(module_enum.MODULE_COMBATUI) as game.combat_ui_mgr;
                let info_arr = combatui.get_cur_war_info();
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
        }

        private init_ui(): void {
            let cfg = config.Cli_round_detail_cfg.get_Cli_round_detail_cfg(this.war_subType);
            if (cfg) {
                this.show_type = cfg["descType"];
                if (this.show_type == 1){
                    this.UIins.sp1_title.text = cfg["title"];
                    this.UIins.sp1_lab_content.text = cfg["desc"];
                    let designwh: Object = helper.get_design_wh();
                    let d_w: number = designwh['w'];
                    // let d_h: number = designwh['h'];
                    this.m_ui.x = d_w - 516;
                    this.m_ui.y = 100 + helper.TOPBAR_HEIGHT;
                    this.UIins.sp_1.visible = true;
                    this.UIins.sp_2.visible = false;
                }
                else if (this.show_type == 2){
                    this.UIins.sp2_title.text = cfg["title"];
                    this.UIins.sp2_lab_content.text = cfg["desc"];
                    this.UIins.sp2_pgbar.value = 1;
                    let designwh: Object = helper.get_design_wh();
                    let d_w: number = designwh['w'];
                    // let d_h: number = designwh['h'];
                    this.m_ui.x = d_w - 516;
                    this.m_ui.y = 100 + helper.TOPBAR_HEIGHT;
                    this.UIins.sp_1.visible = false;
                    this.UIins.sp_2.visible = true;
                }
                else{
                    this.UIins.sp_1.visible = false;
                    this.UIins.sp_2.visible = false;
                }
            }
        }

        public update_round(ud: any = null): void {
            if (this.show_type == 2){
                let value = (10 - this.round) / 10;
                if (value < 0)
                    value = 0;
                this.UIins.sp2_pgbar.value = value;
            }
        }

        public on_round_changed(ud: any = null): void {
            this.round = ud;
            if (this.round > 0) {
                this.update_round();
            }
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}