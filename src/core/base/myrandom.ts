module myrandom{
    export class CRandBase{
        protected m_nSeed:number = 0xf3cc945a;
        constructor(){
            
        }
        public GetSeed():number{
            return this.m_nSeed;
        }
        public SetSeed(seed:number):void{
            this.m_nSeed = seed;
        }
        public Random_01():number{
            return 0;
        }
        public RandomInt():number{
            return 0;
        }
        public Random(Max:number,Min:number = 0):number{//产生Min,Max之间的随机数		Min <  out_number <  Max
            let ret:number = this.Random_01();
            let ret2:number = Max - Min + 1;
            ret2 *= ret;
            return Min + ret2;
        }
    }
    export class CLcg1_Rand extends CRandBase{//用线性同余法取随机数(1)
        constructor(){
            super();
        }
        public Random_01():number{
            let k:number = this.m_nSeed/127773;
            this.m_nSeed = 16807*(this.m_nSeed - (k*127773)) - k*2836;
            if(this.m_nSeed <= 0){
                this.m_nSeed += 2147483647;
            }
            let ret:number = this.m_nSeed * 4.656612875E-10;
            return ret;
        }
        public RandomInt():number{
            let k:number = this.m_nSeed/127773;
            this.m_nSeed = 16807*(this.m_nSeed - (k*127773)) - k*2836;
            if(this.m_nSeed <= 0){
                this.m_nSeed += 2147483647;
            }
            return this.m_nSeed&0xffff;
        }
    }
    export class CLcg2_Rand extends CRandBase{//用线性同余法取随机数(1)
        constructor(){
            super();
        }
        public Random_01():number{
            let nFirst:number = this.m_nSeed;
            nFirst = (nFirst >> 16) & 0x7fff;
            this.m_nSeed = this.m_nSeed*214013 + 2531011;

            let nSecond = this.m_nSeed;
            nSecond = (nSecond >> 16)&0x7fff;
            this.m_nSeed = this.m_nSeed*214013 + 2531011;

            let f:number = (nFirst << 15) | nSecond;
            return (f/0x40000000);
        }
        public RandomInt():number{
            this.m_nSeed = this.m_nSeed*214013 + 2531011;
            this.m_nSeed &= 0xffffffff;
            if(this.m_nSeed < 0){
                this.m_nSeed += 0xffffffff+1;
            }
            //core.net_errlog("RandomInt ",this.m_nSeed,this.m_nSeed>>15,(this.m_nSeed>>15)&0xffff,this.m_nSeed/32768,(this.m_nSeed/32768)&0xffff);
            return (this.m_nSeed>>15)&0xffff;
        }
    }
}

module myencode{
    export class MyEncode{
        private m_rand:myrandom.CLcg2_Rand = new myrandom.CLcg2_Rand();
        private m_remain:number = 0;
        private m_flag:number = 0;
        constructor(){
            this.m_rand.SetSeed(0xf3cc945a);
        }
        public Encode(buff:Laya.Byte):boolean{
            if(buff.length < 1){
                return false;
            }
            let i:number = 0;
            let temp:number = 0;
            if(this.m_remain > 0xffff){
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^(this.m_remain&0xff)^this.m_flag^0xab;
                buff.pos = i;
                buff.writeUint8(temp);
                this.m_flag = temp;
                this.m_remain = 0;
                i++;
            }
            if(buff.length < (i+2)){
                return false;
            }
            let r:number = 0;
            for(;i<buff.length-1;i+=2){
                r = this.m_rand.RandomInt()&0xffff;
                //core.net_errlog("r ",r);
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^(r&0xff)^this.m_flag;
                buff.pos = i;
                buff.writeUint8(temp);
                buff.pos = i + 1;
                temp = buff.getUint8();
                temp = temp ^ ((r>>8)&0xff)^this.m_flag^0xab;
                buff.pos = i + 1;
                buff.writeUint8(temp);
                this.m_flag = temp;
            }
            if(i < buff.length){
                r = this.m_rand.RandomInt()&0xffff;
                //core.net_errlog("r ",r);
                buff.pos = buff.length - 1;
                temp = buff.getUint8();
                temp = temp ^(r&0xff)^this.m_flag;
                buff.pos = buff.length - 1;
                buff.writeUint8(temp);
                this.m_remain = (r>>8)+0x10000;
            }
            return true;
        }
        public Decode(buff:Laya.Byte):boolean{
            if(buff.length < 1){
                return false;
            }
            let i:number = 0;
            let temp:number = 0;
            if(this.m_remain > 0xffff){
                this.m_remain = (this.m_remain&0xff)^this.m_flag^0xab;
                buff.pos = i;
                temp = buff.getUint8();
                this.m_flag = temp;

                temp = (temp^this.m_remain)&0xff;
                buff.pos = 0;
                buff.writeUint8(temp);

                this.m_remain = 0;
                i++;
            }
            if(buff.length < (i+2)){
                return false;
            }
            let r:number = 0;
            for(;i<buff.length-1;i+=2){
                r = this.m_rand.RandomInt()&0xffff;
                //core.net_errlog("r ",r);
                buff.pos = i;
                temp = buff.getUint8();
                temp = temp ^(r&0xff)^this.m_flag;
                buff.pos = i;
                buff.writeUint8(temp);

                r = ((r>>8)&0xff)^this.m_flag^0xab;

                buff.pos = i + 1;
                this.m_flag = buff.getUint8();
                temp = (this.m_flag ^ (r&0xff))&0xff;
                buff.pos = i + 1;
                buff.writeUint8(temp);
            }
            if(i < buff.length){
                r = this.m_rand.RandomInt()&0xffff;
                //core.net_errlog("r ",r);
                buff.pos = buff.length - 1;
                temp = buff.getUint8();
                temp = temp ^(r&0xff)^this.m_flag;
                buff.pos = buff.length - 1;
                buff.writeUint8(temp);
                this.m_remain = (r>>8)+0x10000;
            }
            return true;
        }
    }
}