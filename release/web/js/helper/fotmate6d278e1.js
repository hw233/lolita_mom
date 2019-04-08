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