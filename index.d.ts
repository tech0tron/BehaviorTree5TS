export type SUCCESS = 1;
export type FAIL = 2;
export type RUNNING = 3;

type TREE_OUTCOME = SUCCESS | FAIL | RUNNING;

export type BehaviorTree3 = {
    nodes: unknown[];
    index: number;
    object: Instance | undefined;

    run(): undefined | TREE_OUTCOME;

    setObject(object: Instance | undefined): void;

    clone(): BehaviorTree3;
};

export interface NodeParams {}

type Node = {};

export interface BehaviorTreeParams {
    tree: unknown;
}

interface BehaviorTree3Constructor {
    readonly ClassName: 'BehaviorTree3';
    new (params: BehaviorTreeParams): BehaviorTree3;

    Sequence(params: NodeParams): Node;
}

interface BehaviorTreeCreatorConstructor {
    readonly ClassName: 'BehaviorTree3Creator';

    Create(treeFolder: Folder, obj: Instance): BehaviorTree3 | undefined;

    SetTreeID(treeId: string, treeFolder: Folder): void;
}

// Actual Module exports
export const BehaviorTree3: BehaviorTree3Constructor;
export const BehaviorTreeCreator: BehaviorTreeCreatorConstructor;
