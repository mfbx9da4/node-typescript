import { runTestAndWriteData, generateSorted, assert } from './utils'

// const array = [0, 8, 17, 35, 49, 52, 59, 76]

function indexOfSorted(num, array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (element === num) {
      return i
    }
  }
  return -1
}

function main() {
  runTestAndWriteData(indexOfSorted)
  const array = [6, 13, 14, 25, 33, 43, 51, 53, 64, 72, 84, 93, 95, 96, 97]
  assert(array.indexOf(10) === indexOfSorted(10, array))
  assert(array.indexOf(13) === indexOfSorted(13, array))
  assert(array.indexOf(96) === indexOfSorted(96, array))
}

main()
