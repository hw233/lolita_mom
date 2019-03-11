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
    var account_data = /** @class */ (function (_super) {
        __extends(account_data, _super);
        function account_data() {
            var _this = _super.call(this) || this;
            _this.m_account = "";
            _this.m_role_num = 0;
            _this.m_role_id = 0;
            return _this;
        }
        account_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return account_data;
    }(utils.game_data));
    data.account_data = account_data;
})(data || (data = {}));
//# sourceMappingURL=account_data.js.map
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
    data.CARD_TYPE_MONSTER = 0;
    data.CARD_TYPE_SWORD = 1;
    data.CARD_TYPE_SPELL = 2;
    data.CARD_TYPE_TRAP = 3;
    data.CARD_TYPE_ARMOR = 4;
    var card_obj = /** @class */ (function () {
        function card_obj() {
            this.m_id = 0;
            this.m_shape = 0;
            this.m_atk = 0;
            this.m_hp = 0;
            this.m_duration = 0;
            this.m_name = "";
            this.m_desc = "";
            this.m_iconid = 0;
            this.m_type = 0;
        }
        card_obj.prototype.re_init = function () {
        };
        card_obj.prototype.dispose = function () {
        };
        return card_obj;
    }());
    data.card_obj = card_obj;
    var card_data = /** @class */ (function (_super) {
        __extends(card_data, _super);
        function card_data() {
            var _this = _super.call(this) || this;
            _this.m_cards = new Array();
            _this.m_hands = new Array();
            _this.m_cards_map = new Object();
            _this.m_cards_map_count = 0;
            _this.m_hp = 0;
            _this.m_stamina = 0;
            _this.m_armor = 0;
            _this.m_atk = 0;
            _this.m_exp = 0;
            _this.m_dlv = 0;
            _this.m_clv = 0;
            _this.m_hpmax = 0;
            _this.m_staminamax = 0;
            return _this;
        }
        card_data.prototype.clear_hands = function () {
            for (var _i = 0, _a = this.m_hands; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this._recover_card_obj(i);
            }
            this.m_hands = new Array();
        };
        card_data.prototype.clear_cards = function () {
            for (var _i = 0, _a = this.m_cards; _i < _a.length; _i++) {
                var i = _a[_i];
                i.dispose();
                this._recover_card_obj(i);
            }
            this.m_cards = new Array();
        };
        card_data.prototype._gen_card_obj = function () {
            var obj = utils.getitembycls("card_data_card_obj", card_obj);
            obj.re_init();
            return obj;
        };
        card_data.prototype._recover_card_obj = function (obj) {
            utils.recover("card_data_card_obj", obj);
        };
        card_data.prototype._gen_card_cfg = function (shape, c) {
            var c_cfg = config.Cards.get_Cards(shape);
            if (c_cfg == null) {
                return;
            }
            var tp = c_cfg["type"];
            var cshape = c_cfg["shape"];
            var name = c_cfg["name"];
            var desc = c_cfg["desc"];
            c.m_name = name;
            c.m_desc = desc;
            c.m_iconid = cshape;
            c.m_type = c_cfg["type"];
        };
        card_data.prototype.add_hands = function (id, shape, atk, hp, duration) {
            var c = this._gen_card_obj();
            c.m_id = id;
            c.m_shape = shape;
            c.m_atk = atk;
            c.m_hp = hp;
            c.m_duration = duration;
            this._gen_card_cfg(shape, c);
            this.m_hands.push(c);
        };
        card_data.prototype.open_card = function (id, shape) {
            for (var i = 0; i < this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    c.m_shape = shape;
                    this._gen_card_cfg(shape, c);
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.update_cardsorhands = function (id, shape, atk, hp, duration) {
            for (var i = 0; i < this.m_hands.length; ++i) {
                var c = this.m_hands[i];
                if (c.m_id == id) {
                    c.m_shape = shape;
                    c.m_atk = atk;
                    c.m_hp = hp;
                    c.m_duration = duration;
                    this._gen_card_cfg(shape, c);
                    return true;
                }
            }
            for (var i = 0; i < this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    c.m_shape = shape;
                    c.m_atk = atk;
                    c.m_hp = hp;
                    c.m_duration = duration;
                    this._gen_card_cfg(shape, c);
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.del_cards = function (id) {
            for (var i = 0; i < this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    delete this.m_cards_map[id];
                    c.m_id = 0;
                    c.m_shape = 0;
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.del_hands = function (id) {
            for (var i = 0; i < this.m_hands.length; ++i) {
                var c = this.m_hands[i];
                if (c.m_id == id) {
                    this._recover_card_obj(c);
                    this.m_hands.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        card_data.prototype.reset_map = function () {
            this.m_cards_map = new Object();
            this.m_cards_map_count = 0;
        };
        card_data.prototype.get_card_data = function (id) {
            for (var i = 0; i < this.m_hands.length; ++i) {
                var c = this.m_hands[i];
                if (c.m_id == id) {
                    return c;
                }
            }
            for (var i = 0; i < this.m_cards.length; ++i) {
                var c = this.m_cards[i];
                if (c.m_id == id) {
                    return c;
                }
            }
        };
        card_data.prototype.update_cards = function (idlist, shapelist, atklist, hplist, durationlist) {
            if (this.m_cards.length <= 0) {
                for (var i = 0; i < idlist.length; ++i) {
                    var c = this._gen_card_obj();
                    c.m_id = idlist[i];
                    c.m_shape = shapelist[i];
                    c.m_atk = atklist[i];
                    c.m_hp = hplist[i];
                    c.m_duration = durationlist[i];
                    this._gen_card_cfg(c.m_shape, c);
                    this.m_cards.push(c);
                    this.m_cards_map[c.m_id] = c;
                    this.m_cards_map_count += 1;
                }
            }
            else {
                for (var i = 0; i < idlist.length; ++i) {
                    var id = idlist[i];
                    if (this.m_cards_map.hasOwnProperty(id.toString())) {
                        this.m_cards_map[id].m_shape = shapelist[i];
                        this.m_cards_map[id].m_atk = atklist[i];
                        this.m_cards_map[id].m_hp = hplist[i];
                        this.m_cards_map[id].m_duration = durationlist[i];
                        this._gen_card_cfg(this.m_cards_map[id].m_shape, this.m_cards_map[id]);
                    }
                }
            }
        };
        card_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return card_data;
    }(utils.game_data));
    data.card_data = card_data;
})(data || (data = {}));
//# sourceMappingURL=card_data.js.map
var data;
(function (data) {
    function init_data_module() {
        utils.data_ins().register_data(data_enum.DATA_ACCOUNT, data.account_data);
        utils.data_ins().register_data(data_enum.DATA_PLAYER, data.player_data);
        utils.data_ins().register_data(data_enum.DATA_CARD, data.card_data);
        utils.data_ins().register_data(data_enum.DATA_TIPS, data.tips_data);
        utils.data_ins().register_data(data_enum.DATA_MSGBOX, data.msgbox_data);
        utils.data_ins().register_data(data_enum.DATA_SCENE, data.scene_data);
    }
    data.init_data_module = init_data_module;
    function get_data(data_name) {
        return utils.data_ins().get_data(data_name);
    }
    data.get_data = get_data;
})(data || (data = {}));
//# sourceMappingURL=data_def.js.map
var data_enum;
(function (data_enum) {
    data_enum.DATA_ACCOUNT = "account";
    data_enum.DATA_PLAYER = "player";
    data_enum.DATA_CARD = "card";
    data_enum.DATA_TIPS = "tips";
    data_enum.DATA_MSGBOX = "msgbox";
    data_enum.DATA_SCENE = "scene";
})(data_enum || (data_enum = {}));
//# sourceMappingURL=data_enum.js.map
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
    var player_data = /** @class */ (function (_super) {
        __extends(player_data, _super);
        function player_data() {
            var _this = _super.call(this) || this;
            _this.m_lv = 0;
            _this.m_shape = 0;
            _this.m_exp = 0;
            _this.m_expmax = 0;
            _this.m_gold = 0;
            _this.m_expspd = 0;
            _this.m_goldspd = 0;
            _this.m_stamina = 0;
            _this.m_last_time = 0;
            _this.m_scene_roleid = 0;
            _this.m_pid = 0;
            _this.m_name = "";
            _this.m_class = 0;
            _this.x = 0;
            _this.y = 0;
            _this.m_desc = new Laya.Byte();
            _this.m_sid = 0;
            _this.m_sresid = 0;
            return _this;
        }
        player_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return player_data;
    }(utils.game_data));
    data.player_data = player_data;
})(data || (data = {}));
//# sourceMappingURL=player_data.js.map
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
    var scene_role_data = /** @class */ (function () {
        function scene_role_data(id, shape, name, lv, cls, x, y, desc) {
            if (desc === void 0) { desc = null; }
            this.m_name = "";
            this.m_pid = 0;
            this.m_shape = 0;
            this.m_lv = 0;
            this.m_class = 0;
            this.m_desc = null;
            this.x = 0;
            this.y = 0;
            this.m_role_id = 0;
            // public m_fairy_role_id:number = 0;
            this.m_status = 0;
            this.m_pid = id;
            this.m_shape = shape;
            this.m_name = name;
            this.m_lv = lv;
            this.m_class = cls;
            this.x = x;
            this.y = y;
            this.m_desc = desc;
        }
        scene_role_data.prototype.set_pos = function (x, y) {
            this.x = x;
            this.y = y;
        };
        scene_role_data.prototype.set_role_id = function (id) {
            this.m_role_id = id;
        };
        // public set_fairy_role_id(id:number):void
        // {
        //     this.m_fairy_role_id = id;
        // }
        // public get_fairy_role_id():number
        // {
        //     return this.m_fairy_role_id;
        // }
        scene_role_data.prototype.set_status = function (status) {
            this.m_status = status;
        };
        scene_role_data.prototype.get_status = function () {
            return this.m_status;
        };
        return scene_role_data;
    }());
    data.scene_role_data = scene_role_data;
    var scene_role_mgr = /** @class */ (function () {
        function scene_role_mgr() {
            this.m_role_list = new Array();
        }
        scene_role_mgr.prototype.addrole = function (id, shape, name, lv, cls, x, y, desc) {
            var newrole = new scene_role_data(id, shape, name, lv, cls, x, y, desc);
            this.m_role_list.push(newrole);
        };
        scene_role_mgr.prototype.getrole = function (id) {
            for (var _i = 0, _a = this.m_role_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_pid == id) {
                    return i;
                }
            }
            return null;
        };
        scene_role_mgr.prototype.getrolebyroleid = function (role_id) {
            for (var _i = 0, _a = this.m_role_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_role_id == role_id) {
                    return i;
                }
            }
            return null;
        };
        scene_role_mgr.prototype.setroleid = function (id, role_id) {
            var role = this.getrole(id);
            if (role != null) {
                role.set_role_id(role_id);
            }
        };
        scene_role_mgr.prototype.setrole_pos = function (id, x, y) {
            var role = this.getrole(id);
            if (role != null) {
                role.set_pos(x, y);
            }
        };
        scene_role_mgr.prototype.delrole = function (id) {
            for (var i = 0; i < this.m_role_list.length; ++i) {
                var role = this.m_role_list[i];
                if (role.m_pid == id) {
                    this.m_role_list.splice(i, 1);
                    return;
                }
            }
        };
        scene_role_mgr.prototype.clearallrole = function () {
            this.m_role_list = new Array();
        };
        scene_role_mgr.prototype.get_scene_role_amount = function () {
            return this.m_role_list.length;
        };
        scene_role_mgr.prototype.get_scene_role_arr = function () {
            return this.m_role_list;
        };
        scene_role_mgr.prototype.dispose = function () {
            this.clearallrole();
        };
        return scene_role_mgr;
    }());
    data.scene_role_mgr = scene_role_mgr;
    var scene_data = /** @class */ (function (_super) {
        __extends(scene_data, _super);
        function scene_data() {
            var _this = _super.call(this) || this;
            _this.m_role_mgr = new scene_role_mgr();
            _this.m_npc_mgr = new scene_role_mgr();
            _this.m_cli_npc_mgr = new scene_role_mgr();
            return _this;
        }
        scene_data.prototype.addrole = function (id, shape, name, lv, cls, x, y, desc) {
            return this.m_role_mgr.addrole(id, shape, name, lv, cls, x, y, desc);
        };
        scene_data.prototype.getrole = function (id) {
            return this.m_role_mgr.getrole(id);
        };
        scene_data.prototype.getrolebyroleid = function (role_id) {
            return this.m_role_mgr.getrolebyroleid(role_id);
        };
        scene_data.prototype.setroleid = function (id, role_id) {
            return this.m_role_mgr.setroleid(id, role_id);
        };
        scene_data.prototype.setrole_pos = function (id, x, y) {
            return this.m_role_mgr.setrole_pos(id, x, y);
        };
        scene_data.prototype.delrole = function (id) {
            return this.m_role_mgr.delrole(id);
        };
        scene_data.prototype.clearallrole = function () {
            return this.m_role_mgr.clearallrole();
        };
        scene_data.prototype.get_scene_role_amount = function () {
            return this.m_role_mgr.get_scene_role_amount();
        };
        scene_data.prototype.get_scene_role_arr = function () {
            return this.m_role_mgr.get_scene_role_arr();
        };
        //npc start
        scene_data.prototype.addnpc = function (id, shape, name, lv, cls, x, y, desc) {
            return this.m_npc_mgr.addrole(id, shape, name, lv, cls, x, y, desc);
        };
        scene_data.prototype.getnpc = function (id) {
            return this.m_npc_mgr.getrole(id);
        };
        scene_data.prototype.getnpcbyroleid = function (role_id) {
            return this.m_npc_mgr.getrolebyroleid(role_id);
        };
        scene_data.prototype.setnpcid = function (id, role_id) {
            return this.m_npc_mgr.setroleid(id, role_id);
        };
        scene_data.prototype.setnpc_pos = function (id, x, y) {
            return this.m_npc_mgr.setrole_pos(id, x, y);
        };
        scene_data.prototype.delnpc = function (id) {
            return this.m_npc_mgr.delrole(id);
        };
        scene_data.prototype.clearallnpc = function () {
            return this.m_npc_mgr.clearallrole();
        };
        //npc end
        //client npc start
        scene_data.prototype.add_cli_npc = function (id, shape, name, lv, cls, x, y, desc) {
            return this.m_cli_npc_mgr.addrole(id, shape, name, lv, cls, x, y, desc);
        };
        scene_data.prototype.get_cli_npc = function (id) {
            return this.m_cli_npc_mgr.getrole(id);
        };
        scene_data.prototype.get_cli_npc_by_role_id = function (role_id) {
            return this.m_cli_npc_mgr.getrolebyroleid(role_id);
        };
        scene_data.prototype.set_cli_npcid = function (id, role_id) {
            return this.m_cli_npc_mgr.setroleid(id, role_id);
        };
        scene_data.prototype.set_cli_npc_pos = function (id, x, y) {
            return this.m_cli_npc_mgr.setrole_pos(id, x, y);
        };
        scene_data.prototype.del_cli_npc = function (id) {
            return this.m_cli_npc_mgr.delrole(id);
        };
        scene_data.prototype.clear_all_cli_npc = function () {
            return this.m_cli_npc_mgr.clearallrole();
        };
        //client npc end
        scene_data.prototype.dispose = function () {
            this.m_role_mgr.dispose();
            this.m_npc_mgr.dispose();
            this.m_cli_npc_mgr.dispose();
            _super.prototype.dispose.call(this);
        };
        return scene_data;
    }(utils.game_data));
    data.scene_data = scene_data;
})(data || (data = {}));
//# sourceMappingURL=scene_data.js.map
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