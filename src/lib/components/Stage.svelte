<script lang="ts">
	import { appState } from '$lib/stores/app.store';
	import ConnectionSetup from '$lib/components/ConnectionSetup.svelte';
	import calibrationSetup from '$lib/components/CalibrationSetup.svelte';
	import Training from '$lib/components/Training.svelte';
	import NavigationNotification from './NavigationNotification.svelte';

	let currentComponent: typeof ConnectionSetup | typeof calibrationSetup | typeof Training;
	$: {
		switch ($appState) {
			case 'connectionSetup':
				currentComponent = ConnectionSetup;
				break;
			case 'calibrationSetup':
				currentComponent = calibrationSetup;
				break;
			case 'training':
				currentComponent = Training;
				break;
			default:
				currentComponent = ConnectionSetup; // Fallback component
		}
	}
	$: console.log('Current appState:', $appState);
</script>

<div class="flex min-h-screen flex-col justify-between p-[2vh]">
	<NavigationNotification></NavigationNotification>
	<svelte:component this={currentComponent} />
</div>
