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
var core;
(function (core) {
    var pathnode = /** @class */ (function (_super) {
        __extends(pathnode, _super);
        function pathnode(sx, sy, dx, dy, dircount) {
            if (dircount === void 0) { dircount = 8; }
            var _this = _super.call(this) || this;
            _this.m_end_pt = null;
            _this.m_start_tm = 0;
            _this.m_total_tm = 0;
            _this.m_dir = 0;
            _this.m_cur_pt = null;
            _this.m_dir_count = 8;
            _this.m_angle = 0;
            _this.m_dx = 0;
            _this.m_dy = 0;
            _this.m_dx_idis = 0;
            _this.m_dy_idis = 0;
            _this.m_idis_sec = 1000;
            _this.m_idis_millsec = 1000000;
            _this.m_end_pt = new laya.maths.Point();
            _this.m_cur_pt = new laya.maths.Point();
            _this.init(sx, sy, dx, dy, dircount);
            return _this;
        }
        pathnode.prototype.init = function (sx, sy, dx, dy, dircount) {
            if (dircount === void 0) { dircount = 8; }
            this.x = sx;
            this.y = sy;
            this.m_end_pt.setTo(dx, dy);
            this.m_dx = dx - sx;
            this.m_dy = dy - sy;
            this.m_angle = utils.genangle(this.m_dx, this.m_dy);
            this.m_dir = utils.gendir(this.m_dx, this.m_dy, this.m_dir_count, this.m_angle);
            //core.core_tiplog("pathnode init ",sx,sy,dx,dy);
        };
        pathnode.prototype.cal_total_tm = function (speed) {
            /*
            let cosRatio:number = Math.cos(this.m_angle);
            let sinRatio:number = Math.sin(this.m_angle);
            let idis:number = speed*this.m_idis_sec;//speed:pixels of every sec;
            let dx:number = Math.floor(idis*cosRatio);
            let dy:number = Math.floor(idis*sinRatio);
            this.m_dx_idis = dx;
            this.m_dy_idis = dy;
            if(dx != 0)
            {
                //millsec
                this.m_total_tm = (this.m_dx)*this.m_idis_millsec/dx;
            }
            else if(dy != 0)
            {
                this.m_total_tm = (this.m_dy)*this.m_idis_millsec/dy;
            }
            else
            {
                this.m_total_tm = 1;
            }
            */
            //
            var adx = Math.abs(this.m_dx);
            var ady = Math.abs(this.m_dy);
            var totaldis = Math.sqrt(adx * adx + ady * ady);
            this.m_total_tm = totaldis * 1000 / speed;
            //
            //core.core_tiplog("pathnode calc total tm ",this.m_dx,this.m_dy,this.m_total_tm);
        };
        pathnode.prototype.is_end = function (tm) {
            return ((tm - this.m_start_tm) >= this.m_total_tm);
        };
        pathnode.prototype.get_pos = function (tm) {
            var delta = tm - this.m_start_tm;
            if (delta <= 0) {
                this.m_cur_pt.x = this.x;
                this.m_cur_pt.y = this.y;
            }
            else if (delta >= this.m_total_tm) {
                this.m_cur_pt.x = this.m_end_pt.x;
                this.m_cur_pt.y = this.m_end_pt.y;
            }
            else {
                //this.m_cur_pt.x = this.x + delta*this.m_dx_idis/this.m_idis_millsec;
                //this.m_cur_pt.y = this.y + delta*this.m_dy_idis/this.m_idis_millsec;
                this.m_cur_pt.x = this.x + delta * this.m_dx / this.m_total_tm;
                this.m_cur_pt.y = this.y + delta * this.m_dy / this.m_total_tm;
            }
            //core.core_tiplog("pathnode get_pos ",delta,this.x,this.y,this.m_end_pt.x,this.m_end_pt.y,this.m_cur_pt.x,this.m_cur_pt.y);
            return this.m_cur_pt;
        };
        pathnode.prototype.dispose = function () {
        };
        return pathnode;
    }(laya.maths.Point));
    core.pathnode = pathnode;
})(core || (core = {}));
//# sourceMappingURL=pathnode.js.map