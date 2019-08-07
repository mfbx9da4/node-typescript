const ChartjsNode = require('chartjs-node')

var data = {
  labels: ['0', '5', '7.5', '10', '11', '12', '13', '15'],
  datasets: [
    {
      label: 'SES 3.4',
      fillColor: 'rgba(255,255,255,0)',
      strokeColor: 'rgba(16,133,135,1)',
      pointColor: 'rgba(16,133,135,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(16,133,135,1)',
      data: [
        '128.940',
        '131.397',
        '132.235',
        '128.235',
        '125.636',
        '127.271',
        '125.667',
        '129.554',
      ],
    },
    {
      label: 'SES 5.6',
      fillColor: 'rgba(255,255,255,0)',
      strokeColor: 'rgba(82,185,159,1)',
      pointColor: 'rgba(82,185,159,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(82,185,159,1)',
      data: [
        '128.948',
        '130.369',
        '131.038',
        '125.867',
        '121.893',
        '119.656',
        '119.026',
        '119.737',
      ],
    },
    {
      label: 'SES 6.7',
      fillColor: 'rgba(255,255,255,0)',
      strokeColor: 'rgba(242,175,62,1)',
      pointColor: 'rgba(242,175,62,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(242,175,62,1)',
      data: [
        '127.473',
        '128.983',
        '129.327',
        '123.416',
        '118.829',
        '116.843',
        '117.190',
        '115.215',
      ],
    },
    {
      label: 'SES 8.9',
      fillColor: 'rgba(255,255,255,0)',
      strokeColor: 'rgba(236,83,62,1)',
      pointColor: 'rgba(236,83,62,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(236,83,62,1)',
      data: [
        '127.283',
        '125.147',
        '124.489',
        '116.783',
        '111.696',
        '110.563',
        '105.469',
        '104.332',
      ],
    },
  ],
}

var options = {
  legend: {
    position: 'bottom',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: 'rgba(0,0,0,0.5)',
          fontStyle: 'bold',
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 20,
        },
        gridLines: {
          drawTicks: false,
          display: false,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          zeroLineColor: 'transparent',
        },
        ticks: {
          padding: 20,
          fontColor: 'rgba(0,0,0,0.5)',
          fontStyle: 'bold',
        },
      },
    ],
  },
}

export async function createChart() {
  var chartNode = new ChartjsNode(600, 600)
  var chartJsOptions = {
    type: 'line',
    data,
    options,
  }
  await chartNode.drawChart(chartJsOptions)
  const buffer = await chartNode.getImageBuffer('image/png')
  Array.isArray(buffer) // => true
  // as a stream
  const streamResult = await chartNode.getImageStream('image/png')
  // using the length property you can do things like
  // directly upload the image to s3 by using the
  // stream and length properties
  streamResult.stream // => Stream object
  streamResult.length // => Integer length of stream
  // write to a file
  await chartNode.writeImageToFile('image/png', './testimage.png')
}
