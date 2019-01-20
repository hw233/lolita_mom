module btree{
    const VERSION = '0.0.1';
    const SUCCESS = 1;
    const FAILURE = 2;
    const RUNNING = 3;
    const ERROR = 4;
    const COMPOSITE = 'composite';
    const DECORATOR = 'decorator';
    const ACTION = 'action';
    const CONDITION = 'condition';

    export const btree_success:number = SUCCESS;
    export const btree_failure:number = FAILURE;
    export const btree_running:number = RUNNING;
    export const btree_error:number = ERROR;

    function createUUID():string {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = "4";

        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid;
    }
    /**
     * 获取一个范围内的随机整数。包括min，不包括max。
     * @param min 最小值，向下取整
     * @param max 最大值，向下取整。结果不包括该值
     */
    function get_random_int(min: number, max: number): number {
        let min_int = Math.floor(min);
        let max_int = Math.floor(max);
        let radio = Math.random();
        return Math.floor(min_int + (max_int - min_int) * radio);
    }
    export class Blackboard{
        public m_basememory:Object = {};
        public m_treememory:Object = {};
        constructor(){
        }
        public _getTreeMemory(treeScope:any):any{
            if(!this.m_treememory[treeScope]){
                this.m_treememory[treeScope] = {
                    "nodeMemory":{},
                    "openNodes":[],
                    "traversalDepth":0,
                    "traversalCycle":0
                };
            }
            return this.m_treememory[treeScope];
        }
        public _getNodeMemory(treeMemory:any,nodeScope:any):any{
            let memory:any = treeMemory.nodeMemory;
            if(!memory[nodeScope]){
                memory[nodeScope] = {};
            }
            return memory[nodeScope];
        }
        public _getMemory(treeScope:any,nodeScope:any):any{
            let memory:any = this.m_basememory;
            if(treeScope){
                memory = this._getTreeMemory(treeScope);
                if(nodeScope){
                    memory = this._getNodeMemory(memory,nodeScope);
                }
            }
            return memory;
        }
        public set(key:any,value:any,treeScope:any,nodeScope:any):void{
            let memory:any = this._getMemory(treeScope,nodeScope);
            memory[key] = value;
        }
        public get(key,treeScope:any,nodeScope:any):any{
            let memory:any = this._getMemory(treeScope,nodeScope);
            return memory[key];
        }
    }
    export class Tick{
        public tree:any = null;
        public debug:any = null;
        public target:any = null;
        public blackboard:any = null;
        public _openNodes:Array<any> = new Array<any>();
        public _nodeCount:number = 0;
        constructor(){
        }
        public _enterNode(node:any):void{
            this._nodeCount++;
            this._openNodes.push(node);
        }
        public _openNode(node:any):void{

        }
        public _tickNode(node:any):void{

        }
        public _closeNode(node:any):void{
            this._openNodes.pop();
        }
        public _exitNode(node:any):void{

        }

    }

    export class BaseNode{
        public id:string = "";
        public category:string = "";
        public name:string = "";
        public title:string = "";
        public description:string = "";
        public properties:Object = {};
        public parameters:Object = {};
        constructor(category:string,name:string,title:string,description:string,properties:Object){
            this.id = createUUID();
            this.category = category || "";
            this.name = name || "";
            this.title = title || this.name;
            this.description = description|| "";
            this.properties = properties || {};
            this.parameters = {};
        }
        public _execute(tick:Tick):any{
            this._enter(tick);
            if(!tick.blackboard.get("isOpen",tick.tree.id,this.id)){
                this._open(tick);
            }
            let status:number = this._tick(tick);
            if(status != RUNNING){
                this._close(tick);
            }
            this._exit(tick);
            return status;
        }
        public _enter(tick:Tick):any{
            tick._enterNode(this);
            this.enter(tick);
        }
        public _open(tick:Tick):any{
            tick._openNode(this);
            tick.blackboard.set("isOpen",true,tick.tree.id,this.id);
            this.open(tick);
        }
        public _tick(tick:Tick):any{
            tick._tickNode(this);
            return this.tick(tick);
        }
        public _close(tick:Tick):any{
            tick._closeNode(this);
            tick.blackboard.set("isOpen",false,tick.tree.id,this.id);
            this.close(tick);
        }
        public _exit(tick:Tick):any{
            tick._exitNode(this);
            this.exit(tick);
        }
        public enter(tick:Tick):any{

        }
        public open(tick:Tick):any{
            
        }
        public tick(tick:Tick):any{ 
        }
        public close(tick:Tick):any{
            
        }
        public exit(tick:Tick):any{
            
        }
    }
    export class Action extends BaseNode{
        constructor(name:string = "Action",title:string = null,properties:Object = {}){
            super(ACTION,name,title,"Action desc",properties);
        }
    }
    export class Condition extends BaseNode{
        constructor(name:string = "Condition",title:string = null,properties:Object = {}){
            super(CONDITION,name,title,"Condition desc",properties);
        }
    }
    export class Decorator extends BaseNode{
        public child:any = null;
        constructor(child:any = null,name:string = "Decorator",title:string = null,properties:Object = {}){
            super(COMPOSITE,name,title,"Decorator desc",properties);
            this.child = child;
        }
    }
    export class Composite extends BaseNode{
        public children:Array<any> = new Array<any>();
        constructor(children:Array<any> = [],name:string = "Composite",title:string = null,properties:Object = {}){
            super(COMPOSITE,name,title,"Composite desc",properties);
            this.children = children.slice(0);
        }
    }
    /////default action start
    export class Error extends Action{
        constructor(properties:any){
            super("Error");
        }
        public tick(tick:Tick):any{ 
            return ERROR;
        }
    }
    export class Failer extends Action{
        constructor(properties:any){
            super("Failer");
        }
        public tick(tick:Tick):any{ 
            return FAILURE;
        }
    }
    export class Runner extends Action{
        constructor(properties:any){
            super("Runner");
        }
        public tick(tick:Tick):any{ 
            return RUNNING;
        }
    }
    export class Succeeder extends Action{
        constructor(properties:any){
            super("Succeeder");
        }
        public tick(tick:Tick):any{ 
            return SUCCESS;
        }
    }
    export class Wait extends Action{
        public endTime:number = 0;
        constructor(properties:any){
            super("Wait",'Wait <milliseconds>ms',{milliseconds: 0});
            this.endTime = properties.milliseconds || 0;
        }
        public open(tick:Tick):any{
            let startTime:number = (new Date()).getTime();
            tick.blackboard.set("startTime",startTime,tick.tree.id,this.id);
        }
        public tick(tick:Tick):any{ 
            let currTime:number = (new Date()).getTime();
            let startTime:number = tick.blackboard.get("startTime",tick.tree.id,this.id);
            if((currTime - startTime) > this.endTime){
                return SUCCESS;
            }
            return RUNNING;
        }
    }
    /////default action end
    /////default composite start
    //Selector
    export class MemPriority extends Composite{
        constructor(properties:any){
            super(properties.children || [],"MemPriority");
        }
        public open(tick:Tick):any{
            tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
        }
        public tick(tick:Tick):any{ 
            let child:number = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (let i:number=child; i<this.children.length; i++) {
                let status:any = this.children[i]._execute(tick);
                if (status !== FAILURE) {
                    if (status === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status;
                }
            }
            return FAILURE;
        }
    }
    //
    export class RandomPriority extends Composite{
        constructor(properties:any){
            super(properties.children || [],"RandomPriority");
        }
        public open(tick:Tick):any{
            tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
            let tempchildren:Array<any> = new Array<any>();
            while(this.children.length > 0){
               let idx:number = get_random_int(0,this.children.length);
               tempchildren.push(this.children.splice(idx,1)[0]);
            }
            this.children = tempchildren;
        }
        public tick(tick:Tick):any{ 
            let child:number = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (let i:number=child; i<this.children.length; i++) {
                let status:any = this.children[i]._execute(tick);
                if (status !== FAILURE) {
                    if (status === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status;
                }
            }
            return FAILURE;
        }
    }
    //
    export class Priority extends Composite{
        constructor(properties:any){
            super(properties.children || [],"Priority");
        }
        public tick(tick:Tick):any{ 
            for (let i:number=0; i<this.children.length; i++) {
                let status:any = this.children[i]._execute(tick);
                if (status !== FAILURE) {
                    return status;
                }
            }
            return FAILURE;
        }
    }
    export class MemSequence extends Composite{
        constructor(properties:any){
            super(properties.children || [],"MemSequence");
        }
        public open(tick:Tick):any{
            tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
        }
        public tick(tick:Tick):any{ 
            let child:number = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (let i:number=child; i<this.children.length; i++) {
                let status:any = this.children[i]._execute(tick);
                if (status !== SUCCESS) {
                    if (status === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status;
                }
            }
            return SUCCESS;
        }
    }
    //
    export class ParallelSequence extends Composite{
        constructor(properties:any){
            super(properties.children || [],"ParallelSequence");
        }
        public tick(tick:Tick):any{ 
            let succeedcount:number = 0;
            let b_failure:boolean = false;
            for (let i:number=0; i<this.children.length; i++) {
                let status:any = this.children[i]._execute(tick);
                if(status == SUCCESS){
                    succeedcount += 1;
                }
                else if(status == FAILURE){
                    b_failure = true;
                }
            }
            if(succeedcount >= this.children.length){
                return SUCCESS;
            }
            if(b_failure){
                return FAILURE;
            }
            return RUNNING;
        }
    }
    //
    export class Sequence extends Composite{
        constructor(properties:any){
            super(properties.children || [],"Sequence");
        }
        public tick(tick:Tick):any{ 
            for (let i:number=0; i<this.children.length; i++) {
                let status:any = this.children[i]._execute(tick);
                if (status !== SUCCESS) {
                    return status;
                }
            }
            return SUCCESS;
        }
    }
    /////default composite end
    /////default decorator start
    export class Inverter extends Decorator{
        constructor(properties:any){
            super(properties.child || null,"Inverter");
        }
        public tick(tick:Tick):any{ 
            if(!this.child){
                return ERROR;
            }
            let status:any = this.child._execute(tick);
            if(status == SUCCESS){
                status = FAILURE;
            }
            else if(status == FAILURE){
                status = SUCCESS;
            }
            return status;
        }
    }
    export class Limiter extends Decorator{
        public maxLoop:number = 1;
        constructor(properties:any){
            super(properties.child || null,"Limiter","Limit <maxLoop> Activations",{maxLoop:1});
            this.maxLoop = properties.maxLoop || 1;
        }
        public open(tick:Tick):any{
            tick.blackboard.set("i", 0, tick.tree.id, this.id);
        }
        public tick(tick:Tick):any{ 
            if(!this.child){
                return ERROR;
            }
            let i:number = tick.blackboard.get("i", tick.tree.id, this.id);
            if(i < this.maxLoop){
                let status:any = this.child._execute(tick);
                if (status == SUCCESS || status == FAILURE)
                    tick.blackboard.set('i', i+1, tick.tree.id, this.id);

                return status;
            }
            return FAILURE;
        }
    }
    export class MaxTime extends Decorator{
        public maxTime:number = 1;
        constructor(properties:any){
            super(properties.child || null,"MaxTime","Max <maxTime>ms",{maxTime:0});
            this.maxTime = properties.maxTime || 0;
        }
        public open(tick:Tick):any{
            let startTime:number = (new Date()).getTime();
            tick.blackboard.set("startTime",startTime,tick.tree.id,this.id);
        }
        public tick(tick:Tick):any{ 
            if(!this.child){
                return ERROR;
            }
            let currTime:number = (new Date()).getTime();
            let startTime:number = tick.blackboard.get("startTime",tick.tree.id,this.id);
            let status:any = this.child._execute(tick);//
            if((currTime - startTime) > this.maxTime){
                return FAILURE;
            }
            return status;
        }
    }
    export class Repeater extends Decorator{
        public maxLoop:number = 1;
        constructor(properties:any){
            super(properties.child || null,"Repeater","Repeat <maxLoop>x",{maxLoop:-1});
            this.maxLoop = properties.maxLoop || -1;
        }
        public open(tick:Tick):any{
            tick.blackboard.set("i",0,tick.tree.id,this.id);
        }
        public tick(tick:Tick):any{ 
            if(!this.child){
                return ERROR;
            }
            let i:number = tick.blackboard.get("i",tick.tree.id,this.id);
            let status:any = SUCCESS;

            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child._execute(tick);

                if (status == SUCCESS || status == FAILURE) {
                    i++;
                } else {
                    break;
                }
            }

            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        }
    }
    //
    export class RepeatUntilFailure extends Decorator{
        public maxLoop:number = 1;
        constructor(properties:any){
            super(properties.child || null,"RepeatUntilFailure","Repeat Until Failure",{maxLoop:-1});
            this.maxLoop = properties.maxLoop || -1;
        }
        public open(tick:Tick):any{
            tick.blackboard.set("i",0,tick.tree.id,this.id);
        }
        public tick(tick:Tick):any{ 
            if(!this.child){
                return ERROR;
            }
            let i:number = tick.blackboard.get("i",tick.tree.id,this.id);
            let status:any = ERROR;

            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child._execute(tick);

                if (status == SUCCESS) {
                    i++;
                } else {
                    break;
                }
            }

            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        }
    }
    export class RepeatUntilSuccess extends Decorator{
        public maxLoop:number = 1;
        constructor(properties:any){
            super(properties.child || null,"RepeatUntilSuccess","Repeat Until Success",{maxLoop:-1});
            this.maxLoop = properties.maxLoop || -1;
        }
        public open(tick:Tick):any{
            tick.blackboard.set("i",0,tick.tree.id,this.id);
        }
        public tick(tick:Tick):any{ 
            if(!this.child){
                return ERROR;
            }
            let i:number = tick.blackboard.get("i",tick.tree.id,this.id);
            let status:any = ERROR;

            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child._execute(tick);

                if (status == FAILURE) {
                    i++;
                } else {
                    break;
                }
            }

            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        }
    }
    /////default decorator end
    export class BehaviorTree{
        public id:string;
        public title:string;
        public description:string;
        public properties:Object;
        public root:any;
        public debug:any;
        public static cls_dict:Object = new Object();
        constructor(){
            this.id = createUUID();
            this.title = 'The behavior tree';
            this.description = 'Default description';
            this.properties = {};
            this.root = null;
            this.debug = null;
        }
        public tick(target:any,blackboard:Blackboard):any{
            let tick:Tick = new Tick();
            tick.debug = this.debug;
            tick.target = target;
            tick.blackboard = blackboard;
            tick.tree = this;
            let status:any = this.root._execute(tick);

            /* CLOSE NODES FROM LAST TICK, IF NEEDED */
            let lastOpenNodes:Array<any> = blackboard.get('openNodes', this.id,null);
            let currOpenNodes:Array<any> = tick._openNodes.slice(0);

            // does not close if it is still open in this tick
            let start:number = 0;
            let i:number;
            for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
                start = i + 1;
                if (lastOpenNodes[i] !== currOpenNodes[i]) {
                    break;
                }
            }

            // close the nodes
            for (i = lastOpenNodes.length - 1; i >= start; i--) {
                lastOpenNodes[i]._close(tick);
            }

            /* POPULATE BLACKBOARD */
            blackboard.set('openNodes', currOpenNodes, this.id,null);
            blackboard.set('nodeCount', tick._nodeCount, this.id,null);

            return status;
        }
        public static init_cls(){
            BehaviorTree.cls_dict["Error"] = Error;
            BehaviorTree.cls_dict["Failer"] = Failer;
            BehaviorTree.cls_dict["Runner"] = Runner;
            BehaviorTree.cls_dict["Succeeder"] = Succeeder;
            BehaviorTree.cls_dict["Wait"] = Wait;
            
            BehaviorTree.cls_dict["MemPriority"] = MemPriority;
            BehaviorTree.cls_dict["MemSequence"] = MemSequence;

            BehaviorTree.cls_dict["RandomPriority"] = RandomPriority;
            
            BehaviorTree.cls_dict["Priority"] = Priority;
            BehaviorTree.cls_dict["Sequence"] = Sequence;

            BehaviorTree.cls_dict["Inverter"] = Inverter;
            BehaviorTree.cls_dict["Limiter"] = Limiter;
            BehaviorTree.cls_dict["MaxTime"] = MaxTime;
            BehaviorTree.cls_dict["Repeater"] = Repeater;
            BehaviorTree.cls_dict["RepeatUntilFailure"] = RepeatUntilFailure;
            BehaviorTree.cls_dict["RepeatUntilSuccess"] = RepeatUntilSuccess;

            BehaviorTree.cls_dict["hasEnemy"] = hasEnemy;
            BehaviorTree.cls_dict["isDead"] = isDead;
            BehaviorTree.cls_dict["isAttacked"] = isAttacked;
            BehaviorTree.cls_dict["Attack"] = Attack;
            BehaviorTree.cls_dict["Dead"] = Dead;
            BehaviorTree.cls_dict["Attacked"] = Attacked;
            BehaviorTree.cls_dict["WalkLeft"] = WalkLeft;
            BehaviorTree.cls_dict["WalkRight"] = WalkRight;
        }
        public load(data:any, names:{}):void{
            names = names || {};

            this.title = data.title || this.title;
            this.description = data.description || this.description;
            this.properties = data.properties || this.properties;

            let nodes:Object = {};
            let id:any;
            let spec:any;
            let node:any;
            // Create the node list (without connection between them)
            for (let id in data.nodes) {
                spec = data.nodes[id];
                let Cls:any;

                if (spec.name in names) {
                    // Look for the name in custom nodes
                    Cls = names[spec.name];
                } else if (BehaviorTree.cls_dict.hasOwnProperty(spec.name)) {
                // Look for the name in default nodes
                    Cls = BehaviorTree.cls_dict[spec.name];
                } 
                else {
                    // Invalid node name
                    console.error('BehaviorTree.load: Invalid node name + "' +spec.name + '".');
                    continue;
                }

                node = new Cls(spec.properties);
                node.id = spec.id || node.id;
                node.title = spec.title || node.title;
                node.description = spec.description || node.description;
                node.properties = spec.properties || node.properties;

                nodes[id] = node;
            }

            // Connect the nodes
            for (let id in data.nodes) {
                spec = data.nodes[id];
                node = nodes[id];

                if (node.category == COMPOSITE && spec.children) {
                    for (let i:number = 0; i < spec.children.length; i++) {
                        let cid:any = spec.children[i];
                        node.children.push(nodes[cid]);
                    }
                } else if (node.category == DECORATOR && spec.child) {
                    node.child = nodes[spec.child];
                }
            }

            this.root = nodes[data.root];
        }
        public dump():any {
            let data:any = {};
            let customNames:Array<any> = [];

            data.title = this.title;
            data.description = this.description;
            data.root = (this.root) ? this.root.id : null;
            data.properties = this.properties;
            data.nodes = {};
            data.custom_nodes = [];

            if (!this.root) 
                return data;

            var stack = [this.root];
            while (stack.length > 0) {
                let node:any = stack.pop();

                let spec:any = {};
                spec.id = node.id;
                spec.name = node.name;
                spec.title = node.title;
                spec.description = node.description;
                spec.properties = node.properties;
                spec.parameters = node.parameters;

                // verify custom node
                let proto:any = (node.constructor && node.constructor.prototype);
                let nodeName:any = (proto && proto.name) || node.name;
                if (!BehaviorTree.cls_dict.hasOwnProperty(nodeName) && customNames.indexOf(nodeName) < 0) {
                    let subdata:any = {};
                    subdata.name = nodeName;
                    subdata.title = (proto && proto.title) || node.title;
                    subdata.category = node.category;

                    customNames.push(nodeName);
                    data.custom_nodes.push(subdata);
                }

                // store children/child
                if (node.category === COMPOSITE && node.children) {
                    let children:Array<any> = [];
                    for (let i:number = node.children.length - 1; i >= 0; i--) {
                        children.push(node.children[i].id);
                        stack.push(node.children[i]);
                    }
                    spec.children = children;
                } else if (node.category === DECORATOR && node.child) {
                    stack.push(node.child);
                    spec.child = node.child.id;
                }

                data.nodes[node.id] = spec;
            }

            return data;
        }
    }

    //game condition action
    export class hasEnemy extends Condition{
        constructor(properties:any){
            super("hasEnemy");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class isDead extends Condition{
        constructor(properties:any){
            super("isDead");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class isAttacked extends Condition{
        constructor(properties:any){
            super("isAttacked");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class Attack extends Action{
        constructor(properties:any){
            super("Attack");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class Dead extends Action{
        constructor(properties:any){
            super("Dead");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class Attacked extends Action{
        constructor(properties:any){
            super("Attacked");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class WalkLeft extends Action{
        constructor(properties:any){
            super("WalkLeft");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    export class WalkRight extends Action{
        constructor(properties:any){
            super("WalkRight");
        }
        public tick(tick:Tick):any{ 
            return tick.target.testaifunc(this.name);
        }
    }
    //
}