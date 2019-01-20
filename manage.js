
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('test.db');


  function  InsertData(fname,lname,course,sn,id,year,misc,tuition,downpayment,other,total,payment){
        var requested = "false";
        let sql = `INSERT INTO students(firstname,lastname,course,idcode,studentid,year,requested,misc,tuition,downpayment,others,total,premid,mid,final,prefinal)
         VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.run(sql, [fname,lname,course,sn,id,year,requested,misc,tuition,downpayment,other,total,payment,payment,payment,payment], (err) => {
            if (err) {
              throw err;
            }
            console.log(`Rows inserted ${this.changes}`);
          });
           
          // close the database connection
          db.close();
    }



module.exports.InsertData = InsertData;

