import React from 'react'
import './GetMyProfil.css'

const GetMyProfil = (props) => {
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
                    <div className="info-card">
                        <p>
                            <strong>Nom : </strong> {props.myProfil.name}
                        </p>
                        <p>
                            <strong>Job : </strong> {props.myProfil.job}
                        </p>
                        <p>
                            <strong>Email : </strong> {props.myProfil.email}
                        </p>
                    </div>
                    <div className="profil-buttons">
                        <button>Modifier</button>
                        <button>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetMyProfil
