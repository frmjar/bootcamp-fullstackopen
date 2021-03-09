import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => <h1>{name}</h1>

const Total = ({ parts }) => {
    let sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <p><strong>Number of exercises {sum}</strong></p>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <Total parts={parts} />
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            {/*<Total course={course} />*/}
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
