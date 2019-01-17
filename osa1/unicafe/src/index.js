import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => 
    <h1>{header}</h1>

const Button = ({handleClick, text}) => 
        <button onClick={handleClick}>
            {text}
        </button>

const Statistics = ({good, neutral, bad}) => {
    return (
        <>
            <p>hyvä {good}</p>
            <p>neutraali {neutral}</p>
            <p>huono {bad}</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header header="Anna palautetta" />
            <Button handleClick={() => setGood(good + 1)} text="hyvä" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
            <Button handleClick={() => setBad(bad + 1)} text="huono" />
            <Header header="Statistiikka" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));