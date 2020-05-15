const {Router} = require('express');
const Todo = require('../models/todo');
const router = Router();

const reply  = (res, body, status = 200) => res.status(status).json(body);

router.get('/todos', async (req, res) => {
    try {
        const items = await Todo.getTodos();
        reply(res, {items}, 200);
    } catch (e) {
        reply(res, {error: e}, 500);
    }
});

router.post('/todo', async (req, res) => {
    const title = req.body.title;
    try {
        await Todo.addTodo(title);
        reply(res, {result: 'ok'});
    } catch (e) {
        reply(res, {error: e}, 500);
    }
});

router.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Todo.completeTodo(id);
        reply(res, {result: 'ok'});
    } catch (e) {
        reply(res, {error: e}, 500);
    }
});

router.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Todo.deleteTodo(id);
        reply(res, {result: 'ok'});
    } catch (e) {
        reply(res, {error: e}, 500);
    }
});

module.exports = router;

