const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('test.db');

db.run(`CREATE TABLE IF NOT EXISTS students (id integer PRIMARY KEY AUTOINCREMENT,
    firstname text not null,
    middlename text,
    lastname text not null,
    course text not null,
    date text not null,
    studentnumber text not null,
    profilepic text not null)`);

db.close()
