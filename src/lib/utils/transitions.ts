import type { TAppState } from "$lib/types/app";
import type { TAppStateTransition, TAppStateTransitionDirections, TAppStateTransitions } from "$lib/types/transition";

/**
 * Implement a dummy handler.
 */
export function dummyHandler<T>(_: T) {
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
    handleTransition: (appState: TAppState) => void = dummyHandler,
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
    bluetoothSetup: {
        prev: createTransition(),
        next: createTransition(
            (state: TAppState) => {
                const nextState: TAppState = "sensorSetup";
                state = nextState;
                console.debug(
                    `Transitioning from 'bluetoothSetup' to next '${nextState}' stage.`,
                );
                console.debug(
                    `Current state value: '${state}'`,
                );
            },
            "Calibration",
            (_: boolean) => true,
        ),
    },
    sensorSetup: {
        prev: createTransition(
            (state: TAppState) => {
                const prevState: TAppState = "bluetoothSetup";
                state = prevState;
                console.debug(
                    `Transitioning from 'sensorSetup' to previous '${prevState}' stage.`,
                );
                console.debug(
                    `Current state value: '${state}'`,
                );
            },
            "Bluetooth",
            (_: boolean) => true,
        ),
        next: createTransition(
            (state: TAppState) => {
                const nextState: TAppState = "training";
                state = nextState;
                console.debug(
                    `Transitioning from 'sensorSetup' to next '${nextState}' stage.`,
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
            (state: TAppState) => {
                const prevState: TAppState = "sensorSetup";
                state = prevState;
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