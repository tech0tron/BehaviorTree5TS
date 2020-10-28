/**
 * Constants and types used for statuses
 */
export type SUCCESS = 1;
export const SUCCESS = 1;
export type FAIL = 2;
export const FAIL = 2;
export type RUNNING = 3;
export const RUNNING = 3;

export type TREE_OUTCOME = SUCCESS | FAIL | RUNNING;

/**
 * Type definition for Behavior Trees. The run method returns undefined when
 */
export type BehaviorTree3<T = unknown> = {
    /** Nodes that compose the behavore tree */
    nodes: unknown[];
    /** The index of the node currently being processed */
    index: number;
    /** The object used to share data accross the behavior tree. This can be anything. */
    object: T | undefined;

    /** Run the behavior tree with optional arguments that are passed to all nodes.
     * May be called multiple times when TREE_OUTCOME that is returned is RUNNING.
     */
    run(...args: unknown[]): TREE_OUTCOME | undefined;

    /** Set the shared object used by the behavior tree. */
    setObject(object?: T): void;

    /** Clone the behavior tree. */
    clone(): BehaviorTree3;
};

/** Parameters that can be used when creating differant types of nodes. Not all parameters can be used by all types of nodes.
 * TODO: Create parameters specific to each type of node.
 */
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

/** The parameter object passed in when a tree is created. */
export interface BehaviorTreeParams {
    tree: Node;
}

/** Constructor and static methods found on the exported BehaviorTree3 module. */
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

/** Static methods found on the exported BehaviorTree3Creator object*/
interface BehaviorTreeCreatorConstructor {
    readonly ClassName: 'BehaviorTree3Creator';

    /** Create a behavior tree from a folder from the behavior tree plugin and an object. */
    Create<T = unknown>(treeFolder: Folder, obj: T): BehaviorTree3<T> | undefined;

    /** Used to set an identifier for a tree. */
    SetTreeID(treeId: string, treeFolder: Folder): void;
}

// Actual Module exports
export const BehaviorTree3: BehaviorTree3Constructor;
export const BehaviorTreeCreator: BehaviorTreeCreatorConstructor;
