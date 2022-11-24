import React, { Component } from 'react';
import './Home.css';

import  AddTodo  from '../AddTodo/AddTodo'
import  TodoList  from '../TodoList/TodoList';

class Home extends Component {
    
    render() {
        return (
            <div className="home">
                <div className="title">
                    <h1>TODO APP</h1>
                </div>
                <AddTodo/>
                <TodoList />
            </div>
        )
    }
}


export default Home;

