import React from 'react'
import {mount} from 'enzyme'
import TodoListItem from './index'

describe('<TodoListItem/>', () => {

    let container = null;
    const mockDoneItem = jest.fn();
    const mockRemoveItem = jest.fn();
    const mockProps = {
        id: 1,
        done: true,
        title: '1',
        doneItem: mockDoneItem,
        removeItem: mockRemoveItem
    };
    const getMountedContainer = props => mount(<TodoListItem{...props}/>);

    beforeEach(() => {
        container = getMountedContainer(mockProps);
    });

    it('should render TodoListItem with props', () => {
        expect(container.find('TodoListItem')).toHaveLength(1)
    });

    it('should done item has class todo-list__title_done', () => {
        expect(container.find('.todo-list__title_done')).toHaveLength(1)
    });

    it('should not call doneItem when item is done', () => {
        container.find('.todo-list__title').simulate('click');
        expect(mockDoneItem).toHaveBeenCalledTimes(0)
    });

    it('should call doneItem', () => {
        const container = getMountedContainer({
            ...mockProps,
            done: false
        });
        container.find('.todo-list__title').simulate('click');
        expect(mockDoneItem).toHaveBeenCalledTimes(1)
    });

    it('should call removeItem', () => {
        container.find('.button').simulate('click');
        expect(mockRemoveItem).toHaveBeenCalledTimes(1)
    });

});