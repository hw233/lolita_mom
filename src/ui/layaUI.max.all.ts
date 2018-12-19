
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.demo {
    export class BackGroundUI extends View {
		public bg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("demo/BackGround");

        }

    }
}

module ui.demo {
    export class GoldBoxUI extends View {
		public goldLabel:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("demo/GoldBox");

        }

    }
}

module ui.demo {
    export class MainViewUI extends View {
		public goldBox:ui.demo.GoldBoxUI;
		public mapBtn:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.demo.GoldBoxUI",ui.demo.GoldBoxUI);

            super.createChildren();
            this.loadUI("demo/MainView");

        }

    }
}

module ui.demo {
    export class WorldMapUI extends Dialog {
		public closeBtn:Laya.Image;
		public b1:Laya.Box;
		public a1:Laya.Animation;
		public b2:Laya.Box;
		public a2:Laya.Animation;
		public b3:Laya.Box;
		public a3:Laya.Animation;
		public b4:Laya.Box;
		public a4:Laya.Animation;
		public b5:Laya.Box;
		public a5:Laya.Animation;
		public desBox:Laya.Box;
		public desLabel:Laya.Label;
		public btnGo:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("demo/WorldMap");

        }

    }
}

module ui.game {
    export class accountinputUI extends Dialog {
		public m_bk:Laya.Image;
		public m_btnback:Laya.Button;
		public m_line:Laya.Image;
		public m_btnOK:Laya.Button;
		public m_pwdinput:Laya.TextInput;
		public m_btnpwdclose:Laya.Button;
		public m_btnopenpwd:Laya.Button;
		public img_bg:Laya.Image;
		public m_btnopen:Laya.Button;
		public m_accountinput:Laya.TextInput;
		public m_btnclose:Laya.Button;
		public m_list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/accountinput");

        }

    }
}

module ui.game {
    export class activity_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public m_list:Laya.List;
		public label_time:Laya.Label;
		public label_day:Laya.Label;
		public btn_help:Laya.Button;
		public img_tlt:Laya.Image;
		public btn_shop:Laya.Image;
		public btn_into:Laya.Button;
		public img_rim0:Laya.Image;
		public img_rim1:Laya.Image;
		public img_rim2:Laya.Image;
		public label_state:Laya.Label;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_icon2:Laya.Image;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;
		public label_num2:Laya.Label;
		public img_red:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/activity_ui");

        }

    }
}

module ui.game {
    export class answer_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public label_l0:Laya.Label;
		public label_num:Laya.Label;
		public label_l1:Laya.Label;
		public m_notopic:Laya.Box;
		public label_tips:Laya.Label;
		public m_topic:Laya.Box;
		public label_index:Laya.Label;
		public label_que:Laya.Label;
		public img_btn0:Laya.Image;
		public img_btn1:Laya.Image;
		public img_btn2:Laya.Image;
		public img_btn3:Laya.Image;
		public label_a0:Laya.Label;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public img_r0:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public m_pro:Laya.Box;
		public label_l2:Laya.Label;
		public m_bar:Laya.ProgressBar;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_get0:Laya.Image;
		public label_bn:Laya.Label;
		public img_get1:Laya.Image;
		public m_fin:Laya.Box;
		public label_l3:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/answer_ui");

        }

    }
}

module ui.game {
    export class arena_buyUI extends Dialog {
		public btn_buy:Laya.Button;
		public btn_close:Laya.Button;
		public label_num:Laya.Label;
		public label_vip:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/arena_buy");

        }

    }
}

module ui.game {
    export class arena_historyUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public m_list:Laya.List;
		public label_r:Laya.Label;
		public label_name0:Laya.Label;
		public label_l0:Laya.Label;
		public label_name1:Laya.Label;
		public label_time:Laya.Label;
		public img_win:Laya.Image;
		public img_up:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/arena_history");

        }

    }
}

module ui.game {
    export class arena_rankUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public label_mr:Laya.Label;
		public img_icon0:Laya.Image;
		public label_n0:Laya.Label;
		public label_n1:Laya.Label;
		public m_list:Laya.List;
		public label_r:Laya.Label;
		public label_n:Laya.Label;
		public label_b:Laya.Label;
		public img_icon1:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/arena_rank");

        }

    }
}

module ui.game {
    export class arena_resultUI extends Dialog {
		public img_4:Laya.Image;
		public label_hr:Laya.Label;
		public label_r:Laya.Label;
		public label_rn:Laya.Label;
		public btn_get:Laya.Button;
		public label_btn:Laya.Label;
		public img_up:Laya.Image;
		public label_un:Laya.Label;
		public img_icon:Laya.Image;
		public img_ibg0:Laya.Image;
		public img_ibg1:Laya.Image;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;
		public label_n1:Laya.Label;
		public label_n0:Laya.Label;
		public img_rim0:Laya.Image;
		public img_rim1:Laya.Image;
		public img_0:Laya.Image;
		public img_1:Laya.Image;
		public img_2:Laya.Image;
		public img_3:Laya.Image;
		public img_tlt:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/arena_result");

        }

    }
}

module ui.game {
    export class arena_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_add:Laya.Button;
		public red_tab1:Laya.Image;
		public img_ibg0:Laya.Image;
		public img_ibg1:Laya.Image;
		public img_rim0:Laya.Image;
		public img_rim1:Laya.Image;
		public btn_tab2:Laya.Button;
		public img_ms:Laya.Image;
		public btn_history:Laya.Button;
		public btn_rank:Laya.Button;
		public btn_shop:Laya.Button;
		public img_role0:Laya.Image;
		public img_role1:Laya.Image;
		public img_role2:Laya.Image;
		public img_role3:Laya.Image;
		public img_role4:Laya.Image;
		public label_r0:Laya.Label;
		public label_r1:Laya.Label;
		public label_r2:Laya.Label;
		public label_r3:Laya.Label;
		public label_r4:Laya.Label;
		public label_l0:Laya.Label;
		public label_t:Laya.Label;
		public label_n:Laya.Label;
		public label_r:Laya.Label;
		public label_l2:Laya.Label;
		public btn_0:Laya.Button;
		public btn_1:Laya.Button;
		public btn_2:Laya.Button;
		public btn_3:Laya.Button;
		public btn_4:Laya.Button;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public label_n0:Laya.Label;
		public label_n1:Laya.Label;
		public label_l4:Laya.Label;
		public label_l3:Laya.Label;
		public label_l1:Laya.Label;
		public label_pm0:Laya.Label;
		public label_z0:Laya.Label;
		public label_zl0:Laya.Label;
		public label_pm1:Laya.Label;
		public label_z1:Laya.Label;
		public label_zl1:Laya.Label;
		public label_pm4:Laya.Label;
		public label_z4:Laya.Label;
		public label_zl2:Laya.Label;
		public label_pm3:Laya.Label;
		public label_z3:Laya.Label;
		public label_zl3:Laya.Label;
		public label_pm2:Laya.Label;
		public label_z2:Laya.Label;
		public label_zl4:Laya.Label;
		public label_name0:Laya.Label;
		public label_name1:Laya.Label;
		public label_name2:Laya.Label;
		public label_name3:Laya.Label;
		public label_name4:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/arena_ui");

        }

    }
}

module ui.game {
    export class avatar_testUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_confirm:Laya.Button;
		public btn_reset:Laya.Button;
		public btn_sys_set:Laya.Button;
		public img_role:Laya.Image;
		public input_5:Laya.TextInput;
		public btn_add5:Laya.Button;
		public btn_rds5:Laya.Button;
		public input_6:Laya.TextInput;
		public btn_add6:Laya.Button;
		public btn_rds6:Laya.Button;
		public input_7:Laya.TextInput;
		public btn_add7:Laya.Button;
		public btn_rds7:Laya.Button;
		public input_4:Laya.TextInput;
		public btn_add4:Laya.Button;
		public btn_rds4:Laya.Button;
		public input_8:Laya.TextInput;
		public btn_add8:Laya.Button;
		public btn_rds8:Laya.Button;
		public input_2:Laya.TextInput;
		public btn_add2:Laya.Button;
		public btn_rds2:Laya.Button;
		public input_3:Laya.TextInput;
		public btn_add3:Laya.Button;
		public btn_rds3:Laya.Button;
		public input_1:Laya.TextInput;
		public btn_add1:Laya.Button;
		public btn_rds1:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/avatar_test");

        }

    }
}

module ui.game {
    export class bag_testUI extends Dialog {
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/bag_test");

        }

    }
}

module ui.game {
    export class bag_uiUI extends Dialog {
		public btn_equip:Laya.Button;
		public btn_cost:Laya.Button;
		public btn_back:Laya.Button;
		public label_rbk:Laya.Image;
		public label_r:Laya.Label;
		public label_gn:Laya.Label;
		public btn_add:Laya.Button;
		public btn_rl:Laya.Button;
		public btn_close:Laya.Button;
		public red_rl:Laya.Image;
		public red_cost:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/bag_ui");

        }

    }
}

module ui.game {
    export class boon_hallUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_page_down:Laya.Button;
		public btn_page_up:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/boon_hall");

        }

    }
}

module ui.game {
    export class boss_godx_uiUI extends Dialog {
		public img_left:Laya.Image;
		public img_boss:Laya.Image;
		public img_daxia:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/boss_godx_ui");

        }

    }
}

module ui.game {
    export class boss_remindUI extends Dialog {
		public bg:Laya.Image;
		public close_btn:Laya.Image;
		public back_btn:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/boss_remind");

        }

    }
}

module ui.game {
    export class boss_remind_itemUI extends Dialog {
		public bg:Laya.Image;
		public name_label:Laya.Label;
		public lv_label:Laya.Label;
		public check_box:Laya.Box;
		public check_img:Laya.Image;
		public not_content:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/boss_remind_item");

        }

    }
}

module ui.game {
    export class boss_uiUI extends Dialog {
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public p_boss_btn:Laya.Button;
		public red_p0:Laya.Image;
		public com_boss_btn:Laya.Button;
		public red_p1:Laya.Image;
		public wild_boss_btn:Laya.Button;
		public red_p2:Laya.Image;
		public yuliu_btn:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/boss_ui");

        }

    }
}

module ui.game {
    export class cb_damage_rankUI extends Dialog {
		public bg:Laya.Image;
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public damage_label:Laya.Label;
		public name_label:Laya.Label;
		public rank_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/cb_damage_rank");

        }

    }
}

module ui.game {
    export class cb_dam_rank_itemUI extends View {
		public bg:Laya.Image;
		public rank_label:Laya.Label;
		public name_label:Laya.Label;
		public damage_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/cb_dam_rank_item");

        }

    }
}

module ui.game {
    export class cb_itemUI extends Dialog {
		public bg:Laya.Image;
		public player_num:Laya.Label;
		public kill_record:Laya.Image;
		public cannot_fight_tips:Laya.Label;
		public boss_name:Laya.Label;
		public boss_base:Laya.Image;
		public boss_img:Laya.Image;
		public hp_box:Laya.Box;
		public boss_hp:Laya.ProgressBar;
		public hp_label:Laya.Label;
		public boss_lv_label:Laya.Label;
		public rim0:Laya.Image;
		public equip0:Laya.Image;
		public rim1:Laya.Image;
		public equip1:Laya.Image;
		public rim2:Laya.Image;
		public equip2:Laya.Image;
		public fight_btn_box:Laya.Box;
		public fight_btn:Laya.Button;
		public rebirth_btn_box:Laya.Box;
		public rebirth_btn:Laya.Button;
		public tool:Laya.Image;
		public label_toolnum:Laya.Label;
		public rebirth_tips_box:Laya.Box;
		public rebirth_tips:Laya.Label;
		public label_eqnum0:Laya.Label;
		public label_eqnum1:Laya.Label;
		public label_eqnum2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/cb_item");

        }

    }
}

module ui.game {
    export class cb_kill_recordUI extends Dialog {
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/cb_kill_record");

        }

    }
}

module ui.game {
    export class cb_kill_record_itemUI extends Dialog {
		public bg:Laya.Image;
		public moment_label:Laya.Label;
		public name_label:Laya.Label;
		public ce_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/cb_kill_record_item");

        }

    }
}

module ui.game {
    export class cb_tips_boxUI extends Dialog {
		public boss_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/cb_tips_box");

        }

    }
}

module ui.game {
    export class change_nameUI extends Dialog {
		public textInput:Laya.TextInput;
		public label_tip:Laya.Label;
		public btn_close:Laya.Button;
		public btn_confirm:Laya.Button;
		public btn_cancle:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/change_name");

        }

    }
}

module ui.game {
    export class channel_achievingUI extends Dialog {
		public btn_close:Laya.Button;
		public sp_1:Laya.Sprite;
		public sp1_btn:Laya.Button;
		public sp1_icon:Laya.Image;
		public sp1_desc:Laya.Label;
		public sp_2:Laya.Sprite;
		public sp2_btn:Laya.Button;
		public sp2_icon:Laya.Image;
		public sp2_desc:Laya.Label;
		public sp_3:Laya.Sprite;
		public sp3_btn:Laya.Button;
		public sp3_icon:Laya.Image;
		public sp3_desc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/channel_achieving");

        }

    }
}

module ui.game {
    export class chapter_btnuiUI extends Dialog {
		public m_btn1:Laya.Image;
		public m_btn_auto:Laya.Button;
		public m_img_star1:Laya.Image;
		public m_img_star2:Laya.Image;
		public m_img_star3:Laya.Image;
		public m_img_star4:Laya.Image;
		public m_img_star5:Laya.Image;
		public m_btn_next:Laya.Button;
		public m_img_tips:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chapter_btnui");

        }

    }
}

module ui.game {
    export class chapter_helpUI extends Dialog {
		public m_btn_close:Laya.Button;
		public m_btn_world:Laya.Button;
		public m_btn_gang:Laya.Button;
		public m_label_world:Laya.Label;
		public m_label_gang:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chapter_help");

        }

    }
}

module ui.game {
    export class chapter_rewardUI extends Dialog {
		public btn_recv:Laya.Button;
		public img_g1:Laya.Image;
		public img_i1:Laya.Image;
		public img_r1:Laya.Image;
		public label_a1:Laya.Label;
		public m_name:Laya.Label;
		public m_btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chapter_reward");

        }

    }
}

module ui.game {
    export class chapter_uiUI extends Dialog {
		public btn_go:Laya.Button;
		public btn_back:Laya.Button;
		public img_role:Laya.Image;
		public m_label_name:Laya.Label;
		public m_label_helpinfo1:Laya.Label;
		public m_btn_rank:Laya.Button;
		public m_label_tips:Laya.Label;
		public m_btnlabel_rank:Laya.Label;
		public m_label_helpinfo2:Laya.Label;
		public m_label_helpinfo11:Laya.Label;
		public m_label_helpinfo22:Laya.Label;
		public m_label_num:Laya.Label;
		public m_btn_helper:Laya.Button;
		public img_g1:Laya.Image;
		public img_i1:Laya.Image;
		public img_r1:Laya.Image;
		public label_a1:Laya.Label;
		public img_g2:Laya.Image;
		public img_i2:Laya.Image;
		public img_r2:Laya.Image;
		public label_a2:Laya.Label;
		public img_g3:Laya.Image;
		public img_i3:Laya.Image;
		public img_r3:Laya.Image;
		public label_a3:Laya.Label;
		public img_g4:Laya.Image;
		public img_i4:Laya.Image;
		public img_r4:Laya.Image;
		public label_a4:Laya.Label;
		public img_g5:Laya.Image;
		public img_i5:Laya.Image;
		public img_r5:Laya.Image;
		public label_a5:Laya.Label;
		public img_g6:Laya.Image;
		public img_i6:Laya.Image;
		public img_r6:Laya.Image;
		public label_a6:Laya.Label;
		public m_reward_tips:Laya.Image;
		public m_pgbar:Laya.ProgressBar;
		public m_label_pgbar:Laya.Label;
		public m_btn_reward:Laya.Button;
		public btn_close:Laya.Button;
		public lab_r00:Laya.Label;
		public lab_r01:Laya.Label;
		public lab_r02:Laya.Label;
		public lab_r10:Laya.Label;
		public lab_r11:Laya.Label;
		public lab_r12:Laya.Label;
		public lab_r20:Laya.Label;
		public lab_r21:Laya.Label;
		public lab_r22:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chapter_ui");

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
    export class chat_uiUI extends Dialog {
		public chatBg:Laya.Image;
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
		public showBtn:Laya.Image;
		public chatPanel:Laya.Panel;
		public bottom_box:Laya.Box;
		public input_bg:Laya.Image;
		public bagBtn:Laya.Image;
		public inputInfo:Laya.TextInput;
		public faceBtn:Laya.Image;
		public sendBtn:Laya.Button;
		public red_bag:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/chat_ui");

        }

    }
}

module ui.game {
    export class combat_boss_hpUI extends Dialog {
		public pgbar:Laya.ProgressBar;
		public lab_hp:Laya.Label;
		public lab_r1:Laya.Label;
		public lab_name1:Laya.Label;
		public lab_d1:Laya.Label;
		public lab_r2:Laya.Label;
		public lab_name2:Laya.Label;
		public lab_d2:Laya.Label;
		public lab_r3:Laya.Label;
		public lab_name3:Laya.Label;
		public lab_d3:Laya.Label;
		public lab_r4:Laya.Label;
		public lab_name4:Laya.Label;
		public lab_d4:Laya.Label;
		public lab_r0:Laya.Label;
		public lab_name0:Laya.Label;
		public lab_d0:Laya.Label;
		public lab_myrank:Laya.Label;
		public lab_myname:Laya.Label;
		public lab_mydmg:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/combat_boss_hp");

        }

    }
}

module ui.game {
    export class combat_enterUI extends Dialog {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/combat_enter");

        }

    }
}

module ui.game {
    export class combat_loadingUI extends Dialog {
		public m_bk:Laya.Image;
		public m_progressbk:Laya.Image;
		public m_progress1:Laya.ProgressBar;
		public m_progressdeco1:Laya.Image;
		public m_progressdeco2:Laya.Image;
		public m_progresslight:Laya.Image;
		public m_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/combat_loading");

        }

    }
}

module ui.game {
    export class combat_roundDetail_uiUI extends Dialog {
		public sp_1:Laya.Sprite;
		public sp1_title:Laya.Label;
		public sp1_lab_content:Laya.Label;
		public sp_2:Laya.Sprite;
		public sp2_title:Laya.Label;
		public sp2_pgbar:Laya.ProgressBar;
		public sp2_lab_content:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/combat_roundDetail_ui");

        }

    }
}

module ui.game {
    export class combat_round_uiUI extends Dialog {
		public img_bk:Laya.Image;
		public img_line:Laya.Image;
		public img_ttl0:Laya.Image;
		public img_ttl1:Laya.Image;
		public img_cur0:Laya.Image;
		public img_cur1:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/combat_round_ui");

        }

    }
}

module ui.game {
    export class combat_skipUI extends Dialog {
		public btn_skip:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/combat_skip");

        }

    }
}

module ui.game {
    export class common_bossUI extends Dialog {
		public btn_close:Laya.Image;
		public btn_back:Laya.Image;
		public btn_pb:Laya.Button;
		public btn_cb:Laya.Button;
		public btn_wb:Laya.Button;
		public red_p0:Laya.Image;
		public red_p1:Laya.Image;
		public red_p2:Laya.Image;
		public fight_times:Laya.Label;
		public set_tips:Laya.Image;
		public btn_shop:Laya.Button;
		public red_p:Laya.Image;
		public recovertime_box:Laya.Box;
		public recover_time:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/common_boss");

        }

    }
}

module ui.game {
    export class common_upgradeUI extends Dialog {
		public btn_back:Laya.Image;
		public label_time:Laya.Label;
		public label_goto:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/common_upgrade");

        }

    }
}

module ui.game {
    export class common_upgrade_itemUI extends Dialog {
		public label_giftName:Laya.Label;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public btn_recv:Laya.Button;
		public redPoint:Laya.Image;
		public img_recved:Laya.Image;
		public label_tips:Laya.Label;
		public label_count:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/common_upgrade_item");

        }

    }
}

module ui.game {
    export class create_roleUI extends Dialog {
		public img_gg:Laya.Image;
		public img_mm:Laya.Image;
		public img_tips:Laya.Image;
		public img_sgg:Laya.Image;
		public img_smm:Laya.Image;
		public img_cn:Laya.Image;
		public ipt_name:Laya.TextInput;
		public label_tips:Laya.Label;
		public btn_cu:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/create_role");

        }

    }
}

module ui.game {
    export class daily_300UI extends Dialog {
		public pgbar:Laya.ProgressBar;
		public label_cur:Laya.Label;
		public btn_item1:Laya.Button;
		public btn_item2:Laya.Button;
		public btn_item3:Laya.Button;
		public img_recv2:Laya.Image;
		public img_recv1:Laya.Image;
		public img_recv3:Laya.Image;
		public btn_back:Laya.Button;
		public btn_finish:Laya.Button;
		public btn_recv:Laya.Button;
		public red_recv:Laya.Image;
		public btn_close:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/daily_300");

        }

    }
}

module ui.game {
    export class daily_depositUI extends Dialog {
		public btn_tab0:Laya.Button;
		public label_desc0:Laya.Label;
		public btn_tab1:Laya.Button;
		public label_desc1:Laya.Label;
		public btn_deposit:Laya.Button;
		public btn_recv:Laya.Button;
		public img_recved:Laya.Image;
		public label_worth:Laya.Label;
		public label_tips:Laya.Label;
		public label_price:Laya.Label;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public img_grid4:Laya.Image;
		public img_icon4:Laya.Image;
		public img_rim4:Laya.Image;
		public label_num4:Laya.Label;
		public img_grid5:Laya.Image;
		public img_icon5:Laya.Image;
		public img_rim5:Laya.Image;
		public label_num5:Laya.Label;
		public redPoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/daily_deposit");

        }

    }
}

module ui.game {
    export class daily_fumoUI extends Dialog {
		public btn_close:Laya.Button;
		public pgbar:Laya.ProgressBar;
		public label_cur:Laya.Label;
		public label_num:Laya.Label;
		public label_time:Laya.Label;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public btn_finish:Laya.Button;
		public btn_go:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public img_recv1:Laya.Image;
		public img_recv2:Laya.Image;
		public img_recv3:Laya.Image;
		public img_recv4:Laya.Image;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;
		public red_recv:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/daily_fumo");

        }

    }
}

module ui.game {
    export class daily_pnyoUI extends Dialog {
		public btn_close:Laya.Button;
		public pgbar:Laya.ProgressBar;
		public label_cur:Laya.Label;
		public label_status:Laya.Label;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public btn_finish:Laya.Button;
		public btn_go:Laya.Button;
		public btn_back:Laya.Button;
		public img_get0:Laya.Image;
		public img_get1:Laya.Image;
		public img_get2:Laya.Image;
		public img_get3:Laya.Image;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public img_red:Laya.Image;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/daily_pnyo");

        }

    }
}

module ui.game {
    export class danyao_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_prop1:Laya.Label;
		public lab_prop2:Laya.Label;
		public lab_prop3:Laya.Label;
		public lab_prop4:Laya.Label;
		public lab_prop5:Laya.Label;
		public lab_prop6:Laya.Label;
		public lab_prop7:Laya.Label;
		public lab_prop8:Laya.Label;
		public img_g:Laya.Image;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public lab_item_name:Laya.Label;
		public lab_own:Laya.Label;
		public lab_used:Laya.Label;
		public btn_use:Laya.Button;
		public red_up:Laya.Image;
		public img_dan1:Laya.Image;
		public img_dan2:Laya.Image;
		public img_dan3:Laya.Image;
		public img_dan4:Laya.Image;
		public img_dan5:Laya.Image;
		public img_dan6:Laya.Image;
		public img_dan7:Laya.Image;
		public img_dan8:Laya.Image;
		public img_select:Laya.Image;
		public lab_name1:Laya.Label;
		public lab_name2:Laya.Label;
		public lab_name3:Laya.Label;
		public lab_name4:Laya.Label;
		public lab_name5:Laya.Label;
		public lab_name6:Laya.Label;
		public lab_name7:Laya.Label;
		public lab_name8:Laya.Label;
		public lab_showname:Laya.Label;
		public lab_showprop:Laya.Label;
		public lab_showvalue:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/danyao_ui");

        }

    }
}

module ui.game {
    export class deposit_rich_giftUI extends Dialog {
		public btn_close:Laya.Image;
		public btn_back:Laya.Button;
		public label_worth:Laya.Label;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public img_grid4:Laya.Image;
		public img_icon4:Laya.Image;
		public img_rim4:Laya.Image;
		public label_num4:Laya.Label;
		public img_grid5:Laya.Image;
		public img_icon5:Laya.Image;
		public img_rim5:Laya.Image;
		public label_num5:Laya.Label;
		public label_tips:Laya.Label;
		public label_price:Laya.Label;
		public btn_deposit:Laya.Button;
		public btn_recv:Laya.Button;
		public img_recved:Laya.Image;
		public red_p0:Laya.Image;
		public btn_tab0:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public label_desc0:Laya.Label;
		public label_desc1:Laya.Label;
		public label_desc2:Laya.Label;
		public label_desc3:Laya.Label;
		public btn_schl:Laya.Button;
		public btn_czjj:Laya.Button;
		public btn_tzjh:Laya.Button;
		public red_p1:Laya.Image;
		public red_p2:Laya.Image;
		public red_p3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/deposit_rich_gift");

        }

    }
}

module ui.game {
    export class develop_dan_uiUI extends Dialog {
		public img_title:Laya.Image;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_v1:Laya.Label;
		public lab_v2:Laya.Label;
		public lab_v3:Laya.Label;
		public lab_own:Laya.Label;
		public img_g:Laya.Image;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public lab_item_name:Laya.Label;
		public lab_use:Laya.Label;
		public btn_use:Laya.Button;
		public red_up:Laya.Image;
		public btn_use_all:Laya.Button;
		public red_up_auto:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_dan_ui");

        }

    }
}

module ui.game {
    export class develop_mainUI extends Dialog {
		public img_title:Laya.Image;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_name:Laya.Label;
		public lab_lv:Laya.Label;
		public btn_dan:Laya.Button;
		public btn_page_down:Laya.Button;
		public btn_skin:Laya.Button;
		public btn_page_up:Laya.Button;
		public img_role:Laya.Image;
		public img_cost1:Laya.Image;
		public lab_cost1:Laya.Label;
		public img_cost2:Laya.Image;
		public lab_cost2:Laya.Label;
		public pgbar:Laya.ProgressBar;
		public lab_exp:Laya.Label;
		public btn_up:Laya.Button;
		public red_up:Laya.Image;
		public btn_up_auto:Laya.Button;
		public red_up_auto:Laya.Image;
		public btn_reward:Laya.Button;
		public btn_auto_buy:Laya.Button;
		public img_grid0:Laya.Image;
		public lab_skill:Laya.Label;
		public img_s0:Laya.Image;
		public lab_s0:Laya.Label;
		public red_s0:Laya.Image;
		public img_grid1:Laya.Image;
		public img_s1:Laya.Image;
		public lab_s1:Laya.Label;
		public red_s1:Laya.Image;
		public img_grid2:Laya.Image;
		public img_s2:Laya.Image;
		public lab_s2:Laya.Label;
		public red_s2:Laya.Image;
		public img_grid3:Laya.Image;
		public img_s3:Laya.Image;
		public lab_s3:Laya.Label;
		public red_s3:Laya.Image;
		public img_e0:Laya.Image;
		public img_er0:Laya.Image;
		public lab_e0:Laya.Label;
		public red_e0:Laya.Image;
		public img_e1:Laya.Image;
		public img_er1:Laya.Image;
		public lab_e1:Laya.Label;
		public red_e1:Laya.Image;
		public img_e2:Laya.Image;
		public img_er2:Laya.Image;
		public lab_e2:Laya.Label;
		public red_e2:Laya.Image;
		public img_e3:Laya.Image;
		public img_er3:Laya.Image;
		public lab_e3:Laya.Label;
		public red_e3:Laya.Image;
		public btn_prop:Laya.Button;
		public lab_equip:Laya.Label;
		public btn_hz:Laya.Button;
		public btn_use:Laya.Button;
		public img_using:Laya.Image;
		public red_dan:Laya.Image;
		public red_skin:Laya.Image;
		public red_hz:Laya.Image;
		public btn_tab1:Laya.Button;
		public red_tab1:Laya.Image;
		public btn_tab2:Laya.Button;
		public red_tab2:Laya.Image;
		public btn_tab3:Laya.Button;
		public red_tab3:Laya.Image;
		public btn_tab4:Laya.Button;
		public red_tab4:Laya.Image;
		public red_lur:Laya.Image;
		public ani_show:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_main");

        }

    }
}

module ui.game {
    export class develop_prop_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public img_11:Laya.Image;
		public img_12:Laya.Image;
		public lab_prop1:Laya.Label;
		public lab_p11:Laya.Label;
		public lab_v11:Laya.Label;
		public lab_p12:Laya.Label;
		public lab_v12:Laya.Label;
		public lab_p13:Laya.Label;
		public lab_v13:Laya.Label;
		public img_21:Laya.Image;
		public img_22:Laya.Image;
		public lab_prop2:Laya.Label;
		public lab_p21:Laya.Label;
		public lab_v21:Laya.Label;
		public lab_p22:Laya.Label;
		public lab_v22:Laya.Label;
		public lab_p23:Laya.Label;
		public lab_v23:Laya.Label;
		public img_31:Laya.Image;
		public img_32:Laya.Image;
		public lab_prop3:Laya.Label;
		public lab_p31:Laya.Label;
		public lab_v31:Laya.Label;
		public lab_p32:Laya.Label;
		public lab_v32:Laya.Label;
		public lab_p33:Laya.Label;
		public lab_v33:Laya.Label;
		public img_41:Laya.Image;
		public img_42:Laya.Image;
		public lab_prop4:Laya.Label;
		public lab_p41:Laya.Label;
		public lab_v41:Laya.Label;
		public lab_p42:Laya.Label;
		public lab_v42:Laya.Label;
		public lab_p43:Laya.Label;
		public lab_v43:Laya.Label;
		public img_51:Laya.Image;
		public img_52:Laya.Image;
		public lab_prop5:Laya.Label;
		public lab_p51:Laya.Label;
		public lab_v51:Laya.Label;
		public lab_p52:Laya.Label;
		public lab_v52:Laya.Label;
		public lab_p53:Laya.Label;
		public lab_v53:Laya.Label;
		public lab_p14:Laya.Label;
		public lab_v14:Laya.Label;
		public lab_p24:Laya.Label;
		public lab_v24:Laya.Label;
		public lab_p34:Laya.Label;
		public lab_v34:Laya.Label;
		public lab_p44:Laya.Label;
		public lab_v44:Laya.Label;
		public lab_p54:Laya.Label;
		public lab_v54:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_prop_ui");

        }

    }
}

module ui.game {
    export class develop_rankUI extends Dialog {
		public btn_back:Laya.Image;
		public label_time:Laya.Label;
		public label_myCE:Laya.Label;
		public label_goto:Laya.Label;
		public label_firstName:Laya.Label;
		public label_CE:Laya.Label;
		public label_secondName:Laya.Label;
		public label_thirdName:Laya.Label;
		public label_checkRank:Laya.Label;
		public img_avatar:Laya.Image;
		public list_rwd0:Laya.List;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public list_rwd1:Laya.List;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public list_rwd2:Laya.List;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public list_rwd3:Laya.List;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_rank");

        }

    }
}

module ui.game {
    export class develop_rwdUI extends Dialog {
		public btn_back:Laya.Image;
		public label_time:Laya.Label;
		public label_myLv:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_rwd");

        }

    }
}

module ui.game {
    export class develop_rwd_itemUI extends Dialog {
		public label_giftName:Laya.Label;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public btn_recv:Laya.Button;
		public redPoint:Laya.Image;
		public img_recved:Laya.Image;
		public btn_goto:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_rwd_item");

        }

    }
}

module ui.game {
    export class develop_skillUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_skill_name:Laya.Label;
		public lab_cur_00:Laya.Label;
		public lab_cur_10:Laya.Label;
		public lab_cur_01:Laya.Label;
		public lab_cur_11:Laya.Label;
		public btn_confirm:Laya.Button;
		public img_grid0:Laya.Image;
		public img_grid1:Laya.Image;
		public img_grid2:Laya.Image;
		public img_grid3:Laya.Image;
		public img_s0:Laya.Image;
		public img_s1:Laya.Image;
		public img_s2:Laya.Image;
		public img_s3:Laya.Image;
		public img_select0:Laya.Image;
		public img_select1:Laya.Image;
		public img_select2:Laya.Image;
		public img_select3:Laya.Image;
		public lab_s0:Laya.Label;
		public lab_s1:Laya.Label;
		public lab_s2:Laya.Label;
		public lab_s3:Laya.Label;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public lab_item_name:Laya.Label;
		public lab_own:Laya.Label;
		public lab_next_00:Laya.Label;
		public lab_next_10:Laya.Label;
		public lab_next_01:Laya.Label;
		public lab_next_11:Laya.Label;
		public red_up:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_skill");

        }

    }
}

module ui.game {
    export class develop_skinUI extends Dialog {
		public img_title:Laya.Image;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_p0:Laya.Label;
		public lab_v0:Laya.Label;
		public lab_p1:Laya.Label;
		public lab_v1:Laya.Label;
		public lab_p2:Laya.Label;
		public lab_v2:Laya.Label;
		public img_role:Laya.Image;
		public lab_t1:Laya.Label;
		public lab_t2:Laya.Label;
		public lab_zhanli:Laya.Label;
		public lab_skin_num:Laya.Label;
		public btn_page_down:Laya.Button;
		public btn_page_up:Laya.Button;
		public btn_use:Laya.Button;
		public img_using:Laya.Image;
		public red_hh:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/develop_skin");

        }

    }
}

module ui.game {
    export class discount_shopUI extends Dialog {
		public btn_back:Laya.Image;
		public label_time:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/discount_shop");

        }

    }
}

module ui.game {
    export class discount_shop_itemUI extends Dialog {
		public label_goodsName:Laya.Label;
		public img_money1:Laya.Image;
		public img_money2:Laya.Image;
		public label_initPrice:Laya.Label;
		public label_price:Laya.Label;
		public label_tips1:Laya.Label;
		public label_discount:Laya.Label;
		public label_tips2:Laya.Label;
		public img_icon:Laya.Image;
		public img_rim:Laya.Image;
		public label_num:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/discount_shop_item");

        }

    }
}

module ui.game {
    export class equip_forgeUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_it:Laya.Button;
		public btn_rf:Laya.Button;
		public btn_rd:Laya.Button;
		public btn_il:Laya.Button;
		public red_int:Laya.Image;
		public red_rde:Laya.Image;
		public red_frg:Laya.Image;
		public red_ily:Laya.Image;
		public btn_ug:Laya.Button;
		public red_icon:Laya.Image;
		public btn_info:Laya.Button;
		public label_mc:Laya.Label;
		public label_c:Laya.Label;
		public label_lv1:Laya.Label;
		public label_lv2:Laya.Label;
		public label_lv3:Laya.Label;
		public label_lv4:Laya.Label;
		public label_lv5:Laya.Label;
		public label_lv6:Laya.Label;
		public label_lv7:Laya.Label;
		public label_lv8:Laya.Label;
		public label_lv9:Laya.Label;
		public label_lv10:Laya.Label;
		public label_mlv:Laya.Label;
		public label_sp:Laya.Label;
		public label_get:Laya.Label;
		public label_pl0:Laya.Label;
		public label_pl1:Laya.Label;
		public label_pr0:Laya.Label;
		public label_pr1:Laya.Label;
		public img_sd1:Laya.Image;
		public img_sd2:Laya.Image;
		public img_sd3:Laya.Image;
		public img_sd4:Laya.Image;
		public img_sd5:Laya.Image;
		public img_sd6:Laya.Image;
		public img_sd7:Laya.Image;
		public img_sd8:Laya.Image;
		public img_sd9:Laya.Image;
		public img_sd10:Laya.Image;
		public img_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/equip_forge");

        }

    }
}

module ui.game {
    export class equip_inlayUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_it:Laya.Button;
		public btn_rf:Laya.Button;
		public btn_rd:Laya.Button;
		public btn_il:Laya.Button;
		public red_int:Laya.Image;
		public red_rde:Laya.Image;
		public red_frg:Laya.Image;
		public red_ily:Laya.Image;
		public btn_ug:Laya.Button;
		public red_icon:Laya.Image;
		public btn_info:Laya.Button;
		public label_mc:Laya.Label;
		public label_c:Laya.Label;
		public label_lv1:Laya.Label;
		public label_lv2:Laya.Label;
		public label_lv3:Laya.Label;
		public label_lv4:Laya.Label;
		public label_lv5:Laya.Label;
		public label_lv6:Laya.Label;
		public label_lv7:Laya.Label;
		public label_lv8:Laya.Label;
		public label_lv9:Laya.Label;
		public label_lv10:Laya.Label;
		public label_mlv:Laya.Label;
		public label_sp:Laya.Label;
		public label_get:Laya.Label;
		public label_pl0:Laya.Label;
		public label_pl1:Laya.Label;
		public label_pr0:Laya.Label;
		public label_pr1:Laya.Label;
		public label_pl2:Laya.Label;
		public label_pr2:Laya.Label;
		public img_sd1:Laya.Image;
		public img_sd2:Laya.Image;
		public img_sd3:Laya.Image;
		public img_sd4:Laya.Image;
		public img_sd5:Laya.Image;
		public img_sd6:Laya.Image;
		public img_sd7:Laya.Image;
		public img_sd8:Laya.Image;
		public img_sd9:Laya.Image;
		public img_sd10:Laya.Image;
		public img_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/equip_inlay");

        }

    }
}

module ui.game {
    export class equip_intensifyUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_it:Laya.Button;
		public btn_rf:Laya.Button;
		public btn_rd:Laya.Button;
		public btn_il:Laya.Button;
		public red_int:Laya.Image;
		public red_rde:Laya.Image;
		public red_frg:Laya.Image;
		public red_ily:Laya.Image;
		public btn_ug:Laya.Button;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_i6:Laya.Image;
		public img_i7:Laya.Image;
		public img_i8:Laya.Image;
		public img_i9:Laya.Image;
		public img_i10:Laya.Image;
		public btn_info:Laya.Button;
		public label_get:Laya.Label;
		public label_sp:Laya.Label;
		public label_mlv:Laya.Label;
		public label_lv10:Laya.Label;
		public label_lv9:Laya.Label;
		public label_lv8:Laya.Label;
		public label_lv7:Laya.Label;
		public label_lv6:Laya.Label;
		public label_lv5:Laya.Label;
		public label_lv4:Laya.Label;
		public label_lv3:Laya.Label;
		public label_lv2:Laya.Label;
		public label_lv1:Laya.Label;
		public label_c:Laya.Label;
		public label_mc:Laya.Label;
		public label_pl0:Laya.Label;
		public label_pl1:Laya.Label;
		public label_pr0:Laya.Label;
		public label_pr1:Laya.Label;
		public img_sd1:Laya.Image;
		public img_sd2:Laya.Image;
		public img_sd3:Laya.Image;
		public img_sd4:Laya.Image;
		public img_sd5:Laya.Image;
		public img_sd6:Laya.Image;
		public img_sd7:Laya.Image;
		public img_sd8:Laya.Image;
		public img_sd9:Laya.Image;
		public img_sd10:Laya.Image;
		public img_icon:Laya.Image;
		public red_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/equip_intensify");

        }

    }
}

module ui.game {
    export class equip_masterinfoUI extends Dialog {
		public img_icon:Laya.Image;
		public label_lv:Laya.Label;
		public label_p:Laya.Label;
		public label_np:Laya.Label;
		public label_cd:Laya.Label;
		public label_bt:Laya.Label;
		public label_st:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/equip_masterinfo");

        }

    }
}

module ui.game {
    export class equip_redineUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_it:Laya.Button;
		public btn_rf:Laya.Button;
		public btn_rd:Laya.Button;
		public btn_il:Laya.Button;
		public red_int:Laya.Image;
		public red_rde:Laya.Image;
		public red_frg:Laya.Image;
		public red_ily:Laya.Image;
		public btn_ug:Laya.Button;
		public red_icon:Laya.Image;
		public btn_info:Laya.Button;
		public label_get:Laya.Label;
		public label_pr1:Laya.Label;
		public label_pr0:Laya.Label;
		public label_pl1:Laya.Label;
		public label_pl0:Laya.Label;
		public label_sp:Laya.Label;
		public label_mlv:Laya.Label;
		public label_lv10:Laya.Label;
		public label_lv9:Laya.Label;
		public label_lv8:Laya.Label;
		public label_lv7:Laya.Label;
		public label_lv6:Laya.Label;
		public label_lv5:Laya.Label;
		public label_lv4:Laya.Label;
		public label_lv3:Laya.Label;
		public label_lv2:Laya.Label;
		public label_lv1:Laya.Label;
		public label_c:Laya.Label;
		public label_mc:Laya.Label;
		public img_sd1:Laya.Image;
		public img_sd2:Laya.Image;
		public img_sd3:Laya.Image;
		public img_sd4:Laya.Image;
		public img_sd5:Laya.Image;
		public img_sd6:Laya.Image;
		public img_sd7:Laya.Image;
		public img_sd8:Laya.Image;
		public img_sd9:Laya.Image;
		public img_sd10:Laya.Image;
		public img_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/equip_redine");

        }

    }
}

module ui.game {
    export class extend_bagUI extends Dialog {
		public label_cost:Laya.Label;
		public label_amount:Laya.Label;
		public btn_dec:Laya.Button;
		public btn_add:Laya.Button;
		public btn_close:Laya.Button;
		public btn_confirm:Laya.Button;
		public btn_cancle:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/extend_bag");

        }

    }
}

module ui.game {
    export class failure_uiUI extends Dialog {
		public btn_confirm:Laya.Button;
		public lab_secs:Laya.Label;
		public btn_1:Laya.Button;
		public btn_2:Laya.Button;
		public btn_3:Laya.Button;
		public btn_4:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/failure_ui");

        }

    }
}

module ui.game {
    export class fb_heavenUI extends Dialog {
		public btn_close:Laya.Image;
		public btn_back:Laya.Image;
		public btn_stuff:Laya.Button;
		public btn_treasure:Laya.Button;
		public btn_tower:Laya.Button;
		public btn_heaven:Laya.Button;
		public red_p1:Laya.Image;
		public red_p2:Laya.Image;
		public red_p3:Laya.Image;
		public red_p4:Laya.Image;
		public img_base3:Laya.Image;
		public img_base2:Laya.Image;
		public img_base1:Laya.Image;
		public img_shape1:Laya.Image;
		public img_shape2:Laya.Image;
		public img_shape3:Laya.Image;
		public seal_pass3:Laya.Image;
		public seal_pass2:Laya.Image;
		public seal_pass1:Laya.Image;
		public label_level1:Laya.Label;
		public label_level2:Laya.Label;
		public label_level3:Laya.Label;
		public prog_rwd:Laya.ProgressBar;
		public btn_left:Laya.Image;
		public btn_right:Laya.Image;
		public label_rwd2:Laya.Label;
		public label_rwd1:Laya.Label;
		public label_rwd0:Laya.Label;
		public label_max_score:Laya.Label;
		public label_rank:Laya.Label;
		public label_tips1:Laya.Label;
		public img_check:Laya.Image;
		public btn_sweep:Laya.Button;
		public btn_fight:Laya.Button;
		public red_p0:Laya.Image;
		public img_treasure1:Laya.Image;
		public img_treasure2:Laya.Image;
		public img_treasure3:Laya.Image;
		public seal_recv1:Laya.Image;
		public seal_recv2:Laya.Image;
		public seal_recv3:Laya.Image;
		public img_paopao:Laya.Image;
		public img_arrow:Laya.Image;
		public img_node1:Laya.Image;
		public img_node2:Laya.Image;
		public img_node3:Laya.Image;
		public label_tips:Laya.Label;
		public label_giftname:Laya.Label;
		public img_gift_redp0:Laya.Image;
		public img_gift_redp1:Laya.Image;
		public img_gift_redp2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fb_heaven");

        }

    }
}

module ui.game {
    export class fb_stuffUI extends Dialog {
		public backBtn:Laya.Image;
		public stuff_btn:Laya.Button;
		public red_p1:Laya.Image;
		public shop_btn:Laya.Button;
		public red_p0:Laya.Image;
		public closeBtn:Laya.Image;
		public treasure_btn:Laya.Button;
		public red_p2:Laya.Image;
		public btn_tower:Laya.Button;
		public red_p3:Laya.Image;
		public btn_heaven:Laya.Button;
		public red_p4:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fb_stuff");

        }

    }
}

module ui.game {
    export class fb_towerUI extends Dialog {
		public backBtn:Laya.Image;
		public closeBtn:Laya.Image;
		public btn_stuff:Laya.Button;
		public btn_treasure:Laya.Button;
		public btn_tower:Laya.Button;
		public red_p1:Laya.Image;
		public red_p2:Laya.Image;
		public red_p3:Laya.Image;
		public btn_fight:Laya.Button;
		public label_autoFight:Laya.Label;
		public btn_check:Laya.Image;
		public red_p0:Laya.Image;
		public img_base2:Laya.Image;
		public img_rim2_0:Laya.Image;
		public img_rwd2_0:Laya.Image;
		public label_count2_0:Laya.Label;
		public img_rim2_1:Laya.Image;
		public img_rwd2_1:Laya.Image;
		public label_count2_1:Laya.Label;
		public img_shape2:Laya.Image;
		public seal_pass3:Laya.Image;
		public label_level2:Laya.Label;
		public img_base1:Laya.Image;
		public img_rim1_0:Laya.Image;
		public img_rwd1_0:Laya.Image;
		public label_count1_0:Laya.Label;
		public img_rim1_1:Laya.Image;
		public img_rwd1_1:Laya.Image;
		public label_count1_1:Laya.Label;
		public img_shape1:Laya.Image;
		public seal_pass2:Laya.Image;
		public label_level1:Laya.Label;
		public img_base0:Laya.Image;
		public img_rim0_0:Laya.Image;
		public img_rwd0_0:Laya.Image;
		public label_count0_0:Laya.Label;
		public img_rwd0_1:Laya.Image;
		public label_count0_1:Laya.Label;
		public img_shape0:Laya.Image;
		public seal_pass1:Laya.Image;
		public label_level0:Laya.Label;
		public list_rank:Laya.List;
		public label_No:Laya.Label;
		public label_name:Laya.Label;
		public label_level:Laya.Label;
		public label_rank:Laya.Label;
		public btn_heaven:Laya.Button;
		public red_p4:Laya.Image;
		public btn_shop:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fb_tower");

        }

    }
}

module ui.game {
    export class fb_treasureUI extends Dialog {
		public backBtn:Laya.Image;
		public stuff_btn:Laya.Button;
		public red_p1:Laya.Image;
		public closeBtn:Laya.Image;
		public red_p2:Laya.Image;
		public label_map:Laya.Label;
		public left_arrow:Laya.Image;
		public right_arrow:Laya.Image;
		public label_rank:Laya.Label;
		public progress_star:Laya.ProgressBar;
		public img_rwd0:Laya.Image;
		public rwd_red0:Laya.Image;
		public seal_lq0:Laya.Image;
		public img_rwd1:Laya.Image;
		public rwd_red1:Laya.Image;
		public seal_lq1:Laya.Image;
		public img_rwd2:Laya.Image;
		public rwd_red2:Laya.Image;
		public seal_lq2:Laya.Image;
		public btn_easydig:Laya.Button;
		public btn_dig:Laya.Button;
		public label_autodig:Laya.Label;
		public img_check:Laya.Image;
		public label_star:Laya.Label;
		public btn_tower:Laya.Button;
		public red_p3:Laya.Image;
		public title:Laya.Image;
		public label_level:Laya.Label;
		public r1_grid0:Laya.Image;
		public r1_rim0:Laya.Image;
		public r1_icon0:Laya.Image;
		public r1_num0:Laya.Label;
		public r1_grid1:Laya.Image;
		public r1_rim1:Laya.Image;
		public r1_icon1:Laya.Image;
		public r1_num1:Laya.Label;
		public r2_grid0:Laya.Image;
		public r2_rim0:Laya.Image;
		public r2_icon0:Laya.Image;
		public r2_num0:Laya.Label;
		public r2_grid1:Laya.Image;
		public r2_rim1:Laya.Image;
		public r2_icon1:Laya.Image;
		public r2_num1:Laya.Label;
		public r2_grid2:Laya.Image;
		public r2_rim2:Laya.Image;
		public r2_icon2:Laya.Image;
		public r2_num2:Laya.Label;
		public seal_first_rwd:Laya.Image;
		public seal_daily_rwd:Laya.Image;
		public btn_heaven:Laya.Button;
		public red_p4:Laya.Image;
		public dig_red:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fb_treasure");

        }

    }
}

module ui.game {
    export class fb_treasure_rwdUI extends Dialog {
		public backBtn:Laya.Image;
		public closeBtn:Laya.Image;
		public label_mapid:Laya.Label;
		public label_stars:Laya.Label;
		public btn_recv:Laya.Button;
		public seal_recv:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fb_treasure_rwd");

        }

    }
}

module ui.game {
    export class first_pay_groupUI extends Dialog {
		public btn_back:Laya.Image;
		public btn_tab0:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public img_red0:Laya.Image;
		public img_red1:Laya.Image;
		public img_red2:Laya.Image;
		public img_red3:Laya.Image;
		public img_red4:Laya.Image;
		public label_time:Laya.Label;
		public label_money:Laya.Label;
		public label_pnum:Laya.Label;
		public label_title0:Laya.Label;
		public label_title1:Laya.Label;
		public label_title2:Laya.Label;
		public label_title3:Laya.Label;
		public label_title4:Laya.Label;
		public list_rewards:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/first_pay_group");

        }

    }
}

module ui.game {
    export class first_player_bet_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public img_bg0:Laya.Image;
		public img_bg1:Laya.Image;
		public img_role0:Laya.Image;
		public img_role1:Laya.Image;
		public img_r0:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public btn_yz0:Laya.Button;
		public btn_yz1:Laya.Button;
		public btn_yz2:Laya.Button;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_icon2:Laya.Image;
		public btn_back:Laya.Button;
		public img_yz0:Laya.Image;
		public img_yz1:Laya.Image;
		public img_yz2:Laya.Image;
		public label_num2:Laya.Label;
		public label_num1:Laya.Label;
		public label_num0:Laya.Label;
		public label_tips:Laya.Label;
		public label_name0:Laya.Label;
		public label_bat0:Laya.Label;
		public label_lv0:Laya.Label;
		public label_name1:Laya.Label;
		public label_bat1:Laya.Label;
		public label_lv1:Laya.Label;
		public m_box:Laya.Box;
		public img_slt0:Laya.Image;
		public img_slt1:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/first_player_bet_ui");

        }

    }
}

module ui.game {
    export class first_player_bgn_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public img_line29:Laya.Image;
		public img_line28:Laya.Image;
		public img_line26:Laya.Image;
		public img_line27:Laya.Image;
		public img_line23:Laya.Image;
		public img_line22:Laya.Image;
		public img_line21:Laya.Image;
		public img_line20:Laya.Image;
		public img_line14:Laya.Image;
		public img_line15:Laya.Image;
		public img_line12:Laya.Image;
		public img_line13:Laya.Image;
		public img_line10:Laya.Image;
		public img_line11:Laya.Image;
		public img_line8:Laya.Image;
		public img_line9:Laya.Image;
		public img_line25:Laya.Image;
		public img_line24:Laya.Image;
		public img_line6:Laya.Image;
		public img_line7:Laya.Image;
		public img_line19:Laya.Image;
		public img_line18:Laya.Image;
		public img_line4:Laya.Image;
		public img_line5:Laya.Image;
		public img_line2:Laya.Image;
		public img_line3:Laya.Image;
		public img_line17:Laya.Image;
		public img_line16:Laya.Image;
		public img_line0:Laya.Image;
		public img_line1:Laya.Image;
		public img_nb0:Laya.Image;
		public img_nb1:Laya.Image;
		public img_nb8:Laya.Image;
		public img_nb9:Laya.Image;
		public img_nb11:Laya.Image;
		public img_nb10:Laya.Image;
		public img_nb15:Laya.Image;
		public img_nb14:Laya.Image;
		public img_nb13:Laya.Image;
		public img_nb12:Laya.Image;
		public img_nb6:Laya.Image;
		public img_nb7:Laya.Image;
		public img_nb5:Laya.Image;
		public img_nb4:Laya.Image;
		public img_nb3:Laya.Image;
		public img_nb2:Laya.Image;
		public btn_yz0:Laya.Button;
		public btn_yz1:Laya.Button;
		public btn_yz2:Laya.Button;
		public btn_yz3:Laya.Button;
		public btn_yz4:Laya.Button;
		public btn_yz5:Laya.Button;
		public btn_yz6:Laya.Button;
		public btn_yz7:Laya.Button;
		public btn_yz8:Laya.Button;
		public btn_yz9:Laya.Button;
		public btn_yz10:Laya.Button;
		public btn_yz11:Laya.Button;
		public btn_yz12:Laya.Button;
		public btn_yz13:Laya.Button;
		public btn_yz14:Laya.Button;
		public img_yz0:Laya.Image;
		public img_yz1:Laya.Image;
		public img_yz2:Laya.Image;
		public img_yz3:Laya.Image;
		public img_yz4:Laya.Image;
		public img_yz5:Laya.Image;
		public img_yz6:Laya.Image;
		public img_yz7:Laya.Image;
		public img_yz8:Laya.Image;
		public img_yz9:Laya.Image;
		public img_yz10:Laya.Image;
		public img_yz11:Laya.Image;
		public img_yz12:Laya.Image;
		public img_yz13:Laya.Image;
		public img_yz14:Laya.Image;
		public img_yz15:Laya.Image;
		public label_name0:Laya.Label;
		public label_name1:Laya.Label;
		public label_name2:Laya.Label;
		public label_name3:Laya.Label;
		public label_name4:Laya.Label;
		public label_name5:Laya.Label;
		public label_name6:Laya.Label;
		public label_name7:Laya.Label;
		public label_name8:Laya.Label;
		public label_name9:Laya.Label;
		public label_name10:Laya.Label;
		public label_name11:Laya.Label;
		public label_name12:Laya.Label;
		public label_name13:Laya.Label;
		public label_name14:Laya.Label;
		public label_name15:Laya.Label;
		public label_tlt:Laya.Label;
		public label_pro:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/first_player_bgn_ui");

        }

    }
}

module ui.game {
    export class first_player_end_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public img_line29:Laya.Image;
		public img_line28:Laya.Image;
		public img_line26:Laya.Image;
		public img_line27:Laya.Image;
		public img_line23:Laya.Image;
		public img_line22:Laya.Image;
		public img_line21:Laya.Image;
		public img_line20:Laya.Image;
		public img_line14:Laya.Image;
		public img_line15:Laya.Image;
		public img_line12:Laya.Image;
		public img_line13:Laya.Image;
		public img_line10:Laya.Image;
		public img_line11:Laya.Image;
		public img_line8:Laya.Image;
		public img_line9:Laya.Image;
		public img_line25:Laya.Image;
		public img_line24:Laya.Image;
		public img_line6:Laya.Image;
		public img_line7:Laya.Image;
		public img_line19:Laya.Image;
		public img_line18:Laya.Image;
		public img_line4:Laya.Image;
		public img_line5:Laya.Image;
		public img_line2:Laya.Image;
		public img_line3:Laya.Image;
		public img_line17:Laya.Image;
		public img_line16:Laya.Image;
		public img_line0:Laya.Image;
		public img_line1:Laya.Image;
		public img_nb0:Laya.Image;
		public img_nb1:Laya.Image;
		public img_nb8:Laya.Image;
		public img_nb9:Laya.Image;
		public img_nb11:Laya.Image;
		public img_nb10:Laya.Image;
		public img_nb15:Laya.Image;
		public img_nb14:Laya.Image;
		public img_nb13:Laya.Image;
		public img_nb12:Laya.Image;
		public img_nb6:Laya.Image;
		public img_nb7:Laya.Image;
		public img_nb5:Laya.Image;
		public img_nb4:Laya.Image;
		public img_nb3:Laya.Image;
		public img_nb2:Laya.Image;
		public btn_yz0:Laya.Button;
		public btn_yz1:Laya.Button;
		public btn_yz2:Laya.Button;
		public btn_yz3:Laya.Button;
		public btn_yz4:Laya.Button;
		public btn_yz5:Laya.Button;
		public btn_yz6:Laya.Button;
		public btn_yz7:Laya.Button;
		public btn_yz8:Laya.Button;
		public btn_yz9:Laya.Button;
		public btn_yz10:Laya.Button;
		public btn_yz11:Laya.Button;
		public btn_yz12:Laya.Button;
		public btn_yz13:Laya.Button;
		public btn_yz14:Laya.Button;
		public label_name0:Laya.Label;
		public label_name1:Laya.Label;
		public label_name2:Laya.Label;
		public label_name3:Laya.Label;
		public label_name4:Laya.Label;
		public label_name5:Laya.Label;
		public label_name6:Laya.Label;
		public label_name7:Laya.Label;
		public label_name8:Laya.Label;
		public label_name9:Laya.Label;
		public label_name10:Laya.Label;
		public label_name11:Laya.Label;
		public label_name12:Laya.Label;
		public label_name13:Laya.Label;
		public label_name14:Laya.Label;
		public label_name15:Laya.Label;
		public label_tlt:Laya.Label;
		public img_role:Laya.Image;
		public label_tlt1:Laya.Label;
		public label_win:Laya.Label;
		public label_lose:Laya.Label;
		public label_p:Laya.Label;
		public label_name:Laya.Label;
		public label_bat:Laya.Label;
		public label_lv:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/first_player_end_ui");

        }

    }
}

module ui.game {
    export class first_player_rpt_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public label_name0:Laya.Label;
		public label_g:Laya.Label;
		public label_name1:Laya.Label;
		public label_s0:Laya.Label;
		public label_s1:Laya.Label;
		public m_list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/first_player_rpt_ui");

        }

    }
}

module ui.game {
    export class first_player_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public label_msg:Laya.Label;
		public btn_join:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/first_player_ui");

        }

    }
}

module ui.game {
    export class friend_black_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public m_list:Laya.List;
		public img_head:Laya.Image;
		public label_n:Laya.Label;
		public label_status:Laya.Label;
		public label_lv:Laya.Label;
		public label_gang:Laya.Label;
		public btn_jc:Laya.Button;
		public label_p:Laya.Label;
		public btn_np:Laya.Button;
		public btn_lp:Laya.Button;
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/friend_black_ui");

        }

    }
}

module ui.game {
    export class friend_chat_tipsUI extends Dialog {
		public img_c:Laya.Image;
		public btn_talk:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/friend_chat_tips");

        }

    }
}

module ui.game {
    export class friend_chat_uiUI extends Dialog {
		public img_bg:Laya.Image;
		public btn_close:Laya.Button;
		public m_hlist:Laya.List;
		public btn_bg:Laya.Button;
		public img_head:Laya.Image;
		public label_name:Laya.Label;
		public btn_hc:Laya.Button;
		public btn_face:Laya.Button;
		public btn_send:Laya.Button;
		public m_input:Laya.TextInput;
		public m_chat:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/friend_chat_ui");

        }

    }
}

module ui.game {
    export class friend_coin_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public m_list:Laya.List;
		public img_head:Laya.Image;
		public label_tn:laya.html.dom.HTMLDivElement;
		public label_p:Laya.Label;
		public btn_np:Laya.Button;
		public btn_lp:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public btn_back:Laya.Button;
		public btn_get:Laya.Button;
		public label_gn:Laya.Label;
		public label_fn:Laya.Label;
		public red_tab3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/friend_coin_ui");

        }

    }
}

module ui.game {
    export class friend_faceUI extends Dialog {
		public faceList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/friend_face");

        }

    }
}

module ui.game {
    export class friend_list_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public label_0:Laya.Label;
		public label_sn:Laya.Label;
		public label_1:Laya.Label;
		public label_fn:Laya.Label;
		public m_list:Laya.List;
		public img_head:Laya.Image;
		public label_n:Laya.Label;
		public image_vip:Laya.Image;
		public label_status:Laya.Label;
		public label_lv:Laya.Label;
		public label_gang:Laya.Label;
		public btn_del:Laya.Button;
		public btn_talk:Laya.Button;
		public btn_sg:Laya.Button;
		public btn_send:Laya.Button;
		public label_p:Laya.Label;
		public btn_bl:Laya.Label;
		public btn_np:Laya.Button;
		public btn_lp:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public btn_back:Laya.Button;
		public red_tab3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/friend_list_ui");

        }

    }
}

module ui.game {
    export class friend_req_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public m_list:Laya.List;
		public img_head:Laya.Image;
		public btn_ag:Laya.Button;
		public btn_rf:Laya.Button;
		public label_tn:laya.html.dom.HTMLDivElement;
		public label_p:Laya.Label;
		public btn_np:Laya.Button;
		public btn_lp:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public btn_back:Laya.Button;
		public red_tab3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/friend_req_ui");

        }

    }
}

module ui.game {
    export class fubenUI extends Dialog {
		public backBtn:Laya.Image;
		public stuff_box:Laya.Box;
		public stuff_btn:Laya.Button;
		public red_p1:Laya.Image;
		public yuliu_btn1:Laya.Button;
		public yuliu_btn2:Laya.Button;
		public yuliu_btn3:Laya.Button;
		public stuff_sprite:Laya.Sprite;
		public shop_btn_box:Laya.Box;
		public shop_btn:Laya.Image;
		public red_p0:Laya.Image;
		public closeBtn:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fuben");

        }

    }
}

module ui.game {
    export class fuli_xmdx_uiUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_last:Laya.Image;
		public btn_next:Laya.Image;
		public m_glist:Laya.List;
		public m_pro:Laya.ProgressBar;
		public img_f:Laya.Image;
		public img_jt:Laya.Image;
		public label_g0:Laya.Label;
		public label_g1:Laya.Label;
		public label_g2:Laya.Label;
		public label_g3:Laya.Label;
		public label_g4:Laya.Label;
		public label_gq:Laya.Label;
		public img_role:Laya.Image;
		public m_rlist:Laya.List;
		public img_g:Laya.Image;
		public btn_tz:Laya.Button;
		public label_time:laya.html.dom.HTMLDivElement;
		public img_tips:Laya.Image;
		public label_l0:Laya.Label;
		public label_l1:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/fuli_xmdx_ui");

        }

    }
}

module ui.game {
    export class fumo_bossUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_go:Laya.Button;
		public label_boss:Laya.Label;
		public label_place:Laya.Label;
		public img_star2:Laya.Image;
		public img_star1:Laya.Image;
		public img_star7:Laya.Image;
		public img_star4:Laya.Image;
		public img_star6:Laya.Image;
		public img_star3:Laya.Image;
		public img_star5:Laya.Image;
		public btn_up:Laya.Button;
		public img_g1:Laya.Image;
		public img_g2:Laya.Image;
		public img_g3:Laya.Image;
		public img_g4:Laya.Image;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public btn_back:Laya.Button;
		public img_role:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/fumo_boss");

        }

    }
}

module ui.game {
    export class gang_apply_listUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;
		public btn_auto:Laya.Button;
		public lab_1:Laya.Label;
		public img_autobk:Laya.Image;
		public btn_chgAuto:Laya.Button;
		public lab_2:Laya.Label;
		public lab_autopass_zhanli:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_apply_list");

        }

    }
}

module ui.game {
    export class gang_bossUI extends Dialog {
		public btn_back:Laya.Image;
		public btn_close:Laya.Image;
		public prog_bossHp:Laya.ProgressBar;
		public label_hprate:Laya.Label;
		public btn_miaosha:Laya.Button;
		public btn_openFight:Laya.Button;
		public btn_fight:Laya.Button;
		public img_killed:Laya.Image;
		public img_escape:Laya.Image;
		public btn_recv_rwd:Laya.Button;
		public label_hardstr:Laya.Label;
		public label_bname:Laya.Label;
		public label_tips1:Laya.Label;
		public label_time:Laya.Label;
		public label_tips2:Laya.Label;
		public btn_check0:Laya.Image;
		public btn_check:Laya.Image;
		public label_tips4:Laya.Label;
		public img_avatar:Laya.Image;
		public img_grid0:Laya.Image;
		public img_treasure0:Laya.Image;
		public list_rank:Laya.List;
		public label_ranking:Laya.Label;
		public label_name:Laya.Label;
		public label_level:Laya.Label;
		public label_damage:Laya.Label;
		public label_tips3:Laya.Label;
		public label_myDamage:Laya.Label;
		public label_tips0:Laya.Label;
		public img_hpframe1:Laya.Image;
		public img_hpframe0:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_boss");

        }

    }
}

module ui.game {
    export class gang_chgNameUI extends Dialog {
		public btn_close:Laya.Button;
		public TextInput_1:Laya.TextInput;
		public btn_change:Laya.Button;
		public btn_cancle:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_chgName");

        }

    }
}

module ui.game {
    export class gang_createUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public textInput:Laya.TextInput;
		public btn_1:Laya.Button;
		public img_select1:Laya.Image;
		public btn_2:Laya.Button;
		public img_select2:Laya.Image;
		public btn_create:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_create");

        }

    }
}

module ui.game {
    export class gang_fbitemUI extends Dialog {
		public img_frame:Laya.Image;
		public label_fbname:Laya.Label;
		public img_boss:Laya.Image;
		public img_tgjl:Laya.Image;
		public label_tips0:Laya.Label;
		public img_iconBg0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_quaFrame0:Laya.Image;
		public img_iconBg1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_quaFrame1:Laya.Image;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;
		public label_stjl:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_fbitem");

        }

    }
}

module ui.game {
    export class gang_fubenUI extends Dialog {
		public btn_close:Laya.Image;
		public img_grid0:Laya.Image;
		public img_rim0:Laya.Image;
		public img_rwd0:Laya.Image;
		public img_grid1:Laya.Image;
		public img_rim1:Laya.Image;
		public img_rwd1:Laya.Image;
		public img_grid2:Laya.Image;
		public img_rim2:Laya.Image;
		public img_rwd2:Laya.Image;
		public img_grid3:Laya.Image;
		public img_rim3:Laya.Image;
		public img_rwd3:Laya.Image;
		public img_grid4:Laya.Image;
		public img_rim4:Laya.Image;
		public img_rwd4:Laya.Image;
		public img_grid5:Laya.Image;
		public img_rim5:Laya.Image;
		public img_rwd5:Laya.Image;
		public img_grid6:Laya.Image;
		public img_rim6:Laya.Image;
		public img_rwd6:Laya.Image;
		public btn_left:Laya.Image;
		public btn_right:Laya.Image;
		public label_fbname:Laya.Label;
		public sprite_room:Laya.Sprite;
		public list_desk:Laya.List;
		public label_leader_name:Laya.Label;
		public label_pnum:Laya.Label;
		public btn_join:Laya.Image;
		public label_jointips:Laya.Label;
		public btn_check0:Laya.Image;
		public btn_create_team:Laya.Button;
		public btn_quick_join:Laya.Button;
		public sprite_team:Laya.Sprite;
		public list_team:Laya.List;
		public img_head_bk:Laya.Image;
		public img_head:Laya.Image;
		public img_head_rim:Laya.Image;
		public label_pname:Laya.Label;
		public img_leader:Laya.Image;
		public btn_fire:Laya.Image;
		public label_lv:Laya.Label;
		public label_battle:Laya.Label;
		public label_fighttips:Laya.Label;
		public btn_check1:Laya.Image;
		public btn_exit_team:Laya.Button;
		public btn_fight:Laya.Button;
		public label_askHelpTimes:Laya.Label;
		public label_helpTimes:Laya.Label;
		public btn_askHelp:Laya.Button;
		public label_income:Laya.Label;
		public label_rwd_num0:Laya.Label;
		public label_rwd_num1:Laya.Label;
		public label_rwd_num2:Laya.Label;
		public label_rwd_num3:Laya.Label;
		public label_rwd_num4:Laya.Label;
		public label_rwd_num5:Laya.Label;
		public label_rwd_num6:Laya.Label;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public red_tab1:Laya.Image;
		public btn_tab2:Laya.Button;
		public red_tab2:Laya.Image;
		public btn_tab3:Laya.Button;
		public red_tab3:Laya.Image;
		public btn_tab4:Laya.Button;
		public red_tab4:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_fuben");

        }

    }
}

module ui.game {
    export class gang_incenseUI extends Dialog {
		public btn_close:Laya.Image;
		public btn_back:Laya.Image;
		public prog_exp:Laya.ProgressBar;
		public img_treasure0:Laya.Image;
		public img_treasure1:Laya.Image;
		public img_treasure2:Laya.Image;
		public label_xhjd:Laya.Label;
		public label_xhch:Laya.Label;
		public seal_lq0:Laya.Image;
		public seal_lq1:Laya.Image;
		public seal_lq2:Laya.Image;
		public btn_tab1:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public btn_tab3:Laya.Button;
		public red_tab3:Laya.Image;
		public btn_tab4:Laya.Button;
		public red_tab4:Laya.Image;
		public label_incense0:Laya.Label;
		public label_rwd0_0:Laya.Label;
		public label_rwd1_0:Laya.Label;
		public label_rwd2_0:Laya.Label;
		public label_price0:Laya.Label;
		public img_money0:Laya.Image;
		public label_incense1:Laya.Label;
		public label_rwd0_1:Laya.Label;
		public label_rwd1_1:Laya.Label;
		public label_rwd2_1:Laya.Label;
		public label_price1:Laya.Label;
		public img_money1:Laya.Image;
		public label_incense2:Laya.Label;
		public label_rwd0_2:Laya.Label;
		public label_rwd1_2:Laya.Label;
		public label_rwd2_2:Laya.Label;
		public label_price2:Laya.Label;
		public img_money2:Laya.Image;
		public btn_sx0:Laya.Button;
		public btn_sx1:Laya.Button;
		public btn_sx2:Laya.Button;
		public list_record:Laya.List;
		public label_time:Laya.Label;
		public label_pname:Laya.Label;
		public label_slyz:Laya.Label;
		public label_xname:Laya.Label;
		public label_sx0:Laya.Label;
		public label_sx1:Laya.Label;
		public label_sx2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_incense");

        }

    }
}

module ui.game {
    export class gang_listUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;
		public btn_create:Laya.Button;
		public btn_all:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_list");

        }

    }
}

module ui.game {
    export class gang_livelyUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public red_tab0:Laya.Image;
		public label_curPropKey0:Laya.Label;
		public label_curPropKey1:Laya.Label;
		public label_curPropKey2:Laya.Label;
		public label_curPropValue0:Laya.Label;
		public label_curPropValue1:Laya.Label;
		public label_curPropValue2:Laya.Label;
		public label_nPropKey0:Laya.Label;
		public label_nPropKey1:Laya.Label;
		public label_nPropKey2:Laya.Label;
		public label_nPropValue0:Laya.Label;
		public label_nPropValue1:Laya.Label;
		public label_nPropValue2:Laya.Label;
		public prog_exp:Laya.ProgressBar;
		public btn_upgrade:Laya.Button;
		public list_mission:Laya.List;
		public img_itemBg:Laya.Image;
		public label_mission:Laya.Label;
		public label_times:Laya.Label;
		public label_exp:Laya.Label;
		public btn_goto:Laya.Button;
		public label_lively_exp:Laya.Label;
		public btn_tab1:Laya.Button;
		public red_tab1:Laya.Image;
		public label_lively_lv:Laya.Label;
		public img_grid0:Laya.Image;
		public img_rim0:Laya.Image;
		public img_icon0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_rim1:Laya.Image;
		public img_icon1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_rim2:Laya.Image;
		public img_icon2:Laya.Image;
		public label_num2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_lively");

        }

    }
}

module ui.game {
    export class gang_lively_rwdUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab0:Laya.Button;
		public red_tab0:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_lively_rwd");

        }

    }
}

module ui.game {
    export class gang_lively_rwd_itemUI extends Dialog {
		public label_tips0:Laya.Label;
		public label_tips1:Laya.Label;
		public btn_recv:Laya.Button;
		public btn_recved:Laya.Button;
		public btn_notComp:Laya.Button;
		public img_grid0:Laya.Image;
		public img_rim0:Laya.Image;
		public img_icon0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_rim1:Laya.Image;
		public img_icon1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_rim2:Laya.Image;
		public img_icon2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_rim3:Laya.Image;
		public img_icon3:Laya.Image;
		public label_num3:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_lively_rwd_item");

        }

    }
}

module ui.game {
    export class gang_mainUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public lab_notice:Laya.Label;
		public btn_notice:Laya.Button;
		public lab_name:Laya.Label;
		public lab_num:Laya.Label;
		public lab_money:Laya.Label;
		public lab_lv:Laya.Label;
		public lab_assistant_name:Laya.Label;
		public btn_check:Laya.Button;
		public btn_donate:Laya.Button;
		public btn_member:Laya.Button;
		public btn_shop:Laya.Button;
		public btn_addMember:Laya.Button;
		public btn_chgName:Laya.Button;
		public btn_record:Laya.Button;
		public btn_gangList:Laya.Button;
		public btn_active:Laya.Button;
		public btn_activity:Laya.Button;
		public btn_map:Laya.Button;
		public btn_war:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_main");

        }

    }
}

module ui.game {
    export class gang_map_back_btn_uiUI extends Dialog {
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_map_back_btn_ui");

        }

    }
}

module ui.game {
    export class gang_map_collect_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public m_list:Laya.List;
		public label_time:Laya.Label;
		public label_num:Laya.Label;
		public btn_fsh:Laya.Button;
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_map_collect_ui");

        }

    }
}

module ui.game {
    export class gang_map_col_btn_uiUI extends Dialog {
		public btn_tips:Laya.Button;
		public btn_col:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_map_col_btn_ui");

        }

    }
}

module ui.game {
    export class gang_map_opera_btn_uiUI extends Dialog {
		public btn:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_map_opera_btn_ui");

        }

    }
}

module ui.game {
    export class gang_map_opera_uiUI extends Dialog {
		public img_mi0:Laya.Image;
		public img_mi1:Laya.Image;
		public img_mi2:Laya.Image;
		public label_mn0:Laya.Label;
		public label_mn1:Laya.Label;
		public label_mn2:Laya.Label;
		public img_mr0:Laya.Image;
		public img_mr1:Laya.Image;
		public img_mr2:Laya.Image;
		public img_zd:Laya.Image;
		public btn_fh:Laya.Button;
		public img_fh:Laya.Image;
		public label_fh:Laya.Label;
		public btn_get:Laya.Button;
		public btn_reset:Laya.Button;
		public img_rs:Laya.Image;
		public label_rs:Laya.Label;
		public img_fi0:Laya.Image;
		public img_fi1:Laya.Image;
		public img_fi2:Laya.Image;
		public label_fn0:Laya.Label;
		public label_fn1:Laya.Label;
		public label_fn2:Laya.Label;
		public img_fr0:Laya.Image;
		public img_fr1:Laya.Image;
		public img_fr2:Laya.Image;
		public btn_fp:Laya.Button;
		public btn_fget:Laya.Button;
		public btn_frs:Laya.Button;
		public img_frs:Laya.Image;
		public label_frs:Laya.Label;
		public label_l0:Laya.Label;
		public label_num:Laya.Label;
		public label_fn:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_map_opera_ui");

        }

    }
}

module ui.game {
    export class gang_memberUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;
		public lab_positon:Laya.Label;
		public lab_banggog:Laya.Label;
		public btn_quit:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_member");

        }

    }
}

module ui.game {
    export class gang_noticeUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public TextInput_1:Laya.TextInput;
		public btn_save:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_notice");

        }

    }
}

module ui.game {
    export class gang_positionUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public htmlText:laya.html.dom.HTMLDivElement;
		public btn_1:Laya.Button;
		public lab_position1:Laya.Label;
		public lab_desc1:Laya.Label;
		public img_select1:Laya.Image;
		public btn_2:Laya.Button;
		public lab_position2:Laya.Label;
		public lab_desc2:Laya.Label;
		public img_select2:Laya.Image;
		public btn_confirm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/gang_position");

        }

    }
}

module ui.game {
    export class gang_recordUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_record");

        }

    }
}

module ui.game {
    export class gang_select_hardUI extends Dialog {
		public btn_back:Laya.Image;
		public btn_close:Laya.Image;
		public list_hard:Laya.List;
		public img_frame0:Laya.Image;
		public label_name:Laya.Label;
		public label_tips:Laya.Label;
		public label_price:Laya.Label;
		public btn_confirm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_select_hard");

        }

    }
}

module ui.game {
    export class gang_skillUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public btn_close:Laya.Button;
		public btn_up:Laya.Button;
		public img_icon1:Laya.Image;
		public img_btn1:Laya.Image;
		public img_sd1:Laya.Image;
		public img_icon2:Laya.Image;
		public img_btn2:Laya.Image;
		public img_sd2:Laya.Image;
		public img_icon3:Laya.Image;
		public img_btn3:Laya.Image;
		public img_sd3:Laya.Image;
		public img_icon4:Laya.Image;
		public img_btn4:Laya.Image;
		public img_sd4:Laya.Image;
		public img_icon5:Laya.Image;
		public img_btn5:Laya.Image;
		public img_sd5:Laya.Image;
		public img_icon6:Laya.Image;
		public img_btn6:Laya.Image;
		public img_sd6:Laya.Image;
		public img_icon7:Laya.Image;
		public img_btn7:Laya.Image;
		public img_sd7:Laya.Image;
		public img_icon8:Laya.Image;
		public img_btn8:Laya.Image;
		public img_sd8:Laya.Image;
		public label_n1:Laya.Label;
		public label_n2:Laya.Label;
		public label_n3:Laya.Label;
		public label_n4:Laya.Label;
		public label_n5:Laya.Label;
		public label_n6:Laya.Label;
		public label_n7:Laya.Label;
		public label_n8:Laya.Label;
		public label_l1:Laya.Label;
		public label_l2:Laya.Label;
		public label_l3:Laya.Label;
		public label_l4:Laya.Label;
		public label_l5:Laya.Label;
		public label_l6:Laya.Label;
		public label_l7:Laya.Label;
		public label_l8:Laya.Label;
		public label_pl0:Laya.Label;
		public label_pl1:Laya.Label;
		public label_pr0:Laya.Label;
		public label_pr1:Laya.Label;
		public img_icon:Laya.Image;
		public label_c:Laya.Label;
		public label_lv:Laya.Label;
		public label_p0:Laya.Label;
		public label_p1:Laya.Label;
		public label_p2:Laya.Label;
		public label_p3:Laya.Label;
		public label_p4:Laya.Label;
		public label_p5:Laya.Label;
		public label_p6:Laya.Label;
		public label_p7:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gang_skill");

        }

    }
}

module ui.game {
    export class gold_treasure_prize_uiUI extends Dialog {
		public m_list:Laya.List;
		public btn_o:Laya.Button;
		public btn_t:Laya.Button;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/gold_treasure_prize_ui");

        }

    }
}

module ui.game {
    export class gold_treasure_uiUI extends Dialog {
		public btn_o:Laya.Button;
		public btn_t:Laya.Button;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_icon2:Laya.Image;
		public img_icon3:Laya.Image;
		public img_icon4:Laya.Image;
		public img_icon5:Laya.Image;
		public img_icon6:Laya.Image;
		public img_icon7:Laya.Image;
		public img_icon8:Laya.Image;
		public img_icon9:Laya.Image;
		public img_icon10:Laya.Image;
		public img_icon11:Laya.Image;
		public img_icon12:Laya.Image;
		public img_icon13:Laya.Image;
		public img_icon14:Laya.Image;
		public img_icon15:Laya.Image;
		public img_icon16:Laya.Image;
		public img_icon17:Laya.Image;
		public img_icon18:Laya.Image;
		public img_icon19:Laya.Image;
		public img_m19:Laya.Image;
		public img_m18:Laya.Image;
		public img_m17:Laya.Image;
		public img_m16:Laya.Image;
		public img_m15:Laya.Image;
		public img_m14:Laya.Image;
		public img_m13:Laya.Image;
		public img_m12:Laya.Image;
		public img_m11:Laya.Image;
		public img_m10:Laya.Image;
		public img_m9:Laya.Image;
		public img_m8:Laya.Image;
		public img_m7:Laya.Image;
		public img_m6:Laya.Image;
		public img_m5:Laya.Image;
		public img_m4:Laya.Image;
		public img_m3:Laya.Image;
		public img_m2:Laya.Image;
		public img_m1:Laya.Image;
		public img_m0:Laya.Image;
		public img_f0:Laya.Image;
		public img_f1:Laya.Image;
		public img_f2:Laya.Image;
		public img_f3:Laya.Image;
		public img_f4:Laya.Image;
		public img_f5:Laya.Image;
		public img_f6:Laya.Image;
		public img_f7:Laya.Image;
		public img_f8:Laya.Image;
		public img_f9:Laya.Image;
		public img_f10:Laya.Image;
		public img_f11:Laya.Image;
		public img_f12:Laya.Image;
		public img_f13:Laya.Image;
		public img_f14:Laya.Image;
		public img_f15:Laya.Image;
		public img_f16:Laya.Image;
		public img_f17:Laya.Image;
		public img_f18:Laya.Image;
		public img_f19:Laya.Image;
		public label_l2:Laya.Label;
		public label_l3:Laya.Label;
		public label_l0:Laya.Label;
		public label_l1:Laya.Label;
		public m_list:Laya.List;
		public btn_close:Laya.Button;
		public img_e0:Laya.Image;
		public img_e1:Laya.Image;
		public img_e2:Laya.Image;
		public img_e3:Laya.Image;
		public img_e4:Laya.Image;
		public img_e5:Laya.Image;
		public img_e6:Laya.Image;
		public img_e7:Laya.Image;
		public img_e8:Laya.Image;
		public img_e9:Laya.Image;
		public img_e10:Laya.Image;
		public img_e11:Laya.Image;
		public img_e12:Laya.Image;
		public img_e13:Laya.Image;
		public img_e14:Laya.Image;
		public img_e15:Laya.Image;
		public img_e16:Laya.Image;
		public img_e17:Laya.Image;
		public img_e18:Laya.Image;
		public img_e19:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/gold_treasure_ui");

        }

    }
}

module ui.game {
    export class grow_up_uiUI extends Dialog {
		public btn_invest:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab3:Laya.Image;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public label_djs:Laya.Label;
		public label_time:Laya.Label;
		public list_reward:Laya.List;
		public btn_noget:Laya.Button;
		public btn_get:Laya.Button;
		public red_get:Laya.Image;
		public img_recved:Laya.Image;
		public label_grade:Laya.Label;
		public label_num1:Laya.Label;
		public label_num2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/grow_up_ui");

        }

    }
}

module ui.game {
    export class initial_activityUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_page_down:Laya.Button;
		public btn_page_up:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/initial_activity");

        }

    }
}

module ui.game {
    export class invest_uiUI extends Dialog {
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab3:Laya.Image;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_get_comp:Laya.Button;
		public btn_invest:Laya.Button;
		public btn_get:Laya.Button;
		public red_get:Laya.Image;
		public label_get:Laya.Label;
		public label_get_day:Laya.Label;
		public label_djs:Laya.Label;
		public label_time:Laya.Label;
		public list_reward:Laya.List;
		public label_day:Laya.Label;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;
		public label_num2:Laya.Label;
		public img_mask:Laya.Image;
		public img_recved:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/invest_ui");

        }

    }
}

module ui.game {
    export class item_tipsUI extends Dialog {
		public img_bk:Laya.Image;
		public img_grid:Laya.Image;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public ht_simple:laya.html.dom.HTMLDivElement;
		public ht_detail:laya.html.dom.HTMLDivElement;
		public lab_score:Laya.Label;
		public btn:Laya.Button;
		public img_abk:Laya.Image;
		public lab_amount:Laya.Label;
		public btn_dec:Laya.Button;
		public btn_add:Laya.Button;
		public btn_addMax:Laya.Button;
		public btn_decMin:Laya.Button;
		public btn_use:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/item_tips");

        }

    }
}

module ui.game {
    export class jingmai_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_showname:Laya.Label;
		public lab_prop1:Laya.Label;
		public lab_prop2:Laya.Label;
		public lab_prop3:Laya.Label;
		public lab_prop4:Laya.Label;
		public lab_prop5:Laya.Label;
		public lab_prop6:Laya.Label;
		public lab_prop7:Laya.Label;
		public lab_prop8:Laya.Label;
		public img_line0:Laya.Image;
		public lab_prop_k1:Laya.Label;
		public lab_prop_v1:Laya.Label;
		public lab_prop_k2:Laya.Label;
		public lab_prop_v2:Laya.Label;
		public lab_prop_k3:Laya.Label;
		public lab_prop_v3:Laya.Label;
		public lab_prop_k4:Laya.Label;
		public lab_prop_v4:Laya.Label;
		public lab_prop_k5:Laya.Label;
		public lab_prop_v5:Laya.Label;
		public lab_prop_k6:Laya.Label;
		public lab_prop_v6:Laya.Label;
		public lab_prop_k7:Laya.Label;
		public lab_prop_v7:Laya.Label;
		public lab_prop_k8:Laya.Label;
		public lab_prop_v8:Laya.Label;
		public img_line1:Laya.Image;
		public img_line2:Laya.Image;
		public img_line3:Laya.Image;
		public img_line4:Laya.Image;
		public img_line5:Laya.Image;
		public img_line6:Laya.Image;
		public img_line7:Laya.Image;
		public img_line8:Laya.Image;
		public img_line9:Laya.Image;
		public img_line10:Laya.Image;
		public img_point0:Laya.Image;
		public img_point1:Laya.Image;
		public img_point2:Laya.Image;
		public img_point3:Laya.Image;
		public img_point4:Laya.Image;
		public img_point5:Laya.Image;
		public img_point6:Laya.Image;
		public img_point7:Laya.Image;
		public img_point8:Laya.Image;
		public img_point9:Laya.Image;
		public img_point10:Laya.Image;
		public img_name0:Laya.Image;
		public img_name1:Laya.Image;
		public img_name2:Laya.Image;
		public img_name3:Laya.Image;
		public img_name4:Laya.Image;
		public img_name5:Laya.Image;
		public img_name6:Laya.Image;
		public img_name7:Laya.Image;
		public img_name8:Laya.Image;
		public img_name9:Laya.Image;
		public img_name10:Laya.Image;
		public img_select:Laya.Image;
		public img_g:Laya.Image;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public lab_item_name:Laya.Label;
		public lab_own:Laya.Label;
		public btn_use:Laya.Button;
		public red_up:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/jingmai_ui");

        }

    }
}

module ui.game {
    export class level_giftUI extends Dialog {
		public btn_back:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/level_gift");

        }

    }
}

module ui.game {
    export class level_gift_itemUI extends Dialog {
		public label_giftName:Laya.Label;
		public img_recved:Laya.Image;
		public btn_recv:Laya.Button;
		public label_level:Laya.Label;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public redPoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/level_gift_item");

        }

    }
}

module ui.game {
    export class life_card_uiUI extends Dialog {
		public btn_back:Laya.Image;
		public img_recved:Laya.Image;
		public img_shape0:Laya.Image;
		public img_shape1:Laya.Image;
		public img_shape2:Laya.Image;
		public img_shape3:Laya.Image;
		public btn_buy:Laya.Button;
		public btn_acted:Laya.Button;
		public btn_get:Laya.Button;
		public img_sbg0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public label_title0:Laya.Label;
		public label_title1:Laya.Label;
		public label_title2:Laya.Label;
		public label_desc0:Laya.Label;
		public label_desc1:Laya.Label;
		public label_desc2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/life_card_ui");

        }

    }
}

module ui.game {
    export class loadingUI extends Dialog {
		public m_bk:Laya.Image;
		public m_logo:Laya.Image;
		public m_progressbk:Laya.Image;
		public m_progress1:Laya.ProgressBar;
		public m_progressdeco1:Laya.Image;
		public m_progressdeco2:Laya.Image;
		public m_tips:Laya.Image;
		public m_progresslight:Laya.Image;
		public m_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/loading");

        }

    }
}

module ui.game {
    export class login_newuiUI extends Dialog {
		public m_bk:Laya.Image;
		public m_btnOK:Laya.Button;
		public m_btnimg:Laya.Image;
		public m_btnannoucement:Laya.Button;
		public m_btnaccount:Laya.Button;
		public m_statusdot:Laya.Image;
		public m_logo:Laya.Image;
		public m_tips:Laya.Image;
		public m_svrlistbk:Laya.Image;
		public m_svrstatus:Laya.Image;
		public m_svrtype:Laya.Image;
		public m_btnsvrname:Laya.Button;
		public m_btnchosesvr:Laya.Button;
		public test0:Laya.Button;
		public test1:Laya.Button;
		public test2:Laya.Button;
		public test3:Laya.Button;
		public test4:Laya.Button;
		public test5:Laya.Button;
		public test6:Laya.Button;
		public test7:Laya.Button;
		public test8:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/login_newui");

        }

    }
}

module ui.game {
    export class login_uiUI extends View {
		public m_close_btn:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/login_ui");

        }

    }
}

module ui.game {
    export class lv_up_rewardUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;
		public label_content:Laya.Label;
		public btn_0:Laya.Button;
		public btn_1:Laya.Button;
		public btn_2:Laya.Button;
		public btn_3:Laya.Button;
		public btn_4:Laya.Button;
		public btn_5:Laya.Button;
		public btn_6:Laya.Button;
		public btn_7:Laya.Button;
		public red_0:Laya.Image;
		public red_1:Laya.Image;
		public red_2:Laya.Image;
		public red_3:Laya.Image;
		public red_4:Laya.Image;
		public red_5:Laya.Image;
		public red_6:Laya.Image;
		public red_7:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/lv_up_reward");

        }

    }
}

module ui.game {
    export class mail_contentUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_recv:Laya.Button;
		public label_content:Laya.Label;
		public img_g1:Laya.Image;
		public img_g2:Laya.Image;
		public img_g3:Laya.Image;
		public img_g4:Laya.Image;
		public img_g5:Laya.Image;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public img_r5:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public label_a5:Laya.Label;
		public img_rok:Laya.Image;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mail_content");

        }

    }
}

module ui.game {
    export class mail_uiUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_all:Laya.Button;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mail_ui");

        }

    }
}

module ui.game {
    export class mainplayer_infoUI extends Dialog {
		public img_head:Laya.Image;
		public label_name:Laya.Label;
		public label_sex:Laya.Label;
		public label_lv:Laya.Label;
		public label_gang:Laya.Label;
		public label_sign:Laya.Label;
		public btn_close:Laya.Button;
		public btn_change_name:Laya.Button;
		public btn_change_head:Laya.Button;
		public btn_sys_set:Laya.Button;
		public btn_edit:Laya.Button;
		public btn_copy:Laya.Button;
		public img_role:Laya.Image;
		public img_vip:Laya.Image;
		public label_ID:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mainplayer_info");

        }

    }
}

module ui.game {
    export class mainplayer_propUI extends Dialog {
		public btn_back:Laya.Button;
		public label_hp:Laya.Label;
		public label_def:Laya.Label;
		public label_atk:Laya.Label;
		public label_spd:Laya.Label;
		public label_cri:Laya.Label;
		public label_hit:Laya.Label;
		public label_dam_A:Laya.Label;
		public label_dam_AP:Laya.Label;
		public label_cri_dam_AP:Laya.Label;
		public label_PP_dam_AP:Laya.Label;
		public label_PE_dam_AP:Laya.Label;
		public label_res:Laya.Label;
		public label_dod:Laya.Label;
		public label_dam_R:Laya.Label;
		public label_dam_RP:Laya.Label;
		public label_cri_dam_RP:Laya.Label;
		public label_PP_dam_RP:Laya.Label;
		public label_PE_dam_RP:Laya.Label;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mainplayer_prop");

        }

    }
}

module ui.game {
    export class main_bottom1UI extends Dialog {
		public bysd_btn:Laya.Button;
		public btn_friend:Laya.Button;
		public clsd_btn:Laya.Button;
		public zbsd_btn:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_bottom1");

        }

    }
}

module ui.game {
    export class main_chapterUI extends Dialog {
		public m_pic:Laya.Image;
		public btn_1:Laya.Button;
		public m_label_name:Laya.Label;
		public m_reward_tips:Laya.Image;
		public m_label_id:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_chapter");

        }

    }
}

module ui.game {
    export class main_cityUI extends Dialog {
		public btn_gang:Laya.Button;
		public btn_activity:Laya.Button;
		public btn_fuben:Laya.Button;
		public btn_house:Laya.Button;
		public btn_svr:Laya.Button;
		public btn_boss:Laya.Button;
		public btn_pk:Laya.Button;
		public red_activity:Laya.Image;
		public red_gang:Laya.Image;
		public red_fuben:Laya.Image;
		public red_pk:Laya.Image;
		public red_boss:Laya.Image;
		public red_house:Laya.Image;
		public red_svr:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_city");

        }

    }
}

module ui.game {
    export class main_city_leftUI extends Dialog {
		public btn_mail:Laya.Button;
		public red_mail:Laya.Image;
		public btn_sign:Laya.Button;
		public red_sign:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_city_left");

        }

    }
}

module ui.game {
    export class main_equipUI extends Dialog {
		public img_role:Laya.Image;
		public img_g1:Laya.Image;
		public img_g2:Laya.Image;
		public img_g3:Laya.Image;
		public img_g4:Laya.Image;
		public img_g5:Laya.Image;
		public img_g6:Laya.Image;
		public img_g7:Laya.Image;
		public img_g8:Laya.Image;
		public img_g9:Laya.Image;
		public img_g10:Laya.Image;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_i6:Laya.Image;
		public img_i7:Laya.Image;
		public img_i8:Laya.Image;
		public img_i9:Laya.Image;
		public img_i10:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public img_r5:Laya.Image;
		public img_r6:Laya.Image;
		public img_r7:Laya.Image;
		public img_r8:Laya.Image;
		public img_r9:Laya.Image;
		public img_r10:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public label_a5:Laya.Label;
		public label_a6:Laya.Label;
		public label_a7:Laya.Label;
		public label_a8:Laya.Label;
		public label_a9:Laya.Label;
		public label_a10:Laya.Label;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;
		public red_tab4:Laya.Image;
		public red_1:Laya.Image;
		public red_2:Laya.Image;
		public red_3:Laya.Image;
		public red_4:Laya.Image;
		public red_5:Laya.Image;
		public red_6:Laya.Image;
		public red_7:Laya.Image;
		public red_8:Laya.Image;
		public red_9:Laya.Image;
		public red_10:Laya.Image;
		public lab_lv:Laya.Label;
		public lab_exp:Laya.Label;
		public btn_hz:Laya.Button;
		public btn_up:Laya.Button;
		public btn_role:Laya.Button;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public red_lv:Laya.Image;
		public btn_weapon:Laya.Button;
		public btn_elf:Laya.Button;
		public btn_fashion:Laya.Button;
		public btn_title:Laya.Button;
		public btn_5:Laya.Button;
		public btn_6:Laya.Button;
		public btn_danyao:Laya.Button;
		public btn_jingmai:Laya.Button;
		public red_hz:Laya.Image;
		public red_weapon:Laya.Image;
		public red_elf:Laya.Image;
		public red_fashion:Laya.Image;
		public red_title:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_equip");

        }

    }
}

module ui.game {
    export class main_headUI extends Dialog {
		public m_imagehead:Laya.Image;
		public btn_head:Laya.Button;
		public m_labellv:Laya.Label;
		public m_labelname:Laya.Label;
		public btn_rank:Laya.Button;
		public btn_vip:Laya.Button;
		public img_vip:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_head");

        }

    }
}

module ui.game {
    export class main_leftUI extends Dialog {
		public btn_mail:Laya.Button;
		public btn_daily:Laya.Button;
		public btn_travel:Laya.Button;
		public btn_tqcard:Laya.Button;
		public red_mail:Laya.Image;
		public red_daily:Laya.Image;
		public red_travel:Laya.Image;
		public btn_8sign:Laya.Button;
		public red_8sign:Laya.Image;
		public red_tqcard:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_left");

        }

    }
}

module ui.game {
    export class main_skillUI extends Dialog {
		public btn_close:Laya.Button;
		public panel_ud:Laya.Panel;
		public btn_cost:Laya.Button;
		public btn_costonce:Laya.Button;
		public label_cost:Laya.Label;
		public label_costonce:Laya.Label;
		public btn_skset:Laya.Button;
		public img_icon1:Laya.Image;
		public img_btn1:Laya.Image;
		public img_sd1:Laya.Image;
		public img_icon2:Laya.Image;
		public img_btn2:Laya.Image;
		public img_sd2:Laya.Image;
		public img_icon3:Laya.Image;
		public img_btn3:Laya.Image;
		public img_sd3:Laya.Image;
		public img_icon4:Laya.Image;
		public img_btn4:Laya.Image;
		public img_sd4:Laya.Image;
		public img_icon5:Laya.Image;
		public img_btn5:Laya.Image;
		public img_sd5:Laya.Image;
		public img_icon6:Laya.Image;
		public img_btn6:Laya.Image;
		public img_sd6:Laya.Image;
		public img_icon7:Laya.Image;
		public img_btn7:Laya.Image;
		public img_sd7:Laya.Image;
		public img_icon8:Laya.Image;
		public img_btn8:Laya.Image;
		public img_sd8:Laya.Image;
		public label_n1:Laya.Label;
		public label_n2:Laya.Label;
		public label_n3:Laya.Label;
		public label_n4:Laya.Label;
		public label_n5:Laya.Label;
		public label_n6:Laya.Label;
		public label_n7:Laya.Label;
		public label_n8:Laya.Label;
		public label_l1:Laya.Label;
		public label_l2:Laya.Label;
		public label_l3:Laya.Label;
		public label_l4:Laya.Label;
		public label_l5:Laya.Label;
		public label_l6:Laya.Label;
		public label_l7:Laya.Label;
		public label_l8:Laya.Label;
		public label_tips:Laya.Label;
		public label_desc:Laya.Label;
		public label_lv:Laya.Label;
		public label_sn:Laya.Label;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;
		public red_tab4:Laya.Image;
		public btn_back:Laya.Button;
		public red_tab5:Laya.Image;
		public red_tab6:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_skill");

        }

    }
}

module ui.game {
    export class main_skill_setUI extends View {
		public m_list:Laya.List;
		public btn_up:Laya.Button;
		public label_sname:Laya.Label;
		public label_lv:Laya.Label;
		public label_desc:Laya.Label;
		public img_ug:Laya.Image;
		public img_icon:Laya.Image;
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_skill_set");

        }

    }
}

module ui.game {
    export class main_topbtnUI extends Dialog {
		public btn_rech:Laya.Button;
		public btn_FstRechg:Laya.Button;
		public btn_DailyRechg:Laya.Button;
		public red_rech:Laya.Image;
		public red_FstRechg:Laya.Image;
		public red_DailyRechg:Laya.Image;
		public btn_BoonHall:Laya.Button;
		public red_BoonHall:Laya.Image;
		public btn_InitialActivity:Laya.Button;
		public red_InitialActivity:Laya.Image;
		public btn_straightfirst:Laya.Button;
		public red_straightfirst:Laya.Image;
		public label_time2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/main_topbtn");

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
    export class marryUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_help:Laya.Image;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_doe:Laya.Button;
		public m_box:Laya.Box;
		public img_bg:Laya.Image;
		public img_icon:Laya.Image;
		public btn_hus:Laya.Image;
		public btn_wif:Laya.Image;
		public label_l0:Laya.Label;
		public label_l1:Laya.Label;
		public btn_marry:Laya.Button;
		public label_name:Laya.Label;
		public img_lbg:Laya.Image;
		public m_list:Laya.List;
		public label_time:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/marry");

        }

    }
}

module ui.game {
    export class marry_informUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_qj:Laya.Button;
		public label_l1:Laya.Label;
		public img_head0:Laya.Image;
		public img_head1:Laya.Image;
		public label_name0:Laya.Label;
		public label_name1:Laya.Label;
		public label_l0:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/marry_inform");

        }

    }
}

module ui.game {
    export class marry_proposeUI extends Dialog {
		public btn_close:Laya.Button;
		public img_bg0:Laya.Image;
		public img_bg1:Laya.Image;
		public btn_qh:Laya.Button;
		public img_bg2:Laya.Image;
		public label_l6:Laya.Label;
		public label_name:Laya.Label;
		public label_l7:Laya.Label;
		public label_l0:Laya.Label;
		public label_num0:Laya.Label;
		public label_l3:Laya.Label;
		public label_l1:Laya.Label;
		public label_num1:Laya.Label;
		public label_l4:Laya.Label;
		public label_l2:Laya.Label;
		public label_num2:Laya.Label;
		public label_l5:Laya.Label;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_icon2:Laya.Image;
		public m_list1:Laya.List;
		public m_list2:Laya.List;
		public m_list3:Laya.List;
		public img_slt0:Laya.Image;
		public img_slt1:Laya.Image;
		public img_slt2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/marry_propose");

        }

    }
}

module ui.game {
    export class marry_sendUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_send1:Laya.Button;
		public btn_send0:Laya.Button;
		public img_rim0:Laya.Image;
		public img_rim1:Laya.Image;
		public img_rim2:Laya.Image;
		public btn_send2:Laya.Button;
		public img_gi1:Laya.Image;
		public img_gi2:Laya.Image;
		public img_gi0:Laya.Image;
		public label_l2:Laya.Label;
		public label_l0:Laya.Label;
		public label_l1:Laya.Label;
		public img_icon0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_icon2:Laya.Image;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;
		public label_num2:Laya.Label;
		public label_tips:laya.html.dom.HTMLDivElement;
		public label_gn0:Laya.Label;
		public label_gn1:Laya.Label;
		public label_gn2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/marry_send");

        }

    }
}

module ui.game {
    export class marry_tipsUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_jj:Laya.Button;
		public btn_dy:Laya.Button;
		public label_tips:laya.html.dom.HTMLDivElement;
		public label_l0:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/marry_tips");

        }

    }
}

module ui.game {
    export class month_card_uiUI extends Dialog {
		public btn_back:Laya.Image;
		public img_recved:Laya.Image;
		public img_shape0:Laya.Image;
		public img_shape1:Laya.Image;
		public img_shape2:Laya.Image;
		public img_shape3:Laya.Image;
		public img_shape4:Laya.Image;
		public btn_buy:Laya.Button;
		public btn_get:Laya.Button;
		public img_sbg0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public label_title0:Laya.Label;
		public label_title1:Laya.Label;
		public label_title2:Laya.Label;
		public label_desc0:Laya.Label;
		public label_desc1:Laya.Label;
		public label_desc2:Laya.Label;
		public label_djs:Laya.Label;
		public label_time:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/month_card_ui");

        }

    }
}

module ui.game {
    export class mryb_car_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_begin:Laya.Button;
		public label_f5:Laya.Label;
		public label_yb:Laya.Label;
		public label_f0:Laya.Label;
		public label_f1:Laya.Label;
		public label_f2:Laya.Label;
		public btn_o:Laya.Button;
		public label_f3:Laya.Label;
		public img_i0:Laya.Image;
		public label_n0:Laya.Label;
		public btn_qly:Laya.Button;
		public label_f4:Laya.Label;
		public img_i1:Laya.Image;
		public label_n1:Laya.Label;
		public m_list:Laya.List;
		public label_qly:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mryb_car_ui");

        }

    }
}

module ui.game {
    export class mryb_escort_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public img_head:Laya.Image;
		public label_f3:Laya.Label;
		public img_i0:Laya.Image;
		public img_i1:Laya.Image;
		public img_r0:Laya.Image;
		public img_r1:Laya.Image;
		public label_n0:Laya.Label;
		public label_n1:Laya.Label;
		public btn_e:Laya.Button;
		public label_name:Laya.Label;
		public label_gang:Laya.Label;
		public label_f0:Laya.Label;
		public label_f1:Laya.Label;
		public label_f2:Laya.Label;
		public label_bat:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mryb_escort_ui");

        }

    }
}

module ui.game {
    export class mryb_recordUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public m_list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/mryb_record");

        }

    }
}

module ui.game {
    export class mryb_revenge_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public img_head:Laya.Image;
		public label_f3:Laya.Label;
		public img_i0:Laya.Image;
		public img_i1:Laya.Image;
		public img_r0:Laya.Image;
		public img_r1:Laya.Image;
		public label_n0:Laya.Label;
		public label_n1:Laya.Label;
		public btn_e:Laya.Button;
		public img_btn:Laya.Image;
		public label_name:Laya.Label;
		public label_gang:Laya.Label;
		public label_f0:Laya.Label;
		public label_f1:Laya.Label;
		public label_f2:Laya.Label;
		public label_bat:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mryb_revenge_ui");

        }

    }
}

module ui.game {
    export class mryb_reward_uiUI extends Dialog {
		public label_qly:Laya.Label;
		public m_rlist:Laya.List;
		public m_blist:Laya.List;
		public btn_get:Laya.Button;
		public ani_car:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/mryb_reward_ui");

        }

    }
}

module ui.game {
    export class mryb_uiUI extends Dialog {
		public btn_begin:Laya.Button;
		public btn_back:Laya.Button;
		public btn_help:Laya.Button;
		public btn_close:Laya.Button;
		public btn_shop:Laya.Button;
		public label_f0:Laya.Label;
		public label_f1:Laya.Label;
		public label_yb:Laya.Label;
		public label_jb:Laya.Label;
		public label_time:Laya.Label;
		public btn_f:Laya.Label;
		public m_panel:Laya.Panel;
		public b_car0:Laya.Box;
		public b_car1:Laya.Box;
		public b_car2:Laya.Box;
		public b_car3:Laya.Box;
		public b_car4:Laya.Box;
		public b_car5:Laya.Box;
		public b_car6:Laya.Box;
		public b_car7:Laya.Box;
		public btn_jl:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/mryb_ui");

        }

    }
}

module ui.game {
    export class msgboxUI extends Dialog {
		public btn_ok:Laya.Button;
		public btn_cancle:Laya.Button;
		public btn_close:Laya.Button;
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
    export class multi_shopUI extends Dialog {
		public title:Laya.Image;
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public nav_list:Laya.List;
		public nav_item_box:Laya.Box;
		public nav_item_btn:Laya.Button;
		public money_type:Laya.Image;
		public money:Laya.Label;
		public label_conditData:Laya.Label;
		public btn_tab0:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/multi_shop");

        }

    }
}

module ui.game {
    export class multi_shop_itemUI extends Dialog {
		public bg:Laya.Image;
		public rim:Laya.Image;
		public goods_icon:Laya.Image;
		public goods_name:Laya.Label;
		public purchase_btn:Laya.Button;
		public tips_label:Laya.Label;
		public money_type:Laya.Image;
		public price_label:Laya.Label;
		public zhanli_label:Laya.Label;
		public CE_label:Laya.Label;
		public up_img:Laya.Image;
		public limit_num_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/multi_shop_item");

        }

    }
}

module ui.game {
    export class m_fuben_itemUI extends Dialog {
		public fuben_name:Laya.Label;
		public label_num:Laya.Label;
		public label_tips1:Laya.Label;
		public label_tips2:Laya.Label;
		public price_box:Laya.Box;
		public price_label:Laya.Label;
		public btn_fight:Laya.Button;
		public red_p1:Laya.Image;
		public rim0:Laya.Image;
		public reward0:Laya.Image;
		public rim1:Laya.Image;
		public reward1:Laya.Image;
		public btn_sweep:Laya.Button;
		public btn_freeSweep:Laya.Button;
		public red_p2:Laya.Image;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/m_fuben_item");

        }

    }
}

module ui.game {
    export class newbees_uiUI extends Dialog {
		public m_bk:Laya.Image;
		public m_ani:Laya.Animation;
		public ani_pass:Laya.Animation;
		public m_btn:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/newbees_ui");

        }

    }
}

module ui.game {
    export class number_inputUI extends Dialog {
		public btn_close:Laya.Button;
		public TextInput_1:Laya.TextInput;
		public lab_1:Laya.Label;
		public lab_2:Laya.Label;
		public btn_confirm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/number_input");

        }

    }
}

module ui.game {
    export class offline_incomeUI extends Dialog {
		public label_time_max:Laya.Label;
		public label_time:Laya.Label;
		public label_money:Laya.Label;
		public label_exp:Laya.Label;
		public label_item:Laya.Label;
		public label_money_ext:Laya.Label;
		public label_exp_ext:Laya.Label;
		public btn_open:Laya.Button;
		public btn_confirm:Laya.Button;
		public htmltext_1:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/offline_income");

        }

    }
}

module ui.game {
    export class once_taskUI extends Dialog {
		public ani_ok:Laya.Animation;
		public htmlText_desc:laya.html.dom.HTMLDivElement;
		public btn_1:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/once_task");

        }

    }
}

module ui.game {
    export class otherplayer_infoUI extends Dialog {
		public img_head:Laya.Image;
		public img_vip:Laya.Image;
		public label_name:Laya.Label;
		public label_sex:Laya.Label;
		public label_lv:Laya.Label;
		public label_gang:Laya.Label;
		public label_sign:Laya.Label;
		public btn_close:Laya.Button;
		public img_role:Laya.Image;
		public btn_chat:Laya.Button;
		public btn_bf:Laya.Button;
		public btn_lh:Laya.Button;
		public label_n:Laya.Label;
		public btn_copy:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/otherplayer_info");

        }

    }
}

module ui.game {
    export class partner_combatUI extends Dialog {
		public img_head1:Laya.Image;
		public img_head2:Laya.Image;
		public img_rim1:Laya.Image;
		public img_rim2:Laya.Image;
		public lab_name1:Laya.Label;
		public lab_name2:Laya.Label;
		public lab_lv1:Laya.Label;
		public lab_lv2:Laya.Label;
		public btn_2:Laya.Button;
		public btn_1:Laya.Button;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/partner_combat");

        }

    }
}

module ui.game {
    export class partner_mainUI extends Dialog {
		public img_title:Laya.Image;
		public btn_close:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;
		public red_tab4:Laya.Image;
		public btn_back:Laya.Button;
		public sprite_lvup:Laya.Sprite;
		public spl_btn_yuan:Laya.Button;
		public spl_btn_combat:Laya.Button;
		public spl_btn_prop:Laya.Button;
		public spl_lab_num:Laya.Label;
		public spl_btn_add:Laya.Button;
		public spl_pgbar:Laya.ProgressBar;
		public spl_lab_exp:Laya.Label;
		public spl_btn_auto:Laya.Button;
		public spl_btn_up:Laya.Button;
		public spl_red_up:Laya.Image;
		public spl_red_auto:Laya.Image;
		public spl_img_citem:Laya.Image;
		public spl_lab_citem:Laya.Label;
		public spl_lab_cslv:Laya.Label;
		public spl_lab_name:Laya.Label;
		public spl_lab_lv:Laya.Label;
		public spl_lab_zhanli:Laya.Label;
		public spl_lab_combat:Laya.Label;
		public spl_img_mainskill:Laya.Image;
		public spl_img_star0:Laya.Image;
		public spl_img_star1:Laya.Image;
		public spl_img_star2:Laya.Image;
		public spl_img_star5:Laya.Image;
		public spl_img_star3:Laya.Image;
		public spl_img_star4:Laya.Image;
		public spl_img_star6:Laya.Image;
		public spl_btn_auto_buy:Laya.Button;
		public spl_red_combat:Laya.Image;
		public sprite_get:Laya.Sprite;
		public spg_btn_yuan:Laya.Button;
		public spg_btn_prop:Laya.Button;
		public spg_btn_exchange:Laya.Button;
		public spg_red:Laya.Image;
		public spg_lab_name:Laya.Label;
		public spg_img_item:Laya.Image;
		public spg_img_rim:Laya.Image;
		public spg_lab_itemname:Laya.Label;
		public spg_lab_need:Laya.Label;
		public spg_lab_num:Laya.Label;
		public spg_lab_zhanli:Laya.Label;
		public spg_lab_combat:Laya.Label;
		public spg_img_mainskill:Laya.Image;
		public sprite_star:Laya.Sprite;
		public sps_btn_yuan:Laya.Button;
		public sps_lab_lv2:Laya.Label;
		public sps_lab_lv:Laya.Label;
		public sps_btn_prop:Laya.Button;
		public sps_btn_starup:Laya.Button;
		public sps_red:Laya.Image;
		public sps_lab_name:Laya.Label;
		public sps_img_item:Laya.Image;
		public sps_img_rim:Laya.Image;
		public sps_lab_itemname:Laya.Label;
		public sps_lab_need:Laya.Label;
		public sps_lab_num:Laya.Label;
		public sps_lab_zhanli:Laya.Label;
		public sps_lab_combat:Laya.Label;
		public sps_img_mainskill:Laya.Image;
		public sps_img_skill1:Laya.Image;
		public sps_img_skill2:Laya.Image;
		public sps_img_skillrim2:Laya.Image;
		public img_skillstar2:Laya.Image;
		public sps_img_star0:Laya.Image;
		public sps_img_star1:Laya.Image;
		public sps_img_star2:Laya.Image;
		public sps_img_star5:Laya.Image;
		public sps_img_star3:Laya.Image;
		public sps_img_star4:Laya.Image;
		public sps_img_star6:Laya.Image;
		public sps_img_arrow:Laya.Image;
		public img_skillstar1:Laya.Image;
		public sps_img_no:Laya.Image;
		public sps_lv_max1:Laya.Label;
		public sps_lv_max2:Laya.Label;
		public img_role:Laya.Image;
		public btn_page_down:Laya.Button;
		public btn_page_up:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/partner_main");

        }

    }
}

module ui.game {
    export class partner_prop_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public img_11:Laya.Image;
		public img_12:Laya.Image;
		public lab_prop1:Laya.Label;
		public lab_p11:Laya.Label;
		public lab_v11:Laya.Label;
		public lab_p12:Laya.Label;
		public lab_v12:Laya.Label;
		public lab_p13:Laya.Label;
		public lab_v13:Laya.Label;
		public img_21:Laya.Image;
		public img_22:Laya.Image;
		public lab_prop2:Laya.Label;
		public lab_p21:Laya.Label;
		public lab_v21:Laya.Label;
		public lab_p22:Laya.Label;
		public lab_v22:Laya.Label;
		public lab_p23:Laya.Label;
		public lab_v23:Laya.Label;
		public lab_p14:Laya.Label;
		public lab_v14:Laya.Label;
		public lab_p24:Laya.Label;
		public lab_v24:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/partner_prop_ui");

        }

    }
}

module ui.game {
    export class partner_yuanUI extends Dialog {
		public lab_lv:Laya.Label;
		public lab_cur_dam_a:Laya.Label;
		public lab_cur_dam_p:Laya.Label;
		public lab_next_dam_a:Laya.Label;
		public lab_next_dam_p:Laya.Label;
		public htmlText:laya.html.dom.HTMLDivElement;
		public lab_jlv:Laya.Label;
		public btn:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/partner_yuan");

        }

    }
}

module ui.game {
    export class pb_item_uiUI extends Dialog {
		public surplus_times:Laya.Label;
		public boss_name:Laya.Label;
		public boss_base:Laya.Image;
		public boss_img:Laya.Image;
		public img_killed:Laya.Image;
		public boss_lv_label:Laya.Label;
		public rim0:Laya.Image;
		public equip0:Laya.Image;
		public rim1:Laya.Image;
		public equip1:Laya.Image;
		public rim2:Laya.Image;
		public equip2:Laya.Image;
		public tipsLabel:Laya.Label;
		public fightBtnBox:Laya.Box;
		public fightBtn:Laya.Button;
		public sweepBtnBox:Laya.Box;
		public sweepBtn:Laya.Button;
		public label_eqnum0:Laya.Label;
		public label_eqnum1:Laya.Label;
		public label_eqnum2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/pb_item_ui");

        }

    }
}

module ui.game {
    export class personal_bossUI extends Dialog {
		public btn_close:Laya.Image;
		public btn_back:Laya.Image;
		public btn_cb:Laya.Button;
		public btn_wb:Laya.Button;
		public red_p0:Laya.Image;
		public red_p1:Laya.Image;
		public red_p2:Laya.Image;
		public btn_shop:Laya.Button;
		public red_p:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/personal_boss");

        }

    }
}

module ui.game {
    export class pnyo_bossUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public label_boss:Laya.Label;
		public label_place:Laya.Label;
		public btn_go:Laya.Button;
		public img_g1_1:Laya.Image;
		public img_g1_2:Laya.Image;
		public img_g1_3:Laya.Image;
		public img_g1_4:Laya.Image;
		public img_g1_5:Laya.Image;
		public img_i1_1:Laya.Image;
		public img_i1_2:Laya.Image;
		public img_i1_3:Laya.Image;
		public img_i1_4:Laya.Image;
		public img_i1_5:Laya.Image;
		public img_r1_1:Laya.Image;
		public img_r1_2:Laya.Image;
		public img_r1_3:Laya.Image;
		public img_r1_4:Laya.Image;
		public img_r1_5:Laya.Image;
		public label_a1_1:Laya.Label;
		public label_a1_2:Laya.Label;
		public label_a1_3:Laya.Label;
		public label_a1_4:Laya.Label;
		public label_a1_5:Laya.Label;
		public img_g2_1:Laya.Image;
		public img_g2_2:Laya.Image;
		public img_g2_3:Laya.Image;
		public img_g2_4:Laya.Image;
		public img_g2_5:Laya.Image;
		public img_i2_1:Laya.Image;
		public img_i2_2:Laya.Image;
		public img_i2_3:Laya.Image;
		public img_i2_4:Laya.Image;
		public img_i2_5:Laya.Image;
		public img_r2_1:Laya.Image;
		public img_r2_2:Laya.Image;
		public img_r2_3:Laya.Image;
		public img_r2_4:Laya.Image;
		public img_r2_5:Laya.Image;
		public label_a2_1:Laya.Label;
		public label_a2_2:Laya.Label;
		public label_a2_3:Laya.Label;
		public label_a2_4:Laya.Label;
		public label_a2_5:Laya.Label;
		public img_role:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/pnyo_boss");

        }

    }
}

module ui.game {
    export class progress_bar_uiUI extends Dialog {
		public m_box:Laya.Box;
		public m_pro:Laya.ProgressBar;
		public label_t:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/progress_bar_ui");

        }

    }
}

module ui.game {
    export class purchase_pageUI extends Dialog {
		public close_btn:Laya.Image;
		public back_btn:Laya.Image;
		public goods_name:Laya.Label;
		public limit_buy_label:Laya.Label;
		public goods_desc:Laya.Label;
		public money_type:Laya.Image;
		public price_label:Laya.Label;
		public purchase_btn:Laya.Button;
		public rim:Laya.Image;
		public goods_icon:Laya.Image;
		public cut_ten:Laya.Button;
		public cut_one:Laya.Button;
		public num_label:Laya.Label;
		public add_one:Laya.Button;
		public add_ten:Laya.Button;
		public label_num:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/purchase_page");

        }

    }
}

module ui.game {
    export class rankUI extends Dialog {
		public btn_back:Laya.Button;
		public btn_close:Laya.Button;
		public img_role:Laya.Image;
		public lab_my:Laya.Label;
		public btn_up:Laya.Button;
		public btn_down:Laya.Button;
		public lab_page:Laya.Label;
		public btn_myrank:Laya.Button;
		public lab_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/rank");

        }

    }
}

module ui.game {
    export class rank_simpleUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_5:Laya.Label;
		public lab_6:Laya.Label;
		public lab_rank:Laya.Label;
		public lab_score:Laya.Label;
		public lab_1:Laya.Label;
		public lab_2:Laya.Label;
		public lab_3:Laya.Label;
		public lab_4:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/rank_simple");

        }

    }
}

module ui.game {
    export class rech_store_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public label_vip:laya.html.dom.HTMLDivElement;
		public img_vip:Laya.Image;
		public m_pro:Laya.ProgressBar;
		public label_bar:Laya.Label;
		public m_list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/rech_store_ui");

        }

    }
}

module ui.game {
    export class reward_recvUI extends Dialog {
		public btn_back:Laya.Button;
		public img_g1:Laya.Image;
		public img_g2:Laya.Image;
		public img_g3:Laya.Image;
		public img_g4:Laya.Image;
		public img_g5:Laya.Image;
		public img_g6:Laya.Image;
		public img_g7:Laya.Image;
		public img_g8:Laya.Image;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_i6:Laya.Image;
		public img_i7:Laya.Image;
		public img_i8:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public img_r5:Laya.Image;
		public img_r6:Laya.Image;
		public img_r7:Laya.Image;
		public img_r8:Laya.Image;
		public label_a1:Laya.Label;
		public label_a5:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public label_a6:Laya.Label;
		public label_a7:Laya.Label;
		public label_a8:Laya.Label;
		public htmltext_1:laya.html.dom.HTMLDivElement;
		public btn_recv:Laya.Button;
		public lab_secstips:Laya.Label;
		public lab_secs:Laya.Label;
		public img_recvd:Laya.Image;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/reward_recv");

        }

    }
}

module ui.game {
    export class reward_uiUI extends Dialog {
		public img_g1:Laya.Image;
		public img_g2:Laya.Image;
		public img_g3:Laya.Image;
		public img_g4:Laya.Image;
		public img_g5:Laya.Image;
		public img_g6:Laya.Image;
		public img_g7:Laya.Image;
		public img_g8:Laya.Image;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_i6:Laya.Image;
		public img_i7:Laya.Image;
		public img_i8:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public img_r5:Laya.Image;
		public img_r6:Laya.Image;
		public img_r7:Laya.Image;
		public img_r8:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public label_a5:Laya.Label;
		public label_a6:Laya.Label;
		public label_a7:Laya.Label;
		public label_a8:Laya.Label;
		public btn_recv:Laya.Button;
		public lab_secs:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/reward_ui");

        }

    }
}

module ui.game {
    export class reward_viewUI extends Dialog {
		public label_title:Laya.Label;
		public btn_back:Laya.Button;
		public img_g1:Laya.Image;
		public img_g2:Laya.Image;
		public img_g3:Laya.Image;
		public img_g4:Laya.Image;
		public img_g5:Laya.Image;
		public img_g6:Laya.Image;
		public img_g7:Laya.Image;
		public img_g8:Laya.Image;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_i6:Laya.Image;
		public img_i7:Laya.Image;
		public img_i8:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public img_r5:Laya.Image;
		public img_r6:Laya.Image;
		public img_r7:Laya.Image;
		public img_r8:Laya.Image;
		public label_a1:Laya.Label;
		public label_a5:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public label_a6:Laya.Label;
		public label_a7:Laya.Label;
		public label_a8:Laya.Label;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/reward_view");

        }

    }
}

module ui.game {
    export class ronglian_selectUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_confirm:Laya.Button;
		public label_amount:Laya.Label;
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/ronglian_select");

        }

    }
}

module ui.game {
    export class ronglian_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_do:Laya.Button;
		public btn_do50:Laya.Button;
		public img_i1:Laya.Image;
		public img_i2:Laya.Image;
		public img_i3:Laya.Image;
		public img_i4:Laya.Image;
		public img_i5:Laya.Image;
		public img_i6:Laya.Image;
		public img_i7:Laya.Image;
		public img_i8:Laya.Image;
		public img_i9:Laya.Image;
		public img_r1:Laya.Image;
		public img_r2:Laya.Image;
		public img_r3:Laya.Image;
		public img_r4:Laya.Image;
		public img_r5:Laya.Image;
		public img_r6:Laya.Image;
		public img_r7:Laya.Image;
		public img_r8:Laya.Image;
		public img_r9:Laya.Image;
		public label_a1:Laya.Label;
		public label_a2:Laya.Label;
		public label_a3:Laya.Label;
		public label_a4:Laya.Label;
		public label_a5:Laya.Label;
		public label_a6:Laya.Label;
		public label_a7:Laya.Label;
		public label_a8:Laya.Label;
		public label_a9:Laya.Label;
		public btn_auto:Laya.Button;
		public btn_back:Laya.Button;
		public ani_do1:Laya.Animation;
		public ani_do2:Laya.Animation;
		public ani_do3:Laya.Animation;
		public ani_do4:Laya.Animation;
		public ani_do5:Laya.Animation;
		public ani_do6:Laya.Animation;
		public ani_do7:Laya.Animation;
		public ani_do8:Laya.Animation;
		public ani_do9:Laya.Animation;
		public red_rl50:Laya.Image;
		public red_rl:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/ronglian_ui");

        }

    }
}

module ui.game {
    export class shop_itemUI extends Dialog {
		public goods_name:Laya.Label;
		public limit_num_label:Laya.Label;
		public condit_tips:Laya.Label;
		public rim:Laya.Image;
		public goods_icon:Laya.Image;
		public money_type:Laya.Image;
		public label_num:Laya.Label;
		public price_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/shop_item");

        }

    }
}

module ui.game {
    export class sign_8dayUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public img_banner:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/sign_8day");

        }

    }
}

module ui.game {
    export class sign_8day_itemUI extends Dialog {
		public img_bompic:Laya.Image;
		public lab_signday:Laya.Label;
		public img_recved:Laya.Image;
		public img_tomrecv:Laya.Image;
		public lab_poorday:Laya.Label;
		public btn_recv:Laya.Button;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public lab_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public lab_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public lab_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public lab_num3:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/sign_8day_item");

        }

    }
}

module ui.game {
    export class sign_giftUI extends Dialog {
		public img_grid:Laya.Image;
		public img_icon:Laya.Image;
		public img_rim:Laya.Image;
		public label_num:Laya.Label;
		public btn_recv:Laya.Button;
		public label_tips1:Laya.Label;
		public seal_recved:Laya.Image;
		public btn_back:Laya.Image;
		public red_p:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/sign_gift");

        }

    }
}

module ui.game {
    export class sign_gift_itemUI extends Dialog {
		public label_giftName:Laya.Label;
		public btn_recv:Laya.Button;
		public img_recved:Laya.Image;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public label_num2:Laya.Label;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public redPoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/sign_gift_item");

        }

    }
}

module ui.game {
    export class skill_tipsUI extends View {
		public img_bg:Laya.Image;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public label_sn:Laya.Label;
		public label_pt:Laya.Label;
		public label_p:Laya.Label;
		public label_npt:Laya.Label;
		public label_np:Laya.Label;
		public label_lv:Laya.Label;
		public img_line:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/skill_tips");

        }

    }
}

module ui.game {
    export class slv_exchangeUI extends Dialog {
		public btn_ok:Laya.Button;
		public btn_close:Laya.Button;
		public img_cost:Laya.Image;
		public label_times:Laya.Label;
		public label_get:Laya.Label;
		public label_cost:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/slv_exchange");

        }

    }
}

module ui.game {
    export class straightfirst_orderUI extends View {
		public btn_close:Laya.Image;
		public arttxt1:Laya.Image;
		public arttxt2:Laya.Image;
		public img_icon6:Laya.Image;
		public iconname:Laya.Label;
		public surplustime:Laya.Label;
		public countdown:Laya.Label;
		public txt_des:Laya.Label;
		public img_grid0:Laya.Image;
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public label_num0:Laya.Label;
		public img_grid1:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public label_num1:Laya.Label;
		public img_grid2:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public img_grid3:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public label_num3:Laya.Label;
		public img_grid4:Laya.Image;
		public img_icon4:Laya.Image;
		public img_rim4:Laya.Image;
		public label_num4:Laya.Label;
		public img_grid5:Laya.Image;
		public img_icon5:Laya.Image;
		public img_rim5:Laya.Image;
		public label_num5:Laya.Label;
		public btn_receive:Laya.Button;
		public btn_recharge:Laya.Image;
		public needrecharge:Laya.Label;
		public txt_money:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/straightfirst_order");

        }

    }
}

module ui.game {
    export class stuff_itemUI extends Dialog {
		public item_box:Laya.Box;
		public goods_name:Laya.Label;
		public goods_icon:Laya.Image;
		public price_label:Laya.Label;
		public limit_num_label:Laya.Label;
		public condit_tips:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/stuff_item");

        }

    }
}

module ui.game {
    export class stuff_shopUI extends Dialog {
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public title:Laya.Label;
		public condit_label:Laya.Label;
		public money:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/stuff_shop");

        }

    }
}

module ui.game {
    export class summon_apt_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public lab_v1:Laya.Label;
		public lab_v2:Laya.Label;
		public lab_v3:Laya.Label;
		public lab_own:Laya.Label;
		public img_item:Laya.Image;
		public img_rim:Laya.Image;
		public lab_item_name:Laya.Label;
		public btn_use:Laya.Button;
		public red_up:Laya.Image;
		public btn_use_all:Laya.Button;
		public red_up_auto:Laya.Image;
		public pgbar:Laya.ProgressBar;
		public lab_exp:Laya.Label;
		public lab_lv:Laya.Label;
		public img_role:Laya.Image;
		public img_skill:Laya.Image;
		public lab_skill_name:Laya.Label;
		public lab_skill_desc1:Laya.Label;
		public lab_skill_desc2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_apt_ui");

        }

    }
}

module ui.game {
    export class summon_catchingUI extends Dialog {
		public m_ani:Laya.Animation;
		public m_rolebk:Laya.Image;
		public m_star:Laya.Image;
		public m_img_role:Laya.Image;
		public m_labelbk:Laya.Image;
		public m_startbtn:Laya.Button;
		public m_gobtn:Laya.Button;
		public m_closebtn:Laya.Button;
		public m_infolabel2:Laya.Label;
		public m_infolabel3:Laya.Label;
		public m_labeltime:Laya.Label;
		public m_titlesucceed:Laya.Image;
		public m_titlefailed:Laya.Image;
		public m_rolefailed:Laya.Image;
		public m_infolabel4:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_catching");

        }

    }
}

module ui.game {
    export class summon_combatUI extends Dialog {
		public img_head1:Laya.Image;
		public img_head2:Laya.Image;
		public img_head3:Laya.Image;
		public img_rim1:Laya.Image;
		public img_rim2:Laya.Image;
		public img_rim3:Laya.Image;
		public lab_name1:Laya.Label;
		public lab_name2:Laya.Label;
		public lab_name3:Laya.Label;
		public btn_2:Laya.Button;
		public btn_1:Laya.Button;
		public btn_3:Laya.Button;
		public lab_lv1:Laya.Label;
		public lab_lv2:Laya.Label;
		public lab_lv3:Laya.Label;
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_combat");

        }

    }
}

module ui.game {
    export class summon_mainUI extends Dialog {
		public img_title:Laya.Image;
		public btn_close:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;
		public red_tab3:Laya.Image;
		public red_tab4:Laya.Image;
		public btn_back:Laya.Button;
		public sprite_lvup:Laya.Sprite;
		public spl_btn_map:Laya.Button;
		public spl_btn_show:Laya.Button;
		public spl_btn_combat:Laya.Button;
		public spl_btn_zz:Laya.Button;
		public spl_btn_change:Laya.Button;
		public spl_btn_prop:Laya.Button;
		public spl_lab_num:Laya.Label;
		public spl_btn_add:Laya.Button;
		public spl_pgbar:Laya.ProgressBar;
		public spl_lab_exp:Laya.Label;
		public spl_btn_auto:Laya.Button;
		public spl_btn_up:Laya.Button;
		public spl_red_up:Laya.Image;
		public spl_red_auto:Laya.Image;
		public spl_img_citem:Laya.Image;
		public spl_lab_citem:Laya.Label;
		public spl_lab_cslv:Laya.Label;
		public spl_lab_name:Laya.Label;
		public spl_lab_lv:Laya.Label;
		public spl_lab_zhanli:Laya.Label;
		public spl_img_mainskill:Laya.Image;
		public spl_img_aptskill:Laya.Image;
		public spl_btn_auto_buy:Laya.Button;
		public spl_red_apt:Laya.Image;
		public spl_red_combat:Laya.Image;
		public sprite_get:Laya.Sprite;
		public spg_btn_map:Laya.Button;
		public spg_btn_prop:Laya.Button;
		public spg_lab_num:Laya.Label;
		public spg_btn_exchange:Laya.Button;
		public spg_red:Laya.Image;
		public spg_lab_name:Laya.Label;
		public spg_lab_zhanli:Laya.Label;
		public spg_img_item:Laya.Image;
		public spg_img_rim:Laya.Image;
		public spg_lab_itemname:Laya.Label;
		public spg_lab_need:Laya.Label;
		public spg_img_s0:Laya.Image;
		public spg_img_sr0:Laya.Image;
		public spg_img_s1:Laya.Image;
		public spg_img_sr1:Laya.Image;
		public spg_img_s2:Laya.Image;
		public spg_img_sr2:Laya.Image;
		public spg_img_s3:Laya.Image;
		public spg_img_sr3:Laya.Image;
		public spg_img_s4:Laya.Image;
		public spg_img_sr4:Laya.Image;
		public spg_img_s5:Laya.Image;
		public spg_img_sr5:Laya.Image;
		public spg_img_s6:Laya.Image;
		public spg_img_sr6:Laya.Image;
		public spg_img_zhu:Laya.Image;
		public sprite_skill:Laya.Sprite;
		public sps_img_mainskill:Laya.Image;
		public sps_lab_mainname:Laya.Label;
		public sps_lab_maindesc:Laya.Label;
		public sps_lab_sname:Laya.Label;
		public sps_img_bg0:Laya.Image;
		public sps_img_skill0:Laya.Image;
		public sps_img_rim0:Laya.Image;
		public sps_img_name_bg0:Laya.Image;
		public sps_lab_name0:Laya.Label;
		public sps_img_bg1:Laya.Image;
		public sps_img_skill1:Laya.Image;
		public sps_img_rim1:Laya.Image;
		public sps_img_name_bg1:Laya.Image;
		public sps_lab_name1:Laya.Label;
		public sps_img_bg2:Laya.Image;
		public sps_img_skill2:Laya.Image;
		public sps_img_rim2:Laya.Image;
		public sps_img_name_bg2:Laya.Image;
		public sps_lab_name2:Laya.Label;
		public sps_img_bg3:Laya.Image;
		public sps_img_skill3:Laya.Image;
		public sps_img_rim3:Laya.Image;
		public sps_img_name_bg3:Laya.Image;
		public sps_lab_name3:Laya.Label;
		public sps_img_bg4:Laya.Image;
		public sps_img_skill4:Laya.Image;
		public sps_img_rim4:Laya.Image;
		public sps_img_name_bg4:Laya.Image;
		public sps_lab_name4:Laya.Label;
		public sps_img_bg5:Laya.Image;
		public sps_img_skill5:Laya.Image;
		public sps_img_rim5:Laya.Image;
		public sps_img_name_bg5:Laya.Image;
		public sps_lab_name5:Laya.Label;
		public sps_btn_book:Laya.Button;
		public sps_red:Laya.Image;
		public img_role:Laya.Image;
		public btn_page_down:Laya.Button;
		public btn_page_up:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_main");

        }

    }
}

module ui.game {
    export class summon_prop_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public img_11:Laya.Image;
		public img_12:Laya.Image;
		public lab_prop1:Laya.Label;
		public lab_p11:Laya.Label;
		public lab_v11:Laya.Label;
		public lab_p12:Laya.Label;
		public lab_v12:Laya.Label;
		public lab_p13:Laya.Label;
		public lab_v13:Laya.Label;
		public img_21:Laya.Image;
		public img_22:Laya.Image;
		public lab_prop2:Laya.Label;
		public lab_p21:Laya.Label;
		public lab_v21:Laya.Label;
		public lab_p22:Laya.Label;
		public lab_v22:Laya.Label;
		public lab_p23:Laya.Label;
		public lab_v23:Laya.Label;
		public lab_p14:Laya.Label;
		public lab_v14:Laya.Label;
		public lab_p24:Laya.Label;
		public lab_v24:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_prop_ui");

        }

    }
}

module ui.game {
    export class summon_ql_infoUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_ql_info");

        }

    }
}

module ui.game {
    export class summon_qualityUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_quality");

        }

    }
}

module ui.game {
    export class summon_skillChgUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public img_icon_p0:Laya.Image;
		public img_rim_p0:Laya.Image;
		public lab_name_p0:Laya.Label;
		public lab_desc_p0:Laya.Label;
		public btn_lock0:Laya.Image;
		public img_icon_p1:Laya.Image;
		public img_rim_p1:Laya.Image;
		public lab_name_p1:Laya.Label;
		public lab_desc_p1:Laya.Label;
		public btn_lock1:Laya.Image;
		public img_icon_p2:Laya.Image;
		public img_rim_p2:Laya.Image;
		public lab_name_p2:Laya.Label;
		public lab_desc_p2:Laya.Label;
		public btn_lock2:Laya.Image;
		public img_icon_p3:Laya.Image;
		public img_rim_p3:Laya.Image;
		public lab_name_p3:Laya.Label;
		public lab_desc_p3:Laya.Label;
		public btn_lock3:Laya.Image;
		public img_icon_p4:Laya.Image;
		public img_rim_p4:Laya.Image;
		public lab_name_p4:Laya.Label;
		public lab_desc_p4:Laya.Label;
		public btn_lock4:Laya.Image;
		public img_icon_p5:Laya.Image;
		public img_rim_p5:Laya.Image;
		public lab_name_p5:Laya.Label;
		public lab_desc_p5:Laya.Label;
		public btn_lock5:Laya.Image;
		public img_icon_n0:Laya.Image;
		public img_rim_n0:Laya.Image;
		public lab_name_n0:Laya.Label;
		public lab_desc_n0:Laya.Label;
		public img_icon_n1:Laya.Image;
		public img_rim_n1:Laya.Image;
		public lab_name_n1:Laya.Label;
		public lab_desc_n1:Laya.Label;
		public img_icon_n2:Laya.Image;
		public img_rim_n2:Laya.Image;
		public lab_name_n2:Laya.Label;
		public lab_desc_n2:Laya.Label;
		public img_icon_n3:Laya.Image;
		public img_rim_n3:Laya.Image;
		public lab_name_n3:Laya.Label;
		public lab_desc_n3:Laya.Label;
		public img_icon_n4:Laya.Image;
		public img_rim_n4:Laya.Image;
		public lab_name_n4:Laya.Label;
		public lab_desc_n4:Laya.Label;
		public img_icon_n5:Laya.Image;
		public img_rim_n5:Laya.Image;
		public lab_name_n5:Laya.Label;
		public lab_desc_n5:Laya.Label;
		public img_cost1:Laya.Image;
		public lab_cost1:Laya.Label;
		public img_cost2:Laya.Image;
		public lab_cost2:Laya.Label;
		public btn_book1:Laya.Button;
		public btn_book2:Laya.Button;
		public btn_confirm:Laya.Button;
		public red_1:Laya.Image;
		public red_2:Laya.Image;
		public lab_skillNum:Laya.Label;
		public lab_goldNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/summon_skillChg");

        }

    }
}

module ui.game {
    export class svr_listUI extends Dialog {
		public m_btnclose:Laya.Button;
		public m_titlepic:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/svr_list");

        }

    }
}

module ui.game {
    export class sys_setUI extends Dialog {
		public btn_confirm:Laya.Button;
		public btn_close:Laya.Button;
		public btn_1:Laya.Button;
		public btn_2:Laya.Button;
		public btn_3:Laya.Button;
		public btn_4:Laya.Button;
		public btn_5:Laya.Button;
		public btn_9:Laya.Button;
		public btn_6:Laya.Button;
		public btn_7:Laya.Button;
		public btn_8:Laya.Button;
		public btn_10:Laya.Button;
		public btn_11:Laya.Button;
		public btn_12:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/sys_set");

        }

    }
}

module ui.game {
    export class text_inputUI extends Dialog {
		public textInput:Laya.TextInput;
		public btn_close:Laya.Button;
		public btn_confirm:Laya.Button;
		public btn_cancle:Laya.Button;
		public label_tip:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/text_input");

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

module ui.game {
    export class total_payUI extends Dialog {
		public btn_back:Laya.Image;
		public label_time:Laya.Label;
		public label_money:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/total_pay");

        }

    }
}

module ui.game {
    export class total_pay_itemUI extends Dialog {
		public img_icon0:Laya.Image;
		public img_rim0:Laya.Image;
		public img_icon1:Laya.Image;
		public img_rim1:Laya.Image;
		public img_icon2:Laya.Image;
		public img_rim2:Laya.Image;
		public img_icon3:Laya.Image;
		public img_rim3:Laya.Image;
		public img_recved:Laya.Image;
		public btn_recv:Laya.Button;
		public btn_pay:Laya.Button;
		public label_money:Laya.Label;
		public label_num0:Laya.Label;
		public label_num1:Laya.Label;
		public label_num2:Laya.Label;
		public label_num3:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/total_pay_item");

        }

    }
}

module ui.game {
    export class total_propUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public img_11:Laya.Image;
		public img_12:Laya.Image;
		public lab_prop1:Laya.Label;
		public lab_p11:Laya.Label;
		public lab_v11:Laya.Label;
		public lab_p12:Laya.Label;
		public lab_v12:Laya.Label;
		public lab_p13:Laya.Label;
		public lab_v13:Laya.Label;
		public img_21:Laya.Image;
		public img_22:Laya.Image;
		public lab_prop2:Laya.Label;
		public lab_p21:Laya.Label;
		public lab_v21:Laya.Label;
		public lab_p22:Laya.Label;
		public lab_v22:Laya.Label;
		public lab_p23:Laya.Label;
		public lab_v23:Laya.Label;
		public lab_p14:Laya.Label;
		public lab_v14:Laya.Label;
		public lab_p24:Laya.Label;
		public lab_v24:Laya.Label;
		public lab_zhanli:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/total_prop");

        }

    }
}

module ui.game {
    export class travel_cb_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public m_list:Laya.List;
		public label_mn:Laya.Label;
		public label_num:Laya.Label;
		public label_exp:Laya.Label;
		public btn_gb:Laya.Button;
		public btn_og:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/travel_cb_ui");

        }

    }
}

module ui.game {
    export class travel_dt_cb_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public m_list:Laya.List;
		public label_mn:Laya.Label;
		public label_num:Laya.Label;
		public label_exp:Laya.Label;
		public btn_gb:Laya.Button;
		public btn_og:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/travel_dt_cb_ui");

        }

    }
}

module ui.game {
    export class travel_dt_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_l:Laya.Button;
		public btn_r:Laya.Button;
		public m_ani:Laya.Animation;
		public img_r1:Laya.Image;
		public img_r0:Laya.Image;
		public img_r2:Laya.Image;
		public m_bar:Laya.ProgressBar;
		public btn_up:Laya.Button;
		public btn_gb:Laya.Button;
		public img_i2:Laya.Image;
		public img_i1:Laya.Image;
		public img_i0:Laya.Image;
		public img_jh:Laya.Image;
		public label_tips:Laya.Label;
		public label_n:Laya.Label;
		public label_n0:Laya.Label;
		public label_n1:Laya.Label;
		public label_n2:Laya.Label;
		public label_lv:Laya.Label;
		public label_b:Laya.Label;
		public label_l0:Laya.Label;
		public label_l1:Laya.Label;
		public label_l2:Laya.Label;
		public label_l3:Laya.Label;
		public m_list:Laya.List;
		public label_mn:Laya.Label;
		public label_num:Laya.Label;
		public label_exp:Laya.Label;
		public btn_to:Laya.Button;
		public img_get:Laya.Image;
		public label_p0:laya.html.dom.HTMLDivElement;
		public label_p1:laya.html.dom.HTMLDivElement;
		public label_p2:laya.html.dom.HTMLDivElement;
		public red_icon:Laya.Image;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/travel_dt_ui");

        }

    }
}

module ui.game {
    export class travel_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public btn_back:Laya.Button;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_l:Laya.Button;
		public btn_r:Laya.Button;
		public m_ani:Laya.Animation;
		public img_r1:Laya.Image;
		public img_r0:Laya.Image;
		public img_r2:Laya.Image;
		public m_bar:Laya.ProgressBar;
		public btn_up:Laya.Button;
		public btn_gb:Laya.Button;
		public img_i2:Laya.Image;
		public img_i1:Laya.Image;
		public img_i0:Laya.Image;
		public img_jh:Laya.Image;
		public label_tips:Laya.Label;
		public label_n:Laya.Label;
		public label_n0:Laya.Label;
		public label_n1:Laya.Label;
		public label_n2:Laya.Label;
		public label_lv:Laya.Label;
		public label_b:Laya.Label;
		public label_l0:Laya.Label;
		public label_l1:Laya.Label;
		public label_l2:Laya.Label;
		public label_l3:Laya.Label;
		public m_list:Laya.List;
		public label_mn:Laya.Label;
		public label_num:Laya.Label;
		public label_exp:Laya.Label;
		public btn_to:Laya.Button;
		public img_get:Laya.Image;
		public label_p0:laya.html.dom.HTMLDivElement;
		public label_p1:laya.html.dom.HTMLDivElement;
		public label_p2:laya.html.dom.HTMLDivElement;
		public red_icon:Laya.Image;
		public red_tab1:Laya.Image;
		public red_tab2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("game/travel_ui");

        }

    }
}

module ui.game {
    export class ui_loadingUI extends Dialog {
		public m_logo:Laya.Image;
		public m_progress:Laya.Label;
		public m_logo_grey:Laya.Image;
		public m_ani:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/ui_loading");

        }

    }
}

module ui.game {
    export class unit_shopUI extends Dialog {
		public title:Laya.Image;
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public label_conditData:Laya.Label;
		public money_type:Laya.Image;
		public money:Laya.Label;
		public btn_tab1:Laya.Button;
		public btn_tab2:Laya.Button;
		public btn_tab3:Laya.Button;
		public btn_tab4:Laya.Button;
		public red_p1:Laya.Image;
		public red_p2:Laya.Image;
		public red_p3:Laya.Image;
		public red_p4:Laya.Image;
		public label_tab1:Laya.Label;
		public label_tab2:Laya.Label;
		public label_tab3:Laya.Label;
		public label_tab4:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/unit_shop");

        }

    }
}

module ui.game {
    export class vip_uiUI extends Dialog {
		public btn_close:Laya.Button;
		public pro_bar:Laya.ProgressBar;
		public label_bar:Laya.Label;
		public label_l0:Laya.Label;
		public label_money:Laya.Label;
		public m_list:Laya.List;
		public btn_back:Laya.Button;
		public m_rlist:Laya.List;
		public btn_next:Laya.Image;
		public btn_last:Laya.Image;
		public btn_get:Laya.Button;
		public img_get:Laya.Image;
		public label_vip:Laya.Label;
		public label_l1:Laya.Label;
		public img_vip0:Laya.Image;
		public img_i0:Laya.Image;
		public img_i1:Laya.Image;
		public img_vip1:Laya.Image;
		public label_tips:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/vip_ui");

        }

    }
}

module ui.game {
    export class wb_detailUI extends Dialog {
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public boss_img:Laya.Image;
		public boss_name:Laya.Label;
		public boss_hpp:Laya.ProgressBar;
		public boss_hp_label:Laya.Label;
		public lv_label:Laya.Label;
		public enough_label:Laya.Label;
		public escape_time:Laya.Label;
		public sub_title1:Laya.Image;
		public grid1_0:Laya.Image;
		public rim1_0:Laya.Image;
		public reward1_0:Laya.Image;
		public r1_num0:Laya.Label;
		public grid1_1:Laya.Image;
		public rim1_1:Laya.Image;
		public reward1_1:Laya.Image;
		public r1_num1:Laya.Label;
		public grid1_2:Laya.Image;
		public rim1_2:Laya.Image;
		public reward1_2:Laya.Image;
		public r1_num2:Laya.Label;
		public grid2_0:Laya.Image;
		public rim2_0:Laya.Image;
		public reward2_0:Laya.Image;
		public r2_num0:Laya.Label;
		public grid2_1:Laya.Image;
		public rim2_1:Laya.Image;
		public reward2_1:Laya.Image;
		public r2_num1:Laya.Label;
		public grid2_2:Laya.Image;
		public rim2_2:Laya.Image;
		public reward2_2:Laya.Image;
		public r2_num2:Laya.Label;
		public user_head:Laya.Image;
		public keeper_label:Laya.Label;
		public kill_time:Laya.Label;
		public keeper_hpp:Laya.ProgressBar;
		public keeper_hp_label:Laya.Label;
		public fight_btn:Laya.Button;
		public add_btn:Laya.Image;
		public tool_num_label:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/wb_detail");

        }

    }
}

module ui.game {
    export class wb_itemUI extends Dialog {
		public boss_name:Laya.Label;
		public boss_img:Laya.Image;
		public refresh_tips:Laya.Label;
		public escape_tips:Laya.Label;
		public timer_label:Laya.Label;
		public lock_tips:Laya.Label;
		public entry_btn:Laya.Button;
		public btn_info:Laya.Image;
		public boss_lv_label:Laya.Label;
		public kill_seal:Laya.Image;
		public refresh_seal:Laya.Image;
		public escape_seal:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/wb_item");

        }

    }
}

module ui.game {
    export class wild_bossUI extends Dialog {
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public title:Laya.Image;
		public p_boss_btn:Laya.Button;
		public red_p0:Laya.Image;
		public com_boss_btn:Laya.Button;
		public red_p1:Laya.Image;
		public wild_boss_btn:Laya.Button;
		public red_p2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/wild_boss");

        }

    }
}

module ui.game {
    export class world_mapUI extends Dialog {
		public panel_map:Laya.Panel;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/world_map");

        }

    }
}

module ui.game {
    export class xy_welfare_uiUI extends Dialog {
		public img_role0:Laya.Image;
		public img_role1:Laya.Image;
		public img_role2:Laya.Image;
		public label_name0:Laya.Label;
		public label_name1:Laya.Label;
		public label_name2:Laya.Label;
		public label_lvl0:Laya.Label;
		public label_lvl1:Laya.Label;
		public label_lvl2:Laya.Label;
		public btn_help:Laya.Button;
		public label_lv:Laya.Label;
		public label_jf:Laya.Label;
		public btn_goto:Laya.Label;
		public m_pro:Laya.ProgressBar;
		public img_bx0:Laya.Image;
		public img_bx1:Laya.Image;
		public img_bx2:Laya.Image;
		public img_f0:Laya.Image;
		public img_f1:Laya.Image;
		public img_f2:Laya.Image;
		public img_icon:Laya.Image;
		public img_rim:Laya.Image;
		public label_num:Laya.Label;
		public btn_lq:Laya.Button;
		public img_ig:Laya.Image;
		public btn_back:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/xy_welfare_ui");

        }

    }
}

module ui.game {
    export class zkzgUI extends Dialog {
		public closeBtn:Laya.Image;
		public backBtn:Laya.Image;
		public left_arrow:Laya.Image;
		public right_arrow:Laya.Image;
		public panelglass:Laya.Image;
		public fb_name:Laya.Label;
		public room_sprite:Laya.Sprite;
		public team_list:Laya.List;
		public player_name:Laya.Label;
		public player_num:Laya.Label;
		public join_btn:Laya.Image;
		public auto_join:Laya.Label;
		public check_btn:Laya.Image;
		public create_team:Laya.Button;
		public match_team:Laya.Button;
		public team_sprite:Laya.Sprite;
		public team_detail_list:Laya.List;
		public player_icon:Laya.Image;
		public p_name:Laya.Label;
		public leader_img:Laya.Image;
		public fire_btn:Laya.Image;
		public player_lv:Laya.Label;
		public player_CE:Laya.Label;
		public af_label:Laya.Label;
		public auto_fight_btn:Laya.Image;
		public exit_btn:Laya.Button;
		public fight_btn:Laya.Button;
		public income_label:Laya.Label;
		public zkzg_btn:Laya.Button;
		public gift0:Laya.Image;
		public gift1:Laya.Image;
		public gift2:Laya.Image;
		public gift3:Laya.Image;
		public gift4:Laya.Image;
		public gift5:Laya.Image;
		public gift6:Laya.Image;
		public rim0:Laya.Image;
		public rim1:Laya.Image;
		public rim2:Laya.Image;
		public rim3:Laya.Image;
		public rim4:Laya.Image;
		public rim5:Laya.Image;
		public rim6:Laya.Image;
		public gift_num0:Laya.Label;
		public gift_num1:Laya.Label;
		public gift_num2:Laya.Label;
		public gift_num3:Laya.Label;
		public gift_num4:Laya.Label;
		public gift_num5:Laya.Label;
		public gift_num6:Laya.Label;
		public red_p0:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/zkzg");

        }

    }
}

module ui.game {
    export class zkzg_fbitemUI extends Dialog {
		public selected:Laya.Image;
		public fb_name:Laya.Label;
		public boss_img:Laya.Image;
		public disable_tips:Laya.Label;
		public img_rim0:Laya.Image;
		public reward0:Laya.Image;
		public img_rim1:Laya.Image;
		public reward1:Laya.Image;
		public label0:Laya.Label;
		public label1:Laya.Label;
		public label_stjl:Laya.Label;
		public tgjl:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("game/zkzg_fbitem");

        }

    }
}
