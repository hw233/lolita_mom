module helper {
    //////////////////////
    //系统工具
    /**
     * 获取Browser时间，单位为毫秒
     */
    export function get_cur_milltime(): number {
        return laya.utils.Browser.now();
    }

    /**
     * 获取Browser时间，单位为秒
     */
    export function get_cur_secstime(): number {
        return Math.round(laya.utils.Browser.now() / 1000);
    }

    /**
     * 获取一个范围内的随机整数。包括min，不包括max。
     * @param min 最小值，向下取整
     * @param max 最大值，向下取整。结果不包括该值
     */
    export function get_random_int(min: number, max: number): number {
        let min_int = Math.floor(min);
        let max_int = Math.floor(max);
        let radio = Math.random();
        return Math.floor(min_int + (max_int - min_int) * radio);
    }

    /**
     * 分解一段秒数时间，返回值格式：[day, hour, minu, secs]
     * @param secs 秒数
     */
    export function convert_time_2_arr(secs: number): Array<number> {
        if (secs <= 0)
            return [0, 0, 0, 0];
        let time_list = new Array();
        let value: number = 0;
        let result: number = 0;
        value = secs / 86400;
        result = parseInt(value.toString());
        time_list.push(result);
        secs -= result * 86400;
        value = secs / 3600;
        result = parseInt(value.toString());
        time_list.push(result);
        secs -= result * 3600;
        value = secs / 60;
        result = parseInt(value.toString());
        time_list.push(result);
        secs -= result * 60;
        result = parseInt(secs.toString());
        time_list.push(result);
        return time_list;
    }

    /**
     * 分解一段秒数时间成格式化的字符串，返回值格式：X天X小时X分X秒
     * @param secs 秒数
     */
    export function convert_time_2_fotmatStr(secs: number): string {
        if (secs <= 0)
            return "";
        let time_list = this.convert_time_2_arr(secs);
        let day: number = time_list[0];
        let hour: number = time_list[1];
        let minu: number = time_list[2];
        let sec: number = time_list[3];
        let str: string = "";
        if (day > 0)
            str += (day.toString() + game.L_TIAN);
        if (hour > 0 || day > 0)
            str += (hour.toString() + game.L_XIAOSHI);
        str += (minu.toString() + game.L_FEN + sec.toString() + game.L_MIAO);
        return str;
    }

    /**
     * 分解一个时间戳，返回值格式：[YYYY,MM,DD,HH,MM,SS]
     * @param timestamp 时间戳
     */
    export function format_timestamp_2_arr(timestamp: number): Array<number> {
        let date_arr = new Array<number>();
        let date = new Date(timestamp * 1000);
        date_arr.push(date.getFullYear());
        date_arr.push(date.getMonth() + 1);
        date_arr.push(date.getDate());
        date_arr.push(date.getHours());
        date_arr.push(date.getMinutes());
        date_arr.push(date.getSeconds());
        return date_arr;
    }

    /**
     * 分解一个时间戳成格式化的字符串，返回值格式：YYYY-MM-DD HH:MM:SS
     * @param timestamp 时间戳
     */
    export function format_timestamp_2_str(timestamp: number): string {
        let time_arr = this.format_timestamp_2_arr(timestamp);
        let time_str: string = "";
        time_str += time_arr[0].toString();
        time_str += "-";
        time_str += time_arr[1].toString();
        time_str += "-";
        time_str += time_arr[2].toString();
        time_str += " ";
        time_str += time_arr[3] >= 10 ? time_arr[3].toString() : "0" + time_arr[3].toString();
        time_str += ":";
        time_str += time_arr[4] >= 10 ? time_arr[4].toString() : "0" + time_arr[4].toString();
        time_str += ":";
        time_str += time_arr[5] >= 10 ? time_arr[5].toString() : "0" + time_arr[5].toString();
        return time_str;
    }

    /**
     * 居中widget
     * @param m_ui ui实例
     * @param delay_x x偏移
     * @param delay_y y偏移
     */
    export function center_widget(m_ui: laya.ui.View, delay_x: number = 0, delay_y: number = 75): void {
        if (m_ui) {
            let d_w: number = Laya.stage.designWidth;
            let d_h: number = Laya.stage.designHeight;
            m_ui.x = (d_w - m_ui.width) / 2 - delay_x;
            m_ui.y = (d_h - m_ui.height) / 2 - delay_y;
        }
    }

    /**
     * widget添加半透明黑底和遮挡热区
     * @param m_ui ui实例
     */
    export function add_widget_hitArea(m_ui: laya.ui.View): void {
        if (m_ui) {
            let d_w: number = Laya.stage.designWidth;
            let d_h: number = Laya.stage.designHeight;
            let graphics = new Laya.Graphics();
            graphics.save();
            graphics.alpha(0.5);
            graphics.drawRect(-m_ui.x, -m_ui.y, d_w, d_h, "#000000");
            graphics.restore();
            m_ui.graphics = graphics;
            m_ui.hitArea = new Laya.Rectangle(-m_ui.x, -m_ui.y, d_w, d_h);
        }
    }

    /**
     * widget移除半透明黑底和遮挡热区
     * @param m_ui ui实例
     */
    export function remove_widget_hitArea(m_ui: laya.ui.View): void {
        if (m_ui) {
            m_ui.graphics = null;
            m_ui.hitArea = null;
        }
    }

    /**
     * 比较两个数组是否相等
     * @param arr1 数组1
     * @param arr2 数组2
     */
    export function is_arrays_equal(arr1: Array<any>, arr2: Array<any>): boolean {
        if (arr1 == null || arr2 == null)
            return false;
        if (arr1.length != arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }

    /**
     * 比较两个Laya字典（Laya.Dictionary）是否相等，键值对皆为number
     * @param arr1 数组1
     * @param arr2 数组2
     */
    export function is_dict_equal(dict1: Laya.Dictionary, dict2: Laya.Dictionary): boolean {
        if (dict1 == null || dict2 == null)
            return false;
        if (dict1.keys.length != dict2.keys.length)
            return false;
        for (let key of dict1.keys) {
            if (dict1.get(key) != dict2.get(key))
                return false;
        }
        return true;
    }

    /**
     * 数值格式化
     * @param value 数值
     * @param b_odd 是否将小于等于1的数值转为空字符串
     */
    export function format_number(value: number, b_odd: boolean = true): string {
        if (value <= 1) {
            if (b_odd)
                return "";
            else
                return value.toString();
        }
        else if (value > 1 && value < 100000) {
            return value.toString();
        }
        else {
            let num_str = value.toString();
            let wan_str: string = "";
            let one_str: string = "";
            let unit_str = game.L_WAN;
            if (value >= 100000 && value < 1000000) {  //十万级
                wan_str = num_str.slice(0, 2);
                one_str = num_str.slice(2, 4);
            }
            else if (value >= 1000000 && value < 10000000) {  //百万级
                wan_str = num_str.slice(0, 3);
                one_str = num_str.slice(3, 5);
            }
            else if (value >= 10000000 && value < 100000000) {  //千万级
                wan_str = num_str.slice(0, 4);
                one_str = num_str.slice(4, 5);
            }
            else if (value >= 100000000 && value < 1000000000) {    //亿级
                wan_str = num_str.slice(0, 1);
                one_str = num_str.slice(1, 4);
                unit_str = game.L_YI;
            }
            else if (value >= 1000000000 && value < 10000000000) {    //十亿级
                wan_str = num_str.slice(0, 2);
                one_str = num_str.slice(2, 5);
                unit_str = game.L_YI;
            }
            else if (value >= 10000000000 && value < 100000000000) {    //百亿级
                wan_str = num_str.slice(0, 3);
                one_str = num_str.slice(3, 5);
                unit_str = game.L_YI;
            }
            else {  //超过百亿
                let yi = Math.floor(value / 100000000);
                return yi.toString() + game.L_YI;
            }
            while (true) {
                if (one_str.length > 0 && one_str.slice(-1) == "0") {
                    one_str = one_str.substring(0, one_str.length - 1);
                }
                else {
                    break;
                }
            }
            if (one_str.length > 0) {
                return wan_str + "." + one_str + unit_str;
            }
            else {
                return wan_str + unit_str;
            }
        }
    }


    

    
    /**
     * 显示文本浮动提示
     * @param text 文本内容
     */
    export function show_text_tips(text: string): void {
        let tips_mgr = game.get_module(module_enum.MODULE_TIPS) as game.tips_mgr;
        tips_mgr.show_tips({ "text": text });
    }
    export function show_float_text_tips(text:string,x:number,y:number):void{
        utils.widget_ins().show_widget(widget_enum.WIDGET_TEXTTIPS,true,[text,x,y,false]);
    }
    export function show_center_text_tips(text:string):void{
        utils.widget_ins().show_widget(widget_enum.WIDGET_TEXTTIPS,true,[text,0,0,true]);
    }
    export function hide_float_text_tips():void{
        utils.widget_ins().show_widget(widget_enum.WIDGET_TEXTTIPS,false);
    }
    /**
     * 显示支持格式码的文本浮动提示。例如："#C16&玩家#D&上线了"
     * @param text 包含格式码的文本内容
     */
    export function show_format_text_tips(f_text: string): void {
        let text = analysisMsgStr(f_text);
        let tips_mgr = game.get_module(module_enum.MODULE_TIPS) as game.tips_mgr;
        tips_mgr.show_tips({ "text": text });
    }

    /**
     * 根据品质返回颜色码
     * @param quality 品质
     */
    function _get_color_by_quality(quality: number): string {
        if (quality == base.QT_GRAY)
            return base.QT_COLOR_GRAY;
        if (quality == base.QT_GREEN)
            return base.QT_COLOR_GREEN;
        if (quality == base.QT_BLUE)
            return base.QT_COLOR_BLUE;
        if (quality == base.QT_PURPLE)
            return base.QT_COLOR_PURPLE;
        if (quality == base.QT_GOLD)
            return base.QT_COLOR_GOLD;
        if (quality == base.QT_RED)
            return base.QT_COLOR_RED;
        return base.QT_COLOR_GRAY;
    }

    /**
     * 根据品质返回颜色格式码
     * @param quality 品质
     */
    export function get_ColorCode_by_quality(quality: number, b_light: boolean = false): string {
        if (quality == base.QT_GRAY)
            return "#C0&";
        if (quality == base.QT_GREEN)
            return b_light == false ? "#C1&" : "#C18&";
        if (quality == base.QT_BLUE)
            return b_light == false ? "#C2&" : "#C12&";
        if (quality == base.QT_PURPLE)
            return b_light == false ? "#C3&" : "#C19&";
        if (quality == base.QT_GOLD)
            return b_light == false ? "#C4&" : "#C15&";
        if (quality == base.QT_RED)
            return b_light == false ? "#C5&" : "#C20&";
        return "#C0&";
    }

    /**
     * 显示一个单按钮的弹窗
     * @param p_content 弹窗文字
     */
    export function show_msgbox(p_content: string): void {
        let sys_msg_mgr = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG) as game.sys_msg;
        sys_msg_mgr.show_msgbox(p_content);
    }

    /**
     * 显示一个带有两个选择的弹窗，点击按钮会派发事件（EVENT_MSGBOX_CHOOSED）
     * 事件派发方式：fire_event_next_frame(game_event.EVENT_MSGBOX_CHOOSED, [p_caller, true/false, p_user_data])。true：确定，false：取消
     * 根据p_caller判断是不是自己逻辑的弹窗，根据true/false获取用户选择
     * @param p_caller caller
     * @param p_content 弹窗文字
     * @param p_user_data 用户数据，会随着事件派发
     * @param NoTips_keys 本次登录不再提示关键字，关键字已有定义参考const，游戏备注，本次登录不再提示关键字
     */
    export function show_choose_msgbox(p_caller: any, p_content: string, p_user_data: Array<any> = null, NoTips_keys: string = ""): void {
        let sys_msg_mgr = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG) as game.sys_msg;
        sys_msg_mgr.show_msg_box(p_caller, p_content, p_user_data, NoTips_keys);
    }

    /**
     * 根据shape获取主角性别
     * @param shape 主角shape
     */
    export function get_sex(shape: number): number {
        if (shape % 2 == 1)
            return base.SEX_MALE;
        else
            return base.SEX_FEMALE;
    }

    /**
     * 根据shape获取主角头像地址
     * @param shape 主角shape
     */
    export function get_role_head(shape: number): string {
        if (shape == base.HUMAN_MALE)
            return "ui/sys/head_gg.png";
        else if (shape == base.HUMAN_FEMALE)
            return "ui/sys/head_mm.png";
        else
            return "";
    }

    

    /**
     * html标签过滤
     */
    export function html_filter(str: string): boolean {
        if (str.indexOf("<") != -1) {
            return false;
        }
        if (str.indexOf(">") != -1) {
            return false;
        }
        if (str.indexOf("/") != -1) {
            return false;
        }
        if (str.indexOf("\\") != -1) {
            return false;
        }
        if (str.indexOf("&") != -1) {
            return false;
        }
        return true;
    }

}