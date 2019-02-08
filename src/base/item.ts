module base {
    // 物品类
    export class Item {
        public m_id = 0;  //唯一id
        public m_shape: number = 0;  //类型
        public m_name: string = "";  //名字
        public m_type: number = 0;   //类型
        public m_quality: number = 0;//品质
        public m_amount: number = 0; //数量
        public m_lv: number = 0;     //穿戴等级
        public m_icon: number = 0;   //icon编号
        public m_rim: number = 0;    //初始边框
        public m_desc: string = "";  //文字描述
        public m_pos: number = 0;    //位置
        public m_score: number = 0;  //评分
        public m_prop_arr: Array<any> = [];  //属性
        public m_use: number = 0;    //使用标记
        public m_b_own: boolean = false;//是否拥有
        public m_cps_num: number = 0;    //合成所需数量
        public m_add_lv: number = 0; //附加等级，配合附加属性
        public m_add_prop_arr: Array<any> = [];  //附加属性
        public m_jlv: number = 0;    //阶数

        constructor() {
        }

        public dispose() {
        }
    }

    //器灵
    export class Qiling {
        public m_lv: number = 0; //等级
        public m_pos: number = 0; //位置
        public m_battle: number = 0; //战力
        public m_jp_prop: Array<any> = []; //极品属性
    }
}