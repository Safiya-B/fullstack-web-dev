import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const Country = ({ country }) => {


    return (

        <div>
            <h1 >{country.name}</h1>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <Languages country={country} />
            <Weather country={country} />
        </div>

    )
}

export default Country
