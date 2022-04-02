import React from 'react'

const Languages = ({ country }) => {
    return (
        <div>
            <h3>Spoken Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={country.name} width="100" height="100" />
        </div>
    )
}

export default Languages
