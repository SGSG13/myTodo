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

class TodoItem {

    static getItems() {
        return this.find().exec();
    }

    static doneItems(id) {
        return this.findByIdAndUpdate(id, {done: true})
    }

    static deleteItems(id) {
        return this.deleteOne({_id: id});
    }

    static addItem(title){
        const item = this({
            title,
            done: false
        });
        return item.save();
    }
}

todoSchema.loadClass(TodoItem);

module.exports = Mongoose.model('TodoItem',todoSchema);