import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./components/header";
import Content from "./components/content";
import Total from "./components/total";

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header title={course} />

            <Content part={part1} exercise={exercises1} />
            <Content part={part2} exercise={exercises2} />
            <Content part={part3} exercise={exercises3} />

            <Total exercise1={exercises1} exercise2={exercises2} exercise3={exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))