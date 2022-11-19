const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const todoschema = new Schema({
    Todoitem: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    }

});

module.exports = mongoose.model('Todo', todoschema);