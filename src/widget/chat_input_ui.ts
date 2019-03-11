// Author: 阿栋
// Date: 2018/01/03
// Desc: 聊天输入框

module widget {
	export class chat_input_ui extends utils.game_widget {
		private UIins: ui.game.chat_input_uiUI;
		private bottom_distance: number = 0;
		private is_send: boolean = false; //控制键盘点击回车发送、弹出框发送按钮发送
		private focus_ui: string = ""; //发起界面的标记量

		constructor() {
			super("res/atlas/chat.atlas", ui.game.chat_input_uiUI);
			this.m_layer = utils.WIDGET_LAYER.TOP;
		}

		public on_init(): void {
			this.m_ui.width = helper.get_design_w();
			this.m_ui.bottom = 200;
		}

		public on_show(flag: boolean): void {
			if (flag) {
				this.UIins = this.m_ui as ui.game.chat_input_uiUI;
				this.register_event(game_event.EVENT_KEYBOARD_HIDDEN, this.on_hidden);
				this.register_event(game_event.EVENT_KEYBOARD_HEIGHT_CHANGE, this.on_height_change);
				this.UIins.img_send.on(Laya.Event.CLICK, this, this.on_send);
				this.UIins.on(Laya.Event.KEY_DOWN, this, this.on_key_event);
				if (this.m_ud) {
					this.bottom_distance = Number(this.m_ud["height"]);
				}
				Laya.timer.once(300, this, this.on_timer);
				this.init_input_text();
			}
			else {
				this.unregister_allevent();
				this.UIins.img_send.off(Laya.Event.CLICK, this, this.on_send);
				this.UIins.off(Laya.Event.KEY_DOWN, this, this.on_key_event);
				Laya.timer.clearAll(this);
				this.UIins.input_msg.text = "";
				this.is_send = false;
				this.UIins = null;
			}
		}

		private on_timer(): void {
			this.UIins.bottom = -helper.get_design_h() + helper.get_design_h() / Laya.Browser.height * this.bottom_distance;
			this.UIins.input_msg.focus = true;
		}

		private init_input_text(): void {
			//let uiswitch_mgr = utils.module_ins().get_module(module_enum.MODULE_UISWITCH) as game.UIswitch_mgr;
			this.focus_ui = helper.get_focus_str();
			let msg: string = helper.chat_input_dict.get(this.focus_ui);
			if (msg && msg != "") {
				this.UIins.input_msg.text = msg;
			}
		}

		private on_key_event(evt: Laya.Event): void {
			if (evt.keyCode == Laya.Keyboard.ENTER) {
				this.on_send();
			}
		}

		private on_send(): void {
			this.is_send = true;
		}

		private on_hidden(): void {
			let msg: string = this.UIins.input_msg.text;
			if (this.is_send) {
				this.fire_event_next_frame(game_event.EVENT_CHAT_INPUT_SEND, { "msg": msg });
				helper.chat_input_dict.set(this.focus_ui, "");
			} else {
				this.fire_event_next_frame(game_event.EVENT_CHAT_INPUT_MSG, { "msg": msg });
				helper.chat_input_dict.set(this.focus_ui, msg);
			}
			this.show(false);
		}

		private on_height_change(ud: Object): void {
			if (ud && ud["height"] !== undefined) {
				this.bottom_distance = Number(ud["height"]);
			}
		}

		public on_dispose(): void { }

		public dispose(): void {
			super.dispose();
		}
	}
}