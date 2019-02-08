var helper;
(function (helper) {
    function do_test(data_arr) {
        var head = data_arr[0];
        // 客户端指令start 
        // 谨慎修改
        //////////////////////////////
        if (head == "closestat") {
            Laya.Stat.hide();
        }
    }
    helper.do_test = do_test;
})(helper || (helper = {}));
//# sourceMappingURL=do_test.js.map