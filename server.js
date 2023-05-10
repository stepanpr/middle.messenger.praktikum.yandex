// server.js
// PORT = 3000

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => console.log(`Server runs on  ${PORT}!`));
