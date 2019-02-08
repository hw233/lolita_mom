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
var data;
(function (data) {
    data.CARD_TYPE_MONSTER = 0;
    data.CARD_TYPE_SWORD = 1;
    data.CARD_TYPE_SPELL = 2;
    data.CARD_TYPE_TRAP = 3;
    data.CARD_TYPE_ARMOR = 4;
    var card_obj = /** @class */ (function () {
        function card_obj() {
            this.m_id = 0;
            this.m_shape = 0;
            this.m_atk = 0;
            this.m_hp = 0;
            this.m_duration = 0;
            this.m_name = "";
            this.m_desc = "";
            this.m_iconid = 0;
            this.m_type = 0;
        }
        card_obj.prototype.re_init = function () {
        };
        card_obj.prototype.dispose = function () {
        };
        return card_obj;
    }());
    data.card_obj = card_obj;
    var card_data = /** @class */ (function (_super) {
        __extends(card_data, _super);
        function card_data() {
            var _this = _super.call(this) || this;
            _this.m_cards = new Array();
            _this.m_hands = new Array();
            _this.m_cards_map = new Object();
            _this.m_cards_map_count = 0;
            _this.m_hp = 0;
            _this.m_stamina = 0;
            _this.m_armor = 0;
            _this.m_atk = 0;
            _this.m_exp = 0;
            _this.m_dlv = 0;
            _this.m_clv = 0;
            _this.m_hpmax = 0;
            _this.m_staminamax = 0;
            return _this;
        }
        card_data.prototype.clear_hands = function () {
            for (var _i = 0, _a = this.m_hands; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this._recover_card_obj(i);
            }
            this.m_hands = new Array();
        };
        card_data.prototype.clear_cards = function () {
            for (var _i = 0, _a = this.m_cards; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this._recover_card_obj(i);
            }
            this.m_cards = new Array();
        };
        card_data.prototype._gen_card_obj = function () {
            var obj = utils.getitembycls("card_data_card_obj", card_obj);
            obj.re_init();
            return obj;
        };
        card_data.prototype._recover_card_obj = function (obj) {
            utils.recover("card_data_card_obj", obj);
        };
        card_data.prototype._gen_card_cfg = function (shape, c) {
            var c_cfg = config.Cards.get_Cards(shape);
            if (c_cfg == null) {
                return;
            }
            var tp = c_cfg["type"];
            var cshape = c_cfg["shape"];
            var name = c_cfg["name"];
            var desc = c_cfg["desc"];
            c.m_name = name;
            c.m_desc = desc;
            c.m_iconid = cshape;
        };
        card_data.prototype.add_hands = function (id, shape, atk, hp, duration) {
            var c = this._gen_card_obj();
            c.m_id = id;
            c.m_shape = shape;
            c.m_atk = atk;
            c.m_hp = hp;
            c.m_duration = duration;
            this._gen_card_cfg(shape, c);
            this.m_hands.push(c);
        };
        card_data.prototype.open_card = function (id, shape) {
            for (var i = 0; i < this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    c.m_shape = shape;
                    this._gen_card_cfg(shape, c);
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.update_cardsorhands = function (id, shape, atk, hp, duration) {
            for (var i = 0; i < this.m_hands.length; ++i) {
                var c = this.m_hands[i];
                if (c.m_id == id) {
                    c.m_shape = shape;
                    c.m_atk = atk;
                    c.m_hp = hp;
                    c.m_duration = duration;
                    this._gen_card_cfg(shape, c);
                    return true;
                }
            }
            for (var i = 0; i > this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    c.m_shape = shape;
                    c.m_atk = atk;
                    c.m_hp = hp;
                    c.m_duration = duration;
                    this._gen_card_cfg(shape, c);
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.del_cards = function (id) {
            for (var i = 0; i < this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    delete this.m_cards_map[id];
                    c.m_id = 0;
                    c.m_shape = 0;
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.del_hands = function (id) {
            for (var i = 0; i < this.m_hands.length; ++i) {
                var c = this.m_hands[i];
                if (c.m_id == id) {
                    this._recover_card_obj(c);
                    this.m_hands.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.reset_map = function () {
            this.m_cards_map = new Object();
            this.m_cards_map_count = 0;
        };
        card_data.prototype.update_cards = function (idlist, shapelist, atklist, hplist, durationlist) {
            if (this.m_cards.length <= 0) {
                for (var i = 0; i < idlist.length; ++i) {
                    var c = this._gen_card_obj();
                    c.m_id = idlist[i];
                    c.m_shape = shapelist[i];
                    c.m_atk = atklist[i];
                    c.m_hp = hplist[i];
                    c.m_duration = durationlist[i];
                    this._gen_card_cfg(c.m_shape, c);
                    this.m_cards.push(c);
                    this.m_cards_map[c.m_id] = c;
                    this.m_cards_map_count += 1;
                }
            }
            else {
                for (var i = 0; i < idlist.length; ++i) {
                    var id = idlist[i];
                    if (this.m_cards_map.hasOwnProperty(id.toString())) {
                        this.m_cards_map[id].m_shape = shapelist[i];
                        this.m_cards_map[id].m_atk = atklist[i];
                        this.m_cards_map[id].m_hp = hplist[i];
                        this.m_cards_map[id].m_duration = durationlist[i];
                        this._gen_card_cfg(this.m_cards_map[id].m_shape, this.m_cards_map[id]);
                    }
                }
            }
        };
        card_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return card_data;
    }(utils.game_data));
    data.card_data = card_data;
})(data || (data = {}));
//# sourceMappingURL=card_data.js.map