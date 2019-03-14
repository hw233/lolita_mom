module data {
    export class transfer_data extends utils.game_data {
        public data_dict: Laya.Dictionary = new Laya.Dictionary();

        constructor() {
            super();
        }

        public add_transfer_data(key_str: string, data: any): void {
            this.data_dict.set(key_str, data);
        }

        public get_transfer_data(key_str: string): any {
            return this.data_dict.get(key_str);
        }

        public remove_transfer_data(key_str: string): void {
            this.data_dict.remove(key_str);
        }

        public dispose() {
            super.dispose();
        }
    }
}