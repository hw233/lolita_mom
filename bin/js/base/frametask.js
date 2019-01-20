var frametask;
(function (frametask) {
    function task_comp(a, b) {
        if (a.m_weight > b.m_weight) {
            return 1;
        }
        return 0;
    }
    var task = /** @class */ (function () {
        function task(c, f, weight, id) {
            this.m_caller = null;
            this.m_func = null;
            this.m_max_weight = 0;
            this.m_id = 0;
            this.m_weight = 0;
            this.m_caller = c;
            this.m_func = f;
            this.m_max_weight = weight;
            this.m_weight = this.m_max_weight;
            this.m_id = id;
        }
        task.prototype.run = function (delta) {
            if (this.m_weight > 0 && delta < 0) {
                this.m_weight -= 1;
                return;
            }
            this.m_func.apply(this.m_caller);
            this.m_weight = this.m_max_weight;
        };
        return task;
    }());
    var task_mgr = /** @class */ (function () {
        function task_mgr() {
            this.m_tlist = new Array();
            this.m_task_count = 0;
        }
        task_mgr.prototype.sort = function () {
            this.m_tlist.sort(task_comp);
        };
        task_mgr.prototype.run = function (delta) {
            var start_time = laya.utils.Browser.now();
            var cur_time;
            this.sort();
            for (var _i = 0, _a = this.m_tlist; _i < _a.length; _i++) {
                var i = _a[_i];
                cur_time = laya.utils.Browser.now();
                delta = delta + start_time - cur_time;
                start_time = cur_time;
                i.run(delta);
            }
        };
        task_mgr.prototype.add_task = function (caller, call_func, weight) {
            if (weight === void 0) { weight = 1; }
            this.del_task(caller, call_func);
            this.m_tlist.push(new task(caller, call_func, weight, this.m_task_count));
            this.m_task_count += 1;
        };
        task_mgr.prototype.del_task = function (caller, call_func) {
            for (var i = this.m_tlist.length - 1; i >= 0; --i) {
                if (this.m_tlist[i].m_caller == caller && this.m_tlist[i].m_func == call_func) {
                    this.m_tlist.splice(i, 1);
                }
            }
        };
        return task_mgr;
    }());
    var g_task_ins = null;
    function ins() {
        if (g_task_ins == null) {
            g_task_ins = new task_mgr();
        }
        return g_task_ins;
    }
    function add_task(caller, call_func, weight) {
        if (weight === void 0) { weight = 1; }
        ins().add_task(caller, call_func, weight);
    }
    frametask.add_task = add_task;
    function del_task(caller, call_func) {
        ins().del_task(caller, call_func);
    }
    frametask.del_task = del_task;
    function run(delta) {
        ins().run(delta);
    }
    frametask.run = run;
})(frametask || (frametask = {}));
//# sourceMappingURL=frametask.js.map