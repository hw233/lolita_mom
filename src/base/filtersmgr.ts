module filtersmgr{
    
    
    export enum FILTERSSTYLE_ENUM{
        DEFAULT,
        DISABLE_BLACK,
        DISABLE_URLESS,
        BLACKWRITE,
        GRAY,
        RED,
        LIGHT,
        GFBACK,
        GFBLUE,
        GFWHITE,
        GFYELLOW,
        GFBLUEGREEN,
        GFQGREEN,
        GFQBLUE,
        GFQPURPLE,
        GFQYELLOW,
    }

    class filtersstylemgr{
        private _filtersmap:Object = new Object();
        constructor(){
            this._filtersmap[FILTERSSTYLE_ENUM.DEFAULT] = [
                new Laya.GlowFilter("#5e391b",3,3,3),
            ];
            /**
             * 禁用滤镜 纯黑
             */		
            this._filtersmap[FILTERSSTYLE_ENUM.DISABLE_BLACK] = [
                new Laya.ColorFilter([1,0,0,0,-255,
                    0,1,0,0,-255,
                    0,0,1,0,-255,
                    0,0,0,1,0]),
            ];
            /**
             * 禁用滤镜 去色
             */		
            this._filtersmap[FILTERSSTYLE_ENUM.DISABLE_URLESS] = [
                new Laya.ColorFilter([0.4320, 0.6094, 0.0820, 0, 0,
                0.3086, 0.7922, 0.0820, 0, 0,
                0.3086, 0.6094, 0.0951, 0, 0,
                0,      0,      0,      1, 0]),
            ];
            /**
             * 禁用滤镜 黑白
             */		
            this._filtersmap[FILTERSSTYLE_ENUM.BLACKWRITE] = [
                new Laya.ColorFilter([0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0]),
            ];
            /**
             * 禁用滤镜 灰色
             */		
            this._filtersmap[FILTERSSTYLE_ENUM.GRAY] = [
                new Laya.ColorFilter([
				0.3086, 0.6094, 0.0820, 0, 0,
				0.3086, 0.6094,0.0820, 0, 0,
				0.3086, 0.6094,0.0820, 0, 0,
				0, 0, 0, 1, 0
			]),
            ];
            /**
             * 禁用滤镜 红色
             */		
            this._filtersmap[FILTERSSTYLE_ENUM.RED] = [
                new Laya.ColorFilter([
				0.3086, 0.6094, 0.0820, 0, 100,
				0.3086, 0.6094,0.0820, 0, 0,
				0.3086, 0.6094,0.0820, 0, 0,
				0, 0, 0, 1, 0]
                ),
            ];
            /**
             * 禁用滤镜 高亮
             */		
            this._filtersmap[FILTERSSTYLE_ENUM.LIGHT] = [
                new Laya.ColorFilter([1,0,0,0,50,   
				0,1,0,0,50,   
				0,0,1,0,50,  
				0,0,0,1,0 ]
                ),
            ];

            this._filtersmap[FILTERSSTYLE_ENUM.GFBACK] = [
                new Laya.GlowFilter("#000000",2,3,3),
            ];

            this._filtersmap[FILTERSSTYLE_ENUM.GFBLUE] = [
                new Laya.GlowFilter("#00ccff",1,3,3),
            ];
            
            this._filtersmap[FILTERSSTYLE_ENUM.GFWHITE] = [
                new Laya.GlowFilter("#FFFFFF",1,3,3),
            ];
            
            this._filtersmap[FILTERSSTYLE_ENUM.GFYELLOW] = [
                new Laya.GlowFilter("#FFa800",1,3,3),
            ];

            this._filtersmap[FILTERSSTYLE_ENUM.GFBLUEGREEN] = [
                new Laya.GlowFilter("#00FFFF",3,4,4),
            ];

            this._filtersmap[FILTERSSTYLE_ENUM.GFQGREEN] = [
                new Laya.GlowFilter("#1DBD2D",1,32,32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQBLUE] = [
                new Laya.GlowFilter("#0078DB",1,32,32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQPURPLE] = [
                new Laya.GlowFilter("#EB45F6",1,32,32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQYELLOW] = [
                new Laya.GlowFilter("#fbeb36",3,10,10),
            ];
        }
        private getfiltersbyid(id:FILTERSSTYLE_ENUM): any[] {
            return this._filtersmap[id];
        }
        public set_filter(l:Laya.Sprite,id:FILTERSSTYLE_ENUM):boolean{
            let filters:any[] = this.getfiltersbyid(id);
            if(filters != null && filters != undefined){
                l.filters = filters;
            }

            return true;
        }
    }
    let g_ins:filtersstylemgr = null;
    function ins():filtersstylemgr{
        if(g_ins == null){
            g_ins = new filtersstylemgr();
        }
        return g_ins;
    }
    export function set_filter(l:Laya.Sprite,id:FILTERSSTYLE_ENUM):boolean{
        return ins().set_filter(l,id);
    }
}
