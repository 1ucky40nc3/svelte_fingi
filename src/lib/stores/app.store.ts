import type { TAppState } from '$lib/types/app';
import { writable, type Writable } from 'svelte/store';

/**
 * A writable store that holds the current state of the application.
 */
export const appState: Writable<TAppState> = writable<TAppState>('connectionSetup');