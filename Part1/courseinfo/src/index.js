import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}


const Part = (props) => {
    return (
        <p>
            {props.part}{props.exercises}
        </p>
    )
}


const Content = (props) => {

    return (
        <div>
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises1} />
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises2} />
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises3} />
        </div>

    )
}

const Total = (props) => {


    return (
        <p>
            Number of exercises : {props.parts[0].exercises1 + props.parts[1].exercises2 +
                props.parts[2].exercises3}
        </p>
    )
}


const App = () => {

    const course = {
        name: 'Half stack application development',

        parts: [

            {
                name: 'Fundamentals of react :',
                exercises1: 10
            },
            {
                name: 'Using props to pass data :',
                exercises2: 7
            },
            {
                name: 'State of a component :',
                exercises3: 14
            },
        ]
    }


    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))