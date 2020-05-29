import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeStatusAction} from '../../../redux/ac/ac'

const buttons = [
    {label: 'All', name: 'all'},
    {label: 'Done', name: 'done'},
    {label: 'Active', name: 'active'},
];

function StatusFilter() {
    const statusFilter = useSelector(state => state.filter.statusFilter);
    const dispatch = useDispatch();
    const handleChangeStatus = name => () => dispatch(changeStatusAction(name));
    return (
        <div className="flex-fit">
            {
                buttons.map(button => {
                    return (
                        <button
                            className={`button ${statusFilter === button.name ? 'button_active' : ''}`}
                            onClick={handleChangeStatus(button.name)}
                            key={button.name}
                        >
                            {button.label}
                        </button>
                    )
                })
            }
        </div>
    );
}

export default StatusFilter;