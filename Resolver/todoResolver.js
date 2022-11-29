const { PubSub }= require ('graphql-subscriptions');
const {connectionString} = require('../config/db')

const pubsub = new PubSub();

const Todo = require("../models/todoModel");

const TODO_ADDED = 'TODO_ADDED';

const resolver = {
  Query: {
    todos: () =>  Todo.findAll(),
  },
  Mutation: {
    createTodo: async (context,args) => {
      const todo = await Todo.create({
        Todoitem: args.input,
        complete: false,
      });
      const todos = await Todo.findAll();
      pubsub.publish(TODO_ADDED, { todoAdded: todo });
      return Todo.findAll();
    },
    updateTodo: async (context, args) => {
      const todo = await Todo.findByPk(args.id);
      todo.complete = !todo.complete;
      await todo.save();
      const todos = await Todo.findAll();
      pubsub.publish(TODO_ADDED, { todoAdded: todos });
      return Todo.findAll();
      
    },
    deleteTodo: async (context, args) => {
      const todo = await Todo.findByPk(args.id);
      await todo.destroy();
      const todos = await Todo.findAll();
      pubsub.publish(TODO_ADDED, { todoAdded: todos });
      return Todo.findAll()
    },
},
Subscription: {
  notifyUsers: {
    subscribe: () => pubsub.asyncIterator([TODO_ADDED]),
  },
}
};


module.exports = resolver;