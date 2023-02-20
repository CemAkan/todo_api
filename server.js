var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var _ = require("underscore");
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
  dataBase.Todo.findAll({
    where: {
      completed: false,
    },
  }).then((todos) => {
    res.json(todos);
  });
});

// --> post request <--
app.post("/todo", (req, res) => {
  let body = _.pick(req.body, "description", "completed");
  dataBase.Todo.create(body).then((todo) => {
    res.json(todo.toJson());
  }),
    () => {
      res.status(500).send();
    };
});

// --> put request <--
app.put("/todo/:id", (req, res) => {
  res.send("Udating todo elements.");
});

// --> delete request <--
app.delete("/todo", (req, res) => {
  res.send("Deleting todo elements.");
});
