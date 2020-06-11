import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {filterSelector, loadingSelector, errorSelector} from '../../redux/selectors'
import {doneItemAction, removeItemAction, getItemsAction} from '../../redux/ac'
import TodoListItem from '../TodoListItem'
import Loader from '../Loader'


function TodoList() {
    const items = useSelector(state => filterSelector(state));
    const isLoading = useSelector(loadingSelector);
    const error = useSelector(errorSelector);
    const dispatch = useDispatch();
    const doneItemDispatch = id => dispatch(doneItemAction(id));
    const removeItemDispatch = id => dispatch(removeItemAction(id));

    useEffect(() => {
        dispatch(getItemsAction())
    }, [dispatch]);

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