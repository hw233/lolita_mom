module base {
    export class ExtButton extends Laya.Button {
        constructor() {
            super();
            this.on(Laya.Event.CLICK, this, this.on_click);
        }
        private on_click(ud: any = null): void {
            utils.event_ins().fire_event_next_frame(game_event.EVENT_BUTTON_CLICK);
        }
    }
}