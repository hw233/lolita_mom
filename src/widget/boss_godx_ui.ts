// Author: 阿栋
// Date: 2018/08/22
// Desc: 助战BOSS类入场表现

module widget {
	export class boss_godx_ui extends utils.game_widget {
		private UIins: ui.game.boss_godx_uiUI;
		private img_left: Laya.Image;
		private img_right: Laya.Image;
		private left_speed: number = 90;
		private right_speed: number = 60;
		private count: number = -1;

		constructor() {
			super("res/atlas/boss_godx.atlas", ui.game.boss_godx_uiUI);
			this.m_layer = utils.WIDGET_LAYER.SCENE;
		}

		public on_show(flag: boolean): void {
			if (flag) {
				this.UIins = this.m_ui as ui.game.boss_godx_uiUI;
				this.img_left = this.UIins.img_left;
				this.img_left.x = -720;
				let sub_type: number = 0;
				if (this.m_ud) {
					sub_type = this.m_ud['war_subType'];
				}
				if (sub_type == game.WARSUBTYPE_SCENEPASS_HELP) {
					this.img_right = this.UIins.img_daxia;
					this.UIins.img_boss.visible = false;
					this.UIins.img_daxia.visible = true;
				}
				else {
					this.img_right = this.UIins.img_boss;
					this.UIins.img_boss.visible = true;
					this.UIins.img_daxia.visible = false;
				}
				this.img_right.x = 1020;
				this.m_ui.x = 0;
				this.m_ui.y = 500;
				timer.timer_ins().add_timer(16, this, this.on_tick)
			}
			else {
				timer.timer_ins().remove_all_timer(this);
				this.count = -1;
				this.img_left = null;
				this.img_right = null;
				this.UIins = null;
			}
		}

		private on_tick(): void {
			if (this.count < 0) {
				this.img_left.x += this.left_speed;
				this.img_right.x -= this.right_speed;
				if (this.img_left.x >= 0) {
					this.count = 1;
				}
			}
			else {
				this.count += 1;
				if (this.count > 30) {
					this.show(false);
				}
			}
		}

		public on_dispose(): void {
		}

		public dispose(): void {
			super.dispose();
		}
	}
}