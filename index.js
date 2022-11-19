const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db")


const todoSchema = require("./Schema/todoSchema");
const todoResolvers = require("./Resolver/todoResolver");

connectDB();

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

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening at Port ${PORT}...`));
