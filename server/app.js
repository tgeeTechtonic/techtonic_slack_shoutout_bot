const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/shoutoutRoutes"));

module.exports = app;
