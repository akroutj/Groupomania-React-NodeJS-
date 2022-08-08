import React from 'react'
import { useEffect, useState } from 'react'
import Commentary from './Commentary'

const CommentsList = (props) => {
    const [comments, setComments] = useState(false)

    useEffect(() => {
        fetch(
            //Récuperation des commentaires
            'http://localhost:3100/api/comments/' + props.messageId
        )
            .then((res) => res.json())
            .then((data) => {
                setComments(data)

                console.log(data)
            })
    }, [])

    return (
        <div>
            {comments &&
                comments?.map((commentData, index) => (
                    <Commentary
                        key={'commentary' + index}
                        oneComment={commentData.commentary}
                    />
                ))}
        </div>
    )
}

export default CommentsList
