const {Sequeilze, DataTypes} = require('sequelize')
const sequelize = require('./../util/databaseconnect')

const Todo = sequelize.define('Todo', {
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
