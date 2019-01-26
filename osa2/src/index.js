import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => 
    <h1>{props.course}</h1>

const Content = (props) => {
    const parts = () => props.parts.map(part => 
        <Part key={part.name} part={part} />)

    return (
        <>{parts()}</>
    )
}

const Part = ({part}) => 
    <p>{part.name} {part.exercises}</p>

const Total = (props) => {
    var total = props.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p>
            Yhteensä {total} tehtävää
        </p>
    )
}

const Course = ({course}) => 
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

const App = () => {    
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            },
            {
                name: 'Redux',
                exercises: 7
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));