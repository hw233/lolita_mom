var core;
(function (core) {
    var rendercommand = /** @class */ (function () {
        function rendercommand(obj) {
            this.re_init(obj);
        }
        rendercommand.prototype.re_init = function (obj) {
            this.m_obj = obj;
            if (this.m_obj != null) {
                this.update_z();
            }
        };
        rendercommand.prototype.update_z = function () {
            this.m_screen_z = this.m_obj.y;
        };
        rendercommand.prototype.dispose = function () {
            this.m_obj = null;
        };
        rendercommand.prototype.render = function (context) {
            var view = context.m_view.m_unitView;
            view.addChild(this.m_obj);
        };
        rendercommand.prototype.is_contain = function (x, y) {
            return false;
        };
        return rendercommand;
    }());
    core.rendercommand = rendercommand;
})(core || (core = {}));
//# sourceMappingURL=rendercommand.js.map