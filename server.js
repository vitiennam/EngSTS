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

//-----------
var filePathData = "src/data/EWords2.json"
let rawData = fs.readFileSync(filePathData)
var listWordEng = JSON.parse(rawData)
const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '*',
  database : 'engsdb'
})
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
  let email = req.body.useremail;
	let password = req.body.userpassword;


  var sql = 'SELECT * FROM user WHERE email = '+email+' AND password = '+password
  // var sql = 'SELECT * FROM user WHERE email = ? AND password = ?'
  console.log('sql: ', sql)
  if (email && password) {
    // con.query(sql, function(err, results, fields){
    con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email,password], function(err, results, fields){		
			if (err) throw err;
			
			if (results.length > 0) {
				
				req.session.loggedin = true;
				req.session.email = email;
				
				res.redirect('/')
			} else {
				res.send('Incorrect Email and/or Password!')
			}			
			res.end()
    })
  } else {
    res.send('Incorrect Email and/or Password!')
    res.end()
  }

})

app.post('/signup', function(req, res){
  console.log(req.body)
  let email = req.body.useremail;
	let password = req.body.userpassword;
  let username = req.body.username;

  // INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
  // var sql = 'INSERT INTO user (username, password, email) VALUES ('+username+','+password+','+email+');'
  var sql = 'INSERT INTO user (username, password, email) VALUES (?,?,?);'
  console.log('sql: ', sql)
  if (email && password && username) {
    con.query('SELECT * FROM user WHERE email = ?', [email], function(err, results, fields){		
      if (err) {
        res.end()
        throw err
      }
      if (results.length === 0) {
        con.query(sql, [username, password, email], function(err, results, fields){
            
          if (err) throw err;
          console.log("1 record inserted");
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

app.listen(8080, function () {
    console.log('Example app listening on port 8080!\n');
  })
// con.end();