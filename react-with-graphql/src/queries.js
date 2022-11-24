
import gql from "graphql-tag";

const GET_ALLTODOS = gql`
query {
  todos{
        _id,
        Todoitem,
        complete,
    }
}`;

const ADD_TODO = gql`
mutation createtodo($todoItem: String!) {
  createtodo(todoItem:$todoItem){
		_id , Todoitem , complete
	}
    }
`;

const REMOVE_TODO = gql`
mutation deletetodo($todoid: String!) {
  deletetodo(todoid:$todoid){
		_id , Todoitem , complete
	}
}`;

const UPDATE_TODO = gql`
mutation updatetodo($todoid: String!) {
    updatetodo(todoid:$todoid){
      _id , Todoitem , complete
	}
}`;


const SUBSCRIBE_NEWTODO = gql`
subscription {
    notifyUsers {    
        message
        todo{
        _id , Todoitem , complete
        }
    }
}
`



export { GET_ALLTODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SUBSCRIBE_NEWTODO }

