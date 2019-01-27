import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Person = ({person}) => 
    <p>{person.name} {person.number}</p>

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

const Persons = ({persons, filterValue}) => {
    const personsList = () => persons
        .filter(person =>
            person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
        .map(person => 
            <Person key={person.name} person={person} />)

    return (
        <>{personsList()}</>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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

        persons.findIndex((elem) => elem.name === newName) !== -1 
            ? alert(`${newName} on jo luettelossa`) 
            : axios.post("http://localhost:3001/persons", newPerson)
                .then(response =>
                    setPersons(persons.concat(response.data)))

        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Filter filterValue={newFilter} onFilterChange={handleFilterChange} />
            <h2>Lisää uusi</h2>
            <PersonForm 
                onAddPerson={addPerson} 
                newNameValue={newName}
                newNumberValue={newNumber}
                onChangeNewName={handleNameChange}
                onChangeNewNumber={handleNumberChange} />
            <h2>Numerot</h2>
            <Persons persons={persons} filterValue={newFilter} />
        </div>
    )
}

export default App