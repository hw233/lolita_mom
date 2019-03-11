var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var btree;
(function (btree) {
    var VERSION = '0.0.1';
    var SUCCESS = 1;
    var FAILURE = 2;
    var RUNNING = 3;
    var ERROR = 4;
    var COMPOSITE = 'composite';
    var DECORATOR = 'decorator';
    var ACTION = 'action';
    var CONDITION = 'condition';
    btree.btree_success = SUCCESS;
    btree.btree_failure = FAILURE;
    btree.btree_running = RUNNING;
    btree.btree_error = ERROR;
    function createUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = "4";
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
    /**
     * 获取一个范围内的随机整数。包括min，不包括max。
     * @param min 最小值，向下取整
     * @param max 最大值，向下取整。结果不包括该值
     */
    function get_random_int(min, max) {
        var min_int = Math.floor(min);
        var max_int = Math.floor(max);
        var radio = Math.random();
        return Math.floor(min_int + (max_int - min_int) * radio);
    }
    var Blackboard = /** @class */ (function () {
        function Blackboard() {
            this.m_basememory = {};
            this.m_treememory = {};
        }
        Blackboard.prototype._getTreeMemory = function (treeScope) {
            if (!this.m_treememory[treeScope]) {
                this.m_treememory[treeScope] = {
                    "nodeMemory": {},
                    "openNodes": [],
                    "traversalDepth": 0,
                    "traversalCycle": 0
                };
            }
            return this.m_treememory[treeScope];
        };
        Blackboard.prototype._getNodeMemory = function (treeMemory, nodeScope) {
            var memory = treeMemory.nodeMemory;
            if (!memory[nodeScope]) {
                memory[nodeScope] = {};
            }
            return memory[nodeScope];
        };
        Blackboard.prototype._getMemory = function (treeScope, nodeScope) {
            var memory = this.m_basememory;
            if (treeScope) {
                memory = this._getTreeMemory(treeScope);
                if (nodeScope) {
                    memory = this._getNodeMemory(memory, nodeScope);
                }
            }
            return memory;
        };
        Blackboard.prototype.set = function (key, value, treeScope, nodeScope) {
            var memory = this._getMemory(treeScope, nodeScope);
            memory[key] = value;
        };
        Blackboard.prototype.get = function (key, treeScope, nodeScope) {
            var memory = this._getMemory(treeScope, nodeScope);
            return memory[key];
        };
        return Blackboard;
    }());
    btree.Blackboard = Blackboard;
    var Tick = /** @class */ (function () {
        function Tick() {
            this.tree = null;
            this.debug = null;
            this.target = null;
            this.blackboard = null;
            this._openNodes = new Array();
            this._nodeCount = 0;
        }
        Tick.prototype._enterNode = function (node) {
            this._nodeCount++;
            this._openNodes.push(node);
        };
        Tick.prototype._openNode = function (node) {
        };
        Tick.prototype._tickNode = function (node) {
        };
        Tick.prototype._closeNode = function (node) {
            this._openNodes.pop();
        };
        Tick.prototype._exitNode = function (node) {
        };
        return Tick;
    }());
    btree.Tick = Tick;
    var BaseNode = /** @class */ (function () {
        function BaseNode(category, name, title, description, properties) {
            this.id = "";
            this.category = "";
            this.name = "";
            this.title = "";
            this.description = "";
            this.properties = {};
            this.parameters = {};
            this.id = createUUID();
            this.category = category || "";
            this.name = name || "";
            this.title = title || this.name;
            this.description = description || "";
            this.properties = properties || {};
            this.parameters = {};
        }
        BaseNode.prototype._execute = function (tick) {
            this._enter(tick);
            if (!tick.blackboard.get("isOpen", tick.tree.id, this.id)) {
                this._open(tick);
            }
            var status = this._tick(tick);
            if (status != RUNNING) {
                this._close(tick);
            }
            this._exit(tick);
            return status;
        };
        BaseNode.prototype._enter = function (tick) {
            tick._enterNode(this);
            this.enter(tick);
        };
        BaseNode.prototype._open = function (tick) {
            tick._openNode(this);
            tick.blackboard.set("isOpen", true, tick.tree.id, this.id);
            this.open(tick);
        };
        BaseNode.prototype._tick = function (tick) {
            tick._tickNode(this);
            return this.tick(tick);
        };
        BaseNode.prototype._close = function (tick) {
            tick._closeNode(this);
            tick.blackboard.set("isOpen", false, tick.tree.id, this.id);
            this.close(tick);
        };
        BaseNode.prototype._exit = function (tick) {
            tick._exitNode(this);
            this.exit(tick);
        };
        BaseNode.prototype.enter = function (tick) {
        };
        BaseNode.prototype.open = function (tick) {
        };
        BaseNode.prototype.tick = function (tick) {
        };
        BaseNode.prototype.close = function (tick) {
        };
        BaseNode.prototype.exit = function (tick) {
        };
        return BaseNode;
    }());
    btree.BaseNode = BaseNode;
    var Action = /** @class */ (function (_super) {
        __extends(Action, _super);
        function Action(name, title, properties) {
            if (name === void 0) { name = "Action"; }
            if (title === void 0) { title = null; }
            if (properties === void 0) { properties = {}; }
            return _super.call(this, ACTION, name, title, "Action desc", properties) || this;
        }
        return Action;
    }(BaseNode));
    btree.Action = Action;
    var Condition = /** @class */ (function (_super) {
        __extends(Condition, _super);
        function Condition(name, title, properties) {
            if (name === void 0) { name = "Condition"; }
            if (title === void 0) { title = null; }
            if (properties === void 0) { properties = {}; }
            return _super.call(this, CONDITION, name, title, "Condition desc", properties) || this;
        }
        return Condition;
    }(BaseNode));
    btree.Condition = Condition;
    var Decorator = /** @class */ (function (_super) {
        __extends(Decorator, _super);
        function Decorator(child, name, title, properties) {
            if (child === void 0) { child = null; }
            if (name === void 0) { name = "Decorator"; }
            if (title === void 0) { title = null; }
            if (properties === void 0) { properties = {}; }
            var _this = _super.call(this, COMPOSITE, name, title, "Decorator desc", properties) || this;
            _this.child = null;
            _this.child = child;
            return _this;
        }
        return Decorator;
    }(BaseNode));
    btree.Decorator = Decorator;
    var Composite = /** @class */ (function (_super) {
        __extends(Composite, _super);
        function Composite(children, name, title, properties) {
            if (children === void 0) { children = []; }
            if (name === void 0) { name = "Composite"; }
            if (title === void 0) { title = null; }
            if (properties === void 0) { properties = {}; }
            var _this = _super.call(this, COMPOSITE, name, title, "Composite desc", properties) || this;
            _this.children = new Array();
            _this.children = children.slice(0);
            return _this;
        }
        return Composite;
    }(BaseNode));
    btree.Composite = Composite;
    /////default action start
    var Error = /** @class */ (function (_super) {
        __extends(Error, _super);
        function Error(properties) {
            return _super.call(this, "Error") || this;
        }
        Error.prototype.tick = function (tick) {
            return ERROR;
        };
        return Error;
    }(Action));
    btree.Error = Error;
    var Failer = /** @class */ (function (_super) {
        __extends(Failer, _super);
        function Failer(properties) {
            return _super.call(this, "Failer") || this;
        }
        Failer.prototype.tick = function (tick) {
            return FAILURE;
        };
        return Failer;
    }(Action));
    btree.Failer = Failer;
    var Runner = /** @class */ (function (_super) {
        __extends(Runner, _super);
        function Runner(properties) {
            return _super.call(this, "Runner") || this;
        }
        Runner.prototype.tick = function (tick) {
            return RUNNING;
        };
        return Runner;
    }(Action));
    btree.Runner = Runner;
    var Succeeder = /** @class */ (function (_super) {
        __extends(Succeeder, _super);
        function Succeeder(properties) {
            return _super.call(this, "Succeeder") || this;
        }
        Succeeder.prototype.tick = function (tick) {
            return SUCCESS;
        };
        return Succeeder;
    }(Action));
    btree.Succeeder = Succeeder;
    var Wait = /** @class */ (function (_super) {
        __extends(Wait, _super);
        function Wait(properties) {
            var _this = _super.call(this, "Wait", 'Wait <milliseconds>ms', { milliseconds: 0 }) || this;
            _this.endTime = 0;
            _this.endTime = properties.milliseconds || 0;
            return _this;
        }
        Wait.prototype.open = function (tick) {
            var startTime = (new Date()).getTime();
            tick.blackboard.set("startTime", startTime, tick.tree.id, this.id);
        };
        Wait.prototype.tick = function (tick) {
            var currTime = (new Date()).getTime();
            var startTime = tick.blackboard.get("startTime", tick.tree.id, this.id);
            if ((currTime - startTime) > this.endTime) {
                return SUCCESS;
            }
            return RUNNING;
        };
        return Wait;
    }(Action));
    btree.Wait = Wait;
    /////default action end
    /////default composite start
    //Selector
    var MemPriority = /** @class */ (function (_super) {
        __extends(MemPriority, _super);
        function MemPriority(properties) {
            return _super.call(this, properties.children || [], "MemPriority") || this;
        }
        MemPriority.prototype.open = function (tick) {
            tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
        };
        MemPriority.prototype.tick = function (tick) {
            var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (var i = child; i < this.children.length; i++) {
                var status_1 = this.children[i]._execute(tick);
                if (status_1 !== FAILURE) {
                    if (status_1 === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status_1;
                }
            }
            return FAILURE;
        };
        return MemPriority;
    }(Composite));
    btree.MemPriority = MemPriority;
    //
    var RandomPriority = /** @class */ (function (_super) {
        __extends(RandomPriority, _super);
        function RandomPriority(properties) {
            return _super.call(this, properties.children || [], "RandomPriority") || this;
        }
        RandomPriority.prototype.open = function (tick) {
            tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
            var tempchildren = new Array();
            while (this.children.length > 0) {
                var idx = get_random_int(0, this.children.length);
                tempchildren.push(this.children.splice(idx, 1)[0]);
            }
            this.children = tempchildren;
        };
        RandomPriority.prototype.tick = function (tick) {
            var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (var i = child; i < this.children.length; i++) {
                var status_2 = this.children[i]._execute(tick);
                if (status_2 !== FAILURE) {
                    if (status_2 === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status_2;
                }
            }
            return FAILURE;
        };
        return RandomPriority;
    }(Composite));
    btree.RandomPriority = RandomPriority;
    //
    var Priority = /** @class */ (function (_super) {
        __extends(Priority, _super);
        function Priority(properties) {
            return _super.call(this, properties.children || [], "Priority") || this;
        }
        Priority.prototype.tick = function (tick) {
            for (var i = 0; i < this.children.length; i++) {
                var status_3 = this.children[i]._execute(tick);
                if (status_3 !== FAILURE) {
                    return status_3;
                }
            }
            return FAILURE;
        };
        return Priority;
    }(Composite));
    btree.Priority = Priority;
    var MemSequence = /** @class */ (function (_super) {
        __extends(MemSequence, _super);
        function MemSequence(properties) {
            return _super.call(this, properties.children || [], "MemSequence") || this;
        }
        MemSequence.prototype.open = function (tick) {
            tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
        };
        MemSequence.prototype.tick = function (tick) {
            var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            for (var i = child; i < this.children.length; i++) {
                var status_4 = this.children[i]._execute(tick);
                if (status_4 !== SUCCESS) {
                    if (status_4 === RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status_4;
                }
            }
            return SUCCESS;
        };
        return MemSequence;
    }(Composite));
    btree.MemSequence = MemSequence;
    //
    var ParallelSequence = /** @class */ (function (_super) {
        __extends(ParallelSequence, _super);
        function ParallelSequence(properties) {
            return _super.call(this, properties.children || [], "ParallelSequence") || this;
        }
        ParallelSequence.prototype.tick = function (tick) {
            var succeedcount = 0;
            var b_failure = false;
            for (var i = 0; i < this.children.length; i++) {
                var status_5 = this.children[i]._execute(tick);
                if (status_5 == SUCCESS) {
                    succeedcount += 1;
                }
                else if (status_5 == FAILURE) {
                    b_failure = true;
                }
            }
            if (succeedcount >= this.children.length) {
                return SUCCESS;
            }
            if (b_failure) {
                return FAILURE;
            }
            return RUNNING;
        };
        return ParallelSequence;
    }(Composite));
    btree.ParallelSequence = ParallelSequence;
    //
    var Sequence = /** @class */ (function (_super) {
        __extends(Sequence, _super);
        function Sequence(properties) {
            return _super.call(this, properties.children || [], "Sequence") || this;
        }
        Sequence.prototype.tick = function (tick) {
            for (var i = 0; i < this.children.length; i++) {
                var status_6 = this.children[i]._execute(tick);
                if (status_6 !== SUCCESS) {
                    return status_6;
                }
            }
            return SUCCESS;
        };
        return Sequence;
    }(Composite));
    btree.Sequence = Sequence;
    /////default composite end
    /////default decorator start
    var Inverter = /** @class */ (function (_super) {
        __extends(Inverter, _super);
        function Inverter(properties) {
            return _super.call(this, properties.child || null, "Inverter") || this;
        }
        Inverter.prototype.tick = function (tick) {
            if (!this.child) {
                return ERROR;
            }
            var status = this.child._execute(tick);
            if (status == SUCCESS) {
                status = FAILURE;
            }
            else if (status == FAILURE) {
                status = SUCCESS;
            }
            return status;
        };
        return Inverter;
    }(Decorator));
    btree.Inverter = Inverter;
    var Limiter = /** @class */ (function (_super) {
        __extends(Limiter, _super);
        function Limiter(properties) {
            var _this = _super.call(this, properties.child || null, "Limiter", "Limit <maxLoop> Activations", { maxLoop: 1 }) || this;
            _this.maxLoop = 1;
            _this.maxLoop = properties.maxLoop || 1;
            return _this;
        }
        Limiter.prototype.open = function (tick) {
            tick.blackboard.set("i", 0, tick.tree.id, this.id);
        };
        Limiter.prototype.tick = function (tick) {
            if (!this.child) {
                return ERROR;
            }
            var i = tick.blackboard.get("i", tick.tree.id, this.id);
            if (i < this.maxLoop) {
                var status_7 = this.child._execute(tick);
                if (status_7 == SUCCESS || status_7 == FAILURE)
                    tick.blackboard.set('i', i + 1, tick.tree.id, this.id);
                return status_7;
            }
            return FAILURE;
        };
        return Limiter;
    }(Decorator));
    btree.Limiter = Limiter;
    var MaxTime = /** @class */ (function (_super) {
        __extends(MaxTime, _super);
        function MaxTime(properties) {
            var _this = _super.call(this, properties.child || null, "MaxTime", "Max <maxTime>ms", { maxTime: 0 }) || this;
            _this.maxTime = 1;
            _this.maxTime = properties.maxTime || 0;
            return _this;
        }
        MaxTime.prototype.open = function (tick) {
            var startTime = (new Date()).getTime();
            tick.blackboard.set("startTime", startTime, tick.tree.id, this.id);
        };
        MaxTime.prototype.tick = function (tick) {
            if (!this.child) {
                return ERROR;
            }
            var currTime = (new Date()).getTime();
            var startTime = tick.blackboard.get("startTime", tick.tree.id, this.id);
            var status = this.child._execute(tick); //
            if ((currTime - startTime) > this.maxTime) {
                return FAILURE;
            }
            return status;
        };
        return MaxTime;
    }(Decorator));
    btree.MaxTime = MaxTime;
    var Repeater = /** @class */ (function (_super) {
        __extends(Repeater, _super);
        function Repeater(properties) {
            var _this = _super.call(this, properties.child || null, "Repeater", "Repeat <maxLoop>x", { maxLoop: -1 }) || this;
            _this.maxLoop = 1;
            _this.maxLoop = properties.maxLoop || -1;
            return _this;
        }
        Repeater.prototype.open = function (tick) {
            tick.blackboard.set("i", 0, tick.tree.id, this.id);
        };
        Repeater.prototype.tick = function (tick) {
            if (!this.child) {
                return ERROR;
            }
            var i = tick.blackboard.get("i", tick.tree.id, this.id);
            var status = SUCCESS;
            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child._execute(tick);
                if (status == SUCCESS || status == FAILURE) {
                    i++;
                }
                else {
                    break;
                }
            }
            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        };
        return Repeater;
    }(Decorator));
    btree.Repeater = Repeater;
    //
    var RepeatUntilFailure = /** @class */ (function (_super) {
        __extends(RepeatUntilFailure, _super);
        function RepeatUntilFailure(properties) {
            var _this = _super.call(this, properties.child || null, "RepeatUntilFailure", "Repeat Until Failure", { maxLoop: -1 }) || this;
            _this.maxLoop = 1;
            _this.maxLoop = properties.maxLoop || -1;
            return _this;
        }
        RepeatUntilFailure.prototype.open = function (tick) {
            tick.blackboard.set("i", 0, tick.tree.id, this.id);
        };
        RepeatUntilFailure.prototype.tick = function (tick) {
            if (!this.child) {
                return ERROR;
            }
            var i = tick.blackboard.get("i", tick.tree.id, this.id);
            var status = ERROR;
            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child._execute(tick);
                if (status == SUCCESS) {
                    i++;
                }
                else {
                    break;
                }
            }
            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        };
        return RepeatUntilFailure;
    }(Decorator));
    btree.RepeatUntilFailure = RepeatUntilFailure;
    var RepeatUntilSuccess = /** @class */ (function (_super) {
        __extends(RepeatUntilSuccess, _super);
        function RepeatUntilSuccess(properties) {
            var _this = _super.call(this, properties.child || null, "RepeatUntilSuccess", "Repeat Until Success", { maxLoop: -1 }) || this;
            _this.maxLoop = 1;
            _this.maxLoop = properties.maxLoop || -1;
            return _this;
        }
        RepeatUntilSuccess.prototype.open = function (tick) {
            tick.blackboard.set("i", 0, tick.tree.id, this.id);
        };
        RepeatUntilSuccess.prototype.tick = function (tick) {
            if (!this.child) {
                return ERROR;
            }
            var i = tick.blackboard.get("i", tick.tree.id, this.id);
            var status = ERROR;
            while (this.maxLoop < 0 || i < this.maxLoop) {
                status = this.child._execute(tick);
                if (status == FAILURE) {
                    i++;
                }
                else {
                    break;
                }
            }
            tick.blackboard.set('i', i, tick.tree.id, this.id);
            return status;
        };
        return RepeatUntilSuccess;
    }(Decorator));
    btree.RepeatUntilSuccess = RepeatUntilSuccess;
    /////default decorator end
    var BehaviorTree = /** @class */ (function () {
        function BehaviorTree() {
            this.id = createUUID();
            this.title = 'The behavior tree';
            this.description = 'Default description';
            this.properties = {};
            this.root = null;
            this.debug = null;
        }
        BehaviorTree.prototype.tick = function (target, blackboard) {
            var tick = new Tick();
            tick.debug = this.debug;
            tick.target = target;
            tick.blackboard = blackboard;
            tick.tree = this;
            var status = this.root._execute(tick);
            /* CLOSE NODES FROM LAST TICK, IF NEEDED */
            var lastOpenNodes = blackboard.get('openNodes', this.id, null);
            var currOpenNodes = tick._openNodes.slice(0);
            // does not close if it is still open in this tick
            var start = 0;
            var i;
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
            blackboard.set('openNodes', currOpenNodes, this.id, null);
            blackboard.set('nodeCount', tick._nodeCount, this.id, null);
            return status;
        };
        BehaviorTree.init_cls = function () {
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
        };
        BehaviorTree.prototype.load = function (data, names) {
            names = names || {};
            this.title = data.title || this.title;
            this.description = data.description || this.description;
            this.properties = data.properties || this.properties;
            var nodes = {};
            var id;
            var spec;
            var node;
            // Create the node list (without connection between them)
            for (var id_1 in data.nodes) {
                spec = data.nodes[id_1];
                var Cls = void 0;
                if (spec.name in names) {
                    // Look for the name in custom nodes
                    Cls = names[spec.name];
                }
                else if (BehaviorTree.cls_dict.hasOwnProperty(spec.name)) {
                    // Look for the name in default nodes
                    Cls = BehaviorTree.cls_dict[spec.name];
                }
                else {
                    // Invalid node name
                    console.error('BehaviorTree.load: Invalid node name + "' + spec.name + '".');
                    continue;
                }
                node = new Cls(spec.properties);
                node.id = spec.id || node.id;
                node.title = spec.title || node.title;
                node.description = spec.description || node.description;
                node.properties = spec.properties || node.properties;
                nodes[id_1] = node;
            }
            // Connect the nodes
            for (var id_2 in data.nodes) {
                spec = data.nodes[id_2];
                node = nodes[id_2];
                if (node.category == COMPOSITE && spec.children) {
                    for (var i = 0; i < spec.children.length; i++) {
                        var cid = spec.children[i];
                        node.children.push(nodes[cid]);
                    }
                }
                else if (node.category == DECORATOR && spec.child) {
                    node.child = nodes[spec.child];
                }
            }
            this.root = nodes[data.root];
        };
        BehaviorTree.prototype.dump = function () {
            var data = {};
            var customNames = [];
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
                var node = stack.pop();
                var spec = {};
                spec.id = node.id;
                spec.name = node.name;
                spec.title = node.title;
                spec.description = node.description;
                spec.properties = node.properties;
                spec.parameters = node.parameters;
                // verify custom node
                var proto = (node.constructor && node.constructor.prototype);
                var nodeName = (proto && proto.name) || node.name;
                if (!BehaviorTree.cls_dict.hasOwnProperty(nodeName) && customNames.indexOf(nodeName) < 0) {
                    var subdata = {};
                    subdata.name = nodeName;
                    subdata.title = (proto && proto.title) || node.title;
                    subdata.category = node.category;
                    customNames.push(nodeName);
                    data.custom_nodes.push(subdata);
                }
                // store children/child
                if (node.category === COMPOSITE && node.children) {
                    var children = [];
                    for (var i = node.children.length - 1; i >= 0; i--) {
                        children.push(node.children[i].id);
                        stack.push(node.children[i]);
                    }
                    spec.children = children;
                }
                else if (node.category === DECORATOR && node.child) {
                    stack.push(node.child);
                    spec.child = node.child.id;
                }
                data.nodes[node.id] = spec;
            }
            return data;
        };
        BehaviorTree.cls_dict = new Object();
        return BehaviorTree;
    }());
    btree.BehaviorTree = BehaviorTree;
    //game condition action
    var hasEnemy = /** @class */ (function (_super) {
        __extends(hasEnemy, _super);
        function hasEnemy(properties) {
            return _super.call(this, "hasEnemy") || this;
        }
        hasEnemy.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return hasEnemy;
    }(Condition));
    btree.hasEnemy = hasEnemy;
    var isDead = /** @class */ (function (_super) {
        __extends(isDead, _super);
        function isDead(properties) {
            return _super.call(this, "isDead") || this;
        }
        isDead.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return isDead;
    }(Condition));
    btree.isDead = isDead;
    var isAttacked = /** @class */ (function (_super) {
        __extends(isAttacked, _super);
        function isAttacked(properties) {
            return _super.call(this, "isAttacked") || this;
        }
        isAttacked.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return isAttacked;
    }(Condition));
    btree.isAttacked = isAttacked;
    var Attack = /** @class */ (function (_super) {
        __extends(Attack, _super);
        function Attack(properties) {
            return _super.call(this, "Attack") || this;
        }
        Attack.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return Attack;
    }(Action));
    btree.Attack = Attack;
    var Dead = /** @class */ (function (_super) {
        __extends(Dead, _super);
        function Dead(properties) {
            return _super.call(this, "Dead") || this;
        }
        Dead.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return Dead;
    }(Action));
    btree.Dead = Dead;
    var Attacked = /** @class */ (function (_super) {
        __extends(Attacked, _super);
        function Attacked(properties) {
            return _super.call(this, "Attacked") || this;
        }
        Attacked.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return Attacked;
    }(Action));
    btree.Attacked = Attacked;
    var WalkLeft = /** @class */ (function (_super) {
        __extends(WalkLeft, _super);
        function WalkLeft(properties) {
            return _super.call(this, "WalkLeft") || this;
        }
        WalkLeft.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return WalkLeft;
    }(Action));
    btree.WalkLeft = WalkLeft;
    var WalkRight = /** @class */ (function (_super) {
        __extends(WalkRight, _super);
        function WalkRight(properties) {
            return _super.call(this, "WalkRight") || this;
        }
        WalkRight.prototype.tick = function (tick) {
            return tick.target.testaifunc(this.name);
        };
        return WalkRight;
    }(Action));
    btree.WalkRight = WalkRight;
    //
})(btree || (btree = {}));
//# sourceMappingURL=btree.js.map
// 游戏备注
// 本次登录不再提示关键字
// channel_get_cost_gold  
// 游戏宏定义
var base;
(function (base) {
    base.HUMAN_MALE = 101;
    base.HUMAN_FEMALE = 102;
    base.SEX_MALE = 1;
    base.SEX_FEMALE = 2;
    base.PLAYER_LV_MAX = 200;
    base.WARPOS_RIGHTLEADER = 1; //战斗位我方leader
    base.WARPOS_LEFTLEADER = 21; //战斗位敌方leader
    base.ONCETASK_ID_OPERA_START = 10001; //剧情开始
    base.ONCETASK_ID_OPERA_END = 10017; //剧情结束
    base.ONCETASK_ID_OPERA_SECOND = 10011; //剧情第二幕场景
    base.TEXT_FONTSIZE = 48;
    base.TEXT_FONTSIZE_BIG = 60;
    base.TEXT_FONTSIZE_SMALL = 40;
    base.GUAJI_SCENE_START = 2000; //挂机场景id起始
    base.GUAJI_SCENE_END = 2499; //挂机场景id截止
    base.CROSS_SERVER_SCENE_START = 2500; //跨服场景id起始
    base.CROSS_SERVER_SCENE_END = 2999; //跨服场景id截止
    base.CROSS_WLMZ_SCENE_START = 2501; //武林盟主场景id起始
    base.CROSS_WLMZ_SCENE_END = 2507; //武林盟主场景id截止
    base.GANG_MAP_SCENE_START = 3001; //帮派地图场景id起始
    base.GANG_MAP_SCENE_END = 3003; //帮派地图场景id截止
    base.COIN_ARR = [1, 2, 3];
    base.COIN_MAP = {
        1: 997,
        2: 998,
        3: 999
    };
    base.PLAYER_STATUS_NONE = 0; //无状态
    base.PLAYER_STATUS_COMBAT = 1; //战斗
    base.ITEMTYPE_EQUIP_START = 100; //装备类物品类型起始
    base.ITEMTYPE_EQUIP_END = 199; //装备类物品类型截止
    base.ITEMTYPE_COST_START = 200; //消耗类物品类型起始
    base.ITEMTYPE_COST_END = 299; //消耗类物品类型截止
    base.ITEMTYPE_DEVELOP_START = 111; //养成装备起始
    base.ITEMTYPE_DEVELOP_END = 158; //养成装备截止，这个做法很危险，限制只用来显示评分的？，不得做他用
    //装备类100-199
    base.ITEM_WEAPON = 101; //人物武器
    base.ITEM_NECKLACE = 102; //人物项链
    base.ITEM_SHOULDER = 103; //人物护肩
    base.ITEM_CUFF = 104; //人物护腕
    base.ITEM_RING = 105; //人物戒指
    base.ITEM_HELMET = 106; //人物头盔
    base.ITEM_CLOTHES = 107; //人物衣服
    base.ITEM_BELT = 108; //人物腰带
    base.ITEM_PANTS = 109; //人物裤子
    base.ITEM_SHOES = 110; //人物鞋子
    base.ITEM_JIAO = 111; //坐骑角
    base.ITEM_SHENG = 112; //坐骑绳
    base.ITEM_AN = 113; //坐骑鞍
    base.ITEM_DENG = 114; //坐骑镫
    base.ITEM_YU = 115; //羽翼羽
    base.ITEM_JING = 116; //羽翼晶
    base.ITEM_SI = 117; //羽翼丝
    base.ITEM_HUA = 118; //羽翼华
    base.ITEM_WEAPON1 = 135; //光武1
    base.ITEM_WEAPON2 = 136; //光武2
    base.ITEM_WEAPON3 = 137; //光武3
    base.ITEM_WEAPON4 = 138; //光武4
    base.ITEM_ELF1 = 139; //精灵1
    base.ITEM_ELF2 = 140; //精灵2
    base.ITEM_ELF3 = 141; //精灵3
    base.ITEM_ELF4 = 142; //精灵4
    base.ITEM_HE = 119; //兽魂核
    base.ITEM_SUN = 120; //兽魂髓
    base.ITEM_WU = 121; //兽魂雾
    base.ITEM_XUAN = 122; //兽魂炫
    base.ITEM_JI = 123; //光环基
    base.ITEM_MANG = 124; //光环芒
    base.ITEM_YUN = 125; //光环晕
    base.ITEM_YI = 126; //光环熠
    base.ITEM_ZHEN1 = 127; //仙阵1
    base.ITEM_ZHEN2 = 128; //仙阵2
    base.ITEM_ZHEN3 = 129; //仙阵3
    base.ITEM_ZHEN4 = 130; //仙阵4
    base.ITEM_REALM1 = 131; //境界1
    base.ITEM_REALM2 = 132; //境界2
    base.ITEM_REALM3 = 133; //境界3
    base.ITEM_REALM4 = 134; //境界4
    base.ITEM_ANGEL1 = 143; //天仙1
    base.ITEM_ANGEL2 = 144; //天仙2
    base.ITEM_ANGEL3 = 145; //天仙3
    base.ITEM_ANGEL4 = 146; //天仙4
    base.ITEM_WAND1 = 147; //仙器（魔杖）1
    base.ITEM_WAND2 = 148; //仙器2
    base.ITEM_WAND3 = 149; //仙器3
    base.ITEM_WAND4 = 150; //仙器4
    base.ITEM_CLOUD1 = 151; //仙云1
    base.ITEM_CLOUD2 = 152; //仙云2
    base.ITEM_CLOUD3 = 153; //仙云3
    base.ITEM_CLOUD4 = 154; //仙云4
    base.ITEM_HALO1 = 155; //仙气1
    base.ITEM_HALO2 = 156; //仙气2
    base.ITEM_HALO3 = 157; //仙气3
    base.ITEM_HALO4 = 158; //仙气4
    base.ITEM_SWEAPON = 159; //器灵武器
    base.ITEM_SNECKLACE = 160; //器灵项链
    base.ITEM_SSHOULDER = 161; //器灵护肩
    base.ITEM_SCUFF = 162; //器灵护腕
    base.ITEM_SRING = 163; //器灵戒指
    base.ITEM_SHELMET = 164; //器灵头盔
    base.ITEM_SCLOTHES = 165; //器灵衣服
    base.ITEM_SBELT = 166; //器灵腰带
    base.ITEM_SPANTS = 167; //器灵裤子
    base.ITEM_SSHOES = 168; //器灵鞋子
    //消耗品类200-999
    base.ITEM_FORGE_COST = 202; //装备强化消耗
    base.ITEM_FASHION_SKINCARD = 203; //时装卡
    base.ITEM_BOSSBACK_COST = 204; //全民BOSS复活令
    base.ITEM_TITLE_SKINCARD = 205; //称号卡
    base.ITEM_DANYAO = 206; //丹药
    base.ITEM_JINGMAI = 207; //丹药
    base.ITEM_SUMMON_CARD = 210; //宠物卡
    base.ITEM_SUMMON_COST = 211; //宠物消耗品
    base.ITEM_SUMMON_PIECE = 212; //宠物碎片
    base.ITEM_PARTNER_COST = 215; //仙侣消耗品
    base.ITEM_PARTNER_CARD = 216; //仙侣卡
    base.ITEM_PARTNER_PIECE = 217; //仙侣卡碎片
    base.ITEM_HORSE_COST = 225; //坐骑消耗品
    base.ITEM_HORSE_SKINCARD = 226; //坐骑皮肤卡
    base.ITEM_WING_COST = 230; //羽翼消耗品
    base.ITEM_WING_SKINCARD = 231; //羽翼皮肤卡
    base.ITEM_ELF_COST = 235; //精灵消耗品
    base.ITEM_ELF_SKINCARD = 236; //精灵皮肤卡
    base.ITEM_WEAPON_COST = 237; //光武消耗品
    base.ITEM_WEAPON_SKINCARD = 238; //光武皮肤卡
    base.ITEM_AURA_COST = 239; //光环消耗品
    base.ITEM_SOUL_COST = 241; //兽魂消耗品
    base.ITEM_ZHEN_COST = 243; //仙阵消耗品
    base.ITEM_REALM_COST = 245; //境界消耗品
    base.ITEM_ANGLE_COST = 247; //天仙养成消耗
    base.ITEM_ANGLE_SKINCARD = 248; //天仙皮肤卡
    base.ITEM_WAND_COST = 249; //仙器养成消耗
    base.ITEM_CLOUD_COST = 250; //仙云养成消耗
    base.ITEM_HALO_COST = 251; //仙气养成消耗
    //道具使用
    base.ITEM_USE_GO = 0; //前往
    base.ITEM_USE_ONE = 1; //使用
    base.ITEM_USE_BATCH = 2; //批量使用
    base.ITEM_USE_CPS = 3; //合成
    //各级品质
    base.QT_GRAY = 0;
    base.QT_GREEN = 1;
    base.QT_BLUE = 2;
    base.QT_PURPLE = 3;
    base.QT_GOLD = 4;
    base.QT_RED = 5;
    //各级品质颜色
    base.QT_COLOR_GRAY = "#FFFFFF";
    base.QT_COLOR_GREEN = "#12A710";
    base.QT_COLOR_BLUE = "#11B0E5";
    base.QT_COLOR_PURPLE = "#C63EED";
    base.QT_COLOR_GOLD = "#F29E07";
    base.QT_COLOR_RED = "#ED3E46";
    base.QT_COLOR_GRAY2 = "#FFFFFF";
    base.QT_COLOR_GREEN2 = "#00FF1E";
    base.QT_COLOR_BLUE2 = "#00FFFF";
    base.QT_COLOR_PURPLE2 = "#B000AA";
    base.QT_COLOR_GOLD2 = "#FFFF00";
    base.QT_COLOR_RED2 = "#FF2828";
    //装备pos
    base.POS_WEAPON = 1; //人物武器
    base.POS_NECKLACE = 2; //人物项链
    base.POS_SHOULDER = 3; //人物护肩
    base.POS_CUFF = 4; //人物护腕
    base.POS_RING = 5; //人物戒指
    base.POS_HELMET = 6; //人物头盔
    base.POS_CLOTHES = 7; //人物衣服
    base.POS_BELT = 8; //人物腰带
    base.POS_PANTS = 9; //人物裤子
    base.POS_SHOES = 10; //人物鞋子
    base.POS_JIAO = 11; //坐骑角
    base.POS_SHENG = 12; //坐骑绳
    base.POS_AN = 13; //坐骑鞍
    base.POS_DENG = 14; //坐骑镫
    base.POS_YU = 15; //羽翼羽
    base.POS_JING = 16; //羽翼晶
    base.POS_SI = 17; //羽翼丝
    base.POS_HUA = 18; //羽翼华
    base.POS_WEAPON1 = 35; //光武1
    base.POS_WEAPON2 = 36; //光武2
    base.POS_WEAPON3 = 37; //光武3
    base.POS_WEAPON4 = 38; //光武4
    base.POS_ELF1 = 39; //精灵1
    base.POS_ELF2 = 40; //精灵2
    base.POS_ELF3 = 41; //精灵3
    base.POS_ELF4 = 42; //精灵4
    base.POS_HE = 19; //兽魂核
    base.POS_SUN = 20; //兽魂髓
    base.POS_WU = 21; //兽魂雾
    base.POS_XUAN = 22; //兽魂炫
    base.POS_JI = 23; //光环基
    base.POS_MANG = 24; //光环芒
    base.POS_YUN = 25; //光环晕
    base.POS_YI = 26; //光环熠
    base.POS_ZHEN1 = 27; //仙阵1
    base.POS_ZHEN2 = 28; //仙阵2
    base.POS_ZHEN3 = 29; //仙阵3
    base.POS_ZHEN4 = 30; //仙阵4
    base.POS_REALM1 = 31; //境界1
    base.POS_REALM2 = 32; //境界2
    base.POS_REALM3 = 33; //境界3
    base.POS_REALM4 = 34; //境界4
    base.POS_ANGLE1 = 43; //天仙1
    base.POS_ANGLE2 = 44; //天仙2
    base.POS_ANGLE3 = 45; //天仙3
    base.POS_ANGLE4 = 46; //天仙4
    base.POS_WAND1 = 47; //仙器1
    base.POS_WAND2 = 48; //仙器2
    base.POS_WAND3 = 49; //仙器3
    base.POS_WAND4 = 50; //仙器4
    base.POS_CLOUD1 = 51; //仙云1
    base.POS_CLOUD2 = 52; //仙云2
    base.POS_CLOUD3 = 53; //仙云3
    base.POS_CLOUD4 = 54; //仙云4
    base.POS_HALO1 = 55; //灵气1
    base.POS_HALO2 = 56; //灵气2
    base.POS_HALO3 = 57; //灵气3
    base.POS_HALO4 = 58; //灵气4
    base.POS_SWEAPON = 59; //器灵武器
    base.POS_SNECKLACE = 60; //器灵项链
    base.POS_SSHOULDER = 61; //器灵护肩
    base.POS_SCUFF = 62; //器灵护腕
    base.POS_SRING = 63; //器灵戒指
    base.POS_SHELMET = 64; //器灵头盔
    base.POS_SCLOTHES = 65; //器灵衣服
    base.POS_SBELT = 66; //器灵腰带
    base.POS_SPANTS = 67; //器灵裤子
    base.POS_SSHOES = 68; //器灵鞋子
    base.POS_EQUIP_MAX = 99; //装备位上限
    //格子数量上限
    base.EQUIP_GRID_MAX = 600;
    base.EQUIP_GRID_BUY_MAX = 200; //可用金子购买的格子上限
    //颜色码
    base.FORMAT_COLOR = {
        '#C0&': '#FFFFFF',
        '#C1&': '#12A710',
        '#C2&': '#11B0E5',
        '#C3&': '#C63EED',
        '#C4&': '#F29E07',
        '#C5&': '#ED3E46',
        '#C6&': '#ED3E46',
        '#C7&': '#BD8651',
        '#C8&': '#12A710',
        '#C9&': '#A83937',
        '#C10&': '#6D4B46',
        '#C11&': '#ED3E46',
        '#C12&': '#00FFFF',
        '#C13&': '#FFBFD0',
        '#C14&': '#F8F078',
        '#C15&': '#FFFF00',
        '#C16&': '#12A710',
        '#C17&': '#F8FC00',
        '#C18&': '#00FF1E',
        '#C19&': '#B000AA',
        '#C20&': '#FF2828',
        '#C99&': '#000000',
    };
    //表情码
    base.FORMAT_EMOTION = {
        '#0': '#E0&',
        '#1': '#E1&',
        '#2': '#E2&',
        '#3': '#E3&',
        '#4': '#E4&',
        '#5': '#E5&',
        '#6': '#E6&',
        '#7': '#E7&',
        '#8': '#E8&',
        '#9': '#E9&',
        '#10': '#E10&',
        '#11': '#E11&',
        '#12': '#E12&',
        '#13': '#E13&',
        '#14': '#E14&',
        '#15': '#E15&',
        '#16': '#E16&',
        '#17': '#E17&',
        '#18': '#E18&',
        '#19': '#E19&',
        '#20': '#E20&',
        '#21': '#E21&',
        '#22': '#E22&',
        '#23': '#E23&',
        '#24': '#E24&',
        '#25': '#E25&',
        '#26': '#E26&',
        '#27': '#E27&',
        '#28': '#E28&',
        '#29': '#E29&',
        '#30': '#E30&',
        '#31': '#E31&',
        '#32': '#E32&',
        '#33': '#E33&',
        '#34': '#E34&',
        '#35': '#E35&',
    };
    base.SET_EMOTION_URL = {
        '#E0&': 'emotion/face0.png',
        '#E1&': 'emotion/face1.png',
        '#E2&': 'emotion/face2.png',
        '#E3&': 'emotion/face3.png',
        '#E4&': 'emotion/face4.png',
        '#E5&': 'emotion/face5.png',
        '#E6&': 'emotion/face6.png',
        '#E7&': 'emotion/face7.png',
        '#E8&': 'emotion/face8.png',
        '#E9&': 'emotion/face9.png',
        '#E10&': 'emotion/face10.png',
        '#E11&': 'emotion/face11.png',
        '#E12&': 'emotion/face12.png',
        '#E13&': 'emotion/face13.png',
        '#E14&': 'emotion/face14.png',
        '#E15&': 'emotion/face15.png',
        '#E16&': 'emotion/face16.png',
        '#E17&': 'emotion/face17.png',
        '#E18&': 'emotion/face18.png',
        '#E19&': 'emotion/face19.png',
        '#E20&': 'emotion/face20.png',
        '#E21&': 'emotion/face21.png',
        '#E22&': 'emotion/face22.png',
        '#E23&': 'emotion/face23.png',
        '#E24&': 'emotion/face24.png',
        '#E25&': 'emotion/face25.png',
        '#E26&': 'emotion/face26.png',
        '#E27&': 'emotion/face27.png',
        '#E28&': 'emotion/face28.png',
        '#E29&': 'emotion/face29.png',
        '#E30&': 'emotion/face30.png',
        '#E31&': 'emotion/face31.png',
        '#E32&': 'emotion/face32.png',
        '#E33&': 'emotion/face33.png',
        '#E34&': 'emotion/face34.png',
        '#E35&': 'emotion/face35.png',
    };
    //字号码
    base.FORMAT_FONT = {
        '#F0&': '30',
        '#F1&': '35',
        '#F2&': '40',
        '#F3&': '45',
        '#F4&': '50',
        '#F5&': '55',
        '#F6&': '60',
        '#F7&': '65',
        '#F8&': '70',
        '#F9&': '75'
    };
    //图片URL
    base.SET_PICTURE_URL = {
        '#P0&': 'emotion/face0.png',
        '#P1&': 'emotion/face0.png',
        '#P2&': 'emotion/face0.png',
        '#P3&': 'emotion/face0.png',
        '#P4&': 'emotion/face0.png',
        '#P5&': 'emotion/face0.png',
        '#P6&': 'emotion/face0.png',
        '#P7&': 'emotion/face0.png',
        '#P8&': 'emotion/face0.png',
        '#P9&': 'emotion/face0.png'
    };
    // 频道
    base.CHANNEL_GANG = 2;
    base.CHANNEL_WORLD = 3;
    base.CHANNEL_ACROSSSVR = 4;
    base.CHANNEL_SYS = 6;
    base.CHANNEL_RECRUIT = 7;
    // 属性相关
    base.PROP_HP = 0x80; //生命
    base.PROP_ATK = 0x81; //攻击
    base.PROP_DEF = 0x82; //防御
    base.PROP_ID_ARR = [0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87]; //多用来顺序显示
    base.PROP_KEYSTR_ARR = ["hp", "atk", "def", "spd", "cri", "res", "hit", "dod"];
    base.PROP_KEYSTR_2_ID_MAP = {
        "hp": 0x80,
        "atk": 0x81,
        "def": 0x82,
        "spd": 0x83,
        "cri": 0x84,
        "res": 0x85,
        "hit": 0x86,
        "dod": 0x87,
    };
    // 属性战斗力计算系数
    base.PROP_RATIO_MAP = {
        0x80: 0.5,
        0x81: 5,
        0x82: 5,
        0x83: 250,
        0x84: 10,
        0x85: 10,
        0x86: 10,
        0x87: 10,
    };
    // 属性相关end
    // 宠物
    base.SUMMON_LV_MAX = 200; // 宠物等级最高
    base.SUMMON_APT_LV_MAX = 5; // 宠物资质等级最高
    // 宠物end
    // 仙侣
    base.PARTNER_LV_MAX = 15; // 仙侣升阶最高
    base.PARTNER_STAR_LV_MAX = 7; // 仙侣升星最高
    base.PARTNER_YUAN_LV_MAX = 10; // 仙侣仙缘最高
    // 仙侣end
    // 养成系统
    base.DEVELOP_LV_MAX = 15; // 养成升阶等级最高
    base.DEVELOP_SKILL_LV_MAX = 15; // 养成技能等级最高
    base.DEVELOP_SKILL_OPENLV_ARR = [2, 3, 5, 7];
    // export let DEVELOP_EQUIP_SKIN_ARR:Array<string> = ["develop/1/1.png", "develop/1/2.png", "develop/1/3.png", "develop/1/4.png"];
    base.DEVELOP_JINGMAI_LV_MAX = 10; // 经脉等级最高
    base.DEVELOP_JINGMAI_EXP_MAX = 11; // 经脉进度最高
    // 养成系统end
    // 帮派
    base.GANG_ASSISTANT = 1; // 帮主
    base.GANG_DEPUTY_ASSISTANT = 2; // 副帮主
    base.GANG_NORMAL_MEMBER = 3; // 帮众
    base.GANG_LV_MIN = 52; //入帮最低要求等级
    // 帮派end
    // 排行榜
    base.RANK_LEVEL = 1; // 等级榜
    base.RANK_MAINROUND = 2; // 主线关卡
    base.RANK_TREASURE = 3; //上古秘宝
    base.RANK_TOWER = 4; //大雁神塔
    base.RANK_HEAVEN = 5; //天庭降妖
    base.RANK_WEAPON = 6; //光武
    base.RANK_ELF = 7; //精灵
    base.RANK_HORSE = 8; //坐骑
    base.RANK_WING = 9; //羽翼
    base.RANK_XIANZHEN = 10; //仙阵
    base.RANK_JINGJIE = 11; //境界
    base.RANK_GUANGHUAN = 12; //光环
    base.RANK_SHOUHUN = 13; //兽魂
    base.RANK_ZHANLI = 14; //战力
    base.RANK_CONSUME = 15; //消费排行
    // 排行榜 end
    // 活动编号
    base.ACTIVITY_DAILY_ANSWER = 6; // 每日答题
    base.ACTIVITY_PANDA_KF = 13; //熊猫大侠活动开服
    base.ACTIVITY_PANDA_LX = 12; //熊猫大侠活动轮循
    base.ACTIVITY_TOTAL_PAY_KF = 15; //累充活动开服
    base.ACTIVITY_TOTAL_PAY_LX = 14; //累充活动轮循
    base.ACTIVITY_GO_NEXT_LV = 16; //直升一阶
    base.ACTIVITY_DEVELOP_RWD = 17; //养成进阶奖励
    base.ACTIVITY_DEVELOP_RANK = 18; //养成进阶排行
    base.ACTIVITY_COMMON_UPGRADE = 19; //全民进阶
    base.ACTIVITY_GROW_UP = 20; //成长基金
    base.ACTIVITY_INVEST = 21; //投资计划
    base.ACTIVITY_FIRST_PAY_GROUP = 22; //首充团购
    base.ACTIVITY_COMMON_RUSHGRADE = 25; //全民冲级
    base.ACTIVITY_OPENPLAY_RWD = 26; //全民冲级
    base.ACTIVITY_COOKERGOD = 27; //食神挑战
    base.ACTIVITY_PURCHASE_GIFT_BAG = 28; //10元购
    base.ACTIVITY_TODAY_GIFT_KF = 29; //今日豪礼 开服 
    base.ACTIVITY_TODAY_GIFT_LX = 31; //今日豪礼 轮循 
    base.ACTIVITY_RECHARGE_GIFT = 32; //充值大礼
    base.ACTIVITY_KFHD = 35; //开服活动大厅
    base.ACTIVITY_CONTINUE_CONSUME = 33; //连续消费
    base.ACTIVITY_CONSUME_RANK = 34; //消费排行
    // 活动编号end
    //avatar类型
    base.HINTTYPE_SKIN = 0x81;
    base.HINTTYPE_TITLE = 0x82;
    base.HINTTYPE_RIDE = 0x83;
    base.HINTTYPE_RIDE_SKIN = 0x84;
    base.HINTTYPE_WING = 0x85;
    base.HINTTYPE_WING_SKIN = 0x86;
    base.HINTTYPE_GUANGWU = 0x87;
    base.HINTTYPE_GUANGWU_SKIN = 0x88;
    base.HINTTYPE_JINGLING = 0x89;
    base.HINTTYPE_JINGLING_SKIN = 0x8a;
    base.HINTTYPE_SUMMON = 0x90;
    base.HINTTYPE_SUMMONAURA = 0x91;
    base.HINTTYPE_SUMMONSOUL = 0x92;
    base.HINTTYPE_PARTNER = 0x93;
    base.HINTTYPE_PARTNERJINGJIE = 0x94;
    base.HINTTYPE_PARTNERXIANZHEN = 0x95;
    // 跨服争霸 start
    base.SERGHY_NOOPD = 0; // 无人占领 
    base.SERGHY_OWN = 1; // 己方占领 
    base.SERGHY_ENEMY = 2; // 敌方占领 
    // 跨服争霸 end
    // 场景玩家的状态
    base.SCENE_PLAYER_FREE = 0; // 空闲
    base.SCENE_PLAYER_COMBAT = 1; // 战斗中
    // 帮派地图 状态
    base.GANG_MAP_MINGING = 0; // 挖矿
    base.GANG_MAP_PLANT = 1; // 种植
    base.GANG_MAP_WATER = 2; // 浇水
})(base || (base = {}));
//# sourceMappingURL=const.js.map
var filtersmgr;
(function (filtersmgr) {
    var FILTERSSTYLE_ENUM;
    (function (FILTERSSTYLE_ENUM) {
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["DEFAULT"] = 0] = "DEFAULT";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["DISABLE_BLACK"] = 1] = "DISABLE_BLACK";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["DISABLE_URLESS"] = 2] = "DISABLE_URLESS";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["BLACKWRITE"] = 3] = "BLACKWRITE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GRAY"] = 4] = "GRAY";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["RED"] = 5] = "RED";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["LIGHT"] = 6] = "LIGHT";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFBACK"] = 7] = "GFBACK";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFBLUE"] = 8] = "GFBLUE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFWHITE"] = 9] = "GFWHITE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFYELLOW"] = 10] = "GFYELLOW";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFBLUEGREEN"] = 11] = "GFBLUEGREEN";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQGREEN"] = 12] = "GFQGREEN";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQBLUE"] = 13] = "GFQBLUE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQPURPLE"] = 14] = "GFQPURPLE";
        FILTERSSTYLE_ENUM[FILTERSSTYLE_ENUM["GFQYELLOW"] = 15] = "GFQYELLOW";
    })(FILTERSSTYLE_ENUM = filtersmgr.FILTERSSTYLE_ENUM || (filtersmgr.FILTERSSTYLE_ENUM = {}));
    var filtersstylemgr = /** @class */ (function () {
        function filtersstylemgr() {
            this._filtersmap = new Object();
            this._filtersmap[FILTERSSTYLE_ENUM.DEFAULT] = [
                new Laya.GlowFilter("#5e391b", 3, 3, 3),
            ];
            /**
             * 禁用滤镜 纯黑
             */
            this._filtersmap[FILTERSSTYLE_ENUM.DISABLE_BLACK] = [
                new Laya.ColorFilter([1, 0, 0, 0, -255,
                    0, 1, 0, 0, -255,
                    0, 0, 1, 0, -255,
                    0, 0, 0, 1, 0]),
            ];
            /**
             * 禁用滤镜 去色
             */
            this._filtersmap[FILTERSSTYLE_ENUM.DISABLE_URLESS] = [
                new Laya.ColorFilter([0.4320, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.7922, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0951, 0, 0,
                    0, 0, 0, 1, 0]),
            ];
            /**
             * 禁用滤镜 黑白
             */
            this._filtersmap[FILTERSSTYLE_ENUM.BLACKWRITE] = [
                new Laya.ColorFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]),
            ];
            /**
             * 禁用滤镜 灰色
             */
            this._filtersmap[FILTERSSTYLE_ENUM.GRAY] = [
                new Laya.ColorFilter([
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0
                ]),
            ];
            /**
             * 禁用滤镜 红色
             */
            this._filtersmap[FILTERSSTYLE_ENUM.RED] = [
                new Laya.ColorFilter([
                    0.3086, 0.6094, 0.0820, 0, 100,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0.3086, 0.6094, 0.0820, 0, 0,
                    0, 0, 0, 1, 0
                ]),
            ];
            /**
             * 禁用滤镜 高亮
             */
            this._filtersmap[FILTERSSTYLE_ENUM.LIGHT] = [
                new Laya.ColorFilter([1, 0, 0, 0, 50,
                    0, 1, 0, 0, 50,
                    0, 0, 1, 0, 50,
                    0, 0, 0, 1, 0]),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFBACK] = [
                new Laya.GlowFilter("#000000", 2, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFBLUE] = [
                new Laya.GlowFilter("#00ccff", 1, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFWHITE] = [
                new Laya.GlowFilter("#FFFFFF", 1, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFYELLOW] = [
                new Laya.GlowFilter("#FFa800", 1, 3, 3),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFBLUEGREEN] = [
                new Laya.GlowFilter("#00FFFF", 3, 4, 4),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQGREEN] = [
                new Laya.GlowFilter("#1DBD2D", 1, 32, 32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQBLUE] = [
                new Laya.GlowFilter("#0078DB", 1, 32, 32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQPURPLE] = [
                new Laya.GlowFilter("#EB45F6", 1, 32, 32),
            ];
            this._filtersmap[FILTERSSTYLE_ENUM.GFQYELLOW] = [
                new Laya.GlowFilter("#fbeb36", 3, 10, 10),
            ];
        }
        filtersstylemgr.prototype.getfiltersbyid = function (id) {
            return this._filtersmap[id];
        };
        filtersstylemgr.prototype.set_filter = function (l, id) {
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.filters = filters;
            }
            return true;
        };
        return filtersstylemgr;
    }());
    var g_ins = null;
    function ins() {
        if (g_ins == null) {
            g_ins = new filtersstylemgr();
        }
        return g_ins;
    }
    function set_filter(l, id) {
        return ins().set_filter(l, id);
    }
    filtersmgr.set_filter = set_filter;
})(filtersmgr || (filtersmgr = {}));
//# sourceMappingURL=filtersmgr.js.map
var fontmgr;
(function (fontmgr) {
    var TextFormat = /** @class */ (function () {
        function TextFormat(f, c, b, i, s, underline, underlinec, stroke, strokec, leading, padding) {
            if (f === void 0) { f = "Microsoft YaHei"; }
            if (c === void 0) { c = "#000000"; }
            if (b === void 0) { b = 0; }
            if (i === void 0) { i = 0; }
            if (s === void 0) { s = -1; }
            if (underline === void 0) { underline = 0; }
            if (underlinec === void 0) { underlinec = "#000000"; }
            if (stroke === void 0) { stroke = 0; }
            if (strokec === void 0) { strokec = "#000000"; }
            if (leading === void 0) { leading = 0; }
            if (padding === void 0) { padding = "0,0,0,0"; }
            this.font = f;
            this.color = c;
            this.bold = b;
            this.italic = i;
            this.fontSize = s;
            this.underline = underline;
            this.underlineColor = underlinec;
            this.stroke = stroke;
            this.strokeColor = strokec;
            this.leading = leading;
            this.padding = padding;
        }
        return TextFormat;
    }());
    var FONTSTYLE_ENUM;
    (function (FONTSTYLE_ENUM) {
        // 常规界面颜色，添加配置需与负责人商定，此配置要节制。
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_DEFAULT"] = 0] = "FONT_DEFAULT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_YELLOW"] = 1] = "FONT_YELLOW";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_YELLOWLIGHT"] = 2] = "FONT_YELLOWLIGHT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_GREEN"] = 3] = "FONT_GREEN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_GREENLIGHT"] = 4] = "FONT_GREENLIGHT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_RED"] = 5] = "FONT_RED";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_REDDRAK"] = 6] = "FONT_REDDRAK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_REDLIGHT"] = 7] = "FONT_REDLIGHT";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BLUE"] = 8] = "FONT_BLUE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_PINK"] = 9] = "FONT_PINK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_PURPLE"] = 10] = "FONT_PURPLE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_ORANGE"] = 11] = "FONT_ORANGE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_WHTIE"] = 12] = "FONT_WHTIE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BLACK"] = 13] = "FONT_BLACK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_GRAY"] = 14] = "FONT_GRAY";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_HE"] = 15] = "FONT_HE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BROWN"] = 16] = "FONT_BROWN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BROWNDARK"] = 17] = "FONT_BROWNDARK";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BTNTAB"] = 18] = "FONT_BTNTAB";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_OUTLINE"] = 19] = "FONT_OUTLINE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BTNBLUE"] = 20] = "FONT_BTNBLUE";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_BTNYELLOW"] = 21] = "FONT_BTNYELLOW";
        // 品质颜色
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_0"] = 22] = "FONT_QUALITY_0";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_1"] = 23] = "FONT_QUALITY_1";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_2"] = 24] = "FONT_QUALITY_2";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_3"] = 25] = "FONT_QUALITY_3";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_4"] = 26] = "FONT_QUALITY_4";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_QUALITY_5"] = 27] = "FONT_QUALITY_5";
        // ......
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N1"] = 28] = "FONT_N1";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N2"] = 29] = "FONT_N2";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N3"] = 30] = "FONT_N3";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N4"] = 31] = "FONT_N4";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N5"] = 32] = "FONT_N5";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_N6"] = 33] = "FONT_N6";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_CHAPTERBTN"] = 34] = "FONT_CHAPTERBTN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_CHAPTERHELP"] = 35] = "FONT_CHAPTERHELP";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_EQUIPBTN"] = 36] = "FONT_EQUIPBTN";
        FONTSTYLE_ENUM[FONTSTYLE_ENUM["FONT_END"] = 37] = "FONT_END";
    })(FONTSTYLE_ENUM = fontmgr.FONTSTYLE_ENUM || (fontmgr.FONTSTYLE_ENUM = {}));
    var fontstylemgr = /** @class */ (function () {
        function fontstylemgr() {
            // this._stylemap[FONTSTYLE_ENUM.DEFAULT] = new TextFormat("Microsoft YaHei","#fff799");
            // this._filtersmap[FONTSTYLE_ENUM.DEFAULT] = [
            //     new Laya.GlowFilter("#5e391b",3,3,3),
            // ];
            // this._stylemap[FONTSTYLE_ENUM.DEFAULT1] = new TextFormat("Microsoft YaHei","#fff799");
            this._stylemap = new Object(); //字体样式映射 
            this._filtersmap = new Object();
            this.FONT_NAME = "h5font";
            this._stylemap[FONTSTYLE_ENUM.FONT_DEFAULT] = new TextFormat(this.FONT_NAME, "#bd8651");
            this._stylemap[FONTSTYLE_ENUM.FONT_YELLOW] = new TextFormat(this.FONT_NAME, "#ffff00");
            this._stylemap[FONTSTYLE_ENUM.FONT_YELLOWLIGHT] = new TextFormat(this.FONT_NAME, "#fffbb5");
            this._stylemap[FONTSTYLE_ENUM.FONT_GREEN] = new TextFormat(this.FONT_NAME, "#12a710");
            this._stylemap[FONTSTYLE_ENUM.FONT_GREENLIGHT] = new TextFormat(this.FONT_NAME, "#00ff1e");
            this._stylemap[FONTSTYLE_ENUM.FONT_RED] = new TextFormat(this.FONT_NAME, "#ed3e46");
            this._stylemap[FONTSTYLE_ENUM.FONT_REDDRAK] = new TextFormat(this.FONT_NAME, "#a83937");
            this._stylemap[FONTSTYLE_ENUM.FONT_REDLIGHT] = new TextFormat(this.FONT_NAME, "#ff2828");
            this._stylemap[FONTSTYLE_ENUM.FONT_BLUE] = new TextFormat(this.FONT_NAME, "#11b0e5");
            this._stylemap[FONTSTYLE_ENUM.FONT_PINK] = new TextFormat(this.FONT_NAME, "#ffbfd0");
            this._stylemap[FONTSTYLE_ENUM.FONT_PURPLE] = new TextFormat(this.FONT_NAME, "#c63eed");
            this._stylemap[FONTSTYLE_ENUM.FONT_ORANGE] = new TextFormat(this.FONT_NAME, "#f29e07");
            this._stylemap[FONTSTYLE_ENUM.FONT_WHTIE] = new TextFormat(this.FONT_NAME, "#ffffff");
            this._stylemap[FONTSTYLE_ENUM.FONT_BLACK] = new TextFormat(this.FONT_NAME, "#000000");
            this._stylemap[FONTSTYLE_ENUM.FONT_GRAY] = new TextFormat(this.FONT_NAME, "#a29d9a");
            this._stylemap[FONTSTYLE_ENUM.FONT_HE] = new TextFormat(this.FONT_NAME, "#6d4b46");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNTAB] = new TextFormat(this.FONT_NAME, "#aa7365");
            this._stylemap[FONTSTYLE_ENUM.FONT_BROWN] = new TextFormat(this.FONT_NAME, "#894c39");
            this._stylemap[FONTSTYLE_ENUM.FONT_BROWNDARK] = new TextFormat(this.FONT_NAME, "#6e4b47");
            this._stylemap[FONTSTYLE_ENUM.FONT_OUTLINE] = new TextFormat(this.FONT_NAME, "#ffffff", 0, 0, -1, 0, "#000000", 3, "#000000");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNBLUE] = new TextFormat(this.FONT_NAME, "#ffffff", 0, 0, -1, 0, "#000000", 3, "#005982");
            this._stylemap[FONTSTYLE_ENUM.FONT_BTNYELLOW] = new TextFormat(this.FONT_NAME, "#ffffff", 0, 0, -1, 0, "#000000", 3, "#eb6100");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_0] = new TextFormat(this.FONT_NAME, "#a29d9a");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_1] = new TextFormat(this.FONT_NAME, "#38bd61");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_2] = new TextFormat(this.FONT_NAME, "#11b0e5");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_3] = new TextFormat(this.FONT_NAME, "#c63eed");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_4] = new TextFormat(this.FONT_NAME, "#f29e07");
            this._stylemap[FONTSTYLE_ENUM.FONT_QUALITY_5] = new TextFormat(this.FONT_NAME, "#ed3e46");
            this._stylemap[FONTSTYLE_ENUM.FONT_N1] = new TextFormat("SimSun", "#f1f1f1");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N1] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N2] = new TextFormat("SimSun", "#ff4e00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N2] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N3] = new TextFormat("SimSun", "#ff0000");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N3] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N4] = new TextFormat("SimSun", "#ffd600");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N4] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N5] = new TextFormat("SimSun", "#2aff00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N5] = [new Laya.GlowFilter("#000105", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_N6] = new TextFormat("SimSun", "#aeff00");
            this._filtersmap[FONTSTYLE_ENUM.FONT_N6] = [new Laya.GlowFilter("#186400", 3, 3, 3),];
            this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERBTN] = new TextFormat(this.FONT_NAME, "#f8bc74", 0, 0, -1, 0, "", 5, "#a56b51");
            //this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERBTN] = new TextFormat(this.FONT_NAME,"#000000",0,0,-1,0,"",);
            this._stylemap[FONTSTYLE_ENUM.FONT_CHAPTERHELP] = new TextFormat(this.FONT_NAME, "#38bd61", 0, 0, -1, 1, "#38bd61");
            this._stylemap[FONTSTYLE_ENUM.FONT_EQUIPBTN] = new TextFormat(this.FONT_NAME, "#12a710", 0, 0, -1, 1, "#12a710");
        }
        /**
         * 根据key找到字体样式的具体配置
         * @param {string} id
         * @returns {ITextFormat}
         */
        fontstylemgr.prototype.getstylebyid = function (id) {
            return this._stylemap[id];
        };
        fontstylemgr.prototype.getfiltersbyid = function (id) {
            return this._filtersmap[id];
        };
        fontstylemgr.prototype.getstylefont = function (id) {
            return this._stylemap[id].font;
        };
        fontstylemgr.prototype.set_htmldiv = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            l.style.color = fs.color;
            l.style.bold = fs.bold != 0;
            l.style.italic = fs.italic != 0;
            if (font_size == -1) {
                font_size = fs.fontSize;
            }
            if (font_size == -1) {
                font_size = 50;
            }
            l.style.font = font_size + "px " + this.FONT_NAME;
            if (fs.underline != 0) {
                l.style.underLine = 1;
            }
            else {
                l.style.underLine = 0;
            }
            l.style.leading = fs.leading;
            l.style.stroke = fs.stroke;
            l.style.strokeColor = fs.strokeColor;
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.filters = filters;
            }
            return true;
        };
        fontstylemgr.prototype.set_lable = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            l.font = fs.font;
            l.color = fs.color;
            l.bold = fs.bold != 0;
            l.italic = fs.italic != 0;
            if (font_size == -1) {
                font_size = fs.fontSize;
            }
            if (font_size != -1) {
                l.fontSize = font_size;
            }
            if (fs.underline != 0) {
                l.underline = true;
                l.underlineColor = fs.underlineColor;
            }
            else {
                l.underline = false;
            }
            l.stroke = fs.stroke;
            l.strokeColor = fs.strokeColor;
            l.leading = fs.leading;
            l.padding = fs.padding;
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.filters = filters;
            }
            return true;
        };
        fontstylemgr.prototype.set_button = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            var disabledColor = "#AAAAAA"; //按钮变灰色时字体颜色
            l.labelFont = fs.font;
            l.labelColors = fs.color;
            l.labelBold = fs.bold != 0;
            //
            if (fs.color) {
                var tmpColors = void 0;
                if (fs.color.indexOf(",") != -1) {
                    l.labelColors = fs.color;
                }
                else {
                    tmpColors = [fs.color, fs.color, fs.color, disabledColor];
                    l.labelColors = tmpColors.join(",");
                }
            }
            if (fs.strokeColor) {
                var tmpColors = void 0;
                if (fs.strokeColor.indexOf(",") != -1) {
                    l.strokeColors = fs.strokeColor;
                }
                else {
                    tmpColors = [fs.strokeColor, fs.strokeColor, fs.strokeColor, disabledColor];
                    l.strokeColors = tmpColors.join(",");
                }
            }
            l.labelStroke = fs.stroke;
            //
            if (font_size == -1) {
                font_size = fs.fontSize;
            }
            if (font_size != -1) {
                l.labelSize = font_size;
            }
            l.labelPadding = fs.padding;
            var filters = this.getfiltersbyid(id);
            if (filters != null && filters != undefined) {
                l.text.filters = filters;
            }
            return true;
        };
        fontstylemgr.prototype.set_textinput = function (l, id, font_size) {
            if (font_size === void 0) { font_size = -1; }
            var fs = this.getstylebyid(id);
            if (fs == null || fs == undefined) {
                core.game_tiplog("fontstylemgr error id! ", id);
                return false;
            }
            var ret = this.set_lable(l, id, font_size);
            return ret;
        };
        fontstylemgr.prototype.registerfont = function (arr) {
            if (Laya.Browser.window.conch) {
                Laya.Browser.window.conch.setFontFaceFromBuffer(this.FONT_NAME, arr);
            }
        };
        return fontstylemgr;
    }());
    var g_ins = null;
    function ins() {
        if (g_ins == null) {
            g_ins = new fontstylemgr();
        }
        return g_ins;
    }
    function registerfont(arr) {
        return ins().registerfont(arr);
    }
    fontmgr.registerfont = registerfont;
    function getstylefont(id) {
        return ins().getstylefont(id);
    }
    fontmgr.getstylefont = getstylefont;
    function set_htmldiv(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_htmldiv(l, id, font_size);
    }
    fontmgr.set_htmldiv = set_htmldiv;
    function set_lable(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_lable(l, id, font_size);
    }
    fontmgr.set_lable = set_lable;
    function set_button(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_button(l, id, font_size);
    }
    fontmgr.set_button = set_button;
    function set_textinput(l, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        return ins().set_textinput(l, id, font_size);
    }
    fontmgr.set_textinput = set_textinput;
    function set_ui_style(ui, id, font_size) {
        if (font_size === void 0) { font_size = -1; }
        for (var i = 0; i < ui.numChildren; ++i) {
            var comp = ui.getChildAt(i);
            if (comp instanceof (Laya.TextInput)) {
                set_textinput(comp, id, font_size);
            }
            else if (comp instanceof (Laya.HTMLDivElement)) {
                set_htmldiv(comp, id, font_size);
            }
            else {
                if (comp instanceof (Laya.Label)) {
                    set_lable(comp, id, font_size);
                }
                else if (comp instanceof (Laya.Button)) {
                    set_button(comp, id, font_size);
                }
                else {
                    if (comp instanceof (Laya.Node)) {
                        set_ui_style(comp, id, font_size);
                    }
                }
            }
        }
        return true;
    }
    fontmgr.set_ui_style = set_ui_style;
    function set_ui_font(ui) {
        for (var i = 0; i < ui.numChildren; ++i) {
            var comp = ui.getChildAt(i);
            if (comp instanceof (Laya.TextInput)) {
                comp.font = ins().FONT_NAME;
            }
            else {
                if (comp instanceof (Laya.Label)) {
                    comp.font = ins().FONT_NAME;
                }
                else if (comp instanceof (Laya.Button)) {
                    var btn = comp;
                    btn.labelFont = ins().FONT_NAME;
                }
                else {
                    if (comp instanceof (Laya.Node)) {
                        set_ui_font(comp);
                    }
                }
            }
        }
    }
    fontmgr.set_ui_font = set_ui_font;
})(fontmgr || (fontmgr = {}));
//# sourceMappingURL=fontmgr.js.map
var frametask;
(function (frametask) {
    function task_comp(a, b) {
        if (a.m_weight > b.m_weight) {
            return 1;
        }
        return 0;
    }
    var task = /** @class */ (function () {
        function task(c, f, weight, id) {
            this.m_caller = null;
            this.m_func = null;
            this.m_max_weight = 0;
            this.m_id = 0;
            this.m_weight = 0;
            this.m_caller = c;
            this.m_func = f;
            this.m_max_weight = weight;
            this.m_weight = this.m_max_weight;
            this.m_id = id;
        }
        task.prototype.run = function (delta) {
            if (this.m_weight > 0 && delta < 0) {
                this.m_weight -= 1;
                return;
            }
            this.m_func.apply(this.m_caller);
            this.m_weight = this.m_max_weight;
        };
        return task;
    }());
    var task_mgr = /** @class */ (function () {
        function task_mgr() {
            this.m_tlist = new Array();
            this.m_task_count = 0;
        }
        task_mgr.prototype.sort = function () {
            this.m_tlist.sort(task_comp);
        };
        task_mgr.prototype.run = function (delta) {
            var start_time = laya.utils.Browser.now();
            var cur_time;
            this.sort();
            for (var _i = 0, _a = this.m_tlist; _i < _a.length; _i++) {
                var i = _a[_i];
                cur_time = laya.utils.Browser.now();
                delta = delta + start_time - cur_time;
                start_time = cur_time;
                i.run(delta);
            }
        };
        task_mgr.prototype.add_task = function (caller, call_func, weight) {
            if (weight === void 0) { weight = 1; }
            this.del_task(caller, call_func);
            this.m_tlist.push(new task(caller, call_func, weight, this.m_task_count));
            this.m_task_count += 1;
        };
        task_mgr.prototype.del_task = function (caller, call_func) {
            for (var i = this.m_tlist.length - 1; i >= 0; --i) {
                if (this.m_tlist[i].m_caller == caller && this.m_tlist[i].m_func == call_func) {
                    this.m_tlist.splice(i, 1);
                }
            }
        };
        return task_mgr;
    }());
    var g_task_ins = null;
    function ins() {
        if (g_task_ins == null) {
            g_task_ins = new task_mgr();
        }
        return g_task_ins;
    }
    function add_task(caller, call_func, weight) {
        if (weight === void 0) { weight = 1; }
        ins().add_task(caller, call_func, weight);
    }
    frametask.add_task = add_task;
    function del_task(caller, call_func) {
        ins().del_task(caller, call_func);
    }
    frametask.del_task = del_task;
    function run(delta) {
        ins().run(delta);
    }
    frametask.run = run;
})(frametask || (frametask = {}));
//# sourceMappingURL=frametask.js.map
var fsm;
(function (fsm) {
    var fsm_state_base = /** @class */ (function () {
        function fsm_state_base() {
            this.m_start_id = 0;
            this.m_event_id = 0;
            this.m_end_id = 0;
            this.m_desc = "unknown state";
            this.m_caller = null;
            this.m_func = null;
        }
        fsm_state_base.prototype.re_init = function (sid, e, eid, desc, caller, func) {
            this.m_start_id = sid;
            this.m_event_id = e;
            this.m_end_id = eid;
            this.m_desc = desc;
            this.m_caller = caller;
            this.m_func = func;
        };
        fsm_state_base.prototype.dispose = function () {
            this.m_caller = null;
            this.m_func = null;
        };
        return fsm_state_base;
    }());
    fsm.fsm_state_base = fsm_state_base;
    var fsm_base = /** @class */ (function () {
        function fsm_base() {
            this.m_cur_state = 0;
            this.m_fsm_group = new Object();
        }
        fsm_base.prototype._genkey = function (sid, e) {
            return sid * 10000 + e;
        };
        fsm_base.prototype.set_state = function (sid, e, eid, desc, caller, func) {
            var key = this._genkey(sid, e);
            var new_state = utils.getitembycls("fsm_state_base", fsm_state_base);
            new_state.re_init(sid, e, eid, desc, caller, func);
            this.m_fsm_group[key] = new_state;
        };
        fsm_base.prototype.clear_state = function () {
            for (var _i = 0, _a = Object.keys(this.m_fsm_group); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_fsm_group.hasOwnProperty(key)) {
                    var s = this.m_fsm_group[parseInt(key)];
                    utils.recover("fsm_state_base", s);
                }
            }
            this.m_fsm_group = new Object();
            this.m_cur_state = 0;
        };
        fsm_base.prototype.start = function (sid) {
            this.m_cur_state = sid;
        };
        fsm_base.prototype.next = function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var key = this._genkey(this.m_cur_state, e);
            var state = this.m_fsm_group[key];
            while (state != null) {
                var next_state = state.m_end_id;
                var ret = true;
                if (state.m_func != null) {
                    ret = state.m_func.apply(this, args);
                }
                if (ret) {
                    this.m_cur_state = next_state;
                }
                return this.m_cur_state;
            }
            return -1;
        };
        fsm_base.prototype.dispose = function () {
            this.clear_state();
        };
        return fsm_base;
    }());
    fsm.fsm_base = fsm_base;
})(fsm || (fsm = {}));
//# sourceMappingURL=fsm.js.map
var base;
(function (base) {
    var HYPERLINK_TYPE;
    (function (HYPERLINK_TYPE) {
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_CHAPTER_HELP"] = 1] = "TYPE_CHAPTER_HELP";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_SUMMON_DISPLAY"] = 2] = "TYPE_SUMMON_DISPLAY";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_WILD_BOSS"] = 3] = "TYPE_WILD_BOSS";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_GANG_RECRUIT"] = 4] = "TYPE_GANG_RECRUIT";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_GANG_BOSS"] = 5] = "TYPE_GANG_BOSS";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_JOIN_TEAM"] = 6] = "TYPE_JOIN_TEAM";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_COMMON_BOSS"] = 7] = "TYPE_COMMON_BOSS";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_OPEN_GANG_MAP"] = 17] = "TYPE_OPEN_GANG_MAP";
        HYPERLINK_TYPE[HYPERLINK_TYPE["TYPE_OPEN_PLAYER_INFO"] = 18] = "TYPE_OPEN_PLAYER_INFO";
    })(HYPERLINK_TYPE = base.HYPERLINK_TYPE || (base.HYPERLINK_TYPE = {}));
})(base || (base = {}));
//# sourceMappingURL=hyperlink.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var icon_mgr;
(function (icon_mgr) {
    //玩家描述
    var icon_bitmap = /** @class */ (function (_super) {
        __extends(icon_bitmap, _super);
        function icon_bitmap() {
            var _this = _super.call(this) || this;
            _this.m_ref_count = 0;
            _this.m_icon_path = "";
            _this.m_b_loaded = false;
            _this.m_b_loading = false;
            _this.m_owner = null;
            _this.m_id = 0;
            return _this;
        }
        icon_bitmap.prototype.addref = function () {
            this.m_ref_count += 1;
        };
        icon_bitmap.prototype.loadres = function () {
            if (this.m_b_loaded) {
                return;
            }
            this.m_b_loading = true;
            this.loadImage(this.m_icon_path, 0, 0, 0, 0, Laya.Handler.create(this, this.on_loaded));
        };
        icon_bitmap.prototype.on_loaded = function (ud) {
            if (ud === void 0) { ud = null; }
            this.m_b_loading = false;
            this.m_b_loaded = true;
        };
        icon_bitmap.prototype.delref = function () {
            this.m_ref_count -= 1;
        };
        icon_bitmap.prototype.can_release = function () {
            if (this.m_b_loading) {
                return false;
            }
            if (this.m_ref_count > 0) {
                return false;
            }
            return true;
        };
        icon_bitmap.prototype.dispose = function () {
            this.m_owner.recover_iconbm(this);
        };
        return icon_bitmap;
    }(Laya.Sprite));
    var icon_sub_set = /** @class */ (function () {
        function icon_sub_set() {
            this.m_atlas_path = "";
            this.m_prefix = "";
            this.m_b_loaded = false;
            this.m_b_loading = false;
            this.m_loaderrorcount = 0;
            this.m_start_id = 0;
            this.m_end_id = 0;
            this.m_iconbm_idle = new Object();
            this.m_iconbm_used = new Object();
            this.m_idle_num = 0;
            this.m_used_num = 0;
        }
        icon_sub_set.prototype.has_id = function (id) {
            return id >= this.m_start_id && id <= this.m_end_id;
        };
        icon_sub_set.prototype.get_icon = function (id) {
            if (this.has_id(id) == false) {
                return null;
            }
            var ret = null;
            var arr = null;
            if (this.m_iconbm_idle.hasOwnProperty(id.toString())) {
                arr = this.m_iconbm_idle[id];
                if (arr.length > 0) {
                    ret = arr.shift();
                }
                if (arr.length <= 0) {
                    delete this.m_iconbm_idle[id];
                    this.m_idle_num -= 1;
                }
            }
            if (ret == null) {
                ret = new icon_bitmap();
                ret.m_id = id;
                ret.m_owner = this;
                var filename = id.toString();
                //filename = (Array(5).join('0')+id.toString()).slice(-5);
                ret.m_icon_path = this.m_prefix + filename + '.png';
            }
            if (this.m_iconbm_used.hasOwnProperty(id.toString()) == false) {
                this.m_iconbm_used[id] = new Array();
                this.m_used_num += 1;
            }
            this.m_iconbm_used[id].push(ret);
            if (this.m_b_loaded) {
                if (ret.m_b_loaded == false) {
                    ret.loadres();
                }
            }
            else {
                if (!this.m_b_loading) {
                    this.loadres();
                }
            }
            return ret;
        };
        icon_sub_set.prototype.loadres = function () {
            if (this.m_b_loaded) {
                return;
            }
            this.m_b_loading = true;
            Laya.loader.on(Laya.Event.ERROR, this, this.on_error);
            core.myload(this.m_atlas_path, Laya.Handler.create(this, this.on_loaded), null, Laya.Loader.ATLAS, 2);
        };
        icon_sub_set.prototype.on_error = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.on_error);
            this.m_loaderrorcount += 1;
            this.m_b_loaded = false;
            this.m_b_loading = false;
        };
        icon_sub_set.prototype.on_loaded = function (ud) {
            if (ud === void 0) { ud = null; }
            Laya.loader.off(Laya.Event.ERROR, this, this.on_error);
            this.m_b_loaded = true;
            this.m_b_loading = false;
            for (var _i = 0, _a = Object.keys(this.m_iconbm_used); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_iconbm_used.hasOwnProperty(key)) {
                    var arr = this.m_iconbm_used[parseInt(key)];
                    for (var i = arr.length - 1; i >= 0; --i) {
                        var iconbm = arr[i];
                        if (iconbm.m_ref_count > 0 && iconbm.m_b_loaded == false) {
                            iconbm.loadres();
                        }
                    }
                }
            }
        };
        icon_sub_set.prototype.recover_iconbm = function (bm) {
            var id = bm.m_id;
            var arr = null;
            if (this.m_iconbm_used.hasOwnProperty(id.toString())) {
                arr = this.m_iconbm_used[id];
            }
            else {
                core.game_tiplog("icon sub set recover iconbm error!the used array of specify id is not exist! ", id);
            }
            var b_removed = false;
            for (var i = arr.length - 1; i >= 0; --i) {
                if (arr[i] == bm) {
                    arr.splice(i, 1);
                    b_removed = true;
                    if (arr.length <= 0) {
                        delete this.m_iconbm_used[id];
                        this.m_used_num -= 1;
                    }
                    break;
                }
            }
            if (!b_removed) {
                core.game_tiplog("icon sub set recover iconbm error!the used array of specify id has not this icon_bitmap! ", id);
            }
            if (this.m_iconbm_idle.hasOwnProperty(id.toString()) == false) {
                this.m_iconbm_idle[id] = new Array();
                this.m_idle_num += 1;
            }
            arr = this.m_iconbm_idle[id];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var i = arr_1[_i];
                if (i == bm) {
                    core.game_tiplog("icon sub set recover iconbm error!the idle array of specify id already has this icon_bitmap! ", id);
                    return;
                }
            }
            arr.push(bm);
        };
        icon_sub_set.prototype.check_release = function () {
            for (var _i = 0, _a = Object.keys(this.m_iconbm_idle); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.m_iconbm_idle.hasOwnProperty(key)) {
                    var arr = this.m_iconbm_idle[parseInt(key)];
                    for (var i = arr.length - 1; i >= 0; --i) {
                        var iconbm = arr[i];
                        if (iconbm.can_release()) {
                            iconbm.m_owner = null;
                            iconbm.destroy();
                            arr.splice(i, 1);
                        }
                    }
                    if (arr.length <= 0) {
                        delete this.m_iconbm_idle[parseInt(key)];
                        this.m_idle_num -= 1;
                    }
                }
            }
            if (this.m_b_loaded && this.m_idle_num == 0 && this.m_used_num == 0) {
                Laya.loader.clearRes(this.m_atlas_path, true);
                this.m_b_loaded = false;
                core.game_tiplog("icon sub set check_release release atlas res! ", this.m_atlas_path);
            }
        };
        icon_sub_set.prototype.dispose = function () {
        };
        return icon_sub_set;
    }());
    var icon_set = /** @class */ (function () {
        function icon_set() {
            this.m_sub_list = new Array();
        }
        icon_set.prototype.get_set_by_id = function (id) {
            for (var _i = 0, _a = this.m_sub_list; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.has_id(id)) {
                    return i;
                }
            }
            return null;
        };
        icon_set.prototype.add_set = function (start_id, end_id, atlas, prefix) {
            var new_set = new icon_sub_set();
            new_set.m_start_id = start_id;
            new_set.m_end_id = end_id;
            new_set.m_atlas_path = atlas;
            new_set.m_prefix = prefix;
            this.m_sub_list.push(new_set);
            return true;
        };
        icon_set.prototype.get_icon = function (id) {
            var ret = null;
            var set = this.get_set_by_id(id);
            if (set != null) {
                ret = set.get_icon(id);
            }
            return ret;
        };
        icon_set.prototype.check_release = function () {
            for (var _i = 0, _a = this.m_sub_list; _i < _a.length; _i++) {
                var i = _a[_i];
                i.check_release();
            }
        };
        icon_set.prototype.dispose = function () {
        };
        return icon_set;
    }());
    var icon_obj = /** @class */ (function (_super) {
        __extends(icon_obj, _super);
        function icon_obj() {
            var _this = _super.call(this) || this;
            _this.m_bitmap = null;
            _this.m_iconmgr = null;
            return _this;
        }
        icon_obj.prototype.set_bitmap = function (bm, imgr) {
            if (imgr == null) {
                return;
            }
            this.m_iconmgr = imgr;
            this._clear_bitmap();
            this.m_bitmap = bm;
            if (this.m_bitmap != null) {
                this.m_bitmap.addref();
                this.addChild(this.m_bitmap);
            }
        };
        icon_obj.prototype.addref = function () {
            if (this.m_bitmap != null) {
                this.m_bitmap.addref();
            }
        };
        icon_obj.prototype.delref = function () {
            if (this.m_bitmap != null) {
                this.m_bitmap.delref();
            }
        };
        icon_obj.prototype._clear_bitmap = function () {
            if (this.m_bitmap != null) {
                this.removeChild(this.m_bitmap);
                this.m_bitmap.delref();
                this.m_bitmap.dispose();
                this.m_bitmap = null;
            }
        };
        icon_obj.prototype.dispose = function () {
            this._clear_bitmap();
            if (this.m_iconmgr != null) {
                this.m_iconmgr = null;
            }
        };
        return icon_obj;
    }(Laya.Sprite));
    icon_mgr.icon_obj = icon_obj;
    var iconmgr = /** @class */ (function () {
        function iconmgr() {
            this.m_item_set = new icon_set();
            this.m_buff_set = new icon_set();
            this.m_head_set = new icon_set();
            this.m_skill_set = new icon_set();
            this.m_other_set = new icon_set();
            this.m_b_inited = false;
        }
        iconmgr.prototype.init_set_config = function (cfg, set) {
            for (var _i = 0, cfg_1 = cfg; _i < cfg_1.length; _i++) {
                var i = cfg_1[_i];
                var filepath = i["file"];
                var prefix = i["prefix"];
                var start = parseInt(i["start"]);
                var end = parseInt(i["end"]);
                set.add_set(start, end, filepath, prefix);
            }
        };
        iconmgr.prototype.init_config = function (func) {
            if (this.m_b_inited) {
                return;
            }
            this.m_b_inited = true;
            var cfg = null;
            cfg = func("item");
            this.init_set_config(cfg["data"], this.m_item_set);
            cfg = func("buff");
            this.init_set_config(cfg["data"], this.m_buff_set);
            cfg = func("head");
            this.init_set_config(cfg["data"], this.m_head_set);
            cfg = func("skill");
            this.init_set_config(cfg["data"], this.m_skill_set);
            cfg = func("other");
            this.init_set_config(cfg["data"], this.m_other_set);
            return true;
        };
        iconmgr.prototype.get_item = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_item_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_buff = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_buff_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_head = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_head_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_skill = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_skill_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.get_other = function (id) {
            var ret = utils.getitembycls("icon_obj", icon_obj);
            var bm = this.m_other_set.get_icon(id);
            ret.set_bitmap(bm, this);
            return ret;
        };
        iconmgr.prototype.check_release = function () {
            this.m_item_set.check_release();
            this.m_head_set.check_release();
            this.m_buff_set.check_release();
            this.m_skill_set.check_release();
            this.m_other_set.check_release();
        };
        iconmgr.prototype.recover_icon = function (item) {
            utils.recover("icon_obj", item);
        };
        iconmgr.prototype.dispose = function () {
        };
        return iconmgr;
    }());
    var g_iconmgr = null;
    function icon_ins() {
        if (g_iconmgr == null) {
            g_iconmgr = new iconmgr();
        }
        return g_iconmgr;
    }
    icon_mgr.icon_ins = icon_ins;
    function fastset_icon(tp, id, grid, b_small) {
        if (b_small === void 0) { b_small = true; }
        if (grid == null) {
            return null;
        }
        var icon = null;
        switch (tp) {
            case 0:
                icon = icon_ins().get_item(id);
                break;
            case 1:
                icon = icon_ins().get_buff(id);
                break;
            case 2:
                icon = icon_ins().get_head(id);
                break;
            case 3:
                icon = icon_ins().get_skill(id);
                break;
            case 4:
                icon = icon_ins().get_other(id);
                break;
            default:
                return null;
        }
        icon.name = "this_is_iconmgr_gen_icon";
        var rate = 1.0;
        if (b_small) {
            rate = 0.5;
        }
        icon.scale(rate, rate, true);
        grid.addChild(icon);
        return icon;
    }
    function fastset_item_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(0, id, grid, b_small);
    }
    icon_mgr.fastset_item_icon = fastset_item_icon;
    function fastset_buff_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(1, id, grid, b_small);
    }
    icon_mgr.fastset_buff_icon = fastset_buff_icon;
    function fastset_head_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(2, id, grid, b_small);
    }
    icon_mgr.fastset_head_icon = fastset_head_icon;
    function fastset_skill_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(3, id, grid, b_small);
    }
    icon_mgr.fastset_skill_icon = fastset_skill_icon;
    function fastset_other_icon(id, grid, caller, b_small) {
        if (b_small === void 0) { b_small = false; }
        fastdel_icon(grid);
        return fastset_icon(4, id, grid, b_small);
    }
    icon_mgr.fastset_other_icon = fastset_other_icon;
    function get_item(id) {
        return icon_ins().get_item(id);
    }
    icon_mgr.get_item = get_item;
    function get_buff(id) {
        return icon_ins().get_buff(id);
    }
    icon_mgr.get_buff = get_buff;
    function get_head(id) {
        return icon_ins().get_head(id);
    }
    icon_mgr.get_head = get_head;
    function get_skill(id) {
        return icon_ins().get_skill(id);
    }
    icon_mgr.get_skill = get_skill;
    function get_other(id) {
        return icon_ins().get_other(id);
    }
    icon_mgr.get_other = get_other;
    function fastdel_icon(grid) {
        if (grid == null) {
            return;
        }
        var icon = grid.getChildByName("this_is_iconmgr_gen_icon");
        if (icon != null) {
            grid.removeChild(icon);
            icon.dispose();
        }
        return;
    }
    icon_mgr.fastdel_icon = fastdel_icon;
    function init_icon_config(cfg_func) {
        icon_ins().init_config(cfg_func);
    }
    icon_mgr.init_icon_config = init_icon_config;
    function check_release() {
        icon_ins().check_release();
    }
    icon_mgr.check_release = check_release;
})(icon_mgr || (icon_mgr = {}));
//# sourceMappingURL=iconmgr.js.map
var base;
(function (base) {
    // 物品类
    var Item = /** @class */ (function () {
        function Item() {
            this.m_id = 0; //唯一id
            this.m_shape = 0; //类型
            this.m_name = ""; //名字
            this.m_type = 0; //类型
            this.m_quality = 0; //品质
            this.m_amount = 0; //数量
            this.m_lv = 0; //穿戴等级
            this.m_icon = 0; //icon编号
            this.m_rim = 0; //初始边框
            this.m_desc = ""; //文字描述
            this.m_pos = 0; //位置
            this.m_score = 0; //评分
            this.m_prop_arr = []; //属性
            this.m_use = 0; //使用标记
            this.m_b_own = false; //是否拥有
            this.m_cps_num = 0; //合成所需数量
            this.m_add_lv = 0; //附加等级，配合附加属性
            this.m_add_prop_arr = []; //附加属性
            this.m_jlv = 0; //阶数
        }
        Item.prototype.dispose = function () {
        };
        return Item;
    }());
    base.Item = Item;
    //器灵
    var Qiling = /** @class */ (function () {
        function Qiling() {
            this.m_lv = 0; //等级
            this.m_pos = 0; //位置
            this.m_battle = 0; //战力
            this.m_jp_prop = []; //极品属性
        }
        return Qiling;
    }());
    base.Qiling = Qiling;
})(base || (base = {}));
//# sourceMappingURL=item.js.map
var game_lang;
(function (game_lang) {
    game_lang.L_LOADING_TIPS_MAP = {
        0: "万圣公主买了一辆南瓜马车",
        1: "孙悟空正在穿虎皮小短裙",
        2: "唐僧念完了一段大悲咒",
        3: "白龙马在挑选马蹄铁",
        4: "猪八戒走在去高老庄的路上",
        5: "沙和尚深深的打了一个哈欠",
        6: "主城在做最后的装修",
        7: "蜘蛛精正在做美甲",
        8: "白骨精在物色新的皮囊",
        9: "牛魔王急匆匆的赶向积雷山",
        10: "铁扇公主给了红孩儿一巴掌",
        11: "大雁神塔中传来了嘈杂的声音",
        12: "无名鬼城好像有什么正在醒来",
        13: "普陀山的大门徐徐打开",
        14: "竞技场的钟声渐渐传来",
        15: "嫦娥在研究兔子的十种炖法",
        16: "黑无常正在涂BB霜",
        17: "白无常正在晒日光浴",
    };
})(game_lang || (game_lang = {}));
var game;
(function (game) {
    game.PROP_MAP = {
        0x80: "生命",
        0x81: "攻击",
        0x82: "防御",
        0x83: "速度",
        0x84: "暴击",
        0x85: "抗暴",
        0x86: "命中",
        0x87: "闪避",
        0x90: "真实伤害",
        0x91: "真实免伤",
        0x92: "伤害增加",
        0x93: "伤害减免",
        0x94: "暴伤增加",
        0x95: "暴伤减免",
        0x96: "PVP增伤",
        0x97: "PVP免伤",
        0x98: "PVE增伤",
        0x99: "PVE免伤",
        0xb0: "战力"
    };
    game.PROP_KEY_MAP = {
        "hp": "生命",
        "atk": "攻击",
        "def": "防御",
        "spd": "速度",
        "cri": "暴击",
        "res": "抗暴",
        "hit": "命中",
        "dod": "闪避",
        "dura": "耐久",
        "armor": "护甲",
        "stam": "体力",
    };
    // 常用提示
    game.L_SHIJIE = "世界";
    game.L_BANGPAI = "帮派";
    game.L_XITONG = "系统";
    game.L_KUAFU = "跨服";
    game.L_YEAR = "年";
    game.L_MONTH = "月";
    game.L_DAY = "日";
    game.L_TIAN = "天";
    game.L_XIAOSHI = "小时";
    game.L_SHI = "时";
    game.L_FEN = "分";
    game.L_MIAO = "秒";
    game.L_WAN = "万";
    game.L_YI = "亿";
    game.L_GUAN = "关";
    game.L_WU = "无";
    game.L_REN = "人";
    game.L_JINRU = "进入";
    game.L_JIBAI = "击败";
    game.L_JIANGLI = "奖励";
    game.L_HUODELE = "获得";
    game.L_VIP = "VIP";
    game.L_MONTHCARD = "月卡";
    game.L_FOREVERCARD = "终身卡";
    game.L_JI = "级";
    game.L_NAN = "男";
    game.L_NV = "女";
    game.L_DI = "第";
    game.L_MING = "名";
    game.L_LV = "Lv.";
    game.L_SCORE = "评分: ";
    game.L_DADAO = "达到";
    game.L_JIE = "阶";
    game.L_KELINGQU = "可领取";
    game.L_PINGFEN = "评分";
    game.L_BUWEI = "部位";
    game.L_DENGJI = "等级";
    game.L_CSBZ = "次数不足";
    game.L_EXP = "经验";
    game.L_TEQUAN = "特权";
    game.L_SHOUCHONG = "首充";
    game.L_TEMAI = "特卖";
    game.L_MORE = "再";
    game.L_DANG = "档";
    game.L_NEED = "需";
    game.L_NODATA = "暂无数据";
    game.L_NICHENG = "昵称";
    game.L_ZHANLI = "战力";
    game.L_RENSHU = "人数";
    game.L_WIN = "胜场：";
    game.L_LOSE = "败场：";
    game.L_SHENGLV = "胜率：";
    game.L_YBSLBZ = "元宝不足";
    game.L_BDYBSLBZ = "绑定元宝不足";
    game.L_YZSLBZ = "银子不足";
    game.L_COSTGOLDTIPS = "当前绑定元宝不足，是否花费元宝补足？";
    game.L_YBBZ = "元宝不足，是否前往充值？";
    game.L_LVMAX = "已达到最高等级";
    game.L_LVMAX2 = "已满级";
    game.L_UNLEARNED = "未学习";
    game.L_ZANWEIKAIFANG = "暂未开放";
    game.L_WANCHENG = "完成";
    game.L_WEIWANCHENG = "未完成";
    game.L_WEIJIHUO = "未激活";
    game.L_JIHUO = "激活";
    game.L_WSUCCESS = "成功";
    game.L_WFAIL = "失败";
    game.L_BANGGONG = "帮贡";
    game.L_ZAIXIAN = "在线";
    game.L_LIXIAN = "离线";
    game.L_LIXIANSHIJIAN = "离线时间";
    game.L_LNONE = "不足";
    game.L_DENGJIBUZU = "帮派等级不足";
    game.L_SHOUYICISHUBUZU = "收益次数不足";
    game.L_SHIFOUTUICHUDUIWU = "正在其他队伍中，是否退出原队伍";
    game.L_ZHENGZAIQITADUIWUZHZONG = "正在其他队伍中，无法加入";
    game.L_YIJINGZAIDUIWUZHONG = "已经在队伍中";
    game.L_KUOHAOWU = "（无）";
    game.L_WAITINGPLEASE = "敬请期待";
    game.L_BUKEQIUZHU = "已无次数，不可发起求助";
    game.L_NOBUYGROWUP = "你尚未购买成长基金";
    game.L_YBSLBZGOBUY = "元宝不足，请充值购买";
    game.L_TOMORROWGET = "明天再来领取奖励吧";
    game.L_HAVEBUY = "已购买";
    game.L_CROSSSERVERBAN = "跨服不允许此操作";
    game.L_WARBAN = "当前战斗不允许此操作";
    game.L_SENDOK = "发送成功";
    game.L_WAIT = "请稍后再试";
    // 常用提示end
    // 按钮文字
    game.BTNLABELQL = "领   取";
    game.BTNLABELYQL = "已领取";
    game.BTNLABELQWJS = "前往击杀";
    game.TABBTNSTRINGZB = "装 备";
    game.TABBTNSTRINGJN = "技 能";
    game.TABBTNSTRINGZQ = "坐 骑";
    game.TABBTNSTRINGYY = "羽 翼";
    game.TABBTNSTRINGSJ = "升 级";
    game.TABBTNSTRINGDS = "打 书";
    game.TABBTNSTRINGGH = "光 环";
    game.TABBTNSTRINGSL = "兽 魂";
    game.TABBTNSTRINGXL = "仙 侣";
    game.TABBTNSTRINGSX = "升 星";
    game.TABBTNSTRINGXW = "仙 阵";
    game.TABBTNSTRINGXZ = "境 界";
    game.TABBTNSTRINGGW = "光 武";
    game.TABBTNSTRINGJL = "精 灵";
    game.TABBTNSTRINGDY = "丹 药";
    game.TABBTNSTRINGJM = "经 脉";
    game.BTNSHENQING = "申  请";
    game.BTNTONGGUO = "通  过";
    game.BTNJUJUE = "拒  绝";
    game.BTNTICHU = "踢  出";
    game.BTNSHEZHIZHIWEI = "设置职位";
    game.BTNSHENGJI = "升  阶";
    game.BTNZIDONGSHENGJI = "自动升阶";
    game.BTNZIDONGSHENGJI2 = "自动升级";
    game.BTNQUXIAOZIDONG = "取消自动";
    game.BTNJIHUO = "激  活";
    game.BTNHUANHUA = "幻  化";
    game.BTNTUPO = "突  破";
    game.L_BTNQIANWANG = "前  往";
    game.L_BTNSHIYONG = "使  用";
    game.L_BTNHECHENG = "合  成";
    game.L_BTNZHANSHI = "展示";
    // 按钮文字end
    game.L_DEFAULT_SIGN = "一起加油吧"; // 默认签名
    game.L_SHENGYU = "剩余";
    game.L_CI = "次";
    game.L_QUEDING = "确定";
    game.L_XIUXI = "休息";
    game.L_CANZHAN = "参战";
    game.L_SHENGYUSHIJIAN = "剩余时间";
    game.L_WEIKAIQI = "未开启";
    game.L_JICHUSHUXING = "基础属性";
    game.L_FUJIASHUXING = "附加属性";
    game.L_SHULIANG = "数量";
    game.L_SHULIANGBUZU = "数量不足";
    game.L_YOUJIAN = "邮件";
    game.L_HAOYOU = "好友";
    game.L_GEXINGQIANMING = "默认个性签名";
    game.L_BANGDINGYUANBAO = "绑定元宝";
    game.L_BAGNOTENOUGH = "当前背包装备空位不足，是否进行熔炼？";
    game.L_RONGLIANVIP8 = "VIP8以上才能开启自动熔炼";
    game.L_CHAPTER0 = "今日被协助次数已满";
    game.L_CHAPTER1 = "累积星星数未达到要求";
    game.L_CHAPTER2 = "协助请求每30秒只能发布一次";
    game.L_CHAPTER3 = "江湖救急";
    game.L_CHAPTER4 = "求大神帮过";
    game.L_MAIN0 = "预加载资源失败";
    game.L_MAIN1 = "加载场景资源失败";
    game.L_LOGIN0 = "请输入登录账号";
    game.L_LOGIN1 = "请输入登录密码";
    game.L_LOGIN2 = "请选择登录服务器";
    // export const L_PATROL0:string = "巡逻关闭";
    // export const L_PATROL1:string = "巡逻打开";
    game.L_WACCOUNT0 = "请输入登录账号";
    game.L_WCHANGENAME0 = "请输入昵称";
    game.L_WCHANGENAME1 = "首次改名免费，每天仅可修改一次";
    game.L_WCHANGENAME2 = "本次改名需要消耗200元宝，每天仅可修改一次";
    game.L_WCHANGENAME3 = "秒后自动创建角色并进入游戏";
    game.L_WCHANGENAME4 = "昵称过长，请重新输入";
    game.L_WCHANGENAME5 = "宠物改名免费，最多输入4个字";
    game.L_WCHAPTERBTN0 = "前往新地图";
    game.L_WCHAPTERBTN1 = "已全部通关\n请期待新图";
    game.L_WCHAPTERMAIN0 = "已求助次数";
    game.L_WCHAPTERMAIN1 = "已协助他人次数";
    game.L_WCHAPTERMAIN2 = "波小怪后即可挑战BOSS";
    game.L_WCOMMONBOSS0 = "后重生";
    game.L_WCOMMONBOSS1 = "正在战斗中，请稍后再挑战";
    game.L_WCOMMONBOSS2 = "数量不足";
    game.L_WCOMMONBOSS3 = "争夺人数";
    game.L_WCOMMONBOSS4 = "级可挑战";
    game.L_SFHF = "是否花费";
    game.L_BYWC = "元宝完成";
    game.L_BYZH = "元宝找回";
    game.L_HRW = "环任务";
    game.L_SY = "所有";
    game.L_JX = "进行";
    game.L_WDAILY300_0 = "当前环数";
    game.L_WDAILY300_1 = "当前没有可领取的奖励";
    game.L_WDAILY300_3 = "VIP6以上开启";
    game.L_WDAILY300_4 = "任务已完成";
    game.L_WDAILY300_7 = "完成100环奖励";
    game.L_WDAILY300_8 = "完成200环奖励";
    game.L_WDAILY300_9 = "完成300环奖励";
    game.L_WDAILYFUMO0 = "当前环数";
    game.L_WDAILYFUMO2 = "任务已全部完成";
    game.L_WDAILYFUMO6 = "当前地图没有可以挑战的妖怪";
    game.L_WMAIN0 = "未读";
    game.L_WMAIN1 = "已读";
    game.L_WMAINEQUIPUI0 = "操作id";
    game.L_WMAINSKILLUI0 = "开启";
    game.L_WMAINSKILLUI1 = "已满级";
    game.L_WMAINSKILLUI2 = "该技能未解锁";
    game.L_WMAINSKILLUI3 = "该技能已满级";
    game.L_WMAINSKILLUI4 = "经验不足";
    game.L_WMAINSKILLUI5 = "技能效果";
    game.L_WMAINSKILLUI6 = "下一级效果";
    game.L_WMAINSKILLUI7 = "操作频率过快 请稍后再试";
    game.L_WMAINSKILLUI8 = "技能不存在";
    game.L_WMAINSKILLUI9 = "经验不足";
    game.L_WMAINSKILLUI10 = "需要人物达到";
    game.L_WMAINSKILLUI11 = "该技能尚未激活";
    game.L_WMAINSKILLUI12 = "资质1级激活";
    game.L_WMAINSKILLUI13 = "没有该等级配置";
    game.L_WZJN = "未知技能";
    game.L_YGWPZJN = "一个未配置的技能";
    game.L_WARENA0 = "您现在无需购买挑战次数";
    game.L_WARENA1 = "不可以挑战自己";
    game.L_WARENA2 = "每天可再购买";
    game.L_WARENA3 = "不变";
    game.L_WARENA4 = "领取奖励";
    game.L_WOFFLINEINCOME0 = "离线时间";
    game.L_WOFFLINEINCOME1 = "最多累积6小时离线收益";
    game.L_WOFFLINEINCOME2 = "背包已满，自动熔炼<span color='#12a710'>";
    game.L_WOFFLINEINCOME3 = "</span>件装备";
    game.L_WGERENBOSS0 = "正在战斗中，请稍后再挑战";
    game.L_WGERENBOSS1 = "剩余次数：0次";
    game.L_WGERENBOSS2 = "剩余次数：1次";
    game.L_WGERENBOSS3 = "级可挑战";
    game.L_WPURCHASEPAGE0 = "限购";
    game.L_WPURCHASEPAGE1 = "尚未解锁";
    game.L_WRANK0 = "未上榜";
    game.L_WRANK1 = "榜上无名，再接再厉";
    game.L_WRONGLIAN0 = "已选";
    game.L_WSHOP0 = "限购";
    game.L_WSHOP1 = "解锁";
    game.L_WSHOP2 = "材料商店";
    game.L_WSHOP3 = "装备商店";
    game.L_WSUMMONCATCHING0 = "捕捉";
    game.L_WSUMMONCATCHING1 = "卡";
    game.L_WSUMMONCATCHING2 = "宠物宝宝逃跑了";
    game.L_WSUMMONCATCHING3 = "获得";
    game.L_WSUMMONCATCHING4 = "你偶遇到了一只宝宝，是否进行抓捕?";
    game.L_WSUMMONCATCHING5 = "当前场景不能进行抓捕";
    game.L_WSUMMONCATCHING6 = "是否领取抓捕奖励";
    game.L_WSUMMONCATCHING7 = "遭遇宠物";
    game.L_WSUMMONCATCHING8 = "#D&，#C18&捕捉成功#D&";
    game.L_WSUMMONCATCHING9 = "#D&，#C20&捕捉失败#D&";
    game.L_WSUMMONCATCHING10 = "是否自动抓宠";
    game.L_WESCORT0 = "押镖中";
    game.L_WESCORT1 = "今天押镖次数已用完";
    game.L_WESCORT2 = "已是最高品质镖车";
    game.L_WESCORT3 = "拦截了我的";
    game.L_WESCORT4 = "复仇";
    game.L_WESCORT5 = "复仇成功";
    game.L_WESCORT6 = "复仇失败";
    game.L_WESCORT7 = "我拦截了";
    game.L_WESCORT8 = "是否花费300元宝立即完成本次押镖";
    game.L_WESCORT9 = "防守失败";
    game.L_WESCORT10 = "防守成功";
    game.L_WESCORT11 = "不能拦截自己的镖车";
    game.L_WESCORT12 = "今天劫镖次数已用完";
    game.L_WESCORT13 = "是否花费1个橙镖令立即刷新至橙色镖车？";
    game.L_WESCORT14 = "是否花费500绑定元宝立即刷新至橙色镖车？";
    game.L_WESCORT15 = "是否花费500元宝立即刷新至橙色镖车？";
    game.L_WESCORT16 = "当前时间段没有双倍奖励，是否仍然押镖？<br/>双倍奖励时间段为每天上午11：00~13:00和<br/>23:00~01:00";
    game.L_WESCORT17 = "开始押镖";
    game.L_WESCORT18 = "一键完成";
    game.L_WESCORTCAR0 = "白色镖车";
    game.L_WESCORTCAR1 = "绿色镖车";
    game.L_WESCORTCAR2 = "蓝色镖车";
    game.L_WESCORTCAR3 = "紫色镖车";
    game.L_WESCORTCAR4 = "橙色镖车";
    game.L_WFIRST0 = "新秀组 (100~119级)";
    game.L_WFIRST1 = "精锐组 (120~139级)";
    game.L_WFIRST2 = "凌云组 (140~159级)";
    game.L_WFIRST3 = "惊世组 (160~179级)";
    game.L_WFIRST4 = "无双组 (180~200级)";
    game.L_WFIRSTEND0 = "本周新秀组冠军";
    game.L_WFIRSTEND1 = "本周精锐组冠军";
    game.L_WFIRSTEND2 = "本周凌云组冠军";
    game.L_WFIRSTEND3 = "本周惊世组冠军";
    game.L_WFIRSTEND4 = "本周无双组冠军";
    game.L_WFIRSTPR3 = "16强晋升8强";
    game.L_WFIRSTPR4 = "8强晋升4强";
    game.L_WFIRSTPR5 = "半决赛";
    game.L_WFIRSTPR6 = "决赛";
    game.L_WFIRST5 = "请选择押注玩家";
    game.L_WFIRST6 = "请选择押注玩家";
    game.L_WFIRSTBET1 = "普通押注";
    game.L_WFIRSTBET2 = "特级押注";
    game.L_WFIRSTBET3 = "超级押注";
    game.L_WFIRSTRR = "正确奖励：";
    game.L_WFIRSTFR = "错误奖励：";
    game.L_WEQUIP0 = "武器";
    game.L_WEQUIP1 = "项链";
    game.L_WEQUIP2 = "护肩";
    game.L_WEQUIP3 = "护腕";
    game.L_WEQUIP4 = "戒子";
    game.L_WEQUIP5 = "头盔";
    game.L_WEQUIP6 = "衣服";
    game.L_WEQUIP7 = "腰带";
    game.L_WEQUIP8 = "裤子";
    game.L_WEQUIP9 = "鞋子";
    game.L_WEQUIP10 = "阶";
    game.L_WEQUIP11 = "未激活";
    game.L_WEQUIP12 = "宝石";
    game.L_WEQUIP13 = "强化";
    game.L_WEQUIP14 = "锻炼";
    game.L_WEQUIP15 = "精炼";
    game.L_WEQUIP16 = "全身强化";
    game.L_WEQUIP17 = "全身锻炼";
    game.L_WEQUIP18 = "全身精炼";
    game.L_WEQUIP19 = "全身宝石";
    game.L_WEQUIP20 = "升阶可提升";
    game.L_WFRIEND0 = "已向对方提出申请，请耐心等待";
    game.L_WFRIEND1 = "发出好友申请，请耐心等待!";
    game.L_WFRIEND2 = "玩家";
    game.L_WFRIEND3 = "请求添加你为好友。";
    game.L_WFRIEND4 = "恭喜与";
    game.L_WFRIEND5 = "成为了好友。";
    game.L_WFRIEND6 = "确定要与";
    game.L_WFRIEND7 = "解除好友关系吗？";
    game.L_WFRIEND8 = "确定要将";
    game.L_WFRIEND9 = "加入屏蔽列表吗？屏蔽后将无法接收到对方的聊天信息与所有消息。";
    game.L_WFRIEND10 = "已达到当日赠送上限";
    game.L_WFRIEND11 = "向您赠送了金币";
    game.L_WFRIEND12 = "已达到当日领取上限";
    game.L_WFRIEND13 = "添加失败，好友数量已达上限";
    game.L_WFRIEND14 = "想经常保持联系就把对方";
    game.L_WFRIEND15 = "加为好友";
    game.L_WFRIEND16 = "吧";
    game.L_WFRIEND17 = "等级不到20，不能添加好友 ";
    game.L_WWORLDMAP0 = "已通关";
    game.L_WWORLDMAP1 = "冒险中...";
    game.L_WWORLDMAP2 = "进入条件<br/>击杀<span color='#12a710'>";
    game.L_WWORLDMAP3 = "</span>所有头目";
    game.L_WWORLDMAP4 = "人物等级需达到";
    game.L_NETCLOSE = "与服务器断开连接，请退出重新登录";
    game.L_NETERROR = "网络出错与服务器断开连接，请退出重新登录";
    game.L_COMMON = "通用";
    game.L_EQUIP_POS_MAP = {
        101: "武器",
        102: "项链",
        103: "护肩",
        104: "护腕",
        105: "戒指",
        106: "头盔",
        107: "衣服",
        108: "腰带",
        109: "裤子",
        110: "鞋子",
        111: "坐骑符文",
        112: "坐骑符文",
        113: "坐骑符文",
        114: "坐骑符文",
        115: "羽翼符文",
        116: "羽翼符文",
        117: "羽翼符文",
        118: "羽翼符文",
        119: "羽翼符文",
        120: "羽翼符文",
        121: "羽翼符文",
        122: "羽翼符文",
        123: "兽魂符文",
        124: "兽魂符文",
        125: "兽魂符文",
        126: "兽魂符文",
        127: "光环符文",
        128: "光环符文",
        129: "光环符文",
        130: "光环符文",
        131: "境界符文",
        132: "境界符文",
        133: "境界符文",
        134: "境界符文",
        135: "光武符文",
        136: "光武符文",
        137: "光武符文",
        138: "光武符文",
        139: "精灵符文",
        140: "精灵符文",
        141: "精灵符文",
        142: "精灵符文",
        159: "器灵武器",
        160: "器灵项链",
        161: "器灵护肩",
        162: "器灵护腕",
        163: "器灵戒指",
        164: "器灵头盔",
        165: "器灵衣服",
        166: "器灵腰带",
        167: "器灵裤子",
        168: "器灵鞋子"
    };
    //宠物/仙侣
    game.SUMMONPROP_TITLE_ARR = ["宠物属性", "资质属性"];
    game.PARTNERPROP_TITLE_ARR = ["仙侣属性"];
    game.L_DQCWWJH = "当前宠物未激活";
    game.L_DQXLWJH = "当前仙侣未激活";
    game.L_LVLESSPLAYER = "等级不能超过人物等级";
    game.L_XLZDJDD = "仙侣总等阶达到";
    game.L_KJH = "阶可激活";
    game.L_JINENGGESHENGJI = "技能格升级";
    //宠物/仙侣end
    //养成
    game.OPEN_LV_ARR = ["2阶激活", "4阶激活", "5阶激活", "7阶激活"];
    game.PROP_TITLE_ARR = ["升阶属性", "符文属性", "技能属性", "皮肤属性", "属性丹属性"];
    game.L_DEVELOPSKILL1 = "坐骑技能";
    game.L_DEVELOPEQUIP1 = "坐骑符文";
    game.L_DEVELOPSKILL2 = "羽翼技能";
    game.L_DEVELOPEQUIP2 = "羽翼符文";
    game.L_DEVELOPSKILL3 = "光环技能";
    game.L_DEVELOPEQUIP3 = "光环符文";
    game.L_DEVELOPSKILL4 = "兽魂技能";
    game.L_DEVELOPEQUIP4 = "兽魂符文";
    game.L_DEVELOPSKILL5 = "仙阵技能";
    game.L_DEVELOPEQUIP5 = "仙阵符文";
    game.L_DEVELOPSKILL6 = "境界技能";
    game.L_DEVELOPEQUIP6 = "境界符文";
    game.L_DEVELOPSKILL7 = "光武技能";
    game.L_DEVELOPEQUIP7 = "光武符文";
    game.L_DEVELOPSKILL8 = "精灵技能";
    game.L_DEVELOPEQUIP8 = "精灵符文";
    game.L_DEVELOPSKIN1 = "皮肤总战力：";
    game.L_DEVELOPSKIN2 = "已激活皮肤：";
    game.L_DEVELOPSKIN3 = "时装总战力：";
    game.L_DEVELOPSKIN4 = "已激活时装：";
    game.L_DEVELOPSKIN5 = "称号总战力：";
    game.L_DEVELOPSKIN6 = "已激活称号：";
    game.L_WEIKAIFANG = "未开放";
    game.L_WEIDASHU = "未打书";
    game.L_BTNDASHU = "打    书";
    //养成end
    game.L_WSUMMONUI0 = "该道具的获取途径";
    game.L_HFYBSX = "是否花费50绑元提升至七星奖励？";
    game.L_SFXH = "是否消耗";
    game.L_CLFB0 = "元宝扫荡？扫荡后可直接获得奖励";
    game.L_CLFB1 = "(超级划算,副本奖励价值远超购买花费)";
    game.L_CLFB2 = "正在战斗中，请稍后再挑战";
    game.L_CLFB3 = "可再扫荡一次";
    game.L_CLFB4 = "今日可扫荡次数：";
    game.L_CLFB5 = "今日可挑战次数：";
    game.L_YWB0 = "主角";
    game.L_YWB1 = "级开启";
    game.L_YWB2 = "你没有足够的挑战券";
    game.L_YWB3 = "BOSS已逃跑";
    game.L_YWB4 = "BOSS已被击杀";
    game.L_DQMYKBCDFA = "当前没有可保存的方案";
    game.L_ZKZG0 = "达到";
    game.L_ZKZG1 = "自动快速加入";
    game.L_ZKZG2 = "秒后";
    game.L_ZKZG3 = "级副本";
    game.L_ZKZG4 = "只有队长可以操作";
    game.L_ZKZG5 = "秒后自动挑战";
    game.L_ZKZG6 = "满员自动开启副本";
    game.L_ZKZG7 = "背包装备空位不足";
    game.L_TREASURE_FB0 = "第";
    game.L_TREASURE_FB1 = "关";
    game.L_TREASURE_FB2 = "藏宝图";
    game.L_TREASURE_FB4 = "秒后自动挖宝";
    game.L_TREASURE_FB5 = "点击自动挖宝";
    game.L_TREASURE_FB6 = "六星";
    game.L_TREASURE_FB7 = "十二星";
    game.L_TREASURE_FB8 = "十八星";
    game.L_TREASURE_FB9 = "没有可挖的宝藏";
    game.L_TREASURE_FB10 = "角色";
    game.L_TREASURE_FB11 = "级开启";
    game.L_TREASURE_FB12 = "通关藏宝图第";
    game.L_TREASURE_FB13 = "章获得";
    game.L_TREASURE_FB14 = "奖励";
    game.L_TOWER_FB0 = "自动挑战";
    game.L_TOWER_FB1 = "关";
    game.L_TOWER_FB2 = "没有可挑战的塔";
    game.L_HEAVEN_FB0 = "首次通关第";
    game.L_HEAVEN_FB1 = "层获得奖励";
    game.L_LVUPRWD_KEY_MAP = {
        0: "坐骑",
        1: "羽翼",
        2: "光武",
        3: "精灵",
        4: "兽魂",
        5: "光环",
        6: "仙阵",
        7: "境界",
        8: "天仙",
        9: "仙器",
        10: "仙云",
        11: "灵气",
    };
    game.L_GANG_INCENSE3 = "银子";
    game.L_GANG_INCENSE4 = "元宝";
    game.L_GANG_INCENSE5 = "绑元";
    game.L_GANG_INCENSE6 = "/60";
    game.L_GANG_INCENSE7 = "香火值可领取";
    game.L_GANG_INCENSE8 = "已上香";
    game.L_GANG_INCENSE9 = "上   香";
    game.L_GANG_INCENSE10 = "上香次数已达上限";
    game.L_GANG_INCENSE11 = "银两不足，不能上香";
    game.L_GANG_INCENSE12 = "绑元不足，不能上香";
    game.L_GANG_INCENSE13 = "元宝不足，不能上香";
    game.L_GANG_ASSISTANT = "帮主";
    game.L_GANG_DEPUTY_ASSISTANT = "副帮主";
    game.L_GANG_NORMAL_MEMBER = "成员";
    game.L_GANG_POSITION_MAP = {
        0: "无职位",
        1: game.L_GANG_ASSISTANT,
        2: game.L_GANG_DEPUTY_ASSISTANT,
        3: game.L_GANG_NORMAL_MEMBER,
    };
    game.L_GANGNO = "你还没有加入帮派";
    game.L_GANGYES = "你已加入帮派";
    game.L_GANGRECORD0 = "本帮成功创建";
    game.L_GANGRECORD1 = "加入了帮派";
    game.L_GANGRECORD2 = "离开了帮派";
    game.L_GANGRECORD3 = "职位调整成";
    game.L_GANGRECORD4 = "被";
    game.L_GANGRECORD5 = "踢出了帮派";
    game.L_GANGRECORD6 = "将帮主禅让给了";
    game.L_GANGRECORD7 = "长期不在线， 帮主退位给";
    game.L_GANGRECORD8 = "本帮帮派等级提升为";
    game.L_GANGRECORD9 = "级";
    game.L_GANGRECORD10 = "变更帮派的名字为";
    game.L_GANGCREATETIPS1 = "请输入帮派名称";
    game.L_GANGCREATETIPS2 = "请选择帮派类别";
    game.L_GANGCREATETIPS3 = "元宝不足，不能创建";
    game.L_GANGCREATETIPS4 = "创建1级帮需要达到vip4";
    game.L_GANGCREATETIPS5 = "创建2级帮需要达到vip6";
    game.L_GANGJOINTIPS1 = "当前无帮派可申请";
    game.L_GANGJOINTIPS2 = "等级不足52级不能申请帮派";
    game.L_GANGTIPS1 = "请输入帮派公告";
    game.L_GANGTIPS2 = "请输入帮派名字";
    game.L_GANGTIPS3 = "请输入有效的战力值";
    game.L_GANGTIPS4 = "需战力：";
    game.L_GANGTIPS5 = "需审核";
    game.L_GANGTIPS6 = "确定将";
    game.L_GANGTIPS7 = "踢出帮派？";
    game.L_GANGTIPS8 = "正在调整";
    game.L_GANGTIPS9 = "的职位，将其设置为？";
    game.L_GANGTIPS10 = "将此玩家设置为帮主，自己退位为普通成员。请谨慎操作";
    game.L_GANGTIPS11 = "将此玩家设置为副帮主";
    game.L_GANGTIPS12 = "将此玩家设置为普通成员";
    game.L_GANGTIPS13 = "当前已有2名副帮主";
    game.L_GANGTIPS14 = "你正在将";
    game.L_GANGTIPS15 = "设置为帮主，设置后自己将成为普通成员，请确认";
    game.L_GANGTIPS16 = "请选择职位";
    game.L_GANGTIPS17 = "确认将离开此帮？帮主之位将禅让给其他人";
    game.L_GANGTIPS18 = "确认将离开此帮？";
    game.L_GANGTIPS19 = "请输入自动申请的战力值";
    game.L_TTXY0 = "层";
    game.L_TTXY1 = "秒后自动挑战";
    game.L_TTXY2 = "自动挑战关卡";
    game.L_TTXY3 = "没有可以挑战的妖魔";
    game.L_TTXY4 = "第";
    game.L_TTXY5 = "层";
    game.L_NUMBERINPUT1 = "请输入有效的数值";
    game.L_GANG_FB0 = "级副本";
    game.L_GANG_FB1 = "级帮派开启";
    game.L_TEXT_INPUT1 = "请输入内容";
    game.L_TEXT_INPUT2 = "（最多可输入20个字）";
    game.L_GANG_BOSS0 = "小于1%";
    game.L_GANG_BOSS1 = "暂无";
    game.L_GANG_BOSS2 = "内击杀boss";
    game.L_GANG_BOSS3 = "秒后自动挑战";
    game.L_GANG_BOSS4 = "自动挑战";
    game.L_GANG_BOSS5 = "是否花费1000元宝立即秒杀BOSS";
    game.L_GANG_BOSS6 = "帮派等级达到";
    game.L_GANG_BOSS7 = "级开启";
    game.L_GANG_BOSS8 = "开启难度：";
    game.L_ACTIVTY_HELP = {
        1: 101,
        6: 102,
        30: 105,
        38: 103,
    };
    game.L_SHEZHICHENGGONG = "设置成功";
    game.L_GANG_LIVELY0 = "今日活跃值达到";
    game.L_GANG_LIVELY1 = "点";
    game.L_GANG_LIVELY2 = "已满级";
    game.L_BAGGRIDNUMMAX = "背包可扩充数量已达上限";
    game.L_NORONGLIAN = "当前无可熔炼的装备";
    game.L_MARRY_NOROLE = "请选择结婚对象";
    game.L_MARRY_NOGRADE = "请选择婚礼类型";
    game.L_MARRY_HUSBAND = "丈夫";
    game.L_MARRY_WIFE = "妻子";
    game.L_MARRY_TIPS = "向您发出求婚";
    game.L_MARRY_TIPS1 = "是否答应他";
    game.L_MARRY_TIPS2 = "获得感情不易，守住感情更难，真的要结束这段姻缘嘛？还请三思呀！";
    game.L_MARRY_TIPS3 = "茫茫人海遇见是缘，真的要拒绝对方的一片心嘛？";
    game.L_MARRY_TIPS4 = "和";
    game.L_MARRY_TIPS5 = "喜结连理";
    game.L_MARRY_TIPS6 = "你与";
    game.L_MARRY_TIPS7 = "在";
    game.L_MARRY_TIPS8 = "结为夫妻";
    game.L_MARRY_TIPS9 = "结婚费用";
    game.L_MARRY_TIPS10 = "结婚奖励";
    game.L_MARRY_TIPS11 = "没有符合结婚条件的好友";
    game.L_MARRY_TIPS12 = "确定消耗";
    game.L_MARRY_TIPS13 = "向新婚燕尔赠送礼金吗？";
    game.L_MARRY_TIPS14 = "赠送礼金后双方都可以获得礼金道具";
    game.L_XY_WALFARE = "未达成领取条件";
    game.L_XY_WALFARE0 = "虚位以待";
    game.L_GOLD_TREASURE_LOT = "正在抽奖中，请稍后再试";
    game.L_LEVEL_GIFT0 = "级礼包";
    game.L_LEVEL_GIFT1 = "级可领取";
    game.L_SIGN_GIFT0 = "可领取";
    game.L_RICH_GIFT0 = "充值";
    game.L_RICH_GIFT1 = "元";
    game.L_RICH_GIFT2 = "价值";
    game.L_RICH_GIFT3 = "元宝";
    game.L_TEXT_RECEIVE = "未达到领取条件，是否前往充值";
    game.L_ANSWER0 = "正确率：";
    game.L_ANSWER1 = "题";
    game.L_ANSWER2 = "答对";
    game.L_ANSWER3 = "道题奖励";
    game.L_PDYW0 = "领   取";
    game.L_PDYW1 = "前往击杀";
    game.L_PDYW2 = "已刷新";
    game.L_PDYW3 = "已击杀";
    game.L_PDYW4 = "已逃跑";
    game.L_FIRSTPLAY0 = "已报名";
    game.L_FIRSTPLAY1 = "第一局";
    game.L_FIRSTPLAY2 = "第二局";
    game.L_FIRSTPLAY3 = "第三局";
    game.L_FIRSTPLAY4 = "第四局";
    game.L_FIRSTPLAY5 = "第五局";
    game.L_FIRSTPLAY6 = "周二晚上";
    game.L_FIRSTPLAY7 = "周三晚上";
    game.L_FIRSTPLAY8 = "周四晚上";
    game.L_FIRSTPLAY9 = "周五晚上";
    game.L_TRAVEL = "游历";
    game.L_RECHSTORE = "可升至";
    game.L_GANG_MAP_TXT0 = "请问是否消耗";
    game.L_GANG_MAP_TXT1 = "元宝直接完成采矿任务？";
    game.L_GANG_MAP_TXT2 = "绑元重置任务？";
    game.L_GANG_MAP_TXT3 = "自己的花只能别人浇灌";
    game.L_GANG_MAP_TXT4 = "浇花次数已满";
    game.L_GANG_MAP_TXT5 = "刷新次数已用完";
    game.L_GANG_MAP_TXT6 = "元宝刷新物品？";
    game.L_GANG_MAP_TXT7 = "所需物品不足";
    game.L_GANG_MAP_TXT9 = "帮派内已经有过多的鲜花了";
    game.L_GANG_MAP_TXT8 = "每天可以帮助其他玩家完成花朵浇灌，帮助其他人可以获得心意礼物，你今天已经完成";
    game.L_GANG_MAP_TXT10 = "该花儿已完成浇灌";
    game.L_GANG_MAP_TXT11 = "场景中已中满花儿";
    game.L_GANG_MAP_TYPE0 = "挖矿中";
    game.L_GANG_MAP_TYPE1 = "种花中";
    game.L_GANG_MAP_TYPE2 = "浇花中";
    game.L_RECEIVED = "已领取";
    game.L_UPRIGHTDAN = "直升丹";
    game.L_SJZSX = "升级总属性";
    game.L_SJZSX2 = "升阶总属性";
    game.L_JCZSX = "加成总属性";
    game.L_ZZZSX = "资质总属性";
    game.L_QYZSX = "奇缘";
    game.L_POORDAY = "还差";
    game.L_JJJL0 = "阶可领取";
    game.L_QMJJ0 = "全民";
    game.L_QMJJ1 = "阶";
    game.L_QMJJ2 = "达到";
    game.L_QMJJ3 = "人";
    game.L_ZKSD0 = "折";
    game.L_ZKSD1 = "阶可购买";
    game.L_XMDX0 = "活动剩余时间：";
    game.L_TUANGOU = "团购";
    game.L_MIANFEI_GET = "免费领取";
    game.L_ANY_GET = "任意金额领取";
    game.L_YUANBAO_GET = "元宝领取";
    game.L_DAY_PAY_PNUM = "今日服务器首充人数达到";
    game.L_JIKE_GET = "人\n即可领取";
    game.L_ANY_MONEY_GET = "人\n且充值任意金额，即可领取";
    game.L_TOTAL_MONEY_GET = "人\n且累计充值";
    game.L_YUANBAO_JIKE_GET = "元宝即可领取";
    game.L_LUCAICHUZI = "鲁菜厨子";
    game.L_SUCAICHUZI = "苏菜厨子";
    game.L_YUECAICHUZI = "粤菜厨子";
    game.L_CHUANCAICHUZI = "川菜厨子";
    game.L_COOKERGOD0 = "完胜精英大奖";
    game.L_COOKERGOD1 = "其它胜利奖励1";
    game.L_COOKERGOD2 = "其它胜利奖励2";
    game.L_COOKERGOD3 = "其它胜利奖励3";
    game.L_ADDGANGFUNDS = "增加帮派资金";
    game.L_SERHGY0 = "开始倒计时：";
    game.L_SERHGY1 = "结束倒计时：";
    game.L_SERHGY2 = "开采人数：";
    game.L_SERHGY3 = "无法挑战该矿点";
    game.L_SERHGY4 = "前往";
    game.L_SERHGY5 = "挑战";
    game.L_SERHGY6 = "开采人数已达上限，请寻找其他矿开采";
    game.L_SERHGY7 = "是否停止开采并前往？";
    game.L_SERHGY8 = "开采";
    game.L_SERHGY9 = "矿点已被敌方占领，请先击败敌方防守者";
    game.L_SERHGY10 = "无法前往，请等待准备时间结束";
    game.L_SERHGY11 = "该区域不可前往";
    game.L_SERHGY12 = "正在开采中";
    game.L_SERHGY13 = "只有队长可以操作";
    game.L_SERHGY14 = "活动已结束";
    game.L_SERHGY15 = "活动暂未开启";
    game.L_SERHGY16 = "活动匹配中";
    game.L_SERHGY17 = "今日活动匹配失败，请下次再来";
    game.L_SERHGY18 = "跨服争霸排行榜暂未开启";
    game.L_RECH0 = "首充送";
    game.L_RECH1 = "充值得";
    game.L_RECH2 = "立返";
    game.L_OTHERPLAYER0 = "删除好友";
    game.L_OTHERPLAYER1 = "添加好友";
    game.L_OTHERPLAYER2 = "解除屏蔽";
    game.L_OTHERPLAYER3 = "屏蔽";
    game.L_SEARCH_ROLE = "请输入昵称或者id";
    game.L_CONTINUE_CONSUME_GET = "累计7天每天消费满8888元宝才可领取大奖";
    game.L_GONGXIJIESUO = "恭喜解锁新";
    game.L_XIANLV = "仙侣";
    game.L_CHONGWU = "宠物";
    game.L_CHENGHAO = "称号";
    game.L_ZAOXING = "造型";
    game.L_DANGQIAN = "当前";
    game.L_WEI = "为";
    game.L_USEGOUPJIE = "阶，使用后将立即提升一阶,是否使用?";
    game.L_GT6JIE = "大于6阶,使用后将获得700经验，是否使用?";
    game.L_SSJ_DI = "第";
    game.L_SSJ_NAN = "难";
    game.L_SSJ_JIE = "劫";
    game.L_SSJ_SHANGWEIKAIQI = "尚未开启";
    game.L_SSJ_HUIHE = "回合";
    game.L_SSJ_HUAFEI = "花费";
    game.L_SSJ_YBKQBX = "元宝开启宝箱可随机获得以下奖励";
    game.L_SSJ_JTHKKQ = "\n今天还可开启";
    game.L_SSJ_CI = "次";
    game.L_SSJ_ZHENGZAIDUIWUZHONG = "正在队伍中";
    game.L_SSJ_QINGXIANTONGGUAN = "请先通关上一劫";
    game.L_WLMZ0 = "对方正在战斗中";
    game.L_WLMZ1 = "51名及以后";
    game.L_INACTIVITY = "正在活动中，无法进入";
    game.L_DIANCIBANGZHU = "点此帮助";
    game.L_GANGFUBEN0 = "发起";
    game.L_GANGFUBEN1 = "级帮派副本，现需各位大侠帮助，感谢大家！";
    game.L_GANGFUBEN2 = "已在世界频道发布求助信息";
    game.L_YWC = "已完成";
    game.L_ZHENGZAIBANGPAINEI = "正在帮派内，无法加入"; //可优化
    game.L_ZHENGZAIKUAFU = "正在跨服，无法加入";
    game.L_ZUDUIZHONG = '组队中';
    game.AIXIYOUAISHENGHUO = '爱西游，爱生活，睡觉挂机好玩不累';
    game.L_KUAFUZHUAGUI = '跨服抓鬼';
    game.L_BANGPAIFUBEN = '帮派副本';
    game.L_SHENGSIJIE = '生死劫';
    game.L_FUHUOLINGBUZU = '复活令不足，是否前往材料商店购买';
    game.L_XYFL = "存储经验大于升级所需的200%，请先消耗经验再来领取";
    game.L_KAIFUJIESHU = "开服活动已结束";
    game.L_GODDESS_NAME = '天仙';
    game.L_GODDESS_SKILL = "天仙技能";
    game.L_GODDESS_EQUIP = "天仙装备";
    game.TABBTNSTRINGTX = '天 仙';
    game.TABBTNSTRINGXQ = '仙 器';
    game.TABBTNSTRINGXY = '仙 云';
    game.TABBTNSTRINGLQ = '灵 气';
    game.L_XIANQI_NAME = "仙器";
    game.L_XIANQI_SKILL = "仙器技能";
    game.L_XIANQI_EQUIP = "仙器装备";
    game.L_XIANYUN_NAME = "仙云";
    game.L_XIANYUN_SKILL = "仙云技能";
    game.L_XIANYUN_EQUIP = "仙云装备";
    game.L_LINGQI_SKILL = "灵气技能";
    game.L_LINGQI_EQUIP = "灵气装备";
    //野外boss复仇功能
    game.QIANGDUOLEWODE = "抢夺了我的";
    game.QIANGDUO = "抢夺";
    game.WEIZHANLING = "未占领";
    game.L_HTMLFILTER = "不能包含下列字符：\\，/，&lt;，&gt;，&amp;";
    game.DJBZWFQD = "等级不足，无法抢夺";
    game.SHIFOUBA = "是否把";
    game.BIAOJI2 = "标记";
    game.YICHU2 = "移除";
    game.L_NOWEARQILING = "该部位未穿戴器灵";
    game.L_ROLELVLOW = "角色等级不足，无法升阶";
    game.L_CAILIAOLOW = "材料不足，无法升阶";
    game.L_XLCAILIAOLOW = "材料不足，无法洗炼";
    game.L_CLCAILIAOLOW = "材料不足，无法淬炼";
    game.L_BASEPROPUP = "基础属性提升";
    game.L_PROPSUCCESS = "属性洗炼成功";
    game.L_SELQLGRADEUP = "选中器灵中有穿戴等级较高的器灵，是否分解";
    game.L_DAYNOTIP = "今天不在显示";
    game.L_POSPROPMAX = "当前部位极品属性已满，无需洗练";
    game.L_CUILIANFAILE = "淬炼失败";
    game.L_LVGM = "提升器灵总等级，获得更强等阶共鸣属性";
    game.L_LVGMMAX = "器灵等阶共鸣属性已达上限";
    game.L_CNGM = "佩戴更多器灵，获得更强连锁共鸣属性";
    game.L_CNGMMAX = "器灵连锁共鸣属性已达上限";
    game.L_JIAN = "件";
    game.L_CARD_ENDTIPS = "挑战结束，请退出";
    game.L_CARD_ENTERDLV = "进入第";
    game.L_CARD_ENTERDLV1 = "关";
})(game || (game = {}));
//# sourceMappingURL=lang_config.js.map
var base;
(function (base) {
    /**
     *
     * @xiaomi
     *
     */
    'use strict';
    var MD5 = /** @class */ (function () {
        function MD5(hcase) {
            if (hcase === void 0) { hcase = 0; }
            this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
            this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
            this.hexcase = hcase;
        }
        /*
        * These are the privates you'll usually want to call
        * They take string arguments and return either hex or base-64 encoded strings
        */
        MD5.prototype.hex_raw_md5 = function (s) { return this.rstr2hex(this.rstr_md5(s)); };
        MD5.prototype.hex_md5 = function (s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); }; //这个函数就行了，
        MD5.prototype.b64_md5 = function (s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); };
        MD5.prototype.any_md5 = function (s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); };
        MD5.prototype.hex_hmac_md5 = function (k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
        MD5.prototype.b64_hmac_md5 = function (k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
        MD5.prototype.any_hmac_md5 = function (k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); };
        /*
        * Perform a simple self-test to see if the VM is working
        */
        MD5.prototype.md5_vm_test = function () {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        };
        /*
        * Calculate the MD5 of a raw string
        */
        MD5.prototype.rstr_md5 = function (s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        };
        /*
        * Calculate the HMAC-MD5, of a key and some data (raw strings)
        */
        MD5.prototype.rstr_hmac_md5 = function (key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        };
        /*
        * Convert a raw string to a hex string
        */
        MD5.prototype.rstr2hex = function (input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        };
        /*
        * Convert a raw string to a base-64 string
        */
        MD5.prototype.rstr2b64 = function (input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        };
        /*
        * Convert a raw string to an arbitrary string encoding
        */
        MD5.prototype.rstr2any = function (input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            /* Convert to an array of 16-bit big-endian values, forming the dividend */
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            /*
            * Repeatedly perform a long division. The binary array forms the dividend,
            * the length of the encoding is the divisor. Once computed, the quotient
            * forms the dividend for the next step. All remainders are stored for later
            * use.
            */
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            /* Convert the remainders to the output string */
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        };
        /*
        * Encode a string as utf-8.
        * For efficiency, this assumes the input is valid utf-16.
        */
        MD5.prototype.str2rstr_utf8 = function (input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                /* Encode output as utf-8 */
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        };
        /*
        * Encode a string as utf-16
        */
        MD5.prototype.str2rstr_utf16le = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        };
        MD5.prototype.str2rstr_utf16be = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        };
        /*
        * Convert a raw string to an array of little-endian words
        * Characters >255 have their high-byte silently ignored.
        */
        MD5.prototype.rstr2binl = function (input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        };
        /*
        * Convert an array of little-endian words to a string
        */
        MD5.prototype.binl2rstr = function (input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        };
        /*
        * Calculate the MD5 of an array of little-endian words, and a bit length.
        */
        MD5.prototype.binl_md5 = function (x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        };
        /*
        * These privates implement the four basic operations the algorithm uses.
        */
        MD5.prototype.md5_cmn = function (q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        };
        MD5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };
        MD5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };
        MD5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        };
        MD5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        };
        /*
        * Add integers, wrapping at 2^32. This uses 16-bit operations internally
        * to work around bugs in some JS interpreters.
        */
        MD5.prototype.safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
        /*
        * Bitwise rotate a 32-bit number to the left.
        */
        MD5.prototype.bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        };
        return MD5;
    }());
    base.MD5 = MD5;
})(base || (base = {}));
//# sourceMappingURL=md5.js.map
var base;
(function (base) {
    //玩家描述
    var Player = /** @class */ (function () {
        function Player() {
            this.m_id = 0;
            this.m_name = "";
            this.m_shape = 0;
            this.m_desc = null;
            this.m_grade = 0;
            this.m_classes = 0;
            this.m_battlevalue = 0;
            this.m_vip = 0;
            this.m_gangid = 0;
            this.m_gangname = "";
            this.m_sign = "";
            this.m_isfriend = 0;
            this.m_isblack = 0;
            this.m_online = 0;
            this.m_getcoin = 0;
            this.m_chattime = 0;
            this.m_svr_id = 0;
        }
        Player.prototype.dispose = function () {
        };
        return Player;
    }());
    base.Player = Player;
    //技能描述
    var Skill = /** @class */ (function () {
        function Skill() {
            this.m_id = 0;
            this.m_lv = 0;
            this.m_icon = 0;
            this.m_cost = 0; // 升级消耗，为0时不能升级
            this.m_costonce = 0; // 一键升级，为0时不能升级
        }
        Skill.prototype.dispose = function () {
        };
        return Skill;
    }());
    base.Skill = Skill;
})(base || (base = {}));
//# sourceMappingURL=player.js.map
var timer;
(function (timer_1) {
    var Timer = /** @class */ (function () {
        function Timer() {
            this.id = 0;
            this.interval = 0;
            this.trigger_ms_timestamp = 0;
            this.caller = null;
            this.callback_func = null;
        }
        return Timer;
    }());
    var timer_mgr = /** @class */ (function () {
        function timer_mgr() {
            this.cur_id = 0;
            this.timer_dict = new Laya.Dictionary(); //{id:Timer}
            this.caller_dict = new Laya.Dictionary(); //{caller:[id,...]}
        }
        timer_mgr.prototype.add_timer = function (interval, caller, callback_func) {
            var tid_arr = this.caller_dict.get(caller);
            if (tid_arr) {
                for (var _i = 0, tid_arr_1 = tid_arr; _i < tid_arr_1.length; _i++) {
                    var tid = tid_arr_1[_i];
                    var timer_2 = this.timer_dict.get(tid);
                    if (timer_2 && timer_2.callback_func == callback_func) {
                        core.game_tiplog("WARNING:timer_mgr add_timer repeat, id:", tid);
                        return tid;
                    }
                }
            }
            var timer = new Timer();
            var new_id = this._get_next_id();
            timer.id = new_id;
            timer.interval = interval;
            timer.trigger_ms_timestamp = laya.utils.Browser.now();
            timer.caller = caller;
            timer.callback_func = callback_func;
            this.timer_dict.set(new_id, timer);
            if (tid_arr == null)
                tid_arr = new Array();
            tid_arr.push(new_id);
            this.caller_dict.set(caller, tid_arr);
            return new_id;
        };
        timer_mgr.prototype._get_next_id = function () {
            this.cur_id += 1;
            return this.cur_id;
        };
        timer_mgr.prototype.remove_timer = function (t_id) {
            var timer = this.timer_dict.get(t_id);
            if (timer) {
                var tid_arr = this.caller_dict.get(timer.caller);
                if (tid_arr) {
                    var idx = tid_arr.indexOf(t_id);
                    if (idx >= 0)
                        tid_arr.splice(idx, 1);
                    if (tid_arr.length == 0)
                        this.caller_dict.remove(timer.caller);
                    else
                        this.caller_dict.set(timer.caller, tid_arr);
                }
            }
            this.timer_dict.remove(t_id);
        };
        timer_mgr.prototype.remove_all_timer = function (caller) {
            var tid_arr = this.caller_dict.get(caller);
            if (tid_arr) {
                for (var _i = 0, tid_arr_2 = tid_arr; _i < tid_arr_2.length; _i++) {
                    var tid = tid_arr_2[_i];
                    this.timer_dict.remove(tid);
                }
                this.caller_dict.remove(caller);
            }
        };
        timer_mgr.prototype.update = function (cur_ms_timestamp) {
            var timer_ins;
            var triger_list = new Array();
            for (var _i = 0, _a = this.timer_dict.values; _i < _a.length; _i++) {
                timer_ins = _a[_i];
                if (timer_ins.trigger_ms_timestamp < cur_ms_timestamp) {
                    timer_ins.trigger_ms_timestamp += timer_ins.interval;
                    triger_list.push(timer_ins);
                }
            }
            for (var _b = 0, triger_list_1 = triger_list; _b < triger_list_1.length; _b++) {
                timer_ins = triger_list_1[_b];
                if (timer_ins && timer_ins.caller && timer_ins.callback_func)
                    timer_ins.callback_func.apply(timer_ins.caller);
            }
        };
        return timer_mgr;
    }());
    var g_timer_mgr = null;
    function timer_ins() {
        if (g_timer_mgr == null) {
            g_timer_mgr = new timer_mgr();
        }
        return g_timer_mgr;
    }
    timer_1.timer_ins = timer_ins;
})(timer || (timer = {}));
//# sourceMappingURL=timer.js.map