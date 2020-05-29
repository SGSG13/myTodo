import * as Actions from './ac';
import {Constance} from "../constance";

describe('actions', () => {

    it('getItemsAction(): should create an action to set loading', () => {
        const expectedAction = {
            type: Constance.LOAD_ITEMS + Constance.REQUEST
        };
        expect(Actions.getItemsAction()).toEqual(expectedAction)
    });

    it('addItemAction(): should create an action to add item', () => {
        const title = 'test';
        const expectedAction = {
            type: Constance.ADD_ITEM,
            payload: { title }
        };
        expect(Actions.addItemAction(title)).toEqual(expectedAction)
    });

    it('doneItemAction(): should create an action to request done item', () => {
        const id = 123;
        const expectedAction = {
            type: Constance.DONE_ITEM + Constance.REQUEST,
            payload: { id }
        };
        expect(Actions.doneItemAction(id)).toEqual(expectedAction)
    });

    it('removeItemAction(): should create an action to request remove item', () => {
        const id = 123;
        const expectedAction = {
            type: Constance.REMOVE_ITEM + Constance.REQUEST,
            payload: { id }
        };
        expect(Actions.removeItemAction(id)).toEqual(expectedAction)
    });

    it('changeSearchAction(): should create an action to change search title', () => {
        const searchTitle = 'test';
        const expectedAction = {
            type: Constance.CHANGE_SEARCH,
            payload: { searchTitle }
        };
        expect(Actions.changeSearchAction(searchTitle)).toEqual(expectedAction)
    });

    it('changeStatusAction(): should create an action to change status', () => {
        const statusFilter = 'done';
        const expectedAction = {
            type: Constance.CHANGE_STATUS,
            payload: { statusFilter }
        };
        expect(Actions.changeStatusAction(statusFilter)).toEqual(expectedAction)
    });
});