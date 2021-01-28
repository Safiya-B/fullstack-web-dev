import React from 'react'
import Part from './Part'


const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map(line => <Part key={line.id} part={line} />)
            }
        </div>
    )
}
export default Content
