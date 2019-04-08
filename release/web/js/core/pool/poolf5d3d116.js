var utils;
(function (utils) {
    function getitembycls(sign, cls) {
        return Laya.Pool.getItemByClass(sign, cls);
    }
    utils.getitembycls = getitembycls;
    function recover(sign, item) {
        return Laya.Pool.recover(sign, item);
    }
    utils.recover = recover;
    function clearbysign(sign) {
        Laya.Pool.clearBySign(sign);
    }
    utils.clearbysign = clearbysign;
})(utils || (utils = {}));
//# sourceMappingURL=pool.js.map