var filtersmgr;
(function (filtersmgr) {
    var FILTERSSTYLE_ENUM;
    (function (FILTERSSTYLE_ENUM) {
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["DEFAULT"] = 0] = "DEFAULT";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["DISABLE_BLACK"] = 1] = "DISABLE_BLACK";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["DISABLE_URLESS"] = 2] = "DISABLE_URLESS";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["BLACKWRITE"] = 3] = "BLACKWRITE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GRAY"] = 4] = "GRAY";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["RED"] = 5] = "RED";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["LIGHT"] = 6] = "LIGHT";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFBACK"] = 7] = "GFBACK";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFBLUE"] = 8] = "GFBLUE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFWHITE"] = 9] = "GFWHITE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFYELLOW"] = 10] = "GFYELLOW";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFBLUEGREEN"] = 11] = "GFBLUEGREEN";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQGREEN"] = 12] = "GFQGREEN";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQBLUE"] = 13] = "GFQBLUE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQPURPLE"] = 14] = "GFQPURPLE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQYELLOW"] = 15] = "GFQYELLOW";
    })(FILTERSSTYLE_ENUM = filtersmgr.FILTERSSTYLE_ENUM || (filtersmgr.FILTERSSTYLE_ENUM = {}));
    var filtersstylemgr = /** @class */ (function () {
        function filtersstylemgr() {
            this._filtersmap = new Object();
            this._filtersmap[FILTERSSTYLE_ENUM.DEFAULT] = [
                new Laya.GlowFilter("#5e391b", 3, 3, 3),
            ];
            /**
             * 禁用滤镜 纯黑
             */
            this._filtersmap[FILTERSSTYLE_ENUM.DISABLE_BLACK] = [
                new Laya.ColorFilter([1, 0, 0, 0, -255,
                    0, 1, 0, 0, -255,
                    0, 0, 1, 0, -255,
                    0, 0, 0, 1, 0]),
            ];
            /**
             * 禁用滤镜 去色
             */
            this._filtersmap[FILTERSSTYLE_ENUM.DISABLE_URLESS] = [
                new Laya.ColorFilter([0.4320, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.7922, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0951, 0, 0,
                    0, 0, 0, 1, 0]),
            ];
            /**
             * 禁用滤镜 黑白
             */
            this._filtersmap[FILTERSSTYLE_ENUM.BLACKWRITE] = [
                new Laya.ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]),
            ];
            /**
             * 禁用滤镜 灰色
             */
            this._filtersmap[FILTERSSTYLE_ENUM.GRAY] = [
                new Laya.ColorFilter([
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0
                ]),
            ];
            /**
             * 禁用滤镜 红色
             */
            this._filtersmap[FILTERSSTYLE_ENUM.RED] = [
                new Laya.ColorFilter([
                    0.3086, 0.6094, 0.0820, 0, 100,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0
                ]),
            ];
            /**
             * 禁用滤镜 高亮
             */
            this._filtersmap[FILTERSSTYLE_ENUM.LIGHT] = [
                new Laya.ColorFilter([1, 0, 0, 0, 50,
                    0, 1, 0, 0, 50,
                    0, 0, 1, 0, 50,
                    0, 0, 0, 1, 0]),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFBACK] = [
                new Laya.GlowFilter("#000000", 2, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFBLUE] = [
                new Laya.GlowFilter("#00ccff", 1, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFWHITE] = [
                new Laya.GlowFilter("#FFFFFF", 1, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFYELLOW] = [
                new Laya.GlowFilter("#FFa800", 1, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFBLUEGREEN] = [
                new Laya.GlowFilter("#00FFFF", 3, 4, 4),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQGREEN] = [
                new Laya.GlowFilter("#1DBD2D", 1, 32, 32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQBLUE] = [
                new Laya.GlowFilter("#0078DB", 1, 32, 32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQPURPLE] = [
                new Laya.GlowFilter("#EB45F6", 1, 32, 32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQYELLOW] = [
                new Laya.GlowFilter("#fbeb36", 3, 10, 10),
            ];
        }
        filtersstylemgr.prototype.getfiltersbyid = function (id) {
            return this._filtersmap[id];
        };
        filtersstylemgr.prototype.set_filter = function (l, id) {
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.filters = filters;
            }
            return true;
        };
        return filtersstylemgr;
    }());
    var g_ins = null;
    function ins() {
        if (g_ins == null) {
            g_ins = new filtersstylemgr();
        }
        return g_ins;
    }
    function set_filter(l, id) {
        return ins().set_filter(l, id);
    }
    filtersmgr.set_filter = set_filter;
})(filtersmgr || (filtersmgr = {}));
//# sourceMappingURL=filtersmgr.js.map