import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Countries from './Components/Countries'




const App = () => {

  const [inputText, setInputText] = useState('')
  const [countryData, setCountryData] = useState([])



  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => { setCountryData(res.data) })

  }, [])


  const handleData = (event) => {
    const value = event.target.value
    setInputText(value)
  }

  const handleViews = (countryName) => {
    setInputText(countryName)
  }


  return (
    <div>
      Find countries <input value={inputText} onChange={handleData}></input>
      <Countries data={countryData} inputText={inputText} setText={handleViews} />
    </div>
  )
}

export default App
