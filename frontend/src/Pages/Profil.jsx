import React from 'react'
import Header from '../components/Header/Header'
import GetMyProfil from '../components/Profil/GetMyProfil'
import '../styles/Profil.css'

function Profil(props) {
    return (
        <>
            <Header />
            <main className="profil-container">
                <GetMyProfil myProfil={props.myProfil} />
            </main>
        </>
    )
}

export default Profil
