import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import './App.css';

function App() {
  const [findCountry, setFindCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(
        'https://restcountries.eu/rest/v2/name/' + findCountry + '?fields=name')
         .then(response => setCountries(response.data))
         .catch(() => setCountries([]));
  }, [findCountry]);

  const changeHandler = (evt) => {
    setFindCountry(evt.target.value);
  };

  return (
      <div className="App">
        <label>Find countries: </label>
        <input onChange={changeHandler} value={findCountry}/>
        <Countries countries={countries} setFindCountry={setFindCountry}/>
      </div>
  );
}

export default App;
