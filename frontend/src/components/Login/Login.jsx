import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormLogin from './FormLogin'

import './Login.css'
import logo from '../../assets/white-logo-single.png'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const LoginValidation = (e) => {
        e.preventDefault()
        props.setIsLoaded(true)
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
                            isLogged: true,
                        })
                    )
                    navigate('/forum')
                    window.location.reload()
                })
                .catch((err) => setError(`Une erreur est survenue ${err}`))
        }
        props.setIsLoaded(false)
    }

    return (
        <div className="login-container">
            <div className="home-presentation">
                <h1>Bienvenue</h1>
                <h2>sur le réseau social de l'entreprise</h2>
            </div>

            <div className="logo-container">
                <img className="login-logo" alt="Logo Groupomania" src={logo} />
                <h3 className="login-text">Connexion</h3>
            </div>

            <FormLogin
                LoginValidation={LoginValidation}
                error={error}
                setEmail={setEmail}
                setPassword={setPassword}
                setPasswordConfirmation={setPasswordConfirmation}
            />

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
