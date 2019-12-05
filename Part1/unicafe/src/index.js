import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Header = ({ text }) => (
    <h1> {text} </h1>
)

const Statistic = ({ text, value }) => (

    <tbody>
            <tr> 
                <td> {text}</td>
                <td> {value}</td>
            </tr> 
    </tbody>
    
)


const Statistics = ({ good, neutral, bad }) => {

    const total = good + neutral + bad
    const average = (good + neutral * 0 + bad * -1) / (good + bad + neutral)
    const percentage = 100 * good / (good + neutral + bad) + ' %'
    return (
        <div>
            <Header text='statistics' />
            <table>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={total} />
            <Statistic text='average' value={average} />
            <Statistic text='percentage' value={percentage} />
            </table>
      </div>
    )
}

const History = (props) => {
    if (props.AllClicks.length === 0) {
        return (
            <div>
                <Header text='Statistics' />
                <p> No feedback given </p>
            </div>
        )
    }

    return (
        <div>
            <Statistics good={props.good} neutral={props.neutral} bad={props.bad} />
        </div>
    )
}



const App = (props) => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [AllClicks, setClicks] = useState([])

    const HandleGood = () => {
        setClicks(AllClicks.concat('G'))
        setGood(good + 1)
    }
    const HandleNeutral = () => {
        setClicks(AllClicks.concat('N'))
        setNeutral(neutral + 1)
    }

    const HandleBad = () => {
        setClicks(AllClicks.concat('B'))
        setBad(bad + 1)
    }
    return (
        <div>

            <Header text='give feedback' />
            <Button onClick={HandleGood} text='good' />
            <Button onClick={HandleNeutral} text='neutral' />
            <Button onClick={HandleBad} text='bad' />
            <History AllClicks={AllClicks} good={good} neutral={neutral} bad={bad} />
        </div>


    )

}

ReactDOM.render(<App />, document.getElementById('root'))