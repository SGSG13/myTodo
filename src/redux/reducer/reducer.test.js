import reducer, {initialStore} from './index';
import {Constance} from "../constance";

describe('reducer', () => {
    it('should return initial state', () => {
       expect(reducer(initialStore, {})).toEqual(initialStore)
    });

    it('should load items request', () => {
        const action = {
            type: Constance.LOAD_ITEMS + Constance.REQUEST
        };
        expect(reducer(initialStore, action)).toEqual({
            ...initialStore,
            loading: true
        })
    });

    it('should load items success', () => {
        const initialStoreWithLoading= {
            ...initialStore,
            loading: true
        };
        const action = {
            type: Constance.LOAD_ITEMS + Constance.SUCCESS,
            payload: { items: [1, 2, 3] }
        };
        expect(reducer(initialStoreWithLoading, action)).toEqual({
            ...initialStoreWithLoading,
            items: action.payload.items,
            error: null,
            loading: false
        })
    });

    it('should fail response when loading items', () => {
        const initialStoreWithLoading= {
            ...initialStore,
            loading: true
        };
        const action = {
            type: Constance.RESPONSE_FAIL,
            error: 'Error'
        };
        expect(reducer(initialStoreWithLoading, action)).toEqual({
            ...initialStoreWithLoading,
            loading: false,
            error: action.error
        })
    });

    it('should fail response when loaded items', () => {
        const initialStoreWithItems= {
            ...initialStore,
            items: [1, 2, 3]
        };
        const action = {
            type: Constance.RESPONSE_FAIL,
            error: 'Error'
        };
        expect(reducer(initialStoreWithItems, action)).toEqual({
            ...initialStoreWithItems,
            error: action.error
        })
    });

    it('should change search title', () => {
        const action = {
            type: Constance.CHANGE_SEARCH,
            payload: { searchTitle : 'test' }
        };
        expect(reducer(initialStore, action)).toEqual({
            ...initialStore,
            filter: {
                ...initialStore.filter,
                searchTitle: action.payload.searchTitle
            }
        })
    });

    it('should change status', () => {
        const action = {
            type: Constance.CHANGE_STATUS,
            payload: { statusFilter : 'done' }
        };
        expect(reducer(initialStore, action)).toEqual({
            ...initialStore,
            filter: {
                ...initialStore.filter,
                statusFilter: action.payload.statusFilter
            }
        })
    });
});