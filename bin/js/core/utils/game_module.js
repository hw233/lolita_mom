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
var utils;
(function (utils) {
    var game_module = /** @class */ (function (_super) {
        __extends(game_module, _super);
        function game_module() {
            return _super.call(this) || this;
        }
        game_module.prototype.register_net_event = function (cmd, func) {
            var event = game_event.gen_netcmd_event(cmd);
            utils.event_ins().register_event(event, this);
            this.register_event_func(event, func);
        };
        game_module.prototype.unregister_net_event = function (cmd) {
            var event = game_event.gen_netcmd_event(cmd);
            utils.event_ins().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        game_module.prototype.register_event = function (event, func) {
            utils.event_ins().register_event(event, this);
            this.register_event_func(event, func);
        };
        game_module.prototype.unregister_event = function (event) {
            utils.event_ins().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        game_module.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event(event, user_data);
        };
        game_module.prototype.unregister_allevent = function () {
            utils.event_ins().unregister_allevent(this);
            this.unregister_all_event_func();
        };
        game_module.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event_next_frame(event, user_data);
        };
        game_module.prototype.start = function () {
        };
        game_module.prototype.update = function (delta) {
        };
        game_module.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.unregister_allevent();
        };
        return game_module;
    }(utils.game_event_receiver));
    utils.game_module = game_module;
})(utils || (utils = {}));
//# sourceMappingURL=game_module.js.map