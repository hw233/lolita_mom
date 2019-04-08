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
var utils;
(function (utils) {
    //
    //
    var ui_loadingUI = /** @class */ (function (_super) {
        __extends(ui_loadingUI, _super);
        function ui_loadingUI() {
            var _this = _super.call(this) || this;
            _this.m_b_use_ani = true;
            return _this;
        }
        ui_loadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui_loadingUI.uiView);
        };
        ui_loadingUI.prototype.init = function () {
            this.m_mask = new Laya.Sprite();
            this.m_mask.x = 0;
            //this.addChild(this.m_mask);
            this.m_mask.graphics.drawRect(0, 0, this.m_logo.width, this.m_logo.height, "#000000");
            //wechat should close
            //this.m_logo_grey.mask = this.m_mask;
        };
        ui_loadingUI.prototype.start = function () {
            if (this.m_b_use_ani) {
                this.m_logo.visible = false;
                this.m_logo_grey.visible = false;
                this.m_mask.visible = false;
                this.m_progress.visible = false;
                this.m_ani.play();
                this.m_ani.visible = true;
            }
            else {
                this.m_logo.visible = true;
                this.m_logo_grey.visible = true;
                this.m_mask.visible = true;
                this.m_progress.visible = true;
                this.m_ani.stop();
                this.m_ani.visible = false;
                this.m_mask.x = 0;
            }
        };
        ui_loadingUI.prototype.update = function () {
            if (this.m_b_use_ani) {
                return;
            }
            if (this.m_mask.x >= this.m_logo_grey.width) {
                this.m_mask.x = 0;
            }
            else {
                this.m_mask.x += 2;
            }
        };
        ui_loadingUI.uiView = { "type": "Dialog", "props": { "y": 0, "x": 0, "width": 800, "height": 400, "anchorY": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "m_logo", "skin": "bigpic/ui_loading.png", "gray": false } }, { "type": "Label", "props": { "y": 309, "x": 326, "width": 192, "var": "m_progress", "height": 88, "fontSize": 50, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "m_logo_grey", "skin": "bigpic/ui_loading.png", "gray": true } }, { "type": "Animation", "props": { "y": 231, "x": 400, "width": 0, "var": "m_ani", "source": "game_ani/uiloading.ani", "name": "m_ani", "height": 0 } }] };
        return ui_loadingUI;
    }(laya.ui.Dialog));
    utils.ui_loadingUI = ui_loadingUI;
    //
    /*
    export class ui_loadingUI extends laya.ui.Dialog {
        public m_logo:Laya.Image;
        public m_progress:Laya.Label;
        public m_logo_grey:Laya.Image;
        public m_mask:Laya.Sprite;
        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":800,"height":400,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"m_logo","skin":"bigpic/ui_loading.png","gray":false}},{"type":"Label","props":{"y":309,"x":326,"width":192,"var":"m_progress","height":88,"fontSize":50,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":0,"var":"m_logo_grey","skin":"bigpic/ui_loading.png","gray":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui_loadingUI.uiView);

        }
        public init():void{
            this.m_mask = new Laya.Sprite();
            this.m_mask.x = 0;
            //this.addChild(this.m_mask);
            this.m_mask.graphics.drawRect(0,0,this.m_logo.width,this.m_logo.height,"#000000");
            this.m_logo_grey.mask = this.m_mask;
        }
        public start():void{
            this.m_mask.x = 0;
        }
        public update():void{
            if(this.m_mask.x >= this.m_logo_grey.width){
                this.m_mask.x = 0;
            }
            else{
                this.m_mask.x += 2;
            }
        }
    }
    */
    //
    var game_widget_mgr = /** @class */ (function () {
        function game_widget_mgr() {
            this.m_widget_class_map = new Object();
            this.m_widget_group_map = new Object();
            this.m_widget_map = new Object();
            this.m_root_view = null;
            this.m_view_ins = new utils.game_widget_view();
            this.m_release_dict = new Object();
            this.m_loading_ui = null;
            this.m_loadingui_dict = new Object();
            this.m_loadingui_refs = 0;
        }
        game_widget_mgr.prototype.show_loadingui = function () {
            if (this.m_loading_ui == null) {
                this.m_loading_ui = new ui_loadingUI();
                this.m_loading_ui.init();
                this.m_loading_ui.x = (Laya.stage.width - this.m_loading_ui.width) >> 1;
                this.m_loading_ui.y = (Laya.stage.height - this.m_loading_ui.height) >> 1;
            }
            this.m_loading_ui.visible = true;
            this.m_loading_ui.start();
            this.m_view_ins.m_view_topmost.addChild(this.m_loading_ui);
        };
        game_widget_mgr.prototype.hide_loadingui = function () {
            if (this.m_loading_ui == null) {
                return;
            }
            this.m_loading_ui.visible = false;
            this.m_loading_ui.removeSelf();
        };
        game_widget_mgr.prototype.update_loadingui = function () {
            if (this.m_loading_ui == null || this.m_loading_ui.visible == false) {
                return;
            }
            this.m_loading_ui.update();
        };
        game_widget_mgr.prototype.del_loadingui = function () {
            if (this.m_loading_ui != null) {
                this.m_loading_ui.removeSelf();
                this.m_loading_ui.destroy();
                this.m_loading_ui = null;
            }
        };
        game_widget_mgr.prototype.start_load = function (uiins) {
            if (this.m_loadingui_dict.hasOwnProperty(uiins.m_id.toString()) == false) {
                this.m_loadingui_dict[uiins.m_id.toString()] = true;
                this.m_loadingui_refs += 1;
                this.show_loadingui();
            }
        };
        game_widget_mgr.prototype.end_load = function (uiins) {
            if (this.m_loadingui_dict.hasOwnProperty(uiins.m_id.toString())) {
                delete this.m_loadingui_dict[uiins.m_id.toString()];
                this.m_loadingui_refs -= 1;
                if (this.m_loadingui_refs <= 0) {
                    this.hide_loadingui();
                }
            }
        };
        game_widget_mgr.prototype.add_preload_res = function (path) {
            utils.game_widget.s_loaded_dict[path] = true;
        };
        game_widget_mgr.prototype.set_root = function (sp) {
            this.m_view_ins.removeSelf();
            this.m_root_view = sp;
            this.m_root_view.addChild(this.m_view_ins);
        };
        game_widget_mgr.prototype.get_view = function (layer) {
            return this.m_view_ins.get_view(layer);
        };
        game_widget_mgr.prototype.register_widget = function (name, widget_cls, w_group) {
            if (w_group === void 0) { w_group = utils.WIDGET_GROUP.GROUP_DEFAULT; }
            this.m_widget_class_map[name] = widget_cls;
            this.m_widget_group_map[name] = w_group;
        };
        game_widget_mgr.prototype.set_widget_group = function (name, w_group) {
            this.m_widget_group_map[name] = w_group;
        };
        game_widget_mgr.prototype.get_module = function (name) {
            if (this.m_widget_map.hasOwnProperty(name)) {
                return this.m_widget_map[name];
            }
            if (this.m_widget_class_map.hasOwnProperty(name)) {
                var m_cls = this.m_widget_class_map[name];
                var m = new m_cls();
                //m.load();
                this.m_widget_map[name] = m;
                m.m_widget_name = name;
                return m;
            }
            return null;
        };
        game_widget_mgr.prototype.show_widget = function (widget_name, flag, ud) {
            if (ud === void 0) { ud = null; }
            var w = this.get_module(widget_name);
            if (w != null) {
                if (ud != null) {
                    w.m_ud = ud;
                }
                w.show(flag);
                if (!flag) {
                    this.m_release_dict[widget_name] = [w, utils.get_render_milltm()];
                }
                else {
                    delete this.m_release_dict[widget_name];
                }
            }
        };
        game_widget_mgr.prototype.call_widget_hide = function (w) {
            this.m_release_dict[w.m_widget_name] = [w, utils.get_render_milltm()];
        };
        game_widget_mgr.prototype.check_release = function () {
            this.update_loadingui();
            for (var _i = 0, _a = Object.keys(this.m_release_dict); _i < _a.length; _i++) {
                var k = _a[_i];
                if (this.m_release_dict.hasOwnProperty(k)) {
                    var tm = this.m_release_dict[k][1];
                    if ((utils.get_render_milltm() - tm) > 10 * 1000) {
                        var m = this.m_widget_map[k];
                        utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONDISPOSE, m);
                        m.dispose();
                        delete this.m_widget_map[k];
                        delete this.m_release_dict[k];
                        core.core_errlog("game_widget_mgr release ", k);
                        return;
                    }
                }
            }
        };
        game_widget_mgr.prototype.show_widget_bygroup = function (v, flag, ud) {
            if (ud === void 0) { ud = null; }
            for (var k in this.m_widget_group_map) {
                if (this.m_widget_group_map.hasOwnProperty(k)) {
                    var w_v = this.m_widget_group_map[k];
                    if (v == w_v) {
                        this.show_widget(k, flag, ud);
                    }
                }
            }
        };
        game_widget_mgr.prototype.is_widget_show = function (widget_name) {
            var w = this.get_module(widget_name);
            if (w != null) {
                return w.m_b_show;
            }
            return false;
        };
        game_widget_mgr.prototype.dispose = function () {
            this.del_loadingui();
            this.m_widget_class_map = new Object();
            utils.event_ins().fire_event(game_event.EVENT_WIDGET_ALLDISPOSE);
            for (var _i = 0, _a = Object.keys(this.m_widget_map); _i < _a.length; _i++) {
                var i = _a[_i];
                var m = this.m_widget_map[i];
                m.dispose();
            }
            if (this.m_view_ins != null) {
                this.m_view_ins.removeSelf();
                this.m_view_ins.dispose();
                this.m_view_ins = null;
            }
            this.m_root_view = null;
            this.m_widget_map = new Object();
            this.m_widget_group_map = new Object();
        };
        return game_widget_mgr;
    }());
    utils.game_widget_mgr = game_widget_mgr;
    var g_ins = null;
    function widget_ins() {
        if (g_ins == null) {
            g_ins = new game_widget_mgr();
        }
        return g_ins;
    }
    utils.widget_ins = widget_ins;
})(utils || (utils = {}));
//# sourceMappingURL=game_widget_mgr.js.map