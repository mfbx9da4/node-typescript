export function indexOfSortedRef(value: number, array: Array<number>): number {
  let lo = 0
  let hi = array.length
  while (hi > lo) {
    const mid = Math.floor((hi - lo) / 2) + lo
    if (array[mid] === value) return mid
    if (value < array[mid]) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return -1
}
