module core {
    export class pathnode extends laya.maths.Point {
        public m_end_pt:laya.maths.Point = null;
        public m_start_tm:number = 0;
        public m_total_tm:number = 0;
        public m_dir:number = 0;
        public m_cur_pt:laya.maths.Point = null;
        public m_dir_count:number = 8;
        public m_angle:number = 0;
        public m_dx:number = 0;
        public m_dy:number = 0;
        public m_dx_idis:number = 0;
        public m_dy_idis:number = 0;
        public m_idis_sec:number = 1000;
        public m_idis_millsec:number = 1000000;
        constructor(sx:number,sy:number,dx:number,dy:number,dircount:number = 8){
            super();
            this.m_end_pt = new laya.maths.Point();
            this.m_cur_pt = new laya.maths.Point();
            this.init(sx,sy,dx,dy,dircount);
        }
        public init(sx:number,sy:number,dx:number,dy:number,dircount:number = 8):void
        {
            this.x = sx;
            this.y = sy;
            this.m_end_pt.setTo(dx,dy);
            this.m_dx = dx - sx;
            this.m_dy = dy - sy;
            this.m_angle = utils.genangle(this.m_dx,this.m_dy);
            this.m_dir = utils.gendir(this.m_dx,this.m_dy,this.m_dir_count,this.m_angle);
            //core.core_tiplog("pathnode init ",sx,sy,dx,dy);
        }
        public cal_total_tm(speed:number):void
        {
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
            let adx:number = Math.abs(this.m_dx);
            let ady:number = Math.abs(this.m_dy);
            let totaldis:number = Math.sqrt(adx*adx+ady*ady);
            this.m_total_tm = totaldis*1000/speed;
            
            //
            //core.core_tiplog("pathnode calc total tm ",this.m_dx,this.m_dy,this.m_total_tm);
        }
        public is_end(tm:number):boolean
        {
            return ((tm - this.m_start_tm) >= this.m_total_tm);
        }
        public get_pos(tm:number):laya.maths.Point
        {
            let delta:number = tm - this.m_start_tm;
            if(delta <= 0)
            {
                this.m_cur_pt.x = this.x;
                this.m_cur_pt.y = this.y;
            }
            else if(delta >= this.m_total_tm)
            {
                this.m_cur_pt.x = this.m_end_pt.x;
                this.m_cur_pt.y = this.m_end_pt.y;
            }
            else
            {
                //this.m_cur_pt.x = this.x + delta*this.m_dx_idis/this.m_idis_millsec;
                //this.m_cur_pt.y = this.y + delta*this.m_dy_idis/this.m_idis_millsec;
                this.m_cur_pt.x = this.x + delta*this.m_dx/this.m_total_tm;
                this.m_cur_pt.y = this.y + delta*this.m_dy/this.m_total_tm;
            }
            //core.core_tiplog("pathnode get_pos ",delta,this.x,this.y,this.m_end_pt.x,this.m_end_pt.y,this.m_cur_pt.x,this.m_cur_pt.y);
            return this.m_cur_pt;
        }
        public dispose():void
        {
           
        }
    }
}