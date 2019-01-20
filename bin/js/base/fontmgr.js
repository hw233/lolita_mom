var fontmgr;
(function (fontmgr) {
    var TextFormat = /** @class */ (function () {
        function TextFormat(f, c, b, i, s, underline, underlinec, stroke, strokec, leading, padding) {
            if (f === void 0) { f = "Microsoft YaHei"; }
            if (c === void 0) { c = "#000000"; }
            if (b === void 0) { b = 0; }
            if (i === void 0) { i = 0; }
            if (s === void 0) { s = -1; }
            if (underline === void 0) { underline = 0; }
            if (underlinec === void 0) { underlinec = "#000000"; }
            if (stroke === void 0) { stroke = 0; }
            if (strokec === void 0) { strokec = "#000000"; }
            if (leading === void 0) { leading = 0; }
            if (padding === void 0) { padding = "0,0,0,0"; }
            this.font = f;
            this.color = c;
            this.bold = b;
            this.italic = i;
            this.fontSize = s;
            this.underline = underline;
            this.underlineColor = underlinec;
            this.stroke = stroke;
            this.strokeColor = strokec;
            this.leading = leading;
            this.padding = padding;
        }
        return TextFormat;
    }());
    var FONTSTYLE_ENUM;
    (function (FONTSTYLE_ENUM) {
        // 常规界面颜色，添加配置需与负责人商定，此配置要节制。
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_DEFAULT"] = 0] = "FONT_DEFAULT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_YELLOW"] = 1] = "FONT_YELLOW";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_YELLOWLIGHT"] = 2] = "FONT_YELLOWLIGHT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_GREEN"] = 3] = "FONT_GREEN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_GREENLIGHT"] = 4] = "FONT_GREENLIGHT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_RED"] = 5] = "FONT_RED";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_REDDRAK"] = 6] = "FONT_REDDRAK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_REDLIGHT"] = 7] = "FONT_REDLIGHT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BLUE"] = 8] = "FONT_BLUE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_PINK"] = 9] = "FONT_PINK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_PURPLE"] = 10] = "FONT_PURPLE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_ORANGE"] = 11] = "FONT_ORANGE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_WHTIE"] = 12] = "FONT_WHTIE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BLACK"] = 13] = "FONT_BLACK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_GRAY"] = 14] = "FONT_GRAY";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_HE"] = 15] = "FONT_HE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BROWN"] = 16] = "FONT_BROWN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BROWNDARK"] = 17] = "FONT_BROWNDARK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BTNTAB"] = 18] = "FONT_BTNTAB";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_OUTLINE"] = 19] = "FONT_OUTLINE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BTNBLUE"] = 20] = "FONT_BTNBLUE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BTNYELLOW"] = 21] = "FONT_BTNYELLOW";
        // 品质颜色
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_0"] = 22] = "FONT_QUALITY_0";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_1"] = 23] = "FONT_QUALITY_1";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_2"] = 24] = "FONT_QUALITY_2";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_3"] = 25] = "FONT_QUALITY_3";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_4"] = 26] = "FONT_QUALITY_4";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_5"] = 27] = "FONT_QUALITY_5";
        // ......
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N1"] = 28] = "FONT_N1";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N2"] = 29] = "FONT_N2";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N3"] = 30] = "FONT_N3";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N4"] = 31] = "FONT_N4";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N5"] = 32] = "FONT_N5";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N6"] = 33] = "FONT_N6";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_CHAPTERBTN"] = 34] = "FONT_CHAPTERBTN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_CHAPTERHELP"] = 35] = "FONT_CHAPTERHELP";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_EQUIPBTN"] = 36] = "FONT_EQUIPBTN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_END"] = 37] = "FONT_END";
    })(FONTSTYLE_ENUM = fontmgr.FONTSTYLE_ENUM || (fontmgr.FONTSTYLE_ENUM = {}));
    var fontstylemgr = /** @class */ (function () {
        function fontstylemgr() {
            // this._stylemap[FONTSTYLE_ENUM.DEFAULT] = new TextFormat("Microsoft YaHei","#fff799");
            // this._filtersmap[FONTSTYLE_ENUM.DEFAULT] = [
            //     new Laya.GlowFilter("#5e391b",3,3,3),
            // ];
            // this._stylemap[FONTSTYLE_ENUM.DEFAULT1] = new TextFormat("Microsoft YaHei","#fff799");
            this._stylemap = new Object(); //字体样式映射 
            this._filtersmap = new Object();
            this.FONT_NAME = "h5font";
            this._stylemap[FONTSTYLE_ENUM.FONT_DEFAULT] = new TextFormat(this.FONT_NAME, "#bd8651");
            this._stylemap[FONTSTYLE_ENUM.FONT_YELLOW] = new TextFormat(this.FONT_NAME, "#ffff00");
            this._stylemap[FONTSTYLE_ENUM.FONT_YELLOWLIGHT] = new TextFormat(this.FONT_NAME, "#fffbb5");
            this._stylemap[FONTSTYLE_ENUM.FONT_GREEN] = new TextFormat(this.FONT_NAME, "#12a710");
            this._stylemap[FONTSTYLE_ENUM.FONT_GREENLIGHT] = new TextFormat(this.FONT_NAME, "#00ff1e");
            this._stylemap[FONTSTYLE_ENUM.FONT_RED] = new TextFormat(this.FONT_NAME, "#ed3e46");
            this._stylemap[FONTSTYLE_ENUM.FONT_REDDRAK] = new TextFormat(this.FONT_NAME, "#a83937");
            this._stylemap[FONTSTYLE_ENUM.FONT_REDLIGHT] = new TextFormat(this.FONT_NAME, "#ff2828");
            this._stylemap[FONTSTYLE_ENUM.FONT_BLUE] = new TextFormat(this.FONT_NAME, "#11b0e5");
            this._stylemap[FONTSTYLE_ENUM.FONT_PINK] = new TextFormat(this.FONT_NAME, "#ffbfd0");
            this._stylemap[FONTSTYLE_ENUM.FONT_PURPLE] = new TextFormat(this.FONT_NAME, "#c63eed");
            this._stylemap[FONTSTYLE_ENUM.FONT_ORANGE] = new TextFormat(this.FONT_NAME, "#f29e07");
            this._stylemap[FONTSTYLE_ENUM.FONT_WHTIE] = new TextFormat(this.FONT_NAME, "#ffffff");
            this._stylemap[FONTSTYLE_ENUM.FONT_BLACK] = new TextFormat(this.FONT_NAME, "#000000");
            this._stylemap[FONTSTYLE_ENUM.FONT_GRAY] = new TextFormat(this.FONT_NAME, "#a29d9a");
            this._stylemap[FONTSTYLE_ENUM.FONT_HE] = new TextFormat(this.FONT_NAME, "#6d4b46");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNTAB] = new TextFormat(this.FONT_NAME, "#aa7365");
            this._stylemap[FONTSTYLE_ENUM.FONT_BROWN] = new TextFormat(this.FONT_NAME, "#894c39");
            this._stylemap[FONTSTYLE_ENUM.FONT_BROWNDARK] = new TextFormat(this.FONT_NAME, "#6e4b47");
            this._stylemap[FONTSTYLE_ENUM.FONT_OUTLINE] = new TextFormat(this.FONT_NAME, "#ffffff", 0, 0, -1, 0, "#000000", 3, "#000000");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNBLUE] = new TextFormat(this.FONT_NAME, "#ffffff", 0, 0, -1, 0, "#000000", 3, "#005982");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNYELLOW] = new TextFormat(this.FONT_NAME, "#ffffff", 0, 0, -1, 0, "#000000", 3, "#eb6100");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_0] = new TextFormat(this.FONT_NAME, "#a29d9a");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_1] = new TextFormat(this.FONT_NAME, "#38bd61");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_2] = new TextFormat(this.FONT_NAME, "#11b0e5");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_3] = new TextFormat(this.FONT_NAME, "#c63eed");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_4] = new TextFormat(this.FONT_NAME, "#f29e07");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_5] = new TextFormat(this.FONT_NAME, "#ed3e46");
            this._stylemap[FONTSTYLE_ENUM.FONT_N1] = new TextFormat("SimSun", "#f1f1f1");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N1] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N2] = new TextFormat("SimSun", "#ff4e00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N2] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N3] = new TextFormat("SimSun", "#ff0000");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N3] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N4] = new TextFormat("SimSun", "#ffd600");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N4] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N5] = new TextFormat("SimSun", "#2aff00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N5] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N6] = new TextFormat("SimSun", "#aeff00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N6] = [new Laya.GlowFilter("#186400", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERBTN] = new TextFormat(this.FONT_NAME, "#f8bc74", 0, 0, -1, 0, "", 5, "#a56b51");
            //this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERBTN] = new TextFormat(this.FONT_NAME,"#000000",0,0,-1,0,"",);
            this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERHELP] = new TextFormat(this.FONT_NAME, "#38bd61", 0, 0, -1, 1, "#38bd61");
            this._stylemap[FONTSTYLE_ENUM.FONT_EQUIPBTN] = new TextFormat(this.FONT_NAME, "#12a710", 0, 0, -1, 1, "#12a710");
        }
        /**
         * 根据key找到字体样式的具体配置
         * @param {string} id
         * @returns {ITextFormat}
         */
        fontstylemgr.prototype.getstylebyid = function (id) {
            return this._stylemap[id];
        };
        fontstylemgr.prototype.getfiltersbyid = function (id) {
            return this._filtersmap[id];
        };
        fontstylemgr.prototype.getstylefont = function (id) {
            return this._stylemap[id].font;
        };
        fontstylemgr.prototype.set_htmldiv = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            l.style.color = fs.color;
            l.style.bold = fs.bold != 0;
            l.style.italic = fs.italic != 0;
            if (font_size == -1) {
                font_size = fs.fontSize;
            }
            if (font_size == -1) {
                font_size = 50;
            }
            l.style.font = font_size + "px " + this.FONT_NAME;
            if (fs.underline != 0) {
                l.style.underLine = 1;
            }
            else {
                l.style.underLine = 0;
            }
            l.style.leading = fs.leading;
            l.style.stroke = fs.stroke;
            l.style.strokeColor = fs.strokeColor;
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.filters = filters;
            }
            return true;
        };
        fontstylemgr.prototype.set_lable = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            l.font = fs.font;
            l.color = fs.color;
            l.bold = fs.bold != 0;
            l.italic = fs.italic != 0;
            if (font_size == -1) {
                font_size = fs.fontSize;
            }
            if (font_size != -1) {
                l.fontSize = font_size;
            }
            if (fs.underline != 0) {
                l.underline = true;
                l.underlineColor = fs.underlineColor;
            }
            else {
                l.underline = false;
            }
            l.stroke = fs.stroke;
            l.strokeColor = fs.strokeColor;
            l.leading = fs.leading;
            l.padding = fs.padding;
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.filters = filters;
            }
            return true;
        };
        fontstylemgr.prototype.set_button = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            var disabledColor = "#AAAAAA"; //按钮变灰色时字体颜色
            l.labelFont = fs.font;
            l.labelColors = fs.color;
            l.labelBold = fs.bold != 0;
            //
            if (fs.color) {
                var tmpColors = void 0;
                if (fs.color.indexOf(",") != -1) {
                    l.labelColors = fs.color;
                }
                else {
                    tmpColors = [fs.color, fs.color, fs.color, disabledColor];
                    l.labelColors = tmpColors.join(",");
                }
            }
            if (fs.strokeColor) {
                var tmpColors = void 0;
                if (fs.strokeColor.indexOf(",") != -1) {
                    l.strokeColors = fs.strokeColor;
                }
                else {
                    tmpColors = [fs.strokeColor, fs.strokeColor, fs.strokeColor, disabledColor];
                    l.strokeColors = tmpColors.join(",");
                }
            }
            l.labelStroke = fs.stroke;
            //
            if (font_size == -1) {
                font_size = fs.fontSize;
            }
            if (font_size != -1) {
                l.labelSize = font_size;
            }
            l.labelPadding = fs.padding;
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.text.filters = filters;
            }
            return true;
        };
        fontstylemgr.prototype.set_textinput = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            var ret = this.set_lable(l, id, font_size);
            return ret;
        };
        fontstylemgr.prototype.registerfont = function (arr) {
            if (Laya.Browser.window.conch) {
                Laya.Browser.window.conch.setFontFaceFromBuffer(this.FONT_NAME, arr);
            }
        };
        return fontstylemgr;
    }());
    var g_ins = null;
    function ins() {
        if (g_ins == null) {
            g_ins = new fontstylemgr();
        }
        return g_ins;
    }
    function registerfont(arr) {
        return ins().registerfont(arr);
    }
    fontmgr.registerfont = registerfont;
    function getstylefont(id) {
        return ins().getstylefont(id);
    }
    fontmgr.getstylefont = getstylefont;
    function set_htmldiv(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_htmldiv(l, id, font_size);
    }
    fontmgr.set_htmldiv = set_htmldiv;
    function set_lable(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_lable(l, id, font_size);
    }
    fontmgr.set_lable = set_lable;
    function set_button(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_button(l, id, font_size);
    }
    fontmgr.set_button = set_button;
    function set_textinput(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_textinput(l, id, font_size);
    }
    fontmgr.set_textinput = set_textinput;
    function set_ui_style(ui, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        for (var i = 0; i < ui.numChildren; ++i) {
            var comp = ui.getChildAt(i);
            if (comp instanceof (Laya.TextInput)) {
                set_textinput(comp, id, font_size);
            }
            else if (comp instanceof (Laya.HTMLDivElement)) {
                set_htmldiv(comp, id, font_size);
            }
            else {
                if (comp instanceof (Laya.Label)) {
                    set_lable(comp, id, font_size);
                }
                else if (comp instanceof (Laya.Button)) {
                    set_button(comp, id, font_size);
                }
                else {
                    if (comp instanceof (Laya.Node)) {
                        set_ui_style(comp, id, font_size);
                    }
                }
            }
        }
        return true;
    }
    fontmgr.set_ui_style = set_ui_style;
    function set_ui_font(ui) {
        for (var i = 0; i < ui.numChildren; ++i) {
            var comp = ui.getChildAt(i);
            if (comp instanceof (Laya.TextInput)) {
                comp.font = ins().FONT_NAME;
            }
            else {
                if (comp instanceof (Laya.Label)) {
                    comp.font = ins().FONT_NAME;
                }
                else if (comp instanceof (Laya.Button)) {
                    var btn = comp;
                    btn.labelFont = ins().FONT_NAME;
                }
                else {
                    if (comp instanceof (Laya.Node)) {
                        set_ui_font(comp);
                    }
                }
            }
        }
    }
    fontmgr.set_ui_font = set_ui_font;
})(fontmgr || (fontmgr = {}));
//# sourceMappingURL=fontmgr.js.map