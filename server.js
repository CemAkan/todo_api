var express = require("express");
var app = express();
require("dotenv").config();

var PORT = process.env.PORT;

// --> Data Base Connection <--
var dataBase = require("./connect.js");

// --> Open a Port <--
dataBase.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Working on port: " + PORT);
  });
});
