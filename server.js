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

// --> get request <--
app.get("/todo", (req, res) => {
  res.send("List all todo elements.");
});

// --> post request <--
app.post("/todo", (req, res) => {
  res.send("Adding todo elements.");
});

// --> put request <--
app.put("/todo/:id", (req, res) => {
  res.send("Udating todo elements.");
});

// --> delete request <--
app.delete("/todo", (req, res) => {
  res.send("Deleting todo elements.");
});
