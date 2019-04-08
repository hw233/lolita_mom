var utils;
(function (utils) {
    var game_module_mgr = /** @class */ (function () {
        function game_module_mgr() {
            this.m_module_class_map = new Object();
            this.m_module_map = new Object();
        }
        game_module_mgr.prototype.register_module = function (name, module_cls) {
            this.m_module_class_map[name] = module_cls;
        };
        game_module_mgr.prototype.get_module = function (name) {
            if (this.m_module_map.hasOwnProperty(name)) {
                return this.m_module_map[name];
            }
            if (this.m_module_class_map.hasOwnProperty(name)) {
                var m_cls = this.m_module_class_map[name];
                var m = new m_cls();
                this.m_module_map[name] = m;
                return m;
            }
            return null;
        };
        game_module_mgr.prototype.dispose = function () {
            this.m_module_class_map = new Object();
            for (var _i = 0, _a = Object.keys(this.m_module_map); _i < _a.length; _i++) {
                var i = _a[_i];
                var m = this.m_module_map[i];
                m.dispose();
            }
            this.m_module_map = new Object();
        };
        return game_module_mgr;
    }());
    utils.game_module_mgr = game_module_mgr;
    var g_ins = null;
    function module_ins() {
        if (g_ins == null) {
            g_ins = new game_module_mgr();
        }
        return g_ins;
    }
    utils.module_ins = module_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_module_mgr.js.map