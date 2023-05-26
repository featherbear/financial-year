<script lang="ts">
  import Clock from "./lib/Clock";
  import { withZone } from "./lib/util";
  import QuarterTable from "./components/QuarterTable.svelte";
  import Carousel from "./components/Carousel.svelte";

  let zoneContext = withZone("Australia");

  let quarter = zoneContext.lookup($Clock);
  let nextQuarter = zoneContext.nextQuarter(quarter);
  let previousQuarter = zoneContext.previousQuarter(quarter);
</script>

<main>
  <Carousel {quarter} {previousQuarter} {nextQuarter} />
  <br />
  <QuarterTable quarters={zoneContext.generateQuarterArray($Clock.year())} />
</main>
