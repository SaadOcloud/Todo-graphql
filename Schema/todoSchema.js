const { buildSchema } = require("graphql");
const {todoResolver} = require("../resolver/todoResolver");

const typeDefs = buildSchema(`
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
            todo(todoId:ID!): Todo! 
        } 
        type RootMutation {
            createtodo(todoItem: String!): Todo
            updatetodo(todoid: String!): Todo
            deletetodo(todoid: String!): Todo
        }
        type Message {
            message:String
            todo:Todo
        }
        
        type Subscription{
            notifyUsers:  Message
        }

        schema{
            query: RootQuery
            mutation: RootMutation
            subscription: Subscription
        }
    `);


module.exports = typeDefs;