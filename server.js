const express = require('express')
const webpack = require('webpack')
const fs = require("fs")
const webPackDevMiddleware = require('webpack-dev-middleware')
const axios = require('axios')
const app = express()
const config = require('./webpack.config')
const compiler = webpack(config)

//-----------
var filePathData = "src/data/EWords2.json"
let rawData = fs.readFileSync(filePathData)
var listWordEng = JSON.parse(rawData)

//-----------
app.use(
    webPackDevMiddleware(compiler,
        {
            publicPath: config.output.publicPath,
        })
    
)
app.get('/engDataSearch', (req, res)=>{
    res.end(JSON.stringify(listWordEng))
} )
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
  });