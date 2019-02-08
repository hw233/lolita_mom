module helper {
    export function do_test(data_arr: Array<string>): void {
        let head = data_arr[0];
        // 客户端指令start 
        // 谨慎修改
        //////////////////////////////
        if (head == "closestat") {
            Laya.Stat.hide();
        }
        
    }
}