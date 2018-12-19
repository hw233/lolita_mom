// 游戏备注
// 本次登录不再提示关键字
// channel_get_cost_gold  

// 游戏宏定义
module base {
    export const HUMAN_MALE: number = 101;
    export const HUMAN_FEMALE: number = 102;

    export const SEX_MALE: number = 1;
    export const SEX_FEMALE: number = 2;

    export const PLAYER_LV_MAX: number = 200;

    export const WARPOS_RIGHTLEADER = 1;  //战斗位我方leader
    export const WARPOS_LEFTLEADER = 21;  //战斗位敌方leader

    export const ONCETASK_ID_OPERA_START = 10001;  //剧情开始
    export const ONCETASK_ID_OPERA_END = 10017;  //剧情结束
    export const ONCETASK_ID_OPERA_SECOND = 10011;  //剧情第二幕场景

    export const TEXT_FONTSIZE: number = 48;
    export const TEXT_FONTSIZE_BIG: number = 60;
    export const TEXT_FONTSIZE_SMALL: number = 40;

    export const GUAJI_SCENE_START: number = 2000;  //挂机场景id起始
    export const GUAJI_SCENE_END: number = 2499;  //挂机场景id截止

    export const CROSS_SERVER_SCENE_START: number = 2500;  //跨服场景id起始
    export const CROSS_SERVER_SCENE_END: number = 2999;  //跨服场景id截止

    export const CROSS_WLMZ_SCENE_START: number = 2501;  //武林盟主场景id起始
    export const CROSS_WLMZ_SCENE_END: number = 2507;  //武林盟主场景id截止

    export const GANG_MAP_SCENE_START: number = 3001;  //帮派地图场景id起始
    export const GANG_MAP_SCENE_END: number = 3003;  //帮派地图场景id截止

    export const COIN_ARR = [1, 2, 3];
    export const COIN_MAP = {
        1: 997,
        2: 998,
        3: 999
    };

    export const PLAYER_STATUS_NONE: number = 0;  //无状态
    export const PLAYER_STATUS_COMBAT: number = 1;  //战斗

    export const ITEMTYPE_EQUIP_START: number = 100; //装备类物品类型起始
    export const ITEMTYPE_EQUIP_END: number = 199;   //装备类物品类型截止
    export const ITEMTYPE_COST_START: number = 200;  //消耗类物品类型起始
    export const ITEMTYPE_COST_END: number = 299;    //消耗类物品类型截止

    export const ITEMTYPE_DEVELOP_START: number = 111;  //养成装备起始
    export const ITEMTYPE_DEVELOP_END: number = 158;    //养成装备截止，这个做法很危险，限制只用来显示评分的？，不得做他用

    //装备类100-199
    export const ITEM_WEAPON: number = 101; //人物武器
    export const ITEM_NECKLACE: number = 102; //人物项链
    export const ITEM_SHOULDER: number = 103; //人物护肩
    export const ITEM_CUFF: number = 104; //人物护腕
    export const ITEM_RING: number = 105; //人物戒指
    export const ITEM_HELMET: number = 106; //人物头盔
    export const ITEM_CLOTHES: number = 107; //人物衣服
    export const ITEM_BELT: number = 108; //人物腰带
    export const ITEM_PANTS: number = 109; //人物裤子
    export const ITEM_SHOES: number = 110; //人物鞋子
    export const ITEM_JIAO: number = 111; //坐骑角
    export const ITEM_SHENG: number = 112; //坐骑绳
    export const ITEM_AN: number = 113; //坐骑鞍
    export const ITEM_DENG: number = 114; //坐骑镫
    export const ITEM_YU: number = 115; //羽翼羽
    export const ITEM_JING: number = 116; //羽翼晶
    export const ITEM_SI: number = 117; //羽翼丝
    export const ITEM_HUA: number = 118; //羽翼华
    export const ITEM_WEAPON1: number = 135; //光武1
    export const ITEM_WEAPON2: number = 136; //光武2
    export const ITEM_WEAPON3: number = 137; //光武3
    export const ITEM_WEAPON4: number = 138; //光武4
    export const ITEM_ELF1: number = 139; //精灵1
    export const ITEM_ELF2: number = 140; //精灵2
    export const ITEM_ELF3: number = 141; //精灵3
    export const ITEM_ELF4: number = 142; //精灵4
    export const ITEM_HE: number = 119; //兽魂核
    export const ITEM_SUN: number = 120; //兽魂髓
    export const ITEM_WU: number = 121; //兽魂雾
    export const ITEM_XUAN: number = 122; //兽魂炫
    export const ITEM_JI: number = 123; //光环基
    export const ITEM_MANG: number = 124; //光环芒
    export const ITEM_YUN: number = 125; //光环晕
    export const ITEM_YI: number = 126; //光环熠
    export const ITEM_ZHEN1: number = 127; //仙阵1
    export const ITEM_ZHEN2: number = 128; //仙阵2
    export const ITEM_ZHEN3: number = 129; //仙阵3
    export const ITEM_ZHEN4: number = 130; //仙阵4
    export const ITEM_REALM1: number = 131; //境界1
    export const ITEM_REALM2: number = 132; //境界2
    export const ITEM_REALM3: number = 133; //境界3
    export const ITEM_REALM4: number = 134; //境界4
    export const ITEM_ANGEL1: number = 143; //天仙1
    export const ITEM_ANGEL2: number = 144; //天仙2
    export const ITEM_ANGEL3: number = 145; //天仙3
    export const ITEM_ANGEL4: number = 146; //天仙4
    export const ITEM_WAND1: number = 147; //仙器（魔杖）1
    export const ITEM_WAND2: number = 148; //仙器2
    export const ITEM_WAND3: number = 149; //仙器3
    export const ITEM_WAND4: number = 150; //仙器4
    export const ITEM_CLOUD1: number = 151; //仙云1
    export const ITEM_CLOUD2: number = 152; //仙云2
    export const ITEM_CLOUD3: number = 153; //仙云3
    export const ITEM_CLOUD4: number = 154; //仙云4
    export const ITEM_HALO1: number = 155; //仙气1
    export const ITEM_HALO2: number = 156; //仙气2
    export const ITEM_HALO3: number = 157; //仙气3
    export const ITEM_HALO4: number = 158; //仙气4

    export const ITEM_SWEAPON: number = 159; //器灵武器
    export const ITEM_SNECKLACE: number = 160; //器灵项链
    export const ITEM_SSHOULDER: number = 161; //器灵护肩
    export const ITEM_SCUFF: number = 162; //器灵护腕
    export const ITEM_SRING: number = 163; //器灵戒指
    export const ITEM_SHELMET: number = 164; //器灵头盔
    export const ITEM_SCLOTHES: number = 165; //器灵衣服
    export const ITEM_SBELT: number = 166; //器灵腰带
    export const ITEM_SPANTS: number = 167; //器灵裤子
    export const ITEM_SSHOES: number = 168; //器灵鞋子

    //消耗品类200-999
    export const ITEM_FORGE_COST: number = 202;  //装备强化消耗
    export const ITEM_FASHION_SKINCARD: number = 203;  //时装卡
    export const ITEM_BOSSBACK_COST: number = 204;  //全民BOSS复活令
    export const ITEM_TITLE_SKINCARD: number = 205;  //称号卡
    export const ITEM_DANYAO: number = 206;  //丹药
    export const ITEM_JINGMAI: number = 207;  //丹药
    export const ITEM_SUMMON_CARD: number = 210;  //宠物卡
    export const ITEM_SUMMON_COST: number = 211;  //宠物消耗品
    export const ITEM_SUMMON_PIECE: number = 212;  //宠物碎片
    export const ITEM_PARTNER_COST: number = 215;  //仙侣消耗品
    export const ITEM_PARTNER_CARD: number = 216;  //仙侣卡
    export const ITEM_PARTNER_PIECE: number = 217;  //仙侣卡碎片
    export const ITEM_HORSE_COST: number = 225;  //坐骑消耗品
    export const ITEM_HORSE_SKINCARD: number = 226;  //坐骑皮肤卡
    export const ITEM_WING_COST: number = 230;  //羽翼消耗品
    export const ITEM_WING_SKINCARD: number = 231;  //羽翼皮肤卡
    export const ITEM_ELF_COST: number = 235;  //精灵消耗品
    export const ITEM_ELF_SKINCARD: number = 236;  //精灵皮肤卡
    export const ITEM_WEAPON_COST: number = 237;  //光武消耗品
    export const ITEM_WEAPON_SKINCARD: number = 238;  //光武皮肤卡
    export const ITEM_AURA_COST: number = 239;  //光环消耗品
    export const ITEM_SOUL_COST: number = 241;  //兽魂消耗品
    export const ITEM_ZHEN_COST: number = 243;  //仙阵消耗品
    export const ITEM_REALM_COST: number = 245;  //境界消耗品
    export const ITEM_ANGLE_COST: number = 247;  //天仙养成消耗
    export const ITEM_ANGLE_SKINCARD: number = 248;  //天仙皮肤卡
    export const ITEM_WAND_COST: number = 249;  //仙器养成消耗
    export const ITEM_CLOUD_COST: number = 250;  //仙云养成消耗
    export const ITEM_HALO_COST: number = 251;  //仙气养成消耗

    //道具使用
    export const ITEM_USE_GO: number = 0;  //前往
    export const ITEM_USE_ONE: number = 1;  //使用
    export const ITEM_USE_BATCH: number = 2;  //批量使用
    export const ITEM_USE_CPS: number = 3;  //合成

    //各级品质
    export const QT_GRAY: number = 0;
    export const QT_GREEN: number = 1;
    export const QT_BLUE: number = 2;
    export const QT_PURPLE: number = 3;
    export const QT_GOLD: number = 4;
    export const QT_RED: number = 5;
    //各级品质颜色
    export const QT_COLOR_GRAY: string = "#FFFFFF";
    export const QT_COLOR_GREEN: string = "#12A710";
    export const QT_COLOR_BLUE: string = "#11B0E5";
    export const QT_COLOR_PURPLE: string = "#C63EED";
    export const QT_COLOR_GOLD: string = "#F29E07";
    export const QT_COLOR_RED: string = "#ED3E46";

    export const QT_COLOR_GRAY2: string = "#FFFFFF";
    export const QT_COLOR_GREEN2: string = "#00FF1E";
    export const QT_COLOR_BLUE2: string = "#00FFFF";
    export const QT_COLOR_PURPLE2: string = "#B000AA";
    export const QT_COLOR_GOLD2: string = "#FFFF00";
    export const QT_COLOR_RED2: string = "#FF2828";
    //装备pos
    export const POS_WEAPON: number = 1; //人物武器
    export const POS_NECKLACE: number = 2; //人物项链
    export const POS_SHOULDER: number = 3; //人物护肩
    export const POS_CUFF: number = 4; //人物护腕
    export const POS_RING: number = 5; //人物戒指
    export const POS_HELMET: number = 6; //人物头盔
    export const POS_CLOTHES: number = 7; //人物衣服
    export const POS_BELT: number = 8; //人物腰带
    export const POS_PANTS: number = 9; //人物裤子
    export const POS_SHOES: number = 10; //人物鞋子
    export const POS_JIAO: number = 11; //坐骑角
    export const POS_SHENG: number = 12; //坐骑绳
    export const POS_AN: number = 13; //坐骑鞍
    export const POS_DENG: number = 14; //坐骑镫
    export const POS_YU: number = 15; //羽翼羽
    export const POS_JING: number = 16; //羽翼晶
    export const POS_SI: number = 17; //羽翼丝
    export const POS_HUA: number = 18; //羽翼华
    export const POS_WEAPON1: number = 35; //光武1
    export const POS_WEAPON2: number = 36; //光武2
    export const POS_WEAPON3: number = 37; //光武3
    export const POS_WEAPON4: number = 38; //光武4
    export const POS_ELF1: number = 39; //精灵1
    export const POS_ELF2: number = 40; //精灵2
    export const POS_ELF3: number = 41; //精灵3
    export const POS_ELF4: number = 42; //精灵4
    export const POS_HE: number = 19; //兽魂核
    export const POS_SUN: number = 20; //兽魂髓
    export const POS_WU: number = 21; //兽魂雾
    export const POS_XUAN: number = 22; //兽魂炫
    export const POS_JI: number = 23; //光环基
    export const POS_MANG: number = 24; //光环芒
    export const POS_YUN: number = 25; //光环晕
    export const POS_YI: number = 26; //光环熠
    export const POS_ZHEN1: number = 27; //仙阵1
    export const POS_ZHEN2: number = 28; //仙阵2
    export const POS_ZHEN3: number = 29; //仙阵3
    export const POS_ZHEN4: number = 30; //仙阵4
    export const POS_REALM1: number = 31; //境界1
    export const POS_REALM2: number = 32; //境界2
    export const POS_REALM3: number = 33; //境界3
    export const POS_REALM4: number = 34; //境界4
    export const POS_ANGLE1: number = 43; //天仙1
    export const POS_ANGLE2: number = 44; //天仙2
    export const POS_ANGLE3: number = 45; //天仙3
    export const POS_ANGLE4: number = 46; //天仙4
    export const POS_WAND1: number = 47; //仙器1
    export const POS_WAND2: number = 48; //仙器2
    export const POS_WAND3: number = 49; //仙器3
    export const POS_WAND4: number = 50; //仙器4
    export const POS_CLOUD1: number = 51; //仙云1
    export const POS_CLOUD2: number = 52; //仙云2
    export const POS_CLOUD3: number = 53; //仙云3
    export const POS_CLOUD4: number = 54; //仙云4
    export const POS_HALO1: number = 55; //灵气1
    export const POS_HALO2: number = 56; //灵气2
    export const POS_HALO3: number = 57; //灵气3
    export const POS_HALO4: number = 58; //灵气4
    export const POS_SWEAPON: number = 59; //器灵武器
    export const POS_SNECKLACE: number = 60; //器灵项链
    export const POS_SSHOULDER: number = 61; //器灵护肩
    export const POS_SCUFF: number = 62; //器灵护腕
    export const POS_SRING: number = 63; //器灵戒指
    export const POS_SHELMET: number = 64; //器灵头盔
    export const POS_SCLOTHES: number = 65; //器灵衣服
    export const POS_SBELT: number = 66; //器灵腰带
    export const POS_SPANTS: number = 67; //器灵裤子
    export const POS_SSHOES: number = 68; //器灵鞋子

    export const POS_EQUIP_MAX: number = 99; //装备位上限
    //格子数量上限
    export const EQUIP_GRID_MAX: number = 600;
    export const EQUIP_GRID_BUY_MAX: number = 200;  //可用金子购买的格子上限

    //颜色码
    export const FORMAT_COLOR: Object = {
        '#C0&': '#FFFFFF',  //品质白
        '#C1&': '#12A710',  //品质绿
        '#C2&': '#11B0E5',  //品质蓝
        '#C3&': '#C63EED',  //品质紫
        '#C4&': '#F29E07',  //品质橙/金
        '#C5&': '#ED3E46',  //品质红
        '#C6&': '#ED3E46',  //品质红
        '#C7&': '#BD8651',  //文字黄
        '#C8&': '#12A710',  //文字绿
        '#C9&': '#A83937',  //文字红
        '#C10&': '#6D4B46',  //文字褐
        '#C11&': '#ED3E46',  //文字大红
        '#C12&': '#00FFFF',  //文字蓝
        '#C13&': '#FFBFD0',  //文字粉红
        '#C14&': '#F8F078',  //文字金
        '#C15&': '#FFFF00',  //文字金
        '#C16&': '#12A710',  //文字绿
        '#C17&': '#F8FC00',  //系统文字颜色
        '#C18&': '#00FF1E',  //主线绿
        '#C19&': '#B000AA',  //品质紫
        '#C20&': '#FF2828',  //主线红
        '#C99&': '#000000',  //黑色
    }
    //表情码
    export const FORMAT_EMOTION: Object = {
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
    }
    export const SET_EMOTION_URL: Object = {
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
    }
    //字号码
    export const FORMAT_FONT: Object = {
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
    }
    //图片URL
    export const SET_PICTURE_URL: Object = {
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
    }
    // 频道
    export const CHANNEL_GANG: number = 2;
    export const CHANNEL_WORLD: number = 3;
    export const CHANNEL_ACROSSSVR: number = 4;
    export const CHANNEL_SYS: number = 6;
    export const CHANNEL_RECRUIT: number = 7;
    // 属性相关
    export const PROP_HP: number = 0x80;   //生命
    export const PROP_ATK: number = 0x81;  //攻击
    export const PROP_DEF: number = 0x82;  //防御

    export let PROP_ID_ARR = [0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87];  //多用来顺序显示
    export let PROP_KEYSTR_ARR = ["hp", "atk", "def", "spd", "cri", "res", "hit", "dod"];
    export let PROP_KEYSTR_2_ID_MAP = {
        "hp": 0x80,
        "atk": 0x81,
        "def": 0x82,
        "spd": 0x83,
        "cri": 0x84,
        "res": 0x85,
        "hit": 0x86,
        "dod": 0x87,
    }
    // 属性战斗力计算系数
    export let PROP_RATIO_MAP = {
        0x80: 0.5,
        0x81: 5,
        0x82: 5,
        0x83: 250,
        0x84: 10,
        0x85: 10,
        0x86: 10,
        0x87: 10,
    }
    // 属性相关end
    // 宠物
    export let SUMMON_LV_MAX: number = 200;  // 宠物等级最高
    export let SUMMON_APT_LV_MAX: number = 5;  // 宠物资质等级最高
    // 宠物end
    // 仙侣
    export let PARTNER_LV_MAX: number = 15;  // 仙侣升阶最高
    export let PARTNER_STAR_LV_MAX: number = 7;  // 仙侣升星最高
    export let PARTNER_YUAN_LV_MAX: number = 10;  // 仙侣仙缘最高
    // 仙侣end
    // 养成系统
    export let DEVELOP_LV_MAX: number = 15;  // 养成升阶等级最高
    export let DEVELOP_SKILL_LV_MAX: number = 15;  // 养成技能等级最高
    export let DEVELOP_SKILL_OPENLV_ARR: Array<number> = [2, 3, 5, 7];
    // export let DEVELOP_EQUIP_SKIN_ARR:Array<string> = ["develop/1/1.png", "develop/1/2.png", "develop/1/3.png", "develop/1/4.png"];
    export let DEVELOP_JINGMAI_LV_MAX: number = 10;  // 经脉等级最高
    export let DEVELOP_JINGMAI_EXP_MAX: number = 11;  // 经脉进度最高
    // 养成系统end

    // 帮派
    export let GANG_ASSISTANT: number = 1;         // 帮主
    export let GANG_DEPUTY_ASSISTANT: number = 2;  // 副帮主
    export let GANG_NORMAL_MEMBER: number = 3;     // 帮众

    export let GANG_LV_MIN: number = 52;     //入帮最低要求等级
    // 帮派end
    // 排行榜
    export let RANK_LEVEL: number = 1;       // 等级榜
    export let RANK_MAINROUND: number = 2;   // 主线关卡
    export let RANK_TREASURE: number = 3;    //上古秘宝
    export let RANK_TOWER: number = 4;       //大雁神塔
    export let RANK_HEAVEN: number = 5;      //天庭降妖
    export let RANK_WEAPON: number = 6;      //光武
    export let RANK_ELF: number = 7;            //精灵
    export let RANK_HORSE: number = 8;       //坐骑
    export let RANK_WING: number = 9;        //羽翼
    export let RANK_XIANZHEN: number = 10;   //仙阵
    export let RANK_JINGJIE: number = 11;    //境界
    export let RANK_GUANGHUAN: number = 12;  //光环
    export let RANK_SHOUHUN: number = 13;    //兽魂
    export let RANK_ZHANLI: number = 14;     //战力
    export let RANK_CONSUME: number = 15;    //消费排行
    // 排行榜 end

    // 活动编号
    export let ACTIVITY_DAILY_ANSWER: number = 6;    // 每日答题
    export let ACTIVITY_PANDA_KF: number = 13; //熊猫大侠活动开服
    export let ACTIVITY_PANDA_LX: number = 12; //熊猫大侠活动轮循
    export let ACTIVITY_TOTAL_PAY_KF: number = 15; //累充活动开服
    export let ACTIVITY_TOTAL_PAY_LX: number = 14; //累充活动轮循
    export let ACTIVITY_GO_NEXT_LV: number = 16;  //直升一阶
    export let ACTIVITY_DEVELOP_RWD: number = 17;   //养成进阶奖励
    export let ACTIVITY_DEVELOP_RANK: number = 18;  //养成进阶排行
    export let ACTIVITY_COMMON_UPGRADE: number = 19;    //全民进阶
    export let ACTIVITY_GROW_UP: number = 20; //成长基金
    export let ACTIVITY_INVEST: number = 21; //投资计划
    export let ACTIVITY_FIRST_PAY_GROUP: number = 22; //首充团购
    export let ACTIVITY_COMMON_RUSHGRADE: number = 25;//全民冲级
    export let ACTIVITY_OPENPLAY_RWD: number = 26;//全民冲级
    export let ACTIVITY_COOKERGOD: number = 27;//食神挑战
    export let ACTIVITY_PURCHASE_GIFT_BAG: number = 28//10元购
    export let ACTIVITY_TODAY_GIFT_KF: number = 29; //今日豪礼 开服 
    export let ACTIVITY_TODAY_GIFT_LX: number = 31; //今日豪礼 轮循 
    export let ACTIVITY_RECHARGE_GIFT: number = 32;//充值大礼
    export let ACTIVITY_KFHD: number = 35;//开服活动大厅
    export let ACTIVITY_CONTINUE_CONSUME: number = 33; //连续消费
    export let ACTIVITY_CONSUME_RANK: number = 34; //消费排行
    // 活动编号end

    //avatar类型
    export let HINTTYPE_SKIN = 0x81;
    export let HINTTYPE_TITLE = 0x82;
    export let HINTTYPE_RIDE = 0x83;
    export let HINTTYPE_RIDE_SKIN = 0x84;
    export let HINTTYPE_WING = 0x85;
    export let HINTTYPE_WING_SKIN = 0x86;
    export let HINTTYPE_GUANGWU = 0x87;
    export let HINTTYPE_GUANGWU_SKIN = 0x88;
    export let HINTTYPE_JINGLING = 0x89;
    export let HINTTYPE_JINGLING_SKIN = 0x8a;
    export let HINTTYPE_SUMMON = 0x90;
    export let HINTTYPE_SUMMONAURA = 0x91;
    export let HINTTYPE_SUMMONSOUL = 0x92;
    export let HINTTYPE_PARTNER = 0x93;
    export let HINTTYPE_PARTNERJINGJIE = 0x94;
    export let HINTTYPE_PARTNERXIANZHEN = 0x95;


    // 跨服争霸 start
    export let SERGHY_NOOPD: number = 0;// 无人占领 
    export let SERGHY_OWN: number = 1;// 己方占领 
    export let SERGHY_ENEMY: number = 2;// 敌方占领 
    // 跨服争霸 end

    // 场景玩家的状态
    export let SCENE_PLAYER_FREE: number = 0;// 空闲
    export let SCENE_PLAYER_COMBAT: number = 1;// 战斗中

    // 帮派地图 状态
    export let GANG_MAP_MINGING: number = 0;// 挖矿
    export let GANG_MAP_PLANT: number = 1;// 种植
    export let GANG_MAP_WATER: number = 2;// 浇水
}