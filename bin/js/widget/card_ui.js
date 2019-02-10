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
                var y = this.y + CARD_ITEM_FRAME_H / 2;
                var pt = new Laya.Point(x, y);
                pt = this.m_parent.m_ui.localToGlobal(pt);
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
            }
            else {
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
            var dlv = ud;
            this.UIins.m_info.text = dlv.toString();
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
        };
        card_ui.prototype.on_end = function (ud) {
            if (ud === void 0) { ud = null; }
            //todo
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
            else if (tp == data.CARD_TYPE_ARMOR) {
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
            this.show(false);
            this.m_main_ins.req_quit();
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