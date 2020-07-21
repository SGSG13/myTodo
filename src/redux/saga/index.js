import {all, call, put, takeEvery, spawn, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {Constance} from '../constance'
import api from '../../apiService'

export const getItemsSaga = function* () {
    try {
        const { items } = yield call(api.getItems);
        yield put({
            type: Constance.LOAD_ITEMS + Constance.SUCCESS,
            payload: { items }
        })
    } catch (error) {
        yield put({
            type: Constance.RESPONSE_FAIL,
            error: error.message
        })
    }
};

export const addItemSaga = function* (action) {
    try {
        yield call(api.addItem, action.payload.title);
    } catch (error) {
        yield put({
            type: Constance.RESPONSE_FAIL,
            error: error.message
        })
    }
};

export const doneItemSaga = function* (action) {
    const id = action.payload.id;
    try {
        yield call(api.doneItem, id);
    } catch (error) {
        yield put({
            type: Constance.RESPONSE_FAIL,
            error: error.message
        })
    }
};

export const removeItemSaga = function* (action) {
    const id = action.payload.id;
    try {
        yield call(api.removeItem, id);
    } catch (error) {
        yield put({
            type: Constance.RESPONSE_FAIL,
            error: error.message
        })
    }
};

const createTodoSocket = () => eventChannel(emmit => {
    const socket = api.socketConnection();
    const callback = data => emmit(data);
    socket.on('changeTodo', callback);
    return () => socket.removeListener('changeTodo', callback)
});

export const realtimeSyncSaga = function * () {
    const channel = yield call(createTodoSocket);
    try {
        while (true) {
            const {items} = yield take(channel);
            yield put({
                type: Constance.SYNC_ITEMS,
                payload: { items }
            })
        }
    } finally {
        yield call([channel, channel.close]);
    }
};

export default function* rootSaga() {
    yield spawn(realtimeSyncSaga);
    yield all([
        takeEvery(Constance.LOAD_ITEMS + Constance.REQUEST, getItemsSaga),
        takeEvery(Constance.DONE_ITEM + Constance.REQUEST, doneItemSaga),
        takeEvery(Constance.REMOVE_ITEM + Constance.REQUEST, removeItemSaga),
        takeEvery(Constance.ADD_ITEM + Constance.REQUEST, addItemSaga)
    ])
}