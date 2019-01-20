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
var icon_mgr;
(function (icon_mgr) {
    //玩家描述
    var icon_bitmap = /** @class */ (function (_super) {
        __extends(icon_bitmap, _super);
        function icon_bitmap() {
            var _this = _super.call(this) || this;
            _this.m_ref_count = 0;
            _this.m_icon_path = "";
            _this.m_b_loaded = false;
            _this.m_b_loading = false;
            _this.m_owner = null;
            _this.m_id = 0;
            return _this;
        }
        icon_bitmap.prototype.addref = function () {
            this.m_ref_count += 1;
        };
        icon_bitmap.prototype.loadres = function () {
            if (this.m_b_loaded) {
                return;
            }
            this.m_b_loading = true;
            this.loadImage(this.m_icon_path, 0, 0, 0, 0, Laya.Handler.create(this, this.on_loaded));
        };
        icon_bitmap.prototype.on_loaded = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_loading = false;
            this.m_b_loaded = true;
        };
        icon_bitmap.prototype.delref = function () {
            this.m_ref_count -= 1;
        };
        icon_bitmap.prototype.can_release = function () {
            if (this.m_b_loading) {
                return false;
            }
            if (this.m_ref_count > 0) {
                return false;
            }
            return true;
        };
        icon_bitmap.prototype.dispose = function () {
            this.m_owner.recover_iconbm(this);
        };
        return icon_bitmap;
    }(Laya.Sprite));
    var icon_sub_set = /** @class */ (function () {
        function icon_sub_set() {
            this.m_atlas_path = "";
            this.m_prefix = "";
            this.m_b_loaded = false;
            this.m_b_loading = false;
            this.m_loaderrorcount = 0;
            this.m_start_id = 0;
            this.m_end_id = 0;
            this.m_iconbm_idle = new Object();
            this.m_iconbm_used = new Object();
            this.m_idle_num = 0;
            this.m_used_num = 0;
        }
        icon_sub_set.prototype.has_id = function (id) {
            return id >= this.m_start_id && id <= this.m_end_id;
        };
        icon_sub_set.prototype.get_icon = function (id) {
            if (this.has_id(id) == false) {
                return null;
            }
            var ret = null;
            var arr = null;
            if (this.m_iconbm_idle.hasOwnProperty(id.toString())) {
                arr = this.m_iconbm_idle[id];
                if (arr.length > 0) {
                    ret = arr.shift();
                }
                if (arr.length <= 0) {
                    delete this.m_iconbm_idle[id];
                    this.m_idle_num -= 1;
                }
            }
            if (ret == null) {
                ret = new icon_bitmap();
                ret.m_id = id;
                ret.m_owner = this;
                var filename = id.toString();
                //filename = (Array(5).join('0')+id.toString()).slice(-5);
                ret.m_icon_path = this.m_prefix + filename + '.png';
            }
            if (this.m_iconbm_used.hasOwnProperty(id.toString()) == false) {
                this.m_iconbm_used[id] = new Array();
                this.m_used_num += 1;
            }
            this.m_iconbm_used[id].push(ret);
            if (this.m_b_loaded) {
                if (ret.m_b_loaded == false) {
                    ret.loadres();
                }
            }
            else {
                if (!this.m_b_loading) {
                    this.loadres();
                }
            }
            return ret;
        };
        icon_sub_set.prototype.loadres = function () {
            if (this.m_b_loaded) {
                return;
            }
            this.m_b_loading = true;
            Laya.loader.on(Laya.Event.ERROR, this, this.on_error);
            core.myload(this.m_atlas_path, Laya.Handler.create(this, this.on_loaded), null, Laya.Loader.ATLAS, 2);
        };
        icon_sub_set.prototype.on_error = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.on_error);
            this.m_loaderrorcount += 1;
            this.m_b_loaded = false;
            this.m_b_loading = false;
        };
        icon_sub_set.prototype.on_loaded = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.on_error);
            this.m_b_loaded = true;
            this.m_b_loading = false;
            for (var _i = 0, _a = Object.keys(this.m_iconbm_used); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_iconbm_used.hasOwnProperty(key)) {
                    var arr = this.m_iconbm_used[parseInt(key)];
                    for (var i = arr.length - 1; i >= 0; --i) {
                        var iconbm = arr[i];
                        if (iconbm.m_ref_count > 0 && iconbm.m_b_loaded == false) {
                            iconbm.loadres();
                        }
                    }
                }
            }
        };
        icon_sub_set.prototype.recover_iconbm = function (bm) {
            var id = bm.m_id;
            var arr = null;
            if (this.m_iconbm_used.hasOwnProperty(id.toString())) {
                arr = this.m_iconbm_used[id];
            }
            else {
                core.game_tiplog("icon sub set recover iconbm error!the used array of specify id is not exist! ", id);
            }
            var b_removed = false;
            for (var i = arr.length - 1; i >= 0; --i) {
                if (arr[i] == bm) {
                    arr.splice(i, 1);
                    b_removed = true;
                    if (arr.length <= 0) {
                        delete this.m_iconbm_used[id];
                        this.m_used_num -= 1;
                    }
                    break;
                }
            }
            if (!b_removed) {
                core.game_tiplog("icon sub set recover iconbm error!the used array of specify id has not this icon_bitmap! ", id);
            }
            if (this.m_iconbm_idle.hasOwnProperty(id.toString()) == false) {
                this.m_iconbm_idle[id] = new Array();
                this.m_idle_num += 1;
            }
            arr = this.m_iconbm_idle[id];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var i = arr_1[_i];
                if (i == bm) {
                    core.game_tiplog("icon sub set recover iconbm error!the idle array of specify id already has this icon_bitmap! ", id);
                    return;
                }
            }
            arr.push(bm);
        };
        icon_sub_set.prototype.check_release = function () {
            for (var _i = 0, _a = Object.keys(this.m_iconbm_idle); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_iconbm_idle.hasOwnProperty(key)) {
                    var arr = this.m_iconbm_idle[parseInt(key)];
                    for (var i = arr.length - 1; i >= 0; --i) {
                        var iconbm = arr[i];
                        if (iconbm.can_release()) {
                            iconbm.m_owner = null;
                            iconbm.destroy();
                            arr.splice(i, 1);
                        }
                    }
                    if (arr.length <= 0) {
                        delete this.m_iconbm_idle[parseInt(key)];
                        this.m_idle_num -= 1;
                    }
                }
            }
            if (this.m_b_loaded && this.m_idle_num == 0 && this.m_used_num == 0) {
                Laya.loader.clearRes(this.m_atlas_path, true);
                this.m_b_loaded = false;
                core.game_tiplog("icon sub set check_release release atlas res! ", this.m_atlas_path);
            }
        };
        icon_sub_set.prototype.dispose = function () {
        };
        return icon_sub_set;
    }());
    var icon_set = /** @class */ (function () {
        function icon_set() {
            this.m_sub_list = new Array();
        }
        icon_set.prototype.get_set_by_id = function (id) {
            for (var _i = 0, _a = this.m_sub_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.has_id(id)) {
                    return i;
                }
            }
            return null;
        };
        icon_set.prototype.add_set = function (start_id, end_id, atlas, prefix) {
            var new_set = new icon_sub_set();
            new_set.m_start_id = start_id;
            new_set.m_end_id = end_id;
            new_set.m_atlas_path = atlas;
            new_set.m_prefix = prefix;
            this.m_sub_list.push(new_set);
            return true;
        };
        icon_set.prototype.get_icon = function (id) {
            var ret = null;
            var set = this.get_set_by_id(id);
            if (set != null) {
                ret = set.get_icon(id);
            }
            return ret;
        };
        icon_set.prototype.check_release = function () {
            for (var _i = 0, _a = this.m_sub_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.check_release();
            }
        };
        icon_set.prototype.dispose = function () {
        };
        return icon_set;
    }());
    var icon_obj = /** @class */ (function (_super) {
        __extends(icon_obj, _super);
        function icon_obj() {
            var _this = _super.call(this) || this;
            _this.m_bitmap = null;
            _this.m_iconmgr = null;
            return _this;
        }
        icon_obj.prototype.set_bitmap = function (bm, imgr) {
            if (imgr == null) {
                return;
            }
            this.m_iconmgr = imgr;
            this._clear_bitmap();
            this.m_bitmap = bm;
            if (this.m_bitmap != null) {
                this.m_bitmap.addref();
                this.addChild(this.m_bitmap);
            }
        };
        icon_obj.prototype.addref = function () {
            if (this.m_bitmap != null) {
                this.m_bitmap.addref();
            }
        };
        icon_obj.prototype.delref = function () {
            if (this.m_bitmap != null) {
                this.m_bitmap.delref();
            }
        };
        icon_obj.prototype._clear_bitmap = function () {
            if (this.m_bitmap != null) {
                this.removeChild(this.m_bitmap);
                this.m_bitmap.delref();
                this.m_bitmap.dispose();
                this.m_bitmap = null;
            }
        };
        icon_obj.prototype.dispose = function () {
            this._clear_bitmap();
            if (this.m_iconmgr != null) {
                this.m_iconmgr = null;
            }
        };
        return icon_obj;
    }(Laya.Sprite));
    icon_mgr.icon_obj = icon_obj;
    var iconmgr = /** @class */ (function () {
        function iconmgr() {
            this.m_item_set = new icon_set();
            this.m_buff_set = new icon_set();
            this.m_head_set = new icon_set();
            this.m_skill_set = new icon_set();
            this.m_other_set = new icon_set();
            this.m_b_inited = false;
        }
        iconmgr.prototype.init_set_config = function (cfg, set) {
            for (var _i = 0, cfg_1 = cfg; _i < cfg_1.length; _i++) {
                var i = cfg_1[_i];
                var filepath = i["file"];
                var prefix = i["prefix"];
                var start = parseInt(i["start"]);
                var end = parseInt(i["end"]);
                set.add_set(start, end, filepath, prefix);
            }
        };
        iconmgr.prototype.init_config = function (func) {
            if (this.m_b_inited) {
                return;
            }
            this.m_b_inited = true;
            var cfg = null;
            cfg = func("item");
            this.init_set_config(cfg["data"], this.m_item_set);
            cfg = func("buff");
            this.init_set_config(cfg["data"], this.m_buff_set);
            cfg = func("head");
            this.init_set_config(cfg["data"], this.m_head_set);
            cfg = func("skill");
            this.init_set_config(cfg["data"], this.m_skill_set);
            cfg = func("other");
            this.init_set_config(cfg["data"], this.m_other_set);
            return true;
        };
        iconmgr.prototype.get_item = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_item_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_buff = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_buff_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_head = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_head_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_skill = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_skill_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_other = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_other_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.check_release = function () {
            this.m_item_set.check_release();
            this.m_head_set.check_release();
            this.m_buff_set.check_release();
            this.m_skill_set.check_release();
            this.m_other_set.check_release();
        };
        iconmgr.prototype.recover_icon = function (item) {
            utils.recover("icon_obj", item);
        };
        iconmgr.prototype.dispose = function () {
        };
        return iconmgr;
    }());
    var g_iconmgr = null;
    function icon_ins() {
        if (g_iconmgr == null) {
            g_iconmgr = new iconmgr();
        }
        return g_iconmgr;
    }
    icon_mgr.icon_ins = icon_ins;
    function fastset_icon(tp, id, grid, b_small) {
        if (b_small === void 0) { b_small = true; }
        if (grid == null) {
            return null;
        }
        var icon = null;
        switch (tp) {
            case 0:
                icon = icon_ins().get_item(id);
                break;
            case 1:
                icon = icon_ins().get_buff(id);
                break;
            case 2:
                icon = icon_ins().get_head(id);
                break;
            case 3:
                icon = icon_ins().get_skill(id);
                break;
            case 4:
                icon = icon_ins().get_other(id);
                break;
            default:
                return null;
        }
        icon.name = "this_is_iconmgr_gen_icon";
        var rate = 180 / 90;
        if (b_small) {
            rate = 134 / 90;
        }
        icon.scale(rate, rate, true);
        grid.addChild(icon);
        return icon;
    }
    function fastset_item_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(0, id, grid, b_small);
    }
    icon_mgr.fastset_item_icon = fastset_item_icon;
    function fastset_buff_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(1, id, grid, b_small);
    }
    icon_mgr.fastset_buff_icon = fastset_buff_icon;
    function fastset_head_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(2, id, grid, b_small);
    }
    icon_mgr.fastset_head_icon = fastset_head_icon;
    function fastset_skill_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(3, id, grid, b_small);
    }
    icon_mgr.fastset_skill_icon = fastset_skill_icon;
    function fastset_other_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(4, id, grid, b_small);
    }
    icon_mgr.fastset_other_icon = fastset_other_icon;
    function get_item(id) {
        return icon_ins().get_item(id);
    }
    icon_mgr.get_item = get_item;
    function get_buff(id) {
        return icon_ins().get_buff(id);
    }
    icon_mgr.get_buff = get_buff;
    function get_head(id) {
        return icon_ins().get_head(id);
    }
    icon_mgr.get_head = get_head;
    function get_skill(id) {
        return icon_ins().get_skill(id);
    }
    icon_mgr.get_skill = get_skill;
    function get_other(id) {
        return icon_ins().get_other(id);
    }
    icon_mgr.get_other = get_other;
    function fastdel_icon(grid) {
        if (grid == null) {
            return;
        }
        var icon = grid.getChildByName("this_is_iconmgr_gen_icon");
        if (icon != null) {
            grid.removeChild(icon);
            icon.dispose();
        }
        return;
    }
    icon_mgr.fastdel_icon = fastdel_icon;
    function init_icon_config(cfg_func) {
        icon_ins().init_config(cfg_func);
    }
    icon_mgr.init_icon_config = init_icon_config;
    function check_release() {
        icon_ins().check_release();
    }
    icon_mgr.check_release = check_release;
})(icon_mgr || (icon_mgr = {}));
//# sourceMappingURL=iconmgr.js.map