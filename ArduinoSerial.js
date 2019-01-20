var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline

var serialPort = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
})

serialPort.on('open', function (data) {
    io.emit('data', { 'data': data });
});

var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
    io.emit('data', { data: data });
})