var speedCanvas = document.getElementById('speedChart')

Chart.defaults.global.defaultFontFamily = 'Lato'
Chart.defaults.global.defaultFontSize = 18

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

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black',
    },
  },
}

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  // data,
  data: DATA,
  options: chartOptions,
})
