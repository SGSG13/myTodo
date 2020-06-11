import React from 'react'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {mount} from 'enzyme'
import {changeSearchAction} from '../../../redux/ac'
import Search from './index'

describe('<Search/>', () => {
    const mockStore = configureStore([]);
    let store = null;
    let container = null;

    beforeEach(() => {
        store = mockStore({
            filter: {
                searchTitle: 'test'
            }
        });
        store.dispatch = jest.fn();
        container = mount(
            <Provider store={store}>
                <Search/>
            </Provider>
        );
    });

    it('should render initial input value', () => {
        expect(container.find('[data-id="search-input"]').prop('value')).toEqual('test')
    });

    it('should change input', () => {
        const value = 'test';
        container.find('[data-id="search-input"]').simulate('change', {
            target: { value }
        });
        expect(container.find('[data-id="search-input"]').prop('value')).toEqual(value)
    });

    it('should call action changeSearch', () => {
        const value = 'test';
        container.find('[data-id="search-input"]').simulate('change', {
            target: { value }
        });
        expect(store.dispatch).toHaveBeenCalledWith(changeSearchAction(value))
    });

});