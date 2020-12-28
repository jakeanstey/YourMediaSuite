const https = require('https');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

https.createServer({
  key: fs.readFileSync('data/server.key'),
  cert: fs.readFileSync('data/server.cert')}, 
  app).listen(443, () => {
  console.log('Listening...')
});

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(8080);