import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Weather from './Weather';

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
          <Weather country={country}/>
        </div>
    );
};

export default Country