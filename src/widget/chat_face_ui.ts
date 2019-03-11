// Author: 雨晨
// Date: 2018/
// Desc: 表情
module widget {
    export class chat_face extends utils.game_widget {
        private UIins: ui.game.chat_faceUI;
        private faceArray: Array<any>;
        constructor() {
            super("res/atlas/emotion.atlas", ui.game.chat_faceUI);
            this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
        }
        public on_init(): void {
            let designwh: Object = helper.get_design_wh();
            let d_w: number = designwh['w'];
            let d_h: number = designwh['h'];
            this.m_ui.x = (d_w - this.m_ui.width) / 2;
            this.m_ui.y = d_h - this.m_ui.height - 354;
        }
        public on_show(flag: boolean): void {
            if (flag) {
                this.UIins = this.m_ui as ui.game.chat_faceUI;
                this.faceArray = [];
                // //往数组中添加表情图片
                for (var i = 0; i < 35; i++) {
                    this.faceArray.push({ url: "emotion/face" + i + ".png" });
                }
                this.UIins.faceList.vScrollBarSkin = "";
                this.UIins.faceList.array = this.faceArray;
                this.UIins.faceList.renderHandler = new Laya.Handler(this, this.onRender);
                this.UIins.faceList.mouseEnabled = true;
                this.UIins.faceList.mouseHandler = new Laya.Handler(this, this.on_click);
            }
            else {
                this.faceArray = [];
                this.UIins.faceList.array = [];
                this.UIins = null;
            }
        }
        public on_click(event: Laya.Event, index: number): void {
            if (event.type == Laya.Event.CLICK) {
                let e_str: string = "#" + index.toString();
                this.fire_event_next_frame(game_event.EVENT_SELECT_EMOTION, e_str);
            }
        }
        public onRender(item: Laya.Box, index: number): void {
            var img: laya.ui.Image = item.getChildByName("face") as laya.ui.Image;
            img.skin = this.faceArray[index].url;
        }
        public update_ui() {

        }
        public on_dispose(): void {

        }

        public dispose() {
            super.dispose();
        }
    }
}