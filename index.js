const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const Todo = require("./models/todoModel");

const app = express();

var todos = [];

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Todo {
            _id: ID!
            Todoitem: String!
            complete: Boolean!
            
        }
        input todoInput {
            Todoitem: String!
            complete: Boolean!
            
        } 
        type RootQuery {
            todos: [Todo!]!
            todo: Todo!
        } 
        type RootMutation {
            createtodo(todoInput: todoInput): Todo
            updatetodo(todoid: ID!, todoInput: todoInput): Todo
            deletetodo(todoid: ID!): Todo
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        todos: () => {
        return Todo.find()
          .then((todos) => {
            return todos.map((todo) => {
              return { ...todo._doc, _id: todo.id };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createtodo: (args) => {
        const todo = new Todo({
          Todoitem: args.todoInput.Todoitem,
          complete: args.todoInput.complete,
        });
        return todo
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc, _id: todo.id };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      updatetodo: (args) => {
        return Todo.findById(args.todoid)
          .then((todo) => {
            todo.Todoitem = args.todoInput.Todoitem;
            todo.complete = args.todoInput.complete;
            return todo.save().then((result) => {
              return { ...result._doc, _id: todo.id };
            });
          })
          .catch((err) => {
            throw err;
          }
          );
        },
        deletetodo: (args) => {
          return Todo.findByIdAndRemove(args.todoid)
            .then((todo) => {
              return { ...todo._doc, _id: todo.id };
            })
            .catch((err) => {
              throw err;
            });
        },
    },
    graphiql: true,
  })
);

const Port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(Port, () => console.log("Server started"));
  })
  .catch((err) => {
    console.log(err);
  });
