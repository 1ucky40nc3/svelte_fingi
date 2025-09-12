// src/lib/stores.ts
import type { TAppState } from '$lib/types/app';
import { writable, type Writable } from 'svelte/store';

// A writable store for the current count
export const appState: Writable<TAppState> = writable<TAppState>('bluetoothSetup');