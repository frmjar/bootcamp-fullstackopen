import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const Country = ({country}) => {
  const [countryInfo, setCountryInfo] = useState({languages: []});

  useEffect(() => {
    axios.get(
        'https://restcountries.eu/rest/v2/name/' + country.name +
        '?fields=name;capital;population;languages;flag')
         .then(response => setCountryInfo(response.data[0]))
         .catch((e) => console.error('Error en la busqueda de info', e));
  }, []);

  if (countryInfo.name === undefined)
    return <div/>;
  else
    return (
        <div>
          <h1>{countryInfo.name}</h1>
          <div><label>Capital</label><span>{countryInfo.capital}</span></div>
          <div><label>Population</label><span>{countryInfo.population}</span>
          </div>
          <h2>Languajes</h2>
          <ul>
            {countryInfo.languages.map(
                language => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
          <img className={'flag'} src={countryInfo.flag} alt={'flag'}/>
        </div>
    );
};

const Countries = ({countries, setFindCountry}) => {

  const clickHandler = (evt) => {
    setFindCountry(evt.target.getAttribute('country_value'));
  };

  if (countries.length > 10)
    return (
        <div>
          Too many matches, specify another filter
        </div>
    );
  else if (countries.length === 1) {
    return <Country country={countries[0]}/>;
  } else
    return (
        <div>
          {countries.map(country =>
              <div key={country.name} className={'country'}>
                <span>
                  {country.name}
                </span>
                <button country_value={country.name}
                        onClick={clickHandler}>Show
                </button>
              </div>,
          )
          }
        </div>
    );
};

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
