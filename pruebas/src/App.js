import './App.css';
import MensajeReusable from './MensajeReusable'

const Mensaje = () => {
   return  <h1>Hola guapetones</h1>
}

function App() {

    const mensaje = "Super troll";
    const date = new Date();

  return (
    <div className="App">
        <h1>Hola mundo</h1>
        <h2>{ mensaje + " omfg" }</h2>
        <h3>{date.getTime()}</h3>
        <h3>{+new Date()}</h3>
        <Mensaje />
        <MensajeReusable color="red" title="Estamos locos o qué" />
        <MensajeReusable color={"blue"} title={"OMFG"} />
    </div>
  );
}

export default App;
