import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => 
    <h1>{props.course}</h1>

const Content = (props) => {
    const parts = () => props.parts.map(part => 
        <Part key={part.id} part={part} />)

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
    const courses = [
        {
            name: 'Half Stack -sovelluskehitys',
            id: 1,
            parts: [
                {
                    name: 'Reactin perusteet',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Tiedonvälitys propseilla',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'Komponenttien tila',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 7,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 2,
                    id: 1
                },
                {
                    name: 'Middleware',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    const listCourses = () => courses.map(course => 
        <Course key={course.id} course={course} />)

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {listCourses()}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));