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
var combat;
(function (combat) {
    var combat_number_sp = /** @class */ (function (_super) {
        __extends(combat_number_sp, _super);
        function combat_number_sp() {
            var _this = _super.call(this) || this;
            _this.m_value = 0;
            _this.m_root = "combat_num/";
            _this.m_prex = "damage_";
            _this.m_w = 0;
            _this.m_h = 0;
            _this.m_type = combat.DAMAGETYPE_HP_SUB;
            _this.m_text = null;
            return _this;
        }
        combat_number_sp.prototype.re_init = function (tp) {
            this.m_type = tp;
            if (this.m_type == combat.DAMAGETYPE_HP_ADD) {
                this.m_prex = "heal_";
            }
            else if (this.m_type == combat.DAMAGETYPE_CRACK) {
                //this.m_prex = "gearscore_";
                this.m_prex = "countdown_";
            }
            else {
                this.m_prex = "damage_";
            }
        };
        combat_number_sp.prototype.set_content = function (c) {
            this.release_pic();
            if (this.m_text == null) {
                this.m_text = new Laya.Label();
                this.m_text.color = "#0000ff";
                this.m_text.stroke = 1;
                this.m_text.strokeColor = "#ffffff";
                this.m_text.fontSize = 32;
                this.m_text.bold = true;
                this.m_text.align = "center";
                this.m_text.size(120, 40);
                this.addChild(this.m_text);
            }
            this.m_text.text = c;
            this.init_wh();
        };
        combat_number_sp.prototype.set_value = function (v) {
            this.m_value = v;
            this.release_pic();
            if (this.m_type == combat.DAMAGETYPE_DODGE) {
                if (this.m_value == 0) {
                    this.loadImage(this.m_root + "damage_shan.png");
                }
                else {
                    this.loadImage(this.m_root + "damage_bi.png");
                }
            }
            else if (this.m_type == combat.DAMAGETYPE_SHAKE) {
                if (this.m_text == null) {
                    this.m_text = new Laya.Label();
                    this.m_text.color = "#0000ff";
                    this.m_text.stroke = 1;
                    this.m_text.strokeColor = "#ffffff";
                    this.m_text.fontSize = 32;
                    this.m_text.bold = true;
                    this.m_text.align = "center";
                    this.m_text.size(120, 40);
                    this.addChild(this.m_text);
                }
                this.m_text.text = "反震";
            }
            else if (this.m_type == combat.DAMAGETYPE_COUNTERATK) {
                if (this.m_text == null) {
                    this.m_text = new Laya.Label();
                    this.m_text.color = "#0000ff";
                    this.m_text.stroke = 1;
                    this.m_text.strokeColor = "#ffffff";
                    this.m_text.fontSize = 32;
                    this.m_text.bold = true;
                    this.m_text.align = "center";
                    this.m_text.size(120, 40);
                    this.addChild(this.m_text);
                }
                this.m_text.text = "反击";
            }
            else {
                this.loadImage(this.m_root + this.m_prex + v.toString() + ".png");
            }
            this.init_wh();
        };
        combat_number_sp.prototype._init_cryout_wh = function () {
            this.m_w = 120;
            this.m_h = 40;
        };
        combat_number_sp.prototype._init_counteratk_wh = function () {
            this.m_w = 120;
            this.m_h = 40;
        };
        combat_number_sp.prototype._init_shake_wh = function () {
            this.m_w = 120;
            this.m_h = 40;
        };
        combat_number_sp.prototype._init_dodge_wh = function () {
            this.m_w = 32;
            this.m_h = 32;
        };
        combat_number_sp.prototype._init_sub_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 1:
                    this.m_w = 22;
                    this.m_h = 33;
                    break;
                case 2:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 3:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 4:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 5:
                    this.m_w = 34;
                    this.m_h = 34;
                    break;
                case 6:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 7:
                    this.m_w = 34;
                    this.m_h = 36;
                    break;
                case 8:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                case 9:
                    this.m_w = 32;
                    this.m_h = 34;
                    break;
                default:
                    break;
            }
        };
        combat_number_sp.prototype.init_add_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 1:
                    this.m_w = 18;
                    this.m_h = 31;
                    break;
                case 2:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 3:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 4:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 5:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 6:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 7:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 8:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                case 9:
                    this.m_w = 34;
                    this.m_h = 31;
                    break;
                default:
                    break;
            }
        };
        combat_number_sp.prototype._init_countdown_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 1:
                    this.m_w = 32;
                    this.m_h = 47;
                    break;
                case 2:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 3:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 4:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 5:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                case 6:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 7:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                case 8:
                    this.m_w = 48;
                    this.m_h = 47;
                    break;
                case 9:
                    this.m_w = 50;
                    this.m_h = 47;
                    break;
                default:
                    break;
            }
            this.m_w -= 2;
        };
        combat_number_sp.prototype._init_crack_wh = function () {
            this.m_w = 16;
            this.m_h = 16;
            switch (this.m_value) {
                case 0:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 1:
                    this.m_w = 20;
                    this.m_h = 30;
                    break;
                case 2:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 3:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 4:
                    this.m_w = 30;
                    this.m_h = 30;
                    break;
                case 5:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 6:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 7:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 8:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                case 9:
                    this.m_w = 32;
                    this.m_h = 30;
                    break;
                default:
                    break;
            }
        };
        combat_number_sp.prototype.init_wh = function () {
            if (this.m_type == combat.DAMAGETYPE_HP_ADD) {
                this.init_add_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_HP_SUB) {
                this._init_sub_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_DODGE) {
                this._init_dodge_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_SHAKE) {
                this._init_shake_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_CRYOUT) {
                this._init_cryout_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_COUNTERATK) {
                this._init_counteratk_wh();
            }
            else if (this.m_type == combat.DAMAGETYPE_CRACK) {
                this._init_countdown_wh();
                //this._init_crack_wh();
            }
        };
        combat_number_sp.prototype.release_pic = function () {
            this.removeChildren();
            if (this.m_text != null) {
                this.m_text = null;
            }
            this.graphics.clear();
        };
        combat_number_sp.prototype.dispose = function () {
            this.release_pic();
        };
        return combat_number_sp;
    }(laya.display.Sprite));
    combat.combat_number_sp = combat_number_sp;
    var combat_number = /** @class */ (function (_super) {
        __extends(combat_number, _super);
        function combat_number() {
            var _this = _super.call(this) || this;
            _this.m_value = 0;
            _this.m_type = 0;
            _this.m_life = 0;
            _this.m_obj_id = 0;
            _this.m_text = "";
            _this.m_sp_list = new Array();
            return _this;
        }
        combat_number.prototype.re_init = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            this.m_value = v;
            this.m_type = tp;
            this.m_sp_list.length = 0;
            this.m_text = content;
        };
        combat_number.prototype.release_allsp = function () {
            this.removeChildren();
            for (var _i = 0, _a = this.m_sp_list; _i < _a.length; _i++) {
                var i = _a[_i];
                laya.utils.Tween.clearAll(i);
                this._del_sp(i);
            }
            this.m_sp_list = new Array();
        };
        combat_number.prototype._get_sp = function (tp) {
            var ret = utils.getitembycls("combat_number_sp", combat_number_sp);
            ret.re_init(tp);
            return ret;
        };
        combat_number.prototype._del_sp = function (ins) {
            ins.dispose();
            utils.recover("combat_number_sp", ins);
        };
        combat_number.prototype.start = function () {
            this.release_allsp();
            var dx = 0;
            var idx = 0;
            var totalw = 0;
            var totalh = 200;
            if (this.m_type == combat.DAMAGETYPE_DODGE) {
                var shan = this._get_sp(this.m_type);
                shan.set_value(0);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 150;
                this.addChild(shan);
                laya.utils.Tween.to(shan, { y: 50 }, 300, laya.utils.Ease.elasticOut, null, 0);
                var bi = this._get_sp(this.m_type);
                bi.set_value(1);
                this.m_sp_list.push(bi);
                bi.x = shan.m_w;
                bi.y = 150;
                this.addChild(bi);
                laya.utils.Tween.to(bi, { y: 50 }, 300, laya.utils.Ease.elasticOut, null, 0);
                this.m_w = shan.m_w + bi.m_w;
                this.m_h = totalh;
                this.m_life = 500;
            }
            else if (this.m_type == combat.DAMAGETYPE_SHAKE || this.m_type == combat.DAMAGETYPE_COUNTERATK) {
                var shan = this._get_sp(this.m_type);
                shan.set_value(0);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 0;
                this.addChild(shan);
                laya.utils.Tween.from(shan, { y: -160 }, 300, laya.utils.Ease.elasticOut, null, 0);
                this.m_w = shan.m_w;
                this.m_h = totalh;
                this.m_life = 500;
            }
            else if (this.m_type == combat.DAMAGETYPE_CRYOUT) {
                var shan = this._get_sp(this.m_type);
                //shan.set_value(0);
                shan.set_content(this.m_text);
                this.m_sp_list.push(shan);
                shan.x = 0;
                shan.y = 0;
                this.addChild(shan);
                laya.utils.Tween.to(shan, { y: -50 }, 500, laya.utils.Ease.elasticOut, null, 0);
                this.m_w = shan.m_w;
                this.m_h = totalh;
                this.m_life = 700;
            }
            else {
                var v_str = this.m_value.toString();
                var duration = 300;
                var delta = 50;
                for (var _i = 0, v_str_1 = v_str; _i < v_str_1.length; _i++) {
                    var i = v_str_1[_i];
                    var snum = this._get_sp(this.m_type);
                    snum.set_value(parseInt(i));
                    this.m_sp_list.push(snum);
                    snum.x = dx;
                    snum.y = 0;
                    this.addChild(snum);
                    laya.utils.Tween.from(snum, { y: -50 }, duration, laya.utils.Ease.elasticOut, null, idx * delta);
                    idx += 1;
                    dx += snum.m_w;
                }
                this.m_life = (idx - 1) * delta + duration;
                totalw = dx;
                this.m_w = totalw;
                this.m_h = totalh;
            }
            this.y = -100;
            this.x = 0 - this.m_w / 2;
        };
        combat_number.prototype.tick = function (delta) {
            this.m_life -= delta;
        };
        combat_number.prototype.is_end = function () {
            return this.m_life <= 0;
        };
        combat_number.prototype.dispose = function () {
            this.release_allsp();
            utils.recover("combat_number", this);
        };
        combat_number.prototype.selfremove = function () {
        };
        return combat_number;
    }(core.renderspcontent));
    combat.combat_number = combat_number;
    //
    var combat_cryout = /** @class */ (function (_super) {
        __extends(combat_cryout, _super);
        function combat_cryout() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_life = 0;
            _this.m_obj_id = 0;
            _this.m_text = null;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_graphic = new laya.display.Animation();
            _this.m_text = new Laya.Label();
            _this.m_text.color = "#ffffff";
            _this.m_text.stroke = 1;
            _this.m_text.strokeColor = "#1794f9";
            _this.m_text.fontSize = 24;
            _this.m_text.align = "center";
            _this.m_text.font = "h5font";
            _this.m_text.x = -40;
            _this.m_text.y = -10;
            _this.m_text.size(120, 40);
            _this.addChild(_this.m_graphic);
            _this.addChild(_this.m_text);
            return _this;
        }
        combat_cryout.prototype.re_init = function (content) {
            if (content === void 0) { content = ""; }
            this.m_text.text = content;
            this.m_graphic.visible = false;
            this.m_text.visible = false;
        };
        combat_cryout.prototype.start = function () {
            this.m_text.visible = true;
            this.m_graphic.visible = true;
            this.m_graphic.loadAnimation("game_ani/combat/cryout.ani");
            this.m_graphic.stop();
            this.m_graphic.play(0, false, "ani1");
            this.m_graphic.gotoAndStop(0);
            this.m_life = 1500;
            this.y = -150;
            this.x = -20;
            this.m_framecount = 5;
            this.m_framespeed = 10;
            this.m_framecurrenttm = 0;
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
        };
        combat_cryout.prototype.tick = function (delta) {
            this.m_life -= delta;
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_framecurrenttm >= this.m_frametotalmillsec) {
                this.m_framecurrent = this.m_framecount - 1;
            }
            this.m_graphic.gotoAndStop(this.m_framecurrent);
        };
        combat_cryout.prototype.is_end = function () {
            return this.m_life <= 0;
        };
        combat_cryout.prototype.dispose = function () {
            utils.recover("combat_cryout", this);
        };
        combat_cryout.prototype.selfremove = function () {
        };
        return combat_cryout;
    }(core.renderspcontent));
    combat.combat_cryout = combat_cryout;
    //
    var combat_crack = /** @class */ (function (_super) {
        __extends(combat_crack, _super);
        function combat_crack() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_framecurrent = 0;
            _this.m_framemillsec = 0;
            _this.m_frametotalmillsec = 0;
            _this.m_framecurrenttm = 0;
            _this.m_graphic = new laya.display.Animation();
            _this.addChild(_this.m_graphic);
            return _this;
        }
        combat_crack.prototype.re_init = function (v, tp, content) {
            if (content === void 0) { content = ""; }
            _super.prototype.re_init.call(this, v, tp, content);
            this.m_graphic.visible = false;
            this.m_graphic.scale(2.0, 2.0);
        };
        combat_crack.prototype.start = function () {
            this.release_allsp();
            this.addChild(this.m_graphic);
            var v_str = this.m_value.toString();
            var dx = 0;
            var idx = 0;
            var totalh = 200;
            var totalw = 0;
            for (var _i = 0, v_str_2 = v_str; _i < v_str_2.length; _i++) {
                var i = v_str_2[_i];
                var snum = this._get_sp(this.m_type);
                snum.set_value(parseInt(i));
                this.m_sp_list.push(snum);
                snum.x = dx;
                snum.y = 0;
                this.addChild(snum);
                idx += 1;
                dx += snum.m_w;
                totalw += snum.m_w;
            }
            //
            this.m_graphic.visible = true;
            this.m_graphic.loadAnimation("game_ani/combat/crack.ani");
            this.m_graphic.stop();
            this.m_graphic.play(0, false, "ani1");
            this.m_graphic.gotoAndStop(0);
            this.m_framecount = 11;
            this.m_framespeed = 20;
            this.m_framemillsec = 1000.0 / this.m_framespeed;
            this.m_frametotalmillsec = this.m_framecount * 1000.0 / this.m_framespeed;
            //
            this.m_life = 800;
            this.m_w = totalw;
            this.m_h = totalh;
            this.y = -100;
            this.x = 0 - this.m_w / 2;
            this.m_graphic.x = this.m_w / 2;
            this.m_graphic.y = 20;
            this.m_framecurrenttm = 0;
        };
        combat_crack.prototype.tick = function (delta) {
            this.m_life -= delta;
            this.m_framecurrenttm += delta;
            var framecount = Math.floor(this.m_framecurrenttm / this.m_framemillsec);
            this.m_framecurrent = framecount % this.m_framecount;
            if (this.m_framecurrenttm >= this.m_frametotalmillsec) {
                this.m_framecurrent = this.m_framecount - 1;
                this.m_graphic.visible = false;
                return;
            }
            this.m_graphic.gotoAndStop(this.m_framecurrent);
        };
        combat_crack.prototype.is_end = function () {
            return this.m_life <= 0;
        };
        combat_crack.prototype.dispose = function () {
            this.release_allsp();
            utils.recover("combat_crack", this);
        };
        combat_crack.prototype.selfremove = function () {
        };
        return combat_crack;
    }(combat_number));
    combat.combat_crack = combat_crack;
    var combat_lineup = /** @class */ (function (_super) {
        __extends(combat_lineup, _super);
        function combat_lineup() {
            var _this = _super.call(this) || this;
            _this.m_graphic = null;
            _this.m_obj_id = 0;
            _this.m_graphic = new Laya.Sprite();
            _this.addChild(_this.m_graphic);
            return _this;
        }
        combat_lineup.prototype.re_init = function () {
            this.m_obj_id = 0;
            this.m_graphic.x = 0;
            this.m_graphic.y = 0;
            this.m_graphic.graphics.clear();
        };
        combat_lineup.prototype.set_respath = function (path, x, y) {
            this.m_graphic.graphics.loadImage(path);
            this.m_graphic.x = x;
            this.m_graphic.y = y;
        };
        combat_lineup.prototype.dispose = function () {
            utils.recover("combat_lineup", this);
        };
        combat_lineup.prototype.selfremove = function () {
        };
        return combat_lineup;
    }(core.renderspcontent));
    combat.combat_lineup = combat_lineup;
})(combat || (combat = {}));
//# sourceMappingURL=combat_number.js.map