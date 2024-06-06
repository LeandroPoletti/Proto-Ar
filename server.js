// server.js
const {setup} = require('./banco')
const express = require('express');
const path = require("path")
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));


// Endpoint de exemplo
app.get('/api/data', (req, res) => {
  setup()
  res.json({ message: 'Hello from server-side!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));''
});

function startServer() {
  app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer()