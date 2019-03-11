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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var game;
    (function (game) {
        var card_mainUI = /** @class */ (function (_super) {
            __extends(card_mainUI, _super);
            function card_mainUI() {
                return _super.call(this) || this;
            }
            card_mainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/card_main");
            };
            return card_mainUI;
        }(Dialog));
        game.card_mainUI = card_mainUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var chat_faceUI = /** @class */ (function (_super) {
            __extends(chat_faceUI, _super);
            function chat_faceUI() {
                return _super.call(this) || this;
            }
            chat_faceUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/chat_face");
            };
            return chat_faceUI;
        }(Dialog));
        game.chat_faceUI = chat_faceUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var chat_input_uiUI = /** @class */ (function (_super) {
            __extends(chat_input_uiUI, _super);
            function chat_input_uiUI() {
                return _super.call(this) || this;
            }
            chat_input_uiUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/chat_input_ui");
            };
            return chat_input_uiUI;
        }(Dialog));
        game.chat_input_uiUI = chat_input_uiUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var chat_uiUI = /** @class */ (function (_super) {
            __extends(chat_uiUI, _super);
            function chat_uiUI() {
                return _super.call(this) || this;
            }
            chat_uiUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/chat_ui");
            };
            return chat_uiUI;
        }(Dialog));
        game.chat_uiUI = chat_uiUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var help_tipsUI = /** @class */ (function (_super) {
            __extends(help_tipsUI, _super);
            function help_tipsUI() {
                return _super.call(this) || this;
            }
            help_tipsUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/help_tips");
            };
            return help_tipsUI;
        }(Dialog));
        game.help_tipsUI = help_tipsUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var main_topuiUI = /** @class */ (function (_super) {
            __extends(main_topuiUI, _super);
            function main_topuiUI() {
                return _super.call(this) || this;
            }
            main_topuiUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/main_topui");
            };
            return main_topuiUI;
        }(Dialog));
        game.main_topuiUI = main_topuiUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var main_topui_newUI = /** @class */ (function (_super) {
            __extends(main_topui_newUI, _super);
            function main_topui_newUI() {
                return _super.call(this) || this;
            }
            main_topui_newUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/main_topui_new");
            };
            return main_topui_newUI;
        }(Dialog));
        game.main_topui_newUI = main_topui_newUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var main_uiUI = /** @class */ (function (_super) {
            __extends(main_uiUI, _super);
            function main_uiUI() {
                return _super.call(this) || this;
            }
            main_uiUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/main_ui");
            };
            return main_uiUI;
        }(Dialog));
        game.main_uiUI = main_uiUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var main_ui_newUI = /** @class */ (function (_super) {
            __extends(main_ui_newUI, _super);
            function main_ui_newUI() {
                return _super.call(this) || this;
            }
            main_ui_newUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/main_ui_new");
            };
            return main_ui_newUI;
        }(Dialog));
        game.main_ui_newUI = main_ui_newUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var msgboxUI = /** @class */ (function (_super) {
            __extends(msgboxUI, _super);
            function msgboxUI() {
                return _super.call(this) || this;
            }
            msgboxUI.prototype.createChildren = function () {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.loadUI("game/msgbox");
            };
            return msgboxUI;
        }(Dialog));
        game.msgboxUI = msgboxUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
(function (ui) {
    var game;
    (function (game) {
        var tips_uiUI = /** @class */ (function (_super) {
            __extends(tips_uiUI, _super);
            function tips_uiUI() {
                return _super.call(this) || this;
            }
            tips_uiUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("game/tips_ui");
            };
            return tips_uiUI;
        }(Dialog));
        game.tips_uiUI = tips_uiUI;
    })(game = ui.game || (ui.game = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map