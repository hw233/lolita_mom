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