
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class card_mainUI extends Dialog {
		public m_card_sp:Laya.Sprite;
		public m_closebtn:Laya.Button;
		public m_info:Laya.Label;
		public m_hand_sp:Laya.Sprite;
		public m_head_img:Laya.Image;
		public m_head_ani:Laya.Animation;
		public m_delicon:Laya.Button;
		public m_dlv:Laya.Label;
		public m_armor:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/card_main");

        }

    }
}

module ui.game {
    export class chat_faceUI extends Dialog {
		public faceList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chat_face");

        }

    }
}

module ui.game {
    export class chat_input_uiUI extends Dialog {
		public input_msg:Laya.TextInput;
		public img_send:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chat_input_ui");

        }

    }
}

module ui.game {
    export class chat_uiUI extends Dialog {
		public chatBg:Laya.Image;
		public showBtn:Laya.Image;
		public ch0:Laya.Box;
		public ch0_bg:Laya.Image;
		public ch0_title:Laya.Image;
		public ch1:Laya.Box;
		public ch1_bg:Laya.Image;
		public ch1_title:Laya.Image;
		public ch2:Laya.Box;
		public ch2_bg:Laya.Image;
		public ch2_title:Laya.Image;
		public ch3:Laya.Box;
		public ch3_bg:Laya.Image;
		public ch3_title:Laya.Image;
		public chatPanel:Laya.Panel;
		public bottom_box:Laya.Box;
		public faceBtn:Laya.Image;
		public sendBtn:Laya.Button;
		public input_box:Laya.Box;
		public input_bg:Laya.Image;
		public input_gray_bg:Laya.Image;
		public inputInfo:Laya.TextInput;
		public bagBtn:Laya.Button;
		public red_bag:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chat_ui");

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
