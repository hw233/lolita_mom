module fontmgr{
    
    class TextFormat {
        /**
         * 字体
         */
        font: string;
        /**
         * 文本颜色
         */
        color: string;
        /**
         * 是否加粗
         */
        bold: number;
        /**
         * 是否为斜体
         */
        italic: number;
        /**
         * 字体大小
         */
        fontSize: number;

        /**
         * 行间距
         */
        leading: number;

        /**
         * 描边宽度
         */
        stroke: number;

        /**
         * 描边颜色
         */
        strokeColor: string;

        /**
         * 下划线
         */
        underline: number;

        /**
         * 下划线颜色
         */
        underlineColor:string;

        padding:string;
        constructor(f:string = "Microsoft YaHei",c:string = "#000000",b:number = 0,i:number = 0,s:number = -1,underline:number = 0,underlinec:string = "#000000",stroke:number = 0,strokec:string = "#000000",leading: number = 0,padding:string = "0,0,0,0") {
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
    }
    export enum FONTSTYLE_ENUM{
        // 常规界面颜色，添加配置需与负责人商定，此配置要节制。
        FONT_DEFAULT,  // 默认土黄色
        FONT_YELLOW,
        FONT_YELLOWLIGHT,
        FONT_GREEN,
        FONT_GREENLIGHT,
        FONT_RED,
        FONT_REDDRAK,
        FONT_REDLIGHT,
        FONT_BLUE,
        FONT_PINK,
        FONT_PURPLE,
        FONT_ORANGE,
        FONT_WHTIE,
        FONT_BLACK,
        FONT_GRAY,
        FONT_HE,
        FONT_BROWN,
        FONT_BROWNDARK,

        FONT_BTNTAB,  // 底部切页按钮文字颜色
        FONT_OUTLINE,  // icon右下角数量按钮文字颜色
        FONT_BTNBLUE,  // 玉质蓝色按钮文字颜色
        FONT_BTNYELLOW,  // 玉质黄色按钮文字颜色

        // 品质颜色
        FONT_QUALITY_0,
        FONT_QUALITY_1,
        FONT_QUALITY_2,
        FONT_QUALITY_3,
        FONT_QUALITY_4,
        FONT_QUALITY_5,

        // ......
        FONT_N1,
        FONT_N2,
        FONT_N3,
        FONT_N4,
        FONT_N5,
        FONT_N6,
        FONT_CHAPTERBTN,
        FONT_CHAPTERHELP,
        FONT_EQUIPBTN,
        FONT_END,
    }

    class fontstylemgr{
        private _stylemap: Object = new Object();//字体样式映射 
        private _filtersmap:Object = new Object();
        public FONT_NAME:string = "h5font";
        constructor(){
            // this._stylemap[FONTSTYLE_ENUM.DEFAULT] = new TextFormat("Microsoft YaHei","#fff799");
            // this._filtersmap[FONTSTYLE_ENUM.DEFAULT] = [
            //     new Laya.GlowFilter("#5e391b",3,3,3),
            // ];
            // this._stylemap[FONTSTYLE_ENUM.DEFAULT1] = new TextFormat("Microsoft YaHei","#fff799");

            this._stylemap[FONTSTYLE_ENUM.FONT_DEFAULT] = new TextFormat(this.FONT_NAME,"#bd8651");
            this._stylemap[FONTSTYLE_ENUM.FONT_YELLOW] = new TextFormat(this.FONT_NAME,"#ffff00");
            this._stylemap[FONTSTYLE_ENUM.FONT_YELLOWLIGHT] = new TextFormat(this.FONT_NAME,"#fffbb5");
            this._stylemap[FONTSTYLE_ENUM.FONT_GREEN] = new TextFormat(this.FONT_NAME,"#12a710");
            this._stylemap[FONTSTYLE_ENUM.FONT_GREENLIGHT] = new TextFormat(this.FONT_NAME,"#00ff1e");
            this._stylemap[FONTSTYLE_ENUM.FONT_RED] = new TextFormat(this.FONT_NAME,"#ed3e46");
            this._stylemap[FONTSTYLE_ENUM.FONT_REDDRAK] = new TextFormat(this.FONT_NAME,"#a83937");
            this._stylemap[FONTSTYLE_ENUM.FONT_REDLIGHT] = new TextFormat(this.FONT_NAME,"#ff2828");
            this._stylemap[FONTSTYLE_ENUM.FONT_BLUE] = new TextFormat(this.FONT_NAME,"#11b0e5");
            this._stylemap[FONTSTYLE_ENUM.FONT_PINK] = new TextFormat(this.FONT_NAME,"#ffbfd0");
            this._stylemap[FONTSTYLE_ENUM.FONT_PURPLE] = new TextFormat(this.FONT_NAME,"#c63eed");
            this._stylemap[FONTSTYLE_ENUM.FONT_ORANGE] = new TextFormat(this.FONT_NAME,"#f29e07");
            this._stylemap[FONTSTYLE_ENUM.FONT_WHTIE] = new TextFormat(this.FONT_NAME,"#ffffff");
            this._stylemap[FONTSTYLE_ENUM.FONT_BLACK] = new TextFormat(this.FONT_NAME,"#000000");
            this._stylemap[FONTSTYLE_ENUM.FONT_GRAY] = new TextFormat(this.FONT_NAME,"#a29d9a");
            this._stylemap[FONTSTYLE_ENUM.FONT_HE] = new TextFormat(this.FONT_NAME,"#6d4b46");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNTAB] = new TextFormat(this.FONT_NAME,"#aa7365");
            this._stylemap[FONTSTYLE_ENUM.FONT_BROWN] = new TextFormat(this.FONT_NAME,"#894c39");
            this._stylemap[FONTSTYLE_ENUM.FONT_BROWNDARK] = new TextFormat(this.FONT_NAME,"#6e4b47");
            this._stylemap[FONTSTYLE_ENUM.FONT_OUTLINE] = new TextFormat(this.FONT_NAME,"#ffffff", 0, 0, -1, 0, "#000000", 3, "#000000");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNBLUE] = new TextFormat(this.FONT_NAME,"#ffffff", 0, 0, -1, 0, "#000000", 3, "#005982");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNYELLOW] = new TextFormat(this.FONT_NAME,"#ffffff", 0, 0, -1, 0, "#000000", 3, "#eb6100");

            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_0] = new TextFormat(this.FONT_NAME,"#a29d9a");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_1] = new TextFormat(this.FONT_NAME,"#38bd61");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_2] = new TextFormat(this.FONT_NAME,"#11b0e5");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_3] = new TextFormat(this.FONT_NAME,"#c63eed");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_4] = new TextFormat(this.FONT_NAME,"#f29e07");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_5] = new TextFormat(this.FONT_NAME,"#ed3e46");

            this._stylemap[FONTSTYLE_ENUM.FONT_N1] = new TextFormat("SimSun","#f1f1f1");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N1] = [new Laya.GlowFilter("#000105",3,3,3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N2] = new TextFormat("SimSun","#ff4e00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N2] = [new Laya.GlowFilter("#000105",3,3,3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N3] = new TextFormat("SimSun","#ff0000");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N3] = [new Laya.GlowFilter("#000105",3,3,3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N4] = new TextFormat("SimSun","#ffd600");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N4] = [new Laya.GlowFilter("#000105",3,3,3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N5] = new TextFormat("SimSun","#2aff00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N5] = [new Laya.GlowFilter("#000105",3,3,3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N6] = new TextFormat("SimSun","#aeff00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N6] = [new Laya.GlowFilter("#186400",3,3,3),];

            this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERBTN] = new TextFormat(this.FONT_NAME,"#f8bc74",0,0,-1,0,"",5,"#a56b51",);
            //this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERBTN] = new TextFormat(this.FONT_NAME,"#000000",0,0,-1,0,"",);
            this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERHELP] = new TextFormat(this.FONT_NAME,"#38bd61",0,0,-1,1,"#38bd61",);
            this._stylemap[FONTSTYLE_ENUM.FONT_EQUIPBTN] = new TextFormat(this.FONT_NAME,"#12a710",0,0,-1,1,"#12a710",);

        }
        /**
         * 根据key找到字体样式的具体配置
         * @param {string} id
         * @returns {ITextFormat}
         */
        private getstylebyid(id:FONTSTYLE_ENUM): TextFormat {
            return this._stylemap[id];
        }
        private getfiltersbyid(id:FONTSTYLE_ENUM): any[] {
            return this._filtersmap[id];
        }
        public getstylefont(id:FONTSTYLE_ENUM):string{
            return this._stylemap[id].font;
        }
        public set_htmldiv(l:Laya.HTMLDivElement,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
            let fs:TextFormat = this.getstylebyid(id);
            if(fs == null || fs == undefined){
                core.game_tiplog("fontstylemgr error id! ",id);
                return false;
            }
            
            l.style.color = fs.color;
            l.style.bold = fs.bold != 0;
            l.style.italic = fs.italic != 0;
            if(font_size == -1){
                font_size = fs.fontSize;
            }
            if(font_size == -1){
                font_size = 50;
            }
            l.style.font = font_size+"px "+this.FONT_NAME;
            if(fs.underline != 0){
                l.style.underLine = 1;
            }
            else{
                l.style.underLine = 0;
            }
            l.style.leading = fs.leading;
            l.style.stroke = fs.stroke;
            l.style.strokeColor = fs.strokeColor;
            let filters:any[] = this.getfiltersbyid(id);
            if(filters != null && filters != undefined){
                l.filters = filters;
            }
            return true;
        }
        public set_lable(l:Laya.Label,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
            let fs:TextFormat = this.getstylebyid(id);
            if(fs == null || fs == undefined){
                core.game_tiplog("fontstylemgr error id! ",id);
                return false;
            }

            l.font = fs.font;
            l.color = fs.color;
            l.bold = fs.bold != 0;
            l.italic = fs.italic != 0;
            if(font_size == -1){
                font_size = fs.fontSize;
            }
            if(font_size != -1){
                l.fontSize = font_size;
            }
            
            if(fs.underline != 0){
                l.underline = true;
                l.underlineColor = fs.underlineColor;
            }
            else{
                l.underline = false;
            }
            l.stroke = fs.stroke;
            l.strokeColor = fs.strokeColor;
            l.leading = fs.leading;
            l.padding = fs.padding;

            let filters:any[] = this.getfiltersbyid(id);
            if(filters != null && filters != undefined){
                l.filters = filters;
            }

            return true;
        }
        public set_button(l:Laya.Button,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
            let fs:TextFormat = this.getstylebyid(id);
            if(fs == null || fs == undefined){
                core.game_tiplog("fontstylemgr error id! ",id);
                return false;
            }
            let disabledColor: string = "#AAAAAA";//按钮变灰色时字体颜色
            l.labelFont = fs.font;
            l.labelColors = fs.color;
            l.labelBold = fs.bold != 0;
            //
            if (fs.color) {
                let tmpColors: Array<string>;
                if (fs.color.indexOf(",") != -1) {
                    l.labelColors = fs.color;
                } else {
                    tmpColors = [fs.color, fs.color, fs.color, disabledColor];
                    l.labelColors = tmpColors.join(",");
                }
            }
            if (fs.strokeColor) {
                let tmpColors: Array<string>;
                if (fs.strokeColor.indexOf(",") != -1) {
                    l.strokeColors = fs.strokeColor;
                } else {
                    tmpColors = [fs.strokeColor, fs.strokeColor, fs.strokeColor, disabledColor];
                    l.strokeColors = tmpColors.join(",");
                }
            }
            l.labelStroke = fs.stroke;
            //
            if(font_size == -1){
                font_size = fs.fontSize;
            }
            if(font_size != -1){
                l.labelSize = font_size;
            }

            l.labelPadding = fs.padding;

            let filters:any[] = this.getfiltersbyid(id);
            if(filters != null && filters != undefined){
                l.text.filters = filters;
            }
            return true;
        }
        public set_textinput(l:Laya.TextInput,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
            let fs:TextFormat = this.getstylebyid(id);
            if(fs == null || fs == undefined){
                core.game_tiplog("fontstylemgr error id! ",id);
                return false;
            }

            let ret:boolean = this.set_lable(l,id,font_size);
            return ret;
        }
        public registerfont(arr:ArrayBuffer):void{
            if(Laya.Browser.window.conch){
                Laya.Browser.window.conch.setFontFaceFromBuffer(this.FONT_NAME,arr);
            }
        }
    }
    let g_ins:fontstylemgr = null;
    function ins():fontstylemgr{
        if(g_ins == null){
            g_ins = new fontstylemgr();
        }
        return g_ins;
    }
    export function registerfont(arr:ArrayBuffer):void{
        return ins().registerfont(arr);
    }
    export function getstylefont(id:FONTSTYLE_ENUM):string{
        return ins().getstylefont(id);
    }
    export function set_htmldiv(l:Laya.HTMLDivElement,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
        return ins().set_htmldiv(l,id,font_size);
    }
    export function set_lable(l:Laya.Label,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
        return ins().set_lable(l,id,font_size);
    }
    export function set_button(l:Laya.Button,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
        return ins().set_button(l,id,font_size);
    }
    export function set_textinput(l:Laya.TextInput,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
        return ins().set_textinput(l,id,font_size);
    }
    export function set_ui_style(ui:Laya.Node,id:FONTSTYLE_ENUM,font_size:number = -1):boolean{
        for(let i:number = 0;i < ui.numChildren;++i){
            let comp:Laya.Node = ui.getChildAt(i);
            if(comp instanceof(Laya.TextInput)){
                set_textinput(comp as Laya.TextInput,id,font_size);
            }
            else if(comp instanceof(Laya.HTMLDivElement)){
                set_htmldiv(comp as Laya.HTMLDivElement,id,font_size);
            }
            else{
                if(comp instanceof(Laya.Label)){
                    set_lable(comp as Laya.Label,id,font_size);
                }
                else if(comp instanceof(Laya.Button)){
                    set_button(comp as Laya.Button,id,font_size);
                }
                else{
                    if(comp instanceof (Laya.Node)){
                        set_ui_style(comp,id,font_size);
                    }
                }
            }
        }
        return true;
    }
    export function set_ui_font(ui:Laya.Node):void{
        for(let i:number = 0;i < ui.numChildren;++i){
            let comp:Laya.Node = ui.getChildAt(i);
            if(comp instanceof(Laya.TextInput)){
                comp.font = ins().FONT_NAME;
            }
            else{
                if(comp instanceof(Laya.Label)){
                    comp.font = ins().FONT_NAME;
                }
                else if(comp instanceof(Laya.Button)){
                    let btn:Laya.Button = comp as Laya.Button;
                    btn.labelFont = ins().FONT_NAME;
                }
                else{
                    if(comp instanceof (Laya.Node)){
                        set_ui_font(comp);
                    }
                }
            }
        }
    }
}
