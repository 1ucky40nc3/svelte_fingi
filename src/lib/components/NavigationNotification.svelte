<script lang="ts">
	import { appState } from '$lib/stores/app.store';
	import { isConnected } from '$lib/stores/connection.store';
	import type { TAppState } from '$lib/types/app';
	import type { TAppStateTransitionDirections } from '$lib/types/transition';
	import { AppStateTransitionDirectionsFactory } from '$lib/utils/transitions.utils';
	import Disconnected from './Disconnected.svelte';
	import NextTransition from './NextTransition.svelte';
	import PreviousTransition from './PreviousTransition.svelte';

	// Implement the transitions based on the current app state.
	let transitions: TAppStateTransitionDirections<TAppState>;
	let currentPreviousTransitionComponent: typeof PreviousTransition | null = null;
	let currentNextTransitionComponent: typeof NextTransition | null = null;
	let prevTransitionHandler: () => void;
	let prevText: string;
	let nextTransitionHandler: () => void;
	let nextText: string;
	$: {
		transitions = AppStateTransitionDirectionsFactory.for($appState);
		const prevTransitionAvailable: boolean = transitions.prev.isAvailable($isConnected);
		const nextTransitionAvailable: boolean = transitions.next.isAvailable($isConnected);

		if (prevTransitionAvailable) {
			currentPreviousTransitionComponent = PreviousTransition;
		} else {
			currentPreviousTransitionComponent = null;
		}
		if (nextTransitionAvailable) {
			currentNextTransitionComponent = NextTransition;
		} else {
			currentNextTransitionComponent = null;
		}

		prevTransitionHandler = (): void => {
			if (transitions.prev !== undefined) {
				transitions.prev.handleTransition(appState);
			}
		};
		prevText = transitions.prev.text;

		nextTransitionHandler = (): void => {
			if (transitions.next !== undefined) {
				transitions.next.handleTransition(appState);
			}
		};
		nextText = transitions.next.text;
	}
	$: console.log(`Current prexText: ${prevText}; Current nextText: ${nextText}`);

	// Implement the connection status
	let currentDisconnectedComponent: typeof Disconnected | null = null;
	$: {
		if (!$isConnected) {
			currentDisconnectedComponent = Disconnected;
		} else {
			currentDisconnectedComponent = null;
		}
	}
	$: console.log(`Connection status changed: ${$isConnected}`);
</script>

<div class="h-gr-1 flex flex-row items-center justify-between">
	<div>
		<svelte:component
			this={currentPreviousTransitionComponent}
			transitionHandler={prevTransitionHandler}
			text={prevText}
		/>
	</div>

	<svelte:component this={currentDisconnectedComponent} />

	<div>
		<svelte:component
			this={currentNextTransitionComponent}
			transitionHandler={nextTransitionHandler}
			text={nextText}
		/>
	</div>
</div>
