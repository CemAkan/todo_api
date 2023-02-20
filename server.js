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
    res.json(todo);
  }),
    () => {
      res.status(500).send();
    };
});

// --> put request <--
app.put("/todo/:id", (req, res) => {
  let todoId = req.params.id;
  let body = _.pick(req.body, "description", "completed");
  let attributes = {};

  if (body.hasOwnProperty("description")) {
    attributes.description = body.description;
  }

  if (body.hasOwnProperty("completed")) {
    attributes.completed = body.completed;
  }

  dataBase.Todo.findOne({
    where: {
      id: todoId,
    },
  }).then(
    (todo) => {
      if (todo) {
        todo.update(attributes).then(
          (todo) => {
            res.json(todo);
          },
          () => {
            res.status(400).send();
          }
        );
      } else {
        res.status(404).send({
          error: "Todo id can not found.",
        });
      }
    },
    () => {
      res.status(500).send();
    }
  );
});

// --> delete request <--
app.delete("/todo", (req, res) => {
  res.send("Deleting todo elements.");
});
