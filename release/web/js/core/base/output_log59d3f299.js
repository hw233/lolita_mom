var core;
(function (core) {
    var log_level_enum;
    (function (log_level_enum) {
        log_level_enum[log_level_enum["LOG_ERROR"] = 0] = "LOG_ERROR";
        log_level_enum[log_level_enum["LOG_WARNNING"] = 1] = "LOG_WARNNING";
        log_level_enum[log_level_enum["LOG_TIPS"] = 2] = "LOG_TIPS";
        log_level_enum[log_level_enum["LOG_MAX"] = 3] = "LOG_MAX";
    })(log_level_enum = core.log_level_enum || (core.log_level_enum = {}));
    var log_level = log_level_enum.LOG_MAX;
    var log_module_enum;
    (function (log_module_enum) {
        log_module_enum[log_module_enum["MODULE_CORE"] = 0] = "MODULE_CORE";
        log_module_enum[log_module_enum["MODULE_RES"] = 1] = "MODULE_RES";
        log_module_enum[log_module_enum["MODULE_COMBAT"] = 2] = "MODULE_COMBAT";
        log_module_enum[log_module_enum["MODULE_NET"] = 3] = "MODULE_NET";
        log_module_enum[log_module_enum["MODULE_UI"] = 4] = "MODULE_UI";
        log_module_enum[log_module_enum["MODULE_GAME"] = 5] = "MODULE_GAME";
        log_module_enum[log_module_enum["MODULE_OTHER"] = 6] = "MODULE_OTHER";
        log_module_enum[log_module_enum["MODULE_LOADING"] = 7] = "MODULE_LOADING";
        log_module_enum[log_module_enum["MODULE_ALL"] = 8] = "MODULE_ALL";
    })(log_module_enum = core.log_module_enum || (core.log_module_enum = {}));
    var log_module = log_module_enum.MODULE_ALL;
    function set_log_level(v) {
        log_level = v;
    }
    core.set_log_level = set_log_level;
    function set_log_module(v) {
        log_module = v;
    }
    core.set_log_module = set_log_module;
    function fast_log(module) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("module:" + module + " " + args);
    }
    function log(level, module) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (level > log_level) {
            return;
        }
        if (log_module != log_module_enum.MODULE_ALL && module != log_module) {
            return;
        }
        fast_log(module, args);
    }
    core.log = log;
    function res_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_RES, args);
    }
    core.res_errlog = res_errlog;
    function res_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_RES, args);
    }
    core.res_warnlog = res_warnlog;
    function res_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_RES, args);
    }
    core.res_tiplog = res_tiplog;
    function core_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_CORE, args);
    }
    core.core_errlog = core_errlog;
    function core_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_CORE, args);
    }
    core.core_warnlog = core_warnlog;
    function core_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_CORE, args);
    }
    core.core_tiplog = core_tiplog;
    function net_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_NET, args);
    }
    core.net_errlog = net_errlog;
    function net_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_NET, args);
    }
    core.net_warnlog = net_warnlog;
    function net_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_NET, args);
    }
    core.net_tiplog = net_tiplog;
    function combat_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_COMBAT, args);
    }
    core.combat_errlog = combat_errlog;
    function combat_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_COMBAT, args);
    }
    core.combat_warnlog = combat_warnlog;
    function combat_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_COMBAT, args);
    }
    core.combat_tiplog = combat_tiplog;
    function ui_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_UI, args);
    }
    core.ui_errlog = ui_errlog;
    function ui_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_UI, args);
    }
    core.ui_warnlog = ui_warnlog;
    function ui_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_UI, args);
    }
    core.ui_tiplog = ui_tiplog;
    function game_errlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_ERROR, log_module_enum.MODULE_GAME, args);
    }
    core.game_errlog = game_errlog;
    function game_warnlog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_WARNNING, log_module_enum.MODULE_GAME, args);
    }
    core.game_warnlog = game_warnlog;
    function game_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_GAME, args);
    }
    core.game_tiplog = game_tiplog;
    function game_log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_GAME, args);
    }
    core.game_log = game_log;
    function loading_tiplog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        log(log_level_enum.LOG_TIPS, log_module_enum.MODULE_LOADING, args);
    }
    core.loading_tiplog = loading_tiplog;
    core.g_b_open_loadinglog = false;
    function open_loading_log(flag) {
        core.g_b_open_loadinglog = flag;
    }
    core.open_loading_log = open_loading_log;
    function myload_complete(comp, url) {
        if (core.g_b_open_loadinglog) {
            if (url instanceof Array) {
                loading_tiplog("gameload complete time ", Laya.Browser.now());
                for (var _i = 0, url_1 = url; _i < url_1.length; _i++) {
                    var i = url_1[_i];
                    loading_tiplog("gameload complete ", i.type, i.url);
                }
            }
            else {
                loading_tiplog("gameload complete ", Laya.Browser.now(), url);
            }
        }
        comp.run();
    }
    function myload(url, complete, progress, type, priority, cache, group, ignoreCache) {
        if (core.g_b_open_loadinglog) {
            if (url instanceof Array) {
                loading_tiplog("gameload start time ", Laya.Browser.now());
                for (var _i = 0, url_2 = url; _i < url_2.length; _i++) {
                    var i = url_2[_i];
                    loading_tiplog("gameload start ", i.type, i.url);
                }
            }
            else {
                loading_tiplog("gameload start ", Laya.Browser.now(), url);
            }
        }
        var comp = Laya.Handler.create(null, myload_complete, [complete, url]);
        return Laya.loader.load(url, comp, progress, type, priority, cache, group, ignoreCache);
    }
    core.myload = myload;
})(core || (core = {}));
//# sourceMappingURL=output_log.js.map