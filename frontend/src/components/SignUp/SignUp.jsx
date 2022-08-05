import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FaLock, FaEnvelope, FaUserCircle, FaAddressCard } from 'react-icons/fa'
import logo from '../../assets/white-logo-single.png'
//import logo from '../../'
import './SignUp.css'

function SignUpComp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [job, setJob] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const Suscribe = (e) => {
        e.preventDefault()

        if (
            name.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            job.length === 0
        ) {
            setError('Une erreur est survenue')
        } else {
            fetch('http://localhost:3100/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    job: job,
                }),
            })
                .then((response) => response.json())
                .then(navigate('/'))
                .catch((err) => setError(`Une erreur est survenue ${err}`))
        }
    }

    return (
        <>
            <div className="signup-container"></div>
            <div className="home-presentation">
                <h1>Bienvenue</h1>
                <h3>sur le réseau social de l'entreprise</h3>
            </div>
            <form onSubmit={Suscribe} className="form">
                <div className="logo-container">
                    <img
                        className="logo-login"
                        alt="Logo Groupomania"
                        src={logo}
                    />
                    <h3 className="login-text">Inscription</h3>
                </div>
                <div className="input-container">
                    <div className="pseudo-container"></div>
                    <label htmlFor="name">
                        <FaUserCircle className="user-icon" />
                        Name
                    </label>
                    <br />
                    <input
                        className="input"
                        type="text"
                        placeholder=" Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <div className="email-container"></div>
                    <label htmlFor="email">
                        <FaEnvelope className="password-icon" />
                        Email
                    </label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        placeholder=" email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <div className="password-container">
                        <label htmlFor="password">
                            <FaLock className="password-icon" />
                            Mot de passe
                        </label>
                        <br />
                        <input
                            className="input"
                            type="password"
                            placeholder=" Mot de passe"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="job-container">
                        <label htmlFor="job">
                            <FaAddressCard className="job-icon" />
                            Job
                        </label>

                        <br />
                        <input
                            className="input"
                            type="text"
                            placeholder=" Job"
                            name="job"
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </div>
                </div>
                <p>{error}</p>
                <button className="submit" type="submit">
                    Inscription
                </button>
                <div className="back-home-page">
                    <p> Revenir à la </p>
                    <Link to="/" className="link">
                        page d'acceuil
                    </Link>
                </div>
            </form>
        </>
    )
}

export default SignUpComp
