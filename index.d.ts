export type SUCCESS = 1;
export const SUCCESS = 1;
export type FAIL = 2;
export const FAIL = 2;
export type RUNNING = 3;
export const RUNNING = 3;

export type TREE_OUTCOME = SUCCESS | FAIL | RUNNING;

export type BehaviorTree3 = {
    nodes: unknown[];
    index: number;
    object: Instance | undefined;

    run(): undefined | TREE_OUTCOME;

    setObject(object?: Instance): void;

    clone(): BehaviorTree3;
};

export interface NodeParams<T = unknown> {
    tree?: BehaviorTree3;
    nodes?: Node<T>[];
    count?: number;
    weight?: number;
    breakonfail?: boolean;

    module?: {
        start?: (task: Node<T>, object: Instance) => void;
        run?: (task: Node<T>, object: Instance) => TREE_OUTCOME;
        finish?: (task: Node<T>, status: TREE_OUTCOME) => void;
    };
}

type Node<T = unknown> = NodeParams & T;

export interface BehaviorTreeParams {}

interface BehaviorTree3Constructor {
    readonly ClassName: 'BehaviorTree3';
    new (params: BehaviorTreeParams): BehaviorTree3;

    Sequence: (params: NodeParams) => Node;
    Selector: (params: NodeParams) => Node;
    Random: (params: NodeParams) => Node;

    Succeed: (params: NodeParams) => Node;
    Fail: (params: NodeParams) => Node;
    Invert: (params: NodeParams) => Node;
    Repeat: (params: NodeParams) => Node;

    Task: (params: NodeParams) => Node;
    Tree: (params: NodeParams) => Node;
}

interface BehaviorTreeCreatorConstructor {
    readonly ClassName: 'BehaviorTree3Creator';

    Create(treeFolder: Folder, obj: Instance): BehaviorTree3 | undefined;

    SetTreeID(treeId: string, treeFolder: Folder): void;
}

// Actual Module exports
export const BehaviorTree3: BehaviorTree3Constructor;
export const BehaviorTreeCreator: BehaviorTreeCreatorConstructor;
