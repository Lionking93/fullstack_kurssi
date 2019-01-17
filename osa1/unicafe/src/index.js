import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => 
    <h1>{header}</h1>

const Button = ({handleClick, text}) => 
        <button onClick={handleClick}>
            {text}
        </button>

const Statistics = ({statistics}) => {
    if ((statistics.good + statistics.neutral + statistics.bad) === 0) {
        return (
            <p>Ei yhtään palautetta annettu</p>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text="hyvä" value={statistics.good} />
                    <Statistic text="neutraali" value={statistics.neutral} />
                    <Statistic text="huono" value={statistics.bad} />
                    <Statistic text="yhteensä" 
                        value={statistics.good + statistics.bad + statistics.neutral} />
                    <Statistic text="keskiarvo" 
                        value={(statistics.good - statistics.bad) / 3} />
                    <Statistic text="positiivisia" 
                        value={(statistics.good + statistics.neutral + statistics.bad) > 0 ? 
                            statistics.good / (statistics.good + statistics.neutral + statistics.bad) * 100 + " %" : 0 + " %"} />
                </tbody>
            </table>
        )
    }
}

const Statistic = ({text, value}) => 
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>

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
            <Statistics statistics={{good: good, neutral: neutral, bad: bad}} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));