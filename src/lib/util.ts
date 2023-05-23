import dayjs from "dayjs";
import defaultZones from './zoneDefaults'
import { getZones } from "./zoneStorage";
import type { ZoneEntry } from "./types";

const formatYear = (yyyy: number) => "FY" + (yyyy % 100)

export function lookup(zone: string, date?: dayjs.Dayjs) {
    if (!date) date = dayjs()

    let zones: Record<string, ZoneEntry> = { ...defaultZones, ...getZones() }
    let activeZone = zones[zone]

    let activeZone_dateObj = Object.entries(activeZone).reduce((obj, [key, ddmm]) =>
    ({
        ...obj,
        [formatYear(date.year()) + key]: new Date(
            date.year() + (ddmm[2] ?? 0),
            ddmm[1] - 1,
            ddmm[0]
        ),
        [formatYear(date.year() + 1) + key]: new Date(
            (date.year() + 1) + (ddmm[2] ?? 0),
            ddmm[1] - 1,
            ddmm[0]
        )
    }), {} as { [_ in keyof ZoneEntry]: Date }
    )

    if (!activeZone) return null

    let sortedKeys = (<(keyof typeof activeZone_dateObj)[]>Object.keys(activeZone_dateObj)).sort((keyA, keyB) => (activeZone_dateObj[keyA].getTime() - activeZone_dateObj[keyB].getTime()))

    let result = sortedKeys[0]
    for (let key of sortedKeys.slice(1)) {
        if (date.isBefore(activeZone_dateObj[key])) break
        result = key
    }

    return result
}
