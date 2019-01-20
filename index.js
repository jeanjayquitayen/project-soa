var express = require('express');
let date = new Date();
var path = require('path');
const port = 3000;       
var sqlite3 = require('sqlite3').verbose();
 

if(date.getDate() == 1){
     let db = new sqlite3.Database('test.db');
     let sqlupdate = `UPDATE students SET requested = ?`
     db.run(sqlupdate,['false'],(err)=>{
          if(err){
               throw err;
          }
     })
     db.close();
}

var app = express();
var server = app.listen(port, () => {
     console.log('on port' + port)
     })
var io = require('socket.io')(server) 
app.use(express.static(path.join(__dirname +'/public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/popper.js/dist'));
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline; 
const usbport = new SerialPort('/dev/ttyACM0',{
      baudRate: 9600
     });
const parser = usbport.pipe(new Readline({delimiter: '\r\n'}));
parser.on('data', (data)=>{
     console.log(data);
     let db = new sqlite3.Database('test.db');
     let sql = `SELECT * FROM students WHERE idcode= '${data}'`;
     let sqlupdate = `UPDATE students SET requested = ? WHERE idcode= ?`
     db.get(sql, [], (err, row) => {
       if (err) {
         throw err;
       }
       if(row.requested != 'true'){
          db.run(sqlupdate,['true',data],(err)=>{
               if(err){
                    throw err;
               }
          })
          io.sockets.emit('data', row);  
       }
       else{
            io.sockets.emit('error')
       }

     });
      
     // close the database connection
     db.close();
     
     
  }); 
usbport.on('error',(err)=>{
     console.log(err);
     
})
usbport.on('open',()=>{
     console.log('Arduino Communication Established!');
     
})

io.sockets.on('connection',(socket)=>{
     console.log('Socket Connection Established!');
     console.log(socket.id);
     });

