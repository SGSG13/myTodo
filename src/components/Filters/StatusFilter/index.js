import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeStatusAction} from '../../../redux/ac'
import {statusSelector} from '../../../redux/selectors'

const buttons = [
    {label: 'All', name: 'all'},
    {label: 'Done', name: 'done'},
    {label: 'Active', name: 'active'},
];

function StatusFilter() {
    const statusFilter = useSelector(statusSelector);
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