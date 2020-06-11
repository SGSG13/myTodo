import React from 'react';

function TodoListItem(props) {
    const {id, title, done, doneItem, removeItem} = props;
    const handleDone = id => () => { if (!done) doneItem(id) };
    const handleRemove = id => () => removeItem(id);
    const classNameForItem = `todo-list__title ${done ? 'todo-list__title_done' : ''}`;
    return (
        <li className="todo-list__item">
            <div className="flex-fill">
                <span
                    className={classNameForItem}
                    onClick={handleDone(id)}
                    data-id="item-title"
                >
                {title}
                </span>
            </div>
            <div className="flex-fit">
                <button
                    className="button"
                    onClick={handleRemove(id)}
                    data-id="remove-item-button"
                >X</button>
            </div>
        </li>
    );
}

export default TodoListItem;