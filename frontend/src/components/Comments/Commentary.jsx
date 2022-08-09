import React from 'react'
import './Commentary.css'

const Commentary = (props) => {
    return (
        <div className="commentary-container">
            <h3 className="commentary-user-name">{props.comment.name}</h3>
            <p>{props.comment.commentary}</p>
        </div>
    )
}

export default Commentary
