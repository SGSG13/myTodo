import React from 'react'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {mount} from 'enzyme'
import {addItemAction} from '../../redux/ac/ac'
import AddItemForm from './AddItemForm'

describe('<AddItemForm/>', () => {
    const mockStore = configureStore([]);
    let store = null;
    let container = null;

    beforeEach(() => {
        store = mockStore({});
        container = mount(
            <Provider store={store}>
                <AddItemForm/>
            </Provider>
        );
    });

    it('should change input', () => {
        const value = 'test';
        container.find('.input').simulate('change', {
            target: { value }
        });
        expect(container.find('.input').prop('value')).toEqual(value)
    });

    it('should call action addItem', () => {
        const value = 'test';
        store.dispatch = jest.fn();
        container.find('.input').simulate('change', {
            target: { value }
        });
        container.find('.button').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(addItemAction(value))
    });

    it('should reset input after added item', () => {
        container.find('.input').simulate('change', {
            target: {
                value: 'test'
            }
        });
        container.find('.button').simulate('click');
        expect(container.find('.input').prop('value')).toEqual('')
    });

});