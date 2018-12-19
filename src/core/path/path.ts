module core {
    export class path {
        public m_nodes:Array<pathnode> = null;
        public m_dir_count:number = 8;
        public m_speed:number = 300;//pixels per sec
        public m_cur_tm:number;
        public m_cur_node_idx:number;
        public m_ret_node:pathnode = null;
        public m_unit_id:number = 0;
        public m_force_dir:number = -1;
        constructor(spd:number){
            this.m_nodes = new Array<pathnode>();
            this.init(spd);
        }
        public init(spd:number){
            this.m_speed = spd;
            this.m_ret_node = utils.getitembycls("pathnode",pathnode);
            this.m_ret_node.init(0,0,0,0);
            this.m_force_dir = -1;
        }
        public push_pt(sx:number,sy:number,dx:number,dy:number):void
        {
            let node:pathnode = utils.getitembycls("pathnode",pathnode);
            node.init(sx,sy,dx,dy,this.m_dir_count);
            node.cal_total_tm(this.m_speed);
            let tm:number = 0;
            if(this.m_nodes.length > 0)
            {
                let last:pathnode = this.m_nodes[this.m_nodes.length - 1];
                tm = last.m_start_tm + last.m_total_tm;
            }
            else
            {
                this.m_ret_node.x = node.x;
                this.m_ret_node.y = node.y;
                this.m_ret_node.m_dir = node.m_dir;
            }
            node.m_start_tm = tm;
            this.m_nodes.push(node);
        }
        public start():void
        {
            this.m_cur_tm = 0;
            this.m_cur_node_idx = 0;
        }
        public update(delta:number):void
        {
            if(this.m_nodes.length <= 0)
            {
                return;
            }
            this.m_cur_tm += delta;
            while(this.m_cur_node_idx < this.m_nodes.length)
            {
                let node:pathnode = this.m_nodes[this.m_cur_node_idx];
                if(this.m_cur_tm >= (node.m_start_tm + node.m_total_tm))
                {
                    this.m_cur_node_idx++;
                }
                else
                {
                    break;
                }
            }
        }
        public get_end():laya.maths.Point
        {
            return this.m_nodes[this.m_nodes.length - 1].m_end_pt;
        }
        public is_end():boolean
        {
            return this.m_cur_node_idx >= this.m_nodes.length;
        }
        public get_cur_pt():pathnode
        {
            let idx:number = this.m_cur_node_idx < this.m_nodes.length ? this.m_cur_node_idx : this.m_nodes.length - 1;
            let cur_node:laya.maths.Point = this.m_nodes[idx].get_pos(this.m_cur_tm);
            this.m_ret_node.x = cur_node.x;
            this.m_ret_node.y = cur_node.y;
            this.m_ret_node.m_dir = this.m_nodes[idx].m_dir;
            if(this.m_force_dir >= 0){
                this.m_ret_node.m_dir = this.m_force_dir;
            }
            return this.m_ret_node;
        }
        public dispose():void
        {
            for(let i of this.m_nodes){
                utils.recover("pathnode",i);
            }
            this.m_nodes.length = 0;
            utils.recover("pathnode",this.m_ret_node);
            this.m_ret_node = null;
        }
    }
}