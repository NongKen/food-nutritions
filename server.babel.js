import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'

var path = require('path');
var mime = require('mime');

const app = express();

// app.set('views', __dirname + '/views')
// app.set('view engine', 'jsx')
// const options = { beautify: false }
// app.engine('jsx', require('express-react-views').createEngine(options))

const readDB = () => {
  return JSON.parse(fs.readFileSync('test.json'))
}

const writeDB = () => {

}

app.use('/', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
// 	res.render('index', {
// 			name: 'ken',
// 			readDB,
// 			writeDB
// 	})
// })

// app.get('/ingredence', require('./routes').index);

app.get('/api/ken/downloadDB', (req, res) => {
	var file = __dirname + '/bookyDB.json';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
})

app.get('/api/getDB', (req, res) => {
	const db = JSON.parse(fs.readFileSync('bookyDB.json'))
	res.status(200).json(db)
})

app.get('/api/saveDB', (req, res) => {
  fs.writeFile('bookyDB.json', req.query.json, (err) => {
    if (err) res.status(403).json({ status: 'error'})
    else res.status(200).json({ status: 'success'})
  })
})


app.listen(process.env.PORT || 3000)