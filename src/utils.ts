import perf from 'perf_hooks'

import { writeData } from './writeData'
import { indexOfSortedRef } from './indexOfSorted'

export function expect(bool) {
  if (bool) {
    console.log('✅')
  } else {
    console.log('😭')
  }
}

export function time(fn: Function): number {
  const start = perf.performance.now()
  fn()
  const end = perf.performance.now()
  return end - start
}

export function generateSorted(num: number): Array<number> {
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

export function runTest(fn) {
  const labels = []
  const IndexOf = []
  const IndexOfSorted = []
  const IndexOfSortedRef = []
  let arraySize = 10000
  let endSize = Math.pow(10, 7)
  let increment = (endSize - arraySize) / 8
  for (let i = 0; i < 8; i++) {
    var num = Math.random() * 100
    // arraySize = 10 * i
    // arraySize = Math.pow(10, i)
    arraySize += increment
    labels.push(`${Math.floor(arraySize / 1000000)}m numbers`)
    var testArray = generateSorted(arraySize)
    // var _indexOfSortedRef = time(() => indexOfSortedRef(num, testArray))
    // IndexOfSortedRef.push(_indexOfSortedRef)
    var _indexOfSorted = time(() => fn(num, testArray))
    IndexOfSorted.push(_indexOfSorted)
    var _indexOf = time(() => testArray.indexOf(num))
    IndexOf.push(_indexOf)
    console.log('Size of array', arraySize)
    console.log(_indexOf)
    console.log(_indexOfSorted)
  }
  return {
    labels,
    IndexOf,
    IndexOfSorted,
    // IndexOfSortedRef,
  }
}

export function runTestAndWriteData(fn) {
  const data = runTest(fn)
  writeData(data)
  return data
}
