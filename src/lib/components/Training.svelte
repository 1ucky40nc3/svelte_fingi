<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import * as streamingPlugin from '@1ucky40nc3/chartjs-plugin-streaming';
	import 'chartjs-adapter-luxon';

	// Register all necessary components from Chart.js
	Chart.register(...registerables);
	// Register the streaming plugin
	Chart.register(streamingPlugin.RealTimeScale);
	Chart.register(streamingPlugin.StreamingPlugin);

	let chartCanvas: any;
	let myChart;

	onMount(() => {
		const ctx = chartCanvas.getContext('2d');
		myChart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: 'Dataset 1 (stream)',
						borderColor: 'rgb(255, 99, 132)',
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
						data: []
					}
				]
			},
			options: {
				scales: {
					x: {
						// @ts-ignore
						type: 'realtime', // The 'realtime' scale is provided by the streaming plugin
						realtime: {
							duration: 20000, // Show the last 20 seconds of data
							refresh: 1000, // Refresh the chart every 1 second
							onRefresh: (chart: Chart) => {
								// This callback function is called every `refresh` interval
								chart.data.datasets[0].data.push({
									x: Date.now(),
									y: Math.random() * 100
								});
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartCanvas}></canvas>
