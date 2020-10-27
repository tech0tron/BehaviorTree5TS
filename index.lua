local BehaviorTreeCreator = require(script.Parent.BehaviorTreeCreator)
local BehaviorTree3 = require(script.Parent.BehaviorTree3)

return {
    BehaviorTreeCreator = BehaviorTreeCreator,
    BehaviorTree3 = BehaviorTree3,
    SUCCESS = 1,
    FAIL = 2,
    RUNNING = 3
}
