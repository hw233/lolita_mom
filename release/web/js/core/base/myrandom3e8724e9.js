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
var myrandom;
(function (myrandom) {
    var CRandBase = /** @class */ (function () {
        function CRandBase() {
            this.m_nSeed = 0xf3cc945a;
        }
        CRandBase.prototype.GetSeed = function () {
            return this.m_nSeed;
        };
        CRandBase.prototype.SetSeed = function (seed) {
            this.m_nSeed = seed;
        };
        CRandBase.prototype.Random_01 = function () {
            return 0;
        };
        CRandBase.prototype.RandomInt = function () {
            return 0;
        };
        CRandBase.prototype.Random = function (Max, Min) {
            if (Min === void 0) { Min = 0; }
            var ret = this.Random_01();
            var ret2 = Max - Min + 1;
            ret2 *= ret;
            return Min + ret2;
        };
        return CRandBase;
    }());
    myrandom.CRandBase = CRandBase;
    var CLcg1_Rand = /** @class */ (function (_super) {
        __extends(CLcg1_Rand, _super);
        function CLcg1_Rand() {
            return _super.call(this) || this;
        }
        CLcg1_Rand.prototype.Random_01 = function () {
            var k = this.m_nSeed / 127773;
            this.m_nSeed = 16807 * (this.m_nSeed - (k * 127773)) - k * 2836;
            if (this.m_nSeed <= 0) {
                this.m_nSeed += 2147483647;
            }
            var ret = this.m_nSeed * 4.656612875E-10;
            return ret;
        };
        CLcg1_Rand.prototype.RandomInt = function () {
            var k = this.m_nSeed / 127773;
            this.m_nSeed = 16807 * (this.m_nSeed - (k * 127773)) - k * 2836;
            if (this.m_nSeed <= 0) {
                this.m_nSeed += 2147483647;
            }
            return this.m_nSeed & 0xffff;
        };
        return CLcg1_Rand;
    }(CRandBase));
    myrandom.CLcg1_Rand = CLcg1_Rand;
    var CLcg2_Rand = /** @class */ (function (_super) {
        __extends(CLcg2_Rand, _super);
        function CLcg2_Rand() {
            return _super.call(this) || this;
        }
        CLcg2_Rand.prototype.Random_01 = function () {
            var nFirst = this.m_nSeed;
            nFirst = (nFirst >> 16) & 0x7fff;
            this.m_nSeed = this.m_nSeed * 214013 + 2531011;
            var nSecond = this.m_nSeed;
            nSecond = (nSecond >> 16) & 0x7fff;
            this.m_nSeed = this.m_nSeed * 214013 + 2531011;
            var f = (nFirst << 15) | nSecond;
            return (f / 0x40000000);
        };
        CLcg2_Rand.prototype.RandomInt = function () {
            this.m_nSeed = this.m_nSeed * 214013 + 2531011;
            this.m_nSeed &= 0xffffffff;
            if (this.m_nSeed < 0) {
                this.m_nSeed += 0xffffffff + 1;
            }
            //core.net_errlog("RandomInt ",this.m_nSeed,this.m_nSeed>>15,(this.m_nSeed>>15)&0xffff,this.m_nSeed/32768,(this.m_nSeed/32768)&0xffff);
            return (this.m_nSeed >> 15) & 0xffff;
        };
        return CLcg2_Rand;
    }(CRandBase));
    myrandom.CLcg2_Rand = CLcg2_Rand;
})(myrandom || (myrandom = {}));
var myencode;
(function (myencode) {
    var MyEncode = /** @class */ (function () {
        function MyEncode() {
            this.m_rand = new myrandom.CLcg2_Rand();
            this.m_remain = 0;
            this.m_flag = 0;
            this.m_rand.SetSeed(0xf3cc945a);
        }
        MyEncode.prototype.Encode = function (buff) {
            if (buff.length < 1) {
                return false;
            }
            var i = 0;
            var temp = 0;
            if (this.m_remain > 0xffff) {
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^ (this.m_remain & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i;
                buff.writeUint8(temp);
                this.m_flag = temp;
                this.m_remain = 0;
                i++;
            }
            if (buff.length < (i + 2)) {
                return false;
            }
            var r = 0;
            for (; i < buff.length - 1; i += 2) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = i;
                buff.writeUint8(temp);
                buff.pos = i + 1;
                temp = buff.getUint8();
                temp = temp ^ ((r >> 8) & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i + 1;
                buff.writeUint8(temp);
                this.m_flag = temp;
            }
            if (i < buff.length) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = buff.length - 1;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = buff.length - 1;
                buff.writeUint8(temp);
                this.m_remain = (r >> 8) + 0x10000;
            }
            return true;
        };
        MyEncode.prototype.Decode = function (buff) {
            if (buff.length < 1) {
                return false;
            }
            var i = 0;
            var temp = 0;
            if (this.m_remain > 0xffff) {
                this.m_remain = (this.m_remain & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i;
                temp = buff.getUint8();
                this.m_flag = temp;
                temp = (temp ^ this.m_remain) & 0xff;
                buff.pos = 0;
                buff.writeUint8(temp);
                this.m_remain = 0;
                i++;
            }
            if (buff.length < (i + 2)) {
                return false;
            }
            var r = 0;
            for (; i < buff.length - 1; i += 2) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = i;
                buff.writeUint8(temp);
                r = ((r >> 8) & 0xff) ^ this.m_flag ^ 0xab;
                buff.pos = i + 1;
                this.m_flag = buff.getUint8();
                temp = (this.m_flag ^ (r & 0xff)) & 0xff;
                buff.pos = i + 1;
                buff.writeUint8(temp);
            }
            if (i < buff.length) {
                r = this.m_rand.RandomInt() & 0xffff;
                //core.net_errlog("r ",r);
                buff.pos = buff.length - 1;
                temp = buff.getUint8();
                temp = temp ^ (r & 0xff) ^ this.m_flag;
                buff.pos = buff.length - 1;
                buff.writeUint8(temp);
                this.m_remain = (r >> 8) + 0x10000;
            }
            return true;
        };
        return MyEncode;
    }());
    myencode.MyEncode = MyEncode;
})(myencode || (myencode = {}));
//# sourceMappingURL=myrandom.js.map