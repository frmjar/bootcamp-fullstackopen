import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const total = good + neutral + bad
	const positive = (good / total) * 100
	const average = (good - bad) / total

	return (
		<div>
			<div>
				<h1>Give feedback</h1>
				<button onClick={() => setGood(good + 1)}>Good</button>
				<button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
				<button onClick={() => setBad(bad + 1)}>Bad</button>
			</div>
			<br/>
			<div>
				<h1>Statistics</h1>
				<p><span>Good: {good}</span></p>
				<p><span>Neutral: {neutral}</span></p>
				<p><span>Bad: {bad}</span></p>
				<p><span>All: {total}</span></p>
				<p><span>Average: {average}</span></p>
				<p><span>Positive: {positive} %</span></p>
			</div>
		</div>
	)
}

ReactDOM.render(<App/>,
	document.getElementById('root')
)