const {Router} = require('express');
const TodoItem = require('../models/todoItem');
const router = Router();

const reply  = (res, body, status = 200) => res.status(status).json(body);

router.get('/get', async (req, res) => {
    try {
        const items = await TodoItem.getItems();
        reply(res, {items}, 200);
    } catch (e) {
        reply(res, {error: e}, 404);
    }
});

router.post('/add', async (req, res) => {
    const body = req.body;
    try {
        await TodoItem.addItem(body.title);
        const items = await TodoItem.getItems();
        reply(res, {items}, 200);
    } catch (e) {
        reply(res, {error: e}, 404);
    }
});

router.post('/done', async (req, res) => {
    const id = req.body.id;
    try {
        await TodoItem.doneItems(id);
        reply(res, {result: 'ok'}, 200);
    } catch (e) {
        reply(res, {error: e}, 404);
    }
});

router.post('/remove', async (req, res) => {
    const id = req.body.id;
    try {
        await TodoItem.deleteItems(id);
        reply(res, {result: 'ok'}, 200);
    } catch (e) {
        reply(res, {error: e}, 404);
    }
});

module.exports = router;

