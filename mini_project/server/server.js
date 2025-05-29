// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const wireguard = require('./api/wireguard');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', wireguard);

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
