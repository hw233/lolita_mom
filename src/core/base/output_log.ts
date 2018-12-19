module core{
    export enum log_level_enum{
        LOG_ERROR,
        LOG_WARNNING,
        LOG_TIPS,
        LOG_MAX,
    }
    let log_level:log_level_enum = log_level_enum.LOG_MAX;
    export enum log_module_enum{
        MODULE_CORE,
        MODULE_RES,
        MODULE_COMBAT,
        MODULE_NET,
        MODULE_UI,
        MODULE_GAME,
        MODULE_OTHER,
        MODULE_LOADING,
        MODULE_ALL,
    }
    let log_module:log_module_enum = log_module_enum.MODULE_ALL;
    export function set_log_level(v:log_level_enum):void{
        log_level = v;
    }
    export function set_log_module(v:log_module_enum):void{
        log_module = v;
    }
    function fast_log(module:log_module_enum,...args):void{
        console.log("module:"+module+" "+args);
    }
    export function log(level:log_level_enum,module:log_module_enum,...args):void{
        if(level > log_level){
            return;
        }
        if(log_module != log_module_enum.MODULE_ALL && module != log_module){
            return;
        }
        fast_log(module,args);
    }
    export function res_errlog(...args):void{
        log(log_level_enum.LOG_ERROR,log_module_enum.MODULE_RES,args);
    }
    export function res_warnlog(...args):void{
        log(log_level_enum.LOG_WARNNING,log_module_enum.MODULE_RES,args);
    }
    export function res_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_RES,args);
    }

    export function core_errlog(...args):void{
        log(log_level_enum.LOG_ERROR,log_module_enum.MODULE_CORE,args);
    }
    export function core_warnlog(...args):void{
        log(log_level_enum.LOG_WARNNING,log_module_enum.MODULE_CORE,args);
    }
    export function core_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_CORE,args);
    }
    export function net_errlog(...args):void{
        log(log_level_enum.LOG_ERROR,log_module_enum.MODULE_NET,args);
    }
    export function net_warnlog(...args):void{
        log(log_level_enum.LOG_WARNNING,log_module_enum.MODULE_NET,args);
    }
    export function net_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_NET,args);
    }
    export function combat_errlog(...args):void{
        log(log_level_enum.LOG_ERROR,log_module_enum.MODULE_COMBAT,args);
    }
    export function combat_warnlog(...args):void{
        log(log_level_enum.LOG_WARNNING,log_module_enum.MODULE_COMBAT,args);
    }
    export function combat_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_COMBAT,args);
    }
    export function ui_errlog(...args):void{
        log(log_level_enum.LOG_ERROR,log_module_enum.MODULE_UI,args);
    }
    export function ui_warnlog(...args):void{
        log(log_level_enum.LOG_WARNNING,log_module_enum.MODULE_UI,args);
    }
    export function ui_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_UI,args);
    }
    export function game_errlog(...args):void{
        log(log_level_enum.LOG_ERROR,log_module_enum.MODULE_GAME,args);
    }
    export function game_warnlog(...args):void{
        log(log_level_enum.LOG_WARNNING,log_module_enum.MODULE_GAME,args);
    }
    export function game_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_GAME,args);
    }
    export function game_log(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_GAME,args);
    }
    export function loading_tiplog(...args):void{
        log(log_level_enum.LOG_TIPS,log_module_enum.MODULE_LOADING,args);
    }
    export let g_b_open_loadinglog:boolean = false;
    export function open_loading_log(flag:boolean):void{
        g_b_open_loadinglog = flag;
    }
    function myload_complete(comp:Laya.Handler,url:any):void{
        if(g_b_open_loadinglog){
            if(url instanceof Array){
                loading_tiplog("gameload complete time ",Laya.Browser.now());
                for(let i of url){
                    loading_tiplog("gameload complete ",i.type,i.url);
                }
            }
            else{
                loading_tiplog("gameload complete ",Laya.Browser.now(),url);
            }
            
        }
        comp.run();
    }
    export function myload(url: any, complete?: Laya.Handler, progress?: Laya.Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean): Laya.LoaderManager{
        if(g_b_open_loadinglog){
            if(url instanceof Array){
                loading_tiplog("gameload start time ",Laya.Browser.now());
                for(let i of url){
                    loading_tiplog("gameload start ",i.type,i.url);
                }
            }
            else{
                loading_tiplog("gameload start ",Laya.Browser.now(),url);
            }
            
        }
        let comp:Laya.Handler = Laya.Handler.create(null,myload_complete,[complete,url]);
        return Laya.loader.load(url,comp,progress,type,priority,cache,group,ignoreCache);
    }
}