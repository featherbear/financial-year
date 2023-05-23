import { readable } from 'svelte/store'
import dayjs from 'dayjs'

function update() {
  return dayjs()
}
export default readable(update(), set => {
  let interval = setInterval(() => set(update()), 1000)
  return () => clearInterval(interval)
})