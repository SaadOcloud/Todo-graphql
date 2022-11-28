
import gql from "graphql-tag";

const GET_ALLTODOS = gql`
query Todos {
    todos {
      complete
      Todoitem
      id
    }
  }`;

const ADD_TODO = gql`
mutation Mutation($input: String!) {
  createTodo(input: $input) {
    Todoitem
    complete
    id
  }
}
`;

const REMOVE_TODO = gql`
mutation Mutation($deleteTodoId: ID!) {
  deleteTodo(id: $deleteTodoId) {
    id
    Todoitem
    complete
  }
}`;

const UPDATE_TODO = gql`
mutation Mutation($updateTodoId: ID!) {
    updateTodo(id: $updateTodoId) {
      id
      Todoitem
      complete
    }
  }`;


const SUBSCRIBE_NEWTODO = gql`
subscription {
    notifyUsers {    
        message
        todo{
        id , Todoitem , complete
        }
    }
}
`



export { GET_ALLTODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SUBSCRIBE_NEWTODO }

