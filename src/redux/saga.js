import {all, call, put, takeEvery, spawn, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga'
import {
    getItemsFromApi,
    addItemFromApi,
    doneItemFromApi,
    removeItemFromApi
} from '../api'
import {socket} from '../api/socket'
import {Constance} from './constance'

export const getItemsSaga = function* () {
    try {
        const res = yield call(getItemsFromApi);
        yield put({
            type: Constance.LOAD_ITEMS + Constance.SUCCESS,
            payload: {items: res.data.items}
        })
    } catch (error) {
        yield put({
            type: Constance.LOAD_ITEMS + Constance.FAIL,
            error
        })
    }
};

export const addItemSaga = function* (action) {
    try {
        yield call(addItemFromApi, action.payload.title);

    } catch (error) {
        yield put({
            type: Constance.LOAD_ITEMS + Constance.FAIL,
            error
        })
    }
};

export const doneItemSaga = function* (action) {
    const id = action.payload.id;
    try {
        yield call(doneItemFromApi, id);
    } catch (error) {
        console.log(error)
    }
};

export const removeItemSaga = function* (action) {
    const id = action.payload.id;
    try {
        yield call(removeItemFromApi, id);
    } catch (error) {
        console.log(error)
    }
};

const createTodoSocket = () => eventChannel(emmit => {
    const callback = data => emmit(data);
    socket.on('changeTodo', callback);
    return () => socket.removeListener('change-todo', callback)
});

export const realtimeSyncSaga = function * () {
    const chan = yield call(createTodoSocket);
    try {
        while (true) {
            const {items} = yield take(chan);
            yield put({
                type: Constance.LOAD_ITEMS + Constance.SUCCESS,
                payload: { items }
            })
        }
    } finally {
        yield call([chan, chan.close]);
    }
};

export default function* rootSaga() {
    yield spawn(realtimeSyncSaga);
    yield all([
        takeEvery(Constance.LOAD_ITEMS + Constance.REQUEST, getItemsSaga),
        takeEvery(Constance.DONE_ITEM + Constance.REQUEST, doneItemSaga),
        takeEvery(Constance.REMOVE_ITEM + Constance.REQUEST, removeItemSaga),
        takeEvery(Constance.ADD_ITEM, addItemSaga)
    ])
}