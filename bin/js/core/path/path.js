var core;
(function (core) {
    var path = /** @class */ (function () {
        function path(spd) {
            this.m_nodes = null;
            this.m_dir_count = 8;
            this.m_speed = 300; //pixels per sec
            this.m_ret_node = null;
            this.m_unit_id = 0;
            this.m_force_dir = -1;
            this.m_nodes = new Array();
            this.init(spd);
        }
        path.prototype.init = function (spd) {
            this.m_speed = spd;
            this.m_ret_node = utils.getitembycls("pathnode", core.pathnode);
            this.m_ret_node.init(0, 0, 0, 0);
            this.m_force_dir = -1;
        };
        path.prototype.push_pt = function (sx, sy, dx, dy) {
            var node = utils.getitembycls("pathnode", core.pathnode);
            node.init(sx, sy, dx, dy, this.m_dir_count);
            node.cal_total_tm(this.m_speed);
            var tm = 0;
            if (this.m_nodes.length > 0) {
                var last = this.m_nodes[this.m_nodes.length - 1];
                tm = last.m_start_tm + last.m_total_tm;
            }
            else {
                this.m_ret_node.x = node.x;
                this.m_ret_node.y = node.y;
                this.m_ret_node.m_dir = node.m_dir;
            }
            node.m_start_tm = tm;
            this.m_nodes.push(node);
        };
        path.prototype.start = function () {
            this.m_cur_tm = 0;
            this.m_cur_node_idx = 0;
        };
        path.prototype.update = function (delta) {
            if (this.m_nodes.length <= 0) {
                return;
            }
            this.m_cur_tm += delta;
            while (this.m_cur_node_idx < this.m_nodes.length) {
                var node = this.m_nodes[this.m_cur_node_idx];
                if (this.m_cur_tm >= (node.m_start_tm + node.m_total_tm)) {
                    this.m_cur_node_idx++;
                }
                else {
                    break;
                }
            }
        };
        path.prototype.get_end = function () {
            return this.m_nodes[this.m_nodes.length - 1].m_end_pt;
        };
        path.prototype.is_end = function () {
            return this.m_cur_node_idx >= this.m_nodes.length;
        };
        path.prototype.get_cur_pt = function () {
            var idx = this.m_cur_node_idx < this.m_nodes.length ? this.m_cur_node_idx : this.m_nodes.length - 1;
            var cur_node = this.m_nodes[idx].get_pos(this.m_cur_tm);
            this.m_ret_node.x = cur_node.x;
            this.m_ret_node.y = cur_node.y;
            this.m_ret_node.m_dir = this.m_nodes[idx].m_dir;
            if (this.m_force_dir >= 0) {
                this.m_ret_node.m_dir = this.m_force_dir;
            }
            return this.m_ret_node;
        };
        path.prototype.dispose = function () {
            for (var _i = 0, _a = this.m_nodes; _i < _a.length; _i++) {
                var i = _a[_i];
                utils.recover("pathnode", i);
            }
            this.m_nodes.length = 0;
            utils.recover("pathnode", this.m_ret_node);
            this.m_ret_node = null;
        };
        return path;
    }());
    core.path = path;
})(core || (core = {}));
//# sourceMappingURL=path.js.map