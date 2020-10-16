const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).json({ data: 'TECHTONIC SLACK SHOUT BOT SERVER' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
