import fs from 'fs'

function asArrayNumber(testCase: string): number[] {
  return testCase.split(' ').map((x) => {
    return parseInt(x, 10)
  })
}

function findGreatest(sisters: Array<number>): number {
  return Math.max(...sisters)
}

function calculateDifference(greatest: number, sisters: number[]): number {
  let difference = 0
  for (let i = 0; i < sisters.length; i++) {
    difference = greatest - sisters[i] + difference
  }
  return difference
}

function solve(lines: string[]) {
  const testCases = lines.slice(1)
  for (let i = 0; i < testCases.length; i++) {
    const numbers = asArrayNumber(testCases[i])
    const sisters = [numbers[0], numbers[1], numbers[2]]
    const n = numbers[3]
    const greatest = findGreatest(sisters)
    const difference = calculateDifference(greatest, sisters)
    const remainder = n - difference
    if (remainder >= 0 && remainder % 3 === 0) {
      console.log('YES')
    } else {
      console.log('NO')
    }
  }
}

function main() {
  const stdinBuffer = fs.readFileSync(0)
  const lines = stdinBuffer
    .toString()
    .split('\n')
    .filter((x) => x !== '')
  solve(lines)
}

main()
