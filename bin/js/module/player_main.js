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
    var player_main = /** @class */ (function (_super) {
        __extends(player_main, _super);
        function player_main() {
            var _this = _super.call(this) || this;
            _this.m_pdata_ins = null;
            _this.m_gamemain_ins = null;
            return _this;
        }
        player_main.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_event(game_event.EVENT_TIMER_TICK_1S, this.on_1s_tick);
            this.register_net_event(protocol_def.S2C_ROLE_INFO, this.on_get_roleinfo);
            this.m_pdata_ins = data.get_data(data_enum.DATA_PLAYER);
            this.m_gamemain_ins = game.get_module(module_enum.MODULE_MAIN);
        };
        player_main.prototype.on_1s_tick = function (ud) {
            if (ud === void 0) { ud = null; }
            var curtm = this.m_gamemain_ins.get_svr_tm();
            if (curtm == 0) {
                return;
            }
            var gold = this.m_pdata_ins.m_gold;
            var goldspd = this.m_pdata_ins.m_goldspd;
            var exp = this.m_pdata_ins.m_exp;
            var expspd = this.m_pdata_ins.m_expspd;
            var stamina = this.m_pdata_ins.m_stamina;
            var lasttm = this.m_pdata_ins.m_last_time;
            gold = gold + (goldspd * (curtm - lasttm));
            exp = exp + (expspd * (curtm - lasttm));
            this.fire_event_next_frame(game_event.EVENT_UI_MAINTOPUPDATE, [gold, stamina]);
            this.fire_event_next_frame(game_event.EVENT_UI_MAINUPDATE, [exp, this.m_pdata_ins.m_expmax]);
        };
        player_main.prototype.on_get_roleinfo = function (ud) {
            if (ud === void 0) { ud = null; }
            console.log("on_get_roleinfo ", ud);
            var lv = ud['lv'];
            var shape = ud['shape'];
            var exp = ud['exp'];
            var gold = ud['gold'];
            var expspd = ud['expspd'];
            var goldspd = ud['goldspd'];
            var stamina = ud['stamina'];
            var tm = ud['tm'];
            console.log("info:", lv, shape, exp, gold, expspd, goldspd, stamina, tm);
            var pdata = this.m_pdata_ins;
            pdata.m_lv = lv;
            pdata.m_shape = shape;
            pdata.m_exp = exp;
            pdata.m_gold = gold;
            pdata.m_expspd = expspd;
            pdata.m_goldspd = goldspd;
            pdata.m_stamina = stamina;
            pdata.m_last_time = tm;
            var exp_obj = config.Player_exp.get_Player_exp(pdata.m_lv);
            ;
            if (exp_obj != null) {
                var expmax = exp_obj['exp'];
                pdata.m_expmax = expmax;
            }
            this.fire_event_next_frame(game_event.EVENT_PLAYERDATA_UPDATED);
        };
        player_main.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return player_main;
    }(utils.game_module));
    game.player_main = player_main;
})(game || (game = {}));
//# sourceMappingURL=player_main.js.map