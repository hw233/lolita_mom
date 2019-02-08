module game {
    export class Tips extends Laya.Sprite {
        public count: number = 0;
        public b_icon: boolean = false;
        public s_w: number = 0;

        private bk: Laya.Image;
        // private icon: Laya.Image;
        private msg: Laya.HTMLDivElement;

        constructor() {
            super();
            this.bk = new Laya.Image();
            this.bk.height = 90;
            this.bk.skin = "bigpic/tipsbk.png";
            this.bk.sizeGrid = "0,220,0,220";
            this.addChild(this.bk);
            // this.icon = new Laya.Image();
            // this.icon.x = 170;
            // this.icon.y = 7;
            // this.icon.width = 134;
            // this.icon.height = 134;
            // this.icon.scaleX = 0.4;
            // this.icon.scaleY = 0.4;
            // this.addChild(this.icon);
            this.msg = new Laya.HTMLDivElement();
            this.msg.x = 170;
            this.msg.y = 19;
            this.msg.style.font = "42px h5font";
            this.msg.style.color = "#ffffff";
            this.msg.style.width = 1100;
            this.addChild(this.msg);
            this.cacheAs = "bitmap";
        }

        public set_msg(t_node: data.tips_node): void {
            try {
                this.msg.innerHTML = t_node.msg;
            }
            catch (error) {
                this.msg.innerHTML = "";
                core.game_errlog("ScreenTips XML Error:", t_node.type, t_node.msg, t_node.item_shape, t_node.icon);
            }
            if (t_node.type == 0 || t_node.type == 1) {
                this.b_icon = false;
                let d_v = this.msg.contextWidth - 300;
                if (d_v < 0) {
                    this.s_w = 640;  // msg最小宽度300 + 两边内容与bk差值170*2
                    this.msg.x = 170 - d_v / 2;
                }
                else {
                    this.s_w = 640 + d_v;
                    this.msg.x = 170;
                }
            }
            // else if (t_node.type == 1) {
            //     let show_icon: number = t_node.icon;
            //     if (base.COIN_ARR.indexOf(t_node.icon) >= 0) {
            //         show_icon = base.COIN_MAP[t_node.icon];
            //     }
            //     // icon_mgr.fastset_item_icon(show_icon, this.icon, true);
            //     this.b_icon = true;
            //     // let d_v = this.msg.contextWidth - 220;  //300-80
            //     let d_v = this.msg.contextWidth - 300;
            //     if (d_v < 0) {
            //         this.s_w = 680;
            //         // this.msg.x = 270 - d_v / 2;  //190+80
            //         this.msg.x = 170 - d_v / 2;
            //     }
            //     else {
            //         this.s_w = 680 + d_v;
            //         // this.msg.x = 270;
            //         this.msg.x = 170;
            //     }
            // }
            this.bk.width = this.s_w;
        }

        public show(flag: boolean): void {
            this.visible = flag;
        }

        public reset(): void {
            this.visible = false;
            this.count = 0;
            this.s_w = 0;
            if (this.b_icon == true) {
                // icon_mgr.fastdel_icon(this.icon);
                this.b_icon = false;
            }
        }
    }

    export class tips_mgr extends utils.game_module {
        private pool_arr = new Array<Tips>();

        constructor() {
            super();
        }

        public start() {
            super.start();
        }

        private _create_tips_ins(): void {
            let tips_ins = new Tips();
            this.pool_arr.push(tips_ins);
        }

        public get_tips_ins(): Tips {
            if (this.pool_arr.length == 0) {
                this._create_tips_ins();
            }
            return this.pool_arr.pop();
        }

        public revert_tips_ins(ins: Tips): void {
            this.pool_arr.push(ins);
        }

        public revert_tips_ins_arr(ins_arr: Array<Tips>): void {
            this.pool_arr = this.pool_arr.concat(ins_arr);
        }

        public show_tips(ud: any = null): void {
            // let t_type = ud["t_type"];
            let text = ud["text"];
            if (text != null) {
                let t_data = data.get_data(data_enum.DATA_TIPS) as data.tips_data;
                t_data.add_tips_node(0, text);
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_TIPS) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_TIPS, true);
                }
            }

        }

        public dispose() {
            super.dispose();
        }
    }
}