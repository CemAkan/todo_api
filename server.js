var express = require("express");
var app = express();
require("dotenv").config();

var PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Working on port: " + PORT);
});
