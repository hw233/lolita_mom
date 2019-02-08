var helper;
(function (helper) {
    //////////////////////
    //系统工具
    /**
     * 获取Browser时间，单位为毫秒
     */
    function get_cur_milltime() {
        return laya.utils.Browser.now();
    }
    helper.get_cur_milltime = get_cur_milltime;
    /**
     * 获取Browser时间，单位为秒
     */
    function get_cur_secstime() {
        return Math.round(laya.utils.Browser.now() / 1000);
    }
    helper.get_cur_secstime = get_cur_secstime;
    /**
     * 获取一个范围内的随机整数。包括min，不包括max。
     * @param min 最小值，向下取整
     * @param max 最大值，向下取整。结果不包括该值
     */
    function get_random_int(min, max) {
        var min_int = Math.floor(min);
        var max_int = Math.floor(max);
        var radio = Math.random();
        return Math.floor(min_int + (max_int - min_int) * radio);
    }
    helper.get_random_int = get_random_int;
    /**
     * 分解一段秒数时间，返回值格式：[day, hour, minu, secs]
     * @param secs 秒数
     */
    function convert_time_2_arr(secs) {
        if (secs <= 0)
            return [0, 0, 0, 0];
        var time_list = new Array();
        var value = 0;
        var result = 0;
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
    helper.convert_time_2_arr = convert_time_2_arr;
    /**
     * 分解一段秒数时间成格式化的字符串，返回值格式：X天X小时X分X秒
     * @param secs 秒数
     */
    function convert_time_2_fotmatStr(secs) {
        if (secs <= 0)
            return "";
        var time_list = this.convert_time_2_arr(secs);
        var day = time_list[0];
        var hour = time_list[1];
        var minu = time_list[2];
        var sec = time_list[3];
        var str = "";
        if (day > 0)
            str += (day.toString() + game.L_TIAN);
        if (hour > 0 || day > 0)
            str += (hour.toString() + game.L_XIAOSHI);
        str += (minu.toString() + game.L_FEN + sec.toString() + game.L_MIAO);
        return str;
    }
    helper.convert_time_2_fotmatStr = convert_time_2_fotmatStr;
    /**
     * 分解一个时间戳，返回值格式：[YYYY,MM,DD,HH,MM,SS]
     * @param timestamp 时间戳
     */
    function format_timestamp_2_arr(timestamp) {
        var date_arr = new Array();
        var date = new Date(timestamp * 1000);
        date_arr.push(date.getFullYear());
        date_arr.push(date.getMonth() + 1);
        date_arr.push(date.getDate());
        date_arr.push(date.getHours());
        date_arr.push(date.getMinutes());
        date_arr.push(date.getSeconds());
        return date_arr;
    }
    helper.format_timestamp_2_arr = format_timestamp_2_arr;
    /**
     * 分解一个时间戳成格式化的字符串，返回值格式：YYYY-MM-DD HH:MM:SS
     * @param timestamp 时间戳
     */
    function format_timestamp_2_str(timestamp) {
        var time_arr = this.format_timestamp_2_arr(timestamp);
        var time_str = "";
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
    helper.format_timestamp_2_str = format_timestamp_2_str;
    /**
     * 居中widget
     * @param m_ui ui实例
     * @param delay_x x偏移
     * @param delay_y y偏移
     */
    function center_widget(m_ui, delay_x, delay_y) {
        if (delay_x === void 0) { delay_x = 0; }
        if (delay_y === void 0) { delay_y = 75; }
        if (m_ui) {
            var d_w = Laya.stage.designWidth;
            var d_h = Laya.stage.designHeight;
            m_ui.x = (d_w - m_ui.width) / 2 - delay_x;
            m_ui.y = (d_h - m_ui.height) / 2 - delay_y;
        }
    }
    helper.center_widget = center_widget;
    /**
     * widget添加半透明黑底和遮挡热区
     * @param m_ui ui实例
     */
    function add_widget_hitArea(m_ui) {
        if (m_ui) {
            var d_w = Laya.stage.designWidth;
            var d_h = Laya.stage.designHeight;
            var graphics = new Laya.Graphics();
            graphics.save();
            graphics.alpha(0.5);
            graphics.drawRect(-m_ui.x, -m_ui.y, d_w, d_h, "#000000");
            graphics.restore();
            m_ui.graphics = graphics;
            m_ui.hitArea = new Laya.Rectangle(-m_ui.x, -m_ui.y, d_w, d_h);
        }
    }
    helper.add_widget_hitArea = add_widget_hitArea;
    /**
     * widget移除半透明黑底和遮挡热区
     * @param m_ui ui实例
     */
    function remove_widget_hitArea(m_ui) {
        if (m_ui) {
            m_ui.graphics = null;
            m_ui.hitArea = null;
        }
    }
    helper.remove_widget_hitArea = remove_widget_hitArea;
    /**
     * 比较两个数组是否相等
     * @param arr1 数组1
     * @param arr2 数组2
     */
    function is_arrays_equal(arr1, arr2) {
        if (arr1 == null || arr2 == null)
            return false;
        if (arr1.length != arr2.length)
            return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
    helper.is_arrays_equal = is_arrays_equal;
    /**
     * 比较两个Laya字典（Laya.Dictionary）是否相等，键值对皆为number
     * @param arr1 数组1
     * @param arr2 数组2
     */
    function is_dict_equal(dict1, dict2) {
        if (dict1 == null || dict2 == null)
            return false;
        if (dict1.keys.length != dict2.keys.length)
            return false;
        for (var _i = 0, _a = dict1.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (dict1.get(key) != dict2.get(key))
                return false;
        }
        return true;
    }
    helper.is_dict_equal = is_dict_equal;
    /**
     * 数值格式化
     * @param value 数值
     * @param b_odd 是否将小于等于1的数值转为空字符串
     */
    function format_number(value, b_odd) {
        if (b_odd === void 0) { b_odd = true; }
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
            var num_str = value.toString();
            var wan_str = "";
            var one_str = "";
            var unit_str = game.L_WAN;
            if (value >= 100000 && value < 1000000) { //十万级
                wan_str = num_str.slice(0, 2);
                one_str = num_str.slice(2, 4);
            }
            else if (value >= 1000000 && value < 10000000) { //百万级
                wan_str = num_str.slice(0, 3);
                one_str = num_str.slice(3, 5);
            }
            else if (value >= 10000000 && value < 100000000) { //千万级
                wan_str = num_str.slice(0, 4);
                one_str = num_str.slice(4, 5);
            }
            else if (value >= 100000000 && value < 1000000000) { //亿级
                wan_str = num_str.slice(0, 1);
                one_str = num_str.slice(1, 4);
                unit_str = game.L_YI;
            }
            else if (value >= 1000000000 && value < 10000000000) { //十亿级
                wan_str = num_str.slice(0, 2);
                one_str = num_str.slice(2, 5);
                unit_str = game.L_YI;
            }
            else if (value >= 10000000000 && value < 100000000000) { //百亿级
                wan_str = num_str.slice(0, 3);
                one_str = num_str.slice(3, 5);
                unit_str = game.L_YI;
            }
            else { //超过百亿
                var yi = Math.floor(value / 100000000);
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
    helper.format_number = format_number;
    /**
     * 显示文本浮动提示
     * @param text 文本内容
     */
    function show_text_tips(text) {
        var tips_mgr = game.get_module(module_enum.MODULE_TIPS);
        tips_mgr.show_tips({ "text": text });
    }
    helper.show_text_tips = show_text_tips;
    function show_float_text_tips(text, x, y) {
        utils.widget_ins().show_widget(widget_enum.WIDGET_TEXTTIPS, true, [text, x, y, false]);
    }
    helper.show_float_text_tips = show_float_text_tips;
    function show_center_text_tips(text) {
        utils.widget_ins().show_widget(widget_enum.WIDGET_TEXTTIPS, true, [text, 0, 0, true]);
    }
    helper.show_center_text_tips = show_center_text_tips;
    function hide_float_text_tips() {
        utils.widget_ins().show_widget(widget_enum.WIDGET_TEXTTIPS, false);
    }
    helper.hide_float_text_tips = hide_float_text_tips;
    /**
     * 显示支持格式码的文本浮动提示。例如："#C16&玩家#D&上线了"
     * @param text 包含格式码的文本内容
     */
    function show_format_text_tips(f_text) {
        var text = helper.analysisMsgStr(f_text);
        var tips_mgr = game.get_module(module_enum.MODULE_TIPS);
        tips_mgr.show_tips({ "text": text });
    }
    helper.show_format_text_tips = show_format_text_tips;
    /**
     * 根据品质返回颜色码
     * @param quality 品质
     */
    function _get_color_by_quality(quality) {
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
    function get_ColorCode_by_quality(quality, b_light) {
        if (b_light === void 0) { b_light = false; }
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
    helper.get_ColorCode_by_quality = get_ColorCode_by_quality;
    /**
     * 显示一个单按钮的弹窗
     * @param p_content 弹窗文字
     */
    function show_msgbox(p_content) {
        var sys_msg_mgr = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG);
        sys_msg_mgr.show_msgbox(p_content);
    }
    helper.show_msgbox = show_msgbox;
    /**
     * 显示一个带有两个选择的弹窗，点击按钮会派发事件（EVENT_MSGBOX_CHOOSED）
     * 事件派发方式：fire_event_next_frame(game_event.EVENT_MSGBOX_CHOOSED, [p_caller, true/false, p_user_data])。true：确定，false：取消
     * 根据p_caller判断是不是自己逻辑的弹窗，根据true/false获取用户选择
     * @param p_caller caller
     * @param p_content 弹窗文字
     * @param p_user_data 用户数据，会随着事件派发
     * @param NoTips_keys 本次登录不再提示关键字，关键字已有定义参考const，游戏备注，本次登录不再提示关键字
     */
    function show_choose_msgbox(p_caller, p_content, p_user_data, NoTips_keys) {
        if (p_user_data === void 0) { p_user_data = null; }
        if (NoTips_keys === void 0) { NoTips_keys = ""; }
        var sys_msg_mgr = utils.module_ins().get_module(module_enum.MODULE_SYS_MSG);
        sys_msg_mgr.show_msg_box(p_caller, p_content, p_user_data, NoTips_keys);
    }
    helper.show_choose_msgbox = show_choose_msgbox;
    /**
     * 根据shape获取主角性别
     * @param shape 主角shape
     */
    function get_sex(shape) {
        if (shape % 2 == 1)
            return base.SEX_MALE;
        else
            return base.SEX_FEMALE;
    }
    helper.get_sex = get_sex;
    /**
     * 根据shape获取主角头像地址
     * @param shape 主角shape
     */
    function get_role_head(shape) {
        if (shape == base.HUMAN_MALE)
            return "ui/sys/head_gg.png";
        else if (shape == base.HUMAN_FEMALE)
            return "ui/sys/head_mm.png";
        else
            return "";
    }
    helper.get_role_head = get_role_head;
    /**
     * html标签过滤
     */
    function html_filter(str) {
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
    helper.html_filter = html_filter;
})(helper || (helper = {}));
//# sourceMappingURL=helper.js.map