var utils;
(function (utils) {
    var heap_node = /** @class */ (function () {
        function heap_node(v, uid, ud) {
            if (v === void 0) { v = 0; }
            if (uid === void 0) { uid = 0; }
            if (ud === void 0) { ud = null; }
            this.m_value = 0;
            this.m_user_data = null;
            this.m_user_id = 0;
            this.m_value = v;
            this.m_user_id = uid;
            if (ud == null) {
                ud = new Object();
            }
            this.m_user_data = ud;
        }
        heap_node.prototype.init = function (v, uid, ud) {
            this.m_value = v;
            this.m_user_id = uid;
            if (ud == null) {
                ud = new Object();
            }
            this.m_user_data = ud;
        };
        return heap_node;
    }());
    utils.heap_node = heap_node;
    var small_heap = /** @class */ (function () {
        function small_heap() {
            this.m_array = new Array();
        }
        small_heap.prototype._get_nd = function (v, uid, ud) {
            if (uid === void 0) { uid = 0; }
            if (ud === void 0) { ud = null; }
            var ret = utils.getitembycls("heap_node", heap_node);
            ret.init(v, uid, ud);
            return ret;
        };
        small_heap.prototype._del_nd = function (nd) {
            utils.recover("heap_node", nd);
        };
        small_heap.prototype._clear_nd = function () {
            utils.clearbysign("heap_node");
        };
        small_heap.prototype._cmp_v = function (v1, v2) {
            return v1 < v2;
        };
        small_heap.prototype._filter_up = function (start) {
            var idx;
            var i = start;
            var nd = this.m_array[i];
            var nd_v = nd.m_value;
            var nd_id = nd.m_user_id;
            var nd_obj = nd.m_user_data;
            while (i > 0) {
                idx = (i - 1) >> 1;
                //core.core_tiplog("_filter_up ",start,i,idx);
                if (this._cmp_v(nd_v, this.m_array[idx].m_value)) {
                    this.m_array[i].m_value = this.m_array[idx].m_value;
                    this.m_array[i].m_user_id = this.m_array[idx].m_user_id;
                    this.m_array[i].m_user_data = this.m_array[idx].m_user_data;
                    this.m_array[i].m_user_data['idx'] = i;
                    //this.print_data("filter_up swap");
                    i = idx;
                }
                else {
                    break;
                }
            }
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            //this.print_data("filter_up end");
            return i;
        };
        small_heap.prototype._filter_down = function (start) {
            var idx;
            var i = start;
            var tmp = 0;
            var i1 = 0;
            var i2 = 0;
            var total = this.m_array.length;
            var nd = this.m_array[i];
            var nd_v = nd.m_value;
            var nd_id = nd.m_user_id;
            var nd_obj = nd.m_user_data;
            while (true) {
                i1 = (i << 1) + 1;
                i2 = (i << 1) + 2;
                if (i1 >= total) //have no more child
                 {
                    break;
                }
                var f = (i2 < total) && (this._cmp_v(this.m_array[i2].m_value, this.m_array[i1].m_value));
                tmp = f ? i2 : i1; //find better child
                //core.core_tiplog("filter down ",tmp,i2,i1,this.m_array[tmp].m_value,nd.m_value,i,this.m_array[i].m_value);
                if (this._cmp_v(this.m_array[tmp].m_value, nd_v)) {
                    //child is better
                    //this.m_array[i] = this.m_array[tmp];
                    this.m_array[i].m_value = this.m_array[tmp].m_value;
                    this.m_array[i].m_user_id = this.m_array[tmp].m_user_id;
                    this.m_array[i].m_user_data = this.m_array[tmp].m_user_data;
                    this.m_array[i].m_user_data['idx'] = i;
                }
                else {
                    break;
                }
                i = tmp;
            }
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            return i;
        };
        small_heap.prototype.push = function (v, uid, ud) {
            if (uid === void 0) { uid = 0; }
            if (ud === void 0) { ud = null; }
            //core.core_tiplog("smallheap push ",v,uid);
            var nd = this._get_nd(v, uid, ud);
            this.m_array.push(nd);
            this._filter_up(this.m_array.length - 1);
            //this.print_data();
            return nd;
        };
        small_heap.prototype.pop = function () {
            //core.core_tiplog("smallheap pop ",this.m_array[0].m_value,this.m_array[0].m_user_id,this.m_array.length);
            if (this.m_array.length <= 1) {
                this._del_nd(this.top());
                this.m_array.pop();
                return;
            }
            var nd = this.m_array[this.m_array.length - 1];
            var nd_v = nd.m_value;
            var nd_id = nd.m_user_id;
            var nd_obj = nd.m_user_data;
            var i = 0;
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            //this.m_array[0] = this.m_array[this.m_array.length-1];
            //core.core_tiplog("smallheap pop size ",this.m_array.length);
            this._del_nd(this.m_array[this.m_array.length - 1]);
            this.m_array.splice(this.m_array.length - 1, 1);
            //core.core_tiplog("smallheap pop size2 ",this.m_array.length);
            this._filter_down(i);
            //this.print_data();
            return;
        };
        small_heap.prototype.get_idx = function (id) {
            for (var i = 0; i < this.m_array.length; ++i) {
                var nd = this.m_array[i];
                if (nd.m_user_id == id) {
                    return i;
                }
            }
            return -1;
        };
        small_heap.prototype.modify = function (idx, v) {
            var nd = this.m_array[idx];
            //core.core_tiplog("smallheap modify ",idx,v,nd.m_value,nd.m_user_id);
            if (nd.m_value == v) {
                return;
            }
            if (this._cmp_v(nd.m_value, v)) //new v is bigger
             {
                nd.m_value = v;
                this._filter_down(idx);
            }
            else {
                nd.m_value = v;
                this._filter_up(idx);
            }
            //this.print_data();
        };
        small_heap.prototype.clear = function () {
            for (var i = 0; i < this.m_array.length; ++i) {
                this._del_nd(this.m_array[i]);
            }
            this.m_array = new Array();
        };
        small_heap.prototype.top = function () {
            return this.m_array[0];
        };
        small_heap.prototype.is_empty = function () {
            return this.m_array.length <= 0;
        };
        small_heap.prototype.print_data = function (pre) {
            if (pre === void 0) { pre = ""; }
            core.core_tiplog("smallheap begin ", pre, this.m_array.length);
            for (var _i = 0, _a = this.m_array; _i < _a.length; _i++) {
                var i = _a[_i];
                core.core_tiplog("smallheap ", pre, i.m_value, i.m_user_id);
            }
            core.core_tiplog("smallheap end ", pre);
        };
        return small_heap;
    }());
    utils.small_heap = small_heap;
})(utils || (utils = {}));
//# sourceMappingURL=heap.js.map