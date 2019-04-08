var timer;
(function (timer_1) {
    var Timer = /** @class */ (function () {
        function Timer() {
            this.id = 0;
            this.interval = 0;
            this.trigger_ms_timestamp = 0;
            this.caller = null;
            this.callback_func = null;
        }
        return Timer;
    }());
    var timer_mgr = /** @class */ (function () {
        function timer_mgr() {
            this.cur_id = 0;
            this.timer_dict = new Laya.Dictionary(); //{id:Timer}
            this.caller_dict = new Laya.Dictionary(); //{caller:[id,...]}
        }
        timer_mgr.prototype.add_timer = function (interval, caller, callback_func) {
            var tid_arr = this.caller_dict.get(caller);
            if (tid_arr) {
                for (var _i = 0, tid_arr_1 = tid_arr; _i < tid_arr_1.length; _i++) {
                    var tid = tid_arr_1[_i];
                    var timer_2 = this.timer_dict.get(tid);
                    if (timer_2 && timer_2.callback_func == callback_func) {
                        core.game_tiplog("WARNING:timer_mgr add_timer repeat, id:", tid);
                        return tid;
                    }
                }
            }
            var timer = new Timer();
            var new_id = this._get_next_id();
            timer.id = new_id;
            timer.interval = interval;
            timer.trigger_ms_timestamp = laya.utils.Browser.now();
            timer.caller = caller;
            timer.callback_func = callback_func;
            this.timer_dict.set(new_id, timer);
            if (tid_arr == null)
                tid_arr = new Array();
            tid_arr.push(new_id);
            this.caller_dict.set(caller, tid_arr);
            return new_id;
        };
        timer_mgr.prototype._get_next_id = function () {
            this.cur_id += 1;
            return this.cur_id;
        };
        timer_mgr.prototype.remove_timer = function (t_id) {
            var timer = this.timer_dict.get(t_id);
            if (timer) {
                var tid_arr = this.caller_dict.get(timer.caller);
                if (tid_arr) {
                    var idx = tid_arr.indexOf(t_id);
                    if (idx >= 0)
                        tid_arr.splice(idx, 1);
                    if (tid_arr.length == 0)
                        this.caller_dict.remove(timer.caller);
                    else
                        this.caller_dict.set(timer.caller, tid_arr);
                }
            }
            this.timer_dict.remove(t_id);
        };
        timer_mgr.prototype.remove_all_timer = function (caller) {
            var tid_arr = this.caller_dict.get(caller);
            if (tid_arr) {
                for (var _i = 0, tid_arr_2 = tid_arr; _i < tid_arr_2.length; _i++) {
                    var tid = tid_arr_2[_i];
                    this.timer_dict.remove(tid);
                }
                this.caller_dict.remove(caller);
            }
        };
        timer_mgr.prototype.update = function (cur_ms_timestamp) {
            var timer_ins;
            var triger_list = new Array();
            for (var _i = 0, _a = this.timer_dict.values; _i < _a.length; _i++) {
                timer_ins = _a[_i];
                if (timer_ins.trigger_ms_timestamp < cur_ms_timestamp) {
                    timer_ins.trigger_ms_timestamp += timer_ins.interval;
                    triger_list.push(timer_ins);
                }
            }
            for (var _b = 0, triger_list_1 = triger_list; _b < triger_list_1.length; _b++) {
                timer_ins = triger_list_1[_b];
                if (timer_ins && timer_ins.caller && timer_ins.callback_func)
                    timer_ins.callback_func.apply(timer_ins.caller);
            }
        };
        return timer_mgr;
    }());
    var g_timer_mgr = null;
    function timer_ins() {
        if (g_timer_mgr == null) {
            g_timer_mgr = new timer_mgr();
        }
        return g_timer_mgr;
    }
    timer_1.timer_ins = timer_ins;
})(timer || (timer = {}));
//# sourceMappingURL=timer.js.map