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
    var channel_data = /** @class */ (function (_super) {
        __extends(channel_data, _super);
        function channel_data() {
            var _this = _super.call(this) || this;
            _this.new_chat = [];
            _this.all_chat_arr = [];
            return _this;
        }
        channel_data.prototype.set_chat_msg = function (ch, pid, shape, vip, name, msg, svrid) {
            this.new_chat.push({ ch: ch, pid: pid, shape: shape, vip: vip, name: name, msg: msg, svrid: svrid });
            this.all_chat_arr.push({ ch: ch, pid: pid, shape: shape, vip: vip, name: name, msg: msg, svrid: svrid });
            if (this.all_chat_arr.length >= 80) {
                this.all_chat_arr.splice(0, 50);
            }
        };
        channel_data.prototype.get_new_chat = function () {
            return this.new_chat;
        };
        channel_data.prototype.get_all_chat = function () {
            return this.all_chat_arr;
        };
        channel_data.prototype.clear_new_chat = function () {
            this.new_chat = [];
        };
        channel_data.prototype.get_svr_name = function (svr_id) {
            var sdata = data.get_data(data_enum.DATA_SVRLIST);
            var svr_ins = sdata.get_svr_data(svr_id);
            if (svr_ins != null) {
                return svr_ins.m_name;
            }
            return "";
        };
        channel_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return channel_data;
    }(utils.game_data));
    data.channel_data = channel_data;
})(data || (data = {}));
//# sourceMappingURL=channel_data.js.map
var data;
(function (data) {
    function init_data_module() {
        utils.data_ins().register_data(data_enum.DATA_ACCOUNT, data.account_data);
        utils.data_ins().register_data(data_enum.DATA_PLAYER, data.player_data);
        utils.data_ins().register_data(data_enum.DATA_CARD, data.card_data);
        utils.data_ins().register_data(data_enum.DATA_TIPS, data.tips_data);
        utils.data_ins().register_data(data_enum.DATA_MSGBOX, data.msgbox_data);
        utils.data_ins().register_data(data_enum.DATA_SCENE, data.scene_data);
        utils.data_ins().register_data(data_enum.DATA_CHAT, data.channel_data);
        utils.data_ins().register_data(data_enum.DATA_SVRLIST, data.svrlist_data);
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
    data_enum.DATA_CHAT = "chat";
    data_enum.DATA_SVRLIST = "svrlist";
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
    var svr_data = /** @class */ (function () {
        function svr_data() {
            this.m_id = 0;
            this.m_name = "";
            this.m_ip = "";
            this.m_port = 0;
            this.m_type = 0; //1表示新服
            this.m_state = 0; //1拥挤2停服
        }
        return svr_data;
    }());
    data.svr_data = svr_data;
    var svr_district = /** @class */ (function () {
        function svr_district() {
            this.m_id = 0;
            this.m_name = "";
            this.m_svr_list = new Array();
        }
        return svr_district;
    }());
    data.svr_district = svr_district;
    var svrlist_data = /** @class */ (function (_super) {
        __extends(svrlist_data, _super);
        function svrlist_data() {
            var _this = _super.call(this) || this;
            _this.m_svrlist_json = null;
            _this.m_recent_list = new Array();
            _this.m_district_list = new Array();
            _this.m_svr_dict = new Laya.Dictionary();
            _this.m_cur_svr_id = 0;
            _this.m_pre_connect_svr_id = 0;
            return _this;
        }
        svrlist_data.prototype.get_districtid_by_svrid = function (svr_id) {
            for (var _i = 0, _a = this.m_district_list; _i < _a.length; _i++) {
                var i = _a[_i];
                for (var _b = 0, _c = i.m_svr_list; _b < _c.length; _b++) {
                    var j = _c[_b];
                    if (j == svr_id) {
                        return i.m_id;
                    }
                }
            }
            return 0;
        };
        svrlist_data.prototype.get_district_data = function (district_id) {
            for (var _i = 0, _a = this.m_district_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.m_id == district_id) {
                    return i;
                }
            }
            return null;
        };
        svrlist_data.prototype.get_svr_data = function (svr_id) {
            return this.m_svr_dict.get(svr_id);
        };
        svrlist_data.prototype.get_svr_dict = function () {
            return this.m_svr_dict;
        };
        svrlist_data.prototype.get_recommend_svr = function () {
            return 0;
        };
        svrlist_data.prototype.update_recent = function () {
            this.m_recent_list.length = 0;
            var v = helper.get_local("recent_svr_list");
            if (v != null && v.length > 0) {
                var vlist = v.split(',');
                for (var _i = 0, vlist_1 = vlist; _i < vlist_1.length; _i++) {
                    var i = vlist_1[_i];
                    if (i != null && i.length > 0) {
                        var bfind = false;
                        for (var _a = 0, _b = this.m_recent_list; _a < _b.length; _a++) {
                            var j = _b[_a];
                            if (j == parseInt(i)) {
                                bfind = true;
                                break;
                            }
                        }
                        if (!bfind) {
                            this.m_recent_list.push(parseInt(i));
                        }
                    }
                }
            }
            core.game_tiplog("svrlist_data get recent_svr_list ", v, this.m_recent_list.toString());
        };
        svrlist_data.prototype.add_recent = function (svr_id) {
            var tmp = new Array();
            tmp.push(svr_id);
            for (var _i = 0, _a = this.m_recent_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i != svr_id && this.get_svr_data(i) != null) {
                    tmp.push(i);
                }
            }
            this.m_recent_list = tmp;
            var save_str = "";
            for (var _b = 0, _c = this.m_recent_list; _b < _c.length; _b++) {
                var i = _c[_b];
                if (save_str.length > 0) {
                    save_str = save_str + ",";
                }
                save_str = save_str + i.toString();
            }
            core.game_tiplog("svrlist_data save recent_svr_list ", save_str);
            helper.set_local("recent_svr_list", save_str);
        };
        svrlist_data.prototype.update_json = function (json_data) {
            var jdata = JSON.parse(json_data);
            ;
            this.set_json_data(jdata);
        };
        svrlist_data.prototype.set_json_data = function (jdata) {
            this.m_svrlist_json = jdata;
            this.m_svr_dict.clear();
            for (var _i = 0, _a = this.m_svrlist_json['svr_cfg']; _i < _a.length; _i++) {
                var i = _a[_i];
                var sdata = new svr_data();
                sdata.m_id = parseInt(i['id']);
                sdata.m_name = i['name'];
                sdata.m_ip = i['ip'];
                sdata.m_port = parseInt(i['port']);
                sdata.m_type = parseInt(i['type']);
                sdata.m_state = parseInt(i['state']);
                this.m_svr_dict.set(sdata.m_id, sdata);
            }
            this.m_district_list = new Array();
            this.m_district_list.length = 0;
            for (var _b = 0, _c = this.m_svrlist_json['dis_cfg']; _b < _c.length; _b++) {
                var i = _c[_b];
                var sddata = new svr_district();
                sddata.m_id = parseInt(i['id']);
                for (var _d = 0, _e = i['svrlist']; _d < _e.length; _d++) {
                    var j = _e[_d];
                    sddata.m_svr_list.push(parseInt(j));
                }
                sddata.m_svr_list.sort(this._svr_sort); // 排序
                this.m_district_list.push(sddata);
            }
            this.m_district_list.sort(this._dis_sort); // 排序
            // 内网测试服务器地址
            if (this.is_testing() == true) {
                if (this.m_district_list.length > 0) {
                    var sd_ins = this.m_district_list[0];
                    var t_svr_list = [153, 158, 136, 160, 181, 155, 176, 182, 130, 184];
                    var new_svr_list = t_svr_list.concat(sd_ins.m_svr_list);
                    sd_ins.m_svr_list = new_svr_list;
                }
            }
        };
        svrlist_data.prototype._dis_sort = function (dis_ins1, dis_ins2) {
            return dis_ins1.m_id - dis_ins2.m_id;
        };
        svrlist_data.prototype._svr_sort = function (svr_id1, svr_id2) {
            return svr_id1 - svr_id2;
        };
        svrlist_data.prototype.is_testing = function () {
            return false;
        };
        svrlist_data.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return svrlist_data;
    }(utils.game_data));
    data.svrlist_data = svrlist_data;
})(data || (data = {}));
//# sourceMappingURL=svrlist_data.js.map
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