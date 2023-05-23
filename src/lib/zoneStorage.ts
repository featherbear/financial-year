import { get, writable } from 'svelte/store'
import type { ZoneEntry } from './types'

const key = "fy-active"

function getStorage() {
    try {
        return JSON.parse(localStorage.getItem(key)) || {}
    } catch {
        return {}
    }
}

const store = writable<Record<string, ZoneEntry>>(
    getStorage(),
    value => {
        localStorage.setItem(key, JSON.stringify(value))
    }
)
export default store

export function getZones() {
    return get(store)
}