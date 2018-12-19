module data{
    export class account_data extends utils.game_data{
        public m_account:string = "";
        public m_role_num:number = 0;
        public m_role_id:number = 0;
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