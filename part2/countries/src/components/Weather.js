import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weather = ({country}) => {

  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get(
        'http://api.weatherstack.com/current?access_key=' + api_key +
        '&query=' + country.name)
         .then(response => setWeather(response.data.current))
         .catch((e) => console.error('Error en la busqueda meteorológica', e));
  }, []);

  if (weather.temperature === undefined)
    return <div/>;
  else
    return (
        <div>
          <strong>Temperature:</strong> {weather.temperature} Celsius
          <div><img src={weather.weather_icons[0]} alt={'weather_icon'}/></div>
          <strong>Wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
        </div>
    );
};

export default Weather