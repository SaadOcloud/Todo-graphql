const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const todoSchema = require("./Schema/todoSchema");
const todoResolvers = require("./Resolver/todoResolver");

const app = express();

var todos = [];

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema:todoSchema ,
    rootValue:todoResolvers,
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
