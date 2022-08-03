import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Login.css'
import logo from '../../assets/white-logo-single.png'

import { FaLock, FaEnvelope } from 'react-icons/fa'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const LoginValidation = (e) => {
        e.preventDefault()
        if (
            email.length === 0 ||
            password.length === 0 ||
            passwordConfirmation.length === 0
        ) {
            setError('Une erreur est survenue')
        } else {
            fetch('http://localhost:3100/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    localStorage.setItem(
                        'userData',
                        JSON.stringify({
                            userId: res.userId,
                            token: res.token,
                        })
                    )
                    navigate('/forum')
                })
                .catch((err) => setError(`Une erreur est survenue ${err}`))
        }
    }

    return (
        <div className="login-container">
            <div className="home-presentation">
                <h1>Bienvenue</h1>
                <h3>sur le réseau social de l'entreprise</h3>
            </div>

            <div className="logo-container">
                <img className="login-logo" alt="Logo Groupomania" src={logo} />
                <h3 className="login-text">Connexion</h3>
            </div>

            <form onSubmit={LoginValidation} className="form">
                <div className="email-container"></div>
                <label htmlFor="email">
                    <FaEnvelope className="login-form-icon" />
                    Email
                </label>
                <br />
                <input
                    className="input"
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <div className="password-container">
                    <label htmlFor="password">
                        <FaLock className="login-form-icon" />
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
                <div className="password-validation-container">
                    <label htmlFor="password-validation">
                        <FaLock className="login-form-icon" />
                        Confirmez le mot de passe
                    </label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        placeholder=" Mot de passe"
                        name="password-validation"
                    />
                </div>

                <p>{error}</p>

                <button className="submit" type="submit">
                    Connexion
                </button>
            </form>

            <div className="inscription">
                <p>Pas encore inscrit ?</p>
                <Link to="/signup" className="link">
                    Inscrivez-vous
                </Link>
            </div>
        </div>
    )
}

export default Login
