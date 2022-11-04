
const axios = require('axios')

const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('server'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/styles', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/style.css'));
});
app.get('/js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/main.js'));
});


app.listen(4000, console.log('Server running on 4000'))