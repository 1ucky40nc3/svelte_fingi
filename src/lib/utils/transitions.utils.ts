import type { TAppState } from "$lib/types/app";
import type { TAppStateTransition, TAppStateTransitionDirections, TAppStateTransitions } from "$lib/types/transition";
import type { Writable } from "svelte/store";

/**
 * Implement a dummy handler.
 */
export function dummyHandler<T>(_: Writable<T>): void {
    console.warn("A dummy transition handler was called!");
}

/**
 * Implement a dummy function that returns if a transition is available.
 *
 * @returns {boolean} Wether the transition is available. This function always returns `false`;
 */
export function dummyIsAvailable(
    _: boolean,
): boolean {
    return false;
}

/**
 * Create a dummy transition that does nothing.
 *
 * @param handler A transition handler. By default we use {@link dummyHandler}.
 * @param text A text that describes the transition to the user. The default is an empty string (no description).
 */
export function createTransition(
    handleTransition: (appState: Writable<TAppState>) => void = dummyHandler,
    text: string = "",
    isAvailable: (blueeothConnected: boolean) => boolean = dummyIsAvailable,
): TAppStateTransition<
    TAppState
> {
    return {
        handleTransition,
        text,
        isAvailable,
    };
}

/**
 * Implement all transitions for the application.
 */
const TRANSITIONS: TAppStateTransitions<TAppState> = {
    connectionSetup: {
        prev: createTransition(),
        next: createTransition(
            (state: Writable<TAppState>) => {
                const nextState: TAppState = "calibrationSetup";
                state.set(nextState);
                console.debug(
                    `Transitioning from 'connectionSetup' to next '${nextState}' stage.`,
                );
                console.debug(
                    `Current state value: '${state}'`,
                );
            },
            "Calibration",
            (_: boolean) => true,
        ),
    },
    calibrationSetup: {
        prev: createTransition(
            (state: Writable<TAppState>) => {
                const prevState: TAppState = "connectionSetup";
                state.set(prevState);
                console.debug(
                    `Transitioning from 'calibrationSetup' to previous '${prevState}' stage.`,
                );
                console.debug(
                    `Current state value: '${state}'`,
                );
            },
            "Bluetooth",
            (_: boolean) => true,
        ),
        next: createTransition(
            (state: Writable<TAppState>) => {
                const nextState: TAppState = "training";
                state.set(nextState);
                console.debug(
                    `Transitioning from 'calibrationSetup' to next '${nextState}' stage.`,
                );
                console.debug(
                    `Current state value: '${state}'`,
                );
            },
            "Train",
            (_: boolean) => true,
        ),
    },
    training: {
        prev: createTransition(
            (state: Writable<TAppState>) => {
                const prevState: TAppState = "calibrationSetup";
                state.set(prevState);
                console.debug(
                    `Transitioning from 'training' to previous '${prevState}' stage.`,
                );
                console.debug(
                    `Current state value: '${state}'`,
                );
            },
            "Calibration",
            (_: boolean) => true,
        ),
        next: createTransition(),
    },
};

/**
 * Implement a factory to access app transitions.
 */
export class AppStateTransitionDirectionsFactory {
    /**
     * Get the app direction transitions for a state.
     */
    static for(
        state: TAppState,
    ): TAppStateTransitionDirections<TAppState> {
        return TRANSITIONS[state];
    }
}