import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonForm from './components/PersonForm'
import Error from './components/Error'
import Notification from './components/Notification'
import Person from './components/Person'
import Filter from './components/Filter'

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
    const [ errorMessage, setErrorMessage ] = useState('')

    const handleNameChange = (event) =>
        setNewName(event.target.value)

    const handleNumberChange = (event) =>
        setNewNumber(event.target.value)

    const handleFilterChange = (event) =>
        setNewFilter(event.target.value)

    const showNotification = (notification) => {
        setNotificationMessage(notification)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const showError = (error) => {
        setErrorMessage(error)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleDeletePerson = (person) => {
        const result = window.confirm(`Poistetaanko ${person.name}?`)
        
        if (result)
            personService
                .deleteOperation(person.id)
                .then((response) => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    showNotification(`Poistettiin henkilö ${person.name}`)
                })
                .catch((error) => {
                    showError(`Henkilö ${person.name} oli jo poistettu`)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
    }

    const personsList = () => persons
        .filter(person =>
            person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
        .map(person => 
            <Person 
                key={person.name} 
                person={person} 
                handleDeletePerson={() => 
                    handleDeletePerson(person)} />)

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
                        showNotification(`Muutettiin henkilön ${updatedPerson.name} numeroa`)
                    })
                    .catch((error) => {
                        showError(`Henkilö ${newPerson.name} oli jo poistettu`)
                        setPersons(persons.filter(p => p.id !== foundPerson.id))
                    })
        } else {
            personService.create(newPerson)
                .then(addedPerson => {
                    setPersons(persons.concat(addedPerson))
                    showNotification(`Lisättiin ${addedPerson.name}`)
                })
                .catch(error => {
                    showError(error.response.data.error)
                })
        }

        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Notification message={notificationMessage} />
            <Error message={errorMessage} />
            <Filter filterValue={newFilter} onFilterChange={handleFilterChange} />
            <h2>Lisää uusi</h2>
            <PersonForm 
                onAddPerson={addPerson} 
                newNameValue={newName}
                newNumberValue={newNumber}
                onChangeNewName={handleNameChange}
                onChangeNewNumber={handleNumberChange} />
            <h2>Numerot</h2>
            {personsList()}
        </div>
    )
}

export default App