<script lang="ts">
	import { appState } from '$lib/stores/app.store';
	import { isConnected } from '$lib/stores/connection.store';
	export let handleConnected: () => Promise<void> = async () => {};

	async function handleOnClick(): Promise<void> {
		console.debug('Handle bluetooth scan and connect button click.');
		await handleConnected();
		if (isConnected) {
			$appState = 'calibrationSetup';
		}
	}
</script>

<div class="flex h-[80vh] flex-col">
	<div class="flex items-center py-[2vh]">
		<h1 class="font-heading text-5xl font-bold">
			Setup Step 1/2:<br />Establish Connection
		</h1>
	</div>
	<div class="py-[2vh]">
		<span class="font-text text-2xl"> Please connect to a compatible device! </span>
	</div>
	<div class="flex flex-row items-center justify-center border-black py-[2vh]">
		<span>Establish a connection by entering the device wifi.</span>
	</div>
</div>
