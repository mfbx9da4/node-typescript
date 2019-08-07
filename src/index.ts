const perf = require('perf_hooks')

function generateSorted(num: number): Array<number> {
  const out = []
  let prev = 0
  for (let i = 0; i < num; i++) {
    const random = Math.random()
    const fraction = (i / num) * 100
    const width = fraction - prev
    const x = random * width
    prev = Math.floor(x) + prev
    out.push(prev)
  }
  return out
}

function indexOfSorted(value: number, array: Array<number>): number {
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

function time(fn: Function): number {
  const start = perf.performance.now()
  fn()
  const end = perf.performance.now()
  return end - start
}

function runTest() {
  for (let i = 0; i < 6; i++) {
    var num = Math.random() * 100
    var arraySize = 10000000 * i
    var testArray = generateSorted(arraySize)
    var ours = time(() => indexOfSorted(num, testArray))
    var native = time(() => testArray.indexOf(num))
    console.log('Size of array', arraySize)
    console.log(native)
    console.log(ours)
  }
}

runTest()
