import { writable, type Writable } from 'svelte/store';

/**
 * A writable store that indicates if we are connected to a sensor device.
 */
export const isConnected: Writable<boolean> = writable<boolean>(false);