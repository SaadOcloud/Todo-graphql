import React from 'react';
import { Mutation } from "react-apollo";
import { GET_ALLTODOS, ADD_TODO } from '../../queries';

import './AddTodo.css';

let input;

const updateCache = (cache, { data: { createtodo } }) => {
    cache.writeQuery({
        query: GET_ALLTODOS,
        data: { todos: createtodo }
    });
    input.value = '';
}



const AddTodo = () => {
    return (
        <Mutation mutation={ADD_TODO} update={updateCache} >
            {(createtodo, { data }) => (
                <div className="addTodo">
                    <div className="row">
                        <p className="label">Add New Todo</p>
                        <input className='input' ref={node => { input = node; }} placeholder="Write Your Todo Here" />
                        <button className="add-button" onClick={() => { createtodo({ variables: { todoItem: input.value } }); }}>Add</button>
                    </div>
                </div>
            )}
        </Mutation>
    );
};


export default AddTodo;