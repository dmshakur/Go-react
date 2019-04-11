const express = require('express')
const path = require('path')
const logger = require('morgan')

const app = express()

const http = require('http').Server(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function(req, res) {
  res.sendfile(path.join(__dirname, 'build', 'index.html
})

const port = process.env.PORT || 3001

http.listen(port, function() {
  console.log(`Hello caller on line ${port}, you're on the air...`)
})
