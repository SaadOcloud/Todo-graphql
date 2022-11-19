const Todo = require("../models/todoModel");

module.exports = {
    todos: () => {
    return Todo.find()
      .then((todos) => {
        return todos.map((todo) => {
          return { ...todo._doc, _id: todo.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  todo(args) {
    return Todo.findById(args.todoId)
        .then((todo) => {
            return { ...todo._doc, _id: todo.id };
        })
        .catch((err) => {
            throw err;
        });
},
  createtodo: (args) => {
    const todo = new Todo({
      Todoitem: args.todoInput.Todoitem,
      complete: args.todoInput.complete,
    });
    return todo
      .save()
      .then((result) => {
        return { ...result._doc, _id: todo.id };
      })
      .catch((err) => {
        throw err;
      });
  },
  updatetodo: (args) => {
    return Todo.findById(args.todoid)
      .then((todo) => {
        todo.Todoitem = args.todoInput.Todoitem;
        todo.complete = args.todoInput.complete;
        return todo.save().then((result) => {
          return { ...result._doc, _id: todo.id };
        });
      })
      .catch((err) => {
        throw err;
      }
      );
    },
    deletetodo: (args) => {
      return Todo.findByIdAndRemove(args.todoid)
        .then((todo) => {
          return { ...todo._doc, _id: todo.id };
        })
        .catch((err) => {
          throw err;
        });
    },
}