import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = (props) => (
  <h1> {props.text} </h1>
)


const App = (props) => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleGood = () => setGood(good + 1)
  const HandleNeutral = () => setNeutral(neutral + 1)
  const HandleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='Give feedback' />
      <Button onClick={HandleGood} text='good' />
      <Button onClick={HandleNeutral} text='neutral' />
      <Button onClick={HandleBad} text='bad' />
      <Header text='statistics' />
      <p>good : {good}</p>
      <p>neutral : {neutral}</p>
      <p>bad : {bad}</p>

    </div>


  )

}

ReactDOM.render(<App />, document.getElementById('root'))