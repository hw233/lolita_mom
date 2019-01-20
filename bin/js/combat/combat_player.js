var combat;
(function (combat) {
    function player_sort(a, b) {
        return a.m_sortnum - b.m_sortnum; //a - b small 2 big;b - a big 2 small
    }
    var combat_playernode = /** @class */ (function () {
        function combat_playernode(tm, event, user_data, mgr) {
            this.m_tm = 0;
            this.m_idx = 0;
            this.m_sortnum = 0;
            this.m_event = "";
            this.m_ud = null;
            this.m_tm = tm;
            this.m_event = event;
            this.m_ud = user_data;
            this.m_mgr = mgr;
        }
        combat_playernode.prototype.set_idx = function (idx) {
            this.m_idx = idx;
            this.m_sortnum = this.m_tm + this.m_idx * 1.0 / 100.0;
        };
        combat_playernode.prototype.do = function (tm) {
            if (tm < this.m_tm) {
                return false;
            }
            this.m_mgr.fire_event(this.m_event, this.m_ud);
            return true;
        };
        return combat_playernode;
    }());
    combat.combat_playernode = combat_playernode;
    var combat_player = /** @class */ (function () {
        function combat_player() {
            this.m_arr = new Array();
            this.m_b_end = false;
            this.m_cur_tm = 0;
            this.m_cur_idx = 0;
            this.m_max_idx = 0;
        }
        combat_player.prototype.addnode = function (node) {
            node.set_idx(this.m_arr.length);
            this.m_arr.push(node);
        };
        combat_player.prototype.start = function () {
            this.m_arr.sort(player_sort);
            this.m_cur_tm = 0;
            this.m_cur_idx = 0;
            this.m_max_idx = this.m_arr.length;
            this.m_b_end = false;
        };
        combat_player.prototype.clear = function () {
            this.m_arr = new Array();
            this.m_b_end = true;
        };
        combat_player.prototype.is_end = function () {
            return this.m_b_end;
        };
        combat_player.prototype.update = function (delta) {
            if (this.is_end()) {
                return;
            }
            this.m_cur_tm = this.m_cur_tm + delta;
            for (var i = this.m_cur_idx; i < this.m_max_idx; ++i) {
                var node = this.m_arr[i];
                if (node.do(this.m_cur_tm) == false) {
                    this.m_cur_idx = i;
                    return;
                }
            }
            this.m_b_end = true;
        };
        return combat_player;
    }());
    combat.combat_player = combat_player;
})(combat || (combat = {}));
//# sourceMappingURL=combat_player.js.map