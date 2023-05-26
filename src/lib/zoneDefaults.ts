import type { ZoneEntry } from "../types"

export default {
    "Australia": {
        Q1: [1, 7, -1],
        Q2: [1, 10, -1],
        Q3: [1, 1],
        Q4: [1, 4]
    }
} satisfies Record<string, ZoneEntry>