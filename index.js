const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { graphqlExpress, graphiqlExpress }= require('apollo-server-express');



const typeDefs = require("./Schema/todoSchema");
const todoResolvers = require("./Resolver/todoResolver");

connectDB();

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.use(
  "/graphql",
  graphqlExpress({
    schema: typeDefs,
    rootValue: todoResolvers,
    graphiql: true,
  })
)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening at Port ${PORT}...`));
