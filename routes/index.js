import fs from 'fs'

const readDB = () => {
  return JSON.parse(fs.readFileSync(__dirname + '/../test.json'))
}

const writeDB = () => {

}

const home = (req, res) => {
  res.render('index', {
    name: 'ken',
    readDB,
    writeDB
  })
}

export {home}