<script lang="ts">
	import { appState } from '$lib/stores/app';
	import BluetoothSetup from '$lib/components/BluetoothSetup.svelte';
	import SensorSetup from '$lib/components/SensorSetup.svelte';
	import Training from '$lib/components/Training.svelte';
	import NavigationNotification from './NavigationNotification.svelte';

	let currentComponent: typeof BluetoothSetup | typeof SensorSetup | typeof Training;
	if ($appState === 'bluetoothSetup') {
		currentComponent = BluetoothSetup;
	} else if ($appState === 'sensorSetup') {
		currentComponent = SensorSetup;
	} else if ($appState === 'training') {
		currentComponent = Training;
	}
</script>

<div class="flex min-h-screen flex-col">
	<NavigationNotification></NavigationNotification>
	<svelte:component this={currentComponent} />
</div>
