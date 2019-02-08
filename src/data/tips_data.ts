module data {
    export class tips_node {
        public type: number = 0;
        public msg: string = "";
        public item_shape: number = 0;
        public icon: number = 0;
    }

    //浮动提示
    export class tips_data extends utils.game_data {
        private tips_node_arr = new Array<tips_node>();

        constructor() {
            super();
        }

        public add_tips_node(t_type: number, t_msg: string, t_item: number = 0): void {
            let node = new tips_node();
            node.type = t_type;
            node.msg = t_msg;
            node.item_shape = t_item;
            if (t_item != 0) {
                //let cfg = config.Item_desc.get_Item_desc(t_item);
                //if (cfg)
                //    node.icon = cfg["icon"];
            }
            this.tips_node_arr.push(node);
        }

        public get_tips_node(): tips_node {
            return this.tips_node_arr.shift();
        }

        public get_node_num(): number {
            return this.tips_node_arr.length;
        }

        public dispose() {
            super.dispose();
        }
    }
    // 弹窗提示
    export class msgbox_data extends utils.game_data {
        public type: number = 0;
        public content: string = "";
        public caller: any = null;
        public user_data: Array<any> = [];
        public NoTips_keys: string = "";
        public NoTips_dict = new Laya.Dictionary();

        constructor() {
            super();
        }

        public set_msgbox_data(p_type: number, p_content: string, p_caller: any, p_user_data: Array<any>, NoTips_keys: string): void {
            this.type = p_type;
            this.content = p_content;
            this.caller = p_caller;
            this.user_data = p_user_data;
            this.NoTips_keys = NoTips_keys;
        }

        public set_NoTips_flag(NoTips_keys, flag: boolean): void {
            this.NoTips_dict.set(NoTips_keys, flag);
        }

        public get_NoTips_flag(NoTips_keys): boolean {
            let flag = this.NoTips_dict.get(NoTips_keys);
            if (flag == true) {
                return true;
            }
            return false;
        }

        public dispose() {
            super.dispose();
        }
    }
    // 物品提示
    export class item_tips_data extends utils.game_data {
        private item_ins: base.Item = null;
        private user_data: Array<any> = null;

        constructor() {
            super();
        }

        public set_item_ins(i_ins: base.Item, user_data: Array<any>): void {
            this.item_ins = i_ins;
            this.user_data = user_data;
        }

        public get_item_ins(): base.Item {
            return this.item_ins;
        }

        public get_userdata(): Array<any> {
            return this.user_data;
        }

        public dispose() {
            super.dispose();
        }
    }

    // 技能提示
    export class skill_tips_data extends utils.game_data {
        public skill_ins: base.Skill = null;

        constructor() {
            super();
        }

        public set_skilltips_data(i_ins: base.Skill): void {
            this.skill_ins = i_ins;
        }

        public get_skilltips_data(): base.Skill {
            return this.skill_ins;
        }

        public dispose() {
            super.dispose();
        }
    }
}