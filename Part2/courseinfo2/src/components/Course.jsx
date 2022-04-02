import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ courses }) => {
    return (
        <div>


            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header course={course} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            })}

        </div>
    )
}

export default Course
