<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables, type ChartOptions } from 'chart.js';
	import * as streamingPlugin from '@1ucky40nc3/chartjs-plugin-streaming';
	import * as zoomPlugin from 'chartjs-plugin-zoom';
	import 'chartjs-adapter-luxon';
	import { chartData } from '$lib/stores/chart.store';
	import type { ZoomPluginOptions } from 'chartjs-plugin-zoom/types/options';
	import { on } from 'svelte/events';

	// Register all necessary components from Chart.js
	Chart.register(...registerables);
	// Register the zoom plugin
	Chart.register(zoomPlugin.default);
	// Register the streaming plugin
	Chart.register(streamingPlugin.RealTimeScale);
	Chart.register(streamingPlugin.StreamingPlugin);

	function onRefresh(chart: Chart): void {
		chart.data.datasets[0].data.push({
			x: Date.now(),
			y: Math.random() * 100
		});
	}

	const zoomPluginOptions: ZoomPluginOptions = {
		zoom: {
			wheel: {
				enabled: false // We disable the `zoom` by default while streaming (this get's toggled when pausing the stream)
			},
			pinch: {
				enabled: false // We disable the `pinch` by default while streaming (this get's toggled when pausing the stream)
			},
			mode: 'xy'
		},
		pan: {
			enabled: false, // We disable the `zoom` by default while streaming (this get's toggled when pausing the stream)
			mode: 'xy'
		}
	};

	let containerRef: HTMLDivElement;

	const chartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		scales: {
			x: {
				position: 'bottom',
				type: 'realtime',
				realtime: {
					duration: 20000, // Show the last 20 seconds
					refresh: 100, // Refresh every 100 ms
					delay: 100, // Delay in ms until the newest data point is shown
					onRefresh: onRefresh
				},
				ticks: {
					font: {
						family: 'font-text'
					}
				}
			},
			y: {
				position: 'right',
				ticks: {
					font: {
						family: 'font-text'
					}
				},
				beginAtZero: true
			}
		},
		interaction: {
			intersect: false
		},
		plugins: {
			zoom: zoomPluginOptions,
			legend: {
				display: true,
				labels: {
					font: {
						// family: 'font-heading',
						weight: 'bold',
						size: 20
					}
				}
			}
		}
	};

	let chartCanvas: HTMLCanvasElement;
	let chartRef: Chart;
	onMount(() => {
		chartOptions.aspectRatio = containerRef.offsetWidth / containerRef.offsetHeight;

		const ctx = chartCanvas.getContext('2d');
		// @ts-ignore
		chartRef = new Chart(ctx, {
			type: 'line',
			data: $chartData,
			options: chartOptions
		});
	});

	let doStopDataStream: boolean = true;
	let onRefreshHandler: { (): void } = (): void => {};

	const handleStopAndResumeDataStream: { (): void } = (): void => {
		if (chartRef) {
			console.debug('Toggle stop/resume data streaming');
			// @ts-expect-error  Property 'realtime' does not exist on type
			if (chartRef.config.options?.scales?.x?.realtime) {
				// @ts-expect-error  Property 'realtime' does not exist on type
				const realtime = chartRef.config.options.scales.x.realtime;

				// Replace the `onRefresh` handle with a empty dummy function if we want to stop the data stream
				const tmpOnRefreshHandler: { (): void } = realtime.onRefresh;
				realtime.onRefresh = onRefreshHandler;
				onRefreshHandler = tmpOnRefreshHandler;
				// Do stop the scrolling
				realtime.pause = doStopDataStream;
			}
			if (chartRef.config.options?.plugins?.zoom) {
				// Toggle the zoom, pinch and pan gestures
				const zoomPluginOptions = chartRef.config.options.plugins.zoom;
				if (zoomPluginOptions.zoom?.wheel?.enabled !== undefined) {
					zoomPluginOptions.zoom.wheel.enabled = !zoomPluginOptions.zoom?.wheel?.enabled;
				}
				if (zoomPluginOptions.zoom?.pinch?.enabled !== undefined) {
					zoomPluginOptions.zoom.pinch.enabled = !zoomPluginOptions.zoom?.pinch?.enabled;
				}
				if (zoomPluginOptions.pan?.enabled !== undefined) {
					zoomPluginOptions.pan.enabled = !zoomPluginOptions.pan?.enabled;
				}
			}
			doStopDataStream = !doStopDataStream;
			console.debug(`Did toggle the doStopDataStream value to '${doStopDataStream}'`);
		}
	};

	const handleResetZoom: { (): void } = (): void => {
		if (chartRef) {
			console.debug('Reset chart zoom');
			// @ts-ignore
			chartRef.data = $chartData;
			chartRef.resetZoom();
		}
	};

	const handleClearData: { (): void } = (): void => {
		if (chartRef) {
			console.debug('Clear data');

			for (const dataset of $chartData.datasets) {
				dataset.data = [];
			}
			// @ts-ignore
			chartRef.data = $chartData;
			chartRef.resetZoom();
		}
	};
</script>

<div bind:this={containerRef} class=" flex flex-col justify-around">
	<div class="w-gr-double-3 w-full pt-6 pb-6">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
	<div class="flex flex-grow flex-row justify-around">
		<button
			type="button"
			class="rounded-xl border-2 border-dotted border-black p-1"
			on:click={handleStopAndResumeDataStream}
		>
			<span class="font-interactive inline-block align-middle leading-none">
				{doStopDataStream ? 'Stop' : 'Resume'}
			</span>
		</button>
		<button
			type="button"
			class="rounded-xl border-2 border-dotted border-black p-1"
			on:click={handleResetZoom}
		>
			<span class="font-interactive inline-block align-middle leading-none"> Reset Zoom </span>
		</button>
		<button
			type="button"
			class="rounded-xl border-2 border-dotted border-black p-1"
			on:click={handleClearData}
		>
			<span class="font-interactive inline-block align-middle leading-none"> Clear data </span>
		</button>
	</div>
</div>
