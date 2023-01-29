const mysql = require('mysql2')
require('dotenv').config()
const fs = require("fs");
const { join } = require('path');



const con = mysql.createConnection({
    host     : process.env.host_MYSQL,
    user     : process.env.user_MYSQL,
    password : process.env.password_MYSQL,
    database : process.env.database_MYSQL
  })

  con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
  let filePathData = "src/data/EWords2.json"

  let rawData = fs.readFileSync(filePathData)
  let listWordEng = JSON.parse(rawData)
  let sql = 'INSERT INTO englishword (word) VALUES (?);'
  for(let i = 0; i < listWordEng.length; i++){
      console.log(listWordEng[i])
      con.query(sql, [listWordEng[i]],function(err,result,fields){
        if (err) {
            console.log(err)
            return}
        console.log("hi", i)
      })


      if(i == listWordEng.length - 1){
        console.log("Done")
          break
      }
  }
  


  