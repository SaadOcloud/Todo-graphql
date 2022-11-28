const { PubSub }= require ('graphql-subscriptions');
const sequelize = require("../util/databaseconnect");
const pubsub = new PubSub();

const Todo = require("../models/todoModel");

const TODO_ADDED = 'TODO_ADDED';

const resolver = {
  Query: {
    todos: () => {
      return Todo.findAll().then((todos) => {
          return todos.map((todo) => {
              return { ...todo.dataValues };
          });
      });
  },
  },
  Mutation: {
    createTodo: async (context,args) => {
      const todo = await Todo.create({
        _id: Math.random().toString(),
        Todoitem: args.input,
        complete: false,
      });
      const todos = await Todo.findAll();
      pubsub.publish(TODO_ADDED, { todoAdded: todo });
      return Todo.findAll().then((todos) => {
        return todos.map((todo) => {
          return { ...todo.dataValues };
        });
      });
    },
    updateTodo: async (context, args) => {
      const todo = await Todo.findByPk(args.id);
      todo.complete = !todo.complete;
      await todo.save();
      const todos = await Todo.findAll();
      pubsub.publish(TODO_ADDED, { todoAdded: todos });
      return Todo.findAll().then((todos) => {
        return todos.map((todo) => {
          return { ...todo.dataValues };
        });
      });
    },
    deleteTodo: async (context, args) => {
      const todo = await Todo.findByPk(args.id);
      await todo.destroy();
      const todos = await Todo.findAll();
      pubsub.publish(TODO_ADDED, { todoAdded: todos });
      return Todo.findAll().then((todos) => {
        return todos.map((todo) => {
          return { ...todo.dataValues };
        });
      });
    },
},
Subscription: {
  notifyUsers: {
    subscribe: () => pubsub.asyncIterator([TODO_ADDED]),
  },
}
};


module.exports = resolver;