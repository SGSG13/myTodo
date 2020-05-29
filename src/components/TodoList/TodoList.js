import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {filterSelector} from '../../selectors/index'
import {doneItemAction, removeItemAction, getItemsAction} from '../../redux/ac/ac'
import TodoListItem from './TodoListItem/TodoListItem'
import Loader from '../Loader'


function TodoList() {
    const items = useSelector(state => filterSelector(state));
    const isLoading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const doneItemDispatch = id => dispatch(doneItemAction(id));
    const removeItemDispatch = id => dispatch(removeItemAction(id));
    const getItemsDispatch = () => dispatch(getItemsAction());

    useEffect(() => {
        getItemsDispatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Loader/>;
    const errorMessage = error && <div className="error">Error: {error}</div>;
    const isEmpty = items.length === 0 && !isLoading;
    const emptyMessage = isEmpty && <div className="empty text-center">List is empty :(</div>;
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