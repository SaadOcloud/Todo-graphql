const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const {connectDB} = require("./config/db");
const { ApolloServer }= require ('@apollo/server');
const http = require('http');
const { startStandaloneServer } = require('@apollo/server/standalone')
const { WebSocketServer } = require( 'ws');
const typeDefs = require("./Schema/todoSchema");
const todoResolvers = require("./Resolver/todoResolver");
const Todo = require("./models/todoModel");

connectDB();
const app = express();

const httpServer = http.createServer(app);


app.use(cors());


const server = new ApolloServer({
  typeDefs,
  resolvers: todoResolvers,
  subscriptions: {
    path: '/subscriptions',
  },
});


(async() => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
})();

