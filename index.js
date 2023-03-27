// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');

// const PORT_NAME = 'COM7'; // Replace with the actual port name
// const BAUD_RATE = 9600;

// const comPort1 = new SerialPort({
// path: 'COM7',
// baudRate: 9600
// });

// const parser = new Readline();

// port.pipe(parser);

// parser.on('data',function(line) {
//   const matches = line.match(/Lat: (-?\d+\.\d+), Lng: (-?\d+\.\d+)/);
//   if (matches){
//     const latitude = parseFloat(matches[1]);
//     const longitude = parseFloat(matches[2]);
//     console.log("Latitude: " + latitude);
//     console.log("Longitude: " + longitude);
//   }
// });


// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');

// const port = new SerialPort('COM7', { baudRate: 9600 });
// const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// parser.on('data', (data) => {
//   if (data.startsWith("Latitude")) {
//     const latitude = parseFloat(data.substring(10));
//     console.log(`Latitude: ${latitude}`);
//   } else if (data.startsWith("Longitude")) {
//     const longitude = parseFloat(data.substring(11));
//     console.log(`Longitude: ${longitude}`);
//   }
// });


// const { Board, GPS } = require("johnny-five");
// const SerialPort = require('serialport');

// const board = new Board();

// board.on("ready", () => {
//   SerialPort.list().then((ports) => {
//     const gpsPort = ports.find(port => /usb|acm|^com/i.test(port.comName));
//     if (!gpsPort) {
//       console.log('GPS module not found.');
//       return;
//     }

//     const gps = new GPS({
//       port: new SerialPort(gpsPort.comName, { baudRate: 9600 }),
//       pins: {
//         rx: 11,
//         tx: 10,
//       }
//     });

//     gps.on("ready", () => {
//       console.log("GPS module is ready.");
//     });

//     gps.on("error", () => {
//       console.log("GPS module error.");
//     });

//     gps.on("change", () => {
//       console.log("latitude:", gps.latitude);
//       console.log("longitude:", gps.longitude);
//     });
//   });
// });


const serialport = require('serialport');
var SerialPort = serialport.SerialPort;
const Readline = require('@serialport/parser-readline');

const port = new SerialPort({
  path: "COM7",
  baudRate:9600,
}); //Replace '/dev/ttyACM0' with correct serial port name for Arduino board

const parser = new serialport.parsers.Readline({
  delimiter: '\r\n'
});

port.pipe(parser);

parser.on('data', (line) => console.log(line));

port.write("HI");