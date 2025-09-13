import type { TTimeSeriesData } from '$lib/types/data';
import type { ChartData } from 'chart.js';
import { writable, type Writable } from 'svelte/store';

/**
 * A type for the training chart data.
 */
export type TTrainingChartData = ChartData<
    "line",
    TTimeSeriesData[]
>;

/**
 * A factory function that creates an initial empty chart data object.
 * 
 * @returns An initial empty chart data object.
 */
export function createInitialChartData(): TTrainingChartData {
    return {
        datasets: [{
            type: "line",
            label: "Sensor Data (in kg)",
            data: [],
            tension: 0.3,
            pointRadius: 0,
        }],
    }
}

/**
 * A Svelte store that holds the training chart data.
 */
export const chartData: Writable<TTrainingChartData> = writable<TTrainingChartData>(createInitialChartData());