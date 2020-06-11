import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeSearchAction} from '../../../redux/ac'
import {searchTitleSelector} from '../../../redux/selectors'

function Search() {
    const searchTitle = useSelector(searchTitleSelector);
    const dispatch = useDispatch();
    const handleChangeSearch = ev => dispatch(changeSearchAction(ev.target.value));
    return (
        <div className="flex-fill">
            <input
                className="input"
                type="text"
                name="search"
                placeholder="Search"
                value={searchTitle}
                onChange={handleChangeSearch}
            />
        </div>
    );
}

export default Search;