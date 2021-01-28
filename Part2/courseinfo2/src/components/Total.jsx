import React from 'react'


const Total = ({ parts }) => {

  const sum = parts.reduce((current, acc) => current + acc.exercises, 0)

  return (
    <p><strong >Total of {sum} exercises</strong></p>
  )
}

export default Total
