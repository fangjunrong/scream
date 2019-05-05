const express = require('express')
const path = require('path')
const app = express()

const port = 8084

app.use(express.static('public'));
 
// app.get('/index.htm', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })

// app.get('/', function (req, res) {
//   res.sendFile( __dirname + "/" + "index.html" );
// })

app.use(express.static(path.join(__dirname, 'dist')))
app.listen(port,() => {
    console.log(`app listening on ${port}.`)
})