import perf from 'perf_hooks'

import { writeData } from './writeData'
import { indexOfSortedRef } from './indexOfSorted'

// function indexOfSorted(array, num) {
//   for (let i = 0; i < array.length; i++) {
//     const value = array[i]
//     if (value === num) {
//       return i
//     }
//   }
//   return -1
// }

// const array = [0, 8, 17, 35, 49, 52, 59, 76]

export function indexOf(num, array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (element === num) {
      return i
    }
  }
  return -1
}

// assert(array.indexOf(10) === indexOfSorted(10, array))
// assert(array.indexOf(13) === indexOfSorted(13, array))
// assert(array.indexOf(96) === indexOfSorted(96, array))

export function assert(bool) {
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

function average(arr: Array<number>): number {
  return arr.reduce((prev, cur) => prev + cur, 0) / arr.length
}

export function runTest(fn, includeRef = false) {
  let includeNative = true
  const labels = []
  const IndexOf = []
  const ours = []
  const IndexOfSortedRef = []
  let arraySize = 10000
  let endSize = Math.pow(10, 7)
  let increment = (endSize - arraySize) / 8
  let testN = 7
  for (let i = 0; i < 8; i++) {
    // Create test env
    var num = Math.random() * 100
    arraySize += increment
    labels.push(`${Math.floor(arraySize / 1000000)}m numbers`)
    var ref = []
    var _ours = []
    var _indexOf = []

    // Do tests
    for (let j = 0; j < testN; j++) {
      // Create array
      var testArray = generateSorted(arraySize)
      // time them
      _ours.push(time(() => fn(num, testArray)))
      if (includeRef) ref.push(time(() => indexOfSortedRef(num, testArray)))
      if (includeNative) _indexOf.push(time(() => testArray.indexOf(num)))
    }

    IndexOfSortedRef.push(average(ref))
    ours.push(average(_ours))
    IndexOf.push(average(_indexOf))

    // Log
    console.log('Size of array', arraySize)
    console.log(_indexOf)
    console.log(ours)
  }

  const out = {
    labels,
  }
  if (includeRef) out['💪 Binary Search'] = IndexOfSortedRef
  if (includeNative) out['Native (indexOf)'] = IndexOf
  // out['Linear (indexOf)'] = ours

  return out
}

type NewFuncType = (target: number, array: Array<number>) => number
export function runTestAndWriteData(fn: NewFuncType, includeRef = false) {
  const data = runTest(fn, includeRef)
  writeData(data)
  return data
}
