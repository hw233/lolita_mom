module widget {
    export class tips_ui extends utils.game_widget {
        private step: number = 0;
        private centre_x: number = 0;
        private centre_y: number = 0;
        private cur_y: number = 0;
        private show_arr = new Array<game.Tips>();
        private pool_arr = new Array<game.Tips>();
        private tips_data: data.tips_data = null;
        private tips_mgr: game.tips_mgr = null;

        constructor() {
            super("res/atlas/ui/sys.atlas", ui.game.tips_uiUI);
            this.append_extrares("bigpic/tipsbk.png", Laya.Loader.IMAGE);
            this.m_layer = utils.WIDGET_LAYER.TOP;
        }

        public on_init(): void {
            this.m_ui.x = 0;
            this.m_ui.y = 0;
        }

        public on_show(flag: boolean): void {
            if (flag) {
                this.tips_mgr = game.get_module(module_enum.MODULE_TIPS) as game.tips_mgr;
                this.tips_data = data.get_data(data_enum.DATA_TIPS) as data.tips_data;
                this.centre_x = Laya.stage.desginWidth / 2;
                this.centre_y = Laya.stage.desginHeight / 2;
                this.cur_y = this.centre_y;
                timer.timer_ins().add_timer(100, this, this.update);
            }
            else {
                timer.timer_ins().remove_all_timer(this);
                for (let tips of this.pool_arr) {
                    tips.reset();
                    this.m_ui.removeChild(tips);
                }
                this.tips_mgr.revert_tips_ins_arr(this.pool_arr);
                this.tips_mgr = null;
                this.tips_data = null;
                this.pool_arr = [];
                this.show_arr = [];
                this.centre_x = 0;
                this.centre_y = 0;
            }
        }

        public update(): void {
            this.step += 1;
            this.add_tips();
            if (this.step > 1) {
                this.check();
                this.step = 0;
            }
            if (this.show_arr.length == 0) {
                this.show(false);
            }
        }

        private _get_tips_ins(): game.Tips {
            if (this.pool_arr.length == 0) {
                this.pool_arr.push(this.tips_mgr.get_tips_ins());
            }
            return this.pool_arr.pop();
        }

        private add_tips(): void {
            if (this.show_arr.length <= 10) {
                let tips_node = this.tips_data.get_tips_node();
                if (tips_node) {
                    let tips_ins = this._get_tips_ins();
                    this.m_ui.addChild(tips_ins);
                    tips_ins.set_msg(tips_node);
                    this.cur_y -= 95;
                    if (this.cur_y < 200) {
                        this.cur_y = this.centre_y;
                    }
                    tips_ins.x = this.centre_x - tips_ins.s_w / 2;
                    tips_ins.y = this.cur_y;
                    tips_ins.count = 0;
                    tips_ins.show(true);
                    this.show_arr.push(tips_ins);
                }
            }
        }

        public check(): void {
            if (this.show_arr.length > 0) {
                for (let tips_ins of this.show_arr) {
                    tips_ins.count += 1;
                }
                let tips_ins = this.show_arr[0];
                if (tips_ins.count > 4) {
                    tips_ins.show(false);
                    this.show_arr.shift();
                    this.pool_arr.push(tips_ins);
                }
            }
        }

        public on_dispose(): void {
        }

        public dispose() {
            super.dispose();
        }
    }
}