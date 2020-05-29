import React from 'react'
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {mount} from 'enzyme'
import {changeStatusAction} from '../../../redux/ac/ac'
import StatusFilter from './StatusFilter'

describe('<StatusFilter/>', () => {
    const mockStore = configureStore([]);
    let store = null;
    let container = null;

    beforeEach(() => {
        store = mockStore({
            filter: {
                statusFilter: 'done'
            }
        });
        store.dispatch = jest.fn();
        container = mount(
            <Provider store={store}>
                <StatusFilter/>
            </Provider>
        );
    });

    it('should render 3 buttons', () => {
        expect(container.find('.button')).toHaveLength(3)
    });

    it('should render initial all button', () => {
        expect(container.find('.button_active').text()).toEqual('Done')
    });

    it('should call action changeStatus', () => {
        container.find('.button').last().simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(changeStatusAction('active'))
    });

});