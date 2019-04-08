var utils;
(function (utils) {
    var game_data_mgr = /** @class */ (function () {
        function game_data_mgr() {
            this.m_data_class_map = new Object();
            this.m_data_map = new Object();
        }
        game_data_mgr.prototype.register_data = function (name, module_cls) {
            this.m_data_class_map[name] = module_cls;
        };
        game_data_mgr.prototype.get_data = function (name) {
            if (this.m_data_map.hasOwnProperty(name)) {
                return this.m_data_map[name];
            }
            if (this.m_data_class_map.hasOwnProperty(name)) {
                var m_cls = this.m_data_class_map[name];
                var m = new m_cls();
                this.m_data_map[name] = m;
                return m;
            }
            return null;
        };
        game_data_mgr.prototype.dispose = function () {
            this.m_data_class_map = new Object();
            for (var _i = 0, _a = Object.keys(this.m_data_map); _i < _a.length; _i++) {
                var i = _a[_i];
                var m = this.m_data_map[i];
                m.dispose();
            }
            this.m_data_map = new Object();
        };
        return game_data_mgr;
    }());
    utils.game_data_mgr = game_data_mgr;
    var g_ins = null;
    function data_ins() {
        if (g_ins == null) {
            g_ins = new game_data_mgr();
        }
        return g_ins;
    }
    utils.data_ins = data_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_data_mgr.js.map