import React from 'react';
import {useSelector} from 'react-redux'


function Header() {
    const items = useSelector(state => state.items);
    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;

    return (
        <div className="header">
            <div className="header__title">
                <h1>ToDo List</h1>
            </div>
            <div>
                <span>
                    {toDoCount} more to do, {doneCount} done
                </span>
            </div>
        </div>
    );
}

export default Header;