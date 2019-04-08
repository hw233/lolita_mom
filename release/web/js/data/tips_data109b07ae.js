var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var data;
(function (data) {
    var tips_node = /** @class */ (function () {
        function tips_node() {
            this.type = 0;
            this.msg = "";
            this.item_shape = 0;
            this.icon = 0;
        }
        return tips_node;
    }());
    data.tips_node = tips_node;
    //浮动提示
    var tips_data = /** @class */ (function (_super) {
        __extends(tips_data, _super);
        function tips_data() {
            var _this = _super.call(this) || this;
            _this.tips_node_arr = new Array();
            return _this;
        }
        tips_data.prototype.add_tips_node = function (t_type, t_msg, t_item) {
            if (t_item === void 0) { t_item = 0; }
            var node = new tips_node();
            node.type = t_type;
            node.msg = t_msg;
            node.item_shape = t_item;
            if (t_item != 0) {
                //let cfg = config.Item_desc.get_Item_desc(t_item);
                //if (cfg)
                //    node.icon = cfg["icon"];
            }
            this.tips_node_arr.push(node);
        };
        tips_data.prototype.get_tips_node = function () {
            return this.tips_node_arr.shift();
        };
        tips_data.prototype.get_node_num = function () {
            return this.tips_node_arr.length;
        };
        tips_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return tips_data;
    }(utils.game_data));
    data.tips_data = tips_data;
    // 弹窗提示
    var msgbox_data = /** @class */ (function (_super) {
        __extends(msgbox_data, _super);
        function msgbox_data() {
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.content = "";
            _this.caller = null;
            _this.user_data = [];
            _this.NoTips_keys = "";
            _this.NoTips_dict = new Laya.Dictionary();
            return _this;
        }
        msgbox_data.prototype.set_msgbox_data = function (p_type, p_content, p_caller, p_user_data, NoTips_keys) {
            this.type = p_type;
            this.content = p_content;
            this.caller = p_caller;
            this.user_data = p_user_data;
            this.NoTips_keys = NoTips_keys;
        };
        msgbox_data.prototype.set_NoTips_flag = function (NoTips_keys, flag) {
            this.NoTips_dict.set(NoTips_keys, flag);
        };
        msgbox_data.prototype.get_NoTips_flag = function (NoTips_keys) {
            var flag = this.NoTips_dict.get(NoTips_keys);
            if (flag == true) {
                return true;
            }
            return false;
        };
        msgbox_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return msgbox_data;
    }(utils.game_data));
    data.msgbox_data = msgbox_data;
    // 物品提示
    var item_tips_data = /** @class */ (function (_super) {
        __extends(item_tips_data, _super);
        function item_tips_data() {
            var _this = _super.call(this) || this;
            _this.item_ins = null;
            _this.user_data = null;
            return _this;
        }
        item_tips_data.prototype.set_item_ins = function (i_ins, user_data) {
            this.item_ins = i_ins;
            this.user_data = user_data;
        };
        item_tips_data.prototype.get_item_ins = function () {
            return this.item_ins;
        };
        item_tips_data.prototype.get_userdata = function () {
            return this.user_data;
        };
        item_tips_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return item_tips_data;
    }(utils.game_data));
    data.item_tips_data = item_tips_data;
    // 技能提示
    var skill_tips_data = /** @class */ (function (_super) {
        __extends(skill_tips_data, _super);
        function skill_tips_data() {
            var _this = _super.call(this) || this;
            _this.skill_ins = null;
            return _this;
        }
        skill_tips_data.prototype.set_skilltips_data = function (i_ins) {
            this.skill_ins = i_ins;
        };
        skill_tips_data.prototype.get_skilltips_data = function () {
            return this.skill_ins;
        };
        skill_tips_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return skill_tips_data;
    }(utils.game_data));
    data.skill_tips_data = skill_tips_data;
})(data || (data = {}));
//# sourceMappingURL=tips_data.js.map