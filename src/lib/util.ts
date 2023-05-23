import dayjs from "dayjs";
import defaultZones from './zoneDefaults'
import { getZones } from "./zoneStorage";
import type { Year, ZoneEntry } from "./types";

export function formatLookup(obj: ReturnType<typeof lookup>) {
    return `FY${obj[1]} ${obj[0]}`
}

export function generateQuarterArray(zone: ZoneEntry, year: number) {
    if (!zone) return null

    let result: Array<[keyof ZoneEntry, Year, Date]> = Object.entries(zone).reduce((obj, [key, ddmm]) => ([
        ...obj,
        [key, year, new Date(
            year + (ddmm[2] ?? 0),
            ddmm[1] - 1,
            ddmm[0]
        )]
    ]), [])

    return result
}

function sortQuarterArray() {

}

function sortFn() {

}

export function getZone(zoneString: string) {
    let zones: Record<string, ZoneEntry> = { ...defaultZones, ...getZones() }
    let activeZone = zones[zoneString]
    if (!activeZone) return null

    return activeZone
}


export function lookupString(zoneString: string, date?: dayjs.Dayjs) {
    if (!date) date = dayjs()

    let activeZone = getZone(zoneString)
    if (!activeZone) return null

    return lookup(activeZone, date)

}
export function lookup(zone: ZoneEntry, date?: dayjs.Dayjs) {
    if (!date) date = dayjs()

    let quarterArray = [
        ...generateQuarterArray(zone, date.year()),
        ...generateQuarterArray(zone, date.year() + 1)
    ]

    let sortedKeys = Array.from(Array(quarterArray.length).keys())
        .sort((keyA, keyB) => (quarterArray[keyA][2].getTime() - quarterArray[keyB][2].getTime()))

    let result = sortedKeys[0]
    for (let key of sortedKeys.slice(1)) {
        if (date.isBefore(quarterArray[key][2])) break
        result = key
    }

    return quarterArray[result]
}


function previousQuarter(zone: ZoneEntry, currentQuarter: ReturnType<typeof lookup>) {

    let keys = Object.keys(zone);
    let previousQuarterKey = keys[(keys.indexOf(currentQuarter[0]) - 1 + keys.length) % keys.length];
    let previousQuarter = zone[previousQuarterKey];

    let date = dayjs(new Date(
        currentQuarter[1] + (previousQuarter[2] ?? 0),
        previousQuarter[1] - 1,
        previousQuarter[0]
    ));

    if (date.isAfter(currentQuarter[2])) {
        date = date.subtract(1, 'year')
    }

    return lookup(zone, dayjs(date))
}


function nextQuarter(zone: ZoneEntry, currentQuarter: ReturnType<typeof lookup>) {

    let keys = Object.keys(zone);
    let nextQuarterKey = keys[(keys.indexOf(currentQuarter[0]) + 1) % keys.length];
    let nextQuarter = zone[nextQuarterKey];

    let date = dayjs(new Date(
        currentQuarter[1] + (nextQuarter[2] ?? 0),
        nextQuarter[1] - 1,
        nextQuarter[0]
    ));

    if (date.isBefore(currentQuarter[2])) {
        date = date.add(1, 'year')
    }

    return lookup(zone, dayjs(date))
}

/**
 * Context Manager
 */
export const withZone = (zone: string | ZoneEntry) => {
    let target: ZoneEntry
    target = (typeof zone === 'string') ? getZone(zone) : zone
    if (!target) return null

    return {
        lookup: (date?: dayjs.Dayjs) => lookup(target, date),
        getZone: () => target,
        generateQuarterArray: (year: number) => generateQuarterArray(target, year),
        nextQuarter: (currentQuarter: ReturnType<typeof lookup>) => nextQuarter(target, currentQuarter),
        previousQuarter: (currentQuarter: ReturnType<typeof lookup>) => previousQuarter(target, currentQuarter)
    }
}