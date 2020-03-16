const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const TodoItem = require('./models/todoItem');
const api = require('./api');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3001;
const databaseUrl = 'mongodb+srv://admin:RoPchyUyTldo1slL@cluster0-3nevw.mongodb.net/todolist?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use('/api', api);


async function startApp() {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        server.listen(port, () => console.log(`Server has started.`));

        io.on('connection', function (socket) {
            console.log('=====CONNECT TO IO=====');
            const changeStream = TodoItem.watch();

            changeStream.on('change', async () => {
                const items = await TodoItem.getItems();
                socket.emit('change-todo', {items});
            });
        });
    } catch (e) {
        console.log('error', e)
    }
}

startApp()

module.exports = io;

