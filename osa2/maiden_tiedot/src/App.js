import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Languages = ({languages}) => {
    const languagesToShow = () => languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)

    return (
        <ul>
            {languagesToShow()}
        </ul>
    )
}

const Country = ({country}) => 
    <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <Languages languages={country.languages} />
        <img src={country.flag} height="15%" width="15%" />
    </div>

const Countries = ({countries, filter, setFilter}) => {
    const filteredCountries = () => countries
        .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    const handleShowSingleCountry = (singleCountryToShow) => {
        setFilter(singleCountryToShow)
    }

    const countriesToShow = () => {
        if (filteredCountries().length > 10) {
            return <p>Too many matches, specify another filter</p>
        } 
        
        if (filteredCountries().length > 1 && filteredCountries.length <= 10) {
            return filteredCountries()
                .map(country =>
                    <p key={country.name}>
                        {country.name} <button onClick={(e) => handleShowSingleCountry(country.name)}>show</button>
                    </p>
                )
        } 
        
        if (filteredCountries().length === 1) {
            return <Country country={filteredCountries()[0]} />
        }
    }

    return (
        <>{countriesToShow()}</>
    )
}

const App = () => {
    const [ filter, setFilter ] = useState('')
    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => 
        setFilter(event.target.value)

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            <Countries countries={countries} filter={filter} setFilter={setFilter} />
        </div>
    )
}

export default App