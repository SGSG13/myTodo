import React, {useState} from 'react';
import {addItemAction} from '../../redux/ac'
import {useDispatch} from 'react-redux'

function AddItemForm() {
    const [title, setTitle] = useState('');
    const handleChangeTitle = ev => setTitle(ev.target.value);
    const dispatch = useDispatch();
    const handleAddItem = () => {
        if (title.length < 1) return;
        dispatch(addItemAction(title));
        setTitle('')
    };

    return (
        <div className="add-form">
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
                <button
                    className="button"
                    onClick={handleAddItem}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddItemForm;