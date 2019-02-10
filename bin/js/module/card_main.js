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
    var card_main = /** @class */ (function (_super) {
        __extends(card_main, _super);
        function card_main() {
            var _this = _super.call(this) || this;
            _this.m_pdata_ins = null;
            _this.m_gamemain_ins = null;
            _this.m_turn_start = false;
            return _this;
        }
        card_main.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_event(game_event.EVENT_TIMER_TICK_1S, this.on_1s_tick);
            this.m_pdata_ins = data.get_data(data_enum.DATA_CARD);
            this.m_gamemain_ins = game.get_module(module_enum.MODULE_MAIN);
            this.register_net_event(protocol_def.S2C_CARDS_ARR, this.on_cards_arr);
            this.register_net_event(protocol_def.S2C_CARDS_START, this.on_cards_start);
            this.register_net_event(protocol_def.S2C_CARDS_END, this.on_cards_end);
            this.register_net_event(protocol_def.S2C_CARDS_HANDS, this.on_cards_hands);
            this.register_net_event(protocol_def.S2C_CARDS_PLAYERINFO, this.on_cards_pinfo);
            this.register_net_event(protocol_def.S2C_CARDS_ATK, this.on_cards_atk);
            this.register_net_event(protocol_def.S2C_CARDS_DEL, this.on_cards_del);
            this.register_net_event(protocol_def.S2C_CARDS_OPEN, this.on_cards_open);
            this.register_net_event(protocol_def.S2C_CARDS_CHANGED, this.on_cards_changed);
            this.register_net_event(protocol_def.S2C_CARDS_TURNSTART, this.on_cards_turnstart);
            this.register_net_event(protocol_def.S2C_CARDS_TURNEND, this.on_cards_turnend);
            this.register_net_event(protocol_def.S2C_CARDS_ENTERDLV, this.on_cards_enterdlv);
            this.register_net_event(protocol_def.S2C_CARDS_DELHAND, this.on_cards_delhand);
        };
        card_main.prototype.on_cards_enterdlv = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_enterdlv ", ud);
            var lv = ud["lv"];
            this.m_pdata_ins.m_dlv = lv;
            this.m_pdata_ins.reset_map();
            this.m_pdata_ins.clear_cards();
            this.fire_event(game_event.EVENT_CARD_UPDATEDLV);
        };
        card_main.prototype.on_cards_delhand = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_delhand ", ud);
            var id = ud["id"];
            this.m_pdata_ins.del_hands(id);
            this.fire_event(game_event.EVENT_CARD_UPDATEHANDS);
        };
        card_main.prototype.on_cards_changed = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_changed ", ud);
            var id = ud["id"];
            var shape = ud["shape"];
            var atk = ud["atk"];
            var hp = ud["hp"];
            var duration = ud["duration"];
            this.m_pdata_ins.update_cardsorhands(id, shape, atk, hp, duration);
            this.fire_event(game_event.EVENT_CARD_CARDCHANGED, id);
        };
        card_main.prototype.on_cards_turnstart = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_turnstart ", ud);
            this.m_turn_start = true;
        };
        card_main.prototype.on_cards_turnend = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_turnend ", ud);
            this.m_turn_start = false;
        };
        card_main.prototype.on_cards_atk = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_atk ", ud);
            var srcid = ud["srcid"];
            var dstid = ud["dstid"];
            var value = ud["value"];
            this.fire_event(game_event.EVENT_CARD_ATTACK, [srcid, dstid, value]);
        };
        card_main.prototype.on_cards_del = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_del ", ud);
            var id = ud["id"];
            this.m_pdata_ins.del_cards(id);
            this.fire_event(game_event.EVENT_CARD_DELCARD, id);
        };
        card_main.prototype.on_cards_open = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_open ", ud);
            var id = ud["id"];
            var shape = ud["shape"];
            this.m_pdata_ins.open_card(id, shape);
            this.fire_event(game_event.EVENT_CARD_OPENCARD, id);
        };
        card_main.prototype.on_cards_hands = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_hands ", ud);
            var idlist = ud["idlist"];
            var shapelist = ud["shapelist"];
            var hplist = ud["hplist"];
            var atklist = ud["atklist"];
            var durationlist = ud["durationlist"];
            this.m_pdata_ins.clear_hands();
            for (var i = 0; i < idlist.length; ++i) {
                this.m_pdata_ins.add_hands(idlist[i], shapelist[i], atklist[i], hplist[i], durationlist[i]);
            }
            this.fire_event(game_event.EVENT_CARD_UPDATEHANDS);
        };
        card_main.prototype.on_cards_pinfo = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_pinfo ", ud);
            var hp = ud["hp"];
            var stamina = ud["stamina"];
            var armor = ud["armor"];
            var atk = ud["atk"];
            var exp = ud["exp"];
            var dlv = ud["dlv"];
            var clv = ud["clv"];
            var hpmax = ud["hpmax"];
            var staminamax = ud["staminamax"];
            this.m_pdata_ins.m_hp = hp;
            this.m_pdata_ins.m_stamina = stamina;
            this.m_pdata_ins.m_armor = armor;
            this.m_pdata_ins.m_atk = atk;
            this.m_pdata_ins.m_exp = exp;
            this.m_pdata_ins.m_dlv = dlv;
            this.m_pdata_ins.m_clv = clv;
            this.m_pdata_ins.m_hpmax = hpmax;
            this.m_pdata_ins.m_staminamax = staminamax;
            this.fire_event(game_event.EVENT_CARD_PLAYERINFO);
        };
        card_main.prototype.on_cards_start = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_start ", ud);
            utils.widget_ins().show_widget(widget_enum.WIDGET_CARDUI, true);
        };
        card_main.prototype.on_cards_end = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_end ", ud);
            //todo
            this.fire_event(game_event.EVENT_CARD_END);
        };
        card_main.prototype.on_cards_arr = function (ud) {
            if (ud === void 0) { ud = null; }
            core.game_tiplog("on_cards_arr ", ud);
            var idlist = ud["idlist"];
            var shapelist = ud["shapelist"];
            var hplist = ud["hplist"];
            var atklist = ud["atklist"];
            var durationlist = ud["durationlist"];
            this.m_pdata_ins.update_cards(idlist, shapelist, atklist, hplist, durationlist);
            this.fire_event(game_event.EVENT_CARD_UPDATECARDS);
        };
        //
        card_main.prototype.req_start = function () {
            net.net_ins().send(protocol_def.C2S_CARDS_START, {});
        };
        card_main.prototype.req_quit = function () {
            net.net_ins().send(protocol_def.C2S_CARDS_QUIT, {});
        };
        card_main.prototype.req_del_card = function (id) {
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_DEL, { "id": id });
        };
        card_main.prototype.req_click_card = function (id) {
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_CLICK, { "id": id });
        };
        card_main.prototype.req_flip_card = function (id) {
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_FLIP, { "id": id });
        };
        card_main.prototype.req_use_card = function (srcid, dstid) {
            if (!this.m_turn_start) {
                return;
            }
            net.net_ins().send(protocol_def.C2S_CARDS_USE, { "srcid": srcid, "dstid": srcid });
        };
        //
        card_main.prototype.on_1s_tick = function (ud) {
            if (ud === void 0) { ud = null; }
        };
        card_main.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return card_main;
    }(utils.game_module));
    game.card_main = card_main;
})(game || (game = {}));
//# sourceMappingURL=card_main.js.map