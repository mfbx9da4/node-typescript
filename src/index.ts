import fs from 'fs'

function solve(lines: string[]) {
  console.log('lines', lines)
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
