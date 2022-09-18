import React, { useState } from 'react'
import './AllMessages.css'
import { FaHeart } from 'react-icons/fa'
import CommentsList from '../Comments/CommentsList'
import MessageCardHeader from './MessageCardHeader'
import UpdatePostForm from './UpdatePostForm'

const MessagesList = (props) => {
    const [commentary, setCommentary] = useState([])
    const [updatePostImg, setUpdatePostImg] = useState(null)
    const [updatePostDescription, setUpdatePostDescription] = useState(null)
    const [settingIsOpen, setSettingIsOpen] = useState(false)

    //Modifier un Post
    const updatePost = (e, messageId) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append(
            'image',
            updatePostImg !== null ? updatePostImg[0] : null
        )
        formData.append('message', updatePostDescription)

        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
            body: formData,
        }
        fetch('http://localhost:3100/api/messages/' + messageId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                window.location.reload()
            })
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
            .then((data) => {
                console.log(data)
                window.location.reload()
            })

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
                                    alt={
                                        props.users.length !== 0 &&
                                        props.users.filter(
                                            (user) =>
                                                user._id === message.userId
                                        ).length !== 0 &&
                                        props.users.filter(
                                            (user) =>
                                                user._id === message.userId
                                        )[0].name + ' photo de son post'
                                    }
                                />
                            </div>
                        )}

                        <div>
                            {JSON.parse(localStorage.getItem('userData'))
                                .userId === message.userId ||
                            props.myProfil.admin === true ? (
                                <div className="modify-post-container">
                                    <button
                                        className="modify-post-button"
                                        onClick={() =>
                                            setSettingIsOpen(!settingIsOpen)
                                        }
                                    >
                                        Modifier votre post
                                    </button>{' '}
                                    {settingIsOpen ? (
                                        <UpdatePostForm
                                            setUpdatePostImg={setUpdatePostImg}
                                            setUpdatePostDescription={
                                                setUpdatePostDescription
                                            }
                                            message={message}
                                            settingIsOpen={setSettingIsOpen}
                                            updatePost={updatePost}
                                            updatePostImg={updatePostImg}
                                            myProfil={props.myProfil}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

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
                            myProfil={props.myProfil}
                        />

                        <form
                            onSubmit={(e) => sendCommentary(e, message)}
                            className="card-commentary"
                        >
                            <div className="commentaries-container">
                                <input
                                    aria-label="labelCommentary"
                                    aria-required="true"
                                    className="commentary"
                                    type="text"
                                    name="commentary"
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
