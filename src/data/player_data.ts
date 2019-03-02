module data{
    export class player_data extends utils.game_data{
        public m_lv:number = 0;
        public m_shape:number = 0;
        public m_exp:number = 0;
        public m_expmax:number = 0;
        public m_gold:number = 0;
        public m_expspd:number = 0;
        public m_goldspd:number = 0;
        public m_stamina:number = 0;
        public m_last_time:number = 0;
        public m_scene_roleid:number = 0;

        public m_pid:number = 0;
        public m_name:string = "";
        public m_class:number = 0;
        public x:number = 0;
        public y:number = 0;
        public m_desc:Laya.Byte = new Laya.Byte();
        public m_sid:number = 0;
        public m_sresid:number = 0;
        constructor()
        {
            super();
        }
        
        public dispose():void
        {
            super.dispose();
        }
    }
}