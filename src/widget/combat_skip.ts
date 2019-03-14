module widget {
    // 战斗跳过
    export class combat_skip_ui extends utils.game_widget {
        // private war_type: number = 0;
        private war_subType: number = 0;
        private round: number = 0;
        private skip_show_round: number = 0;
        private b_can_skip: boolean = false;
        private tips: string = "";

        private UIins: ui.game.combat_skipUI = null;

        constructor() {
            super("res/atlas/combat_round.atlas", ui.game.combat_skipUI);
            this.m_layer = utils.WIDGET_LAYER.SCENE;
        }

        public on_init(): void {
            fontmgr.set_ui_font(this.m_ui);
            let designwh: Object = helper.get_design_wh();
            let d_w: number = designwh['w'];
            let d_h: number = designwh['h'];
            this.m_ui.x = d_w - 280;
            this.m_ui.y = d_h - 1020;
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.combat_skipUI;
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
        }

        public update_cfg(): void {
            let combatui = game.get_module(module_enum.MODULE_COMBATUI) as game.combat_ui_mgr;
            let info_arr = combatui.get_cur_war_info();
            // this.war_type = info_arr[0];
            this.war_subType = info_arr[1];
            let skip_cfg = config.Combat_skip_cfg.get_Combat_skip_cfg(this.war_subType);
            if (skip_cfg != null) {
                let need_lv:number = skip_cfg["lv"];
                let need_vip:number = skip_cfg["vip"];
                this.skip_show_round = skip_cfg["pass_round"];
                this.b_can_skip = (helper.mine().m_lv >= need_lv) || (helper.mine().m_vip >= need_vip);
                if (this.b_can_skip == false){
                    this.tips = skip_cfg["tips"];
                }
            }
        }

        public update_ui(ud: any = null): void {
            this.round = ud;
            if (this.round >= this.skip_show_round) {
                this.UIins.btn_skip.visible = true;
            }
        }

        public on_skip(ud: any = null): void {
            if (this.b_can_skip){
                this.fire_event_next_frame(game_event.EVENT_COMBATGO2NEXT);
            }
            else{
                helper.show_text_tips(this.tips);
            }
            helper.play_sound("sound/mousedown_btn.wav");
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}