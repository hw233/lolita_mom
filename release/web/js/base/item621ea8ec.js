var base;
(function (base) {
    // 物品类
    var Item = /** @class */ (function () {
        function Item() {
            this.m_id = 0; //唯一id
            this.m_shape = 0; //类型
            this.m_name = ""; //名字
            this.m_type = 0; //类型
            this.m_quality = 0; //品质
            this.m_amount = 0; //数量
            this.m_lv = 0; //穿戴等级
            this.m_icon = 0; //icon编号
            this.m_rim = 0; //初始边框
            this.m_desc = ""; //文字描述
            this.m_pos = 0; //位置
            this.m_score = 0; //评分
            this.m_prop_arr = []; //属性
            this.m_use = 0; //使用标记
            this.m_b_own = false; //是否拥有
            this.m_cps_num = 0; //合成所需数量
            this.m_add_lv = 0; //附加等级，配合附加属性
            this.m_add_prop_arr = []; //附加属性
            this.m_jlv = 0; //阶数
        }
        Item.prototype.dispose = function () {
        };
        return Item;
    }());
    base.Item = Item;
    //器灵
    var Qiling = /** @class */ (function () {
        function Qiling() {
            this.m_lv = 0; //等级
            this.m_pos = 0; //位置
            this.m_battle = 0; //战力
            this.m_jp_prop = []; //极品属性
        }
        return Qiling;
    }());
    base.Qiling = Qiling;
})(base || (base = {}));
//# sourceMappingURL=item.js.map