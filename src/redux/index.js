import {createStore, applyMiddleware} from 'redux'
import Logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer/reducer'
import rootSaga from './saga/saga'

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, Logger);
const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store