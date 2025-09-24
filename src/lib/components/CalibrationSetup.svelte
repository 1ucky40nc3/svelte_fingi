<script lang="ts">
	import { appState } from '$lib/stores/app.store';

	function handleOnClick() {
		$appState = 'training';
	}
</script>

<div class="flex h-[80vh] flex-col">
	<div class="flex items-center py-[2vh]">
		<h1 class="font-heading text-5xl font-bold">
			Setup Step 2/2:<br />Calibration
		</h1>
	</div>
	<div class="py-[2vh]">
		<span class="font-text text-2xl">
			Calibrate sensor. The calibration consists of taring the sensor.
		</span>
	</div>
	<div class="flex flex-col items-center justify-center py-[2vh]">
		<button
			class="rounded-xl border-2 border-dotted border-black p-5"
			type="button"
			on:click={handleOnClick}
		>
			<span class="font-interactive">Tare Sensor -{'>'}</span>
		</button>
	</div>
</div>
