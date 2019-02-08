var base;
(function (base) {
    //玩家描述
    var Player = /** @class */ (function () {
        function Player() {
            this.m_id = 0;
            this.m_name = "";
            this.m_shape = 0;
            this.m_desc = null;
            this.m_grade = 0;
            this.m_classes = 0;
            this.m_battlevalue = 0;
            this.m_vip = 0;
            this.m_gangid = 0;
            this.m_gangname = "";
            this.m_sign = "";
            this.m_isfriend = 0;
            this.m_isblack = 0;
            this.m_online = 0;
            this.m_getcoin = 0;
            this.m_chattime = 0;
            this.m_svr_id = 0;
        }
        Player.prototype.dispose = function () {
        };
        return Player;
    }());
    base.Player = Player;
    //技能描述
    var Skill = /** @class */ (function () {
        function Skill() {
            this.m_id = 0;
            this.m_lv = 0;
            this.m_icon = 0;
            this.m_cost = 0; // 升级消耗，为0时不能升级
            this.m_costonce = 0; // 一键升级，为0时不能升级
        }
        Skill.prototype.dispose = function () {
        };
        return Skill;
    }());
    base.Skill = Skill;
})(base || (base = {}));
//# sourceMappingURL=player.js.map