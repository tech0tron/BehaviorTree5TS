export type SUCCESS = 1;
export type FAIL = 2;
export type RUNNING = 3;

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

    start?: (task: Node<T>, object: Instance) => void;
    run?: (task: Node<T>, object: Instance) => void;
    finish?: (task: Node<T>, status: TREE_OUTCOME) => void;
}

type Node<T> = NodeParams &
    T & {
        success(): void;
    };

export interface BehaviorTreeParams {}

interface BehaviorTree3Constructor {
    readonly ClassName: 'BehaviorTree3';
    new (params: BehaviorTreeParams): BehaviorTree3;

    Sequence<T>(params: NodeParams): Node<T>;
    Selector<T>(params: NodeParams): Node<T>;
    Random<T>(params: NodeParams): Node<T>;

    Succeed<T>(params: NodeParams): Node<T>;
    Fail<T>(params: NodeParams): Node<T>;
    Invert<T>(params: NodeParams): Node<T>;
    Repeat<T>(params: NodeParams): Node<T>;

    Task<T>(params: NodeParams): Node<T>;
    Tree<T>(params: NodeParams): Node<T>;
}

interface BehaviorTreeCreatorConstructor {
    readonly ClassName: 'BehaviorTree3Creator';

    Create(treeFolder: Folder, obj: Instance): BehaviorTree3 | undefined;

    SetTreeID(treeId: string, treeFolder: Folder): void;
}

// Actual Module exports
export const BehaviorTree3: BehaviorTree3Constructor;
export const BehaviorTreeCreator: BehaviorTreeCreatorConstructor;
