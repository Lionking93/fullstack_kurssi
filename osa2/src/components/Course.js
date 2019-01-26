import React from 'react'

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

export default Course