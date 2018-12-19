// 程序入口
module ui.game {
    export class game_loadingUI extends Laya.Dialog {
		public m_bk:Laya.Image;
		public m_logo:Laya.Image;
		public m_progressbk:Laya.Image;
		public m_progress1:Laya.ProgressBar;
		public m_progressdeco1:Laya.Image;
		public m_progressdeco2:Laya.Image;
		public m_tips:Laya.Image;
		public m_progresslight:Laya.Image;
		public m_info:Laya.Label;
        private tmp:number = 0;

        public static  uiView:any ={"type":"Dialog","props":{"width":1440,"height":2560},"child":[{"type":"Image","props":{"x":0,"width":1440,"var":"m_bk","skin":"bigpic/background.jpg","name":"bk","height":2560,"bottom":0}},{"type":"Image","props":{"y":800,"x":121,"var":"m_logo","skin":"bigpic/LOGO.png","name":"logo"}},{"type":"Image","props":{"var":"m_progressbk","name":"progressbk","centerX":0,"bottom":700}},{"type":"ProgressBar","props":{"width":1100,"var":"m_progress1","value":0.4,"skin":"loading/pgbar.png","sizeGrid":"45,70,45,70","rotation":0,"name":"progress1","centerX":0,"bottom":672}},{"type":"Image","props":{"var":"m_progressdeco1","skin":"loading/进度装饰.png","name":"progressdeco1","centerX":-535,"bottom":707}},{"type":"Image","props":{"var":"m_progressdeco2","skin":"loading/进度装饰2.png","name":"progressdeco2","centerX":535,"bottom":707}},{"type":"Image","props":{"var":"m_tips","skin":"bigpic/防沉迷信息.png","name":"tips","centerX":0,"bottom":0}},{"type":"Image","props":{"y":1819,"x":920,"var":"m_progresslight","skin":"loading/进度光.png","name":"progresslight","bottom":679,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":1889,"x":409,"width":642,"var":"m_info","text":"正在加载资源，请稍后...","name":"labelinfo","height":66,"fontSize":50,"color":"#bd8651","align":"center"}}]};
        constructor(){ super()}

        createChildren():void {
            super.createChildren();
            this.createView(ui.game.game_loadingUI.uiView);
        }

        public set_progress(v:number):void{
            let m_progress:laya.ui.ProgressBar = this.m_progress1;
            let m_progresslight:laya.ui.Image = this.m_progresslight;
            m_progress.value = v;
            m_progresslight.x = m_progress.x + (m_progress.width-70)*m_progress.value+30;
            let cur_tmp = laya.utils.Browser.now();
            if ((cur_tmp - this.tmp)> 2000){
                this.tmp = cur_tmp;
                this.set_random_tips();
            }
        }

        private set_random_tips():void{
            let radio = Math.random();
            let num = Math.floor(18 * radio);
            let tips = "welcome";
            if (tips != null){
                this.m_info.text = tips;
            }
        }
    }
}
class GameMain{
    private m_game_start:boolean = false;
    private m_game_loading:ui.game.game_loadingUI = null;
    private m_gamemain_ins:game.game_main = null;
    constructor()
    {
        Laya.init(1440,2560,Laya.WebGL);
        Laya.Stat.show(0,0);

        Laya.timer.frameLoop(1,this,this.onframeloop);
        core.set_log_module(core.log_module_enum.MODULE_ALL);
        core.set_log_level(core.log_level_enum.LOG_TIPS);
        this.load_loadingres();
    }
    private load_loadingres():void{
        core.game_tiplog("start load_loadingres");
        let assets: Array<any> = [];
        assets.push({ url: "bigpic/LOGO.png", type: Laya.Loader.IMAGE });
        assets.push({ url: "bigpic/防沉迷信息.png", type: Laya.Loader.IMAGE });
        assets.push({ url: "bigpic/background.jpg", type: Laya.Loader.IMAGE });
        assets.push({ url: "res/atlas/loading.atlas", type: Laya.Loader.ATLAS });
        for(let i of assets){
            utils.widget_ins().add_preload_res(i["url"]);
        }
        core.myload(assets, laya.utils.Handler.create(this, this.on_load_loadingres));
        Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    }
    private on_load_loadingres():void{
        core.game_tiplog("start on_load_loadingres");
        Laya.loader.off(Laya.Event.ERROR, this, this.onError);
        
        this.m_game_loading = new ui.game.game_loadingUI();
        Laya.stage.addChild(this.m_game_loading);
        this.start_preload();
    }
    private on_load_loadingresprogress(v:number):void{
        this.m_game_loading.set_progress(v);
    }
    private start_preload():void{
        var assets: Array<any> = [];
        assets.push({ url: "ui.json", type: Laya.Loader.JSON });
        assets.push({ url: "res/atlas/ui.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: "res/atlas/ui/bk.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: "res/atlas/ui/bk1.atlas", type: Laya.Loader.ATLAS });
        assets.push({ url: "config.json", type: Laya.Loader.JSON });
        //
        for(let i of assets){
            utils.widget_ins().add_preload_res(i["url"]);
        }
        core.myload(assets, laya.utils.Handler.create(this, this.on_preload),laya.utils.Handler.create(this, this.on_load_loadingresprogress,null,false));
        Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    }
    private on_preload():void{
        this.m_game_loading.removeSelf();
        this.m_game_loading = null;

        Laya.View.uiMap = Laya.loader.getRes("ui.json");
        let config_json:Object = Laya.loader.getRes("config.json");
        config.config_init(config_json);
        Laya.loader.off(Laya.Event.ERROR, this, this.onError);
        //
        protocol_def.register_cmd(protocol_def.C2S_CMD_2_PROTODESC,protocol_def.S2C_CMD_2_PROTODESC);
        protocol_def.register_protocol_desc(protocol_def.Protocol_desc);
        net.my_svr(true);
        //net.net_ins().connect()
        //net.net_ins().send()

        data.init_data_module();
        widget.init_game_widget();
        game.init_game_module();
        this.m_game_start = true;
        this.m_gamemain_ins = game.get_module(module_enum.MODULE_MAIN) as game.game_main;
        this.m_gamemain_ins.start();
    }
    private onError(err: String): void {
        core.game_tiplog("加载失败: ",err);
        console.log("game preload failed! "+err);
        //alert("game preload failed! "+err);
    }

    private onframeloop():void
    {
        if(!this.m_game_start){
            return;
        }
        this.m_gamemain_ins.update(0);
    }
}
new GameMain();
//new DemoMain();