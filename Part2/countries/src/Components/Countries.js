import React from "react";
import Country from "./Country";

const Countries = ({ data, inputText, setText }) => {
  const matchingCountries = data.filter((country) =>
    country.name.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div>
      {inputText.length > 0
        ? // if more than 10 countries
          matchingCountries.length >= 10
          ? "Too many matches, specify another filter"
          : //if between 1 and 10 countries
          matchingCountries.length !== 1
          ? matchingCountries.map((country, id) => (
              <p key={country.name}>
                {country.name}
                <button onClick={() => setText(country.name)}>show</button>
              </p>
            ))
          : //else if only 1 country
            matchingCountries.map((country) => (
              <Country key={country.name} country={country} />
            ))
        : ""}
    </div>
  );
};

export default Countries;
