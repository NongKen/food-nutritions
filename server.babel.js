import express from 'express'
import fs from 'fs'
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
const options = { beautify: false };
app.engine('jsx', require('express-react-views').createEngine(options));

// const test = () => {
//     const a = JSON.parse(fs.readFileSync('./test.json'))
//     console.log(a)
// }
// test()

app.get('/', require('./routes').index);
// app.use('/', express.static('public'))

app.listen(process.env.PORT || 3000)