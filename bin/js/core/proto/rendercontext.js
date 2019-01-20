var core;
(function (core) {
    var rendercontext = /** @class */ (function () {
        function rendercontext() {
            this.m_walk_speed = 300;
            this.m_run_speed = 8000;
        }
        rendercontext.prototype.get_move_spd = function (b_run) {
            if (b_run) {
                return this.m_run_speed;
            }
            return this.m_walk_speed;
        };
        rendercontext.prototype.dispose = function () {
            this.m_render = null;
            this.m_camera = null;
            this.m_view = null;
        };
        return rendercontext;
    }());
    core.rendercontext = rendercontext;
})(core || (core = {}));
//# sourceMappingURL=rendercontext.js.map