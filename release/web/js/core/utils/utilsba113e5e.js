var utils;
(function (utils) {
    function get_view_wh() {
        var ret = { 'w': 640, 'h': 960 };
        var cw = Laya.Browser.clientWidth;
        var ch = Laya.Browser.clientHeight;
        if (cw > ret['w'] && ch > ret['h']) {
            //ret['w'] = cw;
            //ret['h'] = ch;
        }
        return ret;
    }
    utils.get_view_wh = get_view_wh;
    function get_render_milltm() {
        return laya.utils.Browser.now();
    }
    utils.get_render_milltm = get_render_milltm;
    function getRandom(n, m) {
        //省略特殊情形下的处理过程，比如n>m，或者n、m之一无法转化为有效数字；
        return Math.round(Math.random() * (m - n) + n);
    }
    utils.getRandom = getRandom;
    function genangle(dx, dy) {
        var angle = Math.atan2(dy * 1.4142135623731, dx);
        return angle;
    }
    utils.genangle = genangle;
    function gendir(dx, dy, dircount, ale) {
        if (dircount === void 0) { dircount = 8; }
        if (ale === void 0) { ale = null; }
        if (dx == 0) {
            if (dy > 0) {
                return 0;
            }
            else if (dy < 0) {
                return 4;
            }
            return 0;
        }
        else if (dy == 0) {
            if (dx > 0) {
                return 6;
            }
            else if (dx < 0) {
                return 2;
            }
            return 0;
        }
        else {
            if (dx > 0 && dy > 0) {
                return 7;
            }
            else if (dx > 0 && dy < 0) {
                return 5;
            }
            else if (dx < 0 && dy > 0) {
                return 1;
            }
            else if (dx < 0 && dy < 0) {
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
    utils.gendir = gendir;
    //y = ax+b; the line can not be vertical or horizontal;
    function genafrom2point(sx, sy, dx, dy) {
        var a = (sy - dy) / (sx - dx);
        return a;
    }
    utils.genafrom2point = genafrom2point;
    function genbfrom2point(sx, sy, a) {
        var b = sy - sx * a;
        //let b:number = (sx*dy - dx*sy)/(sx-dx);
        return b;
    }
    utils.genbfrom2point = genbfrom2point;
    function genpointlinefrom2point(sx, sy, dx, dy, gridw, gridh) {
        if (gridw === void 0) { gridw = 32; }
        if (gridh === void 0) { gridh = 32; }
        //core.core_tiplog("genpointlinefrom2point start ",sx,sy,dx,dy);
        var ret = new Array();
        var ddx = Math.abs(dx - sx);
        var ddy = Math.abs(dy - sy);
        if ((ddx == 0) && (ddy == 0)) {
            return ret;
        }
        var stepx;
        var stepy;
        var cx;
        var cy;
        var tmp = new Object();
        var addx;
        var addy;
        var addkey;
        if (ddx == 0 || ddy == 0 || ddx == ddy) {
            stepx = 1;
            if (ddx == 0) {
                stepx = 0;
            }
            else if (dx < sx) {
                stepx = -1;
            }
            stepy = 1;
            if (ddy == 0) {
                stepy = 0;
            }
            else if (dy < sy) {
                stepy = -1;
            }
            while (true) {
                cx = sx;
                cy = sy;
                if (ddx == 0 || ddy == 0) {
                    ret.push(new laya.maths.Point(cx, cy));
                }
                else {
                    addx = cx;
                    addy = cy;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                    addx = cx - 1;
                    addy = cy;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                    addx = cx + 1;
                    addy = cy - 1;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                    addx = cx - 1;
                    addy = cy;
                    addkey = (addx * 100000 + addy).toString();
                    if (tmp.hasOwnProperty(addkey) == false) {
                        tmp[addkey] = true;
                        ret.push(new laya.maths.Point(addx, addy));
                    }
                }
                if (sx == dx && sy == dy) {
                    break;
                }
                sx = sx + stepx;
                sy = sy + stepy;
            }
        }
        else {
            //let a1:number = genafrom2point(sx,sy,dx,dy);
            // let b1:number = genbfrom2point(sx,sy,a1);
            //core.core_tiplog("a1,b1 ",a1,b1);
            var a = genafrom2point(sx * gridw, sy * gridh, dx * gridw, dy * gridh);
            var b = genbfrom2point(sx * gridw + (gridw >> 1), sy * gridh + (gridh >> 1), a);
            //core.core_tiplog("a,b ",a,b);
            cx = sx * gridw + (gridw >> 1);
            cy = sy * gridh + (gridh >> 1);
            var dcx = dx * gridw + (gridw >> 1);
            var dcy = dy * gridh + (gridh >> 1);
            stepx = gridw;
            stepy = gridh;
            if (dx < sx) {
                stepx = 0 - gridw;
            }
            if (dy < sy) {
                stepy = 0 - gridh;
            }
            //y = a*x + b;
            //x = (y - b)/a;
            addkey = (sx * 100000 + sy).toString();
            if (tmp.hasOwnProperty(addkey) == false) {
                tmp[addkey] = true;
                //core.core_tiplog('gpl start ',sx,sy);
                ret.push(new laya.maths.Point(sx, sy));
            }
            if (ddx > ddy) //horizontal
             {
                var circle_count = ddx;
                while (true) {
                    //core.core_tiplog('gpl hor 1 ',cx,cy,stepx,a,b);
                    cx = cx + stepx / 2;
                    cy = a * cx + b;
                    //core.core_tiplog('gpl hor 2 ',cx,cy,cx%gridw,cy%gridh,cx/gridw,cy/gridh);
                    if ((cx % gridw) == 0 && (cy % gridh) == 0) {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 1 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 2 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx + 1;
                        addy = addy - 1;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 3 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 4 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    else {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 5 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 6 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    cx = cx + stepx / 2;
                    if (cx == dcx) {
                        break;
                    }
                }
            }
            else if (ddx < ddy) //vertical
             {
                var circle_count = ddy;
                while (true) {
                    //x = (y - b)/a;
                    cy = cy + stepy / 2;
                    cx = (cy - b) / a;
                    if ((cx % gridw) == 0 && (cy % gridh) == 0) {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 7 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 8 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx + 1;
                        addy = addy - 1;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 9 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx - 1;
                        addy = addy;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 10 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    else {
                        addx = Math.floor(cx / gridw);
                        addy = Math.floor(cy / gridh);
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 11 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                        addx = addx;
                        addy = addy - 1;
                        addkey = (addx * 100000 + addy).toString();
                        if (tmp.hasOwnProperty(addkey) == false) {
                            tmp[addkey] = true;
                            //core.core_tiplog('gpl 12 ',addx,addy);
                            ret.push(new laya.maths.Point(addx, addy));
                        }
                    }
                    cy = cy + stepy / 2;
                    if (cy == dcy) {
                        break;
                    }
                }
            }
        }
        addkey = (dx * 100000 + dy).toString();
        if (tmp.hasOwnProperty(addkey) == false) {
            tmp[addkey] = true;
            //core.core_tiplog('gpl end ',dx,dy);
            ret.push(new laya.maths.Point(dx, dy));
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
    utils.genpointlinefrom2point = genpointlinefrom2point;
})(utils || (utils = {}));
//# sourceMappingURL=utils.js.map