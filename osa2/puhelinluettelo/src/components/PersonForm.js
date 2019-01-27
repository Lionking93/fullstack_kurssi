import React from 'react';

const PersonForm = ({onAddPerson, newNameValue, onChangeNewName, newNumberValue, onChangeNewNumber}) => {
    return (
        <form onSubmit={onAddPerson}>
            <div>
                Nimi: 
                <input 
                    value={newNameValue}
                    onChange={onChangeNewName} />
            </div>
            <div>
                Numero:
                <input
                    value={newNumberValue}
                    onChange={onChangeNewNumber} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default PersonForm