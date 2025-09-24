<script lang="ts">
	import { appState } from '$lib/stores/app.store';

	function handleOnClick() {
		$appState = 'training';
	}
</script>

<div class="flex flex-col">
	<div class="h-gr-double-3 flex items-center">
		<h1 class="font-heading text-5xl font-bold">
			Setup Step 2/2:<br />Calibration
		</h1>
	</div>
	<div class="h-gr-half-4">
		<span class="font-text text-2xl">
			Calibrate sensor. The calibration consists of taring the sensor.
		</span>
	</div>
	<div class="h-gr-half-4 flex flex-col items-center justify-center">
		<button
			class="rounded-xl border-2 border-dotted border-black p-5"
			type="button"
			on:click={handleOnClick}
		>
			<span class="font-interactive">Tare Sensor -{'>'}</span>
		</button>
	</div>
</div>
