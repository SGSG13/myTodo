const Mongoose = require('mongoose');

const todoSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

class Todo {

    static async getTodos() {
        let todos = await this.find().exec();
        return todos.reverse().map(todo => {
            return {
                id: todo._id,
                title: todo.title,
                done: todo.done
            }
        });
    }

    static completeTodo(id) {
        return this.findByIdAndUpdate(id, {done: true})
    }

    static deleteTodo(id) {
        return this.deleteOne({_id: id});
    }

    static addTodo(title){
        const todo = this({
            title,
            done: false
        });
        return todo.save();
    }
}

todoSchema.loadClass(Todo);

module.exports = Mongoose.model('Todo',todoSchema);