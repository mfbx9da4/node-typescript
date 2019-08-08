const fs = require('fs')

async function writeFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, function(err) {
      err && reject(err)
      resolve()
    })
  })
}

var dataFirst = {
  label: 'indexOfSorted',
  data: [0, 59, 75, 20, 20, 55, 40],
  fill: false,
  borderColor: 'purple',
  borderWidth: 5,
}

var dataSecond = {
  label: 'indexOf',
  data: [20, 15, 60, 60, 65, 30, 70],
  fill: false,
  borderColor: 'crimson',
  borderWidth: 5,
}

var data = {
  labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
  datasets: [dataFirst, dataSecond],
}

function createDataset(label, data, i) {
  const colors = ['crimson', 'purple', '#27ae60']
  return {
    label,
    data,
    fill: false,
    borderColor: colors[i % colors.length],
    borderWidth: 7,
  }
}

export async function writeData(data) {
  const { labels, ...rest } = data

  var out = {
    labels,
    datasets: Object.keys(rest).map((k, i) => createDataset(k, rest[k], i)),
  }
  await writeFile('./public/data.js', `window.DATA = ${JSON.stringify(out)}`)
  return out
}
