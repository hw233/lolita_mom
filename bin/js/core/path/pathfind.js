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
var core;
(function (core) {
    var pathfindnode = /** @class */ (function (_super) {
        __extends(pathfindnode, _super);
        function pathfindnode(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, x, y) || this;
            _this.m_g = 0;
            _this.m_h = 0;
            _this.m_f = 0;
            _this.m_key = 0; //x*100000+y;
            _this.m_parent_x = 0; //;
            _this.m_parent_y = 0;
            _this.m_key = pathfindnode._genkey(x, y);
            return _this;
        }
        pathfindnode._genkey = function (x, y) {
            return x * 10000 + y;
        };
        pathfindnode.prototype.init = function (x, y) {
            this.setTo(x, y);
            this.m_key = pathfindnode._genkey(x, y);
        };
        pathfindnode.prototype.calc = function (dx, dy) {
            this.m_h = Math.sqrt(Math.abs((dx - this.x) * (dx - this.x)) + Math.abs((dy - this.y) * (dy - this.y)));
            this.m_f = this.m_g + this.m_h;
            return;
        };
        return pathfindnode;
    }(laya.maths.Point));
    core.pathfindnode = pathfindnode;
    var pathfind = /** @class */ (function () {
        function pathfind(mb, w, h) {
            this.m_g_h = 10;
            this.m_g_c = 14;
            this.m_map_block_ref = null;
            this.m_block_w_num = 0;
            this.m_block_h_num = 0;
            this.m_open_heap = new utils.small_heap();
            this.m_open_flag = new Object();
            this.m_close_flag = new Object();
            this.m_map_block_ref = mb;
            this.m_block_w_num = w;
            this.m_block_h_num = h;
        }
        pathfind.prototype.set_block = function (mb, w, h) {
            this.m_map_block_ref = mb;
            this.m_block_w_num = w;
            this.m_block_h_num = h;
        };
        pathfind.prototype._get_pfd = function (x, y) {
            var ret = utils.getitembycls("pathfindnode", pathfindnode);
            ret.init(x, y);
            return ret;
        };
        pathfind.prototype._del_pfd = function (nd) {
            utils.recover("pathfindnode", nd);
        };
        pathfind.prototype._clear_pfd_cache = function () {
            utils.clearbysign("pathfindnode");
        };
        pathfind.prototype._clear_openclose_flag = function () {
            for (var key in this.m_open_flag) {
                if (this.m_open_flag.hasOwnProperty(key)) {
                    var tmp = this.m_open_flag[key];
                    if (tmp != null && tmp != undefined) {
                        this._del_pfd(tmp);
                    }
                }
            }
            this.m_open_flag = new Object();
            for (var key in this.m_close_flag) {
                if (this.m_close_flag.hasOwnProperty(key)) {
                    var tmp = this.m_close_flag[key];
                    if (tmp != null && tmp != undefined) {
                        this._del_pfd(tmp);
                    }
                }
            }
            this.m_close_flag = new Object();
        };
        pathfind.prototype._add_node = function (x, y, cx, cy, cur_g, dx, dy) {
            var nd_key;
            var hp_idx;
            var pfn;
            var node;
            nd_key = pathfindnode._genkey(cx, cy);
            //已经在闭列表里，什么都不做
            if (this.m_close_flag[nd_key] == undefined) {
                //如果不在，判定是否已经在开列表里
                //如果在，判定是否要修正f值
                if (this.m_open_flag[nd_key] != undefined) {
                    pfn = this.m_open_flag[nd_key];
                    if (cur_g < pfn.m_g) {
                        pfn.m_g = cur_g;
                        pfn.m_f = pfn.m_g + pfn.m_h;
                        pfn.m_parent_x = x;
                        pfn.m_parent_y = y;
                        hp_idx = this.m_open_heap.get_idx(pfn.m_key);
                        this.m_open_heap.modify(hp_idx, pfn.m_f);
                    }
                }
                else {
                    //判断是否在障碍里，如果不在，则判断是否目的地，如果是，则直接结束
                    if (this.m_map_block_ref.is_block_cache(cx, cy) == false) {
                        node = this._get_pfd(cx, cy);
                        node.m_parent_x = x;
                        node.m_parent_y = y;
                        if (cx == dx && cy == dy) {
                            this.m_close_flag[node.m_key] = node;
                            return true;
                        }
                        //不是目的地，添加到开列表里
                        node.m_g = cur_g;
                        node.calc(dx, dy);
                        this.m_open_heap.push(node.m_h, node.m_key);
                        this.m_open_flag[node.m_key] = node;
                        //core.core_tiplog("pathfind while add ",node.m_key,node.m_key);
                    }
                }
            }
            return false;
        };
        pathfind.prototype.findpath = function (sx, sy, dx, dy, bclostest) {
            if (sx == dx && sy == dy) {
                core.core_tiplog("pathfind findpath sx=dx sy=dy return null", sx, sy, dx, dy);
                return null;
            }
            //目标点是否在障碍里，如果是，拉一条直线，找到第一个非障碍点替代目标点
            if (this.m_map_block_ref.is_block_cache(sx, sy)) {
                core.core_tiplog("pathfind findpath sx sy is in block return null", sx, sy, dx, dy);
                return null;
            }
            var gridline = utils.genpointlinefrom2point(sx, sy, dx, dy, this.m_map_block_ref.m_grid_w, this.m_map_block_ref.m_grid_h);
            if (gridline == null || gridline.length <= 0) {
                core.core_tiplog("pathfind gen first line failed return null", sx, sy, dx, dy);
                return null;
            }
            var i;
            var line_count = gridline.length;
            var pt;
            if (this.m_map_block_ref.is_block_cache(dx, dy)) {
                if (bclostest == false) {
                    core.core_tiplog("pathfind findpath dx dy is in block and bclosest = false return null", sx, sy, dx, dy);
                    return null;
                }
                for (i = 0; i < line_count; ++i) {
                    pt = gridline[line_count - i - 1];
                    if (this.m_map_block_ref.is_block_cache(pt.x, pt.y)) {
                        gridline.splice(line_count - i - 1, 1);
                    }
                    else {
                        break;
                    }
                }
                if (gridline.length <= 1) //if only src is in the line,failed;
                 {
                    core.core_tiplog("pathfind findpath firstline only have 1 point return null", sx, sy, dx, dy);
                    return null;
                }
                dx = gridline[gridline.length - 1].x;
                dy = gridline[gridline.length - 1].y;
                core.core_tiplog("pathfind findpath get substitution of dest ", dx, dy);
            }
            //目标点和起点是否中间没有障碍可以直接到达，如果是，直接返回
            line_count = gridline.length;
            if (this.has_ptline_block(gridline) == false) {
                var ret = new Array();
                ret.push(new laya.maths.Point(sx, sy));
                ret.push(new laya.maths.Point(dx, dy));
                core.core_tiplog("pathfind findpath dx dy can get directly return true", sx, sy, dx, dy);
                return ret;
            }
            core.core_tiplog("pathfind findpath dx dy can not get directly ", sx, sy, dx, dy, gridline.length, gridline);
            //
            var bfind = false;
            this.m_open_heap.clear();
            this._clear_openclose_flag();
            var node = this._get_pfd(sx, sy);
            node.m_g = 0;
            node.calc(dx, dy);
            node.m_parent_x = -1;
            node.m_parent_y = -1;
            this.m_open_heap.push(node.m_h, node.m_key);
            //core.core_tiplog("pathfind while add first",node.m_key,node.m_key);
            this.m_open_flag[node.m_key] = node;
            while (true) {
                if (this.m_open_heap.is_empty()) {
                    break;
                }
                var curnode = this.m_open_heap.top();
                var curnode_id = curnode.m_user_id;
                this.m_open_heap.pop();
                //this.m_open_heap.print_data();
                var pfn = this.m_open_flag[curnode_id];
                //core.core_tiplog("pathfind while pop ",curnode_id,pfn.m_key);
                this.m_close_flag[pfn.m_key] = pfn;
                this.m_open_flag[pfn.m_key] = undefined;
                bfind = this._add_node(pfn.x, pfn.y, pfn.x + 1, pfn.y, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x - 1, pfn.y, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x, pfn.y + 1, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x, pfn.y - 1, pfn.m_g + this.m_g_h, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x + 1, pfn.y + 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x + 1, pfn.y - 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x - 1, pfn.y + 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
                bfind = this._add_node(pfn.x, pfn.y, pfn.x - 1, pfn.y - 1, pfn.m_g + this.m_g_c, dx, dy);
                if (bfind) {
                    break;
                }
            }
            if (bfind == false) //没找到
             {
                core.core_tiplog("pathfind findpath failed return null", sx, sy, dx, dy);
                return null;
            }
            //生成路径链表
            var dst_node_key = pathfindnode._genkey(dx, dy);
            var tmp_path = Array();
            while (true) {
                var dst_node = this.m_close_flag[dst_node_key];
                if (dst_node.m_parent_x == -1 && dst_node.m_parent_y == -1) {
                    tmp_path.push(new laya.maths.Point(dst_node.x, dst_node.y));
                    break;
                }
                //core.core_tiplog("pathfind findpath push path ",dst_node.x,dst_node.y);
                tmp_path.push(new laya.maths.Point(dst_node.x, dst_node.y));
                dst_node_key = pathfindnode._genkey(dst_node.m_parent_x, dst_node.m_parent_y);
            }
            tmp_path.reverse();
            line_count = tmp_path.length;
            //core.core_tiplog("pathfind findpath before optimal 1 ",sx,sy,dx,dy,tmp_path)
            if (line_count > 2) {
                //去掉处在同一条直线上的连续三个点中间那个
                var start = 0;
                var mid = 1;
                var end = 2;
                while (true) {
                    var a = tmp_path[start];
                    var b = tmp_path[mid];
                    var c = tmp_path[end];
                    var bdel = false;
                    if (b.x == a.x && c.x == b.x) {
                        bdel = true;
                    }
                    else if (b.y == a.y && c.y == b.y) {
                        bdel = true;
                    }
                    else if (((b.x - a.x) == (c.x - b.x)) && ((b.y - a.y) == (c.y - b.y))) {
                        bdel = true;
                    }
                    if (bdel) {
                        tmp_path.splice(mid, 1);
                        mid = start + 1;
                        end = mid + 1;
                    }
                    else {
                        start = mid;
                        mid = start + 1;
                        end = mid + 1;
                    }
                    if (end >= tmp_path.length) {
                        break;
                    }
                }
            }
            //core.core_tiplog("pathfind findpath before optimal 2 ",sx,sy,dx,dy,tmp_path)
            //将寻出来的路径进行折半查找，将中间可连成直线的路径点优化
            line_count = tmp_path.length;
            if (line_count > 3) //小于3个点是不存在的，2个点可以直接到达，3个点不可能减到2个点
             {
                //for(i = 0;i < tmp_path.length;++i)
                //{
                //    core.core_tiplog("before delsurpluspoint ",i,tmp_path[i].x,tmp_path[i].y);
                //}
                var tmp_path2 = this.delsurpluspoint(tmp_path);
                tmp_path = tmp_path2;
                //for(i = 0;i < tmp_path.length;++i)
                // {
                //     core.core_tiplog("after delsurpluspoint ",i,tmp_path[i].x,tmp_path[i].y);
                // }
            }
            core.core_tiplog("pathfind findpath normal end return true ", sx, sy, dx, dy, tmp_path);
            return tmp_path;
        };
        pathfind.prototype.has_ptline_block = function (pt_line) {
            var line_count = pt_line.length;
            //core.core_tiplog("pathfind has_ptline_block ",line_count);
            for (var i = 0; i < line_count; ++i) {
                var pt = pt_line[i];
                //core.core_tiplog("pathfind has_ptline_block x y ",pt.x,pt.y);
                if (this.m_map_block_ref.is_block_cache(pt.x, pt.y)) {
                    return true;
                }
            }
            return false;
        };
        pathfind.prototype.delsurpluspoint = function (path) {
            if (path.length < 3) {
                return path;
            }
            var ret = new Array();
            var min = 0;
            var max = 0;
            var start = new laya.maths.Point();
            start.x = path[0].x;
            start.y = path[0].y;
            path.splice(0, 1);
            min = 0;
            max = path.length - 1;
            var b_continue = true;
            while (b_continue) {
                if (path.length <= 1) {
                    //core.core_tiplog("delsurpluspoint end ",start.x,start.y,path.length,ret.length);
                    ret.push(start);
                    if (path.length > 0) {
                        ret.push(new laya.maths.Point(path[0].x, path[0].y));
                    }
                    //ret.concat(path);
                    b_continue = false;
                    break;
                }
                else {
                    var cur = (min + max) >> 1;
                    var curpt = path[cur];
                    //core.core_tiplog("delsurpluspoint ",start.x,start.y,curpt.x,curpt.y,min,max,cur,path.length);
                    if (this.has_block_between_2pt(start.x, start.y, curpt.x, curpt.y)) {
                        //core.core_tiplog("has_block 1 ",min,max,cur,path.length);
                        max = cur;
                        if (max == min) //下一个已经是第一个点，表示目前除了第一个点，后面都没有能直接到的，则进行修改起始点操作
                         {
                            ret.push(start);
                            //core.core_tiplog('delsurpluspoint push 1 ',start.x,start.y);
                            start = new laya.maths.Point();
                            start.x = path[min].x;
                            start.y = path[min].y;
                            if (min == 0) {
                                min = 1;
                            }
                            path.splice(0, min);
                            min = 0;
                            max = path.length - 1;
                        }
                        //core.core_tiplog("has_block 2 ",min,max,cur,path.length);
                    }
                    else {
                        //core.core_tiplog("has not block 1 ",min,max,cur,path.length);
                        //这里没有判断cur+1是否不可直接到（要找的目标点),因为在删除操作后，下次判断到它后面那个不可直接到达点时
                        //会将max前移，然后会将start保存，而将cur设为新的start
                        if (cur == 0) //当前计算出的cur为0，只有可能min为0，max为1
                         {
                            //手动删除第一个，固定前移，避免死循环
                            var tmp = path[cur + 1];
                            if (this.has_block_between_2pt(start.x, start.y, tmp.x, tmp.y)) //不能直接到后一个
                             {
                                //core.core_tiplog('delsurpluspoint push 2 ',start.x,start.y);
                                ret.push(start);
                                start = new laya.maths.Point();
                                start.x = path[cur].x;
                                start.y = path[cur].y;
                                //修改新的起始点
                            }
                            //能直接到后一个，则直接删除当前第一个点
                            path.splice(0, 1);
                        }
                        else {
                            path.splice(0, cur); //删掉当前前面所有点，没有删掉当前点，因为没有用cur+1
                        }
                        min = 0; //重新取min和max
                        max = path.length - 1;
                        //core.core_tiplog("has not block 2 ",min,max,cur,path.length);
                    }
                }
            }
            return ret;
        };
        pathfind.prototype.has_block_between_2pt = function (sx, sy, dx, dy) {
            var gridline = utils.genpointlinefrom2point(sx, sy, dx, dy, this.m_map_block_ref.m_grid_w, this.m_map_block_ref.m_grid_h);
            if (gridline == null || gridline.length <= 0) {
                return true;
            }
            return this.has_ptline_block(gridline);
        };
        pathfind.prototype.dispose = function () {
            this._clear_openclose_flag();
        };
        return pathfind;
    }());
    core.pathfind = pathfind;
})(core || (core = {}));
//# sourceMappingURL=pathfind.js.map