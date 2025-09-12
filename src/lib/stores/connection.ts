// src/lib/stores.ts
import { writable, type Writable } from 'svelte/store';

// A writable store for the current count
export const isConnected: Writable<boolean> = writable<boolean>(false);