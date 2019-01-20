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
var core;
(function (core) {
    var avatarname = /** @class */ (function (_super) {
        __extends(avatarname, _super);
        function avatarname() {
            var _this = _super.call(this) || this;
            _this.m_bk = new Laya.Sprite();
            _this.m_text = new Laya.Text();
            _this.m_bk_w = 80;
            _this.m_bk_h = 40;
            //this.m_bk.loadImage("avatar/namepanel.png");
            //this.addChild(this.m_bk);
            _this.addChild(_this.m_text);
            //this.m_bk.scaleY = 0.5;
            _this.m_text.font = "h5font";
            _this.m_text.overflow = Laya.Text.HIDDEN;
            _this.m_text.color = "#65ff65";
            _this.m_text.stroke = 2;
            _this.m_text.strokeColor = "#19591c";
            _this.m_text.align = "center";
            _this.m_text.fontSize = 22;
            _this.m_text.size(200, 40);
            _this.m_text.y = 0;
            _this.m_text.x = -100;
            _this.y = 25;
            return _this;
        }
        avatarname.prototype.re_init = function () {
            this.y = 25;
            this.x = 0;
        };
        avatarname.prototype.dispose = function () {
        };
        return avatarname;
    }(Laya.Sprite));
    core.avatarname = avatarname;
    var avatarhp = /** @class */ (function (_super) {
        __extends(avatarhp, _super);
        function avatarhp() {
            var _this = _super.call(this) || this;
            _this.m_progress = null;
            _this.m_w = 62;
            _this.m_h = 18;
            _this.m_progress = new Laya.ProgressBar("avatar/blood.png");
            _this.m_progress.width = _this.m_w;
            _this.m_progress.height = _this.m_h;
            _this.addChild(_this.m_progress);
            return _this;
        }
        avatarhp.prototype.re_init = function () {
            this.m_progress.value = 1;
        };
        avatarhp.prototype.set_v = function (v, m) {
            this.m_progress.value = v / m;
        };
        avatarhp.prototype.clear = function () {
        };
        avatarhp.prototype.dispose = function () {
            this.removeChildren();
            if (this.m_progress != null) {
                this.m_progress = null;
            }
        };
        return avatarhp;
    }(Laya.Sprite));
    core.avatarhp = avatarhp;
    var avatarbuff = /** @class */ (function (_super) {
        __extends(avatarbuff, _super);
        function avatarbuff() {
            var _this = _super.call(this) || this;
            _this.m_id = 0;
            _this.m_shape = 0;
            _this.m_cd = 0;
            _this.m_overlap = 0;
            _this.m_datas = null;
            _this.m_icon = null;
            _this.m_cd_label = null;
            _this.m_w = 0;
            _this.m_h = 0;
            _this.m_cd_label_h = 12;
            _this.m_effid = 0;
            _this.m_icon = new Laya.Sprite();
            _this.m_cd_label = new Laya.Label();
            _this.m_cd_label.color = '#fff200';
            _this.m_cd_label.stroke = 1;
            _this.m_cd_label.strokeColor = "#000000";
            _this.addChild(_this.m_icon);
            _this.addChild(_this.m_cd_label);
            return _this;
        }
        avatarbuff.prototype.re_init = function () {
            this.m_cd_label.y = this.m_h - this.m_cd_label_h;
            this.m_effid = 0;
        };
        avatarbuff.prototype.set_id = function (id, shape) {
            if (this.m_id != id) {
                this.m_icon.graphics.clear();
            }
            this.m_id = id;
            this.m_shape = shape;
            this.m_icon.graphics.loadImage("icon/buff/" + this.m_shape.toString() + ".jpg", 0, 0, this.m_w, this.m_h);
        };
        avatarbuff.prototype.set_data = function (cd, overlap, datas) {
            this.set_cd(cd);
            this.m_overlap = overlap;
            this.m_datas = datas;
        };
        avatarbuff.prototype.set_cd = function (cd) {
            this.m_cd = cd;
            this.m_cd_label.text = this.m_cd.toString();
        };
        avatarbuff.prototype.set_effid = function (id) {
            this.m_effid = id;
        };
        avatarbuff.prototype.dispose = function () {
            this.m_icon.graphics.clear();
        };
        return avatarbuff;
    }(Laya.Sprite));
    core.avatarbuff = avatarbuff;
    var avatarbuffui = /** @class */ (function (_super) {
        __extends(avatarbuffui, _super);
        function avatarbuffui() {
            var _this = _super.call(this) || this;
            _this.m_list = null;
            _this.m_num_per_row = 3;
            _this.m_buffw = 32;
            _this.m_buffh = 32;
            _this.m_list = new Array();
            return _this;
        }
        avatarbuffui.prototype._re_arrange = function () {
            var dx = 0;
            var dy = 0;
            var idx = 0;
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.x = dx;
                i.y = dy;
                idx += 1;
                dx += this.m_buffw;
                if (idx > 2) {
                    dx = 0;
                    dy += this.m_buffh;
                    idx = 0;
                }
            }
            dy += this.m_buffh;
            this.x = 0 - this.m_buffw * this.m_num_per_row / 2;
            this.y = 0 - 100;
        };
        avatarbuffui.prototype.addbuff = function (bid, shape, cd, overlap, datas, effid) {
            if (effid === void 0) { effid = 0; }
            var addbuff = this.getbuff(bid);
            if (addbuff == null) {
                addbuff = utils.getitembycls("avatarbuff", avatarbuff);
                addbuff.m_w = this.m_buffw;
                addbuff.m_h = this.m_buffh;
                addbuff.re_init();
                this.addChild(addbuff);
                addbuff.set_id(bid, shape);
                addbuff.set_effid(effid);
                this.m_list.push(addbuff);
                this._re_arrange();
            }
            addbuff.set_data(cd, overlap, datas);
        };
        avatarbuffui.prototype.getbuff = function (bid) {
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == bid) {
                    return i;
                }
            }
            return null;
        };
        avatarbuffui.prototype.delbuff = function (bid) {
            for (var i = 0; i < this.m_list.length; ++i) {
                var b = this.m_list[i];
                if (b.m_id == bid) {
                    b.removeSelf();
                    b.dispose();
                    utils.recover("avatarbuff", b);
                    this.m_list.splice(i, 1);
                    this._re_arrange();
                    return true;
                }
            }
            return false;
        };
        avatarbuffui.prototype.buffautocd = function () {
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.set_cd(i.m_cd - 1);
            }
        };
        avatarbuffui.prototype.delallbuff = function () {
            this.removeChildren();
            for (var _i = 0, _a = this.m_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("avatarbuff", i);
            }
            this.m_list.length = 0;
        };
        avatarbuffui.prototype.re_init = function () {
        };
        avatarbuffui.prototype.clear = function () {
            this.delallbuff();
        };
        avatarbuffui.prototype.dispose = function () {
            this.clear();
        };
        return avatarbuffui;
    }(Laya.Sprite));
    core.avatarbuffui = avatarbuffui;
})(core || (core = {}));
//# sourceMappingURL=avatarname.js.map