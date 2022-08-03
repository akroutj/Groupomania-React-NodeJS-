import React, { useState } from 'react'
// import GetMyProfil from '../Profil/GetMyProfil'

import './PostMessage.css'

function PostMessage(props) {
    const [message, setMessage] = useState('')
    const [selectImage, setSelectImage] = useState(null)

    const sendMessage = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', selectImage[0])
        formData.append('message', message)

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
            body: formData,
        }

        fetch('http://localhost:3100/api/messages/new', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error.message))
    }

    return (
        <>
            <div className="new-message-container">
                <div className="card-header">
                    <div className="user-photo">
                        <img
                            className="identity-photo"
                            src="https://dev.identite.photos/wp-content/uploads/2018/01/photo-identit%C3%A9-pr%C3%A9fectures-300x300.jpg"
                            alt=""
                        />
                    </div>
                    <div className="name-card">
                        <h3 className="name-user">{props.myProfil.name}</h3>
                        <p className="job-user">{props.myProfil.job}</p>
                    </div>
                </div>

                <form onSubmit={sendMessage} className="post-message-form">
                    <div className="post-image-container">
                        <input
                            type="file"
                            name="myImage"
                            onChange={(e) => {
                                setSelectImage(e.target.files)
                            }}
                        />
                    </div>

                    <div className="post-comments-area">
                        <label
                            className="text-area-message"
                            htmlFor="message"
                        ></label>
                        <input
                            type="text"
                            className="message"
                            name="message"
                            id="message"
                            rows="3"
                            placeholder="Ecrire un commentaire..."
                            onChange={(e) => setMessage(e.target.value)}
                        ></input>
                    </div>

                    <div className="publish-post-bouton">
                        <input
                            type="submit"
                            className="post-button"
                            value="Photo"
                        />
                        <input
                            type="submit"
                            className="post-button"
                            value="Publier"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default PostMessage
