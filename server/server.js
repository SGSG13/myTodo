const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('./models/todo');
const api = require('./api');
const config = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(bodyParser.json());
app.use('/api', api);


async function startApp() {
    try {
        await mongoose.connect(config.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        server.listen(config.port, () => console.log(`Server has started.`));
        io.on('connection', function (socket) {
            const changeStream = Todo.watch();
            changeStream.on('change', async () => {
                const items = await Todo.getTodos();
                socket.emit('changeTodo', {items});
            });
        });
    } catch (e) {
        console.log('error', e)
    }
}

startApp();


