import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Languages = ({languages}) => {
    const languagesToShow = () => 
        languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)

    return (
        <ul>
            {languagesToShow()}
        </ul>
    )
}

const Weather = ({weather}) => {
    const weatherToShow = () => {
        if (Object.entries(weather).length > 0) {
            return (
                <>
                    <p>
                        <b>temperature: </b>
                        {weather.current.temp_c} Celsius
                    </p>
                    <img src={weather.current.condition.icon} alt="Current weather condition" />
                    <p>
                        <b>wind: </b>
                        {weather.current.wind_kph} kph direction {weather.current.wind_dir}
                    </p>
                </>
            )
        } else {
            return ''
        }
    }

    return (
        <>
            {weatherToShow()}
        </>
    )
}

const Country = ({country, weather, setWeather}) => {
    useEffect(() => {
        const apiKey = "INSERT_API_KEY_HERE"
        const query = `http://api.apixu.com/v1/current.json?key=${apiKey}&q=${country.capital}`
        axios
            .get(query)
            .then(response => {
                setWeather(response.data)
            })
    }, country)

    const flagOfCountry = `Flag of ${country}`

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <Languages languages={country.languages} />
            <img src={country.flag} height="15%" width="15%" alt={flagOfCountry} />
            <h2>Weather in {country.capital}</h2>
            <Weather weather={weather} />
        </div>
    )
}

const Countries = ({countries, filter, setFilter, weather, setWeather}) => {
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
            return <Country 
                        country={filteredCountries()[0]} 
                        weather={weather}
                        setWeather={setWeather} />
        }
    }

    return (
        <>{countriesToShow()}</>
    )
}

const Filter = ({filter, handleFilterChange}) =>
    <input value={filter} onChange={handleFilterChange} />

const App = () => {
    const [ filter, setFilter ] = useState('')
    const [ countries, setCountries ] = useState([])
    const [ weather, setWeather ] = useState({})

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
            find countries <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <Countries 
                countries={countries} 
                filter={filter} 
                setFilter={setFilter}
                weather={weather}
                setWeather={setWeather} />
        </div>
    )
}

export default App