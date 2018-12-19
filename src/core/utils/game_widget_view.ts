module utils{
    export class game_widget_view extends laya.display.Sprite
    {
        public m_view_scene:laya.display.Sprite = new laya.display.Sprite();
        public m_view_bk:laya.display.Sprite = new laya.display.Sprite();
        public m_view_bottom:laya.display.Sprite = new laya.display.Sprite();
        public m_view_normal:laya.display.Sprite = new laya.display.Sprite();
        public m_view_tips:laya.display.Sprite = new laya.display.Sprite();
        public m_view_popup:laya.display.Sprite = new laya.display.Sprite();
        public m_view_top:laya.display.Sprite = new laya.display.Sprite();
        public m_view_topmost:laya.display.Sprite = new laya.display.Sprite();
        constructor()
        {
            super();
            this.addChild(this.m_view_scene);
            this.addChild(this.m_view_bk);
            this.addChild(this.m_view_bottom);
            this.addChild(this.m_view_normal);
            this.addChild(this.m_view_popup);
            this.addChild(this.m_view_tips);
            this.addChild(this.m_view_top);
            this.addChild(this.m_view_topmost);
        }
        public get_view(layer:WIDGET_LAYER):laya.display.Sprite
        {
            let ret:laya.display.Sprite = null;
            switch(layer)
            {
                case WIDGET_LAYER.SCENE:
                    ret = this.m_view_scene;
                    break;
                case WIDGET_LAYER.BACKGROUND:
                    ret = this.m_view_bk;
                    break;
                case WIDGET_LAYER.BOTTOM:
                    ret = this.m_view_bottom;
                    break;
                case WIDGET_LAYER.NORMAL:
                    ret = this.m_view_normal;
                    break;
                case WIDGET_LAYER.TIPS:
                    ret = this.m_view_tips;
                    break;
                case WIDGET_LAYER.POPUP:
                    ret = this.m_view_popup;
                    break;
                case WIDGET_LAYER.TOP:
                    ret = this.m_view_top;
                    break;
                case WIDGET_LAYER.TOPMOST:
                    ret = this.m_view_topmost;
                    break;
                default:
                    ret = this.m_view_normal;
                    break;
            }
            return ret;
        }
        public dispose():void
        {
            this.removeChildren();
            this.m_view_scene.removeChildren();
            this.m_view_bk.removeChildren();
            this.m_view_bottom.removeChildren();
            this.m_view_normal.removeChildren();
            this.m_view_top.removeChildren();
            this.m_view_scene = null;
            this.m_view_bk = null;
            this.m_view_bottom = null;
            this.m_view_normal = null;
            this.m_view_popup = null;
            this.m_view_tips = null;
            this.m_view_top = null;
            this.m_view_topmost = null;
        }
    }
}