<script lang="ts">
  import dayjs from "dayjs";
  import type { generateQuarterArray } from "../lib/util";
  export let quarters: ReturnType<typeof generateQuarterArray>;
  // export let highlightCurrent: boolean
</script>

<div class="quarterInfo">
  {#each quarters as quarter}
    <div class="quarterEntry">
      <div class="label">
        {quarter[0]}
      </div>
      <div class="months">
        {#each Array.from(Array(3).keys()) as k}
          <span>
            <div>
              {dayjs(quarter[2]).add(k, "month").format("MMM")}
            </div>
            <div>
              {dayjs(quarter[2]).add(k, "month").format("YYYY")}
            </div>
          </span>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .quarterInfo {
    place-content: center;

    display: flex;
    flex-direction: row;

    .quarterEntry {
      $borderWidth: 1px;
      $borderColour: grey;

      border: $borderWidth solid $borderColour;
      &:not(:first-child) {
        border-left: none;
      }

      flex: 1;

      > .label {
        border-bottom: $borderWidth solid $borderColour;
      }
      &:not(:first-child) > .label {
        border-left: none;
      }

      .months {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        > span {
          &:not(:last-child) {
            border-right: $borderWidth solid $borderColour;
          }
          > div:not(:last-child) {
            border-bottom: $borderWidth solid $borderColour;
          }

          > * {
            padding: 4px;
          }
        }
      }
    }
  }
</style>
