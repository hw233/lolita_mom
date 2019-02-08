module base {
    //玩家描述
    export class Player {
        public m_id: number = 0;
        public m_name: string = "";
        public m_shape: number = 0;
        public m_desc: Laya.Byte = null;
        public m_grade: number = 0;
        public m_classes: number = 0;
        public m_battlevalue: number = 0;
        public m_vip: number = 0;
        public m_gangid: number = 0;
        public m_gangname: string = "";
        public m_sign: string = "";
        public m_isfriend: number = 0;
        public m_isblack: number = 0;
        public m_online: number = 0;
        public m_getcoin: number = 0;
        public m_chattime: number = 0;
        public m_svr_id: number = 0;

        constructor() {
        }

        public dispose() {
        }
    }

    //技能描述
    export class Skill {
        public m_id: number = 0;
        public m_lv: number = 0;
        public m_icon: number = 0;
        public m_cost: number = 0; // 升级消耗，为0时不能升级
        public m_costonce: number = 0;  // 一键升级，为0时不能升级

        constructor() {
        }

        public dispose() {
        }
    }
}