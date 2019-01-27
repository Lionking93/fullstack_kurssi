import React, { useState, useEffect } from 'react';
import personService from './services/persons';

const Notification = ({message}) => {
    if (message === null || message === '') {
        return null
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

const Person = ({person, handleDeletePerson}) => {
    return (
        <p>
            {person.name} {person.number} <button onClick={handleDeletePerson}>poista</button>
        </p>
    )
}

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

const Persons = ({persons, filterValue, setPersons, setNotificationMessage}) => {
    const handleDeletePerson = (person) => {
        const result = window.confirm(`Poistetaanko ${person.name}?`)
        
        if (result)
            personService
                .deleteOperation(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setNotificationMessage(`Poistettiin henkilö ${person.name}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
    }

    const personsList = () => persons
        .filter(person =>
            person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
        .map(person => 
            <Person 
                key={person.name} 
                person={person} 
                handleDeletePerson={() => 
                    handleDeletePerson(person)} />)

    return (
        <>{personsList()}</>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, [])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ notificationMessage, setNotificationMessage ] = useState('')

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

        const foundPerson = persons.find((elem) => elem.name === newName)
        if (foundPerson !== undefined) {
            const confirmUpdate = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
            if (confirmUpdate)
                personService
                    .update(foundPerson.id, newPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => 
                            person.id !== updatedPerson.id ? person : updatedPerson))
                        setNotificationMessage(`Muutettiin henkilön ${updatedPerson.name} numeroa`)
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                    })
        } else {
            personService.create(newPerson)
                .then(addedPerson => {
                    setPersons(persons.concat(addedPerson))
                    setNotificationMessage(`Lisättiin ${addedPerson.name}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
        }

        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Notification message={notificationMessage} />
            <Filter filterValue={newFilter} onFilterChange={handleFilterChange} />
            <h2>Lisää uusi</h2>
            <PersonForm 
                onAddPerson={addPerson} 
                newNameValue={newName}
                newNumberValue={newNumber}
                onChangeNewName={handleNameChange}
                onChangeNewNumber={handleNumberChange} />
            <h2>Numerot</h2>
            <Persons 
                persons={persons} 
                filterValue={newFilter} 
                setPersons={setPersons}
                setNotificationMessage={setNotificationMessage} />
        </div>
    )
}

export default App