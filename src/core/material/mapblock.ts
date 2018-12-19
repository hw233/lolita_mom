module core {
    export class mapblock extends material {
        public m_graphic:laya.display.Sprite;
        public m_res_path:string = null;
        public m_map_id:number = 0;
        public m_grid_w:number = 32;
        public m_grid_h:number = 32;
        public m_buf:laya.utils.Byte = null;
        public m_block_array:Uint8Array = null;
        public m_block_w_num:number = 0;
        public m_block_h_num:number = 0;
        public m_b_n_per_byte:number = 8;
        public m_init_sp:boolean = false;
        public m_block_cache:Uint8Array = null;
        constructor(){
            super();
            this.m_graphic = new laya.display.Sprite();
        }
        public re_init(){

        }
        public load(mapid:number):void
        {
            if(this.m_buf != null)
            {
                this.m_buf.clear();
                this.m_buf = null;
            }
            this.m_map_id = mapid;
            mat_mgr().getmapblock(this,this.m_map_id);
        }
        
        public setbuff(buf:any):void
        {
            this.m_buf = new laya.utils.Byte(buf);
            let offset:number = 0;
            let block_len:number = 0;
            core.core_tiplog("mapblock setbuff len ",this.m_buf.length);
            //"ma"
            core.core_tiplog("mapblock setbuff ",this.m_buf.getByte().toString(16));
            core.core_tiplog("mapblock setbuff ",this.m_buf.getByte().toString(16));
            offset += 2;
            //version
            core.core_tiplog("mapblock setbuff ",this.m_buf.getByte().toString(16));
            offset += 1;
            //cx,cy,sw,sh
            core.core_tiplog("mapblock setbuff ",this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ",this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ",this.m_buf.getUint32());
            core.core_tiplog("mapblock setbuff ",this.m_buf.getUint32());
            offset += 16;
            //bw,bh,slen
            core.core_tiplog("mapblock setbuff bw1 ",this.m_buf.getUint16());
            core.core_tiplog("mapblock setbuff bh1 ",this.m_buf.getUint16());
            core.core_tiplog("mapblock setbuff ",this.m_buf.getUint32());
            offset += 8;

            //bw,bh,slen
            this.m_block_w_num = this.m_buf.getUint32();
            this.m_block_h_num = this.m_buf.getUint32();
            core.core_tiplog("mapblock setbuff bw ",this.m_block_w_num);
            core.core_tiplog("mapblock setbuff bh ",this.m_block_h_num);
            block_len = this.m_buf.getUint32();
            core.core_tiplog("mapblock setbuff block_len ",block_len);
            offset += 12;

            
            this.m_block_array = this.m_buf.getUint8Array(offset,block_len);
            /*for(let i:number = 0;i < 32;++i)
            {
                let idx:number = this.m_block_array.length - i - 1;
                core.core_tiplog("mapblock setbuff block ",i,this.m_block_array[idx]);
            }*/
            this.m_init_sp = false;
            //this.get_block_sp();
            this.m_block_cache = new Uint8Array(this.m_block_w_num*this.m_block_h_num);
            for(let i:number = 0;i < this.m_block_h_num;++i)
            {
                for(let j:number = 0;j < this.m_block_w_num;++j)
                {
                    this.m_block_cache[i*this.m_block_w_num+j] = this.is_block(j,i)?1:0;
                }
            }
        }
        public _is_block(v:number,pos:number):boolean
        {
            return (v&(0x80>>pos)) != 0;
            //return (v&(1<<pos)) != 0;
        }
        public is_block(x:number,y:number):boolean
        {
            if(this.m_buf != null)
            {
                let offset:number = y*this.m_block_w_num+x;
                let vpos:number = Math.floor(offset/this.m_b_n_per_byte);
                let v:number = this.m_block_array[vpos];
                let pos:number = offset%this.m_b_n_per_byte;
                return this._is_block(v,pos);
            }
            return true;
        }
        public is_block_cache(x:number,y:number):boolean
        {
            //core.core_tiplog("mapblock is_block_cache ",x,y,this.m_block_w_num,this.m_block_h_num);
            //core.core_tiplog("mapblock is_block_cache is_block ",this.is_block(x,y));
            if(this.m_buf == null || x< 0 || y < 0 || x >= this.m_block_w_num || y >= this.m_block_h_num)
            {
                return true;
            }
            //core.core_tiplog("mapblock is_block_cache ",this.m_block_cache[y*this.m_block_w_num+x]);
            return this.m_block_cache[y*this.m_block_w_num+x] != 0;
        }
        public get_block_sp():laya.display.Sprite
        {
            this.m_init_sp = true;
            this.m_graphic.removeChildren();
            let idx:number = 0;
            for(let i:number = 0;i<this.m_block_w_num;++i)
            {
                for(let j:number = 0;j < this.m_block_h_num;++j)
                {
                    let v:boolean = this.is_block_cache(i,j);
                    //core.core_tiplog("get_block_sp ",idx,i,j,v);
                    idx++;
                    if(v)
                    {
                        if(i == 20)
                        {
                            this.m_graphic.graphics.drawRect(i*32,j*32,32,32,"#ffff00","#000000");
                        }
                        else
                        {
                            this.m_graphic.graphics.drawRect(i*32,j*32,32,32,"#ff0000","#000000");
                        }
                        //this.m_graphic.graphics.drawRect(i*32,j*32,32,32,"#ff0000","#000000");
                    }
                    else
                    {
                        this.m_graphic.graphics.drawRect(i*32,j*32,32,32,"#00ff00","#000000");
                    }
                }
            }
            return this.m_graphic;
        }
        public dispose():void
        {
            this.m_block_array = null;
            this.m_block_cache = null;
            if(this.m_buf != null)
            {
                this.m_buf.clear();
                this.m_buf = null;
            }
            if(this.m_graphic != null){
                this.m_graphic.removeChildren();
                this.m_graphic.graphics.clear();
                this.m_graphic = null;
            }
            
        }
        public update(delta:number):void
        {
            
        }
    }
}