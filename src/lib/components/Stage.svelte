<script lang="ts">
	import { appState } from '$lib/stores/app';
	import BluetoothSetup from '$lib/components/BluetoothSetup.svelte';
	import SensorSetup from '$lib/components/SensorSetup.svelte';
	import Training from '$lib/components/Training.svelte';
	import NavigationNotification from './NavigationNotification.svelte';

	let currentComponent: typeof BluetoothSetup | typeof SensorSetup | typeof Training;
	$: {
		switch ($appState) {
			case 'bluetoothSetup':
				currentComponent = BluetoothSetup;
				break;
			case 'sensorSetup':
				currentComponent = SensorSetup;
				break;
			case 'training':
				currentComponent = Training;
				break;
			default:
				currentComponent = BluetoothSetup; // Fallback component
		}
	}
	$: console.log('Current appState:', $appState);
</script>

<div class="flex min-h-screen flex-col">
	<NavigationNotification></NavigationNotification>
	<svelte:component this={currentComponent} />
</div>
