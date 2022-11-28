const { buildSchema } = require("graphql");

const typeDefs = buildSchema(`

        type Todo {
            id: ID!
            Todoitem: String!
            complete: Boolean!
        }
        type Message {
            message:String
            todo:Todo
        }
        type Query{
            todos: [Todo]
        }
        type Mutation{
            createTodo(input: String!): [Todo!]!
            updateTodo (id: ID!): [Todo!]!
            todoAdded: [Todo!]!
            deleteTodo (id: ID!): [Todo!]!
        }
        type Subscription{
            notifyUsers:  Message
        }
    `);


module.exports = typeDefs;