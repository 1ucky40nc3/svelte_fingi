<script lang="ts">
	import { appState } from '$lib/stores/app';
	import { isConnected } from '$lib/stores/connection';
	import { AppStateTransitionDirectionsFactory } from '$lib/utils/transitions';
	import Disconnected from './Disconnected.svelte';
	import NextTransition from './NextTransition.svelte';
	import PreviousTransition from './PreviousTransition.svelte';

	const transitions = AppStateTransitionDirectionsFactory.for($appState);
	let prevTransitionAvailable = transitions.prev.isAvailable($isConnected);
	let nextTransitionAvailable = transitions.next.isAvailable($isConnected);

	function prevTransitionHandler(): void {
		if (transitions.prev !== undefined) {
			transitions.prev.handleTransition(appState);
		}
	}
	const prevText: string = transitions.prev.text;

	function nextTransitionHandler(): void {
		if (transitions.next !== undefined) {
			transitions.next.handleTransition(appState);
		}
	}
	const nextText: string = transitions.next.text;
</script>

<div class="h-gr-1 flex flex-row items-center justify-between">
	<div>
		{#if prevTransitionAvailable}
			<PreviousTransition transitionHandler={prevTransitionHandler} text={prevText}
			></PreviousTransition>
		{/if}
	</div>

	{#if !$isConnected}
		<Disconnected></Disconnected>
	{/if}

	<div>
		{#if nextTransitionAvailable}
			<NextTransition transitionHandler={nextTransitionHandler} text={nextText}></NextTransition>
		{/if}
	</div>
</div>
