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
    var main_ui = /** @class */ (function (_super) {
        __extends(main_ui, _super);
        function main_ui() {
            var _this = _super.call(this, "res/atlas/mainui.atlas", ui.game.main_ui_newUI) || this;
            _this.UIins = null;
            _this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("res/atlas/ui/new.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.NORMAL;
            return _this;
        }
        main_ui.prototype.on_init = function () {
        };
        main_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.UIins.btn1.on(Laya.Event.CLICK, this, this.on_battle);
                this.UIins.btn2.on(Laya.Event.CLICK, this, this.on_maincity);
                this.UIins.btn3.on(Laya.Event.CLICK, this, this.on_mainequip);
                this.UIins.btn4.on(Laya.Event.CLICK, this, this.on_add);
                this.UIins.btn5.on(Laya.Event.CLICK, this, this.on_partner);
                this.UIins.y = Laya.stage.designHeight - this.UIins.height;
                this.register_event(game_event.EVENT_UI_MAINUPDATE, this.on_update_data);
            }
            else {
                this.UIins.btn1.off(Laya.Event.CLICK, this, this.on_battle);
                this.UIins.btn2.off(Laya.Event.CLICK, this, this.on_maincity);
                this.UIins.btn3.off(Laya.Event.CLICK, this, this.on_mainequip);
                this.UIins.btn4.off(Laya.Event.CLICK, this, this.on_add);
                this.UIins.btn5.off(Laya.Event.CLICK, this, this.on_partner);
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        main_ui.prototype.on_update_data = function (ud) {
            if (ud === void 0) { ud = null; }
            var exp = ud[0];
            var expmax = ud[1];
            var rate = exp / expmax;
            this.UIins.exp_progress.value = rate;
            this.UIins.exp_label.changeText((rate * 100).toFixed(2) + "%");
        };
        main_ui.prototype.on_battle = function (ud) {
            if (ud === void 0) { ud = null; }
            var card_m = game.get_module(module_enum.MODULE_CARD);
            var tud = new Object();
            var idlist = new Array();
            tud["idlist"] = idlist;
            var shapelist = new Array();
            tud["shapelist"] = shapelist;
            var hplist = new Array();
            tud["hplist"] = hplist;
            var atklist = new Array();
            tud["atklist"] = atklist;
            var durationlist = new Array();
            tud["durationlist"] = durationlist;
            for (var i = 0; i < 16; ++i) {
                idlist.push(i + 1);
                shapelist.push(1001);
                hplist.push(i + 1);
                atklist.push(i + 1);
                durationlist.push(i + 1);
            }
            shapelist[1] = 3001;
            shapelist[2] = 9999;
            shapelist[3] = 3102;
            shapelist[4] = 3301;
            shapelist[5] = 0;
            shapelist[6] = 0;
            shapelist[7] = 0;
            shapelist[8] = 0;
            card_m.on_cards_arr(tud);
            utils.widget_ins().show_widget(widget_enum.WIDGET_CARDUI, true);
        };
        main_ui.prototype.on_maincity = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("hahahaha");
            helper.show_text_tips("hahahahah,this is a test");
            //this.fire_event_next_frame(game_event.EVENT_TEST);
        };
        main_ui.prototype.on_mainequip = function (ud) {
            if (ud === void 0) { ud = null; }
            helper.show_msgbox("OK,let's go");
            //this.fire_event_next_frame(game_event.EVENT_TEST1);
        };
        main_ui.prototype.on_add = function (ud) {
            if (ud === void 0) { ud = null; }
            this.fire_event_next_frame(game_event.EVENT_TEST3);
        };
        main_ui.prototype.on_partner = function (ud) {
            if (ud === void 0) { ud = null; }
            this.fire_event_next_frame(game_event.EVENT_TEST2);
        };
        main_ui.prototype.on_dispose = function () {
        };
        main_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return main_ui;
    }(utils.game_widget));
    widget.main_ui = main_ui;
})(widget || (widget = {}));
//# sourceMappingURL=main_ui.js.map