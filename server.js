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
const https = require("https")
// const configMySql = require('./configMySql.js')
// const port = require('./configPort')
require('dotenv').config()
// console.log(process.env)
if(process.env.MODE_SSL === '1'){
  port = process.env.PORT_443
} else{
  port = process.env.PORT_8080
}
const logOn = true
//-----------
let filePathData = "src/data/EWords2.json"
let rawData = fs.readFileSync(filePathData)
let listWordEng = JSON.parse(rawData)
const con = mysql.createConnection({
  host     : process.env.host_MYSQL,
  user     : process.env.user_MYSQL,
  password : process.env.password_MYSQL,
  database : process.env.database_MYSQL
})
//-----------

con.connect(function(err) {
  if (err) throw err;
  if(logOn) console.log("Database Connected!");
});

//Use Middleware of Webpack

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

  let sql = 'SELECT * FROM user WHERE email = '+email+' AND password = '+password
  // let sql = 'SELECT * FROM user WHERE email = ? AND password = ?'
  console.log('sql: ', sql)
  if (email && password) {
    //Querry email with password
    con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email,password], function(err, results, fields){		
			if (err) throw err
			console.log(results)
			if (results.length > 0) {
        //Add token of that user to database, If success, save it to user cookie
				con.query('UPDATE user SET token = ? WHERE email = ?;', [userToken, email], function(err, results1, fields){
          if (err) throw err
          // console.log(results1)
          console.log(results)
          console.log(results[0].username)
          // req.session.loggedin = true
          // req.session.email = results.email
          // req.session.username = results[0].username
  
          // res.json({email:email, token:userToken})
          let exdays = 15
          let options = {
            maxAge: 24 * 60 * 60 * 1000 * exdays, 
        }
        //add Login infor in cookie of Client
          res.cookie('email', email, options)
          res.cookie('token', userToken, options)
          res.cookie('username', results[0].username, options)
          //go to home page
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
  
  let sql = 'INSERT INTO user (username, password, email, token) VALUES (?,?,?,?);'
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
          let exdays = 15
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
        let searchedWord = req.url.split("=")[1]
        console.log(searchedWord)
        let urlSearchOxford = "https://www.oxfordlearnersdictionaries.com/definition/english/"+ searchedWord

        
        console.log(urlSearchOxford)
        
        try {
            axios(urlSearchOxford).then((response) => {
              
            //   console.log(html);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(response.data)
            // pageSearch += `<div class="col">` + response.data + `</div>`
            }).catch(function (error) {
              // xử trí khi bị lỗi
              console.log(error);
              
            })
          } catch (error) {
            // console.log(error, error.message);
            res.writeHead(404)
            res.end()
          }

    
} )

if (process.env.MODE_SSL === '1') {
  https.createServer({
    key: fs.readFileSync(process.env.KEY_SSL),
    cert: fs.readFileSync(process.env.CERT_SSL),
  },app).listen(port, ()=>{
    console.log('server https is runing at port' + port)
  });
} else {
  app.listen(port, function () {
    console.log('Example app listening on port '+port+' !\n');
  })
}


//Do not turn off Database
// con.end();