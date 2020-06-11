import React, {useState} from 'react';
import {addItemAction} from '../../redux/ac'
import {useDispatch} from 'react-redux'

function AddItemForm() {
    const [title, setTitle] = useState('');

    const handleChangeTitle = ev => setTitle(ev.target.value);
    const dispatch = useDispatch();
    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (title.length < 1) return;
        dispatch(addItemAction(title));
        setTitle('')
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="flex-fill">
                <input
                    type="text"
                    name="title"
                    className="input"
                    value={title}
                    onChange={handleChangeTitle}
                />
            </div>
            <div className="flex-fit">
                <button className="button">Add</button>
            </div>
        </form>
    );
}

export default AddItemForm;