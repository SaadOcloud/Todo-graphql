import React from 'react';
import { Query, Mutation } from "react-apollo";

import { GET_ALLTODOS, REMOVE_TODO, UPDATE_TODO,SUBSCRIBE_NEWTODO } from '../../queries';

import './TodoList.css';


const updateCache = (cache, { data: { deleteTodo } }) => {
    cache.writeQuery({
        query: GET_ALLTODOS,
        data: { todos: deleteTodo }
    });
}


const TodoList = () => (
    <Query
        query={GET_ALLTODOS}
    >
        {({ loading, error, data,subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
                <div className="completed-list">
                    <div className="todo-pending">
                        {data.todos.filter(todo => todo.complete === false).map(function (todo, index) {
                            return (<div className="todo-item" key={index}>
                                <Mutation mutation={UPDATE_TODO}>
                                    {(updateTodo) => (
                                        <div className="div-checkbox">
                                            <input type="checkbox" className="complete-checkbox" checked={false} onClick={() =>{updateTodo({ variables:{updateTodoId: todo.id }})}} />
                                        </div>
                                    )}
                                </Mutation>
                                <span className="todo-item-label"> {todo.Todoitem} </span>
                                <Mutation mutation={REMOVE_TODO} update={updateCache}>
                                    {
                                        deleteTodo => <span onClick={() => { deleteTodo({ variables: {deleteTodoId: todo.id } }); }} className="delete-icon"><button>Delete</button></span>
                                    }
                                </Mutation>
                            </div>);
                        }, this)}
                    </div>

                    <div className="todo-completed">
                        {data.todos.filter(todo => todo.complete === true).map(function (todo, index) {
                            return (<div className="todo-item" key={index}>
                                <Mutation mutation={UPDATE_TODO}>
                                    {(updateTodo) => (
                                        <div className="div-checkbox">
                                            <input type="checkbox" className="complete-checkbox" checked onClick={() =>{updateTodo({ variables:{updateTodoId:todo.id}})}} />
                                        </div>
                                    )}
                                </Mutation>
                                <span className="todo-item-label"> {todo.Todoitem} </span>
                                <Mutation mutation={REMOVE_TODO} update={updateCache}>
                                    {
                                        deleteTodo => <span onClick={() => {deleteTodo({ variables: { id: todo.id } }) }} className="delete-icon"><button>Delete</button></span>
                                    }
                                </Mutation>
                            </div>);
                        }, this)}
                    </div>
                    
                    <button onClick={() => {
                        subscribeToMore({
                            document: SUBSCRIBE_NEWTODO,
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                const { todo } = subscriptionData.data.notifyUsers;
                                return {
                                    ...prev,
                                    todos: [...prev.todo, todo]
                                };
                            }
                        });

                    }} className="subscribe">Subscribe for New data</button>
                </div>
                     
            )
        }}
    </Query>
);


export default TodoList;

