import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Button = ({text, op}) => {
	return <button onClick={op}>{text}</button>
}

const Statistic = ({text, value}) => {
	return (
		<tr>
			<th>{text}</th>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const hasChangeState = good !== 0 || neutral !== 0 || bad !== 0

	if (hasChangeState) {

		const total = good + neutral + bad
		const positive = (good / total) * 100
		const average = (good - bad) / total

		return (
			<div>
				<h1>Statistics</h1>
				<table>
					<tbody>
						<Statistic text={"Good"} value={good}/>
						<Statistic text={"Neutral"} value={neutral}/>
						<Statistic text={"Bad"} value={bad}/>
						<Statistic text={"All"} value={total}/>
						<Statistic text={"Average"} value={average}/>
						<Statistic text={"Positive"} value={positive + ' %'}/>
					</tbody>
				</table>
			</div>
		)
	} else
		return (
			<div>
				<h1>Statistics</h1>
				<p><span>No feedback given</span></p>
			</div>
		)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<div>
				<h1>Give feedback</h1>
				<Button text={"Good"} op={() => setGood(good + 1)}/>
				<Button text={"Neutral"} op={() => setNeutral(neutral + 1)}/>
				<Button text={"Bad"} op={() => setBad(bad + 1)}/>
			</div>
			<br/>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

ReactDOM.render(<App/>,
	document.getElementById('root')
)