import React, { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react'

import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Forum from './Pages/Forum'
import Users from './Pages/Users'
import Profil from './Pages/Profil'

const App = () => {
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [myProfil, setMyProfil] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setMessages(messages)
    }, [messages])

    useEffect(() => {
        setIsLoaded(true)
        if (
            JSON.parse(localStorage.getItem('userData')) !== null &&
            (JSON.parse(localStorage.getItem('userData')).isLogged !== null ||
                JSON.parse(localStorage.getItem('userData')).isLogged)
        ) {
            const requestOptions = {
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userData')).token,
            }
            fetch(
                //Récuperation des infos de l'utilisateur
                'http://localhost:3100/api/auth/profil/' +
                    JSON.parse(localStorage.getItem('userData')).userId,
                requestOptions
            )
                .then((res) => res.json())
                .then((data) => {
                    setMyProfil(data)
                })
            // Recupération de tout les users
            fetch('http://localhost:3100/api/auth/users')
                .then((response) => response.json())
                .then((data) => {
                    setUsers(data)
                })
        }
        setIsLoaded(false)
    }, [isLoaded])

    if (isLoaded) {
        return <SpinnerCircular enabled={true} />
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home setIsLoaded={setIsLoaded} />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/forum"
                        element={
                            <Forum
                                setIsLoaded={setIsLoaded}
                                users={users}
                                setMessages={setMessages}
                                myProfil={myProfil}
                            />
                        }
                    />
                    <Route
                        path="/profil"
                        element={<Profil myProfil={myProfil} />}
                    />
                    <Route path="/users" element={<Users users={users} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
