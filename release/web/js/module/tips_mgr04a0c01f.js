var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var Tips = /** @class */ (function (_super) {
        __extends(Tips, _super);
        function Tips() {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.b_icon = false;
            _this.s_w = 0;
            _this.bk = new Laya.Image();
            _this.bk.height = 90;
            _this.bk.skin = "bigpic/tipsbk.png";
            _this.bk.sizeGrid = "0,220,0,220";
            _this.addChild(_this.bk);
            // this.icon = new Laya.Image();
            // this.icon.x = 170;
            // this.icon.y = 7;
            // this.icon.width = 134;
            // this.icon.height = 134;
            // this.icon.scaleX = 0.4;
            // this.icon.scaleY = 0.4;
            // this.addChild(this.icon);
            _this.msg = new Laya.HTMLDivElement();
            _this.msg.x = 170;
            _this.msg.y = 19;
            _this.msg.style.font = "42px h5font";
            _this.msg.style.color = "#ffffff";
            _this.msg.style.width = 1100;
            _this.addChild(_this.msg);
            _this.cacheAs = "bitmap";
            return _this;
        }
        Tips.prototype.set_msg = function (t_node) {
            try {
                this.msg.innerHTML = t_node.msg;
            }
            catch (error) {
                this.msg.innerHTML = "";
                core.game_errlog("ScreenTips XML Error:", t_node.type, t_node.msg, t_node.item_shape, t_node.icon);
            }
            if (t_node.type == 0 || t_node.type == 1) {
                this.b_icon = false;
                var d_v = this.msg.contextWidth - 300;
                if (d_v < 0) {
                    this.s_w = 640; // msg最小宽度300 + 两边内容与bk差值170*2
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
        };
        Tips.prototype.show = function (flag) {
            this.visible = flag;
        };
        Tips.prototype.reset = function () {
            this.visible = false;
            this.count = 0;
            this.s_w = 0;
            if (this.b_icon == true) {
                // icon_mgr.fastdel_icon(this.icon);
                this.b_icon = false;
            }
        };
        return Tips;
    }(Laya.Sprite));
    game.Tips = Tips;
    var tips_mgr = /** @class */ (function (_super) {
        __extends(tips_mgr, _super);
        function tips_mgr() {
            var _this = _super.call(this) || this;
            _this.pool_arr = new Array();
            return _this;
        }
        tips_mgr.prototype.start = function () {
            _super.prototype.start.call(this);
        };
        tips_mgr.prototype._create_tips_ins = function () {
            var tips_ins = new Tips();
            this.pool_arr.push(tips_ins);
        };
        tips_mgr.prototype.get_tips_ins = function () {
            if (this.pool_arr.length == 0) {
                this._create_tips_ins();
            }
            return this.pool_arr.pop();
        };
        tips_mgr.prototype.revert_tips_ins = function (ins) {
            this.pool_arr.push(ins);
        };
        tips_mgr.prototype.revert_tips_ins_arr = function (ins_arr) {
            this.pool_arr = this.pool_arr.concat(ins_arr);
        };
        tips_mgr.prototype.show_tips = function (ud) {
            if (ud === void 0) { ud = null; }
            // let t_type = ud["t_type"];
            var text = ud["text"];
            if (text != null) {
                var t_data = data.get_data(data_enum.DATA_TIPS);
                t_data.add_tips_node(0, text);
                if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_TIPS) == false) {
                    utils.widget_ins().show_widget(widget_enum.WIDGET_TIPS, true);
                }
            }
        };
        tips_mgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return tips_mgr;
    }(utils.game_module));
    game.tips_mgr = tips_mgr;
})(game || (game = {}));
//# sourceMappingURL=tips_mgr.js.map