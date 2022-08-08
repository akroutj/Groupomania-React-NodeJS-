import React from 'react'

const Commentary = (props) => {
    console.log(props.oneComment)
    return (
        <div>
            <p>{props.oneComment}</p>
        </div>
    )
}

export default Commentary
