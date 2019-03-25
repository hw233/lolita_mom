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
// 程序入口
var ui;
(function (ui) {
    var game;
    (function (game) {
        var game_loadingUI = /** @class */ (function (_super) {
            __extends(game_loadingUI, _super);
            function game_loadingUI() {
                var _this = _super.call(this) || this;
                _this.tmp = 0;
                return _this;
            }
            game_loadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.game.game_loadingUI.uiView);
            };
            game_loadingUI.prototype.set_progress = function (v) {
                var m_progress = this.m_progress1;
                var m_progresslight = this.m_progresslight;
                m_progress.value = v;
                m_progresslight.x = m_progress.x + (m_progress.width - 70) * m_progress.value + 30;
                var cur_tmp = laya.utils.Browser.now();
                if ((cur_tmp - this.tmp) > 2000) {
                    this.tmp = cur_tmp;
                    this.set_random_tips();
                }
            };
            game_loadingUI.prototype.set_random_tips = function () {
                var radio = Math.random();
                var num = Math.floor(18 * radio);
                var tips = "welcome";
                if (tips != null) {
                    this.m_info.text = tips;
                }
            };
            game_loadingUI.uiView = { "type": "Dialog", "props": { "width": 1440, "height": 2560 }, "child": [{ "type": "Image", "props": { "x": 0, "width": 1440, "var": "m_bk", "skin": "bigpic/background.jpg", "name": "bk", "height": 2560, "bottom": 0 } }, { "type": "Image", "props": { "y": 800, "x": 121, "var": "m_logo", "skin": "bigpic/LOGO.png", "name": "logo" } }, { "type": "Image", "props": { "var": "m_progressbk", "name": "progressbk", "centerX": 0, "bottom": 700 } }, { "type": "ProgressBar", "props": { "width": 1100, "var": "m_progress1", "value": 0.4, "skin": "loading/pgbar.png", "sizeGrid": "45,70,45,70", "rotation": 0, "name": "progress1", "centerX": 0, "bottom": 672 } }, { "type": "Image", "props": { "var": "m_progressdeco1", "skin": "loading/进度装饰.png", "name": "progressdeco1", "centerX": -535, "bottom": 707 } }, { "type": "Image", "props": { "var": "m_progressdeco2", "skin": "loading/进度装饰2.png", "name": "progressdeco2", "centerX": 535, "bottom": 707 } }, { "type": "Image", "props": { "var": "m_tips", "skin": "bigpic/防沉迷信息.png", "name": "tips", "centerX": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 1819, "x": 920, "var": "m_progresslight", "skin": "loading/进度光.png", "name": "progresslight", "bottom": 679, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 1889, "x": 409, "width": 642, "var": "m_info", "text": "正在加载资源，请稍后...", "name": "labelinfo", "height": 66, "fontSize": 50, "color": "#bd8651", "align": "center" } }] };
            return game_loadingUI;
        }(Laya.Dialog));
        game.game_loadingUI = game_loadingUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.m_game_start = false;
        this.m_game_loading = null;
        this.m_gamemain_ins = null;
        Laya.init(1280, 720, Laya.WebGL);
        //
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //让舞台处于屏幕的水平居中
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //保持原始高宽比的情况下，将舞台铺满屏幕，超出比例的部分会有黑边
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
        Laya.Stat.show(0, 0);
        var l = new Laya.Label(" ");
        l.font = "h5font";
        Laya.stage.addChild(l);
        Laya.timer.frameLoop(1, this, this.onframeloop);
        core.set_log_module(core.log_module_enum.MODULE_ALL);
        core.set_log_level(core.log_level_enum.LOG_TIPS);
        this.load_loadingres();
    }
    GameMain.prototype.load_loadingres = function () {
        core.game_tiplog("start load_loadingres");
        var assets = [];
        assets.push({ url: "bigpic/LOGO.png", type: Laya.Loader.IMAGE });
        assets.push({ url: "bigpic/防沉迷信息.png", type: Laya.Loader.IMAGE });
        assets.push({ url: "bigpic/background.jpg", type: Laya.Loader.IMAGE });
        assets.push({ url: "res/atlas/loading.atlas", type: Laya.Loader.ATLAS });
        for (var _i = 0, assets_1 = assets; _i < assets_1.length; _i++) {
            var i = assets_1[_i];
            utils.widget_ins().add_preload_res(i["url"]);
        }
        core.myload(assets, laya.utils.Handler.create(this, this.on_load_loadingres));
        Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    };
    GameMain.prototype.on_load_loadingres = function () {
        core.game_tiplog("start on_load_loadingres");
        Laya.loader.off(Laya.Event.ERROR, this, this.onError);
        this.m_game_loading = new ui.game.game_loadingUI();
        Laya.stage.addChild(this.m_game_loading);
        this.start_preload();
    };
    GameMain.prototype.on_load_loadingresprogress = function (v) {
        this.m_game_loading.set_progress(v);
    };
    GameMain.prototype.start_preload = function () {
        var assets = [];
        assets.push({ url: "ui.json", type: Laya.Loader.JSON });
        assets.push({ url: "res/atlas/ui.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: "res/atlas/ui/bk.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: "res/atlas/ui/bk1.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: "config.json", type: Laya.Loader.JSON });
        assets.push({ url: "avatar/link_data.bin", type: Laya.Loader.BUFFER });
        assets.push({ url: "avatar/link_data_txt.bin", type: Laya.Loader.BUFFER });
        assets.push({ url: "avatar/skillperform.bin", type: Laya.Loader.BUFFER });
        assets.push({ url: "kjlinxin.ttf", type: Laya.Loader.BUFFER });
        assets.push({ url: "sound/normal.mp3", type: Laya.Loader.SOUND });
        assets.push({ url: "sound/boss.mp3", type: Laya.Loader.SOUND });
        assets.push({ url: "sound/mousedown_btn.wav", type: Laya.Loader.SOUND });
        //
        for (var _i = 0, assets_2 = assets; _i < assets_2.length; _i++) {
            var i = assets_2[_i];
            utils.widget_ins().add_preload_res(i["url"]);
        }
        core.myload(assets, laya.utils.Handler.create(this, this.on_preload), laya.utils.Handler.create(this, this.on_load_loadingresprogress, null, false));
        Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    };
    GameMain.prototype.on_preload = function () {
        this.m_game_loading.removeSelf();
        this.m_game_loading = null;
        var arr = Laya.loader.getRes("kjlinxin.ttf");
        fontmgr.registerfont(arr);
        Laya.View.uiMap = Laya.loader.getRes("ui.json");
        var config_json = Laya.loader.getRes("config.json");
        config.config_init(config_json);
        icon_mgr.init_icon_config(config.Iconinfo.get_Iconinfo);
        var buff = new Laya.Byte(Laya.loader.getRes("avatar/link_data.bin"));
        if (buff.length > 0) {
            core.filepack_ins().addpack("link_data", buff);
        }
        buff = new Laya.Byte(Laya.loader.getRes("avatar/link_data_txt.bin"));
        if (buff.length > 0) {
            core.filepack_ins().addpack("link_data_txt", buff);
        }
        buff = new Laya.Byte(Laya.loader.getRes("avatar/skillperform.bin"));
        if (buff.length > 0) {
            core.filepack_ins().addpack("skillperform", buff);
        }
        Laya.loader.off(Laya.Event.ERROR, this, this.onError);
        //
        protocol_def.register_cmd(protocol_def.C2S_CMD_2_PROTODESC, protocol_def.S2C_CMD_2_PROTODESC);
        protocol_def.register_protocol_desc(protocol_def.Protocol_desc);
        net.my_svr(true);
        //net.net_ins().connect()
        //net.net_ins().send()
        data.init_data_module();
        widget.init_game_widget();
        game.init_game_module();
        this.m_game_start = true;
        this.m_gamemain_ins = game.get_module(module_enum.MODULE_MAIN);
        this.m_gamemain_ins.start();
    };
    GameMain.prototype.onError = function (err) {
        core.game_tiplog("加载失败: ", err);
        console.log("game preload failed! " + err);
        //alert("game preload failed! "+err);
    };
    GameMain.prototype.onframeloop = function () {
        if (!this.m_game_start) {
            return;
        }
        this.m_gamemain_ins.update(0);
    };
    return GameMain;
}());
new GameMain();
//new DemoMain();
//# sourceMappingURL=LayaSample.js.map