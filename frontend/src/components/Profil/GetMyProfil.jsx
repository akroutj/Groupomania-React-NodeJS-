import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPen, FaRegCheckCircle } from 'react-icons/fa'

import './GetMyProfil.css'

const GetMyProfil = (props) => {
    const [updateProfilImg, setUpdateProfilImg] = useState(null)
    const navigate = useNavigate()

    //Mofification de la photo de profil
    const modifyImage = (e) => {
        e.preventDefault()
        console.log('ça marche')

        const formData = new FormData()
        formData.append(
            'image',
            updateProfilImg !== null ? updateProfilImg[0] : null
        )

        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            },
            body: formData,
        }

        fetch(
            'http://localhost:3100/api/auth/profil/' +
                JSON.parse(localStorage.getItem('userData')).userId,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                window.location.reload()
            })
            .catch((error) => console.log(error.message))
    }

    //Supprimer le profil
    const deleteProfil = (e, userId) => {
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
        fetch(
            'http://localhost:3100/api/auth/profil/' +
                JSON.parse(localStorage.getItem('userData')).userId,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => console.log(data), navigate('/'))
            .catch((error) => console.log(error.message))
    }

    return (
        <div className="profil-card">
            <div className="identity-container">
                <form className="form-change-profil" onSubmit={modifyImage}>
                    {updateProfilImg === null && (
                        <label htmlFor="file" className="update-image-icon">
                            <input
                                type="file"
                                id="file"
                                name="update-image-icon"
                                onChange={(e) => {
                                    setUpdateProfilImg(e.target.files)
                                }}
                            />
                            <FaPen />
                        </label>
                    )}
                    {updateProfilImg !== null && (
                        <div className="success-upload-container">
                            <div className="succes-upload">
                                <FaRegCheckCircle className="success-logo" />
                                <p> Image upload avec succès </p>
                            </div>
                            <div className="choice-button">
                                <div className="change-photo-bouton">
                                    <input
                                        type="submit"
                                        className="post-button"
                                        value="Sauvegarder"
                                    />
                                </div>
                                <button
                                    className="cancel-button"
                                    onClick={(e) => setUpdateProfilImg(null)}
                                >
                                    Annuler{' '}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="profil-photo-card">
                        <img
                            className="profil-photo"
                            src={
                                props.myProfil.profilImage !== null
                                    ? props.myProfil.profilImage
                                    : require('../../../src/assets/red-logo-single.png')
                            }
                            alt="profil"
                        />
                    </div>
                </form>

                <div className="profil-main-card">
                    <form className="info-card">
                        <p className="text-info">
                            <strong>Nom : </strong> {props.myProfil.name}
                        </p>
                        <p className="text-info">
                            <strong>Job : </strong> {props.myProfil.job}
                        </p>
                        <p className="text-info">
                            <strong>Email : </strong> {props.myProfil.email}
                        </p>
                    </form>
                    <div className="profil-buttons">
                        <button
                            onClick={(e) => {
                                const confirm = window.confirm(
                                    'Etes-vous sûres de vouloir supprimer ce compte ?'
                                )
                                if (confirm === true)
                                    deleteProfil(e, props.userId)
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetMyProfil
