const {Sequeilze, DataTypes} = require('sequelize')
const {connectionString} = require('../config/db')

const Todo = connectionString.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Todoitem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

module.exports = Todo
