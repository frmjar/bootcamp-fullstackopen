import './App.css';
import MensajeReusable from './MensajeReusable'
import {useState} from 'react'

const Mensaje = ({number}) => {
	return  <h1>{number}</h1>
}

function App() {

	const mensaje = "Super troll";
	const date = new Date();

	const [valor, update] = useState(0)

	const [counters, setCounters] = useState({
		left: 0,
		right: 0
	})

	let valor2 = 0

	return (
		<div className="App">
			<h1>Hola mundo</h1>
			<h2>{ mensaje + " omfg" }</h2>
			<h3>{date.getTime()}</h3>
			<h3>{+new Date()}</h3>
			<h3>{valor}</h3>
			<Mensaje number={valor}/>
			<h3>{valor2}</h3>
			<Mensaje number={valor2}/>
			<MensajeReusable color="red" title="Estamos locos o qué" />
			<MensajeReusable color={"blue"} title={"OMFG"} />

			<button onClick={()=>update(date.getTime())}>Probando</button>
			<button onClick={()=> {
				valor2++
				console.log(valor2)
			}}>Probando</button>

			<br />

			{counters.left}
			<button onClick={() => setCounters({
				...counters,								// Copia todas las propiedades del objeto counters
				left: counters.left + 1,					// Luego sobrescribes las que te interesen
			})}>Left</button>
			<button onClick={() => setCounters({
				...counters,								// También sirve para los arrays.
				right: counters.right + 1					// [...array, 'elementoAñadir']
			})}>Right</button>
			{counters.right}
		</div>
	);
}

export default App;
