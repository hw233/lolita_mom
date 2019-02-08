
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class card_mainUI extends Dialog {
		public m_delicon:Laya.Image;
		public m_card_sp:Laya.Sprite;
		public m_closebtn:Laya.Button;
		public m_info:Laya.Label;
		public m_hand_sp:Laya.Sprite;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/card_main");

        }

    }
}

module ui.game {
    export class help_tipsUI extends Dialog {
		public img_bk:Laya.Image;
		public lab_text:Laya.Label;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/help_tips");

        }

    }
}

module ui.game {
    export class main_topuiUI extends Dialog {
		public num_gold:Laya.Label;
		public btnadd1:Laya.Button;
		public num_bgold:Laya.Label;
		public btnadd2:Laya.Button;
		public num_slv:Laya.Label;
		public btnadd3:Laya.Button;
		public btn_slv:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_topui");

        }

    }
}

module ui.game {
    export class main_topui_newUI extends Dialog {
		public num_gold:Laya.Label;
		public num_slv:Laya.Label;
		public name_label:Laya.Label;
		public level_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_topui_new");

        }

    }
}

module ui.game {
    export class main_uiUI extends Dialog {
		public btn1:Laya.Button;
		public btn2:Laya.Button;
		public btn3:Laya.Button;
		public btn4:Laya.Button;
		public btn5:Laya.Button;
		public btn6:Laya.Button;
		public red_2:Laya.Image;
		public red_3:Laya.Image;
		public red_4:Laya.Image;
		public red_5:Laya.Image;
		public red_6:Laya.Image;
		public red_1:Laya.Image;
		public pgbar:Laya.ProgressBar;
		public lab_exp:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_ui");

        }

    }
}

module ui.game {
    export class main_ui_newUI extends Dialog {
		public btn1:Laya.Button;
		public btn2:Laya.Button;
		public btn3:Laya.Button;
		public btn4:Laya.Button;
		public btn5:Laya.Button;
		public exp_progress:Laya.ProgressBar;
		public exp_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_ui_new");

        }

    }
}

module ui.game {
    export class msgboxUI extends Dialog {
		public btn_ok:Laya.Button;
		public btn_cancle:Laya.Button;
		public btn_close:Laya.Button;
		public btn_NoTips:Laya.Button;
		public lab_NoTips:Laya.Label;
		public htmlText_content:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/msgbox");

        }

    }
}

module ui.game {
    export class tips_uiUI extends Dialog {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/tips_ui");

        }

    }
}
