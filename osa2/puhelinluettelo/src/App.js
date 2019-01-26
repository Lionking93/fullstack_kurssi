import React, { useState } from 'react';

const Person = ({person}) => 
    <p>{person.name}</p>

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const handlePersonChange = (event) =>
        setNewName(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
        }

        persons.findIndex((elem) => elem.name === newName) !== -1 ?
            alert(`${newName} on jo luettelossa`) :
            setPersons(persons.concat(newPerson))

        setNewName('')
    }

    const showPersons = () => persons.map(person => 
        <Person key={person.name} person={person} />)

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form onSubmit={addPerson}>
                <div>
                    nimi: 
                    <input 
                        value={newName}
                        onChange={handlePersonChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
            <h2>Numerot</h2>
            {showPersons()}
        </div>
    )
}

export default App