var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var soundmgr = /** @class */ (function (_super) {
        __extends(soundmgr, _super);
        function soundmgr() {
            var _this = _super.call(this) || this;
            _this.m_state = -1;
            _this.m_b_stop = false;
            _this.m_sound_savekey = "xiaomi_game_sound";
            _this.m_cur_musicurl = "";
            _this.m_cur_soundurl = "";
            _this.b_stop_music = false;
            return _this;
        }
        soundmgr.prototype.start = function () {
            _super.prototype.start.call(this);
            this.register_event(game_event.EVENT_SOUND_OPEN, this.on_sound_open);
            this.register_event(game_event.EVENT_SOUND_CLOSE, this.on_sound_close);
            this.register_event(game_event.EVENT_BUTTON_CLICK, this.on_button_click);
            var open_str = helper.get_local(this.m_sound_savekey);
            if (open_str == null || open_str.length <= 0) {
                this.m_b_stop = false;
            }
            else {
                var flag = parseInt(open_str);
                if (flag == 0) {
                    this.m_b_stop = true;
                }
                else {
                    this.m_b_stop = false;
                }
            }
            Laya.SoundManager.autoReleaseSound = false;
        };
        soundmgr.prototype._stopmusic = function () {
            if (this.m_cur_musicurl.length > 0) {
                Laya.SoundManager.stopMusic();
                if (this.b_stop_music == true) {
                    Laya.SoundManager.destroySound(this.m_cur_musicurl);
                }
                this.m_cur_musicurl = "";
            }
        };
        soundmgr.prototype._stopsound = function () {
            if (this.m_cur_soundurl.length > 0) {
                Laya.SoundManager.stopSound(this.m_cur_soundurl);
                if (this.b_stop_music == true) {
                    Laya.SoundManager.destroySound(this.m_cur_soundurl);
                }
                this.m_cur_soundurl = "";
            }
        };
        soundmgr.prototype.on_sound_close = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_stop = true;
            helper.set_local(this.m_sound_savekey, "0");
            Laya.SoundManager.stopAll();
            this._stopmusic();
            this._stopsound();
        };
        soundmgr.prototype.is_open = function () {
            return this.m_b_stop;
        };
        soundmgr.prototype.on_sound_open = function (ud) {
            if (ud === void 0) { ud = null; }
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
        };
        soundmgr.prototype.on_button_click = function (ud) {
            if (ud === void 0) { ud = null; }
            if (this.m_b_stop == true) {
                return;
            }
            this.m_cur_soundurl = "sound/mousedown_btn.wav";
            Laya.SoundManager.playSound(this.m_cur_soundurl);
        };
        soundmgr.prototype.enter_game = function () {
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
        };
        soundmgr.prototype.enter_scene = function () {
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
        };
        soundmgr.prototype.enter_boss = function () {
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
        };
        soundmgr.prototype.play_sound = function (url) {
            if (this.m_b_stop) {
                return;
            }
            this._stopsound();
            this.m_cur_soundurl = url;
            Laya.SoundManager.playSound(this.m_cur_soundurl);
        };
        soundmgr.prototype.stop_sound = function (url) {
            Laya.SoundManager.stopSound(url);
            if (this.b_stop_music == true) {
                Laya.SoundManager.destroySound(url);
            }
            if (this.m_cur_soundurl == url) {
                this.m_cur_soundurl = "";
            }
        };
        soundmgr.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return soundmgr;
    }(utils.game_module));
    game.soundmgr = soundmgr;
})(game || (game = {}));
//# sourceMappingURL=soundmgr.js.map