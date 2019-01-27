import React from 'react';

const Person = ({person, handleDeletePerson}) => {
    return (
        <p>
            {person.name} {person.number} <button onClick={handleDeletePerson}>poista</button>
        </p>
    )
}

export default Person