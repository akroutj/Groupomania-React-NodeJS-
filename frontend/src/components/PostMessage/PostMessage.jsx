import React, { useState } from 'react'
// import GetMyProfil from '../Profil/GetMyProfil'
import { FaCamera } from 'react-icons/fa'

import './PostMessage.css'

function PostMessage(props) {
    const [message, setMessage] = useState('')
    const [selectImage, setSelectImage] = useState(null)

    const sendMessage = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', selectImage !== null ? selectImage[0] : null)
        formData.append('message', message)
        formData.append(
            'userId',
            JSON.parse(localStorage.getItem('userData')).userId
        )

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
                <div className="new-card-header">
                    <div className="user-photo">
                        <img
                            className="identity-photo"
                            src={props.myProfil.profilImage}
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
                        <label htmlFor="file" className="file-image">
                            <input
                                type="file"
                                id="file"
                                name="myImage"
                                onChange={(e) => {
                                    setSelectImage(e.target.files)
                                }}
                            />
                            Selectionnez une photo
                            <FaCamera className="camera-icon" />
                        </label>
                    </div>

                    <div className="post-comments-area">
                        <label
                            className="text-area-message"
                            htmlFor="message"
                        ></label>
                        <textarea
                            type="text"
                            className="message"
                            name="message"
                            id="message"
                            rows="2"
                            placeholder="Ecrire un commentaire..."
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="publish-post-bouton">
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
