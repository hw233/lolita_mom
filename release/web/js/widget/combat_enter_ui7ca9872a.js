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
var widget;
(function (widget) {
    var combat_enter_ui = /** @class */ (function (_super) {
        __extends(combat_enter_ui, _super);
        function combat_enter_ui() {
            var _this = _super.call(this, "res/atlas/ui.atlas", ui.game.combat_enterUI) || this;
            _this.m_sp_top = null;
            _this.m_sp_bottom = null;
            _this.m_htmlcavas = null;
            _this.m_htmltexture = null;
            _this.m_layer = utils.WIDGET_LAYER.TOP;
            return _this;
        }
        combat_enter_ui.prototype.on_init = function () {
            this.m_sp_top = new Laya.Sprite();
            this.m_sp_bottom = new Laya.Sprite();
            this.m_ui.addChild(this.m_sp_top);
            this.m_ui.addChild(this.m_sp_bottom);
        };
        combat_enter_ui.prototype._init_sp = function () {
            if (this.m_sp_top == null) {
                this.m_sp_top = new Laya.Sprite();
                this.m_ui.addChild(this.m_sp_top);
            }
            if (this.m_sp_bottom == null) {
                this.m_sp_bottom = new Laya.Sprite();
                this.m_ui.addChild(this.m_sp_bottom);
            }
            if (this.m_htmlcavas != null) {
                this.m_htmlcavas.destroy();
                this.m_htmltexture.destroy(true);
                this.m_htmlcavas = null;
                this.m_htmltexture = null;
            }
        };
        combat_enter_ui.prototype._clear_sp = function () {
            this.m_ui.removeChildren();
            if (this.m_sp_top != null) {
                Laya.Tween.clearAll(this.m_sp_top);
                this.m_sp_top.graphics.clear();
                this.m_sp_top.destroy(true);
            }
            if (this.m_sp_bottom != null) {
                Laya.Tween.clearAll(this.m_sp_bottom);
                this.m_sp_bottom.graphics.clear();
                this.m_sp_bottom.destroy(true);
            }
            this.m_sp_top = null;
            this.m_sp_bottom = null;
            if (this.m_htmlcavas != null) {
                this.m_htmlcavas.clear();
                this.m_htmlcavas.releaseResource(true); //important func
                this.m_htmlcavas.destroy();
                this.m_htmltexture.destroy(true);
                this.m_htmlcavas = null;
                this.m_htmltexture = null;
            }
        };
        combat_enter_ui.prototype.on_show = function (flag) {
            if (flag) {
                this._init_sp();
                this.m_ui.x = 0;
                this.m_ui.y = 0;
                var main_ins = game.get_module(module_enum.MODULE_MAIN);
                var render = main_ins.get_render();
                var hc = null; //main_ins.get_scene_screen();
                var uiins = this.m_ui;
                var tx = new Laya.Texture(hc);
                this.m_htmlcavas = hc;
                this.m_htmltexture = tx;
                var sd_wh = helper.get_design_wh();
                var sd_w = sd_wh['w'];
                var sd_h = sd_wh['h'];
                var designwh = helper.get_design_wh();
                var designw = designwh['w'];
                var designh = designwh['h'];
                this.m_sp_top.graphics.drawRect(0, 0, designw, designh / 2, "#000000");
                this.m_sp_bottom.graphics.drawRect(0, 0, designw, designh / 2, "#000000");
                this.m_sp_top.graphics.fillTexture(tx, 0, 0, designw, designh / 2, "no-repeat", new Laya.Point(0, 0));
                this.m_sp_bottom.graphics.fillTexture(tx, 0, 0, designw, designh / 2, "no-repeat", new Laya.Point(0, designh / 2));
                this.m_sp_top.x = 0;
                this.m_sp_bottom.x = 0;
                this.m_sp_top.y = 0;
                this.m_sp_bottom.y = designh / 2;
                Laya.Tween.to(this.m_sp_top, { x: -designw }, 800, Laya.Ease.linearIn, Laya.Handler.create(this, this.show, [false]));
                Laya.Tween.to(this.m_sp_bottom, { x: designw }, 800, Laya.Ease.linearIn);
            }
            else {
                this.unregister_allevent();
                this._clear_sp();
            }
        };
        combat_enter_ui.prototype.on_dispose = function () {
            if (this.m_sp_top != null) {
                Laya.Tween.clearAll(this.m_sp_top);
                this.m_sp_top.graphics.clear();
                this.m_sp_top = null;
            }
            if (this.m_sp_bottom != null) {
                Laya.Tween.clearAll(this.m_sp_bottom);
                this.m_sp_bottom.graphics.clear();
                this.m_sp_bottom = null;
            }
        };
        combat_enter_ui.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return combat_enter_ui;
    }(utils.game_widget));
    widget.combat_enter_ui = combat_enter_ui;
})(widget || (widget = {}));
//# sourceMappingURL=combat_enter_ui.js.map