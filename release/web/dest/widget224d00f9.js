// Author: 阿栋
// Date: 2018/08/22
// Desc: 助战BOSS类入场表现
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
    var boss_godx_ui = /** @class */ (function (_super) {
        __extends(boss_godx_ui, _super);
        function boss_godx_ui() {
            var _this = _super.call(this, "res/atlas/boss_godx.atlas", ui.game.boss_godx_uiUI) || this;
            _this.left_speed = 90;
            _this.right_speed = 60;
            _this.count = -1;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        boss_godx_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.img_left = this.UIins.img_left;
                this.img_left.x = -720;
                var sub_type = 0;
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
                timer.timer_ins().add_timer(16, this, this.on_tick);
            }
            else {
                timer.timer_ins().remove_all_timer(this);
                this.count = -1;
                this.img_left = null;
                this.img_right = null;
                this.UIins = null;
            }
        };
        boss_godx_ui.prototype.on_tick = function () {
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
        };
        boss_godx_ui.prototype.on_dispose = function () {
        };
        boss_godx_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return boss_godx_ui;
    }(utils.game_widget));
    widget.boss_godx_ui = boss_godx_ui;
})(widget || (widget = {}));
//# sourceMappingURL=boss_godx_ui.js.map
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
    var CARD_ITEM_FRAME_W = 144;
    var CARD_ITEM_FRAME_H = 184;
    var CARD_ITEM_FRAMEC_W = 122;
    var CARD_ITEM_FRAMEC_H = 184;
    var CARD_ITEM_FRAMEBK_W = 100;
    var CARD_ITEM_FRAMEBK_H = 160;
    var CARD_ITEM_ICON_W = 120;
    var CARD_ITEM_ICON_H = 120;
    var card_item = /** @class */ (function (_super) {
        __extends(card_item, _super);
        function card_item() {
            var _this = _super.call(this) || this;
            _this.m_id = 0;
            _this.m_root = new Laya.Sprite();
            _this.m_frame = new Laya.Sprite();
            _this.m_bk = new Laya.Sprite();
            _this.m_icon = new Laya.Sprite();
            _this.m_info_label = new Laya.Sprite();
            _this.m_ani = new Laya.Animation();
            _this.m_parent = null;
            _this.m_open_tp = 0;
            _this.m_show_animation = false;
            _this.m_card_id = 0;
            _this.m_card_type = 0;
            _this.m_card_shape = 0;
            _this.m_card_hp = 0;
            _this.m_card_atk = 0;
            _this.m_card_duration = 0;
            _this.m_name = "";
            _this.m_desc = "";
            _this.m_info = "";
            _this.m_info1 = "";
            _this.m_waitani_list = new Array();
            _this.mouseEnabled = true;
            _this.addChild(_this.m_root);
            _this.m_root.pivot(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            _this.m_root.width = CARD_ITEM_FRAME_W;
            _this.m_root.height = CARD_ITEM_FRAME_H;
            _this.m_root.pos(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            return _this;
        }
        card_item.prototype._is_valid = function () {
            return this.m_card_id != 0;
        };
        card_item.prototype.update_data = function (cid, ctype, cshape, chp, catk, cdu) {
            //todo
            this.m_card_id = cid;
            this.m_card_type = ctype;
            this.m_card_shape = cshape;
            this.m_card_atk = catk;
            this.m_card_hp = chp;
            this.m_card_duration = cdu;
            this.del_icon();
            if (this.m_card_shape != 0) {
                icon_mgr.fastset_item_icon(this.m_card_shape, this.m_icon, this);
                this.show_frame(this.m_card_type);
                if (this.m_card_type == data.CARD_TYPE_ARMOR || this.m_card_type == data.CARD_TYPE_SWORD) {
                    this.set_icon_wh(CARD_ITEM_ICON_W, CARD_ITEM_ICON_H);
                }
                else if (this.m_card_type == data.CARD_TYPE_SPELL || this.m_card_type == data.CARD_TYPE_TRAP) {
                    this.set_icon_wh(CARD_ITEM_ICON_W, CARD_ITEM_ICON_H);
                }
                else {
                    this.set_icon_wh(CARD_ITEM_ICON_W, CARD_ITEM_ICON_H);
                }
            }
            else {
                this.show_bk();
            }
        };
        card_item.prototype.update_info = function (name, desc, info, info1) {
            this.m_name = name;
            this.m_desc = desc;
            this.m_info = info;
            this.m_info1 = info1;
            //todo
            this.update_draw_info();
        };
        card_item.prototype.clear_data = function () {
            this.stop_animation();
            this.clear_img();
            this.del_icon();
            this.m_card_id = 0;
        };
        card_item.prototype.register_event = function () {
            this.m_root.on(Laya.Event.MOUSE_OVER, this, this.on_over);
            this.m_root.on(Laya.Event.MOUSE_OUT, this, this.on_out);
            this.m_root.on(Laya.Event.MOUSE_DOWN, this, this.on_mousedown);
            this.m_root.on(Laya.Event.MOUSE_UP, this, this.on_mouseup);
        };
        card_item.prototype.unregister_event = function () {
            this.m_root.off(Laya.Event.MOUSE_OVER, this, this.on_over);
            this.m_root.off(Laya.Event.MOUSE_OUT, this, this.on_out);
            this.m_root.off(Laya.Event.MOUSE_DOWN, this, this.on_mousedown);
            this.m_root.off(Laya.Event.MOUSE_UP, this, this.on_mouseup);
        };
        card_item.prototype.on_mousedown = function (ud) {
            if (ud === void 0) { ud = null; }
            //core.ui_tiplog("card_item on_mousedown ",this.m_id);
            if (this.m_parent && this._is_valid()) {
                this.m_parent.on_mousedown_card(this.m_id, this.m_card_id);
            }
        };
        card_item.prototype.on_mouseup = function (ud) {
            if (ud === void 0) { ud = null; }
            //core.ui_tiplog("card_item on_mouseup ",this.m_id);
            if (this.m_parent && this._is_valid()) {
                this.m_parent.on_mouseup_card(this.m_id, this.m_card_id);
            }
        };
        card_item.prototype.on_over = function (ud) {
            if (ud === void 0) { ud = null; }
            //core.ui_tiplog("card_item on_over ",this.m_id);
            if (!this._is_valid()) {
                return;
            }
            if (this.m_show_animation) {
                return;
            }
            this.m_root.scale(1.2, 1.2);
            if (this.m_parent && this.m_card_id != 0 && this.m_card_shape != 0) {
                var x = this.x + CARD_ITEM_FRAME_W;
                var y = this.y;
                var pt = new Laya.Point(x, y);
                if (this.m_id < this.m_parent.m_hand_id_start) {
                    pt = this.m_parent.UIins.m_card_sp.localToGlobal(pt);
                }
                else {
                    pt = this.m_parent.UIins.m_hand_sp.localToGlobal(pt);
                }
                var nx = pt.x - CARD_ITEM_FRAME_W - 360;
                if (pt.x > Laya.stage.designWidth - 360 && nx >= 0) {
                    pt.x = nx;
                }
                helper.show_float_text_tips(this.m_desc + "\n" + this.m_info, pt.x, pt.y);
            }
        };
        card_item.prototype.on_out = function (ud) {
            if (ud === void 0) { ud = null; }
            //core.ui_tiplog("card_item on_out ",this.m_id);
            if (!this._is_valid()) {
                return;
            }
            if (this.m_show_animation) {
                return;
            }
            this.m_root.scale(1.0, 1.0);
            if (this.m_parent && this.m_card_id != 0) {
                helper.hide_float_text_tips();
            }
        };
        card_item.prototype.show_attacked = function () {
            if (this.m_show_animation) {
                this.m_waitani_list.push(-2);
                return;
            }
            this.on_out();
            this.stop_animation();
            this.m_root.addChild(this.m_ani);
            this.m_ani.pos(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            this.m_ani.loadAnimation("game_ani/attack.ani");
            this.m_ani.play();
            this.m_show_animation = true;
            Laya.Tween.to(this.m_root, { rotation: -10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase1));
        };
        card_item.prototype.on_showattacked_phase1 = function () {
            Laya.Tween.to(this.m_root, { rotation: 10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase2));
        };
        card_item.prototype.on_showattacked_phase2 = function () {
            Laya.Tween.to(this.m_root, { rotation: -10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase3));
        };
        card_item.prototype.on_showattacked_phase3 = function () {
            Laya.Tween.to(this.m_root, { rotation: 10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase4));
        };
        card_item.prototype.on_showattacked_phase4 = function () {
            Laya.Tween.to(this.m_root, { rotation: -10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase5));
        };
        card_item.prototype.on_showattacked_phase5 = function (ud) {
            if (ud === void 0) { ud = null; }
            this.stop_animation(true);
        };
        card_item.prototype.show_attack = function () {
            if (this.m_show_animation) {
                this.m_waitani_list.push(-1);
                return;
            }
            this.on_out();
            this.stop_animation();
            this.m_show_animation = true;
            this.m_root.scale(1.2, 1.2);
            Laya.Tween.to(this.m_root, { rotation: -20 }, 50, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattack_phase1));
        };
        card_item.prototype.on_showattack_phase1 = function () {
            Laya.Tween.to(this.m_root, { rotation: 0 }, 50, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattack_phase2));
        };
        card_item.prototype.on_showattack_phase2 = function (ud) {
            if (ud === void 0) { ud = null; }
            this.stop_animation(true);
        };
        card_item.prototype.show_open = function (tp) {
            //Laya.Tween.to()
            if (this.m_show_animation) {
                this.m_waitani_list.push(tp);
                return;
            }
            this.on_out();
            this.stop_animation();
            this.m_show_animation = true;
            this.m_open_tp = tp;
            this.show_bk();
            Laya.Tween.to(this.m_root, { scaleX: 0 }, 100, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showopen_phase1));
        };
        card_item.prototype.on_showopen_phase1 = function (ud) {
            if (ud === void 0) { ud = null; }
            this.show_frame(this.m_open_tp);
            Laya.Tween.to(this.m_root, { scaleX: 1 }, 100, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showopen_phase2));
        };
        card_item.prototype.on_showopen_phase2 = function (ud) {
            if (ud === void 0) { ud = null; }
            this.show_frame(this.m_open_tp);
            this.stop_animation(true);
        };
        card_item.prototype.stop_animation = function (b_end) {
            if (b_end === void 0) { b_end = false; }
            this.m_show_animation = false;
            Laya.Tween.clearAll(this.m_root);
            this.m_root.scale(1.0, 1.0);
            this.m_root.rotation = 0;
            this.m_ani.removeSelf();
            if (b_end && this.m_waitani_list.length > 0) {
                var tp = this.m_waitani_list.shift();
                if (tp == -2) {
                    this.show_attacked();
                }
                else if (tp == -1) {
                    this.show_attack();
                }
                else {
                    this.show_open(tp);
                }
            }
        };
        card_item.prototype.re_init = function () {
            this.m_name = "";
            this.m_desc = "";
            this.m_info = "";
            this.m_card_id = 0;
            this.m_card_type = 0;
            this.m_card_shape = 0;
            this.m_card_hp = 0;
            this.m_card_atk = 0;
            this.m_card_duration = 0;
        };
        card_item.prototype.show_bk = function () {
            this.clear_img();
            this.m_frame.graphics.loadImage("card/Cardback01_minmin.png");
            this.m_frame.pivot(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            this.m_frame.width = CARD_ITEM_FRAME_W;
            this.m_frame.height = CARD_ITEM_FRAME_H;
            this.m_frame.pos(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            this.m_root.addChild(this.m_frame);
        };
        card_item.prototype.set_icon_wh = function (w, h) {
            this.m_icon.pivot(w / 2, h / 2);
            this.m_icon.width = w;
            this.m_icon.height = h;
        };
        card_item.prototype.show_frame = function (tp) {
            this.clear_img();
            this.m_root.addChild(this.m_bk);
            this.m_root.addChild(this.m_icon);
            this.m_root.addChild(this.m_frame);
            this.m_root.addChild(this.m_info_label);
            this.m_frame.pivot(CARD_ITEM_FRAMEC_W / 2, CARD_ITEM_FRAMEC_H / 2);
            this.m_frame.width = CARD_ITEM_FRAMEC_W;
            this.m_frame.height = CARD_ITEM_FRAMEC_H;
            this.m_frame.pos(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            this.m_bk.pivot(CARD_ITEM_FRAMEBK_W / 2, CARD_ITEM_FRAMEBK_H / 2);
            this.m_bk.width = CARD_ITEM_FRAMEBK_W;
            this.m_bk.height = CARD_ITEM_FRAMEBK_H;
            this.m_bk.pos(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            this.m_icon.pos(CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H / 2);
            if (tp == 1) {
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv2_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big4_min.png");
            }
            else if (tp == 2) {
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv3_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big4_min.png");
            }
            else if (tp == 3) {
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv4_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big4_min.png");
            }
            else if (tp == 4) {
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv5_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big5_min.png");
            }
            else {
                this.m_frame.graphics.loadImage("card/Frame_TeamBg_Lv1_min.png");
                this.m_bk.graphics.loadImage("card/CardBg_Big2_min.png");
            }
            this.update_draw_info();
        };
        card_item.prototype.update_draw_info = function () {
            this.m_info_label.graphics.clear();
            this.m_info_label.graphics.fillBorderText(this.m_name, CARD_ITEM_FRAME_W / 2, CARD_ITEM_FRAME_H - 40, "20px SimHei", "#ffffff", "#000000", 2, "center");
            this.m_info_label.graphics.fillBorderText(this.m_info, CARD_ITEM_FRAME_W - 40, 30, "20px SimHei", "#ffffff", "#000000", 2, "right");
            this.m_info_label.graphics.fillBorderText(this.m_info1, CARD_ITEM_FRAME_W - 40, 50, "20px SimHei", "#ffffff", "#000000", 2, "right");
        };
        card_item.prototype.clear_img = function () {
            this.m_root.removeChildren();
            this.m_frame.graphics.clear();
            this.m_bk.graphics.clear();
            this.m_info_label.graphics.clear();
        };
        card_item.prototype.del_icon = function () {
            icon_mgr.fastdel_icon(this.m_icon);
        };
        return card_item;
    }(Laya.Sprite));
    widget.card_item = card_item;
    var card_ui = /** @class */ (function (_super) {
        __extends(card_ui, _super);
        function card_ui() {
            var _this = _super.call(this, "res/atlas/card.atlas", ui.game.card_mainUI) || this;
            _this.UIins = null;
            _this.m_card_list = new Array();
            _this.m_card_max = 16;
            _this.m_card_linecnt = 4;
            _this.m_card_dx = 20;
            _this.m_card_dy = 0;
            _this.m_card_gap = 0;
            _this.m_card_w = CARD_ITEM_FRAME_W;
            _this.m_card_h = CARD_ITEM_FRAME_H;
            _this.m_card_cls_sign = "card_ui_card_item";
            _this.m_hand_id_start = 10000;
            _this.m_hand_list = new Array();
            _this.m_hand_max = 5;
            _this.m_hand_gap = 130;
            _this.m_arror_ani = null;
            _this.m_arror_start = false;
            _this.m_start_pt = new Laya.Point();
            _this.m_end_pt = new Laya.Point();
            _this.m_arror_startid = 0;
            _this.m_data_ins = null;
            _this.m_main_ins = null;
            _this.m_b_end = false;
            _this.append_extrares("res/atlas/ani_res/attack.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("game_ani/attack.ani", Laya.Loader.JSON);
            _this.m_layer = utils.WIDGET_LAYER.NORMAL;
            var ui_w = 720;
            _this.m_card_gap = (ui_w - _this.m_card_w * _this.m_card_linecnt - _this.m_card_dx * 2) / (_this.m_card_linecnt - 1);
            return _this;
        }
        card_ui.prototype.on_init = function () {
        };
        card_ui.prototype.show_head_attacked = function () {
            this.stop_head_attacked();
            this.UIins.m_head_ani.loadAnimation("game_ani/attack.ani");
            this.UIins.m_head_ani.play();
            this.UIins.addChild(this.UIins.m_head_ani);
            Laya.Tween.to(this.UIins.m_head_img, { rotation: -10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase1));
        };
        card_ui.prototype.on_showattacked_phase1 = function () {
            Laya.Tween.to(this.UIins.m_head_img, { rotation: 10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase2));
        };
        card_ui.prototype.on_showattacked_phase2 = function () {
            Laya.Tween.to(this.UIins.m_head_img, { rotation: -10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase3));
        };
        card_ui.prototype.on_showattacked_phase3 = function () {
            Laya.Tween.to(this.UIins.m_head_img, { rotation: 10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase4));
        };
        card_ui.prototype.on_showattacked_phase4 = function () {
            Laya.Tween.to(this.UIins.m_head_img, { rotation: -10 }, 30, Laya.Ease.linearIn, laya.utils.Handler.create(this, this.on_showattacked_phase5));
        };
        card_ui.prototype.on_showattacked_phase5 = function (ud) {
            if (ud === void 0) { ud = null; }
            this.stop_head_attacked();
        };
        card_ui.prototype.stop_head_attacked = function () {
            this.UIins.m_head_ani.stop();
            this.UIins.m_head_ani.removeSelf();
            Laya.Tween.clearAll(this.UIins.m_head_img);
        };
        card_ui.prototype.init_allcard = function () {
            this.clear_allcard();
            this.UIins.m_card_sp.width = 720;
            this.UIins.m_card_sp.height = 1280;
            for (var i = 0; i < this.m_card_max; ++i) {
                var citem = utils.getitembycls(this.m_card_cls_sign, card_item);
                citem.re_init();
                citem.m_parent = this;
                citem.register_event();
                this.UIins.m_card_sp.addChild(citem);
                citem.x = this.m_card_dx + (this.m_card_w + this.m_card_gap) * (i % this.m_card_linecnt);
                citem.y = this.m_card_dy + (this.m_card_h + 4) * (Math.ceil(((i + 1) / this.m_card_linecnt)) - 1);
                citem.m_id = i;
                this.m_card_list.push(citem);
                citem.clear_data();
            }
        };
        card_ui.prototype.clear_allcard = function () {
            for (var i = 0; i < this.m_card_list.length; ++i) {
                var citem = this.m_card_list[i];
                citem.clear_data();
                citem.stop_animation();
                citem.removeSelf();
                citem.m_parent = null;
                citem.unregister_event();
                citem.clear_img();
                citem.del_icon();
                utils.recover(this.m_card_cls_sign, citem);
            }
            this.m_card_list = new Array();
        };
        card_ui.prototype.init_allhand = function () {
            this.clear_allhand();
            this.UIins.m_hand_sp.width = 720;
            this.UIins.m_hand_sp.height = 200;
            for (var i = 0; i < this.m_hand_max; ++i) {
                var citem = utils.getitembycls(this.m_card_cls_sign, card_item);
                citem.re_init();
                citem.m_parent = this;
                citem.register_event();
                this.UIins.m_hand_sp.addChild(citem);
                citem.x = (this.m_hand_gap) * (i);
                citem.y = 0;
                citem.m_id = this.m_hand_id_start + i;
                this.m_hand_list.push(citem);
                citem.clear_data();
            }
        };
        card_ui.prototype.clear_allhand = function () {
            for (var i = 0; i < this.m_hand_list.length; ++i) {
                var citem = this.m_hand_list[i];
                citem.clear_data();
                citem.stop_animation();
                citem.removeSelf();
                citem.m_parent = null;
                citem.unregister_event();
                citem.clear_img();
                citem.del_icon();
                utils.recover(this.m_card_cls_sign, citem);
            }
            this.m_hand_list = new Array();
        };
        card_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.m_b_end = false;
                this.m_data_ins = data.get_data(data_enum.DATA_CARD);
                this.m_main_ins = game.get_module(module_enum.MODULE_CARD);
                this.UIins = this.m_ui;
                this.UIins.m_closebtn.on(Laya.Event.CLICK, this, this.on_click_closebtn);
                this.init_allcard();
                this.init_allhand();
                if (!this.m_arror_ani) {
                    this.m_arror_ani = new Laya.Animation();
                    this.m_arror_ani.loadAnimation("game_ani/arrow.ani");
                    this.m_arror_ani.play();
                    //this.UIins.addChild(this.m_arror_ani);
                    //this.m_arror_ani.x = 100;
                    //this.m_arror_ani.y = 200;
                }
                this.UIins.on(Laya.Event.MOUSE_DOWN, this, this.on_mousedown);
                this.UIins.on(Laya.Event.MOUSE_UP, this, this.on_mouseup);
                this.UIins.on(Laya.Event.MOUSE_MOVE, this, this.on_mousemove);
                this.UIins.m_delicon.on(Laya.Event.MOUSE_UP, this, this.on_mouseupon_del);
                this.register_event(game_event.EVENT_CARD_UPDATEHANDS, this.on_update_hands);
                this.register_event(game_event.EVENT_CARD_UPDATECARDS, this.on_udpate_cards);
                //
                this.register_event(game_event.EVENT_CARD_UPDATEDLV, this.on_updatedlv);
                this.register_event(game_event.EVENT_CARD_CARDCHANGED, this.on_cardchanged);
                this.register_event(game_event.EVENT_CARD_ATTACK, this.on_card_attack);
                this.register_event(game_event.EVENT_CARD_DELCARD, this.on_delcard);
                this.register_event(game_event.EVENT_CARD_OPENCARD, this.on_opencard);
                this.register_event(game_event.EVENT_CARD_PLAYERINFO, this.on_playerinfo);
                this.register_event(game_event.EVENT_CARD_END, this.on_end);
                //
                this.on_update_hands();
                this.on_udpate_cards();
                this.on_playerinfo();
                this.on_updatedlv();
            }
            else {
                this.m_b_end = false;
                this.m_data_ins = null;
                this.m_main_ins = null;
                this.UIins.off(Laya.Event.MOUSE_DOWN, this, this.on_mousedown);
                this.UIins.off(Laya.Event.MOUSE_UP, this, this.on_mouseup);
                this.UIins.off(Laya.Event.MOUSE_MOVE, this, this.on_mousemove);
                this.UIins.m_delicon.off(Laya.Event.MOUSE_UP, this, this.on_mouseupon_del);
                if (this.m_arror_ani) {
                    this.m_arror_ani.removeSelf();
                    this.m_arror_ani.clear();
                    this.m_arror_ani.destroy();
                    this.m_arror_ani = null;
                }
                this.stop_head_attacked();
                this.clear_allcard();
                this.clear_allhand();
                this.UIins.m_closebtn.off(Laya.Event.CLICK, this, this.on_click_closebtn);
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        card_ui.prototype.on_udpate_cards = function (ud) {
            if (ud === void 0) { ud = null; }
            var cdata = data.get_data(data_enum.DATA_CARD);
            for (var i = 0; i < this.m_card_list.length; ++i) {
                var citem = this.m_card_list[i];
                citem.clear_data();
                citem.stop_animation();
                if (i < cdata.m_cards.length) {
                    var hdata = cdata.m_cards[i];
                    if (hdata.m_id != 0) {
                        citem.update_data(hdata.m_id, hdata.m_type, hdata.m_shape, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                        var info = this._gen_card_info(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                        var info1 = this._gen_card_info1(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                        citem.update_info(hdata.m_name, hdata.m_desc, info, info1);
                    }
                }
            }
        };
        card_ui.prototype.on_update_hands = function (ud) {
            if (ud === void 0) { ud = null; }
            for (var i = 0; i < this.m_hand_list.length; ++i) {
                var citem = this.m_hand_list[i];
                citem.clear_data();
                citem.stop_animation();
            }
            var cdata = data.get_data(data_enum.DATA_CARD);
            for (var i = 0; i < cdata.m_hands.length; ++i) {
                var hdata = cdata.m_hands[i];
                if (i < this.m_hand_list.length) {
                    var citem = this.m_hand_list[i];
                    citem.update_data(hdata.m_id, hdata.m_type, hdata.m_shape, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                    var info = this._gen_card_info(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                    var info1 = this._gen_card_info1(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                    citem.update_info(hdata.m_name, hdata.m_desc, info, info1);
                }
            }
        };
        //
        card_ui.prototype.on_updatedlv = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            this.UIins.m_dlv.text = this.m_data_ins.m_dlv.toString();
            helper.show_text_tips(game.L_CARD_ENTERDLV + this.m_data_ins.m_dlv.toString() + game.L_CARD_ENTERDLV1);
        };
        card_ui.prototype._get_card_item = function (card_id) {
            var citem = null;
            for (var i = 0; i < this.m_card_list.length; ++i) {
                var titem = this.m_card_list[i];
                if (titem.m_card_id == card_id) {
                    citem = titem;
                    break;
                }
            }
            if (citem == null) {
                for (var i = 0; i < this.m_hand_list.length; ++i) {
                    var titem = this.m_hand_list[i];
                    if (titem.m_card_id == card_id) {
                        citem = titem;
                        break;
                    }
                }
            }
            return citem;
        };
        card_ui.prototype.on_cardchanged = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            var card_id = ud;
            var hdata = this.m_data_ins.get_card_data(card_id);
            var citem = this._get_card_item(card_id);
            if (citem == null) {
                core.game_errlog("on_cardchanged error!have not this card " + card_id.toString());
                return;
            }
            citem.update_data(hdata.m_id, hdata.m_type, hdata.m_shape, hdata.m_hp, hdata.m_atk, hdata.m_duration);
            var info = this._gen_card_info(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
            var info1 = this._gen_card_info1(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
            citem.update_info(hdata.m_name, hdata.m_desc, info, info1);
        };
        card_ui.prototype.on_card_attack = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            var sid = ud[0];
            var did = ud[1];
            var v = ud[2];
            if (sid != 0) {
                var citem = this._get_card_item(sid);
                if (citem != null) {
                    citem.show_attack();
                }
            }
            if (did == 0) {
                this.show_head_attacked();
            }
            else {
                var citem = this._get_card_item(did);
                if (citem != null) {
                    citem.show_attacked();
                }
            }
        };
        card_ui.prototype.on_delcard = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            var card_id = ud;
            for (var i = 0; i < this.m_card_list.length; ++i) {
                var citem = this.m_card_list[i];
                if (citem.m_card_id == card_id) {
                    citem.clear_data();
                    return;
                }
            }
        };
        card_ui.prototype.on_opencard = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            var card_id = ud;
            var hdata = this.m_data_ins.get_card_data(card_id);
            for (var i = 0; i < this.m_card_list.length; ++i) {
                var citem = this.m_card_list[i];
                if (citem.m_card_id == card_id) {
                    citem.update_data(hdata.m_id, hdata.m_type, hdata.m_shape, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                    var info = this._gen_card_info(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                    var info1 = this._gen_card_info1(hdata.m_type, hdata.m_hp, hdata.m_atk, hdata.m_duration);
                    citem.update_info(hdata.m_name, hdata.m_desc, info, info1);
                    citem.show_open(hdata.m_type);
                    return;
                }
            }
        };
        card_ui.prototype.on_playerinfo = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            var hp = this.m_data_ins.m_hp;
            var hpmax = this.m_data_ins.m_hpmax;
            var armor = this.m_data_ins.m_armor;
            var stamina = this.m_data_ins.m_stamina;
            var staminamax = this.m_data_ins.m_staminamax;
            var exp = this.m_data_ins.m_exp;
            this.UIins.m_armor.text = game.PROP_KEY_MAP["armor"] + ":" + armor.toString();
            var info = game.PROP_KEY_MAP["stam"] + ":" + stamina.toString() + "/" + staminamax.toString();
            info += "\n";
            info += game.PROP_KEY_MAP["hp"] + ":" + hp.toString() + "/" + hpmax.toString();
            this.UIins.m_info.text = info;
            this.UIins.m_dlv.text = this.m_data_ins.m_dlv.toString();
        };
        card_ui.prototype.on_end = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
            this.m_b_end = true;
            helper.show_text_tips(game.L_CARD_ENDTIPS);
        };
        //
        card_ui.prototype._gen_card_info = function (tp, hp, atk, duration) {
            var ret = "";
            if (tp == data.CARD_TYPE_MONSTER) {
                ret = game.PROP_KEY_MAP["atk"] + ":" + atk.toString();
            }
            else if (tp == data.CARD_TYPE_SWORD) {
                ret = game.PROP_KEY_MAP["atk"] + ":" + atk.toString();
            }
            else if (tp == data.CARD_TYPE_ARMOR) {
                ret = game.PROP_KEY_MAP["def"] + ":" + hp.toString();
            }
            return ret;
        };
        card_ui.prototype._gen_card_info1 = function (tp, hp, atk, duration) {
            var ret = "";
            if (tp == data.CARD_TYPE_MONSTER) {
                ret = game.PROP_KEY_MAP["hp"] + ":" + hp.toString();
            }
            else if (tp == data.CARD_TYPE_SWORD) {
                ret = game.PROP_KEY_MAP["dura"] + ":" + duration.toString();
            }
            return ret;
        };
        card_ui.prototype.show_arrow = function (sx, sy, dx, dy) {
            core.game_tiplog("show_arrow ", sx, sy, dx, dy);
            this.UIins.addChild(this.m_arror_ani);
            var distance = Math.sqrt((dx - sx) * (dx - sx) + (dy - sy) * (dy - sy));
            var tan_angle = (sy - dy) / (sx - dx);
            var angle = Math.atan2(dy - sy, dx - sx) * 180 / Math.PI;
            //angle = Math.atan(tan_angle)*180/Math.PI;
            core.game_tiplog("angle ", angle);
            var scale_v = distance / 400;
            this.m_arror_ani.scale(scale_v, 1.0);
            this.m_arror_ani.rotation = angle;
            this.m_arror_ani.x = sx + (dx - sx) / 2;
            this.m_arror_ani.y = sy + (dy - sy) / 2;
            //this.m_arror_ani.x = 100;
            //this.m_arror_ani.y = 200;
        };
        card_ui.prototype.on_mousedown = function (e) {
            //core.game_tiplog("on_mousedown ",e.stageX,e.stageY);
        };
        card_ui.prototype.on_mousemove = function (e) {
            if (!this.m_arror_start) {
                return;
            }
            //core.game_tiplog("on_mousemove ",e.stageX,e.stageY);
            this.m_end_pt.x = Laya.stage.mouseX;
            this.m_end_pt.y = Laya.stage.mouseY;
            this.m_end_pt = this.UIins.globalToLocal(this.m_end_pt);
            this.show_arrow(this.m_start_pt.x, this.m_start_pt.y, this.m_end_pt.x, this.m_end_pt.y);
        };
        card_ui.prototype.on_mouseup = function (e) {
            this.m_arror_start = false;
            //core.game_tiplog("on_mouseup ",e.target.x,e.target.y);
            this.hide_arrow();
            //helper.show_float_text_tips("12345",Laya.stage.mouseX,Laya.stage.mouseY);
        };
        card_ui.prototype.on_mouseupon_del = function (e) {
            core.game_tiplog("on_mouseupon_del ", e.target.x, e.target.y);
            if (this.m_arror_start) {
                this.m_arror_start = false;
                this.hide_arrow();
                this.m_main_ins.req_del_card(this.m_arror_startid);
            }
        };
        card_ui.prototype.on_mouseup_card = function (card_idx, card_id) {
            //core.game_tiplog("on_mouseup_card ",card_id);
            //todo
            var citem = this._get_card_item(card_id);
            if (this.m_arror_start) {
                if (card_idx < this.m_hand_id_start) {
                    this.m_main_ins.req_use_card(this.m_arror_startid, card_id);
                }
                else {
                    this.m_main_ins.req_use_card(card_id, 0);
                }
                this.m_arror_start = false;
                this.hide_arrow();
            }
            else {
                if (card_idx < this.m_hand_id_start) {
                    if (citem.m_card_shape == 0) {
                        this.m_main_ins.req_flip_card(card_id);
                    }
                    else {
                        this.m_main_ins.req_click_card(card_id);
                    }
                }
                else {
                    this.m_main_ins.req_use_card(card_id, 0);
                }
            }
        };
        card_ui.prototype.hide_arrow = function () {
            this.m_arror_ani.removeSelf();
        };
        card_ui.prototype.on_mousedown_card = function (card_idx, card_id) {
            //core.game_tiplog("on_mousedown_card ",card_id);
            if (card_idx < this.m_hand_id_start) {
                return;
            }
            this.m_start_pt.x = Laya.stage.mouseX;
            this.m_start_pt.y = Laya.stage.mouseY;
            this.m_start_pt = this.UIins.globalToLocal(this.m_start_pt);
            this.m_arror_start = true;
            this.m_arror_startid = card_id;
        };
        card_ui.prototype.on_click_closebtn = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_main_ins.req_quit();
            this.show(false);
        };
        card_ui.prototype.on_dispose = function () {
            this.m_main_ins = null;
            this.UIins = null;
            this.m_data_ins = null;
            this.stop_head_attacked();
            this.clear_allhand();
            this.clear_allcard();
        };
        card_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return card_ui;
    }(utils.game_widget));
    widget.card_ui = card_ui;
})(widget || (widget = {}));
//# sourceMappingURL=card_ui.js.map
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
// Author: 雨晨
// Date: 2018/
// Desc: 表情
var widget;
(function (widget) {
    var chat_face = /** @class */ (function (_super) {
        __extends(chat_face, _super);
        function chat_face() {
            var _this = _super.call(this, "res/atlas/emotion.atlas", ui.game.chat_faceUI) || this;
            _this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            return _this;
        }
        chat_face.prototype.on_init = function () {
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.x = (d_w - this.m_ui.width) / 2;
            this.m_ui.y = d_h - this.m_ui.height - 354;
        };
        chat_face.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
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
        };
        chat_face.prototype.on_click = function (event, index) {
            if (event.type == Laya.Event.CLICK) {
                var e_str = "#" + index.toString();
                this.fire_event_next_frame(game_event.EVENT_SELECT_EMOTION, e_str);
            }
        };
        chat_face.prototype.onRender = function (item, index) {
            var img = item.getChildByName("face");
            img.skin = this.faceArray[index].url;
        };
        chat_face.prototype.update_ui = function () {
        };
        chat_face.prototype.on_dispose = function () {
        };
        chat_face.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_face;
    }(utils.game_widget));
    widget.chat_face = chat_face;
})(widget || (widget = {}));
//# sourceMappingURL=chat_face_ui.js.map
// Author: 阿栋
// Date: 2018/01/03
// Desc: 聊天输入框
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
    var chat_input_ui = /** @class */ (function (_super) {
        __extends(chat_input_ui, _super);
        function chat_input_ui() {
            var _this = _super.call(this, "res/atlas/chat.atlas", ui.game.chat_input_uiUI) || this;
            _this.bottom_distance = 0;
            _this.is_send = false; //控制键盘点击回车发送、弹出框发送按钮发送
            _this.focus_ui = ""; //发起界面的标记量
            _this.m_layer = utils.WIDGET_LAYER.TOP;
            return _this;
        }
        chat_input_ui.prototype.on_init = function () {
            this.m_ui.width = helper.get_design_w();
            this.m_ui.bottom = 200;
        };
        chat_input_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
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
        };
        chat_input_ui.prototype.on_timer = function () {
            this.UIins.bottom = -helper.get_design_h() + helper.get_design_h() / Laya.Browser.height * this.bottom_distance;
            this.UIins.input_msg.focus = true;
        };
        chat_input_ui.prototype.init_input_text = function () {
            //let uiswitch_mgr = utils.module_ins().get_module(module_enum.MODULE_UISWITCH) as game.UIswitch_mgr;
            this.focus_ui = helper.get_focus_str();
            var msg = helper.chat_input_dict.get(this.focus_ui);
            if (msg && msg != "") {
                this.UIins.input_msg.text = msg;
            }
        };
        chat_input_ui.prototype.on_key_event = function (evt) {
            if (evt.keyCode == Laya.Keyboard.ENTER) {
                this.on_send();
            }
        };
        chat_input_ui.prototype.on_send = function () {
            this.is_send = true;
        };
        chat_input_ui.prototype.on_hidden = function () {
            var msg = this.UIins.input_msg.text;
            if (this.is_send) {
                this.fire_event_next_frame(game_event.EVENT_CHAT_INPUT_SEND, { "msg": msg });
                helper.chat_input_dict.set(this.focus_ui, "");
            }
            else {
                this.fire_event_next_frame(game_event.EVENT_CHAT_INPUT_MSG, { "msg": msg });
                helper.chat_input_dict.set(this.focus_ui, msg);
            }
            this.show(false);
        };
        chat_input_ui.prototype.on_height_change = function (ud) {
            if (ud && ud["height"] !== undefined) {
                this.bottom_distance = Number(ud["height"]);
            }
        };
        chat_input_ui.prototype.on_dispose = function () { };
        chat_input_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_input_ui;
    }(utils.game_widget));
    widget.chat_input_ui = chat_input_ui;
})(widget || (widget = {}));
//# sourceMappingURL=chat_input_ui.js.map
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
// Author: 雨晨
// Date: 2018/3/
// Desc: 世界聊天框
var widget;
(function (widget) {
    var chat_ui = /** @class */ (function (_super) {
        __extends(chat_ui, _super);
        function chat_ui() {
            var _this = _super.call(this, "res/atlas/chat.atlas", ui.game.chat_uiUI) || this;
            _this.showAll = false;
            _this.showFace = false;
            _this.curChannel = 3;
            _this.chatLine_pos = 0;
            _this.input_record = new Array();
            _this.record_index = 0;
            _this.isShowAllChat = true;
            _this.b_visible = true;
            _this.isFirstChanged = true;
            _this.bottom_pos_y = 0;
            _this.keyboard_y = 0;
            _this.append_extrares("res/atlas/emotion.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            return _this;
        }
        chat_ui.prototype.on_init = function () {
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.scale(0.5, 0.5, true);
            //this.m_ui.width = d_w;
            this.m_ui.x = 0;
            this.m_ui.y = d_h;
            fontmgr.set_ui_font(this.m_ui);
        };
        chat_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.b_visible = true;
                this.record_index = 0;
                this.input_record = [];
                this.htmlele_arr = [];
                this.UIins = this.m_ui;
                this.shrinkChatBox();
                // if (helper.is_sys_open('聊天', false)) {
                //     this.UIins.inputInfo.text = "";
                // } else {
                //     this.UIins.inputInfo.text = game.AIXIYOUAISHENGHUO;
                // }
                this.UIins.chatPanel.vScrollBar.visible = false;
                this.UIins.showBtn.on(Laya.Event.CLICK, this, this.on_change_msg_area);
                this.UIins.faceBtn.on(Laya.Event.CLICK, this, this.openFaceList);
                this.UIins.ch0.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch1.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch2.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch3.on(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.sendBtn.on(Laya.Event.CLICK, this, this.sendText);
                this.UIins.bagBtn.on(Laya.Event.CLICK, this, this.open_bag);
                this.UIins.on(Laya.Event.KEY_DOWN, this, this.onKeyEvent);
                this.UIins.inputInfo.on(Laya.Event.FOCUS, this, this.on_focus);
                this.register_event(game_event.EVENT_CHAT, this.new_chat);
                this.register_event(game_event.EVENT_SELECT_EMOTION, this.addEmotion);
                this.register_event(game_event.EVENT_CHANGE_INPUT_LIMIT, this.on_input_limit);
                this.register_event(game_event.EVENT_ENTERSCENE, this.onSceneChange);
                this.register_event(game_event.EVENT_TAB_SHOW, this.on_tab_show);
                this.register_event(game_event.EVENT_CHAT_CLEAR, this.clearAll);
                this.register_event(game_event.EVENT_CHAT_INPUT_MSG, this.on_input_msg);
                this.register_event(game_event.EVENT_CHAT_INPUT_SEND, this.on_input_send);
                this.update_ui();
                this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
            }
            else {
                this.UIins.showBtn.off(Laya.Event.CLICK, this, this.on_change_msg_area);
                this.UIins.faceBtn.off(Laya.Event.CLICK, this, this.openFaceList);
                this.UIins.ch0.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch1.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch2.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.ch3.off(Laya.Event.CLICK, this, this.selectChannel);
                this.UIins.sendBtn.off(Laya.Event.CLICK, this, this.sendText);
                this.UIins.bagBtn.off(Laya.Event.CLICK, this, this.open_bag);
                this.UIins.off(Laya.Event.KEY_DOWN, this, this.onKeyEvent);
                this.UIins.inputInfo.off(Laya.Event.FOCUS, this, this.on_focus);
                this.unregister_allevent();
                this.UIins.chatPanel.removeChildren();
                this.UIins = null;
                this.chatLine_pos = 0;
                this.input_record = [];
                this.record_index = 0;
                this.htmlele_arr = [];
                Laya.Pool.clearBySign('chatLine');
            }
        };
        chat_ui.prototype.update_ui = function () {
            var c_data = data.get_data(data_enum.DATA_CHAT);
            var chat_arr = c_data.get_all_chat();
            this.new_chat(chat_arr);
            this.UIins.input_bg.visible = false;
            this.UIins.input_gray_bg.visible = false;
        };
        chat_ui.prototype.new_chat = function (chat_arr) {
            var _this = this;
            chat_arr.forEach(function (element) {
                var ch = element['ch'];
                var pid = element['pid'];
                var shape = element['shape'];
                var vip = element['vip'];
                var name = element['name'];
                var msg = element['msg'];
                var svrid = element['svrid'];
                // let chatline = new ChatLine();
                var chatline = Laya.Pool.getItemByClass('chatLine', ChatLine);
                chatline.init(ch, pid, shape, vip, name, msg, svrid);
                _this.htmlele_arr.push(chatline);
                chatline.y = _this.chatLine_pos;
                if (_this.curChannel == element['ch'] || _this.isShowAllChat == true) {
                    _this.chatLine_pos += chatline.height;
                    _this.UIins.chatPanel.addChild(chatline);
                    _this.UIins.chatPanel.vScrollBar.max = _this.UIins.chatPanel.contentHeight;
                    Laya.Tween.to(_this.UIins.chatPanel.vScrollBar, { value: _this.UIins.chatPanel.vScrollBar.max }, 300);
                }
                if (_this.htmlele_arr.length >= 80) {
                    _this.htmlele_arr.splice(0, 50);
                    _this.resetPanelInfo();
                }
            });
            var c_data = data.get_data(data_enum.DATA_CHAT);
            c_data.clear_new_chat();
        };
        chat_ui.prototype.disable_ch_color = function (prev_ch) {
            if (prev_ch == 2) { //帮派
                this.UIins.ch2_bg.skin = "chat/Tag2.png";
                this.UIins.ch2_title.skin = "chat/bangpai2.png";
            }
            else if (prev_ch == 3) {
                if (this.isShowAllChat) { //综合
                    this.UIins.ch0_bg.skin = "chat/Tag2.png";
                    this.UIins.ch0_title.skin = "chat/zonghe2.png";
                }
                else { //世界
                    this.UIins.ch1_bg.skin = "chat/Tag2.png";
                    this.UIins.ch1_title.skin = "chat/shijie2.png";
                }
            }
            else if (prev_ch == 4) { //跨服
                this.UIins.ch3_bg.skin = "chat/Tag2.png";
                this.UIins.ch3_title.skin = "chat/kuafu2.png";
            }
        };
        chat_ui.prototype.able_ch_color = function () {
            if (this.curChannel == 2) {
                this.UIins.ch2_bg.skin = "chat/Tag1.png";
                this.UIins.ch2_title.skin = "chat/bangpai1.png";
            }
            else if (this.curChannel == 3) {
                if (this.isShowAllChat) {
                    this.UIins.ch0_bg.skin = "chat/Tag1.png";
                    this.UIins.ch0_title.skin = "chat/zonghe1.png";
                }
                else {
                    this.UIins.ch1_bg.skin = "chat/Tag1.png";
                    this.UIins.ch1_title.skin = "chat/shijie1.png";
                }
            }
            else if (this.curChannel == 4) {
                this.UIins.ch3_bg.skin = "chat/Tag1.png";
                this.UIins.ch3_title.skin = "chat/kuafu1.png";
            }
        };
        chat_ui.prototype.selectChannel = function (e) {
            helper.play_sound("sound/mousedown_btn.wav");
            var target = e.target;
            switch (target.name) {
                case "ch0":
                    if (this.isShowAllChat) {
                        return;
                    }
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = true; //综合
                    this.curChannel = 3;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                case "ch1":
                    if (this.isShowAllChat) {
                        this.disable_ch_color(this.curChannel);
                        this.isShowAllChat = false;
                        this.curChannel = 3;
                        this.able_ch_color();
                        this.resetPanelInfo();
                    }
                    else {
                        if (this.curChannel == 3)
                            return;
                        this.disable_ch_color(this.curChannel);
                        this.curChannel = 3; //世界
                        this.able_ch_color();
                        this.resetPanelInfo();
                    }
                    break;
                case "ch2":
                    if (this.curChannel == 2)
                        return; //帮派
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = false;
                    this.curChannel = 2;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                case "ch3":
                    if (this.curChannel == 4)
                        return; //跨服
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = false;
                    this.curChannel = 4;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    break;
                default:
                    break;
            }
        };
        chat_ui.prototype.clearAll = function () {
            if (this.UIins != null) {
                this.UIins.chatPanel.removeChildren();
                this.chatLine_pos = 0;
            }
        };
        chat_ui.prototype.resetPanelInfo = function () {
            var _this = this;
            var arr = this.UIins.chatPanel._childs[0]._childs;
            this.UIins.chatPanel.removeChildren();
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var ele = arr_1[_i];
                Laya.Pool.recover('chatLine', ele);
            }
            this.chatLine_pos = 0;
            var cur_ch_chat_arr = this.get_cur_ch_chat();
            cur_ch_chat_arr.forEach(function (element) {
                element.y = _this.chatLine_pos;
                _this.chatLine_pos += element.height;
                _this.UIins.chatPanel.addChild(element);
            });
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
        };
        chat_ui.prototype.get_cur_ch_chat = function () {
            var _this = this;
            var cur_ch_chat_arr = [];
            this.htmlele_arr.forEach(function (element) {
                if (_this.isShowAllChat) {
                    cur_ch_chat_arr.push(element);
                }
                else {
                    if (_this.curChannel == element.channel) {
                        cur_ch_chat_arr.push(element);
                    }
                }
            });
            return cur_ch_chat_arr;
        };
        // private get_cur_ch_chat(): Array<Object> {
        //     let cur_ch_chat_arr: Array<Object> = [];
        //     let c_data: data.channel_data = data.get_data(data_enum.DATA_CHAT) as data.channel_data;
        //     let all_chat: Array<Object> = c_data.get_all_chat();
        //     all_chat.forEach(element => {
        //         if (this.isShowAllChat) {
        //             cur_ch_chat_arr.push(element);
        //         }
        //         else {
        //             if (this.curChannel == element['ch']) {
        //                 cur_ch_chat_arr.push(element);
        //             }
        //         }
        //     });
        //     return cur_ch_chat_arr;
        // }
        chat_ui.prototype.sendText = function () {
            var msg = this.UIins.inputInfo.text;
            if (!msg)
                return;
            this.input_record.push(msg);
            if (this.input_record.length > 50) {
                this.input_record.shift();
            }
            this.record_index = this.input_record.length;
            if (msg[0] == "$") {
                net.net_ins().send(protocol_def.C2S_CHAT_GM, { "msg": msg });
                this.UIins.inputInfo.text = "";
            }
            else if (msg.length >= 5 && !!msg.match(/^&test/)) {
                var data_arr = void 0;
                data_arr = msg.split(" ");
                data_arr.shift();
                helper.do_test(data_arr);
                this.UIins.inputInfo.text = "";
            }
            else {
                if (helper.is_sys_open('聊天', true)) {
                    var channel = this.curChannel;
                    if (channel == base.CHANNEL_GANG) {
                        if (helper.is_join_gang() == false) {
                            helper.show_text_tips(game.L_GANGNO);
                        }
                        else {
                            net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": helper.trans_info(msg) });
                        }
                    }
                    net.net_ins().send(protocol_def.C2S_CHAT, { "ch": channel, "msg": helper.trans_info(msg) });
                    this.UIins.inputInfo.text = "";
                }
                else {
                    this.UIins.inputInfo.text = "";
                }
            }
            if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_CHAT_FACE)) {
                utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_FACE, false);
                this.showFace = false;
            }
            helper.play_sound("sound/mousedown_btn.wav");
            helper.chat_input_dict.set(helper.main_chat, "");
        };
        chat_ui.prototype.open_bag = function (us) {
            if (us === void 0) { us = null; }
            //if (utils.widget_ins().is_widget_show(widget_enum.WIDGET_BAG_UI) == false)
            //    utils.widget_ins().show_widget(widget_enum.WIDGET_BAG_UI, true);
            //else
            //    utils.widget_ins().show_widget(widget_enum.WIDGET_BAG_UI, false);
            helper.play_sound("sound/mousedown_btn.wav");
        };
        chat_ui.prototype.addEmotion = function (e_str) {
            this.UIins.inputInfo.text += e_str;
            helper.chat_input_dict.set(helper.main_chat, this.UIins.inputInfo.text);
        };
        chat_ui.prototype.onSceneChange = function (ud) {
            if (ud === void 0) { ud = null; }
            if (helper.is_wlmz_scene()) { //显示综合频道，无法切换至其它频道
                this.UIins.ch0.mouseEnabled = false;
                this.UIins.ch1.mouseEnabled = false;
                this.UIins.ch2.mouseEnabled = false;
                this.UIins.ch3.mouseEnabled = false;
                if (!this.isShowAllChat) {
                    this.disable_ch_color(this.curChannel);
                    this.isShowAllChat = true; //综合
                    this.curChannel = 3;
                    this.able_ch_color();
                    this.resetPanelInfo();
                    if (this.UIins.height == 585) {
                        this.UIins.ch1.y = 242;
                        this.UIins.ch1.visible = true;
                        this.UIins.ch2.visible = false;
                        this.UIins.ch3.visible = false;
                    }
                }
            }
            else if (helper.is_guaji_scene()) {
                this.UIins.ch0.mouseEnabled = true;
                this.UIins.ch1.mouseEnabled = true;
                this.UIins.ch2.mouseEnabled = true;
                this.UIins.ch3.mouseEnabled = true;
            }
        };
        chat_ui.prototype.openFaceList = function () {
            this.showFace = !this.showFace;
            utils.widget_ins().show_widget(widget_enum.WIDGET_CHAT_FACE, this.showFace);
            helper.play_sound("sound/mousedown_btn.wav");
        };
        chat_ui.prototype.on_change_msg_area = function () {
            this.showAll = !this.showAll;
            if (this.showAll) {
                this.blowUpChatBox();
            }
            else {
                this.shrinkChatBox();
            }
            helper.play_sound("sound/mousedown_btn.wav");
        };
        chat_ui.prototype.on_tab_show = function (ud) {
            if (ud === void 0) { ud = null; }
            var b_visible = !ud["flag"];
            if (this.b_visible != b_visible) {
                this.m_ui.visible = b_visible;
                this.b_visible = b_visible;
            }
        };
        chat_ui.prototype.blowUpChatBox = function () {
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
            this.UIins.height = 956;
            this.UIins.showBtn.y = -10;
            this.UIins.showBtn.skin = "chat/arrowBtn1.png";
            this.UIins.chatPanel.y = 84;
            this.UIins.chatPanel.height = 714;
            this.UIins.ch0.y = 45;
            this.UIins.ch1.y = 234;
            this.UIins.ch2.y = 424;
            this.UIins.ch3.y = 615;
            this.UIins.bagBtn.y = this.UIins.red_bag.y = this.UIins.bottom_box.y = this.UIins.input_box.y = this.m_ui.height - this.UIins.bottom_box.height;
            this.bottom_pos_y = this.UIins.bottom_box.y;
            this.UIins.chatBg.y = this.UIins.bottom_box.y - 2;
            this.UIins.chatBg.height = 793;
            this.keyboard_y = 970 + helper.TOPBAR_HEIGHT;
            this.UIins.ch0.visible = true;
            this.UIins.ch1.visible = true;
            this.UIins.ch2.visible = true;
            this.UIins.ch3.visible = true;
            this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
        };
        chat_ui.prototype.shrinkChatBox = function () {
            this.UIins.chatPanel.vScrollBar.max = this.UIins.chatPanel.contentHeight;
            this.UIins.chatPanel.vScrollBar.value = this.UIins.chatPanel.vScrollBar.max;
            this.UIins.height = 585;
            this.UIins.showBtn.y = -10;
            this.UIins.showBtn.skin = "chat/arrowBtn0.png";
            this.UIins.chatPanel.y = 84;
            this.UIins.chatPanel.height = 328;
            this.UIins.bagBtn.y = this.UIins.red_bag.y = this.UIins.bottom_box.y = this.UIins.input_box.y = this.m_ui.height - this.UIins.bottom_box.height;
            this.bottom_pos_y = this.UIins.bottom_box.y;
            this.UIins.chatBg.y = this.UIins.bottom_box.y - 2;
            this.UIins.chatBg.height = 412;
            this.keyboard_y = 589 + helper.TOPBAR_HEIGHT;
            this.UIins.ch0.y = 51;
            // this.UIins.ch1.y = 242;
            // this.UIins.ch2.y = -328;
            // this.UIins.ch3.y = -193;
            if (this.curChannel == 3 && this.isShowAllChat) { //综合
                this.UIins.ch1.y = 242;
                this.UIins.ch2.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 3 && !this.isShowAllChat) { //世界
                this.UIins.ch1.y = 242;
                this.UIins.ch2.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 2) { //帮派
                this.UIins.ch2.y = 242;
                this.UIins.ch1.visible = false;
                this.UIins.ch3.visible = false;
            }
            else if (this.curChannel == 4) { //跨服
                this.UIins.ch3.y = 242;
                this.UIins.ch1.visible = false;
                this.UIins.ch2.visible = false;
            }
            this.fire_event_next_frame(game_event.EVENT_CHATWND_SIZE, this.UIins.y + this.UIins.showBtn.y - this.UIins.height);
        };
        chat_ui.prototype.onKeyEvent = function (e) {
            if (e["keyCode"] == Laya.Keyboard.ENTER) {
                this.sendText();
            }
            else if (e["keyCode"] == Laya.Keyboard.UP) {
                if (this.record_index > 0) {
                    this.record_index--;
                }
                if (this.input_record[this.record_index]) {
                    this.UIins.inputInfo.text = this.input_record[this.record_index];
                }
            }
            else if (e["keyCode"] == Laya.Keyboard.DOWN) {
                if (this.record_index < this.input_record.length - 1) {
                    this.record_index++;
                }
                if (this.input_record[this.record_index]) {
                    this.UIins.inputInfo.text = this.input_record[this.record_index];
                }
            }
        };
        chat_ui.prototype.on_focus = function () {
            helper.set_focus_str(helper.main_chat);
        };
        chat_ui.prototype.on_input_limit = function (ud) {
            if (ud === void 0) { ud = null; }
            this.UIins.inputInfo.maxChars = 500;
            helper.show_text_tips(game.L_CHAR_LIMIT_CHANGED);
            this.UIins.inputInfo.focus = false;
        };
        chat_ui.prototype.on_input_msg = function (ud) {
            var focus_str = helper.get_focus_str();
            if (focus_str == helper.main_chat) {
                this.UIins.inputInfo.text = ud["msg"];
                helper.clear_focus_str();
            }
        };
        chat_ui.prototype.on_input_send = function (ud) {
            var focus_str = helper.get_focus_str();
            if (focus_str == helper.main_chat) {
                this.UIins.inputInfo.text = ud["msg"];
                this.sendText();
                helper.clear_focus_str();
            }
        };
        chat_ui.prototype.on_dispose = function () {
        };
        chat_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return chat_ui;
    }(utils.game_widget));
    widget.chat_ui = chat_ui;
})(widget || (widget = {}));
var ChatLine = /** @class */ (function (_super) {
    __extends(ChatLine, _super);
    function ChatLine() {
        var _this = _super.call(this) || this;
        _this.textField = new Laya.HTMLDivElement();
        _this.addChild(_this.textField);
        //监听用户名点击事件
        _this.textField.on(Laya.Event.LINK, _this, _this.on_click_link);
        return _this;
    }
    ChatLine.prototype.get_channel_prefix = function (channel) {
        switch (channel) {
            case base.CHANNEL_WORLD:
                return '【' + game.L_SHIJIE + '】';
            case base.CHANNEL_GANG:
                return '【' + game.L_BANGPAI + '】';
            case base.CHANNEL_ACROSSSVR:
                return '【' + game.L_KUAFU + '】';
            case base.CHANNEL_INFO:
                return '【' + game.L_XITONG + '】';
            case base.CHANNEL_SYS:
                return '【' + game.L_XITONG + '】';
            case base.CHANNEL_RECRUIT:
                return '【' + game.L_XITONG + '】';
            default:
                break;
        }
        return 'unknown';
    };
    ChatLine.prototype.get_channel_color = function (channel) {
        switch (channel) {
            case base.CHANNEL_WORLD:
                return base.FORMAT_COLOR["#C14&"];
            case base.CHANNEL_GANG:
                return base.FORMAT_COLOR["#C18&"];
            case base.CHANNEL_ACROSSSVR:
                return base.FORMAT_COLOR["#C12&"];
            case base.CHANNEL_SYS:
                return base.FORMAT_COLOR["#C15&"];
            case base.CHANNEL_RECRUIT:
                return base.FORMAT_COLOR["#C15&"];
            default:
                break;
        }
        return base.FORMAT_COLOR["#C5&"];
    };
    ChatLine.prototype.get_name_color = function (sex) {
        switch (sex) {
            case 1:
                return base.FORMAT_COLOR["#C12&"];
            case 2:
                return base.FORMAT_COLOR["#C13&"];
            default:
                break;
        }
        return base.FORMAT_COLOR["#C12&"];
    };
    ChatLine.prototype.init = function (channel, userID, shape, vipLevel, userName, msg_str, svrId) {
        this.channel = channel;
        var fontsize = "44";
        this.pos(0, 0);
        // let textField: Laya.HTMLDivElement = new Laya.HTMLDivElement();
        this.textField.width = 1276;
        this.textField.style.color = this.get_channel_color(channel);
        this.textField.style.valign = "middle";
        this.textField.style.leading = 10;
        this.textField.style.letterSpacing = 2;
        this.textField.style.font = "44px h5font";
        var chInfo = this.get_channel_prefix(channel);
        var chat_data = data.get_data(data_enum.DATA_CHAT);
        if (channel == base.CHANNEL_ACROSSSVR) {
            var str = chat_data.get_svr_name(svrId);
            if (str)
                chInfo = '【' + str + '】';
        }
        var ch_color = this.get_channel_color(channel);
        var channelHTML = helper.createSpanTag(ch_color, fontsize) + chInfo + '</span>';
        var userData = userName + "," + base.HYPERLINK_TYPE.TYPE_OPEN_PLAYER_INFO + "," + userID + "," + shape;
        var nameHTML = "";
        if (userName) {
            var sex = helper.get_sex(shape);
            var name_color = this.get_name_color(sex);
            nameHTML = helper.createLinkTag(name_color, fontsize, userData, userName) + ':</span>';
        }
        var vipHTML = "";
        // if (this.channel != 6) {
        //     vipHTML = helper.createImgTag(helper.get_VIP_numSkin(vipLevel)) + ": ";
        // }
        var msgHTML = helper.analysisMsgStr(msg_str, ch_color, fontsize);
        var totalInfoHTML = channelHTML + nameHTML + vipHTML + msgHTML;
        try {
            this.textField.innerHTML = totalInfoHTML;
        }
        catch (error) {
            core.game_tiplog("异常，含有特殊字符");
            return;
        }
        // this.addChild(this.textField);
        this.height = this.textField.contextHeight + 10;
    };
    ChatLine.prototype.on_click_link = function (data) {
        var index = 0;
        var data_arr = new Array();
        var tempArr = data.split(",");
        for (var _i = 0, tempArr_1 = tempArr; _i < tempArr_1.length; _i++) {
            var str = tempArr_1[_i];
            if (index == 0)
                data_arr.push(str);
            else
                data_arr.push(parseInt(str));
            index += 1;
        }
        //let channel = utils.module_ins().get_module(module_enum.MODULE_CHANNEL) as game.channel;
        //channel.chat_hyperlink({ "text": data_arr[0], "hyperlink_type": data_arr[1], "u1": data_arr[2], "u2": data_arr[3], "u3": data_arr[4] })
        // helper.hyperlink_handle(data_arr[0], data_arr[1], data_arr[2], data_arr[3], data_arr[4]);
    };
    return ChatLine;
}(Laya.Box));
//# sourceMappingURL=chat_ui.js.map
// Author: bingoo
// Date: 2018/08/23
// Desc: 战斗中boss血量与伤害排行widget
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
    var combat_boss_hp_ui = /** @class */ (function (_super) {
        __extends(combat_boss_hp_ui, _super);
        function combat_boss_hp_ui() {
            var _this = _super.call(this, "res/atlas/boss_hp.atlas", ui.game.combat_boss_hpUI) || this;
            _this.start_hp = 0;
            _this.total_hp = 0;
            _this.my_dmg = 0;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_boss_hp_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
            var designwh = helper.get_design_wh();
            var d_h = designwh['h'];
            this.m_ui.x = 0;
            this.m_ui.y = d_h - 1330;
        };
        combat_boss_hp_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_COMBATPLAYERATTACK, this.update_damage);
                this.update_ui();
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        combat_boss_hp_ui.prototype.update_ui = function () {
            var data_ins = helper.get_transfer_data("common_boss_hp_data");
            helper.remove_transfer_data("common_boss_hp_data");
            if (data_ins != null) {
                this.my_dmg = data_ins["my_dmg"];
                this.start_hp = data_ins["start_hp"];
                this.total_hp = data_ins["total_hp"];
                var my_rank = data_ins["myrank"];
                if (my_rank < 0) {
                    this.UIins.lab_myrank.text = "";
                }
                else {
                    my_rank += 1; // 服务器发的我的排名是从0开始
                    this.UIins.lab_myrank.text = my_rank.toString();
                }
                this.UIins.lab_myname.text = helper.mine().m_name;
                this.UIins.lab_mydmg.text = this.my_dmg.toString();
                this.UIins.pgbar.value = this.start_hp / this.total_hp;
                this.UIins.lab_hp.text = this.start_hp.toString() + "/" + this.total_hp.toString();
                this.set_rank(data_ins["rank_arr"]);
            }
        };
        combat_boss_hp_ui.prototype.set_rank = function (rank_arr) {
            for (var i = 0; i < 5; i++) {
                var lab_rank = this.get_con("lab_r" + i.toString());
                var lab_name = this.get_con("lab_name" + i.toString());
                var lab_dmg = this.get_con("lab_d" + i.toString());
                if (i < rank_arr.length) {
                    var rank_info = rank_arr[i];
                    lab_rank.text = (i + 1).toString();
                    lab_name.text = rank_info[1];
                    lab_dmg.text = rank_info[2].toString();
                    lab_rank.visible = lab_name.visible = lab_dmg.visible = true;
                }
                else {
                    lab_rank.visible = lab_name.visible = lab_dmg.visible = false;
                }
            }
        };
        combat_boss_hp_ui.prototype.update_damage = function (atk_status) {
            if (atk_status === void 0) { atk_status = null; }
            if (atk_status != null && atk_status.id == base.WARPOS_LEFTLEADER) {
                var damage = atk_status.damage;
                this.my_dmg += damage;
                this.UIins.lab_mydmg.text = this.my_dmg.toString();
                this.start_hp -= damage;
                if (this.start_hp < 0) {
                    this.start_hp = 0;
                }
                this.UIins.pgbar.value = this.start_hp / this.total_hp;
                this.UIins.lab_hp.text = this.start_hp.toString() + "/" + this.total_hp.toString();
            }
        };
        combat_boss_hp_ui.prototype.on_dispose = function () {
        };
        combat_boss_hp_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_boss_hp_ui;
    }(utils.game_widget));
    widget.combat_boss_hp_ui = combat_boss_hp_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_boss_hp.js.map
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
    var combat_enter_ui = /** @class */ (function (_super) {
        __extends(combat_enter_ui, _super);
        function combat_enter_ui() {
            var _this = _super.call(this, "res/atlas/ui.atlas", ui.game.combat_enterUI) || this;
            _this.m_sp_top = null;
            _this.m_sp_bottom = null;
            _this.m_htmlcavas = null;
            _this.m_htmltexture = null;
            _this.m_layer = utils.WIDGET_LAYER.TOP;
            return _this;
        }
        combat_enter_ui.prototype.on_init = function () {
            this.m_sp_top = new Laya.Sprite();
            this.m_sp_bottom = new Laya.Sprite();
            this.m_ui.addChild(this.m_sp_top);
            this.m_ui.addChild(this.m_sp_bottom);
        };
        combat_enter_ui.prototype._init_sp = function () {
            if (this.m_sp_top == null) {
                this.m_sp_top = new Laya.Sprite();
                this.m_ui.addChild(this.m_sp_top);
            }
            if (this.m_sp_bottom == null) {
                this.m_sp_bottom = new Laya.Sprite();
                this.m_ui.addChild(this.m_sp_bottom);
            }
            if (this.m_htmlcavas != null) {
                this.m_htmlcavas.destroy();
                this.m_htmltexture.destroy(true);
                this.m_htmlcavas = null;
                this.m_htmltexture = null;
            }
        };
        combat_enter_ui.prototype._clear_sp = function () {
            this.m_ui.removeChildren();
            if (this.m_sp_top != null) {
                Laya.Tween.clearAll(this.m_sp_top);
                this.m_sp_top.graphics.clear();
                this.m_sp_top.destroy(true);
            }
            if (this.m_sp_bottom != null) {
                Laya.Tween.clearAll(this.m_sp_bottom);
                this.m_sp_bottom.graphics.clear();
                this.m_sp_bottom.destroy(true);
            }
            this.m_sp_top = null;
            this.m_sp_bottom = null;
            if (this.m_htmlcavas != null) {
                this.m_htmlcavas.clear();
                this.m_htmlcavas.releaseResource(true); //important func
                this.m_htmlcavas.destroy();
                this.m_htmltexture.destroy(true);
                this.m_htmlcavas = null;
                this.m_htmltexture = null;
            }
        };
        combat_enter_ui.prototype.on_show = function (flag) {
            if (flag) {
                this._init_sp();
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                var main_ins = game.get_module(module_enum.MODULE_MAIN);
                var render = main_ins.get_render();
                var hc = null; //main_ins.get_scene_screen();
                var uiins = this.m_ui;
                var tx = new Laya.Texture(hc);
                this.m_htmlcavas = hc;
                this.m_htmltexture = tx;
                var sd_wh = helper.get_design_wh();
                var sd_w = sd_wh['w'];
                var sd_h = sd_wh['h'];
                var designwh = helper.get_design_wh();
                var designw = designwh['w'];
                var designh = designwh['h'];
                this.m_sp_top.graphics.drawRect(0, 0, designw, designh / 2, "#000000");
                this.m_sp_bottom.graphics.drawRect(0, 0, designw, designh / 2, "#000000");
                this.m_sp_top.graphics.fillTexture(tx, 0, 0, designw, designh / 2, "no-repeat", new Laya.Point(0, 0));
                this.m_sp_bottom.graphics.fillTexture(tx, 0, 0, designw, designh / 2, "no-repeat", new Laya.Point(0, designh / 2));
                this.m_sp_top.x = 0;
                this.m_sp_bottom.x = 0;
                this.m_sp_top.y = 0;
                this.m_sp_bottom.y = designh / 2;
                Laya.Tween.to(this.m_sp_top, { x: -designw }, 800, Laya.Ease.linearIn, Laya.Handler.create(this, this.show, [false]));
                Laya.Tween.to(this.m_sp_bottom, { x: designw }, 800, Laya.Ease.linearIn);
            }
            else {
                this.unregister_allevent();
                this._clear_sp();
            }
        };
        combat_enter_ui.prototype.on_dispose = function () {
            if (this.m_sp_top != null) {
                Laya.Tween.clearAll(this.m_sp_top);
                this.m_sp_top.graphics.clear();
                this.m_sp_top = null;
            }
            if (this.m_sp_bottom != null) {
                Laya.Tween.clearAll(this.m_sp_bottom);
                this.m_sp_bottom.graphics.clear();
                this.m_sp_bottom = null;
            }
        };
        combat_enter_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_enter_ui;
    }(utils.game_widget));
    widget.combat_enter_ui = combat_enter_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_enter_ui.js.map
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
    var combat_loading_ui = /** @class */ (function (_super) {
        __extends(combat_loading_ui, _super);
        function combat_loading_ui() {
            var _this = _super.call(this, "res/atlas/loading.atlas", ui.game.combat_loadingUI) || this;
            _this.m_bk_rect = new Laya.Sprite();
            _this.m_uiins = null;
            _this.append_extrares("bigpic/scene_loading.jpg", Laya.Loader.IMAGE);
            _this.m_layer = utils.WIDGET_LAYER.BACKGROUND;
            _this.m_bk_rect.graphics.drawRect(0, 0, 2000, 3000, '#000000');
            return _this;
            //this.m_bk_rect.alpha = 0.5;
        }
        combat_loading_ui.prototype.on_init = function () {
            this.m_uiins = this.m_ui;
            var width = helper.get_design_w();
            var height = helper.get_design_h();
            var ratio = width / height;
            var scaleX = width / this.m_uiins.width;
            var scaleY = height / this.m_uiins.height;
            var scale = scaleX > scaleY ? scaleX : scaleY;
            this.m_uiins.m_bk.scale(scale, scale);
            this.m_uiins.width = width;
            this.m_uiins.height = height;
            fontmgr.set_ui_style(this.m_ui, fontmgr.FONTSTYLE_ENUM.FONT_WHTIE);
            fontmgr.set_lable(this.m_uiins.m_info, fontmgr.FONTSTYLE_ENUM.FONT_WHTIE);
        };
        combat_loading_ui.prototype.init_event = function () {
            this.register_event(game_event.EVENT_COMBATLOADINGUI_PROGRESS, this.on_progress_event);
        };
        combat_loading_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                this.init_event();
                this.set_progress(0);
                this.m_ui.addChildAt(this.m_bk_rect, 0);
                this.m_ui.hitArea = new Laya.Rectangle(-100, -100, 2000, 3000);
                var b_first_enter = helper.get_local("first_enter_game");
                if (!b_first_enter) {
                    helper.set_local("first_enter_game", "1");
                    this.m_uiins.img_vip.visible = true;
                }
                else {
                    this.m_uiins.img_vip.visible = false;
                }
            }
            else {
                this.unregister_allevent();
            }
        };
        combat_loading_ui.prototype.set_progress = function (v) {
            var m_progress = this.m_uiins.m_progress1;
            var m_progresslight = this.m_uiins.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width - 70) * m_progress.value + 30;
            this.m_uiins.m_info.text = Math.floor(v * 100).toString() + "%";
        };
        combat_loading_ui.prototype.on_progress_event = function (ud) {
            if (ud === void 0) { ud = null; }
            this.set_progress(ud);
        };
        combat_loading_ui.prototype.on_dispose = function () {
        };
        combat_loading_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_loading_ui;
    }(utils.game_widget));
    widget.combat_loading_ui = combat_loading_ui;
    var game_loading_ui = /** @class */ (function (_super) {
        __extends(game_loading_ui, _super);
        function game_loading_ui() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        game_loading_ui.prototype.init_event = function () {
            this.register_event(game_event.EVENT_GAMELOADINGUI_PROGRESS, this.on_progress_event);
        };
        return game_loading_ui;
    }(combat_loading_ui));
    widget.game_loading_ui = game_loading_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_loading_ui.js.map
// Author: bingoo
// Date: 2018/07/04
// Desc: 战斗回合数和回合描述
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
    // 回合数
    var combat_round_ui = /** @class */ (function (_super) {
        __extends(combat_round_ui, _super);
        function combat_round_ui() {
            var _this = _super.call(this, "res/atlas/combat_round.atlas", ui.game.combat_round_uiUI) || this;
            _this.round = 1;
            _this.round_max = 0;
            _this.b_con_show = false;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_round_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.x = (d_w - 330) / 2;
            this.m_ui.y = 375 + helper.TOPBAR_HEIGHT;
        };
        combat_round_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.update_ui);
                var combatui = game.get_module(module_enum.MODULE_COMBATUI);
                var info_arr = combatui.get_cur_war_info();
                this.round_max = info_arr[3];
                this.show_con(false);
            }
            else {
                this.unregister_event(game_event.EVENT_COMBATTURNSCHANGE);
                this.UIins = null;
            }
        };
        combat_round_ui.prototype.update_ui = function (ud) {
            if (ud === void 0) { ud = null; }
            this.round = ud;
            if (this.round > 0 && this.round_max > 0) {
                if (this.round > 99) {
                    this.round = 99;
                }
                if (this.round_max > 99) {
                    this.round_max = 99;
                }
                if (!this.b_con_show) {
                    this.show_con(true);
                }
                // 当前回合
                var img_num = void 0;
                img_num = this.get_con("img_cur0");
                if (this.round >= 10) {
                    img_num.skin = "combat_round/" + Math.floor(this.round / 10).toString() + ".png";
                    img_num.visible = true;
                }
                else {
                    img_num.visible = false;
                }
                img_num = this.get_con("img_cur1");
                img_num.skin = "combat_round/" + Math.floor(this.round % 10).toString() + ".png";
                // 总回合
                if (this.round_max >= 10) {
                    img_num = this.get_con("img_ttl0");
                    img_num.skin = "combat_round/" + Math.floor(this.round_max / 10).toString() + ".png";
                    img_num.visible = true;
                    img_num = this.get_con("img_ttl1");
                    img_num.skin = "combat_round/" + Math.floor(this.round_max % 10).toString() + ".png";
                }
                else {
                    img_num = this.get_con("img_ttl0");
                    img_num.skin = "combat_round/" + Math.floor(this.round_max % 10).toString() + ".png";
                    img_num = this.get_con("img_ttl1");
                    img_num.visible = false;
                }
            }
        };
        combat_round_ui.prototype.show_con = function (flag) {
            this.b_con_show = flag;
            this.UIins.img_bk.visible = flag;
            this.UIins.img_cur0.visible = flag;
            this.UIins.img_cur1.visible = flag;
            this.UIins.img_line.visible = flag;
            this.UIins.img_ttl0.visible = flag;
            this.UIins.img_ttl1.visible = flag;
        };
        combat_round_ui.prototype.on_dispose = function () {
        };
        combat_round_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_round_ui;
    }(utils.game_widget));
    widget.combat_round_ui = combat_round_ui;
    // 回合描述
    var combat_roundDetail_ui = /** @class */ (function (_super) {
        __extends(combat_roundDetail_ui, _super);
        function combat_roundDetail_ui() {
            var _this = _super.call(this, "res/atlas/combat_roundDetail.atlas", ui.game.combat_roundDetail_uiUI) || this;
            _this.show_type = 0; //1:简单文本描述，2：进度读条
            _this.war_type = 0;
            _this.war_subType = 0;
            // private war_id:number = 0;
            _this.round = 1;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_roundDetail_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
        };
        combat_roundDetail_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_COMBATTURNSCHANGE, this.on_round_changed);
                var combatui = game.get_module(module_enum.MODULE_COMBATUI);
                var info_arr = combatui.get_cur_war_info();
                this.war_type = info_arr[0];
                this.war_subType = info_arr[1];
                // this.war_id = info_arr[2];
                this.init_ui();
            }
            else {
                this.unregister_event(game_event.EVENT_COMBATTURNSCHANGE);
                this.show_type = 0;
                this.war_type = 0;
                this.war_subType = 0;
                this.round = 0;
                this.UIins = null;
            }
        };
        combat_roundDetail_ui.prototype.init_ui = function () {
            var cfg = config.Cli_round_detail_cfg.get_Cli_round_detail_cfg(this.war_subType);
            if (cfg) {
                this.show_type = cfg["descType"];
                if (this.show_type == 1) {
                    this.UIins.sp1_title.text = cfg["title"];
                    this.UIins.sp1_lab_content.text = cfg["desc"];
                    var designwh = helper.get_design_wh();
                    var d_w = designwh['w'];
                    // let d_h: number = designwh['h'];
                    this.m_ui.x = d_w - 516;
                    this.m_ui.y = 100 + helper.TOPBAR_HEIGHT;
                    this.UIins.sp_1.visible = true;
                    this.UIins.sp_2.visible = false;
                }
                else if (this.show_type == 2) {
                    this.UIins.sp2_title.text = cfg["title"];
                    this.UIins.sp2_lab_content.text = cfg["desc"];
                    this.UIins.sp2_pgbar.value = 1;
                    var designwh = helper.get_design_wh();
                    var d_w = designwh['w'];
                    // let d_h: number = designwh['h'];
                    this.m_ui.x = d_w - 516;
                    this.m_ui.y = 100 + helper.TOPBAR_HEIGHT;
                    this.UIins.sp_1.visible = false;
                    this.UIins.sp_2.visible = true;
                }
                else {
                    this.UIins.sp_1.visible = false;
                    this.UIins.sp_2.visible = false;
                }
            }
        };
        combat_roundDetail_ui.prototype.update_round = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.show_type == 2) {
                var value = (10 - this.round) / 10;
                if (value < 0)
                    value = 0;
                this.UIins.sp2_pgbar.value = value;
            }
        };
        combat_roundDetail_ui.prototype.on_round_changed = function (ud) {
            if (ud === void 0) { ud = null; }
            this.round = ud;
            if (this.round > 0) {
                this.update_round();
            }
        };
        combat_roundDetail_ui.prototype.on_dispose = function () {
        };
        combat_roundDetail_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_roundDetail_ui;
    }(utils.game_widget));
    widget.combat_roundDetail_ui = combat_roundDetail_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_round.js.map
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
    // 战斗跳过
    var combat_skip_ui = /** @class */ (function (_super) {
        __extends(combat_skip_ui, _super);
        function combat_skip_ui() {
            var _this = _super.call(this, "res/atlas/combat_round.atlas", ui.game.combat_skipUI) || this;
            // private war_type: number = 0;
            _this.war_subType = 0;
            _this.round = 0;
            _this.skip_show_round = 0;
            _this.b_can_skip = false;
            _this.tips = "";
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.SCENE;
            return _this;
        }
        combat_skip_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
            var designwh = helper.get_design_wh();
            var d_w = designwh['w'];
            var d_h = designwh['h'];
            this.m_ui.x = d_w - 280;
            this.m_ui.y = d_h - 1020;
        };
        combat_skip_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
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
        };
        combat_skip_ui.prototype.update_cfg = function () {
            var combatui = game.get_module(module_enum.MODULE_COMBATUI);
            var info_arr = combatui.get_cur_war_info();
            // this.war_type = info_arr[0];
            this.war_subType = info_arr[1];
            var skip_cfg = config.Combat_skip_cfg.get_Combat_skip_cfg(this.war_subType);
            if (skip_cfg != null) {
                var need_lv = skip_cfg["lv"];
                var need_vip = skip_cfg["vip"];
                this.skip_show_round = skip_cfg["pass_round"];
                this.b_can_skip = (helper.mine().m_lv >= need_lv) || (helper.mine().m_vip >= need_vip);
                if (this.b_can_skip == false) {
                    this.tips = skip_cfg["tips"];
                }
            }
        };
        combat_skip_ui.prototype.update_ui = function (ud) {
            if (ud === void 0) { ud = null; }
            this.round = ud;
            if (this.round >= this.skip_show_round) {
                this.UIins.btn_skip.visible = true;
            }
        };
        combat_skip_ui.prototype.on_skip = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.b_can_skip) {
                this.fire_event_next_frame(game_event.EVENT_COMBATGO2NEXT);
            }
            else {
                helper.show_text_tips(this.tips);
            }
            helper.play_sound("sound/mousedown_btn.wav");
        };
        combat_skip_ui.prototype.on_dispose = function () {
        };
        combat_skip_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_skip_ui;
    }(utils.game_widget));
    widget.combat_skip_ui = combat_skip_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_skip.js.map
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
    var help_tips_ui = /** @class */ (function (_super) {
        __extends(help_tips_ui, _super);
        function help_tips_ui() {
            var _this = _super.call(this, "res/atlas/ui/other.atlas", ui.game.help_tipsUI) || this;
            _this.UIins = null;
            _this.m_layer = utils.WIDGET_LAYER.TIPS;
            return _this;
        }
        help_tips_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
        };
        help_tips_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.UIins.btn_close.on(Laya.Event.CLICK, this, this.on_close);
                this.UIins.btn_close.on(Laya.Event.MOUSE_OUT, this, this.on_mouseout);
            }
            else {
                this.UIins.btn_close.off(Laya.Event.MOUSE_OUT, this, this.on_mouseout);
                this.UIins.btn_close.off(Laya.Event.CLICK, this, this.on_close);
                this.UIins.lab_text.text = "";
                this.UIins = null;
            }
        };
        help_tips_ui.prototype.on_show_ud = function (flag, ud) {
            if (ud === void 0) { ud = null; }
            if (flag) {
                this.UIins.lab_text.text = ud[0];
                var b_center = ud[3];
                if (b_center) {
                    var w = this.UIins.img_bk.width;
                    var h = this.UIins.img_bk.height;
                    var sw = Laya.stage.width;
                    var sh = Laya.stage.height;
                    var x = (sw - w) / 2;
                    var y = (sh - h) / 2;
                    this.move_bk(x, y);
                }
                else {
                    this.move_bk(ud[1], ud[2]);
                }
            }
        };
        help_tips_ui.prototype.move_bk = function (x, y) {
            this.UIins.x = x;
            this.UIins.y = y;
            //this.UIins.img_bk.x = x;
            //this.UIins.img_bk.y = y;
            //this.UIins.btn_close.x = x;
            //this.UIins.btn_close.y = y;
            //this.UIins.lab_text.x = this.UIins.img_bk.x+66;
            //this.UIins.lab_text.y = +this.UIins.img_bk.y+66;
        };
        help_tips_ui.prototype.on_mouseout = function (ud) {
            if (ud === void 0) { ud = null; }
            this.show(false);
        };
        help_tips_ui.prototype.on_close = function () {
            this.show(false);
        };
        help_tips_ui.prototype.on_dispose = function () {
        };
        help_tips_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return help_tips_ui;
    }(utils.game_widget));
    widget.help_tips_ui = help_tips_ui;
})(widget || (widget = {}));
//# sourceMappingURL=help_tips_ui.js.map
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
    var loading_ui = /** @class */ (function (_super) {
        __extends(loading_ui, _super);
        function loading_ui() {
            var _this = _super.call(this, "res/atlas/loading.atlas", ui.game.loadingUI) || this;
            _this.m_bk_rect = new Laya.Sprite();
            _this.append_extrares("bigpic/LOGO.png", Laya.Loader.IMAGE);
            _this.append_extrares("bigpic/barBK.png", Laya.Loader.IMAGE);
            // this.append_extrares("bigpic/进度条底板$bar.png",Laya.Loader.IMAGE);
            _this.m_layer = utils.WIDGET_LAYER.TOPMOST;
            _this.m_bk_rect.graphics.drawRect(0, 0, 2000, 3000, '#000000');
            return _this;
            //this.m_bk_rect.alpha = 0.5;
        }
        loading_ui.prototype.on_init = function () {
            fontmgr.set_ui_style(this.m_ui, fontmgr.FONTSTYLE_ENUM.FONT_PINK);
            var uiins = this.m_ui;
            var width = helper.get_design_w();
            var height = helper.get_design_h();
            var ratio = width / height;
            var scaleX = width / uiins.width;
            var scaleY = height / uiins.height;
            var scale = scaleX > scaleY ? scaleX : scaleY;
            uiins.m_bk.scale(scale, scale);
            uiins.width = width;
            uiins.height = height;
            fontmgr.set_lable(uiins.m_info, fontmgr.FONTSTYLE_ENUM.FONT_PINK);
        };
        loading_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                this.register_event(game_event.EVENT_LOADINGUI_PROGRESS, this.on_progress_event);
                this.set_progress(0);
                this.m_ui.addChildAt(this.m_bk_rect, 0);
                this.m_ui.hitArea = new Laya.Rectangle(-100, -100, 2000, 3000);
            }
            else {
                this.unregister_allevent();
            }
        };
        loading_ui.prototype.set_progress = function (v) {
            //core.game_tiplog("loading_ui set_progress ",v);
            var ui_ins = this.m_ui;
            var m_progress = ui_ins.m_progress1;
            var m_progresslight = ui_ins.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width - 70) * m_progress.value + 30;
        };
        loading_ui.prototype.on_progress_event = function (ud) {
            if (ud === void 0) { ud = null; }
            this.set_progress(ud);
        };
        loading_ui.prototype.on_dispose = function () {
        };
        loading_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return loading_ui;
    }(utils.game_widget));
    widget.loading_ui = loading_ui;
})(widget || (widget = {}));
//# sourceMappingURL=loading_ui.js.map
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
    var maintop_ui = /** @class */ (function (_super) {
        __extends(maintop_ui, _super);
        function maintop_ui() {
            var _this = _super.call(this, "res/atlas/mainui.atlas", ui.game.main_topui_newUI) || this;
            _this.UIins = null;
            _this.append_extrares("res/atlas/ui.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("res/atlas/ui/sys.atlas", Laya.Loader.ATLAS);
            _this.append_extrares("res/atlas/ui/new.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.NORMAL;
            return _this;
        }
        maintop_ui.prototype.on_init = function () {
            fontmgr.set_ui_font(this.m_ui);
        };
        maintop_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.register_event(game_event.EVENT_UI_MAINTOPUPDATE, this.on_update_data);
                this.register_event(game_event.EVENT_MAINPLAYER_MOVE, this.on_mainplayer_move);
            }
            else {
                this.unregister_allevent();
                this.UIins = null;
            }
        };
        maintop_ui.prototype.on_mainplayer_move = function (ud) {
            if (ud === void 0) { ud = null; }
            var x = ud[0];
            var y = ud[1];
            var mp = data.get_data(data_enum.DATA_PLAYER);
            this.UIins.name_label.text = mp.m_name + " (" + x.toString() + "," + y.toString() + ")";
        };
        maintop_ui.prototype.on_update_data = function (ud) {
            if (ud === void 0) { ud = null; }
            var mp = data.get_data(data_enum.DATA_PLAYER);
            var gold = mp.m_gold;
            var stamnia = mp.m_stamina;
            this.UIins.num_gold.text = gold.toString();
            this.UIins.num_slv.text = stamnia.toString();
            this.UIins.level_label.text = mp.m_lv.toString();
        };
        maintop_ui.prototype.on_dispose = function () {
        };
        maintop_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return maintop_ui;
    }(utils.game_widget));
    widget.maintop_ui = maintop_ui;
})(widget || (widget = {}));
//# sourceMappingURL=maintop_ui.js.map
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
                this.UIins.x = Laya.stage.designWidth - this.UIins.width;
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
            //this.UIins.exp_progress.value = rate;
            //this.UIins.exp_label.changeText((rate*100).toFixed(2)+"%");
        };
        main_ui.prototype.on_battle = function (ud) {
            if (ud === void 0) { ud = null; }
            this.fire_event_next_frame(game_event.EVENT_CARD_REQ_START);
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
    var msgbox_ui = /** @class */ (function (_super) {
        __extends(msgbox_ui, _super);
        function msgbox_ui() {
            var _this = _super.call(this, "res/atlas/ui.atlas", ui.game.msgboxUI) || this;
            _this.no_tips_flag = false;
            _this.mb_data = null;
            _this.UIins = null;
            _this.append_extrares("res/atlas/ui/title.atlas", Laya.Loader.ATLAS);
            _this.m_layer = utils.WIDGET_LAYER.TIPS;
            return _this;
        }
        msgbox_ui.prototype.on_init = function () {
            var uiins = this.m_ui;
            uiins.htmlText_content.style.font = "48px h5font";
            uiins.htmlText_content.style.color = "#bd8651";
            // uiins.htmlText_content.style.align = "center";
            fontmgr.set_button(uiins.btn_ok, fontmgr.FONTSTYLE_ENUM.FONT_REDDRAK);
            fontmgr.set_button(uiins.btn_cancle, fontmgr.FONTSTYLE_ENUM.FONT_REDDRAK);
        };
        msgbox_ui.prototype.on_show = function (flag) {
            if (flag) {
                this.UIins = this.m_ui;
                this.UIins.btn_ok.on(Laya.Event.CLICK, this, this.on_ok);
                this.UIins.btn_cancle.on(Laya.Event.CLICK, this, this.on_cancel);
                this.UIins.btn_close.on(Laya.Event.CLICK, this, this.on_close);
                this.mb_data = data.get_data(data_enum.DATA_MSGBOX);
                this.set_msgbox();
                helper.center_widget(this.m_ui);
                helper.add_widget_hitArea(this.m_ui);
            }
            else {
                this.UIins.btn_ok.off(Laya.Event.CLICK, this, this.on_ok);
                this.UIins.btn_cancle.off(Laya.Event.CLICK, this, this.on_cancel);
                this.UIins.btn_close.off(Laya.Event.CLICK, this, this.on_close);
                helper.remove_widget_hitArea(this.m_ui);
                if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                    this.UIins.btn_NoTips.off(Laya.Event.CLICK, this, this.on_NoTips);
                }
                this.mb_data = null;
                this.UIins = null;
            }
        };
        msgbox_ui.prototype.set_msgbox = function () {
            if (this.mb_data) {
                this.UIins.htmlText_content.innerHTML = this.mb_data.content;
                if (this.mb_data.type == 1) {
                    this.UIins.btn_ok.pos(240, 345);
                    this.UIins.btn_cancle.visible = false;
                }
                else if (this.mb_data.type == 2) {
                    this.UIins.btn_ok.pos(375, 345);
                    this.UIins.btn_cancle.pos(110, 345);
                    this.UIins.btn_cancle.visible = true;
                }
                if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                    this.UIins.btn_NoTips.visible = this.UIins.lab_NoTips.visible = true;
                    this.no_tips_flag = false;
                    this.UIins.btn_NoTips.skin = "ui/selectn.png";
                    this.UIins.btn_NoTips.on(Laya.Event.CLICK, this, this.on_NoTips);
                }
                else {
                    this.UIins.btn_NoTips.visible = this.UIins.lab_NoTips.visible = false;
                }
            }
        };
        msgbox_ui.prototype.on_ok = function () {
            if (this.mb_data.caller != null) {
                var sys_msg = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG);
                sys_msg.fire_choosed(this.mb_data.caller, true, this.mb_data.user_data);
            }
            this.show(false);
        };
        msgbox_ui.prototype.on_cancel = function () {
            if (this.mb_data.caller != null) {
                var sys_msg = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG);
                sys_msg.fire_choosed(this.mb_data.caller, false, this.mb_data.user_data);
            }
            this.show(false);
        };
        msgbox_ui.prototype.on_NoTips = function () {
            if (!(this.mb_data.NoTips_keys == "" || this.mb_data.NoTips_keys == null)) {
                this.no_tips_flag = !this.no_tips_flag;
                this.UIins.btn_NoTips.skin = this.no_tips_flag == true ? "ui/selecty.png" : "ui/selectn.png";
                this.mb_data.set_NoTips_flag(this.mb_data.NoTips_keys, this.no_tips_flag);
            }
        };
        msgbox_ui.prototype.on_close = function () {
            this.show(false);
        };
        msgbox_ui.prototype.on_dispose = function () {
        };
        msgbox_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return msgbox_ui;
    }(utils.game_widget));
    widget.msgbox_ui = msgbox_ui;
})(widget || (widget = {}));
//# sourceMappingURL=msgbox_ui.js.map
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
                this.centre_x = Laya.stage.designWidth / 2;
                this.centre_y = Laya.stage.designHeight / 2;
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
var widget;
(function (widget) {
    function init_game_widget() {
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINUI, widget.main_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MAINTOPUI, widget.maintop_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CARDUI, widget.card_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TIPS, widget.tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_TEXTTIPS, widget.help_tips_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_MSGBOX, widget.msgbox_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_BOX, widget.chat_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_FACE, widget.chat_face);
        utils.widget_ins().register_widget(widget_enum.WIDGET_CHAT_INPUT, widget.chat_input_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_BOSS_HP, widget.combat_boss_hp_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBATLOADING_UI, widget.combat_loading_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_ROUND, widget.combat_round_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_ROUNDDETAIL, widget.combat_roundDetail_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_COMBAT_SKIP, widget.combat_skip_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_LOADING_UI, widget.loading_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_GAMELOADING, widget.game_loading_ui);
        utils.widget_ins().register_widget(widget_enum.WIDGET_BOSS_GODX, widget.boss_godx_ui);
    }
    widget.init_game_widget = init_game_widget;
})(widget || (widget = {}));
//# sourceMappingURL=widget_def.js.map
var widget_enum;
(function (widget_enum) {
    widget_enum.WIDGET_MAINUI = "main_ui";
    widget_enum.WIDGET_MAINTOPUI = "maintop_ui";
    widget_enum.WIDGET_CARDUI = "card_ui";
    widget_enum.WIDGET_TIPS = "tips_ui";
    widget_enum.WIDGET_TEXTTIPS = "texttips_ui";
    widget_enum.WIDGET_MSGBOX = "msgbox_ui";
    widget_enum.WIDGET_CHAT_INPUT = "chat_input";
    widget_enum.WIDGET_CHAT_BOX = "chat_box";
    widget_enum.WIDGET_CHAT_FACE = "chat_face";
    widget_enum.WIDGET_MAINPLAYER_INFO = "mainplayer_info";
    widget_enum.WIDGET_COMBAT_BOSS_HP = "combat_boss_hp";
    widget_enum.WIDGET_COMBAT_ROUND = "combat_round";
    widget_enum.WIDGET_COMBAT_ROUNDDETAIL = "combat_roundDetail";
    widget_enum.WIDGET_COMBAT_SKIP = "combat_skip";
    widget_enum.WIDGET_COMBAT_ENTER = "combat_enter";
    widget_enum.WIDGET_COMBATLOADING_UI = "combatloading_ui";
    widget_enum.WIDGET_LOADING_UI = "loading_ui";
    widget_enum.WIDGET_GAMELOADING = "gameloading";
    widget_enum.WIDGET_BOSS_GODX = "boss_godx";
})(widget_enum || (widget_enum = {}));
//# sourceMappingURL=widget_enum.js.map