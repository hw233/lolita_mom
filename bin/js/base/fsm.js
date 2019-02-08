var fsm;
(function (fsm) {
    var fsm_state_base = /** @class */ (function () {
        function fsm_state_base() {
            this.m_start_id = 0;
            this.m_event_id = 0;
            this.m_end_id = 0;
            this.m_desc = "unknown state";
            this.m_caller = null;
            this.m_func = null;
        }
        fsm_state_base.prototype.re_init = function (sid, e, eid, desc, caller, func) {
            this.m_start_id = sid;
            this.m_event_id = e;
            this.m_end_id = eid;
            this.m_desc = desc;
            this.m_caller = caller;
            this.m_func = func;
        };
        fsm_state_base.prototype.dispose = function () {
            this.m_caller = null;
            this.m_func = null;
        };
        return fsm_state_base;
    }());
    fsm.fsm_state_base = fsm_state_base;
    var fsm_base = /** @class */ (function () {
        function fsm_base() {
            this.m_cur_state = 0;
            this.m_fsm_group = new Object();
        }
        fsm_base.prototype._genkey = function (sid, e) {
            return sid * 10000 + e;
        };
        fsm_base.prototype.set_state = function (sid, e, eid, desc, caller, func) {
            var key = this._genkey(sid, e);
            var new_state = utils.getitembycls("fsm_state_base", fsm_state_base);
            new_state.re_init(sid, e, eid, desc, caller, func);
            this.m_fsm_group[key] = new_state;
        };
        fsm_base.prototype.clear_state = function () {
            for (var _i = 0, _a = Object.keys(this.m_fsm_group); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_fsm_group.hasOwnProperty(key)) {
                    var s = this.m_fsm_group[parseInt(key)];
                    utils.recover("fsm_state_base", s);
                }
            }
            this.m_fsm_group = new Object();
            this.m_cur_state = 0;
        };
        fsm_base.prototype.start = function (sid) {
            this.m_cur_state = sid;
        };
        fsm_base.prototype.next = function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var key = this._genkey(this.m_cur_state, e);
            var state = this.m_fsm_group[key];
            while (state != null) {
                var next_state = state.m_end_id;
                var ret = true;
                if (state.m_func != null) {
                    ret = state.m_func.apply(this, args);
                }
                if (ret) {
                    this.m_cur_state = next_state;
                }
                return this.m_cur_state;
            }
            return -1;
        };
        fsm_base.prototype.dispose = function () {
            this.clear_state();
        };
        return fsm_base;
    }());
    fsm.fsm_base = fsm_base;
})(fsm || (fsm = {}));
//# sourceMappingURL=fsm.js.map