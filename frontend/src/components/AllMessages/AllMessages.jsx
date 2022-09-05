import React, { useState } from 'react'
import './AllMessages.css'
import { FaHeart, FaPen } from 'react-icons/fa'
import CommentsList from '../Comments/CommentsList'
import MessageCardHeader from './MessageCardHeader'

const MessagesList = (props) => {
    const [commentary, setCommentary] = useState([])
    const [updatePostImg, setUpdatePostImg] = useState(null)

    //Modifier un Post
    const updatePost = (e, messageId) => {
        const formData = new FormData()

        formData.append(
            'image',
            updatePostImg !== null ? updatePostImg[0] : null
        )
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization:
                    'Bearer ' + JSON.parse(localStorage.getItem('userData')),
            },
            body: formData,
        }

        fetch('http://localhost:3100/api/messages/' + messageId, requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error.message))
    }

    //Liker un post
    const addLike = (e, messageId, message) => {
        e.preventDefault()
        const userLikedFilter = message.usersLiked.filter(
            (userLiked) =>
                userLiked ===
                JSON.parse(localStorage.getItem('userData')).userId
        )

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
                        <form
                            className="form-change-profil"
                            onSubmit={updatePost(message._id)}
                        >
                            <label htmlFor="file" className="update-image-icon">
                                <input
                                    type="file"
                                    id="file"
                                    name="update-image-icon"
                                    onChange={(e) => {
                                        setUpdatePostImg(e.target.files)
                                    }}
                                />
                                <FaPen />
                            </label>
                            <div className="change-photo-bouton">
                                <input
                                    type="submit"
                                    className="post-button"
                                    value="Sauvegarder"
                                />
                            </div>
                        </form>

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
