import React from 'react'
import './Commentary.css'
import { FaTrashAlt } from 'react-icons/fa'

const Commentary = (props) => {
    const deleteOneComment = (e, commentId) => {
        e.preventDefault()

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
        }
        fetch('http://localhost:3100/api/comments/' + commentId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                window.location.reload()
            })

            .catch((error) => console.log(error.message))
    }

    return (
        <div className="commentary-container">
            <h3 className="commentary-user-name">{props.comment.name}</h3>
            <p>{props.comment.commentary}</p>

            {JSON.parse(localStorage.getItem('userData')).userId ===
                props.comment.userId || props.myProfil.admin === true ? (
                <div>
                    <FaTrashAlt
                        className="delete-comment-icon"
                        onClick={(e) => {
                            const confirm = window.confirm(
                                'Etes-vous sûres de vouloir supprimer votre commentaire ?'
                            )
                            if (confirm === true)
                                deleteOneComment(e, props.comment._id)
                        }}
                    />
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default Commentary
