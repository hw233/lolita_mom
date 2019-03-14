/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var aniinfo_map = null;
    function aniinfo_map_init(config_obj) {
        aniinfo_map = config_obj["aniinfo_map"];
    }
    config.aniinfo_map_init = aniinfo_map_init;
    var Aniinfo = /** @class */ (function (_super) {
        __extends(Aniinfo, _super);
        function Aniinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = aniinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Aniinfo.get_Aniinfo = function (key) {
            if (Aniinfo.m_static_map.hasOwnProperty(key) == false) {
                Aniinfo.m_static_map[key] = Aniinfo.create_Aniinfo(key);
            }
            return Aniinfo.m_static_map[key];
        };
        Aniinfo.create_Aniinfo = function (key) {
            if (aniinfo_map.hasOwnProperty(key)) {
                return new Aniinfo(key);
            }
            return null;
        };
        Aniinfo.get_cfg_object = function () {
            return aniinfo_map;
        };
        Aniinfo.m_static_map = new Object();
        return Aniinfo;
    }(Object));
    config.Aniinfo = Aniinfo;
})(config || (config = {}));
//# sourceMappingURL=aniinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var assist_info_map = null;
    function assist_info_map_init(config_obj) {
        assist_info_map = config_obj["assist_info_map"];
    }
    config.assist_info_map_init = assist_info_map_init;
    var Assist_info = /** @class */ (function (_super) {
        __extends(Assist_info, _super);
        function Assist_info(key) {
            var _this = _super.call(this) || this;
            _this.m_config = assist_info_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Assist_info.get_Assist_info = function (key) {
            if (Assist_info.m_static_map.hasOwnProperty(key) == false) {
                Assist_info.m_static_map[key] = Assist_info.create_Assist_info(key);
            }
            return Assist_info.m_static_map[key];
        };
        Assist_info.create_Assist_info = function (key) {
            if (assist_info_map.hasOwnProperty(key)) {
                return new Assist_info(key);
            }
            return null;
        };
        Assist_info.get_cfg_object = function () {
            return assist_info_map;
        };
        Assist_info.m_static_map = new Object();
        return Assist_info;
    }(Object));
    config.Assist_info = Assist_info;
})(config || (config = {}));
//# sourceMappingURL=assist_info.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var auraresinfo_map = null;
    function auraresinfo_map_init(config_obj) {
        auraresinfo_map = config_obj["auraresinfo_map"];
    }
    config.auraresinfo_map_init = auraresinfo_map_init;
    var Auraresinfo = /** @class */ (function (_super) {
        __extends(Auraresinfo, _super);
        function Auraresinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = auraresinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Auraresinfo.get_Auraresinfo = function (key) {
            if (Auraresinfo.m_static_map.hasOwnProperty(key) == false) {
                Auraresinfo.m_static_map[key] = Auraresinfo.create_Auraresinfo(key);
            }
            return Auraresinfo.m_static_map[key];
        };
        Auraresinfo.create_Auraresinfo = function (key) {
            if (auraresinfo_map.hasOwnProperty(key)) {
                return new Auraresinfo(key);
            }
            return null;
        };
        Auraresinfo.get_cfg_object = function () {
            return auraresinfo_map;
        };
        Auraresinfo.m_static_map = new Object();
        return Auraresinfo;
    }(Object));
    config.Auraresinfo = Auraresinfo;
})(config || (config = {}));
//# sourceMappingURL=auraresinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var avatarinfo_map = null;
    function avatarinfo_map_init(config_obj) {
        avatarinfo_map = config_obj["avatarinfo_map"];
    }
    config.avatarinfo_map_init = avatarinfo_map_init;
    var Avatarinfo = /** @class */ (function (_super) {
        __extends(Avatarinfo, _super);
        function Avatarinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = avatarinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Avatarinfo.get_Avatarinfo = function (key) {
            if (Avatarinfo.m_static_map.hasOwnProperty(key) == false) {
                Avatarinfo.m_static_map[key] = Avatarinfo.create_Avatarinfo(key);
            }
            return Avatarinfo.m_static_map[key];
        };
        Avatarinfo.create_Avatarinfo = function (key) {
            if (avatarinfo_map.hasOwnProperty(key)) {
                return new Avatarinfo(key);
            }
            return null;
        };
        Avatarinfo.get_cfg_object = function () {
            return avatarinfo_map;
        };
        Avatarinfo.m_static_map = new Object();
        return Avatarinfo;
    }(Object));
    config.Avatarinfo = Avatarinfo;
})(config || (config = {}));
//# sourceMappingURL=avatarinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var buff_map = null;
    function buff_map_init(config_obj) {
        buff_map = config_obj["buff_map"];
    }
    config.buff_map_init = buff_map_init;
    var Buff = /** @class */ (function (_super) {
        __extends(Buff, _super);
        function Buff(key) {
            var _this = _super.call(this) || this;
            _this.m_config = buff_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Buff.get_Buff = function (key) {
            if (Buff.m_static_map.hasOwnProperty(key) == false) {
                Buff.m_static_map[key] = Buff.create_Buff(key);
            }
            return Buff.m_static_map[key];
        };
        Buff.create_Buff = function (key) {
            if (buff_map.hasOwnProperty(key)) {
                return new Buff(key);
            }
            return null;
        };
        Buff.get_cfg_object = function () {
            return buff_map;
        };
        Buff.m_static_map = new Object();
        return Buff;
    }(Object));
    config.Buff = Buff;
})(config || (config = {}));
//# sourceMappingURL=buff.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var buffinfo_map = null;
    function buffinfo_map_init(config_obj) {
        buffinfo_map = config_obj["buffinfo_map"];
    }
    config.buffinfo_map_init = buffinfo_map_init;
    var Buffinfo = /** @class */ (function (_super) {
        __extends(Buffinfo, _super);
        function Buffinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = buffinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Buffinfo.get_Buffinfo = function (key) {
            if (Buffinfo.m_static_map.hasOwnProperty(key) == false) {
                Buffinfo.m_static_map[key] = Buffinfo.create_Buffinfo(key);
            }
            return Buffinfo.m_static_map[key];
        };
        Buffinfo.create_Buffinfo = function (key) {
            if (buffinfo_map.hasOwnProperty(key)) {
                return new Buffinfo(key);
            }
            return null;
        };
        Buffinfo.get_cfg_object = function () {
            return buffinfo_map;
        };
        Buffinfo.m_static_map = new Object();
        return Buffinfo;
    }(Object));
    config.Buffinfo = Buffinfo;
})(config || (config = {}));
//# sourceMappingURL=buffinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cardbuff_map = null;
    function cardbuff_map_init(config_obj) {
        cardbuff_map = config_obj["cardbuff_map"];
    }
    config.cardbuff_map_init = cardbuff_map_init;
    var Cardbuff = /** @class */ (function (_super) {
        __extends(Cardbuff, _super);
        function Cardbuff(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cardbuff_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cardbuff.get_Cardbuff = function (key) {
            if (Cardbuff.m_static_map.hasOwnProperty(key) == false) {
                Cardbuff.m_static_map[key] = Cardbuff.create_Cardbuff(key);
            }
            return Cardbuff.m_static_map[key];
        };
        Cardbuff.create_Cardbuff = function (key) {
            if (cardbuff_map.hasOwnProperty(key)) {
                return new Cardbuff(key);
            }
            return null;
        };
        Cardbuff.get_cfg_object = function () {
            return cardbuff_map;
        };
        Cardbuff.m_static_map = new Object();
        return Cardbuff;
    }(Object));
    config.Cardbuff = Cardbuff;
})(config || (config = {}));
//# sourceMappingURL=cardbuff.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cards_map = null;
    function cards_map_init(config_obj) {
        cards_map = config_obj["cards_map"];
    }
    config.cards_map_init = cards_map_init;
    var Cards = /** @class */ (function (_super) {
        __extends(Cards, _super);
        function Cards(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards.get_Cards = function (key) {
            if (Cards.m_static_map.hasOwnProperty(key) == false) {
                Cards.m_static_map[key] = Cards.create_Cards(key);
            }
            return Cards.m_static_map[key];
        };
        Cards.create_Cards = function (key) {
            if (cards_map.hasOwnProperty(key)) {
                return new Cards(key);
            }
            return null;
        };
        Cards.get_cfg_object = function () {
            return cards_map;
        };
        Cards.m_static_map = new Object();
        return Cards;
    }(Object));
    config.Cards = Cards;
})(config || (config = {}));
//# sourceMappingURL=cards.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cardskill_map = null;
    function cardskill_map_init(config_obj) {
        cardskill_map = config_obj["cardskill_map"];
    }
    config.cardskill_map_init = cardskill_map_init;
    var Cardskill = /** @class */ (function (_super) {
        __extends(Cardskill, _super);
        function Cardskill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cardskill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cardskill.get_Cardskill = function (key) {
            if (Cardskill.m_static_map.hasOwnProperty(key) == false) {
                Cardskill.m_static_map[key] = Cardskill.create_Cardskill(key);
            }
            return Cardskill.m_static_map[key];
        };
        Cardskill.create_Cardskill = function (key) {
            if (cardskill_map.hasOwnProperty(key)) {
                return new Cardskill(key);
            }
            return null;
        };
        Cardskill.get_cfg_object = function () {
            return cardskill_map;
        };
        Cardskill.m_static_map = new Object();
        return Cardskill;
    }(Object));
    config.Cardskill = Cardskill;
})(config || (config = {}));
//# sourceMappingURL=cardskill.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cardskillpassive_map = null;
    function cardskillpassive_map_init(config_obj) {
        cardskillpassive_map = config_obj["cardskillpassive_map"];
    }
    config.cardskillpassive_map_init = cardskillpassive_map_init;
    var Cardskillpassive = /** @class */ (function (_super) {
        __extends(Cardskillpassive, _super);
        function Cardskillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cardskillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cardskillpassive.get_Cardskillpassive = function (key) {
            if (Cardskillpassive.m_static_map.hasOwnProperty(key) == false) {
                Cardskillpassive.m_static_map[key] = Cardskillpassive.create_Cardskillpassive(key);
            }
            return Cardskillpassive.m_static_map[key];
        };
        Cardskillpassive.create_Cardskillpassive = function (key) {
            if (cardskillpassive_map.hasOwnProperty(key)) {
                return new Cardskillpassive(key);
            }
            return null;
        };
        Cardskillpassive.get_cfg_object = function () {
            return cardskillpassive_map;
        };
        Cardskillpassive.m_static_map = new Object();
        return Cardskillpassive;
    }(Object));
    config.Cardskillpassive = Cardskillpassive;
})(config || (config = {}));
//# sourceMappingURL=cardskillpassive.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cards_dungeon_map = null;
    function cards_dungeon_map_init(config_obj) {
        cards_dungeon_map = config_obj["cards_dungeon_map"];
    }
    config.cards_dungeon_map_init = cards_dungeon_map_init;
    var Cards_dungeon = /** @class */ (function (_super) {
        __extends(Cards_dungeon, _super);
        function Cards_dungeon(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_dungeon_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_dungeon.get_Cards_dungeon = function (key) {
            if (Cards_dungeon.m_static_map.hasOwnProperty(key) == false) {
                Cards_dungeon.m_static_map[key] = Cards_dungeon.create_Cards_dungeon(key);
            }
            return Cards_dungeon.m_static_map[key];
        };
        Cards_dungeon.create_Cards_dungeon = function (key) {
            if (cards_dungeon_map.hasOwnProperty(key)) {
                return new Cards_dungeon(key);
            }
            return null;
        };
        Cards_dungeon.get_cfg_object = function () {
            return cards_dungeon_map;
        };
        Cards_dungeon.m_static_map = new Object();
        return Cards_dungeon;
    }(Object));
    config.Cards_dungeon = Cards_dungeon;
})(config || (config = {}));
//# sourceMappingURL=cards_dungeon.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cards_effect_map = null;
    function cards_effect_map_init(config_obj) {
        cards_effect_map = config_obj["cards_effect_map"];
    }
    config.cards_effect_map_init = cards_effect_map_init;
    var Cards_effect = /** @class */ (function (_super) {
        __extends(Cards_effect, _super);
        function Cards_effect(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_effect_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_effect.get_Cards_effect = function (key) {
            if (Cards_effect.m_static_map.hasOwnProperty(key) == false) {
                Cards_effect.m_static_map[key] = Cards_effect.create_Cards_effect(key);
            }
            return Cards_effect.m_static_map[key];
        };
        Cards_effect.create_Cards_effect = function (key) {
            if (cards_effect_map.hasOwnProperty(key)) {
                return new Cards_effect(key);
            }
            return null;
        };
        Cards_effect.get_cfg_object = function () {
            return cards_effect_map;
        };
        Cards_effect.m_static_map = new Object();
        return Cards_effect;
    }(Object));
    config.Cards_effect = Cards_effect;
})(config || (config = {}));
//# sourceMappingURL=cards_effect.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cards_exp_map = null;
    function cards_exp_map_init(config_obj) {
        cards_exp_map = config_obj["cards_exp_map"];
    }
    config.cards_exp_map_init = cards_exp_map_init;
    var Cards_exp = /** @class */ (function (_super) {
        __extends(Cards_exp, _super);
        function Cards_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_exp.get_Cards_exp = function (key) {
            if (Cards_exp.m_static_map.hasOwnProperty(key) == false) {
                Cards_exp.m_static_map[key] = Cards_exp.create_Cards_exp(key);
            }
            return Cards_exp.m_static_map[key];
        };
        Cards_exp.create_Cards_exp = function (key) {
            if (cards_exp_map.hasOwnProperty(key)) {
                return new Cards_exp(key);
            }
            return null;
        };
        Cards_exp.get_cfg_object = function () {
            return cards_exp_map;
        };
        Cards_exp.m_static_map = new Object();
        return Cards_exp;
    }(Object));
    config.Cards_exp = Cards_exp;
})(config || (config = {}));
//# sourceMappingURL=cards_exp.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cards_initcards_map = null;
    function cards_initcards_map_init(config_obj) {
        cards_initcards_map = config_obj["cards_initcards_map"];
    }
    config.cards_initcards_map_init = cards_initcards_map_init;
    var Cards_initcards = /** @class */ (function (_super) {
        __extends(Cards_initcards, _super);
        function Cards_initcards(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_initcards_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_initcards.get_Cards_initcards = function (key) {
            if (Cards_initcards.m_static_map.hasOwnProperty(key) == false) {
                Cards_initcards.m_static_map[key] = Cards_initcards.create_Cards_initcards(key);
            }
            return Cards_initcards.m_static_map[key];
        };
        Cards_initcards.create_Cards_initcards = function (key) {
            if (cards_initcards_map.hasOwnProperty(key)) {
                return new Cards_initcards(key);
            }
            return null;
        };
        Cards_initcards.get_cfg_object = function () {
            return cards_initcards_map;
        };
        Cards_initcards.m_static_map = new Object();
        return Cards_initcards;
    }(Object));
    config.Cards_initcards = Cards_initcards;
})(config || (config = {}));
//# sourceMappingURL=cards_initcards.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var cards_spell_map = null;
    function cards_spell_map_init(config_obj) {
        cards_spell_map = config_obj["cards_spell_map"];
    }
    config.cards_spell_map_init = cards_spell_map_init;
    var Cards_spell = /** @class */ (function (_super) {
        __extends(Cards_spell, _super);
        function Cards_spell(key) {
            var _this = _super.call(this) || this;
            _this.m_config = cards_spell_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Cards_spell.get_Cards_spell = function (key) {
            if (Cards_spell.m_static_map.hasOwnProperty(key) == false) {
                Cards_spell.m_static_map[key] = Cards_spell.create_Cards_spell(key);
            }
            return Cards_spell.m_static_map[key];
        };
        Cards_spell.create_Cards_spell = function (key) {
            if (cards_spell_map.hasOwnProperty(key)) {
                return new Cards_spell(key);
            }
            return null;
        };
        Cards_spell.get_cfg_object = function () {
            return cards_spell_map;
        };
        Cards_spell.m_static_map = new Object();
        return Cards_spell;
    }(Object));
    config.Cards_spell = Cards_spell;
})(config || (config = {}));
//# sourceMappingURL=cards_spell.js.map
var config;
(function (config) {
    function config_init(config_obj) {
        config.assist_info_map_init(config_obj);
        config.randomname_map_init(config_obj);
        config.cardbuff_map_init(config_obj);
        config.cardskill_map_init(config_obj);
        config.cardskillpassive_map_init(config_obj);
        config.item_map_init(config_obj);
        config.itemmerge_map_init(config_obj);
        config.player_exp_map_init(config_obj);
        config.pet_exp_map_init(config_obj);
        config.partner_exp_map_init(config_obj);
        config.playerskill1_map_init(config_obj);
        config.playerskill2_map_init(config_obj);
        config.petskill1_map_init(config_obj);
        config.petskill2_map_init(config_obj);
        config.partnerskill1_map_init(config_obj);
        config.partnerskill2_map_init(config_obj);
        config.specialskill1_map_init(config_obj);
        config.specialskill2_map_init(config_obj);
        config.specialskill3_map_init(config_obj);
        config.specialskill4_map_init(config_obj);
        config.mapinfo_map_init(config_obj);
        config.avatarinfo_map_init(config_obj);
        config.skininfo_map_init(config_obj);
        config.weaponinfo_map_init(config_obj);
        config.rideinfo_map_init(config_obj);
        config.winginfo_map_init(config_obj);
        config.fairyinfo_map_init(config_obj);
        config.aniinfo_map_init(config_obj);
        config.effectinfo_map_init(config_obj);
        config.iconinfo_map_init(config_obj);
        config.auraresinfo_map_init(config_obj);
        config.titleresinfo_map_init(config_obj);
        config.buffinfo_map_init(config_obj);
        config.sceneinfo_map_init(config_obj);
        config.cards_map_init(config_obj);
        config.cards_spell_map_init(config_obj);
        config.cards_effect_map_init(config_obj);
        config.cards_dungeon_map_init(config_obj);
        config.cards_initcards_map_init(config_obj);
        config.cards_exp_map_init(config_obj);
        config.fightskill_map_init(config_obj);
        config.fightskillpassive_map_init(config_obj);
        config.fightbuff_map_init(config_obj);
        config.fightbuffeffect_map_init(config_obj);
        config.fighteffect_map_init(config_obj);
        config.fightprop_map_init(config_obj);
        config.fighteffecttime_map_init(config_obj);
        config.sys_preview_cfg_map_init(config_obj);
        config.sys_open_map_init(config_obj);
        config.sys_open_activity_map_init(config_obj);
    }
    config.config_init = config_init;
})(config || (config = {}));
//# sourceMappingURL=config_init.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var effectinfo_map = null;
    function effectinfo_map_init(config_obj) {
        effectinfo_map = config_obj["effectinfo_map"];
    }
    config.effectinfo_map_init = effectinfo_map_init;
    var Effectinfo = /** @class */ (function (_super) {
        __extends(Effectinfo, _super);
        function Effectinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = effectinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Effectinfo.get_Effectinfo = function (key) {
            if (Effectinfo.m_static_map.hasOwnProperty(key) == false) {
                Effectinfo.m_static_map[key] = Effectinfo.create_Effectinfo(key);
            }
            return Effectinfo.m_static_map[key];
        };
        Effectinfo.create_Effectinfo = function (key) {
            if (effectinfo_map.hasOwnProperty(key)) {
                return new Effectinfo(key);
            }
            return null;
        };
        Effectinfo.get_cfg_object = function () {
            return effectinfo_map;
        };
        Effectinfo.m_static_map = new Object();
        return Effectinfo;
    }(Object));
    config.Effectinfo = Effectinfo;
})(config || (config = {}));
//# sourceMappingURL=effectinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fairyinfo_map = null;
    function fairyinfo_map_init(config_obj) {
        fairyinfo_map = config_obj["fairyinfo_map"];
    }
    config.fairyinfo_map_init = fairyinfo_map_init;
    var Fairyinfo = /** @class */ (function (_super) {
        __extends(Fairyinfo, _super);
        function Fairyinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fairyinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fairyinfo.get_Fairyinfo = function (key) {
            if (Fairyinfo.m_static_map.hasOwnProperty(key) == false) {
                Fairyinfo.m_static_map[key] = Fairyinfo.create_Fairyinfo(key);
            }
            return Fairyinfo.m_static_map[key];
        };
        Fairyinfo.create_Fairyinfo = function (key) {
            if (fairyinfo_map.hasOwnProperty(key)) {
                return new Fairyinfo(key);
            }
            return null;
        };
        Fairyinfo.get_cfg_object = function () {
            return fairyinfo_map;
        };
        Fairyinfo.m_static_map = new Object();
        return Fairyinfo;
    }(Object));
    config.Fairyinfo = Fairyinfo;
})(config || (config = {}));
//# sourceMappingURL=fairyinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fightbuff_map = null;
    function fightbuff_map_init(config_obj) {
        fightbuff_map = config_obj["fightbuff_map"];
    }
    config.fightbuff_map_init = fightbuff_map_init;
    var Fightbuff = /** @class */ (function (_super) {
        __extends(Fightbuff, _super);
        function Fightbuff(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightbuff_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightbuff.get_Fightbuff = function (key) {
            if (Fightbuff.m_static_map.hasOwnProperty(key) == false) {
                Fightbuff.m_static_map[key] = Fightbuff.create_Fightbuff(key);
            }
            return Fightbuff.m_static_map[key];
        };
        Fightbuff.create_Fightbuff = function (key) {
            if (fightbuff_map.hasOwnProperty(key)) {
                return new Fightbuff(key);
            }
            return null;
        };
        Fightbuff.get_cfg_object = function () {
            return fightbuff_map;
        };
        Fightbuff.m_static_map = new Object();
        return Fightbuff;
    }(Object));
    config.Fightbuff = Fightbuff;
})(config || (config = {}));
//# sourceMappingURL=fightbuff.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fightbuffeffect_map = null;
    function fightbuffeffect_map_init(config_obj) {
        fightbuffeffect_map = config_obj["fightbuffeffect_map"];
    }
    config.fightbuffeffect_map_init = fightbuffeffect_map_init;
    var Fightbuffeffect = /** @class */ (function (_super) {
        __extends(Fightbuffeffect, _super);
        function Fightbuffeffect(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightbuffeffect_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightbuffeffect.get_Fightbuffeffect = function (key) {
            if (Fightbuffeffect.m_static_map.hasOwnProperty(key) == false) {
                Fightbuffeffect.m_static_map[key] = Fightbuffeffect.create_Fightbuffeffect(key);
            }
            return Fightbuffeffect.m_static_map[key];
        };
        Fightbuffeffect.create_Fightbuffeffect = function (key) {
            if (fightbuffeffect_map.hasOwnProperty(key)) {
                return new Fightbuffeffect(key);
            }
            return null;
        };
        Fightbuffeffect.get_cfg_object = function () {
            return fightbuffeffect_map;
        };
        Fightbuffeffect.m_static_map = new Object();
        return Fightbuffeffect;
    }(Object));
    config.Fightbuffeffect = Fightbuffeffect;
})(config || (config = {}));
//# sourceMappingURL=fightbuffeffect.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fighteffect_map = null;
    function fighteffect_map_init(config_obj) {
        fighteffect_map = config_obj["fighteffect_map"];
    }
    config.fighteffect_map_init = fighteffect_map_init;
    var Fighteffect = /** @class */ (function (_super) {
        __extends(Fighteffect, _super);
        function Fighteffect(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fighteffect_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fighteffect.get_Fighteffect = function (key) {
            if (Fighteffect.m_static_map.hasOwnProperty(key) == false) {
                Fighteffect.m_static_map[key] = Fighteffect.create_Fighteffect(key);
            }
            return Fighteffect.m_static_map[key];
        };
        Fighteffect.create_Fighteffect = function (key) {
            if (fighteffect_map.hasOwnProperty(key)) {
                return new Fighteffect(key);
            }
            return null;
        };
        Fighteffect.get_cfg_object = function () {
            return fighteffect_map;
        };
        Fighteffect.m_static_map = new Object();
        return Fighteffect;
    }(Object));
    config.Fighteffect = Fighteffect;
})(config || (config = {}));
//# sourceMappingURL=fighteffect.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fighteffecttime_map = null;
    function fighteffecttime_map_init(config_obj) {
        fighteffecttime_map = config_obj["fighteffecttime_map"];
    }
    config.fighteffecttime_map_init = fighteffecttime_map_init;
    var Fighteffecttime = /** @class */ (function (_super) {
        __extends(Fighteffecttime, _super);
        function Fighteffecttime(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fighteffecttime_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fighteffecttime.get_Fighteffecttime = function (key) {
            if (Fighteffecttime.m_static_map.hasOwnProperty(key) == false) {
                Fighteffecttime.m_static_map[key] = Fighteffecttime.create_Fighteffecttime(key);
            }
            return Fighteffecttime.m_static_map[key];
        };
        Fighteffecttime.create_Fighteffecttime = function (key) {
            if (fighteffecttime_map.hasOwnProperty(key)) {
                return new Fighteffecttime(key);
            }
            return null;
        };
        Fighteffecttime.get_cfg_object = function () {
            return fighteffecttime_map;
        };
        Fighteffecttime.m_static_map = new Object();
        return Fighteffecttime;
    }(Object));
    config.Fighteffecttime = Fighteffecttime;
})(config || (config = {}));
//# sourceMappingURL=fighteffecttime.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fightprop_map = null;
    function fightprop_map_init(config_obj) {
        fightprop_map = config_obj["fightprop_map"];
    }
    config.fightprop_map_init = fightprop_map_init;
    var Fightprop = /** @class */ (function (_super) {
        __extends(Fightprop, _super);
        function Fightprop(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightprop_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightprop.get_Fightprop = function (key) {
            if (Fightprop.m_static_map.hasOwnProperty(key) == false) {
                Fightprop.m_static_map[key] = Fightprop.create_Fightprop(key);
            }
            return Fightprop.m_static_map[key];
        };
        Fightprop.create_Fightprop = function (key) {
            if (fightprop_map.hasOwnProperty(key)) {
                return new Fightprop(key);
            }
            return null;
        };
        Fightprop.get_cfg_object = function () {
            return fightprop_map;
        };
        Fightprop.m_static_map = new Object();
        return Fightprop;
    }(Object));
    config.Fightprop = Fightprop;
})(config || (config = {}));
//# sourceMappingURL=fightprop.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fightskill_map = null;
    function fightskill_map_init(config_obj) {
        fightskill_map = config_obj["fightskill_map"];
    }
    config.fightskill_map_init = fightskill_map_init;
    var Fightskill = /** @class */ (function (_super) {
        __extends(Fightskill, _super);
        function Fightskill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightskill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightskill.get_Fightskill = function (key) {
            if (Fightskill.m_static_map.hasOwnProperty(key) == false) {
                Fightskill.m_static_map[key] = Fightskill.create_Fightskill(key);
            }
            return Fightskill.m_static_map[key];
        };
        Fightskill.create_Fightskill = function (key) {
            if (fightskill_map.hasOwnProperty(key)) {
                return new Fightskill(key);
            }
            return null;
        };
        Fightskill.get_cfg_object = function () {
            return fightskill_map;
        };
        Fightskill.m_static_map = new Object();
        return Fightskill;
    }(Object));
    config.Fightskill = Fightskill;
})(config || (config = {}));
//# sourceMappingURL=fightskill.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var fightskillpassive_map = null;
    function fightskillpassive_map_init(config_obj) {
        fightskillpassive_map = config_obj["fightskillpassive_map"];
    }
    config.fightskillpassive_map_init = fightskillpassive_map_init;
    var Fightskillpassive = /** @class */ (function (_super) {
        __extends(Fightskillpassive, _super);
        function Fightskillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = fightskillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Fightskillpassive.get_Fightskillpassive = function (key) {
            if (Fightskillpassive.m_static_map.hasOwnProperty(key) == false) {
                Fightskillpassive.m_static_map[key] = Fightskillpassive.create_Fightskillpassive(key);
            }
            return Fightskillpassive.m_static_map[key];
        };
        Fightskillpassive.create_Fightskillpassive = function (key) {
            if (fightskillpassive_map.hasOwnProperty(key)) {
                return new Fightskillpassive(key);
            }
            return null;
        };
        Fightskillpassive.get_cfg_object = function () {
            return fightskillpassive_map;
        };
        Fightskillpassive.m_static_map = new Object();
        return Fightskillpassive;
    }(Object));
    config.Fightskillpassive = Fightskillpassive;
})(config || (config = {}));
//# sourceMappingURL=fightskillpassive.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var iconinfo_map = null;
    function iconinfo_map_init(config_obj) {
        iconinfo_map = config_obj["iconinfo_map"];
    }
    config.iconinfo_map_init = iconinfo_map_init;
    var Iconinfo = /** @class */ (function (_super) {
        __extends(Iconinfo, _super);
        function Iconinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = iconinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Iconinfo.get_Iconinfo = function (key) {
            if (Iconinfo.m_static_map.hasOwnProperty(key) == false) {
                Iconinfo.m_static_map[key] = Iconinfo.create_Iconinfo(key);
            }
            return Iconinfo.m_static_map[key];
        };
        Iconinfo.create_Iconinfo = function (key) {
            if (iconinfo_map.hasOwnProperty(key)) {
                return new Iconinfo(key);
            }
            return null;
        };
        Iconinfo.get_cfg_object = function () {
            return iconinfo_map;
        };
        Iconinfo.m_static_map = new Object();
        return Iconinfo;
    }(Object));
    config.Iconinfo = Iconinfo;
})(config || (config = {}));
//# sourceMappingURL=iconinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var item_map = null;
    function item_map_init(config_obj) {
        item_map = config_obj["item_map"];
    }
    config.item_map_init = item_map_init;
    var Item = /** @class */ (function (_super) {
        __extends(Item, _super);
        function Item(key) {
            var _this = _super.call(this) || this;
            _this.m_config = item_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Item.get_Item = function (key) {
            if (Item.m_static_map.hasOwnProperty(key) == false) {
                Item.m_static_map[key] = Item.create_Item(key);
            }
            return Item.m_static_map[key];
        };
        Item.create_Item = function (key) {
            if (item_map.hasOwnProperty(key)) {
                return new Item(key);
            }
            return null;
        };
        Item.get_cfg_object = function () {
            return item_map;
        };
        Item.m_static_map = new Object();
        return Item;
    }(Object));
    config.Item = Item;
})(config || (config = {}));
//# sourceMappingURL=item.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var itemmerge_map = null;
    function itemmerge_map_init(config_obj) {
        itemmerge_map = config_obj["itemmerge_map"];
    }
    config.itemmerge_map_init = itemmerge_map_init;
    var Itemmerge = /** @class */ (function (_super) {
        __extends(Itemmerge, _super);
        function Itemmerge(key) {
            var _this = _super.call(this) || this;
            _this.m_config = itemmerge_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Itemmerge.get_Itemmerge = function (key) {
            if (Itemmerge.m_static_map.hasOwnProperty(key) == false) {
                Itemmerge.m_static_map[key] = Itemmerge.create_Itemmerge(key);
            }
            return Itemmerge.m_static_map[key];
        };
        Itemmerge.create_Itemmerge = function (key) {
            if (itemmerge_map.hasOwnProperty(key)) {
                return new Itemmerge(key);
            }
            return null;
        };
        Itemmerge.get_cfg_object = function () {
            return itemmerge_map;
        };
        Itemmerge.m_static_map = new Object();
        return Itemmerge;
    }(Object));
    config.Itemmerge = Itemmerge;
})(config || (config = {}));
//# sourceMappingURL=itemmerge.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var mapinfo_map = null;
    function mapinfo_map_init(config_obj) {
        mapinfo_map = config_obj["mapinfo_map"];
    }
    config.mapinfo_map_init = mapinfo_map_init;
    var Mapinfo = /** @class */ (function (_super) {
        __extends(Mapinfo, _super);
        function Mapinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = mapinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Mapinfo.get_Mapinfo = function (key) {
            if (Mapinfo.m_static_map.hasOwnProperty(key) == false) {
                Mapinfo.m_static_map[key] = Mapinfo.create_Mapinfo(key);
            }
            return Mapinfo.m_static_map[key];
        };
        Mapinfo.create_Mapinfo = function (key) {
            if (mapinfo_map.hasOwnProperty(key)) {
                return new Mapinfo(key);
            }
            return null;
        };
        Mapinfo.get_cfg_object = function () {
            return mapinfo_map;
        };
        Mapinfo.m_static_map = new Object();
        return Mapinfo;
    }(Object));
    config.Mapinfo = Mapinfo;
})(config || (config = {}));
//# sourceMappingURL=mapinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var partnerskill1_map = null;
    function partnerskill1_map_init(config_obj) {
        partnerskill1_map = config_obj["partnerskill1_map"];
    }
    config.partnerskill1_map_init = partnerskill1_map_init;
    var Partnerskill1 = /** @class */ (function (_super) {
        __extends(Partnerskill1, _super);
        function Partnerskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = partnerskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Partnerskill1.get_Partnerskill1 = function (key) {
            if (Partnerskill1.m_static_map.hasOwnProperty(key) == false) {
                Partnerskill1.m_static_map[key] = Partnerskill1.create_Partnerskill1(key);
            }
            return Partnerskill1.m_static_map[key];
        };
        Partnerskill1.create_Partnerskill1 = function (key) {
            if (partnerskill1_map.hasOwnProperty(key)) {
                return new Partnerskill1(key);
            }
            return null;
        };
        Partnerskill1.get_cfg_object = function () {
            return partnerskill1_map;
        };
        Partnerskill1.m_static_map = new Object();
        return Partnerskill1;
    }(Object));
    config.Partnerskill1 = Partnerskill1;
})(config || (config = {}));
//# sourceMappingURL=partnerskill1.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var partnerskill2_map = null;
    function partnerskill2_map_init(config_obj) {
        partnerskill2_map = config_obj["partnerskill2_map"];
    }
    config.partnerskill2_map_init = partnerskill2_map_init;
    var Partnerskill2 = /** @class */ (function (_super) {
        __extends(Partnerskill2, _super);
        function Partnerskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = partnerskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Partnerskill2.get_Partnerskill2 = function (key) {
            if (Partnerskill2.m_static_map.hasOwnProperty(key) == false) {
                Partnerskill2.m_static_map[key] = Partnerskill2.create_Partnerskill2(key);
            }
            return Partnerskill2.m_static_map[key];
        };
        Partnerskill2.create_Partnerskill2 = function (key) {
            if (partnerskill2_map.hasOwnProperty(key)) {
                return new Partnerskill2(key);
            }
            return null;
        };
        Partnerskill2.get_cfg_object = function () {
            return partnerskill2_map;
        };
        Partnerskill2.m_static_map = new Object();
        return Partnerskill2;
    }(Object));
    config.Partnerskill2 = Partnerskill2;
})(config || (config = {}));
//# sourceMappingURL=partnerskill2.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var partner_exp_map = null;
    function partner_exp_map_init(config_obj) {
        partner_exp_map = config_obj["partner_exp_map"];
    }
    config.partner_exp_map_init = partner_exp_map_init;
    var Partner_exp = /** @class */ (function (_super) {
        __extends(Partner_exp, _super);
        function Partner_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = partner_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Partner_exp.get_Partner_exp = function (key) {
            if (Partner_exp.m_static_map.hasOwnProperty(key) == false) {
                Partner_exp.m_static_map[key] = Partner_exp.create_Partner_exp(key);
            }
            return Partner_exp.m_static_map[key];
        };
        Partner_exp.create_Partner_exp = function (key) {
            if (partner_exp_map.hasOwnProperty(key)) {
                return new Partner_exp(key);
            }
            return null;
        };
        Partner_exp.get_cfg_object = function () {
            return partner_exp_map;
        };
        Partner_exp.m_static_map = new Object();
        return Partner_exp;
    }(Object));
    config.Partner_exp = Partner_exp;
})(config || (config = {}));
//# sourceMappingURL=partner_exp.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var petskill1_map = null;
    function petskill1_map_init(config_obj) {
        petskill1_map = config_obj["petskill1_map"];
    }
    config.petskill1_map_init = petskill1_map_init;
    var Petskill1 = /** @class */ (function (_super) {
        __extends(Petskill1, _super);
        function Petskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = petskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Petskill1.get_Petskill1 = function (key) {
            if (Petskill1.m_static_map.hasOwnProperty(key) == false) {
                Petskill1.m_static_map[key] = Petskill1.create_Petskill1(key);
            }
            return Petskill1.m_static_map[key];
        };
        Petskill1.create_Petskill1 = function (key) {
            if (petskill1_map.hasOwnProperty(key)) {
                return new Petskill1(key);
            }
            return null;
        };
        Petskill1.get_cfg_object = function () {
            return petskill1_map;
        };
        Petskill1.m_static_map = new Object();
        return Petskill1;
    }(Object));
    config.Petskill1 = Petskill1;
})(config || (config = {}));
//# sourceMappingURL=petskill1.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var petskill2_map = null;
    function petskill2_map_init(config_obj) {
        petskill2_map = config_obj["petskill2_map"];
    }
    config.petskill2_map_init = petskill2_map_init;
    var Petskill2 = /** @class */ (function (_super) {
        __extends(Petskill2, _super);
        function Petskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = petskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Petskill2.get_Petskill2 = function (key) {
            if (Petskill2.m_static_map.hasOwnProperty(key) == false) {
                Petskill2.m_static_map[key] = Petskill2.create_Petskill2(key);
            }
            return Petskill2.m_static_map[key];
        };
        Petskill2.create_Petskill2 = function (key) {
            if (petskill2_map.hasOwnProperty(key)) {
                return new Petskill2(key);
            }
            return null;
        };
        Petskill2.get_cfg_object = function () {
            return petskill2_map;
        };
        Petskill2.m_static_map = new Object();
        return Petskill2;
    }(Object));
    config.Petskill2 = Petskill2;
})(config || (config = {}));
//# sourceMappingURL=petskill2.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var pet_exp_map = null;
    function pet_exp_map_init(config_obj) {
        pet_exp_map = config_obj["pet_exp_map"];
    }
    config.pet_exp_map_init = pet_exp_map_init;
    var Pet_exp = /** @class */ (function (_super) {
        __extends(Pet_exp, _super);
        function Pet_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = pet_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Pet_exp.get_Pet_exp = function (key) {
            if (Pet_exp.m_static_map.hasOwnProperty(key) == false) {
                Pet_exp.m_static_map[key] = Pet_exp.create_Pet_exp(key);
            }
            return Pet_exp.m_static_map[key];
        };
        Pet_exp.create_Pet_exp = function (key) {
            if (pet_exp_map.hasOwnProperty(key)) {
                return new Pet_exp(key);
            }
            return null;
        };
        Pet_exp.get_cfg_object = function () {
            return pet_exp_map;
        };
        Pet_exp.m_static_map = new Object();
        return Pet_exp;
    }(Object));
    config.Pet_exp = Pet_exp;
})(config || (config = {}));
//# sourceMappingURL=pet_exp.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var playerskill1_map = null;
    function playerskill1_map_init(config_obj) {
        playerskill1_map = config_obj["playerskill1_map"];
    }
    config.playerskill1_map_init = playerskill1_map_init;
    var Playerskill1 = /** @class */ (function (_super) {
        __extends(Playerskill1, _super);
        function Playerskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = playerskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Playerskill1.get_Playerskill1 = function (key) {
            if (Playerskill1.m_static_map.hasOwnProperty(key) == false) {
                Playerskill1.m_static_map[key] = Playerskill1.create_Playerskill1(key);
            }
            return Playerskill1.m_static_map[key];
        };
        Playerskill1.create_Playerskill1 = function (key) {
            if (playerskill1_map.hasOwnProperty(key)) {
                return new Playerskill1(key);
            }
            return null;
        };
        Playerskill1.get_cfg_object = function () {
            return playerskill1_map;
        };
        Playerskill1.m_static_map = new Object();
        return Playerskill1;
    }(Object));
    config.Playerskill1 = Playerskill1;
})(config || (config = {}));
//# sourceMappingURL=playerskill1.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var playerskill2_map = null;
    function playerskill2_map_init(config_obj) {
        playerskill2_map = config_obj["playerskill2_map"];
    }
    config.playerskill2_map_init = playerskill2_map_init;
    var Playerskill2 = /** @class */ (function (_super) {
        __extends(Playerskill2, _super);
        function Playerskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = playerskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Playerskill2.get_Playerskill2 = function (key) {
            if (Playerskill2.m_static_map.hasOwnProperty(key) == false) {
                Playerskill2.m_static_map[key] = Playerskill2.create_Playerskill2(key);
            }
            return Playerskill2.m_static_map[key];
        };
        Playerskill2.create_Playerskill2 = function (key) {
            if (playerskill2_map.hasOwnProperty(key)) {
                return new Playerskill2(key);
            }
            return null;
        };
        Playerskill2.get_cfg_object = function () {
            return playerskill2_map;
        };
        Playerskill2.m_static_map = new Object();
        return Playerskill2;
    }(Object));
    config.Playerskill2 = Playerskill2;
})(config || (config = {}));
//# sourceMappingURL=playerskill2.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var player_exp_map = null;
    function player_exp_map_init(config_obj) {
        player_exp_map = config_obj["player_exp_map"];
    }
    config.player_exp_map_init = player_exp_map_init;
    var Player_exp = /** @class */ (function (_super) {
        __extends(Player_exp, _super);
        function Player_exp(key) {
            var _this = _super.call(this) || this;
            _this.m_config = player_exp_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Player_exp.get_Player_exp = function (key) {
            if (Player_exp.m_static_map.hasOwnProperty(key) == false) {
                Player_exp.m_static_map[key] = Player_exp.create_Player_exp(key);
            }
            return Player_exp.m_static_map[key];
        };
        Player_exp.create_Player_exp = function (key) {
            if (player_exp_map.hasOwnProperty(key)) {
                return new Player_exp(key);
            }
            return null;
        };
        Player_exp.get_cfg_object = function () {
            return player_exp_map;
        };
        Player_exp.m_static_map = new Object();
        return Player_exp;
    }(Object));
    config.Player_exp = Player_exp;
})(config || (config = {}));
//# sourceMappingURL=player_exp.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var randomname_map = null;
    function randomname_map_init(config_obj) {
        randomname_map = config_obj["randomname_map"];
    }
    config.randomname_map_init = randomname_map_init;
    var Randomname = /** @class */ (function (_super) {
        __extends(Randomname, _super);
        function Randomname(key) {
            var _this = _super.call(this) || this;
            _this.m_config = randomname_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Randomname.get_Randomname = function (key) {
            if (Randomname.m_static_map.hasOwnProperty(key) == false) {
                Randomname.m_static_map[key] = Randomname.create_Randomname(key);
            }
            return Randomname.m_static_map[key];
        };
        Randomname.create_Randomname = function (key) {
            if (randomname_map.hasOwnProperty(key)) {
                return new Randomname(key);
            }
            return null;
        };
        Randomname.get_cfg_object = function () {
            return randomname_map;
        };
        Randomname.m_static_map = new Object();
        return Randomname;
    }(Object));
    config.Randomname = Randomname;
})(config || (config = {}));
//# sourceMappingURL=randomname.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var rideinfo_map = null;
    function rideinfo_map_init(config_obj) {
        rideinfo_map = config_obj["rideinfo_map"];
    }
    config.rideinfo_map_init = rideinfo_map_init;
    var Rideinfo = /** @class */ (function (_super) {
        __extends(Rideinfo, _super);
        function Rideinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = rideinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Rideinfo.get_Rideinfo = function (key) {
            if (Rideinfo.m_static_map.hasOwnProperty(key) == false) {
                Rideinfo.m_static_map[key] = Rideinfo.create_Rideinfo(key);
            }
            return Rideinfo.m_static_map[key];
        };
        Rideinfo.create_Rideinfo = function (key) {
            if (rideinfo_map.hasOwnProperty(key)) {
                return new Rideinfo(key);
            }
            return null;
        };
        Rideinfo.get_cfg_object = function () {
            return rideinfo_map;
        };
        Rideinfo.m_static_map = new Object();
        return Rideinfo;
    }(Object));
    config.Rideinfo = Rideinfo;
})(config || (config = {}));
//# sourceMappingURL=rideinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var sceneinfo_map = null;
    function sceneinfo_map_init(config_obj) {
        sceneinfo_map = config_obj["sceneinfo_map"];
    }
    config.sceneinfo_map_init = sceneinfo_map_init;
    var Sceneinfo = /** @class */ (function (_super) {
        __extends(Sceneinfo, _super);
        function Sceneinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sceneinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sceneinfo.get_Sceneinfo = function (key) {
            if (Sceneinfo.m_static_map.hasOwnProperty(key) == false) {
                Sceneinfo.m_static_map[key] = Sceneinfo.create_Sceneinfo(key);
            }
            return Sceneinfo.m_static_map[key];
        };
        Sceneinfo.create_Sceneinfo = function (key) {
            if (sceneinfo_map.hasOwnProperty(key)) {
                return new Sceneinfo(key);
            }
            return null;
        };
        Sceneinfo.get_cfg_object = function () {
            return sceneinfo_map;
        };
        Sceneinfo.m_static_map = new Object();
        return Sceneinfo;
    }(Object));
    config.Sceneinfo = Sceneinfo;
})(config || (config = {}));
//# sourceMappingURL=sceneinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var skill_map = null;
    function skill_map_init(config_obj) {
        skill_map = config_obj["skill_map"];
    }
    config.skill_map_init = skill_map_init;
    var Skill = /** @class */ (function (_super) {
        __extends(Skill, _super);
        function Skill(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skill_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skill.get_Skill = function (key) {
            if (Skill.m_static_map.hasOwnProperty(key) == false) {
                Skill.m_static_map[key] = Skill.create_Skill(key);
            }
            return Skill.m_static_map[key];
        };
        Skill.create_Skill = function (key) {
            if (skill_map.hasOwnProperty(key)) {
                return new Skill(key);
            }
            return null;
        };
        Skill.get_cfg_object = function () {
            return skill_map;
        };
        Skill.m_static_map = new Object();
        return Skill;
    }(Object));
    config.Skill = Skill;
})(config || (config = {}));
//# sourceMappingURL=skill.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var skillpassive_map = null;
    function skillpassive_map_init(config_obj) {
        skillpassive_map = config_obj["skillpassive_map"];
    }
    config.skillpassive_map_init = skillpassive_map_init;
    var Skillpassive = /** @class */ (function (_super) {
        __extends(Skillpassive, _super);
        function Skillpassive(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skillpassive_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skillpassive.get_Skillpassive = function (key) {
            if (Skillpassive.m_static_map.hasOwnProperty(key) == false) {
                Skillpassive.m_static_map[key] = Skillpassive.create_Skillpassive(key);
            }
            return Skillpassive.m_static_map[key];
        };
        Skillpassive.create_Skillpassive = function (key) {
            if (skillpassive_map.hasOwnProperty(key)) {
                return new Skillpassive(key);
            }
            return null;
        };
        Skillpassive.get_cfg_object = function () {
            return skillpassive_map;
        };
        Skillpassive.m_static_map = new Object();
        return Skillpassive;
    }(Object));
    config.Skillpassive = Skillpassive;
})(config || (config = {}));
//# sourceMappingURL=skillpassive.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var skininfo_map = null;
    function skininfo_map_init(config_obj) {
        skininfo_map = config_obj["skininfo_map"];
    }
    config.skininfo_map_init = skininfo_map_init;
    var Skininfo = /** @class */ (function (_super) {
        __extends(Skininfo, _super);
        function Skininfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = skininfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Skininfo.get_Skininfo = function (key) {
            if (Skininfo.m_static_map.hasOwnProperty(key) == false) {
                Skininfo.m_static_map[key] = Skininfo.create_Skininfo(key);
            }
            return Skininfo.m_static_map[key];
        };
        Skininfo.create_Skininfo = function (key) {
            if (skininfo_map.hasOwnProperty(key)) {
                return new Skininfo(key);
            }
            return null;
        };
        Skininfo.get_cfg_object = function () {
            return skininfo_map;
        };
        Skininfo.m_static_map = new Object();
        return Skininfo;
    }(Object));
    config.Skininfo = Skininfo;
})(config || (config = {}));
//# sourceMappingURL=skininfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var specialskill1_map = null;
    function specialskill1_map_init(config_obj) {
        specialskill1_map = config_obj["specialskill1_map"];
    }
    config.specialskill1_map_init = specialskill1_map_init;
    var Specialskill1 = /** @class */ (function (_super) {
        __extends(Specialskill1, _super);
        function Specialskill1(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill1_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill1.get_Specialskill1 = function (key) {
            if (Specialskill1.m_static_map.hasOwnProperty(key) == false) {
                Specialskill1.m_static_map[key] = Specialskill1.create_Specialskill1(key);
            }
            return Specialskill1.m_static_map[key];
        };
        Specialskill1.create_Specialskill1 = function (key) {
            if (specialskill1_map.hasOwnProperty(key)) {
                return new Specialskill1(key);
            }
            return null;
        };
        Specialskill1.get_cfg_object = function () {
            return specialskill1_map;
        };
        Specialskill1.m_static_map = new Object();
        return Specialskill1;
    }(Object));
    config.Specialskill1 = Specialskill1;
})(config || (config = {}));
//# sourceMappingURL=specialskill1.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var specialskill2_map = null;
    function specialskill2_map_init(config_obj) {
        specialskill2_map = config_obj["specialskill2_map"];
    }
    config.specialskill2_map_init = specialskill2_map_init;
    var Specialskill2 = /** @class */ (function (_super) {
        __extends(Specialskill2, _super);
        function Specialskill2(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill2_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill2.get_Specialskill2 = function (key) {
            if (Specialskill2.m_static_map.hasOwnProperty(key) == false) {
                Specialskill2.m_static_map[key] = Specialskill2.create_Specialskill2(key);
            }
            return Specialskill2.m_static_map[key];
        };
        Specialskill2.create_Specialskill2 = function (key) {
            if (specialskill2_map.hasOwnProperty(key)) {
                return new Specialskill2(key);
            }
            return null;
        };
        Specialskill2.get_cfg_object = function () {
            return specialskill2_map;
        };
        Specialskill2.m_static_map = new Object();
        return Specialskill2;
    }(Object));
    config.Specialskill2 = Specialskill2;
})(config || (config = {}));
//# sourceMappingURL=specialskill2.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var specialskill3_map = null;
    function specialskill3_map_init(config_obj) {
        specialskill3_map = config_obj["specialskill3_map"];
    }
    config.specialskill3_map_init = specialskill3_map_init;
    var Specialskill3 = /** @class */ (function (_super) {
        __extends(Specialskill3, _super);
        function Specialskill3(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill3_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill3.get_Specialskill3 = function (key) {
            if (Specialskill3.m_static_map.hasOwnProperty(key) == false) {
                Specialskill3.m_static_map[key] = Specialskill3.create_Specialskill3(key);
            }
            return Specialskill3.m_static_map[key];
        };
        Specialskill3.create_Specialskill3 = function (key) {
            if (specialskill3_map.hasOwnProperty(key)) {
                return new Specialskill3(key);
            }
            return null;
        };
        Specialskill3.get_cfg_object = function () {
            return specialskill3_map;
        };
        Specialskill3.m_static_map = new Object();
        return Specialskill3;
    }(Object));
    config.Specialskill3 = Specialskill3;
})(config || (config = {}));
//# sourceMappingURL=specialskill3.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var specialskill4_map = null;
    function specialskill4_map_init(config_obj) {
        specialskill4_map = config_obj["specialskill4_map"];
    }
    config.specialskill4_map_init = specialskill4_map_init;
    var Specialskill4 = /** @class */ (function (_super) {
        __extends(Specialskill4, _super);
        function Specialskill4(key) {
            var _this = _super.call(this) || this;
            _this.m_config = specialskill4_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Specialskill4.get_Specialskill4 = function (key) {
            if (Specialskill4.m_static_map.hasOwnProperty(key) == false) {
                Specialskill4.m_static_map[key] = Specialskill4.create_Specialskill4(key);
            }
            return Specialskill4.m_static_map[key];
        };
        Specialskill4.create_Specialskill4 = function (key) {
            if (specialskill4_map.hasOwnProperty(key)) {
                return new Specialskill4(key);
            }
            return null;
        };
        Specialskill4.get_cfg_object = function () {
            return specialskill4_map;
        };
        Specialskill4.m_static_map = new Object();
        return Specialskill4;
    }(Object));
    config.Specialskill4 = Specialskill4;
})(config || (config = {}));
//# sourceMappingURL=specialskill4.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var sys_open_map = null;
    function sys_open_map_init(config_obj) {
        sys_open_map = config_obj["sys_open_map"];
    }
    config.sys_open_map_init = sys_open_map_init;
    var Sys_open = /** @class */ (function (_super) {
        __extends(Sys_open, _super);
        function Sys_open(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sys_open_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sys_open.get_Sys_open = function (key) {
            if (Sys_open.m_static_map.hasOwnProperty(key) == false) {
                Sys_open.m_static_map[key] = Sys_open.create_Sys_open(key);
            }
            return Sys_open.m_static_map[key];
        };
        Sys_open.create_Sys_open = function (key) {
            if (sys_open_map.hasOwnProperty(key)) {
                return new Sys_open(key);
            }
            return null;
        };
        Sys_open.get_cfg_object = function () {
            return sys_open_map;
        };
        Sys_open.m_static_map = new Object();
        return Sys_open;
    }(Object));
    config.Sys_open = Sys_open;
})(config || (config = {}));
//# sourceMappingURL=sys_open.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var sys_open_activity_map = null;
    function sys_open_activity_map_init(config_obj) {
        sys_open_activity_map = config_obj["sys_open_activity_map"];
    }
    config.sys_open_activity_map_init = sys_open_activity_map_init;
    var Sys_open_activity = /** @class */ (function (_super) {
        __extends(Sys_open_activity, _super);
        function Sys_open_activity(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sys_open_activity_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sys_open_activity.get_Sys_open_activity = function (key) {
            if (Sys_open_activity.m_static_map.hasOwnProperty(key) == false) {
                Sys_open_activity.m_static_map[key] = Sys_open_activity.create_Sys_open_activity(key);
            }
            return Sys_open_activity.m_static_map[key];
        };
        Sys_open_activity.create_Sys_open_activity = function (key) {
            if (sys_open_activity_map.hasOwnProperty(key)) {
                return new Sys_open_activity(key);
            }
            return null;
        };
        Sys_open_activity.get_cfg_object = function () {
            return sys_open_activity_map;
        };
        Sys_open_activity.m_static_map = new Object();
        return Sys_open_activity;
    }(Object));
    config.Sys_open_activity = Sys_open_activity;
})(config || (config = {}));
//# sourceMappingURL=sys_open_activity.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var sys_preview_cfg_map = null;
    function sys_preview_cfg_map_init(config_obj) {
        sys_preview_cfg_map = config_obj["sys_preview_cfg_map"];
    }
    config.sys_preview_cfg_map_init = sys_preview_cfg_map_init;
    var Sys_preview_cfg = /** @class */ (function (_super) {
        __extends(Sys_preview_cfg, _super);
        function Sys_preview_cfg(key) {
            var _this = _super.call(this) || this;
            _this.m_config = sys_preview_cfg_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Sys_preview_cfg.get_Sys_preview_cfg = function (key) {
            if (Sys_preview_cfg.m_static_map.hasOwnProperty(key) == false) {
                Sys_preview_cfg.m_static_map[key] = Sys_preview_cfg.create_Sys_preview_cfg(key);
            }
            return Sys_preview_cfg.m_static_map[key];
        };
        Sys_preview_cfg.create_Sys_preview_cfg = function (key) {
            if (sys_preview_cfg_map.hasOwnProperty(key)) {
                return new Sys_preview_cfg(key);
            }
            return null;
        };
        Sys_preview_cfg.get_cfg_object = function () {
            return sys_preview_cfg_map;
        };
        Sys_preview_cfg.m_static_map = new Object();
        return Sys_preview_cfg;
    }(Object));
    config.Sys_preview_cfg = Sys_preview_cfg;
})(config || (config = {}));
//# sourceMappingURL=sys_preview_cfg.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var titleresinfo_map = null;
    function titleresinfo_map_init(config_obj) {
        titleresinfo_map = config_obj["titleresinfo_map"];
    }
    config.titleresinfo_map_init = titleresinfo_map_init;
    var Titleresinfo = /** @class */ (function (_super) {
        __extends(Titleresinfo, _super);
        function Titleresinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = titleresinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Titleresinfo.get_Titleresinfo = function (key) {
            if (Titleresinfo.m_static_map.hasOwnProperty(key) == false) {
                Titleresinfo.m_static_map[key] = Titleresinfo.create_Titleresinfo(key);
            }
            return Titleresinfo.m_static_map[key];
        };
        Titleresinfo.create_Titleresinfo = function (key) {
            if (titleresinfo_map.hasOwnProperty(key)) {
                return new Titleresinfo(key);
            }
            return null;
        };
        Titleresinfo.get_cfg_object = function () {
            return titleresinfo_map;
        };
        Titleresinfo.m_static_map = new Object();
        return Titleresinfo;
    }(Object));
    config.Titleresinfo = Titleresinfo;
})(config || (config = {}));
//# sourceMappingURL=titleresinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var weaponinfo_map = null;
    function weaponinfo_map_init(config_obj) {
        weaponinfo_map = config_obj["weaponinfo_map"];
    }
    config.weaponinfo_map_init = weaponinfo_map_init;
    var Weaponinfo = /** @class */ (function (_super) {
        __extends(Weaponinfo, _super);
        function Weaponinfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = weaponinfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Weaponinfo.get_Weaponinfo = function (key) {
            if (Weaponinfo.m_static_map.hasOwnProperty(key) == false) {
                Weaponinfo.m_static_map[key] = Weaponinfo.create_Weaponinfo(key);
            }
            return Weaponinfo.m_static_map[key];
        };
        Weaponinfo.create_Weaponinfo = function (key) {
            if (weaponinfo_map.hasOwnProperty(key)) {
                return new Weaponinfo(key);
            }
            return null;
        };
        Weaponinfo.get_cfg_object = function () {
            return weaponinfo_map;
        };
        Weaponinfo.m_static_map = new Object();
        return Weaponinfo;
    }(Object));
    config.Weaponinfo = Weaponinfo;
})(config || (config = {}));
//# sourceMappingURL=weaponinfo.js.map
/*
Author:
Data:
Desc: local data config
NOTE: Don't modify this file, it's build by xml-to-python!!!
*/
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
var config;
(function (config) {
    var winginfo_map = null;
    function winginfo_map_init(config_obj) {
        winginfo_map = config_obj["winginfo_map"];
    }
    config.winginfo_map_init = winginfo_map_init;
    var Winginfo = /** @class */ (function (_super) {
        __extends(Winginfo, _super);
        function Winginfo(key) {
            var _this = _super.call(this) || this;
            _this.m_config = winginfo_map[key];
            for (var i in _this.m_config) {
                _this[i] = _this.m_config[i];
            }
            return _this;
        }
        Winginfo.get_Winginfo = function (key) {
            if (Winginfo.m_static_map.hasOwnProperty(key) == false) {
                Winginfo.m_static_map[key] = Winginfo.create_Winginfo(key);
            }
            return Winginfo.m_static_map[key];
        };
        Winginfo.create_Winginfo = function (key) {
            if (winginfo_map.hasOwnProperty(key)) {
                return new Winginfo(key);
            }
            return null;
        };
        Winginfo.get_cfg_object = function () {
            return winginfo_map;
        };
        Winginfo.m_static_map = new Object();
        return Winginfo;
    }(Object));
    config.Winginfo = Winginfo;
})(config || (config = {}));
//# sourceMappingURL=winginfo.js.map