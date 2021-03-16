import React from 'react';
import Country from './Country';

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

export default Countries;