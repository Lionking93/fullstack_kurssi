import React, { useState } from 'react';

const Person = ({person}) => 
    <p>{person.name} {person.number}</p>

const App = () => {
    const [ persons, setPersons ] = useState([
        { 
            name: 'Arto Hellas',
            number: '045-123456'
        },
        {
            name: 'Martti Tienari',
            number: '040-123456'
        },
        {
            name: 'Arto Järvinen',
            number: '040-123456'
        },
        {
            name: 'Lea Kutvonen',
            number: '040-123456'
        }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    const handleNameChange = (event) =>
        setNewName(event.target.value)

    const handleNumberChange = (event) =>
        setNewNumber(event.target.value)

    const handleFilterChange = (event) =>
        setNewFilter(event.target.value)

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

    

    const personsList = () => persons
        .filter(person =>
            person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
        .map(person => 
            <Person key={person.name} person={person} />)

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            Rajaa näytettäviä: 
            <input
                value={newFilter}
                onChange={handleFilterChange} /> 
            <h2>Lisää uusi</h2>
            <form onSubmit={addPerson}>
                <div>
                    Nimi: 
                    <input 
                        value={newName}
                        onChange={handleNameChange} />
                </div>
                <div>
                    Numero:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
            <h2>Numerot</h2>
            {personsList()}
        </div>
    )
}

export default App