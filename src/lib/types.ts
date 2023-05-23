type Day = number & {};
type Month = number & {};
type YearOffset = number & {};

export type DDMM = [Day, Month, YearOffset?]

export type ZoneEntry = {
    /**
     * Start date of Quarter One
     */
    Q1: DDMM,
    /**
     * Start date of Quarter Two
     */
    Q2: DDMM,
    /**
     * Start date of uarter Three
     */
    Q3: DDMM,
    /**
     * Start date of Quarter Four
    */
    Q4: DDMM
}