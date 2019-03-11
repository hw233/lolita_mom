var helper;
(function (helper) {
    function do_test(data_arr) {
        var head = data_arr[0];
        // 客户端指令start 
        // 谨慎修改
        //////////////////////////////
        if (head == "closestat") {
            Laya.Stat.hide();
        }
    }
    helper.do_test = do_test;
})(helper || (helper = {}));
//# sourceMappingURL=do_test.js.map
var helper;
(function (helper) {
    // export function hyperlink_handle(name: string, htype: base.HYPERLINK_TYPE, u1: number, u2?: number, u3?: number) {
    //     core.game_tiplog(name + "," + htype + "," + u1 + "," + u2 + "," + u3);
    //     utils.event_ins().fire_event_next_frame(game_event.EVENT_CHAT_HYPERLINK, [htype, u1, u2, u3]);
    // }
    function create_format_link(text, htype, u1, u2, u3, color) {
        if (color === void 0) { color = "#C18&"; }
        if (text.length > 255) {
            text = text.substr(0, 255);
        }
        var len = text.length.toString(16);
        if (text.length < 16) {
            return color + '#H&l0' + len + '(' + text + ',' + htype + ',' + u1 + ',' + u2 + ',' + u3 + ')#D&';
        }
        return color + '#H&l' + len + '(' + text + ',' + htype + ',' + u1 + ',' + u2 + ',' + u3 + ')#D&';
    }
    helper.create_format_link = create_format_link;
    function trans_info(info) {
        var temp = info;
        var markAb = "";
        var tempArr = temp.split('#');
        var markAbArr = [];
        for (var i = 0; i < tempArr.length; i++) {
            tempArr[i] = "#" + tempArr[i];
            if (!!tempArr[i].match(/#\d{1,3}/)) {
                markAb = tempArr[i].match(/#\d{1,3}/)[0];
                // core.game_tiplog(markAb);
                markAbArr.push(markAb);
            }
        }
        //检查markAbArr的元素对应的表情标识符是否存在，并修改其值
        var ele = "";
        for (var i = 0; i < markAbArr.length; i++) {
            ele = markAbArr[i];
            if (base.FORMAT_EMOTION[ele]) {
                // core.game_tiplog(ChatTools.emojiAbDic.get(ele));
            }
            else {
                markAbArr[i] = ele.substr(0, ele.length - 1);
                ele = markAbArr[i];
                // core.game_tiplog(ele);
                if (!base.FORMAT_EMOTION[ele]) {
                    markAbArr[i] = ele.substr(0, ele.length - 1);
                    ele = markAbArr[i];
                    // core.game_tiplog(ele);
                }
            }
        }
        markAbArr.forEach(function (element) {
            if (!!temp.match(element)) {
                temp = temp.replace(element, base.FORMAT_EMOTION[element]);
            }
        });
        core.game_tiplog(temp);
        // 只有从表情界面点击才有效的做法
        // let arr: string[] = [];
        // for (let m = 0; m < ChatTools.emoji_to_be_sent.length; m++) {
        //     arr.push(ChatTools.emoji_to_be_sent[m]);
        // }
        // //将表情标识符替换成#Enumber&
        // for (let j = 0; j < arr.length; j++) {
        //     arr[j] = arr[j][0] + "E" + arr[j].substr(1, arr[j].length - 1) + "&";
        // }
        // //替换输入文本
        // for (let i = 0; i < ChatTools.emoji_to_be_sent.length; i++) {
        //     temp = temp.replace(ChatTools.emoji_to_be_sent[i], arr[i]);
        // }
        return temp;
    }
    helper.trans_info = trans_info;
    function analysisMsgStr(msgString, dColor, dFSize) {
        if (dColor === void 0) { dColor = "#FACD89"; }
        if (dFSize === void 0) { dFSize = "44"; }
        var data = msgString;
        var htmlStr = "";
        // var dColor = "#FACD89";
        // var dFSize = "44";
        var curColor = dColor;
        var curFSize = dFSize;
        var curStyleStr = "";
        var inEdit = false;
        var isOpen = false;
        var temp = "";
        var index = 0;
        var isFont = false;
        var cur_str = "";
        var isColor = false;
        var isFont = false;
        var isHlink = false;
        var isPic = false;
        var isEmoji = false;
        var isFEnd = false;
        var isCEnd = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i] == "#") {
                if (!data[i + 1]) {
                    htmlStr += data[i];
                    continue;
                }
                if (data[i + 1] == "C") {
                    index = i + 2;
                    temp = data[i] + data[i + 1];
                    for (index; index < data.length; index++) {
                        cur_str = data[index];
                        if (cur_str == "&" && !!temp[temp.length - 1].match(/\d/)) {
                            temp += cur_str;
                            curStyleStr = temp;
                            temp = "";
                            inEdit = true;
                            isColor = true;
                            i = index;
                            break;
                        }
                        else if (!!cur_str.match(/\d/)) {
                            temp += cur_str;
                        }
                        else {
                            temp = "";
                            break;
                        }
                    }
                }
                else if (data[i + 1] == "F") {
                    index = i + 2;
                    temp = data[i] + data[i + 1];
                    for (index; index < data.length; index++) {
                        cur_str = data[index];
                        if (cur_str == "&" && !!temp[temp.length - 1].match(/\d/)) {
                            temp += cur_str;
                            curStyleStr = temp;
                            temp = "";
                            inEdit = true;
                            isFont = true;
                            i = index;
                            break;
                        }
                        else if (cur_str == "D") {
                            temp += cur_str;
                        }
                        else if (cur_str == "&" && temp[temp.length - 1] == "D") {
                            temp += cur_str;
                            curStyleStr = temp;
                            temp = "";
                            inEdit = true;
                            isFEnd = true;
                            i = index;
                            break;
                        }
                        else if (!!cur_str.match(/\d/)) {
                            temp += cur_str;
                        }
                        else {
                            temp = "";
                            break;
                        }
                    }
                }
                else if (data[i + 1] == "H") {
                    if (data[i + 2] && data[i + 3] && data[i + 4] && data[i + 5]) {
                        if (data[i + 2] == "&" && data[i + 3] == "l" && !!data[i + 4].match(/[0-9a-fA-F]/) && !!data[i + 5].match(/[0-9a-fA-F]/)) {
                            curStyleStr = data[i] + data[i + 1] + data[i + 2] + data[i + 3] + data[i + 4] + data[i + 5];
                            inEdit = true;
                            isHlink = true;
                            i = i + 5;
                        }
                    }
                }
                else if (data[i + 1] == "P") {
                    index = i + 2;
                    temp = data[i] + data[i + 1];
                    for (index; index < data.length; index++) {
                        cur_str = data[index];
                        if (cur_str == "&" && !!temp[temp.length - 1].match(/\d/)) {
                            temp += cur_str;
                            curStyleStr = temp;
                            temp = "";
                            inEdit = true;
                            isPic = true;
                            i = index;
                            break;
                        }
                        else if (!!cur_str.match(/\d/)) {
                            temp += cur_str;
                        }
                        else {
                            temp = "";
                            break;
                        }
                    }
                    // inEdit = true;
                }
                else if (data[i + 1] == "E") {
                    index = i + 2;
                    temp = data[i] + data[i + 1];
                    for (index; index < data.length; index++) {
                        cur_str = data[index];
                        if (cur_str == "&" && !!temp[temp.length - 1].match(/\d/)) {
                            temp += cur_str;
                            curStyleStr = temp;
                            temp = "";
                            inEdit = true;
                            isEmoji = true;
                            i = index;
                            break;
                        }
                        else if (!!cur_str.match(/\d/)) {
                            temp += cur_str;
                        }
                        else {
                            temp = "";
                            break;
                        }
                    }
                    // inEdit = true;
                }
                else if (data[i + 1] == "D" && data[i + 2] == "&") {
                    isCEnd = true;
                    inEdit = true;
                    i = i + 2;
                }
                else if (data[i + 1] == "F" && data[i + 2] == "D" && data[i + 3] == "&") {
                    inEdit = true;
                    isFEnd = true;
                    i = i + 3;
                }
            }
            if (inEdit) {
                if (isColor) {
                    isColor = false;
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    curColor = base.FORMAT_COLOR[curStyleStr];
                    //创建span标签的开头
                    htmlStr += createSpanTag(curColor, curFSize);
                    isOpen = true;
                    // core.game_tiplog(htmlStr);
                    curStyleStr = "";
                    inEdit = false;
                }
                else if (isFont) {
                    isFont = false;
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    curFSize = base.FORMAT_FONT[curStyleStr];
                    htmlStr += createSpanTag(curColor, curFSize);
                    isOpen = true;
                    // core.game_tiplog(htmlStr);
                    curStyleStr = "";
                    inEdit = false;
                }
                else if (isHlink) {
                    isHlink = false;
                    var j = i + 1;
                    var linkData = "";
                    for (j; j < data.length; j++) {
                        if (data[j] != "(") {
                            curStyleStr += data[j];
                        }
                        else {
                            break;
                        }
                    }
                    // core.game_tiplog(curStyleStr);
                    var nameLen = curStyleStr.replace("#H&l", "");
                    var nameLenNum = parseInt(nameLen, 16);
                    var urlData = "";
                    var tagInfo = "";
                    // core.game_tiplog(data[j+1]);
                    for (var k = j + 1; k < data.length; k++) {
                        if (data[k] == "&") {
                            urlData += "&amp;";
                        }
                        else if (data[k] == "<") {
                            urlData += "&lt;";
                        }
                        else if (data[k] == " ") {
                            urlData += "&nbsp;";
                        }
                        else if (data[k] == ">") {
                            urlData += "&gt;";
                        }
                        else {
                            urlData += data[k];
                        }
                        if (data[k] == ")") {
                            if (urlData.length <= nameLenNum + 2) {
                                continue;
                            }
                            else {
                                urlData = urlData.substr(0, urlData.length - 1);
                                break;
                            }
                        }
                    }
                    var arr = urlData.split(",");
                    // tagInfo = arr[0].substr(1, arr[0].length - 2);
                    tagInfo = arr[0];
                    arr.splice(0, 1);
                    urlData = tagInfo + "," + arr.toString();
                    i = k;
                    // core.game_tiplog(i+","+data[i]);
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    htmlStr += createLinkTag(curColor, curFSize, urlData, tagInfo);
                    isOpen = true;
                    // core.game_tiplog(htmlStr);
                    curStyleStr = "";
                    inEdit = false;
                }
                else if (isPic) {
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    var imgUrl = base.SET_PICTURE_URL[curStyleStr];
                    htmlStr += createImgTag(imgUrl);
                    inEdit = false;
                    isPic = false;
                    curStyleStr = "";
                }
                else if (isEmoji) {
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    var emoUrl = base.SET_EMOTION_URL[curStyleStr];
                    htmlStr += createImgTag(emoUrl);
                    inEdit = false;
                    isEmoji = false;
                    curStyleStr = "";
                }
                else if (isFEnd) {
                    curFSize = dFSize;
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    curStyleStr = "";
                    inEdit = false;
                }
                else if (isCEnd) {
                    curColor = dColor;
                    if (isOpen) {
                        htmlStr += '</span>';
                        isOpen = false;
                    }
                    curStyleStr = "";
                    inEdit = false;
                }
            }
            else {
                if (data[i] == "&") {
                    htmlStr += "&amp;";
                }
                else if (data[i] == " ") {
                    htmlStr += '&nbsp;';
                }
                else if (data[i] == "<") {
                    htmlStr += "&lt;";
                }
                else if (data[i] == ">") {
                    htmlStr += "&gt;";
                }
                else {
                    htmlStr += data[i];
                }
                // core.game_tiplog(htmlStr);
            }
        }
        if (isOpen) {
            htmlStr += '</span>';
        }
        return htmlStr;
    }
    helper.analysisMsgStr = analysisMsgStr;
    function createSpanTag(color, fSize) {
        var tag = '<span style="color:' + color + '; font-size:' + fSize + 'px;">';
        return tag;
    }
    helper.createSpanTag = createSpanTag;
    function createLinkTag(color, fSize, urlData, info) {
        var tag = '<span href="' + urlData + '" style="color:' + color + '; font-size:' + fSize + 'px;">' + info + '</span>' + helper.createSpanTag(color, fSize);
        return tag;
    }
    helper.createLinkTag = createLinkTag;
    function createImgTag(imgUrl) {
        var tag = '<img src="' + imgUrl + '"/>';
        return tag;
    }
    helper.createImgTag = createImgTag;
})(helper || (helper = {}));
//# sourceMappingURL=fotmat.js.map
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
    function get_local(key) {
        return Laya.LocalStorage.getItem(key);
    }
    helper.get_local = get_local;
    function set_local(key, v) {
        return Laya.LocalStorage.setItem(key, v);
    }
    helper.set_local = set_local;
})(helper || (helper = {}));
//# sourceMappingURL=helper.js.map