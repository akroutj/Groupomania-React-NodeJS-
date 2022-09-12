import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validEmail } from '../../utils/Regex'
import FormSignUp from './FormSignUp'

import './SignUp.css'

function SignUpComp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [job, setJob] = useState('')
    const [error, setError] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    //const [pwdError, setPwdError] = useState(false)
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
        }
        if (!validEmail.test(email)) {
            setEmailErr(true)
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
                .then((res) => res.json())
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
            <FormSignUp
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                setJob={setJob}
                error={error}
                emailErr={emailErr}
                //pwdError={pwdError}
                Suscribe={Suscribe}
            />
        </>
    )
}

export default SignUpComp
