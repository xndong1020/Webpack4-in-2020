const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.get('/pig/', function(req, res) {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/pig.html')
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
  res.send(contentFromHtmlFile)
})
app.get('/rabbit/', function(req, res) {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/rabbit.html')
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
  res.send(contentFromHtmlFile)
})

// to server css and js files
app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.listen(3000, function() {
  console.log('Application is running on http://localhost:3000')
})
