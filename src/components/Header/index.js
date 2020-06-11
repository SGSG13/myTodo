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
                <span>{toDoCount}</span> more to do, <span>{doneCount}</span> done
            </p>
        </div>
    );
}

export default Header;