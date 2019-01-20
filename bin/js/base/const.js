// 游戏备注
// 本次登录不再提示关键字
// channel_get_cost_gold  
// 游戏宏定义
var base;
(function (base) {
    base.HUMAN_MALE = 101;
    base.HUMAN_FEMALE = 102;
    base.SEX_MALE = 1;
    base.SEX_FEMALE = 2;
    base.PLAYER_LV_MAX = 200;
    base.WARPOS_RIGHTLEADER = 1; //战斗位我方leader
    base.WARPOS_LEFTLEADER = 21; //战斗位敌方leader
    base.ONCETASK_ID_OPERA_START = 10001; //剧情开始
    base.ONCETASK_ID_OPERA_END = 10017; //剧情结束
    base.ONCETASK_ID_OPERA_SECOND = 10011; //剧情第二幕场景
    base.TEXT_FONTSIZE = 48;
    base.TEXT_FONTSIZE_BIG = 60;
    base.TEXT_FONTSIZE_SMALL = 40;
    base.GUAJI_SCENE_START = 2000; //挂机场景id起始
    base.GUAJI_SCENE_END = 2499; //挂机场景id截止
    base.CROSS_SERVER_SCENE_START = 2500; //跨服场景id起始
    base.CROSS_SERVER_SCENE_END = 2999; //跨服场景id截止
    base.CROSS_WLMZ_SCENE_START = 2501; //武林盟主场景id起始
    base.CROSS_WLMZ_SCENE_END = 2507; //武林盟主场景id截止
    base.GANG_MAP_SCENE_START = 3001; //帮派地图场景id起始
    base.GANG_MAP_SCENE_END = 3003; //帮派地图场景id截止
    base.COIN_ARR = [1, 2, 3];
    base.COIN_MAP = {
        1: 997,
        2: 998,
        3: 999
    };
    base.PLAYER_STATUS_NONE = 0; //无状态
    base.PLAYER_STATUS_COMBAT = 1; //战斗
    base.ITEMTYPE_EQUIP_START = 100; //装备类物品类型起始
    base.ITEMTYPE_EQUIP_END = 199; //装备类物品类型截止
    base.ITEMTYPE_COST_START = 200; //消耗类物品类型起始
    base.ITEMTYPE_COST_END = 299; //消耗类物品类型截止
    base.ITEMTYPE_DEVELOP_START = 111; //养成装备起始
    base.ITEMTYPE_DEVELOP_END = 158; //养成装备截止，这个做法很危险，限制只用来显示评分的？，不得做他用
    //装备类100-199
    base.ITEM_WEAPON = 101; //人物武器
    base.ITEM_NECKLACE = 102; //人物项链
    base.ITEM_SHOULDER = 103; //人物护肩
    base.ITEM_CUFF = 104; //人物护腕
    base.ITEM_RING = 105; //人物戒指
    base.ITEM_HELMET = 106; //人物头盔
    base.ITEM_CLOTHES = 107; //人物衣服
    base.ITEM_BELT = 108; //人物腰带
    base.ITEM_PANTS = 109; //人物裤子
    base.ITEM_SHOES = 110; //人物鞋子
    base.ITEM_JIAO = 111; //坐骑角
    base.ITEM_SHENG = 112; //坐骑绳
    base.ITEM_AN = 113; //坐骑鞍
    base.ITEM_DENG = 114; //坐骑镫
    base.ITEM_YU = 115; //羽翼羽
    base.ITEM_JING = 116; //羽翼晶
    base.ITEM_SI = 117; //羽翼丝
    base.ITEM_HUA = 118; //羽翼华
    base.ITEM_WEAPON1 = 135; //光武1
    base.ITEM_WEAPON2 = 136; //光武2
    base.ITEM_WEAPON3 = 137; //光武3
    base.ITEM_WEAPON4 = 138; //光武4
    base.ITEM_ELF1 = 139; //精灵1
    base.ITEM_ELF2 = 140; //精灵2
    base.ITEM_ELF3 = 141; //精灵3
    base.ITEM_ELF4 = 142; //精灵4
    base.ITEM_HE = 119; //兽魂核
    base.ITEM_SUN = 120; //兽魂髓
    base.ITEM_WU = 121; //兽魂雾
    base.ITEM_XUAN = 122; //兽魂炫
    base.ITEM_JI = 123; //光环基
    base.ITEM_MANG = 124; //光环芒
    base.ITEM_YUN = 125; //光环晕
    base.ITEM_YI = 126; //光环熠
    base.ITEM_ZHEN1 = 127; //仙阵1
    base.ITEM_ZHEN2 = 128; //仙阵2
    base.ITEM_ZHEN3 = 129; //仙阵3
    base.ITEM_ZHEN4 = 130; //仙阵4
    base.ITEM_REALM1 = 131; //境界1
    base.ITEM_REALM2 = 132; //境界2
    base.ITEM_REALM3 = 133; //境界3
    base.ITEM_REALM4 = 134; //境界4
    base.ITEM_ANGEL1 = 143; //天仙1
    base.ITEM_ANGEL2 = 144; //天仙2
    base.ITEM_ANGEL3 = 145; //天仙3
    base.ITEM_ANGEL4 = 146; //天仙4
    base.ITEM_WAND1 = 147; //仙器（魔杖）1
    base.ITEM_WAND2 = 148; //仙器2
    base.ITEM_WAND3 = 149; //仙器3
    base.ITEM_WAND4 = 150; //仙器4
    base.ITEM_CLOUD1 = 151; //仙云1
    base.ITEM_CLOUD2 = 152; //仙云2
    base.ITEM_CLOUD3 = 153; //仙云3
    base.ITEM_CLOUD4 = 154; //仙云4
    base.ITEM_HALO1 = 155; //仙气1
    base.ITEM_HALO2 = 156; //仙气2
    base.ITEM_HALO3 = 157; //仙气3
    base.ITEM_HALO4 = 158; //仙气4
    base.ITEM_SWEAPON = 159; //器灵武器
    base.ITEM_SNECKLACE = 160; //器灵项链
    base.ITEM_SSHOULDER = 161; //器灵护肩
    base.ITEM_SCUFF = 162; //器灵护腕
    base.ITEM_SRING = 163; //器灵戒指
    base.ITEM_SHELMET = 164; //器灵头盔
    base.ITEM_SCLOTHES = 165; //器灵衣服
    base.ITEM_SBELT = 166; //器灵腰带
    base.ITEM_SPANTS = 167; //器灵裤子
    base.ITEM_SSHOES = 168; //器灵鞋子
    //消耗品类200-999
    base.ITEM_FORGE_COST = 202; //装备强化消耗
    base.ITEM_FASHION_SKINCARD = 203; //时装卡
    base.ITEM_BOSSBACK_COST = 204; //全民BOSS复活令
    base.ITEM_TITLE_SKINCARD = 205; //称号卡
    base.ITEM_DANYAO = 206; //丹药
    base.ITEM_JINGMAI = 207; //丹药
    base.ITEM_SUMMON_CARD = 210; //宠物卡
    base.ITEM_SUMMON_COST = 211; //宠物消耗品
    base.ITEM_SUMMON_PIECE = 212; //宠物碎片
    base.ITEM_PARTNER_COST = 215; //仙侣消耗品
    base.ITEM_PARTNER_CARD = 216; //仙侣卡
    base.ITEM_PARTNER_PIECE = 217; //仙侣卡碎片
    base.ITEM_HORSE_COST = 225; //坐骑消耗品
    base.ITEM_HORSE_SKINCARD = 226; //坐骑皮肤卡
    base.ITEM_WING_COST = 230; //羽翼消耗品
    base.ITEM_WING_SKINCARD = 231; //羽翼皮肤卡
    base.ITEM_ELF_COST = 235; //精灵消耗品
    base.ITEM_ELF_SKINCARD = 236; //精灵皮肤卡
    base.ITEM_WEAPON_COST = 237; //光武消耗品
    base.ITEM_WEAPON_SKINCARD = 238; //光武皮肤卡
    base.ITEM_AURA_COST = 239; //光环消耗品
    base.ITEM_SOUL_COST = 241; //兽魂消耗品
    base.ITEM_ZHEN_COST = 243; //仙阵消耗品
    base.ITEM_REALM_COST = 245; //境界消耗品
    base.ITEM_ANGLE_COST = 247; //天仙养成消耗
    base.ITEM_ANGLE_SKINCARD = 248; //天仙皮肤卡
    base.ITEM_WAND_COST = 249; //仙器养成消耗
    base.ITEM_CLOUD_COST = 250; //仙云养成消耗
    base.ITEM_HALO_COST = 251; //仙气养成消耗
    //道具使用
    base.ITEM_USE_GO = 0; //前往
    base.ITEM_USE_ONE = 1; //使用
    base.ITEM_USE_BATCH = 2; //批量使用
    base.ITEM_USE_CPS = 3; //合成
    //各级品质
    base.QT_GRAY = 0;
    base.QT_GREEN = 1;
    base.QT_BLUE = 2;
    base.QT_PURPLE = 3;
    base.QT_GOLD = 4;
    base.QT_RED = 5;
    //各级品质颜色
    base.QT_COLOR_GRAY = "#FFFFFF";
    base.QT_COLOR_GREEN = "#12A710";
    base.QT_COLOR_BLUE = "#11B0E5";
    base.QT_COLOR_PURPLE = "#C63EED";
    base.QT_COLOR_GOLD = "#F29E07";
    base.QT_COLOR_RED = "#ED3E46";
    base.QT_COLOR_GRAY2 = "#FFFFFF";
    base.QT_COLOR_GREEN2 = "#00FF1E";
    base.QT_COLOR_BLUE2 = "#00FFFF";
    base.QT_COLOR_PURPLE2 = "#B000AA";
    base.QT_COLOR_GOLD2 = "#FFFF00";
    base.QT_COLOR_RED2 = "#FF2828";
    //装备pos
    base.POS_WEAPON = 1; //人物武器
    base.POS_NECKLACE = 2; //人物项链
    base.POS_SHOULDER = 3; //人物护肩
    base.POS_CUFF = 4; //人物护腕
    base.POS_RING = 5; //人物戒指
    base.POS_HELMET = 6; //人物头盔
    base.POS_CLOTHES = 7; //人物衣服
    base.POS_BELT = 8; //人物腰带
    base.POS_PANTS = 9; //人物裤子
    base.POS_SHOES = 10; //人物鞋子
    base.POS_JIAO = 11; //坐骑角
    base.POS_SHENG = 12; //坐骑绳
    base.POS_AN = 13; //坐骑鞍
    base.POS_DENG = 14; //坐骑镫
    base.POS_YU = 15; //羽翼羽
    base.POS_JING = 16; //羽翼晶
    base.POS_SI = 17; //羽翼丝
    base.POS_HUA = 18; //羽翼华
    base.POS_WEAPON1 = 35; //光武1
    base.POS_WEAPON2 = 36; //光武2
    base.POS_WEAPON3 = 37; //光武3
    base.POS_WEAPON4 = 38; //光武4
    base.POS_ELF1 = 39; //精灵1
    base.POS_ELF2 = 40; //精灵2
    base.POS_ELF3 = 41; //精灵3
    base.POS_ELF4 = 42; //精灵4
    base.POS_HE = 19; //兽魂核
    base.POS_SUN = 20; //兽魂髓
    base.POS_WU = 21; //兽魂雾
    base.POS_XUAN = 22; //兽魂炫
    base.POS_JI = 23; //光环基
    base.POS_MANG = 24; //光环芒
    base.POS_YUN = 25; //光环晕
    base.POS_YI = 26; //光环熠
    base.POS_ZHEN1 = 27; //仙阵1
    base.POS_ZHEN2 = 28; //仙阵2
    base.POS_ZHEN3 = 29; //仙阵3
    base.POS_ZHEN4 = 30; //仙阵4
    base.POS_REALM1 = 31; //境界1
    base.POS_REALM2 = 32; //境界2
    base.POS_REALM3 = 33; //境界3
    base.POS_REALM4 = 34; //境界4
    base.POS_ANGLE1 = 43; //天仙1
    base.POS_ANGLE2 = 44; //天仙2
    base.POS_ANGLE3 = 45; //天仙3
    base.POS_ANGLE4 = 46; //天仙4
    base.POS_WAND1 = 47; //仙器1
    base.POS_WAND2 = 48; //仙器2
    base.POS_WAND3 = 49; //仙器3
    base.POS_WAND4 = 50; //仙器4
    base.POS_CLOUD1 = 51; //仙云1
    base.POS_CLOUD2 = 52; //仙云2
    base.POS_CLOUD3 = 53; //仙云3
    base.POS_CLOUD4 = 54; //仙云4
    base.POS_HALO1 = 55; //灵气1
    base.POS_HALO2 = 56; //灵气2
    base.POS_HALO3 = 57; //灵气3
    base.POS_HALO4 = 58; //灵气4
    base.POS_SWEAPON = 59; //器灵武器
    base.POS_SNECKLACE = 60; //器灵项链
    base.POS_SSHOULDER = 61; //器灵护肩
    base.POS_SCUFF = 62; //器灵护腕
    base.POS_SRING = 63; //器灵戒指
    base.POS_SHELMET = 64; //器灵头盔
    base.POS_SCLOTHES = 65; //器灵衣服
    base.POS_SBELT = 66; //器灵腰带
    base.POS_SPANTS = 67; //器灵裤子
    base.POS_SSHOES = 68; //器灵鞋子
    base.POS_EQUIP_MAX = 99; //装备位上限
    //格子数量上限
    base.EQUIP_GRID_MAX = 600;
    base.EQUIP_GRID_BUY_MAX = 200; //可用金子购买的格子上限
    //颜色码
    base.FORMAT_COLOR = {
        '#C0&': '#FFFFFF',
        '#C1&': '#12A710',
        '#C2&': '#11B0E5',
        '#C3&': '#C63EED',
        '#C4&': '#F29E07',
        '#C5&': '#ED3E46',
        '#C6&': '#ED3E46',
        '#C7&': '#BD8651',
        '#C8&': '#12A710',
        '#C9&': '#A83937',
        '#C10&': '#6D4B46',
        '#C11&': '#ED3E46',
        '#C12&': '#00FFFF',
        '#C13&': '#FFBFD0',
        '#C14&': '#F8F078',
        '#C15&': '#FFFF00',
        '#C16&': '#12A710',
        '#C17&': '#F8FC00',
        '#C18&': '#00FF1E',
        '#C19&': '#B000AA',
        '#C20&': '#FF2828',
        '#C99&': '#000000',
    };
    //表情码
    base.FORMAT_EMOTION = {
        '#0': '#E0&',
        '#1': '#E1&',
        '#2': '#E2&',
        '#3': '#E3&',
        '#4': '#E4&',
        '#5': '#E5&',
        '#6': '#E6&',
        '#7': '#E7&',
        '#8': '#E8&',
        '#9': '#E9&',
        '#10': '#E10&',
        '#11': '#E11&',
        '#12': '#E12&',
        '#13': '#E13&',
        '#14': '#E14&',
        '#15': '#E15&',
        '#16': '#E16&',
        '#17': '#E17&',
        '#18': '#E18&',
        '#19': '#E19&',
        '#20': '#E20&',
        '#21': '#E21&',
        '#22': '#E22&',
        '#23': '#E23&',
        '#24': '#E24&',
        '#25': '#E25&',
        '#26': '#E26&',
        '#27': '#E27&',
        '#28': '#E28&',
        '#29': '#E29&',
        '#30': '#E30&',
        '#31': '#E31&',
        '#32': '#E32&',
        '#33': '#E33&',
        '#34': '#E34&',
        '#35': '#E35&',
    };
    base.SET_EMOTION_URL = {
        '#E0&': 'emotion/face0.png',
        '#E1&': 'emotion/face1.png',
        '#E2&': 'emotion/face2.png',
        '#E3&': 'emotion/face3.png',
        '#E4&': 'emotion/face4.png',
        '#E5&': 'emotion/face5.png',
        '#E6&': 'emotion/face6.png',
        '#E7&': 'emotion/face7.png',
        '#E8&': 'emotion/face8.png',
        '#E9&': 'emotion/face9.png',
        '#E10&': 'emotion/face10.png',
        '#E11&': 'emotion/face11.png',
        '#E12&': 'emotion/face12.png',
        '#E13&': 'emotion/face13.png',
        '#E14&': 'emotion/face14.png',
        '#E15&': 'emotion/face15.png',
        '#E16&': 'emotion/face16.png',
        '#E17&': 'emotion/face17.png',
        '#E18&': 'emotion/face18.png',
        '#E19&': 'emotion/face19.png',
        '#E20&': 'emotion/face20.png',
        '#E21&': 'emotion/face21.png',
        '#E22&': 'emotion/face22.png',
        '#E23&': 'emotion/face23.png',
        '#E24&': 'emotion/face24.png',
        '#E25&': 'emotion/face25.png',
        '#E26&': 'emotion/face26.png',
        '#E27&': 'emotion/face27.png',
        '#E28&': 'emotion/face28.png',
        '#E29&': 'emotion/face29.png',
        '#E30&': 'emotion/face30.png',
        '#E31&': 'emotion/face31.png',
        '#E32&': 'emotion/face32.png',
        '#E33&': 'emotion/face33.png',
        '#E34&': 'emotion/face34.png',
        '#E35&': 'emotion/face35.png',
    };
    //字号码
    base.FORMAT_FONT = {
        '#F0&': '30',
        '#F1&': '35',
        '#F2&': '40',
        '#F3&': '45',
        '#F4&': '50',
        '#F5&': '55',
        '#F6&': '60',
        '#F7&': '65',
        '#F8&': '70',
        '#F9&': '75'
    };
    //图片URL
    base.SET_PICTURE_URL = {
        '#P0&': 'emotion/face0.png',
        '#P1&': 'emotion/face0.png',
        '#P2&': 'emotion/face0.png',
        '#P3&': 'emotion/face0.png',
        '#P4&': 'emotion/face0.png',
        '#P5&': 'emotion/face0.png',
        '#P6&': 'emotion/face0.png',
        '#P7&': 'emotion/face0.png',
        '#P8&': 'emotion/face0.png',
        '#P9&': 'emotion/face0.png'
    };
    // 频道
    base.CHANNEL_GANG = 2;
    base.CHANNEL_WORLD = 3;
    base.CHANNEL_ACROSSSVR = 4;
    base.CHANNEL_SYS = 6;
    base.CHANNEL_RECRUIT = 7;
    // 属性相关
    base.PROP_HP = 0x80; //生命
    base.PROP_ATK = 0x81; //攻击
    base.PROP_DEF = 0x82; //防御
    base.PROP_ID_ARR = [0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87]; //多用来顺序显示
    base.PROP_KEYSTR_ARR = ["hp", "atk", "def", "spd", "cri", "res", "hit", "dod"];
    base.PROP_KEYSTR_2_ID_MAP = {
        "hp": 0x80,
        "atk": 0x81,
        "def": 0x82,
        "spd": 0x83,
        "cri": 0x84,
        "res": 0x85,
        "hit": 0x86,
        "dod": 0x87,
    };
    // 属性战斗力计算系数
    base.PROP_RATIO_MAP = {
        0x80: 0.5,
        0x81: 5,
        0x82: 5,
        0x83: 250,
        0x84: 10,
        0x85: 10,
        0x86: 10,
        0x87: 10,
    };
    // 属性相关end
    // 宠物
    base.SUMMON_LV_MAX = 200; // 宠物等级最高
    base.SUMMON_APT_LV_MAX = 5; // 宠物资质等级最高
    // 宠物end
    // 仙侣
    base.PARTNER_LV_MAX = 15; // 仙侣升阶最高
    base.PARTNER_STAR_LV_MAX = 7; // 仙侣升星最高
    base.PARTNER_YUAN_LV_MAX = 10; // 仙侣仙缘最高
    // 仙侣end
    // 养成系统
    base.DEVELOP_LV_MAX = 15; // 养成升阶等级最高
    base.DEVELOP_SKILL_LV_MAX = 15; // 养成技能等级最高
    base.DEVELOP_SKILL_OPENLV_ARR = [2, 3, 5, 7];
    // export let DEVELOP_EQUIP_SKIN_ARR:Array<string> = ["develop/1/1.png", "develop/1/2.png", "develop/1/3.png", "develop/1/4.png"];
    base.DEVELOP_JINGMAI_LV_MAX = 10; // 经脉等级最高
    base.DEVELOP_JINGMAI_EXP_MAX = 11; // 经脉进度最高
    // 养成系统end
    // 帮派
    base.GANG_ASSISTANT = 1; // 帮主
    base.GANG_DEPUTY_ASSISTANT = 2; // 副帮主
    base.GANG_NORMAL_MEMBER = 3; // 帮众
    base.GANG_LV_MIN = 52; //入帮最低要求等级
    // 帮派end
    // 排行榜
    base.RANK_LEVEL = 1; // 等级榜
    base.RANK_MAINROUND = 2; // 主线关卡
    base.RANK_TREASURE = 3; //上古秘宝
    base.RANK_TOWER = 4; //大雁神塔
    base.RANK_HEAVEN = 5; //天庭降妖
    base.RANK_WEAPON = 6; //光武
    base.RANK_ELF = 7; //精灵
    base.RANK_HORSE = 8; //坐骑
    base.RANK_WING = 9; //羽翼
    base.RANK_XIANZHEN = 10; //仙阵
    base.RANK_JINGJIE = 11; //境界
    base.RANK_GUANGHUAN = 12; //光环
    base.RANK_SHOUHUN = 13; //兽魂
    base.RANK_ZHANLI = 14; //战力
    base.RANK_CONSUME = 15; //消费排行
    // 排行榜 end
    // 活动编号
    base.ACTIVITY_DAILY_ANSWER = 6; // 每日答题
    base.ACTIVITY_PANDA_KF = 13; //熊猫大侠活动开服
    base.ACTIVITY_PANDA_LX = 12; //熊猫大侠活动轮循
    base.ACTIVITY_TOTAL_PAY_KF = 15; //累充活动开服
    base.ACTIVITY_TOTAL_PAY_LX = 14; //累充活动轮循
    base.ACTIVITY_GO_NEXT_LV = 16; //直升一阶
    base.ACTIVITY_DEVELOP_RWD = 17; //养成进阶奖励
    base.ACTIVITY_DEVELOP_RANK = 18; //养成进阶排行
    base.ACTIVITY_COMMON_UPGRADE = 19; //全民进阶
    base.ACTIVITY_GROW_UP = 20; //成长基金
    base.ACTIVITY_INVEST = 21; //投资计划
    base.ACTIVITY_FIRST_PAY_GROUP = 22; //首充团购
    base.ACTIVITY_COMMON_RUSHGRADE = 25; //全民冲级
    base.ACTIVITY_OPENPLAY_RWD = 26; //全民冲级
    base.ACTIVITY_COOKERGOD = 27; //食神挑战
    base.ACTIVITY_PURCHASE_GIFT_BAG = 28; //10元购
    base.ACTIVITY_TODAY_GIFT_KF = 29; //今日豪礼 开服 
    base.ACTIVITY_TODAY_GIFT_LX = 31; //今日豪礼 轮循 
    base.ACTIVITY_RECHARGE_GIFT = 32; //充值大礼
    base.ACTIVITY_KFHD = 35; //开服活动大厅
    base.ACTIVITY_CONTINUE_CONSUME = 33; //连续消费
    base.ACTIVITY_CONSUME_RANK = 34; //消费排行
    // 活动编号end
    //avatar类型
    base.HINTTYPE_SKIN = 0x81;
    base.HINTTYPE_TITLE = 0x82;
    base.HINTTYPE_RIDE = 0x83;
    base.HINTTYPE_RIDE_SKIN = 0x84;
    base.HINTTYPE_WING = 0x85;
    base.HINTTYPE_WING_SKIN = 0x86;
    base.HINTTYPE_GUANGWU = 0x87;
    base.HINTTYPE_GUANGWU_SKIN = 0x88;
    base.HINTTYPE_JINGLING = 0x89;
    base.HINTTYPE_JINGLING_SKIN = 0x8a;
    base.HINTTYPE_SUMMON = 0x90;
    base.HINTTYPE_SUMMONAURA = 0x91;
    base.HINTTYPE_SUMMONSOUL = 0x92;
    base.HINTTYPE_PARTNER = 0x93;
    base.HINTTYPE_PARTNERJINGJIE = 0x94;
    base.HINTTYPE_PARTNERXIANZHEN = 0x95;
    // 跨服争霸 start
    base.SERGHY_NOOPD = 0; // 无人占领 
    base.SERGHY_OWN = 1; // 己方占领 
    base.SERGHY_ENEMY = 2; // 敌方占领 
    // 跨服争霸 end
    // 场景玩家的状态
    base.SCENE_PLAYER_FREE = 0; // 空闲
    base.SCENE_PLAYER_COMBAT = 1; // 战斗中
    // 帮派地图 状态
    base.GANG_MAP_MINGING = 0; // 挖矿
    base.GANG_MAP_PLANT = 1; // 种植
    base.GANG_MAP_WATER = 2; // 浇水
})(base || (base = {}));
//# sourceMappingURL=const.js.map