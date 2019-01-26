import React, { useState } from 'react';

const Person = ({person}) => 
    <p>{person.name} {person.number}</p>

const App = () => {
    const [ persons, setPersons ] = useState([
        { 
            name: 'Arto Hellas',
            number: '045-123456'
        }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleNameChange = (event) =>
        setNewName(event.target.value)

    const handleNumberChange = (event) =>
        setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        persons.findIndex((elem) => elem.name === newName) !== -1 ?
            alert(`${newName} on jo luettelossa`) :
            setPersons(persons.concat(newPerson))

        setNewName('')
        setNewNumber('')
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
                        onChange={handleNameChange} />
                </div>
                <div>
                    numero:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange} />
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