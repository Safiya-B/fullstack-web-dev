import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY

    const [weatherList, setWeatherList] = useState([])

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.name}&units=metric&appid=${api_key}`)
            .then(res => {

                setWeatherList(res.data)

            })
    }, [])

    const icon = weatherList.weather && weatherList.weather[0].icon
    const temp = weatherList.main && weatherList.main.temp
    const speed = weatherList.wind && weatherList.wind.speed
    const direction = weatherList.wind && weatherList.wind.deg

    return (
        <div>
            <h3>Weather in {country.name}</h3>
            <p><strong>Temperature : </strong> {temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />

            <p><strong>Wind : </strong> {speed} mps Direction {direction} degrees</p>
        </div>
    )
}

export default Weather
