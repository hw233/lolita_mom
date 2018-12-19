module utils{
    export function get_view_wh():{}
    {
        let ret:{} = {'w':640,'h':960};
        let cw:number = Laya.Browser.clientWidth;
        let ch:number = Laya.Browser.clientHeight;
        if(cw > ret['w'] && ch > ret['h'])
        {
            //ret['w'] = cw;
            //ret['h'] = ch;
        }
        return ret;
    }
    export function get_render_milltm():number{
        return laya.utils.Browser.now();
    }
    export function getRandom(n,m){
        //省略特殊情形下的处理过程，比如n>m，或者n、m之一无法转化为有效数字；
        return Math.round(Math.random()*(m-n)+n);
    }
    export function genangle(dx:number,dy:number):number
    {
        let angle:number = Math.atan2(dy*1.4142135623731,dx);
        return angle;
    }
    
    export function gendir(dx:number,dy:number,dircount:number = 8,ale:number = null):number
    {
        if(dx == 0)
        {
            if(dy > 0)
            {
                return 0;
            }
            else if(dy < 0)
            {
                return 4;
            }
            return 0;
        }
        else if(dy == 0)
        {
            if(dx > 0)
            {
                return 6;
            }
            else if(dx < 0)
            {
                return 2;
            }
            return 0;
        }
        else
        {
            if(dx > 0 && dy > 0)
            {
                return 7;
            }
            else if(dx > 0 && dy < 0)
            {
                return 5;
            }
            else if(dx < 0 && dy > 0)
            {
                return 1;
            }
            else if(dx < 0 && dy < 0)
            {
                return 3;
            }
            return 0;
        }
        /*
        let angle:number = ale;
        if(angle == null)
        {
            angle = genangle(dx,dy);
        }
        let ret:number;
        if(dircount == 8)
        {
            let ddir:number = angle*(4/3.14159265359);//direction
            let idir:number;
            if(ddir > 0)
            {
                idir = ddir+0.5;//get int
            }
            else
            {
                idir = ddir-0.5;
            }
            ret = (idir - 2 + 16)&7;
        }
        else//dircount == 4
        {
            let ddir:number = angle*(2/3.14159265359);
            let idir:number = ddir;
            if(ddir < 0)
            {
                idir--;
            }
            ret = (idir*2 - 1 + 16)&7;
        }
        return ret;
        */
    }
    //y = ax+b; the line can not be vertical or horizontal;
    export function genafrom2point(sx:number,sy:number,dx:number,dy:number):number
    {
        let a:number = (sy - dy)/(sx - dx);
        return a;
    }
    export function genbfrom2point(sx:number,sy:number,a:number):number
    {
        let b:number = sy - sx*a;
        //let b:number = (sx*dy - dx*sy)/(sx-dx);
        return b;
    }
    export function genpointlinefrom2point(sx:number,sy:number,dx:number,dy:number,gridw:number = 32,gridh:number = 32):Array<laya.maths.Point>
    {
        //core.core_tiplog("genpointlinefrom2point start ",sx,sy,dx,dy);
        let ret:Array<laya.maths.Point> = new Array<laya.maths.Point>();
        let ddx:number = Math.abs(dx - sx);
        let ddy:number = Math.abs(dy - sy);
        if((ddx == 0) && (ddy == 0))
        {
            return ret;
        }
        let stepx:number;
        let stepy:number;
        let cx:number;
        let cy:number;
        let tmp:Object = new Object();
        let addx:number;
        let addy:number;
        let addkey:string;
        if(ddx == 0 || ddy == 0 || ddx == ddy)
        {
            stepx = 1;
            if(ddx == 0)
            {
                stepx = 0;
            }
            else if(dx < sx)
            {
                stepx = -1;
            }

            stepy = 1;
            if(ddy == 0)
            {
                stepy = 0;
            }
            else if(dy < sy)
            {
                stepy = -1;
            }
            
            while(true)
            {
                cx = sx;
                cy = sy;
                if(ddx == 0 || ddy == 0)
                {
                    ret.push(new laya.maths.Point(cx,cy));
                }
                else
                {
                    addx = cx;
                    addy = cy;
                    addkey = (addx*100000+addy).toString();
                    if(tmp.hasOwnProperty(addkey) == false)
                    {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx,addy));
                    }
                    
                    addx = cx-1;
                    addy = cy;
                    addkey = (addx*100000+addy).toString();
                    if(tmp.hasOwnProperty(addkey) == false)
                    {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx,addy));
                    }

                    addx = cx+1;
                    addy = cy-1;
                    addkey = (addx*100000+addy).toString();
                    if(tmp.hasOwnProperty(addkey) == false)
                    {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx,addy));
                    }

                    addx = cx-1;
                    addy = cy;
                    addkey = (addx*100000+addy).toString();
                    if(tmp.hasOwnProperty(addkey) == false)
                    {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx,addy));
                    }
                }
                
                if(sx == dx && sy == dy)
                {
                    break;
                }
                sx = sx + stepx;
                sy = sy + stepy;
            }
        }
        else
        {
            //let a1:number = genafrom2point(sx,sy,dx,dy);
           // let b1:number = genbfrom2point(sx,sy,a1);
            //core.core_tiplog("a1,b1 ",a1,b1);
            let a:number = genafrom2point(sx*gridw,sy*gridh,dx*gridw,dy*gridh);
            let b:number = genbfrom2point(sx*gridw + (gridw>>1),sy*gridh+ (gridh>>1),a);
            //core.core_tiplog("a,b ",a,b);
            cx = sx*gridw + (gridw>>1);
            cy = sy*gridh + (gridh>>1);
            let dcx:number = dx*gridw + (gridw>>1);
            let dcy:number = dy*gridh + (gridh>>1);
            stepx = gridw;
            stepy = gridh;
            if(dx < sx)
            {
                stepx = 0-gridw;
            }
            if(dy < sy)
            {
                stepy = 0-gridh;
            }
            //y = a*x + b;
            //x = (y - b)/a;
            addkey = (sx*100000+sy).toString();
            if(tmp.hasOwnProperty(addkey) == false)
            {
                tmp[addkey] = true;
                //core.core_tiplog('gpl start ',sx,sy);
                ret.push(new laya.maths.Point(sx,sy));
            }
            if(ddx > ddy)//horizontal
            {
                let circle_count:number = ddx;
                while(true)
                {
                    //core.core_tiplog('gpl hor 1 ',cx,cy,stepx,a,b);
                    cx = cx + stepx/2;
                    cy = a*cx + b;
                    //core.core_tiplog('gpl hor 2 ',cx,cy,cx%gridw,cy%gridh,cx/gridw,cy/gridh);
                    if((cx % gridw) == 0 && (cy % gridh) == 0)
                    {
                        addx = Math.floor(cx/gridw);
                        addy = Math.floor(cy/gridh);
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 1 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                        
                        addx = addx-1;
                        addy = addy;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 2 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }

                        addx = addx+1;
                        addy = addy-1;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 3 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }

                        addx = addx-1;
                        addy = addy;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 4 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                    }
                    else
                    {
                        addx = Math.floor(cx/gridw);
                        addy = Math.floor(cy/gridh);
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 5 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                        
                        addx = addx-1;
                        addy = addy;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 6 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                    }
                    cx = cx + stepx/2;
                    if(cx == dcx)
                    {
                        
                        break;
                    }
                }
            }
            else if(ddx < ddy)//vertical
            {
                let circle_count:number = ddy;
                while(true)
                {
                    //x = (y - b)/a;
                    cy = cy + stepy/2;
                    cx = (cy - b)/a;
                    if((cx % gridw) == 0 && (cy % gridh) == 0)
                    {
                        addx = Math.floor(cx/gridw);
                        addy = Math.floor(cy/gridh);
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 7 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                        
                        addx = addx-1;
                        addy = addy;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 8 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }

                        addx = addx+1;
                        addy = addy-1;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 9 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }

                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 10 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                    }
                    else
                    {
                        addx = Math.floor(cx/gridw);
                        addy = Math.floor(cy/gridh);
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 11 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                        
                        addx = addx;
                        addy = addy-1;
                        addkey = (addx*100000+addy).toString();
                        if(tmp.hasOwnProperty(addkey) == false)
                        {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 12 ',addx,addy);
                            ret.push(new laya.maths.Point(addx,addy));
                        }
                    }
                    cy = cy + stepy/2;
                    if(cy == dcy)
                    {
                        break;
                    }
                }
            }
            
        }
        addkey = (dx*100000+dy).toString();
        if(tmp.hasOwnProperty(addkey) == false)
        {
            tmp[addkey] = true;
            //core.core_tiplog('gpl end ',dx,dy);
            ret.push(new laya.maths.Point(dx,dy));
        }
        //
        /*
        core.core_tiplog("genpointlinefrom2point end ",ret.length);
        for(let i:number = 0;i < ret.length;++i)
        {
            core.core_tiplog("pt ",i,ret[i].x,ret[i].y);
        }
        */
        //
        return ret;
    }
    
}