var utils;
(function (utils) {
    var game_event_receiver = /** @class */ (function () {
        function game_event_receiver() {
            this.m_event_func = new Object();
        }
        game_event_receiver.prototype.register_event_func = function (event, func) {
            this.m_event_func[event] = func;
            return;
        };
        game_event_receiver.prototype.unregister_event_func = function (event) {
            if (this.m_event_func.hasOwnProperty(event)) {
                delete this.m_event_func[event];
            }
        };
        game_event_receiver.prototype.unregister_all_event_func = function () {
            this.m_event_func = new Object();
        };
        game_event_receiver.prototype.on_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            if (this.m_event_func.hasOwnProperty(event)) {
                var func = this.m_event_func[event];
                func.apply(this, [user_data]);
            }
            return;
        };
        game_event_receiver.prototype.dispose = function () {
            this.unregister_all_event_func();
        };
        return game_event_receiver;
    }());
    utils.game_event_receiver = game_event_receiver;
    var game_event_dispatcher = /** @class */ (function () {
        function game_event_dispatcher() {
            this.m_pause = false;
            this.m_handler_map = new Object();
            this.m_handler_next_frame_map = new Object();
        }
        game_event_dispatcher.prototype.pause = function () {
            this.m_pause = true;
        };
        game_event_dispatcher.prototype.resume = function () {
            this.m_pause = false;
        };
        game_event_dispatcher.prototype.register_event = function (event, hander) {
            if (this.m_handler_map.hasOwnProperty(event) == false) {
                this.m_handler_map[event] = new Array();
            }
            var arr = this.m_handler_map[event];
            if (arr.indexOf(hander) < 0) {
                arr.push(hander);
            }
        };
        game_event_dispatcher.prototype.unregister_event = function (event, hander) {
            if (this.m_handler_map.hasOwnProperty(event)) {
                var arr = this.m_handler_map[event];
                var idx = arr.indexOf(hander);
                if (idx >= 0) {
                    arr.splice(idx, 1);
                }
            }
        };
        game_event_dispatcher.prototype.unregister_allevent = function (hander) {
            for (var i in this.m_handler_map) {
                if (this.m_handler_map.hasOwnProperty(i)) {
                    this.unregister_event(i, hander);
                }
            }
        };
        game_event_dispatcher.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            if (this.m_handler_map.hasOwnProperty(event)) {
                var arr = this.m_handler_map[event];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var i = arr_1[_i];
                    i.on_event(event, user_data);
                }
            }
        };
        game_event_dispatcher.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            this.m_handler_next_frame_map[event] = user_data;
        };
        game_event_dispatcher.prototype.dispatch_all_delay_event = function () {
            if (this.m_pause) {
                return;
            }
            var tmpmap = this.m_handler_next_frame_map;
            this.m_handler_next_frame_map = new Object();
            for (var _i = 0, _a = Object.keys(tmpmap); _i < _a.length; _i++) {
                var prop = _a[_i];
                this.fire_event(prop, tmpmap[prop]);
            }
        };
        game_event_dispatcher.prototype.dispose = function () {
            this.m_handler_map = new Object();
            this.m_handler_next_frame_map = new Object();
        };
        return game_event_dispatcher;
    }());
    utils.game_event_dispatcher = game_event_dispatcher;
    var g_event_ins = null;
    function event_ins() {
        if (g_event_ins == null) {
            g_event_ins = new game_event_dispatcher();
        }
        return g_event_ins;
    }
    utils.event_ins = event_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_event_dispatcher.js.map