import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {filterSelector} from '../../selectors/index'
import {doneItemAction, removeItemAction, getItemsAction} from '../../redux/ac'
import TodoListItem from './TodoListItem'
import Loader from '../Loader'


function TodoList() {
    const items = useSelector(state => filterSelector(state));
    const isLoading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const doneItemDispatch = id => dispatch(doneItemAction(id));
    const removeItemDispatch = id => dispatch(removeItemAction(id));
    useEffect(() => {
        dispatch(getItemsAction())
    }, [dispatch]);

    if (isLoading) return <Loader/>;
    const errorMessage = error && <div>Error: {error}</div>;
    const isEmpty = items.length === 0 && !isLoading;
    const emptyMessage = isEmpty && <div className="text-center">List is empty :(</div>;
    return (
        <>
        {errorMessage}
            <div className={`todo-list ${isEmpty ? 'todo-list_empty' : ''}`}>
                {emptyMessage}
                <ul>
                    {
                        items.map(item => (
                            <TodoListItem
                                key={item.id}
                                doneItem={doneItemDispatch}
                                removeItem={removeItemDispatch}
                                {...item}
                            />
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default TodoList;