import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GetMyProfil.css'

const GetMyProfil = (props) => {
    const navigate = useNavigate()

    const modifyName = (e) => {
        e.preventDefault()
        console.log('ça marche')
        // const requestOptions = {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization:
        //             'Bearer ' +
        //             JSON.parse(localStorage.getItem('userData')).token,
        //     },
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
            .then((data) => console.log(data))
            .then(navigate('/'))
            .catch((error) => console.log(error.message))
    }
    return (
        <div className="profil-card">
            <div className="identity-container">
                <div className="profil-photo-card">
                    <img
                        className="profil-photo"
                        src={
                            props.myProfil.profilImage !== undefined
                                ? props.myProfil.profilImage
                                : require('../../../src/assets/red-logo-single.png')
                        }
                        alt="profil"
                    />
                </div>
                <div className="profil-main-card">
                    <form className="info-card">
                        <p>
                            <strong>Nom : </strong> {props.myProfil.name}
                        </p>
                        <p>
                            <strong>Job : </strong> {props.myProfil.job}
                        </p>
                        <p>
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
