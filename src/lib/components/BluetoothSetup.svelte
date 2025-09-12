<script lang="ts">
	import { appState } from '$lib/stores/app';
	import { isConnected } from '$lib/stores/connection';
	export let handleConnected: () => Promise<void> = async () => {};

	async function handleOnClick(): Promise<void> {
		console.debug('Handle bluetooth scan and connect button click.');
		await handleConnected();
		if (isConnected) {
			$appState = 'sensorSetup';
		}
	}
</script>

<div class="flex flex-col">
	<div class="h-gr-double-3 flex items-center">
		<h1 class="font-heading text-5xl font-bold">
			Setup Step 1/2:<br />Bluetooth
		</h1>
	</div>
	<div class="h-gr-half-4">
		<span class="font-text text-2xl"> Please connect to a compatible bluetooth device! </span>
	</div>
	<div class="h-gr-half-4 flex flex-row items-center justify-center border-black">
		<button
			class="rounded-xl border-2 border-dotted border-black p-5"
			type="button"
			on:click={handleOnClick}
		>
			<span class="font-interactive inline-block align-middle leading-none">
				Scan & Connect <br /> Bluetooth Device {'->'}
			</span>
		</button>
	</div>
</div>
