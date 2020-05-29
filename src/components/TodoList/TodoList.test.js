import React from 'react'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {mount} from 'enzyme'
import {getItemsAction} from '../../redux/ac/ac'
import TodoList from './TodoList'
import TodoListItem from './TodoListItem/TodoListItem'
import Loader from '../Loader'

describe('<TodoList/>', () => {
    const mockStore = configureStore([]);
    const initialState = {
        items: [],
        error: null,
        loading: false,
        filter: {
            searchTitle: '',
            statusFilter: 'all'
        }
    };

    const getMountedContainer = mockState => {
        const store = mockStore({
            ...initialState,
            ...mockState
        });
        return mount(
            <Provider store={store}>
                <TodoList/>
            </Provider>
        );
    };

    it('should render loader', () => {
        const container = getMountedContainer({ loading: true });
        expect(container.find('Loader')).toHaveLength(1)
    });

    it('should render error message', () => {
        const error = 'test';
        const container = getMountedContainer({ error });
        expect(container.find('.error').text()).toEqual(`Error: ${error}`)
    });

    it('should render empty list message', () => {
        const container = getMountedContainer({});
        expect(container.find('.empty').text()).toEqual('List is empty :(')
    });

    it('should render all items', () => {
        const container = getMountedContainer({
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
        expect(container.find('TodoListItem')).toHaveLength(3)
    });

    it('should render done items with search filter', () => {
        const container = getMountedContainer({
            items: [
                {
                    id: 1,
                    title: '1',
                    done: false
                },
                {
                    id: 2,
                    title: '2',
                    done: true
                },
                {
                    id: 3,
                    title: '3',
                    done: true
                }
            ],
            filter: {
                searchTitle: '2',
                statusFilter: 'done'
            }
        });
        expect(container.find('TodoListItem')).toHaveLength(1)
    });

    it('should call action getItems', () => {
        const store = mockStore({ ...initialState });
        store.dispatch = jest.fn();
        mount(
            <Provider store={store}>
                <TodoList/>
            </Provider>
        );
        expect(store.dispatch).toHaveBeenCalledWith(getItemsAction())
    });

});