/**
 * A type for all possible directions to transition to other states.
 *
 * @description We have the following transition types:
 *  - `next`: Transition to the next stage.
 *  - `prev`: Transition to the previous stage.
 */
export type TTransitionDirection = "next" | "prev";

/**
 * Implement a type for app transition handlers.
 */
export type TAppTransitionHandler<C> = (context: Writable<C>) => void;

/**
 * Implement a type for app transitions.
 *
 * @template C A type for the context that can be read and written to.
 */
export type TAppStateTransition<C> = {
    /** A function that handles the state transition. */
    handleTransition: TAppTransitionHandler<C>;
    /** An optional text we display as part of the transition. */
    text: string;
    isAvailable: (isConnected: boolean) => boolean;
};

/**
 * Implement a type for app transitions by directions.
 *
 * @template C A type for the context that can be read and written to.
 */
export type TAppStateTransitionDirections<C> = Record<
    TTransitionDirection,
    TAppStateTransition<C>
>;

/**
 * Implement a type for app transitions based on the current state.
 *
 * @template C A type for the context that can be read and written to.
 */
export type TAppStateTransitions<C> = Record<
    TAppState,
    TAppStateTransitionDirections<C>
>;