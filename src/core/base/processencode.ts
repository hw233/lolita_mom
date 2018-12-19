module processencode{
    const PUBLIC_KEY:Array<number> = [
0xb62d3baa, 0x39232eda, 0x6e0e759c, 0x2bbe586d, 0xabf49478, 0xe56c78fd, 0xb98c38ca, 0x3d800586,
0xdc4bc118, 0xa3bd8c46, 0xed966bb7, 0x20de2a53, 0x41bd7414, 0x026bb617, 0x6bd49d9e, 0x2d4c292b,
0x370cc4c5, 0x9762472f, 0xe549ee5d, 0xfe4ffaef, 0x7f216d36, 0xd4d494b2, 0xc68edd39, 0xad5baf7e,
0xc58a317d, 0x0a067333, 0x4db576dd, 0xa302af72, 0x78491a14, 0x0250a60b, 0x734e4212, 0xb97c7022,
0x66aadd92, 0x8c027ebb, 0x64964564, 0x11572cd6, 0xcd1c2bab, 0xc6435a5a, 0x264eb56a, 0xdf357932,
0xbdfc2f29, 0x4254eb7f, 0x71b25c4e, 0x1d1b2b2b, 0xa14b6d6d, 0xe1a16edd, 0x9e74f932, 0x6fbd5c18,
0xd2a6ac2e, 0x3318c0f8, 0xf44fdd6e, 0x744b40ae, 0xf57b4535, 0xde12f0ba, 0xa85c1420, 0xda6cc6bf,
0x75a2a2be, 0x0e6b6b2b, 0x89a2457f, 0xb3d2a551, 0xf23b3b79, 0x41ff0690, 0xed522426, 0xcb994f92,
];
    const SBOX_LENGTH:number = 256;
    let PUBLIC_SBOX:Array<number> = new Array<number>(SBOX_LENGTH);

    function print_array(pre:string,arr:Array<number>):void{
        let output:string = pre+" start";
        core.net_errlog(output);
        output = "";
        let count:number = 16;
        let idx:number = 0;
        for(let i:number = 0;i < arr.length ; ++i){
            let c:number = arr[i];
            if(c < 0){
                //c += 0xffffffff + 1;
            }
            output = output + " " + c.toString(16);
            if(idx >= 15){
                core.net_errlog(output);
                idx = 0;
                output = "";
            }
            else{
                idx += 1;
            }
        }
        if(idx != 0){
            core.net_errlog(output);
            idx = 0;
            output = "";
        }
        output = pre+" end";
        core.net_errlog(output);
    }
    function RC4_Init(code:Array<number>):void{
        let codelen:number = code.length;
        for(let i:number = 0;i < SBOX_LENGTH;++i){
            PUBLIC_SBOX[i] = i;
        }
        let j:number = 0;
        let temp:number = 0;
        for(let i:number = 0;i < SBOX_LENGTH;++i){
            j = (j + code[i%codelen] + PUBLIC_SBOX[i]) % SBOX_LENGTH;
            temp = PUBLIC_SBOX[i];
            PUBLIC_SBOX[i] = PUBLIC_SBOX[j];
            PUBLIC_SBOX[j] = temp;
        }
        //print_array("rc4_init3",PUBLIC_SBOX);
    }
    let g_bRC4_Inited:boolean = false;
    export function RC4_InitCode(){
        if(g_bRC4_Inited){
            return;
        }
        g_bRC4_Inited = true;
        let code_size:number = PUBLIC_KEY.length*4;
        let code:Array<number> = new Array<number>(code_size);
        for(let i:number = 0;i < (code_size /4);++i){
            let temp:number = ((PUBLIC_KEY[i]%0x758b)<<16)|(PUBLIC_KEY[i]%0x7159);
            //todo big endian
            let byte3:number = (temp >> 24)&0xFF;
            let byte2:number = (temp >> 16)&0xFF;
            let byte1:number = (temp >> 8)&0xFF;
            let byte0:number = (temp)&0xFF;

            //todo litter endian
            //let byte0:number = (temp >> 24)&0xFF;
            //let byte1:number = (temp >> 16)&0xFF;
            //let byte2:number = (temp >> 8)&0xFF;
            //let byte3:number = (temp)&0xFF;
            //core.net_errlog("0 1 2 3 ",byte0,byte1,byte2,byte3);
            code[i*4] = byte0;
            code[i*4+1] = byte1;
            code[i*4+2] = byte2;
            code[i*4+3] = byte3;
        }
        //print_array("rc4_init1",code);
        let j:number = 0;
        let temp:number = 0;
        for(let i:number = 0;i < code_size;++i){
            j = (j + code[i]) % code_size;
            temp = code[i];
            code[i] = code[j];
            code[j] = temp;
        }
        //print_array("rc4_init2",code);
        RC4_Init(code);
    }
    export class CProcessEncode{
        private m_SBox:Array<number> = new Array<number>(SBOX_LENGTH);
        private m_x:number = 0;
        private m_y:number = 0;
        private m_seed:number = 0;
        constructor(){
            for(let i:number = 0;i < SBOX_LENGTH;++i){
                this.m_SBox[i] = PUBLIC_SBOX[i];
            }
        }
        public Create(seed:number):void{
            this.m_seed = seed;
            this.m_x = (this.m_seed&0xfff)^0xE21;
            this.m_y = ((this.m_seed>>12)&0xfff)^0x35A;
        }
        public Encode(buff:Laya.Byte):void{
            let temp:number = 0;
            let v:number = 0;
            let tab:Array<number> = this.m_SBox;
            let x:number = this.m_x;
            let y:number = this.m_y;
            //core.net_errlog("pe x y ",x,y);
            for(let i:number = 0;i < buff.length;++i){
                x = (x+7)%SBOX_LENGTH;
                y = (tab[x]+y) % SBOX_LENGTH;

                temp = tab[x];
                tab[x] = tab[y];
                tab[y] = temp;

                temp = (tab[x] + tab[y])%SBOX_LENGTH;
                buff.pos = i;
                v = buff.getUint8();
                buff.pos = i;
                //core.net_errlog("temp v d ",x,y,tab[x],tab[y],temp,v,v^tab[temp]);
                buff.writeUint8(v^tab[temp]);
            }
            this.m_x = x;
            this.m_y = y;
        }
        public Encode2(buff:Laya.Byte):void{
            let temp:number = 0;
            let v:number = 0;
            let tab:Array<number> = this.m_SBox;
            let x:number = this.m_x;
            let y:number = this.m_y;
            for(let i:number = 0;i < buff.length;++i){
                y = (y + 5 + x) % SBOX_LENGTH;
                x = tab[y] % SBOX_LENGTH;

                tab[x] ^= tab[y];
                tab[y] ^= tab[x];
                tab[x] ^= tab[y];

                temp = (tab[x] + tab[y] + 9)%SBOX_LENGTH;

                buff.pos = i;
                v = buff.getUint8();
                buff.pos = i;
                buff.writeUint8(v^tab[temp]);
            }
            this.m_x = x;
            this.m_y = y;
        }
    }
}