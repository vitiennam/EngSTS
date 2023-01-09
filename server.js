const express = require('express')
const webpack = require('webpack')
const fs = require("fs")
const webPackDevMiddleware = require('webpack-dev-middleware')
const axios = require('axios')
const app = express()
const config = require('./webpack.config')
const compiler = webpack(config)
const session = require('express-session');
const mysql = require('mysql2')
const randomToken = require('random-token')
const configMySql = require('./configMySql.js')
// import  configMySql  from './configMySql'
// import { configMySql } from './configMySql.js'
//-----------
var filePathData = "src/data/EWords2.json"
let rawData = fs.readFileSync(filePathData)
var listWordEng = JSON.parse(rawData)
const con = mysql.createConnection(configMySql)
//-----------
// con.connect();
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



app.use(
    webPackDevMiddleware(compiler,
        {
            publicPath: config.output.publicPath,
        })
    
)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/engDataSearch', (req, res)=>{
    res.end(JSON.stringify(listWordEng))
} )
app.post('/login', function(req, res){
  console.log(req.body)
  let email = req.body.useremail
	let password = req.body.userpassword
  const userToken = randomToken(16)

  var sql = 'SELECT * FROM user WHERE email = '+email+' AND password = '+password
  // var sql = 'SELECT * FROM user WHERE email = ? AND password = ?'
  console.log('sql: ', sql)
  if (email && password) {
    // con.query(sql, function(err, results, fields){
    con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email,password], function(err, results, fields){		
			if (err) throw err
			console.log(results)
			if (results.length > 0) {
				con.query('UPDATE user SET token = ? WHERE email = ?;', [userToken, email], function(err, results1, fields){
          if (err) throw err
          // console.log(results1)
          console.log(results)
          console.log(results[0].username)
          req.session.loggedin = true
          req.session.email = results.email
          req.session.username = results[0].username
  
          // res.json({email:email, token:userToken})
          var exdays = 15
          let options = {
            maxAge: 24 * 60 * 60 * 1000 * exdays, // would expire after 15 minutes
            // httpOnly: true, // The cookie only accessible by the web server
            // signed: true // Indicates if the cookie should be signed
        }
          res.cookie('email', email, options)
          res.cookie('token', userToken, options)
          res.cookie('username', results[0].username, options)
          // res.write(JSON.stringify({email:email, token:userToken}))
          res.redirect('/')
          res.end()
        })
				
				
			} else {
				res.send('Incorrect Email and/or Password!')
        res.end()
			}			
			
    })
  } else {
    res.send('Incorrect Email and/or Password!')
    res.end()
  }
  // res.end()
})

app.post('/signup', function(req, res){
  console.log(req.body)
  let email = req.body.useremail;
	let password = req.body.userpassword;
  let username = req.body.username;
  const userToken = randomToken(16)
  // INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
  // var sql = 'INSERT INTO user (username, password, email) VALUES ('+username+','+password+','+email+');'
  var sql = 'INSERT INTO user (username, password, email, token) VALUES (?,?,?,?);'
  console.log('sql: ', sql)
  if (email && password && username) {
    con.query('SELECT * FROM user WHERE email = ?', [email], function(err, results, fields){		
      if (err) {
        res.end()
        throw err
      }
      if (results.length === 0) {
        con.query(sql, [username, password, email, userToken], function(err, results, fields){
            
          if (err) throw err;
          console.log("1 record inserted")
          // res.write(userToken)
          // res.json({username:username, token:userToken})
          var exdays = 15
          let options = {
            maxAge: 24 * 60 * 60 * 1000 * exdays, // would expire after 15 minutes
            // httpOnly: true, // The cookie only accessible by the web server
            // signed: true // Indicates if the cookie should be signed
        }
          res.cookie('email', email, options)
          res.cookie('token', userToken, options)
          res.cookie('username', username, options)
          res.redirect('/')
          res.end()
        })
      }
      else {
        res.end('account existed')
      }
      

  })

  } else {
    res.send('Incorrect Email and/or Password!')
    res.end()
  }


  
})
app.get('/randomWord', (req,res)=>{
  res.end(listWordEng[Math.floor(Math.random() * listWordEng.length)])

})
app.get(/queryWordO/, (req, res)=>{
    
        console.log(req.url)
        var searchedWord = req.url.split("=")[1]
        console.log(searchedWord)
        var urlSearchOxford = "https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ searchedWord+ "?q="+ searchedWord

        
        console.log(urlSearchOxford)
        
        try {
            axios(urlSearchOxford).then((response) => {
              
            //   console.log(html);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(response.data)
            // pageSearch += `<div class="col">` + response.data + `</div>`
            });
          } catch (error) {
            // console.log(error, error.message);
            res.writeHead(404)
            res.end()
          }

    
} )

app.listen(8080, '0.0.0.0', function () {
    console.log('Example app listening on port 8000!\n');
  })
// con.end();