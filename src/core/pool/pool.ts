module utils{
    export function getitembycls(sign:string,cls:any):any{
        return Laya.Pool.getItemByClass(sign,cls)
    }
    export function recover(sign:string,item:any):void{
        return Laya.Pool.recover(sign,item);
    }
    export function clearbysign(sign:string):void{
        Laya.Pool.clearBySign(sign);
    }
}