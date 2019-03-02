var core;
(function (core) {
    var rendermap = /** @class */ (function () {
        function rendermap() {
            this.m_bk = null;
            this.m_scrollbk = null;
            this.m_mapid = 0;
            this.m_bk = null;
            this.m_scrollbk = null;
            this.m_slots = new Array();
            this.m_block = new core.rendermapblock();
            this.m_pathfind = new core.pathfind(null, 0, 0);
        }
        rendermap.prototype.setmapid = function (mapid, b_create_slot) {
            if (b_create_slot === void 0) { b_create_slot = true; }
            core.core_tiplog("rendermap setmapid 1 ", mapid, this.m_mapid);
            if (mapid == this.m_mapid) {
                return;
            }
            this.clear();
            if (mapid == 0) {
                return;
            }
            core.core_tiplog("rendermap setmapid 2 ", mapid, this.m_mapid);
            this.m_mapid = mapid;
            this.m_block.setmapid(this.m_mapid);
            var mapw = core.matinfo_mgr().getmapw(this.m_mapid);
            var maph = core.matinfo_mgr().getmaph(this.m_mapid);
            this.m_mapw = mapw;
            this.m_maph = maph;
            if (!b_create_slot) {
                return;
            }
            var gridw = core.matinfo_mgr().m_map_grid_w;
            var gridh = core.matinfo_mgr().m_map_grid_h;
            var colnum = mapw / gridw;
            var rownum = maph / gridh;
            for (var i = 0; i < colnum; ++i) //x
             {
                for (var j = 0; j < rownum; ++j) //y
                 {
                    var x = i * gridw;
                    var y = j * gridh;
                    var slot = utils.getitembycls("rendermapslot", core.rendermapslot);
                    slot.re_init(mapid, x, y, i, j);
                    //let slot:rendermapslot = new rendermapslot(mapid,x,y,i,j);
                    //core.core_tiplog("rendermap push slot ",x,y,i,j);
                    this.m_slots.push(slot);
                }
            }
        };
        rendermap.prototype.delallslot = function () {
            for (var _i = 0, _a = this.m_slots; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                utils.recover("rendermapslot", i);
            }
            this.m_slots = new Array();
        };
        rendermap.prototype.clear = function () {
            this.clearscrollbk();
            if (this.m_bk != null) {
                this.m_bk.dispose();
                utils.recover("rendermapbk", this.m_bk);
                this.m_bk = null;
            }
            this.delallslot();
            this.m_mapid = 0;
        };
        rendermap.prototype.is_block = function (sx, sy) {
            var bw = this.m_block.m_mat.m_grid_w;
            var bh = this.m_block.m_mat.m_grid_h;
            var ssx = Math.floor(sx / bw);
            var ssy = Math.floor(sy / bh);
            return this.m_block.m_mat.is_block_cache(ssx, ssy);
        };
        rendermap.prototype.is_mask = function (sx, sy) {
            var bw = this.m_block.m_mat.m_grid_w;
            var bh = this.m_block.m_mat.m_grid_h;
            var ssx = Math.floor(sx / bw);
            var ssy = Math.floor(sy / bh);
            return this.m_block.m_mat.is_mask_cache(ssx, ssy);
        };
        rendermap.prototype.findpath = function (sx, sy, dx, dy, bclosest, spd) {
            var starttm = utils.get_render_milltm();
            //core.core_tiplog("rendermap findpath start time ",sx,sy,dx,dy,starttm);
            var bw = this.m_block.m_mat.m_grid_w;
            var bh = this.m_block.m_mat.m_grid_h;
            var ssx = Math.floor(sx / bw);
            var ssy = Math.floor(sy / bh);
            var ddx = Math.floor(dx / bw);
            var ddy = Math.floor(dy / bh);
            //core.core_tiplog("grid pos ",ssx,ssy,ddx,ddy,bw,bh);
            this.m_pathfind.set_block(this.m_block.m_mat, this.m_block.m_mat.m_block_w_num, this.m_block.m_mat.m_block_h_num);
            var ret = this.m_pathfind.findpath(ssx, ssy, ddx, ddy, bclosest);
            var endtm = utils.get_render_milltm();
            //core.core_tiplog("rendermap findpath end time ",sx,sy,dx,dy,endtm,endtm - starttm);
            //core.core_tiplog("findpath cost++++++++++ ",endtm - starttm);
            if (ret != null) {
                var lastnode = null;
                var retpath = utils.getitembycls("path", core.path);
                retpath.init(spd);
                for (var i = 0; i < ret.length; ++i) {
                    if (lastnode == null) {
                        lastnode = ret[i];
                    }
                    else {
                        if (i == 1) {
                            retpath.push_pt(sx, sy, ret[i].x * bw, ret[i].y * bh);
                        }
                        else {
                            retpath.push_pt(lastnode.x * bw, lastnode.y * bh, ret[i].x * bw, ret[i].y * bh);
                        }
                        lastnode = ret[i];
                    }
                }
                return retpath;
            }
            //
            return null;
        };
        rendermap.prototype.addscrollbk = function (res, w, h) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.addres(res, w, h);
        };
        rendermap.prototype.setscrollbkpos = function (x, y) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.setdeltapos(x, y);
        };
        rendermap.prototype.setscrollbkview = function (w, h) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.m_view_w = w;
        };
        rendermap.prototype.setscrollbkspd = function (spd) {
            if (this.m_scrollbk == null) {
                this.m_scrollbk = utils.getitembycls("rendermapscrollbk", core.rendermapscrollbk);
                this.m_scrollbk.re_init();
            }
            this.m_scrollbk.setspd(spd);
        };
        rendermap.prototype.clearscrollbk = function () {
            if (this.m_scrollbk != null) {
                this.m_scrollbk.dispose();
                utils.recover("rendermapscrollbk", this.m_scrollbk);
                this.m_scrollbk = null;
            }
        };
        rendermap.prototype.setbk = function (res) {
            if (res == null) {
                if (this.m_bk != null) {
                    this.m_bk.dispose();
                    utils.recover("rendermapbk", this.m_bk);
                    this.m_bk = null;
                }
                return;
            }
            if (this.m_bk == null) {
                this.m_bk = utils.getitembycls("rendermapbk", core.rendermapbk);
                this.m_bk.re_init();
            }
            //this.m_bk = new rendermapbk();
            this.m_bk.setres(res);
        };
        rendermap.prototype.setsp = function (sp) {
            if (this.m_bk == null) {
                //this.m_bk = new rendermapbk();
                this.m_bk = utils.getitembycls("rendermapbk", core.rendermapbk);
                this.m_bk.re_init();
            }
            this.m_bk.setsp(sp);
        };
        rendermap.prototype.removesp = function () {
            if (this.m_bk != null) {
                this.m_bk.clearsp();
            }
        };
        rendermap.prototype.dispose = function () {
            this.clear();
            if (this.m_block != null) {
                this.m_block.dispose();
                this.m_block = null;
            }
        };
        rendermap.prototype.update = function (delta) {
            if (this.m_scrollbk != null) {
                this.m_scrollbk.update(delta);
            }
        };
        rendermap.prototype.project = function (context) {
            var ret = false;
            if (this.m_scrollbk != null) {
                ret = this.m_scrollbk.project(context) || ret;
            }
            if (this.m_bk != null) {
                ret = this.m_bk.project(context) || ret;
            }
            if (this.m_block != null) {
                //ret = this.m_block.project(context) || ret;
            }
            var num = 0;
            for (var _i = 0, _a = this.m_slots; _i < _a.length; _i++) {
                var i = _a[_i];
                //core.core_tiplog("rendermap project slot ",num);
                ret = i.project(context) || ret;
                num++;
            }
            return ret;
        };
        return rendermap;
    }());
    core.rendermap = rendermap;
})(core || (core = {}));
//# sourceMappingURL=rendermap.js.map