const ChartjsNode = require('chartjs-node')

async function createChart() {
  var chartNode = new ChartjsNode(600, 600)
  var data = [
    {
      x: 10,
      y: 20,
    },
    {
      x: 15,
      y: 10,
    },
  ]
  var chartJsOptions = {
    type: 'line',
    data,
    options: {},
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
