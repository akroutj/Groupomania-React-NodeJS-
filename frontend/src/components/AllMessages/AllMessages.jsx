import React, { useState } from 'react'
import './AllMessages.css'
import { FaHeart } from 'react-icons/fa'
import CommentsList from '../Comments/CommentsList'
import MessageCardHeader from './MessageCardHeader'

const MessagesList = (props) => {
    const [commentary, setCommentary] = useState([])

    //Liker un post
    const addLike = (e, messageId, message) => {
        e.preventDefault()
        const userLikedFilter = message.usersLiked.filter(
            (userLiked) =>
                userLiked ===
                JSON.parse(localStorage.getItem('userData')).userId
        )

        console.log(message.usersLiked)

        let formData = {}
        if (userLikedFilter.length === 0) {
            formData = {
                like: 1,
                userId: JSON.parse(localStorage.getItem('userData')).userId,
            }
        } else {
            formData = {
                like: 0,
                userId: JSON.parse(localStorage.getItem('userData')).userId,
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
            body: JSON.stringify(formData),
        }
        fetch(
            'http://localhost:3100/api/messages/' + messageId + '/like',
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                window.location.reload()
            })

            .catch((error) => console.log(error.message))
    }

    //Supprimer un message
    const deleteOneMessage = (e, messageId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
        }
        console.log(messageId)
        fetch('http://localhost:3100/api/messages/' + messageId, requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error.message))
    }

    //Poster un commentaire
    const sendCommentary = (e, message) => {
        const formData = {
            commentary: commentary,
            userId: JSON.parse(localStorage.getItem('userData')).userId,
            messageId: message._id,
            name: props.myProfil.name,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
            body: JSON.stringify(formData),
        }

        fetch('http://localhost:3100/api/comments', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error.message))
    }

    return (
        <>
            {props.messages.length !== 0 &&
                props.messages.map((message, index) => (
                    <div key={index} className="post-card">
                        <MessageCardHeader
                            message={message}
                            myProfil={props.myProfil}
                            users={props.users}
                            deleteOneMessage={deleteOneMessage}
                        />
                        {message?.imageUrl && (
                            <div className="image-cont">
                                <img
                                    className="card-image"
                                    src={message.imageUrl}
                                    alt="Teamphoto"
                                />
                            </div>
                        )}
                        <div className="card-description">
                            <p>{message.message}</p>
                            <div className="like-container">
                                <FaHeart
                                    className="heart-icon"
                                    onClick={(e) =>
                                        addLike(e, message._id, message)
                                    }
                                />
                                <p>{message.likes}</p>
                            </div>
                        </div>
                        <hr className="line"></hr>

                        <CommentsList
                            messageId={message._id}
                            commentsData={props.comments}
                        />

                        <form
                            onSubmit={(e) => sendCommentary(e, message)}
                            className="card-commentary"
                        >
                            <div className="identity-card">
                                <div className="user-photo-commentary">
                                    <img
                                        className="identity-photo-commentary"
                                        src={
                                            props.myProfil.profilImage !== null
                                                ? props.myProfil.profilImage
                                                : require('../../../src/assets/red-logo-single.png')
                                        }
                                        alt="visage de la personne"
                                    />
                                </div>
                                <div className="commentary-info-card">
                                    <h3 className="commentary-name-user">
                                        {props.myProfil.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="commentaries-container">
                                <label htmlFor="commentary"></label>
                                <input
                                    type="text"
                                    name="commentary"
                                    id="commentary"
                                    placeholder="Ecrire un commentaire..."
                                    onChange={(e) =>
                                        setCommentary(e.target.value)
                                    }
                                ></input>
                            </div>
                        </form>
                    </div>
                ))}
        </>
    )
}

export default MessagesList
