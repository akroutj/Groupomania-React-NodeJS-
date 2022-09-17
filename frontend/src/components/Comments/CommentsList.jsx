import React from 'react'
import { useEffect, useState } from 'react'
import Commentary from './Commentary'

const CommentsList = (props) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(
            //Récuperation des commentaires
            'http://localhost:3100/api/comments/' + props.messageId
        )
            .then((res) => res.json())
            .then((data) => {
                setComments(data)
            })
    }, [props.messageId])

    return (
        <div>
            {comments.lenght !== 0 &&
                comments.map((commentData, index) => (
                    <Commentary
                        key={index}
                        comment={commentData}
                        myProfil={props.myProfil}
                    />
                ))}
        </div>
    )
}

export default CommentsList
