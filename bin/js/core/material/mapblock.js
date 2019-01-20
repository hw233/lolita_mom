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
    var mapblock = /** @class */ (function (_super) {
        __extends(mapblock, _super);
        function mapblock() {
            var _this = _super.call(this) || this;
            _this.m_res_path = null;
            _this.m_map_id = 0;
            _this.m_grid_w = 32;
            _this.m_grid_h = 32;
            _this.m_buf = null;
            _this.m_block_array = null;
            _this.m_block_w_num = 0;
            _this.m_block_h_num = 0;
            _this.m_b_n_per_byte = 8;
            _this.m_init_sp = false;
            _this.m_block_cache = null;
            _this.m_graphic = new laya.display.Sprite();
            return _this;
        }
        mapblock.prototype.re_init = function () {
        };
        mapblock.prototype.load = function (mapid) {
            if (this.m_buf != null) {
                this.m_buf.clear();
                this.m_buf = null;
            }
            this.m_map_id = mapid;
            core.mat_mgr().getmapblock(this, this.m_map_id);
        };
        mapblock.prototype.setbuff = function (buf) {
            this.m_buf = new laya.utils.Byte(buf);
            var offset = 0;
            var block_len = 0;
            core.core_tiplog("mapblock setbuff len ", this.m_buf.length);
            //"ma"
            core.core_tiplog("mapblock setbuff ", this.m_buf.getByte().toString(16));
            core.core_tiplog("mapblock setbuff ", this.m_buf.getByte().toString(16));
            offset += 2;
            //version
            core.core_tiplog("mapblock setbuff ", this.m_buf.getByte().toString(16));
            offset += 1;
            //cx,cy,sw,sh
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            offset += 16;
            //bw,bh,slen
            core.core_tiplog("mapblock setbuff bw1 ", this.m_buf.getUint16());
            core.core_tiplog("mapblock setbuff bh1 ", this.m_buf.getUint16());
            core.core_tiplog("mapblock setbuff ", this.m_buf.getUint32());
            offset += 8;
            //bw,bh,slen
            this.m_block_w_num = this.m_buf.getUint32();
            this.m_block_h_num = this.m_buf.getUint32();
            core.core_tiplog("mapblock setbuff bw ", this.m_block_w_num);
            core.core_tiplog("mapblock setbuff bh ", this.m_block_h_num);
            block_len = this.m_buf.getUint32();
            core.core_tiplog("mapblock setbuff block_len ", block_len);
            offset += 12;
            this.m_block_array = this.m_buf.getUint8Array(offset, block_len);
            /*for(let i:number = 0;i < 32;++i)
            {
                let idx:number = this.m_block_array.length - i - 1;
                core.core_tiplog("mapblock setbuff block ",i,this.m_block_array[idx]);
            }*/
            this.m_init_sp = false;
            //this.get_block_sp();
            this.m_block_cache = new Uint8Array(this.m_block_w_num * this.m_block_h_num);
            for (var i = 0; i < this.m_block_h_num; ++i) {
                for (var j = 0; j < this.m_block_w_num; ++j) {
                    this.m_block_cache[i * this.m_block_w_num + j] = this.is_block(j, i) ? 1 : 0;
                }
            }
        };
        mapblock.prototype._is_block = function (v, pos) {
            return (v & (0x80 >> pos)) != 0;
            //return (v&(1<<pos)) != 0;
        };
        mapblock.prototype.is_block = function (x, y) {
            if (this.m_buf != null) {
                var offset = y * this.m_block_w_num + x;
                var vpos = Math.floor(offset / this.m_b_n_per_byte);
                var v = this.m_block_array[vpos];
                var pos = offset % this.m_b_n_per_byte;
                return this._is_block(v, pos);
            }
            return true;
        };
        mapblock.prototype.is_block_cache = function (x, y) {
            //core.core_tiplog("mapblock is_block_cache ",x,y,this.m_block_w_num,this.m_block_h_num);
            //core.core_tiplog("mapblock is_block_cache is_block ",this.is_block(x,y));
            if (this.m_buf == null || x < 0 || y < 0 || x >= this.m_block_w_num || y >= this.m_block_h_num) {
                return true;
            }
            //core.core_tiplog("mapblock is_block_cache ",this.m_block_cache[y*this.m_block_w_num+x]);
            return this.m_block_cache[y * this.m_block_w_num + x] != 0;
        };
        mapblock.prototype.get_block_sp = function () {
            this.m_init_sp = true;
            this.m_graphic.removeChildren();
            var idx = 0;
            for (var i = 0; i < this.m_block_w_num; ++i) {
                for (var j = 0; j < this.m_block_h_num; ++j) {
                    var v = this.is_block_cache(i, j);
                    //core.core_tiplog("get_block_sp ",idx,i,j,v);
                    idx++;
                    if (v) {
                        if (i == 20) {
                            this.m_graphic.graphics.drawRect(i * 32, j * 32, 32, 32, "#ffff00", "#000000");
                        }
                        else {
                            this.m_graphic.graphics.drawRect(i * 32, j * 32, 32, 32, "#ff0000", "#000000");
                        }
                        //this.m_graphic.graphics.drawRect(i*32,j*32,32,32,"#ff0000","#000000");
                    }
                    else {
                        this.m_graphic.graphics.drawRect(i * 32, j * 32, 32, 32, "#00ff00", "#000000");
                    }
                }
            }
            return this.m_graphic;
        };
        mapblock.prototype.dispose = function () {
            this.m_block_array = null;
            this.m_block_cache = null;
            if (this.m_buf != null) {
                this.m_buf.clear();
                this.m_buf = null;
            }
            if (this.m_graphic != null) {
                this.m_graphic.removeChildren();
                this.m_graphic.graphics.clear();
                this.m_graphic = null;
            }
        };
        mapblock.prototype.update = function (delta) {
        };
        return mapblock;
    }(core.material));
    core.mapblock = mapblock;
})(core || (core = {}));
//# sourceMappingURL=mapblock.js.map