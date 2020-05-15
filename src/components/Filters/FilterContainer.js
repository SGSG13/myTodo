import React from 'react';
import Search from './Search'
import StatusFilter from './StatusFilter'

function FilterContainer() {
    return (
        <div className="filters">
            <Search/>
            <StatusFilter/>
        </div>
    );
}

export default FilterContainer;