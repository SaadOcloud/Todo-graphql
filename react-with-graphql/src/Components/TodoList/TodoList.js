import React from 'react';
import { Query, Mutation } from "react-apollo";

import { GET_ALLTODOS, REMOVE_TODO, UPDATE_TODO, SUBSCRIBE_NEWTODO } from '../../queries';

import './TodoList.css';


const updateCache = (cache, { data: { deletetodo } }) => {
    cache.writeQuery({
        query: GET_ALLTODOS,
        data: { todos: deletetodo }
    });
}



const TodoList = () => (
    <Query
        query={GET_ALLTODOS}
    >
        {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;


            return (
                <div className="completed-list">
                    <div className="todo-pending">
                        {data.todos.filter(todo => todo.complete === false).map(function (todo, index) {
                            return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                                
                                <Mutation mutation={UPDATE_TODO}>
                                    {(updatetodo) => (
                                        <div className="col-1">
                                            <input type="checkbox" className="complete-checkbox" defaultChecked={false} onClick={() =>{updatetodo({ variables:{todoid:todo._id}})}} />
                                        </div>
                                    )}
                                </Mutation>
                                <span className="todo-item-label"> {todo.Todoitem} </span>
                                <Mutation mutation={REMOVE_TODO} update={updateCache}>
                                    {
                                        deletetodo => <span onClick={() => { deletetodo({ variables: { todoid: todo._id } }); }} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                                    }
                                </Mutation>
                            </div>);
                        }, this)}
                    </div>

                    <div className="todo-completed">
                        {data.todos.filter(todo => todo.complete === true).map(function (todo, index) {
                            return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                                <Mutation mutation={UPDATE_TODO}>
                                    {(updatetodo) => (
                                        <div className="col-1">
                                            <input type="checkbox" className="complete-checkbox" onClick={() =>{updatetodo({ variables:{todoid:todo._id}})}} />
                                        </div>
                                    )}
                                </Mutation>
                                <span className="todo-item-label"> {todo.Todoitem} </span>
                                <Mutation mutation={REMOVE_TODO} update={updateCache}>
                                    {
                                        deletetodo => <span onClick={() => {deletetodo({ variables: { todoid: todo._id } }) }} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
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

