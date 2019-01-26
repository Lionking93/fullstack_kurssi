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
        <img src={country.flag} height="10%" width="10%" />
    </div>

const Countries = ({countries, filter}) => {
    const filteredCountries = () => countries
        .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    const countriesToShow = () => {
        if (filteredCountries().length > 10) {
            return <p>Too many matches, specify another filter</p>
        } 
        
        if (filteredCountries().length > 1 && filteredCountries.length <= 10) {
            return filteredCountries().map(country => <p key={country.name}>{country.name}</p>)
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
                console.log(response.data);
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => 
        setFilter(event.target.value)

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            <Countries countries={countries} filter={filter} />
        </div>
    )
}

export default App