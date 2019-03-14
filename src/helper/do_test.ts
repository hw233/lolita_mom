module helper {
    export function do_test(data_arr: Array<string>): void {
        let head = data_arr[0];
        // 客户端指令start 
        // 谨慎修改
        //////////////////////////////
        if (head == "closestat") {
            Laya.Stat.hide();
        }
        else if(head == "combat"){
            utils.event_ins().fire_event_next_frame(game_event.EVENT_TESTCOMBATPROTO);
        }
    }
}