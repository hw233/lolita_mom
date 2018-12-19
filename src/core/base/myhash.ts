module core{
    const HASH_OFFSET:number = 0;
    const HASH_A:number = 1;
    const HASH_B:number = 2;
    let b_init_table:boolean = false;
    let g_crypt_table:Array<number> = new Array<number>();

    function init_crypt_table():void{
        if(b_init_table){
            return;
        }
        
        b_init_table = true;

        for(let i:number = 0;i < 0x500;++i){
            g_crypt_table.push(0);
        }
        let seed:number = 0x00100001;
        let index2:number = 0;
        for(let index1:number = 0;index1 < 0x100;index1++){
            index2 = index1;
            for(let i:number = 0;i < 5;++i){
                seed = (seed*125 + 3)%0x2AAAAB;
                let temp1:number = (seed&0xffff)<<0x10;

                seed = (seed*125 + 3)%0x2AAAAB;
                let temp2:number = (seed&0xffff)
                g_crypt_table[index2] = (temp1|temp2);

                index2 += 0x100;
            }
        }
    }
    function my_hash(hash_str:string,hash_type:number):number{
        init_crypt_table();
        let seed1:number = 0x7FED7FED;
        let seed2:number = 0xEEEEEEEE;
        hash_str = hash_str.toUpperCase();
        let char_c:number;
        for(let i:number = 0;i < hash_str.length;++i){
            char_c = hash_str.charCodeAt(i);
            let idx:number = (hash_type << 8)+char_c;
            seed1 = g_crypt_table[idx]^(seed1+seed2);
            seed1 = seed1&0xffffffff;
            seed2 = char_c + seed1 +seed2 + (seed2<<5)+3;
            seed2 = seed2&0xffffffff;
        }
        if(seed1 < 0){
            seed1 = seed1+0xffffffff+0x1;
        }
        return seed1;
    }
    export function get_file_key(file_name:string):number{
        return my_hash(file_name,HASH_OFFSET);
    }
}