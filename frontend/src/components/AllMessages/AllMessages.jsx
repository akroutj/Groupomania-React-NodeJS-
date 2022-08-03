import React, { useState } from 'react'
import './AllMessages.css'
import { FaBars, FaHeart } from 'react-icons/fa'

const MessagesList = (props) => {
    const [commentary, setCommentary] = useState([])

    const sendCommentary = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('commentary', commentary)
        console.log(commentary)

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
            body: formData,
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
                                <div className="user-name">
                                    {props.users.length !== 0 &&
                                        props.users.filter(
                                            (user) =>
                                                user._id === message.userId
                                        ).length !== 0 &&
                                        props.users.filter(
                                            (user) =>
                                                user._id === message.userId
                                        )[0].name}
                                </div>

                                <div className="user-job">
                                    {props.users.length !== 0 &&
                                        props.users.filter(
                                            (user) =>
                                                user._id === message.userId
                                        ).length !== 0 &&
                                        props.users.filter(
                                            (user) =>
                                                user._id === message.userId
                                        )[0].job}
                                </div>
                            </div>
                            <FaBars className="setting-card" />
                        </div>
                        <div className="image-cont">
                            <img
                                className="card-image"
                                src={message.imageUrl}
                                alt="Teamphoto"
                            />
                        </div>
                        <div className="card-description">
                            <p>{message.message}</p>
                            <FaHeart />
                        </div>
                        <hr className="line"></hr>

                        <form
                            onSubmit={sendCommentary}
                            className="card-commentary"
                        >
                            <div className="identity-card">
                                <div className="user-photo-commentary">
                                    <img
                                        className="identity-photo-commentary"
                                        src="https://www.zdnet.com/a/hub/i/r/2021/04/23/b19e9f94-9b4b-4bcf-8ffb-1a37ea452be2/resize/370xauto/3bef135b5d635f53c53f2d54e1e41b23/image.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="commentary-info-card">
                                    <h3 className="commentary-name-user">
                                        {props.myProfil.name}
                                    </h3>
                                    <p>{props.myProfil.job}</p>
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
                                <button
                                    className="submit"
                                    type="submit"
                                ></button>
                            </div>
                        </form>
                    </div>
                ))}
        </>
    )
}

export default MessagesList
