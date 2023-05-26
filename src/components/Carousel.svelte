<script lang="ts">
  import dayjs from "dayjs";
  import { formatLookup, lookup } from "../lib/util";
  export let previousQuarter: ReturnType<typeof lookup>,
    quarter: ReturnType<typeof lookup>,
    nextQuarter: ReturnType<typeof lookup>;
</script>

<div class="carousel">
  <section>
    Prev -
    {formatLookup(previousQuarter)}
    (Ended {dayjs(quarter[2]).subtract(1, "day").format("DD/MM/YYYY")})
  </section>
  <section>
    {formatLookup(quarter)}
    (currently)
  </section>
  <section>
    Next -
    {formatLookup(nextQuarter)}
    (Starts {dayjs(nextQuarter[2]).format("DD/MM/YYYY")})
  </section>
</div>

<style lang="scss">
  .carousel {
    section {
      transition: opacity 1s;
      &:nth-child(2) {
        font-size: 1.4em;
      }
      &:not(:nth-child(2)) {
        opacity: 0.5;
      }
    }
  }
</style>
