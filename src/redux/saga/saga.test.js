import {call} from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';
import {
    getItemsSaga,
    doneItemSaga,
    removeItemSaga,
    addItemSaga
} from './saga'
import {
    getItemsFromApi,
    addItemFromApi,
    doneItemFromApi,
    removeItemFromApi
} from '../../api/index'
import {Constance} from "../constance";


describe('saga', () => {

    it('should load items', () => {
        const mockData = {
            items: ['test']
        };

        return expectSaga(getItemsSaga)
            .provide([
                [call(getItemsFromApi), mockData]
            ])
            .put({
                type: Constance.LOAD_ITEMS + Constance.SUCCESS,
                payload: {items: ['test']}
            })
            .dispatch({
                type: Constance.LOAD_ITEMS + Constance.REQUEST
            })
            .run()
    });

    it('should error load items', () => {
        const error = new Error('error');

        return expectSaga(getItemsSaga)
            .provide([
                [call(getItemsFromApi), throwError(error)]
            ])
            .put({
                type: Constance.RESPONSE_FAIL,
                error: error.message
            })
            .dispatch({
                type: Constance.LOAD_ITEMS + Constance.REQUEST
            })
            .run()
    });

    it('should add item', () => {
        const mockData = {
            result: 'ok'
        };
        const action = {
            type: Constance.ADD_ITEM,
            payload: {title: 'test'}
        };
        const {title} = action.payload;

        return expectSaga(addItemSaga, action)
            .provide([
                [call(addItemFromApi, title), mockData]
            ])
            .dispatch(action)
            .run()
    });

    it('should error add item', () => {
        const error = new Error('error');
        const action = {
            type: Constance.ADD_ITEM,
            payload: {title: 'test'}
        };
        const {title} = action.payload;

        return expectSaga(addItemSaga, action)
            .provide([
                [call(addItemFromApi, title), throwError(error)]
            ])
            .put({
                type: Constance.RESPONSE_FAIL,
                error: error.message
            })
            .dispatch(action)
            .run()
    });

    it('should done item', () => {
        const mockData = {
            result: 'ok'
        };
        const action = {
            type: Constance.DONE_ITEM + Constance.REQUEST,
            payload: { id: 1 }
        };
        const { id } = action.payload;

        return expectSaga(doneItemSaga, action)
            .provide([
                [call(doneItemFromApi, id), mockData]
            ])
            .dispatch(action)
            .silentRun()
    });

    it('should error done item', () => {
        const error = new Error('error');
        const action = {
            type: Constance.DONE_ITEM + Constance.REQUEST,
            payload: { id: 1 }
        };
        const { id } = action.payload;

        return expectSaga(doneItemSaga, action)
            .provide([
                [call(doneItemFromApi, id), throwError(error)]
            ])
            .put({
                type: Constance.RESPONSE_FAIL,
                error: error.message
            })
            .dispatch(action)
            .silentRun()
    });

    it('should remove item', () => {
        const mockData = {
            result: 'ok'
        };
        const action = {
            type: Constance.REMOVE_ITEM + Constance.REQUEST,
            payload: {id: 1}
        };
        const { id } = action.payload;

        return expectSaga(removeItemSaga, action)
            .provide([
                [call(removeItemFromApi, id), mockData]
            ])
            .dispatch(action)
            .silentRun()
    });

    it('should remove item', () => {
        const error = new Error('error');
        const action = {
            type: Constance.REMOVE_ITEM + Constance.REQUEST,
            payload: { id: 1 }
        };
        const { id } = action.payload;

        return expectSaga(removeItemSaga, action)
            .provide([
                [call(removeItemFromApi, id), throwError(error)]
            ])
            .put({
                type: Constance.RESPONSE_FAIL,
                error: error.message
            })
            .dispatch(action)
            .silentRun()
    });

});