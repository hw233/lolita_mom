module game_lang{
    export const L_LOADING_TIPS_MAP:Object = 
    {
        0:"万圣公主买了一辆南瓜马车",
        1:"孙悟空正在穿虎皮小短裙",
        2:"唐僧念完了一段大悲咒",
        3:"白龙马在挑选马蹄铁",
        4:"猪八戒走在去高老庄的路上",
        5:"沙和尚深深的打了一个哈欠",
        6:"主城在做最后的装修",
        7:"蜘蛛精正在做美甲",
        8:"白骨精在物色新的皮囊",
        9:"牛魔王急匆匆的赶向积雷山",
        10:"铁扇公主给了红孩儿一巴掌",
        11:"大雁神塔中传来了嘈杂的声音",
        12:"无名鬼城好像有什么正在醒来",
        13:"普陀山的大门徐徐打开",
        14:"竞技场的钟声渐渐传来",
        15:"嫦娥在研究兔子的十种炖法",
        16:"黑无常正在涂BB霜",
        17:"白无常正在晒日光浴",
    };
}
module game{
    export const PROP_MAP:Object = 
    {
        0x80:"生命",
        0x81:"攻击",
        0x82:"防御",
        0x83:"速度",
        0x84:"暴击",
        0x85:"抗暴",
        0x86:"命中",
        0x87:"闪避",
        0x90:"真实伤害",
        0x91:"真实免伤",
        0x92:"伤害增加",
        0x93:"伤害减免",
        0x94:"暴伤增加",
        0x95:"暴伤减免",
        0x96:"PVP增伤",
        0x97:"PVP免伤",
        0x98:"PVE增伤",
        0x99:"PVE免伤",
        0xb0:"战力"
    };
    export const PROP_KEY_MAP:Object = 
    {
        "hp":"生命",
        "atk":"攻击",
        "def":"防御",
        "spd":"速度",
        "cri":"暴击",
        "res":"抗暴",
        "hit":"命中",
        "dod":"闪避",
    };

    // 常用提示
    export const L_SHIJIE:string = "世界";
    export const L_BANGPAI:string = "帮派";
    export const L_XITONG:string = "系统";
    export const L_KUAFU:string = "跨服";
    export const L_YEAR:string = "年";
    export const L_MONTH:string = "月";
    export const L_DAY:string = "日";
    export const L_TIAN:string = "天";
    export const L_XIAOSHI:string = "小时";
    export const L_SHI:string = "时";
    export const L_FEN:string = "分";
    export const L_MIAO:string = "秒";
    export const L_WAN:string = "万";
    export const L_YI:string = "亿";
    export const L_GUAN:string = "关";
    export const L_WU:string = "无";
    export const L_REN:string = "人";
    export const L_JINRU:string = "进入";
    export const L_JIBAI:string = "击败";
    export const L_JIANGLI:string = "奖励";
    export const L_HUODELE:string = "获得";
    export const L_VIP:string = "VIP";
    export const L_MONTHCARD:string = "月卡";
    export const L_FOREVERCARD:string = "终身卡";
    export const L_JI:string = "级";
    export const L_NAN:string = "男";
    export const L_NV:string = "女";
    export const L_DI:string = "第";
    export const L_MING:string = "名"
    export const L_LV:string = "Lv.";
    export const L_SCORE:string = "评分: ";
    export const L_DADAO:string = "达到";
    export const L_JIE:string = "阶";
    export const L_KELINGQU:string = "可领取";
    export const L_PINGFEN:string = "评分";
    export const L_BUWEI:string = "部位";
    export const L_DENGJI:string = "等级";
    export const L_CSBZ:string = "次数不足";
    export const L_EXP:string = "经验";
    export const L_TEQUAN:string = "特权";
    export const L_SHOUCHONG:string = "首充";
    export const L_TEMAI:string = "特卖";
    export const L_MORE:string = "再";
    export const L_DANG:string = "档";
    export const L_NEED:string = "需";
    export const L_NODATA:string = "暂无数据";

    export const L_NICHENG:string = "昵称";
    export const L_ZHANLI:string = "战力";
    export const L_RENSHU:string = "人数";
    export const L_WIN:string = "胜场：";
    export const L_LOSE:string = "败场：";
    export const L_SHENGLV:string = "胜率：";

    export const L_YBSLBZ:string = "元宝不足";
    export const L_BDYBSLBZ:string = "绑定元宝不足";
    export const L_YZSLBZ:string = "银子不足";
    export const L_COSTGOLDTIPS:string = "当前绑定元宝不足，是否花费元宝补足？";
    export const L_YBBZ:string = "元宝不足，是否前往充值？";

    export const L_LVMAX:string = "已达到最高等级";
    export const L_LVMAX2:string = "已满级";
    export const L_UNLEARNED:string = "未学习";
    export const L_ZANWEIKAIFANG:string = "暂未开放";
    export const L_WANCHENG:string = "完成";
    export const L_WEIWANCHENG:string = "未完成";
    export const L_WEIJIHUO:string="未激活";
    export const L_JIHUO:string="激活";
    export const L_WSUCCESS:string = "成功";
    export const L_WFAIL:string = "失败";
    export const L_BANGGONG:string = "帮贡";
    export const L_ZAIXIAN:string = "在线";
    export const L_LIXIAN:string = "离线";
    export const L_LIXIANSHIJIAN:string = "离线时间";
    export const L_LNONE:string = "不足";
    export const L_DENGJIBUZU:string = "帮派等级不足";
    export const L_SHOUYICISHUBUZU:string = "收益次数不足";
    export const L_SHIFOUTUICHUDUIWU:string = "正在其他队伍中，是否退出原队伍";
    export const L_ZHENGZAIQITADUIWUZHZONG:string = "正在其他队伍中，无法加入";
    export const L_YIJINGZAIDUIWUZHONG:string = "已经在队伍中";
    export const L_KUOHAOWU:string = "（无）";
    export const L_WAITINGPLEASE:string = "敬请期待";
    export const L_BUKEQIUZHU:string = "已无次数，不可发起求助";
    export const L_NOBUYGROWUP: string = "你尚未购买成长基金";
    export const L_YBSLBZGOBUY: string = "元宝不足，请充值购买";
    export const L_TOMORROWGET: string = "明天再来领取奖励吧";
    export const L_HAVEBUY: string = "已购买";
    export const L_CROSSSERVERBAN:string = "跨服不允许此操作";
    export const L_WARBAN:string = "当前战斗不允许此操作";
    export const L_SENDOK:string = "发送成功";
    export const L_WAIT:string = "请稍后再试";
    
    // 常用提示end

    // 按钮文字
    export const BTNLABELQL:string = "领   取";
    export const BTNLABELYQL:string = "已领取";
    export const BTNLABELQWJS:string = "前往击杀";

    export const TABBTNSTRINGZB:string = "装 备";
    export const TABBTNSTRINGJN:string = "技 能";
    export const TABBTNSTRINGZQ:string = "坐 骑";
    export const TABBTNSTRINGYY:string = "羽 翼";
    export const TABBTNSTRINGSJ:string = "升 级";
    export const TABBTNSTRINGDS:string = "打 书";
    export const TABBTNSTRINGGH:string = "光 环";
    export const TABBTNSTRINGSL:string = "兽 魂";
    export const TABBTNSTRINGXL:string = "仙 侣";
    export const TABBTNSTRINGSX:string = "升 星";
    export const TABBTNSTRINGXW:string = "仙 阵";
    export const TABBTNSTRINGXZ:string = "境 界";
    export const TABBTNSTRINGGW:string = "光 武";
    export const TABBTNSTRINGJL:string = "精 灵";
    export const TABBTNSTRINGDY:string = "丹 药";
    export const TABBTNSTRINGJM:string = "经 脉";

    export const BTNSHENQING:string = "申  请";
    export const BTNTONGGUO:string = "通  过";
    export const BTNJUJUE:string = "拒  绝";
    export const BTNTICHU:string = "踢  出";
    export const BTNSHEZHIZHIWEI:string = "设置职位";
    export const BTNSHENGJI:string = "升  阶";
    export const BTNZIDONGSHENGJI:string = "自动升阶";
    export const BTNZIDONGSHENGJI2:string = "自动升级";
    export const BTNQUXIAOZIDONG:string = "取消自动";
    export const BTNJIHUO:string = "激  活";
    export const BTNHUANHUA:string = "幻  化";
    export const BTNTUPO:string = "突  破";
    export const L_BTNQIANWANG:string = "前  往";
    export const L_BTNSHIYONG:string = "使  用";
    export const L_BTNHECHENG:string = "合  成";

    export const L_BTNZHANSHI:string = "展示";
    // 按钮文字end

    export const L_DEFAULT_SIGN:string = "一起加油吧";  // 默认签名
    export const L_SHENGYU:string = "剩余";
    export const L_CI:string = "次";
    export const L_QUEDING:string = "确定";
    export const L_XIUXI:string = "休息";
    export const L_CANZHAN:string = "参战";
    export const L_SHENGYUSHIJIAN:string = "剩余时间";
    
    export const L_WEIKAIQI:string = "未开启";

    export const L_JICHUSHUXING:string = "基础属性";
    export const L_FUJIASHUXING: string = "附加属性";
    export const L_SHULIANG:string = "数量";
    export const L_SHULIANGBUZU:string = "数量不足";
    export const L_YOUJIAN:string = "邮件";
    export const L_HAOYOU:string = "好友";
    export const L_GEXINGQIANMING:string = "默认个性签名";
    export const L_BANGDINGYUANBAO:string = "绑定元宝";
    export const L_BAGNOTENOUGH:string = "当前背包装备空位不足，是否进行熔炼？";
    export const L_RONGLIANVIP8:string = "VIP8以上才能开启自动熔炼";
    
    export const L_CHAPTER0:string = "今日被协助次数已满";
    export const L_CHAPTER1:string = "累积星星数未达到要求";
    export const L_CHAPTER2:string = "协助请求每30秒只能发布一次";
    export const L_CHAPTER3:string = "江湖救急";
    export const L_CHAPTER4:string = "求大神帮过";

    export const L_MAIN0:string = "预加载资源失败";
    export const L_MAIN1:string = "加载场景资源失败";

    export const L_LOGIN0:string = "请输入登录账号";
    export const L_LOGIN1:string = "请输入登录密码";
    export const L_LOGIN2:string = "请选择登录服务器";

    // export const L_PATROL0:string = "巡逻关闭";
    // export const L_PATROL1:string = "巡逻打开";

    export const L_WACCOUNT0:string = "请输入登录账号";

    export const L_WCHANGENAME0:string = "请输入昵称";
    export const L_WCHANGENAME1:string = "首次改名免费，每天仅可修改一次";
    export const L_WCHANGENAME2:string = "本次改名需要消耗200元宝，每天仅可修改一次";
    export const L_WCHANGENAME3:string = "秒后自动创建角色并进入游戏";
    export const L_WCHANGENAME4:string = "昵称过长，请重新输入";
    export const L_WCHANGENAME5:string = "宠物改名免费，最多输入4个字";

    export const L_WCHAPTERBTN0:string = "前往新地图";
    export const L_WCHAPTERBTN1:string = "已全部通关\n请期待新图";

    export const L_WCHAPTERMAIN0:string = "已求助次数";
    export const L_WCHAPTERMAIN1:string = "已协助他人次数";
    export const L_WCHAPTERMAIN2:string = "波小怪后即可挑战BOSS";

    export const L_WCOMMONBOSS0:string = "后重生";
    export const L_WCOMMONBOSS1:string = "正在战斗中，请稍后再挑战";
    export const L_WCOMMONBOSS2:string = "数量不足";
    export const L_WCOMMONBOSS3:string = "争夺人数";
    export const L_WCOMMONBOSS4:string = "级可挑战";

    export const L_SFHF:string = "是否花费";
    export const L_BYWC:string = "元宝完成";
    export const L_BYZH:string = "元宝找回";
    export const L_HRW:string = "环任务";
    export const L_SY:string = "所有";
    export const L_JX:string = "进行";

    export const L_WDAILY300_0:string = "当前环数";
    export const L_WDAILY300_1:string = "当前没有可领取的奖励";
    export const L_WDAILY300_3:string = "VIP6以上开启";
    export const L_WDAILY300_4:string = "任务已完成";
    export const L_WDAILY300_7:string = "完成100环奖励";
    export const L_WDAILY300_8:string = "完成200环奖励";
    export const L_WDAILY300_9:string = "完成300环奖励";

    export const L_WDAILYFUMO0:string = "当前环数";
    export const L_WDAILYFUMO2:string = "任务已全部完成";
    export const L_WDAILYFUMO6:string = "当前地图没有可以挑战的妖怪";

    export const L_WMAIN0:string = "未读";
    export const L_WMAIN1:string = "已读";
    
    export const L_WMAINEQUIPUI0:string = "操作id";

    export const L_WMAINSKILLUI0:string = "开启";
    export const L_WMAINSKILLUI1:string = "已满级";
    export const L_WMAINSKILLUI2:string = "该技能未解锁";
    export const L_WMAINSKILLUI3:string = "该技能已满级";
    export const L_WMAINSKILLUI4:string = "经验不足";
    export const L_WMAINSKILLUI5:string = "技能效果";
    export const L_WMAINSKILLUI6:string = "下一级效果";
    export const L_WMAINSKILLUI7:string = "操作频率过快 请稍后再试";
    export const L_WMAINSKILLUI8:string = "技能不存在";
    export const L_WMAINSKILLUI9:string = "经验不足";
    export const L_WMAINSKILLUI10:string = "需要人物达到";
    export const L_WMAINSKILLUI11:string = "该技能尚未激活";
    export const L_WMAINSKILLUI12:string = "资质1级激活";
    export const L_WMAINSKILLUI13:string = "没有该等级配置";

    export const L_WZJN:string = "未知技能";
    export const L_YGWPZJN:string = "一个未配置的技能";

    export const L_WARENA0:string = "您现在无需购买挑战次数";
    export const L_WARENA1:string = "不可以挑战自己";
    export const L_WARENA2:string = "每天可再购买";
    export const L_WARENA3:string = "不变";
    export const L_WARENA4:string = "领取奖励";

    export const L_WOFFLINEINCOME0:string = "离线时间";
    export const L_WOFFLINEINCOME1:string = "最多累积6小时离线收益";
    export const L_WOFFLINEINCOME2:string = "背包已满，自动熔炼<span color='#12a710'>";
    export const L_WOFFLINEINCOME3:string = "</span>件装备";

    export const L_WGERENBOSS0:string = "正在战斗中，请稍后再挑战";
    export const L_WGERENBOSS1:string = "剩余次数：0次";
    export const L_WGERENBOSS2:string = "剩余次数：1次";
    export const L_WGERENBOSS3:string = "级可挑战";

    export const L_WPURCHASEPAGE0:string = "限购";
    export const L_WPURCHASEPAGE1:string = "尚未解锁";

    export const L_WRANK0:string = "未上榜";
    export const L_WRANK1:string = "榜上无名，再接再厉";

    export const L_WRONGLIAN0:string = "已选";
    
    export const L_WSHOP0:string = "限购";
    export const L_WSHOP1:string = "解锁";
    export const L_WSHOP2:string = "材料商店";
    export const L_WSHOP3:string = "装备商店";

    export const L_WSUMMONCATCHING0:string = "捕捉";
    export const L_WSUMMONCATCHING1:string = "卡";
    export const L_WSUMMONCATCHING2:string = "宠物宝宝逃跑了";
    export const L_WSUMMONCATCHING3:string = "获得";
    export const L_WSUMMONCATCHING4:string = "你偶遇到了一只宝宝，是否进行抓捕?";
    export const L_WSUMMONCATCHING5:string = "当前场景不能进行抓捕";
    export const L_WSUMMONCATCHING6:string = "是否领取抓捕奖励";
    export const L_WSUMMONCATCHING7:string = "遭遇宠物";
    export const L_WSUMMONCATCHING8:string = "#D&，#C18&捕捉成功#D&";
    export const L_WSUMMONCATCHING9:string = "#D&，#C20&捕捉失败#D&";
    export const L_WSUMMONCATCHING10:string = "是否自动抓宠";
    
    export const L_WESCORT0:string = "押镖中";
    export const L_WESCORT1:string = "今天押镖次数已用完";
    export const L_WESCORT2:string = "已是最高品质镖车";
    export const L_WESCORT3:string = "拦截了我的";
    export const L_WESCORT4:string = "复仇";
    export const L_WESCORT5:string = "复仇成功";
    export const L_WESCORT6:string = "复仇失败";
    export const L_WESCORT7:string = "我拦截了";
    export const L_WESCORT8:string = "是否花费300元宝立即完成本次押镖";
    export const L_WESCORT9:string = "防守失败";
    export const L_WESCORT10:string = "防守成功";
    export const L_WESCORT11:string = "不能拦截自己的镖车";
    export const L_WESCORT12:string = "今天劫镖次数已用完";
    export const L_WESCORT13:string = "是否花费1个橙镖令立即刷新至橙色镖车？";
    export const L_WESCORT14:string = "是否花费500绑定元宝立即刷新至橙色镖车？";
    export const L_WESCORT15:string = "是否花费500元宝立即刷新至橙色镖车？";
    export const L_WESCORT16:string = "当前时间段没有双倍奖励，是否仍然押镖？<br/>双倍奖励时间段为每天上午11：00~13:00和<br/>23:00~01:00";
    export const L_WESCORT17:string = "开始押镖";
    export const L_WESCORT18:string = "一键完成";
    export const L_WESCORTCAR0:string = "白色镖车";
    export const L_WESCORTCAR1:string = "绿色镖车";
    export const L_WESCORTCAR2:string = "蓝色镖车";
    export const L_WESCORTCAR3:string = "紫色镖车";
    export const L_WESCORTCAR4:string = "橙色镖车";

    export const L_WFIRST0:string = "新秀组 (100~119级)";
    export const L_WFIRST1:string = "精锐组 (120~139级)";
    export const L_WFIRST2:string = "凌云组 (140~159级)";
    export const L_WFIRST3:string = "惊世组 (160~179级)";
    export const L_WFIRST4:string = "无双组 (180~200级)";
    export const L_WFIRSTEND0:string = "本周新秀组冠军";
    export const L_WFIRSTEND1:string = "本周精锐组冠军";
    export const L_WFIRSTEND2:string = "本周凌云组冠军";
    export const L_WFIRSTEND3:string = "本周惊世组冠军";
    export const L_WFIRSTEND4:string = "本周无双组冠军";
    export const L_WFIRSTPR3:string = "16强晋升8强";
    export const L_WFIRSTPR4:string = "8强晋升4强";
    export const L_WFIRSTPR5:string = "半决赛";
    export const L_WFIRSTPR6:string = "决赛";
    export const L_WFIRST5:string = "请选择押注玩家";
    export const L_WFIRST6:string = "请选择押注玩家";
    export const L_WFIRSTBET1:string = "普通押注";
    export const L_WFIRSTBET2:string = "特级押注";
    export const L_WFIRSTBET3:string = "超级押注";
    export const L_WFIRSTRR:string = "正确奖励：";
    export const L_WFIRSTFR:string = "错误奖励：";

    export const L_WEQUIP0:string="武器";
    export const L_WEQUIP1:string="项链";
    export const L_WEQUIP2:string="护肩";
    export const L_WEQUIP3:string="护腕";
    export const L_WEQUIP4:string="戒子";
    export const L_WEQUIP5:string="头盔";
    export const L_WEQUIP6:string="衣服";
    export const L_WEQUIP7:string="腰带";
    export const L_WEQUIP8:string="裤子";
    export const L_WEQUIP9:string="鞋子";
    export const L_WEQUIP10:string="阶";
    export const L_WEQUIP11:string="未激活";
    export const L_WEQUIP12:string="宝石";
    export const L_WEQUIP13:string="强化";
    export const L_WEQUIP14:string="锻炼";
    export const L_WEQUIP15:string="精炼";
    export const L_WEQUIP16:string="全身强化";
    export const L_WEQUIP17:string="全身锻炼";
    export const L_WEQUIP18:string="全身精炼";
    export const L_WEQUIP19:string="全身宝石";
    export const L_WEQUIP20:string="升阶可提升";

    export const L_WFRIEND0:string="已向对方提出申请，请耐心等待";
    export const L_WFRIEND1:string="发出好友申请，请耐心等待!";
    export const L_WFRIEND2:string="玩家";
    export const L_WFRIEND3:string="请求添加你为好友。";
    export const L_WFRIEND4:string="恭喜与";
    export const L_WFRIEND5:string="成为了好友。";
    export const L_WFRIEND6:string="确定要与";
    export const L_WFRIEND7:string="解除好友关系吗？";
    export const L_WFRIEND8:string="确定要将";
    export const L_WFRIEND9:string="加入屏蔽列表吗？屏蔽后将无法接收到对方的聊天信息与所有消息。";
    export const L_WFRIEND10:string="已达到当日赠送上限";
    export const L_WFRIEND11:string="向您赠送了金币";
    export const L_WFRIEND12:string="已达到当日领取上限";
    export const L_WFRIEND13:string="添加失败，好友数量已达上限";
    export const L_WFRIEND14:string="想经常保持联系就把对方";
    export const L_WFRIEND15:string="加为好友";
    export const L_WFRIEND16:string="吧";
    export const L_WFRIEND17:string="等级不到20，不能添加好友 ";

    export const L_WWORLDMAP0:string = "已通关";
    export const L_WWORLDMAP1:string = "冒险中...";
    export const L_WWORLDMAP2:string = "进入条件<br/>击杀<span color='#12a710'>";
    export const L_WWORLDMAP3:string = "</span>所有头目";
    export const L_WWORLDMAP4:string = "人物等级需达到";

    export const L_NETCLOSE:string = "与服务器断开连接，请退出重新登录";
    export const L_NETERROR:string = "网络出错与服务器断开连接，请退出重新登录";
    
    export const L_COMMON: string = "通用";
    export const L_EQUIP_POS_MAP: Object = {
        101:"武器",
        102:"项链",
        103:"护肩",
        104:"护腕",
        105:"戒指",
        106:"头盔",
        107:"衣服",
        108:"腰带",
        109:"裤子",
        110:"鞋子",
        111:"坐骑符文",
        112:"坐骑符文",
        113:"坐骑符文",
        114:"坐骑符文",
        115:"羽翼符文",
        116:"羽翼符文",
        117:"羽翼符文",
        118:"羽翼符文",
        119:"羽翼符文",
        120:"羽翼符文",
        121:"羽翼符文",
        122:"羽翼符文",
        123:"兽魂符文",
        124:"兽魂符文",
        125:"兽魂符文",
        126:"兽魂符文",
        127:"光环符文",
        128:"光环符文",
        129:"光环符文",
        130:"光环符文",
        131:"境界符文",
        132:"境界符文",
        133:"境界符文",
        134:"境界符文",
        135:"光武符文",
        136:"光武符文",
        137:"光武符文",
        138:"光武符文",
        139:"精灵符文",
        140:"精灵符文",
        141:"精灵符文",
        142:"精灵符文",
        159:"器灵武器",
        160:"器灵项链",
        161:"器灵护肩",
        162:"器灵护腕",
        163:"器灵戒指",
        164:"器灵头盔",
        165:"器灵衣服",
        166:"器灵腰带",
        167:"器灵裤子",
        168:"器灵鞋子"
    }

    //宠物/仙侣
    export const SUMMONPROP_TITLE_ARR:Array<string> = ["宠物属性","资质属性"]; 
    export const PARTNERPROP_TITLE_ARR:Array<string> = ["仙侣属性"]; 
    export const L_DQCWWJH:string = "当前宠物未激活"; 
    export const L_DQXLWJH:string = "当前仙侣未激活"; 
    export const L_LVLESSPLAYER:string = "等级不能超过人物等级";
    export const L_XLZDJDD:string = "仙侣总等阶达到";
    export const L_KJH:string = "阶可激活";
    export const L_JINENGGESHENGJI:string = "技能格升级";
    //宠物/仙侣end
    //养成
    export const OPEN_LV_ARR:Object = ["2阶激活","4阶激活","5阶激活","7阶激活"];
    export const PROP_TITLE_ARR:Array<string> = ["升阶属性","符文属性","技能属性","皮肤属性","属性丹属性"]; 
    export const L_DEVELOPSKILL1:string = "坐骑技能";
    export const L_DEVELOPEQUIP1:string = "坐骑符文";
    export const L_DEVELOPSKILL2:string = "羽翼技能";
    export const L_DEVELOPEQUIP2:string = "羽翼符文";
    export const L_DEVELOPSKILL3:string = "光环技能";
    export const L_DEVELOPEQUIP3:string = "光环符文";
    export const L_DEVELOPSKILL4:string = "兽魂技能";
    export const L_DEVELOPEQUIP4:string = "兽魂符文";
    export const L_DEVELOPSKILL5:string = "仙阵技能";
    export const L_DEVELOPEQUIP5:string = "仙阵符文";
    export const L_DEVELOPSKILL6:string = "境界技能";
    export const L_DEVELOPEQUIP6:string = "境界符文";
    export const L_DEVELOPSKILL7:string = "光武技能";
    export const L_DEVELOPEQUIP7:string = "光武符文";
    export const L_DEVELOPSKILL8:string = "精灵技能";
    export const L_DEVELOPEQUIP8:string = "精灵符文";

    export const L_DEVELOPSKIN1:string = "皮肤总战力：";
    export const L_DEVELOPSKIN2:string = "已激活皮肤：";
    export const L_DEVELOPSKIN3:string = "时装总战力：";
    export const L_DEVELOPSKIN4:string = "已激活时装：";
    export const L_DEVELOPSKIN5:string = "称号总战力：";
    export const L_DEVELOPSKIN6:string = "已激活称号：";

    export const L_WEIKAIFANG:string = "未开放";
    export const L_WEIDASHU:string = "未打书";
    export const L_BTNDASHU:string = "打    书";
    //养成end

    export const L_WSUMMONUI0:string = "该道具的获取途径";


    export const L_HFYBSX:string = "是否花费50绑元提升至七星奖励？";
    export const L_SFXH:string = "是否消耗";
    export const L_CLFB0:string = "元宝扫荡？扫荡后可直接获得奖励";
    export const L_CLFB1:string = "(超级划算,副本奖励价值远超购买花费)";
    export const L_CLFB2:string = "正在战斗中，请稍后再挑战";
    export const L_CLFB3:string = "可再扫荡一次";
    export const L_CLFB4:string = "今日可扫荡次数：";
    export const L_CLFB5:string = "今日可挑战次数：";

    export const L_YWB0:string = "主角";
    export const L_YWB1:string = "级开启";
    export const L_YWB2:string = "你没有足够的挑战券";
    export const L_YWB3:string = "BOSS已逃跑";
    export const L_YWB4:string = "BOSS已被击杀";

    export const L_DQMYKBCDFA:string = "当前没有可保存的方案";

    export const L_ZKZG0:string = "达到";
    export const L_ZKZG1:string = "自动快速加入";
    export const L_ZKZG2:string = "秒后";
    export const L_ZKZG3:string = "级副本";
    export const L_ZKZG4:string = "只有队长可以操作";
    export const L_ZKZG5:string = "秒后自动挑战";
    export const L_ZKZG6:string = "满员自动开启副本";
    export const L_ZKZG7:string = "背包装备空位不足";

    export const L_TREASURE_FB0:string = "第";
    export const L_TREASURE_FB1:string = "关";
    export const L_TREASURE_FB2:string = "藏宝图";     
    export const L_TREASURE_FB4:string = "秒后自动挖宝"; 
    export const L_TREASURE_FB5:string = "点击自动挖宝";  
    export const L_TREASURE_FB6:string = "六星";                           
    export const L_TREASURE_FB7:string = "十二星";                           
    export const L_TREASURE_FB8:string = "十八星";
    export const L_TREASURE_FB9:string = "没有可挖的宝藏";
    export const L_TREASURE_FB10:string = "角色";
    export const L_TREASURE_FB11:string = "级开启";
    export const L_TREASURE_FB12:string = "通关藏宝图第";
    export const L_TREASURE_FB13:string = "章获得";
    export const L_TREASURE_FB14:string = "奖励";
    
    export const L_TOWER_FB0:string = "自动挑战";
    export const L_TOWER_FB1:string = "关";
    export const L_TOWER_FB2:string = "没有可挑战的塔";
    export const L_HEAVEN_FB0:string = "首次通关第";
    export const L_HEAVEN_FB1:string = "层获得奖励";
    export const L_LVUPRWD_KEY_MAP:Object = 
    {
        0:"坐骑",
        1:"羽翼",
        2:"光武",
        3:"精灵",
        4:"兽魂",
        5:"光环",
        6:"仙阵",
        7:"境界",
        8:"天仙",
        9:"仙器",
        10:"仙云",
        11:"灵气",
    };                
    export const L_GANG_INCENSE3:string = "银子";
    export const L_GANG_INCENSE4:string = "元宝";
    export const L_GANG_INCENSE5:string = "绑元";
    export const L_GANG_INCENSE6:string = "/60";
    export const L_GANG_INCENSE7:string = "香火值可领取";
    export const L_GANG_INCENSE8:string = "已上香";
    export const L_GANG_INCENSE9:string = "上   香";
    export const L_GANG_INCENSE10:string = "上香次数已达上限"
    export const L_GANG_INCENSE11:string = "银两不足，不能上香";
    export const L_GANG_INCENSE12:string = "绑元不足，不能上香";
    export const L_GANG_INCENSE13:string = "元宝不足，不能上香";

    export const L_GANG_ASSISTANT:string = "帮主";
    export const L_GANG_DEPUTY_ASSISTANT:string = "副帮主";
    export const L_GANG_NORMAL_MEMBER:string = "成员";  
    export const L_GANG_POSITION_MAP:Object = 
    {
        0:"无职位",
        1:L_GANG_ASSISTANT,
        2:L_GANG_DEPUTY_ASSISTANT,
        3:L_GANG_NORMAL_MEMBER,
    };
    export const L_GANGNO:string = "你还没有加入帮派";     
    export const L_GANGYES:string = "你已加入帮派";   

    export const L_GANGRECORD0:string = "本帮成功创建";
    export const L_GANGRECORD1:string = "加入了帮派"; 
    export const L_GANGRECORD2:string = "离开了帮派";
    export const L_GANGRECORD3:string = "职位调整成";
    export const L_GANGRECORD4:string = "被";
    export const L_GANGRECORD5:string = "踢出了帮派";
    export const L_GANGRECORD6:string = "将帮主禅让给了";
    export const L_GANGRECORD7:string = "长期不在线， 帮主退位给";
    export const L_GANGRECORD8:string = "本帮帮派等级提升为";
    export const L_GANGRECORD9:string = "级";
    export const L_GANGRECORD10:string = "变更帮派的名字为";

    export const L_GANGCREATETIPS1:string = "请输入帮派名称";
    export const L_GANGCREATETIPS2:string = "请选择帮派类别";
    export const L_GANGCREATETIPS3:string = "元宝不足，不能创建";
    export const L_GANGCREATETIPS4:string = "创建1级帮需要达到vip4";
    export const L_GANGCREATETIPS5:string = "创建2级帮需要达到vip6";
    
    export const L_GANGJOINTIPS1:string = "当前无帮派可申请";  
    export const L_GANGJOINTIPS2:string = "等级不足52级不能申请帮派";

    export const L_GANGTIPS1:string = "请输入帮派公告"; 
    export const L_GANGTIPS2:string = "请输入帮派名字";
    export const L_GANGTIPS3:string = "请输入有效的战力值";
    export const L_GANGTIPS4:string = "需战力：";
    export const L_GANGTIPS5:string = "需审核";
    export const L_GANGTIPS6:string = "确定将";
    export const L_GANGTIPS7:string = "踢出帮派？";
    export const L_GANGTIPS8:string = "正在调整";
    export const L_GANGTIPS9:string = "的职位，将其设置为？"; 
    export const L_GANGTIPS10:string = "将此玩家设置为帮主，自己退位为普通成员。请谨慎操作";
    export const L_GANGTIPS11:string = "将此玩家设置为副帮主";
    export const L_GANGTIPS12:string = "将此玩家设置为普通成员";
    export const L_GANGTIPS13:string = "当前已有2名副帮主";
    export const L_GANGTIPS14:string = "你正在将";
    export const L_GANGTIPS15:string = "设置为帮主，设置后自己将成为普通成员，请确认";
    export const L_GANGTIPS16:string = "请选择职位";
    export const L_GANGTIPS17:string = "确认将离开此帮？帮主之位将禅让给其他人";
    export const L_GANGTIPS18:string = "确认将离开此帮？";
    export const L_GANGTIPS19:string = "请输入自动申请的战力值";
               
    export const L_TTXY0:string = "层";
    export const L_TTXY1:string = "秒后自动挑战";
    export const L_TTXY2:string = "自动挑战关卡";
    export const L_TTXY3:string = "没有可以挑战的妖魔";
    export const L_TTXY4:string = "第";
    export const L_TTXY5:string = "层";

    export const L_NUMBERINPUT1:string = "请输入有效的数值";

    export const L_GANG_FB0:string = "级副本";
    export const L_GANG_FB1:string = "级帮派开启";

    export const L_TEXT_INPUT1:string = "请输入内容";
    export const L_TEXT_INPUT2:string = "（最多可输入20个字）";

    export const L_GANG_BOSS0:string = "小于1%";
    export const L_GANG_BOSS1:string = "暂无";
    export const L_GANG_BOSS2:string = "内击杀boss";
    export const L_GANG_BOSS3:string = "秒后自动挑战";
    export const L_GANG_BOSS4:string = "自动挑战";
    export const L_GANG_BOSS5:string = "是否花费1000元宝立即秒杀BOSS";
    export const L_GANG_BOSS6:string = "帮派等级达到";
    export const L_GANG_BOSS7:string = "级开启";
    export const L_GANG_BOSS8:string = "开启难度：";

    export const L_ACTIVTY_HELP: Object = {
        1: 101,
        6: 102,
        30: 105,
        38: 103,
    }

    export const L_SHEZHICHENGGONG:string = "设置成功";
    export const L_GANG_LIVELY0:string = "今日活跃值达到";
    export const L_GANG_LIVELY1:string = "点";
    export const L_GANG_LIVELY2:string = "已满级";

    export const L_BAGGRIDNUMMAX:string = "背包可扩充数量已达上限";
    export const L_NORONGLIAN:string = "当前无可熔炼的装备";
    
    export const L_MARRY_NOROLE:string = "请选择结婚对象";
    export const L_MARRY_NOGRADE:string = "请选择婚礼类型";
    export const L_MARRY_HUSBAND:string = "丈夫";
    export const L_MARRY_WIFE:string = "妻子";
    export const L_MARRY_TIPS:string = "向您发出求婚";
    export const L_MARRY_TIPS1:string = "是否答应他";
    export const L_MARRY_TIPS2:string = "获得感情不易，守住感情更难，真的要结束这段姻缘嘛？还请三思呀！";
    export const L_MARRY_TIPS3:string = "茫茫人海遇见是缘，真的要拒绝对方的一片心嘛？";
    export const L_MARRY_TIPS4:string = "和";
    export const L_MARRY_TIPS5:string = "喜结连理";
    export const L_MARRY_TIPS6:string = "你与";
    export const L_MARRY_TIPS7:string = "在";
    export const L_MARRY_TIPS8:string = "结为夫妻";
    export const L_MARRY_TIPS9:string = "结婚费用";
    export const L_MARRY_TIPS10:string = "结婚奖励";
    export const L_MARRY_TIPS11:string = "没有符合结婚条件的好友";
    export const L_MARRY_TIPS12:string = "确定消耗";
    export const L_MARRY_TIPS13:string = "向新婚燕尔赠送礼金吗？";
    export const L_MARRY_TIPS14:string = "赠送礼金后双方都可以获得礼金道具";
    
    export const L_XY_WALFARE:string = "未达成领取条件";
    export const L_XY_WALFARE0:string = "虚位以待";

    export const L_GOLD_TREASURE_LOT:string = "正在抽奖中，请稍后再试";
    
    export const L_LEVEL_GIFT0:string = "级礼包";
    export const L_LEVEL_GIFT1:string = "级可领取";
    export const L_SIGN_GIFT0:string = "可领取";

    export const L_RICH_GIFT0:string = "充值";
    export const L_RICH_GIFT1:string = "元";
    export const L_RICH_GIFT2:string = "价值";
    export const L_RICH_GIFT3:string = "元宝";

    export const L_TEXT_RECEIVE:string = "未达到领取条件，是否前往充值";

    export const L_ANSWER0:string = "正确率：";
    export const L_ANSWER1:string = "题";
    export const L_ANSWER2:string = "答对";
    export const L_ANSWER3:string = "道题奖励";

    export const L_PDYW0:string = "领   取";
    export const L_PDYW1:string = "前往击杀";
    export const L_PDYW2:string = "已刷新";
    export const L_PDYW3:string = "已击杀";
    export const L_PDYW4:string = "已逃跑";

    export const L_FIRSTPLAY0:string = "已报名";
    export const L_FIRSTPLAY1:string = "第一局";
    export const L_FIRSTPLAY2:string = "第二局";
    export const L_FIRSTPLAY3:string = "第三局";
    export const L_FIRSTPLAY4:string = "第四局";
    export const L_FIRSTPLAY5:string = "第五局";
    export const L_FIRSTPLAY6:string = "周二晚上";
    export const L_FIRSTPLAY7:string = "周三晚上";
    export const L_FIRSTPLAY8:string = "周四晚上";
    export const L_FIRSTPLAY9:string = "周五晚上";

    export const L_TRAVEL:string = "游历";

    export const L_RECHSTORE:string = "可升至";

    export const L_GANG_MAP_TXT0:string = "请问是否消耗";
    export const L_GANG_MAP_TXT1:string = "元宝直接完成采矿任务？";
    export const L_GANG_MAP_TXT2:string = "绑元重置任务？";
    export const L_GANG_MAP_TXT3:string = "自己的花只能别人浇灌";
    export const L_GANG_MAP_TXT4:string = "浇花次数已满";
    export const L_GANG_MAP_TXT5:string = "刷新次数已用完";
    export const L_GANG_MAP_TXT6:string = "元宝刷新物品？";
    export const L_GANG_MAP_TXT7:string = "所需物品不足";
    export const L_GANG_MAP_TXT9:string = "帮派内已经有过多的鲜花了";
    export const L_GANG_MAP_TXT8:string = "每天可以帮助其他玩家完成花朵浇灌，帮助其他人可以获得心意礼物，你今天已经完成";
    export const L_GANG_MAP_TXT10:string = "该花儿已完成浇灌";
    export const L_GANG_MAP_TXT11:string = "场景中已中满花儿";
    export const L_GANG_MAP_TYPE0:string = "挖矿中";
    export const L_GANG_MAP_TYPE1:string = "种花中";
    export const L_GANG_MAP_TYPE2:string = "浇花中";

    export const L_RECEIVED :string = "已领取";
    export const L_UPRIGHTDAN:string = "直升丹";

    export const L_SJZSX:string = "升级总属性";
    export const L_SJZSX2:string = "升阶总属性";
    export const L_JCZSX:string = "加成总属性";
    export const L_ZZZSX:string = "资质总属性";
    export const L_QYZSX:string = "奇缘";
    export const L_POORDAY:string = "还差";


    export const L_JJJL0:string = "阶可领取";

    export const L_QMJJ0:string = "全民";
    export const L_QMJJ1:string = "阶";
    export const L_QMJJ2:string = "达到";
    export const L_QMJJ3:string = "人";

    export const L_ZKSD0:string = "折";
    export const L_ZKSD1:string = "阶可购买";

    export const L_XMDX0:string = "活动剩余时间：";

    export const L_TUANGOU:string = "团购";
    export const L_MIANFEI_GET:string = "免费领取";
    export const L_ANY_GET:string = "任意金额领取";
    export const L_YUANBAO_GET:string = "元宝领取";
    export const L_DAY_PAY_PNUM:string = "今日服务器首充人数达到";
    export const L_JIKE_GET:string = "人\n即可领取";
    export const L_ANY_MONEY_GET:string = "人\n且充值任意金额，即可领取";
    export const L_TOTAL_MONEY_GET:string = "人\n且累计充值";
    export const L_YUANBAO_JIKE_GET:string = "元宝即可领取";

    export const L_LUCAICHUZI:string = "鲁菜厨子";
    export const L_SUCAICHUZI:string = "苏菜厨子";
    export const L_YUECAICHUZI:string = "粤菜厨子";
    export const L_CHUANCAICHUZI:string = "川菜厨子";
    export const L_COOKERGOD0:string = "完胜精英大奖";
    export const L_COOKERGOD1:string = "其它胜利奖励1";
    export const L_COOKERGOD2:string = "其它胜利奖励2";
    export const L_COOKERGOD3:string = "其它胜利奖励3";

    export const L_ADDGANGFUNDS:string = "增加帮派资金";

    export const L_SERHGY0: string = "开始倒计时："
    export const L_SERHGY1: string = "结束倒计时："
    export const L_SERHGY2: string = "开采人数："
    export const L_SERHGY3: string = "无法挑战该矿点";
    export const L_SERHGY4: string = "前往";
    export const L_SERHGY5: string = "挑战";
    export const L_SERHGY6: string = "开采人数已达上限，请寻找其他矿开采";
    export const L_SERHGY7: string = "是否停止开采并前往？";
    export const L_SERHGY8: string = "开采";
    export const L_SERHGY9: string = "矿点已被敌方占领，请先击败敌方防守者";
    export const L_SERHGY10: string = "无法前往，请等待准备时间结束";
    export const L_SERHGY11: string = "该区域不可前往";
    export const L_SERHGY12: string = "正在开采中";
    export const L_SERHGY13: string = "只有队长可以操作";
    export const L_SERHGY14: string = "活动已结束";
    export const L_SERHGY15: string = "活动暂未开启";
    export const L_SERHGY16: string = "活动匹配中";
    export const L_SERHGY17: string = "今日活动匹配失败，请下次再来";
    export const L_SERHGY18: string = "跨服争霸排行榜暂未开启";
    
    export const L_RECH0: string = "首充送";
    export const L_RECH1: string = "充值得";
    export const L_RECH2: string = "立返";

    export const L_OTHERPLAYER0: string = "删除好友";
    export const L_OTHERPLAYER1: string = "添加好友";
    export const L_OTHERPLAYER2: string = "解除屏蔽";
    export const L_OTHERPLAYER3: string = "屏蔽";

    export const L_SEARCH_ROLE: string = "请输入昵称或者id";

    export const L_CONTINUE_CONSUME_GET: string = "累计7天每天消费满8888元宝才可领取大奖";

    export const L_GONGXIJIESUO: string = "恭喜解锁新";
    export const L_XIANLV: string = "仙侣";
    export const L_CHONGWU: string = "宠物";
    export const L_CHENGHAO: string = "称号";
    export const L_ZAOXING: string = "造型";

    export const L_DANGQIAN: string = "当前";
    export const L_WEI: string = "为";
    export const L_USEGOUPJIE: string = "阶，使用后将立即提升一阶,是否使用?";
    export const L_GT6JIE: string = "大于6阶,使用后将获得700经验，是否使用?";

    export const L_SSJ_DI: string = "第";
    export const L_SSJ_NAN: string = "难";
    export const L_SSJ_JIE: string = "劫";
    export const L_SSJ_SHANGWEIKAIQI: string = "尚未开启";
    export const L_SSJ_HUIHE: string = "回合";
    export const L_SSJ_HUAFEI: string = "花费";
    export const L_SSJ_YBKQBX: string = "元宝开启宝箱可随机获得以下奖励";
    export const L_SSJ_JTHKKQ: string = "\n今天还可开启";
    export const L_SSJ_CI: string = "次";
    export const L_SSJ_ZHENGZAIDUIWUZHONG: string = "正在队伍中";
    export const L_SSJ_QINGXIANTONGGUAN: string = "请先通关上一劫";

    export const L_WLMZ0: string = "对方正在战斗中";
    export const L_WLMZ1: string = "51名及以后";

    export const L_INACTIVITY: string = "正在活动中，无法进入";
    export const L_DIANCIBANGZHU: string = "点此帮助";
    export const L_GANGFUBEN0: string = "发起";
    export const L_GANGFUBEN1: string = "级帮派副本，现需各位大侠帮助，感谢大家！";
    export const L_GANGFUBEN2: string = "已在世界频道发布求助信息";
    export const L_YWC: string = "已完成";
    export const L_ZHENGZAIBANGPAINEI: string = "正在帮派内，无法加入"; //可优化
    export const L_ZHENGZAIKUAFU: string = "正在跨服，无法加入";
    export const L_ZUDUIZHONG: string = '组队中';
    export const AIXIYOUAISHENGHUO: string = '爱西游，爱生活，睡觉挂机好玩不累';
    export const L_KUAFUZHUAGUI: string = '跨服抓鬼';
    export const L_BANGPAIFUBEN: string = '帮派副本';
    export const L_SHENGSIJIE: string = '生死劫';
    export const L_FUHUOLINGBUZU: string = '复活令不足，是否前往材料商店购买';
    
    export const L_XYFL: string = "存储经验大于升级所需的200%，请先消耗经验再来领取";

    export const L_KAIFUJIESHU: string = "开服活动已结束";
    export const L_GODDESS_NAME: string = '天仙';
    export const L_GODDESS_SKILL: string = "天仙技能";
    export const L_GODDESS_EQUIP: string = "天仙装备";
    export const TABBTNSTRINGTX: string = '天 仙';
    export const TABBTNSTRINGXQ: string = '仙 器';
    export const TABBTNSTRINGXY: string = '仙 云';
    export const TABBTNSTRINGLQ: string = '灵 气';
    export const L_XIANQI_NAME: string = "仙器";
    export const L_XIANQI_SKILL: string = "仙器技能";
    export const L_XIANQI_EQUIP: string = "仙器装备";
    export const L_XIANYUN_NAME: string = "仙云";
    export const L_XIANYUN_SKILL: string = "仙云技能";
    export const L_XIANYUN_EQUIP: string = "仙云装备";
    export const L_LINGQI_SKILL: string = "灵气技能";
    export const L_LINGQI_EQUIP: string = "灵气装备";
    //野外boss复仇功能
    export const QIANGDUOLEWODE: string = "抢夺了我的";
    export const QIANGDUO: string = "抢夺";
    export const WEIZHANLING: string = "未占领";

    export const L_HTMLFILTER: string = "不能包含下列字符：\\，/，&lt;，&gt;，&amp;";
    export const DJBZWFQD: string = "等级不足，无法抢夺";
    export const SHIFOUBA: string = "是否把";
    export const BIAOJI2: string = "标记";
    export const YICHU2: string = "移除";
    export const L_NOWEARQILING: string = "该部位未穿戴器灵";
    export const L_ROLELVLOW: string = "角色等级不足，无法升阶";
    export const L_CAILIAOLOW: string = "材料不足，无法升阶";
    export const L_XLCAILIAOLOW: string = "材料不足，无法洗炼";
    export const L_CLCAILIAOLOW: string = "材料不足，无法淬炼";
    export const L_BASEPROPUP: string = "基础属性提升";
    export const L_PROPSUCCESS: string = "属性洗炼成功";
    export const L_SELQLGRADEUP: string = "选中器灵中有穿戴等级较高的器灵，是否分解";
    export const L_DAYNOTIP: string = "今天不在显示";
    export const L_POSPROPMAX: string = "当前部位极品属性已满，无需洗练";
    export const L_CUILIANFAILE: string = "淬炼失败";
    export const L_LVGM = "提升器灵总等级，获得更强等阶共鸣属性";
    export const L_LVGMMAX = "器灵等阶共鸣属性已达上限";
    export const L_CNGM = "佩戴更多器灵，获得更强连锁共鸣属性";
    export const L_CNGMMAX = "器灵连锁共鸣属性已达上限";
    export const L_JIAN = "件";
}
