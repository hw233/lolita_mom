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