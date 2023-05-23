import dayjs from "dayjs";
import defaultZones from './zoneDefaults'
import { getZones } from "./zoneStorage";
import type { Year, ZoneEntry } from "./types";

export function lookup(zone: string, date?: dayjs.Dayjs) {
    if (!date) date = dayjs()

    let zones: Record<string, ZoneEntry> = { ...defaultZones, ...getZones() }
    let activeZone = zones[zone]
    if (!activeZone) return null

    let quarterArray: Array<[keyof ZoneEntry, Year, Date]> = Object.entries(activeZone).reduce((obj, [key, ddmm]) => ([
        ...obj,
        [key, date.year(), new Date(
            date.year() + (ddmm[2] ?? 0),
            ddmm[1] - 1,
            ddmm[0]
        )],
        [key, date.year() + 1, new Date(
            (date.year() + 1) + (ddmm[2] ?? 0),
            ddmm[1] - 1,
            ddmm[0]
        )]
    ]), [])


    let sortedKeys = Array.from(Array(quarterArray.length).keys())
        .sort((keyA, keyB) => (quarterArray[keyA][2].getTime() - quarterArray[keyB][2].getTime()))

    let result = sortedKeys[0]
    for (let key of sortedKeys.slice(1)) {
        if (date.isBefore(quarterArray[key][2])) break
        result = key
    }

    return [quarterArray[result][0], quarterArray[result][1]]
}
