import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const numVotes = Math.max(...votes);
    const mostVoted = votes.indexOf(numVotes);

    console.log(numVotes)
    console.log(mostVoted)
    const getRandomNumber = (min, max) => {
        let random
        do {
            random = Math.floor(Math.random() * (max - min)) + min
        }while(random === selected)

        return random
    }

    const addVotes = () => {
        const aux = [...votes]
        aux[selected] = aux[selected] + 1
        return aux
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p><span>Has {votes[selected]} votes</span></p>
            <button onClick={()=> setVotes(addVotes)}>Vote</button>
            <button onClick={() => setSelected(getRandomNumber(0, anecdotes.length))}>Next anecdote</button>
            <h1>Anecdote with most votes</h1>
            {numVotes===0
                ? 'No votes yet'
                : <>
                    <p>{props.anecdotes[mostVoted]}</p>
                    <p><span>Has {numVotes} votes</span></p>
                </>
            }
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
