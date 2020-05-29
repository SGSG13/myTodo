import React from 'react';
import Search from './Search/Search'
import StatusFilter from './StatusFilter/StatusFilter'

function FilterContainer() {
    return (
        <div className="filters">
            <Search/>
            <StatusFilter/>
        </div>
    );
}

export default FilterContainer;