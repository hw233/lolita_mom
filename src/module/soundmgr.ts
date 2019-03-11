module game {
    export class soundmgr extends utils.game_module {
        public m_state: number = -1;
        public m_b_stop: boolean = false;
        private m_sound_savekey: string = "xiaomi_game_sound";
        private m_cur_musicurl: string = "";
        private m_cur_soundurl: string = "";
        private b_stop_music: boolean = false;

        constructor() {
            super();
        }

        public start() {
            super.start();
            this.register_event(game_event.EVENT_SOUND_OPEN, this.on_sound_open);
            this.register_event(game_event.EVENT_SOUND_CLOSE, this.on_sound_close);
            this.register_event(game_event.EVENT_BUTTON_CLICK, this.on_button_click);
            let open_str: string = helper.get_local(this.m_sound_savekey);
            if (open_str == null || open_str.length <= 0) {
                this.m_b_stop = false;
            }
            else {
                let flag: number = parseInt(open_str);
                if (flag == 0) {
                    this.m_b_stop = true;
                }
                else {
                    this.m_b_stop = false;
                }
            }
            Laya.SoundManager.autoReleaseSound = false;
        }

        private _stopmusic(): void {
            if (this.m_cur_musicurl.length > 0) {
                Laya.SoundManager.stopMusic();
                if (this.b_stop_music == true) {
                    Laya.SoundManager.destroySound(this.m_cur_musicurl);
                }
                this.m_cur_musicurl = "";
            }
        }
        private _stopsound(): void {
            if (this.m_cur_soundurl.length > 0) {
                Laya.SoundManager.stopSound(this.m_cur_soundurl);
                if (this.b_stop_music == true) {
                    Laya.SoundManager.destroySound(this.m_cur_soundurl);
                }
                this.m_cur_soundurl = "";
            }
        }
        private on_sound_close(ud: any = null): void {
            this.m_b_stop = true;
            helper.set_local(this.m_sound_savekey, "0");
            Laya.SoundManager.stopAll();
            this._stopmusic();
            this._stopsound();
        }
        public is_open(): boolean {
            return this.m_b_stop;
        }
        private on_sound_open(ud: any = null): void {
            this.m_b_stop = false;
            helper.set_local(this.m_sound_savekey, "1");
            if (this.m_state == 1) {
                this.m_state = -1;
                //this.enter_game();
            }
            else if (this.m_state == 2) {
                this.m_state = -1;
                this.enter_scene();
            }
            else if (this.m_state == 3) {
                this.m_state = -1;
                this.enter_boss();
            }
        }
        private on_button_click(ud: any = null): void {
            if (this.m_b_stop == true) {
                return;
            }
            this.m_cur_soundurl = "sound/mousedown_btn.wav";
            Laya.SoundManager.playSound(this.m_cur_soundurl);
        }
        public enter_game(): void {
            if (this.m_state == 1) {
                return;
            }
            this.m_state = 1;
            if (this.m_b_stop) {
                return;
            }
            this._stopmusic();
            this.m_cur_musicurl = "sound/login.mp3";
            Laya.SoundManager.playMusic(this.m_cur_musicurl);
        }
        public enter_scene(): void {
            if (this.m_state == 2) {
                return;
            }
            this.m_state = 2;
            if (this.m_b_stop) {
                return;
            }
            this._stopmusic();
            this.m_cur_musicurl = "sound/normal.mp3";
            Laya.SoundManager.playMusic(this.m_cur_musicurl);
        }
        public enter_boss(): void {
            if (this.m_state == 3) {
                return;
            }
            this.m_state = 3;
            if (this.m_b_stop) {
                return;
            }
            this._stopmusic();
            this.m_cur_musicurl = "sound/boss.mp3";
            Laya.SoundManager.playMusic(this.m_cur_musicurl);
        }
        public play_sound(url: string): void {
            if (this.m_b_stop) {
                return;
            }
            this._stopsound();
            this.m_cur_soundurl = url;
            Laya.SoundManager.playSound(this.m_cur_soundurl);
        }
        public stop_sound(url: string): void {
            Laya.SoundManager.stopSound(url);
            if (this.b_stop_music == true) {
                Laya.SoundManager.destroySound(url);
            }
            if (this.m_cur_soundurl == url) {
                this.m_cur_soundurl = "";
            }
        }
        public dispose() {
            super.dispose();
        }
    }
}