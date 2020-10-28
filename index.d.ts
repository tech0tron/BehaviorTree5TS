export type SUCCESS = 1;
export const SUCCESS = 1;
export type FAIL = 2;
export const FAIL = 2;
export type RUNNING = 3;
export const RUNNING = 3;

export type TREE_OUTCOME = SUCCESS | FAIL | RUNNING;

export type BehaviorTree3<T = unknown> = {
    nodes: unknown[];
    index: number;
    object: T | undefined;

    run(...args: unknown[]): TREE_OUTCOME | undefined;

    setObject(object?: T): void;

    clone(): BehaviorTree3;
};

export interface NodeParams<T = unknown> {
    tree?: BehaviorTree3;
    nodes?: Node<T>[];
    count?: number;
    weight?: number;
    breakonfail?: boolean;

    module?: {
        start?: (object: T, ...args: unknown[]) => void;
        run?: (object: T, ...args: unknown[]) => TREE_OUTCOME;
        finish?: (object: T, status: TREE_OUTCOME, ...args: unknown[]) => void;
    };
}

type Node<T = unknown> = NodeParams & T;

export interface BehaviorTreeParams {
    tree: Node;
}

interface BehaviorTree3Constructor {
    readonly ClassName: 'BehaviorTree3';
    new <T = unknown>(params: BehaviorTreeParams): BehaviorTree3<T>;

    Sequence: <T = unknown>(params: NodeParams<T>) => Node<T>;
    Selector: <T = unknown>(params: NodeParams<T>) => Node<T>;
    Random: <T = unknown>(params: NodeParams<T>) => Node<T>;

    Succeed: <T = unknown>(params: NodeParams<T>) => Node<T>;
    Fail: <T = unknown>(params: NodeParams<T>) => Node<T>;
    Invert: <T = unknown>(params: NodeParams<T>) => Node<T>;
    Repeat: <T = unknown>(params: NodeParams<T>) => Node<T>;

    Task: <T = unknown>(params: NodeParams<T>) => Node<T>;
    Tree: <T = unknown>(params: NodeParams<T>) => Node<T>;
}

interface BehaviorTreeCreatorConstructor {
    readonly ClassName: 'BehaviorTree3Creator';

    Create<T = unknown>(treeFolder: Folder, obj: T): BehaviorTree3<T> | undefined;

    SetTreeID(treeId: string, treeFolder: Folder): void;
}

// Actual Module exports
export const BehaviorTree3: BehaviorTree3Constructor;
export const BehaviorTreeCreator: BehaviorTreeCreatorConstructor;
