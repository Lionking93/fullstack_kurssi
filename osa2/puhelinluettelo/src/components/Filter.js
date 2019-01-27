import React from 'react';

const Filter = ({filterValue, onFilterChange}) => {
    return (
        <>
            Rajaa näytettäviä: 
            <input
                value={filterValue}
                onChange={onFilterChange} /> 
        </>
    )
}

export default Filter