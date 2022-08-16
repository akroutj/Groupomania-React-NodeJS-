import React, { useState } from 'react'
import './AllMessages.css'
import { FaBars, FaHeart, FaArrowCircleRight } from 'react-icons/fa'
import CommentsList from '../Comments/CommentsList'

const MessagesList = (props) => {
    const [commentary, setCommentary] = useState([])

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
                        <div className="card-header" key={message._id}>
                            <div className="identity-card">
                                <div>
                                    <img
                                        className="identity-photo"
                                        src={
                                            props.myProfil.profilImage !==
                                            undefined
                                                ? props.myProfil.profilImage
                                                : require('../../../src/assets/red-logo-single.png')
                                        }
                                        alt="Visage de la personne"
                                    />
                                </div>
                                <div className="identity-name-and-job">
                                    <h3 className="user-name">
                                        {props.users.length !== 0 &&
                                            props.users.filter(
                                                (user) =>
                                                    user._id === message.userId
                                            ).length !== 0 &&
                                            props.users.filter(
                                                (user) =>
                                                    user._id === message.userId
                                            )[0].name}
                                    </h3>

                                    <p className="user-job">
                                        {props.users.length !== 0 &&
                                            props.users.filter(
                                                (user) =>
                                                    user._id === message.userId
                                            ).length !== 0 &&
                                            props.users.filter(
                                                (user) =>
                                                    user._id === message.userId
                                            )[0].job}
                                    </p>
                                </div>
                            </div>

                            <FaBars className="setting-card" />
                        </div>
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
                            <FaHeart />
                        </div>
                        <hr className="line"></hr>

                        {/* COMMENTS */}
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
                                            props.myProfil.profilImage !==
                                            undefined
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
                                <FaArrowCircleRight
                                    className="submit-icon"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                ))}
        </>
    )
}

export default MessagesList
