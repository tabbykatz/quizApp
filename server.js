const express = require("express");
const cors = require("cors");
const questions = require("./questions.json");

const app = express();

app.get("/api/questions", cors(), (req, res) => {
  res.send(questions);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
