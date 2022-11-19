const { buildSchema } = require("graphql");


module.exports=buildSchema(`
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
            createtodo(todoInput: todoInput): Todo
            updatetodo(todoid: ID!, todoInput: todoInput): Todo
            deletetodo(todoid: ID!): Todo
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `)