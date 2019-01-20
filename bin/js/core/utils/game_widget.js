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
    var game_widget = /** @class */ (function (_super) {
        __extends(game_widget, _super);
        function game_widget(res_path, view_cls) {
            var _this = _super.call(this) || this;
            _this.m_res_path = null;
            _this.m_extra_res_list = new Array();
            _this.m_ui_cls = null;
            _this.m_ui = null;
            _this.m_b_loaded = false;
            _this.m_b_loading = false;
            _this.m_b_show = false;
            _this.m_b_disposed = false;
            _this.m_layer = utils.WIDGET_LAYER.NORMAL;
            _this.m_id = 0;
            _this.m_widget_name = "unknown_widget";
            _this.m_ud = null;
            _this.m_res_path = res_path;
            _this.m_ui_cls = view_cls;
            game_widget.m_start_id += 1;
            _this.m_id = game_widget.m_start_id;
            return _this;
        }
        game_widget.prototype.append_extrares = function (res_url, res_type) {
            this.m_extra_res_list.push({ url: res_url, type: res_type });
        };
        game_widget.prototype.move_center = function () {
            this.m_ui.x = (Laya.stage.width - this.m_ui.width) >> 1;
            this.m_ui.y = (Laya.stage.height - this.m_ui.height) >> 1;
        };
        game_widget.prototype.register_event = function (event, func) {
            utils.event_ins().register_event(event, this);
            this.register_event_func(event, func);
        };
        game_widget.prototype.unregister_event = function (event) {
            utils.event_ins().unregister_event(event, this);
            this.unregister_event_func(event);
        };
        game_widget.prototype.unregister_allevent = function () {
            utils.event_ins().unregister_allevent(this);
            this.unregister_all_event_func();
        };
        game_widget.prototype.fire_event = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event(event, user_data);
        };
        game_widget.prototype.fire_event_next_frame = function (event, user_data) {
            if (user_data === void 0) { user_data = null; }
            utils.event_ins().fire_event_next_frame(event, user_data);
        };
        game_widget.prototype.register_btn_click = function (con_name, func) {
            var btn = this.get_con(con_name);
            if (btn != null) {
                btn.on(Laya.Event.CLICK, this, func);
            }
        };
        game_widget.prototype.unregister_btn_click = function (con_name, func) {
            var btn = this.get_con(con_name);
            if (btn != null) {
                btn.off(Laya.Event.CLICK, this, func);
            }
        };
        game_widget.prototype._get_con = function (node, name) {
            for (var i = 0; i < node.numChildren; ++i) {
                var nd = node.getChildAt(i);
                if (nd.name == name) {
                    return nd;
                }
                nd = this._get_con(nd, name);
                if (nd != null) {
                    return nd;
                }
            }
            return null;
        };
        game_widget.prototype.get_con = function (con_name) {
            if (this.m_b_loaded) {
                return this._get_con(this.m_ui, con_name);
            }
            return null;
        };
        game_widget.prototype.load = function () {
            //core.core_tiplog("game_widget start load ",this.m_res_path,this.m_ui_cls);
            //this.m_b_loaded = true;
            //alert("start load ui");
            var b_need_loaded = false;
            for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (game_widget.s_loaded_dict.hasOwnProperty(i["url"]) == false) {
                    core.ui_tiplog("game_widget load need download ", i["url"]);
                    b_need_loaded = true;
                }
            }
            if (b_need_loaded) { //有资源需要下载，显示loading界面
                utils.widget_ins().start_load(this);
            }
            this.m_b_loading = true;
            Laya.loader.on(Laya.Event.ERROR, this, this.on_load_error);
            core.res_tiplog("game_widget load res ", this.m_extra_res_list);
            core.myload(this.m_extra_res_list, laya.utils.Handler.create(this, this.on_load_complete), null, null, 0);
        };
        game_widget.prototype.init_uiins = function () {
            this.m_ui = new this.m_ui_cls();
            this.on_init();
            //todo
            //core.core_tiplog("game_widget on_load_complete ",this.m_res_path,this.m_ui_cls);
            if (this.m_b_show) {
                this.m_b_show = false;
                this.show(true);
            }
        };
        game_widget.prototype.on_load_complete = function () {
            if (this.m_b_disposed) {
                return;
            }
            if (this.m_b_loading == false) {
                core.res_errlog("game_widget on_load_complete this.m_b_loading = false");
                return;
            }
            utils.widget_ins().end_load(this);
            //
            for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (Laya.loader.getRes(i["url"]) != null) {
                    game_widget.s_loaded_dict[i["url"]] = true;
                }
            }
            //
            this.m_b_loading = false;
            Laya.loader.off(Laya.Event.ERROR, this, this.on_load_error);
            if (Laya.loader.getRes(this.m_res_path) == null) {
                core.res_errlog("game_widget on_load_complete getRes(this.m_res_path) == null ", this.m_res_path);
                return;
            }
            //
            //
            this.m_b_loaded = true;
            this.init_uiins();
        };
        game_widget.prototype.on_load_error = function (err) {
            //alert("ui load error err "+err);
            core.res_errlog("game_widget on_load_error ", err);
        };
        game_widget.prototype.on_init = function () {
        };
        game_widget.prototype.on_show = function (flag) {
        };
        game_widget.prototype.on_dispose = function () {
        };
        game_widget.prototype.show = function (flag) {
            if (this.m_b_show == flag) {
                return;
            }
            this.m_b_show = flag;
            if (this.m_b_loaded == false) {
                if (!this.m_b_show) {
                    core.core_tiplog("game_widget do not load when it is hiden");
                    return;
                }
                //
                if (this.m_res_path == null || this.m_res_path.length <= 0) {
                    core.core_tiplog("game_widget load error,invalided res path! ");
                    return;
                }
                if (this.m_ui_cls == null) {
                    core.core_tiplog("game_widget load error,invalided ui cls! ");
                    return;
                }
                if (this.m_b_loading) {
                    core.core_tiplog("game_widget loading,return");
                    return;
                }
                //
                this.m_extra_res_list.push({ url: this.m_res_path, type: Laya.Loader.ATLAS });
                for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (game_widget.s_res_dict.hasOwnProperty(i["url"])) {
                        game_widget.s_res_dict[i["url"]] += 1;
                    }
                    else {
                        game_widget.s_res_dict[i["url"]] = 1;
                    }
                }
                //
                //
                this.load();
                return;
            }
            else {
                if (this.m_b_show) {
                    var view = utils.widget_ins().get_view(this.m_layer);
                    view.addChild(this.m_ui);
                }
                else {
                    this.m_ui.removeSelf();
                }
                this.on_show(this.m_b_show);
                if (this.m_b_show) {
                    utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONSHOW, this);
                }
                else {
                    utils.event_ins().fire_event(game_event.EVENT_WIDGET_ONHIDE, this);
                }
                if (!this.m_b_show) {
                    utils.widget_ins().call_widget_hide(this);
                }
            }
        };
        game_widget.prototype.dispose = function () {
            if (this.m_b_disposed) {
                return;
            }
            this.unregister_allevent();
            this.on_dispose();
            if (this.m_ui != null) {
                this.m_ui.removeSelf();
                this.m_ui.destroy();
                this.m_ui = null;
            }
            if (this.m_b_loaded) {
                for (var _i = 0, _a = this.m_extra_res_list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (game_widget.s_res_dict.hasOwnProperty(i["url"])) {
                        game_widget.s_res_dict[i["url"]] -= 1;
                        if (game_widget.s_res_dict[i["url"]] <= 0) {
                            core.res_tiplog("widget dispose release res ", game_widget.s_res_dict[i["url"]], i["url"]);
                            Laya.loader.clearTextureRes(i["url"]);
                            delete game_widget.s_res_dict[i["url"]];
                            //从内存里释放掉不需要去掉引用，下面这个缓存主要解决未下载资源的问题
                            //if(game_widget.s_loaded_dict.hasOwnProperty(i["url"])){
                            //    delete game_widget.s_loaded_dict[i["url"]];
                            //}
                        }
                    }
                }
            }
            if (this.m_b_loading) {
                utils.widget_ins().end_load(this);
                Laya.loader.off(Laya.Event.ERROR, this, this.on_load_error);
            }
            this.m_b_loading = false;
            this.m_extra_res_list = null;
            this.m_ui_cls = null;
            this.m_res_path = null;
            this.m_b_loaded = false;
            this.m_b_disposed = true;
            this.m_b_show = false;
        };
        game_widget.m_start_id = 0;
        game_widget.s_res_dict = new Object();
        game_widget.s_loaded_dict = new Object();
        return game_widget;
    }(utils.game_event_receiver));
    utils.game_widget = game_widget;
})(utils || (utils = {}));
//# sourceMappingURL=game_widget.js.map