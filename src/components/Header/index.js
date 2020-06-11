import React from 'react';
import {useSelector} from 'react-redux'
import {itemsSelector} from '../../redux/selectors'


function Header() {
    const items = useSelector(itemsSelector);
    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;

    return (
        <div className="header">
            <div className="header__title">
                <h1>ToDo List</h1>
            </div>
            <p>
                <span data-id="todo-count">{toDoCount}</span> more to do, <span data-id="done-count">{doneCount}</span> done
            </p>
        </div>
    );
}

export default Header;