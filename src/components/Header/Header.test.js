import React from 'react'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {mount} from 'enzyme'
import Header from './index'

describe('<Header/>', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        items: [
            {
                id: 1,
                title: '1',
                done: false
            },
            {
                id: 2,
                title: '2',
                done: false
            },
            {
                id: 3,
                title: '3',
                done: true
            }
        ]
    });
    let container = null;

    beforeEach(() => {
        container = mount(
            <Provider store={store}>
                <Header/>
            </Provider>
        );
    });

    it('render todo counter', () => {
        expect(container.find('[data-id="todo-count"]').text()).toEqual('2')
    });

    it('render done counter', () => {
        expect(container.find('[data-id="done-count"]').text()).toEqual('1')
    });
});