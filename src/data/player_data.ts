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
        constructor()
        {
            super();
        }
        
        public dispose()
        {
            super.dispose();
        }
    }
}