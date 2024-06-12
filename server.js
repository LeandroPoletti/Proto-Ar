// server.js
const {setup, removeAllData, createTestData, retrieveAllDataInfo, insertData} = require('./banco')
const express = require('express');
const path = require("path")
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));


// Endpoint de exemplo
app.get('/api/data', async (req, res) => {
  //res.json({ message: 'Hello from server-side!' });
  resultado = await retrieveAllDataInfo()
  res.json(resultado)
});

app.post('/api/insert', async (req, res) => {
  let succcess = await insertData(req.body)
  res.json(succcess)
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));''
});

function startServer() {
  app.listen(port, async () => {
      await setup()
      await removeAllData()
      await createTestData()
      console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer()