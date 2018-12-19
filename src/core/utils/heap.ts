module utils{
    export class heap_node{
        public m_value:number = 0;
        public m_user_data:Object = null;
        public m_user_id:number = 0;
        constructor(v:number = 0,uid:number = 0,ud:Object = null)
        {
            this.m_value = v;
            this.m_user_id = uid;
            if(ud == null)
            {
                ud = new Object();
            }
            this.m_user_data = ud;
        }
        public init(v:number,uid:number,ud:Object):void
        {
            this.m_value = v;
            this.m_user_id = uid;
            if(ud == null)
            {
                ud = new Object();
            }
            this.m_user_data = ud;
        }
    }
    export class small_heap {
        private m_array:Array<heap_node> = new Array<heap_node>();
        constructor(){
           
        }
        private _get_nd(v:number,uid:number = 0,ud:Object = null):heap_node
        {
            let ret:heap_node = utils.getitembycls("heap_node",heap_node);
            ret.init(v,uid,ud);
            return ret;
        }
        private _del_nd(nd:heap_node):void
        {
            utils.recover("heap_node",nd);
        }
        private _clear_nd():void
        {
            utils.clearbysign("heap_node");
        }
        private _cmp_v(v1:number,v2:number):boolean
        {
            return v1 < v2;
        }
        private _filter_up(start:number):number
        {
            let idx:number;
            let i = start;
            let nd:heap_node = this.m_array[i];
            let nd_v:number = nd.m_value;
            let nd_id:number = nd.m_user_id;
            let nd_obj:Object = nd.m_user_data;
            while(i > 0)
            {
                idx = (i-1)>>1;
                //core.core_tiplog("_filter_up ",start,i,idx);
                if(this._cmp_v(nd_v,this.m_array[idx].m_value))
                {
                    this.m_array[i].m_value = this.m_array[idx].m_value;
                    this.m_array[i].m_user_id = this.m_array[idx].m_user_id;
                    this.m_array[i].m_user_data = this.m_array[idx].m_user_data;
                    this.m_array[i].m_user_data['idx'] = i;
                    //this.print_data("filter_up swap");
                    i = idx;
                }
                else
                {
                    break;
                }
            }
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            //this.print_data("filter_up end");
            return i;
        }
        private _filter_down(start:number):number
        {
            let idx:number;
            let i = start;
            let tmp:number = 0;
            
            let i1:number = 0;
            let i2:number = 0;
            let total:number = this.m_array.length;
            let nd:heap_node = this.m_array[i];
            let nd_v:number = nd.m_value;
            let nd_id:number = nd.m_user_id;
            let nd_obj:Object = nd.m_user_data;
            while(true)
            {
                i1 = (i<<1)+1;
                i2 = (i<<1)+2;
                if(i1 >= total)//have no more child
                {
                    break;
                }
                let f:boolean = (i2<total)&&(this._cmp_v(this.m_array[i2].m_value,this.m_array[i1].m_value));
                tmp = f?i2:i1;//find better child
                //core.core_tiplog("filter down ",tmp,i2,i1,this.m_array[tmp].m_value,nd.m_value,i,this.m_array[i].m_value);
                if(this._cmp_v(this.m_array[tmp].m_value,nd_v))
                {
                    //child is better
                    //this.m_array[i] = this.m_array[tmp];
                    this.m_array[i].m_value = this.m_array[tmp].m_value;
                    this.m_array[i].m_user_id = this.m_array[tmp].m_user_id;
                    this.m_array[i].m_user_data = this.m_array[tmp].m_user_data;
                    this.m_array[i].m_user_data['idx'] = i;
                }
                else
                {
                    break;
                }
                i = tmp;
            }
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;
            return i;
        }
        public push(v:number,uid:number = 0,ud:Object = null):heap_node
        {
            //core.core_tiplog("smallheap push ",v,uid);
            let nd:heap_node = this._get_nd(v,uid,ud);
            this.m_array.push(nd);
            this._filter_up(this.m_array.length - 1);
            //this.print_data();
            return nd;
        }
        public pop():void
        {
            //core.core_tiplog("smallheap pop ",this.m_array[0].m_value,this.m_array[0].m_user_id,this.m_array.length);
            if(this.m_array.length <= 1)
            {
                this._del_nd(this.top())
                this.m_array.pop();
                return;
            }
            let nd:heap_node = this.m_array[this.m_array.length-1];
            let nd_v:number = nd.m_value;
            let nd_id:number = nd.m_user_id;
            let nd_obj:Object = nd.m_user_data;
            let i:number = 0;
            this.m_array[i].m_value = nd_v;
            this.m_array[i].m_user_id = nd_id;
            this.m_array[i].m_user_data = nd_obj;
            this.m_array[i].m_user_data['idx'] = i;

            //this.m_array[0] = this.m_array[this.m_array.length-1];

            //core.core_tiplog("smallheap pop size ",this.m_array.length);
            this._del_nd(this.m_array[this.m_array.length - 1]);
            this.m_array.splice(this.m_array.length - 1,1);
            //core.core_tiplog("smallheap pop size2 ",this.m_array.length);
            this._filter_down(i);
            //this.print_data();
            return;
        }
        public get_idx(id:number):number
        {
            for(let i:number = 0;i < this.m_array.length;++i)
            {
                let nd:heap_node = this.m_array[i];
                if(nd.m_user_id == id)
                {
                    return i;
                }
            }
            return -1;
        }
        public modify(idx:number,v:number):void
        {
            let nd:heap_node = this.m_array[idx];
            //core.core_tiplog("smallheap modify ",idx,v,nd.m_value,nd.m_user_id);
            if(nd.m_value == v)
            {
                return;
            }
            if(this._cmp_v(nd.m_value,v))//new v is bigger
            {
                nd.m_value = v;
                this._filter_down(idx);
            }
            else
            {
                nd.m_value = v;
                this._filter_up(idx);
            }
            //this.print_data();
        }
        public clear():void
        {
            for(let i:number = 0;i < this.m_array.length;++i)
            {
                this._del_nd(this.m_array[i]);
            }
            this.m_array = new Array<heap_node>();
        }
        public top():heap_node
        {
            return this.m_array[0];
        }
        public is_empty():boolean
        {
            return this.m_array.length <= 0;
        }
        public print_data(pre:string = ""):void
        {
            core.core_tiplog("smallheap begin ",pre,this.m_array.length);
            for(let i of this.m_array)
            {
                core.core_tiplog("smallheap ",pre,i.m_value,i.m_user_id);
            }
            core.core_tiplog("smallheap end ",pre);
        }
    }
}