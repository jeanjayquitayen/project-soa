



'use strict';
var inquirer = require('inquirer');
// var chalkPipe = require('chalk-pipe');


let sqlite3 = require('sqlite3').verbose();

var questions = [
  {
    type: 'input',
    name: 'first_name',
    message: "What's your first name"
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What's your last name",
    default: function() {
      return 'Dela Cruz';
    }
  },

  {
    type: 'input',
    name: 'course',
    message: "What's your course",
  },

  {
    type: 'input',
    name: 'idnumber',
    message: "What's your id number",
  },

  {
    type: 'input',
    name: 'year',
    message: "Year Level?",
  },
  {
    type: 'input',
    name: 'tuition',
    message: "Tuition Fee for the course?",
  },

  {
    type: 'input',
    name: 'downpayment',
    message: "Downpayment?",
  },

//   {
//     type: 'input',
//     name: 'phone',
//     message: "What's your phone number",
//     validate: function(value) {
//       var pass = value.match(
//         /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
//       );
//       if (pass) {
//         return true;
//       }

//       return 'Please enter a valid phone number';
//     }
//   }
];


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline; var inquirer = require('inquirer');
// var chalkPipe = require('chalk-pipe');
let manage = require('./manage.js')

const usbport = new SerialPort('/dev/ttyACM0',{
      baudRate: 9600
    
     });
usbport.on('error',(err)=>{
     console.log(err);
     
})
usbport.on('open',()=>{
     console.log('Arduino Communication Established!');
     
})    
const parser = usbport.pipe(new Readline({delimiter: '\r\n'})); 
parser.on('data', (data)=>{
    console.log(data);
    let db = new sqlite3.Database('test.db');
    let sql = `SELECT * FROM students WHERE idcode= '${data}'`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      if(rows.length > 0){
          console.log("ID already exists!")
        // rows.forEach((row) => {
        //     console.log(row);
        //   });
      }
      else{
        inquirer.prompt(questions).then(answers => {
            //console.log(JSON.stringify(answers, null, '  '));
            let misc =6500,
                other = misc*0.3,
                total = misc + other + parseInt(answers.tuition),
                paymentperterm = (total - parseInt(answers.downpayment))/4,
                tuition = parseInt(answers.tuition),
                downpayment = answers.downpayment;
            manage.InsertData(answers.first_name,answers.last_name,answers.course,data,answers.idnumber,answers.year,misc,tuition,downpayment,other,total,paymentperterm);
          });
      }
    });
     
    // close the database connection
    db.close();

    
 });




