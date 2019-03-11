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