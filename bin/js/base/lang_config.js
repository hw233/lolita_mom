var game_lang;
(function (game_lang) {
    game_lang.L_LOADING_TIPS_MAP = {
        0: "万圣公主买了一辆南瓜马车",
        1: "孙悟空正在穿虎皮小短裙",
        2: "唐僧念完了一段大悲咒",
        3: "白龙马在挑选马蹄铁",
        4: "猪八戒走在去高老庄的路上",
        5: "沙和尚深深的打了一个哈欠",
        6: "主城在做最后的装修",
        7: "蜘蛛精正在做美甲",
        8: "白骨精在物色新的皮囊",
        9: "牛魔王急匆匆的赶向积雷山",
        10: "铁扇公主给了红孩儿一巴掌",
        11: "大雁神塔中传来了嘈杂的声音",
        12: "无名鬼城好像有什么正在醒来",
        13: "普陀山的大门徐徐打开",
        14: "竞技场的钟声渐渐传来",
        15: "嫦娥在研究兔子的十种炖法",
        16: "黑无常正在涂BB霜",
        17: "白无常正在晒日光浴",
    };
})(game_lang || (game_lang = {}));
var game;
(function (game) {
    game.PROP_MAP = {
        0x80: "生命",
        0x81: "攻击",
        0x82: "防御",
        0x83: "速度",
        0x84: "暴击",
        0x85: "抗暴",
        0x86: "命中",
        0x87: "闪避",
        0x90: "真实伤害",
        0x91: "真实免伤",
        0x92: "伤害增加",
        0x93: "伤害减免",
        0x94: "暴伤增加",
        0x95: "暴伤减免",
        0x96: "PVP增伤",
        0x97: "PVP免伤",
        0x98: "PVE增伤",
        0x99: "PVE免伤",
        0xb0: "战力"
    };
    game.PROP_KEY_MAP = {
        "hp": "生命",
        "atk": "攻击",
        "def": "防御",
        "spd": "速度",
        "cri": "暴击",
        "res": "抗暴",
        "hit": "命中",
        "dod": "闪避",
    };
    // 常用提示
    game.L_SHIJIE = "世界";
    game.L_BANGPAI = "帮派";
    game.L_XITONG = "系统";
    game.L_KUAFU = "跨服";
    game.L_YEAR = "年";
    game.L_MONTH = "月";
    game.L_DAY = "日";
    game.L_TIAN = "天";
    game.L_XIAOSHI = "小时";
    game.L_SHI = "时";
    game.L_FEN = "分";
    game.L_MIAO = "秒";
    game.L_WAN = "万";
    game.L_YI = "亿";
    game.L_GUAN = "关";
    game.L_WU = "无";
    game.L_REN = "人";
    game.L_JINRU = "进入";
    game.L_JIBAI = "击败";
    game.L_JIANGLI = "奖励";
    game.L_HUODELE = "获得";
    game.L_VIP = "VIP";
    game.L_MONTHCARD = "月卡";
    game.L_FOREVERCARD = "终身卡";
    game.L_JI = "级";
    game.L_NAN = "男";
    game.L_NV = "女";
    game.L_DI = "第";
    game.L_MING = "名";
    game.L_LV = "Lv.";
    game.L_SCORE = "评分: ";
    game.L_DADAO = "达到";
    game.L_JIE = "阶";
    game.L_KELINGQU = "可领取";
    game.L_PINGFEN = "评分";
    game.L_BUWEI = "部位";
    game.L_DENGJI = "等级";
    game.L_CSBZ = "次数不足";
    game.L_EXP = "经验";
    game.L_TEQUAN = "特权";
    game.L_SHOUCHONG = "首充";
    game.L_TEMAI = "特卖";
    game.L_MORE = "再";
    game.L_DANG = "档";
    game.L_NEED = "需";
    game.L_NODATA = "暂无数据";
    game.L_NICHENG = "昵称";
    game.L_ZHANLI = "战力";
    game.L_RENSHU = "人数";
    game.L_WIN = "胜场：";
    game.L_LOSE = "败场：";
    game.L_SHENGLV = "胜率：";
    game.L_YBSLBZ = "元宝不足";
    game.L_BDYBSLBZ = "绑定元宝不足";
    game.L_YZSLBZ = "银子不足";
    game.L_COSTGOLDTIPS = "当前绑定元宝不足，是否花费元宝补足？";
    game.L_YBBZ = "元宝不足，是否前往充值？";
    game.L_LVMAX = "已达到最高等级";
    game.L_LVMAX2 = "已满级";
    game.L_UNLEARNED = "未学习";
    game.L_ZANWEIKAIFANG = "暂未开放";
    game.L_WANCHENG = "完成";
    game.L_WEIWANCHENG = "未完成";
    game.L_WEIJIHUO = "未激活";
    game.L_JIHUO = "激活";
    game.L_WSUCCESS = "成功";
    game.L_WFAIL = "失败";
    game.L_BANGGONG = "帮贡";
    game.L_ZAIXIAN = "在线";
    game.L_LIXIAN = "离线";
    game.L_LIXIANSHIJIAN = "离线时间";
    game.L_LNONE = "不足";
    game.L_DENGJIBUZU = "帮派等级不足";
    game.L_SHOUYICISHUBUZU = "收益次数不足";
    game.L_SHIFOUTUICHUDUIWU = "正在其他队伍中，是否退出原队伍";
    game.L_ZHENGZAIQITADUIWUZHZONG = "正在其他队伍中，无法加入";
    game.L_YIJINGZAIDUIWUZHONG = "已经在队伍中";
    game.L_KUOHAOWU = "（无）";
    game.L_WAITINGPLEASE = "敬请期待";
    game.L_BUKEQIUZHU = "已无次数，不可发起求助";
    game.L_NOBUYGROWUP = "你尚未购买成长基金";
    game.L_YBSLBZGOBUY = "元宝不足，请充值购买";
    game.L_TOMORROWGET = "明天再来领取奖励吧";
    game.L_HAVEBUY = "已购买";
    game.L_CROSSSERVERBAN = "跨服不允许此操作";
    game.L_WARBAN = "当前战斗不允许此操作";
    game.L_SENDOK = "发送成功";
    game.L_WAIT = "请稍后再试";
    // 常用提示end
    // 按钮文字
    game.BTNLABELQL = "领   取";
    game.BTNLABELYQL = "已领取";
    game.BTNLABELQWJS = "前往击杀";
    game.TABBTNSTRINGZB = "装 备";
    game.TABBTNSTRINGJN = "技 能";
    game.TABBTNSTRINGZQ = "坐 骑";
    game.TABBTNSTRINGYY = "羽 翼";
    game.TABBTNSTRINGSJ = "升 级";
    game.TABBTNSTRINGDS = "打 书";
    game.TABBTNSTRINGGH = "光 环";
    game.TABBTNSTRINGSL = "兽 魂";
    game.TABBTNSTRINGXL = "仙 侣";
    game.TABBTNSTRINGSX = "升 星";
    game.TABBTNSTRINGXW = "仙 阵";
    game.TABBTNSTRINGXZ = "境 界";
    game.TABBTNSTRINGGW = "光 武";
    game.TABBTNSTRINGJL = "精 灵";
    game.TABBTNSTRINGDY = "丹 药";
    game.TABBTNSTRINGJM = "经 脉";
    game.BTNSHENQING = "申  请";
    game.BTNTONGGUO = "通  过";
    game.BTNJUJUE = "拒  绝";
    game.BTNTICHU = "踢  出";
    game.BTNSHEZHIZHIWEI = "设置职位";
    game.BTNSHENGJI = "升  阶";
    game.BTNZIDONGSHENGJI = "自动升阶";
    game.BTNZIDONGSHENGJI2 = "自动升级";
    game.BTNQUXIAOZIDONG = "取消自动";
    game.BTNJIHUO = "激  活";
    game.BTNHUANHUA = "幻  化";
    game.BTNTUPO = "突  破";
    game.L_BTNQIANWANG = "前  往";
    game.L_BTNSHIYONG = "使  用";
    game.L_BTNHECHENG = "合  成";
    game.L_BTNZHANSHI = "展示";
    // 按钮文字end
    game.L_DEFAULT_SIGN = "一起加油吧"; // 默认签名
    game.L_SHENGYU = "剩余";
    game.L_CI = "次";
    game.L_QUEDING = "确定";
    game.L_XIUXI = "休息";
    game.L_CANZHAN = "参战";
    game.L_SHENGYUSHIJIAN = "剩余时间";
    game.L_WEIKAIQI = "未开启";
    game.L_JICHUSHUXING = "基础属性";
    game.L_FUJIASHUXING = "附加属性";
    game.L_SHULIANG = "数量";
    game.L_SHULIANGBUZU = "数量不足";
    game.L_YOUJIAN = "邮件";
    game.L_HAOYOU = "好友";
    game.L_GEXINGQIANMING = "默认个性签名";
    game.L_BANGDINGYUANBAO = "绑定元宝";
    game.L_BAGNOTENOUGH = "当前背包装备空位不足，是否进行熔炼？";
    game.L_RONGLIANVIP8 = "VIP8以上才能开启自动熔炼";
    game.L_CHAPTER0 = "今日被协助次数已满";
    game.L_CHAPTER1 = "累积星星数未达到要求";
    game.L_CHAPTER2 = "协助请求每30秒只能发布一次";
    game.L_CHAPTER3 = "江湖救急";
    game.L_CHAPTER4 = "求大神帮过";
    game.L_MAIN0 = "预加载资源失败";
    game.L_MAIN1 = "加载场景资源失败";
    game.L_LOGIN0 = "请输入登录账号";
    game.L_LOGIN1 = "请输入登录密码";
    game.L_LOGIN2 = "请选择登录服务器";
    // export const L_PATROL0:string = "巡逻关闭";
    // export const L_PATROL1:string = "巡逻打开";
    game.L_WACCOUNT0 = "请输入登录账号";
    game.L_WCHANGENAME0 = "请输入昵称";
    game.L_WCHANGENAME1 = "首次改名免费，每天仅可修改一次";
    game.L_WCHANGENAME2 = "本次改名需要消耗200元宝，每天仅可修改一次";
    game.L_WCHANGENAME3 = "秒后自动创建角色并进入游戏";
    game.L_WCHANGENAME4 = "昵称过长，请重新输入";
    game.L_WCHANGENAME5 = "宠物改名免费，最多输入4个字";
    game.L_WCHAPTERBTN0 = "前往新地图";
    game.L_WCHAPTERBTN1 = "已全部通关\n请期待新图";
    game.L_WCHAPTERMAIN0 = "已求助次数";
    game.L_WCHAPTERMAIN1 = "已协助他人次数";
    game.L_WCHAPTERMAIN2 = "波小怪后即可挑战BOSS";
    game.L_WCOMMONBOSS0 = "后重生";
    game.L_WCOMMONBOSS1 = "正在战斗中，请稍后再挑战";
    game.L_WCOMMONBOSS2 = "数量不足";
    game.L_WCOMMONBOSS3 = "争夺人数";
    game.L_WCOMMONBOSS4 = "级可挑战";
    game.L_SFHF = "是否花费";
    game.L_BYWC = "元宝完成";
    game.L_BYZH = "元宝找回";
    game.L_HRW = "环任务";
    game.L_SY = "所有";
    game.L_JX = "进行";
    game.L_WDAILY300_0 = "当前环数";
    game.L_WDAILY300_1 = "当前没有可领取的奖励";
    game.L_WDAILY300_3 = "VIP6以上开启";
    game.L_WDAILY300_4 = "任务已完成";
    game.L_WDAILY300_7 = "完成100环奖励";
    game.L_WDAILY300_8 = "完成200环奖励";
    game.L_WDAILY300_9 = "完成300环奖励";
    game.L_WDAILYFUMO0 = "当前环数";
    game.L_WDAILYFUMO2 = "任务已全部完成";
    game.L_WDAILYFUMO6 = "当前地图没有可以挑战的妖怪";
    game.L_WMAIN0 = "未读";
    game.L_WMAIN1 = "已读";
    game.L_WMAINEQUIPUI0 = "操作id";
    game.L_WMAINSKILLUI0 = "开启";
    game.L_WMAINSKILLUI1 = "已满级";
    game.L_WMAINSKILLUI2 = "该技能未解锁";
    game.L_WMAINSKILLUI3 = "该技能已满级";
    game.L_WMAINSKILLUI4 = "经验不足";
    game.L_WMAINSKILLUI5 = "技能效果";
    game.L_WMAINSKILLUI6 = "下一级效果";
    game.L_WMAINSKILLUI7 = "操作频率过快 请稍后再试";
    game.L_WMAINSKILLUI8 = "技能不存在";
    game.L_WMAINSKILLUI9 = "经验不足";
    game.L_WMAINSKILLUI10 = "需要人物达到";
    game.L_WMAINSKILLUI11 = "该技能尚未激活";
    game.L_WMAINSKILLUI12 = "资质1级激活";
    game.L_WMAINSKILLUI13 = "没有该等级配置";
    game.L_WZJN = "未知技能";
    game.L_YGWPZJN = "一个未配置的技能";
    game.L_WARENA0 = "您现在无需购买挑战次数";
    game.L_WARENA1 = "不可以挑战自己";
    game.L_WARENA2 = "每天可再购买";
    game.L_WARENA3 = "不变";
    game.L_WARENA4 = "领取奖励";
    game.L_WOFFLINEINCOME0 = "离线时间";
    game.L_WOFFLINEINCOME1 = "最多累积6小时离线收益";
    game.L_WOFFLINEINCOME2 = "背包已满，自动熔炼<span color='#12a710'>";
    game.L_WOFFLINEINCOME3 = "</span>件装备";
    game.L_WGERENBOSS0 = "正在战斗中，请稍后再挑战";
    game.L_WGERENBOSS1 = "剩余次数：0次";
    game.L_WGERENBOSS2 = "剩余次数：1次";
    game.L_WGERENBOSS3 = "级可挑战";
    game.L_WPURCHASEPAGE0 = "限购";
    game.L_WPURCHASEPAGE1 = "尚未解锁";
    game.L_WRANK0 = "未上榜";
    game.L_WRANK1 = "榜上无名，再接再厉";
    game.L_WRONGLIAN0 = "已选";
    game.L_WSHOP0 = "限购";
    game.L_WSHOP1 = "解锁";
    game.L_WSHOP2 = "材料商店";
    game.L_WSHOP3 = "装备商店";
    game.L_WSUMMONCATCHING0 = "捕捉";
    game.L_WSUMMONCATCHING1 = "卡";
    game.L_WSUMMONCATCHING2 = "宠物宝宝逃跑了";
    game.L_WSUMMONCATCHING3 = "获得";
    game.L_WSUMMONCATCHING4 = "你偶遇到了一只宝宝，是否进行抓捕?";
    game.L_WSUMMONCATCHING5 = "当前场景不能进行抓捕";
    game.L_WSUMMONCATCHING6 = "是否领取抓捕奖励";
    game.L_WSUMMONCATCHING7 = "遭遇宠物";
    game.L_WSUMMONCATCHING8 = "#D&，#C18&捕捉成功#D&";
    game.L_WSUMMONCATCHING9 = "#D&，#C20&捕捉失败#D&";
    game.L_WSUMMONCATCHING10 = "是否自动抓宠";
    game.L_WESCORT0 = "押镖中";
    game.L_WESCORT1 = "今天押镖次数已用完";
    game.L_WESCORT2 = "已是最高品质镖车";
    game.L_WESCORT3 = "拦截了我的";
    game.L_WESCORT4 = "复仇";
    game.L_WESCORT5 = "复仇成功";
    game.L_WESCORT6 = "复仇失败";
    game.L_WESCORT7 = "我拦截了";
    game.L_WESCORT8 = "是否花费300元宝立即完成本次押镖";
    game.L_WESCORT9 = "防守失败";
    game.L_WESCORT10 = "防守成功";
    game.L_WESCORT11 = "不能拦截自己的镖车";
    game.L_WESCORT12 = "今天劫镖次数已用完";
    game.L_WESCORT13 = "是否花费1个橙镖令立即刷新至橙色镖车？";
    game.L_WESCORT14 = "是否花费500绑定元宝立即刷新至橙色镖车？";
    game.L_WESCORT15 = "是否花费500元宝立即刷新至橙色镖车？";
    game.L_WESCORT16 = "当前时间段没有双倍奖励，是否仍然押镖？<br/>双倍奖励时间段为每天上午11：00~13:00和<br/>23:00~01:00";
    game.L_WESCORT17 = "开始押镖";
    game.L_WESCORT18 = "一键完成";
    game.L_WESCORTCAR0 = "白色镖车";
    game.L_WESCORTCAR1 = "绿色镖车";
    game.L_WESCORTCAR2 = "蓝色镖车";
    game.L_WESCORTCAR3 = "紫色镖车";
    game.L_WESCORTCAR4 = "橙色镖车";
    game.L_WFIRST0 = "新秀组 (100~119级)";
    game.L_WFIRST1 = "精锐组 (120~139级)";
    game.L_WFIRST2 = "凌云组 (140~159级)";
    game.L_WFIRST3 = "惊世组 (160~179级)";
    game.L_WFIRST4 = "无双组 (180~200级)";
    game.L_WFIRSTEND0 = "本周新秀组冠军";
    game.L_WFIRSTEND1 = "本周精锐组冠军";
    game.L_WFIRSTEND2 = "本周凌云组冠军";
    game.L_WFIRSTEND3 = "本周惊世组冠军";
    game.L_WFIRSTEND4 = "本周无双组冠军";
    game.L_WFIRSTPR3 = "16强晋升8强";
    game.L_WFIRSTPR4 = "8强晋升4强";
    game.L_WFIRSTPR5 = "半决赛";
    game.L_WFIRSTPR6 = "决赛";
    game.L_WFIRST5 = "请选择押注玩家";
    game.L_WFIRST6 = "请选择押注玩家";
    game.L_WFIRSTBET1 = "普通押注";
    game.L_WFIRSTBET2 = "特级押注";
    game.L_WFIRSTBET3 = "超级押注";
    game.L_WFIRSTRR = "正确奖励：";
    game.L_WFIRSTFR = "错误奖励：";
    game.L_WEQUIP0 = "武器";
    game.L_WEQUIP1 = "项链";
    game.L_WEQUIP2 = "护肩";
    game.L_WEQUIP3 = "护腕";
    game.L_WEQUIP4 = "戒子";
    game.L_WEQUIP5 = "头盔";
    game.L_WEQUIP6 = "衣服";
    game.L_WEQUIP7 = "腰带";
    game.L_WEQUIP8 = "裤子";
    game.L_WEQUIP9 = "鞋子";
    game.L_WEQUIP10 = "阶";
    game.L_WEQUIP11 = "未激活";
    game.L_WEQUIP12 = "宝石";
    game.L_WEQUIP13 = "强化";
    game.L_WEQUIP14 = "锻炼";
    game.L_WEQUIP15 = "精炼";
    game.L_WEQUIP16 = "全身强化";
    game.L_WEQUIP17 = "全身锻炼";
    game.L_WEQUIP18 = "全身精炼";
    game.L_WEQUIP19 = "全身宝石";
    game.L_WEQUIP20 = "升阶可提升";
    game.L_WFRIEND0 = "已向对方提出申请，请耐心等待";
    game.L_WFRIEND1 = "发出好友申请，请耐心等待!";
    game.L_WFRIEND2 = "玩家";
    game.L_WFRIEND3 = "请求添加你为好友。";
    game.L_WFRIEND4 = "恭喜与";
    game.L_WFRIEND5 = "成为了好友。";
    game.L_WFRIEND6 = "确定要与";
    game.L_WFRIEND7 = "解除好友关系吗？";
    game.L_WFRIEND8 = "确定要将";
    game.L_WFRIEND9 = "加入屏蔽列表吗？屏蔽后将无法接收到对方的聊天信息与所有消息。";
    game.L_WFRIEND10 = "已达到当日赠送上限";
    game.L_WFRIEND11 = "向您赠送了金币";
    game.L_WFRIEND12 = "已达到当日领取上限";
    game.L_WFRIEND13 = "添加失败，好友数量已达上限";
    game.L_WFRIEND14 = "想经常保持联系就把对方";
    game.L_WFRIEND15 = "加为好友";
    game.L_WFRIEND16 = "吧";
    game.L_WFRIEND17 = "等级不到20，不能添加好友 ";
    game.L_WWORLDMAP0 = "已通关";
    game.L_WWORLDMAP1 = "冒险中...";
    game.L_WWORLDMAP2 = "进入条件<br/>击杀<span color='#12a710'>";
    game.L_WWORLDMAP3 = "</span>所有头目";
    game.L_WWORLDMAP4 = "人物等级需达到";
    game.L_NETCLOSE = "与服务器断开连接，请退出重新登录";
    game.L_NETERROR = "网络出错与服务器断开连接，请退出重新登录";
    game.L_COMMON = "通用";
    game.L_EQUIP_POS_MAP = {
        101: "武器",
        102: "项链",
        103: "护肩",
        104: "护腕",
        105: "戒指",
        106: "头盔",
        107: "衣服",
        108: "腰带",
        109: "裤子",
        110: "鞋子",
        111: "坐骑符文",
        112: "坐骑符文",
        113: "坐骑符文",
        114: "坐骑符文",
        115: "羽翼符文",
        116: "羽翼符文",
        117: "羽翼符文",
        118: "羽翼符文",
        119: "羽翼符文",
        120: "羽翼符文",
        121: "羽翼符文",
        122: "羽翼符文",
        123: "兽魂符文",
        124: "兽魂符文",
        125: "兽魂符文",
        126: "兽魂符文",
        127: "光环符文",
        128: "光环符文",
        129: "光环符文",
        130: "光环符文",
        131: "境界符文",
        132: "境界符文",
        133: "境界符文",
        134: "境界符文",
        135: "光武符文",
        136: "光武符文",
        137: "光武符文",
        138: "光武符文",
        139: "精灵符文",
        140: "精灵符文",
        141: "精灵符文",
        142: "精灵符文",
        159: "器灵武器",
        160: "器灵项链",
        161: "器灵护肩",
        162: "器灵护腕",
        163: "器灵戒指",
        164: "器灵头盔",
        165: "器灵衣服",
        166: "器灵腰带",
        167: "器灵裤子",
        168: "器灵鞋子"
    };
    //宠物/仙侣
    game.SUMMONPROP_TITLE_ARR = ["宠物属性", "资质属性"];
    game.PARTNERPROP_TITLE_ARR = ["仙侣属性"];
    game.L_DQCWWJH = "当前宠物未激活";
    game.L_DQXLWJH = "当前仙侣未激活";
    game.L_LVLESSPLAYER = "等级不能超过人物等级";
    game.L_XLZDJDD = "仙侣总等阶达到";
    game.L_KJH = "阶可激活";
    game.L_JINENGGESHENGJI = "技能格升级";
    //宠物/仙侣end
    //养成
    game.OPEN_LV_ARR = ["2阶激活", "4阶激活", "5阶激活", "7阶激活"];
    game.PROP_TITLE_ARR = ["升阶属性", "符文属性", "技能属性", "皮肤属性", "属性丹属性"];
    game.L_DEVELOPSKILL1 = "坐骑技能";
    game.L_DEVELOPEQUIP1 = "坐骑符文";
    game.L_DEVELOPSKILL2 = "羽翼技能";
    game.L_DEVELOPEQUIP2 = "羽翼符文";
    game.L_DEVELOPSKILL3 = "光环技能";
    game.L_DEVELOPEQUIP3 = "光环符文";
    game.L_DEVELOPSKILL4 = "兽魂技能";
    game.L_DEVELOPEQUIP4 = "兽魂符文";
    game.L_DEVELOPSKILL5 = "仙阵技能";
    game.L_DEVELOPEQUIP5 = "仙阵符文";
    game.L_DEVELOPSKILL6 = "境界技能";
    game.L_DEVELOPEQUIP6 = "境界符文";
    game.L_DEVELOPSKILL7 = "光武技能";
    game.L_DEVELOPEQUIP7 = "光武符文";
    game.L_DEVELOPSKILL8 = "精灵技能";
    game.L_DEVELOPEQUIP8 = "精灵符文";
    game.L_DEVELOPSKIN1 = "皮肤总战力：";
    game.L_DEVELOPSKIN2 = "已激活皮肤：";
    game.L_DEVELOPSKIN3 = "时装总战力：";
    game.L_DEVELOPSKIN4 = "已激活时装：";
    game.L_DEVELOPSKIN5 = "称号总战力：";
    game.L_DEVELOPSKIN6 = "已激活称号：";
    game.L_WEIKAIFANG = "未开放";
    game.L_WEIDASHU = "未打书";
    game.L_BTNDASHU = "打    书";
    //养成end
    game.L_WSUMMONUI0 = "该道具的获取途径";
    game.L_HFYBSX = "是否花费50绑元提升至七星奖励？";
    game.L_SFXH = "是否消耗";
    game.L_CLFB0 = "元宝扫荡？扫荡后可直接获得奖励";
    game.L_CLFB1 = "(超级划算,副本奖励价值远超购买花费)";
    game.L_CLFB2 = "正在战斗中，请稍后再挑战";
    game.L_CLFB3 = "可再扫荡一次";
    game.L_CLFB4 = "今日可扫荡次数：";
    game.L_CLFB5 = "今日可挑战次数：";
    game.L_YWB0 = "主角";
    game.L_YWB1 = "级开启";
    game.L_YWB2 = "你没有足够的挑战券";
    game.L_YWB3 = "BOSS已逃跑";
    game.L_YWB4 = "BOSS已被击杀";
    game.L_DQMYKBCDFA = "当前没有可保存的方案";
    game.L_ZKZG0 = "达到";
    game.L_ZKZG1 = "自动快速加入";
    game.L_ZKZG2 = "秒后";
    game.L_ZKZG3 = "级副本";
    game.L_ZKZG4 = "只有队长可以操作";
    game.L_ZKZG5 = "秒后自动挑战";
    game.L_ZKZG6 = "满员自动开启副本";
    game.L_ZKZG7 = "背包装备空位不足";
    game.L_TREASURE_FB0 = "第";
    game.L_TREASURE_FB1 = "关";
    game.L_TREASURE_FB2 = "藏宝图";
    game.L_TREASURE_FB4 = "秒后自动挖宝";
    game.L_TREASURE_FB5 = "点击自动挖宝";
    game.L_TREASURE_FB6 = "六星";
    game.L_TREASURE_FB7 = "十二星";
    game.L_TREASURE_FB8 = "十八星";
    game.L_TREASURE_FB9 = "没有可挖的宝藏";
    game.L_TREASURE_FB10 = "角色";
    game.L_TREASURE_FB11 = "级开启";
    game.L_TREASURE_FB12 = "通关藏宝图第";
    game.L_TREASURE_FB13 = "章获得";
    game.L_TREASURE_FB14 = "奖励";
    game.L_TOWER_FB0 = "自动挑战";
    game.L_TOWER_FB1 = "关";
    game.L_TOWER_FB2 = "没有可挑战的塔";
    game.L_HEAVEN_FB0 = "首次通关第";
    game.L_HEAVEN_FB1 = "层获得奖励";
    game.L_LVUPRWD_KEY_MAP = {
        0: "坐骑",
        1: "羽翼",
        2: "光武",
        3: "精灵",
        4: "兽魂",
        5: "光环",
        6: "仙阵",
        7: "境界",
        8: "天仙",
        9: "仙器",
        10: "仙云",
        11: "灵气",
    };
    game.L_GANG_INCENSE3 = "银子";
    game.L_GANG_INCENSE4 = "元宝";
    game.L_GANG_INCENSE5 = "绑元";
    game.L_GANG_INCENSE6 = "/60";
    game.L_GANG_INCENSE7 = "香火值可领取";
    game.L_GANG_INCENSE8 = "已上香";
    game.L_GANG_INCENSE9 = "上   香";
    game.L_GANG_INCENSE10 = "上香次数已达上限";
    game.L_GANG_INCENSE11 = "银两不足，不能上香";
    game.L_GANG_INCENSE12 = "绑元不足，不能上香";
    game.L_GANG_INCENSE13 = "元宝不足，不能上香";
    game.L_GANG_ASSISTANT = "帮主";
    game.L_GANG_DEPUTY_ASSISTANT = "副帮主";
    game.L_GANG_NORMAL_MEMBER = "成员";
    game.L_GANG_POSITION_MAP = {
        0: "无职位",
        1: game.L_GANG_ASSISTANT,
        2: game.L_GANG_DEPUTY_ASSISTANT,
        3: game.L_GANG_NORMAL_MEMBER,
    };
    game.L_GANGNO = "你还没有加入帮派";
    game.L_GANGYES = "你已加入帮派";
    game.L_GANGRECORD0 = "本帮成功创建";
    game.L_GANGRECORD1 = "加入了帮派";
    game.L_GANGRECORD2 = "离开了帮派";
    game.L_GANGRECORD3 = "职位调整成";
    game.L_GANGRECORD4 = "被";
    game.L_GANGRECORD5 = "踢出了帮派";
    game.L_GANGRECORD6 = "将帮主禅让给了";
    game.L_GANGRECORD7 = "长期不在线， 帮主退位给";
    game.L_GANGRECORD8 = "本帮帮派等级提升为";
    game.L_GANGRECORD9 = "级";
    game.L_GANGRECORD10 = "变更帮派的名字为";
    game.L_GANGCREATETIPS1 = "请输入帮派名称";
    game.L_GANGCREATETIPS2 = "请选择帮派类别";
    game.L_GANGCREATETIPS3 = "元宝不足，不能创建";
    game.L_GANGCREATETIPS4 = "创建1级帮需要达到vip4";
    game.L_GANGCREATETIPS5 = "创建2级帮需要达到vip6";
    game.L_GANGJOINTIPS1 = "当前无帮派可申请";
    game.L_GANGJOINTIPS2 = "等级不足52级不能申请帮派";
    game.L_GANGTIPS1 = "请输入帮派公告";
    game.L_GANGTIPS2 = "请输入帮派名字";
    game.L_GANGTIPS3 = "请输入有效的战力值";
    game.L_GANGTIPS4 = "需战力：";
    game.L_GANGTIPS5 = "需审核";
    game.L_GANGTIPS6 = "确定将";
    game.L_GANGTIPS7 = "踢出帮派？";
    game.L_GANGTIPS8 = "正在调整";
    game.L_GANGTIPS9 = "的职位，将其设置为？";
    game.L_GANGTIPS10 = "将此玩家设置为帮主，自己退位为普通成员。请谨慎操作";
    game.L_GANGTIPS11 = "将此玩家设置为副帮主";
    game.L_GANGTIPS12 = "将此玩家设置为普通成员";
    game.L_GANGTIPS13 = "当前已有2名副帮主";
    game.L_GANGTIPS14 = "你正在将";
    game.L_GANGTIPS15 = "设置为帮主，设置后自己将成为普通成员，请确认";
    game.L_GANGTIPS16 = "请选择职位";
    game.L_GANGTIPS17 = "确认将离开此帮？帮主之位将禅让给其他人";
    game.L_GANGTIPS18 = "确认将离开此帮？";
    game.L_GANGTIPS19 = "请输入自动申请的战力值";
    game.L_TTXY0 = "层";
    game.L_TTXY1 = "秒后自动挑战";
    game.L_TTXY2 = "自动挑战关卡";
    game.L_TTXY3 = "没有可以挑战的妖魔";
    game.L_TTXY4 = "第";
    game.L_TTXY5 = "层";
    game.L_NUMBERINPUT1 = "请输入有效的数值";
    game.L_GANG_FB0 = "级副本";
    game.L_GANG_FB1 = "级帮派开启";
    game.L_TEXT_INPUT1 = "请输入内容";
    game.L_TEXT_INPUT2 = "（最多可输入20个字）";
    game.L_GANG_BOSS0 = "小于1%";
    game.L_GANG_BOSS1 = "暂无";
    game.L_GANG_BOSS2 = "内击杀boss";
    game.L_GANG_BOSS3 = "秒后自动挑战";
    game.L_GANG_BOSS4 = "自动挑战";
    game.L_GANG_BOSS5 = "是否花费1000元宝立即秒杀BOSS";
    game.L_GANG_BOSS6 = "帮派等级达到";
    game.L_GANG_BOSS7 = "级开启";
    game.L_GANG_BOSS8 = "开启难度：";
    game.L_ACTIVTY_HELP = {
        1: 101,
        6: 102,
        30: 105,
        38: 103,
    };
    game.L_SHEZHICHENGGONG = "设置成功";
    game.L_GANG_LIVELY0 = "今日活跃值达到";
    game.L_GANG_LIVELY1 = "点";
    game.L_GANG_LIVELY2 = "已满级";
    game.L_BAGGRIDNUMMAX = "背包可扩充数量已达上限";
    game.L_NORONGLIAN = "当前无可熔炼的装备";
    game.L_MARRY_NOROLE = "请选择结婚对象";
    game.L_MARRY_NOGRADE = "请选择婚礼类型";
    game.L_MARRY_HUSBAND = "丈夫";
    game.L_MARRY_WIFE = "妻子";
    game.L_MARRY_TIPS = "向您发出求婚";
    game.L_MARRY_TIPS1 = "是否答应他";
    game.L_MARRY_TIPS2 = "获得感情不易，守住感情更难，真的要结束这段姻缘嘛？还请三思呀！";
    game.L_MARRY_TIPS3 = "茫茫人海遇见是缘，真的要拒绝对方的一片心嘛？";
    game.L_MARRY_TIPS4 = "和";
    game.L_MARRY_TIPS5 = "喜结连理";
    game.L_MARRY_TIPS6 = "你与";
    game.L_MARRY_TIPS7 = "在";
    game.L_MARRY_TIPS8 = "结为夫妻";
    game.L_MARRY_TIPS9 = "结婚费用";
    game.L_MARRY_TIPS10 = "结婚奖励";
    game.L_MARRY_TIPS11 = "没有符合结婚条件的好友";
    game.L_MARRY_TIPS12 = "确定消耗";
    game.L_MARRY_TIPS13 = "向新婚燕尔赠送礼金吗？";
    game.L_MARRY_TIPS14 = "赠送礼金后双方都可以获得礼金道具";
    game.L_XY_WALFARE = "未达成领取条件";
    game.L_XY_WALFARE0 = "虚位以待";
    game.L_GOLD_TREASURE_LOT = "正在抽奖中，请稍后再试";
    game.L_LEVEL_GIFT0 = "级礼包";
    game.L_LEVEL_GIFT1 = "级可领取";
    game.L_SIGN_GIFT0 = "可领取";
    game.L_RICH_GIFT0 = "充值";
    game.L_RICH_GIFT1 = "元";
    game.L_RICH_GIFT2 = "价值";
    game.L_RICH_GIFT3 = "元宝";
    game.L_TEXT_RECEIVE = "未达到领取条件，是否前往充值";
    game.L_ANSWER0 = "正确率：";
    game.L_ANSWER1 = "题";
    game.L_ANSWER2 = "答对";
    game.L_ANSWER3 = "道题奖励";
    game.L_PDYW0 = "领   取";
    game.L_PDYW1 = "前往击杀";
    game.L_PDYW2 = "已刷新";
    game.L_PDYW3 = "已击杀";
    game.L_PDYW4 = "已逃跑";
    game.L_FIRSTPLAY0 = "已报名";
    game.L_FIRSTPLAY1 = "第一局";
    game.L_FIRSTPLAY2 = "第二局";
    game.L_FIRSTPLAY3 = "第三局";
    game.L_FIRSTPLAY4 = "第四局";
    game.L_FIRSTPLAY5 = "第五局";
    game.L_FIRSTPLAY6 = "周二晚上";
    game.L_FIRSTPLAY7 = "周三晚上";
    game.L_FIRSTPLAY8 = "周四晚上";
    game.L_FIRSTPLAY9 = "周五晚上";
    game.L_TRAVEL = "游历";
    game.L_RECHSTORE = "可升至";
    game.L_GANG_MAP_TXT0 = "请问是否消耗";
    game.L_GANG_MAP_TXT1 = "元宝直接完成采矿任务？";
    game.L_GANG_MAP_TXT2 = "绑元重置任务？";
    game.L_GANG_MAP_TXT3 = "自己的花只能别人浇灌";
    game.L_GANG_MAP_TXT4 = "浇花次数已满";
    game.L_GANG_MAP_TXT5 = "刷新次数已用完";
    game.L_GANG_MAP_TXT6 = "元宝刷新物品？";
    game.L_GANG_MAP_TXT7 = "所需物品不足";
    game.L_GANG_MAP_TXT9 = "帮派内已经有过多的鲜花了";
    game.L_GANG_MAP_TXT8 = "每天可以帮助其他玩家完成花朵浇灌，帮助其他人可以获得心意礼物，你今天已经完成";
    game.L_GANG_MAP_TXT10 = "该花儿已完成浇灌";
    game.L_GANG_MAP_TXT11 = "场景中已中满花儿";
    game.L_GANG_MAP_TYPE0 = "挖矿中";
    game.L_GANG_MAP_TYPE1 = "种花中";
    game.L_GANG_MAP_TYPE2 = "浇花中";
    game.L_RECEIVED = "已领取";
    game.L_UPRIGHTDAN = "直升丹";
    game.L_SJZSX = "升级总属性";
    game.L_SJZSX2 = "升阶总属性";
    game.L_JCZSX = "加成总属性";
    game.L_ZZZSX = "资质总属性";
    game.L_QYZSX = "奇缘";
    game.L_POORDAY = "还差";
    game.L_JJJL0 = "阶可领取";
    game.L_QMJJ0 = "全民";
    game.L_QMJJ1 = "阶";
    game.L_QMJJ2 = "达到";
    game.L_QMJJ3 = "人";
    game.L_ZKSD0 = "折";
    game.L_ZKSD1 = "阶可购买";
    game.L_XMDX0 = "活动剩余时间：";
    game.L_TUANGOU = "团购";
    game.L_MIANFEI_GET = "免费领取";
    game.L_ANY_GET = "任意金额领取";
    game.L_YUANBAO_GET = "元宝领取";
    game.L_DAY_PAY_PNUM = "今日服务器首充人数达到";
    game.L_JIKE_GET = "人\n即可领取";
    game.L_ANY_MONEY_GET = "人\n且充值任意金额，即可领取";
    game.L_TOTAL_MONEY_GET = "人\n且累计充值";
    game.L_YUANBAO_JIKE_GET = "元宝即可领取";
    game.L_LUCAICHUZI = "鲁菜厨子";
    game.L_SUCAICHUZI = "苏菜厨子";
    game.L_YUECAICHUZI = "粤菜厨子";
    game.L_CHUANCAICHUZI = "川菜厨子";
    game.L_COOKERGOD0 = "完胜精英大奖";
    game.L_COOKERGOD1 = "其它胜利奖励1";
    game.L_COOKERGOD2 = "其它胜利奖励2";
    game.L_COOKERGOD3 = "其它胜利奖励3";
    game.L_ADDGANGFUNDS = "增加帮派资金";
    game.L_SERHGY0 = "开始倒计时：";
    game.L_SERHGY1 = "结束倒计时：";
    game.L_SERHGY2 = "开采人数：";
    game.L_SERHGY3 = "无法挑战该矿点";
    game.L_SERHGY4 = "前往";
    game.L_SERHGY5 = "挑战";
    game.L_SERHGY6 = "开采人数已达上限，请寻找其他矿开采";
    game.L_SERHGY7 = "是否停止开采并前往？";
    game.L_SERHGY8 = "开采";
    game.L_SERHGY9 = "矿点已被敌方占领，请先击败敌方防守者";
    game.L_SERHGY10 = "无法前往，请等待准备时间结束";
    game.L_SERHGY11 = "该区域不可前往";
    game.L_SERHGY12 = "正在开采中";
    game.L_SERHGY13 = "只有队长可以操作";
    game.L_SERHGY14 = "活动已结束";
    game.L_SERHGY15 = "活动暂未开启";
    game.L_SERHGY16 = "活动匹配中";
    game.L_SERHGY17 = "今日活动匹配失败，请下次再来";
    game.L_SERHGY18 = "跨服争霸排行榜暂未开启";
    game.L_RECH0 = "首充送";
    game.L_RECH1 = "充值得";
    game.L_RECH2 = "立返";
    game.L_OTHERPLAYER0 = "删除好友";
    game.L_OTHERPLAYER1 = "添加好友";
    game.L_OTHERPLAYER2 = "解除屏蔽";
    game.L_OTHERPLAYER3 = "屏蔽";
    game.L_SEARCH_ROLE = "请输入昵称或者id";
    game.L_CONTINUE_CONSUME_GET = "累计7天每天消费满8888元宝才可领取大奖";
    game.L_GONGXIJIESUO = "恭喜解锁新";
    game.L_XIANLV = "仙侣";
    game.L_CHONGWU = "宠物";
    game.L_CHENGHAO = "称号";
    game.L_ZAOXING = "造型";
    game.L_DANGQIAN = "当前";
    game.L_WEI = "为";
    game.L_USEGOUPJIE = "阶，使用后将立即提升一阶,是否使用?";
    game.L_GT6JIE = "大于6阶,使用后将获得700经验，是否使用?";
    game.L_SSJ_DI = "第";
    game.L_SSJ_NAN = "难";
    game.L_SSJ_JIE = "劫";
    game.L_SSJ_SHANGWEIKAIQI = "尚未开启";
    game.L_SSJ_HUIHE = "回合";
    game.L_SSJ_HUAFEI = "花费";
    game.L_SSJ_YBKQBX = "元宝开启宝箱可随机获得以下奖励";
    game.L_SSJ_JTHKKQ = "\n今天还可开启";
    game.L_SSJ_CI = "次";
    game.L_SSJ_ZHENGZAIDUIWUZHONG = "正在队伍中";
    game.L_SSJ_QINGXIANTONGGUAN = "请先通关上一劫";
    game.L_WLMZ0 = "对方正在战斗中";
    game.L_WLMZ1 = "51名及以后";
    game.L_INACTIVITY = "正在活动中，无法进入";
    game.L_DIANCIBANGZHU = "点此帮助";
    game.L_GANGFUBEN0 = "发起";
    game.L_GANGFUBEN1 = "级帮派副本，现需各位大侠帮助，感谢大家！";
    game.L_GANGFUBEN2 = "已在世界频道发布求助信息";
    game.L_YWC = "已完成";
    game.L_ZHENGZAIBANGPAINEI = "正在帮派内，无法加入"; //可优化
    game.L_ZHENGZAIKUAFU = "正在跨服，无法加入";
    game.L_ZUDUIZHONG = '组队中';
    game.AIXIYOUAISHENGHUO = '爱西游，爱生活，睡觉挂机好玩不累';
    game.L_KUAFUZHUAGUI = '跨服抓鬼';
    game.L_BANGPAIFUBEN = '帮派副本';
    game.L_SHENGSIJIE = '生死劫';
    game.L_FUHUOLINGBUZU = '复活令不足，是否前往材料商店购买';
    game.L_XYFL = "存储经验大于升级所需的200%，请先消耗经验再来领取";
    game.L_KAIFUJIESHU = "开服活动已结束";
    game.L_GODDESS_NAME = '天仙';
    game.L_GODDESS_SKILL = "天仙技能";
    game.L_GODDESS_EQUIP = "天仙装备";
    game.TABBTNSTRINGTX = '天 仙';
    game.TABBTNSTRINGXQ = '仙 器';
    game.TABBTNSTRINGXY = '仙 云';
    game.TABBTNSTRINGLQ = '灵 气';
    game.L_XIANQI_NAME = "仙器";
    game.L_XIANQI_SKILL = "仙器技能";
    game.L_XIANQI_EQUIP = "仙器装备";
    game.L_XIANYUN_NAME = "仙云";
    game.L_XIANYUN_SKILL = "仙云技能";
    game.L_XIANYUN_EQUIP = "仙云装备";
    game.L_LINGQI_SKILL = "灵气技能";
    game.L_LINGQI_EQUIP = "灵气装备";
    //野外boss复仇功能
    game.QIANGDUOLEWODE = "抢夺了我的";
    game.QIANGDUO = "抢夺";
    game.WEIZHANLING = "未占领";
    game.L_HTMLFILTER = "不能包含下列字符：\\，/，&lt;，&gt;，&amp;";
    game.DJBZWFQD = "等级不足，无法抢夺";
    game.SHIFOUBA = "是否把";
    game.BIAOJI2 = "标记";
    game.YICHU2 = "移除";
    game.L_NOWEARQILING = "该部位未穿戴器灵";
    game.L_ROLELVLOW = "角色等级不足，无法升阶";
    game.L_CAILIAOLOW = "材料不足，无法升阶";
    game.L_XLCAILIAOLOW = "材料不足，无法洗炼";
    game.L_CLCAILIAOLOW = "材料不足，无法淬炼";
    game.L_BASEPROPUP = "基础属性提升";
    game.L_PROPSUCCESS = "属性洗炼成功";
    game.L_SELQLGRADEUP = "选中器灵中有穿戴等级较高的器灵，是否分解";
    game.L_DAYNOTIP = "今天不在显示";
    game.L_POSPROPMAX = "当前部位极品属性已满，无需洗练";
    game.L_CUILIANFAILE = "淬炼失败";
    game.L_LVGM = "提升器灵总等级，获得更强等阶共鸣属性";
    game.L_LVGMMAX = "器灵等阶共鸣属性已达上限";
    game.L_CNGM = "佩戴更多器灵，获得更强连锁共鸣属性";
    game.L_CNGMMAX = "器灵连锁共鸣属性已达上限";
    game.L_JIAN = "件";
})(game || (game = {}));
//# sourceMappingURL=lang_config.js.map