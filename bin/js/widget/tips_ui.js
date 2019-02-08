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
var widget;
(function (widget) {
    var tips_ui = /** @class */ (function (_super) {
        __extends(tips_ui, _super);
        function tips_ui() {
            var _this = _super.call(this, "res/atlas/ui/sys.atlas", ui.game.tips_uiUI) || this;
            _this.step = 0;
            _this.centre_x = 0;
            _this.centre_y = 0;
            _this.cur_y = 0;
            _this.show_arr = new Array();
            _this.pool_arr = new Array();
            _this.tips_data = null;
            _this.tips_mgr = null;
            _this.append_extrares("bigpic/tipsbk.png", Laya.Loader.IMAGE);
            _this.m_layer = utils.WIDGET_LAYER.TOP;
            return _this;
        }
        tips_ui.prototype.on_init = function () {
            this.m_ui.x = 0;
            this.m_ui.y = 0;
        };
        tips_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.tips_mgr = game.get_module(module_enum.MODULE_TIPS);
                this.tips_data = data.get_data(data_enum.DATA_TIPS);
                this.centre_x = Laya.stage.desginWidth / 2;
                this.centre_y = Laya.stage.desginHeight / 2;
                this.cur_y = this.centre_y;
                timer.timer_ins().add_timer(100, this, this.update);
            }
            else {
                timer.timer_ins().remove_all_timer(this);
                for (var _i = 0, _a = this.pool_arr; _i < _a.length; _i++) {
                    var tips = _a[_i];
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
        };
        tips_ui.prototype.update = function () {
            this.step += 1;
            this.add_tips();
            if (this.step > 1) {
                this.check();
                this.step = 0;
            }
            if (this.show_arr.length == 0) {
                this.show(false);
            }
        };
        tips_ui.prototype._get_tips_ins = function () {
            if (this.pool_arr.length == 0) {
                this.pool_arr.push(this.tips_mgr.get_tips_ins());
            }
            return this.pool_arr.pop();
        };
        tips_ui.prototype.add_tips = function () {
            if (this.show_arr.length <= 10) {
                var tips_node = this.tips_data.get_tips_node();
                if (tips_node) {
                    var tips_ins = this._get_tips_ins();
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
        };
        tips_ui.prototype.check = function () {
            if (this.show_arr.length > 0) {
                for (var _i = 0, _a = this.show_arr; _i < _a.length; _i++) {
                    var tips_ins_1 = _a[_i];
                    tips_ins_1.count += 1;
                }
                var tips_ins = this.show_arr[0];
                if (tips_ins.count > 4) {
                    tips_ins.show(false);
                    this.show_arr.shift();
                    this.pool_arr.push(tips_ins);
                }
            }
        };
        tips_ui.prototype.on_dispose = function () {
        };
        tips_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return tips_ui;
    }(utils.game_widget));
    widget.tips_ui = tips_ui;
})(widget || (widget = {}));
//# sourceMappingURL=tips_ui.js.map